<script setup lang="ts">
// Explicit imports: the main site uses this single file without extending the layer (no auto-imports, no global Sym* components there).
import { computed, nextTick, onBeforeUnmount, onMounted, ref, resolveComponent, useId, watch } from 'vue'
import { useRoute } from '#imports'
import SymContainer from './Container.vue'
import SymWordmark from './Wordmark.vue'
import SymIcon from './Icon.vue'
import SymIconButton from './IconButton.vue'
import SymButton from './Button.vue'
import { isOffSite } from '../utils/links'
import { useScrolled } from '../composables/useScrolled'

interface NavItem {
  /** Visible text. */
  label: string
  /** Router link target (inside the app). */
  to?: string
  /** Plain link (anchor, or another site: off-site http(s) opens in a new tab). */
  href?: string
}
interface Language {
  /** BCP 47 code, e.g. "uk", "en": becomes `lang` / `hreflang`. */
  code: string
  /** Visible short label, e.g. «UA». */
  label: string
  /** Router target of this language version. */
  to?: string
  /** The language of the page being read: shown as the current one, not a link. */
  current?: boolean
  /** The version does not exist yet: shown dimmed and announced as unavailable. */
  disabled?: boolean
}

/**
 * The site header: logo, main navigation, language switch and one call to action. Sticky; it gets a hairline and the floating shadow
 * only after the page scrolls. Two layouts. `drawer` (default): from 840 px wide the navigation is inline; below, a menu button opens a
 * full-screen drawer (links stacked in the headline size, focus trapped, Esc or a link tap closes it, the page behind does not scroll).
 * `dropdown` (the main site): tabs with a sliding ink bar; below 821 px the menu button sits left of the logo and opens the list below the
 * header line over a dimmed page; the controls (language, search, theme) come through the `tools` slot and the breadcrumb line through
 * `trail`. The switch between layouts is pure CSS, so server and client markup are identical. Put it first in the app (after SymSkipLink),
 * outside the page transition.
 */
const props = withDefaults(defineProps<{
  /** Main navigation, in order. The item matching the current page gets aria-current="page". */
  items: NavItem[]
  /** Language versions; omit when the site has one language. */
  languages?: Language[]
  /** The one call to action (a solid button): «Підтримати». */
  cta?: { label: string; to?: string; href?: string }
  /** Tone of the header surface (it must be opaque: content scrolls under it). Default: the page's tone. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Path (or #hash) treated as the current page; default is the router's current path. For the gallery and tests. */
  current?: string
  /** Force the scrolled look (hairline + shadow); default follows the page scroll. For the gallery. */
  scrolled?: boolean
  /** Accessible name of the navigation landmark. */
  label?: string
  /** drawer = full-screen drawer on phones (default); dropdown = menu button left of the logo, list below the header, `tools` and `trail` slots. */
  variant?: 'drawer' | 'dropdown'
  /** dropdown only: hide while scrolling down and show again on scroll up; publishes --header-h and data-header ("shown" | "hidden") on <html> for sticky bars below. */
  autohide?: boolean
  /** Accessible name of the menu button while the menu is closed. */
  openLabel?: string
  /** Accessible name of the menu button while the menu is open. */
  closeLabel?: string
}>(), { label: 'Основна навігація', scrolled: undefined, variant: 'drawer', openLabel: 'Відкрити меню', closeLabel: 'Закрити меню' })
defineSlots<{
  /** The logo; default is SymWordmark linking to "/". */
  logo?: () => any
  /** dropdown: controls after the navigation (language switch, search, theme), one row at a single control height. */
  tools?: () => any
  /** dropdown: second line of the header on phones (the breadcrumb path); hidden from 821 px up. */
  trail?: () => any
}>()

