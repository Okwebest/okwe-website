#!/usr/bin/env node
/**
 * Generates docker/nginx/security-headers.conf from its .tmpl by hashing every
 * inline <script> in the static export (./out), so nginx can ship a strict
 * Content-Security-Policy (script-src 'self' + hashes, no 'unsafe-inline').
 *
 * Runs after `next build` as part of `npm run build`. Fails when the export is
 * missing or contains no inline scripts, because that would mean the policy
 * and the HTML have drifted apart.
 */
import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'out')
const templatePath = path.join(root, 'docker/nginx/security-headers.conf.tmpl')
const targetPath = path.join(root, 'docker/nginx/security-headers.conf')

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return htmlFiles(full)
      return entry.name.endsWith('.html') ? [full] : []
    })
  )
  return files.flat()
}

// Inline scripts only: a <script> with a src attribute has no body to hash.
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi

export async function collectHashes() {
  const files = await htmlFiles(outDir).catch(() => {
    throw new Error(
      `No static export found at ${outDir}. Run \`next build\` first.`
    )
  })
  const hashes = new Set()
  let inlineCount = 0
  for (const file of files) {
    const html = await readFile(file, 'utf8')
    for (const match of html.matchAll(INLINE_SCRIPT)) {
      const body = match[1]
      // JSON data blocks (type="application/json") are not executed and need no hash.
      if (/type\s*=\s*["']application\/(ld\+)?json["']/i.test(match[0]))
        continue
      if (body.trim() === '') continue
      inlineCount += 1
      hashes.add(
        `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
      )
    }
  }
  return { files: files.length, inlineCount, hashes: [...hashes].sort() }
}

async function main() {
  const { files, inlineCount, hashes } = await collectHashes()
  if (files === 0) throw new Error(`No HTML files in ${outDir}.`)
  if (hashes.length === 0) {
    throw new Error(
      'No inline scripts found in the export. If Next.js stopped emitting them, drop __SCRIPT_HASHES__ from the template; otherwise the build output is incomplete.'
    )
  }
  const template = await readFile(templatePath, 'utf8')
  if (!template.includes('__SCRIPT_HASHES__')) {
    throw new Error(`${templatePath} has no __SCRIPT_HASHES__ placeholder.`)
  }
  const conf = template.replaceAll('__SCRIPT_HASHES__', hashes.join(' '))
  if (!/add_header Content-Security-Policy "[^"]*'sha256-/.test(conf)) {
    throw new Error(
      'The generated Content-Security-Policy header carries no script hashes.'
    )
  }
  await writeFile(targetPath, conf)
  console.log(
    `csp-hashes: ${hashes.length} unique hash(es) from ${inlineCount} inline script(s) in ${files} HTML file(s) → ${path.relative(root, targetPath)}`
  )
}

main().catch((error) => {
  console.error(`csp-hashes: ${error.message}`)
  process.exit(1)
})
