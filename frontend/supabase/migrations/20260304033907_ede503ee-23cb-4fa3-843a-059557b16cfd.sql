
CREATE TABLE public.admin_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  added_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Seed the initial admin emails
INSERT INTO public.admin_emails (email, added_by) VALUES
  ('jebinjeffry2019@gmail.com', 'system'),
  ('prakashjeffry@gmail.com', 'system');

-- Security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails ae
    JOIN auth.users u ON lower(u.email) = lower(ae.email)
    WHERE u.id = _user_id
  )
$$;

-- Only admins can view admin_emails
CREATE POLICY "Admins can view admin emails"
ON public.admin_emails FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only admins can insert admin emails
CREATE POLICY "Admins can insert admin emails"
ON public.admin_emails FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can delete admin emails
CREATE POLICY "Admins can delete admin emails"
ON public.admin_emails FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));
