#!/usr/bin/env python3
"""Lint, map and audit a layered agent knowledge base (skill: agent-docs-architecture).

Copy this file to <project>/scripts/docs_tool.py. Python 3.9+, stdlib only.

  python3 scripts/docs_tool.py check        lint docs/ against the contract; exit 1 on errors
  python3 scripts/docs_tool.py map          regenerate docs/_MAP.md from frontmatter + summary lines
  python3 scripts/docs_tool.py lag          notes whose files changed (git) after their `updated:`
  python3 scripts/docs_tool.py baseline     record notes over the hard limit in docs/.size-baseline.json
  python3 scripts/docs_tool.py audit [PATH] read-only measurement of any project (before a restructure)

Root: --root PATH, else the folder above scripts/ when it has docs/, else the current directory.

Optional docs/.docs.json (all keys optional):
  {"name": "Project", "files_field": "code", "concepts_dir": "concepts",
   "note_warn": 200, "note_max": 400, "router_max": 80, "agents_max": 150,
   "map_cmd": "node tools/docs-map.mjs"}
  map_cmd — the project already has its own _MAP generator (e.g. CI-gated): `map` runs it instead,
  and `check` leaves _MAP freshness to that generator's own gate.
[[links]] resolve by filename stem or by a note's frontmatter `id:` (ids may carry prefixes).
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Dict, List, Optional

STATUS_MARK = {"current": "✅", "partial": "🟡", "planned": "⭕", "deprecated": "⚠️"}
LINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
DATED_HEADING = re.compile(r"^#{2,4} .*\d{4}-\d{2}-\d{2}", re.M)
KEBAB = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SKIP_DIRS = {
    ".git",
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    ".obsidian",
    "dist",
    "build",
    ".next",
    ".nuxt",
    ".output",
    ".cache",
    ".idea",
    ".vscode",
}
L4_PARTS = {"history", "audits", "research", "handoff", "legacy", "archive"}
INSTRUCTION_FILES = [
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md",
    ".cursorrules",
    ".github/copilot-instructions.md",
    "docs/CODEX_CONTEXT.md",
]


# ---------- config ----------


def find_root(argv: List[str]) -> Path:
    if "--root" in argv:
        return Path(argv[argv.index("--root") + 1]).resolve()
    here = Path(__file__).resolve().parent.parent
    return here if (here / "docs").is_dir() else Path.cwd().resolve()


@dataclass
class Cfg:
    root: Path
    name: str = ""
    files_field: str = "code"
    concepts_dir: str = "concepts"
    note_warn: int = 200
    note_max: int = 400
    router_max: int = 80
    agents_max: int = 150
    map_cmd: str = ""

    @property
    def docs(self) -> Path:
        return self.root / "docs"

    @property
    def concepts(self) -> Path:
        return self.docs / self.concepts_dir

    @property
    def facts(self) -> Path:
        return self.docs / "facts"


def load_cfg(root: Path) -> Cfg:
    cfg = Cfg(root=root, name=root.name)
    path = root / "docs" / ".docs.json"
    if path.exists():
        for k, v in json.loads(path.read_text(encoding="utf-8")).items():
            if hasattr(cfg, k) and k != "root":
                setattr(cfg, k, v)
    return cfg


# ---------- notes ----------


@dataclass
class Note:
    path: Path
    front: Dict[str, str]
    body: str
    lines: int
    links: List[str] = field(default_factory=list)

    @property
    def id(self) -> str:
        return self.path.stem

    @property
    def status(self) -> str:
        s = self.front.get("status") or ""
        return s.split()[0] if s else ""

    def summary(self, limit: int = 160) -> str:
        m = re.search(r"^>\s*(.+?)(?:\n(?!>)|\Z)", self.body, re.M | re.S)
        text = (
            " ".join(m.group(1).replace("\n>", " ").split())
            if m
            else self.front.get("title", "")
        )
        if len(text) <= limit:
            return text
        cut = text[:limit]
        stop = max(cut.rfind(". "), cut.rfind(" — "), cut.rfind("; "))
        return (cut[:stop] if stop > limit * 0.5 else cut.rsplit(" ", 1)[0]).rstrip(
            " .;—"
        ) + " …"


def parse_front(text: str):
    m = re.match(r"^---\n(.*?)\n---\n?", text, re.S)
    if not m:
        return {}, text
    front: Dict[str, str] = {}
    key = None
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if km:
            key = km.group(1)
            front[key] = km.group(2).strip()
        elif key and re.match(r"^\s*-\s+", line):
            item = re.sub(r"^\s*-\s+", "", line).strip()
            front[key] = f"{front[key]}, {item}" if front[key] else item
        elif key:
            front[key] += " " + line.strip()
    return front, text[m.end() :]


def list_field(value: str) -> List[str]:
    value = (value or "").strip()
    if value.startswith("["):
        value = value.strip("[]")
    return [v.strip().strip("\"'") for v in value.split(",") if v.strip().strip("\"'")]


def load(path: Path) -> Note:
    text = path.read_text(encoding="utf-8")
    front, body = parse_front(text)
    # `[[x]]` inside inline code is an example of the syntax, not a link
    links = LINK_RE.findall(re.sub(r"`[^`\n]*`", "", text))
    return Note(path=path, front=front, body=body, lines=text.count("\n"), links=links)


def concept_paths(cfg: Cfg) -> List[Path]:
    if not cfg.concepts.is_dir():
        return []
    return sorted(p for p in cfg.concepts.rglob("*.md") if p.name != "CONTEXT.md")


def router_paths(cfg: Cfg) -> List[Path]:
    return [cfg.docs / "CONTEXT.md", *sorted(cfg.concepts.glob("*/CONTEXT.md"))]


def known_ids(cfg: Cfg) -> set:
    out = set()
    for p in cfg.docs.rglob("*.md"):
        out.add(p.stem)
        try:
            m = re.search(r"\A---\n(?:.*\n)*?id:\s*(\S+)", p.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError):
            m = None
        if m:
            out.add(m.group(1).strip("'\""))
    return out


def category_of(cfg: Cfg, p: Path) -> str:
    return p.relative_to(cfg.concepts).parts[0]


def hub_of(cfg: Cfg, p: Path) -> Optional[str]:
    parts = p.relative_to(cfg.concepts).parts
    return parts[1] if len(parts) == 3 else None


def rel(cfg: Cfg, p: Path) -> str:
    return str(p.relative_to(cfg.root))


# ---------- map ----------


def render_map(cfg: Cfg) -> str:
    out = [
        f"# {cfg.name} — Knowledge Map\n",
        "<!-- GENERATED by scripts/docs_tool.py map from each note's frontmatter + summary line. "
        "Do not edit by hand. Agents start at CONTEXT.md, not here. -->\n",
        "The full catalogue of notes, one line each. **Agents:** start at [`CONTEXT.md`](CONTEXT.md). "
        "Status: ✅ current · 🟡 partial · ⭕ planned · ⚠️ deprecated. Indented lines are the sub-notes "
        "of a split concept's hub.",
    ]
    by_cat: Dict[str, List[Note]] = defaultdict(list)
    hub: Dict[Path, Optional[str]] = {}
    for p in concept_paths(cfg):
        by_cat[category_of(cfg, p)].append(load(p))
        hub[p] = hub_of(cfg, p)

    def line(n: Note, indent: str = "") -> str:
        return f"{indent}- [[{n.id}]] {STATUS_MARK.get(n.status, '?')} — {n.summary()}"

    for cat in sorted(by_cat):
        notes = by_cat[cat]
        title = cat.split("-", 1)[1].replace("-", " ").title() if "-" in cat else cat
        out.append(f"\n## {cat[:2]} — {title} · `{cfg.concepts_dir}/{cat}/`\n")
        hubs = {hub[n.path] for n in notes if hub[n.path]}
        for n in sorted(
            (n for n in notes if not hub[n.path] or n.id == hub[n.path]),
            key=lambda n: n.id,
        ):
            out.append(line(n))
            if n.id in hubs:
                for s in sorted(
                    (s for s in notes if hub[s.path] == n.id and s.id != n.id),
                    key=lambda s: s.id,
                ):
                    out.append(line(s, "  "))
    facts = sorted(cfg.facts.glob("*.md")) if cfg.facts.is_dir() else []
    if facts:
        out.append("\n## Facts · `facts/`\n")
        out.extend(f"- [[{p.stem}]] — {load(p).front.get('title', '')}" for p in facts)
    out.append("\n## Outside the catalogue\n")
    out.append(
        "- `CONTEXT.md`, `"
        + cfg.concepts_dir
        + "/<NN>/CONTEXT.md` — the routers agents read first."
    )
    out.append("- `references/sources-index.md` — the ids notes cite in `source_ids`.")
    out.append(
        "- `history/` — chronology moved out of notes; `audits/`, `research/`, `handoff/` — working artifacts.\n"
    )
    return "\n".join(out)


def cmd_map(cfg: Cfg) -> int:
    if cfg.map_cmd:
        return subprocess.call(cfg.map_cmd, shell=True, cwd=cfg.root)
    text = render_map(cfg)
    (cfg.docs / "_MAP.md").write_text(text, encoding="utf-8")
    print(f"map: {text.count(chr(10))} lines → {rel(cfg, cfg.docs / '_MAP.md')}")
    return 0


# ---------- check ----------


def cmd_check(cfg: Cfg, quiet: bool) -> int:
    errors: List[str] = []
    warns: List[str] = []
    if not cfg.docs.is_dir():
        print(f"check: no docs/ under {cfg.root}")
        return 1
    baseline_file = cfg.docs / ".size-baseline.json"
    baseline = json.loads(baseline_file.read_text()) if baseline_file.exists() else {}
    ids = known_ids(cfg)
    paths = concept_paths(cfg)
    notes = [load(p) for p in paths]

    for i, c in Counter(n.id for n in notes).items():
        if c > 1:
            errors.append(
                f"duplicate id «{i}»: "
                + ", ".join(rel(cfg, n.path) for n in notes if n.id == i)
            )

    for n in notes:
        where, f = rel(cfg, n.path), n.front
        cat, hub = category_of(cfg, n.path), hub_of(cfg, n.path)
        if not f:
            errors.append(f"{where}: no frontmatter")
            continue
        if f.get("id") != n.id:
            errors.append(f"{where}: id «{f.get('id')}» != filename")
        if not KEBAB.match(n.id):
            errors.append(f"{where}: id must be kebab-case")
        if f.get("category") != cat:
            errors.append(f"{where}: category «{f.get('category')}» != folder «{cat}»")
        if hub and n.id != hub and not n.id.startswith(hub + "-"):
            warns.append(f"{where}: sub-note of «{hub}» should be named {hub}-<topic>")
        if n.status not in STATUS_MARK:
            errors.append(f"{where}: status «{n.status}» not in {sorted(STATUS_MARK)}")
        tags = list_field(f.get("tags", ""))
        if not tags or not tags[0].startswith("cat/"):
            warns.append(f"{where}: first tag should be cat/<category>")
        if not list_field(f.get("see_also", "")):
            warns.append(f"{where}: empty see_also")
        if n.id != hub and "## What it is" not in n.body:
            warns.append(f"{where}: no «## What it is» section")
        allowed = baseline.get(where)
        if n.lines > cfg.note_max and (allowed is None or n.lines > allowed):
            limit = f"its baseline {allowed}" if allowed else str(cfg.note_max)
            errors.append(
                f"{where}: {n.lines} lines > {limit} — split it (folder + hub) or move chronology to docs/history/"
            )
        elif n.lines > cfg.note_warn:
            warns.append(f"{where}: {n.lines} lines (target ≤{cfg.note_warn})")
        dated = DATED_HEADING.findall(n.body)
        if dated:
            warns.append(
                f"{where}: {len(dated)} dated heading(s) — current state only; chronology → docs/history/"
            )
        if n.status in ("current", "partial"):
            dead = [
                c
                for c in list_field(f.get(cfg.files_field, ""))
                if not (cfg.root / c).exists()
            ]
            if dead:
                warns.append(f"{where}: dead {cfg.files_field}: paths {dead}")
        dangling = sorted({x for x in n.links if x not in ids})
        if dangling:
            warns.append(f"{where}: dangling [[links]] {dangling}")

    for p in router_paths(cfg):
        if not p.exists():
            errors.append(f"{rel(cfg, p)}: router missing")
            continue
        r = load(p)
        if r.lines > cfg.router_max:
            errors.append(
                f"{rel(cfg, p)}: {r.lines} lines > {cfg.router_max} — a router routes, it holds no content"
            )
        dangling = sorted({x for x in r.links if x not in ids})
        if dangling:
            errors.append(f"{rel(cfg, p)}: router links to missing notes {dangling}")

    if cfg.facts.is_dir():
        for p in sorted(cfg.facts.glob("*.md")):
            fr = load(p).front
            if fr.get("id") != p.stem or fr.get("kind") != "facts":
                errors.append(
                    f"{rel(cfg, p)}: facts need `id: {p.stem}` and `kind: facts`"
                )

    agents = cfg.root / "AGENTS.md"
    if (
        agents.exists()
        and agents.read_text(encoding="utf-8").count("\n") > cfg.agents_max
    ):
        errors.append(
            f"AGENTS.md: over {cfg.agents_max} lines — it is loaded every session; move facts to docs/facts/"
        )

    mp = cfg.docs / "_MAP.md"
    if not cfg.map_cmd and (not mp.exists() or mp.read_text(encoding="utf-8") != render_map(cfg)):
        errors.append("docs/_MAP.md is stale — run `python3 scripts/docs_tool.py map`")

    if not quiet:
        for w in warns:
            print(f"  warn  {w}")
    for e in errors:
        print(f"  ERROR {e}")
    print(f"check: {len(notes)} notes, {len(errors)} error(s), {len(warns)} warning(s)")
    return 1 if errors else 0


# ---------- lag / baseline ----------


def cmd_lag(cfg: Cfg) -> int:
    rows = []
    for p in concept_paths(cfg):
        n = load(p)
        files = [
            c
            for c in list_field(n.front.get(cfg.files_field, ""))
            if (cfg.root / c).exists()
        ]
        upd = (n.front.get("updated") or "")[:10]
        if not files or not re.match(r"\d{4}-\d{2}-\d{2}$", upd):
            continue
        r = subprocess.run(
            ["git", "-C", str(cfg.root), "log", "-1", "--format=%cs", "--", *files],
            capture_output=True,
            text=True,
        )
        last = r.stdout.strip()
        if last:
            lag = (date.fromisoformat(last) - date.fromisoformat(upd)).days
            if lag > 0:
                rows.append((lag, n.id, upd, rel(cfg, p)))
    rows.sort(reverse=True)
    print(f"{'lag':>4}  {'updated':10}  note")
    for lag, nid, upd, path in rows:
        print(f"{lag:>4}  {upd:10}  {nid}  ({path})")
    print(
        f"\n{len(rows)} notes have files newer than their `updated:` — reconcile from the top."
    )
    return 0


def cmd_baseline(cfg: Cfg) -> int:
    data = {}
    for p in concept_paths(cfg):
        n = load(p)
        if n.lines > cfg.note_max:
            data[rel(cfg, p)] = n.lines
    (cfg.docs / ".size-baseline.json").write_text(
        json.dumps(dict(sorted(data.items())), indent=2) + "\n"
    )
    print(
        f"baseline: {len(data)} notes over {cfg.note_max} lines → docs/.size-baseline.json (they may only shrink)"
    )
    return 0


# ---------- audit (read-only, works on any folder) ----------


def tokens(n_bytes: int) -> int:
    return round(n_bytes / 4)


def md_files(root: Path) -> List[Path]:
    out = []
    for p in root.rglob("*"):
        if any(part in SKIP_DIRS for part in p.relative_to(root).parts[:-1]):
            continue
        if p.is_file() and (
            p.suffix.lower() in (".md", ".mdc") or p.name == ".cursorrules"
        ):
            out.append(p)
    return sorted(out)


def imports_of(path: Path, root: Path) -> List[Path]:
    """`@path` imports (Claude Code / Gemini CLI memory syntax) one level deep."""
    found = []
    for m in re.finditer(
        r"(?:^|\s)@(\.?/?[\w./-]+\.md)\b",
        path.read_text(encoding="utf-8", errors="ignore"),
    ):
        target = (path.parent / m.group(1)).resolve()
        if target.exists() and root in target.parents:
            found.append(target)
    return found


def cmd_audit(root: Path) -> int:
    files = md_files(root)
    sizes = {p: p.stat().st_size for p in files}
    lines = {
        p: p.read_text(encoding="utf-8", errors="ignore").count("\n") for p in files
    }
    print(f"# Docs audit — {root}\n")
    print(
        f"{len(files)} markdown files, ≈{tokens(sum(sizes.values())):,} tokens in total.\n"
    )

    print("## Always loaded at session start")
    loaded: List[Path] = []
    for name in INSTRUCTION_FILES:
        p = root / name
        if p.exists():
            loaded.append(p)
            loaded.extend(x for x in imports_of(p, root) if x not in loaded)
    mem = (
        Path.home()
        / ".claude"
        / "projects"
        / re.sub(r"[^A-Za-z0-9]", "-", str(root))
        / "memory"
        / "MEMORY.md"
    )
    total = 0
    for p in loaded:
        b = p.stat().st_size
        total += b
        print(
            f"  {tokens(b):>7,} tok  {p.read_text(encoding='utf-8', errors='ignore').count(chr(10)):>5} lines  {p.relative_to(root)}"
        )
    if mem.exists():
        b = mem.stat().st_size
        total += b
        print(f"  {tokens(b):>7,} tok  {'':>5}        Claude Code memory index ({mem})")
    print(
        f"  = ≈{tokens(total):,} tokens before the agent reads anything task-specific"
        + (
            "  (target: AGENTS.md ≤150 lines)"
            if total
            else "  (no instruction files found)"
        )
    )

    print("\n## Biggest markdown files")
    for p in sorted(files, key=lambda p: -sizes[p])[:15]:
        flag = (
            "  ← over 400 lines"
            if lines[p] > 400
            else ("  ← over 200" if lines[p] > 200 else "")
        )
        if L4_PARTS & set(p.relative_to(root).parts):
            flag += "  (archive/working artifact — fine if only linked)"
        print(
            f"  {tokens(sizes[p]):>7,} tok  {lines[p]:>5} lines  {p.relative_to(root)}{flag}"
        )
    print(
        f"  {sum(1 for p in files if lines[p] > 400)} files over 400 lines, "
        f"{sum(1 for p in files if 200 < lines[p] <= 400)} between 200 and 400."
    )

    print("\n## Chronology inside docs (dated headings)")
    dated = [
        (len(DATED_HEADING.findall(p.read_text(encoding="utf-8", errors="ignore"))), p)
        for p in files
    ]
    dated = sorted((d for d in dated if d[0]), key=lambda d: -d[0])
    for count, p in dated[:10]:
        print(f"  {count:>4}  {p.relative_to(root)}")
    if not dated:
        print("  none")

    print("\n## Lines repeated in 3+ files (facts or rules copied around)")
    where: Dict[str, set] = defaultdict(set)
    for p in files:
        for ln in p.read_text(encoding="utf-8", errors="ignore").splitlines():
            s = ln.strip().lstrip("-*> ").strip()
            if len(s) >= 40 and not s.startswith(("```", "|---", "---", "<!--")):
                where[s].add(p)
    rep = sorted(((len(v), k) for k, v in where.items() if len(v) >= 3), reverse=True)
    for count, text in rep[:15]:
        print(f"  ×{count}  {text[:110]}")
    if not rep:
        print("  none")

    has = lambda rel_: (root / rel_).exists()  # noqa: E731
    print("\n## Contract check")
    for label, ok in [
        ("AGENTS.md (vendor-neutral contract)", has("AGENTS.md")),
        ("docs/CONTEXT.md (entry router)", has("docs/CONTEXT.md")),
        ("docs/_SCHEMA.md (note contract)", has("docs/_SCHEMA.md")),
        ("docs/facts/ (one home per fact)", has("docs/facts")),
        ("docs/history/ (chronology out of notes)", has("docs/history")),
        (".claude/skills/ (workflows)", has(".claude/skills")),
        (".git (safe to restructure)", has(".git")),
    ]:
        print(f"  {'✓' if ok else '✗'} {label}")
    return 0


# ---------- main ----------


def main(argv: List[str]) -> int:
    args = [
        a
        for i, a in enumerate(argv)
        if not a.startswith("--") and (i == 0 or argv[i - 1] != "--root")
    ]
    cmd = args[0] if args else "check"
    if cmd == "audit":
        return cmd_audit(Path(args[1]).resolve() if len(args) > 1 else find_root(argv))
    cfg = load_cfg(find_root(argv))
    if cmd == "check":
        return cmd_check(cfg, "--quiet" in argv)
    if cmd == "map":
        return cmd_map(cfg)
    if cmd == "lag":
        return cmd_lag(cfg)
    if cmd == "baseline":
        return cmd_baseline(cfg)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
