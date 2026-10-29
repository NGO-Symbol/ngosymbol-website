<script setup lang="ts">
// Home = the curatorial concept, as on the original site; after it the exhibition in photographs.
import { concept, conceptLead } from '~/data/concept'

useSeoMeta({ title: 'Кураторська концепція' })
const photos = (exhibition.gallery ?? []).filter(photo => !photo.people)
</script>

<template>
  <div>
    <ExhibitionHero />
    <section class="docs-container">
      <span class="docs-label">Кураторська концепція</span>
      <p class="docs-lead">{{ conceptLead }}</p>
      <div class="docs-text">
        <template v-for="(block, index) in concept" :key="index">
          <p v-if="block.text">{{ block.text }}</p>
          <ol v-else-if="block.list"><li v-for="item in block.list" :key="item">{{ item }}</li></ol>
        </template>
        <p class="docs-signature">Куратори: <a :href="symbolPersonUrl('petro-chekal')">Петро Чекаль</a>, <a :href="symbolPersonUrl('yurii-rassokha')">Юрій Рассоха</a></p>
      </div>
      <div class="docs-barcode" aria-hidden="true" />
      <h2 class="docs-section-title">Виставка</h2>
      <ul class="docs-photos">
        <li v-for="photo in photos" :key="photo.src">
          <figure><img :src="photo.src" :alt="photo.alt" loading="lazy"><figcaption v-if="photo.credit">Фото: {{ photo.credit }}</figcaption></figure>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.docs-lead { margin: 16px 0 32px; }
.docs-signature { font-size: .85rem; color: var(--docs-muted); }
</style>
