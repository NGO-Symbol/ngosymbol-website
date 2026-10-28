<script setup lang="ts">
interface LogoItem {
  /** Name of the organisation: the alt text, and the visible fallback when there is no logo file. */
  name: string
  /** Logo file (SVG or PNG with transparency). It is painted in the text colour of the tone, so any colour version works. */
  src?: string
  /** Link to the organisation. */
  href?: string
}

/**
 * Partners, donors, media that wrote about us: only ones that are confirmed. Logos are drawn as a mask in the tone's text colour, so they
 * stay monochrome and readable on every tone. A name without a logo file is written out as text.
 */
withDefaults(defineProps<{
  /** The organisations. */
  items: LogoItem[]
  /** Columns on wide containers (3–5); two on phones. */
  cols?: 3 | 4 | 5
  /** Accessible name of the list, e.g. «Партнери». */
  label?: string
}>(), { cols: 4 })
</script>

<template>
  <div class="sym-logo-wall" :data-cols="cols">
  <ul class="sym-logo-wall__list" role="list" :aria-label="label">
    <li v-for="(it, i) in items" :key="i" class="sym-logo-wall__cell">
      <component :is="it.href ? 'a' : 'span'" class="sym-logo-wall__item" v-bind="it.href ? { href: it.href, target: isOffSite(it.href) ? '_blank' : undefined, rel: isOffSite(it.href) ? 'noopener' : undefined } : {}">
        <span v-if="it.src" class="sym-logo-wall__logo" role="img" :aria-label="it.name" :style="{ '--_logo': `url(${it.src})` }" />
        <span v-else class="sym-logo-wall__name sym-t-title">{{ it.name }}</span>
        <span v-if="it.href && isOffSite(it.href)" class="sym-sr-only"> (відкриється в новій вкладці)</span>
      </component>
    </li>
  </ul>
  </div>
</template>

<style>
@layer sym-components {
  .sym-logo-wall { container: sym-logo-wall / inline-size; width: 100%; min-width: 0; }
  .sym-logo-wall__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); width: 100%; min-width: 0; margin: 0; padding: 0; list-style: none; border-block-start: var(--sym-rule-width) solid var(--sym-rule-soft); border-inline-start: var(--sym-rule-width) solid var(--sym-rule-soft); color: var(--sym-fg); }
  .sym-logo-wall__cell { min-width: 0; border-block-end: var(--sym-rule-width) solid var(--sym-rule-soft); border-inline-end: var(--sym-rule-width) solid var(--sym-rule-soft); }
  .sym-logo-wall__item { position: relative; display: flex; align-items: center; justify-content: center; min-height: 6.5rem; height: 100%; padding: var(--sym-space-m) var(--sym-space-xs); color: inherit; text-decoration: none; text-align: center; transition: opacity var(--sym-t-fx-small); }
  .sym-logo-wall__name { color: var(--sym-fg-muted); }
  .sym-logo-wall__logo { display: block; width: min(100%, 9rem); height: 3rem; background: currentColor; -webkit-mask: var(--_logo) center / contain no-repeat; mask: var(--_logo) center / contain no-repeat; }
  a.sym-logo-wall__item .sym-logo-wall__name { color: var(--sym-fg); }
  @media (hover: hover) { a.sym-logo-wall__item:hover { opacity: .65; } }
  @container sym-logo-wall (min-width: 600px) { .sym-logo-wall__list { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @container sym-logo-wall (min-width: 840px) {
    .sym-logo-wall[data-cols='4'] .sym-logo-wall__list { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .sym-logo-wall[data-cols='5'] .sym-logo-wall__list { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  }
  @media (forced-colors: active) { .sym-logo-wall__logo { background: CanvasText; } }
}
</style>
