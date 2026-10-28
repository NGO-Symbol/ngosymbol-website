# ADR-0005: Multi-app hosting platform

- Status: Accepted
- Date: 2026-10-10 (proposed), 2026-10-28 (accepted)

## Context

One repository must deploy at least two independent static applications to `symbol.ngo` and `istoriia-vulytsi.symbol.ngo`. GitHub Pages serves one site per repository and, on the free plan, only from public repositories. `symbol.ngo` is registered at Cloudflare and its DNS is managed there, alongside Google Workspace mail records.

## Decision

`USER_CONFIRMED` (2026-10-28): host on **GitHub Pages** and make `ngosymbol/ngosymbol-website` public.

- `apps/main` deploys to this repository's Pages site through GitHub Actions.
- Each autonomous app deploys its build output to a deploy-only public repository (first: `ngosymbol/istoriia-vulytsi`, `gh-pages` branch) using a write-scoped deploy key.
- DNS records stay in Cloudflare in DNS-only (unproxied) mode; mail records are untouched.

Setup and DNS records: [`../../operations/deployment.md`](../../operations/deployment.md).

## Alternatives considered

- **Cloudflare Pages/Workers** — free, keeps the repository private, multiple projects from one monorepo, per-branch preview URLs; DNS already lives there. Not chosen: the team prefers to keep hosting on GitHub.
- **GitHub Pro + private repository** — same Pages limitations for $4/month.

## Consequences

- The source code and `documents/knowledge` are public; nothing private may be committed.
- Every new autonomous project needs a deploy-only repository, a deploy key, a workflow job, and a DNS `CNAME`.
- Pull requests have no hosted preview; reviewers rely on CI and local `pnpm dev`.
- Revisit this ADR if previews, private source, or server runtime features become necessary.
