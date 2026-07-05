"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "./Tooltip";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ view, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900", className)}>
      <Tooltip content="Grid view">
        <button
          type="button"
          onClick={() => onChange("grid")}
          className={cn(
            "flex items-center justify-center h-9 w-9 transition-colors",
            view === "grid"
              ? "bg-violet-600 text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:bg-zinc-900"
          )}
          aria-label="Grid view"
          aria-pressed={view === "grid"}
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
      </Tooltip>
      <Tooltip content="List view">
        <button
          type="button"
          onClick={() => onChange("list")}
          className={cn(
            "flex items-center justify-center h-9 w-9 transition-colors border-l border-zinc-200 dark:border-zinc-700",
            view === "list"
              ? "bg-violet-600 text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:bg-zinc-900"
          )}
          aria-label="List view"
          aria-pressed={view === "list"}
        >
          <List className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  );
}
