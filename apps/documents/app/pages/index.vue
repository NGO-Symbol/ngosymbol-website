<script setup lang="ts">
// Home: the hero, the exhibition in brief with a way into every section, the curatorial concept, the exhibition in photographs.
import { concept, conceptEn, conceptLead, conceptLeadEn } from '~/data/concept'
import { press } from '~/data/press'

const { isEn, t, localePath } = useLang()
useSeoMeta({ title: () => t('Кураторська концепція', 'Curatorial concept') })
const photos = (exhibition.gallery ?? []).filter(photo => !photo.people)
const blocks = computed(() => (isEn.value ? conceptEn : concept))

const sections = computed(() => [
  { to: '/mytsi', count: '20', label: t('митців і мисткинь', 'artists'), text: t('Фотографія, текст, живопис, колаж, перформанс', 'Photography, text, painting, collage, performance') },
  { to: '/podii', count: String(programme.length), label: t('подій програми', 'programme events'), text: t('Екскурсії, розмови, дискусії, перформанси', 'Tours, talks, discussions, performances') },
  { to: '/presa', count: String(press.length), label: t('публікацій у медіа', 'media mentions'), text: t('Анонси, огляди, опен-кол', 'Announcements, reviews, open call') },
  { to: '/komanda', count: String(team.length), label: t('людей у команді', 'people in the team'), text: t('Куратори, менеджерка, дизайн, координація', 'Curators, manager, design, coordination') }
])
</script>

<template>
  <div>
    <ExhibitionHero />

    <section class="docs-container brief">
      <p class="brief__text">{{ t('Виставка про документ як мистецький феномен: 20 українських митців і мисткинь працюють зі стандартними бланками, штампами, печатками та паспортними фото. ЄрміловЦентр, Харків, 17 жовтня — 7 грудня 2025 року. Організатори: ГО «Символ», ЄрміловЦентр, Харківський національний університет імені В. Н. Каразіна.', 'An exhibition about the document as an artistic phenomenon: 20 Ukrainian artists work with standard forms, stamps, seals and passport photos. YermilovCentre, Kharkiv, 17 October — 7 December 2025. Organised by NGO «Symbol», YermilovCentre and V. N. Karazin Kharkiv National University.') }}</p>
      <ul class="sections">
        <li v-for="section in sections" :key="section.to">
          <NuxtLink class="section-card" :to="localePath(section.to)">
            <span class="section-card__count">{{ section.count }}</span>
            <span class="section-card__label">{{ section.label }}</span>
            <span class="section-card__text">{{ section.text }}</span>
            <span class="section-card__go" aria-hidden="true">→</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <div class="docs-container"><div class="docs-barcode" aria-hidden="true" /></div>

    <section id="concept" class="docs-container concept">
      <div class="concept__head">
        <span class="docs-label">{{ t('Кураторська концепція', 'Curatorial concept') }}</span>
        <p class="docs-lead">{{ isEn ? conceptLeadEn : conceptLead }}</p>
      </div>
      <div class="docs-text">
        <template v-for="(block, index) in blocks" :key="index">
          <p v-if="block.text">{{ block.text }}</p>
          <ol v-else-if="block.list"><li v-for="item in block.list" :key="item">{{ item }}</li></ol>
        </template>
        <p class="docs-signature">{{ t('Куратори', 'Curators') }}: <a :href="symbolPersonUrl('petro-chekal')">{{ t('Петро Чекаль', 'Petro Chekal') }}</a>, <a :href="symbolPersonUrl('yurii-rassokha')">{{ t('Юрій Рассоха', 'Yurii Rassokha') }}</a></p>
      </div>
    </section>

    <section class="docs-container">
      <div class="docs-barcode" aria-hidden="true" />
      <h2 class="docs-section-title">{{ t('Виставка', 'The exhibition') }}</h2>
      <ul class="docs-photos">
        <li v-for="photo in photos" :key="photo.src">
          <figure><img :src="photo.src" :alt="photo.alt" loading="lazy"><figcaption v-if="photo.credit">{{ t('Фото', 'Photo') }}: {{ photo.credit }}</figcaption></figure>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.brief { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 32px; align-items: start; }
.brief__text { margin: 0; font-size: 1.02rem; line-height: 1.6; max-width: 56ch; }
.sections { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.section-card { position: relative; display: grid; gap: 4px; height: 100%; padding: 14px 16px 16px; border: 2px solid var(--docs-ink); text-decoration: none; color: var(--docs-ink); transition: background .2s ease, color .2s ease, transform .2s ease; }
.section-card:hover { background: var(--docs-ink); color: var(--docs-paper); transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--docs-stamp); }
.section-card__count { font-family: var(--docs-display); font-size: 2.4rem; line-height: 1; }
.section-card__label { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.05rem; line-height: 1.05; }
.section-card__text { font-size: .76rem; line-height: 1.4; opacity: .75; }
.section-card__go { position: absolute; top: 12px; right: 14px; font-size: 1.2rem; }
.concept { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 40px; align-items: start; }
.concept__head { position: sticky; top: 140px; display: grid; gap: 14px; justify-items: start; }
.concept__head .docs-lead { margin: 0; font-size: 1.05rem; }
.docs-signature { font-size: .85rem; color: var(--docs-muted); }
@media (max-width: 860px) {
  .brief, .concept { grid-template-columns: 1fr; gap: 20px; }
  .concept__head { position: static; }
}
@media (max-width: 420px) { .sections { grid-template-columns: 1fr; } }
</style>
