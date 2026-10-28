<script setup lang="ts">
import markUrl from '@symbol/brand/symbol-mark.png'

/**
 * The official NGO Symbol mark (the original logo image). Use it for the logo only: never recolour, stretch or crop it.
 * For decoration use SymOrbit. `label` is the accessible name; leave it empty next to a visible «Символ» text.
 */
withDefaults(defineProps<{
  /** Diameter in px. */
  size?: number
  /** Accessible name; leave empty when a visible wordmark sits next to the mark. */
  label?: string
}>(), { size: 40 })
</script>

<template>
  <img class="sym-mark" :src="markUrl" :width="size" :height="size" :alt="label || ''" :role="label ? undefined : 'presentation'" decoding="async">
</template>

<style>
@layer sym-components {
  .sym-mark { display: inline-block; border-radius: 50%; flex: none; }
}
</style>
