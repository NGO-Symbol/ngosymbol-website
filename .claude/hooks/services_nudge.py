#!/usr/bin/env python3
"""SessionStart nudge: suggest /services-check when the last full review is stale.

Reads `.claude/services.md` under $CLAUDE_PROJECT_DIR (or cwd) and looks for a line
`Last full review: YYYY-MM-DD`. If the line is absent or the date is older than 30 days, print ONE
line to stdout (SessionStart stdout becomes context). Otherwise print nothing. Never fails.
"""
from __future__ import annotations

import os
import re
import sys
from datetime import date, datetime

MAX_AGE_DAYS = 30
LINE = re.compile(r"^\s*Last full review:\s*(\d{4}-\d{2}-\d{2})\s*$", re.MULTILINE)
MESSAGE = "Services registry: last full review is {when}; consider running /services-check."


def check(text: str, today: date) -> str | None:
    """Return the nudge line, or None when the review is fresh."""
    match = LINE.search(text)
    if not match:
        return MESSAGE.format(when="not recorded")
    try:
        reviewed = datetime.strptime(match.group(1), "%Y-%m-%d").date()
    except ValueError:
        return MESSAGE.format(when="not recorded")
    age = (today - reviewed).days
    if age > MAX_AGE_DAYS:
        return MESSAGE.format(when=f"{age} days ago")
    return None


def main() -> int:
    try:
        root = os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
        path = os.path.join(root, ".claude", "services.md")
        if not os.path.isfile(path):
            return 0
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
        message = check(text, date.today())
        if message:
            print(message)
    except Exception:
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
