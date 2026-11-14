// Sitemap for search engines (prerendered). Lists every public page built from the content records, in Ukrainian
// and English (/en/…), the exhibition site (/documentsart/…), and the photographs on each page with their subject —
// so a portrait or a project photo can be found in image search under the person's or project's name.
import { artists } from '../../../documents/app/data/artists'
import { artistPhotoGroups } from '../../../documents/app/data/artistPhotos.generated'
import { homePhotos } from '../../../documents/app/data/homePhotos'
import { coverPhoto } from '../../../documents/app/data/workPhotos'
import { events, news, people, projects } from '../../app/utils/content'

const base = 'https://symbol.ngo'
const staticPages = ['/', '/projects', '/events', '/opportunities', '/people', '/about', '/support', '/contact', '/news', '/press']
const exhibitionPages = ['/', '/kontseptsiia', '/mytsi', '/podii', '/komanda', '/presa', ...artists.map(artist => `/mytsi/${artist.slug}`)]

interface SitemapImage { src: string; title: string }
interface Entry { path: string; images?: SitemapImage[]; lastmod?: string }

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
  const main: Entry[] = [
    ...staticPages.map(path => ({ path, images: staticImages[path], lastmod: path === '/news' ? latest : undefined })),
    ...projects.map(project => ({
      path: `/projects/${project.slug}`,
      images: uniqueImages([
        project.poster ? { src: project.poster, title: project.title } : undefined,
        project.backdrop ? { src: project.backdrop, title: project.title } : undefined,
        ...(project.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || project.title }))
      ])
    })),
    ...events.map(item => ({ path: `/events/${item.slug}`, images: uniqueImages((item.gallery ?? []).map(photo => ({ src: photo.src, title: photo.alt || item.title }))) })),
    ...people.filter(person => person.hasPage !== false).map(person => ({
      path: `/people/${person.slug}`,
      images: uniqueImages([person.photo ? { src: person.photo, title: person.name } : undefined, ...(person.works ?? []).map(work => ({ src: work.src, title: work.alt || person.name }))])
    }))
  ]
  // English mirror of every Ukrainian page (ADR-0009); images are listed once, on the Ukrainian page.
  const english: Entry[] = main.map(entry => ({ path: entry.path === '/' ? '/en' : `/en${entry.path}` }))
  const exhibitionEntries: Entry[] = exhibitionPages.map((path) => {
    if (path === '/') return { path: '/documentsart', images: uniqueImages(homePhotos.map(photo => ({ src: photo.src, title: photo.alt }))) }
    if (path === '/mytsi') {
      return {
        path: '/documentsart/mytsi',
        images: uniqueImages(artists.flatMap((artist) => {
          const slugs = [artist.slug, ...(exhibitionCoAuthors[artist.slug] ?? [])]
          return [coverPhoto[artist.slug] ? { src: coverPhoto[artist.slug], title: `${artist.name}: ${artist.works.map(work => `«${work.title}»`).join(', ')}` } : undefined, ...slugs.map(slug => {
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
  })
  // Images are associated with the Ukrainian canonical content once; English mirrors remain in the page sitemap and
  // expose the same <img> URLs with translated alt text in their own prerendered HTML.
  const exhibitionEnglish: Entry[] = exhibitionPages.map(path => ({ path: path === '/' ? '/documentsart/en' : `/documentsart/en${path}` }))
  const exhibition = [...exhibitionEntries, ...exhibitionEnglish]

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
