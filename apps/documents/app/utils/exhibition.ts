// The exhibition as seen from the main site's data (#symbol = apps/main/app/data), joined with the work texts
// of the original project site (app/data/artists.ts).
import { projects } from '#symbol/projects'
import { people } from '#symbol/people'
import { events } from '#symbol/events'
import { bySignificance, organizations } from '#symbol/organizations'
import type { Person, SymbolEvent } from '#symbol/types'
import { psdArtistsEn } from '#symbol/psd-artists-en'
import { projectsEn } from '#symbol/projects-en'
import { eventsEn } from '#symbol/events-en'
import { peopleEn } from '#symbol/people-en'
import { artists, type Artist } from '~/data/artists'

export const SYMBOL = 'https://symbol.ngo'
export const exhibition = projects.find(project => project.slug === 'pokazhit-svoi-dokumenty')!

export function personOf(slug: string): Person | undefined {
  return people.find(person => person.slug === slug)
}

/** Link to a person's page on symbol.ngo (the source for biographies, links and all other projects). */
export function symbolPersonUrl(slug: string, english = false) {
  return `${SYMBOL}${english ? '/en' : ''}/people/${slug}/`
}

export interface ExhibitionArtist extends Artist { person?: Person; coAuthors: Person[] }

// The biography is kept once, on the person's symbol.ngo page; here it is shown as plain text, without the paragraph
// about this exhibition (its curatorial texts follow on the next sheets). Falls back to the original site's text.
function plainBio(person: Person | undefined, fallback: string[]) {
  const label = (type: string, slug: string, custom?: string) => custom
    ?? (type === 'person' ? people.find(item => item.slug === slug)?.name : type === 'project' ? `«${projects.find(item => item.slug === slug)?.title ?? slug}»` : events.find(item => item.slug === slug)?.title)
    ?? slug
  const paragraphs = (person?.bio ?? [])
    .filter(text => !text.includes('[[project:pokazhit-svoi-dokumenty'))
    .map(text => text
      .replace(/\[\[(project|event|person):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, type: string, slug: string, custom?: string) => label(type, slug, custom))
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')
      .replace(/\*\*/g, ''))
  return paragraphs.length ? paragraphs : fallback
}

// «Блокпост» is one work by Дара Шолох and Ганна Франик; the original site lists them on one page.
const coAuthors: Record<string, string[]> = { 'dara-sholokh': ['hanna-franyk'] }

export const exhibitionArtists: ExhibitionArtist[] = artists
  .map(artist => ({ ...artist, bio: plainBio(personOf(artist.slug), artist.bio), person: personOf(artist.slug), coAuthors: (coAuthors[artist.slug] ?? []).map(personOf).filter(Boolean) as Person[] }))
  .sort((a, b) => a.name.localeCompare(b.name, 'uk'))

export function getArtist(slug: string) {
  return exhibitionArtists.find(artist => artist.slug === slug)
}

/** Approved English copy from the organisation's bilingual exhibition catalogue. */
export function artistCopy(artist: ExhibitionArtist, english: boolean): ExhibitionArtist {
  if (!english) return artist
  const approved = psdArtistsEn[artist.slug]
  if (!approved) return artist
  return {
    ...artist,
    name: approved.name,
    bio: approved.bio,
    works: artist.works.map((work, index) => ({
      ...work,
      title: approved.works[index]?.title ?? work.title,
      text: approved.works[index]?.text ?? work.text
    }))
  }
}

export function artistName(artist: ExhibitionArtist, english: boolean) {
  return english ? (psdArtistsEn[artist.slug]?.name ?? artist.name) : artist.name
}

/** Donors and partners of the exhibition, most significant first, with their logos from symbol.ngo. */
export const exhibitionPartners = [...(exhibition.donors ?? []), ...(exhibition.partners ?? [])].sort(bySignificance)
  .map(slug => organizations.find(org => org.slug === slug))
  .filter(org => !!org)

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
export function textParts(source: string, english = false): TextPart[] {
  // Key-phrase stars (**…**) are a symbol.ngo styling cue; this site shows the plain words.
  const paragraph = source.replace(/\*\*/g, '')
  const parts: TextPart[] = []
  const pattern = /\[\[(person|project|event):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g
  let last = 0
  for (const match of paragraph.matchAll(pattern)) {
    if (match.index! > last) parts.push({ text: paragraph.slice(last, match.index) })
    const [, kind, slug, label] = match as unknown as [string, string, string, string | undefined]
    if (kind === 'person') {
      const artist = getArtist(slug)
      const name = english ? psdArtistsEn[slug]?.name ?? peopleEn[slug]?.name : undefined
      parts.push(artist ? { text: label ?? name ?? artist.person?.name ?? artist.name, href: `/mytsi/${slug}`, internal: true } : { text: label ?? name ?? personOf(slug)?.name ?? slug, href: symbolPersonUrl(slug, english) })
    } else if (kind === 'project') {
      const title = english ? projectsEn[slug]?.title : undefined
      parts.push(slug === exhibition.slug ? { text: label ?? title ?? exhibition.title, href: '/', internal: true } : { text: label ?? title ?? projects.find(p => p.slug === slug)?.title ?? slug, href: `${SYMBOL}${english ? '/en' : ''}/projects/${slug}/` })
    } else {
      parts.push({ text: label ?? (english ? eventsEn[slug]?.title : undefined) ?? events.find(e => e.slug === slug)?.title ?? slug, href: `/podii#${slug}`, internal: true })
    }
    last = match.index! + match[0].length
  }
  if (last < paragraph.length) parts.push({ text: paragraph.slice(last) })
  return parts
}
