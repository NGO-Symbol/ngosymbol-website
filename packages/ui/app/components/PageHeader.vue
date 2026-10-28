<script setup lang="ts">
/**
 * The title block at the top of a page: label, the one h1 in display type, a lead paragraph with the main actions beside it,
 * and an optional row of facts. Brings its own top spacing, so it sits directly under the site header; `flush` removes the spacing
 * when the header is placed inside a SymSection that already has padding.
 */
const props = withDefaults(defineProps<{
  /** Small uppercase label above the title. */
  eyebrow?: string
  /** The page title (rendered as h1). For manual line breaks use the `title` slot. */
  title?: string
  /** Lead paragraph under the title. */
  lead?: string
  /** xl = display-xl (home, big hero) | lg = display (inner pages). */
  size?: 'xl' | 'lg'
  /** Remove the built-in top and bottom spacing. */
  flush?: boolean
}>(), { size: 'xl' })
const slots = useSlots()
defineSlots<{ title?: () => any; lead?: () => any; meta?: () => any; actions?: () => any }>()
const hasLower = computed(() => !!(props.lead || slots.lead || slots.actions))
</script>

<template>
  <header class="sym-page-header" :data-size="size" :data-flush="flush || undefined">
    <SymStack gap="l">
      <SymStack gap="s">
        <SymEyebrow v-if="eyebrow">{{ eyebrow }}</SymEyebrow>
        <SymHeading :level="1" :size="size === 'xl' ? 'display-xl' : 'display'"><slot name="title">{{ title }}</slot></SymHeading>
      </SymStack>
      <SymSplit v-if="hasLower" ratio="7:5" align="end" gap="m" stack-below="760">
        <template #start>
          <SymText v-if="lead || $slots.lead" size="lead" as="div" measure><slot name="lead">{{ lead }}</slot></SymText>
        </template>
        <template #end>
          <div v-if="$slots.actions" class="sym-page-header__actions"><slot name="actions" /></div>
        </template>
      </SymSplit>
      <div v-if="$slots.meta" class="sym-page-header__meta"><slot name="meta" /></div>
    </SymStack>
  </header>
</template>

<style>
@layer sym-components {
  .sym-page-header { min-width: 0; padding-block: var(--sym-space-2xl) var(--sym-space-xl); }
  .sym-page-header[data-flush] { padding-block: 0; }
  .sym-page-header__actions, .sym-page-header__meta { min-width: 0; }
  /* actions sit on the right edge of the wide row */
  @container sym-split (min-width: 760px) { .sym-page-header__actions { display: flex; justify-content: flex-end; } }
}
</style>
