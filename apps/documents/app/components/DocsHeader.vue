<script setup lang="ts">
// Header of the project site: a bright way back to symbol.ngo (the organization behind the exhibition) that returns
// to the very page the visitor came from, the project mark, the sections, the language switch and the day/night
// switch. On phones the sections scroll sideways in one row.
const { isEn, localePath, switchPath, t } = useLang()
const backHref = ref(isEn.value ? `${SYMBOL}/en` : SYMBOL)
onMounted(() => { backHref.value = returnUrl(isEn.value) })

// While reading down the header slides away to give the page the room; any scroll up brings it back.
const hidden = ref(false)
let lastY = 0
function onScroll() {
  const y = window.scrollY
  if (Math.abs(y - lastY) < 10) return
  hidden.value = y > 120 && y > lastY
  lastY = y
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const route = useRoute()
const links = computed(() => [
  { to: '/', label: t('Про виставку', 'About') },
  { to: '/kontseptsiia', label: t('Концепція', 'Concept') },
  { to: '/mytsi', label: t('Митці', 'Artists') },
  { to: '/podii', label: t('Події', 'Events') },
  { to: '/presa', label: t('Преса', 'Press') },
  { to: '/komanda', label: t('Команда', 'Team') }
])
const current = computed(() => route.path.replace(/^\/en/, '').replace(/\/$/, '') || '/')
watch(() => route.path, () => { hidden.value = false })
const isActive = (to: string) => (to === '/' ? current.value === '/' : current.value.startsWith(to))

// Day / night: the visitor's choice is kept; without a choice the system setting applies (set before paint in app.vue).
const dark = ref(false)
onMounted(() => { dark.value = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) })
function toggleTheme() {
  dark.value = !dark.value
  const value = dark.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = value
  try { localStorage.setItem('docs-theme', value) } catch {}
}
</script>

<template>
  <header class="docs-header" :class="{ 'is-hidden': hidden }">
    <div class="docs-back">
      <div class="docs-container docs-back__inner">
        <a class="docs-back__link" :href="backHref" @click="leaveTo($event, backHref)">
          <img class="docs-back__mark" src="/favicon.svg" alt="" width="28" height="28">
          <span class="docs-back__text"><span aria-hidden="true">←</span> <span class="docs-back__long">{{ t('Повернутися на сайт ГО «Символ»', 'Back to NGO Symbol') }}</span><span class="docs-back__short">{{ t('Сайт «Символу»', 'NGO Symbol') }}</span></span>
        </a>
        <div class="docs-back__tools">
          <NuxtLink class="docs-lang" :to="switchPath" :aria-label="t('English version', 'Українська версія')">
            <span :class="{ 'is-on': !isEn }">UA</span><span :class="{ 'is-on': isEn }">EN</span>
          </NuxtLink>
          <button type="button" class="docs-theme" :aria-pressed="dark" :aria-label="t('Денний або нічний режим', 'Day or night mode')" @click="toggleTheme">
            <svg v-if="dark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" /></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="docs-container docs-header__main">
      <NuxtLink class="docs-mark" :to="localePath('/')" :aria-label="t('Покажіть свої документи… — головна', 'May I See Your Documents… — home')">
        <DocsStamp class="docs-mark__stamp" />
        <span class="docs-mark__words">
          <span class="docs-mark__top">{{ t('Покажіть', 'May I see') }}</span>
          <span class="docs-mark__tape">{{ t('свої документи…', 'your documents…') }}</span>
        </span>
      </NuxtLink>
      <nav class="docs-nav" :aria-label="t('Розділи сайту виставки', 'Exhibition site sections')">
        <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)" :class="{ 'is-active': isActive(link.to) }">{{ link.label }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Hiding and returning glide slowly and fade a little, as on symbol.ngo. */
.docs-header { position: sticky; top: 0; z-index: 40; background: var(--docs-paper); border-bottom: 3px solid var(--docs-ink); transition: transform .6s cubic-bezier(.22, .61, .36, 1), opacity .45s ease; will-change: transform; }
.docs-header.is-hidden { transform: translateY(calc(-100% - 6px)); opacity: .2; transition: transform .75s cubic-bezier(.22, .61, .36, 1), opacity .75s ease; }
@media (prefers-reduced-motion: reduce) { .docs-header, .docs-header.is-hidden { transition: none; } }
.docs-back__short { display: none; }
/* The way back to Symbol: a bright band in Symbol's own colours (violet with the apricot button and the round mark),
   so it reads at once as «the organization», not as part of the exhibition. */
