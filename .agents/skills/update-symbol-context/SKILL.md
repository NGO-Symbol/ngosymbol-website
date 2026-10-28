---
name: update-symbol-context
description: Synchronize new conversation context and approved decisions into the NGO Symbol repository knowledge base. Use when the user says “онови контекст”, “синхронізуй контекст”, “запам’ятай ці рішення”, invokes $update-symbol-context, or explicitly asks to persist current project decisions for future agents.
---

# Update Symbol Context

Turn the current conversation’s durable deltas into coherent repository memory. Do not dump or summarize the whole conversation.

## Workflow

1. Read `AGENTS.md`, `documents/knowledge/INDEX.md`, and `documents/knowledge/schema.md`.
2. Read the canonical pages affected by the new context and any related ADRs.
3. Identify only new or changed durable items:
   - organization facts or corrections;
   - project status, roles, partners, dates, or routing;
   - audience, scope, content, design, or brand decisions;
   - technical architecture, hosting, workflow, or implementation constraints;
   - decisions that close or create open questions.
4. Classify each item as `USER_CONFIRMED`, `EXTRACTED`, `INFERRED`, or `PROPOSED`.
5. Update the canonical Markdown document. Replace superseded current-state wording while preserving decision history in ADRs.
6. Update `project-registry.md`, `open-questions.md`, and the JSONL graph only where affected.
7. Add an ADR when the decision has alternatives, consequences, or migration cost. Add a dated change note for every synchronization run that changes files.
8. If an approved decision changes a small declarative code registry or configuration, synchronize it too. Do not expand this into unrequested feature implementation.
9. Run `pnpm kb:validate`; run targeted code checks if code changed.
10. Report the updated facts, files, unresolved conflicts, and validation result.

Read [references/synchronization-checklist.md](references/synchronization-checklist.md) before editing.

## Conflict handling

Latest explicit user/team corrections outrank older PDFs and public sources. If two current user-confirmed statements conflict and the intended replacement is unclear, record the conflict in `open-questions.md` and ask one focused question rather than guessing.

## Boundaries

- Never store credentials, private links, hidden personal data, or raw conversation transcripts.
- Do not promote proposals or inferences to confirmed facts.
- Do not create duplicate canonical explanations.
- Save the result as a local commit per `site-workflow`; publish (`pnpm task:ship`) only when the user asks.
