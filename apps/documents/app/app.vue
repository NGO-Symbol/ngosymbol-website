<script setup lang="ts">
const { isEn } = useLang()
useHead({
  htmlAttrs: { lang: () => (isEn.value ? 'en' : 'uk') },
  titleTemplate: title => (isEn.value
    ? (title ? `${title} · May I See Your Documents…` : 'May I See Your Documents… · NGO Symbol exhibition')
    : (title ? `${title} · Покажіть свої документи…` : 'Покажіть свої документи… · виставка ГО «Символ»')),
  // Day / night chosen by the visitor is applied before paint; without a choice the system setting applies.
  script: [{ tagPosition: 'head', innerHTML: "try{var t=localStorage.getItem('docs-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }]
})
</script>

<template>
  <div class="docs-site-shell">
    <a class="skip-link" href="#main">Перейти до змісту</a>
    <DocsHeader />
    <main id="main" tabindex="-1"><NuxtPage /></main>
    <DocsFooter />
  </div>
</template>
