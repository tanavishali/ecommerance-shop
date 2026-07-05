"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Heading } from "./Typography";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Modal({ open, onClose, title, children, footer, size = "md", className }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Full-screen on mobile, centered constrained panel on sm+
  const sizes = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-2xl",
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col",
          // Mobile: bottom sheet style with rounded top corners
          "rounded-t-2xl sm:rounded-2xl",
          // Max height: full on mobile, 90vh on desktop
          "max-h-[92vh] sm:max-h-[90vh]",
          sizes[size],
          className
        )}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 shrink-0">
          {title && <Heading size="md">{title}</Heading>}
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto" aria-label="Close modal">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">{children}</div>

        {footer && (
          <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
