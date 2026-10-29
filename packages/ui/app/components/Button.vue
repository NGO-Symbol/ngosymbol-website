<script setup lang="ts">
/**
 * The call-to-action control. Renders <button>, <a> (href) or a router link (to); an off-site href opens in a new tab and shows an
 * arrow-up-right with a hidden «(відкриється в новій вкладці)». Colours follow the surrounding tone: solid = text colour on tone
 * colour inverted, so it is always legible. One solid button per block; the rest outline or text.
 */
const props = withDefaults(defineProps<{
  /** solid (the one main action) | outline (secondary) | text (tertiary, looks like a link with an arrow). */
  variant?: 'solid' | 'outline' | 'text'
  /** m = 48 px, l = 56 px (hero actions, mobile primary). */
  size?: 'm' | 'l'
  /** Trailing icon name from SymIcon. Off-site links get arrow-up-right automatically. */
  icon?: string
  /** Fill the available width (mobile forms, drawers). */
  block?: boolean
  /** Disables the button (ignored for links). */
  disabled?: boolean
  /** Router link target (inside the app). */
  to?: string
  /** Plain link. http(s) addresses on another site open in a new tab. */
  href?: string
  /** Native button type; "button" by default so it never submits a form by accident. */
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'solid', size: 'm', type: 'button' })

const NuxtLink = resolveComponent('NuxtLink')
const external = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return external.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }
  return { type: props.type, disabled: props.disabled }
})
const trailing = computed(() => props.icon ?? (external.value ? 'arrow-up-right' : undefined))
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-button sym-state" :data-variant="variant" :data-size="size" :data-block="block || undefined">
    <span class="sym-button__label"><slot /></span>
    <SymIcon v-if="trailing" :name="(trailing as any)" class="sym-button__icon" />
    <span v-if="external" class="sym-sr-only"> (відкриється в новій вкладці)</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-button {
    --_h: 48px; --_px: var(--sym-space-m);
    position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--sym-space-xs); flex: none;
    min-height: var(--_h); padding-inline: calc(var(--_px) + 4px); margin: 0; border: var(--sym-rule-width) solid currentColor; border-radius: var(--sym-shape-control);
    font-family: var(--sym-font-text); font-size: var(--sym-text-body-sm); font-weight: 600; line-height: 1.2; letter-spacing: .01em; text-decoration: none; white-space: nowrap;
    background: transparent; color: var(--sym-fg);
    transition: background-color var(--sym-t-fx-small), color var(--sym-t-fx-small), scale var(--sym-t-small);
  }
  .sym-button[data-size='l'] { --_h: 56px; --_px: var(--sym-space-l); font-size: var(--sym-text-body); }
  .sym-button[data-block] { display: flex; width: 100%; }
  /* invisible hit area: never smaller than the touch target even if --_h changes */
  .sym-button::after { content: ''; position: absolute; inset: min(0px, calc((var(--sym-size-touch) - var(--_h)) / -2)) 0; }
  .sym-button__label { min-width: 0; }
  .sym-button__icon { transition: translate var(--sym-t-micro); }
  @media (hover: hover) { .sym-button:hover .sym-button__icon { translate: calc(3px * var(--sym-motion-travel)) 0; } }
  .sym-button:active:not(:disabled) { scale: calc(1 - .02 * var(--sym-motion-travel)); transition-duration: var(--sym-dur-instant); }

  /* solid: tone text colour as the fill, tone background as the label: always the tone's own contrast pair */
  .sym-button[data-variant='solid'] { background: var(--sym-fg); color: var(--sym-bg); border-color: var(--sym-fg); }
  .sym-button[data-variant='solid']::before { background: var(--sym-bg); }
  /* outline: fills with the text colour on hover */
  @media (hover: hover) { .sym-button[data-variant='outline']:hover { background: var(--sym-fg); color: var(--sym-bg); } .sym-button[data-variant='outline']:hover::before { opacity: 0; } }
  /* text: a link with an arrow */
  .sym-button[data-variant='text'] { border-color: transparent; border-radius: 0; padding-inline: 0; min-height: var(--sym-size-touch); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .3em; }
  .sym-button[data-variant='text']::before { display: none; }
  @media (hover: hover) { .sym-button[data-variant='text']:hover { text-decoration-thickness: 2px; } }

  .sym-button:disabled { cursor: not-allowed; opacity: var(--sym-state-disabled); }
  @media (forced-colors: active) { .sym-button { border: 1px solid ButtonText; } }
}
</style>
