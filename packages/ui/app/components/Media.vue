<script setup lang="ts">
type Ratio = '16:9' | '4:3' | '1:1' | '3:4' | '21:9' | 'auto'

/**
 * A picture with a fixed shape, an optional caption and credit. Always reserves its space (aspect ratio), so the page never jumps.
 * Without `src` it shows a tonal placeholder with an orbit and the alt text as a label: the honest «photo is not there yet» state.
 * `reveal` uncovers it from the top when it scrolls into view (a wipe; reduced motion: a plain fade).
 */
const props = withDefaults(defineProps<{
  /** Image address. Omit it to show the tonal placeholder. */
  src?: string
  /** What the picture shows. Required; an empty string is allowed only together with `decorative`. */
  alt: string
  /** The picture is only decoration: no text alternative is announced. */
  decorative?: boolean
  /** Shape of the frame: 16:9 | 4:3 | 1:1 | 3:4 | 21:9 | auto (natural shape of the image; give width and height). */
  ratio?: Ratio
  /** Caption under the picture. */
  caption?: string
  /** Author / source of the picture, shown after the caption. */
  credit?: string
  /** cover fills the frame and crops; contain shows the whole picture. */
  fit?: 'cover' | 'contain'
  /** lazy (default, below the fold) | eager (the first picture on the page). */
  loading?: 'lazy' | 'eager'
  /** Natural width in px (needed for `ratio="auto"` so the browser can reserve space). */
  width?: number
  /** Natural height in px (needed for `ratio="auto"`). */
  height?: number
  /** Uncover the picture from the top when it scrolls into view. */
  reveal?: boolean
  /** Tone of the placeholder: paper | white | lilac | violet | apricot | plum. Omitted: a light tint of the surrounding tone. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
}>(), { ratio: '4:3', fit: 'cover', loading: 'lazy' })

const Reveal = resolveComponent('SymReveal')
const frameTag = computed(() => (props.reveal ? Reveal : 'div'))
const frameAttrs = computed(() => (props.reveal ? { kind: 'wipe' } : {}))
const hasCaption = computed(() => !!(props.caption || props.credit))
const failed = ref(false)
const placeholder = computed(() => !props.src || failed.value)
</script>

<template>
  <figure class="sym-media" :data-ratio="ratio" :data-fit="fit">
    <component :is="frameTag" v-bind="frameAttrs" class="sym-media__frame" :data-tone="placeholder ? tone : undefined" :data-placeholder="placeholder || undefined"
      :role="placeholder && !decorative ? 'img' : undefined" :aria-label="placeholder && !decorative ? alt : undefined" :aria-hidden="placeholder && decorative ? 'true' : undefined">
      <img v-if="!placeholder" class="sym-media__img" :src="src" :alt="decorative ? '' : alt" :width="width" :height="height" :loading="loading" decoding="async" @error="failed = true">
      <template v-else>
        <SymOrbit class="sym-media__orbit" size="md" anchor="bottom-right" :bleed="0.32" />
        <span v-if="!decorative && alt" class="sym-media__alt sym-t-caption">{{ alt }}</span>
      </template>
    </component>
    <figcaption v-if="hasCaption" class="sym-media__caption sym-t-caption">
      <span v-if="caption" class="sym-media__text">{{ caption }}</span>
      <span v-if="credit" class="sym-media__credit sym-muted">{{ credit }}</span>
    </figcaption>
  </figure>
</template>

<style>
@layer sym-components {
  .sym-media { --_ratio: 4 / 3; container: sym-media / inline-size; width: 100%; min-width: 0; margin: 0; }
  .sym-media[data-ratio='16:9'] { --_ratio: 16 / 9; } .sym-media[data-ratio='1:1'] { --_ratio: 1 / 1; }
  .sym-media[data-ratio='3:4'] { --_ratio: 3 / 4; } .sym-media[data-ratio='21:9'] { --_ratio: 21 / 9; }
  .sym-media__frame { position: relative; display: block; overflow: clip; border-radius: var(--sym-shape-media); aspect-ratio: var(--_ratio); background: color-mix(in srgb, var(--sym-fg) 7%, var(--sym-bg)); }
  .sym-media[data-ratio='auto'] > .sym-media__frame:not([data-placeholder]) { aspect-ratio: auto; }
  .sym-media__img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .sym-media[data-ratio='auto'] .sym-media__img { height: auto; }
  .sym-media[data-fit='contain'] .sym-media__img { object-fit: contain; }
  /* the tone paints the placeholder itself (data-tone rule from the tones layer) */
  .sym-media__frame[data-tone] { color: var(--sym-fg); }
  /* orbit scales with the frame; the selector is doubled to beat the orbit's own size rule */
  .sym-media__frame .sym-media__orbit.sym-orbit { --_d: clamp(7rem, 62cqi, 22rem); }
  .sym-media__alt { position: absolute; inset-inline: var(--sym-space-s); top: var(--sym-space-s); max-width: 28ch; color: var(--sym-fg-muted); text-wrap: balance; }
  .sym-media__caption { display: flex; flex-direction: column; gap: var(--sym-space-3xs); padding-block-start: var(--sym-space-xs); }
  @container sym-media (min-width: 520px) { .sym-media__caption { flex-direction: row; justify-content: space-between; gap: var(--sym-space-m); } .sym-media__credit { text-align: end; } }
  @media (forced-colors: active) { .sym-media__frame[data-placeholder] { border: 1px solid CanvasText; } }
}
</style>
