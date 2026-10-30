<script setup lang="ts">
const { isEn } = useLang()
const route = useRoute()

// Canonical address of each exhibition page under symbol.ngo/documentsart/ and a default share card.
const BASE = 'https://symbol.ngo/documentsart'
const withSlash = (path: string) => (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`)
const canonical = computed(() => BASE + withSlash(route.path))
const ukPath = computed(() => withSlash(route.path.replace(/^\/en(?=\/|$)/, '') || '/'))
const enPath = computed(() => withSlash(ukPath.value === '/' ? '/en' : `/en${ukPath.value}`))
useHead({
  link: [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'uk', href: () => BASE + ukPath.value },
    { rel: 'alternate', hreflang: 'en', href: () => BASE + enPath.value },
    { rel: 'alternate', hreflang: 'x-default', href: () => BASE + ukPath.value }
  ]
})
useSeoMeta({
  ogSiteName: () => (isEn.value ? 'May I See Your Documents… · NGO Symbol' : 'Покажіть свої документи… · ГО «Символ»'),
  ogType: 'website',
  ogUrl: canonical,
  ogLocale: () => (isEn.value ? 'en_US' : 'uk_UA'),
  ogImage: 'https://symbol.ngo/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg',
  twitterCard: 'summary_large_image'
})
useHead({
  htmlAttrs: { lang: () => (isEn.value ? 'en' : 'uk') },
  titleTemplate: title => (isEn.value
    ? (title ? `${title} · May I See Your Documents…` : 'May I See Your Documents… · NGO Symbol exhibition')
    : (title ? `${title} · Покажіть свої документи…` : 'Покажіть свої документи… · виставка ГО «Символ»')),
  // Day / night chosen by the visitor is applied before paint; without a choice the system setting applies.
  script: [
    { tagPosition: 'head', innerHTML: "try{var t=localStorage.getItem('docs-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" },
    // Arriving from symbol.ngo (?from=<its page>, utils/crossing.ts): keep the page to return to, tidy the address and
    // lift the paper curtain. After a browser «back» from symbol.ngo the leaving curtain is taken down again.
    { tagPosition: 'head', innerHTML: "(function(){var d=document.documentElement;try{var u=new URL(location.href),f=u.searchParams.get('from');if(f!==null){if(/^\\/(?!\\/)/.test(f))sessionStorage.setItem('docs-from',f);u.searchParams.delete('from');history.replaceState(history.state,'',u.pathname+u.search+u.hash);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.cross='enter';setTimeout(function(){if(d.dataset.cross==='enter')delete d.dataset.cross},1200)}}}catch(e){}addEventListener('pageshow',function(e){if(e.persisted&&d.dataset.cross==='leave')delete d.dataset.cross})})()" }
  ]
})
</script>

<template>
  <div class="docs-site-shell">
    <a class="skip-link" href="#main">Перейти до змісту</a>
    <DocsHeader />
    <main id="main" tabindex="-1"><NuxtPage /></main>
    <DocsFooter />
    <DocsTabs />
  </div>
</template>
