"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { conversations } from "@/lib/messages-data";

export default function MessagesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-4 animate-slide-up">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>

        {/* Desktop split view */}
        <div className="hidden md:flex gap-4 h-[calc(100vh-12rem)]">
          <Card className="w-80 p-0 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-primary-100 dark:border-primary-800">
              <input
                className="w-full h-9 px-3 rounded-xl bg-gray-100 dark:bg-primary-900/20 text-sm outline-none border border-transparent focus:border-primary-500 text-gray-900 dark:text-gray-100"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {filtered.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-primary-900/10 cursor-pointer transition-colors border-b border-primary-50 dark:border-primary-800/50"
                onClick={() => router.push(`/messages/${c.id}`)}
              >
                <div className="relative">
                  <Avatar initials={c.patientAvatar} size="md" />
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-surface-dark" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{c.patientName}</p>
                    <span className="text-xs text-gray-400 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && <Badge variant="info">{c.unread}</Badge>}
              </div>
            ))}
          </Card>

          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-4xl mb-3">💬</p>
              <p>Sélectionnez une conversation</p>
            </div>
          </Card>
        </div>

        {/* Mobile list */}
        <div className="md:hidden space-y-2">
          <input
            className="w-full h-10 px-3 rounded-xl bg-gray-100 dark:bg-primary-900/20 text-sm outline-none border border-transparent focus:border-primary-500 text-gray-900 dark:text-gray-100 mb-3"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.map((c) => (
            <Card
              key={c.id}
              hover
              className="cursor-pointer"
              onClick={() => router.push(`/messages/${c.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar initials={c.patientAvatar} size="md" />
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium truncate">{c.patientName}</p>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && <Badge variant="info">{c.unread}</Badge>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
