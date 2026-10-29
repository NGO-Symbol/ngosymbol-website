---
name: build-with-design-system
description: Build or change any page, section, component, style, animation or layout of the NGO Symbol sites with the design system (@symbol/ui). Use for every UI task — new page, edit text/layout, make it responsive, add animation, new component, fix how something looks on a phone — including «зроби сторінку», «додай секцію», «змінити вигляд», «адаптуй під телефон», «анімація».
---

# Build with the design system

Inputs · Process · Outputs · Audit. The design system makes every page uniform: pages are assembled from `Sym*` components and tokens, never from custom CSS.

## Inputs
- The task, and `packages/ui/docs/CONTEXT.md` (the router: read ONE note per question, then follow its links once).
- Content facts only from `documents/knowledge/` (organization, project registry). Never invent numbers, quotes, people, partners.

## Process
1. Open `packages/ui/docs/selection-guide.md` → pick components by job. Copy the nearest template from `apps/design/app/pages/templates/` (see `page-templates.md`).
2. Read the registry entry of each component you use: `packages/ui/ds/registry/<Name>.ts` («use / avoid», props). The live gallery: `pnpm dev:design` → http://localhost:3002 (published: https://symbol.ngo/design/).
3. Compose with `SymSection tone` → `SymStack` / `SymCluster` / `SymGrid` / `SymSplit`. Colour = the section's `tone`. Text = `SymHeading` / `SymText`. Motion = `SymReveal`.
4. **No raw hex / px colours / font sizes / durations / z-index, no own flex/grid, no `<style>` for layout in pages.** If something is missing, add a component following `packages/ui/docs/component-contract.md`
   (SFC + registry entry + examples), not page CSS. A project site may only change tokens in its `theme.css` (`foundations/tokens.md` → Project theme).
5. Check it on a phone first: `pnpm ds:shot <url> <out.png> 390 844`, then 768 and 1280; look at the PNGs (Read the image). One `h1`, headings in order, images with `alt`.

## Outputs
Pages/components using only the design system; updated registry entry/examples when a component changed; knowledge-base update if a durable decision changed (`symbol-project-memory`).

## Audit (before saying «done»)
`pnpm ds:lint` (no violations) · `pnpm ds:contrast` (when tones changed) · `pnpm ds:crawl` against the running gallery (no console errors, no horizontal overflow, no serious a11y issues) · screenshots at 390/768/1280 inspected · then `site-workflow` to save/publish.
