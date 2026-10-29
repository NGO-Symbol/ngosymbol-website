<script setup lang="ts">
const route = useRoute()
const event = getEvent(String(route.params.slug))

if (!event) {
  throw createError({ statusCode: 404, statusMessage: 'Подію не знайдено' })
}

const project = getProject(event.project)!
const speakers = creditsByRole(event.people)
const siblings = eventsOfProject(project.slug).filter(other => other.slug !== event.slug)
const toTiles = (slugs: string[] = []) => slugs.map(getOrganization).filter(org => !!org).map(org => ({ org: org!, projects: [{ slug: project.slug, title: project.title }] }))
// Partners of this particular event; donor credits of the project repeat on each of its events (funders ask for them in every event description).
const partners = toTiles(event.partners)
const donors = toTiles(project.donors)

useSeoMeta({ title: event.title, description: `${formatRange(event.start, event.end)} · ${venueLine(event.venue)}` })

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
      organizer: { '@type': 'Organization', name: 'ГО «Символ»', url: 'https://symbol.ngo' }
    })
  }]
})

const googleUrl = computed(() => {
  const stamp = (iso: string, fallbackTime: string) => `${iso.slice(0, 10).replace(/-/g, '')}T${iso.length > 10 ? iso.slice(11, 16).replace(':', '') : fallbackTime}00`
  const start = stamp(event.start, '0000')
  const end = stamp(event.end ?? event.start, '2359')
  const params = new URLSearchParams({ action: 'TEMPLATE', text: event.title, dates: `${start}/${end}`, location: venueLine(event.venue), ctz: 'Europe/Kyiv' })
  return `https://calendar.google.com/calendar/render?${params}`
})
</script>

<template>
  <article v-if="event" class="page container event-page">
    <Breadcrumbs :items="[{ label: 'Проєкти', to: '/projects' }, { label: `${project.title} · ${projectYears(project)}`, to: `/projects/${project.slug}` }, { label: event.title }]" />
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ formats[event.format] }}</span>
      <h1>{{ event.title }}</h1>
    </div>
    <div class="project-content">
      <aside>
        <dl class="facts">
          <div><dt>Коли</dt><dd>{{ formatRange(event.start, event.end) }}</dd></div>
          <div><dt>Де</dt><dd>{{ venueLine(event.venue) }}</dd></div>
          <div><dt>Проєкт</dt><dd><NuxtLink :to="`/projects/${project.slug}`">{{ project.title }}</NuxtLink></dd></div>
        </dl>
        <div class="button-stack">
          <a v-if="event.registrationUrl && isUpcoming(event)" class="button button--dark" :href="event.registrationUrl" target="_blank" rel="noreferrer">Зареєструватися</a>
          <a class="button" :href="googleUrl" target="_blank" rel="noreferrer">Додати в Google Calendar</a>
        </div>
      </aside>
      <div class="project-sections">
        <section v-if="event.gallery?.length">
          <h2 class="section-title">Фото</h2>
          <PhotoGallery :photos="event.gallery" />
        </section>
        <section v-if="event.description">
          <h2 class="section-title">Про подію</h2>
          <RichText class="lead-text" :paragraphs="event.description" />
        </section>
        <section v-if="speakers.length">
          <h2 class="section-title">Люди</h2>
          <div class="credits">
            <div v-for="group in speakers" :key="group.role" class="credits__group">
              <h3>{{ group.role }}</h3>
              <p>
                <template v-for="(person, index) in group.people" :key="person.slug">
                  <NuxtLink v-if="person.hasPage !== false" :to="`/people/${person.slug}`">{{ person.name }}</NuxtLink>
                  <template v-else>{{ person.name }}</template>
                  <template v-if="index < group.people.length - 1">, </template>
                </template>
              </p>
            </div>
          </div>
        </section>
        <section v-if="partners.length || donors.length">
          <h2 class="section-title">Партнери й донори</h2>
          <div class="credits">
            <div v-if="partners.length" class="credits__group">
              <h3>Партнери</h3>
              <PartnerTiles :items="partners" />
            </div>
            <div v-if="donors.length" class="credits__group">
              <h3>За підтримки</h3>
              <PartnerTiles :items="donors" />
            </div>
          </div>
          <p v-if="project.donorCredit" class="donor-credit">{{ project.donorCredit }}</p>
          <p v-if="project.fundingNotice" class="donor-credit donor-credit--notice">{{ project.fundingNotice }}</p>
        </section>
        <section v-if="siblings.length">
          <h2 class="section-title">Інші події проєкту</h2>
          <div class="event-list">
            <NuxtLink v-for="other in siblings" :key="other.slug" class="event-row" :to="`/events/${other.slug}`">
              <time class="event-row__date" :datetime="other.start">{{ formatRange(other.start, other.end) }}</time>
              <span class="event-row__title">{{ other.title }}</span>
              <span class="event-row__meta"><span>{{ formats[other.format] }}</span></span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>
