import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

import type { NextConfig } from 'next'

/**
 * A deterministic build id. Next.js otherwise generates a random one per build
 * and embeds it in the static HTML, which would change the inline bootstrap
 * scripts (and so the CSP hashes in docker/nginx/security-headers.conf) on
 * every build of the same source. Chunk file names are content-hashed and the
 * HTML is served with no-cache, so reusing an id across deploys is safe.
 *
 * Precedence: OKWE_BUILD_ID (set from the git revision by the Docker build) →
 * the local git revision → a hash of the lockfile.
 */
function buildId(): string {
  if (process.env.OKWE_BUILD_ID) return process.env.OKWE_BUILD_ID
  try {
    return execSync('git rev-parse --short=12 HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
  } catch {
    return createHash('sha256')
      .update(readFileSync('package-lock.json'))
      .digest('hex')
      .slice(0, 12)
  }
}

const nextConfig: NextConfig = {
  // The site is fully static: `next build` writes plain HTML/JS/CSS to ./out,
  // which nginx serves (see Dockerfile and docker/nginx/default.conf).
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  generateBuildId: async () => buildId(),
  images: {
    // next/image optimisation needs a server; the site uses plain <img>.
    unoptimized: true,
  },
}

export default nextConfig
