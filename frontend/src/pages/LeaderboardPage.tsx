import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  player_name: string;
  total_xp: number;
  topics_completed: number;
  quizzes_completed: number;
}

const LeaderboardPage = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("id, player_name, total_xp, topics_completed, quizzes_completed")
      .order("total_xp", { ascending: false })
      .limit(50);

    if (!error && data) setEntries(data);
    setLoading(false);
  };

  const getRankIcon = (idx: number) => {
    if (idx === 0) return <Trophy className="h-5 w-5 text-primary" />;
    if (idx === 1) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (idx === 2) return <Medal className="h-5 w-5 text-accent" />;
    return <span className="flex h-5 w-5 items-center justify-center text-xs font-bold text-muted-foreground">{idx + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-gold">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Global Leaderboard</h1>
              <p className="text-sm text-muted-foreground">
                Earn XP by completing topics (+100 XP) and quizzes (+50 XP)
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <Star className="mx-auto mb-1 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">Topic Completed</p>
              <p className="font-display text-lg font-bold text-primary">+100 XP</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <Zap className="mx-auto mb-1 h-5 w-5 text-accent" />
              <p className="text-xs text-muted-foreground">Quiz Completed</p>
              <p className="font-display text-lg font-bold text-accent">+50 XP</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-border bg-secondary/30 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Rank</span>
              <span>Player</span>
              <span>Stats</span>
              <span>XP</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : entries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No entries yet. Complete topics and quizzes to appear here!
              </div>
            ) : (
              entries.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-4 py-3 border-b border-border/50 ${
                    idx < 3 ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(idx)}
                  </div>
                  <span className="font-medium text-foreground truncate">{entry.player_name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {entry.topics_completed}T · {entry.quizzes_completed}Q
                  </span>
                  <span className="font-display font-bold text-primary whitespace-nowrap">
                    {entry.total_xp} XP
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
