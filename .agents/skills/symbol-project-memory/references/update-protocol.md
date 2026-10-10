# Knowledge update protocol

## Source precedence

1. Latest explicit user or organization-team correction.
2. Current official organization material.
3. Current first-party partner or donor source.
4. Reputable public coverage.
5. Inference, clearly labeled.

When sources conflict, preserve the conflict in `open-questions.md` until an authorized person resolves it. Never silently average or merge incompatible claims.

## Canonical documents

- Organization identity and team: `documents/knowledge/organization.md`
- Project status and public routing: `documents/knowledge/project-registry.md`
- Audiences, goals, scope: `documents/knowledge/website-strategy.md`
- Navigation and page model: `documents/knowledge/information-architecture.md`
- Brand tokens and visual direction: `documents/knowledge/design-system.md`
- Repository, hosting, routing, and deployments: `documents/knowledge/technical-architecture.md`
- Unresolved items: `documents/knowledge/open-questions.md`
- External and supplied evidence: `documents/knowledge/sources.md`

## Graph format

`nodes.jsonl` contains one JSON object per line with:

- `id`: stable lowercase namespaced identifier.
- `type`: entity category.
- `label`: human-readable name.
- `confidence`: one of `USER_CONFIRMED`, `EXTRACTED`, `INFERRED`, `PROPOSED`.
- `source`: file, URL, or dated conversation reference.

`edges.jsonl` contains:

- `source`, `target`: existing node ids.
- `relation`: short present-tense relationship.
- `confidence`: evidence class.
- `source_ref`: supporting location.

Keep the graph selective. Add nodes that improve navigation or reasoning; do not make a node for every sentence.

## ADR format

Use the next sequential number and include: status, date, context, decision, alternatives, consequences, and superseded decisions. Accepted decisions are not rewritten after the fact; add a superseding ADR.

## Change notes

Name files `YYYY-MM-DD-short-topic.md`. Record only durable knowledge changes, affected canonical files, and any follow-up question.
