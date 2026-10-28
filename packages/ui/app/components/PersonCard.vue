<script setup lang="ts">
type Tone = 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
interface PersonLink {
  /** Visible text of the link, e.g. «Написати». */
  label: string
  /** Address (http(s), mailto:, tel:). */
  href: string
  /** Optional SymIcon name before the text. */
  icon?: string
}
interface PersonPhoto {
  /** Image address. */
  src: string
  /** Text alternative; may be empty together with `decorative`. */
  alt: string
  /** Decorative: the name next to it already identifies the person. */
  decorative?: boolean
  /** Natural size, optional. */
  width?: number
  height?: number
}

/**
 * A person of the team: photo, name, role, short bio, links. Show only confirmed roles and bios. Without a photo the orbit mark in a
 * tonal circle stands in. Stacked on narrow containers; photo beside the text when the card is wide.
 */
const props = withDefaults(defineProps<{
  /** Full name. */
  name: string
  /** Role in the organisation, only if confirmed. */
  role?: string
  /** Two or three sentences. */
  bio?: string
  /** Photo (Media props). Omit for the orbit placeholder. */
  photo?: PersonPhoto
  /** Contact links. */
  links?: PersonLink[]
  /** Tone of the placeholder circle; omitted: a light tint of the surrounding tone. */
  tone?: Tone
  /** Outline level of the name (2–4). */
  level?: 2 | 3 | 4
}>(), { level: 3 })
</script>

<template>
  <article class="sym-person-card">
    <div class="sym-person-card__in">
    <div class="sym-person-card__visual">
      <SymMedia v-if="photo" :src="photo.src" :alt="photo.alt" :decorative="photo.decorative" :width="photo.width" :height="photo.height" ratio="3:4" />
      <span v-else class="sym-person-card__circle" :data-tone="tone" aria-hidden="true"><SymOrbit class="sym-person-card__orbit" size="sm" anchor="center" :bleed="0" /></span>
    </div>
    <div class="sym-person-card__text">
      <component :is="`h${level}`" class="sym-person-card__name sym-t-title-lg">{{ name }}</component>
      <p v-if="role" class="sym-person-card__role sym-t-label sym-muted">{{ role }}</p>
      <p v-if="bio" class="sym-person-card__bio sym-t-body-sm">{{ bio }}</p>
      <ul v-if="links?.length" class="sym-person-card__links" role="list">
        <li v-for="l in links" :key="l.href">
          <a class="sym-person-card__link sym-t-body-sm" :href="l.href" :target="isOffSite(l.href) ? '_blank' : undefined" :rel="isOffSite(l.href) ? 'noopener' : undefined">
            <SymIcon v-if="l.icon" :name="(l.icon as any)" />
            <span>{{ l.label }}</span>
            <span v-if="isOffSite(l.href)" class="sym-sr-only"> (відкриється в новій вкладці)</span>
          </a>
        </li>
      </ul>
    </div>
    </div>
  </article>
</template>

<style>
@layer sym-components {
  .sym-person-card { container: sym-person-card / inline-size; display: block; width: 100%; min-width: 0; color: var(--sym-fg); }
  .sym-person-card__in { display: grid; gap: var(--sym-space-m); align-content: start; }
  .sym-person-card__visual { min-width: 0; }
  /* circle placeholder: fixed geometry of the component (12rem), never wider than the card */
  .sym-person-card__circle { position: relative; display: block; overflow: clip; width: min(100%, 12rem); aspect-ratio: 1; border-radius: 50%; background: color-mix(in srgb, var(--sym-fg) 7%, var(--sym-bg)); }
  .sym-person-card__circle[data-tone] { background: var(--sym-bg); }
  .sym-person-card .sym-person-card__orbit.sym-orbit { --_d: 7rem; }
  .sym-person-card__text { display: flex; flex-direction: column; gap: var(--sym-space-xs); min-width: 0; }
  .sym-person-card__name, .sym-person-card__role, .sym-person-card__bio { margin: 0; }
  .sym-person-card__bio { margin-block-start: var(--sym-space-2xs); max-width: 52ch; }
  .sym-person-card__links { display: flex; flex-wrap: wrap; gap: 0 var(--sym-space-m); margin: var(--sym-space-2xs) 0 0; padding: 0; list-style: none; }
  .sym-person-card__link { display: inline-flex; align-items: center; gap: var(--sym-space-xs); min-height: var(--sym-size-touch); font-weight: 600; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .3em; }
  @media (hover: hover) { .sym-person-card__link:hover { text-decoration-thickness: 2px; } }
  @container sym-person-card (min-width: 520px) {
    .sym-person-card__in { grid-template-columns: minmax(0, 11rem) minmax(0, 1fr); gap: var(--sym-space-l); }
    .sym-person-card__circle { width: 100%; }
  }
}
</style>
