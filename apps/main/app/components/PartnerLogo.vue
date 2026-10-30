<script setup lang="ts">
// A partner logo on a transparent background. SVG logos are inlined so every letter or shape can move
// on its own, following the logo's rhythm (motion); PNG logos move as a whole. The motion plays when the
// tile scrolls into view and again on hover (PartnerTiles calls replay()).
// srcDark: the organization's own variant for dark backgrounds (the EU emblem may not be recoloured, so it is never inverted).
// srcDark equal to src: a coloured badge on its own background, shown unchanged in both themes.
const props = defineProps<{ src: string; srcDark?: string; name: string; slug: string; motion?: string }>()

const isSvg = props.src.endsWith('.svg')
const markup = ref('')

// Class names (st0…) and ids repeat across Illustrator exports, so they are prefixed per logo before inlining.
function scope(svg: string) {
  const prefix = `p-${props.slug}-`
  return svg
    .replace(/<\?xml[^>]*>|<!--[\s\S]*?-->|<script[\s\S]*?<\/script>|<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g, '')
    .replace(/\s(width|height)="[^"]*"/, '')
    .replace(/\.(st\d+)/g, `.${prefix}$1`)
    .replace(/class="([^"]+)"/g, (_, names: string) => `class="${names.split(/\s+/).map(name => /^st\d+$/.test(name) ? prefix + name : name).join(' ')}"`)
    .replace(/id="([^"]+)"/g, `id="${prefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}$1"`)
}

const root = ref<HTMLElement>()

// Each logo starts its own motion when it scrolls into view (it does not depend on the page-wide reveal, which can
// miss tiles after client-side navigation) and replays it whenever the pointer enters its tile.
const playing = ref(false)
let observer: IntersectionObserver | undefined
function replay() {
  playing.value = false
  requestAnimationFrame(() => requestAnimationFrame(() => { playing.value = true }))
}
onMounted(() => {
  const tile = root.value?.closest('.partner') ?? root.value
  tile?.addEventListener('mouseenter', replay)
  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) { playing.value = true; observer?.disconnect() }
  }, { rootMargin: '0px 0px -5% 0px' })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  root.value?.closest('.partner')?.removeEventListener('mouseenter', replay)
})

onMounted(async () => {
  if (!isSvg) return
  try {
    markup.value = scope(await $fetch<string>(props.src, { responseType: 'text' }))
    await nextTick()
    // Number the drawn shapes so CSS can stagger them (capped so long logos stay quick).
    const shapes = root.value?.querySelectorAll<SVGElement>('path, rect, polygon, circle, ellipse, line, polyline') ?? []
    shapes.forEach((shape, index) => shape.style.setProperty('--n', String(Math.min(index, 36))))
  }
  catch {
    markup.value = ''
  }
})
</script>

<template>
  <span ref="root" class="partner-logo" :class="[`partner-logo--${motion ?? 'wave'}`, { 'is-playing': playing, 'partner-logo--official': srcDark && srcDark !== src, 'partner-logo--keep': srcDark === src, 'partner-logo--opaque': src.endsWith('.jpg') }]" role="img" :aria-label="name">
    <span v-if="isSvg && markup" class="partner-logo__svg" v-html="markup" />
    <img v-else :src="src" alt="" loading="lazy" class="partner-logo__light">
    <img v-if="srcDark && srcDark !== src" :src="srcDark" alt="" loading="lazy" class="partner-logo__dark">
    <span class="partner-logo__fx" aria-hidden="true" />
  </span>
</template>

<style scoped>
.partner-logo { position: relative; height: 84px; display: flex; align-items: center; justify-content: flex-start; }
.partner-logo img, .partner-logo__svg :deep(svg) { display: block; max-width: 100%; max-height: 72px; width: auto; height: 72px; object-fit: contain; object-position: left center; overflow: visible; }
.partner-logo__svg { display: block; height: 72px; }
.partner-logo__svg :deep(svg) { max-width: 220px; }
/* Only drawn shapes get a local origin: on <g> it would shift the group's own transform attribute (Inkscape logos). */
.partner-logo__svg :deep(:is(path, rect, polygon, circle, ellipse, line, polyline, text)) { transform-box: fill-box; transform-origin: center; }
.partner-logo__fx { position: absolute; pointer-events: none; opacity: 0; }

