<script setup lang="ts">
/**
 * A pull quote: serif italic at quote size under a large accent guillemet, with the author and source underneath.
 * Real, attributed quotes only (never invented testimonials). Not for a lead paragraph (SymText size="lead").
 */
defineProps<{
  /** Who said it: name and role as a plain string. */
  cite?: string
  /** Where it was said or published: book, interview, event. */
  source?: string
}>()
defineSlots<{ default?: () => any }>()
</script>

<template>
  <figure class="sym-quote">
    <blockquote class="sym-quote__text sym-t-quote"><slot /></blockquote>
    <figcaption v-if="cite || source" class="sym-quote__by sym-t-body-sm">
      <cite v-if="cite" class="sym-quote__cite">{{ cite }}</cite>
      <span v-if="source" class="sym-quote__source">{{ source }}</span>
    </figcaption>
  </figure>
</template>

<style>
@layer sym-components {
  .sym-quote { display: flex; flex-direction: column; gap: var(--sym-space-m); min-width: 0; max-width: var(--sym-width-narrow); }
  /* decorative mark: empty alternative text keeps it out of the accessibility tree */
  .sym-quote::before { content: '«' / ''; display: block; height: .55em; font-family: var(--sym-font-display); font-size: calc(var(--sym-text-quote) * 2.4); line-height: 1; color: var(--sym-accent); }
  .sym-quote__text { margin: 0; }
  .sym-quote__by { display: flex; flex-direction: column; gap: var(--sym-space-3xs); }
  .sym-quote__cite { font-style: normal; font-weight: 600; }
  .sym-quote__source { color: var(--sym-fg-muted); }
  @media (forced-colors: active) { .sym-quote::before { color: CanvasText; } }
}
</style>
