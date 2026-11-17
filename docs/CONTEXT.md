# NGO Symbol docs — where to go

The knowledge base of this repo lives in `documents/` (not here). This file routes a task to ONE file or
skill; follow that file's links one hop. Full knowledge index: [`documents/knowledge/INDEX.md`](../documents/knowledge/INDEX.md).

| Task / question | Open |
|---|---|
| Who the organization is, its projects | `documents/knowledge/organization.md`, `documents/knowledge/project-registry.md` |
| Plan pages, content, navigation | `documents/knowledge/website-strategy.md`, `documents/knowledge/information-architecture.md` |
| Build a page or component, styles, motion, tokens | skill `build-with-design-system`; `packages/ui/docs/CONTEXT.md` |
| Design direction, content inventory | `documents/knowledge/design-system.md`, `documents/knowledge/content-inventory.md` |
| Code layout, routing, hosting, a technical decision | `documents/knowledge/technical-architecture.md`, `documents/knowledge/decisions/`, `ARCHITECTURE.md` |
| Deploy, CI | `documents/operations/deployment.md` |
| Analytics, cookies, privacy page | `documents/operations/analytics.md` |
| Outside services, accounts, monthly checks | `documents/operations/services.md` |
| Uptime and domain/cert expiry alerts | `documents/operations/monitoring.md` |
| Owner guides (Ukrainian): Search Console, Bing, GA4, Cloudflare, Telegram, Google Nonprofits | `documents/operations/owner-*.md` |
| Partner / social links | skill `social-links`; `documents/operations/partner-links.md` |
| Add or change a photo | skill `add-photo` |
| Team bios and CVs | `documents/knowledge/team-cv.md` |
| Verify a claim, evidence classes | `documents/knowledge/sources.md`, `documents/knowledge/schema.md` |
| Unresolved choices | `documents/knowledge/open-questions.md` |
| Record a durable fact or decision | skills `symbol-project-memory`, `update-symbol-context` |
| Start, save, publish work | skill `site-workflow`; `CONTRIBUTING.md` |

## Do not read for a task
- `_MAP.md` — generated catalogue of `docs/` only.
- `documents/knowledge/changes/` — dated change records; only for «when/why did this change».
- `documents/knowledge/graph/*.jsonl` — machine-readable relations (checked by `pnpm kb:validate`).

## Rules for writing here
`docs/` holds only this router, the schema and generated files. Durable knowledge stays in
`documents/knowledge/` and `documents/operations/` under their own contract (`documents/knowledge/schema.md`,
`pnpm kb:validate`). Contract for any new note under `docs/`: `_SCHEMA.md`.
