<script setup lang="ts">
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'hero'

/**
 * The spiral as geometry: an open ring with a diamond, used as crop, frame and background shape (never as repeated wallpaper).
 * Decorative: always aria-hidden. Place it inside a SymSection/SymCard with `clip`/overflow hidden; `anchor` + `bleed` push it
 * out past a corner so only part of the ring shows. Colour follows the tone's accent. `spin` rotates it very slowly (paused off
 * screen and under reduced motion).
 */
const props = withDefaults(defineProps<{
  /** xs 56 px · sm 140 · md 260 · lg 420 · hero fluid 360 → 760 px. */
  size?: Size
  /** Ring thickness: thin | regular | heavy (share of the diameter). */
  weight?: 'thin' | 'regular' | 'heavy'
  /** Static rotation in degrees (the ring opens at the right before rotation). */
  rotate?: number
  /** Where it sits inside the nearest positioned parent; omit to place it in the flow. */
  anchor?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  /** Share of the diameter that sticks out past the anchored corner (0–0.6). */
  bleed?: number
  /** Colour: accent (the tone's accent, default) | fg | bg. */
  color?: 'accent' | 'fg' | 'bg'
  /** Very slow ambient rotation. */
  spin?: boolean
  /** Show the diamond that ends the spiral (default true). */
  diamond?: boolean
  /** Pale (30 %) version that stays behind text without hurting its contrast (default true). Set false only when nothing is written over the shape. */
  soft?: boolean
}>(), { size: 'lg', weight: 'regular', rotate: -28, bleed: 0.25, color: 'accent', diamond: true, soft: true })

const el = ref<HTMLElement | null>(null)
const inView = useInView(el)
</script>

<template>
  <span ref="el" class="sym-orbit" aria-hidden="true" :data-size="size" :data-weight="weight" :data-anchor="anchor" :data-color="color"
    :data-soft="soft || undefined" :data-spin="spin && inView ? '' : undefined" :style="{ '--_rot': `${rotate}deg`, '--_bleed': bleed }">
    <span class="sym-orbit__ring"><span v-if="diamond" class="sym-orbit__diamond" /></span>
  </span>
</template>

<style>
@layer sym-components {
  .sym-orbit { --_d: 420px; --_w: .2; --_base: var(--sym-accent); --_c: var(--_base); position: relative; display: block; width: var(--_d); height: var(--_d); flex: none; pointer-events: none; color: var(--_c); }
  .sym-orbit[data-size='xs'] { --_d: 56px; } .sym-orbit[data-size='sm'] { --_d: 140px; } .sym-orbit[data-size='md'] { --_d: 260px; }
  .sym-orbit[data-size='hero'] { --_d: var(--sym-size-orbit-hero); }
  .sym-orbit[data-weight='thin'] { --_w: .1; } .sym-orbit[data-weight='heavy'] { --_w: .28; }
  .sym-orbit[data-color='fg'] { --_base: var(--sym-fg); --_c: var(--sym-fg); } .sym-orbit[data-color='bg'] { --_base: var(--sym-bg); --_c: var(--sym-bg); }
  .sym-orbit[data-soft] { --_c: color-mix(in srgb, var(--_base) 30%, transparent); }
  .sym-orbit__ring { position: absolute; inset: 0; border: calc(var(--_d) * var(--_w)) solid currentColor; border-right-color: transparent; border-radius: 50%; transform: rotate(var(--_rot)); }
  .sym-orbit__diamond { position: absolute; width: 28%; aspect-ratio: 1; background: currentColor; right: -1%; top: 42%; transform: rotate(45deg); }
  .sym-orbit[data-anchor] { position: absolute; --_out: calc(var(--_d) * var(--_bleed)); }
  .sym-orbit[data-anchor='top-right'] { top: calc(-1 * var(--_out)); right: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='top-left'] { top: calc(-1 * var(--_out)); left: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='bottom-right'] { bottom: calc(-1 * var(--_out)); right: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='bottom-left'] { bottom: calc(-1 * var(--_out)); left: calc(-1 * var(--_out)); }
  .sym-orbit[data-anchor='center'] { top: 50%; left: 50%; translate: -50% -50%; }
  /* ambient rotation: only when motion is allowed; off screen it is removed by the data-spin switch */
  @media (prefers-reduced-motion: no-preference) {
    :root:not([data-motion='reduce']) .sym-orbit[data-spin] > .sym-orbit__ring { animation: sym-orbit-spin var(--sym-dur-ambient) linear infinite; }
  }
  :root[data-motion='full'] .sym-orbit[data-spin] > .sym-orbit__ring { animation: sym-orbit-spin var(--sym-dur-ambient) linear infinite; }
}
</style>
