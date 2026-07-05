import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Skeleton({ width, height, rounded = "md", className, ...props }: SkeletonProps) {
  const roundeds = {
    sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", full: "rounded-full",
  };
  return (
    <div
      className={cn("animate-pulse bg-zinc-200 dark:bg-zinc-700", roundeds[rounded], className)}
      style={{ width, height }}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height="14px" className={i === lines - 1 ? "w-3/4" : "w-full"} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  // Mirrors the real ProductCard layout: square image, category pill,
  // two title lines, then a price + add-to-cart row.
  return (
    <div className={cn("surface-glass border border-zinc-200 rounded-xl overflow-hidden h-full flex flex-col", className)}>
      {/* Image */}
      <div className="aspect-square w-full skeleton-shimmer" />
      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2.5">
        <div className="h-4 w-16 rounded-full skeleton-shimmer" />
        <div className="h-3.5 w-11/12 rounded skeleton-shimmer" />
        <div className="h-3.5 w-2/3 rounded skeleton-shimmer" />
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <div className="h-5 w-16 rounded skeleton-shimmer" />
          <div className="h-8 w-16 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={cn("space-y-0 border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden", className)}>
      <div className="flex gap-3 sm:gap-4 px-3 sm:px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height="12px" className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3 sm:gap-4 px-3 sm:px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} height="14px" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
  return <Skeleton rounded="full" className={cn(sizes[size], className)} />;
}
