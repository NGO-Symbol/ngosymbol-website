<script setup lang="ts">
// Privacy and cookie policy. Approved by the head of the NGO, Юрій Рассоха, on 2026-11-17 (all sections, no edits).
// Facts only from documents/knowledge and the vendors' own documentation; the status of each tool follows data/analytics.ts,
// so the page never says a tool is running when it is not. Ukrainian and English share one template (ADR-0009).
import { analytics } from '~/data/analytics'
import { contactEmail } from '~/data/social'

const { isEn } = useLang()
const t = (uk: string, en: string) => (isEn.value ? en : uk)
usePageSeo({
  title: () => t('Конфіденційність і кукі', 'Privacy and cookies'),
  description: () => t('Які дані збирає сайт ГО «Символ», які кукі він використовує, на якій підставі і як змінити вибір.', 'What data the NGO Symbol website collects, which cookies it uses, on what basis and how to change your choice.')
})

const updated = computed(() => t('17 листопада 2026', '17 November 2026'))
const status = (on: boolean) => (on ? t('підключено', 'in use') : t('ще не підключено', 'not connected yet'))
const gaOn = Boolean(analytics.ga4)
const clarityOn = Boolean(analytics.clarity && analytics.clarityEnabled)
const cloudflareOn = Boolean(analytics.cloudflareToken)

const cookies = computed(() => [
  { name: '_ga', tool: 'Google Analytics', purpose: t('відрізняє одного відвідувача від іншого', 'tells one visitor from another'), life: t('2 роки', '2 years') },
  { name: '_ga_<id>', tool: 'Google Analytics', purpose: t('зберігає стан відвідування (сесії)', 'keeps the state of the visit (session)'), life: t('2 роки', '2 years') },
  { name: '_clck', tool: 'Microsoft Clarity', purpose: t('зберігає випадковий ідентифікатор відвідувача', 'keeps a random visitor identifier'), life: t('до 1 року', 'up to 1 year') },
  { name: '_clsk', tool: 'Microsoft Clarity', purpose: t('поєднує перегляди сторінок в одне відвідування', 'joins page views into one visit'), life: t('1 день', '1 day') },
  { name: 'CLID, MUID, SM, MR, ANONCHK', tool: 'Microsoft Clarity', purpose: t('кукі Microsoft, які може встановити Clarity (ідентифікація браузера в сервісах Microsoft)', 'Microsoft cookies that Clarity may set (identifying the browser across Microsoft services)'), life: t('до 13 місяців', 'up to 13 months') }
])
</script>

