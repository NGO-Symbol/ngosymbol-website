# Component contract

How every `Sym*` component is built. A component that does not follow this does not exist for other agents.
Exemplars to copy: `app/components/Button.vue`, `Card.vue`, `Grid.vue`, `Orbit.vue` and their `ds/registry/Button.ts`, `ds/examples/Button/`.

## Three places per component
1. `app/components/<Name>.vue` — the component. Global, auto-imported as `<Sym<Name>>` (file `ProjectCard.vue` → `<SymProjectCard>`).
2. `ds/registry/<Name>.ts` — `defineDs({...})` (type: `ds/types.ts`): Ukrainian `title`, `category`, `status` (`stable` | `beta` | `planned`), `summary`,
   `use` / `avoid` lists, `examples`, optional `playground` controls and `states` matrix, `keyboard`, `a11y`, `motion`, `tokens`, `related`.
3. `ds/examples/<Name>/<Example>.vue` — 2–4 realistic, self-contained examples with fictional-but-plausible Ukrainian content that never
   claims real facts (no invented impact numbers, quotes, people, partners: see AGENTS.md).
After changing props, ask the maintainer to run `pnpm ds:meta` (it regenerates the API table in the gallery); agents working in parallel must not run it.

## Script
- `<script setup lang="ts">`, typed `defineProps` with `withDefaults`. **Every prop has a JSDoc comment** (it becomes the API table). Slots through `defineSlots`.
- Native elements first (`<a>`, `<button>`, `<details>`, `<ul>`, `<figure>`, `<dl>`, `<nav>`). Landmarks and heading levels are real.
- UI strings and aria-labels in Ukrainian; no hard-coded organization facts inside components (they come in as props / slots).
- Router links: `resolveComponent('NuxtLink')`; off-site check: auto-imported `isOffSite(href)` (symbol.ngo and `*.symbol.ngo` are not off-site).
- Never reach into the page: no `window` at setup time (SSR). Browser APIs only in `onMounted` or composables that guard.

## Template and CSS
- Root class `sym-<kebab-name>`; variants and states as `data-*` attributes (`data-variant`, `data-size`, `data-active`).
- `<style>` is global (not `scoped`), wrapped in **`@layer sym-components { … }`**. Private knobs are `--_name` custom properties on the root.
- **Only tokens.** Colour = tone roles (`--sym-bg`, `--sym-fg`, `--sym-fg-muted`, `--sym-fg-large`, `--sym-rule`, `--sym-rule-soft`, `--sym-accent`, `--sym-focus`);
  never a brand colour or a hex. Space `--sym-space-*` / `--sym-gap-*` / `--sym-pad-card`; type via the `sym-t-*` classes (`.sym-t-title`, `.sym-t-body-sm`, …);
  shape `--sym-shape-*`; z-index `--sym-z-*`; motion `--sym-t-*` shorthands; widths `--sym-width-*`. No raw `ms`, `cubic-bezier`, `z-index: 5`, `font-size`.
  Raw px only for fixed geometry of the component itself (comment where the number comes from).
- **Tone-aware:** a component never knows what tone it sits on. Text uses `var(--sym-fg)` / `--sym-fg-muted`, lines `--sym-rule`, fills `--sym-fg` with label `--sym-bg`.
  Test every component on all six tones in the gallery («Вигляд» → тон сцени); text must stay readable on each.
- **Responsive by container, mobile first:** the default CSS is the phone layout; widen with `@container` (give the root `container: sym-<name> / inline-size` and
  `width: 100%` or it collapses in a shrink-to-fit parent) or with `auto-fit` grids. `@media (max-width: 599px)` only for window-level things (header, drawer).
  No horizontal page scroll at 320 px. Rows of chips scroll sideways (`useScrollEdges` + `.sym-hscroll`) instead of wrapping into tall blocks.
- **Touch:** every control ≥ 44 px hit area (invisible `::after` if the visual is smaller). Hover styles only inside `@media (hover: hover)`; pressed state with `:active`.
- **Focus:** keep the global `:focus-visible` ring (3 px, `--sym-focus`); never `outline: none`. Do not clip it (`overflow: hidden` on a control hides the ring).
- **Motion:** pick the tier by what moves ([[motion]]); `transition: translate var(--sym-t-small), color var(--sym-t-fx-small)`; exit tier one step down; any translate/scale delta is
  multiplied by `var(--sym-motion-travel)` so reduced motion turns it into a fade. Only `transform` / `translate` / `scale` / `opacity` / `clip-path` animate (height only in small blocks).
  Content that appears on scroll uses `v-reveal` / `<SymReveal>`; it is visible in the HTML and animates only after hydration.
- **Forced colours:** borders made with `box-shadow` need a real-border fallback in `@media (forced-colors: active)`.
- Icons only through `<SymIcon name>`; missing icon → add its path to `Icon.vue` and the name to its `name` union.
- Images: always with `width`/`height` or an aspect ratio (`SymMedia`); below the fold `loading="lazy"`.

## Accessibility (not optional)
Visible focus, labels, keyboard per WAI-ARIA APG (disclosure, tabs, menu patterns), text alternatives, colour never the only signal, heading structure,
`aria-current="page"` on the current nav item, `aria-expanded` on disclosures, external links announced. Document keyboard and a11y notes in the registry entry.

## Gotchas learned the hard way
- **Layer order must be declared first.** The layer statement `@layer sym-reset, sym-tokens, …` is injected as the first `<style>` of the page by `packages/ui/nuxt.config.ts`.
  If styles ever look «missing» (buttons without fill), a component stylesheet loaded before that statement: the layer order is wrong.
- A `Stack` stretches children to full width: put buttons/chips in a `Cluster`.
- Size containers need `width: 100%` themselves.
- `@container` rules style only the container's **descendants**, never the container itself: put the width-dependent layout on an inner element (`__in`, `__list`), as Grid, Split, ProjectCard and Callout do.
- Decoration never sits under small text: orbits go in `SymSection`'s `#decor` slot (behind the content, anchored to the band) and are `soft` (30 %) by default; a bold orbit under cream text on apricot is unreadable.
- Unlayered CSS beats every layer: gallery or page CSS like `.ds-ex p { … }` silently overrides component styles. Scope selectors tightly (`.ds-ex > header p`).
- In a Nuxt layer `~` points to the consuming app; import layer files relatively.
- `text-wrap: balance` + `overflow-wrap: anywhere` are on the display type roles; do not add `white-space: nowrap` to headings.
- SSR: never branch markup on `window.innerWidth`; use CSS (container queries) so server and client HTML match.

## Verify before saying «done»
`pnpm dev:design` → open `http://localhost:3002/components/<name>`; `pnpm ds:shot <url> <png> <width>` at 1280, 768 and 390 (and 320 for anything with text), light check on all six tones via the gallery bar,
zero console errors, no horizontal overflow; `pnpm ds:lint` clean.
