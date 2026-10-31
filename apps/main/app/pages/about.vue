<script setup lang="ts">
import { peopleEn } from '~/data/people-en'
import { projectsEn } from '~/data/projects-en'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
const displayName = (person: (typeof people)[number]) => isEn.value ? peopleEn[person.slug]?.name ?? person.name : person.name
const displayRole = (person: (typeof people)[number]) => isEn.value ? peopleEn[person.slug]?.teamRole ?? peopleEn[person.slug]?.shortBio ?? person.teamRole ?? '' : person.teamRole ?? person.shortBio ?? ''
useSeoMeta({ title: () => t('Про нас', 'About us'), description: () => t('ГО «Символ»: місія, цінності, команда, партнери й звіти.', 'NGO Symbol: mission, values, team, partners, and reporting.') })

const team = people.filter(person => person.team).sort((a, b) => (a.teamOrder ?? 99) - (b.teamOrder ?? 99))
const supporters = organizations
  .map(org => ({
    org,
    projects: projects.filter(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug))
  }))
  .filter(item => item.projects.length)
  .sort((a, b) => bySignificance(a.org.slug, b.org.slug))
</script>

<template>
  <section class="page container">
    <Breadcrumbs />
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ t('ГО «Символ»', 'NGO Symbol') }}</span>
      <h1>{{ t('Незалежна організація про культуру, мистецтво й уважність', 'An independent organisation for culture, art, and attentive care') }}</h1>
    </div>

    <div class="about-grid">
      <div>
        <span class="label">{{ t('Місія', 'Mission') }}</span>
        <p class="large-copy">{{ t('Розвиваємо сучасну українську культуру і мистецтво та сприяємо уважному ставленню до психічного здоров’я.', 'We develop contemporary Ukrainian culture and art and promote attentive care for mental health.') }}</p>
      </div>
      <div>
        <span class="label">{{ t('Працюємо', 'Where we work') }}</span>
        <p>{{ t('Харків · Київ · Закарпаття', 'Kharkiv · Kyiv · Zakarpattia') }}</p>
        <p>{{ t('Прагнемо працювати по всій Україні та створювати проєкти за кордоном.', 'We aim to work throughout Ukraine and create international projects.') }}</p>
      </div>
    </div>

    <StatsCounters />

    <section class="section section--tight">
      <div class="section-heading">
        <div><span class="label">{{ t('Цінності', 'Values') }}</span><h2>{{ t('Мистецтво, яке говорить з людьми', 'Art that speaks with people') }}</h2></div>
      </div>
      <div class="values">
        <div><h3>{{ t('Молодь для молоді', 'Young people for young people') }}</h3><p>{{ t('Більшість команди — молоде покоління українців, яке прагне структурних змін.', 'Most of our team belongs to a young generation of Ukrainians seeking structural change.') }}</p></div>
        <div><h3>{{ t('Нічого про нас без нас', 'Nothing about us without us') }}</h3><p>{{ t('Залучаємо людей до рішень, які їх стосуються.', 'We involve people in decisions that affect them.') }}</p></div>
        <div><h3>{{ t('Діалог, а не елітарність', 'Dialogue, not elitism') }}</h3><p>{{ t('Поєднуємо художні практики з психоедукаційними та правопросвітницькими форматами.', 'We combine artistic practices with psychoeducation and human-rights education.') }}</p></div>
      </div>
    </section>

    <section id="team" class="section section--tight">
      <div class="section-heading">
        <div><span class="label">{{ t('Постійна команда', 'Core team') }}</span><h2>{{ t('Люди «Символу»', 'People of Symbol') }}</h2></div>
        <p>{{ t('Команди окремих проєктів — на сторінках проєктів.', 'Individual project teams are listed on their project pages.') }} <NuxtLink class="text-link" :to="isEn ? '/en/people' : '/people'">{{ t('Усі люди', 'Everyone') }} →</NuxtLink></p>
      </div>
      <div class="team-list">
        <NuxtLink v-for="(person, index) in team" :key="person.slug" :to="`/people/${person.slug}`">
          <MediaImg v-if="person.photo" class="team-photo" :src="person.photo" :alt="displayName(person)" loading="lazy" />
          <span v-else>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ displayName(person) }}</strong>
          <p>{{ displayRole(person) }}</p>
        </NuxtLink>
      </div>
    </section>

    <section id="partners" class="section section--tight">
      <div class="section-heading">
        <div><span class="label">{{ t('Партнери й донори', 'Partners and donors') }}</span><h2>{{ t('З ким ми працюємо', 'Who we work with') }}</h2></div>
      </div>
      <PartnerTiles :items="supporters" compact />
    </section>

    <section id="press" class="section section--tight">
      <div class="section-heading">
        <div><span class="label">{{ t('Медіа', 'Media') }}</span><h2>{{ t('Про нас пишуть', 'Coverage of our work') }}</h2></div>
        <p>{{ t('Згадки в медіа зібрані й на сторінках відповідних проєктів.', 'Media mentions are also collected on the relevant project pages.') }}</p>
      </div>
      <ul class="press-list">
        <li v-for="item in press" :key="item.url">
          <a :href="item.url" target="_blank" rel="noreferrer" :lang="originalLang(item.outlet + item.title, isEn)"><strong>{{ item.outlet }}</strong> — {{ item.title }}</a>
          <span>
            <template v-for="(slug, index) in item.projects" :key="slug">
              <NuxtLink :to="`/projects/${slug}`">{{ isEn ? projectsEn[slug]?.title ?? getProject(slug)?.title : getProject(slug)?.title }}</NuxtLink><template v-if="index < item.projects.length - 1">, </template>
            </template>
          </span>
        </li>
      </ul>
    </section>

    <section class="section section--tight">
      <div class="section-heading">
        <div><span class="label">{{ t('Прозорість', 'Transparency') }}</span><h2>{{ t('Звіти й документи', 'Reports and documents') }}</h2></div>
        <p>{{ t('Для кожного донорського проєкту ми готуємо фінансові й описові звіти та подаємо державну звітність. Публічні звіти, статут і політики з’являться тут після погодження.', 'For every donor-funded project, we prepare financial and narrative reports and submit statutory reporting. Public reports, our charter, and policies will appear here after approval.') }}</p>
      </div>
      <dl class="facts facts--inline">
        <div><dt>{{ t('Повна назва', 'Legal name') }}</dt><dd><CopyValue :value="t('Громадська організація «Символ»', 'Non-governmental organisation Symbol')" /></dd></div>
        <div><dt>{{ t('ЄДРПОУ', 'Registration code (EDRPOU)') }}</dt><dd><CopyValue value="45221328" /></dd></div>
        <div><dt>{{ t('Зареєстровано', 'Registered') }}</dt><dd>{{ t('11 жовтня 2023, Харків', '11 October 2023, Kharkiv') }}</dd></div>
      </dl>
    </section>
  </section>
</template>
