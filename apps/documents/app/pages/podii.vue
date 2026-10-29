<script setup lang="ts">
// The parallel programme of the exhibition, from the main site's events (one source of truth). Texts are in Ukrainian.
const { isEn, t } = useLang()
useSeoMeta({ title: () => t('Події', 'Events'), description: () => t('Паралельна програма виставки «Покажіть свої документи…»: екскурсії, розмови, дискусії, перформанси.', 'The programme of the exhibition «May I See Your Documents…»: tours, talks, discussions, performances.') })
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('Паралельна програма', 'Programme') }} · {{ programme.length }}</span>
      <h1>{{ t('Події', 'Events') }}</h1>
      <p>{{ t('Екскурсії, розмови з митцями, лекція й дискусії з Центром прав людини ZMINA, плейбек-театр і музичний перформанс. Усі події відбулися в ЄрміловЦентрі (майдан Свободи, 4, Харків).', 'Curators’ tours, artist talks, a lecture and discussions with the ZMINA Human Rights Centre, playback theatre and a music performance. All events took place at YermilovCentre (4 Svobody Square, Kharkiv). Descriptions are in Ukrainian.') }}</p>
    </div>
    <ol class="programme">
      <li v-for="event in programme" :id="event.slug" :key="event.slug" class="event">
        <div class="event__date">
          <span class="event__day">{{ formatDay(event.start).numeric }}</span>
          <span v-if="formatDay(event.start).time" class="docs-label">{{ formatDay(event.start).time }}</span>
        </div>
        <div class="event__body">
          <h2>{{ event.title }}</h2>
          <div v-if="event.description" class="docs-text"><DocText v-for="paragraph in event.description" :key="paragraph" :text="paragraph" /></div>
          <DocsPhotoGallery v-if="event.gallery?.length" class="event__photos" :photos="event.gallery" />
          <a class="event__more" :href="`${SYMBOL}/events/${event.slug}`">{{ t('Подія на symbol.ngo', 'Event on symbol.ngo') }}</a>
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
  .event { grid-template-columns: 1fr; gap: 10px; }
  .event__date { grid-auto-flow: column; justify-content: start; align-items: center; gap: 10px; }
  .event__day { font-size: 1.8rem; }
}
</style>
