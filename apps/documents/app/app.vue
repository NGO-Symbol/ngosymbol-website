<script setup lang="ts">
useHead({ titleTemplate: title => (title ? `${title} · Покажіть свої документи…` : 'Покажіть свої документи… · виставка ГО «Символ»') })
</script>

<template>
  <div class="docs-site-shell">
    <a class="skip-link" href="#main">Перейти до змісту</a>
    <DocsHeader />
    <main id="main" tabindex="-1"><NuxtPage /></main>
    <DocsFooter />
  </div>
</template>
