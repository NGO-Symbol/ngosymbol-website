# ADR-0006: Linked content model and a main-site page for every project

- Status: Accepted
- Date: 2026-10-29
- Supersedes: the "links directly to the subdomain" part of [ADR-0001](ADR-0001-project-hostnames.md)

## Context

The main site is the organization's business card for donors and partners. The team wants one concentrated place per project (description, photos, people, partners, press) even when the project also has its own subsite. Events, people, open calls, and press mentions need to be connected to projects and to each other, Wikipedia-style. `USER_CONFIRMED`, conversation 2026-10-29.

## Decision

1. **Every project has a page at `symbol.ngo/projects/{slug}`**, including autonomous projects. When a subsite exists, the page shows a prominent “Сайт проєкту ↗” link. Gallery cards always open the main-site page. QR codes of autonomous projects still point to the subsite.
2. **Six linked record types**: project, event, person, opportunity, press mention, organization (partner/donor). See [`../information-architecture.md`](../information-architecture.md).
3. **Every event belongs to exactly one project.**
4. **Two project kinds**: `long` (several events) and `single` (a project that is one event — Milan, Hungary, «Історії різних»). A single project is one page that is listed both in projects and in the events list/calendar.
5. **Project titles are always shown with year(s) and city.**
6. **People are tagged on projects and events with a role**; person pages list their projects automatically (backlinks). The permanent team is the same person records with a team flag.
7. **Inline references** in texts use `[[project:slug]]`, `[[event:slug]]`, `[[person:slug]]`. A reference to a missing record fails the build.
8. Content stays in code (ADR-0002): typed data modules in `apps/main/app/data/`.

## Alternatives

- Keep direct gallery links to subdomains (ADR-0001). Rejected: the main site would not concentrate press, people, and partners for those projects.
- Separate “events” that are not tied to projects. Rejected: the team wants every event to belong to a project; one-off activities become `single` projects.
- A CMS. Still rejected (ADR-0002).

## Consequences

- Autonomous projects need a short main-site page in addition to their subsite.
- The data layer must validate references at build time.
- The events calendar includes `single` projects, so they need exact dates.
- An `.ics` feed of events is generated statically.
