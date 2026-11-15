# Analytics, privacy and operations

Date: 2026-11-15
Status: implemented locally on a branch started from `task/release-seo`; not published. **The privacy page is a DRAFT awaiting
approval by Юрій Рассоха and Петро Чекаль.** It may be published because every statement on it is true for the site as it is
(its tool status lines follow `apps/main/app/data/analytics.ts`), but the Clarity switch stays off until they approve it.

## What changed

- **Analytics rules, shared by both sites** (`packages/brand/analytics`, exported as `@symbol/brand/analytics`): analytics runs
  only on `symbol.ngo` and subdomains (never localhost, previews or `/design/`) and never for likely bots (rules taken from the WBM
  band site). Nothing that needs consent loads before the visitor accepts in the banner.
- **Clarity:** project id `z5y92kh1wr` is in `analytics.ts`, behind `clarityEnabled: false`. After acceptance the code sends
  `clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })` before the tag (API verified in Microsoft
  Learn, «Clarity Cookie Consent API – ConsentV2»; keys are case-sensitive); refusal or withdrawal sends `denied` and erases its cookies.
- **GA4:** still no measurement id (the owner creates the property). Consent Mode default denied, advertising features off,
  events `support`, `calendar`, `project_site`, `application`, `outbound` with clean parameters (`target_url`, `target_domain`,
  `click_area`, `click_page`, `page_lang`; no query strings, no mailto/tel). Owner documentation lists the event-scoped custom
  dimensions and key events: `documents/operations/analytics.md`, `owner-ga4.md`.
- **Cloudflare Web Analytics:** token field `cloudflareToken` (empty: nothing loads); cookieless, loads without the banner on
  production hosts.
- **Exhibition site** (`apps/documents`): same plugin, same ids (through the `#symbol` alias), its own banner in its own style,
  footer links to the privacy page and «Налаштування кукі». The choice is shared with symbol.ngo (same origin, `localStorage`).
- **Privacy and cookie policy** `/privacy` and `/en/privacy` (draft), linked from both banners and both footers.
- **Monitoring:** `.github/workflows/uptime.yml` (every 5 minutes: pages, redirects; daily: TLS certificate under 14 days,
  domain registration under 30 days via RDAP), `scripts/uptime-check.sh`, `keepalive.yml`. Telegram only on state change; the
  workflow never fails for missing secrets. `documents/operations/monitoring.md`.
- **Operations docs:** services registry (`documents/operations/services.md`) and owner guides in Ukrainian
  (`owner-search-console.md`, `owner-bing-webmaster.md`, `owner-ga4.md`, `owner-github-domain-verification.md`,
  `owner-cloudflare-web-analytics.md`, `owner-telegram-alerts.md`, `owner-google-nonprofits.md`).

## Verified facts used on the privacy page

- GA4 cookies `_ga` and `_ga_<container-id>`: 2 years (Google Analytics help, «Cookies used by Google Analytics»); browsers cap
  them (Chrome 400 days, Safari 7 days). GA4 event retention: 2 or 14 months, a property setting; the page says up to 14 months.
- Clarity cookies: Microsoft's cookie list names `_clck`, `_clsk` (first party) and `CLID`, `ANONCHK`, `MR`, `MUID`, `SM` (third
  party) but **publishes no lifetimes**. The lifetimes on the page (`_clck` up to 1 year, `_clsk` 1 day, Microsoft cookies up to 13
  months) come from the WBM site's production check of 2026-10-30 and third-party lists: re-check them in a browser when Clarity is switched on.
  Clarity retains recordings 30 days, favourites and samples up to 9 months (Clarity FAQ).
- Cloudflare Web Analytics: states it uses no cookies or localStorage and does not track individual visitors; raw data 7 days, then
  aggregated, dashboard up to 6 months; query strings are not logged (Cloudflare docs).
- GitHub Pages logs visitor IP addresses for security (GitHub Docs). The project page «Покажіть свої документи…» loads IBM Plex Mono from Google Fonts.

## Decisions and open points

- The legal name «Громадська організація «Символ»» comes from the release brief; confirm it against the ЄДР extract.
- Legal basis: consent for GA4 and Clarity. For cookieless Cloudflare Web Analytics the page relies on the vendor's statement that it
  uses no cookies and tracks no individuals, and names no basis: the team may want a lawyer to confirm. The rights paragraph mentions the
  Ukrainian Parliament Commissioner for Human Rights and GDPR from general knowledge, not from the knowledge base.
- Not verified: whether GitHub's keepalive API call resets the 60-day schedule rule (documented risk in `monitoring.md`); the owner-account
  steps in the guides (no account was opened); Ad Grants conditions beyond the 10,000 USD figure; whether Cloudflare Web Analytics covers a future `documentsart.symbol.ngo` host.
- Not done here (other work stream): `/privacy` and `/en/privacy` are not yet in `sitemap.xml`; add them with the other pages.

## Verification

- `pnpm check` passes. Browser checks with a temporary playwright script (removed): banner appears on a simulated production
  host only; before a choice only the Cloudflare beacon loads; acceptance loads GA4 and Clarity with the right consent signals; refusal and
  withdrawal load nothing and remove cookies; the footer control reopens the banner; localhost and bot user agents load nothing; both sites;
  privacy page checked at 390 and 1280 px, light and dark, Ukrainian and English.
- `scripts/uptime-check.sh` run against the live site (all 7 checks pass, certificate 71 days, domain 300 days); outage, repeat and recovery simulated.
- Both workflow files validated with `@action-validator/cli`.
