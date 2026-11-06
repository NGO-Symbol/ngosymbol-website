# Image pipeline and guard

Date: 2026-11-06
Status: implemented on branch `task/image-pipeline`; decision in [`../decisions/ADR-0010-image-pipeline.md`](../decisions/ADR-0010-image-pipeline.md).

## What changed

- New `scripts/optimize-images.mjs` (sharp): `pnpm images:optimize [path]` processes new or changed photographs; `pnpm images:check` verifies the whole tree and is part of `pnpm check`.
- Every photograph is now a web master (`.jpg`, ≤ 1600 px, no EXIF, ≤ 400 KB) plus AVIF variants (480/960/1600 px) in `public/media/_opt/` (exhibition works: `public/works/_opt/`). `apps/main/app/data/images.json` and `images.lock.json` are generated; never edit them.
- `<MediaImg>` (main site and exhibition site) gives responsive `srcset`/`sizes`, `width`/`height`, colour placeholder and lazy loading; `priority` for the first large photo; lightbox views use the 1600 px variant (`sizes="100vw"`).
- Removed: `scripts/make-previews.mjs` (`pnpm media:previews`, macOS-only), `public/media/previews`, `public/media/thumbs`, `data/previews.ts`, `thumbOf`.
- `pnpm task:save` runs the optimizer before it commits; new skill `.agents/skills/add-photo` (linked from `AGENTS.md`).
- Photo EXIF metadata (camera, location) is stripped from every master.

## Rules for the future

- Put the team's originals in `media-inbox/`, never in `apps/`.
- Photographs are `.jpg` with lowercase latin kebab-case names; logos are PNG/SVG in `media/partners` or `press-kit`.
- Do not raise the budgets in the script to make an image pass.
