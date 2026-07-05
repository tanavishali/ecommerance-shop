import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Constrain content to max-w-7xl and add horizontal padding */
  contained?: boolean;
  /** Extra vertical padding for page content */
  padded?: boolean;
}

export function PageWrapper({
  children,
  className,
  contained = true,
  padded = true,
}: PageWrapperProps) {
  return (
    <main
      className={cn(
        "flex-1 w-full",
        contained && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        padded && "py-6 sm:py-8 lg:py-10",
        className
      )}
    >
      {children}
    </main>
  );
}

/** Admin-specific page wrapper with title + optional action slot */
interface AdminPageWrapperProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AdminPageWrapper({
  title,
  description,
  action,
  children,
  className,
}: AdminPageWrapperProps) {
  return (
    <main className={cn("flex-1 min-w-0 px-4 sm:px-6 py-6 sm:py-8 space-y-6", className)}>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 dark:text-zinc-50">{title}</h1>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {children}
    </main>
  );
}
