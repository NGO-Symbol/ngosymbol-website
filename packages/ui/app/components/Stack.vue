<script setup lang="ts">
type Gap = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | 'stack' | 'inline' | 'grid'

/**
 * Vertical flow with one gap between children (no margins on children). The rhythm of a column: heading + text + button,
 * blocks inside a section. Wrap inline items (buttons, chips) in SymCluster, or a Stack stretches them to full width.
 */
const props = withDefaults(defineProps<{
  /** Space between children: a space step (3xs … 3xl, fluid) or a semantic gap (stack = default rhythm, inline, grid). */
  gap?: Gap
  /** Cross-axis alignment (default stretch = full width). */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** HTML element to render, e.g. 'ul', 'article', 'header'. */
  as?: string
}>(), { gap: 'stack', align: 'stretch', as: 'div' })
defineSlots<{ default?: () => any }>()
const gapVar = computed(() => (['stack', 'inline', 'grid'].includes(props.gap) ? `var(--sym-gap-${props.gap})` : `var(--sym-space-${props.gap})`))
</script>

<template>
  <component :is="as" class="sym-stack" :data-align="align" :style="{ '--_gap': gapVar }"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-stack { display: flex; flex-direction: column; align-items: stretch; gap: var(--_gap); min-width: 0; }
  .sym-stack[data-align='start'] { align-items: flex-start; }
  .sym-stack[data-align='center'] { align-items: center; }
  .sym-stack[data-align='end'] { align-items: flex-end; }
  .sym-stack:is(ul, ol) { list-style: none; padding: 0; }
}
</style>
