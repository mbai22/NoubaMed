"use client";

import { useI18n } from "@/i18n/provider";
import type { Locale } from "@/i18n/translations";

const flags: Record<Locale, string> = { fr: "🇫🇷", en: "🇬🇧", ar: "🇸🇦" };

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const locales: Locale[] = ["fr", "en", "ar"];

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-primary-900/20">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            locale === l ? "bg-white dark:bg-surface-dark shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
