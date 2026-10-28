// Generates packages/ui/ds/generated/meta.json: props / slots / events of every Sym* component (prop JSDoc = description).
// The gallery's API tables read it. Run after changing a component's props:  pnpm ds:meta
import { createChecker } from '../packages/ui/node_modules/vue-component-meta/index.js'
import { readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'ui')
const dir = join(root, 'app/components')
const checker = createChecker(join(root, 'tsconfig.meta.json'), { forceUseTs: true, schema: { ignore: ['HTMLElement', 'Element', 'Event', 'MouseEvent', 'FocusEvent'] }, printer: { newLine: 1 } })
const out = {}
const clean = t => (t ?? '').replace(/\s*\|\s*undefined/g, '')
// expand aliases like `Size` into their literal union
const typeOf = p => {
  const sc = p.schema
  if (sc && typeof sc === 'object' && sc.kind === 'enum') {
    const parts = sc.schema.map(x => (typeof x === 'string' ? x : x?.type ?? '')).filter(x => x && x !== 'undefined')
    if (parts.length && parts.length <= 14) return parts.join(' | ')
  }
  return clean(p.type)
}
for (const f of readdirSync(dir).filter(f => f.endsWith('.vue')).sort()) {
  const name = 'Sym' + f.replace('.vue', '')
  try {
    const m = checker.getComponentMeta(join(dir, f))
    out[name] = {
      props: m.props.filter(p => !p.global).map(p => ({ name: p.name, type: typeOf(p), required: p.required, default: p.default, description: p.description })),
      slots: m.slots.map(s => ({ name: s.name, type: clean(s.type), description: s.description })),
      events: m.events.map(e => ({ name: e.name, type: clean(e.type), description: e.description })),
    }
  } catch (e) { out[name] = { error: String(e.message ?? e) } }
}
writeFileSync(join(root, 'ds/generated/meta.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`meta for ${Object.keys(out).length} components; props found in ${Object.values(out).filter(v => v.props?.length).length}`)
