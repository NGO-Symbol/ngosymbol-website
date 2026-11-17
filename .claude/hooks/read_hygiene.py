#!/usr/bin/env python3
"""PostToolUse(Read): nudge when the same big file is read in full again and again.
Config: {"read_hygiene": {"min_lines": 500, "max_full_reads": 2}}"""
import json
import os
import re
import sys
import tempfile


def load_cfg(project):
    try:
        with open(os.path.join(project, ".claude", "skillpack.config.json")) as f:
            c = json.load(f).get("read_hygiene", {})
            return c if isinstance(c, dict) else {}
    except Exception:
        return {}


def count_lines(path):
    n = 0
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            n += chunk.count(b"\n")
    return n


def main():
    data = json.load(sys.stdin)
    ti = data.get("tool_input") or {}
    path = ti.get("file_path")
    if not path or ti.get("offset") is not None or ti.get("limit") is not None:
        return
    project = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    cfg = load_cfg(project)
    min_lines = int(cfg.get("min_lines", 500))
    max_reads = int(cfg.get("max_full_reads", 2))
    path = os.path.abspath(os.path.join(project, path))
    if not os.path.isfile(path):
        return
    sid = re.sub(r"[^A-Za-z0-9_-]", "_", str(data.get("session_id") or "nosession"))
    sdir = os.path.join(os.environ.get("TMPDIR") or tempfile.gettempdir(), "skillpack")
    os.makedirs(sdir, exist_ok=True)
    sfile = os.path.join(sdir, f"read_hygiene-{sid}.json")
    try:
        with open(sfile) as f:
            state = json.load(f)
    except Exception:
        state = {}
    state[path] = state.get(path, 0) + 1
    with open(sfile, "w") as f:
        json.dump(state, f)
    if state[path] <= max_reads:
        return
    lines = count_lines(path)
    if lines <= min_lines:
        return
    msg = (f"Файл {os.path.basename(path)} ({lines} рядків) уже прочитано повністю {state[path]} рази. "
           "Краще Read з offset/limit або grep по потрібному місцю. / "
           f"This {lines}-line file was fully read {state[path]} times; use offset/limit or grep instead.")
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": msg}},
                     ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
