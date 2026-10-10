---
name: symbol-project-memory
description: Maintain and consult the durable knowledge base for the NGO Symbol website. Use for organization facts, projects, content, information architecture, brand decisions, technical architecture, roadmaps, or any work whose conclusions should remain available to future agents.
---

# Symbol Project Memory

Use `documents/knowledge/INDEX.md` as the router. Read only the documents relevant to the current task, plus any ADR it links.

## Evidence classes

- `USER_CONFIRMED`: explicitly stated or corrected by an authorized project participant. This overrides older PDFs and public sources.
- `EXTRACTED`: directly supported by a named file or public source.
- `INFERRED`: a reasonable conclusion that is not explicitly confirmed. Label it visibly and do not present it as fact.
- `PROPOSED`: a design, content, or engineering option that has not been approved.

Never turn `INFERRED` or `PROPOSED` knowledge into `USER_CONFIRMED` without new evidence.

## Before work

1. Read the index and relevant knowledge pages.
2. Check `documents/knowledge/open-questions.md` before assuming a missing choice.
3. For architecture changes, read the applicable ADRs.
4. For organization claims, inspect `organization.md`, `project-registry.md`, and `sources.md`.

## After durable changes

Update memory in the same change when work alters a fact, project status, route contract, brand token, technical decision, content ownership, deployment model, or open question.

1. Edit the canonical Markdown page; do not duplicate the same explanation across files.
2. Update `graph/nodes.jsonl` or `graph/edges.jsonl` only when a durable entity or relationship changed.
3. Add an ADR for decisions with alternatives, consequences, or migration cost.
4. Add a short dated note under `changes/` describing what changed and why.
5. Run `pnpm kb:validate`.

Read [references/update-protocol.md](references/update-protocol.md) when changing the graph, adding an ADR, resolving conflicting sources, or recording a conversation-derived correction.

## Boundaries

- Do not store secrets, credentials, private Google Drive links, or unpublished personal data.
- Do not record transient debugging steps, speculative ideas, or ordinary implementation details as durable memory.
- Do not invent impact numbers, partner roles, dates, quotes, team biographies, or project outcomes.
- Do not change an approved product invariant silently; record the replacement decision and its consequences.
