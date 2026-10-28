# 2026-10-29: Playfair Display + Commissioner, logo face for labels

- User picked pair 5 of six measured options (artifact «Пари шрифтів Символу») and variant C («Змішаний») for the logo face.
- `--sym-font-display` = Playfair Display (weight 500), `--sym-font-text` = Commissioner, new `--sym-font-label` = logo face. Roles `.sym-t-label` and new `.sym-t-numeral` use it; SiteHeader links and language switch, SiteFooter headings and SymStat numerals follow.
- Label size raised to 12 → 13 px for the logo face. Display tracking relaxed (Playfair's high contrast).
- Added `docs/foundations/font-selection.md` and `pnpm ds:font` (fontkit): Ukrainian coverage, x-height and width against the logo face.
- Not migrated: `apps/main` and `apps/istoriia-vulytsi` keep their own CSS and old fonts until moved onto `@symbol/ui`.
