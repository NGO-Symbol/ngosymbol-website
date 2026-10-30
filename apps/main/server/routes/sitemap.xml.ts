// Sitemap for search engines (prerendered). Lists every public page built from the content records.
import { events, news, people, projects } from '../../app/utils/content'

const base = 'https://symbol.ngo'
const staticPages = ['/', '/projects', '/events', '/opportunities', '/people', '/about', '/support', '/contact', '/news', '/press', '/en']

export default defineEventHandler((event) => {
  const urls = [
    ...staticPages,
    ...projects.map(project => `/projects/${project.slug}`),
    ...events.map(item => `/events/${item.slug}`),
    ...people.filter(person => person.hasPage !== false).map(person => `/people/${person.slug}`)
  ]
  const latest = news.map(item => item.date).sort().at(-1)
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(path => path === '/' ? path : `${path}/`).map(path => `  <url><loc>${base}${path}</loc>${path === '/news/' && latest ? `<lastmod>${latest}</lastmod>` : ''}</url>`),
    '</urlset>'
  ].join('\n')
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
