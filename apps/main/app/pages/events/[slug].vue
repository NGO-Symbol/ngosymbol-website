<script setup lang="ts">
import { eventsEn } from '~/data/events-en'
import { projectsEn } from '~/data/projects-en'
import { psdPeopleEn } from '~/data/psd-artists-en'
import { peopleEn } from '~/data/people-en'
const route = useRoute()
const event = getEvent(String(route.params.slug))
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk

if (!event) {
  throw createError({ statusCode: 404, statusMessage: 'Подію не знайдено' })
}

const project = getProject(event.project)!
const eventText = computed(() => isEn.value ? eventsEn[event.slug] ?? event : event)
const projectText = computed(() => isEn.value ? projectsEn[project.slug] ?? project : project)
const personName = (person: (typeof people)[number]) => isEn.value ? (psdPeopleEn[person.slug]?.name ?? peopleEn[person.slug]?.name ?? person.name) : person.name
const placeLine = computed(() => isEn.value ? [event.venue.name, event.venue.address, event.venue.city, event.venue.country].map(value => translatePlace(value, true)).filter(Boolean).join(', ') : venueLine(event.venue))
const speakers = creditsByRole(event.people)
const siblings = eventsOfProject(project.slug).filter(other => other.slug !== event.slug)
const toTiles = (slugs: string[] = []) => slugs.map(getOrganization).filter(org => !!org).map(org => ({ org: org!, projects: [{ slug: project.slug, title: project.title }] }))
// Partners of this particular event; donor credits of the project repeat on each of its events (funders ask for them in every event description).
const partners = toTiles([...(event.partners ?? [])].sort(bySignificance))
const donors = toTiles(project.donors)

const shareImage = event.gallery?.[0]?.src ?? project.poster ?? project.gallery?.[0]?.src
useSeoMeta({
  title: () => eventText.value.title,
  description: () => `${isEn.value ? formatRangeEn(event.start, event.end) : formatRange(event.start, event.end)} · ${placeLine.value}`,
  ogImage: shareImage ? `https://symbol.ngo${shareImage}` : undefined
})

// schema.org Event for search engines.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      location: { '@type': 'Place', name: event.venue.name ?? event.venue.city, address: venueLine(event.venue) },
      organizer: { '@type': 'Organization', name: 'ГО «Символ»', url: 'https://symbol.ngo/' },
      url: `https://symbol.ngo/events/${event.slug}/`,
      description: event.description?.map(plainText).join(' ').slice(0, 500),
      image: shareImage ? [`https://symbol.ngo${shareImage}`] : undefined,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      superEvent: { '@type': 'CreativeWork', name: project.title, url: `https://symbol.ngo/projects/${project.slug}/` }
    })
  }]
})

const googleUrl = computed(() => {
  const stamp = (iso: string, fallbackTime: string) => `${iso.slice(0, 10).replace(/-/g, '')}T${iso.length > 10 ? iso.slice(11, 16).replace(':', '') : fallbackTime}00`
  const start = stamp(event.start, '0000')
  const end = stamp(event.end ?? event.start, '2359')
  const params = new URLSearchParams({ action: 'TEMPLATE', text: eventText.value.title, dates: `${start}/${end}`, location: placeLine.value, ctz: 'Europe/Kyiv' })
  return `https://calendar.google.com/calendar/render?${params}`
})
</script>

<template>
  <article v-if="event" class="page container event-page">
    <Breadcrumbs :items="[{ label: t('Проєкти', 'Projects'), to: '/projects' }, { label: `${projectText.title} · ${projectYears(project)}`, to: `/projects/${project.slug}` }, { label: eventText.title }]" />
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ translate(formats[event.format]!, isEn) }}</span>
      <h1>{{ eventText.title }}</h1>
    </div>
    <div class="project-content">
      <aside>
        <dl class="facts">
          <div><dt>{{ t('Коли', 'When') }}</dt><dd>{{ isEn ? formatRangeEn(event.start, event.end) : formatRange(event.start, event.end) }}</dd></div>
          <div><dt>{{ t('Де', 'Where') }}</dt><dd>{{ placeLine }}</dd></div>
          <div><dt>{{ t('Проєкт', 'Project') }}</dt><dd><NuxtLink :to="`/projects/${project.slug}`">{{ projectText.title }}</NuxtLink></dd></div>
        </dl>
        <div class="button-stack">
          <a v-if="event.registrationUrl && isUpcoming(event)" class="button button--dark" :href="event.registrationUrl" target="_blank" rel="noreferrer">{{ t('Зареєструватися', 'Register') }}</a>
          <a class="button" :href="googleUrl" target="_blank" rel="noreferrer">{{ t('Додати в Google Calendar', 'Add to Google Calendar') }}</a>
        </div>
      </aside>
      <div class="project-sections">
        <section v-if="eventText.description">
          <h2 class="section-title">{{ t('Про подію', 'About the event') }}</h2>
          <RichText class="lead-text" :paragraphs="eventText.description" />
        </section>
        <section v-if="event.gallery?.length">
          <h2 class="section-title">{{ t('Фото', 'Photos') }}</h2>
          <PhotoGallery :photos="event.gallery" />
        </section>
        <section v-if="speakers.length">
          <h2 class="section-title">{{ t('Люди', 'People') }}</h2>
          <div class="credits">
            <div v-for="group in speakers" :key="group.role" class="credits__group">
              <h3>{{ translate(group.role, isEn) }}</h3>
              <p>
                <template v-for="(person, index) in group.people" :key="person.slug">
                  <NuxtLink v-if="person.hasPage !== false" :to="`/people/${person.slug}`">{{ personName(person) }}</NuxtLink>
                  <template v-else>{{ personName(person) }}</template>
                  <template v-if="index < group.people.length - 1">, </template>
                </template>
              </p>
            </div>
          </div>
        </section>
        <section v-if="partners.length || donors.length">
          <h2 class="section-title">{{ t('Партнери й донори', 'Partners and donors') }}</h2>
          <div class="credits">
            <div v-if="partners.length" class="credits__group">
              <h3>{{ t('Партнери', 'Partners') }}</h3>
              <PartnerTiles :items="partners" />
            </div>
            <div v-if="donors.length" class="credits__group">
              <h3>{{ t('Донори', 'Donors') }}</h3>
              <PartnerTiles :items="donors" />
            </div>
          </div>
          <p v-if="projectText.donorCredit" class="donor-credit">{{ projectText.donorCredit }}</p>
          <p v-if="projectText.fundingNotice" class="donor-credit donor-credit--notice">{{ projectText.fundingNotice }}</p>
        </section>
        <section v-if="siblings.length">
          <h2 class="section-title">{{ t('Інші події проєкту', 'Other project events') }}</h2>
          <div class="event-list">
            <NuxtLink v-for="other in siblings" :key="other.slug" class="event-row" :to="`/events/${other.slug}`">
              <time class="event-row__date" :datetime="other.start">{{ isEn ? formatRangeEn(other.start, other.end) : formatRange(other.start, other.end) }}</time>
              <span class="event-row__title">{{ isEn ? eventsEn[other.slug]?.title ?? other.title : other.title }}</span>
              <span class="event-row__meta"><span>{{ translate(formats[other.format]!, isEn) }}</span></span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>
