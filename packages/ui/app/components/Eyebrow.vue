<script setup lang="ts">
/**
 * Small uppercase label above a heading or on a card: category, kicker, index number («01»). One per block; never a paragraph.
 * `index` adds a leading number with a rule, the editorial «Index» device.
 */
withDefaults(defineProps<{
  /** Optional leading number, e.g. "01". */
  index?: string
  /** HTML element to render. */
  as?: string
}>(), { as: 'span' })
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="as" class="sym-eyebrow sym-t-label">
    <span v-if="index" class="sym-eyebrow__index sym-tabular">{{ index }}</span>
    <span v-if="index" class="sym-eyebrow__rule" aria-hidden="true" />
    <span class="sym-eyebrow__text"><slot /></span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-eyebrow { display: inline-flex; align-items: center; gap: var(--sym-space-xs); color: var(--sym-fg-muted); }
  .sym-eyebrow__rule { width: var(--sym-space-l); height: 0; border-top: var(--sym-rule-width) solid currentColor; }
}
</style>
