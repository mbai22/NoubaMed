import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ className, children, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-primary-100 bg-white p-6 dark:border-primary-800 dark:bg-surface-dark",
        "shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
