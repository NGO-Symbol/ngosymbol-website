<script setup lang="ts">
type Status = 'launching' | 'ongoing' | 'completed'

/**
 * A project in a list: period and status on top, a tonal picture area with an orbit, then direction, serif title and summary.
 * The whole card is one link. Hover lifts it 5 px and nudges the orbit. An autonomous project (own website) says «Окремий сайт ↗».
 * Data-agnostic: pass the fields, not the site's project object. Status is always written out; the dot shape is only a hint.
 */
const props = withDefaults(defineProps<{
  /** Project name. */
  title: string
  /** One or two sentences under the title. */
  summary?: string
  /** Period as text, e.g. «2025 — триває». */
  period?: string
  /** launching (запускається) | ongoing (триває) | completed (завершено). */
  status?: Status
  /** Overrides the default status wording. */
  statusLabel?: string
  /** Direction / theme shown above the title. */
  direction?: string
  /** Router link target. */
  to?: string
  /** Plain link. */
  href?: string
  /** The project has its own website: shows «Окремий сайт ↗». */
  external?: boolean
  /** Card tone: white | paper | lilac | violet | apricot | plum. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Show the orbit in the picture area (default true). */
  orbit?: boolean
  /** Outline level of the title (2–4). */
  level?: 2 | 3 | 4
}>(), { tone: 'white', orbit: true, level: 3 })

const NuxtLink = resolveComponent('NuxtLink')
const offSite = computed(() => isOffSite(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'article'))
const attrs = computed(() => (props.to ? { to: props.to } : props.href ? (offSite.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }) : {}))
const statusText = computed(() => props.statusLabel ?? (props.status ? { launching: 'Запускається', ongoing: 'Триває', completed: 'Завершено' }[props.status] : undefined))
const typeLabel = computed(() => (props.external ? 'Окремий сайт' : 'Сторінка проєкту'))
</script>

<template>
  <component :is="tag" v-bind="attrs" class="sym-project-card" :data-tone="tone" :data-status="status" :data-interactive="(to || href) ? '' : undefined">
    <span class="sym-project-card__in">
    <span v-if="period || statusText" class="sym-project-card__meta sym-t-label">
      <span class="sym-project-card__period">{{ period }}</span>
      <span v-if="statusText" class="sym-project-card__status"><span class="sym-project-card__dot" aria-hidden="true" />{{ statusText }}</span>
    </span>
    <span class="sym-project-card__visual" aria-hidden="true">
      <SymOrbit v-if="orbit" class="sym-project-card__orbit" size="md" anchor="top-right" :bleed="0.2" :rotate="-23" />
      <span class="sym-project-card__type sym-t-caption">{{ typeLabel }}<SymIcon :name="external ? 'arrow-up-right' : 'arrow-right'" /></span>
    </span>
    <span class="sym-project-card__body">
      <span v-if="direction" class="sym-project-card__direction sym-t-label">{{ direction }}</span>
      <component :is="`h${level}`" class="sym-project-card__title sym-t-title-lg">{{ title }}</component>
      <span v-if="summary" class="sym-project-card__summary sym-t-body-sm">{{ summary }}</span>
    </span>
    </span>
    <span v-if="offSite" class="sym-sr-only"> (відкриється в новій вкладці)</span>
  </component>
</template>

<style>
@layer sym-components {
  .sym-project-card { container: sym-project-card / inline-size; position: relative; display: block; width: 100%; min-width: 0; color: var(--sym-fg); text-decoration: none; border: var(--sym-rule-width) solid var(--sym-rule); border-radius: var(--sym-shape-card); transition: translate var(--sym-t-small); }
  .sym-project-card[data-interactive] { cursor: pointer; }
  .sym-project-card__in { --_pad: var(--sym-space-s); display: flex; flex-direction: column; height: 100%; }
  .sym-project-card__meta { display: flex; justify-content: space-between; align-items: center; gap: var(--sym-space-xs); padding: var(--_pad); border-block-end: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-project-card__status { display: inline-flex; align-items: center; gap: var(--sym-space-xs); text-align: end; }
  /* the dot shape repeats the status for people who read the shape, never replaces the text */
  .sym-project-card__dot { flex: none; width: .7em; height: .7em; background: currentColor; border-radius: 50%; }
  .sym-project-card[data-status='launching'] .sym-project-card__dot { background: transparent; border: var(--sym-rule-width-strong) solid currentColor; }
  .sym-project-card[data-status='completed'] .sym-project-card__dot { border-radius: 0; rotate: 45deg; }
  .sym-project-card__visual { position: relative; display: block; overflow: clip; aspect-ratio: 16 / 10; min-height: 11rem; }
  .sym-project-card .sym-project-card__orbit.sym-orbit { --_d: clamp(10rem, 62cqi, 20rem); transition: translate var(--sym-t-medium); }
  .sym-project-card__type { position: absolute; inset-inline-start: var(--_pad); inset-block-end: var(--_pad); display: inline-flex; align-items: center; gap: var(--sym-space-xs); padding: var(--sym-space-xs) var(--sym-space-s); background: var(--sym-fg); color: var(--sym-bg); }
  .sym-project-card__body { display: flex; flex-direction: column; gap: var(--sym-space-s); margin-block-start: auto; padding: var(--sym-space-m) var(--_pad) var(--sym-space-m); }
  .sym-project-card__direction { color: var(--sym-fg-muted); }
  .sym-project-card__title { margin: 0; }
  .sym-project-card__summary { max-width: 52ch; }
  @container sym-project-card (min-width: 460px) { .sym-project-card__in { --_pad: var(--sym-space-m); } .sym-project-card__visual { aspect-ratio: 2 / 1; } .sym-project-card__title { font-size: var(--sym-text-headline); line-height: 1.06; } }
  @media (hover: hover) {
    .sym-project-card[data-interactive]:hover { translate: 0 calc(-5px * var(--sym-motion-travel)); }
    .sym-project-card[data-interactive]:hover .sym-project-card__orbit { translate: calc(-10px * var(--sym-motion-travel)) calc(6px * var(--sym-motion-travel)); }
  }
  .sym-project-card[data-interactive]:active { translate: 0; transition-duration: var(--sym-dur-instant); }
  @media (forced-colors: active) { .sym-project-card__type { border: 1px solid CanvasText; } }
}
</style>
