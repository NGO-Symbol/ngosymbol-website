<script setup lang="ts">
/**
 * A pill that filters or toggles: outline when off, filled with the tone's text colour when selected. Renders <button> (a toggle with
 * aria-pressed when `toggle`), or <a> / router link when it has `to` / `href` (a link to a filtered page; selected = aria-current).
 * Inside SymFilterBar it is a radio. Not the main action of a block (SymButton) and not a status label (SymTag).
 */
const props = withDefaults(defineProps<{
  /** Currently chosen. */
  selected?: boolean
  /** Behaves as an on/off button: announces aria-pressed. Leave off for plain actions, links and chips inside SymFilterBar. */
  toggle?: boolean
  /** Router link target (inside the app). */
  to?: string
  /** Plain link. http(s) addresses on another site open in a new tab. */
  href?: string
  /** Disables the chip (ignored for links). */
  disabled?: boolean
}>(), {})

const NuxtLink = resolveComponent('NuxtLink')
const external = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to) return { to: props.to, 'aria-current': props.selected ? 'true' : undefined }
  if (props.href) return { ...(external.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }), 'aria-current': props.selected ? 'true' : undefined }
  return { type: 'button', disabled: props.disabled, 'aria-pressed': props.toggle ? String(!!props.selected) : undefined }
})
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-chip sym-state" :data-selected="selected || undefined">
    <span class="sym-chip__label"><slot /></span>
    <span v-if="external" class="sym-sr-only"> (відкриється в новій вкладці)</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-chip {
    --_h: 36px; /* visual height; the hit area below is always >= --sym-size-touch */
    position: relative; display: inline-flex; align-items: center; justify-content: center; flex: none; max-width: 100%;
    min-height: var(--_h); padding-inline: var(--sym-space-m); margin: 0; border: var(--sym-rule-width) solid currentColor; border-radius: var(--sym-shape-chip);
    font-family: var(--sym-font-text); font-size: var(--sym-text-body-sm); font-weight: 500; line-height: 1.2; text-decoration: none; white-space: nowrap;
    background: transparent; color: var(--sym-fg);
    transition: background-color var(--sym-t-fx-small), color var(--sym-t-fx-small), scale var(--sym-t-small);
  }
  .sym-chip::after { content: ''; position: absolute; inset: min(0px, calc((var(--sym-size-touch) - var(--_h)) / -2)) 0; }
  .sym-chip__label { min-width: 0; }
  .sym-chip:active:not(:disabled) { scale: calc(1 - .03 * var(--sym-motion-travel)); transition-duration: var(--sym-dur-instant); }
  /* selected: the tone's text colour as the fill, the tone's background as the label */
  .sym-chip[data-selected] { background: var(--sym-fg); color: var(--sym-bg); font-weight: 600; }
  .sym-chip:disabled { cursor: not-allowed; opacity: var(--sym-state-disabled); }
  @media (forced-colors: active) {
    .sym-chip { border-color: ButtonText; }
    .sym-chip[data-selected] { forced-color-adjust: none; background: Highlight; color: HighlightText; border-color: Highlight; }
  }
}
</style>
