<script setup lang="ts">
useSeoMeta({ title: 'Митці', description: 'Митці виставки «Покажіть свої документи…» та їхні роботи.' })
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">20 митців</span>
      <h1>Митці</h1>
    </div>
    <ul class="artists">
      <li v-for="artist in exhibitionArtists" :key="artist.slug">
        <NuxtLink class="artist" :to="`/mytsi/${artist.slug}`">
          <img v-if="artist.person?.photo" :src="artist.person.photo" :alt="artist.name" loading="lazy">
          <span v-else class="artist__blank" aria-hidden="true" />
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
.artist img, .artist__blank { width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(1) contrast(1.05); background: var(--docs-line); transition: filter .3s ease; }
.artist:hover img { filter: none; }
.artist__name { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.3rem; line-height: 1.05; }
.artist:hover .artist__name { text-decoration: underline; text-decoration-thickness: 2px; }
.artist__works { font-size: .8rem; color: var(--docs-muted); line-height: 1.4; }
</style>
