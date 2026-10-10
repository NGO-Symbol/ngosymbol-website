# Knowledge graph

The JSONL files provide a small, diff-friendly index over the canonical Markdown
knowledge base.

- `nodes.jsonl` contains durable entities and concepts.
- `edges.jsonl` contains typed relationships between existing nodes.
- Evidence classes follow `../schema.md`.

The graph is not a database and must not duplicate long-form explanations. Add a
node or edge only when it materially improves discovery across documents. Run
`pnpm kb:validate` after every graph edit.

