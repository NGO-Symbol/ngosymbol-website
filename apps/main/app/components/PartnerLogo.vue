<script setup lang="ts">
// A partner logo on a transparent background. SVG logos are inlined so every letter or shape can move
// on its own, following the logo's rhythm (motion); PNG logos move as a whole. The motion plays when the
// tile scrolls into view and again on hover (PartnerTiles calls replay()).
const props = defineProps<{ src: string; name: string; slug: string; motion?: string }>()

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
  <span ref="root" class="partner-logo" :class="[`partner-logo--${motion ?? 'wave'}`, { 'is-playing': playing }]" role="img" :aria-label="name">
    <span v-if="isSvg && markup" class="partner-logo__svg" v-html="markup" />
    <img v-else :src="src" alt="" loading="lazy">
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

/* Mental health for Ukraine: the ring of dots blooms open, then the letters settle. */
.partner-logo.is-playing.partner-logo--bloom :deep(svg *:not(g):not(style):not(defs)) { animation: pl-bloom .9s cubic-bezier(.2, 1.3, .4, 1) both; animation-delay: calc(var(--n, 0) * 22ms); }
@keyframes pl-bloom { from { opacity: 0; transform: scale(.2); } }

/* Grynyov Art Collection: the stacked words are uncovered left to right, like a bar being drawn. */
.partner-logo.is-playing.partner-logo--wipe img { animation: pl-wipe 1s cubic-bezier(.7, 0, .2, 1) both; }
@keyframes pl-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

/* Mental health for Ukraine (raster fallback): a calm double heartbeat. */
.partner-logo.is-playing.partner-logo--beat img { animation: pl-beat 1.4s ease-in-out both; transform-origin: left center; }
@keyframes pl-beat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.08); } 28% { transform: scale(1); } 42% { transform: scale(1.05); } 70% { transform: scale(1); } }

/* Creative Europe: the EU ring of twelve stars turns once around the flag while the logo pops in. */
.partner-logo.is-playing.partner-logo--stars img { animation: pl-pop .7s cubic-bezier(.3, 1.6, .5, 1) both; }
.partner-logo--stars .partner-logo__fx { left: 4px; top: 50%; width: 52px; height: 52px; margin-top: -26px; border: 2px dotted #ffcc00; border-radius: 50%; }
.partner-logo.is-playing.partner-logo--stars .partner-logo__fx { animation: pl-ring 1.4s ease-out both; }
@keyframes pl-pop { from { opacity: 0; transform: scale(.85); } }
@keyframes pl-ring { 0% { opacity: 0; transform: rotate(0) scale(.5); } 30% { opacity: 1; } 100% { opacity: 0; transform: rotate(180deg) scale(1.25); } }

/* Playback theatre «Нема»: a stage curtain parts and the logo is revealed. */
.partner-logo--curtain .partner-logo__fx { inset: 0; background: linear-gradient(90deg, var(--symbol-violet) 50%, var(--symbol-plum) 50%); }
.partner-logo.is-playing.partner-logo--curtain .partner-logo__fx { animation: pl-curtain 1.1s cubic-bezier(.6, 0, .2, 1) both; }
@keyframes pl-curtain { 0% { opacity: 1; clip-path: inset(0 0 0 0); } 99% { opacity: 1; } 100% { opacity: 0; clip-path: inset(0 50% 0 50%); } }

@media (prefers-reduced-motion: reduce) { .partner-logo *, .partner-logo :deep(*) { animation: none !important; } }
</style>

<style>
/* Dark mode: logos are inverted (hue kept) so dark marks stay readable on the dark background.
   Unscoped: in a scoped block :global(...) would drop the rest of the selector and filter the whole page. */
:root[data-theme="dark"] .partner-logo img, :root[data-theme="dark"] .partner-logo__svg { filter: invert(.92) hue-rotate(180deg); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .partner-logo img, :root:not([data-theme="light"]) .partner-logo__svg { filter: invert(.92) hue-rotate(180deg); } }
</style>
