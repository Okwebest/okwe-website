# syntax=docker/dockerfile:1
#
# Okwe — container images
#
# Targets:
#   dev   Redwood dev server (`yarn rw dev`), source bind-mounted by docker-compose.dev.yml
#   web   Production image: the static web build served by unprivileged nginx on :8080
#
# Build via ./scripts/docker/build-push.sh (production) or ./scripts/docker/dev.sh (development).
#
# The Node stages run on the build machine's platform ($BUILDPLATFORM): their only
# output is web/dist, which is plain HTML/JS/CSS. Only the final `web` stage uses the
# target platform, so an amd64 image builds natively on ARM machines, without QEMU.

# base
# ----
FROM --platform=$BUILDPLATFORM node:20-bookworm-slim AS base

# openssl is required by Prisma (installed via the api workspace), as in Redwood's
# official Dockerfile template.
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable

# COREPACK_HOME is kept outside the ~/.cache build-cache mount so the Yarn
# release named in package.json#packageManager is stored in the image layer.
ENV REDWOOD_DISABLE_TELEMETRY=1 \
    COREPACK_HOME=/home/node/.corepack

USER node
WORKDIR /home/node/app

# deps
# ----
FROM base AS deps

COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node api/package.json api/
COPY --chown=node:node web/package.json web/

RUN mkdir -p /home/node/.yarn/berry/index /home/node/.cache

RUN --mount=type=cache,target=/home/node/.yarn/berry/cache,uid=1000,gid=1000 \
    --mount=type=cache,target=/home/node/.cache,uid=1000,gid=1000 \
    yarn install --immutable

# dev
# ---
# The source tree is bind-mounted over /home/node/app by docker-compose.dev.yml;
# node_modules come from this image through anonymous volumes.
FROM deps AS dev

# Workspace node_modules are mounted as anonymous volumes; creating them here
# makes those volumes owned by `node` (Docker would otherwise create them as root).
RUN mkdir -p web/node_modules api/node_modules

# There is no browser in the container: stop vite from trying to open one.
ENV BROWSER=none

EXPOSE 8910

CMD ["yarn", "rw", "dev"]

# web build
# ---------
# The site has no prerendered routes, so the api side is not needed. If routes are
# ever marked `prerender`, this stage must build the api first (see Redwood's
# official `web_build_with_prerender` stage).
FROM deps AS web-build

COPY --chown=node:node redwood.toml ./
COPY --chown=node:node web web

RUN yarn rw build web --no-prerender

# web (production)
# ----------------
FROM nginxinc/nginx-unprivileged:1.30-alpine AS web

ARG VERSION=dev
ARG VCS_REF=unknown
ARG BUILD_DATE=unknown
ARG SOURCE_URL=""

# The base image's source/url/licenses/maintainer labels describe nginx, not
# this image, so they are overridden.
LABEL org.opencontainers.image.title="okwe-web" \
      org.opencontainers.image.description="Okwe website: static RedwoodJS web build served by nginx" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="${SOURCE_URL}" \
      org.opencontainers.image.url="" \
      org.opencontainers.image.licenses="" \
      maintainer=""

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# Site files are owned by root: the nginx user (101) can read but never modify them.
COPY --from=web-build --chown=0:0 /home/node/app/web/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
