<script setup lang="ts">
// Decide before first paint whether the logo intro is skipped, so returning visitors never see it flash.
// When it plays, pick the next of the intro variants (rotates on every new visit).
useHead({
  script: [{
    tagPosition: 'head',
    innerHTML: "(function(){var d=document.documentElement;try{if(sessionStorage.getItem('symbol-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-done');return}var n=(Number(localStorage.getItem('symbol-intro-variant'))||0)%4;d.setAttribute('data-intro',String(n));localStorage.setItem('symbol-intro-variant',String(n+1))}catch(e){d.classList.add('intro-done')}})()"
  }]
})
</script>

<template>
  <div class="site-shell">
    <IntroSplash />
    <ClickEffects />
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
