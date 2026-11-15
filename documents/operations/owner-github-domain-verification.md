# GitHub Pages: підтвердження домену `symbol.ngo` для організації

Для власника організації `NGO-Symbol` на GitHub. Підтвердження домену захищає від «захоплення» домену: ніхто інший на GitHub
не зможе опублікувати свій сайт на `symbol.ngo`. Це робиться один раз. Загальна схема DNS: [`deployment.md`](deployment.md) §5.

**Правило:** у Cloudflare додається лише один TXT-запис. `MX`, SPF та інші TXT (пошта Google Workspace) не чіпайте.

## Спершу перевірте, чи вже підтверджено

На DNS уже є запис `_github-pages-challenge-NGO-Symbol.symbol.ngo` (станом на 2026-11-15), тож домен, імовірно, вже
підтверджено. Перевірка: <https://github.com/organizations/NGO-Symbol/settings/pages> → у списку домен `symbol.ngo` зі
статусом **Verified**. Якщо так, більше нічого робити не треба.

## Якщо ні: кроки

1. Увійдіть у GitHub як **owner** організації і відкрийте <https://github.com/organizations/NGO-Symbol/settings/pages>
   (Organization settings → Pages).
2. **Add a domain** → введіть `symbol.ngo` → **Add domain**.
3. GitHub покаже інструкцію: TXT-запис з іменем `_github-pages-challenge-NGO-Symbol` (або `_github-pages-challenge-NGO-Symbol.symbol.ngo`)
   і значенням — довгий код. Скопіюйте значення.
4. Cloudflare → `symbol.ngo` → **DNS** → **Records** → **Add record**:
   - Type: **TXT**
   - Name: `_github-pages-challenge-NGO-Symbol`
   - Content: код із GitHub
   - **Save**.
5. Поверніться на сторінку GitHub → біля домену **⋯ → Continue verifying** (або **Verify**). Може знадобитися до доби,
   зазвичай 5–30 хвилин. Статус стане **Verified**.
6. TXT-запис **не видаляйте** після підтвердження: GitHub періодично перевіряє його, і без запису підтвердження зникне.

## Піддомени

Підтверджений домен захищає і піддомени (`my-street.symbol.ngo`, `documentsart.symbol.ngo`). Для кожного піддомену потрібен лише
свій CNAME на `ngo-symbol.github.io` (див. таблицю в `deployment.md`). Не додавайте wildcard-запис `*`.

## Що я не міг перевірити

Не мав доступу до налаштувань організації; чи домен уже підтверджено, видно лише там. Що підтвердження покриває піддомени,
сказано в документації GitHub («Verifying your custom domain for GitHub Pages»), звірте формулювання на місці.
