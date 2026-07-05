"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Heading, Paragraph } from "./Typography";

// ─── FilterSection (collapsible group) ───────────────────────────────────────

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-left min-h-[40px]"
      >
        <Heading size="sm" className="text-zinc-700 dark:text-zinc-300">{title}</Heading>
        {open
          ? <ChevronUp className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
          : <ChevronDown className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />}
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

// ─── CheckboxFilter ───────────────────────────────────────────────────────────

interface CheckboxFilterOption {
  label: string;
  value: string;
  count?: number;
}

interface CheckboxFilterProps {
  options: CheckboxFilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxFilter({ options, selected, onChange }: CheckboxFilterProps) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center justify-between min-h-[36px]">
          <Checkbox
            label={opt.label}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          {opt.count !== undefined && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{opt.count}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PriceRangeFilter ─────────────────────────────────────────────────────────

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ min, max, value, onChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={value[1]}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          className="w-full h-10 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Min"
        />
        <span className="text-zinc-400 dark:text-zinc-500 text-sm shrink-0">—</span>
        <input
          type="number"
          min={value[0]}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className="w-full h-10 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 px-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Max"
        />
      </div>
      <Paragraph size="xs" variant="muted" className="text-center">
        £{value[0]} – £{value[1]}
      </Paragraph>
    </div>
  );
}

// ─── FilterPanel (full sidebar panel) ────────────────────────────────────────

interface FilterPanelProps {
  children: React.ReactNode;
  onClear?: () => void;
  activeCount?: number;
  className?: string;
}

export function FilterPanel({ children, onClear, activeCount = 0, className }: FilterPanelProps) {
  return (
    <div className={cn("bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 space-y-4 w-full", className)}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <Heading size="sm">Filters</Heading>
          {activeCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-semibold shrink-0">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && onClear && (
          <Button variant="ghost" size="sm" onClick={onClear} leftIcon={<X className="h-3.5 w-3.5" />}>
            Clear all
          </Button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
