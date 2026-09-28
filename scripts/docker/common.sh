#!/usr/bin/env bash
#
# Okwe Docker scripts: shared configuration and helpers.
# Sourced by the other scripts in this folder; not meant to be run directly.
#
# Configuration precedence: environment variables > scripts/docker/.env > defaults.
# See scripts/docker/.env.example for every variable.
#
# Compatible with bash 3.2 (the macOS system bash).

# Paths are resolved from this file's location, never from $PWD.
DOCKER_SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${DOCKER_SCRIPTS_DIR}/../.." && pwd)"

# Used by the scripts that source this file.
# shellcheck disable=SC2034
COMPOSE_DEV="${REPO_ROOT}/docker-compose.dev.yml"
# shellcheck disable=SC2034
COMPOSE_PROD="${REPO_ROOT}/docker-compose.prod.yml"
# shellcheck disable=SC2034
COMPOSE_SECRETVM="${REPO_ROOT}/docker-compose.secretvm.yml"

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

if [[ -t 1 ]]; then
    C_RED=$'\033[0;31m'; C_GREEN=$'\033[0;32m'; C_YELLOW=$'\033[1;33m'; C_BLUE=$'\033[0;34m'; C_RESET=$'\033[0m'
else
    C_RED=""; C_GREEN=""; C_YELLOW=""; C_BLUE=""; C_RESET=""
fi

log_info()    { printf '%sℹ%s %s\n' "$C_BLUE" "$C_RESET" "$*"; }
log_success() { printf '%s✔%s %s\n' "$C_GREEN" "$C_RESET" "$*"; }
log_warn()    { printf '%s⚠%s %s\n' "$C_YELLOW" "$C_RESET" "$*" >&2; }
log_error()   { printf '%s✖%s %s\n' "$C_RED" "$C_RESET" "$*" >&2; }
die()         { log_error "$*"; exit 1; }

