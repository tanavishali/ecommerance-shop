"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/custom-components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex items-center h-9 rounded-xl overflow-hidden",
        "border transition-all duration-300 active:scale-95 cursor-pointer",
        isDark
          ? "bg-zinc-800 border-violet-500/50 hover:border-violet-400"
          : "bg-white border-zinc-200 hover:border-violet-400 shadow-sm",
        className
      )}
    >
      {/* Light option */}
      <span className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 rounded-lg mx-0.5",
        !isDark
          ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
          : "text-zinc-500 hover:text-zinc-300"
      )}>
        <Sun className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden sm:inline">Light</span>
      </span>

      {/* Dark option */}
      <span className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 rounded-lg mx-0.5",
        isDark
          ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
          : "text-zinc-400 hover:text-zinc-600"
      )}>
        <Moon className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden sm:inline">Dark</span>
      </span>
    </button>
  );
}
