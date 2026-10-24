#!/usr/bin/env node
/**
 * Serves the static export (./out) the way nginx does in production:
 * `/contact` → contact.html, `/` → index.html, unknown paths → 404.html.
 * Cache-Control mirrors nginx (immutable for hashed assets) so repeat-visit
 * behaviour can be checked locally. No TLS, no security headers.
 *
 *   npm run build && npm run preview          # http://localhost:8080
 *   PORT=3001 npm run preview
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../out'
)
const port = Number(process.env.PORT || 8080)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

async function isFile(file) {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}

async function resolve(urlPath) {
  const clean =
    decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/'
  const safe = path.normalize(clean).replace(/^(\.\.[/\\])+/, '')
  const base = path.join(root, safe)
  if (!base.startsWith(root)) return null
  // nginx: try_files $uri $uri.html $uri/index.html =404
  for (const candidate of [
    base,
    `${base}.html`,
    path.join(base, 'index.html'),
  ]) {
    if (await isFile(candidate)) return { file: candidate, status: 200 }
  }
  return { file: path.join(root, '404.html'), status: 404 }
}

createServer(async (req, res) => {
  const hit = await resolve(req.url || '/')
  if (!hit || !(await isFile(hit.file))) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
    return
  }
  const rel = path.relative(root, hit.file).split(path.sep).join('/')
  const immutable =
    rel.startsWith('_next/static/') ||
    /^okwe-image\/.+\.[0-9a-f]{8}\.\d+\.(avif|webp|jpg)$/.test(rel)
  res.writeHead(hit.status, {
    'content-type': TYPES[path.extname(hit.file)] || 'application/octet-stream',
    'cache-control': immutable
      ? 'public, max-age=31536000, immutable'
      : 'no-cache',
  })
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  createReadStream(hit.file).pipe(res)
}).listen(port, () => {
  console.log(`preview: serving ${root} on http://localhost:${port}`)
})
