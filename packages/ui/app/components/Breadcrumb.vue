<script setup lang="ts">
/**
 * «Головна › Проєкти › Назва»: where this page sits. The last item is the current page (not a link). On narrow containers the
 * trail collapses to a single «← parent» link so it never wraps into a tall block. Place it under the header, above the page title.
 */
const props = defineProps<{
  /** Trail from the top: label plus optional router target. The last item is the current page; earlier items without `to` are plain text. */
  items: { label: string; to?: string }[]
  /** Accessible name of the navigation landmark. */
  label?: string
}>()
const NuxtLink = resolveComponent('NuxtLink')
const parent = computed(() => [...props.items].slice(0, -1).reverse().find(i => i.to))
</script>

<template>
  <nav class="sym-breadcrumb" :aria-label="label || 'Навігаційний ланцюжок'" :data-has-parent="parent ? '' : undefined">
    <ol class="sym-breadcrumb__list sym-t-body-sm">
      <li v-for="(item, i) in items" :key="i" class="sym-breadcrumb__item">
        <SymIcon v-if="i > 0" name="chevron-right" class="sym-breadcrumb__sep" />
        <span v-if="i === items.length - 1" class="sym-breadcrumb__current" aria-current="page">{{ item.label }}</span>
        <component :is="NuxtLink" v-else-if="item.to" :to="item.to" class="sym-breadcrumb__link">{{ item.label }}</component>
        <span v-else class="sym-breadcrumb__text">{{ item.label }}</span>
      </li>
    </ol>
    <component :is="NuxtLink" v-if="parent" :to="parent.to" class="sym-breadcrumb__back sym-t-body-sm"><SymIcon name="arrow-left" /><span class="sym-sr-only">Назад: </span>{{ parent.label }}</component>
  </nav>
</template>

<style>
@layer sym-components {
  .sym-breadcrumb { container: sym-breadcrumb / inline-size; width: 100%; color: var(--sym-fg); }
  .sym-breadcrumb__list { display: flex; flex-wrap: wrap; align-items: center; margin: 0; padding: 0; list-style: none; }
  .sym-breadcrumb__item { display: inline-flex; align-items: center; min-width: 0; }
  .sym-breadcrumb__sep { width: 1rem; height: 1rem; margin-inline: var(--sym-space-2xs); color: var(--sym-fg-muted); }
  .sym-breadcrumb__link, .sym-breadcrumb__back { display: inline-flex; align-items: center; min-height: var(--sym-size-touch); color: var(--sym-fg); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .25em; transition: text-decoration-thickness var(--sym-t-small); }
  .sym-breadcrumb__text { color: var(--sym-fg-muted); }
  .sym-breadcrumb__current { font-weight: 600; overflow-wrap: anywhere; }
  .sym-breadcrumb__back { display: none; gap: var(--sym-space-2xs); font-weight: 600; }
  .sym-breadcrumb__back .sym-icon { transition: translate var(--sym-t-micro); }
  @media (hover: hover) {
    .sym-breadcrumb__link:hover, .sym-breadcrumb__back:hover { text-decoration-thickness: 2px; }
    .sym-breadcrumb__back:hover .sym-icon { translate: calc(-3px * var(--sym-motion-travel)) 0; }
  }
  /* narrow: only «← parent» (when there is one) */
  @container sym-breadcrumb (max-width: 34rem) {
    .sym-breadcrumb[data-has-parent] .sym-breadcrumb__list { display: none; }
    .sym-breadcrumb[data-has-parent] .sym-breadcrumb__back { display: inline-flex; }
  }
}
</style>