const NuxtLink = resolveComponent('NuxtLink')
const route = useRoute()
const open = ref(false)
const panelId = useId()
const headerEl = ref<HTMLElement | null>(null)
const toggleEl = ref<{ $el: HTMLElement } | null>(null)
const dropdown = props.variant === 'dropdown'
const navEl = ref<HTMLElement | null>(null)
// the dropdown tracks the scroll itself (it needs the direction too); the drawer only needs «scrolled»
const pageScrolled = dropdown ? ref(false) : useScrolled()
const isScrolled = computed(() => props.scrolled ?? pageScrolled.value)

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)
function isCurrent(i: NavItem) {
  const target = i.to ?? i.href
  if (!target) return false
  const here = trim(props.current ?? route.path)
  const t = trim(target)
  return here === t || (t.startsWith('/') && t !== '/' && here.startsWith(`${t}/`))
}
function linkAttrs(i: NavItem) {
  const current = isCurrent(i)
  // the router would mark an exact route match on its own; `aria-current-value` makes it follow the same rule as plain links (section parents, `current` prop)
  const a: Record<string, unknown> = i.to ? { to: i.to, 'aria-current-value': current ? 'page' : 'false' } : isOffSite(i.href) ? { href: i.href, target: '_blank', rel: 'noopener' } : { href: i.href }
  if (current) a['aria-current'] = 'page'
  return a
}
const tag = (i: { to?: string }) => (i.to ? NuxtLink : 'a')
const stagger = (n: number) => ({ '--_i': Math.min(n, 5) })
const tailIndex = computed(() => props.items.length)

// ---------- drawer behaviour (client only; the markup is the same on the server) ----------
const DESKTOP = dropdown ? '(min-width: 821px)' : '(min-width: 840px)' // keep in sync with the @media rules below
function focusables(): HTMLElement[] {
  const root = headerEl.value
  if (!root) return []
  return [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
    .filter(el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden')
}
function close(returnFocus = false) {
  open.value = false
  if (returnFocus) toggleEl.value?.$el?.focus()
}
// dropdown: no focus trap (the list lies below the header); Esc closes, a tap outside the header closes
function onKeyDropdown(e: KeyboardEvent) {
  if (e.key === 'Escape') close(!!headerEl.value?.contains(document.activeElement))
}
function onOutsideTap(e: PointerEvent) {
  if (!headerEl.value?.contains(e.target as Node)) close()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); close(true); return }
  if (e.key !== 'Tab') return
  const list = focusables()
  if (!list.length) return
  const first = list[0]!
  const last = list[list.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && (active === first || !headerEl.value?.contains(active))) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && (active === last || !headerEl.value?.contains(active))) { e.preventDefault(); first.focus() }
}
function onFocusIn(e: FocusEvent) {
  if (!headerEl.value?.contains(e.target as Node)) document.getElementById(panelId)?.querySelector<HTMLElement>('a[href]')?.focus()
}
function onPanelClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a[href]')) close()
}
let mq: MediaQueryList | undefined
const onMq = () => { if (mq?.matches) close() }
watch(open, (v) => {
  if (!import.meta.client) return
  document.documentElement.toggleAttribute('data-sym-lock', v)
  if (dropdown) {
    if (v) { document.addEventListener('keydown', onKeyDropdown); document.addEventListener('pointerdown', onOutsideTap) }
    else { document.removeEventListener('keydown', onKeyDropdown); document.removeEventListener('pointerdown', onOutsideTap) }
    return
  }
  if (v) {
    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusIn)
    nextTick(() => document.getElementById(panelId)?.querySelector<HTMLElement>('a[href]')?.focus())
  } else {
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('focusin', onFocusIn)
  }
})
watch(() => route.fullPath, () => close())
watch(() => props.items, () => nextTick(moveInk))
onMounted(() => { mq = window.matchMedia(DESKTOP); mq.addEventListener('change', onMq) })
onBeforeUnmount(() => {
  mq?.removeEventListener('change', onMq)
  if (!import.meta.client) return
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('keydown', onKeyDropdown)
  document.removeEventListener('pointerdown', onOutsideTap)
  document.documentElement.removeAttribute('data-sym-lock')
})

