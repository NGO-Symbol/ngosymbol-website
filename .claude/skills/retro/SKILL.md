---
name: retro
description: Session retrospective. Use when the owner runs /retro or asks to review where the agent struggled, to turn each struggle into one durable fix (hook, test, pointer, skill edit, memory). Not for summarising work done.
disable-model-invocation: true
metadata: {pack: skill-pack, id: retro, version: 1.0.0}
---

# Retro

Turn this session's friction into the smallest durable fixes. Propose first; change nothing until the owner picks.

## 1. Collect evidence
- Default: the current session. If the owner names a past one, read `~/.claude/projects/<slug>/*.jsonl` (slug = project path with `/` replaced by `-`); take the newest file unless told otherwise.
- Find struggle moments and note a quote or a count for each:
  - long or repeated searches for something that should have been findable;
  - the same big file read in full several times; the same expensive command re-run;
  - a wrong assumption later corrected; a mistake made twice;
  - missing information the agent had to ask for or guess;
  - owner corrections («no, not like that», «ні, не так», reverts, repeated instructions).
- Cap at the ~10 strongest. Ignore one-off noise with no lesson.

## 2. Diagnose
For each moment ask: **what in the environment allowed this?** (no check, no pointer, vague skill step, missing fact). Do not blame the prompt.

## 3. Route each to exactly ONE home
Prefer the most deterministic option that fits, in this order:
1. hook / lint / CI check (blocks or warns automatically);
2. eval case or regression test (append a case; never edit one to make a change pass);
3. a pointer in a file the agent already reads (AGENTS.md line: "X lives in <path>");
4. edit to an existing skill — name the skill and the exact change (step to add, wrong step to fix, description wording that failed to trigger it);
5. memory entry (owner preference or external fact the repo cannot hold);
6. always-on rule — last resort, only if 1-5 cannot work.

Never propose the same lesson in two homes.

## 4. Improve existing skills
If a skill was used and the agent still erred, or a skill should have triggered and did not:
- read that skill's SKILL.md;
- propose a minimal diff: one added step, one clarified check, a sharper `description`, or a shorter body;
- if unsure the change helps, say so and suggest an A/B run: one fresh session with the old skill, one with the new, same task.

## 5. Prune
List existing rules or skill lines that changed nothing this session (never consulted, duplicated elsewhere, or contradicted by behaviour). Propose deleting them.

## 6. Present
A ranked numbered list, worst first. Per item:
- `N. [severity high/med/low] title`
- Evidence: quote or count
- Change: the concrete edit
- Target: exact file path

Then a short "Delete" list. Ask: "Which numbers should I apply?" and **stop**.

## 7. Apply
Only the numbers the owner chose. Smallest diff per item. After each, state the file and what changed in one line. Do not commit unless asked.

## Done when
- [ ] every listed item has evidence, one target file and one concrete change;
- [ ] nothing was edited before the owner picked numbers;
- [ ] applied changes match the picks exactly, nothing extra;
- [ ] existing skills were considered, not only new rules.
