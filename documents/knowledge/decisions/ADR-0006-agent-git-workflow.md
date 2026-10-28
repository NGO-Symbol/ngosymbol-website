# ADR-0006: Task branches, pull requests, and scripted Git for agents

- Status: Accepted
- Date: 2026-10-28

## Context

The site is maintained by organization members without development experience, each working through their own coding agent (Codex, Claude Code, Gemini, and others) on different computers. Agents must commit regularly, publish only on request, stay aware of each other's changes, and never break the live site.

## Decision

`USER_CONFIRMED`: changes reach `main` only through pull requests from `task/*` branches.

- Git is driven through `pnpm task:status | task:new | task:save | task:ship` (`scripts/task.mjs`) so agents run deterministic, cross-platform commands instead of improvising Git.
- `task:save` creates local checkpoint commits after each finished step; `task:ship` merges the latest `main`, runs `pnpm check`, pushes, opens or updates the pull request, and enables squash auto-merge.
- `main` is protected by a ruleset requiring a pull request and the `validate` CI check. Approvals are not required initially.
- One vendor-neutral `AGENTS.md` holds the rules; `CLAUDE.md` and `GEMINI.md` import it. The `site-workflow` skill holds the procedure. Claude Code also receives `task:status` output at session start through `.claude/settings.json`.
- Squash-merge subjects on `main` act as the human-readable change log shown by `task:status`.

## Alternatives considered

- Committing directly to `main` with deploy gated by CI — simpler, but concurrent editors would collide on `main` and a mistaken push would publish immediately.
- Automatic commits from agent hooks — tool-specific and produces meaningless history.

## Consequences

- Each editor needs an authenticated GitHub CLI for automatic pull requests; without it `task:ship` prints a link to open one manually.
- Owners can raise required approvals in the ruleset later without changing the workflow.
