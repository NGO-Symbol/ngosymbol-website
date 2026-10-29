<script setup lang="ts">
const items = [
  { label: 'Статус', value: 'ongoing' },
  { label: 'Сайт', value: 'https://example.com' },
  { label: 'Найдовше слово', value: 'Загальнонаціональнопросвітницький' },
]
</script>

<template>
  <SymMetaList :items="items" :cols="1">
    <template #value="{ item }">
      <SymTag v-if="item.label === 'Статус'" :status="(item.value as any)" />
      <SymLink v-else-if="item.label === 'Сайт'" :href="item.value">example.com</SymLink>
      <template v-else>{{ item.value }}</template>
    </template>
  </SymMetaList>
</template>
