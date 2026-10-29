<script setup lang="ts">
// Team page of the original site: the exhibition credits (from the main site's project data) and the NGO.
import { aboutSymbol, aboutSymbolEn } from '~/data/concept'

const { isEn, t } = useLang()
useSeoMeta({ title: () => t('Команда', 'Team'), description: () => t('Команда виставки «Покажіть свої документи…» та ГО «Символ».', 'The team of «May I See Your Documents…» and NGO Symbol.') })
const roleEn: Record<string, string> = { 'Куратори': 'Curators', 'Менеджерка проєкту': 'Project manager', 'Дизайн айдентики та шрифт EXDocument': 'Identity design and the EXDocument typeface', 'Координація від ЄрміловЦентру': 'Coordination, YermilovCentre' }
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('Хто зробив виставку', 'Who made the exhibition') }}</span>
      <h1>{{ t('Команда', 'Team') }}</h1>
    </div>
    <ul class="team">
      <li v-for="credit in team" :key="credit.person.slug + credit.role">
        <a class="member" :href="symbolPersonUrl(credit.person.slug)">
          <img v-if="credit.person.photo" :src="credit.person.photo" :alt="credit.person.name" loading="lazy">
          <span v-else class="member__blank" aria-hidden="true" />
          <span class="member__name">{{ credit.person.name }}</span>
          <span class="docs-label">{{ isEn ? (roleEn[credit.role] ?? credit.role) : credit.role }}</span>
        </a>
      </li>
    </ul>

    <div class="docs-barcode" aria-hidden="true" />
    <h2 class="docs-section-title">{{ t('ГО «Символ»', 'NGO Symbol') }}</h2>
    <div class="docs-text">
      <p v-for="paragraph in (isEn ? aboutSymbolEn : aboutSymbol)" :key="paragraph">{{ paragraph }}</p>
      <p><a class="docs-button" :href="SYMBOL">symbol.ngo</a></p>
    </div>
    <p class="partners">{{ isEn ? 'Organised by NGO «Symbol», YermilovCentre and V. N. Karazin Kharkiv National University. Donors: the Ministry of Culture of Ukraine (Grant of the President of Ukraine for young artists) and Grynyov Art Collection. Partner: ZMINA Human Rights Centre.' : exhibition.donorCredit }}</p>
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
