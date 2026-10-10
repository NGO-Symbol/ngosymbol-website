# Knowledge schema and evidence

## Evidence classes

- **USER_CONFIRMED** — explicit statement or correction by the organization team. Highest authority for current internal facts.
- **EXTRACTED** — directly supported by a supplied file, registry, first-party page, or named public source.
- **INFERRED** — reasoned conclusion that still needs confirmation.
- **PROPOSED** — design or engineering recommendation not yet approved.

The newest user-confirmed correction overrides older portfolios and public articles. A correction does not erase source history; it changes the current canonical statement.

## Durable entities

The graph stores only entities and relations useful across tasks: organization, people, projects, partners, audiences, domains, applications, design directions, and decisions. Narrative detail remains in Markdown.

## Dates

Use ISO dates (`YYYY-MM-DD`) when exact. Use a year or range when that is all that is confirmed. Never manufacture exact dates from approximate language.

## Project status vocabulary

- `planned`
- `launching`
- `ongoing`
- `completed`
- `archived`

## Project web type vocabulary

- `small-page` — focused page within the institutional site.
- `extended` — internal project section with child routes.
- `autonomous-subdomain` — independently deployable project site under `*.symbol.ngo`.

