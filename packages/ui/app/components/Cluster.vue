<script setup lang="ts">
type Gap = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'inline' | 'grid'

/**
 * Inline items that wrap: buttons, chips, tags, meta lines. Always put inline items in a Cluster inside a Stack
 * (a bare Stack would stretch them). `scroll` turns the row into a single sideways-scrolling line on phones.
 */
const props = withDefaults(defineProps<{
  /** Space between items (default inline = 8 px). */
  gap?: Gap
  /** Vertical alignment of items on a line. */
  align?: 'start' | 'center' | 'end' | 'baseline'
  /** Horizontal distribution. between pushes first and last apart (header rows). */
  justify?: 'start' | 'center' | 'end' | 'between'
  /** Phones (< 600 px): one scrolling line with a fading edge instead of wrapping into a tall block. */
  scroll?: boolean
  /** HTML element to render, e.g. 'ul', 'nav'. */
  as?: string
}>(), { gap: 'inline', align: 'center', justify: 'start', as: 'div' })
defineSlots<{ default?: () => any }>()
const el = ref<HTMLElement | null>(null)
if (props.scroll) useScrollEdges(el)
const gapVar = computed(() => (['inline', 'grid'].includes(props.gap) ? `var(--sym-gap-${props.gap})` : `var(--sym-space-${props.gap})`))
</script>

<template>
  <component :is="as" ref="el" class="sym-cluster" :data-align="align" :data-justify="justify" :data-scroll="scroll || undefined" :style="{ '--_gap': gapVar }"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-cluster { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-start; gap: var(--_gap); min-width: 0; }
  .sym-cluster[data-align='start'] { align-items: flex-start; } .sym-cluster[data-align='end'] { align-items: flex-end; } .sym-cluster[data-align='baseline'] { align-items: baseline; }
  .sym-cluster[data-justify='center'] { justify-content: center; } .sym-cluster[data-justify='end'] { justify-content: flex-end; } .sym-cluster[data-justify='between'] { justify-content: space-between; }
  .sym-cluster:is(ul, ol) { list-style: none; padding: 0; }
  @media (max-width: 599px) {
    .sym-cluster[data-scroll] { flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; scrollbar-width: none; padding-block: var(--sym-space-xs); margin-block: calc(-1 * var(--sym-space-xs)); }
    .sym-cluster[data-scroll]::-webkit-scrollbar { display: none; }
    .sym-cluster[data-scroll] > * { flex: none; }
  }
}
</style>
