-- AlphaForge Ventures / Risk / AI Seed
-- Run in Supabase SQL Editor while authenticated as the target user,
-- or replace auth.uid()::text with a concrete uid.

with target_user as (
  select auth.uid()::text as uid
)
insert into public.ventures (
  user_uid,
  name,
  category,
  stage,
  summary,
  thesis,
  status,
  target_allocation_pct
)
select uid, name, category, stage, summary, thesis, status, target_allocation_pct
from target_user,
(
  values
    ('Alpha Compute Grid', 'AI Infrastructure', 'Seed', 'Distributed compute marketplace for AI workloads.', 'Exposure to AI compute demand and infrastructure monetization.', 'watching', 6.0),
    ('Delta Chain Labs', 'Digital Assets', 'Series A', 'Blockchain infrastructure focused on settlement and tooling.', 'Utility-driven crypto infrastructure with enterprise upside.', 'active', 5.0),
    ('Signal Harbor Data', 'Market Intelligence', 'Pre-Seed', 'Data and analytics tooling for discretionary traders.', 'Institutional-quality market data products with recurring demand.', 'watching', 4.0),
    ('Northstar Ventures', 'Growth Capital', 'Private', 'Selective growth opportunities across frontier technology.', 'Asymmetric upside with strict risk-controlled allocation.', 'review', 7.0)
) as seed(name, category, stage, summary, thesis, status, target_allocation_pct)
on conflict do nothing;

with target_user as (
  select auth.uid()::text as uid
)
insert into public.risk_scans (
  user_uid,
  target_type,
  target_name,
  input_text,
  risk_level,
  primary_red_flag,
  recommendation,
  model,
  raw_result
)
select uid, target_type, target_name, input_text, risk_level, primary_red_flag, recommendation, model, raw_result::jsonb
from target_user,
(
  values
    ('fund', 'High-yield private fund review', 'Reviewing allocation structure, counterparties, and liquidity.', 'High', 'Unclear liquidity terms', 'Reduce exposure until redemption and liquidity terms are clarified.', 'gemini', '{"score":85,"status":"high"}'),
    ('token', 'Token presale liquidity audit', 'Token presale with unclear treasury controls and unlock schedule.', 'Medium', 'Weak treasury transparency', 'Require token unlock schedule and wallet disclosures before participating.', 'gemini', '{"score":61,"status":"medium"}'),
    ('venture', 'Emerging venture due diligence', 'Venture deal with limited operating history and partial financials.', 'Medium', 'Limited reporting history', 'Proceed only with enhanced diligence and staged capital deployment.', 'gemini', '{"score":58,"status":"medium"}'),
    ('equity', 'Blue-chip equity strategy review', 'Core large-cap equity allocation review.', 'Low', 'No major red flags', 'Remain within target sizing and monitor valuation compression risk.', 'gemini', '{"score":18,"status":"low"}')
) as seed(target_type, target_name, input_text, risk_level, primary_red_flag, recommendation, model, raw_result)
on conflict do nothing;

with target_user as (
  select auth.uid()::text as uid
), inserted_threads as (
  insert into public.ai_threads (user_uid, tool, title)
  select uid, tool, title
  from target_user,
  (
    values
      ('analyst', 'Macro Outlook'),
      ('analyst', 'Crypto View'),
      ('risk', 'Risk Review')
  ) as seed(tool, title)
  on conflict do nothing
  returning id, tool, title
), existing_threads as (
  select id, tool, title from inserted_threads
  union all
  select t.id, t.tool, t.title
  from public.ai_threads t
  join target_user tu on tu.uid = t.user_uid
  where t.title in ('Macro Outlook', 'Crypto View', 'Risk Review')
)
insert into public.ai_messages (thread_id, role, content, meta)
select thread_id, role, content, meta::jsonb
from (
  select id as thread_id, 'assistant' as role,
         case title
           when 'Macro Outlook' then 'Energy-led inflation risk remains the main macro issue. Investors should watch oil, the dollar, and rate sensitivity closely.'
           when 'Crypto View' then 'Bitcoin remains structurally stronger than many altcoins, but macro volatility still dominates short-term price action.'
           when 'Risk Review' then 'Current positioning favors discipline over aggression. Focus on capital preservation while geopolitical risk stays elevated.'
         end as content,
         '{"source":"seed"}' as meta
  from existing_threads
) seeded_messages
on conflict do nothing;
