# Component backlog (planned APIs)

APIs agreed before building so pages and templates can be written against them. When a component ships, delete its entry here and document it in its registry file.
Conventions: props camelCase; `tone` values `paper | white | lilac | violet | apricot | plum`; content comes in through slots, data through props.

## Navigation and site frame
- **IconButton** — `icon` (SymIcon name), `label` (required: aria-label + tooltip), `size` `m|l`, `variant` `plain|outline`, `to|href`. Round, 44 px minimum.
- **SiteHeader** — `items: { label: string; to?: string; href?: string }[]`, `languages?: { code: string; label: string; to?: string; current?: boolean; disabled?: boolean }[]`, `cta?: { label; to|href }`.
  Slot `#logo` (default: `SymWordmark`). Sticky; gets a hairline + `--sym-shadow-float` only after scroll (`useScrolled`). Desktop (≥ 840 px container/window): inline nav; below: a menu button opens a full-screen
  drawer (`xlarge` tier, links stacked in `headline` size, staggered, focus trapped, Esc / link tap closes, `aria-expanded`, body scroll locked). `aria-current="page"` on the active item.
- **SiteFooter** — `tone` (default plum), slots `#brand`, `#nav`, `#contact`, `#legal`; columns collapse to one on phones. Includes the compact «ГО «Символ»» block via `SymWordmark`.
- **ProjectBar** — compact strip for autonomous project sites: «Проєкт ГО «Символ»» + link back `symbol.ngo` (`href`, `label`). Tone plum, ≤ 40 px tall. ADR-0001.
- **SkipLink** — «Перейти до змісту», first in tab order, visible on focus; target `#main`.
- **Breadcrumb** — `items: { label; to? }[]`, last is current (`aria-current`). Collapses to «← parent» on phones.
- **Wordmark** — `SymMark` + «СИМВОЛ» (`label` slot optional), `to`, `size` `sm|md`. Used by header, footer, project bar.

## Text and structure
- **SectionHeading** — `eyebrow?`, `index?` (e.g. «01»), `title` (rendered as `level`, default 2, size `display`), `intro?` (slot `#intro`), slot `#action`. The existing «label + big title + side paragraph» block: Split 7:5 on wide containers, stacked on narrow.
- **PageHeader** — page title block: `eyebrow?`, `title` (h1), `lead?`, `size` `xl|lg`, slot `#meta`, `#actions`. Top spacing for the first block after the header.
- **Prose** — wrapper for rich content (markdown/HTML) styling `h2 h3 p ul ol blockquote figure img a hr table code`; max 66ch; applies type roles; first/last child margin trimmed.
- **Quote** — `cite?`, `source?`; slot = the quote; `sym-t-quote` serif italic with a large accent mark; used as pull quote. Real quotes only (AGENTS.md).
- **Divider** — `strong?`, `label?`; hairline `--sym-rule`.
- **MetaList** — `items: { label: string; value: string }[]` rendered as `<dl>`: project facts (період, статус, напрям, географія). Two columns on wide containers.
- **Tag** — non-interactive pill: `tone` (inherit) , `status?: 'launching'|'ongoing'|'completed'|'planned'` (adds a dot + always visible text). Never the only signal.
- **Stat** — `value`, `label`, `source` (**required**: where the number comes from, shown as a footnote; no invented metrics), `unit?`. Serif tabular numeral.

## Content
- **Media** — `src`, `alt` (required, may be `""` only with `decorative`), `ratio` `16:9|4:3|1:1|3:4|21:9|auto`, `caption?`, `credit?`, `fit` `cover|contain`, `loading` `lazy|eager`, `reveal?: boolean` (wipe). No `src` → a tonal placeholder with `SymOrbit` and the alt as caption.
- **Gallery** — `items: { src; alt; caption?; ratio? }[]`, layout `grid|masonry-lite`; no lightbox in v1.
- **ProjectCard** — `title`, `summary`, `period`, `status` (`launching|ongoing|completed`), `statusLabel`, `direction`, `href`/`to`, `external?` (autonomous project: «Окремий сайт ↗»), `tone`, `orbit?: boolean`. Data-agnostic (no import of the site's project data). Whole card is one link; hover lifts 5 px and nudges the orbit.
- **PersonCard** — `name`, `role?`, `bio?`, `photo?` (Media props), `links?`. Only confirmed roles/bios (AGENTS.md); without a photo shows the orbit mark in a tone circle.
- **Accordion** — `items: { id; title; }[]` + slots `#item-<id>` or a default `<SymAccordionItem title>` group; built on `<details name>` for native behaviour; opens with a medium-tier height/opacity transition.
- **Callout** — «call to action» band content: `eyebrow?`, `title`, `text?`, slot `#actions`; sits in a `Section` with its own tone; optional `orbit`.
- **Timeline** — `items: { date: string; title: string; text?: string }[]`; vertical rule with markers; horizontal scroll never.
- **LogoWall** — `items: { name; src?; href? }[]`; monochrome tone-aware logos, `name` as text fallback/alt. Partners and donors only when confirmed.
- **EmptyState** — `title`, `text?`, slot `#actions`; tonal block with orbit; for «Події скоро з’являться».
- **Banner** — announcement strip: `tone`, `dismissible?`, `href?`; role `status`.

## Filtering
- **Chip** — `selected?`, `toggle?`, `to|href?`; pill, 44 px hit area; `aria-pressed` for toggles.
- **FilterBar** — `options: { value; label }[]`, `v-model`, `label` (accessible group name), `all?: string` (adds an «Усі» option); single row that scrolls sideways on phones (`useScrollEdges`), wraps on wide.

## Later (not planned for v1)
Forms (`Field`, `Input`, `Textarea`, `Checkbox`, newsletter), Lightbox, Tabs, Map, Search, Cookie banner (only if analytics is added), dark theme.
