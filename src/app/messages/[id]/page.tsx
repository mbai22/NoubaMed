"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { conversations, messages as messagesData } from "@/lib/messages-data";

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const [newMsg, setNewMsg] = useState("");

  const conv = conversations.find((c) => c.id === params.id);
  const msgs = messagesData[params.id as string] || [];

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setNewMsg("");
  };

  if (!conv) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Conversation introuvable</p>
          <Button className="mt-4" onClick={() => router.push("/messages")}>Retour</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-10rem)] animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 p-3 border-b border-primary-100 dark:border-primary-800">
          <button onClick={() => router.push("/messages")} className="md:hidden text-gray-500 mr-1">←</button>
          <div className="relative">
            <Avatar initials={conv.patientAvatar} size="md" />
            {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-surface-dark" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{conv.patientName}</p>
            <p className="text-xs text-gray-400">{conv.online ? "En ligne" : "Hors ligne"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "doctor" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                m.sender === "doctor"
                  ? "bg-primary-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-primary-900/20 text-gray-900 dark:text-gray-100 rounded-bl-sm"
              }`}>
                <p>{m.text}</p>
                <p className={`text-xs mt-1 ${m.sender === "doctor" ? "text-primary-200" : "text-gray-400"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-primary-100 dark:border-primary-800 flex gap-2">
          <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-primary-900/20 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer shrink-0">
            📎
          </button>
          <input
            className="flex-1 h-10 px-3 rounded-xl bg-gray-100 dark:bg-primary-900/20 text-sm text-gray-900 dark:text-gray-100 outline-none border border-transparent focus:border-primary-500"
            placeholder="Écrivez un message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all cursor-pointer shrink-0"
          >
            →
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
