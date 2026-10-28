<script setup lang="ts">
/**
 * An inline link inside text or a list. Underlined, inherits the colour of the text around it. `arrow` adds a trailing arrow
 * (forward = to another page here, up-right = another site). Off-site http(s) links open in a new tab automatically.
 * For a standalone action use SymButton.
 */
const props = withDefaults(defineProps<{
  /** Router link target (inside the app). */
  to?: string
  /** Plain link; http(s) on another site opens in a new tab with an arrow-up-right. */
  href?: string
  /** Trailing arrow: forward | none. External links always show the up-right arrow. */
  arrow?: 'forward' | 'none'
  /** Remove the underline until hover (navigation, footers). The text must still look like a link. */
  quiet?: boolean
}>(), { arrow: 'none' })
const NuxtLink = resolveComponent('NuxtLink')
const external = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : 'a'))
const attrs = computed(() => (props.to ? { to: props.to } : external.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }))
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-link" :data-quiet="quiet || undefined">
    <slot /><template v-if="external || arrow === 'forward'">&#8288;</template><SymIcon v-if="external" name="arrow-up-right" class="sym-link__icon" /><SymIcon v-else-if="arrow === 'forward'" name="arrow-right" class="sym-link__icon" />
    <span v-if="external" class="sym-sr-only"> (відкриється в новій вкладці)</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-link { color: inherit; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .22em; transition: text-decoration-thickness var(--sym-t-small), color var(--sym-t-fx-small); }
  .sym-link__icon { width: .95em; height: .95em; margin-inline-start: .2em; vertical-align: -.1em; transition: translate var(--sym-t-micro); }
  .sym-link[data-quiet] { text-decoration-color: transparent; }
  @media (hover: hover) {
    .sym-link:hover { text-decoration-thickness: 2px; }
    .sym-link[data-quiet]:hover { text-decoration-color: currentColor; }
    .sym-link:hover .sym-link__icon { translate: calc(2px * var(--sym-motion-travel)) 0; }
  }
}
</style>
