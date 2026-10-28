// Design-system registry: one file per component in ./registry/<Name>.ts. The gallery (apps/design) and agents read it.
// An agent greps `packages/ui/ds/registry/<Name>.ts` for «use / avoid» without opening the gallery. Handbook: docs/component-contract.md

export type DsCategory = 'layout' | 'text' | 'actions' | 'content' | 'navigation' | 'site' | 'brand' | 'motion'

export const DS_CATEGORIES: { id: DsCategory; title: string }[] = [
  { id: 'layout', title: 'Розкладка' },
  { id: 'text', title: 'Текст' },
  { id: 'actions', title: 'Дії й посилання' },
  { id: 'content', title: 'Контент' },
  { id: 'navigation', title: 'Навігація' },
  { id: 'site', title: 'Каркас сайту' },
  { id: 'brand', title: 'Бренд і декор' },
  { id: 'motion', title: 'Рух' },
]

export type DsControl =
  | { type: 'select'; options: (string | number)[]; default?: string | number }
  | { type: 'boolean'; default?: boolean }
  | { type: 'text'; default?: string }
  | { type: 'number'; default?: number }

export interface DsExample {
  /** File in ds/examples/<Name>/<file>.vue */
  file: string
  title: string
  description?: string
  /** Show the example on a tone-switchable stage (default true); set false for full-width page chrome. */
  stage?: boolean
}

export interface DsEntry {
  /** Component file name; the tag is <Sym{name}>. */
  name: string
  /** Ukrainian display title. */
  title: string
  category: DsCategory
  status: 'stable' | 'beta' | 'planned'
  /** One sentence: what it is for. */
  summary: string
  /** When to use it. */
  use: string[]
  /** When NOT to use it (and what to use instead). */
  avoid: string[]
  examples: DsExample[]
  /** Live playground: controls for props; `slot` is the default slot text. */
  playground?: { props: Record<string, DsControl>; slot?: string; fixed?: Record<string, unknown> }
  /** States matrix: each cell renders the component with these props. */
  states?: { label: string; props: Record<string, unknown>; slot?: string }[]
  keyboard?: { keys: string; action: string }[]
  a11y?: string[]
  /** Motion tiers it uses (see /foundations/motion). */
  motion?: string[]
  /** Tokens it reads. */
  tokens?: string[]
  related?: string[]
}

export const defineDs = (e: DsEntry) => e
