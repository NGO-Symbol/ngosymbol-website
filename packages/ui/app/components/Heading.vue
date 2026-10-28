<script setup lang="ts">
type Size = 'display-xl' | 'display' | 'headline-lg' | 'headline' | 'title-lg' | 'title'

/**
 * A heading. `level` is the document outline (h1–h6, for accessibility and SEO); `size` is how big it looks. They are separate
 * on purpose: pick the level by structure (one h1 per page), the size by role. Display sizes use the serif and never hyphenate.
 */
withDefaults(defineProps<{
  /** Outline level 1–6. One h1 per page. */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Look: display-xl (hero) > display (section title) > headline-lg > headline > title-lg (card title) > title. */
  size?: Size
  /** Muted colour of the tone (secondary headings). */
  muted?: boolean
}>(), { level: 2, size: 'headline' })
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="`h${level}`" class="sym-heading" :class="`sym-t-${size}`" :data-muted="muted || undefined"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-heading[data-muted] { color: var(--sym-fg-muted); }
}
</style>
