"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-primary-100 dark:bg-primary-800 transition-colors duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center text-sm ${
          theme === "dark" ? "translate-x-7.5" : "translate-x-0.5"
        }`}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
