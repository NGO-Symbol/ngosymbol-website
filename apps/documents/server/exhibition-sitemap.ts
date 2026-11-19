// Sitemap pieces shared by symbol.ngo (apps/main/server/routes/sitemap.xml.ts) and the exhibition site
// (apps/documents/server/routes/sitemap.xml.ts). While the exhibition lives at symbol.ngo/documentsart/ its pages are in the
// sitemap of symbol.ngo; once documentsart.symbol.ngo is switched on (DOCS_SITE) they move to that site's own sitemap.
//
// `lastmod` is a real date, never the build date: the date of the last git commit that touched a page's source files
// (needs the full history — the CI checkouts fetch it). Without history the date is left out rather than invented.
// Images: only <image:loc> is listed. Google deprecated <image:title> and <image:caption> in 2022 and ignores them.
import { execFileSync } from 'node:child_process'
import type { Person, SymbolEvent } from '../../main/app/data/types'
import { artists } from '../app/data/artists'
import { artistPhotoGroups } from '../app/data/artistPhotos.generated'
import { homePhotos } from '../app/data/homePhotos'
import { coverPhoto } from '../app/data/workPhotos'

export interface SitemapImage { src: string; title: string }
export interface Entry { path: string; images?: SitemapImage[]; lastmod?: string; sources?: string[] }

// Dates of the last commit per group of files (cached: many pages share the same sources).
let repoRoot: string | undefined | null
const commitDates = new Map<string, string | undefined>()
export function lastCommit(files: string[]) {
  if (repoRoot === undefined) {
    try { repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { repoRoot = null }
  }
  if (!repoRoot) return undefined
  const key = files.join('|')
  if (!commitDates.has(key)) {
    let date: string | undefined
    try { date = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || undefined } catch { date = undefined }
    commitDates.set(key, date)
  }
  return commitDates.get(key)
}

export const slash = (path: string) => (path === '/' ? '/' : `${path}/`)
export const xml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
export const uniqueImages = (items: (SitemapImage | undefined)[]) => [...new Map(items.filter((item): item is SitemapImage => !!item).map(item => [item.src, item])).values()]

/** One <url> line: `site` is the address the path hangs from, `media` the origin the photographs are served from. */
export function urlLine(entry: Entry, site: string, media: string) {
  const images = (entry.images ?? []).map(image => `<image:image><image:loc>${xml(media + image.src)}</image:loc></image:image>`).join('')
  const lastmod = entry.lastmod ?? (entry.sources ? lastCommit(entry.sources) : undefined)
  return `  <url><loc>${xml(site + slash(entry.path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${images}</url>`
}

export const urlset = (lines: string[]) => [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...lines,
  '</urlset>'
].join('\n')

const mainData = (...names: string[]) => names.map(name => `apps/main/app/data/${name}`)
const docs = 'apps/documents/app'
const exhibitionPages = ['/', '/kontseptsiia', '/mytsi', '/podii', '/komanda', '/presa', ...artists.map(artist => `/mytsi/${artist.slug}`)]
const exhibitionCoAuthors: Record<string, string[]> = { 'dara-sholokh': ['hanna-franyk'] }

// The files a page is made from (its page component and the data it shows), for the date of the last commit.
function exhibitionSources(path: string) {
  const shared = mainData('psd-artists-en.ts', 'alt-en.ts')
  if (path === '/') return [`${docs}/pages/index.vue`, `${docs}/data/homePhotos.ts`, ...mainData('projects.ts', 'projects-en.ts'), ...shared]
  if (path === '/kontseptsiia') return [`${docs}/pages/kontseptsiia.vue`, `${docs}/data/concept.ts`]
  if (path === '/mytsi') return [`${docs}/pages/mytsi/index.vue`, `${docs}/data/artists.ts`, `${docs}/data/workPhotos.ts`, ...shared]
  if (path === '/podii') return [`${docs}/pages/podii.vue`, ...mainData('events.ts', 'events-en.ts')]
  if (path === '/komanda') return [`${docs}/pages/komanda.vue`, ...mainData('people.ts', 'projects.ts')]
  if (path === '/presa') return [`${docs}/pages/presa.vue`, `${docs}/data/press.ts`]
  return [`${docs}/pages/mytsi/[slug].vue`, `${docs}/data/artists.ts`, `${docs}/data/artistPhotos.generated.ts`, ...shared]
}

/**
 * Every page of the exhibition site, Ukrainian and English, with paths from the site's own root (`/`, `/mytsi`, `/en/mytsi`…).
 * Images are associated with the Ukrainian canonical page once; the English mirrors expose the same photographs with
 * translated alt text in their own HTML.
 */
export function exhibitionEntries(people: Person[], events: SymbolEvent[]): Entry[] {
  const personOf = (slug: string) => people.find(person => person.slug === slug)
  const portrait = (slug: string) => {
    const person = personOf(slug)
    return person?.photo ? { src: person.photo, title: person.name } : undefined
  }
  function entry(path: string): Entry {
    if (path === '/') return { path, images: uniqueImages(homePhotos.map(photo => ({ src: photo.src, title: photo.alt }))) }
    if (path === '/mytsi') {
      return {
        path,
        images: uniqueImages(artists.flatMap((artist) => {
          const cover = coverPhoto[artist.slug]
          return [cover ? { src: cover, title: `${artist.name}: ${artist.works.map(work => `«${work.title}»`).join(', ')}` } : undefined,
            ...[artist.slug, ...(exhibitionCoAuthors[artist.slug] ?? [])].map(portrait)]
        }))
      }
    }
    if (path === '/podii') {
      return {
        path,
        images: uniqueImages(events.filter(item => item.project === 'pokazhit-svoi-dokumenty').flatMap(item => (item.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || item.title }))))
      }
    }
    const slug = path.match(/^\/mytsi\/(.+)$/)?.[1]
    const artist = slug ? artists.find(item => item.slug === slug) : undefined
    if (slug && artist) {
      const works = (artistPhotoGroups[slug] ?? []).flatMap(group => group.photos.map(photo => ({ src: photo.src, title: `${artist.name}: «${group.title}»` })))
      return { path, images: uniqueImages([...[slug, ...(exhibitionCoAuthors[slug] ?? [])].map(portrait), ...works]) }
    }
    return { path }
  }
  const ukrainian = exhibitionPages.map(path => ({ ...entry(path), sources: exhibitionSources(path) }))
  const english = exhibitionPages.map(path => ({ path: path === '/' ? '/en' : `/en${path}`, sources: exhibitionSources(path) }))
  return [...ukrainian, ...english]
}
