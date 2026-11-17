// Sitemap for search engines (prerendered). Lists every public page built from the content records, in Ukrainian
// and English (/en/…), the exhibition site (/documentsart/…), and the photographs on each page with their subject —
// so a portrait or a project photo can be found in image search under the person's or project's name.
//
// `lastmod` is a real date, never the build date: events and news use the date in their content; every other page uses
// the date of the last git commit that touched its source file or its data (needs the full history — the CI checkouts
// fetch it). Without history (a shallow clone, no git) the date is left out rather than invented.
// Images: only <image:loc> is listed. Google deprecated <image:title> and <image:caption> in 2022 and ignores them
// (https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions); the descriptive text lives in
// each page's alt text and structured data.
import { execFileSync } from 'node:child_process'
import { artists } from '../../../documents/app/data/artists'
import { artistPhotoGroups } from '../../../documents/app/data/artistPhotos.generated'
import { homePhotos } from '../../../documents/app/data/homePhotos'
import { coverPhoto } from '../../../documents/app/data/workPhotos'
import { events, news, people, projects } from '../../app/utils/content'

const base = 'https://symbol.ngo'
const staticPages = ['/', '/projects', '/events', '/opportunities', '/people', '/about', '/support', '/contact', '/news', '/press', '/privacy']
const exhibitionPages = ['/', '/kontseptsiia', '/mytsi', '/podii', '/komanda', '/presa', ...artists.map(artist => `/mytsi/${artist.slug}`)]

interface SitemapImage { src: string; title: string }
interface Entry { path: string; images?: SitemapImage[]; lastmod?: string; sources?: string[] }

