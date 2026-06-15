"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ className, label, icon, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className={cn(
        "relative rounded-xl border transition-all duration-200",
        focused
          ? "border-primary-500 ring-2 ring-primary-500/20"
          : "border-primary-100 dark:border-primary-700/50",
        "bg-white dark:bg-surface-dark"
      )}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full h-10 bg-transparent text-sm text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "outline-none",
            icon ? "pl-10 pr-3" : "px-3",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
    </div>
  );
}
