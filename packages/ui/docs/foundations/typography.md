# Typography

> Display serif (`--sym-font-display`), sans for text (`--sym-font-text`), the logo face for labels (`--sym-font-label`); fluid sizes; Ukrainian-safe wrapping. Pages never set font sizes: they use `SymHeading`, `SymText`, `SymEyebrow`.

## Fonts
**Playfair Display** (variable, roman + italic) for headlines and quotes, **Commissioner** (variable) for text, **EXDocument** (the logo face) for the name, navigation, eyebrows, tags, meta and big numerals. Pair chosen 2026-10-29 from six measured options; how and why: [[foundations/font-selection]].
Playfair and Commissioner are self-hosted from `@fontsource-variable/*` (no request to Google). The previous Newsreader and DM Sans had **no Cyrillic subset**, so Ukrainian silently fell back to Georgia / system sans; `apps/main` and `apps/istoriia-vulytsi` still carry those old `@import`s until they are migrated onto `@symbol/ui`.
Any replacement must pass `pnpm ds:font`. Change `--sym-font-*` and the imports in `packages/ui/nuxt.config.ts`.

## Brand font
The logo typeface: wordmark and name (`SymBrand`, `SymWordmark`) and, in the type roles, labels and numerals (`.sym-t-label`, `.sym-t-numeral`): [[foundations/brand-font]]. One weight (400).

## Roles
| Role | Class | Use | Size 390 → 1440 |
|---|---|---|---|
| display-xl | `sym-t-display-xl` | page hero (h1) | 52 → 136 px |
| display | `sym-t-display` | section title | 44 → 96 |
| headline-lg | `sym-t-headline-lg` | big card / feature title | 36 → 64 |
| headline | `sym-t-headline` | sub-section | 28 → 44 |
| title-lg / title | `sym-t-title-lg` / `-title` | card titles | 24 → 36 / 20 → 26 |
| quote | `sym-t-quote` | pull quote (italic serif) | 26 → 44 |
| lead / body / body-sm / caption | `sym-t-lead` … | text | 18–21 / 16–17 / 14.4–15 / 13–14 |
| label | `sym-t-label` | eyebrow, tag, meta: brand face, uppercase, +0.1em | 12 → 13 |
| numeral | `sym-t-numeral` | big numbers (`SymStat`): brand face | with the size role |

Display roles: weight 500, tracking -0.03 … -0.008em, line-height 0.95–1.2, `text-wrap: balance`, `overflow-wrap: anywhere` (a 12-letter Ukrainian word must never push the page wider than the screen).
Running text: `hyphens: auto` (`lang="uk"` is set on `<html>`), `text-wrap: pretty`, max 66 characters (`measure`).

## Rules
One `h1` per page; level = structure, size = look. Do not skip levels. Ukrainian strings are 15–30 % longer than English: leave room in buttons and chips. Check long words at 320 px.
Large display text may use `--sym-fg-large` (the tone's livelier colour); small text never.