<template>
  <section class="page container legal">
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Дата оновлення', 'Last updated') }}: {{ updated }}</span>
      <h1>{{ t('Конфіденційність і кукі', 'Privacy and cookies') }}</h1>
      <p>{{ t('Коротко: сайт не має акаунтів, форм і коментарів. Статистику відвідувань ми збираємо лише з вашої згоди, а лічильник без кукі працює без неї.', 'In short: the site has no accounts, forms or comments. We collect visit statistics only with your consent; a counter that uses no cookies works without it.') }}</p>
    </div>

    <section class="legal__section">
      <h2>{{ t('Хто відповідає за дані', 'Who is responsible for the data') }}</h2>
      <p v-if="isEn">The data controller is NGO Symbol (legal name: <span lang="uk">Громадська організація «Символ»</span>), registration code (EDRPOU) 45221328, Kharkiv, Ukraine. Contact: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.</p>
      <p v-else>Володілець даних: Громадська організація «Символ» (ГО «Символ»), ЄДРПОУ 45221328, м. Харків, Україна. Контакт: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.</p>
    </section>

    <section class="legal__section">
      <h2>{{ t('Що сайт робить без вашої згоди', 'What the site does without your consent') }}</h2>
      <ul>
        <li>{{ t('Сайт не просить ваше ім’я, пошту чи інші дані, не має реєстрації, форм і коментарів. Якщо ви пишете нам на пошту, ми використовуємо ваш лист лише щоб відповісти.', 'The site does not ask for your name, e-mail or other details and has no registration, forms or comments. If you write to us by e-mail, we use your message only to reply.') }}</li>
        <li>{{ t('Сайт сам не встановлює кукі. У пам’яті вашого браузера він зберігає лише ваші налаштування: світла чи темна тема, чи ви вже бачили заставку, остання підказка в списку людей і ваш вибір щодо кукі. Ці дані не надсилаються нам.', 'The site sets no cookies of its own. It keeps only your preferences in your browser: light or dark theme, whether you have seen the intro, the last hint in the people list and your cookie choice. This is not sent to us.') }}</li>
        <li>{{ t('Сайт розміщено на GitHub Pages. GitHub записує IP-адресу кожного, хто відкриває сторінку, і зберігає її з міркувань безпеки; ми не маємо до цих записів доступу.', 'The site is hosted on GitHub Pages. GitHub logs and stores the IP address of every visitor for security purposes; we have no access to these logs.') }}</li>
        <li>{{ t('На сторінці проєкту «Покажіть свої документи…» шрифт IBM Plex Mono завантажується з Google Fonts, тому Google отримує вашу IP-адресу.', 'On the project page “May I See Your Documents…” the IBM Plex Mono font is loaded from Google Fonts, so Google receives your IP address.') }}</li>
      </ul>
    </section>

    <section class="legal__section">
      <h2>{{ t('Статистика відвідувань', 'Visit statistics') }}</h2>
      <p>{{ t('Статистика потрібна, щоб розуміти, які сторінки читають і що не працює. Вона працює лише на справжньому сайті symbol.ngo і не рахує роботів. Вона не пов’язана з вашим іменем, і ми не намагаємося вас упізнати.', 'Statistics help us see which pages are read and what does not work. They run only on the real symbol.ngo site and do not count robots. They are not linked to your name and we do not try to identify you.') }}</p>

      <div class="legal__cards">
        <article>
          <h3>Cloudflare Web Analytics <small>{{ status(cloudflareOn) }}</small></h3>
          <p>{{ t('Без кукі. Вимірює кількість відвідувань і швидкість сторінок: адресу сторінки (без параметрів після «?»), звідки ви прийшли, країну, тип пристрою, браузер і систему. Cloudflare заявляє, що не використовує кукі чи локальне сховище для цього і не стежить за окремими відвідувачами. Працює без вашої згоди; тому тут немає вибору в банері, і ми описуємо його для прозорості. Сирі дані зберігаються 7 днів, потім лишається узагальнена статистика (панель показує до 6 місяців).', 'No cookies. It measures visits and page speed: the page address (without the part after “?”), where you came from, country, device type, browser and system. Cloudflare states that it uses no cookies or local storage for this and does not track individual visitors. It works without your consent, so there is no choice in the banner and we describe it for transparency. Raw data is kept for 7 days, then only aggregated statistics remain (the dashboard shows up to 6 months).') }}</p>
        </article>
        <article>
          <h3>Google Analytics 4 <small>{{ status(gaOn) }}</small></h3>
          <p>{{ t('Лише після вашої згоди. Рахує відвідування, переглянуті сторінки, країну, пристрій і переходи до сторінки підтримки, календаря, сайтів проєктів та зовнішніх посилань (адреса посилання без параметрів). Рекламні функції й персоналізацію реклами ми вимкнули. Дані про події зберігаються до 14 місяців (у налаштуваннях сервісу: 2 або 14 місяців).', 'Only after you accept. It counts visits, pages viewed, country, device and clicks to the support page, the calendar, project sites and external links (the link address without parameters). We have switched off advertising features and ad personalisation. Event data is kept for up to 14 months (the service setting is 2 or 14 months).') }}</p>
        </article>
        <article>
          <h3>Microsoft Clarity <small>{{ status(clarityOn) }}</small></h3>
          <p>{{ t('Лише після вашої згоди. Показує нам, де на сторінці клікають і як далеко гортають, і записує перебіг відвідування за випадковим ідентифікатором, без вашого імені (рухи миші, кліки, гортання). Поля введення маскуються. Згоду ми передаємо Clarity за його Consent API v2 (рекламні кукі заборонені, аналітичні дозволені після вашої згоди). Записи зберігаються 30 днів; обрані вручну й вибіркові записи — до 9 місяців.', 'Only after you accept. It shows us where visitors click and how far they scroll, and records the course of the visit under a random identifier, without your name (mouse movement, clicks, scrolling). Input fields are masked. We pass your choice to Clarity through its Consent API v2 (advertising storage denied, analytics storage granted after you accept). Recordings are kept for 30 days; recordings picked by hand and sampled ones for up to 9 months.') }}</p>
        </article>
      </div>
    </section>

    <section class="legal__section">
      <h2>{{ t('Кукі, які можуть з’явитися після вашої згоди', 'Cookies that may appear after you accept') }}</h2>
      <p>{{ t('Якщо ви відхилите кукі або не оберете нічого, цих файлів не буде. Строки — максимальні; браузер може скоротити їх (Chrome — до 400 днів, Safari — до 7 днів без повернення на сайт).', 'If you decline cookies or choose nothing, these files will not exist. The lifetimes are maximums; your browser may shorten them (Chrome to 400 days, Safari to 7 days without a return visit).') }}</p>
      <div class="legal__cookies" role="table" :aria-label="t('Список кукі', 'Cookie list')">
        <div v-for="cookie in cookies" :key="cookie.name" class="legal__cookie" role="row">
          <code role="cell">{{ cookie.name }}</code>
          <span role="cell"><b>{{ cookie.tool }}</b> · {{ cookie.purpose }}</span>
          <span role="cell">{{ cookie.life }}</span>
        </div>
      </div>
    </section>

    <section class="legal__section">
      <h2>{{ t('Підстава і як змінити вибір', 'Legal basis and how to change your choice') }}</h2>
      <ul>
        <li>{{ t('Підстава для Google Analytics і Microsoft Clarity — ваша згода. Ми нічого не завантажуємо, доки ви не натиснете «Прийняти» у банері.', 'The basis for Google Analytics and Microsoft Clarity is your consent. We load nothing until you press “Accept” in the banner.') }}</li>
        <li>{{ t('Змінити або відкликати згоду можна будь-коли: кнопка «Налаштування кукі» внизу кожної сторінки сайту та сайту виставки знову відкриває банер. Вона з’являється, коли підключено інструмент, що потребує згоди. Відкликання зупиняє інструменти й видаляє їхні кукі з цього сайту.', 'You can change or withdraw your consent at any time: the “Cookie settings” button at the bottom of every page of this site and of the exhibition site reopens the banner. It appears when a tool that needs consent is connected. Withdrawing stops the tools and removes their cookies from this site.') }}</li>
        <li>{{ t('Ви також можете видалити кукі й дані сайту в налаштуваннях браузера.', 'You can also delete cookies and site data in your browser settings.') }}</li>
      </ul>
    </section>

    <section class="legal__section">
      <h2>{{ t('Треті сторони і передавання даних', 'Third parties and transfers') }}</h2>
      <p>{{ t('Інструменти статистики надають компанії, що працюють за межами України, зокрема в США, тому дані, які вони отримують, можуть оброблятися там. Умови кожної з них:', 'The statistics tools are provided by companies that operate outside Ukraine, including in the USA, so the data they receive may be processed there. Each one’s terms:') }}</p>
      <ul>
        <li>Google (Analytics, Fonts): <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Microsoft (Clarity): <a href="https://privacy.microsoft.com/privacystatement" rel="noopener">privacy.microsoft.com/privacystatement</a></li>
        <li>Cloudflare (Web Analytics): <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">cloudflare.com/privacypolicy</a></li>
        <li>GitHub (hosting): <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">docs.github.com … github-general-privacy-statement</a></li>
      </ul>
      <p>{{ t('Ми не продаємо дані й не передаємо їх нікому, крім цих сервісів.', 'We do not sell data and do not pass it to anyone except these services.') }}</p>
    </section>

    <section class="legal__section">
      <h2>{{ t('Ваші права', 'Your rights') }}</h2>
      <p>{{ t('Ви можете дізнатися, які дані про вас оброблюються, вимагати їх виправлення чи видалення, заперечити проти обробки та відкликати згоду. Оскільки в статистиці немає вашого імені, ми можемо не знайти ваші дані без ідентифікатора з вашого браузера. Напишіть нам на пошту нижче, і ми відповімо. Якщо ви вважаєте, що ваші права порушено, можна звернутися до Уповноваженого Верховної Ради України з прав людини або до суду; відвідувачі з ЄС і ЄЕЗ також мають права за GDPR, зокрема скаргу до наглядового органу своєї країни.', 'You can ask what data about you is processed, ask for it to be corrected or deleted, object to processing and withdraw consent. Because the statistics do not contain your name, we may not be able to find your data without an identifier from your browser. Write to us at the address below and we will reply. If you believe your rights are violated, you can turn to the Ukrainian Parliament Commissioner for Human Rights or to a court; visitors from the EU and EEA also have rights under the GDPR, including a complaint to the supervisory authority of their country.') }}</p>
      <p><a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></p>
    </section>

    <section class="legal__section">
      <h2>{{ t('Зміни', 'Changes') }}</h2>
      <p>{{ t('Коли ми підключаємо новий інструмент чи змінюємо цю сторінку, ми оновлюємо дату вгорі. Попередні версії зберігаються в історії змін репозиторію сайту.', 'When we connect a new tool or change this page, we update the date at the top. Earlier versions are kept in the change history of the site’s repository.') }}</p>
    </section>
  </section>
