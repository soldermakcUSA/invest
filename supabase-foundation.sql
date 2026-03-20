-- AlphaForge Supabase Foundation
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles (keeps compatibility with existing public.users table)
create table if not exists public.users (
  uid text primary key,
  email text unique,
  display_name text,
  first_name text,
  last_name text,
  photo_url text,
  marketing_opt_in boolean not null default false,
  theme text not null default 'dark',
  balance numeric(20,2) not null default 0,
  yield numeric(10,2) not null default 0,
  daily_change numeric(20,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

create table if not exists public.user_settings (
  user_uid text primary key references public.users(uid) on delete cascade,
  base_currency text not null default 'USD',
  timezone text not null default 'America/New_York',
  notifications_enabled boolean not null default true,
  dashboard_layout jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_user_settings_updated_at
before update on public.user_settings
for each row
execute function public.set_updated_at();

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_uid text not null references public.users(uid) on delete cascade,
  name text not null,
  type text not null default 'personal',
  base_currency text not null default 'USD',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolios_user_uid_idx on public.portfolios(user_uid);
create trigger set_portfolios_updated_at
before update on public.portfolios
for each row
execute function public.set_updated_at();

create table if not exists public.portfolio_positions (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  asset_name text not null,
  ticker text not null,
  asset_type text not null,
  quantity numeric(20,8) not null default 0,
  avg_cost numeric(20,8) default 0,
  current_price numeric(20,8) default 0,
  market_value numeric(20,8) default 0,
  allocation_pct numeric(10,4) default 0,
  pnl_pct numeric(10,4) default 0,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (portfolio_id, ticker, asset_type)
);

create index if not exists portfolio_positions_portfolio_id_idx on public.portfolio_positions(portfolio_id);
create trigger set_portfolio_positions_updated_at
before update on public.portfolio_positions
for each row
execute function public.set_updated_at();

create table if not exists public.portfolio_snapshots (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  snapshot_date date not null,
  nav numeric(20,2) not null,
  daily_change numeric(20,2) not null default 0,
  daily_change_pct numeric(10,4) not null default 0,
  total_return_pct numeric(10,4) not null default 0,
  created_at timestamptz not null default now(),
  unique (portfolio_id, snapshot_date)
);

create index if not exists portfolio_snapshots_portfolio_id_idx on public.portfolio_snapshots(portfolio_id);
create index if not exists portfolio_snapshots_portfolio_id_snapshot_date_idx on public.portfolio_snapshots(portfolio_id, snapshot_date desc);

create table if not exists public.ventures (
  id uuid primary key default gen_random_uuid(),
  user_uid text not null references public.users(uid) on delete cascade,
  name text not null,
  category text,
  stage text,
  summary text,
  thesis text,
  status text not null default 'watching',
  target_allocation_pct numeric(10,4) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ventures_user_uid_idx on public.ventures(user_uid);
create trigger set_ventures_updated_at
before update on public.ventures
for each row
execute function public.set_updated_at();

create table if not exists public.risk_scans (
  id uuid primary key default gen_random_uuid(),
  user_uid text not null references public.users(uid) on delete cascade,
  venture_id uuid references public.ventures(id) on delete set null,
  target_type text not null,
  target_name text not null,
  input_text text,
  risk_level text,
  primary_red_flag text,
  recommendation text,
  model text,
  raw_result jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists risk_scans_user_uid_idx on public.risk_scans(user_uid);
create index if not exists risk_scans_venture_id_idx on public.risk_scans(venture_id);

create table if not exists public.ai_threads (
  id uuid primary key default gen_random_uuid(),
  user_uid text not null references public.users(uid) on delete cascade,
  tool text not null,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_threads_user_uid_idx on public.ai_threads(user_uid);
create trigger set_ai_threads_updated_at
before update on public.ai_threads
for each row
execute function public.set_updated_at();

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.ai_threads(id) on delete cascade,
  role text not null,
  content text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ai_messages_thread_id_idx on public.ai_messages(thread_id);

-- RLS
alter table public.users enable row level security;
alter table public.user_settings enable row level security;
alter table public.portfolios enable row level security;
alter table public.portfolio_positions enable row level security;
alter table public.portfolio_snapshots enable row level security;
alter table public.ventures enable row level security;
alter table public.risk_scans enable row level security;
alter table public.ai_threads enable row level security;
alter table public.ai_messages enable row level security;

-- users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
create policy "Users can view own profile" on public.users for select using (auth.uid()::text = uid);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid()::text = uid);
create policy "Users can update own profile" on public.users for update using (auth.uid()::text = uid) with check (auth.uid()::text = uid);

-- user_settings
DROP POLICY IF EXISTS "Users can view own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_settings;
create policy "Users can view own settings" on public.user_settings for select using (auth.uid()::text = user_uid);
create policy "Users can insert own settings" on public.user_settings for insert with check (auth.uid()::text = user_uid);
create policy "Users can update own settings" on public.user_settings for update using (auth.uid()::text = user_uid) with check (auth.uid()::text = user_uid);

-- portfolios
DROP POLICY IF EXISTS "Users can manage own portfolios" ON public.portfolios;
create policy "Users can manage own portfolios" on public.portfolios for all using (auth.uid()::text = user_uid) with check (auth.uid()::text = user_uid);

-- positions
DROP POLICY IF EXISTS "Users can manage own positions" ON public.portfolio_positions;
create policy "Users can manage own positions" on public.portfolio_positions for all
using (
  exists (
    select 1 from public.portfolios p
    where p.id = portfolio_positions.portfolio_id and p.user_uid = auth.uid()::text
  )
)
with check (
  exists (
    select 1 from public.portfolios p
    where p.id = portfolio_positions.portfolio_id and p.user_uid = auth.uid()::text
  )
);

-- snapshots
DROP POLICY IF EXISTS "Users can manage own snapshots" ON public.portfolio_snapshots;
create policy "Users can manage own snapshots" on public.portfolio_snapshots for all
using (
  exists (
    select 1 from public.portfolios p
    where p.id = portfolio_snapshots.portfolio_id and p.user_uid = auth.uid()::text
  )
)
with check (
  exists (
    select 1 from public.portfolios p
    where p.id = portfolio_snapshots.portfolio_id and p.user_uid = auth.uid()::text
  )
);

-- ventures
DROP POLICY IF EXISTS "Users can manage own ventures" ON public.ventures;
create policy "Users can manage own ventures" on public.ventures for all using (auth.uid()::text = user_uid) with check (auth.uid()::text = user_uid);

-- risk_scans
DROP POLICY IF EXISTS "Users can manage own risk scans" ON public.risk_scans;
create policy "Users can manage own risk scans" on public.risk_scans for all using (auth.uid()::text = user_uid) with check (auth.uid()::text = user_uid);

-- ai_threads
DROP POLICY IF EXISTS "Users can manage own ai threads" ON public.ai_threads;
create policy "Users can manage own ai threads" on public.ai_threads for all using (auth.uid()::text = user_uid) with check (auth.uid()::text = user_uid);

-- ai_messages
DROP POLICY IF EXISTS "Users can manage own ai messages" ON public.ai_messages;
create policy "Users can manage own ai messages" on public.ai_messages for all
using (
  exists (
    select 1 from public.ai_threads t
    where t.id = ai_messages.thread_id and t.user_uid = auth.uid()::text
  )
)
with check (
  exists (
    select 1 from public.ai_threads t
    where t.id = ai_messages.thread_id and t.user_uid = auth.uid()::text
  )
);
