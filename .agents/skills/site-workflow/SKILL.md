---
name: site-workflow
description: Git and publishing workflow for the NGO Symbol website. Use at the start of every session, before editing files, after finishing a step of work, and whenever the user asks to save, publish, deploy, push, or check what changed — including «збережи», «опублікуй», «запуш», «викати на сайт», «що нового», «що змінилось».
---

# Symbol Site Workflow

The people you work with are not developers. Run the Git workflow for them through the
`pnpm task:*` commands; never ask them to type Git commands. Explain results in plain language
and in the user's language. The human reference is `CONTRIBUTING.md`.

## Session start

1. Run `pnpm task:status`.
2. Tell the user, in one or two sentences, what was published recently and whether there is
   unfinished work on the current branch. Read the knowledge-base change notes or pull requests
   behind any recent change that affects the current request.

## Before the first edit

If the branch is `main`, run `pnpm task:new "<short-english-slug>"` named after the task.
If a `task/*` branch is checked out with unpublished work on a different topic, ask whether to
publish it first or continue it; do not mix topics in one branch.

## While working

After each finished, coherent step (a page section done, a text replaced, a component fixed),
run `pnpm task:save "<what changed, in English, imperative>"`. Do not save half-broken states;
do not batch an entire session into one save. Saving is local and safe.

## Publishing

Publish only when the user asks (or confirms your suggestion after a natural milestone):

1. Make sure durable decisions from this task are in the knowledge base (`symbol-project-memory`).
2. Run `pnpm task:ship`. Optionally pass a clear pull-request title: `pnpm task:ship "Add About page photos"`.
3. Report the pull-request link and that the site updates automatically after checks pass
   (usually a few minutes). The user can watch progress on the pull-request page.
4. For the next task, start a new branch with `pnpm task:new`.

## When a command fails

- **Unsaved changes**: run `pnpm task:save` with a fitting message, then retry.
- **Checks failed**: read the error, fix the cause, save, ship again. Never bypass checks.
- **Merge conflict**: open each listed file, keep both the user's change and the newer `main`
  change unless they truly contradict (then ask the user), remove conflict markers,
  `pnpm task:save "Merge latest main"`, ship again.
- **`gh` missing or not logged in**: the branch is still pushed; give the printed link to open the
  pull request, and suggest `gh auth login` for next time.
- **Local main differs from GitHub**: stop and tell the user to ask the maintainer; never force-push
  and never reset someone's work.

## Never

- Commit or push on `main`, use `git push --force`, `git reset --hard`, or delete branches you did not create.
- Commit `.env` files, credentials, private documents, or personal data.
- Merge pull requests yourself unless the user explicitly asks.
