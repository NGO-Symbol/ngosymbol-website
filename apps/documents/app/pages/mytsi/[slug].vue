<script setup lang="ts">
// An artist of the exhibition as a personal case file: a folder cover with the 3×4 portrait clipped on and the case
// fields, then sheets — the biography, the curatorial text of each work, the photographs as an appendix — and the full
// page on symbol.ngo (biography, links, other projects). Texts are in Ukrainian.
import { chekalPhotos, workPhotos } from '~/data/workPhotos'

const { isEn, t, localePath } = useLang()
const route = useRoute()
const artist = getArtist(String(route.params.slug))
if (!artist) throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })

useSeoMeta({ title: artist.name, description: artist.bio[0] })
const index = exhibitionArtists.indexOf(artist)
const prev = exhibitionArtists[(index - 1 + exhibitionArtists.length) % exhibitionArtists.length]!
const next = exhibitionArtists[(index + 1) % exhibitionArtists.length]!
// Photographs of the works: Петро Чекаль's exhibition shots where there are any, otherwise the pictures from the
// original site and the person's works on symbol.ngo; plus exhibition photos of symbol.ngo that show this artist's work.
const alt = `${artist.name}: ${t('робота на виставці', 'work at the exhibition')}`
const byChekal = chekalPhotos(artist.slug).map(src => ({ src, alt, credit: 'Петро Чекаль' }))
const exhibitionShots = (exhibition.gallery ?? []).filter(photo => artist.works.some(work => photo.alt.includes(`«${work.title}»`)))
const photos = [
  ...(byChekal.length ? byChekal : [
    ...workPhotos(artist.slug).map(src => ({ src, alt })),
    ...(artist.person?.works ?? []),
    ...artist.coAuthors.flatMap(person => person.works ?? [])
  ]),
  ...exhibitionShots
]
const credits = [...new Set(photos.map(photo => ('credit' in photo ? photo.credit : undefined)).filter(Boolean))]
const caseNo = computed(() => `${t('Особова справа', 'Personal file')} № ${String(index + 1).padStart(2, '0')}`)
</script>

<template>
  <article class="docs-container docs-page">
    <nav class="crumbs" :aria-label="t('Навігація', 'Navigation')">
      <NuxtLink :to="localePath('/mytsi')">← {{ t('Усі митці', 'All artists') }}</NuxtLink>
      <span>{{ index + 1 }} / {{ exhibitionArtists.length }}</span>
    </nav>
    <header class="case-cover">
      <span class="case-cover__tab">{{ t('Справа', 'File') }} № {{ String(index + 1).padStart(2, '0') }}</span>
      <div class="case-cover__label">
        <p class="case-cover__kind">{{ t('Особова справа', 'Personal file') }} · {{ t('Покажіть свої документи…', 'May I See Your Documents…') }}</p>
        <div class="case-cover__grid">
          <figure v-if="artist.person?.photo" class="case-cover__photo">
            <img :src="artist.person.photo" :alt="artist.name">
            <span class="case-cover__clip" aria-hidden="true" />
          </figure>
          <dl class="case-cover__fields">
            <div class="case-cover__name"><dt>{{ t('Прізвище, ім’я', 'Name') }}</dt><dd><h1>{{ artist.name }}</h1></dd></div>
            <div><dt>{{ artist.works.length > 1 ? t('Роботи', 'Works') : t('Робота', 'Work') }}</dt><dd>{{ artist.works.map(work => `«${work.title}»`).join(', ') }}</dd></div>
            <div><dt>{{ t('Статус', 'Status') }}</dt><dd>{{ artist.coAuthors.length ? t('Митці виставки', 'Artists of the exhibition') : t('Митець виставки', 'Artist of the exhibition') }}</dd></div>
            <div><dt>{{ t('Аркушів', 'Sheets') }}</dt><dd>{{ 1 + artist.works.length + (photos.length ? 1 : 0) }}</dd></div>
          </dl>
        </div>
        <p class="case-cover__links">
          <a class="docs-button" :href="symbolPersonUrl(artist.slug)">{{ t('Сторінка на symbol.ngo', 'Profile on symbol.ngo') }}</a>
          <a v-for="person in artist.coAuthors" :key="person.slug" class="docs-button" :href="symbolPersonUrl(person.slug)">{{ person.name }}</a>
        </p>
      </div>
    </header>

    <div class="case-papers">
      <p v-if="isEn" class="lang-note">Texts about the artists are available in Ukrainian.</p>
      <DocsSheet :case-no="caseNo" :kind="t('Біографія', 'Biography')" :sheet="1" :tilt="-0.3">
        <div class="docs-text"><p v-for="paragraph in artist.bio" :key="paragraph">{{ paragraph }}</p></div>
      </DocsSheet>

      <DocsSheet v-for="(work, workIndex) in artist.works" :key="work.title" :case-no="caseNo" :doc-no="`${t('Робота', 'Work')}${work.year ? ` · ${work.year}` : ''}`" :kind="t('Кураторський текст', 'Curatorial text')" :sheet="workIndex + 2" :tilt="workIndex % 2 ? -0.25 : 0.25">
        <h2 class="case-work">«{{ work.title }}»</h2>
        <div class="docs-text"><p v-for="paragraph in work.text" :key="paragraph">{{ paragraph }}</p></div>
      </DocsSheet>

      <DocsSheet v-if="photos.length" :case-no="caseNo" :kind="t('Додаток: фотографії робіт', 'Appendix: photographs of the works')" :sheet="artist.works.length + 2" :tilt="0.15">
        <ul class="docs-photos case-photos">
          <li v-for="photo in photos" :key="photo.src"><figure><img :src="photo.src" :alt="photo.alt" loading="lazy"></figure></li>
        </ul>
        <p v-if="credits.length" class="case-credits">{{ t('Фото', 'Photos') }}: {{ credits.join(', ') }}</p>
      </DocsSheet>
    </div>

    <nav class="pager" :aria-label="t('Інші митці', 'Other artists')">
      <NuxtLink :to="localePath(`/mytsi/${prev.slug}`)"><span class="docs-label">← {{ t('Попередній', 'Previous') }}</span><span>{{ prev.name }}</span></NuxtLink>
      <NuxtLink class="pager__next" :to="localePath(`/mytsi/${next.slug}`)"><span class="docs-label">{{ t('Наступний', 'Next') }} →</span><span>{{ next.name }}</span></NuxtLink>
    </nav>
  </article>
