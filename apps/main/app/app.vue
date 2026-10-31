<script setup lang="ts">
// Decide before first paint whether the logo intro is skipped, so returning visitors never see it flash.
// When it plays, pick the next of the intro variants (rotates on every new visit).
// Theme: the visitor's choice (light/dark) is stored; without a choice the system setting applies.
const { isEn } = useLang()
const route = useRoute()

// Search engines and social cards: one canonical address per page (with the trailing slash GitHub Pages uses),
// the Ukrainian and English versions linked to each other, and a default share card that pages override.
const SITE = 'https://symbol.ngo'
const withSlash = (path: string) => (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`)
const canonical = computed(() => SITE + withSlash(route.path))
const ukPath = computed(() => withSlash(switchLangPath(route.path, false)))
const enPath = computed(() => withSlash(switchLangPath(route.path, true)))
useHead({
  link: [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'uk', href: () => SITE + ukPath.value },
    { rel: 'alternate', hreflang: 'en', href: () => SITE + enPath.value },
    { rel: 'alternate', hreflang: 'x-default', href: () => SITE + ukPath.value }
  ]
})
useSeoMeta({
  // Default description in the page's language (pages with their own description override it).
  description: () => (isEn.value
    ? 'An independent Ukrainian organisation that develops contemporary culture and art and promotes attentive care for mental health.'
    : 'Незалежна українська організація, що розвиває сучасну культуру і мистецтво та сприяє уважному ставленню до психічного здоров’я.'),
  ogSiteName: () => (isEn.value ? 'NGO Symbol' : 'ГО «Символ»'),
  ogType: 'website',
  ogUrl: canonical,
  ogLocale: () => (isEn.value ? 'en_US' : 'uk_UA'),
  ogImage: `${SITE}/og-default.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image'
})
useHead({
  htmlAttrs: { lang: () => (isEn.value ? 'en' : 'uk') },
  titleTemplate: title => (isEn.value ? (title && title !== 'NGO Symbol' ? `${title} · NGO Symbol` : 'NGO Symbol') : (title && title !== 'ГО «Символ»' ? `${title} · ГО «Символ»` : 'ГО «Символ»')),
  script: [{
    // Back from a project site (?via=project, plugins/project-crossing.client.ts): no logo intro, tidy the address and
    // lift the violet curtain the project site dropped. After a browser «back» the leaving curtain is taken down.
    tagPosition: 'head',
    innerHTML: "(function(){var d=document.documentElement;try{var u=new URL(location.href);if(u.searchParams.get('via')==='project'){sessionStorage.setItem('symbol-intro','1');u.searchParams.delete('via');history.replaceState(history.state,'',u.pathname+u.search+u.hash);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.cross='enter';setTimeout(function(){if(d.dataset.cross==='enter')delete d.dataset.cross},1200)}}}catch(e){}addEventListener('pageshow',function(e){if(e.persisted&&d.dataset.cross==='leave')delete d.dataset.cross})})()"
  }, {
    tagPosition: 'head',
    innerHTML: "try{var t=localStorage.getItem('symbol-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}"
  }, {
    tagPosition: 'head',
    innerHTML: "(function(){var d=document.documentElement;try{if(sessionStorage.getItem('symbol-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-done');return}var n=(Number(localStorage.getItem('symbol-intro-variant'))||0)%4;d.setAttribute('data-intro',String(n));d.classList.add('intro-playing');localStorage.setItem('symbol-intro-variant',String(n+1))}catch(e){d.classList.add('intro-done')}})()"
  }]
})
</script>

<template>
  <div class="site-shell">
    <IntroSplash />
    <HomeWipe />
    <a class="skip-link" href="#main">{{ isEn ? 'Skip to content' : 'Перейти до змісту' }}</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <NuxtPage />
    </main>
    <SiteFooter />
    <BackToTop />
    <CookieConsent />
  </div>
</template>
