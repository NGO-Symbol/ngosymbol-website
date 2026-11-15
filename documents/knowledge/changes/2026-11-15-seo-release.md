# SEO release: titles, structured data, robots, 404, SEO gate

Date: 2026-11-15
Status: implemented locally on branch `worktree-agent-a79bcfa641e1a8401` (from `task/release-seo`); not published. Every item was approved by the owner and the team after the audit of the live site (crawl of 211 sitemap pages, Lighthouse, JSON-LD and link analysis).

## Facts recorded (`USER_CONFIRMED` 2026-11-15)

- The artist talk with Андрій Скрипка took place on **21 November 2025** (the site was right; the knowledge base said 9 November). The curator tours of the exhibition were on 18 October, 28 October and 1 November 2025 (the registry said 18.10 and 2.11; the site's event records and the approved page titles use the three dates).
- The English name of the exhibition is **«May I See Your Documents…»** (ellipsis character, no question mark) everywhere: data, titles, alt texts.
- The Hungarian city is spelled **«Балашшадьярмат»** (locative: «у Балашшадьярматі»); English **Balassagyarmat**.
- Legal name of the organisation: **Громадська організація «Символ»**; short English forms «NGO Symbol», «Symbol NGO». Registration (ЄДРПОУ) 45221328, founded 2023-10-11 in Kharkiv (unchanged, now also in structured data).
- «Харківське море» 2024 and 2026: **Symbol is a partner, not creator or organizer** (project field `role: 'partner'`); the 2026 organizer is ГО «Платформа театральних ініціатив» (project field `organizer`).
- News of 9 July 2026 («Голоси у русі»): the programme Culture Helps Solidarity is implemented by a consortium led by the European Cultural Foundation and co-funded by the European Union; Creative Europe is not mentioned (it was removed from the credit earlier, now also from this news item).
- Artists of the exhibition did **not consent to AI training** on their work: see robots below.
- Dead outbound links removed: the Wikipedia article for Олексій Сай (en.wikipedia.org/wiki/Oleksiy_Sai returns 404, no other article was found by search) and apris.art (does not resolve).

## What changed

Titles, descriptions, Open Graph
- The 19 approved pages (home, about, projects, events, people, support, contact, opportunities, 10 project pages, exhibition home), in both languages, are exact strings. Static pages carry them in the page; projects in data: `seoTitle` / `seoDescription` in `projects.ts` and `projects-en.ts` (the year is written once, inside the title). `usePageSeo` (`apps/main/app/composables/usePageSeo.ts`, and its twin in `apps/documents`) is the one call per page: title with the site name once (`siteTitle`: a title that already ends or starts with the site name is left alone, so the home page has no doubled brand), description cut to ≤ 160 characters, `og:title`, `og:description`, `twitter:*`, and the share image with its real width and height from `images.json` (omitted when the file is unknown; `og-default.jpg` is 1200 × 630).
- `fitDescription` (`packages/brand/app/utils/seo.ts`): a description over 160 characters becomes its first sentence, cut at a sentence end (initials, «нар.», «ім.» do not end a sentence). Biographies on the pages are unchanged. Person pages with a very short line (`Митець піксель-арту.`) get the name and the person's projects added.
- Events that share a title get the date in the **page title only** («Кураторська екскурсія, 18 жовтня 2025»; «Тренінг mhGAP у Білій Церкві, 10 лютого 2025»; English the same); the optional event field `seoTitle` shortens a title that is longer than a result shows (the ZMINA panel, 84 characters). Titles of 61–65 characters (a few events and projects) were left: they are within the gate's limit of 70.
- Exhibition site titles: the home page has the approved title without suffix; other pages are «Назва · Покажіть свої документи…».

Structured data (JSON-LD, `<` always written as `<` through `ldJson`)
- Home: one `@graph` with `NGO` (`#org`: name, `legalName`, `alternateName`, `logo` 1000 px, `description`, `disambiguatingDescription`, `foundingDate`, `foundingLocation`, `identifier` ЄДРПОУ as `PropertyValue`, `sameAs` = the five official channels) and `WebSite` (`#website`: «ГО «Символ»», alternate «Symbol NGO» / «symbol.ngo»). `/en/` has its own pair of ids (`https://symbol.ngo/en/#org`) with English name, description and url; other pages mention the organisation through that id (`orgRef`).
- Events: Kyiv offsets (`+02:00` / `+03:00` by date, plain arithmetic in `kyivDateTime`), `endDate` (end, or the start for one-day events), `location` as `Place` with `PostalAddress` (only the parts the data has), `eventStatus`, `organizer` by the project's `role`, English strings and `/en/` urls on English pages (also `superEvent`, image captions).
- Projects: creator Symbol only when `role` is `organizer`; for a partner project Symbol is a `contributor` and the real organizer is `creator` when the data names one.
- Contact: `ContactPage` with the organisation, e-mail and channels. Breadcrumb `item` urls have the trailing slash.
- Exhibition site: `ExhibitionEvent` (2025-10-17 – 2025-12-07, ЄрміловЦентр, Kharkiv, curators Петро Чекаль and Юрій Рассоха, organizer Symbol) and a `WebSite` on its home page; `Article` (concept), `AboutPage` (team), `CollectionPage` with `ItemList` (artists, events, press), `BreadcrumbList` on every page, artist `ProfilePage` linked to the exhibition.
- `pnpm i18n:check` (`scripts/i18n-parity.mjs`) now also fails when the JSON-LD of an English page contains Ukrainian text. Allow rule: the value of `legalName` (the registered name has no English form) and URLs; everything else must be English.

Sitemap, calendar
- `lastmod` per URL: events use their own date, `/news` the newest news item, every other page the date of the last git commit touching its source file or data (needs full history: both workflows fetch it; without history the date is left out, never the build date). `image:title` removed (Google deprecated it in 2022 and ignores it); image entries stay. `/people/alina-voitiuk` is not in the sitemap.
- `/people/alina-voitiuk` (and `/en/people/alina-voitiuk`) is a small static page (`apps/main/public/…`): meta refresh to `/people/hanna-franyk/`, `rel=canonical` to it, `noindex, follow`, not in the sitemap and not linked. Chosen over dropping the URL because a static host cannot send a 301: a 404 would leave old links dead and old search entries lingering, while the stub moves visitors at once and asks to be dropped from the index; the gate does not see it because it is not in the sitemap.
- `/events.ics`: timed events without an end last two hours (DTEND was equal to DTSTART), DTSTAMP is the event's own day, not the build time. The «Add to Google Calendar» link uses the same two hours.

404
- `app/error.vue` in both apps: the site's header and footer, the language of the missing address (`/en/…` → English), links to the home page and the main sections, `noindex`. `experimental.prerenderErrorPages` makes `404.html` this page, rendered at build time (before it was an empty app shell with the title «· ГО «Символ»»). GitHub Pages serves the root `404.html` with status 404 for every missing path (checked on the live site: `/no-such-page/` and `/documentsart/no-such/` return 404); for `/en/…` and `/documentsart/…` the main site's page serves, and it follows the address. The exhibition site's own `404.html` serves when it is published on `documentsart.symbol.ngo`.

robots.txt
- `symbol.ngo`: everyone allowed, AI search bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User) named and allowed. AI training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended, Meta-ExternalAgent, Bytespider) may not read `/documentsart/`, `/media/people/works/` and the exhibition's photograph folders (`/media/projects/pokazhit-svoi-dokumenty/`, `/media/events/pokazhit-svoi-dokumenty-…`, with their `_opt` AVIF twins). Artists' works were found in exactly these places in the built site (checked against every image of the exhibition pages); portraits (`/media/people/*.jpg`) are not work and stay open.
- `my-street.symbol.ngo` (`apps/istoriia-vulytsi/hidden/robots.txt` while hidden, `public/robots.txt` for the built site): `Disallow: /` removed so crawlers can read the page's `noindex` (a forbidden page cannot show it and can still appear as a bare link); the meta `noindex, nofollow` stays; training crawlers are disallowed entirely.
- `apps/documents/public/robots.txt` for the exhibition's own address (training crawlers disallowed entirely); the main deploy does not copy it into `/documentsart/`.

