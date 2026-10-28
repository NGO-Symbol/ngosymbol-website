<script setup lang="ts">
// Decide before first paint whether the logo intro is skipped, so returning visitors never see it flash.
useHead({
  script: [{
    tagPosition: 'head',
    innerHTML: "try{if(sessionStorage.getItem('symbol-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-done')}catch(e){document.documentElement.classList.add('intro-done')}"
  }]
})
</script>

<template>
  <div class="site-shell">
    <IntroSplash />
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
