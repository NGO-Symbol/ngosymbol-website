# Working agreement for agents

This repository contains both source code and the durable knowledge base for ГО «Символ».

## Every session

1. Run `pnpm task:status` and follow `.agents/skills/site-workflow/SKILL.md`: it tells you how to start a task branch, save progress in small commits, and publish through a pull request. The people you work with are not developers; run these commands for them.
2. Never edit on `main`, never force-push, never bypass checks.

## Repository skills

Skills live in `.agents/skills/`. If your tool does not load them automatically, read the `SKILL.md` whose trigger matches the task:

- `site-workflow` — session start, saving, publishing, «збережи», «опублікуй», «що нового».
- `symbol-project-memory` — organization facts, product, design, architecture, or content decisions.
- `update-symbol-context` — «онови контекст», «синхронізуй контекст», `$update-symbol-context`.

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
