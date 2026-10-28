<script setup lang="ts">
/**
 * The site footer: the organisation block, secondary navigation, contacts and the legal line, on its own tone (plum by default).
 * Content comes in through slots as plain HTML: headings (h2 / h3), lists (<ul role="list">) and links; the footer styles them (label
 * headings, 44 px link rows). Columns sit side by side on wide containers and stack into one on phones. Put it last in the app.
 */
withDefaults(defineProps<{
  /** Tone of the footer: plum (default) | paper | white | lilac | violet | apricot. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Accessible name of the footer navigation landmark. */
  label?: string
}>(), { tone: 'plum', label: 'Додаткова навігація' })
defineSlots<{
  /** Organisation block; default is SymWordmark. Add one short sentence about the organisation under it. */
  brand?: () => any
  /** Secondary navigation: h2 + <ul role="list"> groups. Rendered inside a <nav>. */
  nav?: () => any
  /** Contacts: h2 + lines or links. Rendered inside an <address>. */
  contact?: () => any
  /** The bottom line: copyright, privacy, accessibility statement. */
  legal?: () => any
}>()
</script>

<template>
  <footer class="sym-site-footer" :data-tone="tone">
    <SymContainer size="wide" class="sym-site-footer__in">
      <div class="sym-site-footer__grid sym-t-body-sm">
        <div class="sym-site-footer__brand"><slot name="brand"><SymWordmark /></slot></div>
        <nav v-if="$slots.nav" class="sym-site-footer__nav" :aria-label="label"><slot name="nav" /></nav>
        <address v-if="$slots.contact" class="sym-site-footer__contact"><slot name="contact" /></address>
      </div>
      <div v-if="$slots.legal" class="sym-site-footer__legal sym-t-caption"><slot name="legal" /></div>
    </SymContainer>
  </footer>
</template>

<style>
@layer sym-components {
  .sym-site-footer { container: sym-site-footer / inline-size; width: 100%; padding-block: var(--sym-section-y-sm) var(--sym-space-m); }
  .sym-site-footer__grid { display: grid; gap: var(--sym-space-xl); align-items: start; }
  .sym-site-footer__brand { display: grid; gap: var(--sym-space-s); justify-items: start; max-width: 34ch; }
  .sym-site-footer__brand > p { margin: 0; color: var(--sym-fg-muted); }
  .sym-site-footer__contact { font-style: normal; }
  /* slotted content: label headings, link lists, 44 px link rows */
  .sym-site-footer :is(h2, h3) { margin: 0 0 var(--sym-space-xs); color: var(--sym-fg-muted); font-family: var(--sym-font-label); font-size: var(--sym-text-label); font-weight: 400; line-height: 1.3; letter-spacing: .1em; text-transform: uppercase; }
  .sym-site-footer :is(ul, ol) { display: grid; margin: 0; padding: 0; list-style: none; }
  .sym-site-footer__contact p { margin: 0; }
  .sym-site-footer a {
    display: inline-flex; align-items: center; min-height: var(--sym-size-touch); color: var(--sym-fg);
    text-decoration: underline; text-decoration-color: transparent; text-decoration-thickness: 1px; text-underline-offset: .25em; transition: text-decoration-color var(--sym-t-fx-small);
  }
  .sym-site-footer a[aria-current='page'] { text-decoration-color: currentColor; }
  @media (hover: hover) { .sym-site-footer a:hover { text-decoration-color: currentColor; } }
  .sym-site-footer__legal { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; column-gap: var(--sym-space-m); margin-top: var(--sym-space-xl); padding-top: var(--sym-space-s); border-top: var(--sym-rule-width) solid var(--sym-rule-soft); color: var(--sym-fg-muted); }
  .sym-site-footer__legal :is(p, ul) { margin: 0; }
  .sym-site-footer__legal ul { display: flex; flex-wrap: wrap; column-gap: var(--sym-space-m); }
  .sym-site-footer__legal a { color: var(--sym-fg-muted); }

  @container sym-site-footer (min-width: 40rem) {
    .sym-site-footer__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--sym-gap-grid); }
    .sym-site-footer__brand { grid-column: 1 / -1; max-width: none; }
    .sym-site-footer__brand > p { max-width: 44ch; }
  }
  @container sym-site-footer (min-width: 64rem) {
    .sym-site-footer__grid { grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr)); }
    .sym-site-footer__brand { grid-column: auto; }
  }
}
</style>
