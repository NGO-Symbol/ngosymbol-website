---
name: worktrees
description: Safe git workflow with one worktree per task. Use when starting a task or branch, running parallel agents, using stash, or before deploying or branching from production. Prevents lost work in a shared repository.
metadata: {pack: skill-pack, id: worktrees, version: 1.0.0}
---

# Worktrees

Several sessions may share this repository. Assume anything not yours is someone else's work.

## Start a task
1. `git worktree list` to see what exists; reuse yours, do not touch others'.
2. Find the real production tip first (deployed commit from the docs or the server), and confirm your base descends from it: `git merge-base --is-ancestor <deployed-sha> HEAD`. If it fails, rebase onto the tip or ask; never force around it.
3. Create: `git worktree add ../<repo>-<task> -b <type>/<task> <base>`. Work only inside it.

## Never lose others' work
- No bare `git stash`: the stash stack is shared by all worktrees and sessions, so pop can restore someone else's changes.
  - Prefer a WIP commit: `git add -A && git commit -m "wip: <tag>"`.
  - If you must stash: `git stash push -u -m "<unique-tag>"`, capture its sha with `git stash list --format='%H %gs'`, restore with `git stash apply <sha>` (not pop), then drop the entry found by its tag.
- No `git checkout .`, `git reset --hard`, `git clean -fd` or branch switches that discard uncommitted changes unless you made them and verified with `git status` and `git diff`.
- No force-push to shared branches; use `--force-with-lease` on your own branch only.
- Stage explicit paths (`git add <paths>`), not `git add -A`, when other changes may be present.

## Parallel agents
- At most 4 at once. Each gets its own worktree or an explicit list of paths it owns; no two edit the same file.
- Put the no-stash rule into every agent prompt.
- After each finishes, review its diff and run the tests yourself.

## Finish a branch
1. Run the project's tests; quote the output tail.
2. Rebase onto (or merge) the up-to-date base; resolve conflicts; re-run tests.
3. Merge or open the PR as the owner prefers.
4. Remove: `git worktree remove ../<repo>-<task>` and delete the merged branch (`git branch -d`).
5. Before deploying, repeat the ancestor check against the production tip.

## Done when
- [ ] the task ran in its own worktree;
- [ ] no stash, reset or checkout touched others' changes;
- [ ] the ancestor check against the production tip passed before deploy;
- [ ] tests passed, the worktree was removed, `git worktree list` is clean.
