"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { patients } from "@/lib/data";

interface Med {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export default function OrdonnancesPage() {
  const router = useRouter();
  const [step, setStep] = useState<"select" | "form" | "preview">("select");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [meds, setMeds] = useState<Med[]>([{ name: "", dosage: "", frequency: "", duration: "" }]);
  const [notes, setNotes] = useState("");

  const patient = patients.find((p) => p.id === selectedPatient);

  const addMed = () => setMeds([...meds, { name: "", dosage: "", frequency: "", duration: "" }]);

  const updateMed = (i: number, field: keyof Med, value: string) => {
    const updated = [...meds];
    updated[i] = { ...updated[i], [field]: value };
    setMeds(updated);
  };

  const removeMed = (i: number) => {
    if (meds.length > 1) setMeds(meds.filter((_, idx) => idx !== i));
  };

  const generatePrescriptionNumber = () => `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

  const handlePrint = () => {
    const content = document.getElementById("ordonnance-print");
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Ordonnance ${generatePrescriptionNumber()}</title>
      <style>
        @page { margin: 15mm; }
        body { font-family: 'Courier New', monospace; padding: 20px; color: #000; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { font-size: 18px; margin: 0; }
        .header p { font-size: 12px; margin: 2px 0; color: #555; }
        .patient-info { margin-bottom: 20px; padding: 10px; border: 1px dashed #999; }
        .patient-info p { margin: 2px 0; font-size: 13px; }
        .med-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .med-table th, .med-table td { border: 1px solid #333; padding: 8px; text-align: left; font-size: 12px; }
        .med-table th { background: #f0f0f0; }
        .notes { margin-top: 20px; font-size: 12px; padding: 10px; border-top: 1px solid #999; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px; }
        .signature { margin-top: 30px; }
        .signature-line { width: 200px; border-top: 1px solid #000; margin-top: 40px; padding-top: 5px; font-size: 11px; }
        .controls { display: none; }
        @media print { .no-print { display: none !important; } }
      </style>
      </head><body>
      <div class="no-print" style="margin-bottom:10px;text-align:center">
        <button onclick="window.print()" style="padding:8px 20px;font-size:14px;cursor:pointer">🖨️ Imprimer</button>
        <button onclick="window.close()" style="padding:8px 20px;font-size:14px;cursor:pointer">Fermer</button>
      </div>
      ${content.innerHTML}
      </body></html>
    `);
    win.document.close();
  };

  if (step === "select") {
    return (
      <AppLayout>
        <div className="space-y-4 animate-slide-up">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Nouvelle ordonnance</h2>
          <p className="text-sm text-gray-500">Sélectionnez un patient</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {patients.map((p) => (
              <Card
                key={p.id}
                hover
                className="cursor-pointer"
                onClick={() => { setSelectedPatient(p.id); setStep("form"); }}
              >
                <div className="flex items-center gap-3">
                  <Avatar initials={p.avatar} size="md" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.age} ans · {p.condition}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button variant="outline" onClick={() => router.push("/records")}>
            Voir tous les dossiers
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (step === "form" && patient) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto space-y-4 animate-slide-up">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep("select")} className="text-gray-400 hover:text-gray-600 cursor-pointer">←</button>
            <Avatar initials={patient.avatar} size="md" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{patient.name}</p>
              <p className="text-xs text-gray-400">{patient.age} ans · {patient.gender}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Médicaments prescrits</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {meds.map((med, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-primary-900/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">#{i + 1}</span>
                    {meds.length > 1 && (
                      <button onClick={() => removeMed(i)} className="text-xs text-red-400 hover:text-red-600 cursor-pointer">Supprimer</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className="col-span-2 h-9 px-3 rounded-lg bg-white dark:bg-primary-900/20 text-sm outline-none border border-primary-200 dark:border-primary-700 focus:border-primary-500 text-gray-900 dark:text-gray-100" placeholder="Nom du médicament" value={med.name} onChange={(e) => updateMed(i, "name", e.target.value)} />
                    <input className="h-9 px-3 rounded-lg bg-white dark:bg-primary-900/20 text-sm outline-none border border-primary-200 dark:border-primary-700 focus:border-primary-500 text-gray-900 dark:text-gray-100" placeholder="Dosage (ex: 500mg)" value={med.dosage} onChange={(e) => updateMed(i, "dosage", e.target.value)} />
                    <input className="h-9 px-3 rounded-lg bg-white dark:bg-primary-900/20 text-sm outline-none border border-primary-200 dark:border-primary-700 focus:border-primary-500 text-gray-900 dark:text-gray-100" placeholder="Fréquence (ex: 3x/jour)" value={med.frequency} onChange={(e) => updateMed(i, "frequency", e.target.value)} />
                    <input className="col-span-2 h-9 px-3 rounded-lg bg-white dark:bg-primary-900/20 text-sm outline-none border border-primary-200 dark:border-primary-700 focus:border-primary-500 text-gray-900 dark:text-gray-100" placeholder="Durée (ex: 7 jours)" value={med.duration} onChange={(e) => updateMed(i, "duration", e.target.value)} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addMed}>+ Ajouter un médicament</Button>
            </CardContent>
          </Card>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">Notes supplémentaires</label>
            <textarea className="w-full h-20 px-3 py-2 rounded-xl bg-gray-100 dark:bg-primary-900/20 text-sm text-gray-900 dark:text-gray-100 outline-none border border-transparent focus:border-primary-500 resize-none" placeholder="Instructions particulières..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep("preview")}>Aperçu</Button>
            <Button variant="outline" onClick={() => setStep("select")}>Annuler</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (step === "preview" && patient) {
    const prescNumber = generatePrescriptionNumber();
    const validUntil = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR");
    const today = new Date().toLocaleDateString("fr-FR");

    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-4 animate-slide-up">
          <div className="flex gap-3 no-print">
            <Button onClick={handlePrint}>🖨️ Imprimer / PDF</Button>
            <Button variant="outline" onClick={() => setStep("form")}>Modifier</Button>
            <Button variant="outline" onClick={() => { setStep("select"); setMeds([{ name: "", dosage: "", frequency: "", duration: "" }]); setNotes(""); }}>
              Nouvelle ordonnance
            </Button>
          </div>

          <div id="ordonnance-print" className="bg-white dark:bg-surface-dark rounded-xl p-6 md:p-10 border border-primary-100 dark:border-primary-800 shadow-sm" style={{ fontFamily: "'Courier New', monospace" }}>
            <div className="text-center border-b-2 border-gray-900 dark:border-gray-300 pb-4 mb-6">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">ORDONNANCE MÉDICALE</h1>
              <p className="text-xs text-gray-500">Prescription médicale — Article R. 5132-3 du CSP</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">N° {prescNumber}</p>
            </div>

            <div className="flex justify-between text-xs mb-6 p-3 border border-dashed border-gray-400 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Dr. Martin</p>
                <p className="text-gray-500">Médecin traitant</p>
                <p className="text-gray-500">martin@noubamed.fr</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Fait le {today}</p>
                <p className="text-gray-500">Valable jusqu'au {validUntil}</p>
              </div>
            </div>

            <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-primary-900/10">
              <p className="font-semibold text-gray-900 dark:text-white">{patient.name}</p>
              <p className="text-xs text-gray-500">{patient.age} ans · {patient.gender} · {patient.bloodType || "Gr. inconnu"}</p>
            </div>

            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="border border-gray-900 dark:border-gray-300 bg-gray-100 dark:bg-primary-900/20">
                  <th className="p-2 text-left text-xs font-semibold text-gray-900 dark:text-white">Médicament</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-900 dark:text-white">Dosage</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-900 dark:text-white">Fréquence</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-900 dark:text-white">Durée</th>
                </tr>
              </thead>
              <tbody>
                {meds.filter((m) => m.name).map((med, i) => (
                  <tr key={i} className="border border-gray-400 dark:border-gray-600">
                    <td className="p-2 text-sm text-gray-900 dark:text-white">{med.name}</td>
                    <td className="p-2 text-sm text-gray-700 dark:text-gray-300">{med.dosage || "—"}</td>
                    <td className="p-2 text-sm text-gray-700 dark:text-gray-300">{med.frequency || "—"}</td>
                    <td className="p-2 text-sm text-gray-700 dark:text-gray-300">{med.duration || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {notes && (
              <div className="mt-4 pt-4 border-t border-gray-400">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Notes</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{notes}</p>
              </div>
            )}

            <div className="mt-10 flex justify-between text-xs text-gray-500">
              <div>
                <p>Cachet et signature du médecin</p>
                <div className="mt-6 w-48 border-t border-gray-900 dark:border-gray-300 pt-1">
                  Dr. Martin
                </div>
              </div>
              <div className="text-right">
                <p>NoubaMed</p>
                <p>Plateforme de gestion médicale</p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return null;
}
