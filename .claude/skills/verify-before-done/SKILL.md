---
name: verify-before-done
description: Use before claiming that work is done, green, working or fixed. Requires fresh evidence from the same turn - real test output, a screenshot, or a read of the target system. Also covers external-system actions and UI checks.
metadata: {pack: skill-pack, id: verify-before-done, version: 1.0.0}
---

# Verify before done

A claim of "done / passing / works / fixed" needs evidence produced in this same turn, after the last change.

## Core rule
1. Name the claim ("the endpoint returns 404 for unknown ids").
2. Pick the check that would fail if the claim were false.
3. Run it now, after the final edit. Evidence from before the edit does not count.
4. Quote it: the tail of the real test output (pass/fail counts), a screenshot, or the value read from the target system.
5. If the check cannot be run, say "not verified" and why. Never imply success.

## Subagents and tools
- A subagent's "all green" is a report, not evidence. Re-run the gate yourself (tests, lint, build) and read the output tail.
- A tool returning without error is not proof of effect.
- A fast unit suite does not prove database or integration code; run the integration check the project defines.

## Facet: state-not-exit
After acting on an external system (mail, broker or API, deploy, database):
- Read the system's real state - list the sent mail, query the row, fetch the deployed version, call the status endpoint.
- Do not trust the script's exit code or an error text alone: a non-zero exit can hide success and exit 0 can hide failure. Diagnose with a read-only query before retrying; retries can duplicate side effects.
- Before a test that depends on a failure state (expired token, offline service, empty queue), re-probe that the state still exists. A broken credential is not a safe stand-in for a test mode.
- Never trigger a real irreversible action (publish, send, charge) to "see if it works".

## Facet: ui-verify
UI work is done only after you looked at it in a real browser.
- Take a screenshot at the target size and read it; measure what matters (sizes, spacing, computed styles).
- Animations: sample with a `requestAnimationFrame` loop and record values per frame; do not judge by eye or by code.
- Browser-automation traps to rule out:
  - the viewport is pinned or emulated, so layout differs from a real window;
  - background tabs are frozen: animations and timers do not advance, frames look stuck;
  - synthetic clicks skip hover, focus and pointer events that real clicks fire;
  - `backdrop-filter` and similar effects can silently render flat in automation; confirm in a live window.
- Check light and dark themes and a narrow phone width if the UI supports them.

## Final message
State what was checked, the evidence (short quote), and anything left unverified.

## Done when
- [ ] each claim has evidence produced after the last edit;
- [ ] output tails or screenshots were actually read;
- [ ] external-system results came from reading state, not exit codes;
- [ ] subagent results were re-verified by you;
- [ ] unverified parts are stated plainly.
