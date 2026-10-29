<script setup lang="ts">
const people = [
  { name: 'Ім’я Прізвище', role: 'Роль 1', tone: 'lilac' as const },
  { name: 'Ім’я Прізвище', role: 'Роль 2', tone: 'apricot' as const },
  { name: 'Ім’я Прізвище', role: 'Роль 3', tone: 'violet' as const },
]
</script>

<template>
  <SymGrid :cols="3">
    <SymPersonCard v-for="(p, i) in people" :key="i" v-bind="p" />
  </SymGrid>
</template>
