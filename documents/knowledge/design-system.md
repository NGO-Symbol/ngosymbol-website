# Design system direction

## Approved direction

Combine:

- the composition, warm field, and color balance of design **A / Orbit**;
- the editorial serif typography character of design **C / Index**.

`USER_CONFIRMED`, 2026-10-10.

## Logo-derived palette

- Symbol violet: `#9280A6`.
- Symbol apricot: `#FDD08F`.
- Deep plum for accessible text: `#302738`.
- Ink: `#211B28`.
- Warm cream: `#FFF7EB`.
- Light lilac: `#D8CFE1`.

The two original logo colors have insufficient contrast against each other for ordinary body text. Use deep plum/ink on apricot and cream on deep plum. Keep violet/apricot pairings for large marks, backgrounds, and decorative geometry.

## Implementation

The design system is implemented in `packages/ui` (tokens, tones, motion, `Sym*` components) and documented in `packages/ui/docs/CONTEXT.md`; the live gallery is `symbol.ngo/design/` ([ADR-0007](decisions/ADR-0007-design-system.md)). This file keeps the direction; the handbook keeps the rules.
The logo (`packages/brand/assets/symbol-logo.svg`), the mark (`symbol-mark.svg`) and the spiral (`symbol-spiral.svg`) are vector, taken from the organization's logo file; `SymOrbit` is the logo's real spiral. The logo typeface (`packages/brand/fonts`) sets the wordmark and organization name only.
Typography (USER_CONFIRMED 2026-10-29): Playfair Display for headlines, Commissioner for text, the logo face EXDocument for labels, navigation, meta and big numerals (variant C). Chosen from six measured pairs; method in `packages/ui/docs/foundations/font-selection.md`, check a new candidate with `pnpm ds:font`. Newsreader and DM Sans (still imported by the not-yet-migrated main and street apps) have no Cyrillic. Final tone values are decided in the design pass.

## Icons

