import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LayoutDashboard, Shield, Trophy, Heart, Bot, LogOut, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLink = (to: string, label: string, Icon: any, active: boolean) => (
    <Link
      to={to}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-gold">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            Learn<span className="text-gradient-gold">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary/40 p-0.5">
          {navLink("/", "Dashboard", LayoutDashboard, path === "/")}
          {navLink("/leaderboard", "Leaderboard", Trophy, path === "/leaderboard")}
          {navLink("/credits", "Credits", Heart, path === "/credits")}
          {navLink("/admin", "Admin", Shield, path.startsWith("/admin"))}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="h-8 gap-1 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
