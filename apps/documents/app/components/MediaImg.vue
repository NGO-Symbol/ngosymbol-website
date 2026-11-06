<script setup lang="ts">
// A site photograph, responsive by default: AVIF variants at several widths (`srcset` + `sizes`), intrinsic
// width/height (no layout shift), the photo's average colour behind it while it loads, lazy by default. It renders a
// single <img> (so the parent component's own styles apply to it); if the browser cannot open the AVIF it falls back to
// the original JPEG. Use it for every /media/… and /works/… photograph; never a bare <img>.
//   sizes     how wide the photo is shown, as a CSS `sizes` value (default: half the viewport, a third on desktop)
//   priority  the first photo on a page (hero): eager + high fetch priority
import { imageInfo } from '#symbol/images'

const props = withDefaults(defineProps<{ src: string; alt?: string; sizes?: string; priority?: boolean }>(), {
  sizes: '(min-width: 900px) 34vw, 50vw'
})
const failed = ref(false)
const info = computed(() => (failed.value ? undefined : imageInfo(props.src)))
</script>

<template>
  <img
    :src="src"
    :srcset="info?.srcset"
    :sizes="info ? sizes : undefined"
    :width="imageInfo(src)?.width"
    :height="imageInfo(src)?.height"
    :alt="alt ?? ''"
    :style="info ? { backgroundColor: info.colour } : undefined"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
    @error="failed = true"
  >
</template>
