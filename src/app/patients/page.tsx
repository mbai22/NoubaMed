"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { patients } from "@/lib/data";

export default function PatientsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Input
            placeholder="Rechercher un patient..."
            icon={<span>🔍</span>}
            className="w-full sm:max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="w-full sm:w-auto">
            <span className="text-lg leading-none mr-1">+</span>
            <span className="sm:hidden">Nouveau</span>
            <span className="hidden sm:inline">Nouveau patient</span>
          </Button>
        </div>

        {/* Desktop table */}
        <Card className="p-0 hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  {["Patient", "Âge", "Contact", "Condition", "Statut", "Dernière visite"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50 dark:divide-primary-800/50">
                {filtered.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors cursor-pointer"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={patient.avatar} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</p>
                          <p className="text-xs text-gray-400">{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{patient.age} ans</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      <p className="text-xs">{patient.email}</p>
                      <p className="text-xs text-gray-400">{patient.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{patient.condition}</td>
                    <td className="px-4 py-3">
                      <Badge variant={patient.status === "stable" ? "success" : patient.status === "critical" ? "danger" : "warning"}>
                        {patient.status === "stable" ? "Stable" : patient.status === "critical" ? "Critique" : "Rétablissement"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{patient.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {filtered.map((patient) => (
            <Card
              key={patient.id}
              hover
              className="cursor-pointer"
              onClick={() => router.push(`/patients/${patient.id}`)}
            >
              <div className="flex items-center gap-3">
                <Avatar initials={patient.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{patient.name}</p>
                    <Badge variant={patient.status === "stable" ? "success" : patient.status === "critical" ? "danger" : "warning"}>
                      {patient.status === "stable" ? "Stable" : patient.status === "critical" ? "Critique" : "Rétablissement"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{patient.condition}</p>
                  <p className="text-xs text-gray-400 mt-1">{patient.age} ans · {patient.phone}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-xs md:text-sm text-gray-400">
          {filtered.length} patient{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </div>
      </div>
    </AppLayout>
  );
}
