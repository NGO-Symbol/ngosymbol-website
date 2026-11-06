---
name: add-photo
description: Add, replace or remove a photograph on any site («додай фото», «заміни фото», «фото в галерею», portraits, covers, event and project photos, exhibition works) and keep images light. Use whenever a JPEG/PNG/WebP/HEIC file is going to appear on a page.
---

# Add a photo

Photographs go through one pipeline (`scripts/optimize-images.mjs`, ADR-0010). Each photo is stored as one web master (`.jpg`, long side ≤ 1600 px, no EXIF/location) plus AVIF variants in an `_opt/` folder next to it, and listed in `apps/main/app/data/images.json`. Pages never handle sizes themselves: `<MediaImg>` reads the list and writes `srcset`, `sizes`, `width`/`height`, lazy loading and a colour placeholder.

## Do it without being asked

Whenever a photo is part of a task, run this pipeline yourself: nobody has to request it. Do not leave it for later and do not ask whether to compress. If a photo is mentioned but the file is missing, say so and name the folder to put it in. If you notice images in the repo that `pnpm images:check` rejects, fix them or tell the person. Say in one line what the pipeline did (for example: «стиснуто, 2,4 МБ → 180 КБ»).

## Steps

1. Keep the team's original in `media-inbox/` (local, not in git). Never put originals in `apps/`.
2. Copy the photo to its folder and give it a lowercase latin kebab-case name `name.jpg`:
   - project: `apps/main/public/media/projects/{project-slug}/`
   - event: `apps/main/public/media/events/{event-slug}/`
   - person portrait: `apps/main/public/media/people/{person-slug}.jpg`
   - exhibition works of the autonomous exhibition site: `apps/documents/public/works/{artist-slug}/`
3. Run `pnpm images:optimize` (or just `pnpm task:save "…"`, which runs it). It converts PNG/WebP/HEIC/`.JPG` to `.jpg` (it prints the new name), shrinks, strips metadata, writes `_opt/` variants and updates `images.json`. Commit everything it produced: the photo, `_opt/…`, `images.json`, `images.lock.json`.
4. Reference the photo by its `/media/…/name.jpg` path in the data file (`Photo`: `src`, `alt`, `credit`), add its English `alt` in `alt-en.ts` (AGENTS.md: UA/EN sync).
5. Render with `<MediaImg :src="…" :alt="…" />` (or the existing `PhotoGallery`/`PhotoReel`). Pass `sizes` when the photo is not about half the screen wide (`sizes="100vw"` for full width) and `priority` for the first big photo on a page. Never use a bare `<img>` or CSS `background-image` for a photograph.
6. Run `pnpm images:check`. It must print `Images OK`.

## Never

- Do not edit a `.jpg` in `public/` by hand afterwards (the check sees the changed hash): replace the file and run `pnpm images:optimize` again.
- Do not edit `images.json`, `images.lock.json` or anything in `_opt/` by hand.
- Do not add photos of people without the person's consent, or photos with children's faces, to the site.
- Do not delete the pipeline guard or raise its limits to make a file pass; resize the photo instead.

## When `pnpm images:check` fails

| Message | Fix |
| --- | --- |
| `not processed by the pipeline` | `pnpm images:optimize` |
| `over the … budget` | the photo is too heavy even after processing: crop or export it smaller, then optimize |
| `must be .jpg` / file name | rename to lowercase latin kebab-case `.jpg`, optimize |
| `… is not in images.json` / `does not exist` | a data file or component points at a path that is not a processed photo: fix the path |
| `graphics must be PNG or SVG` | logos with transparency live in `media/partners` as PNG/SVG, ≤ 250 KB |

Logos and partner marks (`media/partners`, `press-kit`) are graphics, not photographs: PNG or SVG, no variants; the optimizer only re-compresses them losslessly.
