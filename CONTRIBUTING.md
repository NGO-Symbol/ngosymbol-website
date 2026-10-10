# Contributing

## Set up

Use Node 22 and pnpm 11.

```bash
corepack enable
pnpm install
pnpm dev
```

Run the autonomous Street History application with `pnpm dev:street`.

## Before changing the product

Read `AGENTS.md` and the task-specific documents linked from
`documents/knowledge/INDEX.md`. Do not treat older PDFs, public mentions, or
inferences as more authoritative than a current user-confirmed correction.

When a change introduces a durable decision, update the relevant knowledge file
in the same branch. Invoke `$update-symbol-context` or say «онови контекст» to
request a dedicated synchronization pass from a compatible coding agent.

## Branch and review convention

- Create a focused branch from `main`.
- Keep application changes and their required documentation changes together.
- Never commit secrets or private personal data.
- Do not invent impact metrics, partnerships, quotes, or biographies.
- Prefer small pull requests that can be previewed and reviewed independently.

## Checks

```bash
pnpm kb:validate
pnpm typecheck
pnpm generate
```

The `generate` check matters because the current applications are static-first.
Add runtime infrastructure only after documenting the feature that requires it.

