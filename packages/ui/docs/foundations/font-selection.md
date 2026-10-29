# Choosing and pairing fonts

> How a typeface is picked for Symbol, so an agent or a designer can repeat the decision. Current pair: **Playfair Display** (display) + **Commissioner** (text), with the logo face for labels ([[foundations/brand-font]], [[foundations/typography]]).

## Three faces, three jobs (variant C, chosen 2026-10-29)
| Job | Token | Face |
|---|---|---|
| Headlines, titles, quotes | `--sym-font-display` | Playfair Display (500, italic for quotes) |
| Running text, buttons, forms | `--sym-font-text` | Commissioner (400 / 600) |
| Name, navigation, eyebrows, tags, meta, big numerals | `--sym-font-label` (= `--sym-font-brand`) | EXDocument, weight 400 only |

Change a face in `tokens.css` plus the imports in `packages/ui/nuxt.config.ts`; every `sym-t-*` role follows. Never ask the brand face for bold (it has one weight; the browser would fake it).

## Method: four tests, in this order
1. **Ukrainian coverage.** All 33 letters, both cases, incl. `Є І Ї Ґ` and the apostrophe `’`. Many popular families have a cyrillic subset that still lacks `Є І Ї ґ` (Jost) or have no cyrillic at all (Figtree, Spline Sans, the old Newsreader / DM Sans). Missing letter = reject.
2. **x-height next to the logo.** The logo face has x-height 0.500 em. A text face within ±5 % sits on the same optical line; +8 % (Manrope) already looks oversized beside the wordmark. Very low x-height faces (Cormorant 0.386) are illegible at body sizes.
3. **Character and width.** Logo glyphs are narrow and squared. Pair it with a *contrasting* serif for headlines (do not imitate the logo) and a calm humanist/grotesque sans for text. Wide display faces (Unbounded) and condensed techno faces (Oswald, Exo 2) compete with the logo: reject.
4. **Source and licence.** Open licence (OFL), self-hostable through `@fontsource-variable/*` (no Google request: speed, no visitor data to a third party), a variable file with the weights we use.

Tools: `pnpm ds:font <file.woff2|ttf|otf>` checks 1–3 numerically (x-height and width vs the logo face). A candidate passes the script, then is judged on a real mock (390 and 1280 px) with Ukrainian copy that has long words and `Є І Ї`.

## Measured candidates (x-height / em, average lowercase width / em)
Brand 0.500 / 0.511. Plex 0.516, PT 0.500, Bitter 0.532, Onest 0.527, Geologica 0.480, **Playfair 0.515**, **Commissioner 0.496**, Source Serif 4 0.492, Manrope 0.540. Rejected: Jost (no `Є І Ї ґ`), Figtree and Spline Sans (no cyrillic), Cormorant, Unbounded, Oswald, Exo 2.
Runner-up pairs if the design pass moves away from Playfair: IBM Plex Serif + Plex Sans (one family, most calm), Bitter + Onest (sturdier).

## Rules for agents
- Never set `font-family` in a page; use `SymHeading`, `SymText`, `SymEyebrow`, `SymStat`. A new component takes the family from the role classes (`sym-t-*`) or the three tokens above, not from a literal name.
- Tracking belongs to the role (`base.css`), not to the page. Display roles are tightened a little (-0.03 … -0.02 em); Playfair's high contrast breaks down if tightened like a grotesque.
- Uppercase labels: brand face, 400, +0.1 em. Navigation: brand face, uppercase, +0.06 em.
