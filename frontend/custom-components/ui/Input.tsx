import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, inputSize = "md", className, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const sizes = {
      sm: "h-9 text-xs px-3",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <Label htmlFor={inputId} required={required}>{label}</Label>}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-zinc-400 pointer-events-none">{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border",
              "bg-white dark:bg-zinc-900",
              "text-zinc-900 dark:text-zinc-100",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "text-[16px] sm:text-sm",
              error
                ? "border-red-400 dark:border-red-600 focus:ring-red-400"
                : "border-zinc-200 dark:border-zinc-700",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              sizes[inputSize],
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-zinc-400">{rightIcon}</span>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-zinc-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
