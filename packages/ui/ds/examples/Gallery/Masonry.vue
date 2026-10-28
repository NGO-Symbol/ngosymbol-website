<script setup lang="ts">
const items = [
  { alt: 'Широкий кадр', ratio: '16:9' as const, caption: 'Широкий кадр' },
  { alt: 'Портретний кадр', ratio: '3:4' as const },
  { alt: 'Квадратний кадр', ratio: '1:1' as const, caption: 'Квадрат' },
  { alt: 'Портретний кадр 2', ratio: '3:4' as const },
  { alt: 'Стандартний кадр', ratio: '4:3' as const },
  { alt: 'Широкий кадр 2', ratio: '16:9' as const, caption: 'Ще один широкий' },
]
</script>

<template>
  <SymGallery :items="items" layout="masonry-lite" label="Добірка знімків" />
</template>
