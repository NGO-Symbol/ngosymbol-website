# Uptime and expiry monitoring

An external monitor that checks the published site from GitHub's runners and tells the team in Telegram when something
breaks. Ported from the band site's `wbm-uptime` (same state-change logic). Owner setup in Ukrainian:
[`owner-telegram-alerts.md`](owner-telegram-alerts.md).

| Piece | Where |
| --- | --- |
| Check script | `scripts/uptime-check.sh` |
| Workflow (every 5 min, daily run, manual run) | `.github/workflows/uptime.yml` |
| Monthly keepalive | `.github/workflows/keepalive.yml` |
| Secrets | repository secrets `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (names only; values never in the repository) |

The repository is public, so scheduled Actions minutes are free (a private repository would use about 8,600 minutes a month
for a 5-minute schedule).

## What is checked

Every 5 minutes (each failing check is retried once after 45 s before it counts):

- `https://symbol.ngo/`, `/en/`, `/sitemap.xml`, `/documentsart/` answer **200** after redirects and contain an expected
  string (`Символ`, `Symbol`, `<urlset`, `Покажіть свої документи`). The strings were chosen not to depend on page titles.
- `https://www.symbol.ngo/`, `http://symbol.ngo/` and `http://www.symbol.ngo/` end up on `https://symbol.ngo/` with 200.

Once a day (06:17 UTC):

- **TLS certificate** of `symbol.ngo`: warns when fewer than 14 days are left. GitHub Pages renews it by itself; a warning
  means renewal is stuck (check Settings → Pages → HTTPS and that the Cloudflare records are «DNS only»).
- **Domain registration** of `symbol.ngo` through RDAP (`rdap.org`, which redirects to the `.ngo` registry): warns when fewer
  than 30 days are left. The registration runs until 2027-09-12 (read from RDAP on 2026-11-15). Renew in Cloudflare →
  Domain Registration. The warning repeats daily until fixed.

## Alerts

A message goes to Telegram **only when the state changes**: one «не працює» message with the reasons when the site goes down,
one «знову працює» when it recovers. The state (`up` / `down`) is kept between runs in the Actions cache (a cache key is
saved only on a change, restored by prefix on the next run). Certificate and domain warnings are sent by the daily run.

**Missing secrets never fail the workflow.** Without `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` the script runs the checks, keeps
its state and prints `[telegram disabled …] Would have sent: …` with the full text in the run log. A failed Telegram
request becomes a warning annotation, never a red run. The script always ends with exit code 0.

## One-time setup

1. Create the bot and get the chat id: [`owner-telegram-alerts.md`](owner-telegram-alerts.md).
2. Add the two secrets (Settings → Secrets and variables → Actions → New repository secret, or
   `gh secret set TELEGRAM_BOT_TOKEN -R NGO-Symbol/ngosymbol-website` and the same for `TELEGRAM_CHAT_ID`).
3. Test: Actions → **Uptime** → Run workflow → mode `test`. A test message should arrive. Mode `daily` runs everything,
   including the certificate and domain checks.

The workflow files must be on `main` for the schedule to start (GitHub runs schedules only from the default branch).

## Run it locally

```bash
bash scripts/uptime-check.sh              # prints instead of sending
MODE=daily bash scripts/uptime-check.sh   # also certificate and domain expiry
UPTIME_SITE=https://symbol.ngo/nope RETRY_DELAY=1 STATE_FILE=/tmp/s bash scripts/uptime-check.sh   # simulate an outage
```

## The 60-day rule (keepalive)

GitHub **disables scheduled workflows in a public repository after 60 days without repository activity**; the monitor would
stop silently. Two protections:

1. The repository gets commits far more often than every 60 days while the site is maintained.
2. `.github/workflows/keepalive.yml` runs monthly and re-enables `uptime.yml` and itself through the API
   (`PUT /repos/{owner}/{repo}/actions/workflows/{file}/enable`) and prints when the monitor last ran. Not verified: whether
   this API call resets GitHub's 60-day inactivity counter in every case (third-party keepalive tools rely on it, GitHub's
   documentation does not state it). If the repository is quiet for more than about 50 days, open Actions → Uptime and check
   that it is enabled, or make any small commit.

The monthly check list in [`services.md`](services.md) includes «Uptime workflow ran in the last day».

## Limits

- A scheduled run may start a few minutes late; with a 5-minute schedule a short outage can go unnoticed.
- GitHub Actions cache entries are evicted after 7 days without use; the monitor restores the state every 5 minutes, so it is
  never idle that long. If the cache is lost, the state defaults to `up` (at worst a «down» message repeats once).
- It cannot tell a Cloudflare, GitHub Pages or DNS problem apart: the message lists which URL failed and how.
