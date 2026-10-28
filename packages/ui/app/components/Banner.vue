<script setup lang="ts">
/**
 * A thin announcement strip above the header: a new project, an event, a change of schedule. One sentence; with `href` / `to` the
 * sentence becomes a link. `dismissible` adds a close button (the page decides whether to remember it: listen to `dismiss`).
 * Announced politely to screen readers (role «status»).
 */
const props = withDefaults(defineProps<{
  /** Tone of the strip: apricot (default) | violet | plum | lilac | white | paper. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Adds a close button. */
  dismissible?: boolean
  /** Plain link target; the message becomes a link with an arrow. */
  href?: string
  /** Router link target. */
  to?: string
  /** Accessible name of the close button. */
  dismissLabel?: string
}>(), { tone: 'apricot', dismissLabel: 'Закрити оголошення' })
const emit = defineEmits<{ /** Fired after the close button is pressed. */ dismiss: [] }>()
defineSlots<{ default?: () => any }>()

const open = ref(true)
const NuxtLink = resolveComponent('NuxtLink')
const offSite = computed(() => isOffSite(props.href))
const linkTag = computed(() => (props.to ? NuxtLink : 'a'))
const linkAttrs = computed(() => (props.to ? { to: props.to } : offSite.value ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }))
const close = () => { open.value = false; emit('dismiss') }
</script>

<template>
  <Transition name="sym-banner">
    <div v-if="open" class="sym-banner" :data-tone="tone" role="status" :data-dismissible="dismissible || undefined">
      <div class="sym-banner__clip">
        <div class="sym-banner__in">
          <p class="sym-banner__text sym-t-body-sm">
            <component :is="linkTag" v-if="href || to" v-bind="linkAttrs" class="sym-banner__link"><span><slot /></span><SymIcon :name="offSite ? 'arrow-up-right' : 'arrow-right'" /><span v-if="offSite" class="sym-sr-only"> (відкриється в новій вкладці)</span></component>
            <slot v-else />
          </p>
          <button v-if="dismissible" type="button" class="sym-banner__close sym-state" :aria-label="dismissLabel" @click="close"><SymIcon name="close" /></button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
@layer sym-components {
  .sym-banner { container: sym-banner / inline-size; display: grid; grid-template-rows: 1fr; width: 100%; color: var(--sym-fg); }
  .sym-banner__clip { min-height: 0; }
  .sym-banner__in { display: flex; align-items: center; gap: var(--sym-space-xs); min-height: var(--sym-size-touch); padding: var(--sym-space-2xs) var(--sym-page-margin); }
  .sym-banner__text { flex: 1; min-width: 0; margin: 0; hyphens: manual; text-align: center; text-wrap: balance; }
  /* the close button sits at the end; the text keeps a matching gap at the start so it stays centred */
  .sym-banner[data-dismissible] .sym-banner__text { padding-inline-start: var(--sym-size-touch); }
  .sym-banner[data-dismissible] .sym-banner__in { padding-inline-end: var(--sym-space-2xs); }
  .sym-banner__link { display: inline-flex; align-items: center; gap: var(--sym-space-xs); padding-block: var(--sym-space-xs); color: inherit; font-weight: 600; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .25em; }
  .sym-banner__link .sym-icon { transition: translate var(--sym-t-micro); }
  @media (hover: hover) { .sym-banner__link:hover { text-decoration-thickness: 2px; } .sym-banner__link:hover .sym-icon { translate: calc(3px * var(--sym-motion-travel)) 0; } }
  .sym-banner__close { display: grid; place-items: center; flex: none; width: var(--sym-size-touch); height: var(--sym-size-touch); border-radius: 50%; color: inherit; }
  /* leaves by collapsing its height (a small block) and fading: medium tier, exit one step shorter */
  .sym-banner-leave-active { transition: grid-template-rows var(--sym-t-medium-out), opacity var(--sym-t-fx-medium); }
  .sym-banner-leave-active .sym-banner__clip { overflow: clip; }
  .sym-banner-leave-to { grid-template-rows: 0fr; opacity: 0; }
  :root[data-motion='reduce'] .sym-banner-leave-active { transition: opacity var(--sym-t-fx-medium); }
  @media (prefers-reduced-motion: reduce) { :root:not([data-motion='full']) .sym-banner-leave-active { transition: opacity var(--sym-t-fx-medium); } }
  @media (forced-colors: active) { .sym-banner { border-block-end: 1px solid CanvasText; } }
}
</style>
