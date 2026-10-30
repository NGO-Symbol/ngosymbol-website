<script setup lang="ts">
// A photograph shown through its light AVIF preview when one exists. It renders a single <img> (so the parent
// component's own styles apply to it, as to any image); if the browser cannot open the preview, it falls back to
// the original file (or `fallback`).
import { previewOf } from '~/data/previews'

const props = defineProps<{ src: string; alt?: string; fallback?: string }>()
const failed = ref(false)
const shown = computed(() => (!failed.value && previewOf(props.src)) || props.fallback || props.src)
</script>

<template>
  <img :src="shown" :alt="alt ?? ''" @error="failed = true">
</template>
