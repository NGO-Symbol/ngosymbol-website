<script setup lang="ts">
const route = useRoute()
const isDemo = route.params.slug === 'chebaievyna'
if (!isDemo) throw createError({ statusCode: 404, statusMessage: 'Сторінку вулиці ще не створено' })
useSeoMeta({ title: 'Вулиця Чебаєвина — чернетка' })
</script>

<template>
  <article class="street-detail"><header class="street-detail-hero"><div class="street-container"><span class="street-label">Демонстраційна структура · без історичного наповнення</span><h1>Вулиця<br>Чебаєвина</h1><p>Цей маршрут підтверджує технічну модель сторінки. Факти, фотографії, дати та свідчення будуть додані лише після редакційної перевірки.</p></div></header><div class="street-container story-grid"><aside><span class="street-label">Навігація</span><NuxtLink to="/vulytsi">← Усі вулиці</NuxtLink></aside><div><section><span class="street-label">Майбутній вступ</span><h2>Що розповідатиме ця сторінка</h2><p>Походження назви, міський контекст, зміни в просторі, архівні матеріали та голоси людей — якщо ці матеріали будуть підтверджені й дозволені до публікації.</p></section><div class="media-placeholder">Місце для перевірених фото, карти або аудіо</div></div></div></article>
</template>