/* Shapes of an inline SVG get a delay from their order: the rhythm of the logo itself. */
.partner-logo__svg :deep(svg *) { animation-delay: calc(var(--n, 0) * 35ms); }

/* ЄрміловЦентр: two red blocks frame the name; the blocks slide in, the letters light up one by one like a hall. */
.partner-logo.is-playing.partner-logo--blink :deep(rect) { animation: pl-slide .6s cubic-bezier(.2, 1, .3, 1) both; }
.partner-logo.is-playing.partner-logo--blink :deep(path), .partner-logo.is-playing.partner-logo--blink :deep(polygon) { animation: pl-blink .7s steps(1) both; animation-delay: calc(.3s + var(--n, 0) * 30ms); }
@keyframes pl-slide { from { transform: scaleX(0); } }
@keyframes pl-blink { 0% { opacity: 0; } 30% { opacity: 1; } 45% { opacity: .25; } 60%, 100% { opacity: 1; } }

/* Karazin University: a heraldic emblem and a long title; shapes rise in order like a seal being pressed. */
.partner-logo.is-playing.partner-logo--unfold :deep(svg *:not(g):not(style):not(defs)) { animation: pl-rise .7s cubic-bezier(.2, 1.2, .3, 1) both; animation-delay: calc(var(--n, 0) * 18ms); }
@keyframes pl-rise { from { opacity: 0; transform: translateY(6px) scale(.85); } }

/* ZMINA, «change»: every letter swaps in from the left with a skew, one beat after another. */
.partner-logo.is-playing.partner-logo--shift :deep(svg *:not(g):not(style):not(defs)) { animation: pl-shift .7s cubic-bezier(.2, 1.4, .4, 1) both; animation-delay: calc(var(--n, 0) * 70ms); }
@keyframes pl-shift { 0% { opacity: 0; transform: translateX(-14px) skewX(-18deg); } 70% { opacity: 1; transform: translateX(2px) skewX(4deg); } }

/* European Cultural Foundation: the top bar draws across, then the three stacked words drop in like lines of type. */
.partner-logo.is-playing.partner-logo--wave :deep(svg *:not(g):not(style):not(defs)) { animation: pl-drop .55s cubic-bezier(.2, 1.3, .4, 1) both; animation-delay: calc(var(--n, 0) * 90ms); }
.partner-logo.is-playing.partner-logo--wave :deep(path:first-child), .partner-logo.is-playing.partner-logo--wave :deep(rect:first-of-type) { transform-origin: left center; }
@keyframes pl-drop { from { opacity: 0; transform: translateY(-8px); } }

/* Mental health for Ukraine: the logo blooms out of the centre of its dot ring — one smooth reveal of the whole
   mark (the file has 441 separate dots, so moving them one by one stutters). */
.partner-logo.is-playing.partner-logo--bloom .partner-logo__svg { animation: pl-bloom-reveal 1.2s cubic-bezier(.2, .7, .2, 1) both; }
@keyframes pl-bloom-reveal {
  from { clip-path: circle(0% at 24% 50%); opacity: .3; transform: scale(.97) rotate(-4deg); transform-origin: 24% 50%; }
  to { clip-path: circle(150% at 24% 50%); opacity: 1; transform: none; transform-origin: 24% 50%; }
}

/* Grynyov Art Collection: the stacked words are uncovered left to right, like a bar being drawn. */
.partner-logo.is-playing.partner-logo--wipe img { animation: pl-wipe 1s cubic-bezier(.7, 0, .2, 1) both; }
@keyframes pl-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

