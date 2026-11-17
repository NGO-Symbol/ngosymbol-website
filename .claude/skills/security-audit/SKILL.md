---
name: security-audit
description: Security review of a changed surface - threat-model it, run focused parallel reviewers, adversarially verify every finding, keep sensitive results out of git, and make no fixes without the owner's approval. Use after changes to auth, tenancy/isolation, uploads, payments, secrets handling or public routes, or when asked for a security audit.
disable-model-invocation: true
metadata: {pack: skill-pack, id: security-audit, version: 1.0.0}
---
# security-audit - find real holes, refute the fake ones

Generic "audit this repo" prompts yield plausible, mostly wrong reports. What works: a narrow
assignment per reviewer, an explicit list of what was covered, an independent verifier whose job is to
disprove, and proof instead of prose.

## Hard rules
- Never touch production or third parties. Local code and local test environments only.
- The audit is read-only on the repo: no edits, stash, checkout, reset. Fixes are a later step.
- Findings stay out of git until fixed. An open confirmed finding is an exploit recipe.
- Never put exploit details in commits, chat channels or public artifacts.

## Process
1. **Scope.** Find what changed: `git diff <last-audited-sha>..HEAD --stat` (first run: the
   whole app). Read AGENTS.md for the stack, roles and hard rules.
2. **Threat model (short, written to the run notes).**
   - Principals: anonymous, logged-in user, member of org A, admin, service/bot.
   - Assets: personal data, credentials, money, other tenants' rows, files, publishing ability.
   - Boundaries the diff touches: public routes, auth/session, tenant scoping, uploads,
     payment/webhook endpoints, deserialization, outbound requests, admin panels.
   - Split into coverage units (a route module, a job family, a handler family). Keep a ledger:
     unit, state (planned / hunted / deferred + reason).
3. **Deterministic layer first** (what the project has): secret scanner over history, dependency
   audit, static analysis rules, route inventory tests. Triage output before any agent hunts.
4. **Parallel hunters**, one per unit or per 2-3 related units. In ONE message launch them as read-only
   subagents. Each prompt contains: the threat model verbatim, its unit and file list, the attack
   classes to check (authn/authz bypass, IDOR and cross-tenant access, injection, SSRF, path
   traversal, upload type/size/name abuse, mass assignment, race / replay, secrets in logs,
   missing rate limits, unsafe redirects), and a required result shape:
   `{id, title, file:line, attacker, steps, impact, proposed_severity, proof_idea}`.
   Hunters must not run anything against production.
5. **Coverage critic.** After the wave, one agent compares the ledger with the code surface and
   names units nobody covered. Add them and hunt again, or mark `deferred` with a reason.
   Never leave a gap unstated.
6. **Adversarial verification.** Deduplicate by root cause. Each unique candidate goes to a FRESH
   verifier that did not hunt it and never sees the hunter's conclusion as authority. Its job:
   try to refute - is it reachable, validated upstream, behind auth, already mitigated? For
   anything high/critical use the strongest available model. Verdict: confirmed (with a trace or a
   failing test), rejected (why), or needs-owner-check (the exact check to perform).
7. **Severity.** Rate by concrete damage: who can do what to whom, with what precondition.
   "Unauthenticated read of other tenants' data" is high; "missing header" without a path is low.
8. **Report outside git.** Write `REPORT.md` and any proof files to a private directory
   (e.g. `~/security-audit/<project>/run-NNN/`), not the repo. Contents: confirmed findings by
   severity (one line each + smallest fix), needs-owner-check list, what was NOT covered, next step.
   Offer a private artifact only if the owner asks.
9. **Stop and ask.** Present the summary to the owner. Fix only the findings the owner picks:
   smallest change at the last trusted decision point, turn the proof into a regression test, run
   the full test gate, then the normal commit / deploy flow. Where a bug class can recur, prefer a
   new deterministic invariant test over another one-off proof.

## Done when
- Threat model and coverage ledger exist; no unit is silently unaudited.
- Every reported finding survived a fresh verifier and has a concrete damage statement.
- Nothing from the run is in git; the repo was untouched during the audit.
- The owner has the summary and decides which findings get fixed.
