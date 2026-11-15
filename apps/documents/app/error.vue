<script setup lang="ts">
// Error page of the exhibition site, also its static 404.html. On symbol.ngo/documentsart/ GitHub Pages serves the root
// 404.html of symbol.ngo (the main site's error page); this one is served when the site is published on its own address
// (documentsart.symbol.ngo). Built for «/404.html» in Ukrainian, then follows the language of the missing address.
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { isEn, t, localePath } = useLang()
const notFound = computed(() => props.error.statusCode === 404)
useHead({
  meta: [{ name: 'robots', content: 'noindex, follow' }],
  script: [{ tagPosition: 'head', innerHTML: "try{var t=localStorage.getItem('docs-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }],
  htmlAttrs: { lang: () => (isEn.value ? 'en' : 'uk') }
})
usePageSeo({
  title: () => (notFound.value ? t('Сторінку не знайдено', 'Page not found') : t('Щось пішло не так', 'Something went wrong')),
  description: () => t('Такої сторінки немає або її адресу змінено. Перейдіть на головну сторінку виставки чи до одного з її розділів.', 'This page does not exist or its address has changed. Go to the exhibition’s home page or to one of its sections.')
})
const sections = computed(() => [
  { to: '/kontseptsiia', label: t('Концепція', 'Concept') }, { to: '/mytsi', label: t('Митці', 'Artists') }, { to: '/podii', label: t('Події', 'Events') },
  { to: '/presa', label: t('Преса', 'Press') }, { to: '/komanda', label: t('Команда', 'Team') }
])
// A link on the error page leaves it: the error is cleared, the link's own navigation goes on.
const leave = (event: MouseEvent) => { if ((event.target as Element).closest('a')) clearError() }
</script>

<template>
  <div class="docs-site-shell" @click="leave">
    <a class="skip-link" href="#main">{{ t('Перейти до змісту', 'Skip to content') }}</a>
    <DocsHeader />
    <main id="main" tabindex="-1">
      <section class="docs-container docs-page">
        <div class="docs-page-title">
          <span class="docs-label">{{ notFound ? '404' : error.statusCode }}</span>
          <h1>{{ notFound ? t('Сторінку не знайдено', 'Page not found') : t('Щось пішло не так', 'Something went wrong') }}</h1>
          <p>{{ notFound ? t('Такої сторінки немає або її адресу змінено. Почніть з головної сторінки виставки чи оберіть розділ.', 'This page does not exist or its address has changed. Start from the exhibition’s home page or pick a section.') : t('Спробуйте оновити сторінку або почніть з головної.', 'Try reloading the page or start from the home page.') }}</p>
        </div>
        <p><NuxtLink class="docs-button" :to="localePath('/')">{{ t('На головну виставки', 'Exhibition home') }}</NuxtLink></p>
        <nav class="not-found__sections" :aria-label="t('Розділи', 'Sections')">
          <NuxtLink v-for="item in sections" :key="item.to" class="docs-button" :to="localePath(item.to)">{{ item.label }}</NuxtLink>
        </nav>
      </section>
    </main>
    <DocsFooter />
    <DocsTabs />
  </div>
</template>

<style scoped>
.not-found__sections { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 28px; }
</style>
