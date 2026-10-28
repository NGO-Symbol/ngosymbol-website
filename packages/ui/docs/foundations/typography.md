# Typography

> Serif for display (`--sym-font-display`), sans for text (`--sym-font-text`); fluid sizes; Ukrainian-safe wrapping. Pages never set font sizes: they use `SymHeading`, `SymText`, `SymEyebrow`.

## Fonts
Currently **Source Serif 4** (variable, optical size) + **Manrope** (variable), self-hosted from `@fontsource-variable/*` (no request to Google, faster, no visitor data leaves the site).
They are a **provisional pair**: the previous Newsreader and DM Sans have **no Cyrillic subset** (checked in the Google Fonts API, 2026-10-28), so Ukrainian text silently fell back to Georgia / system sans.
Any replacement must have a `cyrillic` subset (candidates checked: Literata, Lora, Spectral, Playfair Display, Cormorant for serif; Inter, Onest, Commissioner, Golos Text for sans). Change `--sym-font-*` and the two imports in `packages/ui/nuxt.config.ts`.

## Brand font
A third face, the logo typeface, sets only the wordmark and the organization name (`SymBrand`, `SymWordmark`): [[foundations/brand-font]].

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
| label | `sym-t-label` | eyebrow: uppercase, +0.14em | 11.5 → 12.5 |

Display roles: tight tracking (-0.03 … -0.045em), line-height 0.88–1.06, `text-wrap: balance`, `overflow-wrap: anywhere` (a 12-letter Ukrainian word must never push the page wider than the screen).
Running text: `hyphens: auto` (`lang="uk"` is set on `<html>`), `text-wrap: pretty`, max 66 characters (`measure`).

## Rules
One `h1` per page; level = structure, size = look. Do not skip levels. Ukrainian strings are 15–30 % longer than English: leave room in buttons and chips. Check long words at 320 px.
Large display text may use `--sym-fg-large` (the tone's livelier colour); small text never.
