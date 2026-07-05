import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  variant = "default",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    success: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
    warning: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400",
    danger:  "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
    info:    "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400",
    outline: "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-transparent",
  };

  const dotColors = {
    default: "bg-zinc-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger:  "bg-red-500",
    info:    "bg-violet-500",
    outline: "bg-zinc-400",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