SEO gate
- `pnpm seo:check` (`scripts/seo-gate.mjs`, rules in `scripts/lib/seo-gate.mjs`, ported from the band site) runs in `pnpm check` after `pnpm i18n:check` (which generates both sites): every URL of the generated sitemap exists in the output, is not noindex, has no meta refresh, a self-referencing canonical, a title (≤ 70) and a description (30–160), `og:title`, `og:description`, `og:image`, parseable JSON-LD without a raw `<`, no title shared with another page; the sitemap has valid `lastmod` dates and no `image:title`; both `404.html` files are the sites' own, noindex pages.

Small fixes
- The h1 of `/projects/pokazhit-svoi-dokumenty/` has real words with real spaces (it was `aria-label` plus hidden words, read as one word); same for its kicker.
- The language switch (`SymSegmented` with `to`) is named «UA EN: English version» (WCAG 2.5.3, label in name).
- The footer «Скопіювати» button on the dark footer had 3.54:1 contrast (`opacity` twice); now above 4.5:1.
- The press list on `/en/about/` marks the Ukrainian titles in `title` / `aria-label` with `lang="uk"` (the i18n check failed on the base commit).
- Contact page: the sentence about partnership, the e-mail as a link, `ContactPage` data, and «Контакти» / «Contact» in the footer.
- Home hero: h1 «Сучасне мистецтво й психічне здоров’я з Харкова» / «Contemporary art and mental health from Kharkiv» and the approved intro paragraph.

