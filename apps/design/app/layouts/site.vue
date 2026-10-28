<script setup lang="ts">
import { navItems } from '~/data/fixtures'
const route = useRoute()
</script>
<template>
  <div class="ds-site">
    <SymSkipLink target="#main" />
    <SymSiteHeader :items="navItems" :current="route.path" :languages="[{ code: 'uk', label: 'UA', current: true }, { code: 'en', label: 'EN', disabled: true }]" />
    <main id="main"><slot /></main>
    <SymSiteFooter>
      <template #brand><SymStack gap="s"><SymWordmark /><SymText size="sm" muted>Культура, мистецтво та уважне ставлення до психічного здоров’я. Громадська організація <SymBrand>Символ</SymBrand>.</SymText></SymStack></template>
      <template #nav><SymStack gap="2xs" as="ul"><li v-for="i in navItems" :key="i.label"><SymLink :to="i.to" quiet>{{ i.label }}</SymLink></li></SymStack></template>
      <template #contact><SymStack gap="2xs"><SymLink href="mailto:hello@symbol.ngo">hello@symbol.ngo</SymLink><SymLink href="https://www.instagram.com/symbol.ngo/">Instagram</SymLink></SymStack></template>
      <template #legal><SymText size="caption" muted>Харків · Київ · Закарпаття</SymText></template>
    </SymSiteFooter>
    <NuxtLink to="/" class="ds-back">← Галерея</NuxtLink>
  </div>
</template>
<style>
.ds-back { position: fixed; left: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); z-index: var(--sym-z-popover); min-height: 44px; display: inline-flex; align-items: center; padding-inline: 16px; border-radius: 999px; background: var(--symbol-ink); color: var(--symbol-cream); font: 600 .85rem var(--sym-font-text); text-decoration: none; box-shadow: var(--sym-shadow-float); }
</style>