/* Плейбек-театр «Серденьки»: three hearts — a calm double heartbeat. */
.partner-logo.is-playing.partner-logo--beat img { animation: pl-beat 1.4s ease-in-out both; transform-origin: left center; }
@keyframes pl-beat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.08); } 28% { transform: scale(1); } 42% { transform: scale(1.05); } 70% { transform: scale(1); } }

/* Creative Europe: the EU ring of twelve stars turns once around the flag while the logo pops in. */
.partner-logo.is-playing.partner-logo--stars img { animation: pl-pop .7s cubic-bezier(.3, 1.6, .5, 1) both; }
.partner-logo--stars .partner-logo__fx { left: 4px; top: 50%; width: 52px; height: 52px; margin-top: -26px; border: 2px dotted #ffcc00; border-radius: 50%; }
.partner-logo.is-playing.partner-logo--stars .partner-logo__fx { animation: pl-ring 1.4s ease-out both; }
@keyframes pl-pop { from { opacity: 0; transform: scale(.85); } }
@keyframes pl-ring { 0% { opacity: 0; transform: rotate(0) scale(.5); } 30% { opacity: 1; } 100% { opacity: 0; transform: rotate(180deg) scale(1.25); } }

/* Each logo below moves as one piece, in the spirit of its own identity (raster files and SVGs alike). */
.partner-logo.is-playing :is(img, .partner-logo__svg) { transform-origin: left center; }
/* A plain rise for a logo without a motif of its own yet. */
.partner-logo.is-playing.partner-logo--rise :is(img, .partner-logo__svg) { animation: pl-rise-whole .8s cubic-bezier(.2, .9, .3, 1) both; }
@keyframes pl-rise-whole { from { opacity: 0; transform: translateY(14px); } }
/* Culture Helps Solidarity: two languages, two sides — the mark turns over like a page. */
.partner-logo.is-playing.partner-logo--flip :is(img, .partner-logo__svg) { animation: pl-flip .9s cubic-bezier(.3, 1.3, .5, 1) both; }
@keyframes pl-flip { from { opacity: 0; transform: perspective(500px) rotateY(80deg); } }
/* EU emblem: only a soft fade — its look may not be altered in any way. */
.partner-logo.is-playing.partner-logo--fade :is(img, .partner-logo__svg) { animation: pl-fade-whole .9s ease both; }
@keyframes pl-fade-whole { from { opacity: 0; } }
/* Інша Освіта: the four-pointed star turns like a compass needle finding north. */
.partner-logo.is-playing.partner-logo--spin :is(img, .partner-logo__svg) { animation: pl-spin 1s cubic-bezier(.2, 1.2, .4, 1) both; transform-origin: 12% 50%; }
@keyframes pl-spin { from { opacity: 0; transform: rotate(-90deg) scale(.8); } }
/* zusa: the brush circle — the logo opens in a round stroke. */
.partner-logo.is-playing.partner-logo--brush :is(img, .partner-logo__svg) { animation: pl-brush 1s cubic-bezier(.4, 0, .2, 1) both; }
@keyframes pl-brush { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(75% at 50% 50%); } }
/* VETERANKA: heavy blackletter, pressed down like a stamp. */
.partner-logo.is-playing.partner-logo--stamp :is(img, .partner-logo__svg) { animation: pl-stamp .7s cubic-bezier(.5, 0, .3, 1.6) both; }
@keyframes pl-stamp { 0% { opacity: 0; transform: scale(1.35); } 60% { opacity: 1; transform: scale(.97); } }
/* «Сенс» bookshop: rises from below like a book being pulled from the shelf. */
.partner-logo.is-playing.partner-logo--unveil :is(img, .partner-logo__svg) { animation: pl-unveil .8s cubic-bezier(.6, 0, .2, 1) both; }
@keyframes pl-unveil { from { clip-path: inset(100% 0 0 0); transform: translateY(8px); } to { clip-path: inset(0 0 0 0); } }
/* Bila Tserkva library: a bow with arrows — the mark flies in like an arrow. */
.partner-logo.is-playing.partner-logo--shoot :is(img, .partner-logo__svg) { animation: pl-shoot .7s cubic-bezier(.2, 1.3, .4, 1) both; }
@keyframes pl-shoot { from { opacity: 0; transform: translateX(-40px) skewX(-12deg); } }
/* Artéria: an artery — a pulse runs through the name. */
.partner-logo.is-playing.partner-logo--pulse :is(img, .partner-logo__svg) { animation: pl-pulse 1.3s ease-out both; }
@keyframes pl-pulse { 0% { opacity: 0; transform: scaleX(.92); } 25% { opacity: 1; transform: scaleX(1.03); } 45% { transform: scaleX(1); } 60% { transform: scaleX(1.02); } }
/* Union Forum: the flag-like mark flutters once. */
.partner-logo.is-playing.partner-logo--flag :is(img, .partner-logo__svg) { animation: pl-flag 1.1s ease-out both; }
@keyframes pl-flag { 0% { opacity: 0; transform: skewY(6deg); } 30% { opacity: 1; transform: skewY(-4deg); } 60% { transform: skewY(2deg); } }
/* Egyesek: the round «e» — the logo rolls in along its circle. */
.partner-logo.is-playing.partner-logo--orbit :is(img, .partner-logo__svg) { animation: pl-orbit .9s cubic-bezier(.2, 1, .3, 1) both; transform-origin: 30% 50%; }
@keyframes pl-orbit { from { opacity: 0; transform: rotate(-120deg) scale(.6); } }
/* Gwara Media: a newsroom — the name is typed out letter by letter. */
.partner-logo.is-playing.partner-logo--type :is(img, .partner-logo__svg) { animation: pl-type .9s steps(8, end) both; }
@keyframes pl-type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
/* Media Development Foundation: media coming into focus. */
.partner-logo.is-playing.partner-logo--focus :is(img, .partner-logo__svg) { animation: pl-focus 1s ease-out both; }
@keyframes pl-focus { from { opacity: 0; filter: blur(8px); } }
/* MOKSOP, the photography museum: a camera shutter opens. */
.partner-logo.is-playing.partner-logo--shutter :is(img, .partner-logo__svg) { animation: pl-shutter .6s cubic-bezier(.7, 0, .2, 1) both; }
@keyframes pl-shutter { from { clip-path: inset(50% 0 50% 0); } to { clip-path: inset(0 0 0 0); } }

