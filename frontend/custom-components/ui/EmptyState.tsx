import { cn } from "@/lib/utils";
import { Heading, Paragraph } from "./Typography";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center", className)}>
      {icon && (
        <div className="mb-4 p-3 sm:p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
          {icon}
        </div>
      )}
      <Heading size="md" className="mb-2">{title}</Heading>
      {description && (
        <Paragraph variant="muted" className="max-w-xs sm:max-w-sm mb-6">{description}</Paragraph>
      )}
      {action && (
        <Button variant="primary" onClick={action.onClick} fullWidth={false} className="w-full sm:w-auto">
          {action.label}
        </Button>
      )}
    </div>
  );
}
