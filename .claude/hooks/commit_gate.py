#!/usr/bin/env python3
"""PreToolUse(Bash) on `git commit` / `git push`: secret scan of staged changes, then the project's
test command. Config: {"commit_gate": {"test_cmd": "make test", "timeout": 300}}"""
import json
import os
import re
import shutil
import subprocess
import sys

TRIGGER = re.compile(r"(?:^|[;&|\n]\s*)git\s+(?:-\S+\s+(?:\S+\s+)?)*?(commit|push)\b")
SECRET_RES = [
    ("AWS access key", re.compile(r"\b(AKIA|ASIA)[0-9A-Z]{16}\b")),
    ("private key block", re.compile(r"-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----")),
    ("GitHub token", re.compile(r"\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b")),
    ("Slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9-]{10,}\b")),
    ("OpenAI-style key", re.compile(r"\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}\b")),
    ("hardcoded api key", re.compile(
        r"""(?i)\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token)\b\s*[:=]\s*["'][A-Za-z0-9_\-+/=.]{20,}["']""")),
]


def deny(reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
                                             "permissionDecisionReason": reason}}, ensure_ascii=False))
    sys.exit(0)


def load_cfg(project):
    try:
        with open(os.path.join(project, ".claude", "skillpack.config.json")) as f:
            c = json.load(f).get("commit_gate", {})
            return c if isinstance(c, dict) else {}
    except Exception:
        return {}


def tail(text, n=40):
    return "\n".join(text.strip().splitlines()[-n:])


def regex_scan(project):
    r = subprocess.run(["git", "diff", "--cached", "--no-color", "-U0"], cwd=project, capture_output=True,
                       text=True, timeout=30, errors="replace")
    cur = "?"
    for line in r.stdout.splitlines():
        if line.startswith("+++ b/"):
            cur = line[6:]
        elif line.startswith("+") and not line.startswith("+++"):
            for label, rx in SECRET_RES:
                if rx.search(line):
                    return cur, label
    return None


def secret_gate(project):
    gl = shutil.which("gitleaks")
    if gl:
        try:
            r = subprocess.run([gl, "protect", "--staged", "--no-banner"], cwd=project, capture_output=True,
                               text=True, timeout=60)
            if r.returncode == 1:
                deny("Коміт зупинено: gitleaks знайшов секрети в staged-змінах. Приберіть їх (значення не показую):\n"
                     + tail(re.sub(r"(?im)^\s*(secret|match):.*$", "", r.stdout + r.stderr)))
            if r.returncode == 0:
                return
        except Exception:
            pass
    hit = regex_scan(project)
    if hit:
        deny(f"Коміт зупинено: у staged-файлі {hit[0]} знайдено ймовірний секрет ({hit[1]}). Приберіть його і додайте файл знову.")


def main():
    data = json.load(sys.stdin)
    cmd = (data.get("tool_input") or {}).get("command") or ""
    if not TRIGGER.search(cmd):
        return
    project = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    if subprocess.run(["git", "rev-parse", "--is-inside-work-tree"], cwd=project, capture_output=True).returncode != 0:
        return
    secret_gate(project)
    cfg = load_cfg(project)
    test_cmd = cfg.get("test_cmd")
    if test_cmd:
        timeout = int(cfg.get("timeout", 300))
        try:
            r = subprocess.run(test_cmd, shell=True, cwd=project, capture_output=True, text=True, timeout=timeout)
        except subprocess.TimeoutExpired:
            deny(f"Тести ('{test_cmd}') не вклалися в {timeout} с; коміт/push зупинено.")
        if r.returncode != 0:
            deny(f"Тести ('{test_cmd}') впали (код {r.returncode}); коміт/push зупинено. Кінець виводу:\n"
                 + tail(r.stdout + "\n" + r.stderr))


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        pass
    sys.exit(0)