/* Мінкульт: the tryzub rises first, upright and steady, then the two lines of the name are set letter by letter. */
.partner-logo.is-playing.partner-logo--trident :deep(path:last-of-type) { animation: pl-trident .8s cubic-bezier(.2, 1.1, .3, 1) both; transform-origin: center bottom; }
.partner-logo.is-playing.partner-logo--trident :deep(path:not(:last-of-type)) { animation: pl-letter .45s ease-out both; animation-delay: calc(.35s + var(--n, 0) * 22ms); }
@keyframes pl-trident { 0% { opacity: 0; transform: translateY(40%) scaleY(.6); } 60% { opacity: 1; transform: translateY(-4%) scaleY(1.04); } }
@keyframes pl-letter { from { opacity: 0; transform: translateX(-3px); } }

/* «Тисячовесна»: the bird flies in on an arc, beating its wings, and the word blooms after it letter by letter. */
.partner-logo.is-playing.partner-logo--fly :deep(path[fill^="url(#"]) { animation: pl-fly 1.1s cubic-bezier(.3, .8, .3, 1) both; transform-origin: 30% 60%; }
.partner-logo.is-playing.partner-logo--fly :deep(path[fill="#282828"]) { animation: pl-bloom-letter .5s cubic-bezier(.2, 1.3, .4, 1) both; animation-delay: calc(.4s + var(--n, 0) * 45ms); transform-origin: center bottom; }
@keyframes pl-fly {
  0% { opacity: 0; transform: translate(-40%, 30%) rotate(-18deg) scaleY(1); }
  25% { opacity: 1; transform: translate(-22%, 8%) rotate(-8deg) scaleY(.55); }
  45% { transform: translate(-10%, -4%) rotate(-2deg) scaleY(1.05); }
  65% { transform: translate(-3%, 0) rotate(0) scaleY(.75); }
  100% { transform: none; }
}
@keyframes pl-bloom-letter { from { opacity: 0; transform: translateY(30%) scale(.6); } }

