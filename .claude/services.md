# External services registry

One row per service the project depends on. Never write secret values here, only where they live.

| Service | What it is for | Account / where to log in | Secret lives in | Expires / renews | How to check |
|---|---|---|---|---|---|
| Domain registrar (example) | the main domain | owner account at the registrar | password manager | domain, 2027-01-01 | `whois example.com` |
| TLS certificate (example) | HTTPS for the site | issued by the host / ACME | server, auto-renewed | cert, auto, check `notAfter` | `openssl s_client -connect example.com:443` |
| Health URL (example) | uptime | public | none | never | `curl -I https://example.com/health` |
| API token (example) | third-party API | provider console | env var `EXAMPLE_TOKEN` on the server | token, 2026-12-01 | provider status command |

Replace the example rows with the real ones; delete rows that do not apply.

Last full review: 1970-01-01
