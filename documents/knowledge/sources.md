# Sources

## Supplied organization files

- `/home/yurii/Завантажене/Флаєр ГО “СИМВОЛ” (2) (1).pdf` — November 2024 flyer; some capabilities are aspirational and must not be treated as delivered work after later corrections.
- `/home/yurii/Завантажене/Портфоліо Символ (1).pdf` — organization, values, purpose, and selected projects; created April 2026.
- `/home/yurii/Завантажене/ГО СИМВОЛ презентація.pdf` — June 2024 presentation; earlier team and project context.
- Uploaded logo PNG, copied to `packages/brand/assets/symbol-mark.png` — exact dominant colors `#9280A6` and `#FDD08F`.

The local absolute PDF paths are source-machine references and are not portable. Approved source copies may be added later under a dedicated non-public archive if the organization decides they belong in Git.

## User-confirmed conversation source

Conversation on 2026-10-10 supplied corrections and current decisions, including:

- team addition of Олена Мордик;
- SH+ and psychological first aid are potential, not completed;
- partner-only role in «Харківське море»;
- current status of «Голоси у русі» and «Історія моєї вулиці»;
- audiences, goals, content ownership, design preferences, no-CMS decision;
- internal routes for small projects and subdomains for autonomous projects.

## Public sources checked

- Instagram: https://www.instagram.com/symbol.ngo/
- Ukrainian registry summary: https://opendatabot.ua/c/45221328
- «Покажіть свої документи…»: https://www.documentsart.com/ — domain showed a Wix disconnected-domain page during research on 2026-10-10; preserve content before relying on redirects.
- «Харківське море» coverage: https://lyuk.media/news/kharkiv-sea/
- Mystetskyi Arsenal guide mentioning «Історії різних»: https://artarsenal.in.ua/wp-content/uploads/2025/09/final_AI25_putivnyk_final_web.pdf

## User-supplied public mhGAP photo albums (checked 2026-10-30)

- Kyiv training, 31.03–04.04.2025 (folder «Київ 1»): https://drive.google.com/drive/folders/1BCrz12099tNlQuECP_caRjMsK7tbU_K9
- Kyiv training, 13–16.05.2025 (folder «Київ 2»): https://drive.google.com/drive/folders/1NZRVgsHb2D34GjUmVeoz1G2ccwXoZRJj
- First Bila Tserkva training, 10–14.02.2025: https://photos.app.goo.gl/juzrPPryNMWiM6YR6

The Kyiv originals use filenames ending in `_Chekal.jpg` and are credited to Петро Чекаль. The organization confirmed on 2026-10-30 that all photos from both Bila Tserkva trainings were made by Юрій Рассоха; this correction overrides the earlier blanket attribution to Петро Чекаль. These albums supplied the expanded event galleries and the selected project overview gallery. Only optimized web copies are committed; public source albums are not mirrored into the repository.

## Product and architecture references

- Graphify reference architecture: https://github.com/Graphify-Labs/graphify
- Nuxt deployment guide: https://nuxt.com/deploy
- Nuxt layers: https://nuxt.com/docs/examples/advanced
- Cloudflare Pages monorepos: https://developers.cloudflare.com/pages/configuration/monorepos/
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

Public sources can become stale. Record the check date when using them for a production claim.


## Instagram @symbol.ngo (read 2026-10-29)

All 62 posts (including collaborations with @yermilovcentre, @nema_pbt, @serdenky.playback, @more_kha, @ucrainapiu_milano_aps) were read in the team's signed-in browser. Used for: «Покажіть свої документи…» event dates and times, the four mhGAP trainings (Біла Церква 10–14.02 and 24–28.02.2025 in the Central city library; 31.03–04.04.2025; 13–16.05.2025 part 2 in «Сенс», Kyiv), «Голоси у русі» playback tour by «Серденьки» (Ужгород 22.08.2026, Бакош — date not stated, Берегове 13.10.2026), and project texts. The ZMINA lecture 08.11.2025 and the «Бюрократія» discussion 29.11.2025 appear only in the planned programme, but took place (`USER_CONFIRMED` 2026-10-29). Open: the «Уявні» curator tour and the Бакош performance have no exact date; location of the 31.03–04.04.2025 training not stated.
Event photos (2026-10-29): 3–5 best frames per event were taken from the Instagram carousels (1440 px) of @symbol.ngo, @yermilovcentre, @nema_pbt and @serdenky.playback and stored in `apps/main/public/media/events/{slug}/`. Photographers named in the posts: Петро Чекаль, Іван Самойлов, Діана Курганова, Валерія Редько. The 18.10 and 28.10 curator tours share one carousel; its photos are shown on the 18.10 event.
- «Історії різних» main photos (2026-10-29): from the @symbol.ngo post of 30.09.2025, photographer @_cherepanova_photo_ (credited in the post).

## PSD artist biographies (2026-10-29)

Each PSD artist page gained a paragraph about the work shown at «Покажіть свої документи…». Source: the saved pages of the PSD project site in `Сайт_"Покажіть_Своі_Документи"_2025/Митці` (our curatorial texts) and the open-call announcement on Instagram. On 2026-10-29 the team restructured the local `ПСД/Фото/Митці` archive into one folder per artist/work and confirmed it as the source of truth for work galleries: every non-duplicate image is published through `artistPhotos.generated.ts`; exact accidental copies are skipped by the importer. No new facts from the web were added yet; Señora Serpiente still has no biography.
