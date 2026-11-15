// What every page tells search engines and link previews about itself: the title with the site name, canonical
// addresses, the organisation node that structured data refers to. Pure helpers (JSON-LD escaping, Kyiv dates and
// description fitting, the organisation's ids live in the brand layer: packages/brand/app/utils/seo.ts).
import type { Photo } from '~/data/types'
import { altIn } from '~/data/alt-en'

/**
 * The text of <title>: the page's own title and the site name (« · ГО «Символ»»). A title that already carries the
 * site name — it ends with it, or starts with it as the home page does («ГО «Символ» — …») — is left as it is, so the
 * name is never written twice.
 */
export function siteTitle(title: string | undefined, toEn: boolean) {
  const brand = brandOf(toEn)
  if (!title) return brand
  if (title === brand || title.endsWith(` · ${brand}`) || title.startsWith(`${brand} —`)) return title
  return `${title} · ${brand}`
}

/** Photographs as schema.org ImageObjects with the page's language in the caption. */
export const imageObjects = (photos: (Photo | { src: string; alt?: string })[], toEn: boolean, fallbackCaption: string) =>
  photos.map(photo => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE}${photo.src}`,
    url: `${SITE}${photo.src}`,
    caption: altIn(photo.alt ?? '', toEn) || fallbackCaption
  }))
