<script setup lang="ts">
/**
 * A thin strip at the very top of an autonomous project site (ADR-0001): it says the site is a project of ГО «Символ» and
 * links back to the main site. At most 40 px tall, on its own tone (plum by default), above the project's own header.
 */
withDefaults(defineProps<{
  /** Tone of the strip: plum (default) | ink-on-light tones when the project theme is dark. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Where the link leads: the main site. */
  href?: string
  /** Link text. */
  label?: string
  /** The statement on the left. */
  text?: string
}>(), { tone: 'plum', href: 'https://symbol.ngo', label: 'symbol.ngo', text: 'Проєкт ГО «Символ»' })
</script>

<template>
  <div class="sym-project-bar" :data-tone="tone">
    <SymContainer size="wide" class="sym-project-bar__in">
      <p class="sym-project-bar__text sym-t-caption"><SymMark :size="20" /><span>{{ text }}</span></p>
      <a :href="href" class="sym-project-bar__link sym-t-caption"><SymIcon name="arrow-left" /><span>{{ label }}</span><span class="sym-sr-only"> — на головний сайт ГО «Символ»</span></a>
    </SymContainer>
  </div>
</template>

<style>
@layer sym-components {
  .sym-project-bar { container: sym-project-bar / inline-size; width: 100%; }
  .sym-project-bar__in { display: flex; align-items: center; justify-content: space-between; gap: var(--sym-space-s); height: 40px; /* strip height is fixed geometry: ADR-0001 caps it at 40 px */ }
  .sym-project-bar__text { display: flex; align-items: center; gap: var(--sym-space-xs); min-width: 0; margin: 0; font-weight: 600; letter-spacing: .02em; }
  .sym-project-bar__text span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sym-project-bar__link { position: relative; display: inline-flex; align-items: center; gap: var(--sym-space-2xs); flex: none; color: var(--sym-fg); font-weight: 600; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .25em; transition: text-decoration-thickness var(--sym-t-small); }
  /* the strip is 40 px; the hit area still reaches the 44 px minimum */
  .sym-project-bar__link::after { content: ''; position: absolute; inset: -2px calc(-1 * var(--sym-space-xs)); }
  /* very narrow phones: drop the mark so the statement and the link both stay whole */
  @container sym-project-bar (max-width: 22rem) { .sym-project-bar__text .sym-mark { display: none; } }
  .sym-project-bar__link .sym-icon { transition: translate var(--sym-t-micro); }
  @media (hover: hover) {
    .sym-project-bar__link:hover { text-decoration-thickness: 2px; }
    .sym-project-bar__link:hover .sym-icon { translate: calc(-3px * var(--sym-motion-travel)) 0; }
  }
}
</style>
