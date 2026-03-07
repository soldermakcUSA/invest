insert into public.projects (slug, title, description, category, risk_level, status, target_return, min_investment, currency)
values
  (
    'aurora-credit',
    'Aurora Credit Basket',
    'Short-duration structured yield sleeve with conservative operating limits.',
    'mixed',
    'moderate',
    'active',
    14.8,
    500,
    'USD'
  ),
  (
    'signal-chain',
    'Signal Chain Alpha',
    'Liquid crypto sleeve focused on tactical and market-neutral deployment.',
    'crypto',
    'high',
    'active',
    24.2,
    250,
    'USD'
  ),
  (
    'harbor-estate',
    'Harbor Estate Income',
    'Income-biased real estate operating sleeve for lower-volatility exposure.',
    'real_estate',
    'low',
    'active',
    9.4,
    1000,
    'USD'
  )
on conflict (slug) do nothing;
