# Information architecture

Accepted model: [ADR-0006](decisions/ADR-0006-linked-content-model.md). `USER_CONFIRMED`, conversation 2026-10-29.

## Institutional site: `symbol.ngo`

```text
/                       Home
/projects               Projects: year chronology + filters
/projects/{slug}        Project page (every project, including those with a subsite)
/events                 Events: list | calendar
/events/{slug}          Event page
/events.ics             Calendar subscription feed
/opportunities          Open calls, residencies, vacancies
/people                 People (artists, curators, speakers, team)
/people/{slug}          Person page with automatic backlinks
/about                  Mission, values, team, partners and donors, reports
/support                Join and support
/contact                Contacts
/en/...                 English version (URL pattern still open)
```

Header: official logo · Проєкти · Події · Можливості · Люди · Про нас · [Підтримати] · UA / EN.

Every page except Home shows a path (breadcrumbs) at the top, like a Finder path: «Головна › Люди › Павло Маков». An event's path goes through its project: «Головна › Проєкти › {project · year} › {event}». `USER_CONFIRMED` 2026-10-29.

Later, when content justifies it: News, Press kit. There is still no global “Materials / Stories” item (see `website-strategy.md`).

## Record types

| Type | Key fields | Notes |
| --- | --- | --- |
| Project | slug, title, years, city/country, `kind` (`long`/`single`), status, `role` (`organizer`/`partner`), formats, directions, summary, body, concept, media, people+roles, partners, donors (+credit line), press, related, subsite URL, date/venue for `single` | Title always displayed with year(s) and city |
| Event | slug, title, **project (required)**, format, start/end, venue, city, description, registration URL, people+roles | `single` projects also appear as events |
| Person | slug, name, photo, short/long bio, links, `team` flag and order, `hasPage` | Projects and events are backlinks, never typed by hand |
| Opportunity | slug, title, type, project, deadline, description, apply URL | Active ones are shown on Home; archive after deadline |
| Press mention | outlet, title, date, URL, archived copy, projects | Collected on the project page |
| Organization | slug, name, URL, logo (only with permission) | Partners and donors |

## Project site link in the header

On the main-site page of a project with its own site, the middle of the site header shows a prominent pulsing button «Перейти на сайт проєкту ↗» with the project title (in the project's identity where one exists). `USER_CONFIRMED` 2026-10-29. Currently: Історія моєї вулиці, Покажіть свої документи… (subdomain name still `PROPOSED`).

## Indicators, partners, press

- Home and About show interactive indicators counted from the site data (projects, events, artists, partners, cities); they count up on scroll and link to their lists. No hand-typed impact numbers. `USER_CONFIRMED` (idea, MH4U reference) 2026-10-29.
- Partners and donors are tiles linking to their site or social profile; logo files go to `public/media/partners/` with permission and are animated on hover; until then a monogram is shown. `USER_CONFIRMED` 2026-10-29; logos pending.
- About has «Про нас пишуть» with all press mentions; each project page keeps its own.

## Projects page

- Year chronology rail (Izolyatsia-style): newest at top; only years that contain projects; scrollspy; horizontal strip on phones.
- Filters: format, direction, status; only formats that have projects are shown; state kept in the URL.
- Card: cover/visual, title · year · city, formats, status, “Символ — партнер” badge for partner role, ↗ when a subsite exists. Click always opens the main-site page.

Initial format vocabulary (grows with projects): виставка, онлайн-виставка, фестиваль, вистава, перформанс, плейбек, резиденція, презентація, опен-кол, лекція, концерт, конференція, кінопоказ, фільм, екскурсія, дискусія, воркшоп, тренінг, аукціон, артісток. `USER_CONFIRMED` (list), «плейбек», «фільм», «тренінг» added for existing projects.

## Project page

Order (empty blocks are hidden): title · years · city · status · formats → subsite button → description and curatorial concept → media → events → people by role → partners and donors → press → open opportunities → related and other projects.

## Home

1. Logo intro animation (first visit in a session, ≤1.5 s, skippable, off with reduced motion).
2. Visual hook: an orbit of project titles around the spiral mark.
3. Active open calls (only when any exist).
4. Upcoming events.
5. Current projects.
6. “Доєднатися і підтримати” band.
7. Partners and donors.
8. Newsletter / social subscription.

## Support page

Modelled on the UAPP support page: why support Symbol; tabs “Стати меценатом” (one-off, regular with tiers, project sponsorship, corporate partnership) and “Доєднатися до спільноти” (volunteering, membership, information support); bank details with copy buttons; patron list with consent. Donations go only to an account of ГО «Символ», never a personal card. Details, tiers, and acquiring are open questions.

## Autonomous project sites

An autonomous project owns its information architecture, page count, layout, media, and interaction design. It must still include:

- a visible relationship to NGO Symbol and a path back to `symbol.ngo`;
- a canonical project identity; the organization description is linked, not copied;
- volunteers credited on the project site;
- UA/EN strategy, accessibility, SEO, analytics policy, and stable URLs.

### First example

`istoriia-vulytsi.symbol.ngo`

- `/` — project home.
- `/vulytsi` — all streets.
- `/vulytsi/{slug}` — one street, for example `/vulytsi/chebaievyna`.
- `/pro-proiekt` — purpose and methodology.
- `/team` — project team and partners, if content warrants a separate page.

Short printed QR aliases such as `/v/chebaievyna` may redirect to the canonical street page. QR destinations must remain stable after printing.
