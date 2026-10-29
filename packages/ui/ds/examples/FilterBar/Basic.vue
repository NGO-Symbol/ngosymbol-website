<script setup lang="ts">
const value = ref('')
const options = [{ value: 'cinema', label: 'Кіно' }, { value: 'theatre', label: 'Театр' }, { value: 'art', label: 'Мистецтво' }, { value: 'health', label: 'Психічне здоров’я' }]
</script>

<template>
  <SymStack gap="s">
    <SymFilterBar v-model="value" label="Фільтр за напрямом" all="Усі" :options="options" />
    <SymText size="sm" muted>Обрано: {{ value || 'усі напрямки' }}</SymText>
  </SymStack>
</template>
