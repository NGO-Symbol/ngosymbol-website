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

GitHub remains the source repository. A single GitHub Pages deployment does not provide independent build outputs for multiple apps/hostnames in one repository. Viable deployment models:

1. **Recommended, pending approval:** separate Cloudflare Pages projects connected to the same monorepo, each with its own root/build command and custom domain.
2. Separate GitHub Pages repositories receiving generated artifacts from this monorepo.
3. Another platform that supports multiple projects from one repository.

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
- Cloudflare Pages monorepos: https://developers.cloudflare.com/pages/configuration/monorepos/
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

