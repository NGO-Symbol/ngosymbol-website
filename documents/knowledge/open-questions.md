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
- Decide whether events and opportunities are one page or two when enough content exists.

## Site content model (2026-10-29)

- «Покажіть свої документи…»: restore as a subsite from the saved copy or migrate into a large main-site project page?
- Section name: «Люди» or «Автори»? Team as a separate tab or a block in «Про нас»?
- Donations: which account of ГО «Символ» (UAH and foreign currency), which card acquiring, non-profit register status.
- Patron tiers and what patrons receive.
- Newsletter service (or Telegram channel only).
- Which donor names, credit lines, and logos may be published for each project (Voices in Motion has EU / European Cultural Foundation visibility requirements to check in the grant agreement).
- Public status, dates, and roles for «Ті, що побачили світ (Мілан)» and «Відкрита книга: поліаморія».
- Vector (SVG) version of the logo for the intro animation.

## Покажіть свої документи… (2026-10-29)

- Which November programme events took place as planned, their times, and speakers (ZMINA, artist talk guests).
- Project site `documentsart.symbol.ngo` is built (`apps/documents`); owner still has to create `NGO-Symbol/documentsart`, the deploy key, `DOCS_*` variables and the Cloudflare CNAME (`documents/operations/deployment.md` §4a).
- «Голоси у русі»: official «Funded by the European Union» emblem file for the donor tile (now text only).
- Photographer credits for event photos and for photos not marked «Chekal».
- Partner and donor logo files and permission to show them.
- Team: see `team-cv.md` → Open (Олена Мордик bio, Ганна Франик public name, PSD volunteers, Kharkiv Sea role wording).
- Which PSD artworks are shown in the photos (captions are generic until confirmed).

- Zakon font: confirm the web-embedding licence.
- Kharkiv Sea 2026: confirm dates (14–23.08 from photo folders) and programme.
- Full English translation of page texts (URL pattern decided in ADR-0009; interface and project titles are translated, page bodies are not).
- Logo files for partners without one (Grynyov Art Collection, President's grant, Здибанка, Khust theatre, Uzh Station, Ucraina Più) and confirmation that partners agree to logo use; current logos come from the shared Drive (Nema) and the organizations' own websites.

## Design

- Design pass: exact tone values (type pair from the design-system branch: Playfair Display + Commissioner + logo face for labels; on 2026-10-29 Петро asked for the team-supplied Zakon on the main site — reconcile), dark theme — decided 2026-10-29: light and dark modes with a toggle (see design-system.md), square vs softer card shapes, photo treatment, hero animation personality.
- Choose how widely to use the logo typeface (options A–D in the artifact «Шрифт Символу»; recommended: wordmark and name, plus navigation, eyebrows, tags and button labels). Confirm the font author's permission (Oleksii Chekal) to publish it as a web font on a public site.
- Migrate `apps/main` and `apps/istoriia-vulytsi` to the design system (page by page, using the gallery templates).

## Infrastructure

- Launch: both sites are hidden from search engines (`noindex, nofollow` meta tag, flag `indexable` in `apps/*/nuxt.config.ts`). Set it to `true` in both apps when the organization approves the public launch; add a sitemap and `robots.txt` at that time.
- Invite remaining editors to the `NGO-Symbol` organization with Write access.
- Decide whether pull requests need a human approval before going live (currently CI only).
- Configure GitHub CLI authentication on each editor's computer.

