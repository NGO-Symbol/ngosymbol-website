#!/usr/bin/env python3
"""SessionStart: print a compact git snapshot into the context. Never breaks the session."""
import json
import os
import subprocess
import sys


def git(cwd, *args):
    r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=5)
    return r.stdout.strip() if r.returncode == 0 else None


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        data = {}
    cwd = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    if git(cwd, "rev-parse", "--is-inside-work-tree") != "true":
        return
    lines = []
    branch = git(cwd, "branch", "--show-current") or "(detached HEAD)"
    head = f"Git: branch {branch}"
    counts = git(cwd, "rev-list", "--left-right", "--count", "@{upstream}...HEAD")
    if counts:
        behind, ahead = counts.split()
        head += f" | ahead {ahead}, behind {behind} upstream"
    lines.append(head)
    status = git(cwd, "status", "--porcelain") or ""
    # "XY path" — split, so a stripped leading space on the first line cannot eat a character
    paths = [l.split(maxsplit=1)[1] for l in status.splitlines() if len(l.split(maxsplit=1)) == 2]
    if paths:
        shown = ", ".join(paths[:8])
        more = f" (+{len(paths) - 8} more)" if len(paths) > 8 else ""
        lines.append(f"Uncommitted: {len(paths)} - {shown}{more}")
    else:
        lines.append("Uncommitted: none")
    last = git(cwd, "log", "-1", "--format=%h %s")
    if last:
        lines.append(f"Last commit: {last}")
    wt = git(cwd, "worktree", "list")
    if wt:
        n = len(wt.splitlines())
        if n > 1:
            lines.append(f"Worktrees: {n} (shared repo - do not stash or drop others' work)")
    print("\n".join(lines))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
