// Content model: see documents/knowledge/information-architecture.md and ADR-0008.
// Rich text is a list of paragraphs; inline references use [[project:slug]], [[event:slug]], [[person:slug]]
// with an optional label: [[person:pavlo-makov|Павла Макова]].

export type Paragraphs = string[]

export type ProjectStatus = 'planned' | 'launching' | 'ongoing' | 'completed'
export type ProjectKind = 'long' | 'single'
export type ProjectRole = 'organizer' | 'partner'
export type Tone = 'violet' | 'apricot' | 'cream' | 'plum' | 'lilac'
/** Project-specific motion motif (components/ProjectMotif.vue). */
export type Motif = 'streets' | 'voices' | 'documents' | 'breath' | 'curtain' | 'film' | 'time' | 'sea' | 'aperture'

export interface Photo {
  src: string
  alt: string
  credit?: string
  /** Photos of people (curators, team, audience portraits) stay out of the home photo orbit. */
  people?: boolean
}

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
  motif: Motif
  /** Project identity applied to its page (assets/css/theme-*.css). */
  theme?: 'documents'
  /** Poster or key visual, used as the card cover when present. */
  poster?: string
  /** Selected photos only; the first is the cover. Files live in public/media/projects/{slug}/. */
  gallery?: Photo[]
  people?: Credit[]
  partners?: string[]
  donors?: string[]
  donorCredit?: string
  /** Funder's required notice (e.g. the EU disclaimer), shown under the credit on the project and its event pages. */
  fundingNotice?: string
  /** Image laid behind the project hero (e.g. archive photographs), toned to the page. */
  backdrop?: string
  /** Logo of the programme the project belongs to (e.g. WHO mhGAP), shown beside the credit line. */
  programLogo?: { src: string; name: string }
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
  gallery?: Photo[]
}

export interface CvSection {
  title: string
  items: { period?: string; text: string }[]
}

export interface Person {
  slug: string
  name: string
  /** Portrait in public/media/people/{slug}.jpg */
  photo?: string
  shortBio?: string
  bio?: Paragraphs
  links?: { label: string; url: string }[]
  team?: boolean
  teamRole?: string
  teamOrder?: number
  hasPage?: boolean
  /** Photographs of the person's works shown in Symbol projects. */
  works?: Photo[]
  /** Structured CV for the team (no contacts or personal data). Sources: documents/knowledge/team-cv.md */
  cv?: CvSection[]
}

export interface Opportunity {
  slug: string
  title: string
  type: 'open-call' | 'residency' | 'vacancy' | 'volunteering'
  project?: string
  deadline: string
  description: Paragraphs
  /** Omitted for archived calls whose form is closed. */
  applyUrl?: string
}

export interface NewsItem {
  slug: string
  date: string
  title: string
  body: Paragraphs
  project?: string
}

export interface PressMention {
  outlet: string
  title: string
  date?: string
  url: string
  projects: string[]
  /** Kind of mention, shown as a label: review, announcement, listing, open call, video, radio, post. */
  kind?: 'review' | 'announcement' | 'listing' | 'open-call' | 'video' | 'radio' | 'post'
  /** Author of a review or interview, when the page names one. */
  author?: string
}

export interface Organization {
  slug: string
  name: string
  /** Website, or a social profile when there is no website. */
  url?: string
  /** Logo file in public/media/partners/ (from the shared Drive or the organization's own site). */
  logo?: string
  /** The organization's own logo variant for dark backgrounds, used instead of recolouring (required for the EU emblem). */
  logoDark?: string
  /** Hover motion that echoes the logo's own identity (see PartnerTiles). */
  motion?: 'blink' | 'unfold' | 'shift' | 'beat' | 'wave' | 'stars' | 'curtain' | 'bloom' | 'wipe' | 'rise' | 'flip' | 'fade' | 'spin' | 'brush' | 'stamp' | 'unveil' | 'shoot' | 'pulse' | 'flag' | 'orbit' | 'type' | 'focus' | 'shutter'
}
