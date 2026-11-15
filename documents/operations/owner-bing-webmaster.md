# Bing Webmaster Tools: імпорт із Google Search Console

Bing (і Copilot, і частина інших пошуковиків) бере дані з власного індексу. Найпростіше підключити сайт, **імпортувавши його з
Search Console**: нічого не треба підтверджувати окремо. Час: 10 хвилин. Спершу виконайте
[`owner-search-console.md`](owner-search-console.md) (властивість `symbol.ngo` має бути підтверджена, а ви — її власником).

## Кроки

1. Відкрийте <https://www.bing.com/webmasters> і увійдіть. Найпростіше натиснути **Sign in with Google** під тим самим
   Google-акаунтом, що є власником у Search Console.
2. На першому екрані оберіть **Import your sites from GSC** (імпорт із Google Search Console) → **Continue**.
3. Дозвольте доступ до Search Console, коли Google попросить (Bing лише читає список сайтів і sitemap).
4. Позначте `symbol.ngo` (і за потреби інші властивості) → **Import**. Bing автоматично додасть сайт, підтвердить його
   та імпортує sitemap (`https://symbol.ngo/sitemap.xml`).
5. Відкрийте сайт у Bing Webmaster Tools → **Sitemaps** і переконайтеся, що `sitemap.xml` у статусі Success. Якщо ні — **Submit sitemap** і вставте адресу.
6. Через кілька днів перегляньте **Site Explorer** і **Search Performance**.

## Якщо імпорт не вдався

Додайте сайт вручну: **Add a site** → `https://symbol.ngo/` → метод підтвердження **CNAME record** (Bing покаже ім’я й значення)
→ Cloudflare → DNS → **Add record**: Type CNAME, Name і Target з Bing, **Proxy status: DNS only** → у Bing натисніть **Verify**.
Нічого наявного не змінюйте (див. правило в `owner-search-console.md`).

## Далі

- Раз на місяць: Sitemaps, Search Performance, помилки сканування (пункт у [`services.md`](services.md)).
- Додайте другу людину в Settings → Users.

## Що я не міг перевірити

Не відкривав Bing Webmaster Tools; порядок кроків і назви кнопок взято з пам’яті про сервіс і можуть відрізнятися.
Довідка Bing: у самому сервісі (Help / Довідка); звірте кроки з поточним інтерфейсом.
