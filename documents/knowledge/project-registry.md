# Project registry

This is the current planning registry, not a substitute for verified project pages. Statuses and web types marked `PROPOSED` require confirmation before production content is published.

| Project | Period | Status | Geography | Current web type | Evidence notes |
| --- | --- | --- | --- | --- | --- |
| Історія моєї вулиці | 2026–2027 | launching | Kharkiv | autonomous subdomain | Grant won; QR visitors; `USER_CONFIRMED` |
| Голоси у русі | 2026 | ongoing | Zakarpattia | small page initially | Playback theatre «Серденьки»; supported by «Culture Helps Solidarity / Культура допомагає: Солідарність», co-funded by the European Union (`USER_CONFIRMED` 2026-10-29: not credited as Creative Europe); programme implemented by European Cultural Foundation, Інша Освіта, zusa, VETERANKA; venue partner art space «Станція Уж» (= Uzh Station), Uzhhorod (credits from @serdenky.playback posts, 2026); web type `PROPOSED` |
| Покажіть свої документи… | 2025 | completed | Kharkiv | main-site page with project identity (font EXDocument by Олексій Чекаль, poster as card cover); project site published at `symbol.ngo/documentsart/` (built by the main deploy) until `documentsart.symbol.ngo` is connected (`apps/documents`, `USER_CONFIRMED` 2026-10-29): concept, artists (linked to symbol.ngo person pages), events and team, rebuilt from the saved Wix site; reached from the stamp QR code and the «Перейти на сайт проєкту» button; goes live once the deploy repository and DNS exist | Curators Петро Чекаль and Юрій Рассоха, coordinator Наталія Іванова, manager Ганна Франик; organizers ГО «Символ», ЄрміловЦентр, Karazin University (`EXTRACTED`, banner brief and yermilovcentre.org/announcements/281). Event programme: opening 17.10, tours 18.10 and 2.11, ZMINA lecture 8.11 and panel 15.11, artist talk 9.11, playback 23.11, panel «Бюрократія в мистецьких практиках» 29.11 (November from the programme document; Drive photo folders confirm ZMINA, artist talk with Андрій Скрипка, playback). | YermilovCentre, 2025-10-17 – 2025-12-07; 20 artists; Grant of the President of Ukraine for young artists and Grynyov Art Foundation (`EXTRACTED`, portfolio 2026); former site documentsart.com is disconnected, saved copy exists locally |
| Тренінги mhGAP на Київщині | 2025 | completed | Kyiv region | small page | `USER_CONFIRMED` |
| Історії різних | 2025 | completed | Kyiv | single-event project | Playback performance, Арсенал ідей, 2025-09-20 (`EXTRACTED`, portfolio 2026) |
| Збирач конвалій | 2023 | completed | Kharkiv (confirm) | main-site page | Film about KhSPh photographer Oleksandr Suprun; best cinematography award from Media Development Foundation (`EXTRACTED`, presentation 2024) |
| 2, 10, 300 років потому | 2024 | completed | Balassagyarmat, Hungary | single-event project | Open-air exhibition, 2024-04-26 – 2024-04-28, curator Ганна Франик (= Аліна Войтюк); Петро Чекаль co-author; artists Алла Пасічник, Олена Мордик, Магран Тата, Петро Чекаль, Руслана Ключко, Юрій Рассоха (`EXTRACTED`, Drive «2, 10, 300 років потому/exhibition/.List of artists» and «.Curator`s text»); within ESC volunteering with Symbol |
| Харківське море | 2024, 2026 | confirm | Kharkiv | main-site page with role `partner` | Symbol was a partner, not organizer; `USER_CONFIRMED`. Drive folders exist for 2024 and 2026 (`EXTRACTED`). Event «Харківське море 2026» on the site with dates 14–23.08.2026 taken from the festival photo folders (`INFERRED`, confirm with organizers) |
| Ті, хто побачили світ | 2026 | completed | Milan, Italy | single-event project | Photo exhibition by Петро Чекаль and Юрій Рассоха, 20 A2 prints, Festival of Ukrainian Book in Milan, Villa Scheibler, 2026-05-30 – 2026-05-31, invited by Ucraina Più – Milano APS (`EXTRACTED`, invitation 09.03.2026, poster); travel grant budget on Drive. `USER_CONFIRMED` that the Milan exhibition belongs on the site. |
| Відкрита книга: поліаморія | 2024 | confirm | confirm | not published | Drive folder exists; public status needs confirmation |

## Non-project items

- SH+ is a potential format, not completed work.
- Psychological first aid is a potential format, not completed work.

## Code registry rule

Only publish a project in `apps/main/app/data/projects.ts` when minimum public metadata is available. Every published project has a `slug` and a main-site page; projects with a subsite also set `subsiteUrl` (ADR-0008).

