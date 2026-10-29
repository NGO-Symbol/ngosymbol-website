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

## Visual principles

- The spiral means movement, attention, return, and collected stories.
- Use the spiral as crop, orbit, mask, framing device, or spatial system—not as repeated decorative wallpaper.
- Main-site typography should pair a contemporary editorial serif for display copy with a clear sans serif for navigation, metadata, and body text.
- Project sites may define their own typography and layout.
- The institutional connection can shrink to a compact “A project by NGO Symbol” bar on autonomous sites.

## Logo

The official logo (mark + «СИМВОЛ» + «громадська організація») comes from the organization's Drive folder «Актуальні логотипи Символу» and is stored as `packages/brand/assets/symbol-logo.svg`. `apps/main/app/components/SymbolLogo.vue` renders it inline: the inscription takes `currentColor` (ink on light, cream on dark), the mark keeps violet `#9280A6` and apricot `#FDD08F`. Parts: `full`, `mark`, `wordmark`. Generic arcs/“C” shapes are not used as a stand-in for the mark. `USER_CONFIRMED` 2026-10-29.

## Motion

Motion follows the identity: Symbol as a whole moves along the spiral and the orbit (movement, attention, return, collected stories); every project moves in its own way, taken from what the project is about. `USER_CONFIRMED` 2026-10-29 (principle, more expressive motion); concrete motions `PROPOSED`.

- **Intro**: once per browser session, ≈2 s, click or key skips, off for `prefers-reduced-motion`. Four variants rotate per visit (sweep reveal, spin-in, iris, drop with rings); the official inscription is revealed under the mark, then the mark flies to the header logo.
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