// Dates of the last commit per group of files (cached: many pages share the same sources).
let repoRoot: string | undefined | null
const commitDates = new Map<string, string | undefined>()
function lastCommit(files: string[]) {
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
const mainDir = 'apps/main/app'
const docs = 'apps/documents/app'
const dataFiles = (...names: string[]) => names.map(name => `${mainDir}/data/${name}`)
const day = (iso: string) => iso.slice(0, 10)

// The files a page is made from (its page component and the data it shows), for the date of the last commit.
const pageSources: Record<string, string[]> = {
  '/': [`${mainDir}/pages/index.vue`, ...dataFiles('news.ts', 'events.ts', 'projects.ts', 'highlights.ts')],
  '/projects': [`${mainDir}/pages/projects/index.vue`, ...dataFiles('projects.ts', 'projects-en.ts')],
  '/events': [`${mainDir}/pages/events/index.vue`, ...dataFiles('events.ts', 'events-en.ts')],
  '/opportunities': [`${mainDir}/pages/opportunities.vue`, ...dataFiles('opportunities.ts', 'editorial-en.ts')],
  '/people': [`${mainDir}/pages/people/index.vue`, ...dataFiles('people.ts', 'people-en.ts')],
  '/about': [`${mainDir}/pages/about.vue`, ...dataFiles('people.ts', 'people-en.ts', 'organizations.ts', 'press.ts')],
  '/support': [`${mainDir}/pages/support.vue`],
  '/contact': [`${mainDir}/pages/contact.vue`, ...dataFiles('social.ts')],
  '/news': [`${mainDir}/pages/news.vue`],
  '/press': [`${mainDir}/pages/press.vue`, ...dataFiles('press.ts')],
  '/privacy': [`${mainDir}/pages/privacy.vue`, `${mainDir}/data/analytics.ts`]
}
const exhibitionSources = (path: string) => {
  const shared = [...dataFiles('psd-artists-en.ts', 'alt-en.ts')]
  if (path === '/') return [`${docs}/pages/index.vue`, `${docs}/data/homePhotos.ts`, ...dataFiles('projects.ts', 'projects-en.ts'), ...shared]
  if (path === '/kontseptsiia') return [`${docs}/pages/kontseptsiia.vue`, `${docs}/data/concept.ts`]
  if (path === '/mytsi') return [`${docs}/pages/mytsi/index.vue`, `${docs}/data/artists.ts`, `${docs}/data/workPhotos.ts`, ...shared]
  if (path === '/podii') return [`${docs}/pages/podii.vue`, ...dataFiles('events.ts', 'events-en.ts')]
  if (path === '/komanda') return [`${docs}/pages/komanda.vue`, ...dataFiles('people.ts', 'projects.ts')]
  if (path === '/presa') return [`${docs}/pages/presa.vue`, `${docs}/data/press.ts`]
  return [`${docs}/pages/mytsi/[slug].vue`, `${docs}/data/artists.ts`, `${docs}/data/artistPhotos.generated.ts`, ...shared]
}

const slash = (path: string) => (path === '/' ? '/' : `${path}/`)
const xml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const uniqueImages = (items: (SitemapImage | undefined)[]) => [...new Map(items.filter((item): item is SitemapImage => !!item).map(item => [item.src, item])).values()]
const personOf = (slug: string) => people.find(person => person.slug === slug)
const exhibitionCoAuthors: Record<string, string[]> = { 'dara-sholokh': ['hanna-franyk'] }

export default defineEventHandler((event) => {
  const latest = news.map(item => item.date).sort().at(-1)
  const staticImages: Record<string, SitemapImage[]> = {
    '/people': uniqueImages(people.filter(person => person.hasPage !== false).map(person => person.photo ? { src: person.photo, title: person.name } : undefined)),
    '/about': uniqueImages(people.filter(person => person.team).map(person => person.photo ? { src: person.photo, title: person.name } : undefined)),
    '/projects': uniqueImages(projects.map(project => {
      const src = project.poster ?? (project.cardCover || undefined) ?? project.gallery?.[0]?.src ?? project.backdrop
      return src ? { src, title: project.title } : undefined
    })),
    '/events': uniqueImages(events.map(item => {
      const project = projects.find(project => project.slug === item.project)
      const src = item.gallery?.[0]?.src ?? project?.poster ?? project?.gallery?.[0]?.src
      return src ? { src, title: item.title } : undefined
    }))
  }
  const mainEntries: Entry[] = [
    ...staticPages.map(path => ({ path, images: staticImages[path], lastmod: path === '/news' ? latest : undefined, sources: pageSources[path] })),
    ...projects.map(project => ({
      path: `/projects/${project.slug}`,
      sources: [`${mainDir}/pages/projects/[slug].vue`, ...dataFiles('projects.ts', 'projects-en.ts')],
      images: uniqueImages([
        project.poster ? { src: project.poster, title: project.title } : undefined,
        project.backdrop ? { src: project.backdrop, title: project.title } : undefined,
        ...(project.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || project.title }))
      ])
    })),
    ...events.map(item => ({ path: `/events/${item.slug}`, lastmod: day(item.end ?? item.start), images: uniqueImages((item.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || item.title }))) })),
    ...people.filter(person => person.hasPage !== false).map(person => ({
      path: `/people/${person.slug}`,
      sources: [`${mainDir}/pages/people/[slug].vue`, ...dataFiles('people.ts', 'people-en.ts', 'psd-artists-en.ts')],
      images: uniqueImages([person.photo ? { src: person.photo, title: person.name } : undefined, ...(person.works ?? []).map(work => ({ src: work.src, title: work.alt || person.name }))])
    }))
  ]
  // English mirror of every Ukrainian page (ADR-0009); images are listed once, on the Ukrainian page.
  const english: Entry[] = mainEntries.map(entry => ({ path: entry.path === '/' ? '/en' : `/en${entry.path}`, lastmod: entry.lastmod, sources: entry.sources }))
  const exhibitionEntries: Entry[] = exhibitionPages.map((path): Entry => ({ ...exhibitionEntry(path), sources: exhibitionSources(path) }))
  function exhibitionEntry(path: string): Entry {
    if (path === '/') return { path: '/documentsart', images: uniqueImages(homePhotos.map(photo => ({ src: photo.src, title: photo.alt }))) }
    if (path === '/mytsi') {
      return {
        path: '/documentsart/mytsi',
        images: uniqueImages(artists.flatMap((artist) => {
          const slugs = [artist.slug, ...(exhibitionCoAuthors[artist.slug] ?? [])]
          const cover = coverPhoto[artist.slug]
          return [cover ? { src: cover, title: `${artist.name}: ${artist.works.map(work => `«${work.title}»`).join(', ')}` } : undefined, ...slugs.map(slug => {
            const person = personOf(slug)
            return person?.photo ? { src: person.photo, title: person.name } : undefined
          })]
        }))
      }
    }
    if (path === '/podii') {
      return {
        path: '/documentsart/podii',
        images: uniqueImages(events.filter(item => item.project === 'pokazhit-svoi-dokumenty').flatMap(item => (item.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || item.title }))))
      }
    }
    const slug = path.match(/^\/mytsi\/(.+)$/)?.[1]
    const artist = slug ? artists.find(item => item.slug === slug) : undefined
    if (slug && artist) {
      const portraits = [slug, ...(exhibitionCoAuthors[slug] ?? [])].map(personSlug => {
        const person = personOf(personSlug)
        return person?.photo ? { src: person.photo, title: person.name } : undefined
      })
      const works = (artistPhotoGroups[slug] ?? []).flatMap(group => group.photos.map(photo => ({ src: photo.src, title: `${artist.name}: «${group.title}»` })))
      return { path: `/documentsart${path}`, images: uniqueImages([...portraits, ...works]) }
    }
    return { path: `/documentsart${path}` }
  }
  // Images are associated with the Ukrainian canonical content once; English mirrors remain in the page sitemap and
  // expose the same <img> URLs with translated alt text in their own prerendered HTML.
  const exhibitionEnglish: Entry[] = exhibitionPages.map(path => ({ path: path === '/' ? '/documentsart/en' : `/documentsart/en${path}`, sources: exhibitionSources(path) }))
  const exhibition = [...exhibitionEntries, ...exhibitionEnglish]

  const urls = [...mainEntries, ...english, ...exhibition].map((entry) => {
    const loc = `${base}${slash(entry.path)}`.replace(/\/documentsart\/\/$/, '/documentsart/')
    const images = (entry.images ?? []).map(image => `<image:image><image:loc>${xml(base + image.src)}</image:loc></image:image>`).join('')
    const lastmod = entry.lastmod ?? (entry.sources ? lastCommit(entry.sources) : undefined)
    return `  <url><loc>${xml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${images}</url>`
  })
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>'
  ].join('\n')
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
