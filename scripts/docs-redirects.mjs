#!/usr/bin/env node
// When the exhibition site moves to its own address, the old addresses symbol.ngo/documentsart/… keep working: for
// every page of the built exhibition site this writes a small page at the same path in the main site that sends the
// visitor (and search engines) to the same page on the new address, with the query and #anchor kept. GitHub Pages cannot
// answer with a 301, so each page has a canonical to the new address, noindex and an instant refresh — the form search
// engines treat as a permanent move. A Cloudflare redirect rule can replace this later (deployment.md §4a).
// Usage: node scripts/docs-redirects.mjs <exhibition output dir> <main output dir>/documentsart <new address>
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'

const [from, to, site] = process.argv.slice(2)
if (!from || !to || !/^https:\/\/[^/]+$/.test(site ?? '')) {
  console.error('usage: node scripts/docs-redirects.mjs <exhibition output> <main output>/documentsart https://documentsart.symbol.ngo')
  process.exit(1)
}
const pages = []
const walk = dir => { for (const name of readdirSync(dir)) { const path = join(dir, name); if (statSync(path).isDirectory()) { if (name !== 'media' && name !== '_nuxt') walk(path) } else if (name === 'index.html') pages.push(path) } }
walk(from)
const escape = text => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
for (const page of pages) {
  const path = relative(from, dirname(page)).split(sep).filter(Boolean).join('/')
  const target = `${site}/${path ? `${path}/` : ''}`
  const html = `<!doctype html>
<html lang="uk"><head><meta charset="utf-8">
<title>Покажіть свої документи… — сайт переїхав</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(target)}">
<meta http-equiv="refresh" content="0; url=${escape(target)}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><p>Сайт виставки тепер тут: <a href="${escape(target)}">${escape(target)}</a></p></body></html>
`
  const out = join(to, path, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}
console.log(`docs-redirects: ${pages.length} pages of ${to} now lead to ${site}`)
