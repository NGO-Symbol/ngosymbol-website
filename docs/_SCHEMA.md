# Documentation Contract (`_SCHEMA`)

The rules every note in `docs/concepts/` follows. `scripts/docs_tool.py check` enforces them.

> **One concept = one file.** If a note grows two subjects, split it and link the halves.

## 1. Location & naming
```
docs/concepts/<NN-category>/<id>.md                 a note
docs/concepts/<NN-category>/<id>/<id>.md            a SPLIT concept's hub (keeps the id)
docs/concepts/<NN-category>/<id>/<id>-<topic>.md    its sub-notes
docs/concepts/<NN-category>/CONTEXT.md              the category router (no frontmatter)
```
Scope: the project's durable knowledge base is NOT under `docs/`; it lives in `documents/knowledge/` and `documents/operations/` with its own contract (`documents/knowledge/schema.md`, validated by `pnpm kb:validate`). Notes added under `docs/concepts/` (none yet) follow this file. Categories: none defined yet.
`<id>` is kebab-case, globally unique, equals the filename. No numeric prefixes on notes.

## 2. Frontmatter (all required)
```yaml
---
id: example-note                # == filename
title: Example Note
category: 01-category           # == the NN- folder (also inside a split folder)
tags: [cat/category, facet]     # first tag ALWAYS cat/<slug>
status: current                 # current | partial | planned | deprecated
code: []                        # files this note describes (repo-relative). Non-code projects: `files:`
prerequisites: []               # [[ids]] to read first
see_also: ["[[other-note]]"]    # ≥ 1
source_ids: []                  # ids from references/sources-index.md, never raw URLs
added: YYYY-MM-DD
updated: YYYY-MM-DD
---
```
`status`: `current` true today · `partial` says done vs. pending · `planned` intended, not built ·
`deprecated` a pointer to the replacement. Ghost links (`[[not-yet]]`) are fine in notes, never in routers.

## 3. Body (in order; drop a heading only if truly N/A)
`# Title` → `> one-sentence summary` → `## What it is` → `## How it works` → `## Key decisions & why`
→ `## Gotchas` → `## Status & TODO` → `## See also` (`- [[id]] — why`) → `## Sources`.

## 4. Links
`[[wikilinks]]` everywhere (resolve by basename, survive moves); no relative markdown links between
notes. Comments in code/assets cite `[[id]]`, not file paths.

## 5. Context budgets
| Layer | File | Loaded | Budget |
|---|---|---|---|
| L0 | `AGENTS.md` (+ memory index) | every session | ≤150 lines |
| L1 | `docs/CONTEXT.md` | task start | ≤80 lines |
| L2 | category `CONTEXT.md`, a hub, a skill's Inputs | per task | router ≤80, hub ≤150 |
| L3 | a note, `facts/<id>.md` | one hop | ≤200 target, >400 error |
| L4 | `history/`, `audits/`, `research/`, `handoff/` | via a direct link | — |

- **Current state only.** A dated heading is a smell; superseded designs and logs move VERBATIM to
  `history/<id>-history.md`. Decisions and their why stay.
- **One fact, one home** — constants in `facts/`, everything else in its note; elsewhere link.
- **Routers route** — «question → [[note]]» tables, no reference content.
- **Size ratchet** — notes over 400 lines listed in `.size-baseline.json` may only shrink
  (`docs_tool.py baseline` after a cleanup).
- **The map is generated** — `docs_tool.py map`; never hand-edit `_MAP.md`.

## 6. Facts & history
- `facts/<id>.md`: frontmatter `id`, `title`, `kind: facts`, `updated`; tables of constants, each with
  a pointer to the note that explains it.
- `history/<id>-history.md`: no frontmatter; `# <Title> — history`, moved sections under their original
  headings. Not linted, not routed to.
