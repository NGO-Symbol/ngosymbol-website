<script setup lang="ts">
// Every click on the logo plays the next animation of the mark.
const markAnimations = ['mark-spin', 'mark-bounce', 'mark-flip', 'mark-wobble', 'mark-pulse']
const clicks = ref(0)
const markClass = ref('')

function animateMark(event: MouseEvent) {
  // Already home: no navigation happens, so ask RouteWipe for the circle → logo animation directly.
  if (route.path === '/' || route.path === '/en') window.dispatchEvent(new CustomEvent('symbol:home-wipe', { detail: { x: event.clientX, y: event.clientY } }))
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
const nav = computed(() => isEn.value
  ? [{ to: '/en/projects', label: 'Projects' }, { to: '/en/events', label: 'Events' }, { to: '/en/opportunities', label: 'Opportunities' }, { to: '/en/people', label: 'People' }, { to: '/en/about', label: 'About' }]
  : [{ to: '/projects', label: 'Проєкти' }, { to: '/events', label: 'Події' }, { to: '/opportunities', label: 'Можливості' }, { to: '/people', label: 'Люди' }, { to: '/about', label: 'Про нас' }])

// Active-tab ink: a bar slides under the current section; the clicked tab gives a small spring.
const navEl = ref<HTMLElement>()
const ink = ref({ left: 0, width: 0, visible: false })
const pressed = ref('')
function moveInk() {
  const link = navEl.value?.querySelector<HTMLElement>('.nav-tab.router-link-active')
  if (!link || !navEl.value) { ink.value = { ...ink.value, visible: false }; return }
  ink.value = { left: link.offsetLeft, width: link.offsetWidth, visible: true }
}
function press(to: string) {
  pressed.value = ''
  requestAnimationFrame(() => { pressed.value = to })
}
watch(() => route.path, () => nextTick(moveInk))
onMounted(() => {
  nextTick(moveInk)
  document.fonts?.ready.then(moveInk)
  window.addEventListener('resize', moveInk)
})
onBeforeUnmount(() => window.removeEventListener('resize', moveInk))

// Sticky header: hides while scrolling down, comes back as soon as the visitor scrolls up.
const hidden = ref(false)
const scrolled = ref(false)
let lastY = 0
function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 8
  if (y < 160) {
    hidden.value = false
    lastY = y
    return
  }
  if (Math.abs(y - lastY) < 6) return
  hidden.value = y > lastY && !document.querySelector('.site-search')
  lastY = y
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, () => { hidden.value = false })

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
  <header class="site-header container" :class="{ 'is-hidden': hidden, 'is-scrolled': scrolled }" @focusin="hidden = false">
    <NuxtLink class="wordmark" :to="isEn ? '/en' : '/'" :aria-label="isEn ? 'NGO Symbol — home' : 'ГО «Символ» — головна'" @click="animateMark">
      <SymbolLogo class="header-logo" :class="markClass" @animationend="markClass = ''" />
    </NuxtLink>
    <nav ref="navEl" :aria-label="isEn ? 'Main navigation' : 'Основна навігація'">
      <span class="nav-ink" :class="{ 'is-visible': ink.visible }" :style="{ transform: `translateX(${ink.left}px)`, width: `${ink.width}px` }" aria-hidden="true" />
      <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-tab" :class="{ 'is-pressed': pressed === item.to }" @click="press(item.to)" @animationend="pressed = ''">
        <span class="nav-tab__label"><span class="nav-tab__roll" :data-label="item.label">{{ item.label }}</span></span>
      </NuxtLink>
      <NuxtLink class="nav-support" :to="isEn ? '/en/support' : '/support'">{{ isEn ? 'Support' : 'Підтримати' }}</NuxtLink>
      <div class="lang-switch" role="group" :aria-label="isEn ? 'Language' : 'Мова'" :class="{ 'is-en': isEn }">
        <span class="lang-switch__thumb" aria-hidden="true" />
        <NuxtLink :to="otherLang(false)" lang="uk" :aria-current="!isEn ? 'true' : undefined" @click="choose">UA</NuxtLink>
        <NuxtLink :to="otherLang(true)" lang="en" :aria-current="isEn ? 'true' : undefined" @click="choose">EN</NuxtLink>
      </div>
      <SiteSearch :en="isEn" />
      <button type="button" class="theme-toggle" :aria-label="theme === 'dark' ? (isEn ? 'Light mode' : 'Світлий режим') : (isEn ? 'Dark mode' : 'Темний режим')" :aria-pressed="theme === 'dark'" @click="toggleTheme">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" /></svg>
      </button>
    </nav>
  </header>
</template>
