"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  "/messages": "Messages",
  "/notifications": "Notifications",
  "/ordonnances": "Ordonnances",
  "/calendrier": "Calendrier",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-muted-light dark:bg-surface-muted-dark">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

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
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
