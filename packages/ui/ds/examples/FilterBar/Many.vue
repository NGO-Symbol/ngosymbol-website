<script setup lang="ts">
const value = ref('b')
const options = [
  { value: 'a', label: 'Сучасне мистецтво' }, { value: 'b', label: 'Документалістика' }, { value: 'c', label: 'Плейбек-театр' },
  { value: 'd', label: 'Психічне здоров’я' }, { value: 'e', label: 'Загальнонаціональнопросвітницькі' }, { value: 'f', label: 'Архів' },
]
</script>

<template>
  <SymFilterBar v-model="value" label="Фільтр за форматом" :options="options" />
</template>
