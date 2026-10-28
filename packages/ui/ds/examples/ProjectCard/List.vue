<script setup lang="ts">
const projects = [
  { title: 'Проєкт перший', period: '2025 — триває', status: 'ongoing' as const, direction: 'Напрям А', summary: 'Один-два рядки про суть проєкту без вигаданих цифр.', tone: 'violet' as const },
  { title: 'Проєкт другий', period: '2026', status: 'launching' as const, direction: 'Напрям Б', summary: 'Один-два рядки про суть проєкту без вигаданих цифр.', tone: 'apricot' as const, external: true },
  { title: 'Проєкт третій', period: '2023–2024', status: 'completed' as const, direction: 'Напрям В', summary: 'Один-два рядки про суть проєкту без вигаданих цифр.', tone: 'plum' as const },
]
</script>

<template>
  <SymGrid :cols="3" as="ul">
    <li v-for="p in projects" :key="p.title"><SymProjectCard v-bind="p" href="#" /></li>
  </SymGrid>
</template>
