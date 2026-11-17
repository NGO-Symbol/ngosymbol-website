#!/usr/bin/env python3
"""PreToolUse(Bash): block or confirm destructive shell commands.
Config: {"dangerous_bash": {"live_patterns": [{"pattern": "regex", "reason": "...", "unless_env": "TEST_MODE=true"}]}}"""

import json
import os
import re
import shlex
import subprocess
import sys

BAD_TARGETS = {
    "/",
    "/*",
    "~",
    "~/",
    "~/*",
    "$HOME",
    "$HOME/",
    "$HOME/*",
    "${HOME}",
    "${HOME}/",
    "${HOME}/*",
    ".",
    "..",
    "*",
}


def load_cfg(project):
    try:
        with open(os.path.join(project, ".claude", "skillpack.config.json")) as f:
            c = json.load(f).get("dangerous_bash", {})
            return c if isinstance(c, dict) else {}
    except Exception:
        return {}


def emit(decision, reason):
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": decision,
                    "permissionDecisionReason": reason,
                }
            },
            ensure_ascii=False,
        )
    )
    sys.exit(0)


def segments(cmd):
    out = []
    for seg in re.split(r"&&|\|\||[;&|\n]", cmd):
        try:
            toks = shlex.split(seg)
        except ValueError:
            toks = seg.split()
        while toks and (
            toks[0] in ("sudo", "command", "env") or re.match(r"\w+=", toks[0])
        ):
            toks = toks[1:]
        if toks:
            out.append(toks)
    return out


def git(project, *args):
    r = subprocess.run(
        ["git", *args], cwd=project, capture_output=True, text=True, timeout=3
    )
    return r.stdout.strip() if r.returncode == 0 else ""


def check_rm(toks, project):
    flags = [t for t in toks[1:] if t.startswith("-")]
    joined = "".join(f.lstrip("-") for f in flags if not f.startswith("--"))
    rec = "r" in joined.lower() or "--recursive" in flags
    force = "f" in joined or "--force" in flags
    if not (rec and force):
        return
    root = os.path.realpath(project)
    home = os.path.realpath(os.path.expanduser("~"))
    for t in toks[1:]:
        if t.startswith("-"):
            continue
        if t in BAD_TARGETS or os.path.realpath(
            os.path.join(root, os.path.expanduser(t))
        ) in (root, "/", home):
            emit(
                "deny",
                f"Рекурсивне видалення '{t}' заблоковано: це корінь системи, домашня тека або корінь репозиторію. "
                "Видаляйте конкретні підтеки.",
            )


def check_git(toks, project):
    if len(toks) < 2 or toks[0] != "git":
        return
    sub = [t for t in toks[1:] if not t.startswith("-")]
    sub0 = sub[0] if sub else ""
    args = toks[2:]
    if sub0 == "push":
        force = any(
            a == "--force"
            or (re.match(r"-[a-z]*f[a-z]*$", a) and not a.startswith("--"))
            for a in args
        )
        force = force or any(a.startswith("+") for a in args if not a.startswith("-"))
        if force and any(
            a.lstrip("+").split(":")[-1] in ("main", "master")
            for a in args
            if not a.startswith("-")
        ):
            emit(
                "deny",
                "git push --force у main/master заблоковано: це перезапише спільну історію. "
                "Зробіть окрему гілку або revert-коміт.",
            )
    elif sub0 == "reset" and "--hard" in args:
        if git(project, "branch", "--show-current") in ("main", "master") and git(
            project, "status", "--porcelain"
        ):
            emit(
                "ask",
                "git reset --hard на main при незакомічених змінах знищить роботу. Підтвердьте.",
            )
    elif sub0 == "stash":
        rest = [t for t in toks[2:] if t != "--"]
        first = next((t for t in rest if not t.startswith("-")), "")
        if first == "pop" or not first:
            emit(
                "deny",
                "git stash / stash pop заблоковано: у спільному дереві стеш спільний з іншими сесіями. "
                "Зробіть тимчасовий WIP-коміт або `git stash push -u -m <унікальний-тег>` і `git stash apply <sha>`.",
            )


def main():
    data = json.load(sys.stdin)
    cmd = (data.get("tool_input") or {}).get("command") or ""
    if not cmd:
        return
    project = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    for lp in load_cfg(project).get("live_patterns", []) or []:
        try:
            if re.search(lp["pattern"], cmd, re.I) and not (
                lp.get("unless_env") and lp["unless_env"] in cmd
            ):
                emit(
                    "deny",
                    lp.get("reason")
                    or f"Команда збігається з живою дією '{lp['pattern']}' і заблокована.",
                )
        except (KeyError, TypeError, re.error):
            continue
    for toks in segments(cmd):
        if toks[0] == "rm":
            check_rm(toks, project)
        else:
            check_git(toks, project)
    if re.search(r"\b(curl|wget)\b[^|;&]*\|\s*(sudo\s+)?(ba|z|da)?sh\b", cmd):
        emit(
            "ask",
            "Конвеєр curl | sh виконує код із мережі без перегляду. Підтвердьте або спершу завантажте і прочитайте скрипт.",
        )
    if re.search(r"\bpsql\b", cmd) and re.search(
        r"\b(drop\s+database|truncate\b)", cmd, re.I
    ):
        emit(
            "ask",
            "psql: DROP DATABASE / TRUNCATE незворотно видаляє дані. Підтвердьте базу і середовище.",
        )


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        pass
    sys.exit(0)