The tab icon is the mark (circle with the spiral): `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png`, Android icons and a web manifest, all generated from `packages/brand/assets/symbol-mark.svg` by `scripts/build-icons.mjs` and served by the `@symbol/brand` layer (every app extends it, so the links are added automatically, with the app's base path).

## Visual principles

- The spiral means movement, attention, return, and collected stories.
- Use the spiral as crop, orbit, mask, framing device, or spatial system—not as repeated decorative wallpaper.
- Main-site typography should pair a contemporary editorial serif for display copy with a clear sans serif for navigation, metadata, and body text.
- Project sites may define their own typography and layout.
- The institutional connection can shrink to a compact “A project by NGO Symbol” bar on autonomous sites.

## Typography

The main site uses the **Zakon** family (Regular, Italic, Bold, Bold Italic) supplied by the team in `fonts/` (served from `apps/main/public/fonts/zakon/`) for headings and display text (`--font-display`), and **Source Serif 4** (variable, self-hosted from `@fontsource-variable/source-serif-4`, finer serifs) for running and small text (`--font-body`). `USER_CONFIRMED` 2026-10-29: the team likes Zakon for large letters and wants a serif with smaller serifs for small text. Zakon headings need loose leading: display line-height is at least 1.04 and letter-spacing no tighter than −0.015em, otherwise accents (Й, Ї) collide with the line above. Project pages with their own identity override these variables. Web-embedding licence of Zakon to be confirmed.

## Home photo orbit (removed)

A ring of random exhibition photos inside the home orbit was tried on 2026-10-29 and removed at the team's request: it did not work visually. The `Photo.people` flag that keeps photos of people out of such selections stays in the data.

## Going home

Any way home (logo click or link to `/`, `/en`) plays a violet disc that spreads from the click point and then shrinks back into the disc of the header logo (`RouteWipe.vue`). On the home page itself the logo click plays the same circle without navigating. `USER_CONFIRMED` 2026-10-29.

## Partner logos

Partner and donor logos are shown transparent (no plate) and each moves in the rhythm of its own mark, once when the tile scrolls into view and again on hover (`PartnerLogo.vue`): ЄрміловЦентр blocks slide in and letters light up; Karazin's emblem shapes rise in order; ZMINA letters shift in one by one; ECF words drop in line by line; MH4U beats twice; Creative Europe's ring of stars turns; «Нема» opens like a curtain. SVG logos are inlined so each shape can move; in dark mode logos are inverted with their hue kept. Organizations without a logo file show the name only. `USER_CONFIRMED` 2026-10-29.

## Light and dark mode

Light and dark themes follow the system setting; a toggle in the header (half-filled circle that turns) stores the visitor's choice. In dark mode page surfaces become dark, while brand-coloured blocks (project cards and heroes, support band, open calls, subscribe band) stay as light «islands» so the violet/apricot palette keeps its contrast. `USER_CONFIRMED` 2026-10-29.

## Logo

The official logo (mark + «СИМВОЛ» + «громадська організація») comes from the organization's Drive folder «Актуальні логотипи Символу» and is stored as `packages/brand/assets/symbol-logo.svg`. `apps/main/app/components/SymbolLogo.vue` renders it inline: the inscription takes `currentColor` (ink on light, cream on dark), the mark keeps violet `#9280A6` and apricot `#FDD08F`. Parts: `full`, `mark`, `wordmark`. Generic arcs/“C” shapes are not used as a stand-in for the mark. `USER_CONFIRMED` 2026-10-29.

## Motion

Motion follows the identity: Symbol as a whole moves along the spiral and the orbit (movement, attention, return, collected stories); every project moves in its own way, taken from what the project is about. `USER_CONFIRMED` 2026-10-29 (principle, more expressive motion); concrete motions `PROPOSED`.

- **Intro**: once per browser session, ≈2.4 s, click or key skips, off for `prefers-reduced-motion`. Four variants rotate per visit (sweep reveal, spin-in, iris, drop with rings); the official inscription is revealed under the mark, then the circle spirals (two turns along a curved path) straight into the mark of the header logo, which appears only when the circle lands. `USER_CONFIRMED` 2026-10-29.
- **Everywhere**: section labels carry a small spiral arc that turns when the section appears; link underlines draw in like the logo's arc; every page has its own transition; lists, cards, stats, gallery items and CV sections rise in on scroll.
- **Home hook**: project titles with years orbit the mark; the orbit tilts toward the pointer, turns further on scroll, pauses on hover, and spins away when a title is clicked.
- **Project motifs** (`ProjectMotif.vue`, `motif` field of a project) on cards and project heroes: Історія моєї вулиці — streets drawn like a map with a walker; Голоси у русі — sound waves; Покажіть свої документи — shuffling sheets and a landing stamp; Тренінги mhGAP — breathing circles; Історії різних — playback curtains opening on a spotlight; Збирач конвалій — a running film strip; 2, 10, 300 років потому — three rings of time; Харківське море — waves.
- **Between sections**: a disc in the target section's colour spreads from the click with the logo turning in it, then closes over the new page; each section also has its own page transition (rise, zoom, slide, blur, curtain, tilt).
- **On scroll**: blocks rise into place one after another.
- **Clicks**: a shape at the pointer by control type (diamond, spiral arc, dot burst, ring, wave, spark); buttons and cards press in.
- **Header logo**: each click plays the next mark animation (spin, bounce, flip, wobble, pulse).

## Project identities on the main site

Every project page carries its project's own identity where one exists (`theme` field of a project, `apps/main/app/assets/css/theme-*.css`). `USER_CONFIRMED` 2026-10-29.

- **Покажіть свої документи…** (`theme: 'documents'`), from the exhibition's logo, banner, and invitation: black/white/grey paper, the project font **EXDocument** by Олексій Чекаль (created for the exhibition; `apps/main/public/fonts/EXDocument.otf`, from the Drive), IBM Plex Mono text (as on the former project site), translucent grey tape strips behind the title, barcode-like rules, and a round blue stamp with the title around a QR-like centre. Motion: rules draw, tapes slide in, words are «typed», the stamp lands. Photos are greyscale until hovered.

## Shared versus project identity

Shared: original mark, organization name, backlink pattern, accessibility baseline, and institutional metadata.

Project-owned: palette extensions, fonts, grids, motion, content components, navigation, and page composition.

The original uploaded logo asset is stored at `packages/brand/assets/symbol-mark.png`.

