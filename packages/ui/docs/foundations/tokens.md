# Tokens, tones, project theme

> Raw values live in two files: `app/assets/css/tokens.css` (space, type, shape, motion, z-index) and `tones.css` (colour). Components and pages read `var(--sym-*)` only.

## Tiers
1. **Brand palette** `--symbol-*` (`packages/brand/tokens.css`): violet `#9280A6`, apricot `#FDD08F`, plum `#302738`, ink `#211B28`, cream `#FFF7EB`, lilac `#D8CFE1`, white `#FFFDF8`. Exact logo colours.
2. **System** `--sym-*`: the vocabulary pages and components use. Colour roles come from the current **tone**.
3. **Component-private** `--_x`: knobs inside one component, never read from outside.

CSS cascade layers (declared first in the page head by `nuxt.config.ts`): `sym-reset, sym-tokens, sym-base, sym-components, sym-utilities, sym-project`. Unlayered app CSS beats all of them; avoid it.

## Tones (colour)
`data-tone` on a `SymSection` / `SymCard` (or any element) switches the whole colour set for everything inside:

| Token | Meaning |
|---|---|
| `--sym-bg` / `--sym-fg` | surface and text on it (the solid button is fg-filled with a bg label) |
| `--sym-fg-muted` | secondary text (≥ 4.5:1) |
| `--sym-fg-large` | text ≥ 24 px only; violet allows cream here (3.37:1) |
| `--sym-rule` / `--sym-rule-soft` | structural hairline (≥ 3:1) / decorative divider |
| `--sym-accent` | orbits, marks, big geometry: decorative, never text |
| `--sym-link`, `--sym-focus` | link colour, focus ring |

Tones: `paper` (cream, page default), `white`, `lilac`, `violet`, `apricot`, `plum`. `pnpm ds:contrast` verifies every pair; a new or changed tone must pass it.
Known design facts: violet + cream is 3.37:1 (large text only); violet + apricot 2.49:1 (decorative only). There is no dark theme yet: add it as tones, in `tones.css` only.

## Space, type, widths
Fluid between a 390 px phone and a 1440 px desktop. Steps `--sym-space-3xs … 4xl`; semantic `--sym-gap-stack|inline|grid`, `--sym-section-y`, `--sym-page-margin`, `--sym-pad-card`.
Fonts: `--sym-font-display`, `--sym-font-text`, `--sym-font-brand` (the logo typeface, wordmark only).
Type roles `--sym-text-display-xl … caption` are applied through `.sym-t-*` classes (components `SymHeading`, `SymText`, `SymEyebrow`). Widths `--sym-width-page|wide|narrow|prose`.

## Shape and lines
Roles first: `--sym-shape-card|media|control|chip|popup` point at the radius scale (`--sym-radius-*`). Current look: square cards and media, pill controls, hairline rules (`--sym-rule-width`).
A design pass changes these role lines, not components. Elevation exists only for floating things (`--sym-shadow-float`); z-index only as `--sym-z-*`.

## Project theme (autonomous project sites)
A project app extends the layer and may change **tokens**, never component CSS. Create `app/assets/css/theme.css` in the app, list it in `css`, and write
`@layer sym-project { :root { --sym-font-display: …; } [data-tone='violet'] { --sym-bg: …; } }`. Rules: tokens only; keep the contrast contract (re-run `pnpm ds:contrast` for any new tone colours);
keep the compact «Проєкт ГО «Символ»» bar (`SymProjectBar`) and a link back to `symbol.ngo`. New fonts must have a Cyrillic subset and be self-hosted.
`pnpm ds:lint` exempts `theme.css` from the raw-colour rule and nothing else.
