<script setup lang="ts">
/**
 * Running text in the sans typeface: lead paragraph, body, small print, captions. Use it for every paragraph that is not
 * inside SymProse. `measure` limits the line length to a readable 66 characters.
 */
withDefaults(defineProps<{
  /** lead (intro paragraph) | body (default) | sm (secondary) | caption (image credits, dates). */
  size?: 'lead' | 'body' | 'sm' | 'caption'
  /** Muted colour of the tone. */
  muted?: boolean
  /** Limit the line length to 66 characters (set for any paragraph wider than a column). */
  measure?: boolean
  /** HTML element to render. */
  as?: string
}>(), { size: 'body', as: 'p' })
defineSlots<{ default?: () => any }>()
const map = { lead: 'lead', body: 'body', sm: 'body-sm', caption: 'caption' } as const
</script>

<template>
  <component :is="as" class="sym-text" :class="`sym-t-${map[size]}`" :data-muted="muted || undefined" :data-measure="measure || undefined"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-text[data-muted] { color: var(--sym-fg-muted); }
  .sym-text[data-measure] { max-width: var(--sym-width-prose); }
}
</style>
