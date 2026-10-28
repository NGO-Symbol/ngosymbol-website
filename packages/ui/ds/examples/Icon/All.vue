<script setup lang="ts">
const names = ['arrow-right', 'arrow-left', 'arrow-up-right', 'arrow-down', 'menu', 'close', 'plus', 'minus', 'chevron-down', 'chevron-right', 'check', 'mail', 'phone', 'map-pin', 'calendar', 'download', 'link', 'globe', 'play', 'instagram', 'facebook', 'telegram', 'youtube'] as const
</script>
<template>
  <SymGrid min="160" gap="s"><div v-for="n in names" :key="n" style="display:flex;align-items:center;gap:10px"><SymIcon :name="n" :size="28" /><code style="font-size:.8rem">{{ n }}</code></div></SymGrid>
</template>
