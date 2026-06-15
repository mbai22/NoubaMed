import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const gradients = [
  "from-primary-500 to-accent-500",
  "from-primary-600 to-primary-400",
  "from-accent-500 to-primary-500",
  "from-primary-400 to-accent-400",
];

export function Avatar({ initials, className, size = "md" }: AvatarProps) {
  const hash = initials.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradient = gradients[hash % gradients.length];

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold shrink-0",
        gradient,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
