"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25",
    secondary: "bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300",
    outline: "border border-primary-200 text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-300",
    ghost: "text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