## Performance of the home page on phones

Cause found with Lighthouse 12 (mobile, simulated 4G, 4× CPU) on the local static build: nothing wrong with the h1, the fonts or the intro (the splash is client-only). The prerendered HTML paints at once, but the ~225 KB of framework JavaScript (`<script type="module">` and 12 modulepreload hints in the head) downloads at the same time as the stylesheet and the font and shares the bandwidth, so first paint and LCP wait for it: FCP 2.56 s, LCP 2.86 s (3.15 s on a plain localhost server, 3.4 s on the live site). Removing the JavaScript altogether gave LCP 1.7 s, the proof that the JS contention is the whole cause.
Fix: `apps/main/server/plugins/defer-entry.ts` moves the hints and the entry script out of the HTML into a tiny inline loader that adds them after two animation frames (after the first paint), with a 2.5 s timer for background tabs. The look is unchanged; the menu, the intro and hydration start a moment later. Result on the same setup: FCP 1.21 s, LCP 1.66 s (performance score 91 → 99).
Known and left: in a real throttled browser the orbit on the home page rotates its project blurb after hydration, and the new, larger text block becomes a later LCP candidate (about 10 s on a 4× throttled CPU). Lighthouse's simulated LCP does not see it. If field data shows it, the blurb should be swapped without creating a new, larger text block.

## Verification

- `pnpm check` passes (kb:validate, ds:contrast, ds:lint, lint:arrows, images:check, typecheck, build, i18n:check, seo:check).
- Crawl of the generated output: 212 sitemap URLs, all titles unique, no title over 70 or description over 160; the 38 approved strings (19 pages × 2 languages) match exactly, including `og:title` and `og:description`; hreflang uk / en / x-default and canonical unchanged on every page; every JSON-LD block parses, English blocks contain no Ukrainian outside `legalName`.
- 404: `404.html` is the error page; opened at `/projects/no-such-project/` it answers 404 and shows the Ukrainian page, at `/en/no-such-page/` the English one.
