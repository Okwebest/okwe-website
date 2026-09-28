#!/usr/bin/env bash
#
# Okwe: build the production web image, push it, and pin its digest.
#
# One image serves both production (docker-compose.prod.yml) and SecretVM
# (docker-compose.secretvm.yml). After a push, both compose files are pinned to
# the pushed digest; commit them as the record of what is deployed.
#
# Usage: ./scripts/docker/build-push.sh <version> [options]
#
# Options:
#   --build-only   Build the image locally; do not push or touch compose files
#   --push-only    Push an image already built for <version> (e.g. after a push timeout)
#   --no-cache     Build without the Docker layer cache
#   --force        Allow pushing from a dirty working tree or over an existing version tag
#   -h, --help     Show this help
#
# Examples:
#   ./scripts/docker/build-push.sh 0.1.0 --build-only   # build and test locally
#   ./scripts/docker/build-push.sh 0.1.0                # build, push, pin digest
#   ./scripts/docker/build-push.sh 0.1.0 --push-only    # retry a failed push
#   ./scripts/docker/build-push.sh 0.2.0-rc.1           # prerelease: `latest` is not moved
#
# Image: $REGISTRY/$IMAGE_NAMESPACE/$IMAGE_NAME (default docker.io/privexlabs/okwe-web),
# platform $PLATFORM (default linux/amd64). Configure in scripts/docker/.env.

set -euo pipefail

# shellcheck source=scripts/docker/common.sh
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

usage() {
    sed -n '3,25p' "${BASH_SOURCE[0]}" | sed -E 's/^# ?//'
}

VERSION=""
BUILD=true
PUSH=true
NO_CACHE=false
FORCE=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        --build-only) PUSH=false ;;
        --push-only)  BUILD=false ;;
        --no-cache)   NO_CACHE=true ;;
        --force)      FORCE=true ;;
        -h|--help)    usage; exit 0 ;;
        -*)           usage; die "Unknown option: $1" ;;
        *)
            [[ -z "$VERSION" ]] || die "Unexpected argument: $1"
            VERSION="$1"
            ;;
    esac
    shift
done

[[ -n "$VERSION" ]] || { usage; die "A version is required."; }
[[ "$BUILD" == true || "$PUSH" == true ]] || die "--build-only and --push-only cannot be combined."
validate_semver "$VERSION"

REPO="$(image_repo)"
TAG="${REPO}:${VERSION}"
LATEST="${REPO}:latest"
MOVE_LATEST=true
if is_prerelease "$VERSION"; then
    MOVE_LATEST=false
fi

build_image() {
    local build_date vcs_ref
    build_date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    vcs_ref="$(git_revision)"

    local args=(
        --platform "$PLATFORM"
        --target web
        # SecretVM rejects provenance/SBOM attestation manifests.
        --provenance=false
        --sbom=false
        --build-arg "VERSION=${VERSION}"
        --build-arg "VCS_REF=${vcs_ref}"
        --build-arg "BUILD_DATE=${build_date}"
        --build-arg "SOURCE_URL=$(git -C "$REPO_ROOT" remote get-url origin 2>/dev/null || true)"
        --tag "$TAG"
        --load
    )
    [[ "$MOVE_LATEST" == true ]] && args+=(--tag "$LATEST")
    [[ "$NO_CACHE" == true ]] && args+=(--no-cache)

    log_info "Building ${TAG} (${PLATFORM}, revision ${vcs_ref})"
    docker buildx build "${args[@]}" "$REPO_ROOT"
    log_success "Built ${TAG}"
}

check_push_allowed() {
    if git_is_dirty; then
        if [[ "$FORCE" == true ]]; then
            log_warn "Working tree has uncommitted changes; pushing anyway (--force)."
        else
            die "Working tree has uncommitted changes. Commit first so the image matches a revision, or pass --force."
        fi
    fi
    if docker buildx imagetools inspect "$TAG" >/dev/null 2>&1; then
        if [[ "$FORCE" == true ]]; then
            log_warn "${TAG} already exists in the registry; overwriting (--force)."
        else
            die "${TAG} already exists in the registry. Version tags are immutable: bump the version, or pass --force."
        fi
    fi
}

push_image() {
    docker image inspect "$TAG" >/dev/null 2>&1 \
        || die "Image ${TAG} not found locally. Build it first (drop --push-only)."
    log_info "Pushing ${TAG}"
    docker push "$TAG"
    if [[ "$MOVE_LATEST" == true ]]; then
        docker tag "$TAG" "$LATEST"
        docker push "$LATEST"
    fi
    log_success "Pushed ${TAG}$([[ "$MOVE_LATEST" == true ]] && printf ' and %s' "$LATEST")"
}

# Reads the digest back from the registry, so the pin is exactly what was pushed.
registry_digest() {
    docker buildx imagetools inspect "$TAG" | awk '/^Digest:/ { print $2; exit }'
}

log_info "Okwe web image: ${TAG}"
require_buildx

# Fail fast, before a long build, if the push would be refused.
if [[ "$PUSH" == true ]]; then
    check_push_allowed
fi

if [[ "$BUILD" == true ]]; then
    build_image
fi

if [[ "$PUSH" == false ]]; then
    log_info "--build-only: nothing pushed, compose files unchanged."
    log_info "Try it locally: OKWE_WEB_IMAGE=${TAG} ./scripts/docker/prod.sh up"
    exit 0
fi

push_image

DIGEST="$(registry_digest)"
[[ "$DIGEST" =~ ^sha256:[a-f0-9]{64}$ ]] || die "Could not read the digest of ${TAG} from the registry; compose files NOT updated."
PINNED="${REPO}@${DIGEST}"

pin_image "$COMPOSE_PROD" "$PINNED"
pin_image "$COMPOSE_SECRETVM" "$PINNED"
log_success "Pinned ${PINNED}"
log_success "  in docker-compose.prod.yml and docker-compose.secretvm.yml"

cat <<EOF

Next steps
  1. Commit the pinned compose files:
       git add docker-compose.prod.yml docker-compose.secretvm.yml
       git commit -m "Release okwe-web ${VERSION}"
  2. Production host:  docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d
  3. SecretVM:         ./scripts/docker/secretvm.sh show   → upload in the portal
                       ./scripts/docker/secretvm.sh verify
EOF
