<script setup lang="ts">
/**
 * The brand lockup: the official mark (SymMark) plus the word «СИМВОЛ». Used by the header, the footer and the project bar.
 * With `to` / `href` it is a link (the logo takes you home); without, a plain element. The word follows the tone's text colour.
 * Replace the word through the `label` slot only for a project lockup; never redraw or recolour the mark.
 */
const props = withDefaults(defineProps<{
  /** Router link target, usually "/" (makes the lockup a link home). */
  to?: string
  /** Plain link (e.g. https://symbol.ngo from a project site). */
  href?: string
  /** sm = 32 px mark (footer, project bar) | md = 44 px mark (header). */
  size?: 'sm' | 'md'
}>(), { size: 'md' })
defineSlots<{ /** Text next to the mark; default «СИМВОЛ». */ label?: () => any }>()

const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'span'))
const attrs = computed(() => (props.to ? { to: props.to } : props.href ? { href: props.href } : {}))
const mark = computed(() => (props.size === 'sm' ? 32 : 44))
const linked = computed(() => !!(props.to || props.href))
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-wordmark" :data-size="size" :data-link="linked || undefined">
    <SymMark :size="mark" class="sym-wordmark__mark" />
    <span class="sym-wordmark__label"><slot name="label">СИМВОЛ</slot></span>
    <span v-if="linked" class="sym-sr-only"> — на головну</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-wordmark { display: inline-flex; align-items: center; gap: var(--sym-space-xs); min-height: var(--sym-size-touch); color: var(--sym-fg); text-decoration: none; }
  .sym-wordmark__label { font-family: var(--sym-font-text); font-size: var(--sym-text-body); font-weight: 700; line-height: 1; letter-spacing: .16em; white-space: nowrap; }
  .sym-wordmark[data-size='sm'] .sym-wordmark__label { font-size: var(--sym-text-body-sm); }
}
</style>
