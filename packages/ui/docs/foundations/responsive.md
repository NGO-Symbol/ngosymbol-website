# Responsive: phone, tablet, desktop

> Mobile first. Components adapt to the width of their **container** (container queries), not the window, so the same component works in a narrow column and full width. Test at 390 and 320 px before 1280.

## Window classes (Material's, shared vocabulary; numbers in `@media` because variables do not work there)
compact < 600 (phone) · medium 600–839 · expanded 840–1199 · large 1200–1599 · xlarge ≥ 1600.
Fluid tokens interpolate 390 → 1440 px, so there are few hard steps: the header switches to the drawer below 840 px, grids go 1 → 2 → N columns by their own width.

## Rules
- **Default CSS is the phone layout**; widen with `@container` or `auto-fit` grids. Give size containers `width: 100%`.
- **Touch:** targets ≥ 44 px (`--sym-size-touch`; an invisible `::after` grows small visuals); hover styles only in `@media (hover: hover)`; `:active` state layer; no tap highlight, no double-tap zoom delay.
- **No horizontal page scroll** at 320 px. Long Ukrainian words break (`overflow-wrap: anywhere` on display type). Chip rows scroll sideways with a fading edge (`SymFilterBar`, `SymCluster scroll`).
- **Menu:** full-screen drawer on phones (focus trap, Esc, scroll lock). **Forms** (later): inputs ≥ 16 px, otherwise iOS zooms.
- **Images:** always with a ratio or size (`SymMedia`), lazy below the fold; art-directed crops through `ratio`.
- **Stable width:** `scrollbar-gutter: stable` so content never jumps when the scrollbar appears.
- **Safe areas:** fixed bars add `env(safe-area-inset-*)`; the viewport meta uses `viewport-fit=cover` where bars touch the edge.
- **Never branch markup on `window.innerWidth`** (SSR mismatch): use CSS.

## Verify
`pnpm ds:shot <url> out.png 390 844` (touch emulation below 700 px), the gallery bar «Ширина сцени» (768 / 390 / 320) for any example, and `pnpm ds:crawl` (overflow, console, touch size, axe) over every page.
