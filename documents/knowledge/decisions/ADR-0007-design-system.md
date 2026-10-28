# ADR-0007: Design system as a Nuxt layer with a published gallery

- Status: Accepted
- Date: 2026-10-28

## Context

The sites are built by people without coding experience through their own AI agents. Pages must come out uniform on desktop and phones, with consistent motion, and agents must not invent styles. The owner's studio design system (`studio-ui`, Material 3 Expressive for an internal app) already solved the agent workflow well; this site is a public editorial site with a fixed brand palette. The previous fonts (Newsreader, DM Sans) have no Cyrillic subset.

## Decision

`USER_CONFIRMED` (2026-10-28): build a design system before developing pages.

- `packages/ui` (`@symbol/ui`) is a Nuxt layer: fluid tokens, six contrast-tested colour tones, a motion ladder, and `Sym*` components. Apps use it with `extends: ['@symbol/ui']`.
- Pages use only components and tokens (enforced by `pnpm ds:lint`); autonomous project sites may override tokens in `@layer sym-project` (`theme.css`).
- `apps/design` is the gallery (components with live examples, states, API tables, foundations, page templates). It is published at `symbol.ngo/design/` (static, noindex) so it can be opened on a phone; built into the main site artifact by the Deploy workflow.
- Agent contract in `AGENTS.md` + `.agents/skills/build-with-design-system`; the handbook lives with the code in `packages/ui/docs/` (router `CONTEXT.md`); this knowledge base keeps only decisions.
- Fonts are self-hosted and Cyrillic-checked: Source Serif 4 + Manrope as a **provisional** pair.

## Alternatives considered

- Reuse `studio-ui` directly: Material 3 shapes/density/roles do not fit the editorial «Orbit + Index» direction, it ships a 5 MB icon font, and it is an SPA.
- A utility CSS framework (Tailwind) plus ad-hoc components: fast, but gives agents freedom to diverge visually; no contract.
- Gallery only locally: rejected by the owner (needs to review from a phone).

## Consequences

- Existing pages (`apps/main`, `apps/istoriia-vulytsi`) still use hand-written CSS until migrated; `ds:lint` enforces only apps that extend the layer.
- Typography and colour values are expected to change in the design pass; they live in `tokens.css` / `tones.css`.
- A dark theme, forms and a vector logo are future work (see `packages/ui/docs/component-backlog.md`, `research.md`).
