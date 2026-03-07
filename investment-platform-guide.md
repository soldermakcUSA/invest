# Инструкция по созданию инвестиционного веб-приложения на Next.js + Supabase + Stripe + Heleket

## 1. Сначала о главном

Ты описываешь не просто финтех-приложение, а платформу, где пользователь:

- регистрируется;
- пополняет баланс;
- распределяет деньги по инвестиционным проектам;
- видит доходность;
- потенциально инвестирует в крипту, фондовый рынок, стартапы и другие направления.

Это уже затрагивает:

- хранение и учет клиентских средств;
- инвестиционные рекомендации и/или инвестиционное посредничество;
- KYC/AML;
- санкционный и fraud screening;
- платежное регулирование;
- регулирование ценных бумаг и инвестиционной деятельности.

### Критически важно

Если это приложение будет работать с реальными клиентами и реальными деньгами, не запускай production без консультации с профильным юристом и compliance-специалистом по юрисдикции, где будет работать компания.

Для США это особенно важно: деятельность может попадать под требования по регистрации как investment adviser и/или broker-dealer, а также под требования AML/KYC. Официальные материалы:

- SEC: [Investment adviser registration](https://www.sec.gov/divisions/investment/iard/register.shtml)
- SEC: [Broker-dealer registration guide](https://www.sec.gov/about/reports-publications/investor-publications/guide-broker-dealer-registration)
- SEC: [Internet adviser reforms, adopted March 27, 2024](https://www.sec.gov/newsroom/press-releases/2024-42)

Ниже инструкция по технической реализации. Она не заменяет юридическую модель бизнеса.

---

## 2. Какую версию продукта лучше делать первой

### Рекомендуемый путь

Сначала делай **MVP-платформу учета и распределения средств**, а не полноценного лицензированного брокера.

То есть:

- пользователи пополняют **внутренний баланс**;
- выбирают проекты/стратегии;
- система ведет **внутренний ledger**;
- фактическое размещение средств в реальных активах либо:
  - делается вручную операционной командой;
  - либо подключается позднее через лицензированных партнеров/API.

Это намного реалистичнее, чем сразу автоматизировать:

- покупку ценных бумаг;
- custody клиентских активов;
- инвестиционный advice;
- cross-border crypto/securities flows.

### Что должно быть в MVP

- регистрация и логин;
- профиль пользователя;
- KYC-статус;
- пополнение баланса фиатом через Stripe;
- пополнение криптой через Heleket;
- список проектов/направлений;
- инвестиция из внутреннего баланса в проект;
- дашборд:
  - доступный баланс;
  - сумма в инвестициях;
  - PnL;
  - доходность;
  - история пополнений;
  - история аллокаций по проектам;
- админка для управления проектами и ручного обновления performance.

---

## 3. Рекомендуемый стек

## Frontend / Backend

- `Next.js` с `App Router`
- `TypeScript`
- `Tailwind CSS`
- `Supabase`
  - Postgres
  - Auth
  - Storage
  - Realtime
- `Stripe`
  - checkout для пополнения баланса картой/фиатом
  - webhooks для подтверждения платежа
- `Heleket`
  - создание crypto invoice
  - callback/webhook для подтверждения депозита

## Почему именно так

- `Next.js App Router` подходит для SSR, dashboard, admin, route handlers и server actions.
- `Supabase` закрывает auth, Postgres, RLS и часть realtime-задач.
- `Stripe` удобен для пополнений картой и банковскими методами.
- `Heleket` закрывает crypto deposits.

Официальные источники:

- Next.js App Router: [docs](https://nextjs.org/docs/app)
- Next.js installation: [docs](https://nextjs.org/docs/app/getting-started/installation)
- Supabase SSR для Next.js: [docs](https://supabase.com/docs/guides/auth/server-side/nextjs)
- Supabase Auth quickstart for Next.js: [docs](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- Supabase RLS: [docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Stripe Checkout Sessions: [docs](https://docs.stripe.com/api/checkout/sessions/create)
- Stripe webhooks: [docs](https://docs.stripe.com/webhooks)
- Heleket invoice creation: [docs](https://doc.heleket.com/en/methods/payments/creating-invoice)
- Heleket payment webhook: [docs](https://doc.heleket.com/en/methods/payments/webhook)
- Heleket payment statuses: [docs](https://doc.heleket.com/en/methods/payments/payment-statuses)

---

## 4. Базовая архитектура

## Слои системы

### 1. Public site

- главная страница;
- описание направлений инвестирования;
- onboarding;
- FAQ;
- legal pages.

### 2. Auth area

- регистрация;
- вход;
- восстановление доступа;
- подтверждение email;
- onboarding профиля;
- KYC form.

### 3. Client dashboard

- баланс;
- активные инвестиции;
- доходность;
- история операций;
- пополнение и вывод;
- список проектов;
- карточка каждого проекта.

### 4. Admin panel

- управление проектами;
- управление доходностью;
- ручная модерация пользователя;
- просмотр депозитов;
- просмотр аллокаций;
- ручные корректировки ledger;
- отчеты.

### 5. Payment integration layer

- route handlers для Stripe;
- route handlers для Heleket;
- webhook endpoints;
- идемпотентная фиксация результата в БД.

### 6. Ledger layer

Это ключевая часть.

Никогда не считай пользовательский баланс только по таблице `profiles.balance`.

Правильнее:

- хранить все денежные движения как события;
- собирать баланс агрегатами;
- иметь неизменяемый журнал операций;
- использовать отдельные статусы для pending / completed / failed.

---

## 5. Структура проекта

Пример структуры:

```txt
src/
  app/
    (marketing)/
      page.tsx
      projects/page.tsx
      about/page.tsx
    (auth)/
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
    dashboard/
      page.tsx
      portfolio/page.tsx
      deposits/page.tsx
      investments/page.tsx
      settings/page.tsx
    admin/
      page.tsx
      projects/page.tsx
      users/page.tsx
      transactions/page.tsx
    api/
      stripe/create-checkout-session/route.ts
      stripe/webhook/route.ts
      heleket/create-invoice/route.ts
      heleket/webhook/route.ts
      investments/create/route.ts
      investments/redeem/route.ts
  components/
    ui/
    marketing/
    dashboard/
    forms/
  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    stripe/
      client.ts
      verify-webhook.ts
    heleket/
      client.ts
      signature.ts
    auth/
    ledger/
    validations/
    utils/
  types/
  hooks/
supabase/
  migrations/
  seed.sql
```

---

## 6. Инициализация проекта

По состоянию на документацию Next.js App Router, для нового проекта лучше использовать `create-next-app`. В документации указано требование `Node.js 20.9+`.

### Команда создания

```bash
pnpm create next-app@latest investment-platform --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Установить зависимости

```bash
pnpm add @supabase/supabase-js @supabase/ssr stripe zod react-hook-form
pnpm add @tanstack/react-query recharts date-fns clsx tailwind-merge
pnpm add lucide-react
pnpm add -D supabase
```

### Что настроить сразу

- `eslint`
- `prettier` при желании
- `husky` + `lint-staged`
- `.env.local`
- `.env.example`
- `src/lib`
- `src/types/database.ts` для generated Supabase types

---

## 7. Переменные окружения

Пример:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

HELEKET_API_URL=https://api.heleket.com/v1
HELEKET_MERCHANT_UUID=
HELEKET_PAYMENT_API_KEY=
HELEKET_PAYOUT_API_KEY=
HELEKET_CALLBACK_IP=31.133.220.8

CRON_SECRET=
```

### Правило

- `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `HELEKET_PAYMENT_API_KEY` и `HELEKET_PAYOUT_API_KEY` никогда не должны попадать в клиентский код.

---

## 8. Auth через Supabase

Для `Next.js App Router` используй server-side auth через `@supabase/ssr`.

Согласно документации Supabase:

- нужен client для browser components;
- нужен client для server components / route handlers / server actions;
- нужен proxy/middleware для refresh auth cookies.

### Что реализовать

- email/password sign up;
- email verification;
- login/logout;
- protected routes;
- roles:
  - `client`
  - `admin`
  - `operator`
  - `compliance`

### Дополнительные поля профиля

- full name
- country
- phone
- KYC status
- accreditation status, если потребуется
- risk profile
- preferred currency

---

## 9. Модель данных в Supabase

Ниже рекомендованная схема. Это не единственный вариант, но она нормальна для MVP и дальнейшего роста.

## Основные таблицы

### `profiles`

Расширение пользователя.

Поля:

- `id uuid primary key references auth.users(id)`
- `email text`
- `full_name text`
- `phone text`
- `country text`
- `role text`
- `kyc_status text`
- `risk_profile text`
- `created_at timestamptz`
- `updated_at timestamptz`

### `wallets`

Логический кошелек пользователя.

Поля:

- `id uuid primary key`
- `user_id uuid`
- `currency text`
- `status text`
- `created_at timestamptz`

Обычно на MVP достаточно одного wallet на пользователя в базовой валюте, например `USD`.

### `wallet_ledger_entries`

Главный журнал движения средств.

Поля:

- `id uuid primary key`
- `wallet_id uuid`
- `user_id uuid`
- `entry_type text`
- `direction text`
- `amount numeric(20,8)`
- `currency text`
- `status text`
- `reference_type text`
- `reference_id uuid`
- `external_id text`
- `description text`
- `metadata jsonb`
- `created_at timestamptz`

Примеры `entry_type`:

- `deposit`
- `withdrawal`
- `investment_allocation`
- `investment_return`
- `fee`
- `correction`

Примеры `direction`:

- `credit`
- `debit`

Примеры `status`:

- `pending`
- `completed`
- `failed`
- `reversed`

### `payment_transactions`

Учет пополнений и выводов.

Поля:

- `id uuid primary key`
- `user_id uuid`
- `provider text`
- `provider_transaction_id text`
- `provider_session_id text`
- `provider_invoice_id text`
- `transaction_type text`
- `amount numeric(20,8)`
- `currency text`
- `status text`
- `wallet_id uuid`
- `payload jsonb`
- `created_at timestamptz`
- `updated_at timestamptz`

Примеры `provider`:

- `stripe`
- `heleket`

### `projects`

Инвестиционные направления / проекты.

Поля:

- `id uuid primary key`
- `slug text unique`
- `title text`
- `description text`
- `category text`
- `risk_level text`
- `status text`
- `target_return numeric(10,4)`
- `min_investment numeric(20,8)`
- `currency text`
- `cover_image_url text`
- `created_at timestamptz`
- `updated_at timestamptz`

Примеры `category`:

- `crypto`
- `stocks`
- `startups`
- `real_estate`
- `commodities`
- `mixed`

### `project_snapshots`

Исторические метрики проекта.

Поля:

- `id uuid primary key`
- `project_id uuid`
- `nav numeric(20,8)`
- `total_raised numeric(20,8)`
- `total_invested numeric(20,8)`
- `roi_percent numeric(10,4)`
- `snapshot_date date`
- `metadata jsonb`

### `investments`

Позиции пользователя в проектах.

Поля:

- `id uuid primary key`
- `user_id uuid`
- `project_id uuid`
- `wallet_id uuid`
- `amount_allocated numeric(20,8)`
- `current_value numeric(20,8)`
- `realized_pnl numeric(20,8)`
- `unrealized_pnl numeric(20,8)`
- `status text`
- `started_at timestamptz`
- `closed_at timestamptz`

### `investment_events`

Все изменения позиции.

Поля:

- `id uuid primary key`
- `investment_id uuid`
- `event_type text`
- `amount numeric(20,8)`
- `units numeric(20,8)`
- `price numeric(20,8)`
- `payload jsonb`
- `created_at timestamptz`

Примеры `event_type`:

- `allocate`
- `revalue`
- `yield_accrual`
- `partial_exit`
- `close`

### `kyc_records`

Хранение статуса проверки.

Поля:

- `id uuid primary key`
- `user_id uuid`
- `provider text`
- `status text`
- `reference_id text`
- `payload jsonb`
- `verified_at timestamptz`
- `created_at timestamptz`

### `audit_logs`

Лог административных действий.

Поля:

- `id uuid primary key`
- `actor_user_id uuid`
- `action text`
- `entity_type text`
- `entity_id uuid`
- `payload jsonb`
- `created_at timestamptz`

---

## 10. SQL-основа для старта

Ниже не полная схема, а стартовый каркас:

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  country text,
  role text not null default 'client',
  kyc_status text not null default 'pending',
  risk_profile text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  currency text not null default 'USD',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  wallet_id uuid references public.wallets(id) on delete set null,
  provider text not null,
  provider_transaction_id text,
  provider_session_id text,
  provider_invoice_id text,
  transaction_type text not null,
  amount numeric(20,8) not null check (amount > 0),
  currency text not null,
  status text not null default 'pending',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wallet_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  entry_type text not null,
  direction text not null check (direction in ('credit', 'debit')),
  amount numeric(20,8) not null check (amount > 0),
  currency text not null,
  status text not null default 'pending',
  reference_type text,
  reference_id uuid,
  external_id text,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  category text not null,
  risk_level text not null,
  status text not null default 'draft',
  target_return numeric(10,4),
  min_investment numeric(20,8) not null default 0,
  currency text not null default 'USD',
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  amount_allocated numeric(20,8) not null check (amount_allocated > 0),
  current_value numeric(20,8) not null default 0,
  realized_pnl numeric(20,8) not null default 0,
  unrealized_pnl numeric(20,8) not null default 0,
  status text not null default 'active',
  started_at timestamptz not null default now(),
  closed_at timestamptz
);
```

---

## 11. RLS и безопасность данных

В документации Supabase указано, что `RLS` должен быть включен на таблицах в exposed schema.

### Обязательно

- включить RLS на всех пользовательских таблицах;
- пользователь должен видеть только свои данные;
- admin/operator/compliance должны иметь отдельную server-side авторизацию;
- опасные операции выполнять только на сервере.

### Примеры правил

Пользователь видит только свой профиль:

```sql
alter table public.profiles enable row level security;

create policy "users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "users can update own profile"
on public.profiles
for update
using (auth.uid() = id);
```

Пользователь видит только свои инвестиции:

```sql
alter table public.investments enable row level security;

create policy "users can view own investments"
on public.investments
for select
using (auth.uid() = user_id);
```

### Не делай так

- не вызывай `service_role` из браузера;
- не доверяй суммам, присланным клиентом;
- не изменяй баланс простым `update wallets set ...`;
- не подтверждай платеж только по редиректу пользователя без webhook.

---

## 12. Баланс и ledger

Баланс пользователя должен считаться из `wallet_ledger_entries`.

### Формула

`available_balance = completed credits - completed debits - amount locked`

Если будет поддержка заявок/выводов/резервов, добавляй:

- `available`
- `pending`
- `locked`
- `invested`

### Лучший подход

- таблица wallet;
- неизменяемый ledger entries;
- SQL view или materialized view для агрегатов;
- все денежные операции проводятся транзакцией в БД.

---

## 13. Пополнение через Stripe

Для Stripe на MVP лучше использовать **Checkout Session**, а не ручную форму карт.

Почему:

- быстрее;
- меньше PCI-поверхность;
- проще запуск;
- удобнее webhook flow.

Согласно официальной документации Stripe, ты создаешь Checkout Session на сервере и редиректишь пользователя на Stripe hosted page.

### Поток

1. Пользователь нажимает `Пополнить баланс`.
2. На сервер уходит `POST /api/stripe/create-checkout-session`.
3. Сервер:
   - валидирует сумму;
   - создает запись `payment_transactions` со статусом `pending`;
   - создает Stripe Checkout Session;
   - сохраняет `session.id`;
   - возвращает `url`.
4. Пользователь оплачивает на Stripe.
5. Stripe отправляет webhook.
6. Сервер проверяет подпись webhook.
7. Если событие подтверждено:
   - обновляет `payment_transactions.status = completed`;
   - создает `wallet_ledger_entries` типа `deposit/credit`;
   - баланс пользователя увеличивается.

### Важное правило Stripe

Stripe прямо указывает, что для проверки подписи webhook нужен **raw request body**. Нельзя полагаться на уже распарсенный JSON.

Источник:

- [Stripe webhooks](https://docs.stripe.com/webhooks)

### Какие события слушать

Минимум:

- `checkout.session.completed`
- при необходимости также:
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`

### Что хранить в metadata Stripe

- `userId`
- `walletId`
- `internalPaymentId`
- `type=deposit`

### Пример логики route handler

```ts
// app/api/stripe/create-checkout-session/route.ts
// app/api/stripe/webhook/route.ts
```

### Важная бизнес-логика

Не увеличивай баланс:

- по `success_url`;
- по query params в redirect URL;
- по факту открытия success page.

Увеличение баланса только после валидного webhook.

---

## 14. Пополнение криптой через Heleket

Heleket подходит для crypto deposits через invoice/callback модель.

По официальной документации Heleket:

- создание invoice: `POST https://api.heleket.com/v1/payment`
- webhook приходит на `url_callback`
- статусы включают `paid`, `paid_over`, `wrong_amount`, `confirm_check`, `fail`, `cancel` и другие

### Поток

1. Пользователь выбирает `Пополнить криптой`.
2. Выбирает валюту/сеть, например:
   - `USDT-TRON`
   - `BTC`
   - `ETH`
3. Next.js route handler:
   - валидирует сумму;
   - создает internal payment record;
   - отправляет запрос в Heleket на создание invoice;
   - сохраняет `uuid`, `order_id`, raw payload;
   - возвращает ссылку/реквизиты счета.
4. Пользователь оплачивает invoice.
5. Heleket шлет callback на `url_callback`.
6. Сервер:
   - проверяет подпись webhook;
   - желательно фильтрует источник по IP;
   - смотрит `status` и `is_final`;
   - если платеж финализирован и успешен, проводит credit в ledger.

### Важные детали Heleket из документации

- webhook приходит при изменении статуса invoice;
- рекомендуется:
  - whitelist IP `31.133.220.8`;
  - проверять подпись webhook;
- `order_id` должен быть уникальным;
- при повторном `order_id` API может вернуть существующий invoice вместо создания нового;
- финальные успешные статусы для пополнения обычно `paid` и `paid_over`.

Источники:

- [Heleket create invoice](https://doc.heleket.com/en/methods/payments/creating-invoice)
- [Heleket payment webhook](https://doc.heleket.com/en/methods/payments/webhook)
- [Heleket payment statuses](https://doc.heleket.com/en/methods/payments/payment-statuses)

### Что обязательно хранить

- `provider_invoice_id`
- `order_id`
- `requested_amount`
- `actual_paid_amount`
- `merchant_amount`
- `currency`
- `network`
- `status`
- `is_final`
- `payload`

### Идемпотентность

Webhook может прийти повторно. Поэтому:

- делай `provider + provider_invoice_id` уникальным;
- перед проведением ledger entry проверяй, не был ли платеж уже проведен;
- обработку делай в SQL transaction.

---

## 15. Инвестиции в проекты

## Главный принцип

Деньги пользователя сначала попадают на внутренний баланс, и только затем аллоцируются в проект.

### Поток `инвестировать`

1. Пользователь открывает карточку проекта.
2. Вводит сумму.
3. Сервер проверяет:
   - пользователь авторизован;
   - KYC разрешает инвестицию;
   - проект активен;
   - сумма >= `min_investment`;
   - доступного баланса хватает.
4. В одной транзакции:
   - создается `investment`;
   - создается `investment_event` типа `allocate`;
   - создается `wallet_ledger_entries` типа `investment_allocation/debit`;
   - при необходимости обновляется агрегат позиции.

### Доходность

На MVP проще сделать модель:

- администратор периодически обновляет `project_snapshots`;
- backend пересчитывает `current_value`, `unrealized_pnl`, `roi_percent`;
- dashboard показывает расчетные значения.

Позже можно перейти к:

- внешним market data providers;
- автопересчету по cron;
- отдельному valuation engine.

---

## 16. Дашборд клиента

На дашборде пользователя должны быть блоки:

### Верхние KPI

- `Available Balance`
- `Invested`
- `Total Portfolio Value`
- `Total PnL`
- `ROI %`

### Графики

- динамика баланса;
- динамика портфеля;
- распределение по направлениям;
- распределение по проектам.

### Таблицы

- последние пополнения;
- последние инвестиции;
- открытые позиции;
- история доходности.

### Отдельные страницы

- `/dashboard`
- `/dashboard/deposits`
- `/dashboard/investments`
- `/dashboard/portfolio`
- `/dashboard/settings`

### Что считать на сервере

Сервером лучше считать:

- aggregates по балансу;
- список инвестиций;
- исторические точки графиков.

Клиентом лучше делать:

- фильтры;
- сортировки;
- интерактивные графики.

---

## 17. Админка

Админка нужна сразу. Без нее инвестиционная платформа быстро становится неуправляемой.

### Минимум в админке

- список пользователей;
- KYC-статусы;
- список депозитов;
- список webhook events;
- список проектов;
- изменение `project status`;
- загрузка ROI / NAV / performance snapshots;
- ручные корректировки ledger с audit log;
- ручная разблокировка спорных операций.

### Важное правило

Любая ручная корректировка должна:

- попадать в `audit_logs`;
- иметь `actor_user_id`;
- иметь причину;
- не затирать историю.

---

## 18. Compliance, KYC, AML

Это нельзя откладывать на самый конец.

### Что нужно предусмотреть в архитектуре

- поле `kyc_status`;
- блокировку пополнения/инвестирования до завершения KYC;
- хранение результата проверки;
- manual review flow;
- список заблокированных стран/регионов;
- fraud flags;
- transaction monitoring.

### Рекомендуемые статусы KYC

- `not_started`
- `pending`
- `in_review`
- `verified`
- `rejected`
- `restricted`

### Бизнес-правила

- без `verified` нельзя инвестировать;
- депозиты выше заданного лимита могут требовать enhanced review;
- crypto deposits требуют дополнительного AML monitoring;
- все suspicious actions должны логироваться.

---

## 19. Вывод средств

Даже если ты не делаешь вывод в первой версии, проектируй схему так, как будто он будет.

### Нужно заранее предусмотреть

- таблицу `withdrawal_requests`;
- статусы:
  - `pending`
  - `under_review`
  - `approved`
  - `rejected`
  - `processed`
  - `failed`
- заморозку суммы на балансе;
- audit trail;
- 2-step approval для больших сумм.

Если планируются crypto withdrawals через Heleket payout API, выноси это в отдельный модуль и не смешивай с deposit flow.

---

## 20. Realtime и фоновые задачи

### Где использовать Supabase Realtime

- live-обновление статуса депозита;
- live-обновление dashboard после webhook;
- admin monitoring.

### Где использовать cron / background jobs

- расчет дневной доходности;
- обновление project snapshots;
- reconciliation Stripe/Heleket;
- проверка зависших `pending` платежей;
- ежедневные отчеты.

Можно использовать:

- Vercel Cron;
- Supabase Database Webhooks;
- Supabase Edge Functions;
- отдельный worker.

Официальный материал Supabase по database webhooks:

- [Supabase Database Webhooks](https://supabase.com/docs/guides/database/webhooks)

---

## 21. API endpoints, которые стоит сделать

## Auth / Profile

- `POST /api/profile/onboarding`
- `POST /api/kyc/start`
- `GET /api/me`

## Deposits

- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/webhook`
- `POST /api/heleket/create-invoice`
- `POST /api/heleket/webhook`
- `GET /api/deposits`

## Investments

- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/investments/create`
- `POST /api/investments/redeem`
- `GET /api/investments`
- `GET /api/portfolio/summary`

## Admin

- `POST /api/admin/projects`
- `PATCH /api/admin/projects/:id`
- `POST /api/admin/project-snapshots`
- `POST /api/admin/ledger-adjustments`
- `GET /api/admin/transactions`

---

## 22. Пример бизнес-логики пополнения

## Stripe deposit

```txt
client -> create checkout session
server -> create pending payment transaction
server -> create stripe session
user -> pays on stripe
stripe -> webhook to app
app -> verify signature
app -> mark payment completed
app -> insert ledger credit
dashboard -> updates balance
```

## Heleket deposit

```txt
client -> request crypto deposit
server -> create pending payment transaction
server -> create Heleket invoice
user -> sends crypto
heleket -> webhook to app
app -> verify callback signature
app -> validate final status
app -> mark payment completed
app -> insert ledger credit
dashboard -> updates balance
```

---

## 23. Идемпотентность и транзакционность

Это одна из самых важных частей всей системы.

### Для каждого денежного события

- должен быть уникальный внешний идентификатор;
- операция должна быть идемпотентной;
- повторный webhook не должен повторно зачислять деньги.

### Как делать правильно

- unique index на `payment_transactions(provider, provider_transaction_id)` где возможно;
- unique index на `wallet_ledger_entries(external_id)` если есть внешний event id;
- обработка webhook внутри transaction;
- при conflict либо skip, либо safe update.

---

## 24. UI/UX, который нужен именно здесь

Так как продукт финансовый, интерфейс должен быть:

- строгим;
- очень понятным;
- без лишней визуальной шумихи;
- с явным отображением статусов и рисков.

### Обязательные интерфейсные элементы

- статус KYC;
- предупреждения о рисках;
- блокировка запрещенных действий;
- подтверждение суммы перед инвестированием;
- полный transaction history;
- отдельные статусы:
  - `Pending`
  - `Completed`
  - `Failed`
  - `Under review`

### На карточке проекта важно показывать

- category;
- expected return;
- risk level;
- lock period;
- minimum amount;
- описание механики доходности;
- disclaimer.

---

## 25. Безопасность

### Обязательно

- rate limiting на auth, deposits, webhook routes;
- CSRF protection там, где нужно;
- server-side validation через `zod`;
- audit logs;
- secrets только в env;
- запрет privileged операций с клиента;
- логирование ошибок;
- monitoring и alerting.

### Для webhook routes

- Stripe: verify signature по raw body;
- Heleket: verify signature и whitelist IP;
- всегда возвращать корректный HTTP status;
- хранить raw payload в таблице webhook logs.

### Отдельная таблица `webhook_events`

Рекомендую добавить:

- `id`
- `provider`
- `event_type`
- `external_event_id`
- `payload`
- `processed_at`
- `status`
- `error_message`

---

## 26. Производительность и масштабирование

На старте проблем не будет, если:

- индексы есть на `user_id`, `status`, `created_at`, `project_id`;
- тяжелые aggregates не считать на каждый рендер;
- большие графики отдавать через pre-aggregated views;
- admin pages пагинировать.

### Важные индексы

- `payment_transactions(user_id, created_at desc)`
- `wallet_ledger_entries(user_id, created_at desc)`
- `investments(user_id, status)`
- `project_snapshots(project_id, snapshot_date desc)`

---

## 27. Развертывание

## Рекомендуемый вариант

- frontend/backend: `Vercel`
- database/auth/storage: `Supabase Cloud`

### Перед production

- настроить custom domain;
- включить HTTPS;
- настроить webhook URLs;
- добавить production secrets;
- включить backups в Supabase;
- включить error tracking;
- настроить scheduled jobs;
- настроить legal pages.

### Production webhook endpoints

Примеры:

- `https://app.yourdomain.com/api/stripe/webhook`
- `https://app.yourdomain.com/api/heleket/webhook`

---

## 28. Что делать по этапам

## Этап 1. Foundation

Сделать:

- Next.js app;
- Supabase project;
- auth;
- profiles;
- wallets;
- базовый dashboard layout;
- RLS policies.

## Этап 2. Payments

Сделать:

- Stripe Checkout;
- Stripe webhook;
- Heleket create invoice;
- Heleket webhook;
- payment transactions;
- ledger credit flow.

## Этап 3. Investment module

Сделать:

- projects;
- investments;
- investment allocation logic;
- portfolio summary;
- project detail pages.

## Этап 4. Admin

Сделать:

- admin routes;
- project management;
- snapshot management;
- transaction monitoring;
- ledger adjustments;
- audit logs.

## Этап 5. Compliance & hardening

Сделать:

- KYC integration;
- AML checks;
- withdrawal review flow;
- monitoring;
- alerting;
- legal gating;
- penetration testing.

---

## 29. Что я бы не советовал делать

- не хранить баланс только одним полем;
- не делать buy/sell реальных securities без лицензирования;
- не смешивать инвестиционный портфель и платежный ledger в одну простую таблицу;
- не доверять client-side расчетам;
- не использовать success redirect как источник истины по оплате;
- не запускать real-money инвестиции без KYC/AML и legal review;
- не давать admin-права через client-side role checks.

---

## 30. Минимальный roadmap на 6-8 недель

### Неделя 1

- инициализация проекта;
- Supabase setup;
- auth;
- profiles;
- dashboard shell.

### Неделя 2

- wallets;
- ledger;
- RLS;
- portfolio summary queries.

### Неделя 3

- Stripe integration;
- success/cancel flow;
- Stripe webhook;
- deposit history UI.

### Неделя 4

- Heleket integration;
- crypto deposit UI;
- callback processing;
- idempotency hardening.

### Неделя 5

- projects module;
- project detail pages;
- investment allocation.

### Неделя 6

- ROI snapshots;
- PnL calculations;
- dashboard charts.

### Неделя 7

- admin panel;
- audit logs;
- manual adjustments;
- transaction review.

### Неделя 8

- KYC integration;
- final security pass;
- staging;
- UAT.

---

## 31. Что стоит добавить сразу в backlog

- referral system;
- promo codes;
- multi-currency wallets;
- dividend / yield distribution engine;
- withdrawal approval queue;
- investor statements PDF;
- tax reports;
- notification center;
- email + Telegram alerts;
- support tickets;
- document vault.

---

## 32. Итоговая рекомендация по реализации

Если кратко, оптимальная стратегия такая:

1. Делай `Next.js App Router` как основной full-stack слой.
2. Используй `Supabase` для auth, Postgres, RLS, storage и realtime.
3. Строй систему вокруг **ledger-first architecture**, а не вокруг поля `balance`.
4. Фиатные пополнения проводи через `Stripe Checkout + webhook`.
5. Крипто-пополнения проводи через `Heleket invoice + callback + signature verification`.
6. Инвестиции делай как внутренние аллокации средств в проекты.
7. Доходность на MVP считай через `project_snapshots` и server-side агрегаты.
8. Админку, audit logs и compliance hooks закладывай сразу.
9. Реальный запуск с деньгами клиентов не делай без legal/compliance слоя.

---

## 33. Полезные официальные ссылки

- Next.js App Router: [https://nextjs.org/docs/app](https://nextjs.org/docs/app)
- Next.js installation: [https://nextjs.org/docs/app/getting-started/installation](https://nextjs.org/docs/app/getting-started/installation)
- Next.js route handlers: [https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware](https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware)
- Supabase SSR + Next.js: [https://supabase.com/docs/guides/auth/server-side/nextjs](https://supabase.com/docs/guides/auth/server-side/nextjs)
- Supabase Auth quickstart: [https://supabase.com/docs/guides/auth/quickstarts/nextjs](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- Supabase RLS: [https://supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Supabase Realtime: [https://supabase.com/docs/guides/realtime](https://supabase.com/docs/guides/realtime)
- Supabase Database Webhooks: [https://supabase.com/docs/guides/database/webhooks](https://supabase.com/docs/guides/database/webhooks)
- Stripe Checkout Sessions: [https://docs.stripe.com/api/checkout/sessions/create](https://docs.stripe.com/api/checkout/sessions/create)
- Stripe Webhooks: [https://docs.stripe.com/webhooks](https://docs.stripe.com/webhooks)
- Heleket docs: [https://doc.heleket.com/en](https://doc.heleket.com/en)
- Heleket create invoice: [https://doc.heleket.com/en/methods/payments/creating-invoice](https://doc.heleket.com/en/methods/payments/creating-invoice)
- Heleket payment webhook: [https://doc.heleket.com/en/methods/payments/webhook](https://doc.heleket.com/en/methods/payments/webhook)
- Heleket payment statuses: [https://doc.heleket.com/en/methods/payments/payment-statuses](https://doc.heleket.com/en/methods/payments/payment-statuses)
- SEC investment adviser registration: [https://www.sec.gov/divisions/investment/iard/register.shtml](https://www.sec.gov/divisions/investment/iard/register.shtml)
- SEC broker-dealer registration guide: [https://www.sec.gov/about/reports-publications/investor-publications/guide-broker-dealer-registration](https://www.sec.gov/about/reports-publications/investor-publications/guide-broker-dealer-registration)

