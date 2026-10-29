<script setup lang="ts">
import { spiralPath } from '../utils/brand-spiral'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'hero'

/**
 * The logo's own spiral as a shape: used as crop, frame and background geometry (never as repeated wallpaper). The outline is taken from the
 * official logo, so it is the real mark, not an imitation. Decorative: always aria-hidden. Place it in the #decor slot of a SymSection (or inside
 * a positioned card) and push it past a corner with anchor + bleed so only part shows. It is pale (soft) by default so text may lie over it;
 * spin turns it very slowly (paused off screen and under reduced motion).
 */
const props = withDefaults(defineProps<{
  /** xs 56 px · sm 140 · md 260 · lg 420 · hero fluid 240 → 760 px. */
  size?: Size
  /** Static rotation in degrees (0 = as in the logo). */
  rotate?: number
  /** Where it sits inside the nearest positioned parent; omit to place it in the flow. */
  anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  /** Share of the size that sticks out past the anchored corner (0–0.6). */
  bleed?: number
  /** Colour: accent (the tone's accent, default) | fg | bg. */
  color?: 'accent' | 'fg' | 'bg'
  /** Very slow ambient rotation. */
  spin?: boolean
  /** Pale (30 %) version that stays behind text without hurting its contrast (default true). Set false only when nothing is written over the shape. */
  soft?: boolean
}>(), { size: 'lg', rotate: 0, bleed: 0.25, color: 'accent', soft: true })

const el = ref<HTMLElement | null>(null)
const inView = useInView(el)
</script>

<template>
  <span ref="el" class="sym-orbit" aria-hidden="true" :data-size="size" :data-anchor="anchor" :data-color="color" :data-soft="soft || undefined"
    :data-spin="spin && inView ? '' : undefined" :style="{ '--_rot': `${rotate}deg`, '--_bleed': bleed }">
    <svg class="sym-orbit__svg" viewBox="31.26 31.81 115.70 114.60" focusable="false"><path :d="spiralPath" transform="matrix(1.333333 0 0 -1.333333 145.1133 104.1613)" /></svg>
  </span>
</template>

<style>
@layer sym-components {
  .sym-orbit { --_d: 420px; --_base: var(--sym-accent); --_c: var(--_base); position: relative; display: block; width: var(--_d); aspect-ratio: 115.7 / 114.6; flex: none; pointer-events: none; color: var(--_c); }
  .sym-orbit[data-size='xs'] { --_d: 56px; } .sym-orbit[data-size='sm'] { --_d: 140px; } .sym-orbit[data-size='md'] { --_d: 260px; }
  .sym-orbit[data-size='hero'] { --_d: var(--sym-size-orbit-hero); }
  .sym-orbit[data-color='fg'] { --_base: var(--sym-fg); --_c: var(--sym-fg); } .sym-orbit[data-color='bg'] { --_base: var(--sym-bg); --_c: var(--sym-bg); }
  .sym-orbit[data-soft] { --_c: color-mix(in srgb, var(--_base) 30%, transparent); }
  .sym-orbit__svg { display: block; width: 100%; height: 100%; fill: currentColor; transform: rotate(var(--_rot)); }
  .sym-orbit[data-anchor] { position: absolute; --_out: calc(var(--_d) * var(--_bleed)); }
  .sym-orbit[data-anchor='top-right'] { top: calc(-1 * var(--_out)); right: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='top-left'] { top: calc(-1 * var(--_out)); left: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='bottom-right'] { bottom: calc(-1 * var(--_out)); right: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='bottom-left'] { bottom: calc(-1 * var(--_out)); left: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='center'] { top: 50%; left: 50%; translate: -50% -50%; }
  /* ambient rotation: only when motion is allowed; off screen it is removed by the data-spin switch */
  @media (prefers-reduced-motion: no-preference) {
    :root:not([data-motion='reduce']) .sym-orbit[data-spin] > .sym-orbit__svg { animation: sym-orbit-spin var(--sym-dur-ambient) linear infinite; }
  }
  :root[data-motion='full'] .sym-orbit[data-spin] > .sym-orbit__svg { animation: sym-orbit-spin var(--sym-dur-ambient) linear infinite; }
}
</style>
