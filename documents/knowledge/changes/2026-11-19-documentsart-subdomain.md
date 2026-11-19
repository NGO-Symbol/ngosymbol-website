# 2026-11-19: the exhibition site moves to documentsart.symbol.ngo

Decision (`USER_CONFIRMED`, Петро Чекаль, 2026-11-19): «Покажіть свої документи…» is a separate site (its own app,
structure, navigation and identity) and gets its own address `documentsart.symbol.ngo` with its own SEO, instead of the
folder `symbol.ngo/documentsart/`. Reason: the folder address made the site read as a section of symbol.ngo.

Code (switch by repository variables, nothing changes until the owner sets them; steps in `../../operations/deployment.md` §4a):

- One address for the exhibition site: `DOCS_SITE` in `apps/main/app/data/docs-site.ts`, set at build time from
  `DOCS_SITE_URL` by the brand layer (`packages/brand/nuxt.config.ts`: vite define + nitro replace). Default
  `https://symbol.ngo/documentsart`.
- Canonicals and structured-data ids of the exhibition (`apps/documents/app/app.vue`, `usePageSeo.ts`) and the project
  link `subsiteUrl` (`projects.ts`) follow it.
- The exhibition site has its own `sitemap.xml` (`apps/documents/server/routes/sitemap.xml.ts`) and its `robots.txt` names
  it. Pages, dates and photographs are shared with the symbol.ngo sitemap through
  `apps/documents/server/exhibition-sitemap.ts`; symbol.ngo lists the exhibition only while it is a folder.
- `DOCS_LIVE=true`: deploy.yml builds symbol.ngo with the subdomain, and writes a redirect page for every old
  `/documentsart/…` page (`scripts/docs-redirects.mjs`). The uptime check and the SEO gate follow `DOCS_SITE_URL`.
- Consent: on the subdomain the cookie banner asks once more (another origin).
