create extension if not exists "pgcrypto";

create table if not exists public.profiles (
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

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  currency text not null default 'USD',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.payment_transactions (
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

create unique index if not exists payment_transactions_provider_transaction_uidx
on public.payment_transactions (provider, provider_transaction_id)
where provider_transaction_id is not null;

create table if not exists public.wallet_ledger_entries (
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

create unique index if not exists wallet_ledger_entries_external_id_uidx
on public.wallet_ledger_entries (external_id)
where external_id is not null;

create table if not exists public.projects (
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

create table if not exists public.project_snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  nav numeric(20,8),
  total_raised numeric(20,8),
  total_invested numeric(20,8),
  roi_percent numeric(10,4),
  snapshot_date date not null,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.investments (
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

create table if not exists public.investment_events (
  id uuid primary key default gen_random_uuid(),
  investment_id uuid not null references public.investments(id) on delete cascade,
  event_type text not null,
  amount numeric(20,8),
  units numeric(20,8),
  price numeric(20,8),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.kyc_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text,
  status text not null default 'pending',
  reference_id text,
  payload jsonb not null default '{}'::jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.wallet_ledger_entries enable row level security;
alter table public.projects enable row level security;
alter table public.project_snapshots enable row level security;
alter table public.investments enable row level security;
alter table public.investment_events enable row level security;
alter table public.kyc_records enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id);

create policy "wallets_select_own"
on public.wallets
for select
using (auth.uid() = user_id);

create policy "transactions_select_own"
on public.payment_transactions
for select
using (auth.uid() = user_id);

create policy "ledger_select_own"
on public.wallet_ledger_entries
for select
using (auth.uid() = user_id);

create policy "projects_select_active"
on public.projects
for select
using (status in ('active', 'closed'));

create policy "snapshots_select_authenticated"
on public.project_snapshots
for select
using (auth.role() = 'authenticated');

create policy "investments_select_own"
on public.investments
for select
using (auth.uid() = user_id);

create policy "investment_events_select_own"
on public.investment_events
for select
using (
  exists (
    select 1
    from public.investments i
    where i.id = investment_id and i.user_id = auth.uid()
  )
);

create policy "kyc_select_own"
on public.kyc_records
for select
using (auth.uid() = user_id);