</template>

<style scoped>
.crumbs { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 24px; font-size: .85rem; }
.crumbs span { color: var(--docs-muted); }
/* The folder: manila cover with a tab, a pasted label with the case fields and the clipped 3×4 portrait. */
.case-cover { position: relative; margin-top: 28px; padding: clamp(20px, 3vw, 36px); background: var(--docs-folder); border-radius: 0 6px 6px 6px; box-shadow: 0 2px 0 color-mix(in srgb, var(--docs-ink) 18%, transparent); }
.case-cover__tab { position: absolute; left: 0; bottom: 100%; padding: 6px 18px 4px; background: var(--docs-folder); border-radius: 6px 6px 0 0; font-family: var(--docs-mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; }
.case-cover__label { padding: clamp(16px, 2.6vw, 28px); background: var(--docs-sheet); border: 1px solid var(--docs-ink); }
.case-cover__kind { margin: 0 0 16px; padding-bottom: 10px; border-bottom: 2px solid var(--docs-ink); font-family: var(--docs-mono); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; }
.case-cover__grid { display: grid; grid-template-columns: minmax(120px, 210px) minmax(0, 1fr); gap: clamp(16px, 3vw, 36px); align-items: start; }
.case-cover__photo { position: relative; margin: 0; transform: rotate(-2deg); }
.case-cover__photo img { display: block; width: 100%; aspect-ratio: 3 / 4; object-fit: cover; filter: grayscale(1) contrast(1.08); border: 6px solid #fff; box-shadow: 2px 3px 0 color-mix(in srgb, var(--docs-ink) 25%, transparent); }
/* A paper clip over the top edge of the photo. */
.case-cover__clip { position: absolute; top: -14px; left: 22%; width: 16px; height: 46px; border: 2.5px solid #8b8f96; border-radius: 9px; }
.case-cover__clip::after { content: ''; position: absolute; left: 3px; right: 3px; top: 6px; bottom: 10px; border: 2.5px solid #8b8f96; border-top: 0; border-radius: 0 0 6px 6px; }
.case-cover__fields { margin: 0; display: grid; }
.case-cover__fields div { display: grid; gap: 3px; padding: 9px 0; border-bottom: 1px dashed color-mix(in srgb, var(--docs-ink) 40%, transparent); }
.case-cover__fields dt { font-family: var(--docs-mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
.case-cover__fields dd { margin: 0; font-family: var(--docs-mono); font-size: .95rem; }
.case-cover__name h1 { margin: 0; font-size: clamp(2rem, calc(1rem + 3.6vw), 3.8rem); line-height: .95; }
.case-cover__links { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 0; }
.case-papers { display: grid; margin-top: 36px; }
.case-work { margin: 0 0 16px; font-size: clamp(1.6rem, calc(1rem + 2vw), 2.6rem); }
.case-photos { margin: 0; }
.case-credits { margin: 14px 0 0; font-family: var(--docs-mono); font-size: .78rem; color: var(--docs-muted); }
.lang-note { font-size: .8rem; color: var(--docs-muted); }
.pager { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 64px; padding-top: 20px; border-top: 2px dashed var(--docs-ink); }
.pager a { display: grid; gap: 8px; justify-items: start; text-decoration: none; font-family: var(--docs-display); font-size: clamp(1.2rem, calc(.9rem + 1.4vw), 2rem); text-transform: uppercase; line-height: 1; }
.pager a:hover span:last-child { text-decoration: underline; text-decoration-thickness: 2px; }
.pager__next { justify-items: end !important; text-align: right; }
@media (max-width: 760px) {
  .case-cover__grid { grid-template-columns: 1fr; }
  .case-cover__photo { width: 56%; max-width: 220px; }
}
</style>
