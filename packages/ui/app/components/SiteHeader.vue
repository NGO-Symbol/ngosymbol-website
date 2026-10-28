<script setup lang="ts">
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
 * only after the page scrolls. From 840 px wide the navigation is inline; below, a menu button opens a full-screen drawer (links stacked
 * in the headline size, focus trapped, Esc or a link tap closes it, the page behind does not scroll). The switch between the two layouts is
 * pure CSS, so server and client markup are identical. Put it first in the app (after SymSkipLink), outside the page transition.
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
}>(), { label: 'Основна навігація', scrolled: undefined })
defineSlots<{ /** The logo; default is SymWordmark linking to "/". */ logo?: () => any }>()

const NuxtLink = resolveComponent('NuxtLink')
const route = useRoute()
const open = ref(false)
const panelId = useId()
const headerEl = ref<HTMLElement | null>(null)
const toggleEl = ref<{ $el: HTMLElement } | null>(null)
const pageScrolled = useScrolled()
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
const DESKTOP = '(min-width: 840px)' // keep in sync with the @media rules below
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
onMounted(() => { mq = window.matchMedia(DESKTOP); mq.addEventListener('change', onMq) })
onBeforeUnmount(() => {
  mq?.removeEventListener('change', onMq)
  if (!import.meta.client) return
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('focusin', onFocusIn)
  document.documentElement.removeAttribute('data-sym-lock')
})
</script>

<template>
  <header ref="headerEl" class="sym-site-header" :data-tone="tone" :data-scrolled="isScrolled || undefined" :data-open="open || undefined">
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
  html[data-sym-lock] { overflow: hidden; } /* scroll lock, drawer open */

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
    font-family: var(--sym-font-text); font-size: var(--sym-text-label); font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
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
      font-family: var(--sym-font-text); font-size: var(--sym-text-body-sm); font-weight: 600; line-height: 1.2; letter-spacing: .01em; white-space: nowrap;
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

  @media (forced-colors: active) {
    .sym-site-header { border-bottom-color: CanvasText; }
    .sym-site-header__link[aria-current='page']::after { background: LinkText; }
  }
}
</style>
