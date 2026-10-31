<script setup lang="ts">
// Partners and donors as interactive tiles: each opens the organisation's site (or social profile).
// Logos are transparent and move in the rhythm of their own identity (PartnerLogo) when the visitor hovers or taps
// them. Organizations without a logo file show their name only.
// Compact ledger (always on phones; on every screen with `compact`, e.g. the home page): logos only, in a grid with
// hairline rules and no captions (the name stays the link's accessible label). Long lists show the most significant
// first rows and open the rest with one button.
import type { Organization } from '~/data/types'
import { isSocialUrl, networkOf } from '~/utils/social'
import { organizationsEn } from '~/data/organizations-en'
import { projectsEn } from '~/data/projects-en'

const props = defineProps<{ items: { org: Organization; projects: { slug: string; title: string }[] }[]; compact?: boolean }>()

/** Tiles shown before «show all»: three rows on phones (3 × 3), two rows in the desktop ledger (6 × 2). */
const PHONE_FIRST = 9
const DESKTOP_FIRST = 12
const open = ref(false)
const collapsible = computed(() => props.items.length > PHONE_FIRST + 3)
const { isEn } = useLang()
const orgName = (org: Organization) => isEn.value ? organizationsEn[org.slug] ?? org.name : org.name
const projectName = (project: { slug: string; title: string }) => isEn.value ? projectsEn[project.slug]?.title ?? project.title : project.title
</script>

<template>
  <div class="partners-wrap" :class="{ 'partners-wrap--compact': compact }">
    <ul class="partners" :class="{ 'is-collapsed': collapsible && !open, 'is-desktop-collapsed': compact && items.length > DESKTOP_FIRST && !open }">
      <li v-for="{ org, projects: list } in items" :key="org.slug">
        <component :is="org.url ? 'a' : 'div'" class="partner" :class="{ 'partner--text': !org.logo }" :href="org.url" :target="org.url ? '_blank' : undefined" :rel="org.url ? 'noreferrer' : undefined" :title="orgName(org)">
          <PartnerLogo v-if="org.logo" :src="org.logo" :src-dark="org.logoDark" :name="orgName(org)" :slug="org.slug" :motion="org.motion" />
          <span class="partner__name">{{ orgName(org) }}<template v-if="org.url">&nbsp;<SocialIcon v-if="isSocialUrl(org.url)" class="partner__network" :network="networkOf(org.url).network" /></template></span>
          <span class="partner__projects">{{ list.map(projectName).join(' · ') }}</span>
        </component>
      </li>
    </ul>
    <button v-if="collapsible || (compact && items.length > DESKTOP_FIRST)" type="button" class="partners__more" :class="{ 'partners__more--desktop': compact }" :aria-expanded="open" @click="open = !open">
      {{ open ? (isEn ? 'Show less' : 'Згорнути') : (isEn ? `All ${items.length}` : `Усі ${items.length}`) }}
    </button>
  </div>
</template>

<style scoped>
.partners { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; }
.partner { height: 100%; display: grid; grid-template-rows: auto auto 1fr; gap: 8px; padding: 18px; border: 1px solid var(--symbol-plum); text-decoration: none; overflow: hidden; position: relative; transition: background .3s ease, transform .3s ease; }
a.partner:hover { background: var(--symbol-white); transform: translateY(-3px); }
.partner__name { font-weight: 500; line-height: 1.3; }
.partner--text .partner__name { font-family: var(--font-display); font-weight: 400; font-size: 1.35rem; line-height: 1.15; padding-top: 6px; border-top: 3px solid var(--symbol-lilac); }
.partner__network { vertical-align: -.15em; }
.partner__projects { font-size: .8rem; line-height: 1.4; color: color-mix(in srgb, var(--symbol-plum) 75%, transparent); align-self: start; }
.partners__more { display: none; width: 100%; justify-content: center; margin-top: 10px; min-height: 44px; padding: 10px 18px; border: 1px solid var(--symbol-plum); border-radius: 999px; background: transparent; color: var(--symbol-plum); font: inherit; font-size: .9rem; cursor: pointer; }

/* Ledger on desktop when compact: six logos to a row, two rows first. */
.partners-wrap--compact .partners { --rule: color-mix(in srgb, currentColor 22%, transparent); grid-template-columns: repeat(6, 1fr); gap: 0; border-top: 1px solid var(--rule); border-left: 1px solid var(--rule); }
.partners-wrap--compact .partners li { border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.partners-wrap--compact .partners.is-desktop-collapsed li:nth-child(n + 13) { display: none; }
.partners-wrap--compact .partner { aspect-ratio: 3 / 2; grid-template-rows: 1fr; place-items: center; padding: 14px 16px; border: 0; }
.partners-wrap--compact a.partner:hover { transform: none; }
.partners-wrap--compact .partner :deep(.partner-logo) { height: 100%; width: 100%; min-width: 0; justify-content: center; }
.partners-wrap--compact .partner :deep(.partner-logo img) { width: 100%; height: 60px; max-height: none; object-position: center; }
.partners-wrap--compact .partner :deep(.partner-logo__svg) { width: 100%; height: 60px; }
.partners-wrap--compact .partner :deep(.partner-logo__svg svg) { width: 100%; height: 100%; max-width: none; max-height: none; }
.partners-wrap--compact .partner__projects, .partners-wrap--compact .partner:not(.partner--text) .partner__name { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.partners-wrap--compact .partner--text .partner__name { font-size: .82rem; line-height: 1.2; text-align: center; padding: 0; border: 0; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.partners-wrap--compact .partner--text .partner__network { display: none; }
.partners__more--desktop { display: flex; max-width: 320px; margin-inline: auto; margin-top: 18px; }

@media (max-width: 600px) {
  /* Hairline ledger: cells share their rules, so it sits on any section tone. */
  .partners, .partners-wrap--compact .partners { --rule: color-mix(in srgb, currentColor 22%, transparent); grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--rule); border-left: 1px solid var(--rule); }
  .partners li { border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .partners.is-collapsed li:nth-child(n + 10) { display: none; }
  .partners-wrap--compact .partners.is-desktop-collapsed li:nth-child(n + 10) { display: none; }
  .partner, .partners-wrap--compact .partner { aspect-ratio: 1; grid-template-rows: 1fr; place-items: center; padding: 14px 10px; border: 0; }
  a.partner:hover { transform: none; }
  .partner :deep(.partner-logo) { height: 100%; width: 100%; min-width: 0; justify-content: center; }
  .partner :deep(.partner-logo img), .partners-wrap--compact .partner :deep(.partner-logo img) { width: 100%; height: 56px; max-height: none; object-position: center; }
  .partner :deep(.partner-logo__svg), .partners-wrap--compact .partner :deep(.partner-logo__svg) { width: 100%; height: 56px; }
  .partner :deep(.partner-logo__svg svg) { width: 100%; height: 100%; max-width: none; max-height: none; }
  .partner__projects, .partner:not(.partner--text) .partner__name { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .partner--text .partner__name { font-size: .78rem; line-height: 1.2; text-align: center; padding: 0; border: 0; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
  .partner--text .partner__network { display: none; }
  .partners__more { display: flex; max-width: none; }
}
</style>
