"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Paragraph } from "./Typography";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, total, limit, onPageChange, className }: PaginationProps) {
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pages = getPages();

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap", className)}>
      <Paragraph size="xs" variant="muted">
        Showing {from}–{to} of {total} results
      </Paragraph>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* On mobile: only show current/total. On sm+: show full range */}
        <span className="flex sm:hidden items-center px-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          {page} / {totalPages}
        </span>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-zinc-400 dark:text-zinc-500">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-medium transition-colors min-h-[36px] min-w-[36px]",
                  page === p
                    ? "bg-violet-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:bg-zinc-700"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
