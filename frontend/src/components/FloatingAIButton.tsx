import { Link, useLocation } from "react-router-dom";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingAIButton() {
  const location = useLocation();
  if (location.pathname === "/ai-assistant") return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        to="/ai-assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full gradient-gold shadow-glow transition-transform hover:scale-110 active:scale-95"
        aria-label="AI Buddy"
      >
        <Bot className="h-6 w-6 text-primary-foreground" />
      </Link>
    </motion.div>
  );
}
