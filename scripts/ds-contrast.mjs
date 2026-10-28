// WCAG contrast check of every tone in packages/ui/app/assets/css/tones.css (brand colours from packages/brand/tokens.css).
// Fails (exit 1) when a pair is below its minimum. `pnpm ds:contrast`.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const brand = readFileSync(join(root, 'packages/brand/tokens.css'), 'utf8')
const tones = readFileSync(join(root, 'packages/ui/app/assets/css/tones.css'), 'utf8')

const palette = Object.fromEntries([...brand.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(m => [m[1], m[2].toLowerCase()]))
const hex = v => { const m = v.match(/^var\((--[\w-]+)\)$/); return m ? palette[m[1]] : /^#[0-9a-f]{6}$/i.test(v) ? v.toLowerCase() : null }
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => (v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2] }
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05) }

// `:root, [data-tone='paper'] { … }` and `[data-tone='x'] { … }` inside @layer sym-tokens
const blocks = [...tones.matchAll(/(?:\[data-tone='(\w+)'\]|:root)[^{}]*\{([^{}]*)\}/g)]
const result = {}
for (const [, name, body] of blocks) {
  if (!body.includes('--sym-bg')) continue
  const key = name ?? 'paper'
  result[key] = Object.fromEntries([...body.matchAll(/(--sym-[\w-]+):\s*([^;]+);/g)].map(m => [m[1], hex(m[2].trim())]))
}

const checks = [['--sym-fg', 4.5, 'текст'], ['--sym-fg-muted', 4.5, 'приглушений текст'], ['--sym-fg-large', 3, 'великий текст'], ['--sym-link', 4.5, 'посилання'], ['--sym-rule', 3, 'лінія'], ['--sym-focus', 3, 'фокус']]
// the accent is decorative geometry (orbits, marks): WCAG 1.4.11 exempts it, so it is reported, never failed (brand violet/apricot pairs are 2.5:1 by nature)
let failed = 0
for (const [tone, v] of Object.entries(result)) {
  const bg = v['--sym-bg']
  const lines = []
  for (const [k, need, label] of checks) { const c = v[k]; if (!c) continue; const r = ratio(c, bg); const ok = r >= need; if (!ok) failed++; lines.push(`${ok ? '✓' : '✗'} ${label.padEnd(20)} ${r.toFixed(2)} (≥ ${need})`) }
  if (v['--sym-accent']) lines.push(`· ${'акцент (декор)'.padEnd(20)} ${ratio(v['--sym-accent'], bg).toFixed(2)} (лише геометрія, не текст)`)
  // solid button: label (tone bg) on fill (tone fg)
  const rb = ratio(v['--sym-bg'], v['--sym-fg']); if (rb < 4.5) failed++; lines.push(`${rb >= 4.5 ? '✓' : '✗'} ${'кнопка solid'.padEnd(20)} ${rb.toFixed(2)} (≥ 4.5)`)
  console.log(`\n${tone}  (${bg})\n  ` + lines.join('\n  '))
}
console.log(failed ? `\n${failed} pair(s) below the minimum` : '\nAll tone pairs pass WCAG AA')
process.exit(failed ? 1 : 0)
