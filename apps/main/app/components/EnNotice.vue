<script setup lang="ts">
// On English mirror pages whose texts are not translated yet, says so plainly and offers the Ukrainian page.
const route = useRoute()
const { isEn } = useLang()
const show = computed(() => isEn.value && route.path !== '/en')
</script>

<template>
  <p v-if="show" class="en-notice container" lang="en">
    Most texts on this page are still in Ukrainian; the English translation is in progress. Write to us at
    <span class="selectable">ngo.symbol@gmail.com</span> if you need details in English.
  </p>
</template>

<style scoped>
.en-notice { margin-top: 18px; margin-bottom: 0; padding: 10px 14px; border-left: 3px solid var(--symbol-violet); background: color-mix(in srgb, var(--symbol-lilac) 45%, transparent); font-size: .85rem; line-height: 1.5; }
</style>
