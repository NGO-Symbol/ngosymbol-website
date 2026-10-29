import { DS_CATEGORIES, type DsEntry } from '../../../../packages/ui/ds/types'

// The registry and the live examples live next to the components (packages/ui/ds); the gallery only renders them.
const mods = import.meta.glob<{ default: DsEntry }>('../../../../packages/ui/ds/registry/*.ts', { eager: true })
export const dsEntries: DsEntry[] = Object.values(mods).map(m => m.default).sort((a, b) => a.title.localeCompare(b.title, 'uk'))

// accepts 'button', 'Button', 'project-card'
export const dsByName = (name: string) => { const n = name.toLowerCase().replace(/-/g, ''); return dsEntries.find(e => e.name.toLowerCase() === n) }
export const dsSlug = (e: DsEntry) => e.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
export const dsGrouped = () => DS_CATEGORIES.map(c => ({ ...c, items: dsEntries.filter(e => e.category === c.id) })).filter(g => g.items.length)

// examples: live component + raw source (lazy)
const exComps = import.meta.glob('../../../../packages/ui/ds/examples/*/*.vue')
const exSources = import.meta.glob('../../../../packages/ui/ds/examples/*/*.vue', { query: '?raw', import: 'default' })
const key = (name: string, file: string) => `../../../../packages/ui/ds/examples/${name}/${file}.vue`
export const loadExample = (name: string, file: string) => exComps[key(name, file)]
export const loadExampleSource = (name: string, file: string) => exSources[key(name, file)] as (() => Promise<string>) | undefined

// props / slots / events generated from the SFCs (pnpm ds:meta)
import meta from '../../../../packages/ui/ds/generated/meta.json'
export const dsMeta = meta as Record<string, { props?: { name: string; type: string; required: boolean; default?: string; description: string }[]; slots?: { name: string; description: string }[]; events?: { name: string; type: string; description: string }[]; error?: string }>
