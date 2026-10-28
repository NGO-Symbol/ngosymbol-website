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

Every kind of interaction has its own motion, built from the logo's shapes (circle, spiral arc, diamond). `USER_CONFIRMED` 2026-10-29 (wanted: different animations for intro, clicks, page transitions, logo clicks); concrete motions `PROPOSED`.

- **Intro**: on the first page view of a browser session; ≤1.5 s; click or key skips; disabled for `prefers-reduced-motion`. Four variants rotate on each new visit: circular sweep reveal, spiral spin-in, iris opening, drop-in with spreading ring.
- **Home visual hook**: project titles with years circle the spiral mark on an orbit; hover pauses it and shows the project line; each title links to its project.
- **Clicks**: a short shape at the pointer, by control type — diamond (orbit titles), spiral arc (project and person cards), dot burst (main navigation), ring (buttons and filters), wave (events and open calls), small spark (other links). Buttons and cards also press in slightly.
- **Page transitions** by section: Home and Contact fade; Projects rise; a project page zooms in; Events slide sideways; People blur in; Opportunities and About open like a curtain; Support tilts in.
- **Header logo**: each click plays the next of five mark animations (spin, bounce, flip, wobble, pulse).

## Shared versus project identity

Shared: original mark, organization name, backlink pattern, accessibility baseline, and institutional metadata.

Project-owned: palette extensions, fonts, grids, motion, content components, navigation, and page composition.

The original uploaded logo asset is stored at `packages/brand/assets/symbol-mark.png`.

