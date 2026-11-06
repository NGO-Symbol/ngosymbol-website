<script setup lang="ts">
const view = ref<'list' | 'calendar'>('list')
</script>

<template>
  <SymSegmented v-model="view" label="Вигляд" :options="[{ value: 'list', label: 'Список' }, { value: 'calendar', label: 'Календар' }]" />
</template>
