---
name: mobile-native
description: Checklist for a web app that should feel installed on a phone - hover gating, tap highlight, dvh, input zoom, safe-area insets, overscroll, long-press callouts, touch targets, momentum scrolling, keyboard overlap, real-device testing, plus optional Telegram Mini App notes. Use when writing or reviewing mobile-facing CSS, layout or touch behaviour.
metadata: {pack: skill-pack, id: mobile-native, version: 1.0.0}
---
# mobile-native

Apply to the touched files only. For each rule, grep the diff, fix what violates it, and mention
the exceptions you kept on purpose.

## Checklist
1. **Hover only for hovering pointers.** Wrap every `:hover` style in
   `@media (hover: hover) and (pointer: fine) { ... }`. Touch browsers keep `:hover` "stuck"
   after a tap. Pair it with `:active` feedback that works on touch.
2. **Tap highlight.** `-webkit-tap-highlight-color: transparent` on the app root, and give
   every tappable element its own `:active` state so the press is still visible.
3. **Viewport units.** `100vh` includes the browser toolbar on phones. Use `100dvh` (with a `100vh`
   fallback line before it) for full-height shells, `svh` for "always visible" bottom bars.
4. **Input zoom.** iOS zooms in on focus when an input's font-size is under 16px. Keep
   `input, select, textarea { font-size: 16px }` (or larger) on touch. Never disable user zoom in the
   viewport meta to hide this.
5. **Safe areas.** `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
   and pad fixed bars with `env(safe-area-inset-top|right|bottom|left)`, e.g.
   `padding-bottom: max(12px, env(safe-area-inset-bottom))`.
6. **Overscroll and pull-to-refresh.** `overscroll-behavior: none` on the root so a drag does not
   reload the page or bounce the shell; `overscroll-behavior: contain` on inner scrollers so they
   do not chain into the page.
7. **Long press and selection.** On controls and chrome: `-webkit-touch-callout: none` and
   `user-select: none`. Leave selection ON for content people copy (text, codes, addresses).
8. **Touch targets.** Interactive elements at least 44x44 CSS px including padding (extend the hit
   area with padding or a pseudo-element, not by enlarging the visual). 8px minimum between
   neighbours.
9. **Momentum scrolling.** One scroll container per screen where possible; for inner ones keep
   native scrolling (`overflow: auto`) and never replace it with a JS scroller. Avoid
   `overflow: hidden` on `body` as the only scroll lock; lock the shell and scroll an inner pane.
   Scroll must stop at a visible edge, not in empty space.
10. **Keyboard overlap.** When the keyboard opens, the focused field must stay visible. Use
    `interactive-widget=resizes-content` in the viewport meta or the VisualViewport API
    (`visualViewport.height`) to resize the shell; keep primary actions above the keyboard.
    Test with a long form and a bottom-fixed button.
11. **Fixed elements and transforms.** Do not rely on `position: fixed` inside a transformed
    ancestor (it becomes relative to it). Avoid `100vw` (includes scrollbar); use `100%`.
12. **Real device.** Emulators miss the toolbar, keyboard, safe areas and stuck hover. Before
    calling it done, open the build on a real iPhone and a real Android phone (LAN URL or a
    tunnel) and try: scroll to the end, open the keyboard in the last field, rotate, tap fast,
    long-press a button.

## Optional: Telegram Mini App
- Read the real viewport from the WebApp object: `Telegram.WebApp.viewportHeight` and
  `viewportStableHeight`; listen to `viewportChanged` and set a CSS variable (e.g. `--tg-vh`) from
  `viewportStableHeight` for layout so the shell does not jitter during sheet drags.
- Call `Telegram.WebApp.ready()` and `expand()` on load; `disableVerticalSwipes()` when the app
  has its own vertical scrolling or drag gestures, so the sheet does not close mid-scroll.
- Safe areas: use `safeAreaChanged` / `contentSafeAreaChanged` values on top of `env()` in
  fullscreen mode. Theme: read `themeParams` and the `themeChanged` event.
- Back button and haptics belong to the WebApp API (`BackButton`, `HapticFeedback`), not custom
  UI. Test inside Telegram on a real phone; a desktop browser has none of these.

## Done when
- Each rule above was checked against the changed files, with violations fixed or justified.
- No bare `:hover`, no `100vh` for full-height layout, no input under 16px on touch.
- The screen was opened on a real phone (or the report says it was not, and why).
