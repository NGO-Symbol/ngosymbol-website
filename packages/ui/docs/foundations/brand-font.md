# Brand font (the logo typeface)

> The typeface drawn for the NGO Symbol logo (file name EXDocument, designer Oleksii Chekal). Token `--sym-font-brand` (family `Symbol Brand`), files in `packages/brand/fonts/`. It sets the word «СИМВОЛ» and the organization name; it is not a text face.

## What it is
A constructed display face with capital-like lowercase. Checked 2026-10-28 with fontTools and a Chrome specimen:
- Ukrainian is complete: all letters including `ґ є і ї`, **`ю` / `Ю` present and rendering**, the apostrophe `’`, «ялинки», digits, Latin.
- Missing: `Ъ Ы Э Ё` (not Ukrainian), `№`, `₴`. The browser falls back to the text face for them; do not use the brand font for strings that contain these.
- 25 KB OTF, 13 KB as WOFF2 (`ex-document.woff2`); one weight (400); no italic: never fake bold or italic.

## Where it is used (current decision)
- `SymWordmark` (header, footer, project bar): the word «СИМВОЛ», and the optional subtitle.
- `SymBrand`: the organization name inline in text or headings («ГО <SymBrand>Символ</SymBrand>»).
Wider use (navigation, eyebrows, buttons, big numerals, headings, body) is a design-pass decision: see the options in the artifact «Шрифт Символу» and open-questions.md. Body text in this face reads slowly at 16–20 px; do not use it for paragraphs.

## Rules
- Only for the brand name and the wordmark unless the design pass widens it. Never for long text, never bold/italic, never letter-spaced beyond the component defaults.
- Wrap the name in `SymBrand`; do not set `font-family` in pages.
- Licence: the file carries its author's name; the site is public, so the font is downloadable with the page. Get the author's permission before launch (open-questions.md).
