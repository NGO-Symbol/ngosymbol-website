---
name: services-check
description: Periodic health review of the external services a project depends on - TLS certificates, domain expiry, HTTP health, API tokens, analytics and search consoles. Reads the registry in .claude/services.md, runs read-only checks itself, asks the owner to open consoles that need a login, writes a short report and updates the review date. Use when the owner asks to check services, or when the SessionStart nudge says the last review is over 30 days old.
disable-model-invocation: true
metadata: {pack: skill-pack, id: services-check, version: 1.0.0}
---
# services-check

The registry is `.claude/services.md`: one table row per service (what it is for, account, where its
secret lives, what expires and when, how to check). The session nudge reads the line
`Last full review: YYYY-MM-DD` from the same file.

## Hard rules
- Read-only. Never log in, enter passwords, grant OAuth consent, pay or renew anything. Never
  print secret values; name only where they live.
- Never run anything that publishes, sends or mutates production data.
- A failed check is reported, not "fixed" by guessing; renewals are the owner's action.

## Process
1. **Read the registry.** If `.claude/services.md` still holds the template placeholders, help the
   owner fill the real rows first (ask, do not invent). Note rows with a dated expiry.
2. **Automatic checks (no login).** For each row that has a host:
   - TLS: `echo | openssl s_client -servername HOST -connect HOST:443 2>/dev/null | openssl x509 -noout -enddate`
     and compute days left. Warn under 21 days, fail under 7.
   - Domain: `whois DOMAIN` if available (grep "Expir"); otherwise use the date in the registry.
     Warn under 60 days.
   - HTTP health: `curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' -m 10 URL` for the
     health or home URL. Anything other than 2xx/3xx is a failure.
   - Tokens: if the project exposes an expiry (a CLI, a status endpoint, a documented
     read-only command), run it; else compare the registry's date.
   - Registry dates already past or within 30 days are warnings regardless of tooling.
3. **Needs the owner.** List consoles that require login (search console, analytics, billing,
   social app dashboards, registrar). Ask the owner to open each, or to paste the relevant
   screen/number; read only what they show. One short question per console.
4. **Report** (in the owner's language), under 15 lines: broken (with the fix and who does it),
   expiring soon (date), healthy (one line), pending owner actions.
5. **Update the date.** Replace the `Last full review:` line in `.claude/services.md` with today's date
   (`date +%F`) only if every automatic check ran and the owner-login items were handled or
   explicitly deferred. Add new expiries learned. Do not commit unless asked.

## Done when
- Each registry row was checked automatically, or marked "needs owner" or "no check available".
- The report names every failure with an owner and a deadline.
- `Last full review:` holds today's date.
- No secret value appeared in output or files.
