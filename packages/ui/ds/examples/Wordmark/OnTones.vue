<script setup lang="ts">
const tones = ['paper', 'lilac', 'violet', 'apricot', 'plum'] as const
</script>

<template>
  <SymStack gap="s">
    <SymCard v-for="t in tones" :key="t" :tone="t"><SymWordmark /></SymCard>
  </SymStack>
</template>
