// What every page listed in the sitemap must look like in the generated output. Pure functions: the CLI
// (scripts/seo-gate.mjs) feeds them the built HTML, the tests of the idea are the same in any project (ported from the
// band site's gate and extended with title, description, Open Graph and JSON-LD rules).

export const LIMITS = { titleMax: 70, titleWarn: 60, descriptionMin: 30, descriptionMax: 160 }

const PATH = /^https?:\/\/[^/]+(\/.*)?$/

/** The URLs of a sitemap document. */
export const sitemapUrls = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])

/** `<lastmod>` values of a sitemap, with the URL they belong to. */
export const sitemapLastmods = (xml) =>
  [...xml.matchAll(/<url>\s*<loc>\s*([^<\s]+)\s*<\/loc>(?:\s*<lastmod>\s*([^<\s]+)\s*<\/lastmod>)?/g)].map((m) => ({ url: m[1], lastmod: m[2] }))

/** `/` → `index.html`, `/projects/x/` → `projects/x/index.html`. */
export function outputFile(url) {
  const path = (PATH.exec(url)?.[1] ?? '/').replace(/^\/+|\/+$/g, '')
  return path ? `${path}/index.html` : 'index.html'
}

const decode = (text) =>
  text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

const attr = (tag, name) => {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag)
  return match ? decode(match[1] ?? match[2]) : undefined
}
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => m[0])

export const canonicalOf = (html) => {
  const link = tags(html, 'link').find((tag) => attr(tag, 'rel') === 'canonical')
  return link && attr(link, 'href')
}
export const metaContent = (html, key) => {
  const meta = tags(html, 'meta').find((tag) => attr(tag, 'name') === key || attr(tag, 'property') === key)
  return meta && attr(meta, 'content')
}
export const titleOf = (html) => {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)
  return match ? decode(match[1]).trim() : undefined
}
const isNoindex = (html) =>
  tags(html, 'meta').some((tag) => /^(robots|googlebot)$/i.test(attr(tag, 'name') ?? '') && /noindex/i.test(attr(tag, 'content') ?? ''))

/** The raw text of every JSON-LD block. */
export const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])

/** Why one page of the sitemap would hurt the site in search, as a list of messages (empty: the page is fine). */
export function pageProblems(url, html) {
  if (html === null || html === undefined) return ['the page is missing from the build']
  const problems = []
  if (isNoindex(html)) problems.push('the page is noindex')
  if (/http-equiv\s*=\s*["']?refresh/i.test(html)) problems.push('the page redirects with a meta refresh')
  const canonical = canonicalOf(html)
  if (!canonical) problems.push('no canonical')
  else if (canonical !== url) problems.push(`the canonical is ${canonical}, not the page itself`)

  const title = titleOf(html)
  if (!title) problems.push('no title')
  else if (title.length > LIMITS.titleMax) problems.push(`the title is ${title.length} characters (max ${LIMITS.titleMax}): «${title}»`)
  const description = metaContent(html, 'description')
  if (!description) problems.push('no description')
  else if (description.length < LIMITS.descriptionMin) problems.push(`the description is only ${description.length} characters`)
  else if (description.length > LIMITS.descriptionMax) problems.push(`the description is ${description.length} characters (max ${LIMITS.descriptionMax})`)
  if (!metaContent(html, 'og:title')) problems.push('no og:title')
  if (!metaContent(html, 'og:description')) problems.push('no og:description')
  if (!metaContent(html, 'og:image')) problems.push('no og:image')

  jsonLdBlocks(html).forEach((raw, index) => {
    try {
      JSON.parse(raw)
    } catch (error) {
      problems.push(`JSON-LD block ${index + 1} is not valid JSON (${error.message})`)
    }
    if (raw.includes('<')) problems.push(`JSON-LD block ${index + 1} has an unescaped "<" (write it as \\u003c)`)
  })
  return problems
}

/** Every page of the sitemap: its problems, plus the problems only the whole set shows (duplicate titles). */
export function checkSite(urls, read) {
  const problems = []
  const warnings = []
  const titles = new Map()
  for (const url of urls) {
    const html = read(url)
    for (const problem of pageProblems(url, html)) problems.push({ url, problem })
    const title = html ? titleOf(html) : undefined
    if (title) {
      titles.set(title, [...(titles.get(title) ?? []), url])
      if (title.length > LIMITS.titleWarn && title.length <= LIMITS.titleMax) warnings.push({ url, problem: `the title is ${title.length} characters (search results show about ${LIMITS.titleWarn}): «${title}»` })
    }
  }
  for (const [title, pages] of titles) {
    if (pages.length > 1) problems.push({ url: pages[0], problem: `${pages.length} pages share the title «${title}» (${pages.slice(1).join(', ')})` })
  }
  return { problems, warnings }
}
