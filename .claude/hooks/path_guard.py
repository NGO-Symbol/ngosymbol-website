#!/usr/bin/env python3
"""Path guard. PreToolUse: deny/ask writes to sensitive paths. PostToolUse: scan the written
file for secrets. One script, switched on hook_event_name. Never breaks the session.
Config (.claude/skillpack.config.json): {"path_guard": {"deny": [], "ask": [], "allow": []}}"""
import fnmatch
import json
import os
import re
import shutil
import subprocess
import sys

DENY = [".env", ".env.*", "*.pem", "*.key", "id_rsa*", "service_account*.json", "sa-key.json", "*.p12"]
ASK = ["**/migrations/**", "**/alembic/versions/**"]
ALLOW = [".env.example", ".env.sample"]

SECRET_RES = [
    ("AWS access key", re.compile(r"\b(AKIA|ASIA)[0-9A-Z]{16}\b")),
    ("private key block", re.compile(r"-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----")),
    ("GitHub token", re.compile(r"\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b")),
    ("Slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9-]{10,}\b")),
    ("OpenAI-style key", re.compile(r"\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}\b")),
    ("hardcoded api key", re.compile(
        r"""(?i)\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token)\b\s*[:=]\s*["'][A-Za-z0-9_\-+/=.]{20,}["']""")),
]


def load_cfg(project):
    try:
        with open(os.path.join(project, ".claude", "skillpack.config.json")) as f:
            c = json.load(f).get("path_guard", {})
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


def matches(rel, pats):
    base = os.path.basename(rel)
    for p in pats:
        if "/" in p:
            if glob_re(p.lstrip("/")).match(rel):
                return p
        elif fnmatch.fnmatch(base, p):
            return p
    return None


def rel_path(path, project):
    path = os.path.abspath(os.path.join(project, path))
    try:
        r = os.path.relpath(path, project)
        if not r.startswith(".."):
            return r.replace(os.sep, "/")
    except ValueError:
        pass
    return path.lstrip("/")


def target(ti):
    return ti.get("file_path") or ti.get("notebook_path") or ""


def pre(data, project, cfg):
    p = target(data.get("tool_input") or {})
    if not p:
        return None
    rel = rel_path(p, project)
    if matches(rel, ALLOW + list(cfg.get("allow", []))):
        return None
    hit = matches(rel, DENY + list(cfg.get("deny", [])))
    if hit:
        return {"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
                "permissionDecisionReason": f"Запис у {rel} заблоковано: це секретний файл (збіг із '{hit}'). "
                "Не кладіть секрети в код; використайте змінні середовища або .env.example."}}
    hit = matches(rel, ASK + list(cfg.get("ask", [])))
    if hit:
        return {"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "ask",
                "permissionDecisionReason": f"{rel} — чутливий шлях (збіг із '{hit}'), наприклад міграції. Підтвердьте зміну."}}
    return None


def regex_scan(path):
    if os.path.getsize(path) > 1_000_000:
        return None
    with open(path, "rb") as f:
        raw = f.read()
    if b"\0" in raw[:4096]:
        return None
    for n, line in enumerate(raw.decode("utf-8", "replace").splitlines(), 1):
        for label, rx in SECRET_RES:
            if rx.search(line):
                return n, label
    return None


def post(data, project, cfg):
    p = target(data.get("tool_input") or {})
    if not p:
        return None
    path = os.path.join(project, p) if not os.path.isabs(p) else p
    if not os.path.isfile(path):
        return None
    rel = rel_path(path, project)
    hit = None
    gl = shutil.which("gitleaks")
    if gl:
        try:
            r = subprocess.run([gl, "detect", "--no-git", "--source", path, "--no-banner", "--exit-code", "1"],
                               capture_output=True, text=True, timeout=3)
            if r.returncode == 1:
                hit = (None, "gitleaks")
        except Exception:
            hit = regex_scan(path)
    else:
        hit = regex_scan(path)
    if not hit:
        return None
    where = f", рядок {hit[0]}" if hit[0] else ""
    return {"decision": "block",
            "reason": f"У файлі {rel}{where} знайдено ймовірний секрет ({hit[1]}). Приберіть його з коду: "
                      "винесіть у змінну середовища, а якщо він уже міг витекти — перевипустіть ключ."}


def main():
    data = json.load(sys.stdin)
    project = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    cfg = load_cfg(project)
    ev = data.get("hook_event_name")
    out = pre(data, project, cfg) if ev == "PreToolUse" else post(data, project, cfg) if ev == "PostToolUse" else None
    if out:
        print(json.dumps(out, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
