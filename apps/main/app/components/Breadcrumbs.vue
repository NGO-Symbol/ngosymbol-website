<script setup lang="ts">
// Path at the top of a page, like a Finder path: Головна › Розділ › Сторінка. The last item is the current page.
// On phones the path moves into the header (`in-header`, one line, the current page shortened if needed) and the
// copy in the page is hidden; the page copy keeps the structured data for search engines.
const props = defineProps<{ items: { label: string; to?: string }[]; inHeader?: boolean }>()
const { isEn, localePath } = useLang()
const trail = computed(() => [{ label: 'Головна', to: '/' }, ...props.items].map(item => ({ label: translate(item.label, isEn.value), to: item.to && localePath(item.to) })))

if (!props.inHeader) useHead({
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
  <!-- In the header it is a div with the navigation role: the header styles its own <nav> as the section menu. -->
  <component :is="inHeader ? 'div' : 'nav'" class="breadcrumbs" :class="{ 'breadcrumbs--header': inHeader }" :role="inHeader ? 'navigation' : undefined" :aria-label="isEn ? 'Breadcrumbs' : 'Шлях до сторінки'">
    <ol>
      <li v-for="(item, index) in trail" :key="index">
        <NuxtLink v-if="item.to && index < trail.length - 1" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </component>
</template>

<style scoped>
.breadcrumbs { margin-bottom: 28px; font-size: .82rem; }
.breadcrumbs ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 0; }
.breadcrumbs li { display: inline-flex; align-items: center; min-width: 0; }
.breadcrumbs li + li::before { content: '›'; margin: 0 10px; color: var(--symbol-violet); font-size: 1.1em; }
.breadcrumbs a { text-decoration: none; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--symbol-lilac) 55%, transparent); transition: background .2s ease; }
.breadcrumbs a:hover { background: var(--symbol-apricot); }
.breadcrumbs [aria-current] { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 46ch; }
.breadcrumbs--header { margin: 0; font-size: .78rem; min-width: 0; }
.breadcrumbs--header ol { flex-wrap: nowrap; }
.breadcrumbs--header li + li::before { margin: 0 6px; }
.breadcrumbs--header li { flex: 0 1 auto; min-width: 0; max-width: 30vw; }
.breadcrumbs--header li:nth-child(-n + 2):not(:last-child) { flex: none; max-width: none; }
.breadcrumbs--header li:last-child { flex: 1 1 auto; max-width: none; min-width: 22%; }
.breadcrumbs--header a { display: block; min-width: 0; padding: 2px 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.breadcrumbs--header [aria-current] { max-width: none; }
@media (max-width: 820px) { .breadcrumbs:not(.breadcrumbs--header) { display: none; } }
</style>
