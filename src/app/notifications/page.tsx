"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notificationSettings } from "@/lib/messages-data";

export default function NotificationsPage() {
  const [settings, setSettings] = useState(notificationSettings);

  const toggle = (key: keyof typeof notificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggles = [
    { key: "rdvReminder" as const, label: "Rappel de rendez-vous", desc: "Recevez une notification avant chaque rendez-vous" },
    { key: "paymentAlert" as const, label: "Alerte de paiement", desc: "Notification quand une facture est payée ou en retard" },
    { key: "messageAlert" as const, label: "Nouveau message", desc: "Notification quand un patient vous envoie un message" },
    { key: "reportAvailable" as const, label: "Rapport disponible", desc: "Notification quand un résultat d'analyse est prêt" },
  ];

  const channels = [
    { key: "sms" as const, label: "SMS", desc: "Notifications par SMS" },
    { key: "email" as const, label: "Email", desc: "Notifications par email" },
    { key: "push" as const, label: "Push", desc: "Notifications sur votre appareil" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 animate-slide-up max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Préférences de notifications</h2>

        <Card>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Canaux de notification</h3>
          <div className="space-y-4">
            {channels.map((ch) => (
              <div key={ch.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{ch.label}</p>
                  <p className="text-xs text-gray-400">{ch.desc}</p>
                </div>
                <button
                  onClick={() => toggle(ch.key)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    settings[ch.key] ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    settings[ch.key] ? "translate-x-5.5" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Types d&apos;alertes</h3>
          <div className="space-y-4">
            {toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.label}</p>
                  <p className="text-xs text-gray-400">{t.desc}</p>
                </div>
                <button
                  onClick={() => toggle(t.key)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    settings[t.key] ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    settings[t.key] ? "translate-x-5.5" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button>Enregistrer</Button>
          <Button variant="outline">Réinitialiser</Button>
        </div>
      </div>
    </AppLayout>
  );
}
