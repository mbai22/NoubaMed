import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    danger: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300",
    neutral: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles[variant], className)}>
      {children}
    </span>
  );
}
