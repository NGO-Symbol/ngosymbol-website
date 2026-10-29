# 2026-10-29: documentsart.symbol.ngo, people and project credits

- Built the project site of «Покажіть свої документи…» as `apps/documents` (documentsart.symbol.ngo) in the exhibition identity. Texts, people, events and photographs are read from the main site's data and media, so the two sites never disagree; only the curatorial concept and work descriptions of the saved Wix site live in the app. Added the `documents-site` deploy job (skipped until `DOCS_DEPLOY_REPO` is set) and the owner runbook (deployment.md §4a). The main site now links to `https://documentsart.symbol.ngo`.
- Ганна Франик = Аліна Войтюк (`USER_CONFIRMED`): merged into one person page, shown as «Ганна Франик (Аліна Войтюк)»; `/people/alina-voitiuk` redirects.
- «2, 10, 300 років потому»: added the artists from the Drive list (Алла Пасічник, Магран Тата, Руслана Ключко pages; Олена Мордик's series «вихід ні») with photos of works (metadata stripped).
- «Голоси у русі»: credit corrected to «Culture Helps Solidarity», co-funded by the European Union (Creative Europe removed, `USER_CONFIRMED`); partners from the project's Instagram posts.

Affected: `project-registry.md`, `team-cv.md`, `open-questions.md`, `documents/operations/deployment.md`.

- Home page «Кадри»: 14 selected photos (Петро Чекаль, Іван Самойлов, performances) in `apps/main/app/data/highlights.ts`, shown as a swipeable strip with a full-screen viewer (`PhotoReel.vue`). Credits only where the author is recorded.
