<script setup lang="ts">
/**
 * A round control with only an icon: open the menu, close, share, go back. The text alternative is required (`label`): it becomes the
 * aria-label and the tooltip. Renders <button>, <a> (href) or a router link (to). Colours follow the surrounding tone.
 * Never smaller than the 44 px touch target. For an action with words use SymButton.
 */
const props = withDefaults(defineProps<{
  /** Icon name from SymIcon. */
  icon: string
  /** Required text alternative: aria-label and tooltip. Describe the action («Відкрити меню»), not the picture. */
  label: string
  /** m = 44 px (default), l = 56 px (primary phone actions). */
  size?: 'm' | 'l'
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
  <component :is="tag" v-bind="attrs" class="sym-icon-button sym-state" :data-size="size" :data-variant="variant" :aria-label="name" :title="label">
    <SymIcon :name="(icon as any)" class="sym-icon-button__icon" />
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
  .sym-icon-button__icon { --_s: 1.5rem; }
  .sym-icon-button[data-variant='outline'] { border-color: currentColor; }
  @media (hover: hover) {
    .sym-icon-button[data-variant='outline']:hover { background: var(--sym-fg); color: var(--sym-bg); }
    .sym-icon-button[data-variant='outline']:hover::before { opacity: 0; }
  }
  .sym-icon-button:active:not(:disabled) { scale: calc(1 - .06 * var(--sym-motion-travel)); transition-duration: var(--sym-dur-instant); }
  .sym-icon-button:disabled { cursor: not-allowed; opacity: var(--sym-state-disabled); }
  @media (forced-colors: active) { .sym-icon-button[data-variant='outline'] { border-color: ButtonText; } }
}
</style>
