# Open questions

Items here are unresolved and must not be silently assumed.

## Organization and content

- Confirm public role/title and approved short biography for Петро Чекаль, Ганна Франик, and Олена Мордик.
- Map ЄрміловЦентр, MH4U, European Cultural Foundation, and other partners/donors to exact projects and approved logo assets.
- Confirm the public list, date, location, team, and outcomes for each older project.
- Decide which policies and reports are ready for publication.
- Confirm the preferred English organization description.

## Product

- Confirm final Latin transliteration of every route slug, particularly `istoriia-vulytsi` and individual street names.
- Decide whether autonomous projects share a cookie-free analytics solution.
- Decide whether the English locale uses `/en/...` on each host or a language switch stored in local state.
- Decide whether events and opportunities are one page or two when enough content exists.

## Design

- Design pass: final type pair (current Source Serif 4 + Manrope is provisional), exact tone values, whether a dark theme is wanted, square vs softer card shapes, photo treatment, hero animation personality.
- Obtain a vector (SVG) version of the logo/spiral from the organization; only a raster PNG exists, so `SymOrbit` approximates the spiral with a ring and diamond.
- Migrate `apps/main` and `apps/istoriia-vulytsi` to the design system (page by page, using the gallery templates).

## Infrastructure

- Launch: both sites are hidden from search engines (`noindex, nofollow` meta tag, flag `indexable` in `apps/*/nuxt.config.ts`). Set it to `true` in both apps when the organization approves the public launch; add a sitemap and `robots.txt` at that time.
- Invite remaining editors to the `NGO-Symbol` organization with Write access.
- Decide whether pull requests need a human approval before going live (currently CI only).
- Configure GitHub CLI authentication on each editor's computer.

