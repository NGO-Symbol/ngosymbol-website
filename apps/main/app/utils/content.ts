// Relations between content records and reference validation (ADR-0006).
import { events } from '~/data/events'
import { formats, directions, statusLabels } from '~/data/formats'
import { opportunities } from '~/data/opportunities'
import { organizations } from '~/data/organizations'
import { people } from '~/data/people'
import { press } from '~/data/press'
import { projects } from '~/data/projects'
import type { Credit, Opportunity, Person, Project, SymbolEvent, Venue } from '~/data/types'

export { events, opportunities, organizations, people, press, projects, formats, directions, statusLabels }

const bySlug = <T extends { slug: string }>(items: T[]) => new Map(items.map(item => [item.slug, item]))
const projectMap = bySlug(projects)
const eventMap = bySlug(events)
const personMap = bySlug(people)
const organizationMap = bySlug(organizations)

export const getProject = (slug: string) => projectMap.get(slug)
export const getEvent = (slug: string) => eventMap.get(slug)
export const getPerson = (slug: string) => personMap.get(slug)
export const getOrganization = (slug: string) => organizationMap.get(slug)

export const projectYears = (project: Project) =>
  project.yearEnd && project.yearEnd !== project.yearStart ? `${project.yearStart}–${project.yearEnd}` : String(project.yearStart)

export const projectPlace = (project: Project) => (project.country ? `${project.city}, ${project.country}` : project.city)

/** «Назва · рік · місто» — the title is always shown with year(s) and city. */
export const projectByline = (project: Project) => `${projectYears(project)} · ${project.city}`

export const venueLine = (venue: Venue) => [venue.name, venue.address, venue.city, venue.country].filter(Boolean).join(', ')

// Events, including 'single' projects presented as events.
export interface EventItem {
  slug: string
  title: string
  to: string
  project: Project
  format: string
  start: string
  end?: string
  venue: Venue
  isProject: boolean
}

export const eventItems: EventItem[] = [
  ...events.map(event => ({
    slug: event.slug,
    title: event.title,
    to: `/events/${event.slug}`,
    project: projectMap.get(event.project)!,
    format: event.format,
    start: event.start,
    end: event.end,
    venue: event.venue,
    isProject: false
  })),
  ...projects
    .filter(project => project.kind === 'single' && project.start)
    .map(project => ({
      slug: project.slug,
      title: project.title,
      to: `/projects/${project.slug}`,
      project,
      format: project.formats[0] ?? 'performance',
      start: project.start!,
      end: project.end,
      venue: project.venue ?? { city: project.city, country: project.country },
      isProject: true
    }))
].sort((a, b) => b.start.localeCompare(a.start))

export const todayIso = () => new Date().toISOString().slice(0, 10)
export const isUpcoming = (item: { start: string; end?: string }) => (item.end ?? item.start).slice(0, 10) >= todayIso()

export const eventsOfProject = (slug: string) => events.filter(event => event.project === slug).sort((a, b) => a.start.localeCompare(b.start))
export const pressOfProject = (slug: string) => press.filter(item => item.projects.includes(slug))
export const opportunitiesOfProject = (slug: string) => opportunities.filter(item => item.project === slug && isActive(item))
export const isActive = (opportunity: Opportunity) => opportunity.deadline >= todayIso()
export const activeOpportunities = () => opportunities.filter(isActive).sort((a, b) => a.deadline.localeCompare(b.deadline))

/** Related projects in both directions: listed in `related` or referencing this project in their texts. */
export const relatedProjects = (project: Project) => {
  const slugs = new Set(project.related ?? [])
  for (const other of projects) {
    if (other.slug === project.slug) continue
    if (other.related?.includes(project.slug)) slugs.add(other.slug)
    if (references(other).some(ref => ref.type === 'project' && ref.slug === project.slug)) slugs.add(other.slug)
  }
  return [...slugs].map(slug => projectMap.get(slug)!).filter(Boolean)
}

/** Groups credits by role, preserving the order roles first appear. */
export const creditsByRole = (credits: Credit[] = []) => {
  const groups = new Map<string, Person[]>()
  for (const credit of credits) {
    const person = personMap.get(credit.person)
    if (!person) continue
    groups.set(credit.role, [...(groups.get(credit.role) ?? []), person])
  }
  return [...groups].map(([role, members]) => ({ role, people: members }))
}

/** Backlinks for a person page: projects and events with the person's roles, newest first. */
export const appearancesOf = (slug: string) => {
  const result: { title: string; to: string; byline: string; roles: string[]; year: number }[] = []
  for (const project of projects) {
    const roles = (project.people ?? []).filter(credit => credit.person === slug).map(credit => credit.role)
    const mentioned = references(project).some(ref => ref.type === 'person' && ref.slug === slug)
    if (roles.length || mentioned) {
      result.push({ title: project.title, to: `/projects/${project.slug}`, byline: projectByline(project), roles: roles.length ? roles : ['Згадка'], year: project.yearStart })
    }
  }
  for (const event of events) {
    const roles = (event.people ?? []).filter(credit => credit.person === slug).map(credit => credit.role)
    if (roles.length) {
      result.push({ title: event.title, to: `/events/${event.slug}`, byline: formatDate(event.start), roles, year: Number(event.start.slice(0, 4)) })
    }
  }
  return result.sort((a, b) => b.year - a.year)
}

