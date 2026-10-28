<script setup lang="ts">
const items = [
  { label: 'Головна', to: '/' },
  { label: 'Проєкти', to: '/components/card' },
  { label: 'Історія вулиці' },
]
</script>

<template><SymBreadcrumb :items="items" /></template>