/* «Станція Уж», named after the river Uzh: the mark is uncovered left to right while it ripples like water. */
.partner-logo.is-playing.partner-logo--river img { animation: pl-river 1.2s cubic-bezier(.4, 0, .2, 1) both; transform-origin: left bottom; }
@keyframes pl-river {
  0% { clip-path: inset(0 100% 0 0); transform: translateY(0) skewY(0); }
  25% { transform: translateY(-3px) skewY(-2deg); }
  50% { transform: translateY(2px) skewY(1.5deg); }
  75% { clip-path: inset(0 0 0 0); transform: translateY(-1px) skewY(-.5deg); }
  100% { clip-path: inset(0 0 0 0); transform: none; }
}

/* Центр захисту інформаційного простору: a message badge with an «i» — it pops up like a notification and nudges. */
.partner-logo.is-playing.partner-logo--notify img { animation: pl-notify .9s cubic-bezier(.3, 1.5, .5, 1) both; transform-origin: 20% 90%; }
@keyframes pl-notify { 0% { opacity: 0; transform: scale(.3); } 45% { opacity: 1; transform: scale(1.08); } 60% { transform: scale(1) rotate(-6deg); } 75% { transform: rotate(4deg); } 88% { transform: rotate(-2deg); } 100% { transform: none; } }

/* Playback theatre «Нема»: a stage curtain parts and the logo is revealed. */
.partner-logo--curtain .partner-logo__fx { inset: 0; background: linear-gradient(90deg, var(--symbol-violet) 50%, var(--symbol-plum) 50%); }
.partner-logo.is-playing.partner-logo--curtain .partner-logo__fx { animation: pl-curtain 1.1s cubic-bezier(.6, 0, .2, 1) both; }
@keyframes pl-curtain { 0% { opacity: 1; clip-path: inset(0 0 0 0); } 99% { opacity: 1; } 100% { opacity: 0; clip-path: inset(0 50% 0 50%); } }

@media (prefers-reduced-motion: reduce) { .partner-logo *, .partner-logo :deep(*) { animation: none !important; } }
</style>

<style>
/* Dark mode: logos are inverted (hue kept) so dark marks stay readable on the dark background.
   Logos with an official dark variant (the EU emblem) switch to it instead and are never filtered.
   JPG logos have a white field: it melts into the page (multiply on light, screen once inverted on dark).
   Unscoped: in a scoped block :global(...) would drop the rest of the selector and filter the whole page. */
/* Doubled class: outranks the scoped `.partner-logo img { display: block }`, which otherwise showed both variants side by side. */
.partner-logo.partner-logo img.partner-logo__dark { display: none; }
.partner-logo--opaque img { mix-blend-mode: multiply; }
:root[data-theme="dark"] .partner-logo:not(.partner-logo--official, .partner-logo--keep) img, :root[data-theme="dark"] .partner-logo__svg { filter: invert(.92) hue-rotate(180deg); }
:root[data-theme="dark"] .partner-logo--opaque img { mix-blend-mode: screen; filter: invert(1); }
:root[data-theme="dark"] .partner-logo--official .partner-logo__light { display: none; }
:root[data-theme="dark"] .partner-logo--official .partner-logo__dark { display: block; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .partner-logo:not(.partner-logo--official, .partner-logo--keep) img, :root:not([data-theme="light"]) .partner-logo__svg { filter: invert(.92) hue-rotate(180deg); }
  :root:not([data-theme="light"]) .partner-logo--opaque img { mix-blend-mode: screen; filter: invert(1); }
  :root:not([data-theme="light"]) .partner-logo--official .partner-logo__light { display: none; }
  :root:not([data-theme="light"]) .partner-logo--official .partner-logo__dark { display: block; }
}
</style>
