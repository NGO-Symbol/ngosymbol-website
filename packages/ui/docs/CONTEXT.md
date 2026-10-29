# NGO Symbol design system — where to go

`@symbol/ui` is a Nuxt layer: tokens, tones, motion, ~40 `Sym*` components. Apps extend it (`extends: ['@symbol/ui']`) and build pages **only** from it.
Live gallery: `pnpm dev:design` → http://localhost:3002 (published at `symbol.ngo/design/`). Find your task, open ONE file, follow its links one hop.

| Task / question | Open |
|---|---|
| Which component for this job? | [[selection-guide]] |
| Build a page (home, list, project, about, contact) | [[page-templates]] |
| Add or change a component (the rules) | [[component-contract]] |
| A component that is planned but not built yet | [[component-backlog]] |
| Colours, tones, contrast, tokens | [[foundations/tokens]] |
| Type roles, fonts, Cyrillic | [[foundations/typography]] |
| The logo typeface, the name «Символ» in text | [[foundations/brand-font]] |
| Any animation, reveal, page transition | [[foundations/motion]] |
| Phone vs desktop, touch, breakpoints | [[foundations/responsive]] |
| Why it is built this way (what was taken from studio-ui, what was not) | [[research]] |
| A project site that needs its own look (autonomous project) | [[foundations/tokens]] → «Project theme» |

## Rules in one breath
1. Pages use only `Sym*` components and `var(--sym-*)` tokens. No hex, no raw `ms`, no `font-size`, no `z-index: 5`, no own flex/grid CSS. A missing piece → a new component per [[component-contract]].
2. Colour is a role; the section's `tone` decides it. 3. Motion follows the ladder. 4. Mobile first, container queries, 44 px targets. 5. Verify with screenshots (390 / 768 / 1280) before «done».
Enforced by `pnpm ds:lint`, `pnpm ds:contrast`, `pnpm ds:crawl` (part of `pnpm check`).
