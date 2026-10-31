<script setup lang="ts">
import { psdPeopleEn } from '~/data/psd-artists-en'
import { peopleEn } from '~/data/people-en'
import { projectsEn } from '~/data/projects-en'

const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
const displayName = (person: (typeof people)[number]) => isEn.value ? (psdPeopleEn[person.slug]?.name ?? peopleEn[person.slug]?.name ?? person.name) : person.name
const displayTeamRole = (person: (typeof people)[number]) => isEn.value ? peopleEn[person.slug]?.teamRole ?? person.teamRole : person.teamRole
const appearanceName = (item: { title: string; to: string }) => {
  if (!isEn.value) return item.title
  const slug = item.to.match(/\/projects\/([^/]+)/)?.[1]
  return slug ? projectsEn[slug]?.title ?? item.title : item.title
}
useSeoMeta({ title: () => t('Люди', 'People'), description: () => t('Митці, куратори, лектори й команда проєктів ГО «Символ».', 'Artists, curators, educators and the teams behind NGO Symbol projects.') })

const query = ref('')
const listed = computed(() => people
  .filter(person => person.hasPage !== false)
  .map(person => ({ person, appearances: appearancesOf(person.slug) }))
  .sort((a, b) => displayName(a.person).localeCompare(displayName(b.person), isEn.value ? 'en' : 'uk')))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? listed.value.filter(({ person }) => displayName(person).toLowerCase().includes(q)) : listed.value
})
// The Symbol team comes first (in its own order), then everyone who took part in the projects.
const groups = computed(() => [
  { key: 'team', label: t('Постійна команда', 'Core team'), title: t('Команда «Символу»', 'NGO Symbol team'), items: visible.value.filter(({ person }) => person.team).sort((a, b) => (a.person.teamOrder ?? 99) - (b.person.teamOrder ?? 99)) },
  { key: 'participants', label: t('Митці, куратори, автори', 'Artists, curators, authors'), title: t('Учасники проєктів', 'Project participants'), items: visible.value.filter(({ person }) => !person.team) }
].filter(group => group.items.length))

// The search hint names a different artist on every visit (never the same twice in a row).
const hint = ref(t('Наприклад, Маков', 'For example, Makov'))
onMounted(() => {
  const artists = listed.value.filter(({ person, appearances }) => !person.team && appearances.length).map(({ person }) => displayName(person).replace(/\s*\(.*\)$/, ''))
  if (!artists.length) return
  let last = ''
  try { last = localStorage.getItem('symbol-people-hint') ?? '' } catch {}
  const pool = artists.length > 1 ? artists.filter(name => name !== last) : artists
  const name = pool[Math.floor(Math.random() * pool.length)]!
  try { localStorage.setItem('symbol-people-hint', name) } catch {}
  hint.value = `${t('Наприклад', 'For example')}, ${name}`
})

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: t('Люди', 'People') }]" />
    <div class="page-title">
      <span class="eyebrow">{{ t('Автори · митці · команда', 'Authors · artists · team') }}</span>
      <h1>{{ t('Люди', 'People') }}</h1>
      <p>{{ t('Усі, хто створював проєкти «Символу». На сторінці кожної людини — проєкти, у яких вона брала участь.', 'Everyone behind NGO Symbol projects. Each profile lists the projects in which the person took part.') }}</p>
    </div>
    <label class="search">
      <span class="label">{{ t('Пошук за ім’ям', 'Search by name') }}</span>
      <input id="people-search" v-model="query" type="search" :placeholder="hint">
    </label>
    <section v-for="group in groups" :key="group.key" class="people-group" :aria-labelledby="`people-${group.key}`">
      <div class="section-heading">
        <div><span class="label">{{ group.label }}</span><h2 :id="`people-${group.key}`">{{ group.title }}</h2></div>
      </div>
      <ul class="people-grid" :class="{ 'people-grid--team': group.key === 'team' }">
        <li v-for="{ person, appearances } in group.items" :key="person.slug">
          <NuxtLink class="person-card" :class="{ 'person-card--team': person.team }" :to="`/people/${person.slug}`">
            <MediaImg v-if="person.photo" class="person-card__avatar person-card__avatar--photo" :src="person.photo" :alt="displayName(person)" loading="lazy" />
            <span v-else class="person-card__avatar" aria-hidden="true">{{ initials(displayName(person)) }}</span>
            <span class="person-card__name">{{ displayName(person) }}</span>
            <span v-if="person.team && displayTeamRole(person)" class="person-card__team">{{ displayTeamRole(person) }}</span>
            <span class="person-card__projects">{{ appearances.map(appearanceName).join(' · ') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
    <p v-if="!groups.length" class="people-empty">{{ t('Нікого не знайшли. Спробуйте інше ім’я.', 'No one found. Try another name.') }}</p>
  </section>
</template>
