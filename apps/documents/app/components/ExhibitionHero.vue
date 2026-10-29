<script setup lang="ts">
// Home of the project site, composed as a filled-in document — unlike the project page on symbol.ngo, which shows the
// title on tape strips beside a side column: the exhibition «issued» as a form with a 3×4 photo, typed-in fields, the
// stamp over the photo, the curators' signature and a machine-readable zone at the bottom, as in a passport.
const { t, localePath } = useLang()
const photo = (exhibition.gallery ?? []).find(item => !item.people) ?? exhibition.gallery?.[0]

const fields = computed(() => [
  { label: t('Вид', 'Type'), value: t('Виставка сучасного мистецтва', 'Contemporary art exhibition') },
  { label: t('Дійсна з', 'Valid from'), value: '17.10.2025', half: true },
  { label: t('Дійсна до', 'Valid until'), value: '07.12.2025', half: true },
  { label: t('Місце', 'Place'), value: t('ЄрміловЦентр, Харків', 'YermilovCentre, Kharkiv') },
  { label: t('Учасники', 'Holders'), value: t('20 митців і мисткинь', '20 artists') },
  { label: t('Видано', 'Issued by'), value: t('ГО «Символ» · ЄрміловЦентр · ХНУ ім. В. Н. Каразіна', 'NGO Symbol · YermilovCentre · Karazin University') }
])
</script>

