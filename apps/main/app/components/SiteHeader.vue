<script setup lang="ts">
// Every click on the logo plays the next animation of the mark.
const markAnimations = ['mark-spin', 'mark-bounce', 'mark-flip', 'mark-wobble', 'mark-pulse']
const clicks = ref(0)
const markClass = ref('')

function animateMark() {
  markClass.value = ''
  requestAnimationFrame(() => {
    markClass.value = markAnimations[clicks.value % markAnimations.length]!
    clicks.value++
  })
}

// Language: Ukrainian is primary; the English page lives at /en. The header speaks the page's language.
const route = useRoute()
const isEn = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
const nav = computed(() => isEn.value
  ? [{ to: '/projects', label: 'Projects' }, { to: '/events', label: 'Events' }, { to: '/opportunities', label: 'Opportunities' }, { to: '/people', label: 'People' }, { to: '/about', label: 'About' }]
  : [{ to: '/projects', label: 'Проєкти' }, { to: '/events', label: 'Події' }, { to: '/opportunities', label: 'Можливості' }, { to: '/people', label: 'Люди' }, { to: '/about', label: 'Про нас' }])

// Theme: light ↔ dark; the first click flips from whatever the system shows.
const theme = ref<'light' | 'dark'>('light')
onMounted(() => {
  const set = document.documentElement.getAttribute('data-theme')
  theme.value = set === 'dark' || (!set && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
})
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  const root = document.documentElement
  root.classList.add('theme-switching')
  root.setAttribute('data-theme', theme.value)
  try { localStorage.setItem('symbol-theme', theme.value) } catch {}
  window.setTimeout(() => root.classList.remove('theme-switching'), 700)
}
</script>

<template>
  <header class="site-header container">
    <NuxtLink class="wordmark" :to="isEn ? '/en' : '/'" :aria-label="isEn ? 'NGO Symbol — home' : 'ГО «Символ» — головна'" @click="animateMark">
      <SymbolLogo class="header-logo" :class="markClass" @animationend="markClass = ''" />
    </NuxtLink>
    <nav :aria-label="isEn ? 'Main navigation' : 'Основна навігація'">
      <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      <NuxtLink class="nav-support" to="/support">{{ isEn ? 'Support' : 'Підтримати' }}</NuxtLink>
      <div class="lang-switch" role="group" :aria-label="isEn ? 'Language' : 'Мова'" :class="{ 'is-en': isEn }">
        <span class="lang-switch__thumb" aria-hidden="true" />
        <NuxtLink to="/" lang="uk" :aria-current="!isEn ? 'true' : undefined">UA</NuxtLink>
        <NuxtLink to="/en" lang="en" :aria-current="isEn ? 'true' : undefined">EN</NuxtLink>
      </div>
      <button type="button" class="theme-toggle" :aria-label="theme === 'dark' ? (isEn ? 'Light mode' : 'Світлий режим') : (isEn ? 'Dark mode' : 'Темний режим')" :aria-pressed="theme === 'dark'" @click="toggleTheme">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" /></svg>
      </button>
    </nav>
  </header>
</template>
