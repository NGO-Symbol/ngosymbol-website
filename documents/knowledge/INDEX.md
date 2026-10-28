# NGO Symbol knowledge base

Last consolidated: 2026-10-28.

This directory is the canonical memory for the institutional website and its project websites. It borrows Graphify’s useful ideas—explicit entities and relationships, source-aware confidence labels, architecture documentation, deterministic validation, and agent guidance—without importing Graphify’s application code.

## Start here by task

| Task | Read |
| --- | --- |
| Understand the organization | [`organization.md`](organization.md), [`project-registry.md`](project-registry.md) |
| Plan pages or content | [`website-strategy.md`](website-strategy.md), [`information-architecture.md`](information-architecture.md) |
| Design UI | [`design-system.md`](design-system.md), [`content-inventory.md`](content-inventory.md) |
| Change code or deployment | [`technical-architecture.md`](technical-architecture.md), [`decisions/`](decisions/), [`../operations/deployment.md`](../operations/deployment.md) |
| Save or publish work | [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md), `.agents/skills/site-workflow` |
| Verify a claim | [`sources.md`](sources.md), [`schema.md`](schema.md) |
| Find unresolved choices | [`open-questions.md`](open-questions.md) |
| Inspect machine-readable relations | [`graph/nodes.jsonl`](graph/nodes.jsonl), [`graph/edges.jsonl`](graph/edges.jsonl) |

Repository boundaries are summarized in [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md).

## Current approved direction

- Main site: `symbol.ngo`.
- Small projects: `symbol.ngo/projects/{slug}` with one focused page and optional internal child pages.
- Large autonomous projects: separate apps on `{project}.symbol.ngo`.
- First autonomous project: `istoriia-vulytsi.symbol.ngo`.
- Main project gallery links directly to the relevant internal page or subdomain.
- No CMS; project content is maintained in code.
- Framework: Nuxt 4 / Vue 3, static-first.
- Repository: public pnpm monorepo with independently deployable applications.
- Hosting: GitHub Pages; autonomous apps publish to deploy-only repositories.
- Workflow: `task/*` branches and pull requests only; agents use `pnpm task:*`.
- Main visual direction: “Orbit” composition and palette with “Index” editorial-serif typography.

## Maintenance

Agents must follow `AGENTS.md` and the `symbol-project-memory` skill. An explicit
request such as `$update-symbol-context` or «онови контекст» triggers the dedicated
synchronization workflow. Validate graph changes with `pnpm kb:validate`.
