<script setup lang="ts">
/**
 * Reveals its content once when it scrolls into view: rises a little and fades in (rise), only fades (fade), or is uncovered
 * from the top (wipe, for images). Content is visible without JavaScript; what is already on screen at load does not animate.
 * Several Reveals that enter in the same moment appear one after another (60 ms apart, up to 6). Reduced motion: plain fade.
 * Do not wrap tiny items one by one; wrap the block, or use SymGrid children with `reveal`.
 */
withDefaults(defineProps<{
  /** rise (default) | fade | wipe. */
  kind?: 'rise' | 'fade' | 'wipe'
  /** HTML element to render. */
  as?: string
}>(), { kind: 'rise', as: 'div' })
defineSlots<{ default?: () => any }>()
</script>

<template>
  <component :is="as" v-reveal="kind" class="sym-reveal"><slot /></component>
</template>

<style>
@layer sym-components {
  .sym-reveal { min-width: 0; }
}
</style>
