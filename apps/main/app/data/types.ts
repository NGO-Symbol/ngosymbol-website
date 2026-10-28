// Content model: see documents/knowledge/information-architecture.md and ADR-0006.
// Rich text is a list of paragraphs; inline references use [[project:slug]], [[event:slug]], [[person:slug]]
// with an optional label: [[person:pavlo-makov|Павла Макова]].

export type Paragraphs = string[]

export type ProjectStatus = 'planned' | 'launching' | 'ongoing' | 'completed'
export type ProjectKind = 'long' | 'single'
export type ProjectRole = 'organizer' | 'partner'
export type Tone = 'violet' | 'apricot' | 'cream' | 'plum' | 'lilac'

export interface Credit {
  person: string
  role: string
}

export interface Venue {
  name?: string
  address?: string
  city: string
  country?: string
}

export interface Project {
  slug: string
  title: string
  yearStart: number
  yearEnd?: number
  city: string
  country?: string
  kind: ProjectKind
  status: ProjectStatus
  role: ProjectRole
  formats: string[]
  directions: string[]
  summary: string
  body?: Paragraphs
  concept?: Paragraphs
  tone: Tone
  people?: Credit[]
  partners?: string[]
  donors?: string[]
  donorCredit?: string
  related?: string[]
  subsiteUrl?: string
  externalUrl?: string
  /** Only for kind: 'single' — dates of the one event this project consists of. */
  start?: string
  end?: string
  venue?: Venue
}

export interface SymbolEvent {
  slug: string
  title: string
  project: string
  format: string
  start: string
  end?: string
  venue: Venue
  description?: Paragraphs
  registrationUrl?: string
  people?: Credit[]
}

export interface Person {
  slug: string
  name: string
  shortBio?: string
  bio?: Paragraphs
  links?: { label: string; url: string }[]
  team?: boolean
  teamRole?: string
  teamOrder?: number
  hasPage?: boolean
}

export interface Opportunity {
  slug: string
  title: string
  type: 'open-call' | 'residency' | 'vacancy' | 'volunteering'
  project?: string
  deadline: string
  description: Paragraphs
  applyUrl: string
}

export interface PressMention {
  outlet: string
  title: string
  date?: string
  url: string
  projects: string[]
}

export interface Organization {
  slug: string
  name: string
  url?: string
}
