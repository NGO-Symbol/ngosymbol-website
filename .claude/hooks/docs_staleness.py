#!/usr/bin/env python3
"""Stop: if code changed but no docs did, show a one-line reminder to the user (systemMessage,
never blocks). Config: {"docs_staleness": {"code": [globs], "docs": [globs]}}"""
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile

CODE = ["**/*.py", "**/*.ts", "**/*.vue", "src/**", "app/**"]
DOCS = ["docs/**", "**/*.md"]


def load_cfg(project):
    try:
        with open(os.path.join(project, ".claude", "skillpack.config.json")) as f:
            c = json.load(f).get("docs_staleness", {})
            return c if isinstance(c, dict) else {}
    except Exception:
        return {}


def glob_re(pat):
    out, i = "", 0
    while i < len(pat):
        if pat.startswith("**/", i):
            out += "(?:.*/)?"; i += 3
        elif pat.startswith("**", i):
            out += ".*"; i += 2
        elif pat[i] == "*":
            out += "[^/]*"; i += 1
        elif pat[i] == "?":
            out += "[^/]"; i += 1
        else:
            out += re.escape(pat[i]); i += 1
    return re.compile(out + r"\Z")


def any_match(path, pats):
    return any(glob_re(p).match(path) for p in pats)


def git(project, *args):
    r = subprocess.run(["git", *args], cwd=project, capture_output=True, text=True, timeout=5)
    return r.stdout.splitlines() if r.returncode == 0 else []


def main():
    data = json.load(sys.stdin)
    project = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    cfg = load_cfg(project)
    code_g, docs_g = cfg.get("code") or CODE, cfg.get("docs") or DOCS
    changed = set(git(project, "diff", "--name-only", "HEAD")) | set(git(project, "ls-files", "--others", "--exclude-standard"))
    changed.discard("")
    docs = [p for p in changed if any_match(p, docs_g)]
    code = sorted(p for p in changed if any_match(p, code_g) and not any_match(p, docs_g))
    if not code or docs:
        return
    sid = re.sub(r"[^A-Za-z0-9_-]", "_", str(data.get("session_id") or "nosession"))
    sdir = os.path.join(os.environ.get("TMPDIR") or tempfile.gettempdir(), "skillpack")
    os.makedirs(sdir, exist_ok=True)
    sfile = os.path.join(sdir, f"docs_staleness-{sid}")
    digest = hashlib.sha1("\n".join(code).encode()).hexdigest()
    try:
        if open(sfile).read() == digest:
            return
    except OSError:
        pass
    with open(sfile, "w") as f:
        f.write(digest)
    print(json.dumps({"systemMessage": f"Змінено код ({len(code)} файл.), а документацію — ні. Чи треба оновити docs / README?"},
                     ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
