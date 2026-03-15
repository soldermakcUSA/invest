-- ============================================================
-- RLS-политики для таблицы users
-- Выполните этот скрипт в Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Убедимся, что RLS включён
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Удалим старые политики (если были)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- 3. Политика SELECT — пользователь может читать только свою запись
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid()::text = uid);

-- 4. Политика INSERT — пользователь может создать только свою запись
CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
WITH CHECK (auth.uid()::text = uid);

-- 5. Политика UPDATE — пользователь может обновлять только свою запись
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid()::text = uid)
WITH CHECK (auth.uid()::text = uid);
