<script setup lang="ts">
// Site search: a header button (also «/» or Ctrl/⌘+K) opens a panel that searches projects, events,
// people, news and opportunities on the client. Everything is in the bundle, so it works on the static site.
const props = defineProps<{ en?: boolean }>()

interface Hit { kind: string; title: string; meta: string; to: string; text: string }

const kinds = computed(() => props.en
  ? { project: 'Project', event: 'Event', person: 'Person', news: 'News', opportunity: 'Opportunity' }
  : { project: 'Проєкт', event: 'Подія', person: 'Людина', news: 'Новина', opportunity: 'Можливість' })

const index = computed<Hit[]>(() => [
  ...projects.map(project => ({ kind: kinds.value.project, title: project.title, meta: projectByline(project), to: `/projects/${project.slug}`, text: [project.summary, ...(project.body ?? [])].join(' ') })),
  ...eventItems.filter(item => !item.isProject).map(item => ({ kind: kinds.value.event, title: item.title, meta: `${formatDate(item.start)} · ${item.project.title}`, to: item.to, text: item.venue.name ?? '' })),
  ...people.filter(person => person.hasPage !== false).map(person => ({ kind: kinds.value.person, title: person.name, meta: person.teamRole ?? person.shortBio ?? '', to: `/people/${person.slug}`, text: (person.bio ?? []).join(' ') })),
  ...news.map(item => ({ kind: kinds.value.news, title: item.title, meta: formatDate(item.date), to: '/news', text: item.body.join(' ') })),
  ...opportunities.map(item => ({ kind: kinds.value.opportunity, title: item.title, meta: formatDate(item.deadline), to: '/opportunities', text: item.description.join(' ') }))
])

