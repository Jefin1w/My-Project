import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { subjects } from "@/data/subjects";
import { Navbar } from "@/components/Navbar";
import { QuizSection } from "@/components/QuizSection";
import { ModelViewer } from "@/components/ModelViewer";
import { Button } from "@/components/ui/button";
import { awardXP } from "@/lib/xp";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const LessonPage = () => {
  const { subjectId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const subject = subjects.find((s) => s.id === subjectId);
  const lesson = subject?.lessons.find((l) => l.id === lessonId);
  const [topicCompleted, setTopicCompleted] = useState(false);

  if (!subject || !lesson) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Lesson not found</p></div>;
  }

  const playerName = user?.user_metadata?.full_name || user?.email || "Anonymous";

  const handleCompleteTopic = async () => {
    if (!user) return;
    await awardXP({
      userId: user.email || user.id,
      playerName,
      activityType: "topic_completed",
      subjectId: subject.id,
      lessonId: lesson.id,
      xpAmount: 100,
    });
    setTopicCompleted(true);
    toast({ title: "+100 XP!", description: "Topic completed! Keep going!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate(`/subject/${subject.id}`)} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />Back to {subject.name}
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <span className="text-xs font-medium text-primary">{subject.name}</span>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{lesson.title}</h1>
          </div>

          <ModelViewer modelUrl={lesson.modelUrl} title={lesson.title} />

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Lesson Content</h2>
            <div className="prose-sm text-secondary-foreground leading-relaxed whitespace-pre-line">{lesson.content}</div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleCompleteTopic} disabled={topicCompleted} className="gap-2" size="lg">
              {topicCompleted ? (<><CheckCircle className="h-4 w-4" />Topic Completed (+100 XP)</>) : "Mark Topic as Complete (+100 XP)"}
            </Button>
          </div>

          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Quizzes</h2>
            <div className="space-y-6">
              {lesson.quizzes.map((quiz) => (
                <QuizSection key={quiz.id} quiz={quiz} subjectId={subject.id} lessonId={lesson.id} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;
