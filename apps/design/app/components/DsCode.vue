<script setup lang="ts">
const props = defineProps<{ code: string }>()
const done = ref(false)
async function copy() { try { await navigator.clipboard.writeText(props.code); done.value = true; setTimeout(() => (done.value = false), 1500) } catch {} }
</script>
<template>
  <div class="ds-code"><button type="button" class="ds-code__copy" @click="copy">{{ done ? 'Скопійовано' : 'Копіювати' }}</button><pre tabindex="0"><code>{{ code }}</code></pre></div>
</template>
