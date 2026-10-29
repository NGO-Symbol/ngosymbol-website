<script setup lang="ts">
// Team page of the original site: the exhibition credits (from the main site's project data) and the NGO.
import { aboutSymbol } from '~/data/concept'

useSeoMeta({ title: 'Команда', description: 'Команда виставки «Покажіть свої документи…» та ГО «Символ».' })
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">Хто зробив виставку</span>
      <h1>Команда</h1>
    </div>
    <ul class="team">
      <li v-for="credit in team" :key="credit.person.slug + credit.role">
        <a class="member" :href="symbolPersonUrl(credit.person.slug)">
          <img v-if="credit.person.photo" :src="credit.person.photo" :alt="credit.person.name" loading="lazy">
          <span v-else class="member__blank" aria-hidden="true" />
          <span class="member__name">{{ credit.person.name }}</span>
          <span class="docs-label">{{ credit.role }}</span>
        </a>
      </li>
    </ul>

    <div class="docs-barcode" aria-hidden="true" />
    <h2 class="docs-section-title">ГО «Символ»</h2>
    <div class="docs-text">
      <p v-for="paragraph in aboutSymbol" :key="paragraph">{{ paragraph }}</p>
      <p><a class="docs-button" :href="SYMBOL">symbol.ngo ↗</a></p>
    </div>
    <p class="partners">Партнери виставки: <a href="https://yermilovcentre.org">ЄрміловЦентр</a>, <a href="https://karazin.ua">ХНУ ім. В. Н. Каразіна</a>, <a href="https://zmina.info">Центр прав людини ZMINA</a>.</p>
  </section>
</template>

<style scoped>
.team { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 28px 16px; }
.member { display: grid; gap: 8px; justify-items: start; text-decoration: none; }
.member img, .member__blank { width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(1) contrast(1.05); background: var(--docs-line); transition: filter .3s ease; }
.member:hover img { filter: none; }
.member__name { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.3rem; line-height: 1.05; }
.partners { margin-top: 40px; font-size: .85rem; color: var(--docs-muted); }
</style>
