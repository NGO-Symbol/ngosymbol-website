# Working agreement for agents

This repository contains both source code and the durable knowledge base for ГО «Символ».

## Before substantial work

1. Read `documents/knowledge/INDEX.md`.
2. Follow `.agents/skills/symbol-project-memory/SKILL.md` for organization facts, product decisions, architecture, design, content, or project-memory work.
3. Read only the linked knowledge files relevant to the task.
4. Treat `USER_CONFIRMED` facts as authoritative. Do not silently replace them with older PDFs or public mentions.

## Durable-memory rule

When work changes a durable fact, scope, route contract, design token, technical decision, project status, or open question, update the corresponding knowledge document in the same change. Add an ADR when the decision has meaningful alternatives or migration consequences. Do not record temporary debugging details as durable memory.

Run `pnpm kb:validate` after knowledge-graph changes and `pnpm check` after application changes when dependencies are available.

When the user says “онови контекст”, “синхронізуй контекст”, “запам’ятай ці рішення”, or invokes `$update-symbol-context`, use `.agents/skills/update-symbol-context/SKILL.md` to perform an explicit knowledge synchronization pass.

## Product invariants

- Small projects live under `symbol.ngo/projects/{slug}`.
- Autonomous projects are separate apps on `{project}.symbol.ngo` and return to the institutional site.
- The main project gallery may link internally or directly to a project subdomain.
- No CMS is planned. Content and project experiences are maintained in code.
- Brand source colors are `#9280A6` and `#FDD08F`.
- The current main-site direction combines the color/composition of “Orbit” with the editorial serif character of “Index”.
- Ukrainian is the primary language; English is required as the next locale.

Never invent impact metrics, donor relationships, project roles, quotes, or team biographies.
