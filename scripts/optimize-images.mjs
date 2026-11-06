#!/usr/bin/env node
// Image pipeline for the sites (ADR-0010). Photographs in the managed folders are kept as ONE web master (JPEG, long
// side <= 2000 px, no metadata) next to AVIF variants at several widths in a sibling `_opt/` folder. A manifest
// (apps/main/app/data/images.json) records width, height, average colour and variant widths for every photograph, a
// lock file records the hash of each master, so the check can tell a processed photograph from a raw one.
//
//   node scripts/optimize-images.mjs optimize [path ...]   process new/changed photographs (default: whole tree)
//   node scripts/optimize-images.mjs check                 fail when anything is raw, oversized, stale or unreferenced
//
// Wrapped by `pnpm images:optimize [path]` and `pnpm images:check` (part of `pnpm check`; `pnpm task:save` runs the
// optimizer for you). Everything is deterministic: the same input always gives the same output.
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const rel = p => relative(root, p).split(sep).join('/')

// ---- policy ---------------------------------------------------------------------------------------------------
// Managed photograph roots. `url` is the public URL prefix; the variants of /media/a/b.jpg live in /media/_opt/a/b-<w>.avif.
const PHOTO_ROOTS = [
  { dir: 'apps/main/public/media', url: '/media', skip: ['_opt', 'partners'] },
  { dir: 'apps/documents/public/works', url: '/works', skip: ['_opt'] }
]
// Graphics (logos with transparency): PNG/SVG, lossless re-encode only, checked against a size budget.
const GRAPHIC_DIRS = ['apps/main/public/media/partners', 'apps/main/public/press-kit']
const MAX_SIDE = 1600 // master long side
const TARGET_BYTES = 220 * 1024 // the optimizer lowers quality until the master fits
const MAX_BYTES = 400 * 1024 // hard budget enforced by the check
const GRAPHIC_MAX_BYTES = 250 * 1024
const VARIANT_WIDTHS = [480, 960, 1600]
const JPEG_QUALITIES = [72, 66, 60, 55, 50]
const AVIF = { quality: 42, effort: 4 }
const MANIFEST = join(root, 'apps/main/app/data/images.json')
const LOCK = join(root, 'apps/main/app/data/images.lock.json')
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic'])
const NAME_OK = /^[a-z0-9][a-z0-9._-]*$/

// ---- helpers --------------------------------------------------------------------------------------------------
const SKIP_DIRS = new Set(['node_modules', '.nuxt', '.output', 'dist', '.data'])
function* walk(dir) {
  if (!existsSync(dir)) return
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const path = join(dir, name)
    let isDir
    try { isDir = statSync(path).isDirectory() } catch { continue }
    if (isDir) yield* walk(path)
    else yield path
  }
}
// existsSync is case-insensitive on macOS/Windows; manifest keys must match the real file name exactly.
const existsExact = p => existsSync(p) && readdirSync(dirname(p)).includes(basename(p))
const hashOf = buf => createHash('sha1').update(buf).digest('hex').slice(0, 12)
const readJson = (path, fallback) => (existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback)
function writeJson(path, data) {
  const sorted = Object.fromEntries(Object.entries(data).sort(([a], [b]) => (a < b ? -1 : 1)))
  const body = '{\n' + Object.entries(sorted).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(',\n') + '\n}\n'
  writeFileSync(path, body)
}
function rootOf(file) {
  const r = rel(file)
  for (const pr of PHOTO_ROOTS) {
    if (r.startsWith(pr.dir + '/')) {
      const inner = r.slice(pr.dir.length + 1)
      if (pr.skip.includes(inner.split('/')[0])) return null
      return { ...pr, inner }
    }
  }
  return null
}
const srcOf = (pr, inner) => `${pr.url}/${inner}`
const variantPath = (pr, inner, w) => join(root, pr.dir, '_opt', inner.replace(/\.[^.]+$/, '') + `-${w}.avif`)
export function variantWidths(width) {
  const set = new Set(VARIANT_WIDTHS.filter(w => w < width))
  set.add(Math.min(width, VARIANT_WIDTHS.at(-1)))
  return [...set].sort((a, b) => a - b)
}
const kb = n => `${(n / 1024).toFixed(0)} KB`

