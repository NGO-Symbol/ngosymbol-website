<script setup lang="ts">
/**
 * The heading of a page section: small label (optionally numbered), a big serif title, and on the right an intro paragraph and/or an
 * action. On wide containers heading and intro sit side by side (7:5, intro aligned to the bottom edge of the title); on narrow ones they stack.
 * Use it as the first thing inside every SymSection. The page title (h1) is SymPageHeader.
 */
const props = withDefaults(defineProps<{
  /** Small uppercase label above the title. */
  eyebrow?: string
  /** Section number shown before the eyebrow, e.g. "01". */
  index?: string
  /** The title text. For manual line breaks use the `title` slot instead. */
  title?: string
  /** Outline level of the title (h2 by default); the look is always display size. */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>(), { level: 2 })
const slots = useSlots()
defineSlots<{ title?: () => any; intro?: () => any; action?: () => any }>()
const hasEnd = computed(() => !!(slots.intro || slots.action))
</script>

<template>
  <header class="sym-section-heading">
    <SymSplit v-if="hasEnd" ratio="7:5" align="end" gap="l" stack-below="760">
      <template #start>
        <SymStack gap="s">
          <SymEyebrow v-if="eyebrow || index" :index="index">{{ eyebrow }}</SymEyebrow>
          <SymHeading :level="level" size="display"><slot name="title">{{ title }}</slot></SymHeading>
        </SymStack>
      </template>
      <template #end>
        <SymStack gap="m" align="start">
          <SymText v-if="$slots.intro" as="div" measure><slot name="intro" /></SymText>
          <div v-if="$slots.action" class="sym-section-heading__action"><slot name="action" /></div>
        </SymStack>
      </template>
    </SymSplit>
    <SymStack v-else gap="s">
      <SymEyebrow v-if="eyebrow || index" :index="index">{{ eyebrow }}</SymEyebrow>
      <SymHeading :level="level" size="display"><slot name="title">{{ title }}</slot></SymHeading>
    </SymStack>
  </header>
</template>

<style>
@layer sym-components {
  .sym-section-heading { min-width: 0; margin-block-end: var(--sym-gap-section-head); }
  .sym-section-heading__action { min-width: 0; }
}
</style>
