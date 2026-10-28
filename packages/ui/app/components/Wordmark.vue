<script setup lang="ts">
/**
 * The brand lockup: the official mark (SymMark) plus the word «СИМВОЛ» in the logo typeface. Used by the header, the footer and the project bar.
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
  /** Second line under the word, as in the logo («Громадська організація»). Off by default; use it on large lockups only. */
  subtitle?: string
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
    <span class="sym-wordmark__text">
      <span class="sym-wordmark__label"><slot name="label">СИМВОЛ</slot></span>
      <span v-if="subtitle" class="sym-wordmark__subtitle">{{ subtitle }}</span>
    </span>
    <span v-if="linked" class="sym-sr-only"> — на головну</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-wordmark { display: inline-flex; align-items: center; gap: var(--sym-space-xs); min-height: var(--sym-size-touch); color: var(--sym-fg); text-decoration: none; }
  .sym-wordmark__text { display: grid; gap: var(--sym-space-3xs); }
  /* the word is set in the logo typeface, as in the official lockup */
  .sym-wordmark__label { font-family: var(--sym-font-brand); font-size: calc(var(--sym-text-body) * 1.5); font-weight: 400; line-height: 1; letter-spacing: .04em; white-space: nowrap; text-transform: uppercase; }
  .sym-wordmark__subtitle { font-family: var(--sym-font-brand); font-size: calc(var(--sym-text-label) * .95); line-height: 1; letter-spacing: .18em; text-transform: uppercase; color: var(--sym-fg-muted); white-space: nowrap; }
  .sym-wordmark[data-size='sm'] .sym-wordmark__label { font-size: calc(var(--sym-text-body-sm) * 1.5); }
}
</style>
