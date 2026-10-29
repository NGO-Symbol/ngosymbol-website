<script setup lang="ts">
const items = [
  { label: 'Про нас', to: '?section=about' },
  { label: 'Проєкти', to: '?section=projects' },
  { label: 'Події', to: '?section=events' },
  { label: 'Контакти', to: '?section=contact' },
]
</script>

<template>
  <SymSiteHeader tone="plum" :items="items" :cta="{ label: 'Написати нам', to: '?section=contact' }" current="?section=events" scrolled>
    <template #logo><SymWordmark href="#" /></template>
  </SymSiteHeader>
</template>
