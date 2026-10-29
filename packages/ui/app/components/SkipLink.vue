<script setup lang="ts">
/**
 * «Перейти до змісту»: the first thing in the tab order of every page. Invisible until it receives keyboard focus, then it
 * appears at the top-left corner above everything. Put it as the first child of the app, before the header; the page's
 * <main> needs `id="main"` (the target can be changed). Activating it moves focus into the content, not only the scroll position.
 */
const props = withDefaults(defineProps<{
  /** Hash of the element to jump to; the page's <main id="main">. */
  target?: string
  /** Keep the link visible in the flow (gallery and documentation only). */
  visible?: boolean
}>(), { target: '#main' })
defineSlots<{ /** Link text; default «Перейти до змісту». */ default?: () => any }>()

function go(e: MouseEvent) {
  const el = document.querySelector<HTMLElement>(props.target)
  if (!el) return
  e.preventDefault()
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus()
  el.scrollIntoView()
}
</script>

<template>
  <a :href="target" class="sym-skip-link" :data-visible="visible || undefined" @click="go"><slot>Перейти до змісту</slot></a>
</template>

<style>
@layer sym-components {
  .sym-skip-link {
    position: fixed; inset-block-start: var(--sym-space-xs); inset-inline-start: var(--sym-space-xs); z-index: var(--sym-z-skip);
    display: inline-flex; align-items: center; min-height: var(--sym-size-touch); padding-inline: var(--sym-space-m);
    border-radius: var(--sym-shape-control); background: var(--sym-fg); color: var(--sym-bg); box-shadow: var(--sym-shadow-float);
    font-family: var(--sym-font-text); font-size: var(--sym-text-body-sm); font-weight: 600; text-decoration: none;
    translate: 0 calc(-200% - var(--sym-space-xl)); transition: translate var(--sym-t-small-out);
  }
  .sym-skip-link:focus-visible { translate: 0; transition-timing-function: var(--sym-ease-enter); transition-duration: var(--sym-dur-small); outline-color: var(--sym-bg); outline-offset: calc(-1 * var(--sym-focus-width) - 1px); box-shadow: var(--sym-shadow-float), 0 0 0 var(--sym-focus-width) var(--sym-fg); }
  .sym-skip-link[data-visible] { position: relative; inset: auto; translate: none; z-index: auto; }
  @media (forced-colors: active) { .sym-skip-link { border: 1px solid LinkText; } }
}
</style>
