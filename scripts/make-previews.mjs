#!/usr/bin/env node
// Light previews for the site's photographs: every JPEG/PNG in apps/main/public/media gets an AVIF copy, at most
// 960 px on the long side, in public/media/previews/<same path>.avif. Galleries, cards and portraits show the preview;
// the full file opens only in the full-screen viewer. Uses macOS `sips` (AVIF encoder built in), so run it on a Mac
// after adding photos: `pnpm media:previews`. Existing previews are kept unless the source is newer.
// The list of ready previews (previews.json) lets the sites offer a preview only where one exists.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../apps/main/public/media/', import.meta.url))
const out = join(root, 'previews')
const skip = new Set(['previews', 'thumbs', 'partners'])
const MAX = 960

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) { if (!skip.has(relative(root, path).split('/')[0])) yield* walk(path) }
    else if (/\.(jpe?g|png)$/i.test(name)) yield path
  }
}

const ready = []
let made = 0
for (const source of walk(root)) {
  const rel = relative(root, source)
  const target = join(out, rel.replace(/\.(jpe?g|png)$/i, '.avif'))
  if (!existsSync(target) || statSync(target).mtimeMs < statSync(source).mtimeMs) {
    mkdirSync(dirname(target), { recursive: true })
    try {
      execFileSync('sips', ['-s', 'format', 'avif', '-s', 'formatOptions', '60', '-Z', String(MAX), source, '--out', target], { stdio: 'ignore' })
      made++
    }
    catch { continue }
  }
  if (existsSync(target)) ready.push(`/media/${rel}`)
}
writeFileSync(join(out, 'previews.json'), JSON.stringify(ready.sort(), null, 0) + '\n')
console.log(`previews: ${made} made, ${ready.length} ready`)
