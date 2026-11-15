# Analytics and cookie consent

How visit statistics work on `symbol.ngo` and the exhibition site (`symbol.ngo/documentsart/`), what each tool collects, and
how to switch tools on. The visitor-facing text is the privacy page (`/privacy`, `/en/privacy`, source
`apps/main/app/pages/privacy.vue`). Account setup for the owner (in Ukrainian): [`owner-ga4.md`](owner-ga4.md),
[`owner-cloudflare-web-analytics.md`](owner-cloudflare-web-analytics.md).

## The rules (implemented in `packages/brand/analytics`)

1. **Real visitors only.** Analytics code runs only on `symbol.ngo` and its subdomains, never on `localhost`, a GitHub or
   Cloudflare preview host, a folder opened from disk, or the `/design/` gallery, and never for a likely bot
   (`navigator.webdriver`, or a user agent with `bot`, `crawl`, `headless`, `lighthouse`…). Same rule as the WBM band site.
   On any other host nothing loads and no banner is shown.
2. **Cloudflare Web Analytics** is cookieless and loads for every real visitor **without** the banner, when its token is set.
3. **Google Analytics 4 and Microsoft Clarity** load only after the visitor presses «Прийняти». «Відхилити» is as visible.
   A refusal or a later withdrawal sets `symbol-consent = denied`, removes `_ga`, `_ga_*`, `_clck`, `_clsk`, and reloads
   the page if a tool had already run, so nothing continues.
4. The choice is stored in `localStorage` key `symbol-consent` (`granted` | `denied`). Both sites share the origin
   `symbol.ngo`, so the visitor decides once. The footer control «Налаштування кукі» reopens the banner on both sites; it
   appears only when GA4 or Clarity is switched on.
5. With neither GA4 nor Clarity on, there is no banner at all (Cloudflare alone needs none).

## Where things live

| What | Where |
| --- | --- |
| All ids and the Clarity switch | `apps/main/app/data/analytics.ts` (the exhibition site reads the same file through the `#symbol` alias) |
| Shared code | `packages/brand/analytics/` (`hosts.ts`, `bot.ts`, `links.ts`, `index.ts`), exported as `@symbol/brand/analytics` |
| Main site plugin, banner | `apps/main/app/plugins/analytics.client.ts`, `components/CookieConsent.vue` (footer control in `SiteFooter.vue`) |
| Exhibition plugin, banner | `apps/documents/app/plugins/analytics.client.ts`, `components/CookieConsent.vue` (footer in `DocsFooter.vue`) |
| Visitor-facing text | `apps/main/app/pages/privacy.vue` (its tool status lines follow `analytics.ts` automatically) |

## Switching tools on

Edit `apps/main/app/data/analytics.ts`, run `pnpm check`, open a pull request (`pnpm task:ship`).

- **Cloudflare Web Analytics:** put the token in `cloudflareToken`. Nothing else changes. Guide: `owner-cloudflare-web-analytics.md`.
- **GA4:** put the measurement id in `ga4`. The banner starts to appear and the footer control with it. Guide: `owner-ga4.md`.
- **Microsoft Clarity:** the project id `z5y92kh1wr` is already in `clarity`, but `clarityEnabled` is **`false`**. Set it to
  `true` only **after the team (Юрій Рассоха and Петро Чекаль) approves the privacy page**. Before that, re-read the Clarity
  paragraph and the cookie table of `/privacy` against Microsoft's current cookie list
  (<https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies>): Microsoft does not publish
  lifetimes there; the ones on the page (`_clck` up to 1 year, `_clsk` 1 day) come from what the WBM site observed on
  production on 2026-10-30 and from third-party lists, and the 13 months for MUID from Microsoft's privacy statement. Check
  them in a browser (DevTools → Application → Cookies) after switching on.
- To switch a tool off, empty its id (or set `clarityEnabled: false`). Visitors who accepted earlier simply stop being measured.

### Clarity consent signal

After acceptance the code queues `clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })` before the
tag script is added (Microsoft Learn, «Clarity Cookie Consent API – ConsentV2»: keys are case-sensitive, both required).
Withdrawal sends `consentv2` with both `denied` and `clarity('consent', false)`, which erases Clarity's cookies. Clarity
has enforced a consent signal for visits from the EEA, UK and Switzerland since 2025-10-31. In the Clarity project
(Settings → Setup / Consent mode) keep the consent requirement on and masking on **Balanced** or stricter; the privacy
page says input fields are masked.

