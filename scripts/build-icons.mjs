// Builds the browser-tab / home-screen icons from packages/brand/assets/symbol-mark.svg and symbol-spiral.svg into packages/brand/public.
// `node scripts/build-icons.mjs` (needs Google Chrome; playwright-core drives it). Rerun when the mark changes.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'brand')
const out = join(root, 'public')
const mark = readFileSync(join(root, 'assets/symbol-mark.svg'), 'utf8')
const spiral = readFileSync(join(root, 'assets/symbol-spiral.svg'), 'utf8')
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

// scalable tab icon: the mark without fixed size or title
writeFileSync(join(out, 'favicon.svg'), mark.replace(/\swidth="[^"]*"/, '').replace(/\sheight="[^"]*"/, '').replace(/\srole="img"\s+aria-label="[^"]*"/, ''))

const VIOLET = '#9280a6', CREAM = '#fff7eb'
const svgMark = (size, pad = 0, bg = 'none') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${bg}"/>` +
  `<svg x="${pad}" y="${pad}" width="${size - 2 * pad}" height="${size - 2 * pad}" viewBox="0.034 0 178.207 178.207">${inner(mark)}</svg></svg>`
// maskable: full-bleed violet square, the spiral inside the 80 % safe zone
const svgMaskable = (size) => {
  const w = size * 0.56, h = w * (114.6 / 115.7), x = (size - w) / 2, y = (size - h) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${VIOLET}"/><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="31.26 31.81 115.70 114.60">${inner(spiral)}</svg></svg>`
}

const jobs = [
  ['favicon-16.png', 16, svgMark(16)], ['favicon-32.png', 32, svgMark(32)], ['favicon-48.png', 48, svgMark(48)],
  ['apple-touch-icon.png', 180, svgMark(180, 20, CREAM)],
  ['icon-192.png', 192, svgMark(192, 6)], ['icon-512.png', 512, svgMark(512, 16)], ['icon-maskable-512.png', 512, svgMaskable(512)],
]
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage()
const png = {}
for (const [name, size, svg] of jobs) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<body style="margin:0;background:transparent;line-height:0">${svg}</body>`)
  await page.waitForTimeout(150)
  png[name] = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
  if (!/favicon-(16|48)/.test(name)) writeFileSync(join(out, name), png[name]) // 16 and 48 only go into the .ico
}
await browser.close()

// favicon.ico: PNG-compressed entries 16, 32, 48
const entries = [['favicon-16.png', 16], ['favicon-32.png', 32], ['favicon-48.png', 48]]
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(entries.length, 4)
let offset = 6 + 16 * entries.length
const dir = [], data = []
for (const [name, size] of entries) {
  const b = png[name], e = Buffer.alloc(16)
  e.writeUInt8(size, 0); e.writeUInt8(size, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12)
  dir.push(e); data.push(b); offset += b.length
}
writeFileSync(join(out, 'favicon.ico'), Buffer.concat([head, ...dir, ...data]))

writeFileSync(join(out, 'site.webmanifest'), JSON.stringify({
  name: 'ГО «Символ»', short_name: 'Символ', lang: 'uk', start_url: '/', display: 'browser', background_color: CREAM, theme_color: VIOLET,
  icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }, { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }],
}, null, 2) + '\n')
console.log('icons written to', out)
