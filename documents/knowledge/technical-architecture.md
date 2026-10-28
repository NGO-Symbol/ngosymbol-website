# Technical architecture

## Chosen model

The repository is a **pnpm monorepo** containing independently deployable Nuxt 4 applications.

```text
apps/main                  -> symbol.ngo
apps/istoriia-vulytsi      -> istoriia-vulytsi.symbol.ngo
packages/brand             -> optional shared tokens and original mark
documents/knowledge        -> durable project memory
```

Small projects are routes inside `apps/main`. Large projects are separate applications, not nested routes disguised as microsites. This gives them independent layouts, dependency choices, build settings, release timing, and future backend needs while retaining one repository and shared organizational knowledge.

## Rendering

Start static-first with Nuxt prerendering. Do not introduce a persistent Node server, database, or API until a concrete feature requires runtime state or secrets. Nuxt/Nitro can add server routes later, but an app with runtime server behavior must move from static hosting to a compatible server or edge deployment.

## Deployments and subdomains

Each hostname is a separate deployment target:

- `symbol.ngo` builds `apps/main`.
- `istoriia-vulytsi.symbol.ngo` builds `apps/istoriia-vulytsi`.

Hosting is GitHub Pages ([ADR-0005](decisions/ADR-0005-multi-app-hosting.md)). The source repository is public. The `Deploy` workflow publishes `apps/main` to this repository's Pages site and each autonomous app to its own deploy-only repository (`NGO-Symbol/istoriia-vulytsi`). Builds use the Nitro `github_pages` preset; the base path switches from `/<repo>/` to `/` once a custom domain is configured. DNS stays in Cloudflare in DNS-only mode. Setup steps: [`../operations/deployment.md`](../operations/deployment.md).

## Change workflow

All changes go through `task/*` branches and pull requests guarded by the `validate` check; agents drive Git through `pnpm task:*` ([ADR-0006](decisions/ADR-0006-agent-git-workflow.md), [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md)).

Do not create wildcard DNS for all subdomains. Add and verify each project hostname explicitly to reduce domain-takeover risk.

## Routing contract

- Main project catalog data lives in `apps/main/app/data/projects.ts`.
- Internal cards use Nuxt routes.
- Autonomous cards use absolute HTTPS URLs.
- QR aliases must be explicit redirects and must not replace canonical URLs.
- Route slugs become permanent once printed or publicly indexed.

## Shared code policy

Share only stable, truly institutional concerns: source color tokens, the original logo asset, an optional project-to-Symbol backlink component, SEO helpers, and accessibility utilities. Do not force project layouts or components into a universal design system.

## Local requirements

- Node.js 20.11+; Node 22 is the repository default.
- pnpm 11.
- No CMS.
- No secrets committed to the repository.

## References

- Nuxt layers and extension model: https://nuxt.com/docs/examples/advanced
- Nuxt deployments: https://nuxt.com/deploy
- Nuxt on GitHub Pages: https://nuxt.com/deploy/github-pages
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

