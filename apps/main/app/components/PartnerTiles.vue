<script setup lang="ts">
// Partners and donors as interactive tiles: each opens the organisation's site (or social profile).
// Logos are transparent and move in the rhythm of their own identity (PartnerLogo): once when the tile
// scrolls into view and again on hover (both handled by PartnerLogo). Organizations without a logo file show their name only.
import type { Organization } from '~/data/types'
import { isSocialUrl, networkOf } from '~/utils/social'

defineProps<{ items: { org: Organization; projects: { slug: string; title: string }[] }[] }>()
</script>

<template>
  <ul class="partners">
    <li v-for="{ org, projects: list } in items" :key="org.slug">
      <component :is="org.url ? 'a' : 'div'" class="partner" :class="{ 'partner--text': !org.logo }" :href="org.url" :target="org.url ? '_blank' : undefined" :rel="org.url ? 'noreferrer' : undefined">
        <PartnerLogo v-if="org.logo" :src="org.logo" :src-dark="org.logoDark" :name="org.name" :slug="org.slug" :motion="org.motion" />
        <span class="partner__name">{{ org.name }}<template v-if="org.url">&nbsp;<SocialIcon v-if="isSocialUrl(org.url)" class="partner__network" :network="networkOf(org.url).network" /></template></span>
        <span class="partner__projects">{{ list.map(project => project.title).join(' · ') }}</span>
      </component>
    </li>
  </ul>
</template>

<style scoped>
.partners { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
.partner { height: 100%; display: grid; grid-template-rows: auto auto 1fr; gap: 8px; padding: 18px; border: 1px solid var(--symbol-plum); text-decoration: none; overflow: hidden; position: relative; transition: background .3s ease, transform .3s ease; }
a.partner:hover { background: var(--symbol-white); transform: translateY(-3px); }
.partner__name { font-weight: 500; line-height: 1.3; }
.partner--text .partner__name { font-family: var(--font-display); font-weight: 400; font-size: 1.35rem; line-height: 1.15; padding-top: 6px; border-top: 3px solid var(--symbol-lilac); }
.partner__network { vertical-align: -.15em; }
.partner__projects { font-size: .8rem; line-height: 1.4; color: color-mix(in srgb, var(--symbol-plum) 75%, transparent); align-self: start; }
</style>
