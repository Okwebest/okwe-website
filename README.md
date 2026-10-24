# Okwe website

The marketing site for Okwe Import Export Solutions — _Know. Connect. Move._ — built with
[Next.js](https://nextjs.org) (App Router, static export), React 19, TypeScript and Tailwind CSS v4.

The site is fully static: `npm run build` writes plain HTML, JS and CSS to `out/`, which is served
by nginx in production (Docker, SecretVM). There is no server runtime and no database.

## Prerequisites

| Tool    | Version                                        |
| ------- | ---------------------------------------------- |
| Node.js | 24.x (see `.nvmrc`; `engines` requires `>=24`) |
| npm     | 10 or newer (bundled with Node 24)             |

No Yarn, no corepack, no global CLI. Docker is only needed for the container workflows in
[scripts/docker/README.md](scripts/docker/README.md).

## Install

```bash
npm ci          # reproducible install from package-lock.json
```

`npm install` also works but may update the lockfile; use `npm ci` in CI and Docker.

## Environment variables

None are required. `.env.example` documents the convention (`NEXT_PUBLIC_*` variables are exposed
to the browser bundle; everything else is build-time only). Copy it to `.env.local` if you add any.

## Development

```bash
npm run dev     # http://localhost:8910 with hot reload (Turbopack)
```

The dev port is 8910 to match the project's existing docs and Docker setup. Pass another port with
`npm run dev -- -p 3000`.

## Scripts

| Command                           | What it does                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`                     | Dev server on port 8910                                                             |
| `npm run build`                   | Production static export to `out/`, then generates the nginx CSP snippet            |
| `npm run preview`                 | Serves `out/` on http://localhost:8080 the way nginx routes it (`PORT=…` to change) |
| `npm run images`                  | Regenerates the responsive photo set in `public/okwe-image/` from `assets/images/`  |
| `npm run lint`                    | ESLint (Next.js core-web-vitals + TypeScript rules, React 19 hooks rules)           |
| `npm run typecheck`               | `tsc --noEmit`                                                                      |
| `npm test`                        | Vitest (jsdom + Testing Library), single run                                        |
| `npm run test:watch`              | Vitest in watch mode                                                                |
| `npm run format` / `format:check` | Prettier (with the Tailwind class sorter)                                           |
| `npm run audit`                   | `npm audit` failing on high/critical advisories                                     |
| `npm run check`                   | typecheck + lint + test + build, in that order                                      |

## Project layout

```
src/app/                 Next.js App Router
  layout.tsx             <html>/<body>, metadata, self-hosted fonts, theme bootstrap
  globals.css            design-system tokens + site rules + Tailwind v4 theme
  (site)/layout.tsx      masthead, footer, cursor and scroll engine (MainLayout)
  (site)/page.tsx        /         the one-page site (14 sections)
  (site)/contact/        /contact  the contact chapter on its own
  (site)/legal/[slug]/   /legal/privacy, /legal/terms, /legal/dpa, /legal/disclaimer
  not-found.tsx          404 page (rendered without the site chrome)
  error.tsx, global-error.tsx      error boundaries
src/components/          sections/, ui/ primitives, LegalPage, Masthead, Footer, RouteMap, …
src/hooks/               useScrollEngine, useColorMode, useNarrow, useClock, …
src/lib/                 pure geometry/scroll maths (unit-tested)
src/content/site.ts      every string the site shows (copy, contact details, form URL)
src/content/legal.ts     the four legal documents
src/content/images.ts    GENERATED photo manifest (npm run images)
assets/images/           source photographs (not shipped; input to npm run images)
src/styles/              design-system token CSS (verbatim) and site.css
public/                  okwe-image/ (generated AVIF/WebP/JPEG + favicon), robots.txt, theme-init.js
docker/nginx/            nginx config + CSP template for the production image
scripts/                 csp-hashes.mjs, preview.mjs, docker/ helpers
```

## Testing

```bash
npm test
```

Tests live next to the code (`*.test.ts(x)`) and run in jsdom with Testing Library. They cover the
scroll/geometry maths, the enquiry form (what it posts to the Google Form, the failure path, the
honeypot), the contact channels, the responsive image component, the masthead's phone menu, the
layout chrome (nav, footer links), every page including the four legal documents, and the 404 page.

## Content

Everything a visitor reads lives in two files, so copy never has to be hunted through components:

- `src/content/site.ts` — every section's text, the masthead/footer links, and the contact details:
  email, phone (`+234 810 797 3645`), the WhatsApp link (`wa.me/2348107973645`) and the enquiry
  form's wiring (see below). Change a number here and it updates everywhere.
  The copy is written for the customer: name the frustration, then what Okwe does about it. Keep
  the array lengths (six Knows items, six Coms labels, six Move stops, five steps, four quadrants,
  thirteen promise words) because the layouts and reveal windows depend on them.
- `src/content/legal.ts` — the Privacy Policy, Terms of Use, Data Processing Agreement and
  Disclaimer served at `/legal/<slug>`. They are drafts written for a Lagos business under the
  Nigeria Data Protection Act 2023 using only facts known about Okwe; **have them reviewed by
  counsel** and bump `legalEffectiveDate` whenever the text changes.

### The enquiry form

The Contact page shows an Okwe-styled form; nothing from Google is visible. On submit it posts the
answers straight into the Okwe Google Form's `formResponse` endpoint, so they appear in the form's
responses sheet next to any other submission. The mapping lives in `contact.form` in
`src/content/site.ts`: `action`, `viewUrl`, the six `entry.*` field ids and the service options
(Okwe wording as the label, the exact Google option text as the value).

Google sends no CORS headers, so the browser posts with `mode: 'no-cors'` and cannot read the
reply: a completed request shows "Message received.", a network failure keeps the visitor's text on
screen with WhatsApp and the hosted form as fallbacks. A hidden honeypot field drops bots silently.

If the Google Form is edited (a question added, removed or its options changed), refresh the ids:
open the form's `viewform` URL, view the page source, find `FB_PUBLIC_LOAD_DATA_` and read each
question's `entry` number and option strings, then update `contact.form.fields` and
`contact.form.services`. The test in `EnquiryForm.test.tsx` checks the body that is sent.

### Licensing statement

Okwe is obtaining its own import/export licence and currently delivers the regulated steps through
licensed partners. That is stated in the Disclaimer (§·02), in the FAQ (Q·06) and in the Move
chapter; update all three when the licence is granted.

### Photographs

Source photos live in `assets/images/` (full-resolution JPEGs). They are never served directly.
`npm run images` (uses `sharp`, a dev dependency) writes AVIF, WebP and progressive JPEG versions at
640/960/1280/1920 px into `public/okwe-image/` with a content hash in the file name, and regenerates
`src/content/images.ts`. `ImageSlot` renders them as a `<picture>` with `srcset`/`sizes`, lazy
loading and explicit dimensions, so a page view downloads one small AVIF per photo (roughly 25–240 KB
depending on the slot and screen) instead of the 3–4 MB originals, and nothing shifts while it loads.
nginx (and `npm run preview`) serve `/okwe-image/*` with a one-year immutable cache, so repeat
visits never re-download a photo. To add or replace a photo: drop the file in `assets/images/`, add
its key and alt text to the `PHOTOS` table in `scripts/optimize-images.mjs`, run `npm run images`,
reference `images.<key>` from `src/content/site.ts`, and commit the generated files.

## Production build

```bash
npm run build      # → out/ and docker/nginx/security-headers.conf
npm run preview    # optional local check at http://localhost:8080
```

`next build` produces the static export. `scripts/csp-hashes.mjs` then hashes the small inline
bootstrap scripts Next emits and writes `docker/nginx/security-headers.conf` from its `.tmpl`, so
the production Content-Security-Policy stays strict (`script-src 'self' 'sha256-…'`, no
`unsafe-inline`). The generated file is git-ignored; edit the template instead. The policy allows
exactly one third-party origin, `connect-src 'self' https://docs.google.com`, so the enquiry form
can post into the Google Form; the site frames nothing and may not be framed by anyone.

`next/font` downloads the three brand families (Newsreader, Public Sans, IBM Plex Mono) during the
build and self-hosts them, so the build machine needs network access and the site makes no
third-party requests at runtime.

## Deployment

Production is a single nginx image (`okwe-web`) built from the `Dockerfile`, serving `out/` on port
8080 behind your TLS terminator (Traefik on SecretVM). See
[scripts/docker/README.md](scripts/docker/README.md) for development in Docker, releasing, the
production compose file and the SecretVM deployment at https://okwebest.com.

```bash
./scripts/docker/dev.sh up                 # development with hot reload
./scripts/docker/build-push.sh <version>   # build, push and pin a release
```

Any static host also works: upload the contents of `out/` and configure it to serve `/contact` →
`contact.html`, `/legal/privacy` → `legal/privacy.html` (and so on) and unknown paths → `404.html`.

## Migration notes

This project was migrated from RedwoodJS. See [MIGRATION.md](MIGRATION.md) for the mapping of
files, the dependency and security audit, and the known limitations.
