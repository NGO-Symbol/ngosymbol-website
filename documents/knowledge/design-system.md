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
Typography is a provisional Cyrillic-capable pair (Source Serif 4 + Manrope) because Newsreader and DM Sans have no Cyrillic; final fonts and exact tone values are decided in the design pass.

## Visual principles

- The spiral means movement, attention, return, and collected stories.
- Use the spiral as crop, orbit, mask, framing device, or spatial system—not as repeated decorative wallpaper.
- Main-site typography should pair a contemporary editorial serif for display copy with a clear sans serif for navigation, metadata, and body text.
- Project sites may define their own typography and layout.
- The institutional connection can shrink to a compact “A project by NGO Symbol” bar on autonomous sites.

## Shared versus project identity

Shared: original mark, organization name, backlink pattern, accessibility baseline, and institutional metadata.

Project-owned: palette extensions, fonts, grids, motion, content components, navigation, and page composition.

The original uploaded logo asset is stored at `packages/brand/assets/symbol-mark.png`.

