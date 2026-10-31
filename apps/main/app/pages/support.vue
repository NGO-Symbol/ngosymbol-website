<script setup lang="ts">
const { isEn } = useLang()
useSeoMeta({ title: () => isEn.value ? 'Join and support us' : 'Доєднатися і підтримати', description: () => isEn.value ? 'Support NGO Symbol through donations, patronage, partnership, or volunteering.' : 'Як підтримати ГО «Символ»: внески, меценатство, партнерство, волонтерство.' })

const route = useRoute()
const tab = ref<'patron' | 'community'>(route.hash === '#community' ? 'community' : 'patron')

// Donations go only to an account of the NGO. The IBAN is left empty on purpose until the team adds it (2026-10-30).
const requisites = [
  { label: 'Отримувач', value: 'ГО «Символ»' },
  { label: 'ЄДРПОУ', value: '45221328' },
  { label: 'IBAN (UAH)', value: '' },
  { label: 'Банк', value: 'АТ КБ «ПриватБанк»' },
  { label: 'Призначення платежу', value: 'Благодійний внесок на статутну діяльність' }
]

</script>

<template>
  <section class="page container support-page">
    <template v-if="isEn">
      <Breadcrumbs />
      <div class="page-title page-title--wide"><span class="eyebrow">Join and support us</span><h1>Become part of Symbol</h1></div>
      <div class="support-why">
        <h2>Why support us</h2>
        <div class="values">
          <div><h3>Art as support</h3><p>Playback theatre, exhibitions, and films that engage with people’s lived experience, not only aesthetics.</p></div>
          <div><h3>Kharkiv and beyond</h3><p>We work with Kharkiv’s urban memory and create projects in Kyiv, Zakarpattia, and abroad.</p></div>
          <div><h3>Mental health</h3><p>We train professionals and create spaces where mental health is discussed with care.</p></div>
          <div><h3>Transparency</h3><p>We publish reports and name the partners and donors of every project.</p></div>
        </div>
      </div>
      <div class="segmented segmented--large" role="tablist" aria-label="Way to participate">
        <button id="tab-patron-en" type="button" role="tab" :aria-selected="tab === 'patron'" :class="{ active: tab === 'patron' }" @click="tab = 'patron'">Become a patron</button>
        <button id="tab-community-en" type="button" role="tab" :aria-selected="tab === 'community'" :class="{ active: tab === 'community' }" @click="tab = 'community'">Join the community</button>
      </div>
      <Transition name="swap" mode="out-in">
        <div v-if="tab === 'patron'" class="support-options" role="tabpanel" aria-labelledby="tab-patron-en">
          <div class="support-option"><h3>One-off donation</h3><p>Any amount supporting the organisation’s statutory activities.</p></div>
          <div class="support-option"><h3>Regular support</h3><p>A monthly contribution that helps us plan ahead. Patronage tiers are in development.</p></div>
          <div class="support-option"><h3>Support a project</h3><p>Contribute to a specific project, such as The Story of My Street.</p></div>
          <div class="support-option"><h3>Corporate partnership</h3><p>Sponsor a project or event and give your company meaningful visibility. Write to <span class="selectable">ngo.symbol@gmail.com</span>.</p></div>
        </div>
        <div v-else id="community" class="support-options" role="tabpanel" aria-labelledby="tab-community-en">
          <div class="support-option"><h3>Volunteer</h3><p>Help with exhibitions, events, and festivals: installation, welcoming guests, and documentation. Open calls are listed under <NuxtLink to="/en/opportunities">Opportunities</NuxtLink>, or write to us now at <span class="selectable">ngo.symbol@gmail.com</span>.</p></div>
          <div class="support-option"><h3>NGO membership</h3><p>For people who want to develop the organisation together with the team.</p></div>
          <div class="support-option"><h3>Share our work</h3><p>Tell others about our projects and events. Subscribe to the <a href="/en/events/?view=calendar">event calendar</a>.</p></div>
        </div>
      </Transition>
      <section class="requisites">
        <span class="label">Bank details</span>
        <dl>
          <div><dt>Recipient</dt><dd><CopyValue value="NGO Symbol" en /></dd></div>
          <div><dt>Registration code (EDRPOU)</dt><dd><CopyValue value="45221328" en /></dd></div>
          <div><dt>IBAN (UAH)</dt><dd /></div>
          <div><dt>Bank</dt><dd>JSC CB PrivatBank</dd></div>
          <div><dt>Payment purpose</dt><dd>Charitable contribution to statutory activities</dd></div>
        </dl>
        <p class="footer-small">Card payments and foreign-currency bank details will appear after the organisation’s account is configured.</p>
      </section>
    </template>
    <template v-else>
    <Breadcrumbs />
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

    <Transition name="swap" mode="out-in">
    <div v-if="tab === 'patron'" class="support-options" role="tabpanel" aria-labelledby="tab-patron">
      <div class="support-option"><h3>Разовий внесок</h3><p>Будь-яка сума на статутну діяльність організації.</p></div>
      <div class="support-option"><h3>Регулярна підтримка</h3><p>Щомісячний внесок, який дає змогу планувати проєкти наперед. Рівні меценатства готуються.</p></div>
      <div class="support-option"><h3>Підтримати проєкт</h3><p>Внесок на конкретний проєкт, наприклад «Історію моєї вулиці».</p></div>
      <div class="support-option"><h3>Корпоративне партнерство</h3><p>Спонсорство проєкту чи події з видимістю вашої компанії. Напишіть нам: <span class="selectable">ngo.symbol@gmail.com</span></p></div>
    </div>

    <div v-else id="community" class="support-options" role="tabpanel" aria-labelledby="tab-community">
      <div class="support-option"><h3>Волонтерство</h3><p>Допомога на виставках, подіях і фестивалях: монтаж, зустріч гостей, документація. Відкриті набори — у розділі <NuxtLink to="/opportunities">Можливості</NuxtLink>, а написати можна вже зараз: <span class="selectable">ngo.symbol@gmail.com</span></p></div>
      <div class="support-option"><h3>Членство в ГО</h3><p>Для тих, хто хоче розвивати організацію разом із командою.</p></div>
      <div class="support-option"><h3>Інформаційна підтримка</h3><p>Розкажіть про наші проєкти й події. Підписка на календар: <a href="/events/?view=calendar">events.ics</a></p></div>
    </div>
    </Transition>

    <section class="requisites">
      <span class="label">Реквізити</span>
      <dl>
        <div v-for="item in requisites" :key="item.label">
          <dt>{{ item.label }}</dt>
          <dd>
            <CopyValue v-if="item.value" :value="item.value" />
          </dd>
        </div>
      </dl>
      <p class="footer-small">Оплата карткою на сайті й валютні реквізити з’являться після налаштування рахунку організації.</p>
    </section>
    </template>
  </section>
</template>
