"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Search({
  value,
  onChange,
  placeholder = "Search…",
  size = "md",
  className,
}: SearchProps) {
  const sizes = {
    sm: "h-9 text-xs pl-8 pr-8",
    md: "h-10 text-sm pl-9 pr-9",
    lg: "h-12 text-base pl-10 pr-10",
  };
  const iconSizes = {
    sm: "h-3.5 w-3.5 left-2.5",
    md: "h-4 w-4 left-3",
    lg: "h-5 w-5 left-3.5",
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <SearchIcon className={cn("absolute text-zinc-400 dark:text-zinc-500 pointer-events-none", iconSizes[size])} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:text-zinc-500",
          "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors",
          // Prevent iOS zoom on focus (font-size >= 16px)
          "text-[16px] sm:text-sm",
          sizes[size]
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 transition-colors min-h-[24px] min-w-[24px] flex items-center justify-center"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
