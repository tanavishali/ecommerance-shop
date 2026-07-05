"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "btn-shine inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none shrink-0 active:scale-[0.97]";

    const variants = {
      primary:
        "bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 shadow-sm shadow-violet-600/25 hover:shadow-violet-600/40 rounded-xl",
      secondary:
        "bg-white dark:bg-zinc-900 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:bg-zinc-100 dark:active:bg-zinc-600 rounded-xl",
      ghost:
        "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 rounded-xl",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20 rounded-xl",
      outline:
        "border border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950 active:bg-violet-100 rounded-xl",
    };

    // Touch-friendly minimum tap targets
    const sizes = {
      sm:   "h-8 min-h-[32px] px-3 text-xs",
      md:   "h-10 min-h-[40px] px-4 text-sm",
      lg:   "h-11 min-h-[44px] px-6 text-base",
      icon: "h-10 w-10 min-h-[40px] min-w-[40px] p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
