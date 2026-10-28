# Motion

> One duration ladder (80 / 120 / 180 / 250 / 350 / 500 / 700 ms) × curve roles. The tier is chosen by what moves; exits are one tier shorter; colour and opacity run one tier faster than movement;
> parts of one object share one clock. Adapted from the studio design system (`studio-ui`), tuned for a calm editorial site. Live demo: gallery → Основи → Рух.

## Ladder (tokens `--sym-dur-*`, multiplied by `--sym-motion-scale`)
| Tier | ms | What moves here |
|---|---|---|
| instant | 80 | link colour, state layer |
| micro | 120 | arrow nudge, icon swap |
| small | 180 | button fill, chip, underline thickness, card lift |
| medium | 250 | accordion, banner, tabs |
| large | 350 | route change, drawer panel, header condense, reveal of text and cards |
| xlarge | 500 | full-screen menu |
| hero | 700 | reveal of large media, hero intro (**this site only**: app UIs cap at 500) |
| ambient | 60 000 | orbit rotation (not scaled) |

## Rules
1. **Tier = the larger of size and travel.** A card rising 24 px is `large`; a button fill is `small`.
2. **Exit = one step down** (`--sym-t-*-out`, exit curve). **Effects** (colour, opacity) one step faster: `--sym-t-fx-*`, standard curve, never an overshoot.
3. **Curves:** `--sym-ease-spring` (soft spring, for things that move or resize), `--sym-ease-enter/-exit` (appear / leave), `--sym-ease-emph-enter` (long decelerating tail: reveals, hero), `--sym-ease-standard` (colour).
4. **Pattern:** `transition: translate var(--sym-t-small), color var(--sym-t-fx-small)`. Enter timing on the open state, exit timing on the base state.
5. **Press is instant**, release springs back. Hover motion only inside `@media (hover: hover)`; hover is decoration, never the only way to do or see something.
6. **Stagger:** 60 ms between siblings, at most 6 steps (editorial pace; the studio's app UI uses 20 ms). Never on tables or repeated actions.
7. **Compositor only:** animate `transform`/`translate`/`scale`/`opacity`/`clip-path`; height only in small blocks (accordion). No layout-thrashing scroll listeners: use IntersectionObserver (`useInView`, `useScrolled`, `v-reveal`).
8. **Reduced motion** (OS setting, or `<html data-motion="reduce">`; `data-motion="full"` forces motion on): `--sym-motion-travel: 0` turns every translate/scale into a fade, `--sym-stagger: 0`, wipe → fade, the orbit stops. Multiply every translate/scale delta by `var(--sym-motion-travel)`.

## Patterns on this site
| Change | Pattern | Built in |
|---|---|---|
| Block appears while scrolling | **reveal**: rises 24 px + fades, once; below the fold only; siblings entering together queue | `SymReveal`, `v-reveal` (`plugins/reveal.ts`) |
| Image appears | **wipe**: uncovered top → bottom, hero tier | `SymReveal kind="wipe"`, `SymMedia reveal` |
| Route change | **fade through**: old fades fast, new fades in and rises 12 px | `app.pageTransition` `sym-page` (layer config) |
| Header after scroll | hairline + float shadow appear (colour/opacity only) | `SymSiteHeader` + `useScrolled` |
| Mobile menu | **takeover** 500 ms, links stagger | `SymSiteHeader` |
| Card / link hover | lift 5 px, arrow nudge 3 px, underline 1 → 2 px | `SymCard`, `SymButton`, `SymLink` |
| Orbit | slow rotation, paused off screen | `SymOrbit spin` |

## Content is never hidden by motion
Reveals are applied after hydration, only to elements below the fold. The HTML a crawler, a print preview or a no-JS visitor gets shows everything. Do not use `opacity: 0` in CSS as a starting state.
