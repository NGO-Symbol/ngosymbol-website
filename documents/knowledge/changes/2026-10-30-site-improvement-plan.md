# Site improvement plan (SEO, speed, navigation, layout, analytics)

Date: 2026-10-30
Status: `USER_CONFIRMED` — the team agreed the stages below; they are worked through one by one, each in its own pull request.

## Decisions already taken

- The site is open to search engines (done 2026-10-30): symbol.ngo and the exhibition site; «Історія моєї вулиці» stays hidden until launch. Analytics that need an indexed site come after this.
- «Підписатися на календар подій» opens the events list straight in the calendar view.
- Access for Google Analytics, Search Console, Clarity and DNS is given when that stage starts.
- Cookie banner: analytics only after consent; «Відхилити» as visible as «Прийняти».
- IBAN: removed from the support page, the row stays with an empty value to be filled later.
- Footer: nothing is removed, only visual noise is reduced.
- Phone navigation: sections move into a burger menu that is always a button; easy to revert if the team does not like it.
- Project orbit: less text on phone and desktop, no explanatory caption. Interactivity is shown visually: the runner on the orbit moves a little slower; when it reaches a project (or the visitor hovers one, and the runner comes to it) the project's title and short description light up.
- Home page gets a short text about ГО «Символ» so the home page is found in search.

## Stages

1. Measure: PageSpeed Insights (mobile, desktop) and local Lighthouse on home, project, person, events and the exhibition site; Core Web Vitals, weights, JS, fonts. Report «now → target».
2. SEO: complete sitemap (both languages, exhibition site, news), canonical and hreflang, unique title and description, OG images, structured data (Organization, Person, Event, CreativeWork), alt text on every image so photos are found by name (e.g. «Юрій Рассоха»), Search Console via DNS. Goal: the site comes up for project titles, people's names, works and events.
3. Speed and motion: animation tiers chosen by device and live frame rate; partner logos animate only on hover or tap; no hover effects on touch screens; no default blue outlines or tap highlights, with a tidy keyboard focus kept.
4. Navigation: burger menu and lower header on phones, breadcrumbs in the header; lighter footer; smooth theme-toggle icon on phones.
5. Home: smaller main heading; orbit as above; numbers moved after «Кадри»; visual sections that mark the stages of the page; captions in «Кадри» on one line; partners on desktop collapsed like on phones.
6. Layout: remove the empty gap at the top of pages; even spacing on phones; no overlapping text (role tags over the eyebrow on person pages, events on the «Покажіть свої документи…» page); collapsible sections on person pages (education, experience, events, projects) with the biography open on desktop; smaller portraits on phones; collapsible long blocks on project pages; two projects per row on phones.
7. Site-to-site transition on phones in 0.4–0.5 s.
8. Search: hints and example queries in the empty search.
9. Analytics: Google Analytics 4 (audience, country, age where available, goals: support, calendar, project site, applications), Microsoft Clarity (click maps, recordings), consent banner, Search Console.
10. Content: IBAN row emptied.