// ---------- dropdown only: active-tab ink, press spring, hide on scroll, published header size ----------
const ink = ref({ left: 0, top: 0, width: 0, visible: false })
const pressed = ref('')
const hidden = ref(false)
const scrolled = ref(false)
function moveInk() {
  const link = navEl.value?.querySelector<HTMLElement>('.sym-site-header__tab[aria-current="page"]')
  if (!link) { ink.value = { ...ink.value, visible: false }; return }
  // the ink bar follows the active tab (below its label, 4 px apart)
  ink.value = { left: link.offsetLeft, top: link.offsetTop + link.offsetHeight + 4, width: link.offsetWidth, visible: true }
}
function press(label: string) {
  pressed.value = ''
  requestAnimationFrame(() => { pressed.value = label })
}
let lastY = 0
let travel = 0
function onScroll() {
  // Phones bounce past the top and bottom edges (rubber-band scroll); those overshoots are ignored so the
  // header does not flicker in and out at the end of a page.
  const max = document.documentElement.scrollHeight - window.innerHeight
  const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0))
  if (y >= max - 2 && y > 160) { lastY = y; return }
  scrolled.value = y > 8
  if (!props.autohide) return
  if (y < 160) { hidden.value = false; lastY = y; return }
  // Only a deliberate scroll moves the header: the distance travelled in one direction must pass a threshold,
  // so small finger or trackpad jitters never make it twitch.
  const delta = y - lastY
  lastY = y
  if (delta === 0) return
  travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
  // an open modal dialog (the site search) keeps the header where it is
  if (travel > 24 && !document.querySelector('[aria-modal="true"]')) hidden.value = true
  else if (travel < -24) hidden.value = false
}
let headerSize: ResizeObserver | undefined
let stopPublish: (() => void) | undefined
onMounted(() => {
  if (!dropdown) return
  nextTick(moveInk)
  document.fonts?.ready.then(moveInk)
  window.addEventListener('resize', moveInk)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  if (!props.autohide) return
  const root = document.documentElement
  headerSize = new ResizeObserver(() => root.style.setProperty('--header-h', `${headerEl.value?.offsetHeight ?? 0}px`))
  if (headerEl.value) headerSize.observe(headerEl.value)
  stopPublish = watch(() => hidden.value && !open.value, isHidden => { root.dataset.header = isHidden ? 'hidden' : 'shown' }, { immediate: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', moveInk)
  window.removeEventListener('scroll', onScroll)
  headerSize?.disconnect()
  stopPublish?.()
})
watch(() => route.path, () => { hidden.value = false; if (dropdown) nextTick(moveInk) })
</script>

<template>
  <header v-if="dropdown" ref="headerEl" class="sym-site-header" data-variant="dropdown" :data-tone="tone" :data-scrolled="isScrolled || undefined" :data-open="open || undefined"
    :data-hidden="(hidden && !open) || undefined" @focusin="hidden = false" @click.self="close()">
    <!-- Phones: the menu button comes first, left of the logo (48 px touch area, no ring, three bars that fold into a cross). -->
    <SymIconButton ref="toggleEl" class="sym-site-header__burger" icon="burger" :open="open" :label="open ? closeLabel : openLabel"
      :aria-expanded="open" :aria-controls="panelId" @click="open = !open" />
    <div class="sym-site-header__logo"><slot name="logo"><SymWordmark to="/" /></slot></div>
    <nav :id="panelId" ref="navEl" class="sym-site-header__nav" :data-open="open || undefined" :aria-label="label">
      <span class="sym-site-header__ink" :data-visible="ink.visible || undefined" :style="{ transform: `translate(${ink.left}px, ${ink.top}px)`, width: `${ink.width}px` }" aria-hidden="true" />
      <component :is="tag(item)" v-for="(item, i) in items" :key="item.label" v-bind="linkAttrs(item)" class="sym-site-header__tab" :data-pressed="pressed === item.label || undefined"
        :style="stagger(i)" @click="press(item.label)" @animationend="pressed = ''">
        <span class="sym-site-header__tab-label"><span class="sym-site-header__roll" :data-label="item.label">{{ item.label }}</span></span>
        <span v-if="isOffSite(item.href)" class="sym-sr-only"> (відкриється в новій вкладці)</span>
      </component>
      <component :is="tag(cta)" v-if="cta" v-bind="linkAttrs(cta)" class="sym-site-header__support" :style="stagger(tailIndex)">{{ cta.label }}</component>
    </nav>
    <div class="sym-site-header__tools"><slot name="tools" /></div>
    <div v-if="$slots.trail" class="sym-site-header__trail"><slot name="trail" /></div>
  </header>
  <header v-else ref="headerEl" class="sym-site-header" data-variant="drawer" :data-tone="tone" :data-scrolled="isScrolled || undefined" :data-open="open || undefined">
    <SymContainer size="wide" class="sym-site-header__bar">
      <div class="sym-site-header__logo"><slot name="logo"><SymWordmark to="/" /></slot></div>
      <SymIconButton ref="toggleEl" class="sym-site-header__toggle" variant="outline" :icon="open ? 'close' : 'menu'" :label="open ? 'Закрити меню' : 'Відкрити меню'"
        :aria-expanded="open" :aria-controls="panelId" @click="open = !open" />
      <div :id="panelId" class="sym-site-header__panel" @click="onPanelClick">
        <nav class="sym-site-header__nav" :aria-label="label">
          <ul role="list" class="sym-site-header__list">
            <li v-for="(item, i) in items" :key="item.label" class="sym-site-header__item" :style="stagger(i)">
              <component :is="tag(item)" v-bind="linkAttrs(item)" class="sym-site-header__link sym-state">
                <span class="sym-site-header__label">{{ item.label }}</span>
                <SymIcon name="arrow-right" class="sym-site-header__arrow" />
                <span v-if="isOffSite(item.href)" class="sym-sr-only"> (відкриється в новій вкладці)</span>
              </component>
            </li>
          </ul>
        </nav>
        <div v-if="languages?.length || cta" class="sym-site-header__tail">
          <ul v-if="languages?.length" role="list" aria-label="Мова сторінки" class="sym-site-header__langs sym-site-header__item" :style="stagger(tailIndex)">
            <li v-for="l in languages" :key="l.code">
              <span v-if="l.current" class="sym-site-header__lang" aria-current="true" :lang="l.code">{{ l.label }}</span>
              <span v-else-if="l.disabled || !l.to" class="sym-site-header__lang" aria-disabled="true" :lang="l.code">{{ l.label }}<span class="sym-sr-only"> (поки недоступно)</span></span>
              <NuxtLink v-else :to="l.to" class="sym-site-header__lang sym-state" :lang="l.code" :hreflang="l.code">{{ l.label }}</NuxtLink>
            </li>
          </ul>
          <div v-if="cta" class="sym-site-header__cta sym-site-header__item" :style="stagger(tailIndex + 1)">
            <SymButton :to="cta.to" :href="cta.href" block>{{ cta.label }}</SymButton>
          </div>
        </div>
      </div>
    </SymContainer>
  </header>
</template>

<style>
@layer sym-components {
  html[data-sym-lock], html[data-sym-lock] body { overflow: hidden; overscroll-behavior: none; } /* scroll lock, menu open */

  .sym-site-header {
    position: sticky; inset-block-start: 0; z-index: var(--sym-z-sticky); background: var(--sym-bg); color: var(--sym-fg);
    min-height: calc(var(--sym-header-h) + var(--sym-rule-width)); border-bottom: var(--sym-rule-width) solid transparent; transition: border-color var(--sym-t-fx-large);
  }
  /* the floating shadow fades in on its own layer (a shadow itself is not animated) */
  .sym-site-header::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; box-shadow: var(--sym-shadow-float); opacity: 0; transition: opacity var(--sym-t-fx-large); }
  .sym-site-header[data-scrolled] { border-bottom-color: var(--sym-rule); }
  .sym-site-header[data-scrolled]::after { opacity: 1; }
  .sym-site-header[data-open] { z-index: var(--sym-z-drawer); }

  .sym-site-header__bar { display: flex; align-items: center; gap: var(--sym-space-s); min-height: var(--sym-header-h); }
  .sym-site-header__logo, .sym-site-header__toggle { position: relative; z-index: var(--sym-z-raised); }
  .sym-site-header__logo { margin-inline-end: auto; }

  .sym-site-header__list { margin: 0; padding: 0; list-style: none; }
  .sym-site-header__langs { display: flex; margin: 0; padding: 0; list-style: none; }
  .sym-site-header__lang {
    position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: var(--sym-size-touch); min-height: var(--sym-size-touch);
    border-radius: var(--sym-shape-control); color: var(--sym-fg); text-decoration: none;
    font-family: var(--sym-font-label); font-size: var(--sym-text-label); font-weight: 400; letter-spacing: .1em; text-transform: uppercase;
  }
  .sym-site-header__lang[aria-current] { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .35em; }
  .sym-site-header__lang[aria-disabled] { opacity: var(--sym-state-disabled); cursor: not-allowed; }
  .sym-site-header__link { position: relative; color: var(--sym-fg); text-decoration: none; hyphens: manual; }

  /* ---------- phones and tablets: the menu button + the full-screen drawer ---------- */
  @media (width < 840px) {
    .sym-site-header__panel {
      position: fixed; inset: 0; z-index: var(--sym-z-base); height: 100dvh; overflow-y: auto; overscroll-behavior: contain;
      display: flex; flex-direction: column; padding: var(--sym-header-h) var(--sym-page-margin) 0; background: var(--sym-bg);
      visibility: hidden; opacity: 0; clip-path: inset(0 0 calc(100% * var(--sym-motion-travel)) 0);
      transition: clip-path var(--sym-t-xlarge-out), opacity var(--sym-t-fx-hero), visibility 0s linear var(--sym-dur-xlarge-out);
    }
    .sym-site-header[data-open] .sym-site-header__panel {
      visibility: visible; opacity: 1; clip-path: inset(0);
      transition: clip-path var(--sym-t-xlarge-in), opacity var(--sym-t-fx-hero), visibility 0s;
    }
    /* open: the bar is pinned to the top of the window with the panel (the header keeps its height, so nothing jumps) */
    .sym-site-header[data-open] .sym-site-header__bar { position: fixed; inset-block-start: 0; inset-inline: 0; }
    .sym-site-header__nav { padding-block: var(--sym-space-s); }
    .sym-site-header__link {
      display: flex; align-items: center; justify-content: space-between; gap: var(--sym-space-s); min-height: var(--sym-size-touch); padding-block: var(--sym-space-s);
      /* headline type role (.sym-t-headline) with tokens: the same element is the small inline link on desktop */
      font-family: var(--sym-font-display); font-size: var(--sym-text-headline); line-height: 1.06; letter-spacing: -.02em; overflow-wrap: anywhere;
      border-bottom: var(--sym-rule-width) solid var(--sym-rule-soft);
    }
    .sym-site-header__link[aria-current='page'] .sym-site-header__label { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .12em; }
    .sym-site-header__arrow { flex: none; transition: translate var(--sym-t-micro); }
    @media (hover: hover) { .sym-site-header__link:hover .sym-site-header__arrow { translate: calc(4px * var(--sym-motion-travel)) 0; } }
    .sym-site-header__tail { display: grid; gap: var(--sym-space-m); margin-top: auto; padding-block: var(--sym-space-l) calc(var(--sym-space-l) + env(safe-area-inset-bottom)); }
    .sym-site-header__langs { gap: var(--sym-space-2xs); }
    .sym-site-header__lang { justify-content: flex-start; padding-inline-end: var(--sym-space-xs); }

    /* staggered entrance: every row rises after the panel starts to open (steps of --sym-stagger, at most 6) */
    .sym-site-header__item { opacity: 0; translate: 0 calc(var(--sym-reveal-distance) * var(--sym-motion-travel)); transition: opacity var(--sym-t-fx-micro), translate var(--sym-t-large-out); }
    .sym-site-header[data-open] .sym-site-header__item {
      opacity: 1; translate: 0; transition: opacity var(--sym-t-fx-hero), translate var(--sym-t-large-in); transition-delay: calc((var(--_i, 0) + 1) * var(--sym-stagger));
    }
  }

  /* ---------- desktop: inline navigation ---------- */
  @media (width >= 840px) {
    .sym-site-header__bar { gap: var(--sym-space-xs); }
    .sym-site-header__toggle { display: none; }
    .sym-site-header__panel { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: var(--sym-space-xs); min-width: 0; }
    .sym-site-header__list { display: flex; flex-wrap: wrap; align-items: center; gap: 0; } /* too many items: the row wraps whole items instead of overflowing */
    .sym-site-header__link {
      display: inline-flex; align-items: center; min-height: var(--sym-size-touch); padding-inline: var(--sym-space-xs); border-radius: var(--sym-shape-control);
      font-family: var(--sym-font-label); font-size: var(--sym-text-body-sm); font-weight: 400; line-height: 1.2; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap;
    }
    .sym-site-header__arrow { display: none; }
    /* the current page keeps an underline; hover draws it in (opacity first, the draw only when motion is allowed) */
    .sym-site-header__link::after {
      content: ''; position: absolute; inset-inline: var(--sym-space-xs); inset-block-end: var(--sym-space-xs); height: var(--sym-rule-width-strong); background: currentColor;
      opacity: 0; scale: calc(1 - .7 * var(--sym-motion-travel)) 1; transition: opacity var(--sym-t-fx-small), scale var(--sym-t-small);
    }
    .sym-site-header__link[aria-current='page']::after { opacity: 1; scale: 1; }
    @media (hover: hover) { .sym-site-header__link:hover::after { opacity: 1; scale: 1; } }
    .sym-site-header__tail { display: flex; align-items: center; gap: var(--sym-space-xs); flex: none; }
    .sym-site-header__langs { gap: 0; }
  }

  /* ================= dropdown layout (the main site) =================
     The header itself is the page-width bar: its hairline spans the column while the background reaches the window edges (a spread
     shadow clipped to the sides; on phones a ::before). Timings below are the main site's own and are kept as they were. */
  .sym-site-header[data-variant='dropdown'] {
    --_gap: clamp(14px, 2.2vw, 32px);
    width: min(var(--sym-width-page), 100% - 2 * var(--sym-page-margin)); margin-inline: auto; min-height: 5.25rem;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    border-bottom: var(--sym-rule-width) solid var(--sym-fg);
    box-shadow: 0 0 0 100vmax var(--sym-bg); clip-path: inset(0 -100vmax -12px); will-change: transform;
    transition: transform .6s cubic-bezier(.22, .61, .36, 1), opacity .45s ease, background .4s ease, box-shadow .4s ease, color .4s ease;
  }
  .sym-site-header[data-variant='dropdown'][data-scrolled] { border-bottom-color: var(--sym-fg); box-shadow: 0 0 0 100vmax var(--sym-bg), 0 8px 18px -12px color-mix(in srgb, var(--sym-fg) 45%, transparent); }
  .sym-site-header[data-variant='dropdown'][data-open] { z-index: var(--sym-z-sticky); }
  /* hiding moves the header 14 px further: the clipped background reaches 12 px below it */
  .sym-site-header[data-variant='dropdown'][data-hidden] {
    transform: translateY(calc(-100% - 14px)); opacity: .2;
    transition: transform .7s cubic-bezier(.22, .61, .36, 1), opacity .7s ease, background .4s ease, box-shadow .4s ease, color .4s ease;
  }
  .sym-site-header[data-variant='dropdown']::after { content: none; }
  /* the logo slot keeps its own box: it is a direct flex item of the header */
  .sym-site-header[data-variant='dropdown'] .sym-site-header__logo { display: contents; }
  .sym-site-header__burger { display: none; }
  .sym-site-header__trail { display: none; }

  .sym-site-header[data-variant='dropdown'] .sym-site-header__nav {
    position: relative; display: flex; align-items: center; gap: var(--_gap); margin-left: auto; padding: 0; font-size: .85rem;
  }
  .sym-site-header__tab, .sym-site-header__support, .sym-site-header__tools a { text-decoration: none; }
  .sym-site-header__tools { display: flex; align-items: center; gap: 12px; margin-left: calc(var(--_gap) - 24px); }
  /* tabs: on hover the label rolls up to a copy in the accent colour; a click springs */
  .sym-site-header__tab { position: relative; display: inline-block; padding-block: 4px; color: inherit; }
  .sym-site-header__tab-label { display: inline-block; overflow: hidden; vertical-align: bottom; line-height: 1.3; }
  .sym-site-header__roll { position: relative; display: block; transition: transform .45s cubic-bezier(.3, 1.2, .4, 1); }
  .sym-site-header__roll::after { content: attr(data-label); position: absolute; left: 0; top: 100%; color: var(--sym-accent); }
  .sym-site-header__tab:hover .sym-site-header__roll, .sym-site-header__tab:focus-visible .sym-site-header__roll { transform: translateY(-100%); }
  .sym-site-header__tab[data-pressed] { animation: sym-site-header-press .5s cubic-bezier(.3, 1.6, .5, 1); }
  @keyframes sym-site-header-press { 0% { transform: scale(1); } 30% { transform: scale(.88) rotate(-2deg); } 100% { transform: none; } }
  /* the ink bar slides under the current tab; its apricot dot drifts */
  .sym-site-header__ink {
    position: absolute; left: 0; top: 0; height: 3px; border-radius: 3px; background: var(--sym-accent); opacity: 0; transform-origin: left; pointer-events: none;
    transition: transform .55s cubic-bezier(.3, 1.3, .4, 1), width .55s cubic-bezier(.3, 1.3, .4, 1), opacity .3s ease;
  }
  .sym-site-header__ink[data-visible] { opacity: 1; }
  .sym-site-header__ink::after { content: ''; position: absolute; right: -4px; top: -2.5px; width: 8px; height: 8px; border-radius: 50%; background: var(--sym-highlight, var(--symbol-apricot)); animation: sym-site-header-dot 2.4s ease-in-out infinite; }
  @keyframes sym-site-header-dot { 50% { transform: translateX(-6px) scale(.7); } }
  /* the one call to action: a pill in the highlight colour (--sym-highlight, text --sym-on-highlight) */
  .sym-site-header__support { padding: 7px 14px; border-radius: 999px; background: var(--sym-highlight, var(--symbol-apricot)); color: var(--sym-on-highlight, var(--sym-fg)); }
  .sym-site-header__support:hover, .sym-site-header__support[aria-current='page'] { background: var(--sym-accent); color: var(--sym-on-highlight, var(--sym-fg)); }
  @keyframes sym-site-header-dim { from { opacity: 0; } }

  /* phones and tablets: one compact line; the menu opens below it as a list over a dimmed page */
  @media (max-width: 820px) {
    .sym-site-header[data-variant='dropdown'], .sym-site-header[data-variant='dropdown'][data-scrolled], .sym-site-header[data-variant='dropdown'][data-open] {
      flex-wrap: wrap; align-items: center; gap: 10px 12px; min-height: 0; padding-block: 12px 8px; box-shadow: none; clip-path: none;
    }
    .sym-site-header[data-variant='dropdown']::before { content: ''; position: absolute; z-index: -1; inset: 0 -100vmax; background: inherit; transition: box-shadow .4s ease; }
    .sym-site-header[data-variant='dropdown'][data-scrolled]::before { box-shadow: 0 8px 18px -12px color-mix(in srgb, var(--sym-fg) 45%, transparent); }
    .sym-site-header__tools { margin-left: auto; gap: 8px; }
    /* the button is left of the logo; the negative margin keeps its 48 px target but aligns the bars with the page margin */
    .sym-site-header__burger { display: inline-grid; margin-inline: -13px -4px; }
    .sym-site-header .sym-site-header__burger { --_s: 48px; }
    .sym-site-header__trail { display: block; order: 4; flex: 1 0 100%; padding-top: 2px; }
    /* the list unfolds and folds back (height, then the items one after another), over the page instead of pushing it down */
    .sym-site-header[data-variant='dropdown'] .sym-site-header__nav {
      order: 3; flex: 1 0 100%; margin-left: 0; flex-direction: column; align-items: stretch; gap: 0; padding: 0; font-size: 1.2rem; max-height: 0; visibility: hidden;
      position: absolute; z-index: 1; top: 100%; left: 0; right: 0; background: inherit; overflow: visible; clip-path: inset(0 -100vmax);
      transition: max-height .45s cubic-bezier(.4, 0, .2, 1), padding .45s cubic-bezier(.4, 0, .2, 1), visibility 0s linear .45s;
    }
    .sym-site-header[data-variant='dropdown'] .sym-site-header__nav::before { content: ''; position: absolute; z-index: -1; inset: 0 -100vmax; background: inherit; }
    .sym-site-header[data-variant='dropdown'] .sym-site-header__nav[data-open] {
      max-height: min(460px, calc(100dvh - var(--header-h, 0px))); overflow-y: auto; padding: 4px 0 12px; visibility: visible; border-bottom: var(--sym-rule-width) solid var(--sym-fg);
      transition: max-height .55s cubic-bezier(.2, .9, .3, 1), padding .55s cubic-bezier(.2, .9, .3, 1), visibility 0s;
      /* the list scrolls inside a short screen, so ::before is clipped: the shadow carries the full-width background instead */
      box-shadow: 0 0 0 100vmax var(--sym-bg); overflow: hidden auto;
    }
    .sym-site-header__nav > a { opacity: 0; transform: translateY(-10px); transition: opacity .2s ease, transform .3s cubic-bezier(.4, 0, .2, 1); }
    .sym-site-header__nav[data-open] > a { opacity: 1; transform: none; transition: opacity .35s ease, transform .45s cubic-bezier(.2, .9, .3, 1); transition-delay: calc(var(--_i, 0) * .04s); }
    .sym-site-header__nav .sym-site-header__tab { padding: 12px 0; border-bottom: var(--sym-rule-width) solid color-mix(in srgb, var(--sym-fg) 14%, transparent); }
    .sym-site-header__nav .sym-site-header__ink { display: none; }
    .sym-site-header__nav .sym-site-header__tab[aria-current='page'] { color: var(--sym-accent); }
    .sym-site-header__nav .sym-site-header__support { align-self: flex-start; margin-top: 14px; padding: 9px 18px; font-size: 1rem; }
    .sym-site-header[data-variant='dropdown'][data-open]::after {
      content: ''; position: absolute; z-index: -2; top: 100%; left: -100vmax; right: -100vmax; height: 100vh; opacity: 1; box-shadow: none; pointer-events: auto;
      background: color-mix(in srgb, var(--sym-fg) 28%, transparent); animation: sym-site-header-dim .45s ease both; cursor: pointer;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sym-site-header[data-variant='dropdown'], .sym-site-header__nav, .sym-site-header__nav > a { transition: none !important; }
    .sym-site-header__ink, .sym-site-header__roll { transition: none; }
    .sym-site-header__ink::after, .sym-site-header__tab[data-pressed] { animation: none; }
  }

  @media (forced-colors: active) {
    .sym-site-header { border-bottom-color: CanvasText; }
    .sym-site-header__link[aria-current='page']::after { background: LinkText; }
  }
}
</style>
