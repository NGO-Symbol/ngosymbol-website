<script setup lang="ts">
// Home: the exhibition as a dossier, then the general things — what was done, where, with whom — a way into every
// section, the partners and the exhibition in photographs. The curatorial concept has its own tab (/kontseptsiia).
import { press } from '~/data/press'
import { homePhotos, photographers } from '~/data/homePhotos'
import { projectsEn } from '#symbol/projects-en'
import { organizationsEn } from '#symbol/organizations-en'

const { isEn, t, localePath } = useLang()
useSeoMeta({ title: () => t('Про виставку', 'About the exhibition') })
const exhibitionBody = computed(() => isEn.value ? projectsEn[exhibition.slug]?.body ?? exhibition.body : exhibition.body)
const orgName = (org: NonNullable<(typeof exhibitionPartners)[number]>) => isEn.value ? organizationsEn[org.slug] ?? org.name : org.name

const sections = computed(() => [
  { to: '/kontseptsiia', count: '01', label: t('кураторська концепція', 'curatorial concept'), text: t('Документ як інструмент влади, пам’яті й ідентичності', 'The document as a tool of power, memory and identity') },
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

    <section id="about" class="docs-container about">
      <div class="about__head">
        <span class="docs-label">{{ t('Про виставку', 'About') }}</span>
        <h2 class="docs-section-title">{{ t('Що відбулося', 'What happened') }}</h2>
      </div>
      <div class="docs-text">
        <DocText v-for="paragraph in exhibitionBody" :key="paragraph" :text="paragraph" />
      </div>
    </section>

    <section v-if="exhibitionPartners.length" class="docs-container partners">
      <h2 class="docs-section-title">{{ t('Партнери й донори', 'Partners and donors') }}</h2>
      <ul>
        <li v-for="org in exhibitionPartners" :key="org!.slug">
          <a :href="org!.url" target="_blank" rel="noreferrer">
            <img v-if="org!.logo" :src="org!.logo" :alt="orgName(org!)" loading="lazy">
            <span :class="{ 'partners__name--logo': org!.logo }">{{ orgName(org!) }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="docs-container">
      <div class="docs-barcode" aria-hidden="true" />
      <h2 class="docs-section-title">{{ t('Виставка', 'The exhibition') }}</h2>
      <DocsPhotoGallery :photos="homePhotos" />
      <p class="photo-credits">
        {{ t('Фото', 'Photos') }}:
        <template v-for="(person, index) in photographers" :key="person.slug"><a v-if="personOf(person.slug)" :href="symbolPersonUrl(person.slug)">{{ isEn ? person.nameEn : person.name }}</a><template v-else>{{ isEn ? person.nameEn : person.name }}</template><template v-if="index < photographers.length - 1">, </template></template>
      </p>
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
.about { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 40px; align-items: start; margin-top: 56px; }
.about__head { display: grid; gap: 14px; justify-items: start; }
.about__head h2 { margin: 0; }
.lang-note { font-size: .8rem; color: var(--docs-muted); }
.partners { margin-top: 56px; }
.photo-credits { margin: 16px 0 0; font-family: var(--docs-mono); font-size: .8rem; color: var(--docs-muted); }
.photo-credits a { color: inherit; }
.partners ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 12px; }
.partners a { display: grid; gap: 10px; align-content: start; height: 100%; padding: 16px; border: 2px solid var(--docs-ink); text-decoration: none; color: var(--docs-ink); font-family: var(--docs-mono); font-size: .78rem; line-height: 1.35; transition: transform .2s ease, box-shadow .2s ease; }
.partners a:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--docs-stamp); }
.partners img { height: 48px; width: auto; max-width: 100%; object-fit: contain; object-position: left; }
/* Night: every logo in plain white on the carbon paper (system dark or the switch). */
:root[data-theme="dark"] .partners img { filter: brightness(0) invert(.92); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .partners img { filter: brightness(0) invert(.92); } }
/* Phones: the logos alone in a compact grid, so more of them fit on the screen; the name stays for screen readers
   and shows only where an organization has no logo. */
@media (max-width: 640px) {
  .partners ul { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .partners a { place-items: center; align-content: center; min-height: 72px; padding: 10px; border-width: 1px; }
  .partners img { height: 34px; object-position: center; }
  .partners__name--logo { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .partners span { text-align: center; font-size: .66rem; }
}
@media (max-width: 860px) {
  .brief, .about { grid-template-columns: 1fr; gap: 20px; }
}
@media (max-width: 420px) { .sections { grid-template-columns: 1fr; } }
</style>
