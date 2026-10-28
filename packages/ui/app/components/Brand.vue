<script setup lang="ts">
/**
 * The organization's name set in the logo typeface, inline in running text or a heading: «ГО <SymBrand>Символ</SymBrand>». Use it for the name as a brand
 * (wordmarks, the first mention, headings that name the organization), not for every occurrence in a paragraph. Never for other words: the face is a
 * display face. The text stays real text (selectable, translatable, readable by screen readers).
 */
withDefaults(defineProps<{
  /** Set in capitals (СИМВОЛ), as in the logo; the face has capital-like lowercase either way. */
  caps?: boolean
}>(), {})
defineSlots<{ default?: () => any }>()
</script>

<template>
  <span class="sym-brand" :data-caps="caps || undefined"><slot /></span>
</template>

<style>
@layer sym-components {
  .sym-brand { font-family: var(--sym-font-brand); font-weight: 400; font-style: normal; letter-spacing: .02em; hyphens: manual; white-space: nowrap; }
  .sym-brand[data-caps] { text-transform: uppercase; letter-spacing: .06em; }
}
</style>
