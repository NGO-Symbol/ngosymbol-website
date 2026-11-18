# 2026-11-17: team answers applied, release finished

- The head of the NGO, Юрій Рассоха, approved the privacy page (`/privacy`, `/en/privacy`) in full with no edits; Microsoft Clarity is switched on (`clarityEnabled: true`). `/privacy` is in the sitemap now.
- Legal name confirmed by the team against the ЄДР and the Statute; non-profit register entry recorded (organization.md). English short name «Symbol» added to `alternateName`.
- Uptime alerts go by email to `ngo.symbol@gmail.com` (team decision): `scripts/uptime-check.sh` sends through SMTP when the secrets `SMTP_USER`, `SMTP_PASSWORD`, `ALERT_EMAIL_TO` exist; the guide is [`../../operations/owner-email-alerts.md`](../../operations/owner-email-alerts.md). Telegram stays optional.
- Google services (Search Console, GA4, Google for Nonprofits) belong to `ngo.symbol@gmail.com`; the team applies to Google for Nonprofits itself (the register extract exists).
- Outreach list for links from partners and media: [`../../operations/partner-links.md`](../../operations/partner-links.md).
- Waiting for the team: the Cloudflare account owner (Web Analytics token), the Search Console check, the GA4 property, the Gmail app password for alerts, links in the social profiles.

## Fixes from the final audit (same day)

- The exhibition pages «Події» and «Команда» (UA and EN) failed on a direct visit: a helper used by the page's structured data was declared after `usePageSeo`, which evaluates it at once in the browser. Declarations moved above it; all 50 exhibition pages load without errors.
- Dark theme: the «Підтримати» pill kept light text on apricot (1.1:1) because main.css's unlayered `a { color: inherit }` won over the layered component rule; now dark text in both themes.
- Small violet text (labels, dates, eyebrows): new token `--symbol-violet-text` (#5f4f73, 6.9:1 on cream; #b7a6cc in dark); the brand violet stays for fills and large type. Contact page: dark ink on the violet band (5.1:1).
- Support page: the empty IBAN row is hidden; the page says the account number is sent on request by email.
- Contact page: the internal note about Google Workspace is removed.
- `/events/?view=calendar` opens the calendar again (the prerendered page did not read the query).
- Language switch: the visible text now reads «UA EN», as the accessible name does.
- Exhibition: no horizontal scroll on the artist and programme pages at 320–390 px; typo «ґспосіб» fixed; programme events carry their venue in JSON-LD.

## 2026-11-18

- Privacy page: `SRM_B` added to the Microsoft cookie row; the Clarity paragraph says Microsoft may set its own cookies on clarity.ms and bing.com despite the advertising-storage denial, and the withdrawal item says the site cannot remove those (found by the security audit in a real browser). Agreed by the developer on the team's behalf; the policy date is 18 November 2026.
- About page: text on the new violet band uses near-black ink (5.1:1).
