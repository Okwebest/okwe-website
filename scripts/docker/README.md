# Okwe: Docker

The Okwe site is a Next.js app exported to static files (`out/`). In production there's
nothing to run but a web server. So there's one image, `okwe-web`: Node 24 builds the site,
and unprivileged nginx serves it on port 8080. That same image runs in both production and
SecretVM, pinned by digest.

| Environment                                | Compose file                  | Script          |
| ------------------------------------------ | ----------------------------- | --------------- |
| Development (hot reload)                   | `docker-compose.dev.yml`      | `dev.sh`        |
| Production, any Docker host (TLS upstream) | `docker-compose.prod.yml`     | `prod.sh`       |
| SecretVM, https://okwebest.com             | `docker-compose.secretvm.yml` | `secretvm.sh`   |
| Build, push and pin a release              | —                             | `build-push.sh` |

Requirements: Docker with Compose v2 and Buildx (Docker Desktop includes both), plus `curl`.

## Configuration

Every setting has a default, so no configuration is needed. To change one:

```bash
cp scripts/docker/.env.example scripts/docker/.env   # git-ignored
```

| Variable          | Default        | Purpose                                |
| ----------------- | -------------- | -------------------------------------- |
| `REGISTRY`        | `docker.io`    | Registry to push to                    |
| `IMAGE_NAMESPACE` | `privexlabs`   | Docker Hub org/user, or GHCR owner     |
| `IMAGE_NAME`      | `okwe-web`     | Image name                             |
| `PLATFORM`        | `linux/amd64`  | Target platform (SecretVM is amd64)    |
| `OKWE_DEV_PORT`   | `8910`         | Host port for the dev server           |
| `OKWE_PROD_PORT`  | `8080`         | Host port for the production container |
| `SECRETVM_DOMAIN` | `okwebest.com` | Domain checked by `secretvm.sh verify` |

Variables set in your shell override the file, for example `OKWE_DEV_PORT=8913 ./scripts/docker/dev.sh up`.

## Development

```bash
./scripts/docker/dev.sh up        # http://localhost:8910, edits hot-reload
./scripts/docker/dev.sh logs
./scripts/docker/dev.sh run npm test
./scripts/docker/dev.sh run npm run lint
./scripts/docker/dev.sh shell
./scripts/docker/dev.sh down
```

Your working copy is mounted into the container. `node_modules` and `.next` stay inside the
container, because macOS and Linux binaries differ. Every `up` rebuilds them from
`package-lock.json`, so dependency changes are picked up automatically.

## Releasing

```bash
docker login                                          # once, for $REGISTRY
./scripts/docker/build-push.sh 0.1.0 --build-only     # optional: build and test first
OKWE_WEB_IMAGE=docker.io/privexlabs/okwe-web:0.1.0 OKWE_PROD_PORT=8080 ./scripts/docker/prod.sh up
./scripts/docker/prod.sh smoke
./scripts/docker/prod.sh down

./scripts/docker/build-push.sh 0.1.0                  # build, push, pin the digest
git add docker-compose.prod.yml docker-compose.secretvm.yml
git commit -m "Release okwe-web 0.1.0"
```

`build-push.sh`:

- builds for `linux/amd64` without provenance or SBOM attestations, because SecretVM rejects them
- tags `:<version>`, and also `:latest` unless the version is a prerelease such as `0.2.0-rc.1`
- pushes both tags
- reads the digest back from the registry
- pins that digest in both deployment compose files

It won't push from a working tree with uncommitted changes, or over a version that's
already in the registry, unless you pass `--force`. If a push fails partway, for example on
a registry timeout, rerun it with `--push-only`.

### Production (any Docker host)

Copy `docker-compose.prod.yml` to the host, or check out the repo there, then run:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d      # or: ./scripts/docker/prod.sh up
```

The container serves plain HTTP on `OKWE_PROD_PORT`. Put your TLS proxy or load balancer in
front of it and set HSTS there. The health endpoint is `/healthz`.

### SecretVM

```bash
./scripts/docker/secretvm.sh show     # validates and prints the compose file for the portal
./scripts/docker/secretvm.sh verify   # smoke-tests https://okwebest.com after deploying
./scripts/docker/secretvm.sh verify https://<vm-name>.vm.scrtlabs.com   # before the domain is live
```

Upload `docker-compose.secretvm.yml` in the SecretVM portal. No env file is needed. Traefik
terminates TLS with the certificate SecretVM places in `/mnt/secure/cert`, redirects HTTP to
HTTPS, and adds HSTS.

First launch only:

1. In the portal, enter `okwebest.com` in the **Custom Domain** box.
2. In DNS, add an A record pointing `okwebest.com` at the VM's IP (shown on the Network tab).
3. In DNS, add the **CNAME Challenge** record printed in the VM logs, which ZeroSSL uses to validate the domain.

Routing is catch-all, so the site answers on any hostname that reaches the VM. That
includes the VM's own `*.vm.scrtlabs.com` name, which is handy before `okwebest.com` is
live. TLS only works for names the certificate covers: `www.okwebest.com` would reach the
site but fail the TLS check unless the certificate includes `www`.

### Rollback

Put the previous release's digest back into the compose files, either with
`git revert` of the release commit or by editing the `@sha256:` line. Then redeploy:
`pull && up -d` on the production host, or re-upload the file in the SecretVM portal.

## What's in the image

- `Dockerfile` target `web`: `npm run build` (Next.js static export plus the generated CSP
  snippet), with the output in `nginxinc/nginx-unprivileged:1.30-alpine`. The git revision is
  passed in as `VCS_REF` and seeds Next's build id, so a commit always builds the same files.
- The image runs as uid 101 and works on a read-only root filesystem (only `/tmp` is written).
- It has a built-in `HEALTHCHECK`.
- `docker/nginx/default.conf` handles:
  - static-export routing (`/contact` → `contact.html`, unknown paths → `404.html` with a 404)
  - `/_next/static/*` cached as immutable
  - HTML and RSC payloads (`*.txt`) sent with `no-cache`
  - gzip
  - `/healthz`
- `docker/nginx/default.conf` caches `/_next/static/` and the content-hashed photos under
  `/okwe-image/` for a year (immutable) and serves HTML with `no-cache`.
- `docker/nginx/security-headers.conf.tmpl` sets the CSP, `nosniff`, frame denial, the referrer
  policy and the permissions policy. `scripts/csp-hashes.mjs` (run by `npm run build`) fills in
  the SHA-256 hashes of Next's inline bootstrap scripts, so `script-src` never needs
  `'unsafe-inline'`. Fonts are self-hosted, so no third-party origin is allowed; if the site
  starts loading one (analytics, maps), add that origin to the template.

The site has no backend. If one is added later, run it as its own container and add an nginx
`location /api/` that proxies to it (or move to Next's Node server with `output: 'standalone'`).

## Troubleshooting

- **"Docker daemon is not running"**: start Docker Desktop.
- **Port already in use**: set `OKWE_DEV_PORT` or `OKWE_PROD_PORT`.
- **Push denied**: run `docker login $REGISTRY` with an account that can push to `$IMAGE_NAMESPACE`.
- **Page is blank in the browser**: open the console and look for CSP violations. `prod.sh smoke` checks the headers and assets. A CSP violation on an inline script means `docker/nginx/security-headers.conf` was not regenerated for this build: rebuild the image (never copy the snippet from another build).
