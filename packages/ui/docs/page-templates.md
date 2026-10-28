# Page templates

Five reference pages, live in the gallery under «Шаблони сторінок» (`/templates/<name>`, open them on a phone). They are built **only** from `Sym*` components; the real site pages are copies of them with real content.
Start by copying the matching file in `apps/design/app/pages/templates/`.

Common frame (layout of every page): `SymSkipLink` → (`SymProjectBar` on project sites) → `SymSiteHeader` → `<main id="main">` sections → `SymSiteFooter`. Tones alternate to set the rhythm (paper → violet/apricot → paper → plum).

| Template | Anatomy | Use for |
|---|---|---|
| **home** | Hero (`PageHeader` xl + intro + 2 buttons, orbit bleeding off the corner) → featured band (violet, `Callout`/card) → «Вибране» (`SectionHeading` + `Grid` of `ProjectCard`, `Reveal`) → statement band (apricot) | the landing page |
| **projects** | `PageHeader` → `FilterBar` → `Grid` of `ProjectCard` → archive grid → `EmptyState` for no results | the project list |
| **project** | `PageHeader` (tone by project) → `Split aside`: sticky `MetaList` + `Prose`/`Media`/`Gallery` → `PersonCard` grid (team, confirmed only) → `LogoWall` (partners) → `Callout` | one small-project page; sections may be omitted |
| **about** | `PageHeader` → large statement (`Heading` display + `Text`) → `Timeline` or `Split` → team `PersonCard` grid | the organization |
| **contact** | full-height violet `Section` with `PageHeader`, `Cluster` of `Link`s (mail, Instagram), `Text` | contacts |

Rules: one h1 per page (in `PageHeader`); every section has a heading (`SectionHeading`) or an `aria-label`; first block after the header needs no extra top space (the header is sticky, `scroll-padding-top` handles anchors);
images below the fold lazy; content without facts yet uses `EmptyState` / placeholder `Media`, never invented text.
