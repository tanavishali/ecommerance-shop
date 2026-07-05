import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Typography";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, required, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <Label htmlFor={textareaId} required={required}>{label}</Label>}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={cn(
            "w-full rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:text-zinc-500 px-3 py-2.5",
            // Prevent iOS zoom on focus
            "text-[16px] sm:text-sm",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-400 focus:ring-red-400" : "border-zinc-200 dark:border-zinc-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-zinc-400 dark:text-zinc-500">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