# confirm "question" → returns 0 only on an explicit "yes".
confirm() {
    local reply
    read -r -p "$1 (yes/no): " reply
    [[ "$reply" == "yes" ]]
}

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Loads KEY=value lines from a file without overriding variables that are
# already set in the environment. Blank lines and # comments are ignored;
# surrounding double or single quotes on values are stripped.
load_env_file() {
    local file="$1" line key value
    [[ -f "$file" ]] || return 0
    while IFS= read -r line || [[ -n "$line" ]]; do
        [[ "$line" =~ ^[[:space:]]*(#|$) ]] && continue
        if [[ ! "$line" =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
            die "Invalid line in ${file}: ${line}"
        fi
        key="${BASH_REMATCH[1]}"
        value="${BASH_REMATCH[2]}"
        if [[ "$value" =~ ^\"(.*)\"$ || "$value" =~ ^\'(.*)\'$ ]]; then
            value="${BASH_REMATCH[1]}"
        fi
        if [[ -z "${!key+x}" ]]; then
            export "${key}=${value}"
        fi
    done < "$file"
}

load_env_file "${DOCKER_SCRIPTS_DIR}/.env"

: "${REGISTRY:=docker.io}"
: "${IMAGE_NAMESPACE:=privexlabs}"
: "${IMAGE_NAME:=okwe-web}"
: "${PLATFORM:=linux/amd64}"
: "${OKWE_DEV_PORT:=8910}"
: "${OKWE_PROD_PORT:=8080}"
: "${SECRETVM_DOMAIN:=okwebest.com}"
# Compose reads the ports from the environment.
export REGISTRY IMAGE_NAMESPACE IMAGE_NAME PLATFORM OKWE_DEV_PORT OKWE_PROD_PORT SECRETVM_DOMAIN

# registry/namespace/name, e.g. docker.io/privexlabs/okwe-web
image_repo() {
    printf '%s/%s/%s' "$REGISTRY" "$IMAGE_NAMESPACE" "$IMAGE_NAME"
}

# ---------------------------------------------------------------------------
# Prerequisites
# ---------------------------------------------------------------------------

require_cmd() {
    command -v "$1" >/dev/null 2>&1 || die "'$1' is required but not installed."
}

require_docker() {
    require_cmd docker
    docker info >/dev/null 2>&1 || die "Docker daemon is not running. Start Docker Desktop (or: sudo systemctl start docker)."
}

require_compose() {
    require_docker
    docker compose version >/dev/null 2>&1 || die "Docker Compose v2 ('docker compose') is required."
}

require_buildx() {
    require_docker
    docker buildx version >/dev/null 2>&1 || die "Docker Buildx is required (bundled with Docker Desktop / docker-buildx-plugin)."
}

# ---------------------------------------------------------------------------
# Versioning and git
# ---------------------------------------------------------------------------

validate_semver() {
    [[ "$1" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]] \
        || die "Invalid version '$1'. Use semantic versioning: MAJOR.MINOR.PATCH[-PRERELEASE] (e.g. 0.1.0, 0.2.0-rc.1)."
}

is_prerelease() {
    [[ "$1" == *-* ]]
}

git_is_dirty() {
    [[ -n "$(git -C "$REPO_ROOT" status --porcelain 2>/dev/null)" ]]
}

# Short commit SHA, suffixed with -dirty when the working tree has changes.
git_revision() {
    local sha
    sha="$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo unknown)"
    if git_is_dirty; then
        sha="${sha}-dirty"
    fi
    printf '%s' "$sha"
}

# ---------------------------------------------------------------------------
# Compose image pinning
# ---------------------------------------------------------------------------

# pin_image <compose-file> <image-ref>
# Replaces the web image reference (any registry/namespace, tag or digest form,
# bare or as the default of ${OKWE_WEB_IMAGE:-...}) with <image-ref>. Only
# references ending in /${IMAGE_NAME} are touched, so the traefik line is safe.
pin_image() {
    local file="$1" ref="$2" tmp
    [[ -f "$file" ]] || die "Compose file not found: ${file}"
    tmp="$(mktemp "${file}.XXXXXX")"
    sed -E "s#([ -])[^ {}]*/${IMAGE_NAME}[:@][^ }]*#\\1${ref}#" "$file" > "$tmp"
    mv "$tmp" "$file"
    grep -qF "$ref" "$file" \
        || die "Could not pin ${ref} in ${file##*/}: no '${IMAGE_NAME}' image reference found. Not deploy-safe."
}

# Prints the web image reference currently set in a compose file.
compose_image_ref() {
    grep -oE "[A-Za-z0-9][A-Za-z0-9._/-]*/${IMAGE_NAME}[:@][A-Za-z0-9._:-]*" "$1" | head -n 1
}

# ---------------------------------------------------------------------------
# Smoke test
# ---------------------------------------------------------------------------

SMOKE_FAILURES=0
SMOKE_TMP=""

_smoke_pass() { log_success "$1"; }
_smoke_fail() { log_error "$1"; SMOKE_FAILURES=$((SMOKE_FAILURES + 1)); }

# _smoke_fetch <url> → sets FETCH_CODE; headers/body land in $SMOKE_TMP.
_smoke_fetch() {
    FETCH_CODE="$(curl -sS --max-time 15 -D "${SMOKE_TMP}/headers" -o "${SMOKE_TMP}/body" -w '%{http_code}' "$1" 2>/dev/null)" || FETCH_CODE="000"
    tr -d '\r' < "${SMOKE_TMP}/headers" > "${SMOKE_TMP}/headers.clean" 2>/dev/null || : > "${SMOKE_TMP}/headers.clean"
}

_smoke_header() {
    grep -qiE "^$1:[[:space:]]*$2" "${SMOKE_TMP}/headers.clean"
}

# smoke <base-url>: checks health, SPA routing, asset caching and security headers.
smoke() {
    local base="${1%/}" asset header
    require_cmd curl
    SMOKE_FAILURES=0
    SMOKE_TMP="$(mktemp -d)"

    log_info "Smoke testing ${base}"

    _smoke_fetch "${base}/healthz"
    if [[ "$FETCH_CODE" == "200" ]]; then _smoke_pass "/healthz → 200"; else _smoke_fail "/healthz → ${FETCH_CODE} (expected 200)"; fi

    _smoke_fetch "${base}/"
    if [[ "$FETCH_CODE" == "200" ]] && grep -q 'id="redwood-app"' "${SMOKE_TMP}/body"; then
        _smoke_pass "/ → 200, app shell served"
    else
        _smoke_fail "/ → ${FETCH_CODE}, app shell not found"
    fi
    if _smoke_header cache-control 'no-cache'; then _smoke_pass "HTML is served with Cache-Control: no-cache"; else _smoke_fail "HTML is missing Cache-Control: no-cache"; fi
    for header in content-security-policy x-content-type-options x-frame-options referrer-policy permissions-policy; do
        if _smoke_header "$header" '.+'; then _smoke_pass "Header present: ${header}"; else _smoke_fail "Header missing: ${header}"; fi
    done
    if [[ "$base" == https://* ]]; then
        if _smoke_header strict-transport-security 'max-age='; then _smoke_pass "Header present: strict-transport-security"; else _smoke_fail "Header missing: strict-transport-security"; fi
    fi
    asset="$(grep -oE '/assets/[^"]+\.js' "${SMOKE_TMP}/body" | head -n 1 || true)"

    _smoke_fetch "${base}/contact"
    if [[ "$FETCH_CODE" == "200" ]] && grep -q 'id="redwood-app"' "${SMOKE_TMP}/body"; then
        _smoke_pass "/contact → 200 (SPA fallback)"
    else
        _smoke_fail "/contact → ${FETCH_CODE} (expected the SPA fallback)"
    fi

    if [[ -z "$asset" ]]; then
        _smoke_fail "No /assets/*.js reference found in index.html"
    else
        _smoke_fetch "${base}${asset}"
        if [[ "$FETCH_CODE" == "200" ]]; then _smoke_pass "${asset} → 200"; else _smoke_fail "${asset} → ${FETCH_CODE}"; fi
        if _smoke_header content-type '(application|text)/javascript'; then _smoke_pass "JS served with a JavaScript content type"; else _smoke_fail "JS served with a wrong content type"; fi
        if _smoke_header cache-control '.*immutable'; then _smoke_pass "Assets cached as immutable"; else _smoke_fail "Assets are missing the immutable Cache-Control"; fi
    fi

    rm -rf "$SMOKE_TMP"
    if [[ "$SMOKE_FAILURES" -gt 0 ]]; then
        log_error "Smoke test failed: ${SMOKE_FAILURES} check(s) failed."
        return 1
    fi
    log_success "Smoke test passed."
}
