# Deployment and agent Git workflow

Accepted GitHub Pages hosting with a public source repository (ADR-0005) and a deploy-only repository per autonomous project. Added the Deploy workflow and the owner setup runbook in `documents/operations/deployment.md`, including Cloudflare DNS records that keep existing Google Workspace mail intact.

Adopted task branches with pull requests for all changes (ADR-0006). Added `pnpm task:*` commands, the `site-workflow` agent skill, `CLAUDE.md`/`GEMINI.md` pointers to `AGENTS.md`, and a Claude Code session-start status hook so every agent begins with the current repository state.

The repository moved to the `NGO-Symbol` organization and both sites went live on GitHub Pages the same day. `symbol.ngo` and `istoriia-vulytsi.symbol.ngo` are connected through Cloudflare DNS (DNS-only records, mail records untouched) with HTTPS enforced; `www.symbol.ngo` redirects to `symbol.ngo`.
