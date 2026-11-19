# Technical architecture

## Chosen model

The repository is a **pnpm monorepo** containing independently deployable Nuxt 4 applications.

```text
apps/main                  -> symbol.ngo
apps/istoriia-vulytsi      -> my-street.symbol.ngo
packages/brand             -> optional shared tokens and original mark
documents/knowledge        -> durable project memory
```

Small projects are routes inside `apps/main`. Large projects are separate applications, not nested routes disguised as microsites. This gives them independent layouts, dependency choices, build settings, release timing, and future backend needs while retaining one repository and shared organizational knowledge.

## Rendering

Start static-first with Nuxt prerendering. Do not introduce a persistent Node server, database, or API until a concrete feature requires runtime state or secrets. Nuxt/Nitro can add server routes later, but an app with runtime server behavior must move from static hosting to a compatible server or edge deployment.

## Deployments and subdomains

Each hostname is a separate deployment target:

- `symbol.ngo` builds `apps/main`.
- `my-street.symbol.ngo` builds `apps/istoriia-vulytsi`.
- `documentsart.symbol.ngo` builds `apps/documents` (the exhibition «Покажіть свої документи…»). Until the owner switches it on it is published inside the main site at `symbol.ngo/documentsart/`. One value decides where it lives: `DOCS_SITE` (`apps/main/app/data/docs-site.ts`, set at build time from `DOCS_SITE_URL` through the brand layer). Canonicals, both sitemaps, the project link, the uptime check and the SEO gate follow it; with the repository variable `DOCS_LIVE=true` the main site drops the exhibition from its sitemap and every old `/documentsart/…` page becomes a redirect to the same page on the subdomain (`scripts/docs-redirects.mjs`). On its own address the exhibition site has its own `robots.txt` and `sitemap.xml` (`apps/documents/server/routes/sitemap.xml.ts`, pages shared with the main sitemap through `apps/documents/server/exhibition-sitemap.ts`).

Hosting is GitHub Pages ([ADR-0005](decisions/ADR-0005-multi-app-hosting.md)). The source repository is public. The `Deploy` workflow publishes `apps/main` to this repository's Pages site and each autonomous app to its own deploy-only repository (`NGO-Symbol/istoriia-vulytsi`). Builds use the Nitro `github_pages` preset; the base path switches from `/<repo>/` to `/` once a custom domain is configured. DNS stays in Cloudflare in DNS-only mode. Setup steps: [`../operations/deployment.md`](../operations/deployment.md).

## Search visibility

Indexing: since 2026-10-30 the main site and the exhibition site are open to search engines (`indexable = true` in their `nuxt.config.ts`; `apps/main/public/robots.txt` allows all crawlers and names the sitemap). The «Історія моєї вулиці» app keeps `indexable = false` (`noindex, nofollow` on every page) until its launch.

SEO release (2026-11-15, [`changes/2026-11-15-seo-release.md`](changes/2026-11-15-seo-release.md)):
- Titles, descriptions, Open Graph: one `usePageSeo()` call per page (main and exhibition apps); the project's search texts are data (`seoTitle` / `seoDescription`, UA in `projects.ts`, EN in `projects-en.ts`); the site name is written once; share images carry their real size from `images.json`.
- Structured data: `ldJson()` (escapes `<`), `kyivDateTime()`, ids `…/#org` and `…/#website` (one pair per language) in `packages/brand/app/utils/seo.ts`; the home page carries the organisation graph, events and projects use the project `role` (`organizer` / `partner`).
- `404.html` is the site's own `error.vue` (`experimental.prerenderErrorPages`); GitHub Pages serves it with status 404.
- `robots.txt`: AI search allowed; AI training crawlers kept out of the exhibition and artists' works (`USER_CONFIRMED`: no consent); the street app is crawlable so its `noindex` is seen.
- Sitemap `lastmod` from content dates and git history (CI checkouts fetch full history); no `image:title`.
- `pnpm seo:check` (SEO gate) runs in `pnpm check` after the generated sites exist; `pnpm i18n:check` also checks the JSON-LD of English pages.
- The entry script and its modulepreload hints are added after the first paint (`apps/main/server/plugins/defer-entry.ts`): they shared the bandwidth with the stylesheet and font and delayed the first paint of the home page on phones.

## Change workflow

All changes go through `task/*` branches and pull requests guarded by the `validate` check; agents drive Git through `pnpm task:*` ([ADR-0006](decisions/ADR-0006-agent-git-workflow.md), [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md)).

Do not create wildcard DNS for all subdomains. Add and verify each project hostname explicitly to reduce domain-takeover risk.

