#!/usr/bin/env bash
#
# Okwe: run the production image with docker-compose.prod.yml (any Docker host).
#
# Usage: ./scripts/docker/prod.sh <command>
#
# Commands:
#   up            Pull (when pinned) and start the web container in the background
#   down          Stop and remove the container
#   logs          Follow the container logs
#   ps            Show container status and health
#   smoke [url]   Smoke-test a running site (default http://localhost:$OKWE_PROD_PORT)
#
# The image comes from docker-compose.prod.yml (pinned by build-push.sh). To run a
# local build instead:  OKWE_WEB_IMAGE=docker.io/privexlabs/okwe-web:0.1.0 ./scripts/docker/prod.sh up

set -euo pipefail

# shellcheck source=scripts/docker/common.sh
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

usage() {
    sed -n '3,15p' "${BASH_SOURCE[0]}" | sed -E 's/^# ?//'
}

compose() {
    docker compose -f "$COMPOSE_PROD" "$@"
}

COMMAND="${1:-}"
[[ $# -gt 0 ]] && shift

case "$COMMAND" in
    up)
        require_compose
        image="${OKWE_WEB_IMAGE:-$(compose_image_ref "$COMPOSE_PROD")}"
        [[ -n "$image" ]] || die "No web image reference found in docker-compose.prod.yml."
        if [[ "$image" == *@sha256:* ]]; then
            compose pull
        elif [[ -n "${OKWE_WEB_IMAGE:-}" ]]; then
            log_warn "Running ${image} (not digest-pinned): use this for local testing only."
        else
            die "docker-compose.prod.yml is not pinned to a digest yet. Run ./scripts/docker/build-push.sh <version>, or set OKWE_WEB_IMAGE to test a local build."
        fi
        compose up --detach --wait
        log_success "Okwe is up on http://localhost:${OKWE_PROD_PORT} (${image})"
        ;;
    down)
        require_compose
        compose down
        log_success "Stopped."
        ;;
    logs)
        require_compose
        compose logs --follow
        ;;
    ps)
        require_compose
        compose ps
        ;;
    smoke)
        smoke "${1:-http://localhost:${OKWE_PROD_PORT}}"
        ;;
    -h|--help|help)
        usage
        ;;
    *)
        usage
        [[ -z "$COMMAND" ]] && exit 1
        die "Unknown command: ${COMMAND}"
        ;;
esac
