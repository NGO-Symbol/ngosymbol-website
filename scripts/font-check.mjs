#!/usr/bin/env node
// Checks a candidate typeface against the Symbol rules (packages/ui/docs/foundations/font-selection.md).
// Usage: node scripts/font-check.mjs <font.ttf|otf|woff|woff2> [more files...]   (variable fonts are measured at their default instance)
import { openSync } from 'fontkit'

// the logo face (EXDocument): the pairing is judged against these
const BRAND = { xHeight: 0.5, avgLowercase: 0.511 }
// every Ukrainian letter incl. Є І Ї Ґ and the apostrophe; a missing one rejects the font
const UK = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя'
const LOWER = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'

for (const file of process.argv.slice(2)) {
  let font = openSync(file)
  if (font.fonts) font = font.fonts[0]
  const em = font.unitsPerEm
  const name = font.fullName ?? file
  const glyph = (ch) => font.glyphForCodePoint(ch.codePointAt(0))
  const hasApostrophe = font.hasGlyphForCodePoint(0x2019)
  const missing = [...UK].filter((ch) => !font.hasGlyphForCodePoint(ch.codePointAt(0)))
  const x = (font['OS/2']?.xHeight || glyph('х').bbox.maxY) / em
  const avg = [...LOWER].reduce((s, ch) => s + glyph(ch).advanceWidth, 0) / LOWER.length / em
  const dx = ((x - BRAND.xHeight) / BRAND.xHeight) * 100
  const dw = ((avg - BRAND.avgLowercase) / BRAND.avgLowercase) * 100
  console.log(`${name}`)
  console.log(`  Ukrainian letters: ${missing.length ? `MISSING ${missing.join(' ')}  -> reject` : 'all present'}`)
  if (!hasApostrophe) console.log('  ’ (apostrophe) missing: expected in a cyrillic-only subset file (fontsource keeps it in the latin subset); check the full family')
  console.log(`  x-height ${x.toFixed(3)} em (${dx >= 0 ? '+' : ''}${dx.toFixed(0)} % vs brand)  ${Math.abs(dx) <= 5 ? 'ok' : 'outside ±5 %: text will look bigger/smaller than the logo'}`)
  console.log(`  avg lowercase width ${avg.toFixed(3)} em (${dw >= 0 ? '+' : ''}${dw.toFixed(0)} % vs brand)  ${Math.abs(dw) <= 15 ? 'ok' : 'much wider/narrower than the logo: advisory, judge it on a mock'}`)
}
