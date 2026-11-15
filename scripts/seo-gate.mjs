#!/usr/bin/env node
// SEO gate, part of `pnpm check`: runs on the generated sites (after `pnpm i18n:check` has generated them, or after
// `pnpm --filter @symbol/main generate` and `pnpm --filter @symbol/documents generate`). Every URL of the generated
// sitemap must exist in the output, be indexable (no noindex, no meta refresh), point its canonical at itself, have a
// title and a description within limits, Open Graph title/description/image, no title shared with another page, and
// JSON-LD that parses. The 404 page must be the site's own error page, not indexable. See scripts/lib/seo-gate.mjs.
//
// The exhibition site is published inside the main site at /documentsart/ (deploy.yml copies it there), so a sitemap URL
// under /documentsart/ is read from the exhibition site's output.
// Usage: node scripts/seo-gate.mjs [mainOutputDir] [documentsOutputDir]. SEO_GATE=off skips it (never in CI).
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LIMITS, canonicalOf, checkSite, metaContent, outputFile, sitemapLastmods, sitemapUrls, titleOf } from './lib/seo-gate.mjs'

if (process.env.SEO_GATE === 'off') {
  console.warn('SEO gate skipped (SEO_GATE=off)')
  process.exit(0)
}
const root = fileURLToPath(new URL('..', import.meta.url))
const mainDir = process.argv[2] ?? join(root, 'apps/main/.output/public')
const docsDir = process.argv[3] ?? join(root, 'apps/documents/.output/public')
for (const dir of [mainDir, docsDir]) {
  if (!existsSync(dir)) { console.error(`SEO gate: no generated site in ${dir} (run pnpm i18n:check or the generate commands first)`); process.exit(1) }
}
const read = (file, dir) => { const path = join(dir, file); return existsSync(path) ? readFileSync(path, 'utf8') : null }
const readUrl = (url) => {
  const file = outputFile(url)
  return file.startsWith('documentsart/') || file === 'documentsart/index.html'
    ? read(file.replace(/^documentsart\//, ''), docsDir)
    : read(file, mainDir)
}

const sitemap = read('sitemap.xml', mainDir)
const urls = sitemap ? sitemapUrls(sitemap) : []
const problems = []
if (!urls.length) problems.push({ url: 'sitemap.xml', problem: 'the sitemap is missing or lists no URLs' })
if (sitemap?.includes('image:title')) problems.push({ url: 'sitemap.xml', problem: 'has <image:title>, which Google ignores' })
const mods = sitemapLastmods(sitemap ?? '')
for (const { url, lastmod } of mods) if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) problems.push({ url, problem: `lastmod "${lastmod}" is not a date` })

const result = checkSite(urls, readUrl)
problems.push(...result.problems)

// The 404 page: the site's own page (app/error.vue), a title of its own, noindex.
for (const [name, dir] of [['symbol.ngo', mainDir], ['documentsart', docsDir]]) {
  const html = read('404.html', dir)
  if (!html) { problems.push({ url: `${name} /404.html`, problem: 'the 404 page was not generated' }); continue }
  if (!/noindex/i.test(metaContent(html, 'robots') ?? '')) problems.push({ url: `${name} /404.html`, problem: 'the 404 page is not noindex' })
  if (!/(не знайдено|not found)/i.test(titleOf(html) ?? '')) problems.push({ url: `${name} /404.html`, problem: `the 404 page has the title «${titleOf(html)}», not its own error page` })
  if (canonicalOf(html)) problems.push({ url: `${name} /404.html`, problem: 'the 404 page has a canonical' })
}

for (const { url, problem } of result.warnings) console.warn(`  note ${url}: ${problem}`)
if (problems.length) {
  console.error(`SEO gate: ${problems.length} problem(s) in ${urls.length} sitemap pages`)
  for (const { url, problem } of problems) console.error(`  ${url}: ${problem}`)
  process.exit(1)
}
const dated = mods.filter(({ lastmod }) => lastmod).length
console.log(`SEO gate: ${urls.length} sitemap pages are indexable, self-canonical, titled (≤ ${LIMITS.titleMax}), described (${LIMITS.descriptionMin}–${LIMITS.descriptionMax}), with valid JSON-LD; ${dated} have lastmod; 404 pages are noindex`)
