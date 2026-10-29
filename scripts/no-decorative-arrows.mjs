// House rule (2026-10-29): no decorative arrows (↗) after links or labels anywhere on the sites — a link is already
// clickable, the arrow carries no function. `pnpm lint:arrows` (part of `pnpm check`) fails if one appears in app code
// or data. Functional arrows that move through something (← → in pagers, sliders, back links) are allowed.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const skipDirs = new Set(['node_modules', '.nuxt', '.output', 'dist', '.data'])
const pattern = /↗|&#8599;|&nearr;|\\2197/
// The typography plugin only keeps such an arrow from wrapping; it is not an arrow on the page.
const exempt = /plugins\/typography\.client\.ts$/

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else if (/\.(vue|ts|css|html|md)$/.test(name)) yield path
  }
}

let problems = 0
for (const app of readdirSync(join(root, 'apps'))) {
  for (const sub of ['app', 'hidden']) {
    let files = []
    try { files = [...walk(join(root, 'apps', app, sub))] } catch { continue }
    for (const file of files) {
      if (exempt.test(file)) continue
      readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
        if (pattern.test(line)) { problems++; console.log(`${relative(root, file)}:${index + 1}  decorative arrow ↗ — remove it (house rule, AGENTS.md)`) }
      })
    }
  }
}
if (problems) { console.log(`\n${problems} decorative arrow(s).`); process.exit(1) }
console.log('No decorative arrows.')
