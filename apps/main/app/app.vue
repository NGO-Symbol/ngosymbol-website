<script setup lang="ts">
// Decide before first paint whether the logo intro is skipped, so returning visitors never see it flash.
// When it plays, pick the next of the intro variants (rotates on every new visit).
// Theme: the visitor's choice (light/dark) is stored; without a choice the system setting applies.
const { isEn } = useLang()
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
    <EnNotice />
    <main id="main" tabindex="-1">
      <NuxtPage />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
