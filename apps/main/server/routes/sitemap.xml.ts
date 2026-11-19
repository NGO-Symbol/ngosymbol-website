// Sitemap for search engines (prerendered). Lists every public page built from the content records, in Ukrainian
// and English (/en/…), the exhibition site while it lives at /documentsart/ (once documentsart.symbol.ngo is switched on,
// it has a sitemap of its own: apps/documents/server/exhibition-sitemap.ts), and the photographs on each page —
// so a portrait or a project photo can be found in image search under the person's or project's name.
//
// `lastmod` is a real date, never the build date: events and news use the date in their content; every other page uses
// the date of the last git commit that touched its source file or its data (needs the full history — the CI checkouts
// fetch it). Without history (a shallow clone, no git) the date is left out rather than invented.
// Images: only <image:loc> is listed. Google deprecated <image:title> and <image:caption> in 2022 and ignores them
// (https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions); the descriptive text lives in
// each page's alt text and structured data.
import { DOCS_SITE, docsOnOwnHost } from '../../app/data/docs-site'
import { events, news, people, projects } from '../../app/utils/content'
import { exhibitionEntries, uniqueImages, urlLine, urlset } from '../../../documents/server/exhibition-sitemap'
import type { Entry, SitemapImage } from '../../../documents/server/exhibition-sitemap'

const base = 'https://symbol.ngo'
const staticPages = ['/', '/projects', '/events', '/opportunities', '/people', '/about', '/support', '/contact', '/news', '/press', '/privacy']

const mainDir = 'apps/main/app'
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
  // The exhibition site sits in this sitemap only while it is a folder of symbol.ngo; its photographs are served by symbol.ngo.
  const exhibition = docsOnOwnHost ? [] : exhibitionEntries(people, events).map(entry => urlLine(entry, DOCS_SITE, base))
  const body = urlset([...[...mainEntries, ...english].map(entry => urlLine(entry, base, base)), ...exhibition])
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
