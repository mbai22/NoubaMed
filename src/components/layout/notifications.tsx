"use client";

import { useState } from "react";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-primary-900/20 dark:hover:text-gray-300 transition-all cursor-pointer"
      >
        <span className="text-lg">🔔</span>
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="fixed md:absolute right-4 md:right-0 top-16 md:top-12 left-4 md:left-auto w-auto md:w-80 rounded-2xl bg-white dark:bg-surface-dark border border-primary-100 dark:border-primary-800 shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-primary-100 dark:border-primary-800 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <span className="text-xs text-primary-600 cursor-pointer">Tout marquer lu</span>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-primary-50 dark:divide-primary-800/50">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-primary-900/10 cursor-pointer transition-colors",
                    !n.read && "bg-primary-50/50 dark:bg-primary-900/20"
                  )}
                >
                  <span className="text-lg mt-0.5">
                    {n.type === "rdv" ? "📅" : n.type === "paiement" ? "💰" : n.type === "alerte" ? "⚠️" : "💬"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm", !n.read ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
