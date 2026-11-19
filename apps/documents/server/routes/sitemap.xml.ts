// Sitemap of the exhibition site on its own address (documentsart.symbol.ngo, prerendered). While the site is a folder
// of symbol.ngo (/documentsart/), its pages are in the sitemap of symbol.ngo instead and deploy.yml does not copy this
// file there. Pages, dates and photographs: ../exhibition-sitemap.ts (shared with symbol.ngo).
import { DOCS_SITE } from '#symbol/docs-site'
import { events } from '#symbol/events'
import { people } from '#symbol/people'
import { exhibitionEntries, urlLine, urlset } from '../exhibition-sitemap'

export default defineEventHandler((event) => {
  // The photographs are served by the exhibition site itself (nuxt.config publicAssets), on the same address.
  const media = new URL(DOCS_SITE).origin
  const body = urlset(exhibitionEntries(people, events).map(entry => urlLine(entry, DOCS_SITE, media)))
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