</template>

<style scoped>
.legal__section { max-width: 760px; margin-bottom: 44px; }
.legal__section h2 { font-size: clamp(1.4rem, calc(1rem + 1.2vw), 2rem); line-height: 1.15; margin-bottom: 14px; }
.legal__section p, .legal__section li { font-size: 1.02rem; line-height: 1.65; }
.legal__section ul { padding-left: 1.2em; display: grid; gap: 10px; margin: 12px 0; }
.legal__section a { text-underline-offset: 4px; text-decoration-color: var(--symbol-violet); overflow-wrap: anywhere; }
.legal__cards { display: grid; gap: 14px; margin-top: 18px; }
.legal__cards article { padding: 20px 22px; background: var(--symbol-white); border-top: 3px solid var(--symbol-violet); }
.legal__cards h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.35rem; margin: 0 0 8px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; }
.legal__cards h3 small { font-family: var(--font-body); font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
.legal__cards p { margin: 0; font-size: .98rem; }
.legal__cookies { display: grid; gap: 1px; margin-top: 16px; background: color-mix(in srgb, var(--symbol-plum) 22%, transparent); border: 1px solid color-mix(in srgb, var(--symbol-plum) 22%, transparent); }
.legal__cookie { display: grid; grid-template-columns: minmax(130px, 200px) minmax(0, 1fr) 110px; gap: 6px 18px; padding: 12px 16px; background: var(--symbol-cream); font-size: .95rem; line-height: 1.5; }
.legal__cookie code { font-family: ui-monospace, Menlo, monospace; font-size: .88rem; overflow-wrap: anywhere; }
@media (max-width: 720px) { .legal__cookie { grid-template-columns: 1fr; } }
</style>
