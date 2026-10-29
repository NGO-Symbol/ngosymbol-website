<script setup lang="ts">
// An artist of the exhibition: portrait, the biography from the original site, the work(s) with their texts and
// photographs, and the full page on symbol.ngo (biography, links, other projects).
const route = useRoute()
const artist = getArtist(String(route.params.slug))
if (!artist) throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })

useSeoMeta({ title: artist.name, description: artist.bio[0] })
const index = exhibitionArtists.indexOf(artist)
const next = exhibitionArtists[(index + 1) % exhibitionArtists.length]!
const photos = [...(artist.person?.works ?? []), ...artist.coAuthors.flatMap(person => person.works ?? [])]
</script>

<template>
  <article class="docs-container docs-page">
    <NuxtLink class="back" to="/mytsi">← Усі митці</NuxtLink>
    <header class="artist-head">
      <img v-if="artist.person?.photo" class="artist-head__photo" :src="artist.person.photo" :alt="artist.name">
      <div>
        <span class="docs-label">{{ artist.coAuthors.length ? 'Митці виставки' : 'Митець виставки' }}</span>
        <h1>{{ artist.name }}</h1>
        <div class="docs-text"><p v-for="paragraph in artist.bio" :key="paragraph">{{ paragraph }}</p></div>
        <p class="artist-head__links">
          <a :href="symbolPersonUrl(artist.slug)">Сторінка {{ artist.coAuthors.length ? 'Дари Шолох' : 'митця' }} на symbol.ngo ↗</a>
          <a v-for="person in artist.coAuthors" :key="person.slug" :href="symbolPersonUrl(person.slug)">{{ person.name }} на symbol.ngo ↗</a>
        </p>
      </div>
    </header>

    <div class="docs-barcode" aria-hidden="true" />

    <section v-for="work in artist.works" :key="work.title" class="work">
      <div class="work__title">
        <span v-if="work.year" class="docs-label">{{ work.year }}</span>
        <h2 class="docs-section-title">«{{ work.title }}»</h2>
      </div>
      <div class="docs-text"><p v-for="paragraph in work.text" :key="paragraph">{{ paragraph }}</p></div>
    </section>

    <ul v-if="photos.length" class="docs-photos">
      <li v-for="photo in photos" :key="photo.src"><figure><img :src="photo.src" :alt="photo.alt" loading="lazy"></figure></li>
    </ul>

    <NuxtLink class="next" :to="`/mytsi/${next.slug}`"><span class="docs-label">Далі</span><span>{{ next.name }} →</span></NuxtLink>
  </article>
</template>

<style scoped>
.back { display: inline-block; margin-bottom: 24px; font-size: .85rem; }
.artist-head { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 32px; align-items: start; }
.artist-head__photo { width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(1) contrast(1.05); }
.artist-head h1 { font-size: clamp(2.2rem, calc(1rem + 4.5vw), 4.4rem); margin: 12px 0 20px; }
.artist-head__links { display: grid; gap: 6px; font-size: .9rem; }
.work { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 32px; margin-bottom: 40px; }
.work__title { display: grid; gap: 10px; align-content: start; }
.next { display: grid; gap: 8px; width: fit-content; margin-top: 64px; font-family: var(--docs-display); font-size: clamp(1.5rem, calc(1rem + 2vw), 2.4rem); text-transform: uppercase; text-decoration: none; line-height: 1; }
.next:hover span:last-child { text-decoration: underline; text-decoration-thickness: 2px; }
.next .docs-label { width: fit-content; }
@media (max-width: 760px) {
  .artist-head, .work { grid-template-columns: 1fr; gap: 16px; }
  .artist-head__photo { max-width: 220px; }
}
</style>
