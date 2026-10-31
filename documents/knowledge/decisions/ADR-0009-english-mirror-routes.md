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
4. ~~Translation is incremental~~ — superseded on 2026-10-31. Every text is in both languages; see 5.
5. **Full sync, enforced (2026-10-31, `USER_CONFIRMED`: «всі тексти мають бути синхронізованими двома мовами»).**
   - The home page is mirrored too: `/en` is the same `pages/index.vue`, and the separate `pages/en.vue` was removed. Both languages therefore show the same sections and photos on both sites.
   - English for content records lives in `app/data/*-en.ts`: projects, events, people (full bios and CVs), the exhibition catalogue, news and opportunities, and photo alt texts.
   - Breadcrumbs, titles and venues come from shared helpers (`utils/trail.ts`, `utils/l10n.ts`).
   - `scripts/i18n-parity.mjs` (`pnpm i18n:check`, part of `pnpm check`) generates both sites and compares every Ukrainian page with its English mirror. The check fails when the English page has a different number of photos, headings, sections or links (links inside running text excluded), or when it shows Ukrainian in visible text, alt and aria labels, the title or the description.
   - Original-language headlines and outlets are marked `lang="uk"` and skipped.

## Alternatives

- Language stored in local state on the same URLs. Rejected: pages could not be shared or indexed per language.
- Separate hand-written English pages. Rejected: two copies of every page would drift.
