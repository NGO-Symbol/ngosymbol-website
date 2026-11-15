# Google Analytics 4: створення ресурсу, події, зв’язок із Search Console

Для власника. Сайт уже вміє надсилати в GA4 важливі дії (підтримка, календар, перехід на сайт проєкту, відгук на можливість,
зовнішні посилання), але лише після згоди відвідувача в банері кукі й лише з справжнього `symbol.ngo`. Не вистачає
**ідентифікатора вимірювання** (Measurement ID, виглядає як `G-XXXXXXXXXX`). Час: близько 30 хвилин.
Технічні подробиці: [`analytics.md`](analytics.md).

## 1. Створіть ресурс (property)

1. Відкрийте <https://analytics.google.com> під акаунтом організації (бажано спільним, не особистим; див. [`services.md`](services.md)).
2. **Admin** (шестерня внизу зліва) → **Create** → **Property**.
3. Назва: `ГО Символ: symbol.ngo`. Reporting time zone: **(GMT+02:00) Kyiv**. Currency: **Ukrainian Hryvnia (UAH)**.
4. На кроках про бізнес оберіть «Non-profit / Nonprofit & community» (або найближче), розмір «Small». Цілі (objectives) можна
   вибрати «Examine user behavior» і «Generate leads».
5. **Create**, прийміть умови. Умови про обробку даних — для відвідувачів з ЄС і Великої Британії зверніть увагу на
   налаштування нижче (кроки 3 і 4).

## 2. Створіть потік даних (web data stream)

1. Platform: **Web**.
2. Website URL: `https://symbol.ngo`. Stream name: `symbol.ngo`.
3. **Створіть потік**, на сторінці потоку скопіюйте **Measurement ID** (`G-…`).
4. **Enhanced measurement** залиште ввімкненим (особливо «Page changes based on browser history events»: сайт працює як односторінковий застосунок).
   Якщо у звітах зовнішні кліки дублюються з нашою подією `outbound`, вимкніть тільки тумблер «Outbound clicks».
5. Передайте ID тому, хто веде сайт: його вписують у `apps/main/app/data/analytics.ts` → `ga4`. Після публікації на сайті
   з’явиться банер кукі (і кнопка «Налаштування кукі» в підвалі). **Секретом ID не є**: він видимий у коді сторінки.

## 3. Налаштуйте приватність і зберігання

- Admin → **Data collection and modification** → **Data retention**: **Event data retention = 14 months** (за замовчуванням 2 місяці).
  На сторінці конфіденційності сайту написано «до 14 місяців».
- Admin → **Data collection and modification** → **Data collection**: вимкніть **Google signals** (рекламні функції; сайт теж їх не вмикає).
- Не вмикайте «Ads personalization» і не зв’язуйте з Google Ads, поки не вирішили щодо Ad Grants (див. [`owner-google-nonprofits.md`](owner-google-nonprofits.md)).

## 4. Користувацькі параметри (event-scoped custom dimensions)

Без цього GA4 не покаже наші параметри у звітах. Admin → **Data display** → **Custom definitions** → **Create custom dimension**.
Для кожного рядка: Scope = **Event**, назва, **Event parameter** (пишіть точно, малими літерами):

| Dimension name | Event parameter | Що це |
| --- | --- | --- |
| Target domain | `target_domain` | на який сайт перейшли |
| Click area | `click_area` | `header`, `footer`, `main` чи `other` |
| Click page | `click_page` | сторінка, на якій клікнули (без `/en`) |
| Page language | `page_lang` | `uk` або `en` |
| Target URL (за бажанням) | `target_url` | точна адреса призначення (без параметрів) |

Параметр з’явиться в списку вибору лише після першої події з ним; можна вписати його вручну.
Дані з’являються у звітах не одразу (до доби).

## 5. Ключові події (key events)

Admin → **Data display** → **Key events** → **New key event**, вписати назву **точно**:

- `support`: перехід на сторінку підтримки;
- `application`: відгук на можливість (зовнішнє посилання зі сторінки «Можливості»);
- `calendar`: підписка на календар або його перегляд;
- `project_site` (за бажанням): перехід між головним сайтом і сайтом проєкту.

**Не позначайте** `outbound`: це всі зовнішні посилання, шум. Подію можна додати за назвою ще до того, як вона відбулась.

## 6. Зв’яжіть із Search Console

Потрібно: ви **Editor/Administrator** у GA4 і **власник (Owner)** властивості в Search Console ([`owner-search-console.md`](owner-search-console.md)).

1. GA4 → Admin → **Product links** → **Search Console links** → **Link**.
2. **Choose accounts** → позначте `symbol.ngo` → **Confirm**.
3. **Next** → оберіть веб-потік `symbol.ngo` → **Next** → **Submit**.
4. Щоб побачити звіти пошуку в GA4: Reports → Library → колекція «Search Console» → опублікуйте її.
   Дані з’являться за 1–2 дні.

## 7. Перевірте, що все працює

1. Відкрийте `https://symbol.ngo` у звичайному вікні (не у вікні розробника з блокувальником реклами), натисніть **Прийняти**.
2. GA4 → Reports → **Realtime**: за хвилину має з’явитися ваш візит. Натисніть на головній «Підтримати», у Realtime → Event count by
   Event name має з’явитися `support`.
3. Admin → **DebugView** корисний лише для технічної перевірки.
4. Візити з `localhost` і з попередніх копій сайту **не** надсилаються (це робить код); внутрішній трафік фільтрувати не треба.

## Що я не міг перевірити

Не відкривав акаунт GA4: назви меню й порядок кроків дані за станом інтерфейсу, відомим на момент написання, і можуть
відрізнятися. Чи збігаються назви параметрів із зарезервованими, GA4 перевірить при створенні (наші назви навмисно не
збігаються з `link_url`, `page_path`). Довідка: <https://support.google.com/analytics/answer/9304153>.
