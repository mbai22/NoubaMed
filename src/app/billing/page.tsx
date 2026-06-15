"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { invoices, stats } from "@/lib/data";
import { BarChart } from "@/components/ui/chart";

export default function BillingPage() {
  const [search, setSearch] = useState("");

  const filtered = invoices.filter((inv) =>
    inv.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPending = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const totalCollected = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const rate = totalCollected + totalPending > 0 ? Math.round((totalCollected / (totalCollected + totalPending)) * 100) : 0;

  const statusVariant = (s: string) => {
    switch (s) {
      case "paid": return "success";
      case "pending": return "warning";
      case "overdue": return "danger";
      case "cancelled": return "neutral";
      default: return "neutral";
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case "paid": return "Payée";
      case "pending": return "En attente";
      case "overdue": return "En retard";
      case "cancelled": return "Annulée";
      default: return s;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6 animate-slide-up">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <Card>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Revenu mensuel</p>
            <p className="text-base md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{stats.revenuMensuel}</p>
            <p className="text-xs text-emerald-600 mt-0.5">+12%</p>
          </Card>
          <Card>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Payées</p>
            <p className="text-base md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{totalCollected} €</p>
            <p className="text-xs text-emerald-600 mt-0.5">{invoices.filter((i) => i.status === "paid").length} factures</p>
          </Card>
          <Card>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">En attente</p>
            <p className="text-base md:text-2xl font-bold text-amber-600 mt-0.5">{totalPending} €</p>
            <p className="text-xs text-amber-600 mt-0.5">{invoices.filter((i) => i.status === "pending" || i.status === "overdue").length} factures</p>
          </Card>
          <Card>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Recouvrement</p>
            <p className="text-base md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{rate}%</p>
            <p className="text-xs text-gray-400 mt-0.5">Objectif 95%</p>
          </Card>
        </div>

        {/* Mini chart (hidden on mobile) */}
        <Card className="hidden md:block">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Revenus mensuels</h3>
          <div className="h-40">
            <BarChart
              data={[
                { label: "Jan", value: 3200 }, { label: "Fév", value: 2800 }, { label: "Mar", value: 4100 },
                { label: "Avr", value: 3800 }, { label: "Mai", value: 4500 }, { label: "Juin", value: 5100 },
              ]}
              height={160}
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Input
            placeholder="Rechercher une facture..."
            icon={<span>🔍</span>}
            className="w-full sm:max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Devis</Button>
            <Button size="sm" className="flex-1 sm:flex-none">
              <span className="text-lg leading-none mr-1">+</span>
              Facture
            </Button>
          </div>
        </div>

        {/* Desktop table */}
        <Card className="p-0 hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  {["Patient", "Date", "Type", "Montant", "Échéance", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50 dark:divide-primary-800/50">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar initials={inv.patientAvatar} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{inv.patientName}</p>
                          <p className="text-xs text-gray-400">{inv.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{inv.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{inv.type}</td>
                    <td className="px-4 py-3 text-sm font-medium">{inv.amount} €</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{inv.dueDate}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(inv.status)}>{statusLabel(inv.status)}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {filtered.map((inv) => (
            <Card key={inv.id}>
              <div className="flex items-center gap-3">
                <Avatar initials={inv.patientAvatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{inv.patientName}</p>
                    <Badge variant={statusVariant(inv.status)}>{statusLabel(inv.status)}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{inv.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {inv.amount} € · {inv.date} · Échéance {inv.dueDate}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
