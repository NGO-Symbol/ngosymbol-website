# 2026-11-06: mobile audit and first shared components on the main site

- `apps/main` still extends only `@symbol/brand`, but now imports single `Sym*` components explicitly and gives them the `--sym-*` values they read through a bridge block in `main.css`. The design-system stylesheets are not loaded there. This is the path for moving the rest over piece by piece.
- Header: `SymSiteHeader` gained `variant="dropdown"` (slots `logo`, `tools`, `trail`, props `autohide`, `openLabel`, `closeLabel`); `apps/main/app/components/SiteHeader.vue` is a thin wrapper. Burger left of the logo, 48 px touch area, page locked while it is open, a tap outside closes it. Search and theme use `SymIconButton` size `s`.
- New `SymSegmented` for every switch (language, list / calendar, tabs): with two options a tap anywhere goes to the other one. New `SymPortraitArt`: a seeded abstract picture from the logo for people without a photo; a person always gets the same picture.
- Tokens `--sym-control-s|m|l` (36, 44, 52 px); `--control-h` on the main site.
- /projects on phones: a sticky bar with the filters button and the years in one row; the panel opens under it, options show counts and a dead end cannot be picked. Desktop layout is unchanged.
- Home and About: the stats block became a chronology by year, counted from the data, on one shared scale for events.
- Footer hierarchy, «Сьогодні» in the calendar, `img { height: auto }` so width/height attributes never change a photo's shape.
- Data: «Харківське море 2026» was counted twice as an event; «9 міст» is now «9 місць» (two of them are regions). Магран Тата is he/him (USER_CONFIRMED).
