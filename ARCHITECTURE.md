# System architecture

This repository is the shared home of the institutional website, autonomous project websites, and the durable knowledge base of ГО «Символ».

```text
ngosymbol-website
├── apps/
│   ├── main/                 symbol.ngo
│   └── istoriia-vulytsi/     my-street.symbol.ngo
├── packages/
│   └── brand/                shared source palette and logo asset
├── documents/knowledge/          canonical project memory
├── documents/operations/         deployment runbook
├── .agents/skills/              repository-local agent workflows
└── scripts/                     deterministic repository checks
```

## Boundaries

- `apps/main` owns the institutional navigation, project catalog, and focused pages for small projects.
- Each autonomous project owns its routes, visual language, dependencies, deployment, and release cadence.
- `packages/brand` is deliberately small. Project apps may reuse the mark and source colors without inheriting a universal layout.
- `documents/knowledge` is the canonical human-readable record. Its JSONL graph is an index of relationships, not a second source of truth.
- Agent skills describe how to maintain memory; they do not contain organization facts that belong in the knowledge base.

## Request flow

```text
symbol.ngo/projects
  ├── small project → symbol.ngo/projects/{slug}
  └── autonomous project → https://{project}.symbol.ngo
                                      └── visible link back to symbol.ngo
```

The applications are developed together but deployed independently by `.github/workflows/deploy.yml` to GitHub Pages. See
[`documents/knowledge/technical-architecture.md`](documents/knowledge/technical-architecture.md)
and the ADRs in [`documents/knowledge/decisions`](documents/knowledge/decisions).

## Change rules

1. Preserve published URL contracts.
2. Keep an autonomous project independent unless sharing is demonstrably stable.
3. Record durable product and architecture decisions in the knowledge base in the same change.
4. Validate graph integrity and application builds before merging.

