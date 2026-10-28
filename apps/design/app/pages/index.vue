<script setup lang="ts">
import { dsGrouped, dsSlug, dsEntries } from '~/ds/registry'
useHead({ title: 'Огляд' })
const groups = dsGrouped()
const stable = dsEntries.filter(e => e.status === 'stable').length
</script>
<template>
  <div class="ds-page">
    <header class="ds-head">
      <span class="eyebrow">NGO Symbol</span>
      <h1>Дизайн-система</h1>
      <p>Спільні токени, тони, рух і {{ dsEntries.length }} компонентів ({{ stable }} стабільних), з яких агенти складають сторінки однаково на десктопі й телефоні. Відкрийте з телефона: «Вигляд» угорі міняє тон, ширину сцени та рух.</p>
    </header>
    <DsSection title="Основи" description="Усе, з чого складаються компоненти.">
      <div class="ds-cards">
        <NuxtLink to="/foundations/colors"><b>Кольори й тони</b><span>Шість тонів, перевірений контраст</span></NuxtLink>
        <NuxtLink to="/foundations/typography"><b>Типографіка</b><span>Плавна шкала, кирилиця, довгі слова</span></NuxtLink>
        <NuxtLink to="/foundations/spacing"><b>Відступи й сітка</b><span>Плавні кроки, ширини, ритм</span></NuxtLink>
        <NuxtLink to="/foundations/motion"><b>Рух</b><span>Драбина тривалостей, поява, перехід</span></NuxtLink>
        <NuxtLink to="/foundations/responsive"><b>Телефон і десктоп</b><span>Точки, контейнерні запити, дотик</span></NuxtLink>
      </div>
    </DsSection>
    <DsSection title="Шаблони сторінок" description="Повні сторінки, зібрані лише з компонентів. Відкрийте на телефоні.">
      <div class="ds-cards">
        <NuxtLink to="/templates/home"><b>Головна</b><span>Герой, вибрані проєкти, заява</span></NuxtLink>
        <NuxtLink to="/templates/projects"><b>Проєкти</b><span>Фільтри й картки</span></NuxtLink>
        <NuxtLink to="/templates/project"><b>Сторінка проєкту</b><span>Факти, текст, команда, партнери</span></NuxtLink>
        <NuxtLink to="/templates/about"><b>Про нас</b><span>Місія, команда</span></NuxtLink>
        <NuxtLink to="/templates/contact"><b>Контакти</b><span>Тоновий екран</span></NuxtLink>
      </div>
    </DsSection>
    <DsSection v-for="g in groups" :key="g.id" :title="g.title">
      <div class="ds-cards"><NuxtLink v-for="e in g.items" :key="e.name" :to="`/components/${dsSlug(e)}`"><b>{{ e.title }}</b><span>{{ e.summary }}</span></NuxtLink></div>
    </DsSection>
  </div>
</template>
