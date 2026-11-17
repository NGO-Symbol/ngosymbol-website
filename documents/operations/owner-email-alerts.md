# Сповіщення про сайт на пошту ngo.symbol@gmail.com

Монітор сайту (`.github/workflows/uptime.yml`, опис у [`monitoring.md`](monitoring.md)) кожні 5 хвилин перевіряє symbol.ngo і надсилає лист, коли сайт перестає працювати і коли відновлюється, а раз на день попереджає про строк сертифіката (менше 14 днів) і домену (менше 30 днів). Листи йдуть з пошти `ngo.symbol@gmail.com` на неї ж. Поки секретів немає, монітор працює, але лише друкує повідомлення в журналі. Час: 10 хвилин.

## 1. Пароль застосунку Gmail (робить власник пошти ngo.symbol@gmail.com)

1. Увійдіть у `ngo.symbol@gmail.com` і відкрийте [myaccount.google.com/security](https://myaccount.google.com/security).
2. Увімкніть **Двоетапну перевірку**, якщо її ще немає (без неї Google не дасть пароль застосунку).
3. Відкрийте [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), назва: `symbol.ngo uptime`, натисніть **Створити**.
4. Google покаже пароль із 16 літер. Це пароль лише для надсилання листів монітором. Нікому не пересилайте його в чатах чи листах: одразу вставте в GitHub (крок 2). Якщо він витік, видаліть його на тій самій сторінці й створіть новий.

## 2. Три секрети в GitHub (робить той, хто має доступ адміністратора до репозиторію)

GitHub → репозиторій `NGO-Symbol/ngosymbol-website` → **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Value |
|---|---|
| `SMTP_USER` | `ngo.symbol@gmail.com` |
| `SMTP_PASSWORD` | пароль застосунку з кроку 1 (16 літер, без пробілів) |
| `ALERT_EMAIL_TO` | `ngo.symbol@gmail.com` (кілька адрес через кому, якщо колись треба) |

Репозиторій публічний: адреси й паролі зберігаються лише в секретах, ніколи в коді.

## 3. Перевірка

GitHub → **Actions → Uptime → Run workflow**, mode `test`. За хвилину на `ngo.symbol@gmail.com` прийде тестовий лист (перевірте й «Спам», позначте як «Не спам»).
