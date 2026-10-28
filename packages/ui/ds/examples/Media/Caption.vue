<script setup lang="ts">
// A generated SVG stands in for a real photo (there are none yet); it shows how a loaded image fills the frame.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgb(217,205,242)"/><stop offset="1" stop-color="rgb(244,185,154)"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="420" r="260" fill="none" stroke="rgb(122,82,209)" stroke-width="90"/></svg>`
const src = `data:image/svg+xml,${encodeURIComponent(svg)}`
</script>

<template>
  <SymStack>
    <SymMedia :src="src" alt="Абстрактна ілюстрація: градієнт і кільце" ratio="16:9" caption="Підпис пояснює, що на знімку, і додає контекст." credit="Ілюстрація: Ім’я Прізвище" :width="1600" :height="900" />
    <SymMedia alt="Місце під фото зі зустрічі команди" ratio="16:9" caption="Фото з’явиться після підтвердження." credit="Фото: Ім’я Прізвище" />
  </SymStack>
</template>
