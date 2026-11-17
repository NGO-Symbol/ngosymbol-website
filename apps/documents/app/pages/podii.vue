<script setup lang="ts">
import { eventsEn } from '#symbol/events-en'
const { isEn, t } = useLang()
// declared before usePageSeo: its graph is evaluated right away in the browser
// Every programme event took place at the exhibition venue (the page text says so).
const venue = computed(() => ({ '@type': 'Place', name: t('ЄрміловЦентр', 'Yermilov Centre'), address: { '@type': 'PostalAddress', streetAddress: t('майдан Свободи, 4', '4 Svobody Square'), addressLocality: t('Харків', 'Kharkiv'), addressCountry: 'UA' } }))
const eventCopy = (event: (typeof programme)[number]) => isEn.value ? eventsEn[event.slug] ?? event : event
usePageSeo({
  title: () => t('Події', 'Events'),
  description: () => t('Паралельна програма виставки «Покажіть свої документи…»: екскурсії, розмови з митцями, лекція, дискусії, плейбек-театр і музичний перформанс.', 'The programme of the exhibition «May I See Your Documents…»: tours, artist talks, a lecture, discussions, playback theatre and a music performance.'),
  graph: () => [
    {
      '@type': 'CollectionPage',
      url: docsUrl('/podii', isEn.value),
      name: t('Події', 'Events'),
      inLanguage: isEn.value ? 'en' : 'uk',
      about: { '@id': exhibitionId(isEn.value) },
      isPartOf: { '@id': docsSiteId(isEn.value) },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: programme.map((event, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${docsUrl('/podii', isEn.value)}#${event.slug}`,
          item: { '@type': 'Event', name: eventCopy(event).title, startDate: kyivDateTime(event.start), endDate: kyivDateTime(event.end ?? event.start), eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', location: venue.value, url: pageUrlOf(`/events/${event.slug}`, isEn.value), superEvent: { '@id': exhibitionId(isEn.value) } }
        }))
      }
    },
    docsBreadcrumbs(isEn.value, t('Події', 'Events'), '/podii')
  ]
})
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('Паралельна програма', 'Programme') }} · {{ programme.length }}</span>
      <h1>{{ t('Події', 'Events') }}</h1>
      <p>{{ t('Екскурсії, розмови з митцями, лекція й дискусії з Центром прав людини ZMINA, плейбек-театр і музичний перформанс. Усі події відбулися в ЄрміловЦентрі (майдан Свободи, 4, Харків).', 'Curators’ tours, artist talks, a lecture and discussions with the ZMINA Human Rights Centre, playback theatre and a music performance. All events took place at YermilovCentre (4 Svobody Square, Kharkiv).') }}</p>
    </div>
    <ol class="programme">
      <li v-for="event in programme" :id="event.slug" :key="event.slug" class="event">
        <div class="event__date">
          <span class="event__day">{{ formatDay(event.start).numeric }}</span>
          <span v-if="formatDay(event.start).time" class="docs-label">{{ formatDay(event.start).time }}</span>
        </div>
        <div class="event__body">
          <h2>{{ eventCopy(event).title }}</h2>
          <div v-if="eventCopy(event).description" class="docs-text"><DocText v-for="paragraph in eventCopy(event).description" :key="paragraph" :text="paragraph" /></div>
          <DocsPhotoGallery v-if="event.gallery?.length" class="event__photos" :photos="event.gallery" />
          <a class="event__more" :href="`${SYMBOL}${isEn ? '/en' : ''}/events/${event.slug}/`">{{ t('Подія на symbol.ngo', 'Event on symbol.ngo') }}</a>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.programme { list-style: none; margin: 0; padding: 0; }
.event { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 24px; padding: 28px 0; border-top: 2px dashed var(--docs-ink); }
.event__date { display: grid; gap: 6px; align-content: start; justify-items: start; }
.event__day { font-family: var(--docs-display); font-size: 2.4rem; line-height: 1; }
.event h2 { font-size: clamp(1.3rem, calc(.9rem + 1.4vw), 2rem); margin-bottom: 12px; }
.event__photos { margin: 8px 0 12px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr)); }
.event__more { font-size: .85rem; }
@media (max-width: 640px) {
  .event { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .event__date { grid-auto-flow: column; justify-content: start; align-items: center; gap: 10px; }
  .event__day { font-size: 1.8rem; }
}
</style>
