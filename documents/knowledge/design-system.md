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

## Motion

- Intro: on the first page view of a browser session the spiral mark draws itself (≤1.5 s), then the overlay lifts. Click or key skips it; it is disabled for `prefers-reduced-motion`. `USER_CONFIRMED` (intro wanted), implementation `PROPOSED`.
- Home visual hook: project titles with years circle the spiral mark on an orbit; hovering pauses the orbit; each title links to its project. `PROPOSED`, 2026-10-29.

## Shared versus project identity

Shared: original mark, organization name, backlink pattern, accessibility baseline, and institutional metadata.

Project-owned: palette extensions, fonts, grids, motion, content components, navigation, and page composition.

The original uploaded logo asset is stored at `packages/brand/assets/symbol-mark.png`.

