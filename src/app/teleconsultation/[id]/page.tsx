"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { teleconsultations } from "@/lib/data";

const messages = [
  { role: "patient", text: "Bonjour docteur, merci de me recevoir.", time: "14:02" },
  { role: "doctor", text: "Bonjour Sophie, comment allez-vous aujourd'hui ?", time: "14:03" },
  { role: "patient", text: "Je vais mieux, mais j'ai encore des picotements.", time: "14:04" },
  { role: "doctor", text: "Je vois. Et votre tension, vous la surveillez ?", time: "14:05" },
];

export default function TeleconsultationRoom() {
  const router = useRouter();
  const params = useParams();
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const consultation = teleconsultations.find((t) => t.id === params.id);

  if (!consultation) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Téléconsultation introuvable</p>
          <Button className="mt-4" onClick={() => router.push("/teleconsultation")}>Retour</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] animate-slide-up">
        {/* Main video area */}
        <div className="flex-1 flex flex-col gap-3 md:gap-4 min-h-0">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Remote video */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-900 to-surface-dark relative overflow-hidden flex items-center justify-center min-h-[200px] md:min-h-0">
              <div className="absolute inset-0 opacity-[0.03]" />
              <div className="relative text-center p-4">
                <Avatar initials={consultation.patientAvatar} size="lg" className="mx-auto mb-3 w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl" />
                <p className="text-white font-semibold text-sm md:text-base">{consultation.patientName}</p>
                <p className="text-primary-200 text-xs md:text-sm">{consultation.reason}</p>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Connecté
                </div>
              </div>
            </div>

            {/* Local video */}
            <div className="rounded-2xl bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[120px] md:min-h-0">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl md:text-2xl">👨‍⚕️</span>
                </div>
                <p className="text-xs md:text-sm text-gray-400">Dr. Martin {camOff ? "(Caméra désactivée)" : ""}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-2xl bg-white dark:bg-surface-dark border border-primary-100 dark:border-primary-800">
            <button
              onClick={() => setMuted(!muted)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg transition-all cursor-pointer ${
                muted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 dark:bg-primary-900/20 dark:text-gray-300"
              }`}
            >
              {muted ? "🔇" : "🎤"}
            </button>
            <button
              onClick={() => setCamOff(!camOff)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg transition-all cursor-pointer ${
                camOff ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 dark:bg-primary-900/20 dark:text-gray-300"
              }`}
            >
              {camOff ? "📷" : "🎥"}
            </button>
            <button
              onClick={() => router.push("/teleconsultation")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-500 text-white flex items-center justify-center text-base md:text-lg hover:bg-red-600 transition-all cursor-pointer"
            >
              ✕
            </button>
            <button
              onClick={() => { setChatOpen(!chatOpen); setInfoOpen(false); }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg transition-all cursor-pointer ${
                chatOpen ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600 dark:bg-primary-900/20 dark:text-gray-300"
              }`}
            >
              💬
            </button>
            <button
              onClick={() => { setInfoOpen(!infoOpen); setChatOpen(false); }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-base md:text-lg transition-all cursor-pointer hidden md:flex ${
                infoOpen ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600 dark:bg-primary-900/20 dark:text-gray-300"
              }`}
            >
              📋
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center text-base md:text-lg hover:bg-gray-200 dark:bg-primary-900/20 dark:text-gray-300 transition-all cursor-pointer">
              ⊕
            </button>
          </div>
        </div>

        {/* Chat Panel (mobile drawer) */}
        {chatOpen && (
          <div className="fixed inset-x-0 bottom-0 z-50 md:relative md:inset-auto md:w-80 rounded-t-2xl md:rounded-2xl bg-white dark:bg-surface-dark border border-primary-100 dark:border-primary-800 flex flex-col max-h-[60vh] md:max-h-full">
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-primary-100 dark:border-primary-800">
              <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">Chat</h3>
              <button onClick={() => setChatOpen(false)} className="md:hidden text-gray-400 text-lg">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "doctor" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-2.5 md:p-3 rounded-xl text-xs md:text-sm ${
                    m.role === "doctor"
                      ? "bg-primary-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-primary-900/20 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                  }`}>
                    <p>{m.text}</p>
                    <p className={`text-xs mt-1 ${m.role === "doctor" ? "text-primary-200" : "text-gray-400"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-primary-100 dark:border-primary-800 flex gap-2">
              <input
                className="flex-1 h-10 px-3 rounded-xl bg-gray-100 dark:bg-primary-900/20 text-xs md:text-sm text-gray-900 dark:text-gray-100 outline-none border border-transparent focus:border-primary-500"
                placeholder="Écrivez un message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-all cursor-pointer shrink-0">
                →
              </button>
            </div>
          </div>
        )}

        {/* Info Panel (mobile bottom sheet) */}
        {infoOpen && (
          <div className="fixed inset-x-0 bottom-0 z-50 md:relative md:inset-auto md:w-72 rounded-t-2xl md:rounded-2xl bg-white dark:bg-surface-dark border border-primary-100 dark:border-primary-800 max-h-[60vh] md:max-h-full overflow-y-auto p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">Patient</h3>
              <button onClick={() => setInfoOpen(false)} className="md:hidden text-gray-400 text-lg">✕</button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Avatar initials={consultation.patientAvatar} size="md" />
              <div>
                <p className="font-medium text-sm md:text-base text-gray-900 dark:text-white">{consultation.patientName}</p>
                <p className="text-xs text-gray-400">Né(e) le 14/03/1992</p>
              </div>
            </div>
            <div className="space-y-2 text-xs md:text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tension</span>
                <span className="font-medium text-gray-900 dark:text-white">135/85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pouls</span>
                <span className="font-medium text-gray-900 dark:text-white">72 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Poids</span>
                <span className="font-medium text-gray-900 dark:text-white">68 kg</span>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Actions rapides</h4>
              <div className="space-y-1.5">
                <Button variant="secondary" size="sm" className="w-full justify-start text-xs">💊 Prescrire</Button>
                <Button variant="secondary" size="sm" className="w-full justify-start text-xs">🏥 Hospitalisation</Button>
                <Button variant="secondary" size="sm" className="w-full justify-start text-xs">📋 Analyse</Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop info sidebar (always visible) */}
        <div className="hidden lg:block w-72 space-y-4">
          <Card className="p-4 md:p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Patient</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar initials={consultation.patientAvatar} size="md" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{consultation.patientName}</p>
                <p className="text-xs text-gray-400">Né(e) le 14/03/1992</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tension</span>
                <span className="font-medium text-gray-900 dark:text-white">135/85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pouls</span>
                <span className="font-medium text-gray-900 dark:text-white">72 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Poids</span>
                <span className="font-medium text-gray-900 dark:text-white">68 kg</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Dernière ordonnance</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lisinopril 10mg/jour</p>
            <p className="text-xs text-gray-400">Prescrit le 10/06/2026</p>
          </Card>

          <Card className="p-4 md:p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Actions rapides</h3>
            <div className="space-y-2">
              <Button variant="secondary" size="sm" className="w-full justify-start text-xs">💊 Prescrire</Button>
              <Button variant="secondary" size="sm" className="w-full justify-start text-xs">🏥 Hospitalisation</Button>
              <Button variant="secondary" size="sm" className="w-full justify-start text-xs">📋 Analyse</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom spacer for mobile panels */}
      {(chatOpen || infoOpen) && <div className="h-[60vh] md:hidden" />}
    </AppLayout>
  );
}
