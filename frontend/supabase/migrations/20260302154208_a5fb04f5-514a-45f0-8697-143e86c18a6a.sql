
-- Leaderboard table for XP tracking
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  email TEXT,
  total_xp INTEGER NOT NULL DEFAULT 0,
  topics_completed INTEGER NOT NULL DEFAULT 0,
  quizzes_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Everyone can read the leaderboard
CREATE POLICY "Anyone can view leaderboard" ON public.leaderboard FOR SELECT USING (true);

-- Anyone can insert (no auth required for this simple app)
CREATE POLICY "Anyone can insert leaderboard" ON public.leaderboard FOR INSERT WITH CHECK (true);

-- Anyone can update their own entry by email
CREATE POLICY "Anyone can update leaderboard" ON public.leaderboard FOR UPDATE USING (true);

-- XP activity log
CREATE TABLE public.xp_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('topic_completed', 'quiz_completed')),
  subject_id TEXT NOT NULL,
  lesson_id TEXT,
  xp_earned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.xp_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view xp_log" ON public.xp_log FOR SELECT USING (true);
CREATE POLICY "Anyone can insert xp_log" ON public.xp_log FOR INSERT WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON public.leaderboard
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
