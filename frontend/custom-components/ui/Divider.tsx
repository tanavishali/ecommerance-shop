import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({ label, className, orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("w-px bg-zinc-200 dark:bg-zinc-800 self-stretch", className)} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs text-zinc-400 font-medium">{label}</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return <div className={cn("h-px w-full bg-zinc-200 dark:bg-zinc-800", className)} />;
}
