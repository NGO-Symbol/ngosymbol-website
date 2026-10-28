<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'curtain', mode: 'out-in' } })
useSeoMeta({ title: 'Про нас', description: 'ГО «Символ»: місія, цінності, команда, партнери й звіти.' })

const team = people.filter(person => person.team).sort((a, b) => (a.teamOrder ?? 99) - (b.teamOrder ?? 99))
const supporters = organizations
  .map(org => ({
    org,
    projects: projects.filter(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug))
  }))
  .filter(item => item.projects.length)
</script>

<template>
  <section class="page container">
    <div class="page-title page-title--wide">
      <span class="eyebrow">ГО «Символ»</span>
      <h1>Незалежна організація про культуру, мистецтво й уважність</h1>
    </div>

    <div class="about-grid">
      <div>
        <span class="label">Місія</span>
        <p class="large-copy">Розвиваємо сучасну українську культуру і мистецтво та сприяємо уважному ставленню до психічного здоров’я.</p>
      </div>
      <div>
        <span class="label">Працюємо</span>
        <p>Харків · Київ · Закарпаття</p>
        <p>Прагнемо працювати по всій Україні та створювати проєкти за кордоном.</p>
      </div>
    </div>

    <section class="section section--tight">
      <div class="section-heading">
        <div><span class="label">Цінності</span><h2>Мистецтво, яке говорить з людьми</h2></div>
      </div>
      <div class="values">
        <div><h3>Молодь для молоді</h3><p>Більшість команди — молоде покоління українців, яке прагне структурних змін.</p></div>
        <div><h3>Нічого про нас без нас</h3><p>Залучаємо людей до рішень, які їх стосуються.</p></div>
        <div><h3>Діалог, а не елітарність</h3><p>Поєднуємо художні практики з психоедукаційними та правопросвітницькими форматами.</p></div>
      </div>
    </section>

    <section id="team" class="section section--tight">
      <div class="section-heading">
        <div><span class="label">Постійна команда</span><h2>Люди «Символу»</h2></div>
        <p>Команди окремих проєктів — на сторінках проєктів. <NuxtLink class="text-link" to="/people">Усі люди →</NuxtLink></p>
      </div>
      <div class="team-list">
        <NuxtLink v-for="(person, index) in team" :key="person.slug" :to="`/people/${person.slug}`">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ person.name }}</strong>
          <p>{{ person.teamRole ?? person.shortBio ?? '' }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="section section--tight">
      <div class="section-heading">
        <div><span class="label">Партнери й донори</span><h2>З ким ми працюємо</h2></div>
      </div>
      <ul class="press-list">
        <li v-for="{ org, projects: list } in supporters" :key="org.slug">
          <strong>{{ org.name }}</strong>
          <span>
            <template v-for="(project, index) in list" :key="project.slug">
              <NuxtLink :to="`/projects/${project.slug}`">{{ project.title }}</NuxtLink><template v-if="index < list.length - 1">, </template>
            </template>
          </span>
        </li>
      </ul>
    </section>

    <section class="section section--tight">
      <div class="section-heading">
        <div><span class="label">Прозорість</span><h2>Звіти й документи</h2></div>
        <p>Публічні звіти, статут і політики організації з’являться тут після погодження.</p>
      </div>
      <dl class="facts facts--inline">
        <div><dt>Повна назва</dt><dd>Громадська організація «Символ»</dd></div>
        <div><dt>ЄДРПОУ</dt><dd>45221328</dd></div>
        <div><dt>Зареєстровано</dt><dd>11 жовтня 2023, Харків</dd></div>
      </dl>
    </section>
  </section>
</template>
