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
- Choose how widely to use the logo typeface (options A–D in the artifact «Шрифт Символу»; recommended: wordmark and name, plus navigation, eyebrows, tags and button labels). Confirm the font author's permission (Oleksii Chekal) to publish it as a web font on a public site.
- Migrate `apps/main` and `apps/istoriia-vulytsi` to the design system (page by page, using the gallery templates).

## Infrastructure

- Launch: both sites are hidden from search engines (`noindex, nofollow` meta tag, flag `indexable` in `apps/*/nuxt.config.ts`). Set it to `true` in both apps when the organization approves the public launch; add a sitemap and `robots.txt` at that time.
- Invite remaining editors to the `NGO-Symbol` organization with Write access.
- Decide whether pull requests need a human approval before going live (currently CI only).
- Configure GitHub CLI authentication on each editor's computer.

