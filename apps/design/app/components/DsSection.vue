<script setup lang="ts">
defineProps<{ id?: string; title: string; description?: string }>()
</script>
<template>
  <section :id="id" class="ds-section">
    <header><h2>{{ title }}</h2><p v-if="description">{{ description }}</p></header>
    <slot />
  </section>
</template>
