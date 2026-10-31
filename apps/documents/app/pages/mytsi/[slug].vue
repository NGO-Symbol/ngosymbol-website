<script setup lang="ts">
// An artist of the exhibition as a personal case file: a folder cover with the 3×4 portrait clipped on and the case
// fields, then sheets — the biography, the curatorial text of each work, the photographs as an appendix — and the full
// page on symbol.ngo (biography, links, other projects). Texts are in Ukrainian.
import { artistPhotoGroups } from '~/data/artistPhotos.generated'
import { psdPeopleEn } from '#symbol/psd-artists-en'

const { isEn, t, localePath } = useLang()
const route = useRoute()
const artist = getArtist(String(route.params.slug))
if (!artist) throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
const displayArtist = artistCopy(artist, isEn.value)

useSeoMeta({ title: displayArtist.name, description: displayArtist.bio[0] })
const index = exhibitionArtists.indexOf(artist)
const prev = exhibitionArtists[(index - 1 + exhibitionArtists.length) % exhibitionArtists.length]!
const next = exhibitionArtists[(index + 1) % exhibitionArtists.length]!
// The curator-sorted local archive is authoritative for photographs of the works. Its generated manifest contains
// every non-duplicate source image, grouped by work where the archive has separate folders.
const photoGroups = (artistPhotoGroups[artist.slug] ?? []).map((group, groupIndex) => ({
  title: displayArtist.works[groupIndex]?.title ?? group.title,
  photos: group.photos.map(photo => ({ ...photo, alt: `${displayArtist.name}: «${displayArtist.works[groupIndex]?.title ?? group.title}»` }))
}))
const photos = photoGroups.flatMap(group => group.photos)
const creditEn: Record<string, string> = { 'Олександр Осіпов': 'Oleksandr Osipov', 'Петро Чекаль': 'Petro Chekal' }
const translateCredit = (credit: string | undefined) => credit && isEn.value ? (creditEn[credit] ?? credit) : credit
const credits = [...new Set(photos.map(photo => translateCredit('credit' in photo ? photo.credit : undefined)).filter(Boolean))]
const separateWorkFiles = ['kinich-azla', 'oleksii-sai'].includes(artist.slug)
const normalTitle = (title: string) => title.toLocaleLowerCase('uk').replace(/[«»"'’.:\s-]/g, '')
const workFiles = separateWorkFiles
  ? displayArtist.works.map((work, workIndex) => ({
      work,
      photos: photoGroups.find(group => normalTitle(group.title) === normalTitle(work.title))?.photos ?? photoGroups[workIndex]?.photos ?? []
    }))
  : []
// Two work files are switched like folders in a drawer: only the chosen one is open, so the page stays short.
const activeWork = ref(0)
const openFile = computed(() => workFiles[activeWork.value])
const workTabs = ref<HTMLElement>()
// From the bottom of an open file: open the other one and bring its tabs into view.
function openWork(workIndex: number) {
  activeWork.value = workIndex
  workTabs.value?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}
const sheetCount = 1 + displayArtist.works.length + (separateWorkFiles ? workFiles.filter(file => file.photos.length).length : photos.length ? 1 : 0)
const photoCredits = (items: typeof photos) => [...new Set(items.map(photo => ('credit' in photo ? photo.credit : undefined)).filter(Boolean))]
  .map(translateCredit)
const personName = (person: (typeof portraits)[number]) => isEn.value ? (psdPeopleEn[person.slug]?.name ?? person.name) : person.name
// Marks of use on some files, placed differently on each: a coffee ring on one sheet, a tea splash on another.
const stainOf = (sheet: number) => {
  const turn = (index * 47 + sheet * 31) % 360
  if ((index + sheet) % 3 === 0) return { kind: 'coffee' as const, top: `${8 + (index * 13) % 40}%`, left: `${55 + (index * 7) % 30}%`, size: 'clamp(130px, 22vw, 210px)', turn, seed: index + sheet }
  if ((index + sheet) % 5 === 1) return { kind: 'tea' as const, top: `${40 + (index * 11) % 40}%`, left: `${(index * 17) % 60}%`, size: 'clamp(110px, 18vw, 180px)', turn, seed: index + sheet }
  return undefined
}
definePageMeta({ pageTransition: { name: 'case-turn', mode: 'out-in' } })
const portraits = [artist.person, ...artist.coAuthors].filter((person): person is NonNullable<typeof person> & { photo: string } => !!person?.photo)
const links = [...(artist.person?.links ?? []), ...artist.coAuthors.flatMap(person => person.links ?? [])]
// ← and → leaf through the files, as in a drawer.
const router = useRouter()
function leaf(event: KeyboardEvent) {
  if (event.target instanceof HTMLElement && /input|textarea|select/i.test(event.target.tagName)) return
  if (event.key === 'ArrowLeft') router.push(localePath(`/mytsi/${prev.slug}`))
  if (event.key === 'ArrowRight') router.push(localePath(`/mytsi/${next.slug}`))
}
onMounted(() => window.addEventListener('keydown', leaf))
onBeforeUnmount(() => window.removeEventListener('keydown', leaf))
// Keep the open file's tab in view in the sideways row on phones.
onMounted(() => document.querySelector('.case-tabs__tab.is-open')?.scrollIntoView({ inline: 'center', block: 'nearest' }))
const caseNo = computed(() => `${t('Особова справа', 'Personal file')} № ${String(index + 1).padStart(2, '0')}`)
</script>

<template>
  <article class="docs-container docs-page">
    <nav class="crumbs" :aria-label="t('Навігація', 'Navigation')">
      <NuxtLink class="case-back" :to="localePath('/mytsi')"><span aria-hidden="true">←</span> {{ t('Усі митці', 'All artists') }}</NuxtLink>
      <span class="case-count">{{ t('Справа', 'File') }} {{ index + 1 }} {{ t('з', 'of') }} {{ exhibitionArtists.length }}</span>
    </nav>
    <header class="case-cover">
      <DocsStain v-if="index % 3 === 1" kind="coffee" :seed="index" class="case-cover__stain" />
      <!-- The cabinet: a tab for every file, the open one joined to its folder; any tab opens that file. -->
      <nav class="case-tabs" :aria-label="t('Особові справи митців', 'Artists’ personal files')">
        <NuxtLink v-for="(other, otherIndex) in exhibitionArtists" :key="other.slug" :to="localePath(`/mytsi/${other.slug}`)" class="case-tabs__tab" :class="{ 'is-open': other.slug === artist.slug }" :title="artistName(other, isEn)" :aria-current="other.slug === artist.slug ? 'page' : undefined" :style="{ '--n': otherIndex }">
          <span class="case-tabs__no"><template v-if="other.slug === artist.slug">№ </template>{{ String(otherIndex + 1).padStart(2, '0') }}</span>
          <span class="case-tabs__name">{{ artistName(other, isEn) }}</span>
        </NuxtLink>
      </nav>
      <div class="case-cover__label">
        <p class="case-cover__kind">{{ t('Особова справа', 'Personal file') }} · {{ t('Покажіть свої документи…', 'May I See Your Documents…') }}</p>
        <div class="case-cover__grid">
          <div v-if="portraits.length" class="case-cover__photos" :class="{ 'is-duo': portraits.length > 1 }">
            <figure v-for="person in portraits" :key="person.slug" class="case-cover__photo">
              <MediaImg :src="person.photo!" :alt="personName(person)" />
              <span class="case-cover__clip" aria-hidden="true" />
            </figure>
          </div>
          <dl class="case-cover__fields">
            <div class="case-cover__name"><dt>{{ t('Прізвище, ім’я', 'Name') }}</dt><dd><h1>{{ displayArtist.name }}</h1></dd></div>
            <div><dt>{{ displayArtist.works.length > 1 ? t('Роботи', 'Works') : t('Робота', 'Work') }}</dt><dd>{{ displayArtist.works.map(work => `«${work.title}»`).join(', ') }}</dd></div>
            <div><dt>{{ t('Статус', 'Status') }}</dt><dd>{{ artist.coAuthors.length ? t('Митці виставки', 'Artists of the exhibition') : t('Митець виставки', 'Artist of the exhibition') }}</dd></div>
            <div><dt>{{ t('Аркушів', 'Sheets') }}</dt><dd>{{ sheetCount }}</dd></div>
            <div v-if="links.length"><dt>{{ t('Посилання', 'Links') }}</dt><dd class="case-cover__social"><a v-for="link in links" :key="link.url" :href="link.url" target="_blank" rel="noreferrer">{{ isEn && link.label === 'Сайт' ? 'Website' : link.label }}</a></dd></div>
          </dl>
        </div>
        <p class="case-cover__links">
          <a v-if="!artist.coAuthors.length" class="docs-button" :href="symbolPersonUrl(artist.slug, isEn)">{{ t('Сторінка на symbol.ngo', 'Profile on symbol.ngo') }}</a>
          <!-- A shared file: one button per author, each named, alike. -->
          <a v-for="person in artist.coAuthors.length ? portraits : []" :key="person.slug" class="docs-button" :href="symbolPersonUrl(person.slug, isEn)">{{ personName(person).replace(/\s*\(.*\)$/, '') }} · symbol.ngo</a>
        </p>
      </div>
    </header>

    <div class="case-papers">
      <DocsSheet :case-no="caseNo" :kind="t('Біографія', 'Biography')" :sheet="1" :tilt="-0.3" :stain="stainOf(1)">
        <div class="docs-text"><p v-for="paragraph in displayArtist.bio" :key="paragraph">{{ paragraph }}</p></div>
      </DocsSheet>

      <!-- Sai and Azla have two independent work files inside their personal file: each keeps its text and photos together,
           and the folder tabs switch between them. -->
      <section v-if="separateWorkFiles" class="work-files">
        <div ref="workTabs" class="work-files__tabs" role="tablist" :aria-label="t('Файли робіт', 'Work files')">
          <button
            v-for="(file, workIndex) in workFiles"
            :id="`work-tab-${workIndex}`"
            :key="file.work.title"
            type="button"
            role="tab"
            class="work-file__tab"
            :class="{ 'is-active': activeWork === workIndex }"
            :aria-selected="activeWork === workIndex"
            aria-controls="work-file-panel"
            @click="activeWork = workIndex"
          >
            <span>{{ t('Файл роботи', 'Work file') }} {{ String(workIndex + 1).padStart(2, '0') }}</span>
            <strong>«{{ file.work.title }}»</strong>
          </button>
        </div>
        <Transition name="work-file" mode="out-in">
        <div v-if="openFile" id="work-file-panel" :key="openFile.work.title" class="work-file" role="tabpanel" :aria-labelledby="`work-tab-${activeWork}`">
          <DocsSheet :case-no="caseNo" :doc-no="`${t('Робота', 'Work')}${openFile.work.year ? ` · ${openFile.work.year}` : ''}`" :kind="t('Кураторський текст', 'Curatorial text')" :sheet="activeWork * 2 + 2" :tilt="activeWork % 2 ? -0.25 : 0.25" :stain="stainOf(activeWork * 2 + 2)">
            <h2 class="case-work">«{{ openFile.work.title }}»</h2>
            <div class="docs-text"><p v-for="paragraph in openFile.work.text" :key="paragraph">{{ paragraph }}</p></div>
          </DocsSheet>
          <DocsSheet v-if="openFile.photos.length" :case-no="caseNo" :doc-no="t('Файл роботи', 'Work file')" :kind="t('Фотографії роботи', 'Photographs of the work')" :sheet="activeWork * 2 + 3" :tilt="activeWork % 2 ? 0.15 : -0.15">
            <h3 class="case-work">«{{ openFile.work.title }}»</h3>
            <DocsPhotoGallery class="case-photos" :photos="openFile.photos" />
            <p v-if="photoCredits(openFile.photos).length" class="case-credits">{{ t('Фото', 'Photos') }}: {{ photoCredits(openFile.photos).join(', ') }}</p>
          </DocsSheet>
          <button v-for="(other, otherIndex) in workFiles" v-show="otherIndex !== activeWork" :key="other.work.title" type="button" class="work-files__next" @click="openWork(otherIndex)">
            {{ t('Інший файл роботи', 'Other work file') }}: <strong>«{{ other.work.title }}»</strong>
          </button>
        </div>
        </Transition>
      </section>

      <template v-else>
        <DocsSheet v-for="(work, workIndex) in displayArtist.works" :key="work.title" :case-no="caseNo" :doc-no="`${t('Робота', 'Work')}${work.year ? ` · ${work.year}` : ''}`" :kind="t('Кураторський текст', 'Curatorial text')" :sheet="workIndex + 2" :tilt="workIndex % 2 ? -0.25 : 0.25" :stain="stainOf(workIndex + 2)">
          <h2 class="case-work">«{{ work.title }}»</h2>
          <div class="docs-text"><p v-for="paragraph in work.text" :key="paragraph">{{ paragraph }}</p></div>
        </DocsSheet>

        <DocsSheet v-if="photos.length" :case-no="caseNo" :kind="t('Додаток: фотографії робіт', 'Appendix: photographs of the works')" :sheet="displayArtist.works.length + 2" :tilt="0.15">
          <h3 class="case-work">«{{ photoGroups[0]?.title }}»</h3>
          <DocsPhotoGallery class="case-photos" :photos="photos" />
          <p v-if="credits.length" class="case-credits">{{ t('Фото', 'Photos') }}: {{ credits.join(', ') }}</p>
        </DocsSheet>
      </template>
    </div>

    <nav class="pager" :aria-label="t('Інші митці', 'Other artists')">
      <NuxtLink :to="localePath(`/mytsi/${prev.slug}`)"><span class="docs-label">← {{ t('Попередній', 'Previous') }}</span><span>{{ artistName(prev, isEn) }}</span></NuxtLink>
      <NuxtLink class="pager__next" :to="localePath(`/mytsi/${next.slug}`)"><span class="docs-label">{{ t('Наступний', 'Next') }} →</span><span>{{ artistName(next, isEn) }}</span></NuxtLink>
    </nav>
  </article>
</template>

<style scoped>
.crumbs { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 40px; }
/* Back to all artists: an ink tab like a folder divider, clearly a button. */
.case-back { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px 9px; background: var(--docs-ink); color: var(--docs-paper); font-family: var(--docs-display); font-size: 1.25rem; line-height: 1; text-transform: uppercase; text-decoration: none; box-shadow: 5px 5px 0 var(--docs-stamp); transition: transform .2s ease, box-shadow .2s ease; }
.case-back:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--docs-stamp); }
.case-back span { font-family: var(--docs-mono); font-size: 1.1rem; transition: transform .2s ease; }
.case-back:hover span { transform: translateX(-4px); }
.case-count { font-family: var(--docs-mono); font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
/* The folder: manila cover with a tab, a pasted label with the case fields and the clipped 3×4 portrait. */
.case-cover__stain { top: -30px; right: 6%; width: clamp(120px, 18vw, 190px); height: clamp(120px, 18vw, 190px); z-index: 1; transform: rotate(40deg); }
.case-cover { position: relative; padding: clamp(20px, 3vw, 36px); background: var(--docs-folder); border-radius: 0 6px 6px 6px; box-shadow: 0 2px 0 color-mix(in srgb, var(--docs-ink) 18%, transparent); }
.case-cover { margin-top: 64px; }
/* The tabs of all files stand along the top edge, the further ones a shade darker; the open file's tab is part of
   its folder. They scroll sideways on phones. */
.case-tabs { position: absolute; left: 0; right: 0; bottom: 100%; display: flex; align-items: flex-end; gap: 2px; }
/* All tabs fit in one row: closed tabs share the width and show the number; the open one is wider and shows the name. */
.case-tabs__tab { flex: 1 1 0; min-width: 0; display: grid; gap: 1px; padding: 6px 6px 5px; border-radius: 6px 6px 0 0; background: color-mix(in srgb, var(--docs-folder) 78%, var(--docs-ink)); color: var(--docs-ink); text-decoration: none; text-align: center; transform: translateY(5px); transition: transform .25s ease, flex-grow .35s ease, background .2s ease; overflow: hidden; }
.case-tabs__tab:nth-child(even) { background: color-mix(in srgb, var(--docs-folder) 88%, var(--docs-ink)); }
.case-tabs__tab:hover, .case-tabs__tab:focus-visible { transform: translateY(0); background: var(--docs-folder); }
.case-tabs__tab.is-open { flex-grow: 4; background: var(--docs-folder); transform: none; padding-bottom: 8px; text-align: left; padding-inline: 12px; }
.case-tabs__no { font-family: var(--docs-mono); font-size: .66rem; letter-spacing: .06em; white-space: nowrap; overflow: hidden; text-overflow: clip; }
.case-tabs__name { display: none; font-family: var(--docs-display); font-size: .82rem; text-transform: uppercase; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.case-tabs__tab.is-open .case-tabs__name { display: block; }
.case-cover__social { display: flex; flex-wrap: wrap; gap: 6px 16px; }
.case-cover__social a { color: inherit; text-underline-offset: 3px; }
.case-cover__label { padding: clamp(16px, 2.6vw, 28px); background: var(--docs-sheet); border: 1px solid var(--docs-ink); }
.case-cover__kind { margin: 0 0 16px; padding-bottom: 10px; border-bottom: 2px solid var(--docs-ink); font-family: var(--docs-mono); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; }
.case-cover__grid { display: grid; grid-template-columns: minmax(120px, 210px) minmax(0, 1fr); gap: clamp(16px, 3vw, 36px); align-items: start; }
.case-cover__photos { display: grid; }
@media (min-width: 761px) { .case-cover__grid:has(.is-duo) { grid-template-columns: minmax(200px, 340px) minmax(0, 1fr); } }
.case-cover__photos.is-duo { grid-template-columns: 1fr 1fr; gap: 8px; }
.case-cover__photos.is-duo .case-cover__photo:last-child { transform: rotate(2.5deg) translateY(10px); }
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
.work-files { margin: 28px 0 44px; }
/* Folder tabs: the open file's tab joins its folder, the other one sits a step lower, behind. */
.work-files__tabs { display: flex; gap: 6px; align-items: flex-end; position: relative; z-index: 1; margin-bottom: -2px; }
.work-file { display: grid; position: relative; padding: 28px 14px 14px; border: 2px solid color-mix(in srgb, var(--docs-ink) 42%, transparent); background: color-mix(in srgb, var(--docs-folder) 56%, transparent); }
.work-file-enter-active, .work-file-leave-active { transition: opacity .22s ease, transform .3s cubic-bezier(.3, 1, .4, 1); }
.work-file-enter-from { opacity: 0; transform: translateY(14px) rotate(.4deg); }
.work-file-leave-to { opacity: 0; transform: translateY(-8px); }
.work-file__tab { display: flex; align-items: baseline; gap: 14px; min-width: 0; padding: 8px 16px 6px; border: 2px solid color-mix(in srgb, var(--docs-ink) 42%, transparent); border-bottom: 0; background: color-mix(in srgb, var(--docs-folder) 70%, var(--docs-paper)); color: color-mix(in srgb, var(--docs-ink) 60%, transparent); font-family: var(--docs-mono); text-transform: uppercase; cursor: pointer; transform: translateY(5px); transition: transform .25s cubic-bezier(.3, 1.3, .5, 1), background .2s ease, color .2s ease; }
.work-file__tab:hover { transform: translateY(1px); color: var(--docs-ink); }
.work-file__tab.is-active { background: var(--docs-folder); color: var(--docs-ink); transform: none; padding-bottom: 8px; cursor: default; }
.work-files__next { justify-self: end; margin-top: 10px; padding: 10px 14px; border: 2px solid var(--docs-ink); background: var(--docs-sheet); color: var(--docs-ink); font-family: var(--docs-mono); font-size: .78rem; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; box-shadow: 4px 4px 0 var(--docs-stamp); transition: transform .2s ease, box-shadow .2s ease; }
.work-files__next strong { font-family: var(--docs-display); font-weight: 400; font-size: 1rem; }
.work-files__next:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--docs-stamp); }
.work-file__tab span { font-size: .68rem; letter-spacing: .09em; white-space: nowrap; }
.work-file__tab strong { overflow: hidden; font-family: var(--docs-display); font-size: 1.05rem; line-height: 1; text-overflow: ellipsis; white-space: nowrap; }
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
  /* Phones: one sideways row of numbered tabs that keeps the open file in view; less padding everywhere. */
  .crumbs { margin-bottom: 30px; }
  .case-back { font-size: .95rem; padding: 9px 12px 7px; box-shadow: 3px 3px 0 var(--docs-stamp); }
  .case-count { font-size: .66rem; }
  .case-cover { margin-top: 34px; padding: 10px; }
  .case-cover__label { padding: 14px; }
  .case-tabs { overflow-x: auto; scrollbar-width: none; padding-top: 6px; }
  .case-tabs::-webkit-scrollbar { display: none; }
  .case-tabs__tab { flex: 0 0 34px; padding: 5px 0 4px; transform: none; }
  .case-tabs__tab.is-open { flex: 0 0 auto; padding: 5px 10px 6px; }
  .case-tabs__tab.is-open .case-tabs__name { display: none; }
  .case-cover__photos { width: 56%; max-width: 220px; }
  .case-cover__photos.is-duo { width: 80%; max-width: 320px; }
  .work-file { padding: 18px 6px 6px; }
  .work-file__tab { flex: 1 1 0; flex-direction: column; gap: 2px; padding-inline: 10px; }
  .work-files__next { justify-self: stretch; }
  .work-file__tab strong { font-size: .9rem; }
}
</style>
