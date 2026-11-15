// One call per page for everything a search result and a link preview show: the title (with the site name once),
// the description (≤ 160 characters), Open Graph and Twitter copies of both, and the share image with its real size.
// A page without its own image gets the default card (1200 × 630). Sizes come from the image pipeline's manifest
// (data/images.json); when a file is not in it the width and height are left out rather than guessed.
import type { MaybeRefOrGetter } from 'vue'
import { imageInfo } from '~/data/images'

export interface PageSeo {
  /** The page's own title, without the site name (it is added). The home page passes its complete title. */
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Path of the share image (/media/…); the default card when absent. */
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  /** `profile` for a person's page. */
  type?: 'website' | 'profile'
  /** The page must stay out of search (the 404 page). */
  noindex?: boolean
}

export function usePageSeo(seo: PageSeo) {
  const { isEn } = useLang()
  const title = computed(() => siteTitle(toValue(seo.title), isEn.value))
  const description = computed(() => fitDescription(toValue(seo.description)))
  const image = computed(() => {
    const src = toValue(seo.image)
    const info = imageInfo(src)
    if (!src) return { url: `${SITE}/og-default.jpg`, width: 1200, height: 630, alt: undefined as string | undefined }
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
    twitterImageAlt: () => image.value.alt,
    ...(seo.noindex ? { robots: 'noindex, follow' } : {})
  })
}
