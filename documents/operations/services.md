# Services registry

Every outside service the site of ГО «Символ» depends on or reports to: what it is for, who owns the account, where its ids
live, where its secrets live, and what to check every month. Modelled on the band site's registry. **No secret values in
this file:** secrets are named by location only. «to fill» means the team has not told us yet; do not guess.

Last review: **2026-11-15** (written from the repository, public DNS and the vendors' documentation; no account was opened).

## At a glance

| Service | What for | Console | Account owner | Ids in the repository | Status |
| --- | --- | --- | --- | --- | --- |
| GitHub organization `NGO-Symbol` and Pages | Source code, pull requests, hosting of `symbol.ngo` (GitHub Pages), Actions | github.com/NGO-Symbol | to fill (organization owners) | repository `NGO-Symbol/ngosymbol-website`; deploy-only repos `istoriia-vulytsi`, `documentsart` planned ([`deployment.md`](deployment.md)) | live |
| Cloudflare (registrar and DNS) | Registration of `symbol.ngo`, DNS (all records «DNS only»), later Web Analytics | dash.cloudflare.com | to fill | none (zone `symbol.ngo`, name servers `jewel.ns.cloudflare.com`, `troy.ns.cloudflare.com`) | live; domain registered until **2027-09-12** (RDAP, 2026-11-15) |
| Google Workspace mail | Mail `@symbol.ngo` (MX `smtp.google.com`, SPF `include:_spf.google.com`) | admin.google.com | to fill | none; the site shows `ngo.symbol@gmail.com` (`apps/main/app/data/social.ts`) | live (records present). **Do not edit the MX/SPF/Google TXT records** |
| Google Search Console | Google indexing, queries, sitemap | search.google.com/search-console | to fill | none (verification is a DNS TXT record; two `google-site-verification` TXT records already exist on the domain, one may be this) | to check/set up: [`owner-search-console.md`](owner-search-console.md) |
| Bing Webmaster Tools | Bing and Copilot indexing | bing.com/webmasters | to fill | none | not set up: [`owner-bing-webmaster.md`](owner-bing-webmaster.md) |
| Google Analytics 4 | Visit statistics, key events | analytics.google.com | to fill | `analytics.ga4` in `apps/main/app/data/analytics.ts` (empty) | not created: [`owner-ga4.md`](owner-ga4.md) |
| Microsoft Clarity | Heatmaps, session recordings | clarity.microsoft.com | to fill (a Clarity project named «Symbol Ngo» is mentioned in the band site's registry under the band owner's Microsoft account; confirm and move it to a Symbol account) | project id **`z5y92kh1wr`**, `analytics.clarity`; switch `analytics.clarityEnabled` is **off** until the team approves `/privacy` | off |
| Cloudflare Web Analytics | Cookieless visit counts for everyone | dash.cloudflare.com → Analytics & logs → Web analytics | to fill | `analytics.cloudflareToken` (empty) | not created: [`owner-cloudflare-web-analytics.md`](owner-cloudflare-web-analytics.md) |
| Telegram alert bot | Down/recovered messages, certificate and domain expiry warnings | @BotFather | to fill | none (names only: secrets below) | not created: [`owner-telegram-alerts.md`](owner-telegram-alerts.md) |
| Google for Nonprofits and Ad Grants | Free Workspace, free search ads (optional) | google.com/nonprofits | to fill | none | not applied: [`owner-google-nonprofits.md`](owner-google-nonprofits.md) |
| Google Fonts | IBM Plex Mono on the project page «Покажіть свої документи…» only | none | none | `apps/main/app/pages/projects/[slug].vue` | live (a third-party request; named on `/privacy`) |

## Where each one is wired

| Service | Code / config | Doc |
| --- | --- | --- |
| GitHub Pages, Actions | `.github/workflows/deploy.yml`, `ci.yml` | [`deployment.md`](deployment.md) |
| Cloudflare DNS | none (records live in the dashboard) | [`deployment.md`](deployment.md) §5 |
| Analytics (GA4, Clarity, Cloudflare Web Analytics) | `apps/main/app/data/analytics.ts`, `packages/brand/analytics/`, plugins in both apps | [`analytics.md`](analytics.md) |
| Privacy text | `apps/main/app/pages/privacy.vue`; links from both cookie banners and both footers | [`analytics.md`](analytics.md) |
| Uptime monitor | `.github/workflows/uptime.yml`, `keepalive.yml`, `scripts/uptime-check.sh` | [`monitoring.md`](monitoring.md) |
| Sitemap for Search Console / Bing | `apps/main/server/routes/sitemap.xml.ts` → `https://symbol.ngo/sitemap.xml`; `apps/main/public/robots.txt` | [`owner-search-console.md`](owner-search-console.md) |

## Secrets: where they live

| Secret | Location | Used by |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | GitHub repository secret (Settings → Secrets and variables → Actions); the bot owner also keeps it out of chats | uptime workflow |
| `TELEGRAM_CHAT_ID` | GitHub repository secret (not secret in itself, kept there for convenience) | uptime workflow |
| `STREET_DEPLOY_KEY`, `DOCS_DEPLOY_KEY` | GitHub repository secrets (deploy keys for the deploy-only repos, when created) | `deploy.yml` |
| Ids of GA4 (`G-…`), Clarity, Cloudflare token | **not secret**: they are public in the page source; they live in `analytics.ts` | analytics plugin |
| Account passwords, recovery codes | **not stored here**; the account owners' password manager | people |

## Monthly check list (about 15 minutes, first week of the month)

1. **Uptime:** GitHub → Actions → Uptime: runs in the last day, no red; the Telegram chat still receives the test message
   (run mode `test` once a quarter). Keepalive ran on the 1st.
2. **Domain and certificate:** the daily run warns by itself; also glance at Cloudflare → Domain Registration (expiry 2027-09-12,
   auto-renew on) and GitHub → Settings → Pages (HTTPS enforced, domain verified).
3. **Search Console:** Pages → indexed count rising? new «Not indexed» reasons? Sitemaps → last read date.
4. **Bing Webmaster Tools:** Sitemaps, indexed pages, any crawl errors.
5. **GA4** (once connected): Realtime shows a visit; key events `support`, `application`, `calendar` arrive; data retention still 14 months.
6. **Cloudflare Web Analytics** (once connected): visits arrive; nothing from `localhost` or preview hosts.
7. **Clarity** (once switched on): recordings arrive; masking still Balanced; consent mode on.
8. **Privacy page:** a new tool, cookie or form since last month? Then update `/privacy` (both languages) and its date first.
9. **Accounts:** each service has at least two people who can sign in (no single point of failure); update the owner column above.
10. **This file:** fix anything that changed.

## Changing or adding a service

1. Wire it in code and update the rows above (ids, code, secrets).
2. If it sets cookies or processes visitor data: update `/privacy` in both languages and its date; gate it on consent.
3. Add its check to the monthly list and, if it can silently break, to `scripts/uptime-check.sh`.
