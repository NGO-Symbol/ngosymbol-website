# NGO Symbol website

Monorepo for the institutional website of ГО «Символ» and autonomous project websites.

## Repository map

- `apps/main` — `symbol.ngo`, including the shared project gallery and small project pages.
- `apps/istoriia-vulytsi` — autonomous website intended for `istoriia-vulytsi.symbol.ngo`.
- `packages/brand` — shared brand tokens and the original logo asset.
- `documents/knowledge` — versioned project and organization knowledge base.
- `.agents/skills/symbol-project-memory` — instructions for agents maintaining that knowledge.
- `.agents/skills/update-symbol-context` — explicit `$update-symbol-context` / “онови контекст” synchronization workflow.
- `documents/operations` — deployment and one-time GitHub/DNS setup.
- `.agents/skills/site-workflow` — how agents start, save, and publish work.
- `scripts/task.mjs` — `pnpm task:*` Git workflow commands.
- `scripts/kb-validate.mjs` — deterministic knowledge-graph validation.
- `ARCHITECTURE.md` — repository boundaries and request flow at a glance.
- `CONTRIBUTING.md` — shared workflow for people and coding agents.

## Local development

Use Node 20.11 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
pnpm dev:street
pnpm check
```

Every change goes through a task branch and pull request; see
[`CONTRIBUTING.md`](CONTRIBUTING.md) for the four `pnpm task:*` commands.

The two applications are separate deployments from one repository. See
[`documents/knowledge/technical-architecture.md`](documents/knowledge/technical-architecture.md).

To persist new durable decisions, invoke `$update-symbol-context` or ask an agent
to «оновити контекст».
