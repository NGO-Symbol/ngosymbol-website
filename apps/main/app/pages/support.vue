<script setup lang="ts">
useSeoMeta({ title: 'Доєднатися і підтримати', description: 'Як підтримати ГО «Символ»: внески, меценатство, партнерство, волонтерство.' })

const route = useRoute()
const tab = ref<'patron' | 'community'>(route.hash === '#community' ? 'community' : 'patron')

// Bank details are not confirmed yet (documents/knowledge/open-questions.md). Donations go only to an account of the NGO.
const requisites = [
  { label: 'Отримувач', value: 'ГО «Символ»' },
  { label: 'ЄДРПОУ', value: '45221328' },
  { label: 'IBAN (UAH)', value: 'уточнюється' },
  { label: 'Призначення платежу', value: 'Благодійний внесок на статутну діяльність' }
]

const copied = ref('')
async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = value
    setTimeout(() => (copied.value = ''), 1600)
  } catch {}
}
</script>

<template>
  <section class="page container support-page">
    <div class="page-title page-title--wide">
      <span class="eyebrow">Доєднатися і підтримати</span>
      <h1>Станьте частиною «Символу»</h1>
    </div>

    <div class="support-why">
      <h2>Чому варто підтримати нас</h2>
      <div class="values">
        <div><h3>Мистецтво як підтримка</h3><p>Плейбек-театр, виставки й кіно, які працюють із досвідом людей, а не лише з естетикою.</p></div>
        <div><h3>Харків і не тільки</h3><p>Працюємо з міською пам’яттю Харкова, а також у Києві, на Закарпатті й за кордоном.</p></div>
        <div><h3>Психічне здоров’я</h3><p>Навчаємо фахівців і створюємо простори, де про психічне здоров’я говорять уважно.</p></div>
        <div><h3>Прозорість</h3><p>Публікуємо звіти й називаємо партнерів і донорів кожного проєкту.</p></div>
      </div>
    </div>

    <div class="segmented segmented--large" role="tablist" aria-label="Спосіб участі">
      <button id="tab-patron" type="button" role="tab" :aria-selected="tab === 'patron'" :class="{ active: tab === 'patron' }" @click="tab = 'patron'">Стати меценатом</button>
      <button id="tab-community" type="button" role="tab" :aria-selected="tab === 'community'" :class="{ active: tab === 'community' }" @click="tab = 'community'">Доєднатися до спільноти</button>
    </div>

    <div v-if="tab === 'patron'" class="support-options" role="tabpanel" aria-labelledby="tab-patron">
      <div class="support-option"><h3>Разовий внесок</h3><p>Будь-яка сума на статутну діяльність організації.</p></div>
      <div class="support-option"><h3>Регулярна підтримка</h3><p>Щомісячний внесок, який дає змогу планувати проєкти наперед. Рівні меценатства готуються.</p></div>
      <div class="support-option"><h3>Підтримати проєкт</h3><p>Внесок на конкретний проєкт, наприклад «Історію моєї вулиці».</p></div>
      <div class="support-option"><h3>Корпоративне партнерство</h3><p>Спонсорство проєкту чи події з видимістю вашої компанії. Напишіть нам: <span class="selectable">ngo.symbol@gmail.com</span></p></div>
    </div>

    <div v-else id="community" class="support-options" role="tabpanel" aria-labelledby="tab-community">
      <div class="support-option"><h3>Волонтерство</h3><p>Допомога на виставках, подіях і фестивалях. Відкриті набори — у розділі <NuxtLink to="/opportunities">Можливості</NuxtLink>.</p></div>
      <div class="support-option"><h3>Членство в ГО</h3><p>Для тих, хто хоче розвивати організацію разом із командою.</p></div>
      <div class="support-option"><h3>Інформаційна підтримка</h3><p>Розкажіть про наші проєкти й події. Підписка на календар: <a href="/events.ics">events.ics</a></p></div>
    </div>

    <section class="requisites">
      <span class="label">Реквізити</span>
      <dl>
        <div v-for="item in requisites" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>
            <span class="selectable">{{ item.value }}</span>
            <button v-if="item.value !== 'уточнюється'" type="button" class="text-button" @click="copy(item.value)">{{ copied === item.value ? 'Скопійовано' : 'Скопіювати' }}</button>
          </dd>
        </div>
      </dl>
      <p class="footer-small">Оплата карткою на сайті й валютні реквізити з’являться після налаштування рахунку організації.</p>
    </section>
  </section>
</template>