// Inline references: [[type:slug]] or [[type:slug|label]].
const referencePattern = /\[\[(project|event|person):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g

export type Segment = { text: string } | { text: string; to: string }

export const resolveReference = (type: string, slug: string): { label: string; to?: string } | undefined => {
  if (type === 'project') {
    const project = projectMap.get(slug)
    return project && { label: `«${project.title}»`, to: `/projects/${slug}` }
  }
  if (type === 'event') {
    const event = eventMap.get(slug)
    return event && { label: event.title, to: `/events/${slug}` }
  }
  if (type === 'person') {
    const person = personMap.get(slug)
    return person && { label: person.name, to: person.hasPage === false ? undefined : `/people/${slug}` }
  }
}

export const parseRichText = (text: string): Segment[] => {
  const segments: Segment[] = []
  let last = 0
  for (const match of text.matchAll(referencePattern)) {
    const [whole, type, slug, label] = match
    if (match.index! > last) segments.push({ text: text.slice(last, match.index) })
    const target = resolveReference(type!, slug!)
    const text_ = label ?? target?.label ?? slug!
    segments.push(target?.to ? { text: text_, to: target.to } : { text: text_ })
    last = match.index! + whole.length
  }
  if (last < text.length) segments.push({ text: text.slice(last) })
  return segments
}

function textsOf(record: { body?: string[]; concept?: string[]; description?: string[]; bio?: string[] }) {
  return [...(record.body ?? []), ...(record.concept ?? []), ...(record.description ?? []), ...(record.bio ?? [])]
}

function references(record: Parameters<typeof textsOf>[0]) {
  return textsOf(record).flatMap(text => [...text.matchAll(referencePattern)].map(([, type, slug]) => ({ type: type!, slug: slug! })))
}

// Date helpers (Ukrainian).
const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
export const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']

export function formatDate(iso: string, withYear = true) {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  return `${day} ${months[month! - 1]}${withYear ? ` ${year}` : ''}`
}

export function formatRange(start: string, end?: string) {
  const time = start.length > 10 ? `, ${start.slice(11, 16)}${end && end.length > 10 ? `–${end.slice(11, 16)}` : ''}` : ''
  if (!end || end.slice(0, 10) === start.slice(0, 10)) return `${formatDate(start)}${time}`
  const sameYear = start.slice(0, 4) === end.slice(0, 4)
  return `${formatDate(start, !sameYear)} — ${formatDate(end)}`
}

// Validation: every reference must point to an existing record. Runs when this module loads,
// so `nuxt dev`, `nuxt generate`, and `nuxt build` fail on a broken reference.
function validate() {
  const errors: string[] = []
  const check = (kind: string, slug: string | undefined, where: string, map: Map<string, unknown>) => {
    if (slug && !map.has(slug)) errors.push(`${where}: unknown ${kind} "${slug}"`)
  }
  const unique = (items: { slug: string }[], kind: string) => {
    const seen = new Set<string>()
    for (const item of items) {
      if (seen.has(item.slug)) errors.push(`duplicate ${kind} slug "${item.slug}"`)
      seen.add(item.slug)
    }
  }
  unique(projects, 'project')
  unique(events, 'event')
  unique(people, 'person')
  unique(organizations, 'organization')
  for (const project of projects) {
    const where = `project ${project.slug}`
    project.people?.forEach(credit => check('person', credit.person, where, personMap))
    project.related?.forEach(slug => check('project', slug, where, projectMap))
    ;[...(project.partners ?? []), ...(project.donors ?? [])].forEach(slug => check('organization', slug, where, organizationMap))
    project.formats.forEach(format => format in formats || errors.push(`${where}: unknown format "${format}"`))
    project.directions.forEach(direction => direction in directions || errors.push(`${where}: unknown direction "${direction}"`))
    if (project.kind === 'single' && !project.start) errors.push(`${where}: single project needs a start date`)
  }
  for (const event of events) {
    const where = `event ${event.slug}`
    check('project', event.project, where, projectMap)
    event.people?.forEach(credit => check('person', credit.person, where, personMap))
    event.format in formats || errors.push(`${where}: unknown format "${event.format}"`)
  }
  opportunities.forEach(item => check('project', item.project, `opportunity ${item.slug}`, projectMap))
  press.forEach(item => item.projects.forEach(slug => check('project', slug, `press ${item.url}`, projectMap)))
  const maps: Record<string, Map<string, unknown>> = { project: projectMap, event: eventMap, person: personMap }
  for (const record of [...projects, ...events, ...people] as Parameters<typeof textsOf>[0][]) {
    for (const ref of references(record)) check(ref.type, ref.slug, `text reference in ${(record as { slug: string }).slug}`, maps[ref.type]!)
  }
  if (errors.length) throw new Error(`Content references are broken:\n- ${errors.join('\n- ')}`)
}

validate()

export type { Credit, Opportunity, Person, Project, SymbolEvent, Venue }
