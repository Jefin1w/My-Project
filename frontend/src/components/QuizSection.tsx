import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { Quiz } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { awardXP } from "@/lib/xp";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface QuizSectionProps {
  quiz: Quiz;
  subjectId?: string;
  lessonId?: string;
}

export function QuizSection({ quiz, subjectId, lessonId }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const question = quiz.questions[currentQ];
  const playerName = user?.user_metadata?.full_name || user?.email || "Anonymous";

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = async () => {
    if (currentQ + 1 >= quiz.questions.length) {
      setFinished(true);
      if (user && !xpAwarded) {
        setXpAwarded(true);
        await awardXP({
          userId: user.email || user.id,
          playerName,
          activityType: "quiz_completed",
          subjectId: subjectId || "unknown",
          lessonId,
          xpAmount: 50,
        });
        toast({ title: "+50 XP!", description: "Quiz completed! Check the leaderboard." });
      }
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setXpAwarded(false);
  };

  if (finished) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-border bg-card p-6 text-center"
      >
        <Trophy className="mx-auto mb-3 h-10 w-10 text-primary" />
        <h4 className="font-display text-xl font-bold text-foreground">
          {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good job!" : "Keep practicing!"}
        </h4>
        <p className="mt-2 text-2xl font-bold text-primary">{score}/{quiz.questions.length}</p>
        <p className="text-sm text-muted-foreground">Score: {pct}%</p>
        <p className="mt-1 text-xs text-accent font-medium">+50 XP earned!</p>
        <Button onClick={handleReset} variant="outline" className="mt-4 gap-2">
          <RotateCcw className="h-4 w-4" /> Retry
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-display text-sm font-semibold text-primary">{quiz.title}</h4>
        <span className="text-xs text-muted-foreground">{currentQ + 1}/{quiz.questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <p className="mb-4 font-medium text-foreground">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((opt, idx) => {
              let style = "border-border bg-secondary/30 hover:bg-secondary/60";
              if (answered) {
                if (idx === question.correctAnswer) style = "border-accent bg-accent/10";
                else if (idx === selected) style = "border-destructive bg-destructive/10";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {answered && idx === question.correctAnswer && <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />}
                  {answered && idx === selected && idx !== question.correctAnswer && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                  {(!answered || (idx !== question.correctAnswer && idx !== selected)) && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground text-[10px] text-muted-foreground">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  )}
                  <span className="text-foreground">{opt}</span>
                </button>
              );
            })}
          </div>
          {answered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-end">
              <Button onClick={handleNext} size="sm">
                {currentQ + 1 >= quiz.questions.length ? "Finish" : "Next"}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
