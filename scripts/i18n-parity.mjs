#!/usr/bin/env node
// Ukrainian ↔ English sync check for both sites (symbol.ngo and the exhibition site), run on the generated pages.
// Every Ukrainian page has an English mirror under /en/… (ADR-0009). For each pair it checks that:
//   1. the English page carries the same content: as many photos, headings, sections and links as the Ukrainian one
//      (a section or photo shown only in one language means the two versions drifted apart);
//   2. the English page has no Ukrainian left in what a visitor reads or a search engine indexes: visible text,
//      image alt texts, aria labels, the page title and description.
// Text that stays in the original Ukrainian on purpose (a press headline, an outlet) is marked lang="uk" in the page
// and skipped; other exceptions go to ALLOWED below, with the reason.
// Usage: node scripts/i18n-parity.mjs [--build] [--verbose]. With --build it generates both sites first
// (that is how `pnpm i18n:check` and `pnpm check` run it); otherwise it reads the existing .output folders.
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const sites = [
  { name: 'symbol.ngo', app: 'apps/main', filter: '@symbol/main' },
  { name: 'documentsart', app: 'apps/documents', filter: '@symbol/documents' }
]
// Cyrillic fragments that may stay on English pages, each with its reason.
const ALLOWED = [
  /^UA$/, // the language switch
  /^Українська$/ // the language name in the switch
]
// Names written with a Cyrillic letter even in English (removed before the check).
const NAMES = ['Ukraїner', 'LesяLesь']
const verbose = process.argv.includes('--verbose')

if (process.argv.includes('--build')) {
  for (const site of sites) {
    execSync(`pnpm --filter ${site.filter} generate`, { cwd: root, stdio: 'ignore', env: { ...process.env, NITRO_PRESET: 'github_pages' } })
  }
}

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) { if (!name.startsWith('_') && name !== 'media' && name !== 'press-kit') yield* pages(path) }
    else if (name === 'index.html') yield path
  }
}

/** The HTML without the elements `skip` picks by tag name and attributes (and their contents). */
function without(html, skip) {
  let out = ''
  let depth = 0
  let last = 0
  for (const match of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g)) {
    const [tag, closing, , attrs, selfClosing] = match
    if (!depth) out += html.slice(last, match.index)
    last = match.index + tag.length
    const isVoid = selfClosing || /^(img|br|hr|input|meta|link|source|wbr)$/i.test(match[2])
    if (depth) { if (closing) depth--; else if (!isVoid) depth++; continue }
    if (!closing && !isVoid && skip(match[2].toLowerCase(), attrs)) { depth = 1; continue }
    out += tag
  }
  return out + (depth ? '' : html.slice(last))
}

function read(file) {
  const full = readFileSync(file, 'utf8')
  const html = without(full, (tag, attrs) => tag !== 'html' && /\slang="uk"/.test(attrs))
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<noscript[\s\S]*?<\/noscript>/g, '')
  // Shape: links inside running text (a biography's inline references) are style, not content, so they are not counted.
  const page = without(full.replace(/<script[\s\S]*?<\/script>/g, ''), (tag, attrs) => /\sclass="[^"]*\brich-text\b/.test(attrs))
  const main = page.match(/<main[\s\S]*<\/main>/)?.[0] ?? page
  const count = pattern => (main.match(pattern) ?? []).length
  const attrs = [...body.matchAll(/\s(?:alt|aria-label|title|placeholder)="([^"]*)"/g)].map(match => match[1])
  const meta = [
    html.match(/<title>([^<]*)<\/title>/)?.[1],
    ...[...html.matchAll(/<meta[^>]+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]+content="([^"]*)"/g)].map(match => match[1])
  ]
  const text = body.replace(/<[^>]+>/g, '\n').split('\n')
  return {
    shape: { photos: count(/<img\b/g), headings: count(/<h[1-3]\b/g), sections: count(/<section\b/g), links: count(/<a\b/g) },
    strings: [...text, ...attrs, ...meta].map(value => (value ?? '').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean)
  }
}

const cyrillic = /[А-Яа-яЄєІіЇїҐґ]/
let problems = 0
for (const site of sites) {
  const out = join(root, site.app, '.output/public')
  if (!existsSync(out)) { console.error(`✗ ${site.name}: no generated pages in ${relative(root, out)} (run with --build)`); problems++; continue }
  const all = [...pages(out)].map(file => relative(out, file).replace(/index\.html$/, ''))
  const ua = all.filter(path => !path.startsWith('en/'))
  for (const path of ua) {
    const enPath = path === '' ? 'en/' : `en/${path}`
    const label = `${site.name} /${path}`
    if (/http-equiv="refresh"/.test(readFileSync(join(out, path, 'index.html'), 'utf8'))) continue // a redirect, not a page
    if (!all.includes(enPath)) { console.log(`✗ ${label}: no English page /${enPath}`); problems++; continue }
    const a = read(join(out, path, 'index.html'))
    const b = read(join(out, enPath, 'index.html'))
    const diff = Object.keys(a.shape).filter(key => a.shape[key] !== b.shape[key]).map(key => `${key} ${a.shape[key]} ↔ ${b.shape[key]}`)
    if (diff.length) { console.log(`✗ ${label}: different content in English — ${diff.join(', ')}`); problems++ }
    const leftovers = [...new Set(b.strings.filter(value => cyrillic.test(NAMES.reduce((text, name) => text.replaceAll(name, ''), value)) && !ALLOWED.some(rule => rule.test(value))))]
    if (leftovers.length) {
      console.log(`✗ ${label}: Ukrainian text on the English page (${leftovers.length})${verbose ? '' : ` — e.g. «${leftovers[0].slice(0, 80)}»`}`)
      if (verbose) for (const value of leftovers.slice(0, 40)) console.log(`    «${value.slice(0, 120)}»`)
      problems++
    }
  }
  if (verbose) console.log(`${site.name}: ${ua.length} page pairs checked`)
}
if (problems) { console.log(`\ni18n: ${problems} problem(s). Every text must exist in Ukrainian and English (see documents/knowledge, ADR-0009).`); process.exit(1) }
console.log('i18n: Ukrainian and English pages match on both sites')
