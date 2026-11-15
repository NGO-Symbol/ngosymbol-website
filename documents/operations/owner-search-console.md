# Google Search Console: підтвердження домену, sitemap, індексація

Для власника сайту (не потрібно вміти програмувати). Після цього Google показуватиме, які сторінки `symbol.ngo` він
проіндексував і за якими запитами людей на них знаходять. Час: близько 20 хвилин + очікування.

**Головне правило:** у Cloudflare ви лише **додаєте один новий TXT-запис**. Не змінюйте й не видаляйте жоден наявний запис,
особливо `MX` і TXT із `v=spf1 …` (це пошта Google Workspace). Усі записи сайту мають лишатися «DNS only» (сіра хмарка).

## 0. Перевірте, чи домен уже підтверджено

На DNS домену `symbol.ngo` уже є два TXT-записи `google-site-verification=…` (станом на 2026-11-15). Один міг з’явитися
під час підключення Google Workspace, другий — від Search Console. Тож спершу:

1. Відкрийте <https://search.google.com/search-console> під тим Google-акаунтом, який хочете зробити власником.
2. Якщо в списку властивостей уже є `symbol.ngo` (з іконкою глобуса, тип «Domain») — пропустіть до кроку 3.
   Якщо властивість є в іншого акаунта — попросіть його додати вас: Settings → Users and permissions → Add user → **Owner**.

## 1. Додайте властивість «Domain» через DNS TXT

1. У Search Console: меню властивостей зліва вгорі → **Add property**.
2. Оберіть ліву картку **Domain**, введіть `symbol.ngo` (без `https://` і без `www`) → **Continue**.
3. Google покаже рядок виду `google-site-verification=…`. Натисніть **Copy**.
4. Відкрийте <https://dash.cloudflare.com> → оберіть `symbol.ngo` → **DNS** → **Records** → **Add record**:
   - Type: **TXT**
   - Name: **@** (корінь домену)
   - Content: вставлений рядок `google-site-verification=…`
   - TTL: Auto
   - **Save**. (Cloudflare дозволяє кілька TXT на одному імені; наявні не чіпайте.)
5. Поверніться до Search Console → **Verify**. Якщо пише, що запису ще не видно, зачекайте 5–30 хвилин і повторіть
   (іноді до доби). Успіх: «Ownership verified».

Властивість типу Domain покриває `http` і `https`, `www` і піддомени (`documentsart.symbol.ngo` у майбутньому).

## 2. Подайте sitemap

1. Search Console → зліва **Sitemaps**.
2. У полі «Add a new sitemap» напишіть `sitemap.xml` (повна адреса: `https://symbol.ngo/sitemap.xml`) → **Submit**.
3. Статус має стати **Success**, а поруч з’явиться кількість знайдених сторінок. Якщо «Couldn’t fetch», перевірте, що
   адреса відкривається в браузері, і повторіть за годину.

(Sitemap уже містить українські й англійські сторінки, сторінки виставки та фото; керує ним розробка сайту.)

## 3. Попросіть проіндексувати ключові сторінки

Для кожної сторінки зі списку:

1. Угорі в рядку **Inspect any URL** вставте повну адресу → Enter.
2. Якщо «URL is not on Google» або давно не скановано → **Request indexing**. Зачекайте, поки з’явиться «Indexing requested».
3. Є денний ліміт запитів; якщо вичерпано, продовжіть наступного дня.

Ключові сторінки:

- `https://symbol.ngo/` і `https://symbol.ngo/en/`
- `https://symbol.ngo/projects/` і `https://symbol.ngo/en/projects/`
- `https://symbol.ngo/events/`, `https://symbol.ngo/about/`, `https://symbol.ngo/support/`, `https://symbol.ngo/opportunities/`
- `https://symbol.ngo/documentsart/` і `https://symbol.ngo/documentsart/en/` (виставка)
- сторінка кожного великого проєкту з розділу «Проєкти»

Нові сторінки Google зазвичай знаходить сам через sitemap за кілька днів; ручний запит лише прискорює.

## 4. Що робити далі

- Раз на місяць дивитися **Pages** (скільки проіндексовано, чому щось «Not indexed») і **Performance** (запити, кліки).
- Додайте ще одного адміністратора (Settings → Users and permissions → Add user → Owner або Full), щоб не залежати від однієї людини.
- Зв’яжіть Search Console з GA4: [`owner-ga4.md`](owner-ga4.md), крок 6.
- Імпорт у Bing: [`owner-bing-webmaster.md`](owner-bing-webmaster.md).

## Що я не міг перевірити

Не відкривав акаунти, тому не знаю, чи властивість уже існує і хто її власник. Назви кнопок у Google можуть трохи
відрізнятися від описаних. Офіційна довідка: <https://support.google.com/webmasters/answer/9008080>.
