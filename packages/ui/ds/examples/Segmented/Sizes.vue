<script setup lang="ts">
const lang = ref<'uk' | 'en'>('uk')
const view = ref<'list' | 'calendar'>('list')
const tab = ref<'patron' | 'community'>('patron')
</script>

<template>
  <SymStack>
    <SymSegmented v-model="lang" size="s" label="Мова" :options="[{ value: 'uk', label: 'UA' }, { value: 'en', label: 'EN' }]" />
    <SymSegmented v-model="view" label="Вигляд" :options="[{ value: 'list', label: 'Список' }, { value: 'calendar', label: 'Календар' }]" />
    <SymSegmented v-model="tab" size="l" tabs label="Спосіб участі" :options="[{ value: 'patron', label: 'Стати меценатом' }, { value: 'community', label: 'Доєднатися' }]" />
  </SymStack>
</template>
