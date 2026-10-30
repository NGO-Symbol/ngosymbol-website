// Sitemap for search engines (prerendered). Lists every public page built from the content records, in Ukrainian
// and English (/en/…), the exhibition site (/documentsart/…), and the photographs on each page with their subject —
// so a portrait or a project photo can be found in image search under the person's or project's name.
import { artists } from '../../../documents/app/data/artists'
import { events, news, people, projects } from '../../app/utils/content'

const base = 'https://symbol.ngo'
const staticPages = ['/', '/projects', '/events', '/opportunities', '/people', '/about', '/support', '/contact', '/news', '/press']
const exhibitionPages = ['/', '/kontseptsiia', '/mytsi', '/podii', '/komanda', '/presa', ...artists.map(artist => `/mytsi/${artist.slug}`)]

interface Entry { path: string; images?: { src: string; title: string }[]; lastmod?: string }

const slash = (path: string) => (path === '/' ? '/' : `${path}/`)
const xml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default defineEventHandler((event) => {
  const latest = news.map(item => item.date).sort().at(-1)
  const main: Entry[] = [
    ...staticPages.map(path => ({ path, lastmod: path === '/news' ? latest : undefined })),
    ...projects.map(project => ({
      path: `/projects/${project.slug}`,
      images: [project.poster, ...(project.gallery ?? []).map(photo => photo.src)].filter((src): src is string => !!src).slice(0, 12).map(src => ({ src, title: project.title }))
    })),
    ...events.map(item => ({ path: `/events/${item.slug}`, images: (item.gallery ?? []).slice(0, 8).map(photo => ({ src: photo.src, title: item.title })) })),
    ...people.filter(person => person.hasPage !== false).map(person => ({
      path: `/people/${person.slug}`,
      images: [person.photo ? { src: person.photo, title: person.name } : undefined, ...(person.works ?? []).slice(0, 6).map(work => ({ src: work.src, title: person.name }))].filter((image): image is { src: string; title: string } => !!image)
    }))
  ]
  // English mirror of every Ukrainian page (ADR-0009); images are listed once, on the Ukrainian page.
  const english: Entry[] = main.map(entry => ({ path: entry.path === '/' ? '/en' : `/en${entry.path}` }))
  const exhibition: Entry[] = [...exhibitionPages, ...exhibitionPages.map(path => (path === '/' ? '/en' : `/en${path}`))].map(path => ({ path: path === '/' ? '/documentsart' : `/documentsart${path}` }))

  const urls = [...main, ...english, ...exhibition].map((entry) => {
    const loc = `${base}${slash(entry.path)}`.replace(/\/documentsart\/\/$/, '/documentsart/')
    const images = (entry.images ?? []).map(image => `<image:image><image:loc>${xml(base + image.src)}</image:loc><image:title>${xml(image.title)}</image:title></image:image>`).join('')
    return `  <url><loc>${xml(loc)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}${images}</url>`
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
