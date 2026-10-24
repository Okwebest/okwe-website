# syntax=docker/dockerfile:1
#
# Okwe — container images
#
# Targets:
#   dev   Next.js dev server (`npm run dev`), source bind-mounted by docker-compose.dev.yml
#   web   Production image: the static export (./out) served by unprivileged nginx on :8080
#
# Build via ./scripts/docker/build-push.sh (production) or ./scripts/docker/dev.sh (development).
#
# The Node stages run on the build machine's platform ($BUILDPLATFORM): their only
# output is ./out, which is plain HTML/JS/CSS. Only the final `web` stage uses the
# target platform, so an amd64 image builds natively on ARM machines, without QEMU.

# base
# ----
FROM --platform=$BUILDPLATFORM node:24-bookworm-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1 \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false

USER node
WORKDIR /home/node/app

# deps
# ----
FROM base AS deps

COPY --chown=node:node package.json package-lock.json ./

RUN --mount=type=cache,target=/home/node/.npm,uid=1000,gid=1000 \
    npm ci --no-audit

# dev
# ---
# The source tree is bind-mounted over /home/node/app by docker-compose.dev.yml;
# node_modules and .next come from anonymous volumes seeded from this image.
FROM deps AS dev

RUN mkdir -p .next

EXPOSE 8910

# -H 0.0.0.0 so the dev server is reachable from the host through the published port.
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

# web build
# ---------
# `npm run build` runs `next build` (static export to ./out) and then
# scripts/csp-hashes.mjs, which writes docker/nginx/security-headers.conf with the
# hashes of Next's inline bootstrap scripts. next/font downloads the brand fonts
# here, so this stage needs network access.
FROM deps AS web-build

# The git revision (passed by build-push.sh) seeds Next's build id, so building
# the same commit twice yields byte-identical output and CSP hashes.
ARG VCS_REF=unknown
ENV OKWE_BUILD_ID=${VCS_REF}

COPY --chown=node:node . .

RUN npm run build

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
      org.opencontainers.image.description="Okwe website: static Next.js export served by nginx" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="${SOURCE_URL}" \
      org.opencontainers.image.url="" \
      org.opencontainers.image.licenses="" \
      maintainer=""

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=web-build /home/node/app/docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
# Site files are owned by root: the nginx user (101) can read but never modify them.
COPY --from=web-build --chown=0:0 /home/node/app/out /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
