<script setup lang="ts">
// An artist of the exhibition: portrait, biography from the original site, the work(s) with their texts and
// photographs, and the full page on symbol.ngo (biography, links, other projects). Texts are in Ukrainian.
import { chekalPhotos, workPhotos } from '~/data/workPhotos'

const { isEn, t, localePath } = useLang()
const route = useRoute()
const artist = getArtist(String(route.params.slug))
if (!artist) throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })

useSeoMeta({ title: artist.name, description: artist.bio[0] })
const index = exhibitionArtists.indexOf(artist)
const prev = exhibitionArtists[(index - 1 + exhibitionArtists.length) % exhibitionArtists.length]!
const next = exhibitionArtists[(index + 1) % exhibitionArtists.length]!
// Photographs of the works: Петро Чекаль's exhibition shots where there are any, otherwise the pictures from the
// original site and the person's works on symbol.ngo; plus exhibition photos of symbol.ngo that show this artist's work.
const alt = `${artist.name}: ${t('робота на виставці', 'work at the exhibition')}`
const byChekal = chekalPhotos(artist.slug).map(src => ({ src, alt, credit: 'Петро Чекаль' }))
const exhibitionShots = (exhibition.gallery ?? []).filter(photo => artist.works.some(work => photo.alt.includes(`«${work.title}»`)))
const photos = [
  ...(byChekal.length ? byChekal : [
    ...workPhotos(artist.slug).map(src => ({ src, alt })),
    ...(artist.person?.works ?? []),
    ...artist.coAuthors.flatMap(person => person.works ?? [])
  ]),
  ...exhibitionShots
]
</script>

<template>
  <article class="docs-container docs-page">
    <nav class="crumbs" :aria-label="t('Навігація', 'Navigation')">
      <NuxtLink :to="localePath('/mytsi')">← {{ t('Усі митці', 'All artists') }}</NuxtLink>
      <span>{{ index + 1 }} / {{ exhibitionArtists.length }}</span>
    </nav>
    <header class="artist-head">
      <img v-if="artist.person?.photo" class="artist-head__photo" :src="artist.person.photo" :alt="artist.name">
      <div>
        <span class="docs-label">{{ artist.coAuthors.length ? t('Митці виставки', 'Artists of the exhibition') : t('Митець виставки', 'Artist of the exhibition') }}</span>
        <h1>{{ artist.name }}</h1>
        <p v-if="isEn" class="lang-note">Texts about the artists are available in Ukrainian.</p>
        <div class="docs-text"><p v-for="paragraph in artist.bio" :key="paragraph">{{ paragraph }}</p></div>
        <p class="artist-head__links">
          <a class="docs-button" :href="symbolPersonUrl(artist.slug)">{{ t('Сторінка на symbol.ngo', 'Profile on symbol.ngo') }}</a>
          <a v-for="person in artist.coAuthors" :key="person.slug" class="docs-button" :href="symbolPersonUrl(person.slug)">{{ person.name }}</a>
        </p>
      </div>
    </header>

    <div class="docs-barcode" aria-hidden="true" />

    <h2 class="docs-section-title">{{ t('Кураторський текст', 'Curatorial text') }}</h2>
    <section v-for="work in artist.works" :key="work.title" class="work">
      <div class="work__title">
        <span class="docs-label">{{ t('Робота', 'Work') }}<template v-if="work.year"> · {{ work.year }}</template></span>
        <h2 class="docs-section-title">«{{ work.title }}»</h2>
      </div>
      <div class="docs-text"><p v-for="paragraph in work.text" :key="paragraph">{{ paragraph }}</p></div>
    </section>

    <template v-if="photos.length">
      <h2 class="docs-section-title">{{ t('Роботи на виставці', 'Works at the exhibition') }}</h2>
      <ul class="docs-photos">
        <li v-for="photo in photos" :key="photo.src"><figure><img :src="photo.src" :alt="photo.alt" loading="lazy"><figcaption v-if="'credit' in photo && photo.credit">{{ t('Фото', 'Photo') }}: {{ photo.credit }}</figcaption></figure></li>
      </ul>
    </template>

    <nav class="pager" :aria-label="t('Інші митці', 'Other artists')">
      <NuxtLink :to="localePath(`/mytsi/${prev.slug}`)"><span class="docs-label">← {{ t('Попередній', 'Previous') }}</span><span>{{ prev.name }}</span></NuxtLink>
      <NuxtLink class="pager__next" :to="localePath(`/mytsi/${next.slug}`)"><span class="docs-label">{{ t('Наступний', 'Next') }} →</span><span>{{ next.name }}</span></NuxtLink>
    </nav>
  </article>
</template>

<style scoped>
.crumbs { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 24px; font-size: .85rem; }
.crumbs span { color: var(--docs-muted); }
.artist-head { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 32px; align-items: start; }
.artist-head__photo { width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(1) contrast(1.05); }
.artist-head h1 { font-size: clamp(2.2rem, calc(1rem + 4.5vw), 4.4rem); margin: 12px 0 20px; }
.artist-head__links { display: flex; flex-wrap: wrap; gap: 10px; }
.lang-note { font-size: .8rem; color: var(--docs-muted); }
.work { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 32px; margin-bottom: 40px; }
.work__title { display: grid; gap: 10px; align-content: start; }
.pager { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 64px; padding-top: 20px; border-top: 2px dashed var(--docs-ink); }
.pager a { display: grid; gap: 8px; justify-items: start; text-decoration: none; font-family: var(--docs-display); font-size: clamp(1.2rem, calc(.9rem + 1.4vw), 2rem); text-transform: uppercase; line-height: 1; }
.pager a:hover span:last-child { text-decoration: underline; text-decoration-thickness: 2px; }
.pager__next { justify-items: end !important; text-align: right; }
@media (max-width: 760px) {
  .artist-head, .work { grid-template-columns: 1fr; gap: 16px; }
  .artist-head__photo { max-width: 220px; }
}
</style>