## Routing contract

- Content records live in typed modules under `apps/main/app/data/` (projects, events, people, organizations, opportunities, press, formats). `apps/main/app/utils/content.ts` resolves relations and validates references; a missing reference fails the build.
- Every project card opens `/projects/{slug}`; subsites are linked from the project page via `subsiteUrl` (ADR-0008).
- Inline references use `[[project:slug]]`, `[[event:slug]]`, `[[person:slug]]`.
- `/events.ics` is generated by a prerendered Nitro route.
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

Performance (2026-10-30, stage 1 of the site plan):
- Photographs go through one pipeline (ADR-0010, `scripts/optimize-images.mjs`, sharp): the file at its original path is the web master (`.jpg`, ≤ 1600 px, no EXIF, ≤ 400 KB) and AVIF variants (480/960/1600 px) sit in `_opt/` (`/media/a/b.jpg` → `/media/_opt/a/b-960.avif`); `apps/main/app/data/images.json` records size, average colour and variant widths, `images.lock.json` the master hashes. `<MediaImg>` renders one `<img>` with `srcset`/`sizes`, `width`/`height`, a colour placeholder and lazy loading (`priority` for the first big photo), falling back to the JPEG. `pnpm images:check` (in `pnpm check`) fails on any raw, oversized or unreferenced image; `pnpm task:save` optimizes automatically. Agents follow `.agents/skills/add-photo`.
- Internal links carry a trailing slash (`experimental.defaults.nuxtLink.trailingSlash: 'append'`, sitemap and links to symbol.ngo from the exhibition site too): GitHub Pages serves pages as folders and otherwise redirects every visit.
- Fonts are WOFF2 first (Zakon, EXDocument), OTF as fallback; Zakon Regular is preloaded. The deploy copies fonts into /documentsart/: the built CSS points there, and without them the exhibition font returned 404 in production.
- Headings of the exhibition theme are visible from the first paint (no clip-path or opacity-0 starts), so the largest element is not held back by animation.

SEO (2026-11-14, stage 2 of the site plan): every page has a canonical URL with the trailing slash, hreflang uk/en/x-default (main and exhibition sites), Open Graph with a default card (`/og-default.jpg`) overridden by the portrait / project poster / event photo. Person and exhibition-artist profiles use `ProfilePage` + a representative `ImageObject`; people, projects and events expose their complete relevant image sets in schema.org data. `/sitemap.xml` lists Ukrainian and English pages, the exhibition site and **every photograph actually rendered on a public page** (no arbitrary gallery limits), including PSD artist-work archives and listing hover covers, with descriptive titles. Portraits, covers and gallery photos carry names / artwork or event descriptions as alt text. The decorative logo intro is client-only and skipped by crawlers, so prerendered HTML and search previews start with page content rather than a full-screen overlay.

Motion tiers (2026-10-30): `plugins/motion.client.ts` sets `html[data-motion]` to `full`, `lite` or `off` — off for reduced motion; lite for data saver, ≤2 CPU cores or ≤2 GB memory, or when the page keeps dropping frames (watched live, one-way). Lite removes endless and decorative motion (orbit ring and core, tilt, logo and tap animations, long reveals) and keeps the content. Crossing between symbol.ngo and a project site takes about 0.4 s on phones.

Analytics (2026-10-30, reworked 2026-11-15): the logic is shared by both sites in `packages/brand/analytics` (`@symbol/brand/analytics`); ids and the Clarity switch live in `apps/main/app/data/analytics.ts` (GA4 id and Cloudflare token empty until the owner creates them; Clarity `z5y92kh1wr` behind `clarityEnabled: false`). Nothing runs off production hosts (`symbol.ngo` and subdomains; not localhost, previews, `/design/`) or for bots. Cloudflare Web Analytics (cookieless) loads without consent when its token is set; Google Analytics 4 and Microsoft Clarity load only after the visitor accepts in the banner (`CookieConsent` in each app; choice in localStorage `symbol-consent`, shared by both sites; «Відхилити» as visible as «Прийняти»; «Налаштування кукі» in both footers reopens it). Clarity gets `consentv2`. GA4 events support, calendar, project_site, application, outbound carry clean parameters. Privacy and cookie policy: `/privacy`, `/en/privacy` (draft pending team approval). Details: [`../operations/analytics.md`](../operations/analytics.md).

Operations (2026-11-15): uptime and expiry monitoring by GitHub Actions ([`../operations/monitoring.md`](../operations/monitoring.md)); every outside service and its owner in [`../operations/services.md`](../operations/services.md).
