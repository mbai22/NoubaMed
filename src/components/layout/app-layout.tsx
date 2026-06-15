"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarToggle } from "./sidebar";
import { NotificationsDropdown } from "./notifications";
import { ThemeToggle } from "./theme-toggle";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/patients": "Patients",
  "/appointments": "Rendez-vous",
  "/teleconsultation": "Téléconsultation",
  "/billing": "Facturation",
  "/records": "Dossiers médicaux",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = titles[pathname] || "NoubaMed";

  return (
    <div className="min-h-screen bg-surface-muted-light dark:bg-surface-muted-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64">
        <header className="sticky top-0 z-40 h-14 md:h-16 flex items-center justify-between px-4 md:px-8 border-b border-primary-100 dark:border-primary-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <SidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
            <div>
              <h1 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
              <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <NotificationsDropdown />
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-primary-900/20 dark:hover:text-gray-300 transition-all cursor-pointer md:hidden">
              <span className="text-lg">⚙️</span>
            </button>
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