## GA4 events

The page view is sent by the GA4 tag itself (enhanced measurement; keep «Page changes based on browser history events»
on, the sites are single-page apps). On top, every click on a link is classified (`packages/brand/analytics/links.ts`):

| Event | When | Key event? |
| --- | --- | --- |
| `support` | any link to `/support` (on `symbol.ngo` or its subdomains) | yes |
| `application` | an external link on an `/opportunities` page (call, form, organiser) | yes |
| `calendar` | `.ics` file, `webcal:` link, or `?view=calendar` | yes |
| `project_site` | crossing between Symbol sites: main ↔ `/documentsart`, or to/from a `*.symbol.ngo` project site | yes (optional) |
| `outbound` | any other external link | no (too broad) |

`mailto:`, `tel:` and other non-web links send nothing (an e-mail address or phone number is personal data).

Parameters sent with each event (all clean: no query string, no `#fragment`, no `?from=` page memory):

| Parameter | Value | Example |
| --- | --- | --- |
| `target_url` | the link target, origin + path only | `https://forms.gle/abc` |
| `target_domain` | its host | `forms.gle` |
| `click_area` | landmark holding the link: `header`, `footer`, `main`, `other` | `main` |
| `click_page` | the page the click happened on, without `/en` prefix and query | `/opportunities/` |
| `page_lang` | `uk` or `en` | `en` |

The names are deliberately not GA4's own `link_url` or `page_path`, so nothing clashes with built-in or reserved names.
GA4 is configured with advertising features off (`allow_google_signals: false`, `allow_ad_personalization_signals: false`)
and Consent Mode default `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = `denied`; only
`analytics_storage` is updated to `granted` after the visitor accepts. (`anonymize_ip` is not used: GA4 always
anonymises IP addresses.)

### What the owner sets up in GA4

Do this once the property exists (details in `owner-ga4.md`). GA4 can only report a parameter that is registered.

**Event-scoped custom dimensions** (Admin → Data display → Custom definitions → Create custom dimension, Scope: **Event**):

| Dimension name | Event parameter | Why |
| --- | --- | --- |
| Target domain | `target_domain` | which sites visitors go to |
| Click area | `click_area` | header, footer or page body |
| Click page | `click_page` | which page led to the click |
| Page language | `page_lang` | Ukrainian or English visitors |
| Target URL (optional) | `target_url` | exact destination; many values, so optional |

**Key events** (Admin → Data display → Key events → New key event, type the name): `support`, `application`, `calendar`,
and optionally `project_site`. Do not mark `outbound`. A key event can be created by name before it has ever fired.

Also: Data retention → event data **14 months**; Google signals **off**; Enhanced measurement on, and if outbound clicks
double up with our `outbound` event in reports, switch off only its «Outbound clicks» toggle.

## Testing locally

The analytics code never runs on `localhost`. To see the banner and the requests, serve a build on another port and make
the browser believe the host is `symbol.ngo`, without DNS changes:

```bash
__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=symbol.ngo pnpm --filter @symbol/main exec nuxt dev --port 3101 --host 127.0.0.1
# a throwaway Chrome that maps symbol.ngo to this machine (and a human user agent: headless/webdriver counts as a bot):
chrome --host-resolver-rules="MAP symbol.ngo 127.0.0.1" http://symbol.ngo:3101/
```

For a scripted check, use `playwright-core` with `chromium.launch({ channel: 'chrome', args: ['--host-resolver-rules=MAP symbol.ngo 127.0.0.1'] })`,
a normal desktop `userAgent`, an init script that makes `navigator.webdriver` false and sets `sessionStorage['symbol-intro'] = '1'`,
and `context.route(...)` stubs for `googletagmanager.com`, `clarity.ms`, `cloudflareinsights.com` so no real data is sent.
Put the temporary script in `scripts/` and delete it afterwards. Use a test id in `analytics.ts` only while testing and
restore it before committing.

## Related decisions and risks

- The project page «Покажіть свої документи…» on the main site loads IBM Plex Mono from Google Fonts
  (`apps/main/app/pages/projects/[slug].vue`); Google receives the visitor's IP address. The privacy page says so. Self-hosting
  the font would remove it (not done).
- GitHub Pages logs visitor IP addresses for security (GitHub Docs, «What is GitHub Pages?»); the privacy page says so.
- The Cloudflare «DNS only» mode of the domain means Cloudflare's automatic beacon injection is not available; the beacon
  is added by our code, which also lets us apply the host and bot rules.
