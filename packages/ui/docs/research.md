# Research: where this system comes from

Done 2026-10-28. Sources: the owner's studio design system `studio-ui` (read in full: docs, tokens, motion, density, component contract, gallery, tooling), the current site code, and checks listed below.
The point: reuse what makes studio-ui good for AI agents, change what belongs to an *app* rather than a *public editorial site*.

## Kept from studio-ui (and why)
| Idea | Why it matters here |
|---|---|
| **Agent contract in AGENTS.md** («pages only from components and tokens»), router docs (`CONTEXT.md` → one note), one fact one home | Friends' agents load only what a task needs and cannot invent styles. |
| **Token tiers + cascade layers**, no raw values in components | One place to change the look in the coming colour/design pass. |
| **Registry + live examples + states + generated API table + use/avoid** per component | An agent can grep «when to use / avoid» next to the code, and a person can judge every component in a browser. |
| **Motion ladder** (tier by what moves, exit one step down, colour one step faster, shared clock, reduced motion = travel 0) | All animation feels like one family; rules are checkable. |
| **Layout primitives** (Stack/Cluster/Grid/Split/Container/Section) | Pages never write flex/grid CSS: spacing and responsiveness come for free. |
| **Verify visually** (screenshot script, crawl for overflow/console/a11y) | Agents prove the result at 390 / 768 / 1280 before «done». |
| **Hover only on hover devices, 44 px targets, no tap flash, stable scroll gutter** (from its phone review) | Mobile bugs the owner already hit once are designed out. |
| **Concentric/rounded-highlight rules, tinted layered shadows** | Kept in spirit: shadows only for floating things, tinted with plum. Concentric corners dropped (cards are square). |

## Changed
| studio-ui (app) | Here (public site) | Reason |
|---|---|---|
| Material 3 Expressive roles from one seed colour (runtime palette engine) | **Six fixed tones** (`data-tone`), contrast-tested by script | Fixed brand palette; tones recolour a whole section, which is how the Orbit design works (colour fields). |
| Density by pointer (compact desktop / comfortable touch) | **Fluid scale** 390 → 1440 px + container queries | Content site: reading comfort and responsiveness, not data density. |
| Rounded M3 shapes, state layers | Square editorial shapes, hairline rules, pill controls (role tokens, adjustable) | The approved «Orbit + Index» direction. |
| Roboto Flex + Material Symbols font (5 MB) | Serif + sans (Cyrillic-checked, self-hosted), **hand-drawn inline SVG icons** | Weight and the Cyrillic finding below. |
| SPA (`ssr:false`), theme flash avoided by client plugin | **Static prerender**; reveal hides content only after hydration | SEO, speed, no-JS visitors. |
| Motion caps at 500 ms (app UI) | + **hero 700 ms** tier, 60 ms stagger, ambient orbit rotation | Marketing/editorial pacing. |
| Gallery inside the layer, SPA, hidden | **Separate app** (`apps/design`) published at `symbol.ngo/design/` | Must be viewable from a phone; must not leak into site builds. |
| Hard rule «no custom CSS in apps» | Same for pages; **projects may override tokens** in `@layer sym-project` (`theme.css`) | ADR-0001/design-system: autonomous projects own palette extensions and fonts. |

## Not adopted (and why)
Haptics (a content site has no app-like controls; Android vibration on links would be noise) · Glass/blur surfaces (flat editorial look; revisit in the design pass) · Stacked sheet navigation (records are pages here; only the mobile menu is a takeover) ·
Data tables, charts, forms, snackbar, theme picker (no such features yet; forms are in the backlog) · Reka UI (no complex widgets yet; native `<details>`/`<dialog>` first).

## Findings that changed the plan
1. **The current site's fonts have no Cyrillic.** Newsreader and DM Sans (Google Fonts API, subsets `latin latin-ext vietnamese` / `latin latin-ext`) lack `cyrillic`, so every Ukrainian string rendered in Georgia / system sans. Fixed by a Cyrillic-checked pair, self-hosted. The pair is provisional (design pass).
2. **Violet is mid-tone.** Ink on violet 4.68:1, cream on violet only 3.37:1 (fails body text; the current contact page uses cream on violet). Tones therefore give violet ink text and allow cream only for large text. Violet + apricot is 2.49:1: decorative only.
3. **CSS layer order is fixed by the first `@layer` statement the browser meets.** Component styles load in separate chunks before the token file; without an inline statement first in `<head>`, component styles lose to the reset. Handled in the layer config; recorded in [[component-contract]].
4. **Scroll-driven CSS animations** (`animation-timeline: view()`) work in Chrome/Edge and Safari 26+, not Firefox by default (2026); so reveals use IntersectionObserver (universal) and scroll-driven effects are not relied upon.
5. **View Transitions API** in Nuxt is experimental (`experimental.viewTransition`); route changes use the stable Vue transition (fade through). Revisit when it leaves experimental.
6. **GitHub Pages serves static files only**: no server runtime; everything (reveal, header state, menu) is client-side progressive enhancement over complete HTML.

## Open for the design pass
Final type pair · exact tone values and a possible dark theme · card/shape language (square vs soft) · photo treatment · a vector spiral for the logo (only a raster PNG exists) · animation personality of the hero.
