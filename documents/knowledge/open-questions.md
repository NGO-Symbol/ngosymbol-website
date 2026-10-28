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

## Infrastructure

- Launch: both sites are hidden from search engines (`noindex, nofollow` meta tag, flag `indexable` in `apps/*/nuxt.config.ts`). Set it to `true` in both apps when the organization approves the public launch; add a sitemap and `robots.txt` at that time.
- Invite remaining editors to the `NGO-Symbol` organization with Write access.
- Decide whether pull requests need a human approval before going live (currently CI only).
- Configure GitHub CLI authentication on each editor's computer.

