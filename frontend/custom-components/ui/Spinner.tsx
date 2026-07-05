import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizes = {
    sm: "h-3.5 w-3.5 border-[1.5px]",
    md: "h-5 w-5 border-2",
    lg: "h-7 w-7 border-2",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full border-current border-r-transparent animate-spin",
        sizes[size],
        className
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
