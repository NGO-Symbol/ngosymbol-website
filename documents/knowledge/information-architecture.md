# Information architecture

## Institutional site: `symbol.ngo`

Primary navigation:

- Home
- Projects
- Events & opportunities
- About
- Contact
- UA / EN

## Project gallery behavior

Every card exposes a common discovery contract: title, short description, year/range, status, direction, geography, and visual. The destination depends on project type:

- `small-page` → internal route such as `symbol.ngo/projects/mhgap-kyiv-region`.
- `extended` → internal project root with child routes.
- `autonomous-subdomain` → direct external navigation such as `https://istoriia-vulytsi.symbol.ngo`.

The gallery must not force visitors through an intermediate case page for an autonomous project. `USER_CONFIRMED`

## Small project page

A small page is not a rigid “case study” template. It is a concise place for all necessary information and can omit sections that do not apply. Recommended building blocks:

- project identity and status;
- purpose/context;
- what happened;
- selected media;
- team;
- partners/donors;
- results when verified;
- related links or press;
- contact or next action.

## Autonomous project site

An autonomous project owns its information architecture, page count, layout, media, and interaction design. It must still include:

- a visible relationship to NGO Symbol;
- a path back to `symbol.ngo`;
- a canonical project identity and short organization context;
- UA/EN strategy;
- accessibility, SEO, analytics policy, and stable URLs.

### First example

`istoriia-vulytsi.symbol.ngo`

Suggested initial route family:

- `/` — project home.
- `/vulytsi` — all streets.
- `/vulytsi/{slug}` — one street, for example `/vulytsi/chebaievyna`.
- `/pro-proiekt` — purpose and methodology.
- `/team` — project team and partners, if content warrants a separate page.

Short printed QR aliases such as `/v/chebaievyna` may redirect to the canonical street page. QR destinations must remain stable after printing.

