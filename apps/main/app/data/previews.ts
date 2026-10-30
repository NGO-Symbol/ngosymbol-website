// Light AVIF previews of the photographs (scripts/make-previews.mjs → public/media/previews). Galleries, cards and
// portraits show the preview; a photo without one keeps its original file.
import ready from '../../public/media/previews/previews.json'

const available = new Set<string>(ready)

/** The AVIF preview of a /media/… photo, or undefined when there is none. */
export function previewOf(src?: string) {
  return src && available.has(src) ? src.replace(/^\/media\//, '/media/previews/').replace(/\.(jpe?g|png)$/i, '.avif') : undefined
}
