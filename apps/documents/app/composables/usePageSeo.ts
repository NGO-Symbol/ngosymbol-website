// What a search result and a link preview show for a page of the exhibition site (published at
// symbol.ngo/documentsart/): the title with the exhibition's name once, the description (≤ 160 characters), Open Graph
// and Twitter copies of both, the share image with its real size (from the image pipeline's manifest; left out when the
// file is not in it), and the structured data of the page as one JSON-LD graph.
import type { MaybeRefOrGetter } from 'vue'
import { imageInfo } from '#symbol/images'

const DOCS = `${SITE}/documentsart`
const DEFAULT_IMAGE = '/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg'

/** Canonical address of an exhibition page (`/mytsi`, `/` …) in the page's language. */
export const docsUrl = (path: string, toEn: boolean) => {
  const base = `${DOCS}${toEn ? '/en' : ''}`
  return path === '/' ? `${base}/` : `${base}${path.replace(/\/+$/, '')}/`
}
export const exhibitionId = (toEn: boolean) => `${docsUrl('/', toEn)}#exhibition`
export const docsSiteId = (toEn: boolean) => `${docsUrl('/', toEn)}#website`

/** The title of <title>: the page's own title and the exhibition's name, unless the title already carries the name. */
export function docsTitle(title: string | undefined, toEn: boolean) {
  const name = toEn ? 'May I See Your Documents…' : 'Покажіть свої документи…'
  if (!title) return toEn ? `${name} · NGO Symbol exhibition` : `${name} · виставка ГО «Символ»`
  return title.includes(name) ? title : `${title} · ${name}`
}

export interface DocsSeo {
  title: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  /** Path of the share image (/media/…); the exhibition view when absent. */
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'profile'
  /** Structured data of the page: nodes added to the graph (the page itself, its breadcrumbs, what it is about). */
  graph?: MaybeRefOrGetter<Record<string, unknown>[]>
}

export function usePageSeo(seo: DocsSeo) {
  const { isEn } = useLang()
  const title = computed(() => docsTitle(toValue(seo.title), isEn.value))
  const description = computed(() => fitDescription(toValue(seo.description) ?? (isEn.value
    ? 'May I See Your Documents…: the document as an artistic phenomenon. 20 artists, YermilovCentre, Kharkiv, 17.10–07.12.2025.'
    : 'Виставка «Покажіть свої документи…»: документ як мистецький феномен. 20 митців, ЄрміловЦентр, Харків, 17.10–07.12.2025.')))
  const image = computed(() => {
    const src = toValue(seo.image) ?? DEFAULT_IMAGE
    const info = imageInfo(src)
    return { url: `${SITE}${src}`, width: info?.width, height: info?.height, alt: toValue(seo.imageAlt) }
  })
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogType: seo.type ?? 'website',
    ogImage: () => image.value.url,
    ogImageWidth: () => image.value.width,
    ogImageHeight: () => image.value.height,
    ogImageAlt: () => image.value.alt,
    twitterImage: () => image.value.url,
    twitterImageAlt: () => image.value.alt
  })
  if (seo.graph) {
    useHead({ script: [{ type: 'application/ld+json', innerHTML: () => ldJson({ '@context': 'https://schema.org', '@graph': toValue(seo.graph!) }) }] })
  }
}

/** BreadcrumbList of an exhibition page: the exhibition's home, then the page. */
export const docsBreadcrumbs = (toEn: boolean, label: string, path: string, parent?: { label: string; path: string }) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: toEn ? 'May I See Your Documents…' : 'Покажіть свої документи…', item: docsUrl('/', toEn) },
    ...(parent ? [{ '@type': 'ListItem', position: 2, name: parent.label, item: docsUrl(parent.path, toEn) }] : []),
    { '@type': 'ListItem', position: parent ? 3 : 2, name: label, item: docsUrl(path, toEn) }
  ]
})

/** The exhibition site as a WebSite node (the exhibition is what it is about, the organisation publishes it). */
export const docsWebsiteNode = (toEn: boolean) => ({
  '@type': 'WebSite',
  '@id': docsSiteId(toEn),
  name: toEn ? 'May I See Your Documents…' : 'Покажіть свої документи…',
  url: docsUrl('/', toEn),
  inLanguage: toEn ? 'en' : 'uk',
  about: { '@id': exhibitionId(toEn) },
  publisher: orgRef(toEn)
})
