import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const config = {
  info:    { icon: Info,          styles: "bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800 text-violet-800 dark:text-violet-300",  iconClass: "text-violet-500" },
  success: { icon: CheckCircle2,  styles: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",         iconClass: "text-green-500" },
  warning: { icon: TriangleAlert, styles: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",         iconClass: "text-amber-500" },
  danger:  { icon: AlertCircle,   styles: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",                     iconClass: "text-red-500" },
};

export function Alert({ variant = "info", title, children, onClose, className }: AlertProps) {
  const { icon: Icon, styles, iconClass } = config[variant];
  return (
    <div className={cn("flex gap-3 p-4 rounded-xl border text-sm", styles, className)} role="alert">
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconClass)} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
