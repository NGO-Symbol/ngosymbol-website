<script setup lang="ts">
const items = Array.from({ length: 8 }, (_, i) => ({ name: `Партнер ${i + 1}` }))
</script>

<template>
  <SymLogoWall :items="items" label="Партнери" />
</template>