async function masterBuffer(input) {
  const base = () => sharp(input, { failOn: 'none' }).rotate().resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true }).toColourspace('srgb')
  let out
  for (const quality of JPEG_QUALITIES) {
    out = await base().jpeg({ quality, mozjpeg: true }).toBuffer()
    if (out.length <= TARGET_BYTES) break
  }
  return out
}

async function writeVariants(pr, inner, master) {
  const meta = await sharp(master).metadata()
  const widths = variantWidths(meta.width)
  const stale = join(root, pr.dir, '_opt', dirname(inner))
  const stem = basename(inner).replace(/\.[^.]+$/, '')
  if (existsSync(stale)) for (const f of readdirSync(stale)) if (f.startsWith(stem + '-') && /^-\d+\.avif$/.test(f.slice(stem.length))) rmSync(join(stale, f))
  for (const w of widths) {
    const target = variantPath(pr, inner, w)
    mkdirSync(dirname(target), { recursive: true })
    await sharp(master).resize({ width: w, withoutEnlargement: true }).avif(AVIF).toFile(target)
  }
  const { data } = await sharp(master).resize(1, 1, { fit: 'cover' }).raw().toBuffer({ resolveWithObject: true })
  const colour = [...data.subarray(0, 3)].map(v => v.toString(16).padStart(2, '0')).join('')
  return [meta.width, meta.height, colour, widths]
}

// ---- optimize -------------------------------------------------------------------------------------------------
async function optimizeAll(targets) {
  const manifest = readJson(MANIFEST, {})
  const lock = readJson(LOCK, {})
  const files = new Set()
  for (const t of targets.length ? targets : [...PHOTO_ROOTS.map(p => p.dir), ...GRAPHIC_DIRS]) {
    const abs = resolve(root, t)
    if (!abs.startsWith(root + sep)) throw new Error(`${t} is outside the repository. Copy the photo into apps/main/public/media/<folder>/ first (see .agents/skills/add-photo/SKILL.md).`)
    if (!existsSync(abs)) throw new Error(`${t} does not exist.`)
    for (const f of statSync(abs).isDirectory() ? walk(abs) : [abs]) files.add(f)
  }

  const stats = { done: 0, skipped: 0, before: 0, after: 0 }
  const notes = []
  const queue = [...files].sort()

  async function one(file) {
    const ext = extname(file).toLowerCase()
    const r = rel(file)
    if (!INPUT_EXT.has(ext) && ext !== '.gif') return
    if (r.includes('/_opt/')) return
    const graphic = GRAPHIC_DIRS.some(d => r.startsWith(d + '/'))
    if (graphic) {
      if (ext !== '.png') return
      const buf = readFileSync(file)
      const out = await sharp(buf).png({ compressionLevel: 9, effort: 10 }).toBuffer()
      if (out.length < buf.length * 0.98) { writeFileSync(file, out); stats.before += buf.length; stats.after += out.length; stats.done++ }
      return
    }
    const pr = rootOf(file)
    if (!pr) { notes.push(`skipped ${r}: not in a managed photo folder`); return }
    const buf = readFileSync(file)
    // Tidy name: lowercase latin kebab-case `.jpg` (Bad Name.JPEG -> bad-name.jpg).
    const tidy = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'photo'
    const target = join(dirname(file), tidy + '.jpg')
    const ownExt = target === file
    const targetInner = rel(target).slice(pr.dir.length + 1)
    const src = srcOf(pr, pr.inner)
    // Up to date: same master hash and every variant present.
    if (ownExt && lock[src] === hashOf(buf) && manifest[src]?.[3].every(w => existsSync(variantPath(pr, pr.inner, w)))) { stats.skipped++; return }
    if (!ownExt && existsSync(target)) { notes.push(`skipped ${r}: ${rel(target)} already exists`); return }
    const master = await masterBuffer(buf)
    // Never make a file bigger: a photo already smaller than our re-encode keeps its bytes.
    const bytes = ownExt && master.length > buf.length ? buf : master
    writeFileSync(target, bytes)
    if (!ownExt) { rmSync(file); notes.push(`renamed ${r} -> ${rel(target)} (update references to the new name)`) }
    const tsrc = srcOf(pr, targetInner)
    manifest[tsrc] = await writeVariants(pr, targetInner, bytes)
    lock[tsrc] = hashOf(bytes)
    stats.before += buf.length; stats.after += bytes.length; stats.done++
  }
  let i = 0
  await Promise.all(Array.from({ length: 4 }, async () => { while (i < queue.length) await one(queue[i++]) }))

  // Drop entries and variants whose master is gone.
  for (const src of Object.keys(manifest)) {
    const pr = PHOTO_ROOTS.find(p => src.startsWith(p.url + '/'))
    if (!pr || !existsExact(join(root, pr.dir, src.slice(pr.url.length + 1)))) { delete manifest[src]; delete lock[src] }
  }
  for (const pr of PHOTO_ROOTS) {
    const keep = new Set(Object.entries(manifest).filter(([s]) => s.startsWith(pr.url + '/')).flatMap(([s, v]) => v[3].map(w => variantPath(pr, s.slice(pr.url.length + 1), w))))
    for (const f of walk(join(root, pr.dir, '_opt'))) if (!keep.has(f)) rmSync(f)
  }
  writeJson(MANIFEST, manifest)
  writeJson(LOCK, lock)
  for (const n of notes) console.log('  ' + n)
  console.log(`images: ${stats.done} optimized (${(stats.before / 1e6).toFixed(1)} MB -> ${(stats.after / 1e6).toFixed(1)} MB), ${stats.skipped} already up to date`)
}

