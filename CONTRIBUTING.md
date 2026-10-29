# Contributing

Most changes are made by organization members working with a coding agent. The workflow below
is deliberately small: four commands, and nothing reaches the live site without passing checks.

## Set up a computer (once)

Install Git, Node 22, and the GitHub CLI, then:

```bash
corepack enable
gh auth login
git clone https://github.com/NGO-Symbol/ngosymbol-website.git
cd ngosymbol-website
pnpm install
```

Preview locally with `pnpm dev` (main site), `pnpm dev:street` (Street History) or `pnpm dev:design` (design-system gallery, also at `symbol.ngo/design/`).

## Daily workflow

| Step | Command | What it does |
| --- | --- | --- |
| See what is new | `pnpm task:status` | Fetches GitHub, shows your branch, unsaved files, recent published changes, open pull requests. |
| Start a task | `pnpm task:new "about-page-photos"` | Updates `main` and creates `task/about-page-photos`. Re-running it continues the same task. |
| Save progress | `pnpm task:save "Add team photos to About page"` | Commits everything on the task branch. Local only; repeat after each finished step. |
| Publish | `pnpm task:ship` | Merges the latest `main`, runs `pnpm check`, pushes, opens or updates the pull request, and turns on auto-merge once `main` is protected. |

After the pull request’s checks pass, GitHub squash-merges it into `main` and the
[Deploy workflow](.github/workflows/deploy.yml) updates the live sites within a few minutes.
Start the next piece of work with a new `pnpm task:new`.

## Rules

- Never commit on `main`; `main` only changes through pull requests (enforced on GitHub).
- One task branch per topic. Keep application changes and their knowledge-base updates together.
- Commit messages describe the result in plain English: `Add contact form copy`, not `fix`.
- Pages are built only from the design system (`Sym*` components and tokens); see `packages/ui/docs/CONTEXT.md`. `pnpm check` runs `ds:lint` and `ds:contrast`.
- Never commit secrets, private documents, or unpublished personal data.
- Do not invent impact metrics, partnerships, quotes, or biographies.
- Read `AGENTS.md` and the documents linked from `documents/knowledge/INDEX.md` before
  changing the product. A current user-confirmed correction outranks older PDFs and public mentions.
- When a change introduces a durable decision, update the knowledge base in the same branch
  (`$update-symbol-context` or «онови контекст» asks an agent to do it).

## Checks

`pnpm check` runs `kb:validate`, `typecheck`, and `build`; `task:ship` runs it automatically and
GitHub runs it again on every pull request. The sites are static-first; add runtime
infrastructure only after documenting the feature that requires it.

Deployment and one-time owner setup: [`documents/operations/deployment.md`](documents/operations/deployment.md).
