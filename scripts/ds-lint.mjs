// Design-system lint: enforces «pages use only tokens and Sym* components». `pnpm ds:lint` (part of `pnpm check`).
// Scans app code (apps/main, apps/istoriia-vulytsi: .vue, .ts, .css). The layer (packages/ui), the gallery (apps/design), brand tokens and
// a project's own theme file (app/assets/css/theme.css, tokens only) are exempt. Add `ds-lint-ignore` in a line to silence it, with a reason.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const apps = ['apps/main', 'apps/istoriia-vulytsi']
const skipDirs = new Set(['node_modules', '.nuxt', '.output', 'dist', '.data'])
const rules = [
  { id: 'hex-colour', re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g, msg: 'raw colour: use a tone role (var(--sym-fg), var(--sym-accent)…) or data-tone on a SymSection/SymCard', skip: f => /theme\.css$/.test(f), css: true },
  { id: 'colour-fn', re: /\b(?:rgba?|hsla?|oklch|oklab)\(/g, msg: 'raw colour function: use tone role tokens', skip: f => /theme\.css$/.test(f), css: true },
  { id: 'font-size', re: /font-size\s*:/g, msg: 'font-size: use SymHeading / SymText sizes (type roles)', css: true },
  { id: 'font-family', re: /font-family\s*:/g, msg: 'font-family: use the type roles (var(--sym-font-*) only in a theme file)', skip: f => /theme\.css$/.test(f), css: true },
  { id: 'raw-ms', re: /\b\d+(?:\.\d+)?m?s\b(?=\s*(?:[;)}]|ease|linear|cubic|var))/g, msg: 'raw duration / easing: use var(--sym-t-*) motion tokens', css: true, only: /transition|animation/ },
  { id: 'cubic-bezier', re: /cubic-bezier\(/g, msg: 'raw easing: use var(--sym-ease-*)', css: true },
  { id: 'z-index', re: /z-index\s*:\s*-?\d+/g, msg: 'raw z-index: use var(--sym-z-*)', css: true },
  { id: 'inline-style', re: /\sstyle=["'][^"']*(?:color|background|font|margin|padding|width|height|z-index)[^"']*["']/g, msg: 'inline style: use component props, tones and layout primitives', css: false },
]

function* walk(dir) {
  for (const n of readdirSync(dir)) {
    if (skipDirs.has(n)) continue
    const p = join(dir, n)
    if (statSync(p).isDirectory()) yield* walk(p)
    else if (/\.(vue|ts|css)$/.test(n)) yield p
  }
}

let problems = 0
for (const app of apps) {
  // only apps that already extend the design system are enforced; the others are migrated one by one
  let cfg = ''
  try { cfg = readFileSync(join(root, app, 'nuxt.config.ts'), 'utf8') } catch { continue }
  if (!cfg.includes('@symbol/ui')) { console.log(`skip ${app}: not on the design system yet`); continue }
  let files = []
  try { files = [...walk(join(root, app))] } catch { continue }
  for (const f of files) {
    const rel = relative(root, f)
    const lines = readFileSync(f, 'utf8').split('\n')
    let inStyle = f.endsWith('.css'), inTemplate = false
    lines.forEach((line, i) => {
      if (/<style[\s>]/.test(line)) inStyle = true
      if (/<\/style>/.test(line)) inStyle = false
      if (/<template/.test(line)) inTemplate = true
      if (line.includes('ds-lint-ignore')) return
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return
      for (const r of rules) {
        if (r.skip?.(rel)) continue
        if (r.css && !inStyle) continue
        if (r.css === false && !inTemplate) continue
        if (r.only && !r.only.test(line)) continue
        if (f.endsWith('.ts') && r.css !== undefined && !/css|style/i.test(f) && r.id !== 'hex-colour') continue
        r.re.lastIndex = 0
        if (r.re.test(line)) { problems++; console.log(`${rel}:${i + 1}  [${r.id}] ${r.msg}\n    ${line.trim().slice(0, 140)}`) }
      }
    })
  }
}
console.log(problems ? `\n${problems} design-system violation(s)` : 'Design-system lint clean')
process.exit(problems ? 1 : 0)
