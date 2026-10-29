# ADR-0009: English mirror routes under /en

- Status: Accepted
- Date: 2026-10-29
- Resolves: the English URL pattern in [`../open-questions.md`](../open-questions.md)

## Context

The team asked that switching between Ukrainian and English keeps the visitor on the same page instead of sending them to the home page. `USER_CONFIRMED`, conversation 2026-10-29. English is the required second locale; the full translation of every text will take time.

## Decision

1. **Every Ukrainian page has an English mirror at `/en` + the same path** (`/projects/x` ↔ `/en/projects/x`). The mirror routes are generated in `apps/main/nuxt.config.ts` (`pages:extend`), so no page is duplicated. `/en` itself stays the English home page (`pages/en.vue`).
2. **The UA/EN switch links to the same page in the other language** (`switchLangPath` in `app/composables/useLang.ts`).
3. **English is sticky**: from an English page, internal links written as Ukrainian paths open the English mirror (`app/middleware/lang.global.ts`). Only the switch leaves English.
4. **Translation is incremental.** Shared interface (header, footer, breadcrumbs, search) and project titles and summaries (`app/data/projects-en.ts`) are in English. Pages whose texts are not translated yet show a short English note (`EnNotice`). The `lang` attribute and title template follow the URL.

## Alternatives

- Language stored in local state on the same URLs. Rejected: pages could not be shared or indexed per language.
- Separate hand-written English pages. Rejected: two copies of every page would drift.
