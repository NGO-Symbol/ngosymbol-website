<script setup lang="ts">
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
const nav = computed(() => isEn.value
  ? [{ to: '/en/projects', label: 'Projects' }, { to: '/en/events', label: 'Events' }, { to: '/en/opportunities', label: 'Opportunities' }, { to: '/en/people', label: 'People' }, { to: '/en/about', label: 'About' }]
  : [{ to: '/projects', label: 'Проєкти' }, { to: '/events', label: 'Події' }, { to: '/opportunities', label: 'Можливості' }, { to: '/people', label: 'Люди' }, { to: '/about', label: 'Про нас' }])

// Active-tab ink: a bar slides under the current section; the clicked tab gives a small spring.
const navEl = ref<HTMLElement>()
// Phones: the sections row scrolls sideways; its edge fade goes once the end («Підтримати») is in view.
const navEnd = ref(false)
function checkNavEnd() {
  const el = navEl.value
  if (el) navEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}
onMounted(() => { checkNavEnd(); navEl.value?.addEventListener('scroll', checkNavEnd, { passive: true }); window.addEventListener('resize', checkNavEnd) })
onBeforeUnmount(() => { navEl.value?.removeEventListener('scroll', checkNavEnd); window.removeEventListener('resize', checkNavEnd) })
const ink = ref({ left: 0, top: 0, width: 0, visible: false })
const pressed = ref('')
function moveInk() {
  const link = navEl.value?.querySelector<HTMLElement>('.nav-tab.router-link-active')
  if (!link || !navEl.value) { ink.value = { ...ink.value, visible: false }; return }
  // The tabs wrap onto several rows on phones, so the bar follows the active tab both across and down.
  ink.value = { left: link.offsetLeft, top: link.offsetTop + link.offsetHeight + 4, width: link.offsetWidth, visible: true }
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

// Phones: the sections live behind a menu button (always a button, never a gesture); the menu closes on navigation,
// on Escape and on a second tap. Wide screens keep the sections in the header row.
const menuOpen = ref(false)
watch(() => route.path, () => { menuOpen.value = false })
function onKey(event: KeyboardEvent) { if (event.key === 'Escape') menuOpen.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// The path to the current page for the phone header (pages show their own copy on wide screens).
const trail = computed(() => trailFor(route.path))

// Sticky header: hides while scrolling down, comes back as soon as the visitor scrolls up.
const hidden = ref(false)
const scrolled = ref(false)
let lastY = 0
let travel = 0
function onScroll() {
  // Phones bounce past the top and bottom edges (rubber-band scroll); those overshoots are ignored so the
  // header does not flicker in and out at the end of a page.
  const max = document.documentElement.scrollHeight - window.innerHeight
  const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0))
  if (y >= max - 2 && y > 160) { lastY = y; return }
  scrolled.value = y > 8
  if (y < 160) {
    hidden.value = false
    lastY = y
    return
  }
  // Only a deliberate scroll moves the header: the distance travelled in one direction must pass a threshold,
  // so small finger or trackpad jitters never make it twitch.
  const delta = y - lastY
  lastY = y
  if (delta === 0) return
  travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
  if (travel > 24 && !document.querySelector('.site-search')) hidden.value = true
  else if (travel < -24) hidden.value = false
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, () => { hidden.value = false })
// Other sticky bars (the year rail on /projects) sit below the header while it is shown and move up
// when it hides: the header's height and state are published on <html> as --header-h and data-header.
const headerEl = ref<HTMLElement>()
let headerSize: ResizeObserver | undefined
onMounted(() => {
  const root = document.documentElement
  headerSize = new ResizeObserver(() => root.style.setProperty('--header-h', `${headerEl.value?.offsetHeight ?? 0}px`))
  if (headerEl.value) headerSize.observe(headerEl.value)
  watch(() => hidden.value && !menuOpen.value, isHidden => { root.dataset.header = isHidden ? 'hidden' : 'shown' }, { immediate: true })
})
onBeforeUnmount(() => headerSize?.disconnect())

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
  <header ref="headerEl" class="site-header container" :class="{ 'is-hidden': hidden && !menuOpen, 'is-scrolled': scrolled, 'is-menu-open': menuOpen }" @focusin="hidden = false">
    <NuxtLink class="wordmark" :to="isEn ? '/en' : '/'" :aria-label="isEn ? 'NGO Symbol — home' : 'ГО «Символ» — головна'" @click="animateMark">
      <SymbolLogo class="header-logo" :class="markClass" @animationend="markClass = ''" />
    </NuxtLink>
    <nav id="site-nav" ref="navEl" :class="{ 'is-end': navEnd, 'is-open': menuOpen }" :aria-label="isEn ? 'Main navigation' : 'Основна навігація'">
      <span class="nav-ink" :class="{ 'is-visible': ink.visible }" :style="{ transform: `translate(${ink.left}px, ${ink.top}px)`, width: `${ink.width}px` }" aria-hidden="true" />
      <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-tab" :class="{ 'is-pressed': pressed === item.to }" @click="press(item.to)" @animationend="pressed = ''">
        <span class="nav-tab__label"><span class="nav-tab__roll" :data-label="item.label">{{ item.label }}</span></span>
      </NuxtLink>
      <NuxtLink class="nav-support" :to="isEn ? '/en/support' : '/support'">{{ isEn ? 'Support' : 'Підтримати' }}</NuxtLink>
    </nav>
    <!-- Switches: beside the logo on phones, after the sections on wide screens. -->
    <div class="header-tools">
      <div class="lang-switch" role="group" :aria-label="isEn ? 'Language' : 'Мова'" :class="{ 'is-en': isEn }">
        <span class="lang-switch__thumb" aria-hidden="true" />
        <NuxtLink :to="otherLang(false)" lang="uk" :aria-current="!isEn ? 'true' : undefined" @click="choose">UA</NuxtLink>
        <NuxtLink :to="otherLang(true)" lang="en" :aria-current="isEn ? 'true' : undefined" @click="choose">EN</NuxtLink>
      </div>
      <SiteSearch :en="isEn" />
      <button type="button" class="theme-toggle" :aria-label="theme === 'dark' ? (isEn ? 'Light mode' : 'Світлий режим') : (isEn ? 'Dark mode' : 'Темний режим')" :aria-pressed="theme === 'dark'" @click="toggleTheme">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" /></svg>
      </button>
      <button type="button" class="menu-toggle" :class="{ 'is-open': menuOpen }" aria-controls="site-nav" :aria-expanded="menuOpen" :aria-label="menuOpen ? (isEn ? 'Close menu' : 'Закрити меню') : (isEn ? 'Menu' : 'Меню')" @click="menuOpen = !menuOpen">
        <span /><span /><span />
      </button>
    </div>
    <!-- Phones: the path to the current page, as a second line of the header (hidden while the menu is open). -->
    <Breadcrumbs v-if="trail" v-show="!menuOpen" class="header-trail" in-header :items="trail" />
  </header>
</template>
