// Address of the exhibition site «Покажіть свої документи…» (apps/documents), one value for both apps.
// Today it is published inside symbol.ngo at /documentsart/. When documentsart.symbol.ngo is connected, the build sets
// DOCS_SITE_URL=https://documentsart.symbol.ngo (deploy.yml, repository variable DOCS_LIVE) and every canonical,
// sitemap, link and redirect follows. nuxt.config of each app puts the value in as __DOCS_SITE__ (vite define and
// nitro replace); a plain Node script that imports this file gets the default.
declare const __DOCS_SITE__: string | undefined

export const DOCS_SITE: string = (typeof __DOCS_SITE__ === 'string' && __DOCS_SITE__) || 'https://symbol.ngo/documentsart'

/** True when the exhibition site has its own address (documentsart.symbol.ngo), not a folder of symbol.ngo. */
export const docsOnOwnHost = !DOCS_SITE.startsWith('https://symbol.ngo/')
