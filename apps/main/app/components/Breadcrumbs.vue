<script setup lang="ts">
// Path at the top of a page, like a Finder path: Головна › Розділ › Сторінка. The last item is the current page.
const props = defineProps<{ items: { label: string; to?: string }[] }>()
const trail = computed(() => [{ label: 'Головна', to: '/' }, ...props.items])

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.value.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.to ? `https://symbol.ngo${item.to}` : undefined }))
    })
  }]
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Шлях до сторінки">
    <ol>
      <li v-for="(item, index) in trail" :key="index">
        <NuxtLink v-if="item.to && index < trail.length - 1" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs { margin-bottom: 28px; font-size: .82rem; }
.breadcrumbs ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 0; }
.breadcrumbs li { display: inline-flex; align-items: center; min-width: 0; }
.breadcrumbs li + li::before { content: '›'; margin: 0 10px; color: var(--symbol-violet); font-size: 1.1em; }
.breadcrumbs a { text-decoration: none; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--symbol-lilac) 55%, transparent); transition: background .2s ease; }
.breadcrumbs a:hover { background: var(--symbol-apricot); }
.breadcrumbs [aria-current] { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 46ch; }
</style>
