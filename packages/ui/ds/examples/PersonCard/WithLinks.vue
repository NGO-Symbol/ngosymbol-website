<script setup lang="ts">
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(217,205,242)"/><stop offset="1" stop-color="rgb(244,185,154)"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><circle cx="300" cy="320" r="110" fill="rgb(255,255,255)" fill-opacity=".6"/><path d="M110 800c0-120 80-220 190-220s190 100 190 220z" fill="rgb(255,255,255)" fill-opacity=".6"/></svg>`
const photo = { src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt: '', decorative: true, width: 600, height: 800 }
const links = [{ label: 'Написати', href: 'mailto:name@example.com', icon: 'mail' }, { label: 'Інстаграм', href: 'https://www.instagram.com/example/', icon: 'instagram' }]
</script>

<template>
  <SymPersonCard name="Ім’я Прізвище" role="Роль у команді" bio="Коротка підтверджена біографія в два-три речення." :photo="photo" :links="links" />
</template>
