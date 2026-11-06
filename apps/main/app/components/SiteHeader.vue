<script setup lang="ts">
// The header itself lives in the design system (SymSiteHeader, dropdown layout): menu, tabs, hide on scroll, --header-h and
// data-header on <html>. This file supplies what is specific to the site: the logo with its animations, the UA/EN routes,
// the search, the theme switch and the breadcrumb line. The Sym* files are imported one by one (this app does not extend the layer).
import SymSiteHeader from '@symbol/ui/app/components/SiteHeader.vue'
import SymIconButton from '@symbol/ui/app/components/IconButton.vue'
import SymSegmented from '@symbol/ui/app/components/Segmented.vue'

// Every click on the logo plays the next animation of the mark.
const markAnimations = ['mark-spin', 'mark-bounce', 'mark-flip', 'mark-wobble', 'mark-pulse']
const clicks = ref(0)
const markClass = ref('')

function animateMark(event: MouseEvent) {
  // Phones and tablets: no logo animation on tap (it distracted from navigation).
  if (matchMedia('(pointer: coarse)').matches) return
  markClass.value = ''
  requestAnimationFrame(() => {
    markClass.value = markAnimations[clicks.value % markAnimations.length]!
    clicks.value++
  })
}

// Language: Ukrainian is primary; every page has an English mirror under /en (ADR-0009).
// The switch keeps the visitor on the same page; the header speaks the page's language.
const route = useRoute()
const { isEn } = useLang()
const otherLang = (toEn: boolean) => ({ path: switchLangPath(route.path, toEn), query: route.query, hash: route.hash })
const choose = () => { langSwitch.explicit = true }
const langOptions: { value: 'uk' | 'en'; label: string }[] = [{ value: 'uk', label: 'UA' }, { value: 'en', label: 'EN' }]
const nav = computed(() => isEn.value
  ? [{ to: '/en/projects', label: 'Projects' }, { to: '/en/events', label: 'Events' }, { to: '/en/opportunities', label: 'Opportunities' }, { to: '/en/people', label: 'People' }, { to: '/en/about', label: 'About' }]
  : [{ to: '/projects', label: 'Проєкти' }, { to: '/events', label: 'Події' }, { to: '/opportunities', label: 'Можливості' }, { to: '/people', label: 'Люди' }, { to: '/about', label: 'Про нас' }])

// The path to the current page for the phone header (pages show their own copy on wide screens).
const trail = computed(() => trailFor(route.path))

// Theme: light ↔ dark; the first click flips from whatever the system shows.
const theme = ref<'light' | 'dark'>('light')
onMounted(() => {
  const set = document.documentElement.getAttribute('data-theme')
  theme.value = set === 'dark' || (!set && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
})
// The whole page (header and background together) cross-fades to the new theme as one picture.
// Browsers without View Transitions cross-fade colours instead.
function toggleTheme() {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  const root = document.documentElement
  const apply = () => {
    theme.value = next
    root.setAttribute('data-theme', next)
    try { localStorage.setItem('symbol-theme', next) } catch {}
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced) {
    root.classList.add('theme-switching')
    apply()
    window.setTimeout(() => root.classList.remove('theme-switching'), 700)
    return
  }
  root.classList.add('theme-wipe')
  document.startViewTransition(apply).finished.finally(() => root.classList.remove('theme-wipe'))
}
</script>

<template>
  <SymSiteHeader variant="dropdown" autohide :items="nav" :cta="{ label: isEn ? 'Support' : 'Підтримати', to: isEn ? '/en/support' : '/support' }"
    :label="isEn ? 'Main navigation' : 'Основна навігація'" :open-label="isEn ? 'Menu' : 'Меню'" :close-label="isEn ? 'Close menu' : 'Закрити меню'">
    <template #logo>
      <NuxtLink class="wordmark" :to="isEn ? '/en' : '/'" :aria-label="isEn ? 'NGO Symbol — home' : 'ГО «Символ» — головна'" @click="animateMark">
        <SymbolLogo class="header-logo" :class="markClass" @animationend="markClass = ''" />
      </NuxtLink>
    </template>
    <!-- Switches: beside the logo on phones, after the sections on wide screens; all at one height (--sym-control-s). -->
    <template #tools>
      <!-- One link: a tap anywhere on the switch goes to the other language. -->
      <SymSegmented size="s" :options="langOptions" :model-value="isEn ? 'en' : 'uk'" :to="otherLang(!isEn)" :label="isEn ? 'Українська версія' : 'English version'" :lang="isEn ? 'uk' : 'en'" :hreflang="isEn ? 'uk' : 'en'" @click="choose" />
      <SiteSearch :en="isEn" />
      <SymIconButton class="theme-toggle" size="s" variant="outline" icon="theme" :label="theme === 'dark' ? (isEn ? 'Light mode' : 'Світлий режим') : (isEn ? 'Dark mode' : 'Темний режим')" :aria-pressed="theme === 'dark'" @click="toggleTheme" />
    </template>
    <!-- Phones: the path to the current page, as a second line of the header (the open menu lies below it). -->
    <template v-if="trail" #trail><Breadcrumbs class="header-trail" in-header :items="trail" /></template>
  </SymSiteHeader>
</template>