.docs-back { background: #9280a6; color: #fff7eb; }
.docs-back__inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-block: 10px; }
.docs-back__link { display: inline-flex; align-items: center; gap: 12px; padding: 6px 20px 6px 6px; border-radius: 999px; background: #fdd08f; color: #302738; font-family: var(--docs-mono); font-size: .95rem; font-weight: 600; text-decoration: none; box-shadow: 0 0 0 0 rgba(253, 208, 143, .7); animation: docs-back-call 2.4s ease-out 1.5s 2; transition: transform .2s ease, background .2s ease; }
.docs-back__link:hover { transform: translateX(-4px); background: #fff7eb; }
.docs-back__mark { width: 28px; height: 28px; border-radius: 50%; box-shadow: 0 0 0 2px #fff7eb; }
@keyframes docs-back-call { 0% { box-shadow: 0 0 0 0 rgba(253, 208, 143, .75); } 100% { box-shadow: 0 0 0 14px rgba(253, 208, 143, 0); } }
.docs-back__tools { display: flex; align-items: center; gap: 8px; }
.docs-lang { display: inline-flex; border: 1px solid #fff7eb; border-radius: 999px; overflow: hidden; font-family: var(--docs-mono); font-size: .75rem; text-decoration: none; color: #fff7eb; }
.docs-lang span { padding: 4px 9px; }
.docs-lang span.is-on { background: #fff7eb; color: #302738; }
.docs-theme { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid #fff7eb; border-radius: 50%; background: transparent; color: #fff7eb; cursor: pointer; }
.docs-theme svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; }
.docs-header__main { display: flex; align-items: center; justify-content: space-between; gap: 12px 24px; padding-block: 12px; flex-wrap: wrap; }
/* The project mark: the blue stamp beside the title in EXDocument, the second line typed on a strip of ink tape. */
.docs-mark { display: flex; align-items: center; gap: 12px; font-family: var(--docs-display); text-transform: uppercase; color: var(--docs-ink); text-decoration: none; }
.docs-mark__stamp { width: 52px; height: 52px; flex: none; color: var(--docs-stamp); mix-blend-mode: var(--docs-stamp-blend, multiply); transform: rotate(-12deg); transition: transform .4s cubic-bezier(.3, 1.6, .5, 1); }
.docs-mark:hover .docs-mark__stamp { transform: rotate(8deg) scale(1.08); }
.docs-mark__words { display: grid; justify-items: start; gap: 3px; }
.docs-mark__top { font-size: 1.9rem; line-height: .85; letter-spacing: .01em; }
.docs-mark__tape { padding: 3px 7px 1px; background: var(--docs-ink); color: var(--docs-paper); font-size: 1.05rem; line-height: 1; transform: rotate(-1.5deg); transform-origin: left; }
.docs-nav { display: flex; gap: 4px; font-family: var(--docs-mono); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; overflow-x: auto; scrollbar-width: none; max-width: 100%; }
.docs-nav a { flex: none; padding: 6px 10px 5px; color: var(--docs-ink); text-decoration: none; border: 1px solid transparent; transition: background .2s ease, color .2s ease; }
.docs-nav a:hover { border-color: var(--docs-ink); }
.docs-nav a.is-active { background: var(--docs-ink); color: var(--docs-paper); }
@media (max-width: 640px) {
  /* Phones: one slim line for the way back, a smaller mark; the sections are the folder tabs at the bottom. */
  .docs-back__inner { padding-block: 6px; }
  .docs-back__link { font-size: .78rem; gap: 8px; padding: 3px 12px 3px 3px; }
  .docs-back__mark { width: 22px; height: 22px; }
  .docs-back__long { display: none; }
  .docs-back__short { display: inline; }
  .docs-lang span { padding: 3px 8px; }
  .docs-theme { width: 28px; height: 28px; }
  .docs-header__main { padding-block: 8px; }
  .docs-header__main { padding-block: 6px; }
  .docs-mark { gap: 8px; }
  .docs-mark__stamp { width: 32px; height: 32px; }
  .docs-mark__top { font-size: 1.2rem; }
  .docs-mark__tape { font-size: .74rem; }
  /* On phones the sections are the folder tabs at the bottom (DocsTabs). */
  .docs-nav { display: none; }
}
</style>
