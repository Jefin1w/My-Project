import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Subject } from "@/data/subjects";

interface SubjectCardProps {
  subject: Subject;
  index: number;
}

const colorMap: Record<string, string> = {
  "subject-english": "from-[hsl(340,65%,55%)] to-[hsl(340,65%,40%)]",
  "subject-maths": "from-[hsl(220,80%,60%)] to-[hsl(220,80%,45%)]",
  "subject-physics": "from-[hsl(38,92%,55%)] to-[hsl(38,92%,40%)]",
  "subject-chemistry": "from-[hsl(150,60%,45%)] to-[hsl(150,60%,32%)]",
  "subject-biology": "from-[hsl(120,50%,45%)] to-[hsl(120,50%,32%)]",
  "subject-economics": "from-[hsl(280,60%,55%)] to-[hsl(280,60%,40%)]",
  "subject-computer": "from-[hsl(172,66%,50%)] to-[hsl(172,66%,36%)]",
};

export function SubjectCard({ subject, index }: SubjectCardProps) {
  const navigate = useNavigate();
  const Icon = subject.icon;
  const gradient = colorMap[subject.color] || "from-primary to-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => navigate(`/subject/${subject.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}>
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {subject.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subject.description}
        </p>
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <span>{subject.lessons.length} {subject.lessons.length === 1 ? 'Lesson' : 'Lessons'}</span>
        </div>
      </div>
    </motion.div>
  );
}
