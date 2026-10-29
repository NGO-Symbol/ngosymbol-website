<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'blur', mode: 'out-in' } })
useSeoMeta({ title: 'Люди', description: 'Митці, куратори, лектори й команда проєктів ГО «Символ».' })

const query = ref('')
const listed = people
  .filter(person => person.hasPage !== false)
  .map(person => ({ person, appearances: appearancesOf(person.slug) }))
  .sort((a, b) => a.person.name.localeCompare(b.person.name, 'uk'))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? listed.filter(({ person }) => person.name.toLowerCase().includes(q)) : listed
})

// The search hint names a different artist on every visit (never the same twice in a row).
const hint = ref('Наприклад, Маков')
onMounted(() => {
  const artists = listed.filter(({ person, appearances }) => !person.team && appearances.length).map(({ person }) => person.name.replace(/\s*\(.*\)$/, ''))
  if (!artists.length) return
  let last = ''
  try { last = localStorage.getItem('symbol-people-hint') ?? '' } catch {}
  const pool = artists.length > 1 ? artists.filter(name => name !== last) : artists
  const name = pool[Math.floor(Math.random() * pool.length)]!
  try { localStorage.setItem('symbol-people-hint', name) } catch {}
  hint.value = `Наприклад, ${name}`
})

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: 'Люди' }]" />
    <div class="page-title">
      <span class="eyebrow">Автори · митці · команда</span>
      <h1>Люди</h1>
      <p>Усі, хто створював проєкти «Символу». На сторінці кожної людини — проєкти й події, у яких вона брала участь.</p>
    </div>
    <label class="search">
      <span class="label">Пошук за ім’ям</span>
      <input id="people-search" v-model="query" type="search" :placeholder="hint">
    </label>
    <ul class="people-grid">
      <li v-for="{ person, appearances } in visible" :key="person.slug">
        <NuxtLink class="person-card" :to="`/people/${person.slug}`">
          <img v-if="person.photo" class="person-card__avatar person-card__avatar--photo" :src="person.photo" alt="" loading="lazy">
          <span v-else class="person-card__avatar" aria-hidden="true">{{ initials(person.name) }}</span>
          <span class="person-card__name">{{ person.name }}</span>
          <span v-if="person.team" class="person-card__team">Команда «Символу»</span>
          <span class="person-card__projects">{{ appearances.map(item => item.title).join(' · ') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
