<script setup lang="ts">
const items = [
  { label: 'Про нас', to: '?section=about' },
  { label: 'Проєкти', to: '?section=projects' },
  { label: 'Події', to: '?section=events' },
  { label: 'Контакти', to: '?section=contact' },
]
const languages = [
  { code: 'uk', label: 'UA', current: true },
  { code: 'en', label: 'EN', disabled: true },
]
</script>

<template>
  <SymSiteHeader :items="items" :languages="languages" :cta="{ label: 'Написати нам', to: '?section=contact' }" current="?section=projects">
    <template #logo><SymWordmark href="#" /></template>
  </SymSiteHeader>
</template>