<template>
  <header class="form-hero">
    <div class="docs-container">
      <article class="form-sheet">
        <div class="form-sheet__head">
          <span>{{ t('Форма № ПСД-2025', 'Form No. PSD-2025') }}</span>
          <span>{{ t('Проєкт ГО «Символ»', 'A project of NGO Symbol') }}</span>
          <span class="form-sheet__serial">{{ t('Серія', 'Series') }} ЄЦ 171025</span>
        </div>

        <div class="form-field form-field--title">
          <span class="form-field__label">{{ t('Назва', 'Title') }}</span>
          <h1 class="form-title">{{ t('Покажіть свої документи…', 'May I see your documents…') }}</h1>
        </div>

        <div class="form-sheet__body">
          <figure class="form-photo">
            <img v-if="photo" :src="photo.src" :alt="photo.alt">
            <figcaption>{{ t('Фото 3×4', 'Photo 3×4') }}</figcaption>
            <DocsStamp class="form-photo__stamp" />
          </figure>

          <dl class="form-fields">
            <div v-for="(field, index) in fields" :key="field.label" class="form-field" :class="{ 'form-field--half': field.half }" :style="{ '--i': index }">
              <dt class="form-field__label">{{ field.label }}</dt>
              <dd class="form-field__value">{{ field.value }}</dd>
            </div>
            <div class="form-field form-signature" :style="{ '--i': fields.length }">
              <dt class="form-field__label">{{ t('Підпис кураторів', 'Curators’ signature') }}</dt>
              <dd class="form-field__value">
                <a :href="symbolPersonUrl('petro-chekal')">{{ t('Петро Чекаль', 'Petro Chekal') }}</a>,
                <a :href="symbolPersonUrl('yurii-rassokha')">{{ t('Юрій Рассоха', 'Yurii Rassokha') }}</a>
              </dd>
            </div>
          </dl>
        </div>

        <p class="form-mrz" aria-hidden="true">
          <span>P&lt;UKRPOKAZHIT&lt;SVOI&lt;DOKUMENTY&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
          <span>20ARTISTS&lt;&lt;251017&lt;251207&lt;KHARKIV&lt;YERMILOV&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
        </p>
      </article>

      <nav class="form-actions" :aria-label="t('Розділи', 'Sections')">
        <NuxtLink class="docs-site" :to="localePath('/mytsi')">{{ t('Митці виставки', 'The artists') }}</NuxtLink>
        <NuxtLink class="form-actions__more" :to="localePath('/podii')">{{ t('Програма подій', 'Events') }}</NuxtLink>
        <NuxtLink class="form-actions__more" :to="localePath('/kontseptsiia')">{{ t('Кураторська концепція', 'Curatorial concept') }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.form-hero { padding: 32px 0 56px; overflow: hidden; }
.form-sheet { position: relative; padding: clamp(18px, 3vw, 36px); background: var(--docs-sheet, #f4f4f1); border: 2px solid var(--docs-ink); box-shadow: 10px 10px 0 color-mix(in srgb, var(--docs-ink) 14%, transparent); animation: form-in .7s cubic-bezier(.2, .8, .2, 1) both; }
:root[data-theme="dark"] .form-sheet { --docs-sheet: #232321; }
.form-sheet__head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 18px; padding-bottom: 12px; border-bottom: 1px solid var(--docs-ink); font-family: var(--docs-mono); font-size: .74rem; letter-spacing: .08em; text-transform: uppercase; }
.form-sheet__serial { color: var(--docs-stamp); }
.form-field { display: grid; gap: 4px; padding: 10px 0 8px; border-bottom: 1px dashed color-mix(in srgb, var(--docs-ink) 45%, transparent); animation: form-type .5s steps(12, end) both; animation-delay: calc(.5s + var(--i, 0) * .12s); }
.form-field__label { font-family: var(--docs-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
.form-field__value { margin: 0; font-family: var(--docs-mono); font-size: clamp(.95rem, calc(.85rem + .4vw), 1.15rem); }
.form-field--title { border-bottom: 2px solid var(--docs-ink); padding: 18px 0 14px; animation-delay: .2s; }
.form-title { margin: 0; font-family: var(--docs-display); font-weight: 400; text-transform: uppercase; line-height: .92; font-size: clamp(2.6rem, 8.4vw, 7.6rem); }
.form-sheet__body { display: grid; grid-template-columns: minmax(150px, 280px) minmax(0, 1fr); gap: clamp(20px, 4vw, 48px); padding-top: 24px; align-items: start; }
.form-photo { position: relative; margin: 0; }
.form-photo img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: cover; border: 2px solid var(--docs-ink); filter: grayscale(1) contrast(1.1); }
.form-photo figcaption { margin-top: 6px; font-family: var(--docs-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
.form-photo__stamp { position: absolute; right: -22%; bottom: 4%; width: 70%; color: var(--docs-stamp); mix-blend-mode: var(--docs-stamp-blend, multiply); animation: form-stamp 1s cubic-bezier(.5, 0, .3, 1.6) 1.4s both; }
.form-fields { margin: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 24px; }
.form-fields .form-field { grid-column: 1 / -1; }
.form-fields .form-field--half { grid-column: auto; }
.form-signature .form-field__value { font-family: var(--docs-display); font-size: clamp(1.3rem, calc(1rem + 1vw), 1.9rem); text-transform: uppercase; }
.form-signature a { color: inherit; text-decoration: none; border-bottom: 2px solid var(--docs-stamp); }
.form-mrz { margin: 28px 0 0; display: grid; gap: 2px; padding-top: 12px; border-top: 1px solid var(--docs-ink); font-family: var(--docs-mono); font-size: clamp(.62rem, calc(.4rem + .9vw), 1.05rem); letter-spacing: .14em; white-space: nowrap; overflow: hidden; opacity: .75; }
.form-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 32px; }
.docs-site { display: inline-flex; padding: 16px 22px 12px; background: var(--docs-ink); color: var(--docs-paper); text-decoration: none; font-family: var(--docs-display); font-size: 1.5rem; text-transform: uppercase; line-height: 1; box-shadow: 6px 6px 0 var(--docs-stamp); transition: transform .2s ease, box-shadow .2s ease; }
.docs-site:hover { transform: translate(-3px, -3px); box-shadow: 10px 10px 0 var(--docs-stamp); }
.form-actions__more { font-family: var(--docs-mono); font-size: .85rem; text-transform: uppercase; letter-spacing: .06em; color: var(--docs-ink); }
@keyframes form-in { from { transform: translateY(24px) rotate(-.6deg); opacity: 0; } }
@keyframes form-type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes form-stamp { 0% { transform: translateY(-60px) scale(1.8) rotate(-30deg); opacity: 0; } 55% { transform: scale(.94) rotate(-14deg); opacity: 1; } 100% { transform: rotate(-12deg); opacity: .9; } }
@media (max-width: 720px) {
  .form-sheet__body { grid-template-columns: 1fr; }
  .form-photo { width: 62%; }
  .form-photo__stamp { right: -45%; width: 80%; }
  .form-fields { grid-template-columns: 1fr 1fr; }
}
@media (prefers-reduced-motion: reduce) { .form-sheet, .form-field, .form-photo__stamp { animation: none; } }
</style>
