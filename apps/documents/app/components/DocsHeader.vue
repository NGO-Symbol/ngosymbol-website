<script setup lang="ts">
// Header of the project site: a thin bar back to symbol.ngo, the project mark and the four sections of the
// original site (concept, artists, events, team). On phones the sections scroll sideways in one row.
const links = [
  { to: '/', label: 'Концепція' },
  { to: '/mytsi', label: 'Митці' },
  { to: '/podii', label: 'Події' },
  { to: '/komanda', label: 'Команда' }
]
const route = useRoute()
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header class="docs-header">
    <div class="docs-bar">
      <div class="docs-container docs-bar__inner">
        <a :href="SYMBOL">← symbol.ngo</a>
        <span>Проєкт ГО «Символ»</span>
      </div>
    </div>
    <div class="docs-container docs-header__main">
      <NuxtLink class="docs-mark" to="/" aria-label="Покажіть свої документи… — головна">
        <span>Покажіть</span><span>свої документи…</span>
      </NuxtLink>
      <nav class="docs-nav" aria-label="Розділи сайту виставки">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :class="{ 'is-active': isActive(link.to) }">{{ link.label }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.docs-header { position: sticky; top: 0; z-index: 40; background: var(--docs-paper); border-bottom: 3px solid var(--docs-ink); }
.docs-bar { background: var(--docs-ink); color: var(--docs-paper); font-family: var(--docs-mono); font-size: .72rem; letter-spacing: .06em; text-transform: uppercase; }
.docs-bar__inner { display: flex; justify-content: space-between; gap: 16px; padding-block: 6px; }
.docs-bar a { color: inherit; text-decoration: none; }
.docs-bar a:hover { text-decoration: underline; }
.docs-header__main { display: flex; align-items: center; justify-content: space-between; gap: 12px 24px; padding-block: 12px; flex-wrap: wrap; }
.docs-mark { display: grid; font-family: var(--docs-display); text-transform: uppercase; line-height: .95; font-size: 1.15rem; color: var(--docs-ink); text-decoration: none; }
.docs-mark span:last-child { font-size: .78em; }
.docs-nav { display: flex; gap: 4px; font-family: var(--docs-mono); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; overflow-x: auto; scrollbar-width: none; max-width: 100%; }
.docs-nav a { flex: none; padding: 6px 10px 5px; color: var(--docs-ink); text-decoration: none; border: 1px solid transparent; transition: background .2s ease, color .2s ease; }
.docs-nav a:hover { border-color: var(--docs-ink); }
.docs-nav a.is-active { background: var(--docs-ink); color: var(--docs-paper); }
@media (max-width: 640px) {
  .docs-header__main { flex-direction: column; align-items: flex-start; }
  .docs-nav { margin-inline: -10px; }
}
</style>
