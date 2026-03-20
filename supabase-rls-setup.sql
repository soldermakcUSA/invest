-- Legacy-compatible RLS for public.users
-- If you are using the new foundation, this is already included there.

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid()::text = uid);

CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
WITH CHECK (auth.uid()::text = uid);

CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid()::text = uid)
WITH CHECK (auth.uid()::text = uid);
