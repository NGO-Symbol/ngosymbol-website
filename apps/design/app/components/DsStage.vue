<script setup lang="ts">
// The stage a live example sits on: tone and width come from the gallery bar, so every example can be judged on every tone and at phone widths.
const tone = useState<string>('ds-tone', () => 'paper')
const width = useState<string>('ds-width', () => 'full')
defineProps<{ bare?: boolean }>()
</script>
<template>
  <div class="ds-stage" :data-width="width"><div class="ds-stage__in" :data-tone="bare ? undefined : tone" :style="width !== 'full' ? { maxWidth: width + 'px' } : undefined"><slot /></div></div>
</template>
