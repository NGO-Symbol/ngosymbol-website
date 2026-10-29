<script setup lang="ts">
// Partners and donors as interactive tiles: each opens the organisation's site (or social profile).
// With a logo file the logo is shown and animated on hover; until then a monogram orbits the name.
import type { Organization } from '~/data/types'

defineProps<{ items: { org: Organization; projects: { slug: string; title: string }[] }[] }>()
const monogram = (name: string) => name.replace(/[«»"]/g, '').split(/\s+/).filter(word => /^[A-ZА-ЯІЇЄҐ]/.test(word)).slice(0, 2).map(word => word[0]).join('') || name[0]
</script>

<template>
  <ul class="partners">
    <li v-for="{ org, projects: list } in items" :key="org.slug">
      <component :is="org.url ? 'a' : 'div'" class="partner" :href="org.url" :target="org.url ? '_blank' : undefined" :rel="org.url ? 'noreferrer' : undefined">
        <span class="partner__mark" aria-hidden="true">
          <img v-if="org.logo" :src="org.logo" alt="">
          <template v-else>{{ monogram(org.name) }}</template>
        </span>
        <span class="partner__name">{{ org.name }}<template v-if="org.url"> ↗</template></span>
        <span class="partner__projects">{{ list.map(project => project.title).join(' · ') }}</span>
      </component>
    </li>
  </ul>
</template>

<style scoped>
.partners { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; }
.partner { height: 100%; display: grid; grid-template-columns: 56px 1fr; grid-template-rows: auto 1fr; gap: 4px 14px; align-items: center; padding: 16px; border: 1px solid var(--symbol-plum); text-decoration: none; overflow: hidden; position: relative; transition: background .3s ease; }
a.partner:hover { background: var(--symbol-white); }
.partner__mark { grid-row: span 2; width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--symbol-lilac); font-family: 'Newsreader', Georgia, serif; font-size: 1.3rem; transition: transform .7s cubic-bezier(.2, 1.2, .3, 1), background .3s ease; }
.partner__mark img { width: 100%; height: 100%; object-fit: contain; }
a.partner:hover .partner__mark { transform: rotate(360deg) scale(1.08); background: var(--symbol-apricot); }
.partner__name { font-weight: 500; line-height: 1.3; }
.partner__projects { font-size: .8rem; line-height: 1.4; color: color-mix(in srgb, var(--symbol-plum) 75%, transparent); align-self: start; }
</style>
