<script setup lang="ts">
// The site's own error page, also the static 404.html: GitHub Pages serves that file, with a 404 status, for every address
// that does not exist, under /en/… and /documentsart/… too. It is built for «/404.html» (Ukrainian) and, once the browser
// has opened it at the missing address, switches to that address's language (useLang waits for the page to hydrate).
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { isEn, localePath } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
const notFound = computed(() => props.error.statusCode === 404)

usePageSeo({
  title: () => (notFound.value ? t('Сторінку не знайдено', 'Page not found') : t('Щось пішло не так', 'Something went wrong')),
  description: () => t('Такої сторінки немає або її адресу змінено. Перейдіть на головну чи до одного з розділів сайту ГО «Символ».', 'This page does not exist or its address has changed. Go to the home page or to one of the sections of the NGO Symbol website.'),
  noindex: true
})
useHead({
  htmlAttrs: { lang: () => (isEn.value ? 'en' : 'uk') },
  script: [{ tagPosition: 'head', innerHTML: "try{var t=localStorage.getItem('symbol-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}" }]
})

const sections = [
  { to: '/projects', uk: 'Проєкти', en: 'Projects' }, { to: '/events', uk: 'Події', en: 'Events' },
  { to: '/opportunities', uk: 'Можливості', en: 'Opportunities' }, { to: '/people', uk: 'Люди', en: 'People' },
  { to: '/about', uk: 'Про нас', en: 'About' }, { to: '/news', uk: 'Новини', en: 'News' },
  { to: '/support', uk: 'Підтримати', en: 'Support' }, { to: '/contact', uk: 'Контакти', en: 'Contact' }
]
// A link on the error page leaves it: the error is cleared, the link's own navigation goes on.
const leave = (event: MouseEvent) => { if ((event.target as Element).closest('a')) clearError() }
</script>

<template>
  <div class="site-shell" @click="leave">
    <a class="skip-link" href="#main">{{ t('Перейти до змісту', 'Skip to content') }}</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <section class="section container not-found">
        <div class="eyebrow">{{ notFound ? '404' : error.statusCode }}</div>
        <h1>{{ notFound ? t('Сторінку не знайдено', 'Page not found') : t('Щось пішло не так', 'Something went wrong') }}</h1>
        <p class="lead-text">{{ notFound ? t('Такої сторінки немає або її адресу змінено. Почніть з головної чи оберіть розділ.', 'This page does not exist or its address has changed. Start from the home page or pick a section.') : t('Спробуйте оновити сторінку або почніть з головної.', 'Try reloading the page or start from the home page.') }}</p>
        <div class="button-row">
          <NuxtLink class="button button--dark" :to="localePath('/')">{{ t('На головну', 'Home page') }}</NuxtLink>
        </div>
        <nav class="not-found__sections" :aria-label="t('Розділи сайту', 'Sections')">
          <NuxtLink v-for="item in sections" :key="item.to" class="button" :to="localePath(item.to)">{{ t(item.uk, item.en) }}</NuxtLink>
        </nav>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.not-found { min-height: 60vh; padding-block: 80px; }
.not-found h1 { margin-block: 12px 20px; }
.not-found .lead-text { max-width: 36em; }
.not-found__sections { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
</style>
