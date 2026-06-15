"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { records } from "@/lib/data";

export default function RecordsPage() {
  const [search, setSearch] = useState("");

  const filtered = records.filter((r) =>
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Input
            placeholder="Rechercher un dossier..."
            icon={<span>🔍</span>}
            className="w-full sm:max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => window.print()}>
            🖨️ Exporter PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {filtered.map((record) => (
            <Card key={record.id} hover>
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar initials={record.patientAvatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{record.patientName}</h3>
                      <p className="text-xs text-gray-400">{record.id}</p>
                    </div>
                    <div className="text-right text-xs md:text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                      {record.date}
                      <div className="text-xs text-gray-400">{record.doctor}</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Diagnostic</p>
                  <p className="text-xs md:text-sm text-gray-900 dark:text-white">{record.diagnosis}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Prescription</p>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{record.prescription}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Notes</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">{record.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
