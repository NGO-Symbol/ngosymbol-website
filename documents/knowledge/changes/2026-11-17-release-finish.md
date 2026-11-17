# 2026-11-17: team answers applied, release finished

- The head of the NGO, Юрій Рассоха, approved the privacy page (`/privacy`, `/en/privacy`) in full with no edits; Microsoft Clarity is switched on (`clarityEnabled: true`). `/privacy` is in the sitemap now.
- Legal name confirmed by the team against the ЄДР and the Statute; non-profit register entry recorded (organization.md). English short name «Symbol» added to `alternateName`.
- Uptime alerts go by email to `ngo.symbol@gmail.com` (team decision): `scripts/uptime-check.sh` sends through SMTP when the secrets `SMTP_USER`, `SMTP_PASSWORD`, `ALERT_EMAIL_TO` exist; the guide is [`../../operations/owner-email-alerts.md`](../../operations/owner-email-alerts.md). Telegram stays optional.
- Google services (Search Console, GA4, Google for Nonprofits) belong to `ngo.symbol@gmail.com`; the team applies to Google for Nonprofits itself (the register extract exists).
- Outreach list for links from partners and media: [`../../operations/partner-links.md`](../../operations/partner-links.md).
- Waiting for the team: the Cloudflare account owner (Web Analytics token), the Search Console check, the GA4 property, the Gmail app password for alerts, links in the social profiles.
