<script setup lang="ts">
const on = ref<string[]>(['Кіно'])
const toggle = (v: string) => { on.value = on.value.includes(v) ? on.value.filter(x => x !== v) : [...on.value, v] }
</script>

<template>
  <SymCluster>
    <SymChip v-for="v in ['Кіно', 'Театр', 'Освіта', 'Спільнота']" :key="v" toggle :selected="on.includes(v)" @click="toggle(v)">{{ v }}</SymChip>
    <SymChip disabled>Недоступно</SymChip>
  </SymCluster>
</template>
