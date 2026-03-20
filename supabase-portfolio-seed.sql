-- AlphaForge Portfolio Seed
-- Run this in Supabase SQL Editor while authenticated as the target user,
-- or replace auth.uid()::text with a concrete uid.

with target_user as (
  select auth.uid()::text as uid
), upsert_portfolio as (
  insert into public.portfolios (user_uid, name, type, base_currency, is_default)
  select uid, 'AlphaForge Core Portfolio', 'personal', 'USD', true
  from target_user
  on conflict do nothing
  returning id, user_uid
), selected_portfolio as (
  select id, user_uid from upsert_portfolio
  union all
  select p.id, p.user_uid
  from public.portfolios p
  join target_user tu on tu.uid = p.user_uid
  where p.is_default = true
  limit 1
)
insert into public.portfolio_positions (
  portfolio_id,
  asset_name,
  ticker,
  asset_type,
  quantity,
  avg_cost,
  current_price,
  market_value,
  allocation_pct,
  pnl_pct,
  status
)
select id, asset_name, ticker, asset_type, quantity, avg_cost, current_price, market_value, allocation_pct, pnl_pct, status
from selected_portfolio,
(
  values
    ('NVIDIA', 'NVDA', 'equity', 120, 182.00, 218.83, 26259.60, 18.0, 20.2, 'active'),
    ('Bitcoin', 'BTC', 'crypto', 0.31, 62900.00, 75296.77, 23342.00, 16.0, 19.7, 'active'),
    ('Microsoft', 'MSFT', 'equity', 46, 360.00, 412.30, 18965.80, 13.0, 14.5, 'active'),
    ('Solana', 'SOL', 'crypto', 101, 107.40, 130.00, 13130.00, 9.0, 21.0, 'active'),
    ('Private AI Deal', 'AI-01', 'venture', 1, 11050.00, 11671.00, 11671.00, 8.0, 5.6, 'active'),
    ('Cash Reserve', 'USD', 'cash', 10212, 1.00, 1.00, 10212.00, 7.0, 0.0, 'active')
) as seed(asset_name, ticker, asset_type, quantity, avg_cost, current_price, market_value, allocation_pct, pnl_pct, status)
on conflict (portfolio_id, ticker, asset_type)
do update set
  quantity = excluded.quantity,
  avg_cost = excluded.avg_cost,
  current_price = excluded.current_price,
  market_value = excluded.market_value,
  allocation_pct = excluded.allocation_pct,
  pnl_pct = excluded.pnl_pct,
  status = excluded.status,
  updated_at = now();

with target_user as (
  select auth.uid()::text as uid
), selected_portfolio as (
  select p.id
  from public.portfolios p
  join target_user tu on tu.uid = p.user_uid
  where p.is_default = true
  limit 1
)
insert into public.portfolio_snapshots (
  portfolio_id,
  snapshot_date,
  nav,
  daily_change,
  daily_change_pct,
  total_return_pct
)
select id, snapshot_date, nav, daily_change, daily_change_pct, total_return_pct
from selected_portfolio,
(
  values
    ('2026-01-01'::date, 118000.00, 0.00, 0.00, 0.00),
    ('2026-02-01'::date, 121500.00, 3500.00, 2.97, 2.97),
    ('2026-03-01'::date, 124200.00, 2700.00, 2.22, 5.25),
    ('2026-04-01'::date, 129800.00, 5600.00, 4.51, 9.99),
    ('2026-05-01'::date, 133400.00, 3600.00, 2.77, 13.05),
    ('2026-06-01'::date, 138900.00, 5500.00, 4.12, 17.71),
    ('2026-07-01'::date, 142300.00, 3400.00, 2.45, 20.59),
    ('2026-08-01'::date, 145892.00, 3592.00, 2.52, 23.64)
) as seed(snapshot_date, nav, daily_change, daily_change_pct, total_return_pct)
on conflict (portfolio_id, snapshot_date)
do update set
  nav = excluded.nav,
  daily_change = excluded.daily_change,
  daily_change_pct = excluded.daily_change_pct,
  total_return_pct = excluded.total_return_pct;
