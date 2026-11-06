<script setup lang="ts">
const dark = ref(false)
const open = ref(false)
</script>

<template>
  <SymCluster>
    <SymIconButton size="s" variant="outline" icon="search" label="Пошук по сайту" />
    <SymIconButton size="s" variant="outline" icon="theme" label="Темний режим" :aria-pressed="dark" @click="dark = !dark" />
    <SymIconButton icon="burger" :open="open" :label="open ? 'Закрити меню' : 'Меню'" :aria-expanded="open" @click="open = !open" />
  </SymCluster>
</template>
