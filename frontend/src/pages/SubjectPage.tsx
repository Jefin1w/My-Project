import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { subjects } from "@/data/subjects";
import { Navbar } from "@/components/Navbar";

const SubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  const Icon = subject.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate("/")} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-6 w-6 text-primary" /></div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">{subject.name}</h1>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </div>
          </div>

          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Topics</h2>
          <div className="space-y-3">
            {subject.lessons.map((lesson, i) => (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} onClick={() => navigate(`/subject/${subject.id}/lesson/${lesson.id}`)} className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-glow hover:border-primary/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary"><BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" /></div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{lesson.quizzes.length} quizzes included</p>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {subject.lessons.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">No lessons yet. Admin can add content from the Admin Panel.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectPage;
