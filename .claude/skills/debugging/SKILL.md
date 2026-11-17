---
name: debugging
description: Use when something is broken - a failing test, an error, a regression, flaky or surprising behaviour. Drives a reproduce-first, one-hypothesis-at-a-time process that ends in a root-cause fix and a regression test. Not for new features.
metadata: {pack: skill-pack, id: debugging, version: 1.0.0}
---

# Debugging

No fix before a reproduction. No guess without evidence.

## 1. Build a tight pass/fail loop
Get a command that fails reliably and quickly, with a clear pass condition. Choose the cheapest that works:
- an existing failing test, narrowed to one case;
- a new minimal test or script that triggers it;
- a `curl` or CLI call against a local instance;
- a log grep for the error signature in a captured run;
- `git bisect run <script>` when it used to work;
- a replay of captured input (request, file, message);
- a fixed seed or frozen clock when it is flaky; run it N times and count failures.
Make it deterministic, then make it fast. Record the exact command. If you cannot reproduce, say so and gather more data; do not patch blindly.

## 2. Hypothesise one at a time
- Write one specific, falsifiable guess: "X is null because Y runs before Z".
- Pick the smallest observation that confirms or kills it (print, debugger, assertion, log line).
- Run it, read the actual output, record the verdict. Discard refuted guesses; do not stack changes.
- Change one variable per run. Revert probes you added.

## 3. Read the evidence
Read the full error and stack, not the first line. Compare a working case with the failing one: what differs (input, config, version, order, environment)? Check recent changes (`git log -p` on the area).

## 4. Fix the root cause
- Fix where the bad state originates, not where it surfaces.
- Do not paper over: no blanket try/except, no retry to hide a race, no skipped test.
- Ask: where else does the same flaw occur? Fix the class, within scope.

## 5. Lock it in
- Keep the reproduction as a regression test; confirm it fails before the fix and passes after.
- Run the narrow test, then the wider suite once.

## 6. Hygiene
- Redact secrets (tokens, keys, passwords, personal data) from logs, pastes and test fixtures before saving or quoting them.
- Remove temporary debug output.
- If three hypotheses fail, stop and re-question your assumptions or ask the owner.

## Report
Cause (one sentence), evidence, fix, regression test name, what was run.

## Done when
- [ ] a deterministic reproduction existed and its command is recorded;
- [ ] the cause is stated with evidence, not a guess;
- [ ] the repro now passes as a regression test;
- [ ] no secrets or debug leftovers remain.
