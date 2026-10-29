<script setup lang="ts">
const { isEn, t, localePath } = useLang()
const backHref = ref(isEn.value ? `${SYMBOL}/en` : SYMBOL)
onMounted(() => { backHref.value = returnUrl(isEn.value) })
const links = computed(() => [
  { to: '/', label: t('Про виставку', 'About') },
  { to: '/kontseptsiia', label: t('Концепція', 'Concept') },
  { to: '/mytsi', label: t('Митці', 'Artists') },
  { to: '/podii', label: t('Події', 'Events') },
  { to: '/presa', label: t('Преса', 'Press') },
  { to: '/komanda', label: t('Команда', 'Team') }
])
</script>

<template>
  <footer class="docs-footer">
    <div class="docs-container docs-footer__inner">
      <div>
        <p class="docs-footer__title">{{ t('Покажіть свої документи…', 'May I See Your Documents…') }}</p>
        <p>{{ t('Виставка сучасного мистецтва · ЄрміловЦентр, Харків · 17.10–07.12.2025', 'Contemporary art exhibition · YermilovCentre, Kharkiv · 17.10–07.12.2025') }}</p>
      </div>
      <nav class="docs-footer__nav" :aria-label="t('Розділи', 'Sections')">
        <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)">{{ link.label }}</NuxtLink>
      </nav>
      <div class="docs-footer__symbol">
        <a class="docs-footer__back" :href="backHref" @click="leaveTo($event, backHref)">← {{ t('Сайт ГО «Символ»', 'NGO Symbol website') }}</a>
        <a :href="`${SYMBOL}/projects/pokazhit-svoi-dokumenty`">{{ t('Проєкт на symbol.ngo', 'The project on symbol.ngo') }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.docs-footer { margin-top: 96px; background: var(--docs-ink); color: var(--docs-paper); font-family: var(--docs-mono); font-size: .85rem; }
.docs-footer__inner { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr); gap: 24px; padding-block: 40px; }
.docs-footer p { margin: 0 0 6px; }
.docs-footer__title { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.6rem; line-height: 1; }
.docs-footer__nav, .docs-footer__symbol { display: grid; gap: 8px; align-content: start; justify-items: start; }
.docs-footer a { color: inherit; }
.docs-footer__back { padding: 6px 12px; border-radius: 999px; background: #9280a6; color: #fff7eb !important; text-decoration: none; }
@media (max-width: 760px) { .docs-footer__inner { grid-template-columns: 1fr; } }
</style>
