<script setup lang="ts">
/**
 * Wrapper for rich content that you do not control element by element (markdown, CMS HTML): it styles h2 h3 h4 p ul ol blockquote figure img a hr
 * table code with the system's type roles and a 66-character line. Spacing between blocks is automatic; the first and last child have no outer margin.
 * For hand-built pages use SymHeading / SymText instead.
 */
withDefaults(defineProps<{
  /** Remove the 66-character line limit (the parent column decides the width). */
  wide?: boolean
  /** HTML element to render. */
  as?: string
}>(), { as: 'div' })
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="as" class="sym-prose" :data-wide="wide || undefined"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-prose { --_flow: var(--sym-space-m); max-width: var(--sym-width-prose); min-width: 0; font-family: var(--sym-font-text); font-size: var(--sym-text-body); line-height: 1.65; }
  .sym-prose[data-wide] { max-width: none; }
  .sym-prose > * + * { margin-block-start: var(--_flow); }
  .sym-prose > :first-child { margin-block-start: 0; }
  .sym-prose > :last-child { margin-block-end: 0; }

  /* headings: same roles as .sym-t-*, repeated here because markdown output has no classes */
  .sym-prose :is(h2, h3, h4) { font-family: var(--sym-font-display); font-weight: 400; font-optical-sizing: auto; text-wrap: balance; hyphens: manual; overflow-wrap: anywhere; }
  .sym-prose h2 { font-size: var(--sym-text-headline); line-height: 1.06; letter-spacing: -.02em; }
  .sym-prose h3 { font-size: var(--sym-text-title-lg); line-height: 1.1; letter-spacing: -.012em; }
  .sym-prose h4 { font-size: var(--sym-text-title); line-height: 1.2; letter-spacing: -.008em; }
  .sym-prose > :is(h2, h3, h4) { margin-block-start: var(--sym-space-xl); }
  .sym-prose > :is(h2, h3, h4) + * { margin-block-start: var(--sym-space-s); }
  .sym-prose > :first-child:is(h2, h3, h4) { margin-block-start: 0; }

  .sym-prose :is(p, li, dd) { hyphens: auto; text-wrap: pretty; }
  .sym-prose :is(ul, ol) { padding-inline-start: 1.4em; }
  .sym-prose li + li { margin-block-start: var(--sym-space-xs); }
  .sym-prose li::marker { color: var(--sym-fg-muted); }
  .sym-prose :is(ul, ol) :is(ul, ol) { margin-block-start: var(--sym-space-xs); }
  .sym-prose strong, .sym-prose b { font-weight: 600; }
  .sym-prose a { color: inherit; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .22em; transition: text-decoration-thickness var(--sym-t-small); }
  @media (hover: hover) { .sym-prose a:hover { text-decoration-thickness: 2px; } }

  /* quote: serif italic with a rule on the start side */
  .sym-prose blockquote { padding-inline-start: var(--sym-space-m); border-inline-start: var(--sym-rule-width-strong) solid var(--sym-rule); font-family: var(--sym-font-display); font-style: italic; font-size: var(--sym-text-title-lg); line-height: 1.2; letter-spacing: -.012em; text-wrap: balance; }
  .sym-prose blockquote > * + * { margin-block-start: var(--sym-space-xs); }

  .sym-prose hr { margin-block: var(--sym-space-l); }
  .sym-prose figure { margin-block: var(--sym-space-l); }
  .sym-prose :is(img, svg) { width: 100%; height: auto; border-radius: var(--sym-shape-media); }
  .sym-prose figcaption { margin-block-start: var(--sym-space-xs); font-size: var(--sym-text-caption); line-height: 1.45; color: var(--sym-fg-muted); }

  /* code */
  .sym-prose :not(pre) > code { padding: .1em .35em; border-radius: var(--sym-radius-sm); background: color-mix(in srgb, var(--sym-fg) 10%, transparent); }
  .sym-prose :is(code, pre) { font-family: var(--sym-font-mono); font-size: .9em; }
  .sym-prose pre { overflow-x: auto; padding: var(--sym-space-s); border: var(--sym-rule-width) solid var(--sym-rule-soft); line-height: 1.5; }

  /* table scrolls inside itself on narrow screens, never the page */
  .sym-prose table { display: block; max-width: 100%; overflow-x: auto; font-size: var(--sym-text-body-sm); line-height: 1.45; }
  .sym-prose :is(th, td) { padding: var(--sym-space-xs) var(--sym-space-s) var(--sym-space-xs) 0; text-align: start; vertical-align: top; border-bottom: var(--sym-rule-width) solid var(--sym-rule-soft); }
  .sym-prose th { font-weight: 600; border-bottom-color: var(--sym-rule); }

  @media (forced-colors: active) { .sym-prose :not(pre) > code { border: 1px solid CanvasText; } }
}
</style>
