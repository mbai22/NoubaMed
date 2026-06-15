"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { patients, records, appointments } from "@/lib/data";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"infos" | "rdv" | "dossiers">("infos");

  const patient = patients.find((p) => p.id === params.id);

  if (!patient) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">Patient introuvable</p>
          <Button className="mt-4" onClick={() => router.push("/patients")}>Retour</Button>
        </div>
      </AppLayout>
    );
  }

  const patientRecords = records.filter((r) => r.patientName === patient.name);
  const patientAppointments = appointments.filter((a) => a.patientName === patient.name);

  const statusVariant = (s: string) => {
    switch (s) {
      case "stable": case "confirmed": case "paid": return "success";
      case "recovering": case "pending": return "warning";
      case "critical": case "cancelled": return "danger";
      default: return "neutral";
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "stable": return "Stable";
      case "critical": return "Critique";
      case "recovering": return "Rétablissement";
      case "confirmed": return "Confirmé";
      case "pending": return "En attente";
      case "completed": return "Terminé";
      case "cancelled": return "Annulé";
      default: return s;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        <button
          onClick={() => router.push("/patients")}
          className="text-xs md:text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
        >
          ← Retour aux patients
        </button>

        {/* Patient header */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar initials={patient.avatar} size="lg" className="w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl" />
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">{patient.name}</h2>
                <Badge variant={statusVariant(patient.status)}>{statusLabel(patient.status)}</Badge>
              </div>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{patient.id} · {patient.age} ans · {patient.gender} · Groupe {patient.bloodType}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">📄 Ordonnance</Button>
              <Button size="sm" className="flex-1 sm:flex-none">✉️ Contacter</Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-primary-900/20 w-full sm:w-fit overflow-x-auto">
          {(["infos", "rdv", "dossiers"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex-1 sm:flex-none ${
                activeTab === tab
                  ? "bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              {tab === "infos" ? "Informations" : tab === "rdv" ? "Rendez-vous" : "Dossiers médicaux"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "infos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="p-4 md:p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Coordonnées</h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white break-all">{patient.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Téléphone</p>
                  <p className="text-gray-900 dark:text-white">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Dernière visite</p>
                  <p className="text-gray-900 dark:text-white">{patient.lastVisit}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 md:p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Médical</h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div>
                  <p className="text-xs text-gray-400">Groupe sanguin</p>
                  <p className="text-gray-900 dark:text-white">{patient.bloodType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Condition principale</p>
                  <p className="text-gray-900 dark:text-white">{patient.condition}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.allergies?.length ? patient.allergies.map((a) => (
                      <Badge key={a} variant="danger">{a}</Badge>
                    )) : <span className="text-gray-400">Aucune</span>}
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 md:p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Traitements</h3>
              <div className="space-y-2">
                {patient.medications?.map((m) => (
                  <div key={m} className="flex items-center gap-2 p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-xs md:text-sm">
                    <span className="text-primary-600 shrink-0">💊</span>
                    <span className="text-gray-900 dark:text-white">{m}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "rdv" && (
          <Card className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary-100 dark:border-primary-800">
                    {["Date", "Horaire", "Type", "Médecin", "Statut"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-50 dark:divide-primary-800/50">
                  {patientAppointments.map((rdv) => (
                    <tr key={rdv.id}>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{rdv.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rdv.doctor}</td>
                      <td className="px-4 py-3"><Badge variant={statusVariant(rdv.status)}>{statusLabel(rdv.status)}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "dossiers" && (
          <div className="space-y-3 md:space-y-4">
            {patientRecords.map((rec) => (
              <Card key={rec.id} hover>
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">{rec.date} · {rec.doctor}</p>
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{rec.diagnosis}</h3>
                  </div>
                  <Badge variant="info" className="shrink-0">{rec.id}</Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-xs md:text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Prescription</p>
                    <p className="text-gray-700 dark:text-gray-300">{rec.prescription}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Notes</p>
                    <p className="text-gray-600 dark:text-gray-400 italic">{rec.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
