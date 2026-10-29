<script setup lang="ts">
// Calendar subscription, the way event sites offer it: one button, then the visitor's own calendar app.
// A subscription (webcal / "add by URL") keeps updating by itself; the plain .ics download is a one-time import.
const props = defineProps<{ en?: boolean }>()

const feed = 'https://symbol.ngo/events.ics'
const webcal = feed.replace(/^https:/, 'webcal:')
const name = computed(() => props.en ? 'NGO Symbol events' : 'Події ГО «Символ»')
const options = computed(() => [
  { label: 'Google Calendar', href: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcal)}` },
  { label: props.en ? 'Apple Calendar (iPhone, Mac)' : 'Apple Календар (iPhone, Mac)', href: webcal },
  { label: 'Outlook', href: `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(feed)}&name=${encodeURIComponent(name.value)}` },
  { label: props.en ? 'Download .ics (one-time import)' : 'Завантажити .ics (разовий імпорт)', href: '/events.ics' }
])

const open = ref(false)
const copied = ref(false)
const root = ref<HTMLElement>()
async function copy() {
  try { await navigator.clipboard.writeText(feed); copied.value = true; window.setTimeout(() => (copied.value = false), 2000) } catch {}
}
function onOutside(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onOutside))
onBeforeUnmount(() => document.removeEventListener('click', onOutside))
</script>

<template>
  <div ref="root" class="subscribe-menu" :class="{ 'is-open': open }" @keydown.esc="open = false">
    <button type="button" class="subscribe-menu__button" aria-haspopup="true" :aria-expanded="open" @click="open = !open">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4" /></svg>
      {{ en ? 'Subscribe to the calendar' : 'Підписатися на календар' }}
    </button>
    <Transition name="subscribe-menu">
      <div v-if="open" class="subscribe-menu__panel">
        <p>{{ en ? 'New events appear in your calendar by themselves.' : 'Нові події самі з’являтимуться у вашому календарі.' }}</p>
        <ul>
          <li v-for="(option, index) in options" :key="option.label" :style="{ '--i': index }">
            <a :href="option.href" :target="option.href.startsWith('https://') ? '_blank' : undefined" :rel="option.href.startsWith('https://') ? 'noreferrer' : undefined" @click="open = false">{{ option.label }}</a>
          </li>
          <li :style="{ '--i': options.length }">
            <button type="button" @click="copy">{{ copied ? (en ? 'Link copied ✓' : 'Посилання скопійовано ✓') : (en ? 'Copy the feed link' : 'Скопіювати посилання на календар') }}</button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.subscribe-menu { position: relative; }
.subscribe-menu__button { display: inline-flex; align-items: center; gap: 10px; padding: 9px 18px; border: 1px solid var(--symbol-plum); border-radius: 999px; background: transparent; color: var(--symbol-plum); font: inherit; cursor: pointer; transition: background .25s ease, color .25s ease; }
.subscribe-menu__button:hover, .is-open .subscribe-menu__button { background: var(--symbol-plum); color: var(--symbol-cream); }
.subscribe-menu__button svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; }
.subscribe-menu__panel { position: absolute; z-index: 20; top: calc(100% + 8px); left: 0; width: min(330px, 86vw); padding: 14px; background: var(--symbol-cream); color: var(--symbol-plum); border: 1px solid var(--symbol-plum); box-shadow: 8px 8px 0 var(--symbol-violet); }
.subscribe-menu__panel p { margin: 0 0 10px; font-size: .85rem; line-height: 1.45; opacity: .8; }
.subscribe-menu__panel ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.subscribe-menu__panel li { animation: subscribe-row .3s cubic-bezier(.2, 1, .3, 1) both; animation-delay: calc(var(--i) * 30ms); }
.subscribe-menu__panel a, .subscribe-menu__panel button { display: block; width: 100%; padding: 9px 10px; border: 0; border-radius: 4px; background: transparent; color: inherit; font: inherit; text-align: left; text-decoration: none; cursor: pointer; }
.subscribe-menu__panel a:hover, .subscribe-menu__panel button:hover { background: var(--symbol-lilac); }
.subscribe-menu-enter-active, .subscribe-menu-leave-active { transition: opacity .2s ease, transform .25s cubic-bezier(.2, 1.2, .3, 1); }
.subscribe-menu-enter-from, .subscribe-menu-leave-to { opacity: 0; transform: translateY(-6px); }
@keyframes subscribe-row { from { opacity: 0; transform: translateY(4px); } }
@media (prefers-reduced-motion: reduce) { .subscribe-menu__panel li { animation: none; } }
</style>
