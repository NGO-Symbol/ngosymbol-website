---
name: review-2axis
description: Two-axis code review of a diff. Use when the owner runs /review-2axis or asks for a review before merge. Runs fresh-context Standards and Spec reviewers in parallel, merges and verifies findings.
disable-model-invocation: true
metadata: {pack: skill-pack, id: review-2axis, version: 1.0.0}
---

# Review on two axes

## 1. Fix the base
- Determine the base: the argument if given, else the merge-base with the default branch (`git merge-base HEAD origin/main`, falling back to `main`).
- Capture once: `git diff <base>...HEAD` and `git diff --stat`. Include uncommitted changes if the owner wants them reviewed.
- Find the task statement: issue text, PR description, or the owner's request. If none exists, ask for it; the Spec axis cannot run without it.
- Collect the rules files that exist: AGENTS.md, CLAUDE.md, CONTRIBUTING.md, lint config.

## 2. Launch two reviewers in parallel
Two subagents in ONE message, fresh context, each on a cheaper model set explicitly (e.g. `model: sonnet`). Give each the base ref, the diff command and nothing about your own opinion of the code. Both are read-only.
- **Standards**: check the diff against the rules files and the surrounding code's conventions - naming, layering, typing, error handling, tests present, docs touched, secrets, dead code. Cite rule and file:line.
- **Spec**: check the diff against the task statement only - does it do exactly what was asked? List what is missing, what is extra (scope creep), and behaviours the task implies but the diff gets wrong.
Each returns findings as: severity (high/med/low), file:line, what, why, suggested fix.

## 3. Aggregate
- Merge both lists, dedupe same-location findings, keep the higher severity.
- Rank: high to low; correctness and spec gaps before style.

## 4. Verify before acting
Do not agree blindly. For every finding, check it yourself: open the code, run the test or reproduce it. Mark each as confirmed, rejected (with reason) or unclear. A reviewer can be wrong, including your own subagents.

## 5. Present, then apply
Show the ranked list with status. Apply only confirmed findings the owner wants, smallest diff each, one at a time, re-running the relevant test after each. If a comment is unclear, ask rather than guess.

## Done when
- [ ] both axes ran on the same fixed base;
- [ ] findings are deduped, ranked and each marked confirmed or rejected;
- [ ] nothing was applied that was not verified;
- [ ] tests re-run after applied fixes, output tail quoted.
