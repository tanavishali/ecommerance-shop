"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/lib/constants";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ProductSort({ value, onChange, className }: ProductSortProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 h-10 pl-3 pr-3 rounded-xl border text-sm font-medium transition-colors cursor-pointer",
          "bg-white dark:bg-zinc-900",
          "text-zinc-700 dark:text-zinc-300",
          open
            ? "border-violet-500 ring-2 ring-violet-500/20"
            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
        )}
      >
        <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
        <span>{selected.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 transition-transform shrink-0", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[180px] rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm text-left transition-colors",
                opt.value === value
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              {opt.label}
              {opt.value === value && <Check className="h-3.5 w-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
