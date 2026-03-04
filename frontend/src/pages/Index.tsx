import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { subjects } from "@/data/subjects";
import { SubjectCard } from "@/components/SubjectCard";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-16 lg:py-24">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(38 92% 55% / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(172 66% 50% / 0.06) 0%, transparent 50%)"
        }} />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Class 12 Learning Platform
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Master Your <span className="text-gradient-gold">Subjects</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
              Interactive lessons, 3D models, AI-powered assistance, and quizzes — everything you need to ace your Class 12 exams.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /><span>7 Subjects</span></div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /><span>AI Study Buddy</span></div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span>3D Models</span></div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-destructive" /><span>Interactive Quizzes</span></div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 font-display text-2xl font-bold text-foreground">Choose a Subject</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject, i) => (
            <SubjectCard key={subject.id} subject={subject} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
