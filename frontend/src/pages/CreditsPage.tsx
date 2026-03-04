import { motion } from "framer-motion";
import { Heart, Code, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const founders = [
  {
    name: "Jeffrin",
    role: "Co-Founder & Developer",
    emoji: "🚀",
  },
  {
    name: "Ajish",
    role: "Co-Founder & Developer",
    emoji: "💡",
  },
];

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-2xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-gold">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Credits</h1>
          <p className="mt-2 text-muted-foreground">
            The people behind LearnHub
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-glow"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl">
                {founder.emoji}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{founder.name}</h3>
              <p className="mt-1 text-sm text-primary">{founder.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl border border-border bg-card p-8 text-center"
        >
          <Code className="mx-auto mb-3 h-6 w-6 text-accent" />
          <h3 className="font-display text-lg font-semibold text-foreground">Built With</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            React • TypeScript • Tailwind CSS
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" />
            <span>for Class 12 students</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            LearnHub — A Class 12 Learning Platform
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditsPage;
