<script setup lang="ts">
/**
 * Horizontal page frame: centres content, keeps the fluid page margin on both sides. Every page block sits in one
 * (SymSection adds it for you). Pages never write their own max-width or side padding.
 */
withDefaults(defineProps<{
  /** page = 1180 px (default content), wide = 1440 px (media bands), narrow = 760 px (one-column pages), prose = 66 characters (articles). */
  size?: 'page' | 'wide' | 'narrow' | 'prose'
  /** HTML element to render. */
  as?: string
}>(), { size: 'page', as: 'div' })
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="as" class="sym-container" :data-size="size"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-container { --_max: var(--sym-width-page); width: min(var(--_max), 100% - 2 * var(--sym-page-margin)); margin-inline: auto; min-width: 0; }
  .sym-container[data-size='wide'] { --_max: var(--sym-width-wide); }
  .sym-container[data-size='narrow'] { --_max: var(--sym-width-narrow); }
  .sym-container[data-size='prose'] { --_max: var(--sym-width-prose); }
}
</style>
