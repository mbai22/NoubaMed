"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { stats, appointments, monthlyRevenue } from "@/lib/data";
import { BarChart } from "@/components/ui/chart";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-8 animate-slide-up">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {[
            { label: "Total patients", value: stats.totalPatients, change: "+12", icon: "◎", color: "from-primary-500 to-primary-600" },
            { label: "Aujourd'hui", value: stats.consultationsToday, change: "+3", icon: "◈", color: "from-accent-500 to-accent-600" },
            { label: "Hospitalisations", value: stats.hospitalisations, change: "-2", icon: "◇", color: "from-amber-500 to-amber-600" },
            { label: "Revenu mensuel", value: stats.revenuMensuel, change: "+8%", icon: "€", color: "from-emerald-500 to-emerald-600" },
          ].map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5 md:mt-1 truncate">{stat.value}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{stat.change}</p>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-sm md:text-lg shrink-0`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Revenus 2026</h2>
              <Badge variant="success">+28%</Badge>
            </div>
            <div className="h-28 md:h-40">
              <BarChart
                data={monthlyRevenue.map((m) => ({ label: m.month.substring(0, 3), value: m.revenue / 100 }))}
                height={120}
              />
            </div>
          </Card>

          {/* Répartition + Planning */}
          <div className="space-y-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Consultations</h3>
              <div className="space-y-1.5">
                {["Lun 15", "Mar 16", "Mer 17", "Jeu 18", "Ven 19"].map((day, i) => (
                  <div key={day} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-primary-900/10 text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{day}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{Math.floor(Math.random() * 8) + 3}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Répartition</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Consultations", pct: 65, color: "bg-primary-500" },
                  { label: "Téléconsultations", pct: 20, color: "bg-accent-500" },
                  { label: "Urgences", pct: 15, color: "bg-amber-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs md:text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                      <span className="font-medium">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 md:h-2 rounded-full bg-gray-100 dark:bg-primary-900/20">
                      <div className={`h-1.5 md:h-2 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Rendez-vous du jour */}
          <Card>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Rendez-vous aujourd&apos;hui</h2>
              <Badge variant="info">{appointments.filter(a => a.status === "confirmed").length} confirmés</Badge>
            </div>
            <div className="space-y-2 md:space-y-3">
              {appointments.slice(0, 5).map((rdv) => (
                <div key={rdv.id} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-gray-50 dark:bg-primary-900/10">
                  <Avatar initials={rdv.patientAvatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">{rdv.patientName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{rdv.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{rdv.time}</p>
                    <Badge variant={rdv.status === "confirmed" ? "success" : rdv.status === "pending" ? "warning" : "neutral"}>
                      {rdv.status === "confirmed" ? "Confirmé" : rdv.status === "pending" ? "En attente" : rdv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Derniers patients */}
          <Card>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Derniers patients</h2>
              <Badge variant="info">{stats.patientsRecents} nouveaux</Badge>
            </div>
            <div className="space-y-2 md:space-y-3">
              {[
                { name: "Emma Fontaine", condition: "Migraine Chronique", date: "11 juin", avatar: "EF", status: "stable" },
                { name: "Thomas Petit", condition: "Insuffisance Cardiaque", date: "12 juin", avatar: "TP", status: "critical" },
                { name: "Sophie Bernard", condition: "Hypertension", date: "10 juin", avatar: "SB", status: "stable" },
                { name: "Lucas Girard", condition: "Pneumonie", date: "9 juin", avatar: "LG", status: "recovering" },
                { name: "Marc Dubois", condition: "Diabète Type 2", date: "8 juin", avatar: "MD", status: "recovering" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-gray-50 dark:bg-primary-900/10">
                  <Avatar initials={p.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.condition}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{p.date}</p>
                    <Badge variant={p.status === "stable" ? "success" : p.status === "critical" ? "danger" : "warning"}>
                      {p.status === "stable" ? "Stable" : p.status === "critical" ? "Critique" : "Rétablissement"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
