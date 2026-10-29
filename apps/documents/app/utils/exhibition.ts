// The exhibition as seen from the main site's data (#symbol = apps/main/app/data), joined with the work texts
// of the original project site (app/data/artists.ts).
import { projects } from '#symbol/projects'
import { people } from '#symbol/people'
import { events } from '#symbol/events'
import type { Person, SymbolEvent } from '#symbol/types'
import { artists, type Artist } from '~/data/artists'

export const SYMBOL = 'https://symbol.ngo'
export const exhibition = projects.find(project => project.slug === 'pokazhit-svoi-dokumenty')!

export function personOf(slug: string): Person | undefined {
  return people.find(person => person.slug === slug)
}

/** Link to a person's page on symbol.ngo (the source for biographies, links and all other projects). */
export function symbolPersonUrl(slug: string) {
  return `${SYMBOL}/people/${slug}`
}

export interface ExhibitionArtist extends Artist { person?: Person; coAuthors: Person[] }

// «Блокпост» is one work by Дара Шолох and Ганна Франик; the original site lists them on one page.
const coAuthors: Record<string, string[]> = { 'dara-sholokh': ['hanna-franyk'] }

export const exhibitionArtists: ExhibitionArtist[] = artists
  .map(artist => ({ ...artist, person: personOf(artist.slug), coAuthors: (coAuthors[artist.slug] ?? []).map(personOf).filter(Boolean) as Person[] }))
  .sort((a, b) => a.name.localeCompare(b.name, 'uk'))

export function getArtist(slug: string) {
  return exhibitionArtists.find(artist => artist.slug === slug)
}

/** Credits of the exhibition other than the artists: curators, manager, design, coordination. */
export const team = (exhibition.people ?? [])
  .filter(credit => credit.role !== 'Митці')
  .map(credit => ({ role: credit.role, person: personOf(credit.person) }))
  .filter((credit): credit is { role: string; person: Person } => !!credit.person)

export const programme: SymbolEvent[] = events
  .filter(event => event.project === exhibition.slug)
  .sort((a, b) => a.start.localeCompare(b.start))

const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
export function formatDay(iso: string) {
  const [date, time] = iso.split('T')
  const [, m, d] = date!.split('-').map(Number)
  return { day: String(d).padStart(2, '0'), month: months[m! - 1]!, numeric: `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}`, time: time?.slice(0, 5) }
}

/**
 * Inline references of the main site's texts ([[person:slug|label]], [[project:slug]], [[event:slug]]) as HTML-free
 * parts: artists open their page here, everyone and everything else opens on symbol.ngo.
 */
export type TextPart = { text: string; href?: string; internal?: boolean }
export function textParts(paragraph: string): TextPart[] {
  const parts: TextPart[] = []
  const pattern = /\[\[(person|project|event):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g
  let last = 0
  for (const match of paragraph.matchAll(pattern)) {
    if (match.index! > last) parts.push({ text: paragraph.slice(last, match.index) })
    const [, kind, slug, label] = match as unknown as [string, string, string, string | undefined]
    if (kind === 'person') {
      const artist = getArtist(slug)
      parts.push(artist ? { text: label ?? artist.person?.name ?? artist.name, href: `/mytsi/${slug}`, internal: true } : { text: label ?? personOf(slug)?.name ?? slug, href: symbolPersonUrl(slug) })
    } else if (kind === 'project') {
      parts.push(slug === exhibition.slug ? { text: label ?? exhibition.title, href: '/', internal: true } : { text: label ?? projects.find(p => p.slug === slug)?.title ?? slug, href: `${SYMBOL}/projects/${slug}` })
    } else {
      parts.push({ text: label ?? events.find(e => e.slug === slug)?.title ?? slug, href: `/podii#${slug}`, internal: true })
    }
    last = match.index! + match[0].length
  }
  if (last < paragraph.length) parts.push({ text: paragraph.slice(last) })
  return parts
}
