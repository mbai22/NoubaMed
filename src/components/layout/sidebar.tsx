"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "◉" },
  { href: "/patients", label: "Patients", icon: "◎" },
  { href: "/appointments", label: "Rendez-vous", icon: "◈" },
  { href: "/teleconsultation", label: "Téléconsultation", icon: "▶" },
  { href: "/billing", label: "Facturation", icon: "€" },
  { href: "/records", label: "Dossiers", icon: "◇" },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const sidebar = (
    <aside className="h-full w-64 border-r border-primary-100 bg-white dark:border-primary-800 dark:bg-surface-dark flex flex-col">
      <div className="p-4 md:p-6">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Nouba<span className="text-primary-600">Med</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-primary-900/10"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-100 dark:border-primary-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
              DR
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">Dr. Martin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Médecin traitant</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen z-50">{sidebar}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed left-0 top-0 h-full animate-slide-up">{sidebar}</div>
        </div>
      )}
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-primary-900/20 transition-all cursor-pointer"
      aria-label="Menu"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