// Case- and apostrophe-insensitive; references like [[person:slug|Name]] are reduced to their label.
const normalize = (text: string) => text.toLowerCase().replace(/\[\[[a-z]+:[a-z0-9-]+\|?([^\]]*)\]\]/g, '$1').replace(/\*\*/g, '').replace(/[’'ʼ`]/g, '').replace(/ё/g, 'е')

const open = ref(false)
const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement>()

const results = computed(() => {
  const words = normalize(query.value).split(/\s+/).filter(Boolean)
  if (!words.length) return []
  return index.value
    .map((hit) => {
      const title = normalize(hit.title)
      const haystack = `${title} ${normalize(hit.meta)} ${normalize(hit.text)}`
      if (!words.every(word => haystack.includes(word))) return undefined
      return { hit, score: words.reduce((sum, word) => sum + (title.startsWith(word) ? 3 : title.includes(word) ? 2 : 0), 0) }
    })
    .filter((item): item is { hit: Hit; score: number } => Boolean(item))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(item => item.hit)
})
watch(query, () => { active.value = 0 })

function show() {
  open.value = true
  nextTick(() => input.value?.focus())
}
function hide() {
  open.value = false
  query.value = ''
}
const router = useRouter()
function go(hit?: Hit) {
  if (!hit) return
  hide()
  router.push(hit.to)
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') { active.value = Math.min(active.value + 1, results.value.length - 1); event.preventDefault() }
  if (event.key === 'ArrowUp') { active.value = Math.max(active.value - 1, 0); event.preventDefault() }
  if (event.key === 'Enter') go(results.value[active.value])
  if (event.key === 'Escape') hide()
}
function onGlobalKey(event: KeyboardEvent) {
  const typing = (event.target as HTMLElement)?.closest?.('input, textarea, [contenteditable]')
  if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
    event.preventDefault()
    show()
  }
}
onMounted(() => window.addEventListener('keydown', onGlobalKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <button type="button" class="search-toggle" :aria-label="en ? 'Search the site' : 'Пошук по сайту'" :aria-expanded="open" @click="show">
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
  </button>
  <Teleport to="body">
    <Transition name="site-search">
      <div v-if="open" class="site-search" role="dialog" aria-modal="true" :aria-label="en ? 'Search' : 'Пошук'" @click.self="hide">
        <div class="site-search__panel">
          <div class="site-search__field">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
            <input ref="input" v-model="query" type="search" :placeholder="en ? 'Projects, events, people…' : 'Проєкти, події, люди…'" :aria-label="en ? 'Search query' : 'Пошуковий запит'" autocomplete="off" @keydown="onKey">
            <button type="button" class="site-search__close" :aria-label="en ? 'Close' : 'Закрити'" @click="hide">Esc</button>
          </div>
          <ul v-if="results.length" class="site-search__results">
            <li v-for="(hit, i) in results" :key="hit.kind + hit.to + hit.title" :style="{ '--i': i }">
              <NuxtLink :to="hit.to" :class="{ 'is-active': i === active }" @click="hide" @mouseenter="active = i">
                <span class="site-search__kind">{{ hit.kind }}</span>
                <strong>{{ hit.title }}</strong>
                <span class="site-search__meta">{{ hit.meta }}</span>
              </NuxtLink>
            </li>
          </ul>
          <p v-else-if="query.trim()" class="site-search__empty">{{ en ? 'Nothing found. Try another word.' : 'Нічого не знайшли. Спробуйте інше слово.' }}</p>
          <p v-else class="site-search__hint">{{ en ? 'Tip: press / anywhere to search.' : 'Порада: натисніть / на будь-якій сторінці, щоб шукати.' }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-toggle { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--symbol-plum); border-radius: 50%; background: transparent; color: var(--symbol-plum); cursor: pointer; transition: background .25s ease, color .25s ease; }
.search-toggle:hover { background: var(--symbol-plum); color: var(--symbol-cream); }
.search-toggle:hover svg { animation: search-wiggle .6s ease; }
svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
@keyframes search-wiggle { 30% { transform: rotate(-18deg) scale(1.1); } 60% { transform: rotate(10deg); } }

.site-search { position: fixed; inset: 0; z-index: 90; display: grid; justify-items: center; align-items: start; padding: 12vh 16px 16px; background: color-mix(in srgb, var(--symbol-plum) 45%, transparent); backdrop-filter: blur(6px); }
.site-search__panel { width: min(680px, 100%); max-height: 76vh; display: grid; grid-template-rows: auto 1fr; background: var(--symbol-cream); color: var(--symbol-plum); border: 1px solid var(--symbol-plum); box-shadow: 10px 10px 0 var(--symbol-violet); overflow: hidden; }
.site-search__field { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--symbol-plum); }
.site-search__field input { flex: 1; min-width: 0; border: 0; background: transparent; color: inherit; font: inherit; font-family: var(--font-display); font-size: 1.5rem; outline: none; }
.site-search__close { border: 1px solid currentColor; border-radius: 6px; background: transparent; color: inherit; font: inherit; font-size: .72rem; padding: 3px 7px; cursor: pointer; }
.site-search__results { list-style: none; margin: 0; padding: 6px; overflow-y: auto; }
.site-search__results li { animation: search-row .35s cubic-bezier(.2, 1, .3, 1) both; animation-delay: calc(var(--i) * 30ms); }
.site-search__results a { display: grid; grid-template-columns: 96px 1fr; gap: 2px 14px; padding: 10px 12px; text-decoration: none; border-radius: 4px; transition: background .2s ease; }
.site-search__results a.is-active { background: var(--symbol-lilac); }
.site-search__results strong { font-family: var(--font-display); font-weight: 400; font-size: 1.2rem; line-height: 1.2; }
.site-search__kind { grid-row: span 2; font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: var(--symbol-violet); padding-top: 5px; }
.site-search__meta { font-size: .82rem; opacity: .75; }
.site-search__empty, .site-search__hint { margin: 0; padding: 18px; font-size: .9rem; opacity: .75; }
@keyframes search-row { from { opacity: 0; transform: translateY(8px); } }

.site-search-enter-active, .site-search-leave-active { transition: opacity .25s ease; }
.site-search-enter-active .site-search__panel, .site-search-leave-active .site-search__panel { transition: transform .35s cubic-bezier(.2, 1.2, .3, 1); }
.site-search-enter-from, .site-search-leave-to { opacity: 0; }
.site-search-enter-from .site-search__panel { transform: translateY(-16px) scale(.97); }
.site-search-leave-to .site-search__panel { transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) { .site-search__results li, .search-toggle:hover svg { animation: none; } }
@media (max-width: 560px) { .site-search__results a { grid-template-columns: 1fr; } .site-search__kind { grid-row: auto; padding: 0; } }
</style>
