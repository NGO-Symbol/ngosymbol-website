// One place for the English form of content records (titles, names, places), so every page and component shows the
// same English text. The English data lives next to the Ukrainian in app/data/*-en.ts; the sync check
// (scripts/i18n-parity.mjs, part of `pnpm check`) fails when an English page shows Ukrainian or has less content.
import { eventsEn } from '~/data/events-en'
import { peopleEn } from '~/data/people-en'
import { projectsEn } from '~/data/projects-en'
import { psdPeopleEn } from '~/data/psd-artists-en'
import type { Venue } from '~/data/types'
import { creditIn as creditInData } from '~/data/alt-en'

export const projectTitleIn = (project: { slug: string; title: string }, toEn: boolean) => (toEn && projectsEn[project.slug]?.title) || project.title
export const eventTitleIn = (event: { slug: string; title: string }, toEn: boolean) => (toEn && eventsEn[event.slug]?.title) || event.title
export const personNameIn = (person: { slug: string; name: string }, toEn: boolean) => (toEn && (psdPeopleEn[person.slug]?.name ?? peopleEn[person.slug]?.name)) || person.name

/** Venue in one line: «ЄрміловЦентр, майдан Свободи, 4, Харків» / «YermilovCentre, 4 Svobody Square, Kharkiv». */
export const venueLineIn = (venue: Venue, toEn: boolean) => toEn
  ? [venue.nameEn ?? venue.name, venue.addressEn ?? venue.address, venue.city, venue.country].map(value => translatePlace(value, true)).filter(Boolean).join(', ')
  : venueLine(venue)

// Photo credits in English (the names list lives with the alt texts, so the exhibition site shares it).
export const creditIn = (credit: string | undefined, toEn: boolean) => creditInData(credit, toEn)

/** `lang="uk"` for a text that stays in the original Ukrainian on an English page (a press headline, an outlet). */
export const originalLang = (text: string | undefined, toEn: boolean) => toEn && text && /[А-Яа-яЄєІіЇїҐґ]/.test(text) ? 'uk' : undefined
