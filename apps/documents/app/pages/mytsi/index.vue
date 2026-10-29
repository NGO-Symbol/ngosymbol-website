<script setup lang="ts">
import { workPhotos } from '~/data/workPhotos'

const { t, localePath } = useLang()
useSeoMeta({ title: () => t('Митці', 'Artists'), description: () => t('Митці виставки «Покажіть свої документи…» та їхні роботи.', 'Artists of the exhibition «May I See Your Documents…» and their works.') })
// A work photo for the card when there is one, the portrait otherwise.
const cover = (slug: string, photo?: string) => workPhotos(slug)[0] ?? photo
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('20 митців і мисткинь · 18 проєктів', '20 artists · 18 projects') }}</span>
      <h1>{{ t('Митці', 'Artists') }}</h1>
      <p>{{ t('Кожна сторінка — біографія митця, опис роботи на виставці та фотографії. Повна сторінка кожного — на сайті ГО «Символ».', 'Each page has the artist’s biography, the work shown at the exhibition and photographs. Full profiles are on the NGO Symbol website.') }}</p>
    </div>
    <ul class="artists">
      <li v-for="artist in exhibitionArtists" :key="artist.slug">
        <NuxtLink class="artist" :to="localePath(`/mytsi/${artist.slug}`)">
          <span class="artist__media">
            <img v-if="artist.person?.photo" class="artist__portrait" :src="artist.person.photo" :alt="artist.name" loading="lazy">
            <img v-if="workPhotos(artist.slug)[0]" class="artist__work" :src="cover(artist.slug, artist.person?.photo)" alt="" loading="lazy">
          </span>
          <span class="artist__name">{{ artist.name }}</span>
          <span class="artist__works">{{ artist.works.map(work => `«${work.title}»`).join(', ') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.artists { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); gap: 28px 16px; }
.artist { display: grid; gap: 8px; text-decoration: none; }
.artist__media { position: relative; display: block; aspect-ratio: 1; overflow: hidden; background: var(--docs-line); }
.artist__media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.artist__portrait { filter: grayscale(1) contrast(1.05); transition: opacity .35s ease; }
/* On hover the portrait gives way to a photograph of the work. */
.artist__work { opacity: 0; transition: opacity .35s ease; }
.artist:hover .artist__work { opacity: 1; }
.artist__name { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.3rem; line-height: 1.05; }
.artist:hover .artist__name { text-decoration: underline; text-decoration-thickness: 2px; }
.artist__works { font-size: .8rem; color: var(--docs-muted); line-height: 1.4; }
</style>
