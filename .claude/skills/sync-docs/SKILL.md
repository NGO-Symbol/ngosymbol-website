---
name: sync-docs
description: Reconcile the project's documentation with the code that actually exists - find stale statuses, wrong file paths, undocumented features, broken links - verify each drift against the code, then fix the docs only. Use after a feature wave or when asked to "sync / audit the docs". Never edits product code.
disable-model-invocation: true
metadata: {pack: skill-pack, id: sync-docs, version: 1.0.0}
---
# sync-docs - docs follow the code

Code is the source of truth. This skill edits documentation only.

## Process
1. **Learn the doc system.** Read `AGENTS.md` / `CLAUDE.md` for the docs location, schema, index
   generator and lint command (e.g. a `docs/` tree, a schema file, a `make docs-*` target). No
   schema: treat the README and every `docs/**/*.md` as the doc set and keep their existing style.
2. **Inventory mechanically (shell, not an agent).**
   - List doc files with their status / last-updated markers if they have any.
   - Extract every code path a doc references; list those that no longer exist on disk.
   - List recent changes: `git log --since=<oldest doc date> --name-only`, new top-level
     modules, routes, migrations, jobs, config keys.
3. **Plan the fan-out.** One read-only audit agent per doc area (or per subsystem for a targeted
   run), plus one **coverage** agent walking the code surface for implemented functionality with
   no doc. Skip the fan-out for small runs and do them inline.
4. **Brief each agent** with its slice of the inventory and these rules: read-only, never edit;
   every finding cites the `file:line` (or commit) that proves it; categories are stale status,
   dead path, wrong behaviour, missing doc, broken link, duplicated fact. Reply as a JSON-ish
   list: `{doc, claim, evidence, proposed_fix}`.
5. **Verify every finding yourself.** Open the cited code and confirm the function, flag or
   absence. Prose-plausible but code-wrong claims are the common trap. Discard anything you
   cannot ground in code.
6. **Fix the docs.**
   - Follow the project's schema (frontmatter, section order, length budget). Rewrite only what
     drifted; leave untouched prose alone.
   - A doc now covering two subjects: split it and link both ways.
   - Under-claim rather than over-claim: mark a feature partial unless the code proves it complete.
   - Intentional placeholders / planned links are not drift; leave them and name them in the report.
   - No secrets, tokens or private URLs in docs.
7. **Regenerate and lint.** Run the project's index generator and docs check if they exist.
   Fix every failure they report.
8. **Commit** as `docs: ...` after `git diff --stat` shows docs-only changes and a secret scan of
   the staged diff is clean. Docs-only changes need no deploy; say so.
9. **Report** a compact table: area, drifts found, fixed, deliberately left (with the reason).

## Done when
- Every fix was confirmed against the code, with evidence kept in the report.
- Every code path referenced by the docs exists, and links resolve or are named placeholders.
- The docs check / index generator (if any) exits 0.
- `git diff --stat` shows only documentation files.
- The report lists what was left alone and why.
