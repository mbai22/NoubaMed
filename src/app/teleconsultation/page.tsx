"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { teleconsultations } from "@/lib/data";

export default function TeleconsultationPage() {
  const statusVariant = (s: string) => {
    switch (s) {
      case "scheduled": return "info";
      case "in-progress": return "success";
      case "completed": return "neutral";
      case "cancelled": return "danger";
      default: return "neutral";
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "scheduled": return "Planifié";
      case "in-progress": return "En cours";
      case "completed": return "Terminé";
      case "cancelled": return "Annulé";
      default: return s;
    }
  };

  const inProgress = teleconsultations.find((t) => t.status === "in-progress");

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        {inProgress && (
          <div className="gradient-primary rounded-2xl p-4 md:p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-primary-100">En cours</p>
                  <p className="text-sm md:text-lg font-semibold">{inProgress.patientName}</p>
                  <p className="text-xs md:text-sm text-primary-200">{inProgress.reason}</p>
                </div>
              </div>
              <Link href={`/teleconsultation/${inProgress.id}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50">
                  Rejoindre →
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">
            Téléconsultations
          </h2>
          <Button size="sm" className="md:hidden">
            <span className="text-lg leading-none">+</span>
          </Button>
          <Button className="hidden md:flex">
            <span className="text-lg leading-none mr-1">+</span>
            Planifier
          </Button>
        </div>

        <div className="grid gap-3 md:gap-4">
          {teleconsultations.map((tel) => (
            <Card key={tel.id} hover>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Avatar initials={tel.patientAvatar} size="md" />
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate">{tel.patientName}</h3>
                    <Badge variant={statusVariant(tel.status)}>{statusLabel(tel.status)}</Badge>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{tel.reason}</p>
                  <p className="text-xs text-gray-400">{tel.date} à {tel.time} · {tel.duration} min</p>
                </div>
                {tel.status === "scheduled" && (
                  <Link href={`/teleconsultation/${tel.id}`} className="w-full sm:w-auto">
                    <Button size="sm" className="w-full sm:w-auto">Rejoindre</Button>
                  </Link>
                )}
                {tel.status === "completed" && (
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto">Compte-rendu</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
