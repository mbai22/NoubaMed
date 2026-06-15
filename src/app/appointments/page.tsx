"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/data";

export default function AppointmentsPage() {
  const statusVariant = (s: string) => {
    switch (s) {
      case "confirmed": return "success";
      case "pending": return "warning";
      case "cancelled": return "danger";
      case "completed": return "neutral";
      default: return "neutral";
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "confirmed": return "Confirmé";
      case "pending": return "En attente";
      case "cancelled": return "Annulé";
      case "completed": return "Terminé";
      default: return s;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">
            Planning des rendez-vous
          </h2>
          <Button size="sm" className="md:hidden">
            <span className="text-lg leading-none">+</span>
          </Button>
          <Button className="hidden md:flex">
            <span className="text-lg leading-none mr-1">+</span>
            Nouveau rendez-vous
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            {/* Desktop table */}
            <Card className="p-0 hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-100 dark:border-primary-800">
                      {["Patient", "Date", "Horaire", "Type", "Médecin", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-50 dark:divide-primary-800/50">
                    {appointments.map((rdv) => (
                      <tr key={rdv.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar initials={rdv.patientAvatar} size="sm" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{rdv.patientName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.time}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.doctor}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant(rdv.status)}>{statusLabel(rdv.status)}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {appointments.map((rdv) => (
                <Card key={rdv.id}>
                  <div className="flex items-center gap-3">
                    <Avatar initials={rdv.patientAvatar} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{rdv.patientName}</p>
                        <Badge variant={statusVariant(rdv.status)}>{statusLabel(rdv.status)}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{rdv.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{rdv.date} · {rdv.time} · {rdv.doctor}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar stats */}
          <div className="space-y-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cette semaine</h3>
              <div className="space-y-2">
                {["Lun 15", "Mar 16", "Mer 17", "Jeu 18", "Ven 19"].map((day) => (
                  <div key={day} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-primary-900/10 text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{day}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{Math.floor(Math.random() * 8) + 3}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Statistiques</h3>
              <div className="space-y-2.5 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Confirmés</span>
                  <span className="font-medium text-emerald-600">{appointments.filter(a => a.status === "confirmed").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">En attente</span>
                  <span className="font-medium text-amber-600">{appointments.filter(a => a.status === "pending").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Terminés</span>
                  <span className="font-medium text-gray-600 dark:text-gray-300">{appointments.filter(a => a.status === "completed").length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
