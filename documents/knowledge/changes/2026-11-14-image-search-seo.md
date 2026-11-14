# Image-search SEO completeness

Date: 2026-11-14
Status: implemented locally on branch `task/image-search-seo`; not published.

## What changed

- Removed arbitrary 12 / 8 / 6-photo limits from the image sitemap for projects, events and people.
- Added all photographs rendered by the «Покажіть свої документи…» subsite: artist-work archives, home and event photographs, portraits, and artist-list hover covers.
- Added descriptive sitemap titles from the photograph captions instead of repeating only a page title.
- Person pages now declare `ProfilePage`, `Person`, and a representative `ImageObject`; the people listing connects every name, portrait and canonical profile through an `ItemList`.
- Project and event JSON-LD now includes every relevant photograph as an `ImageObject`, with the correct Ukrainian or English canonical page URL.
- Exhibition artist pages now have their own portrait / work Open Graph image and structured data for the artist, works and photographs.
- Above-the-fold portraits and the exhibition hero image load eagerly with high priority.
- The decorative main-site intro is no longer server-rendered and is skipped for crawlers; human visitors retain the once-per-session animation.

## Verification

- Static generation succeeds for the main and exhibition sites.
- Every rendered JPEG photograph on both generated sites has non-empty alt text.
- Every rendered photograph URL on both sites is present in `/sitemap.xml`.
- JSON-LD in generated pages parses successfully; the intro overlay is absent from prerendered HTML.
