# 2026-10-29: documentsart.symbol.ngo, people and project credits

- Built the project site of «Покажіть свої документи…» as `apps/documents` (documentsart.symbol.ngo) in the exhibition identity. Texts, people, events and photographs are read from the main site's data and media, so the two sites never disagree; only the curatorial concept and work descriptions of the saved Wix site live in the app. Added the `documents-site` deploy job (skipped until `DOCS_DEPLOY_REPO` is set) and the owner runbook (deployment.md §4a). The main site now links to `https://documentsart.symbol.ngo`.
- Ганна Франик = Аліна Войтюк (`USER_CONFIRMED`): merged into one person page, shown as «Ганна Франик (Аліна Войтюк)»; `/people/alina-voitiuk` redirects.
- «2, 10, 300 років потому»: added the artists from the Drive list (Алла Пасічник, Магран Тата, Руслана Ключко pages; Олена Мордик's series «вихід ні») with photos of works (metadata stripped).
- «Голоси у русі»: credit corrected to «Culture Helps Solidarity», co-funded by the European Union (Creative Europe removed, `USER_CONFIRMED`); partners from the project's Instagram posts.

Affected: `project-registry.md`, `team-cv.md`, `open-questions.md`, `documents/operations/deployment.md`.

- Home page «Кадри»: 14 selected photos (Петро Чекаль, Іван Самойлов, performances) in `apps/main/app/data/highlights.ts`, shown as a swipeable strip with a full-screen viewer (`PhotoReel.vue`). Credits only where the author is recorded.

- «Голоси у русі» credits follow the «Culture Helps Solidarity» communication guidelines (culturehelpssolidarity.eu/wp-content/uploads/2026/10/CHS-communication-guidelines.pdf): programme disclaimer on the project and all its event pages, EU funding notice, official logos (Drive «LOGOS for Grantees») in the order CHS → EU → ECF → Інша Освіта → zusa → VETERANKA; the EU emblem is never recoloured (its own white variant in dark mode).
- Home «Кадри» shows a random selection of 14 from a curated pool of 23 on every visit.
- «Ті, хто побачили світ»: the gallery leads with the exhibited photographs (Drive «Мілан (Ті, що побачили світ)»).
- Decorative «↗» arrows removed site-wide; footer contacts use one set of thin icons.
- Project and event pages share one order (photos → text → people → partners and donors); events have their own partners; person pages list events. Third mhGAP training: hotel «Україна», Kyiv (USER_CONFIRMED).
- Key phrases (`**…**`) render as ordinary text again: the capitals and marker were rejected by the user.
- Exhibition site: prominent way back to Symbol, UA/EN mirror (/en), day/night switch, home sections, press page (media mentions checked online), works photos from the saved Wix pages, artist pager.
- Partners: «Збирач конвалій» (Gwara Media, Media Development Foundation, MOKSOP), «2, 10, 300 років потому» (Egyesek, Artéria, Union Forum), mhGAP venue «Сенс», Bila Tserkva library logo, «Нема» on PSD; white backgrounds removed; every logo has its own motion.
- mhGAP: two trainers per training from Symbol's 2025 service contracts and acts — 10–14.02 Олена Лемешко + Наталія Опришко; 24–28.02 Юрій Січ + Вікторія Миронюк-Данко; 31.03–04.04 Алеся Лисенко + Іван Кутчак; 13–16.05 Іван Кутчак + Ольга Климовська (USER_CONFIRMED: every trainer also led online supervisions for their participants). Ольга's background from the «CV Yurii Rassokha, Olha Klymovska» doc. No tax IDs or contacts published. Photographer Петро Чекаль (post of 26.06.2025). Олена Мордик: CV from her own file.
- PSD opening photos by Олександр Осіпов (ЄрміловЦентр Drive). «Ті, хто побачили світ»: mostly Петро Чекаль's prints, a few graphic works by Юрій Рассоха.
- Events page as cards by year; header hides only after a deliberate scroll; full-screen violet transition only into the home page; home photo strip uses 720 px previews and mixes projects.
