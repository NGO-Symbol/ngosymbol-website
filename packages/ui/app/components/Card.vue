<script setup lang="ts">
/**
 * A bordered block on its own tone: the basic container for a project, a fact, a person, a link. With `to` / `href` the whole
 * card is one link (title is the link text) and lifts on hover. Square corners and a hairline: the editorial look.
 * Put content in it with SymStack; do not nest a card in a card.
 */
const props = withDefaults(defineProps<{
  /** Tone of the card: white (default) | paper | lilac | violet | apricot | plum. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Router link target; makes the whole card a link. */
  to?: string
  /** Plain link; off-site addresses open in a new tab. */
  href?: string
  /** Padding: md (default) | lg | none (media goes edge to edge, use SymCard parts yourself). */
  pad?: 'none' | 'md' | 'lg'
  /** Hairline border (default true). */
  outline?: boolean
  /** HTML element when the card is not a link. */
  as?: string
}>(), { tone: 'white', pad: 'md', outline: true, as: 'div' })
const NuxtLink = resolveComponent('NuxtLink')
const external = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : props.as))
const attrs = computed(() => (props.to ? { to: props.to } : props.href ? (external.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }) : {}))
const interactive = computed(() => !!(props.to || props.href))
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-card" :data-tone="tone" :data-pad="pad" :data-outline="outline || undefined" :data-interactive="interactive || undefined">
    <slot />
    <span v-if="external" class="sym-sr-only"> (відкриється в новій вкладці)</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-card { --_p: var(--sym-pad-card); position: relative; display: block; min-width: 0; padding: var(--_p); border-radius: var(--sym-shape-card); color: var(--sym-fg); text-decoration: none; transition: translate var(--sym-t-small), box-shadow var(--sym-t-fx-small); }
  .sym-card[data-pad='lg'] { --_p: var(--sym-space-l); } .sym-card[data-pad='none'] { --_p: 0; }
  .sym-card[data-outline] { border: var(--sym-rule-width) solid var(--sym-rule); }
  @media (hover: hover) { .sym-card[data-interactive]:hover { translate: 0 calc(-5px * var(--sym-motion-travel)); } }
  .sym-card[data-interactive]:active { translate: 0; transition-duration: var(--sym-dur-instant); }
}
</style>
