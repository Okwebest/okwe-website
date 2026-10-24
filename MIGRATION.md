# Migration: RedwoodJS 8.9 → Next.js 16

Date: 2026-10-23. Scope: the whole repository. The result is a single-package Next.js
application (App Router, static export) that installs with npm, builds and tests on Node 24.x,
and deploys through the unchanged nginx/Docker/SecretVM pipeline. RedwoodJS, Yarn, Prisma,
GraphQL/Apollo, Jest and Storybook are gone.

## 1. What the site is

Two routes — `/` (a one-page site of 14 sections) and `/contact` (the contact chapter alone) —
sharing a masthead, footer, custom cursor and a scroll engine that paints every scene through
`data-*` attributes and CSS variables. The contact form is client-only by design (it swaps to a
"Message received." panel; nothing is sent). The Redwood `api/` side was untouched scaffold
(an example Prisma model, an auth stub returning `true`, no SDL or services) that the web side
never called and that was never deployed. It has been removed.

## 2. Route and file mapping

| Redwood                                                                                               | Next.js                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web/src/Routes.tsx` (`/`, `/contact` in `<Set wrap={MainLayout}>`, `notfound`)                       | `src/app/(site)/page.tsx`, `src/app/(site)/contact/page.tsx`, `src/app/(site)/layout.tsx` (MainLayout), `src/app/not-found.tsx` (outside the group, as before) |
| `web/src/App.tsx` (`RedwoodProvider`, `RedwoodApolloProvider`, `FatalErrorBoundary`)                  | `src/app/layout.tsx` (metadata, fonts, theme bootstrap); `src/app/error.tsx` + `global-error.tsx`                                                              |
| `web/src/entry.client.tsx`, `web/src/index.html`                                                      | Handled by Next; `<head>` content lives in `layout.tsx` `metadata`/`viewport`                                                                                  |
| `web/src/pages/HomePage`, `ContactPage`                                                               | `src/app/(site)/page.tsx`, `(site)/contact/page.tsx`                                                                                                           |
| `web/src/pages/NotFoundPage`, `FatalErrorPage`                                                        | `src/components/StatusPage/StatusPage.tsx` used by `not-found.tsx`, `error.tsx`, `global-error.tsx`                                                            |
| `web/src/layouts/MainLayout`                                                                          | `src/components/MainLayout/MainLayout.tsx` (`'use client'`)                                                                                                    |
| `web/src/{components,hooks,lib,content,styles}`                                                       | `src/{components,hooks,lib,content,styles}` unchanged apart from the import alias (`src/*` → `@/*`) and `'use client'` where hooks are used                    |
| `web/public/*`                                                                                        | `public/*`                                                                                                                                                     |
| `web/src/index.css` + `web/config/tailwind.config.js` + `postcss.config.js`                           | `src/app/globals.css` (Tailwind v4 `@theme`) + `postcss.config.mjs`                                                                                            |
| `web/jest.config.js`, `jest.config.js`, `@redwoodjs/testing`                                          | `vitest.config.mts`, `vitest.setup.ts`, `@testing-library/react`                                                                                               |
| `*.stories.tsx` (empty scaffold stories)                                                              | Removed (no Storybook dependency)                                                                                                                              |
| `api/**`, `api/db/schema.prisma`, `scripts/seed.ts`, `graphql.config.js`, `redwood.toml`, `.redwood/` | Removed                                                                                                                                                        |
| `yarn.lock`, `.yarnrc.yml`, `packageManager`, workspaces                                              | `package-lock.json`, single root `package.json`, `.nvmrc` (24)                                                                                                 |

## 3. Redwood APIs and how they were replaced

| Redwood                                                                      | Replacement                                                                         | Notes                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@redwoodjs/router` `useLocation()` in `useScrollEngine`                     | `usePathname()` from `next/navigation`                                              | Same purpose (re-measure on route change)                                                                                                                                                                              |
| `useHashScroll` (waited for code-split sections before jumping to `#anchor`) | Deleted                                                                             | Every section is in the server-rendered HTML, so the browser's native anchor jump works; `next/link` scrolls to the hash on client-side navigation. Verified: `/contact` → `/#knows` lands with the 60px scroll margin |
| `<a href="/#…">` (full navigations)                                          | `next/link` in `Button`, `Masthead`, `Footer`, `CoreIdeaSection`, `ServicesSection` | Client-side navigation between `/` and `/contact`; `mailto:`/external stay `<a>`                                                                                                                                       |
| `RedwoodProvider titleTemplate`, `<title>`/`<meta>` in `index.html`          | `metadata` export in `layout.tsx` (+ per-page title on `/contact`)                  |                                                                                                                                                                                                                        |
| `FatalErrorBoundary` + `DevFatalErrorPage`                                   | `error.tsx` / `global-error.tsx`                                                    | Next shows its own overlay in development                                                                                                                                                                              |
| `RedwoodApolloProvider`, GraphQL handler, directives, Prisma client          | None                                                                                | Never used by the site                                                                                                                                                                                                 |
| Google Fonts `<link>` tags                                                   | `next/font/google` (Newsreader with `opsz`, Public Sans, IBM Plex Mono)             | Fonts are self-hosted at build time; the design tokens `--font-display/--font-sans/--font-mono` now resolve through next/font's variables with the original fallback stacks. Zero third-party requests at runtime      |
| Vite dev server on 8910                                                      | `next dev -p 8910` (Turbopack)                                                      | Port kept so docs, Docker and VS Code configs stay consistent                                                                                                                                                          |

## 4. Server rendering changes (new in Next)

Redwood rendered the site entirely in the browser; Next pre-renders every page to HTML. Three
places read browser state during the first render and would have caused hydration mismatches:

- `useMediaQuery` (and so `useNarrow`, `useReducedMotion`) now uses `useSyncExternalStore` with a
  server snapshot, so the server and the first client render agree and the real value applies
  right after hydration.
- `useColorMode` is now a small external store (also `useSyncExternalStore`). The server renders
  "light"; `public/theme-init.js`, a plain blocking script in `<head>`, applies the stored or
  system preference to `<html data-theme>` before the first paint, so dark-mode visitors see no
  flash (verified: the attribute is present before hydration and the toggle label matches after
  reload). `suppressHydrationWarning` is set on `<html>` for that attribute only.
- `DotField` updated a ref during render; the update moved into an effect (React 19 lint rule).

Components that use hooks carry `'use client'`. Pure-markup components (`Eyebrow`, `Field`,
`OkweRow`, `ImageSlot`, `Input`, `Select`, `HubDiagram`, `Footer`, `StatusPage`) render on the
server.

## 5. Styles: Tailwind v3 → v4

`web/config/tailwind.config.js` became an `@theme` block in `src/app/globals.css`: colour scales
as hex (so `/[.18]` opacity modifiers keep working), mode-dependent aliases as `var(--…)`, the
`wide` (860px) breakpoint, the `gutter` spacing and the `label`/`eyebrow`/`tight` tracking
values. Preflight is still not imported: `tokens/base.css` remains the reset and `site.css` keeps
the one border rule the width utilities need. `tailwindcss/nesting` and `autoprefixer` are built
into `@tailwindcss/postcss`.

## 6. Dependencies

### Removed

| Package                                                                                                                    | Reason                                               |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `@redwoodjs/core`, `project-config`, `web`, `router`, `forms`, `vite`, `api`, `graphql-server`, `eslint-config`, `testing` | Framework being replaced; pinned to Node 20 and Yarn |
| `@prisma/client` / Prisma CLI (transitive), SQLite `DATABASE_URL`                                                          | Scaffold model only, never queried                   |
| Apollo Client, GraphQL Yoga, `graphql-tag` (transitive)                                                                    | No GraphQL in the site                               |
| `lucide-react`                                                                                                             | Declared but never imported                          |
| `postcss-loader`, `autoprefixer`, `tailwindcss@3`                                                                          | Webpack-era / replaced by `@tailwindcss/postcss` v4  |
| Jest + Babel toolchain (transitive via Redwood), `@storybook/react` (transitive)                                           | Replaced by Vitest; stories were empty scaffolds     |
| Yarn 4 (`packageManager`, `.yarnrc.yml`, `yarn.lock`, verdaccio `resolutions`)                                             | npm (bundled with Node 24)                           |

### Added (exact versions pinned)

| Package                                           | Version                        | Role                                                                                                                                                                                       |
| ------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `next`                                            | 16.4.2                         | Framework (engines `node >=20.9`)                                                                                                                                                          |
| `react`, `react-dom`                              | 19.3.1                         |                                                                                                                                                                                            |
| `typescript`                                      | 5.9.3                          | Pinned to 5.x; TypeScript 7 (the Go compiler) is not what `next build` validates against                                                                                                   |
| `tailwindcss`, `@tailwindcss/postcss`             | 4.3.3                          |                                                                                                                                                                                            |
| `eslint`                                          | 9.39.5                         | `eslint-config-next` 16.4.2 accepts ESLint 10, but its bundled plugins (`eslint-plugin-import`, `jsx-a11y`, `react`) declare peers up to 9; 9.x keeps the install free of overridden peers |
| `eslint-config-next`                              | 16.4.2                         | core-web-vitals + typescript flat config                                                                                                                                                   |
| `vitest`, `vite`, `@vitejs/plugin-react`, `jsdom` | 5.0.5 / 8.3.5 / 6.1.2 / 30.1.3 | Test runner                                                                                                                                                                                |
| `@testing-library/react`, `dom`, `jest-dom`       | 16.3.3 / 10.4.2 / 7.0.1        | Component tests                                                                                                                                                                            |
| `prettier`, `prettier-plugin-tailwindcss`         | 3.9.10 / 0.8.1                 | Formatting (plugin configured for the v4 stylesheet)                                                                                                                                       |
| `@types/node`, `@types/react`, `@types/react-dom` | 24.19.2 / 19.3.0 / 19.3.0      |                                                                                                                                                                                            |

## 7. Security audit

`npm audit` on 2026-10-23 after a clean install:

| Scope                                            | Result                                                  |
| ------------------------------------------------ | ------------------------------------------------------- |
| Production dependencies (`npm audit --omit=dev`) | 0 vulnerabilities                                       |
| All dependencies                                 | 5 "high" findings, all the same advisory on one package |

The finding is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
(`braces` ≤ 3.0.3, stack exhaustion on deeply nested glob patterns), reached only through
`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`.

- It is a lint-time, dev-only dependency: nothing from that chain is in the shipped bundle.
- No patched `braces` release exists (the advisory covers every version), so there is nothing
  to override to. npm's only "fix" is downgrading `eslint-config-next` to 14.x, which is worse.
- Exploitation requires feeding attacker-controlled glob patterns to ESLint's file matcher,
  which does not happen in this project's workflows.

Action: re-run `npm audit` on each dependency update and remove the note once `braces` ships a
fix or Next drops `fast-glob`. `npm run audit` (`--audit-level=high`) is wired for CI; use
`npm audit --omit=dev` as the gate for the production image until then.

Other hardening kept or improved:

- The strict Content-Security-Policy is preserved. Next's static HTML contains inline bootstrap
  scripts; `scripts/csp-hashes.mjs` hashes them after each build into the nginx snippet, so
  `script-src` is `'self'` plus SHA-256 hashes, never `'unsafe-inline'`. `generateBuildId` is
  derived from the git revision so the same commit always yields identical HTML and hashes
  (verified: two consecutive builds produced byte-identical `out/` and header files).
- Fonts are self-hosted, so the Google Fonts origins were removed from `style-src`/`font-src`.
- nginx still runs unprivileged on a read-only filesystem; unknown paths now return a real 404
  status with Next's 404 page.

## 8. Validation performed

| Check                                         | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci` on Node 24.21.0 / npm 11.19          | Clean (no peer overrides)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `npm run typecheck` (`tsc --noEmit`, strict)  | Pass                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `npm run lint`                                | Pass, 0 errors / 0 warnings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `npm test`                                    | 7 files, 23 tests pass                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `npm run build`                               | Static export: `/`, `/contact`, `/_not-found`; CSP snippet generated                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Two consecutive builds                        | Byte-identical `out/` and CSP hashes                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Headless Chrome 155 against `npm run preview` | Scroll engine (`--p`, `--pg`, route drawing, readout, masthead tone and active nav), FAQ accordion, dark/light toggle with persistence and no pre-paint flash, no hydration warnings, `/contact` form → success panel → "Back to home", `/contact` → `/#knows` and "Request a quote" → `/#contact` land on the section, 404 page without chrome and with a 404 status, narrow viewport (stacked Move chapter, quote button hidden), reduced motion (static origin pulse), fonts loaded, zero third-party requests |

## 9. Known limitations

- **Narrow-viewport first paint.** Sections that branch on `useNarrow()` render the wide variant
  in the static HTML and switch to the narrow variant right after hydration. On phones this is a
  brief layout change on first load (no error, no hydration warning). Removing it would mean
  restructuring those sections to be CSS-only.
- **Docker images were not built here.** Docker is not installed on the machine used for the
  migration. The `Dockerfile`, compose files, nginx config and helper scripts were updated and
  reviewed, but the first `./scripts/docker/build-push.sh <version> --build-only` and
  `./scripts/docker/prod.sh smoke` should be run on a machine with Docker before releasing.
- **Build needs network** for `next/font` to download the font files (as the Redwood build needed
  it for Yarn). `npm ci` and the font download are the only network steps.
- **Storybook stories removed.** They were the generated `Primary` placeholders with no content.
  Storybook 9 for Next.js can be added if visual isolation is wanted.
- **No backend.** As before. The branded enquiry form posts straight into Okwe's Google Form
  (`connect-src https://docs.google.com` in the CSP template); the earlier browser-only form that
  discarded submissions was replaced after the migration. See the README's _Content_ section for everything added after the
  migration (contact channels, legal pages, responsive photos, customer-first copy).
- **`braces` advisory** (dev-only) remains open upstream; see §7.
