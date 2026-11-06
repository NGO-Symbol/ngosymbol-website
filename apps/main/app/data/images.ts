// Responsive data for the photographs (scripts/optimize-images.mjs writes images.json: width, height, average colour,
// AVIF variant widths). Components never build image paths by hand: they ask for `imageInfo(src)`.
import manifest from './images.json'

type Entry = [width: number, height: number, colour: string, widths: number[]]
const photos = manifest as unknown as Record<string, Entry>

export interface ImageInfo {
  width: number
  height: number
  /** Average colour, shown behind the photo until it has loaded. */
  colour: string
  /** `srcset` of the AVIF variants. */
  srcset: string
}

/** The variant of /media/a/b.jpg at a width: /media/_opt/a/b-<w>.avif (the first path segment stays in front). */
export function variantUrl(src: string, width: number) {
  return src.replace(/^(\/[^/]+)\/(.+)\.[^./]+$/, `$1/_opt/$2-${width}.avif`)
}

/** What is known about a /media/… or /works/… photograph, or undefined for anything else. */
export function imageInfo(src?: string): ImageInfo | undefined {
  const entry = src ? photos[src] : undefined
  if (!src || !entry) return undefined
  const [width, height, colour, widths] = entry
  return { width, height, colour: `#${colour}`, srcset: widths.map(w => `${variantUrl(src, w)} ${w}w`).join(', ') }
}
