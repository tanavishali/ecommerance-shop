import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ hover = false, padding = "md", className, children, ...props }: CardProps) {
  const paddings = {
    none: "",
    sm:   "p-3 sm:p-3",
    md:   "p-4 sm:p-4",
    lg:   "p-4 sm:p-6",
  };
  return (
    <div
      className={cn(
        "surface-glass",
        "border border-zinc-200",
        "rounded-xl",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/60 dark:hover:shadow-zinc-950/60 cursor-pointer",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("py-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800", className)}
      {...props}
    >
      {children}
    </div>
  );
}