// ---- check ----------------------------------------------------------------------------------------------------
async function check() {
  const manifest = readJson(MANIFEST, {})
  const lock = readJson(LOCK, {})
  const problems = []
  const fix = 'run `pnpm images:optimize`'
  const seen = new Set()
  let total = 0

  for (const pr of PHOTO_ROOTS) {
    const base = join(root, pr.dir)
    for (const f of walk(base)) {
      const r = rel(f)
      const inner = r.slice(pr.dir.length + 1)
      const top = inner.split('/')[0]
      if (top === '_opt') continue
      if (pr.skip.includes(top)) continue
      const ext = extname(f).toLowerCase()
      if (!/\.(jpe?g|png|webp|avif|gif|tiff?|heic)$/.test(ext)) continue
      const src = srcOf(pr, inner)
      seen.add(src)
      const buf = readFileSync(f)
      total += buf.length
      if (!NAME_OK.test(basename(f))) problems.push(`${r}: file name must be lowercase latin letters, digits, - . _ (rename it)`)
      if (extname(f) !== '.jpg') { problems.push(`${r}: photographs must be lowercase .jpg; pnpm images:optimize renames and converts it`); continue }
      if (buf.length > MAX_BYTES) problems.push(`${r}: ${kb(buf.length)} is over the ${kb(MAX_BYTES)} budget; ${fix}`)
      if (lock[src] !== hashOf(buf)) { problems.push(`${r}: not processed by the pipeline (or edited afterwards); ${fix}`); continue }
      const meta = await sharp(buf).metadata()
      if (Math.max(meta.width, meta.height) > MAX_SIDE) problems.push(`${r}: ${meta.width}x${meta.height} is over ${MAX_SIDE} px; ${fix}`)
      if (meta.exif) problems.push(`${r}: still carries EXIF metadata (location, camera); ${fix}`)
      const entry = manifest[src]
      if (!entry || entry[0] !== meta.width || entry[1] !== meta.height) { problems.push(`${r}: missing or stale in images.json; ${fix}`); continue }
      for (const w of entry[3]) {
        const vp = variantPath(pr, inner, w)
        if (!existsSync(vp)) { problems.push(`${rel(vp)}: variant missing; ${fix}`); continue }
        const vm = await sharp(vp).metadata()
        if (vm.width !== w) problems.push(`${rel(vp)}: expected width ${w}, got ${vm.width}; ${fix}`)
      }
    }
    for (const f of walk(join(base, '_opt'))) {
      const owner = Object.entries(manifest).some(([s, v]) => s.startsWith(pr.url + '/') && v[3].some(w => variantPath(pr, s.slice(pr.url.length + 1), w) === f))
      if (!owner) problems.push(`${rel(f)}: variant without a photograph; ${fix}`)
    }
  }
  for (const src of Object.keys(manifest)) if (!seen.has(src)) problems.push(`images.json lists ${src}, but the file is gone; ${fix}`)

  for (const d of GRAPHIC_DIRS) for (const f of walk(join(root, d))) {
    const ext = extname(f).toLowerCase()
    if (/\.(jpe?g|webp|gif)$/.test(ext)) problems.push(`${rel(f)}: graphics must be PNG or SVG`)
    if (ext === '.png' && statSync(f).size > GRAPHIC_MAX_BYTES) problems.push(`${rel(f)}: ${kb(statSync(f).size)} is over the ${kb(GRAPHIC_MAX_BYTES)} graphics budget; export a smaller PNG or an SVG`)
  }

  // Every literal image path in app code must point at a processed photograph or an existing graphic.
  const ref = /(['"`(])(\/(?:media|works)\/[^\s'"`)\\$]+\.(?:jpe?g|png|webp|avif|gif))\1?/gi
  for (const appDir of [...readdirSync(join(root, 'apps')).map(a => `apps/${a}`), 'packages']) {
    for (const f of walk(join(root, appDir))) {
      if (!/\.(vue|ts|css|md)$/.test(f) || /node_modules|\.nuxt|\.output|\/dist\//.test(f) || /\.lock\.json$/.test(f)) continue
      for (const m of readFileSync(f, 'utf8').matchAll(ref)) {
        const src = m[2]
        if (src.includes('/_opt/')) continue
        if (/^\/media\/(previews|thumbs)\//.test(src)) { problems.push(`${rel(f)}: ${src} is the retired preview folder; use the original path (MediaImg picks the variants)`); continue }
        if (manifest[src]) continue
        const onDisk = [join(root, 'apps/main/public', src), join(root, 'apps/documents/public', src)].some(existsSync)
        if (!onDisk) problems.push(`${rel(f)}: ${src} does not exist`)
        else if (PHOTO_ROOTS.some(pr => src.startsWith(pr.url + '/') && !pr.skip.some(s => src.startsWith(`${pr.url}/${s}/`)))) problems.push(`${rel(f)}: ${src} is not in images.json; ${fix}`)
      }
    }
  }

  if (problems.length) {
    console.log(problems.join('\n') + `\n\n${problems.length} image problem(s). Fix: pnpm images:optimize (see .agents/skills/add-photo/SKILL.md)`)
    process.exit(1)
  }
  console.log(`Images OK: ${Object.keys(manifest).length} photographs, ${(total / 1e6).toFixed(1)} MB of masters, all processed.`)
}

const [command = 'check', ...args] = process.argv.slice(2)
try {
  if (command === 'check') await check()
  else if (command === 'optimize') await optimizeAll(args)
  else { console.error('usage: optimize-images.mjs <optimize [path...]|check>'); process.exit(2) }
} catch (error) {
  console.error(`\n${error.message}`)
  process.exit(1)
}
