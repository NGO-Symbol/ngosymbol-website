<script setup lang="ts">
const { isEn } = useLang()
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
