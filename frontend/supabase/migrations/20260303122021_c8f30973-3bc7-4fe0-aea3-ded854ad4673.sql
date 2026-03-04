
-- Add user_id column to leaderboard
ALTER TABLE public.leaderboard ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can insert leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Anyone can update leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Anyone can view leaderboard" ON public.leaderboard;

-- New RLS policies: public read (non-sensitive fields only), auth insert/update own
CREATE POLICY "Public can view leaderboard"
  ON public.leaderboard FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own leaderboard"
  ON public.leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leaderboard"
  ON public.leaderboard FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Revoke full SELECT, grant only non-sensitive columns
REVOKE SELECT ON public.leaderboard FROM anon, authenticated;
GRANT SELECT (id, player_name, total_xp, topics_completed, quizzes_completed, created_at, updated_at)
  ON public.leaderboard TO anon, authenticated;

-- Also secure xp_log: drop open insert, require auth
DROP POLICY IF EXISTS "Anyone can insert xp_log" ON public.xp_log;
DROP POLICY IF EXISTS "Anyone can view xp_log" ON public.xp_log;

CREATE POLICY "Authenticated users can insert xp_log"
  ON public.xp_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view xp_log"
  ON public.xp_log FOR SELECT
  TO authenticated
  USING (true);
