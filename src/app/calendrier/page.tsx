"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/data";

type ViewMode = "month" | "week";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAYS_FULL = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export default function CalendrierPage() {
  const [view, setView] = useState<ViewMode>("month");
  const [today] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [startOffset, daysInMonth]);

  const getApptsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.filter((a) => a.date === dateStr);
  };

  const weekDays = useMemo(() => {
    const monday = new Date(currentYear, currentMonth, 1);
    while ((monday.getDay() + 6) % 7 !== 0) monday.setDate(monday.getDate() - 1);
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  }, [currentMonth, currentYear]);

  const prev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const next = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={prev} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-primary-900/20 transition-all cursor-pointer">←</button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{MONTHS[currentMonth]} {currentYear}</h2>
            <button onClick={next} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-primary-900/20 transition-all cursor-pointer">→</button>
          </div>
          <div className="flex rounded-xl bg-gray-100 dark:bg-primary-900/20 p-0.5">
            {(["month", "week"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setView(m)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-all cursor-pointer ${
                  view === m
                    ? "bg-white dark:bg-primary-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                }`}
              >
                {m === "month" ? "Mois" : "Semaine"}
              </button>
            ))}
          </div>
        </div>

        {view === "month" && (
          <Card className="p-0 overflow-hidden">
            <div className="grid grid-cols-7">
              {DAYS.map((d) => (
                <div key={d} className="p-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase border-b border-primary-100 dark:border-primary-800 bg-gray-50 dark:bg-primary-900/10">
                  <span className="hidden sm:inline">{d}</span>
                  <span className="sm:hidden">{d.charAt(0)}</span>
                </div>
              ))}
              {calendarDays.map((day, i) => {
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                const appts = day ? getApptsForDay(day) : [];
                return (
                  <div
                    key={i}
                    className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 border-b border-r border-primary-50 dark:border-primary-800/50 ${
                      day ? "bg-white dark:bg-surface-dark" : "bg-gray-50 dark:bg-primary-900/5"
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-xs md:text-sm mb-1 ${
                          isToday ? "bg-primary-600 text-white font-bold" : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {appts.slice(0, 3).map((a) => (
                            <div key={a.id} className="hidden md:block text-[10px] leading-tight px-1 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 truncate cursor-default" title={`${a.time} ${a.patientName}`}>
                              {a.time} {a.patientName}
                            </div>
                          ))}
                          {appts.length > 3 && (
                            <div className="hidden md:block text-[10px] text-gray-400 px-1">+{appts.length - 3} autres</div>
                          )}
                          {appts.length > 0 && (
                            <div className="md:hidden flex gap-0.5">
                              {appts.slice(0, 3).map((_, idx) => (
                                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                              ))}
                              {appts.length > 3 && <span className="text-[9px] text-gray-400">+{appts.length - 3}</span>}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {view === "week" && (
          <div className="space-y-3">
            {weekDays.map((day) => {
              const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
              const appts = appointments.filter((a) => a.date === dateStr);
              const isToday = day.toDateString() === today.toDateString();
              return (
                <Card key={dateStr} className={isToday ? "ring-2 ring-primary-500/30" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      isToday ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-primary-900/20 text-gray-700 dark:text-gray-300"
                    }`}>
                      {day.getDate()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{DAYS_FULL[(day.getDay() + 6) % 7]}</p>
                      <p className="text-xs text-gray-400">{MONTHS[day.getMonth()]}</p>
                    </div>
                    <Badge variant={appts.length > 0 ? "info" : "neutral"}>{appts.length} RDV</Badge>
                  </div>
                  {appts.length > 0 ? (
                    <div className="space-y-2">
                      {appts.map((a) => (
                        <div key={a.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-primary-900/10">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{a.patientName}</p>
                            <p className="text-xs text-gray-500">{a.type} · {a.doctor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.time}</p>
                            <Badge variant={statusVariant(a.status)}>{statusLabel(a.status)}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-2 text-center">Aucun rendez-vous ce jour</p>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
