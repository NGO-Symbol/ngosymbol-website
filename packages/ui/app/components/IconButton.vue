<script setup lang="ts">
// Explicit imports: the main site uses this single file without extending the layer (no auto-imports there).
import { computed, resolveComponent } from 'vue'
import SymIcon from './Icon.vue'
import { isOffSite } from '../utils/links'

/**
 * A round control with only an icon: open the menu, close, share, go back, search, switch the theme. The text alternative is required
 * (`label`): it becomes the aria-label and the tooltip. Renders <button>, <a> (href) or a router link (to). Colours follow the surrounding tone.
 * The touch target is always at least 44 px: the `s` size is a 36 px circle with an invisible 44 px area around it (rows of controls
 * next to SymSegmented size s). For an action with words use SymButton.
 */
const props = withDefaults(defineProps<{
  /** Icon name from SymIcon. */
  icon: string
  /** Required text alternative: aria-label and tooltip. Describe the action («Відкрити меню»), not the picture. */
  label: string
  /** s = 36 px circle with a 44 px touch area (header tools, same height as SymSegmented s), m = 44 px (default), l = 56 px (primary phone actions). */
  size?: 's' | 'm' | 'l'
  /** plain (just the icon) | outline (a hairline ring that fills on hover). */
  variant?: 'plain' | 'outline'
  /** Router link target (inside the app). */
  to?: string
  /** Plain link. http(s) addresses on another site open in a new tab. */
  href?: string
  /** Native button type; "button" by default so it never submits a form by accident. */
  type?: 'button' | 'submit' | 'reset'
  /** Disables the button (ignored for links). */
  disabled?: boolean
  /** Burger icon only: draw the cross (menu open). */
  open?: boolean
}>(), { size: 'm', variant: 'plain', type: 'button' })

const NuxtLink = resolveComponent('NuxtLink')
const external = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return external.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }
  return { type: props.type, disabled: props.disabled }
})
const name = computed(() => (external.value ? `${props.label} (відкриється в новій вкладці)` : props.label))
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-icon-button sym-state" :data-size="size" :data-variant="variant" :data-icon="icon" :aria-label="name" :title="label">
    <SymIcon :name="(icon as any)" :open="open" class="sym-icon-button__icon" />
  </component>
</template>

<style>
@layer sym-components {
  .sym-icon-button {
    --_s: var(--sym-size-touch);
    position: relative; display: inline-grid; place-items: center; flex: none; width: var(--_s); height: var(--_s); margin: 0; padding: 0;
    border: var(--sym-rule-width) solid transparent; border-radius: var(--sym-radius-pill); background: transparent; color: var(--sym-fg); text-decoration: none;
    transition: background-color var(--sym-t-fx-small), color var(--sym-t-fx-small), scale var(--sym-t-small);
  }
  .sym-icon-button[data-size='l'] { --_s: 56px; } /* hero / primary phone action: same step as SymButton size l */
  /* header tools: one height with SymSegmented s (--sym-control-s); the 44 px touch area is an invisible ring around the circle */
  .sym-icon-button[data-size='s'] { --_s: var(--sym-control-s); }
  .sym-icon-button[data-size='s']::after { content: ''; position: absolute; inset: calc((var(--sym-size-touch) - var(--_s) + 2 * var(--sym-rule-width)) / -2); }
  .sym-icon-button__icon { --_s: 1.5rem; }
  .sym-icon-button[data-size='s'] .sym-icon-button__icon { --_s: 18px; stroke-width: 2; } /* 18 px drawn with the 2-unit stroke of the header icons */
  .sym-icon-button[data-icon='burger']:focus-visible { outline: 2px solid currentColor; outline-offset: -4px; } /* the burger has no ring, so the focus ring sits inside */
  .sym-icon-button[aria-pressed='true'] .sym-icon[data-name='theme'] { rotate: 180deg; }
  .sym-icon-button[data-variant='outline'] { border-color: currentColor; }
  @media (hover: hover) {
    .sym-icon-button[data-variant='outline']:hover { background: var(--sym-fg); color: var(--sym-bg); }
    .sym-icon-button[data-variant='outline']:hover::before { opacity: 0; }
  }
  @keyframes sym-icon-wiggle { 30% { rotate: -18deg; scale: 1.1; } 60% { rotate: 10deg; } }
  @media (hover: hover) and (prefers-reduced-motion: no-preference) { .sym-icon-button[data-icon='search']:hover .sym-icon { animation: sym-icon-wiggle .6s ease; } }
  .sym-icon-button:active:not(:disabled) { scale: calc(1 - .06 * var(--sym-motion-travel)); transition-duration: var(--sym-dur-instant); }
  .sym-icon-button:disabled { cursor: not-allowed; opacity: var(--sym-state-disabled); }
  @media (forced-colors: active) { .sym-icon-button[data-variant='outline'] { border-color: ButtonText; } }
}
</style>
