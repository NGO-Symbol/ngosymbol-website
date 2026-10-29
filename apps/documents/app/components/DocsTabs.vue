<script setup lang="ts">
// Phone navigation of the project site: index tabs of a document folder along the bottom edge, numbered like case
// files. The open section's tab rises and joins the page; the row scrolls sideways and keeps the open tab in view.
const { t, localePath } = useLang()
const route = useRoute()
const links = computed(() => [
  { to: '/', label: t('Про виставку', 'About') },
  { to: '/kontseptsiia', label: t('Концепція', 'Concept') },
  { to: '/mytsi', label: t('Митці', 'Artists') },
  { to: '/podii', label: t('Події', 'Events') },
  { to: '/presa', label: t('Преса', 'Press') },
  { to: '/komanda', label: t('Команда', 'Team') }
])
const current = computed(() => route.path.replace(/^\/en/, '').replace(/\/$/, '') || '/')
const isActive = (to: string) => (to === '/' ? current.value === '/' : current.value.startsWith(to))

const row = ref<HTMLElement>()
function reveal() {
  nextTick(() => row.value?.querySelector<HTMLElement>('.is-active')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }))
}
onMounted(reveal)
watch(current, reveal)
</script>

<template>
  <nav class="docs-tabs" :aria-label="t('Розділи сайту виставки', 'Exhibition site sections')">
    <div ref="row" class="docs-tabs__row">
      <NuxtLink v-for="(link, index) in links" :key="link.to" :to="localePath(link.to)" class="docs-tab" :class="{ 'is-active': isActive(link.to) }">
        <span class="docs-tab__no">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="docs-tab__label">{{ link.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.docs-tabs { display: none; }
@media (max-width: 640px) {
  .docs-tabs { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; background: var(--docs-ink); padding: 5px 0 env(safe-area-inset-bottom); box-shadow: 0 -6px 18px color-mix(in srgb, var(--docs-ink) 25%, transparent); }
  .docs-tabs__row { display: flex; align-items: flex-end; gap: 4px; padding: 0 12px; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x proximity; }
  .docs-tabs__row::-webkit-scrollbar { display: none; }
  /* A folder index tab: slanted shoulders, a case number above the name. */
  .docs-tab { flex: none; scroll-snap-align: center; display: grid; gap: 1px; min-width: 80px; padding: 5px 12px 6px; clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%); background: color-mix(in srgb, var(--docs-paper) 72%, var(--docs-ink)); color: var(--docs-ink); text-decoration: none; transform: translateY(6px); transition: transform .25s cubic-bezier(.3, 1.4, .5, 1), background .2s ease; }
  .docs-tab__no { font-family: var(--docs-mono); font-size: .62rem; letter-spacing: .12em; opacity: .6; }
  .docs-tab__label { font-family: var(--docs-display); text-transform: uppercase; font-size: .92rem; line-height: 1; white-space: nowrap; }
  .docs-tab.is-active { background: var(--docs-paper); transform: translateY(0); padding-bottom: 9px; }
  .docs-tab.is-active .docs-tab__no { color: var(--docs-stamp); opacity: 1; }
  .docs-tab:active { transform: translateY(2px); }
}
</style>
