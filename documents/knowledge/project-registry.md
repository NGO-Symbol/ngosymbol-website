# Project registry

This is the current planning registry, not a substitute for verified project pages. Statuses and web types marked `PROPOSED` require confirmation before production content is published.

| Project | Period | Status | Geography | Current web type | Evidence notes |
| --- | --- | --- | --- | --- | --- |
| Історія моєї вулиці | 2026–2027 | launching | Kharkiv | autonomous subdomain | Grant won; QR visitors; `USER_CONFIRMED` |
| Голоси у русі | 2026 | ongoing | Zakarpattia | small page initially | Playback theatre; `USER_CONFIRMED`; web type `PROPOSED` |
| Покажіть свої документи… | 2025 | completed | Kharkiv | main-site page; subsite or migration open | YermilovCentre, 2025-10-17 – 2025-12-07; 20 artists; Grant of the President of Ukraine for young artists and Grynyov Art Foundation (`EXTRACTED`, portfolio 2026); former site documentsart.com is disconnected, saved copy exists locally |
| Тренінги mhGAP на Київщині | 2025 | completed | Kyiv region | small page | `USER_CONFIRMED` |
| Історії різних | 2025 | completed | Kyiv | single-event project | Playback performance, Арсенал ідей, 2025-09-20 (`EXTRACTED`, portfolio 2026) |
| Збирач конвалій | 2023 | completed | Kharkiv (confirm) | main-site page | Film about KhSPh photographer Oleksandr Suprun; best cinematography award from Media Development Foundation (`EXTRACTED`, presentation 2024) |
| 2, 10, 300 років потому | 2024 | completed | Balassagyarmat, Hungary | single-event project | Open-air exhibition, 2024-04-26 – 2024-04-28, curator Ганна Франик (`EXTRACTED`, presentation 2024) |
| Харківське море | 2024, 2026 | confirm | Kharkiv | main-site page with role `partner` | Symbol was a partner, not organizer; `USER_CONFIRMED`. Drive folders exist for 2024 and 2026 (`EXTRACTED`) |
| Ті, що побачили світ (Мілан) | 2026 | confirm | Milan | not published | Drive folder exists; public status needs confirmation |
| Відкрита книга: поліаморія | 2024 | confirm | confirm | not published | Drive folder exists; public status needs confirmation |

## Non-project items

- SH+ is a potential format, not completed work.
- Psychological first aid is a potential format, not completed work.

## Code registry rule

Only publish a project in `apps/main/app/data/projects.ts` when minimum public metadata is available. Every published project has a `slug` and a main-site page; projects with a subsite also set `subsiteUrl` (ADR-0006).

