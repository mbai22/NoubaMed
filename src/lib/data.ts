export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  avatar: string;
  status: "stable" | "critical" | "recovering";
  lastVisit: string;
  condition: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  doctor: string;
}

export interface MedicalRecord {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
  notes: string;
}

export interface Teleconsultation {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  reason: string;
  duration: number;
}

export interface Invoice {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  type: string;
  dueDate: string;
}

export interface Notification {
  id: string;
  type: "rdv" | "paiement" | "alerte" | "message";
  message: string;
  time: string;
  read: boolean;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  consultations: number;
}

export const patients: Patient[] = [
  { id: "P-001", name: "Sophie Bernard", age: 34, gender: "F", email: "sophie.bernard@email.com", phone: "06 12 34 56 78", avatar: "SB", status: "stable", lastVisit: "2026-06-10", condition: "Hypertension", bloodType: "A+", allergies: ["Pénicilline"], medications: ["Lisinopril 10mg"] },
  { id: "P-002", name: "Marc Dubois", age: 52, gender: "M", email: "marc.dubois@email.com", phone: "06 23 45 67 89", avatar: "MD", status: "recovering", lastVisit: "2026-06-08", condition: "Diabète Type 2", bloodType: "O+", allergies: [], medications: ["Metformine 500mg"] },
  { id: "P-003", name: "Léa Moreau", age: 28, gender: "F", email: "lea.moreau@email.com", phone: "06 34 56 78 90", avatar: "LM", status: "stable", lastVisit: "2026-06-05", condition: "Asthme", bloodType: "B+", allergies: ["Sulfamides"], medications: ["Ventoline"] },
  { id: "P-004", name: "Thomas Petit", age: 45, gender: "M", email: "thomas.petit@email.com", phone: "06 45 67 89 01", avatar: "TP", status: "critical", lastVisit: "2026-06-12", condition: "Insuffisance Cardiaque", bloodType: "AB-", allergies: ["Aspirine"], medications: ["Furosémide 40mg"] },
  { id: "P-005", name: "Camille Leroy", age: 31, gender: "F", email: "camille.leroy@email.com", phone: "06 56 78 90 12", avatar: "CL", status: "recovering", lastVisit: "2026-06-07", condition: "Fracture Tibia", bloodType: "A-", allergies: [], medications: ["Paracétamol"] },
  { id: "P-006", name: "Antoine Roux", age: 67, gender: "M", email: "antoine.roux@email.com", phone: "06 67 89 01 23", avatar: "AR", status: "stable", lastVisit: "2026-06-01", condition: "Arthrose", bloodType: "O+", allergies: [], medications: ["Ibuprofène"] },
  { id: "P-007", name: "Emma Fontaine", age: 24, gender: "F", email: "emma.fontaine@email.com", phone: "06 78 90 12 34", avatar: "EF", status: "stable", lastVisit: "2026-06-11", condition: "Migraine Chronique", bloodType: "O-", allergies: [], medications: ["Sumatriptan"] },
  { id: "P-008", name: "Lucas Girard", age: 41, gender: "M", email: "lucas.girard@email.com", phone: "06 89 01 23 45", avatar: "LG", status: "recovering", lastVisit: "2026-06-09", condition: "Pneumonie", bloodType: "B-", allergies: ["Pénicilline"], medications: ["Amoxicilline"] },
];

export const appointments: Appointment[] = [
  { id: "RDV-001", patientName: "Sophie Bernard", patientAvatar: "SB", date: "2026-06-15", time: "09:00", type: "Consultation", status: "confirmed", doctor: "Dr. Martin" },
  { id: "RDV-002", patientName: "Marc Dubois", patientAvatar: "MD", date: "2026-06-15", time: "10:30", type: "Suivi Diabète", status: "confirmed", doctor: "Dr. Martin" },
  { id: "RDV-003", patientName: "Emma Fontaine", patientAvatar: "EF", date: "2026-06-15", time: "11:00", type: "Urgence", status: "pending", doctor: "Dr. Bernard" },
  { id: "RDV-004", patientName: "Thomas Petit", patientAvatar: "TP", date: "2026-06-16", time: "08:30", type: "Examen Cardiaque", status: "confirmed", doctor: "Dr. Martin" },
  { id: "RDV-005", patientName: "Camille Leroy", patientAvatar: "CL", date: "2026-06-16", time: "14:00", type: "Radio de contrôle", status: "completed", doctor: "Dr. Bernard" },
  { id: "RDV-006", patientName: "Antoine Roux", patientAvatar: "AR", date: "2026-06-17", time: "09:30", type: "Consultation", status: "confirmed", doctor: "Dr. Martin" },
  { id: "RDV-007", patientName: "Lucas Girard", patientAvatar: "LG", date: "2026-06-17", time: "15:00", type: "Consultation", status: "pending", doctor: "Dr. Bernard" },
  { id: "RDV-008", patientName: "Léa Moreau", patientAvatar: "LM", date: "2026-06-18", time: "10:00", type: "Suivi Asthme", status: "confirmed", doctor: "Dr. Martin" },
];

export const records: MedicalRecord[] = [
  { id: "REC-001", patientName: "Sophie Bernard", patientAvatar: "SB", date: "2026-06-10", diagnosis: "Hypertension artérielle stade 1", prescription: "Lisinopril 10mg/jour", doctor: "Dr. Martin", notes: "PA mesurée à 145/95. Suivi dans 3 mois." },
  { id: "REC-002", patientName: "Marc Dubois", patientAvatar: "MD", date: "2026-06-08", diagnosis: "Diabète type 2 - déséquilibré", prescription: "Metformine 500mg x2/jour", doctor: "Dr. Martin", notes: "Glycémie à jeun: 1.8g/L. Régime alimentaire revu." },
  { id: "REC-003", patientName: "Thomas Petit", patientAvatar: "TP", date: "2026-06-12", diagnosis: "Insuffisance cardiaque congestive", prescription: "Furosémide 40mg/jour", doctor: "Dr. Bernard", notes: "Œdèmes des membres inférieurs. Hospitalisation recommandée." },
  { id: "REC-004", patientName: "Camille Leroy", patientAvatar: "CL", date: "2026-06-07", diagnosis: "Fracture tibia distal", prescription: "Paracétamol 1g x3/jour", doctor: "Dr. Bernard", notes: "Plâtre pendant 6 semaines. Radio de contrôle à 4 semaines." },
  { id: "REC-005", patientName: "Lucas Girard", patientAvatar: "LG", date: "2026-06-09", diagnosis: "Pneumonie lobaire droite", prescription: "Amoxicilline 1g x3/jour - 7 jours", doctor: "Dr. Martin", notes: "Radio thorax: infiltrat lobaire droit. Repos strict." },
  { id: "REC-006", patientName: "Emma Fontaine", patientAvatar: "EF", date: "2026-06-11", diagnosis: "Migraine chronique sans aura", prescription: "Sumatriptan 50mg si crise", doctor: "Dr. Bernard", notes: "Fréquence: 3-4 crises/mois. Éviter les déclencheurs identifiés." },
];

export const teleconsultations: Teleconsultation[] = [
  { id: "TEL-001", patientName: "Sophie Bernard", patientAvatar: "SB", date: "2026-06-15", time: "14:00", status: "scheduled", reason: "Suivi tension artérielle", duration: 20 },
  { id: "TEL-002", patientName: "Marc Dubois", patientAvatar: "MD", date: "2026-06-15", time: "15:00", status: "in-progress", reason: "Résultats analyse sang", duration: 30 },
  { id: "TEL-003", patientName: "Emma Fontaine", patientAvatar: "EF", date: "2026-06-16", time: "09:00", status: "scheduled", reason: "Suivi migraines", duration: 20 },
  { id: "TEL-004", patientName: "Léa Moreau", patientAvatar: "LM", date: "2026-06-16", time: "10:00", status: "scheduled", reason: "Consultation Asthme", duration: 25 },
  { id: "TEL-005", patientName: "Antoine Roux", patientAvatar: "AR", date: "2026-06-17", time: "11:00", status: "scheduled", reason: "Douleurs articulaires", duration: 30 },
  { id: "TEL-006", patientName: "Camille Leroy", patientAvatar: "CL", date: "2026-06-14", time: "08:30", status: "completed", reason: "Suivi post-opératoire", duration: 20 },
];

export const invoices: Invoice[] = [
  { id: "FAC-001", patientName: "Sophie Bernard", patientAvatar: "SB", date: "2026-06-10", amount: 65, status: "paid", type: "Consultation", dueDate: "2026-06-24" },
  { id: "FAC-002", patientName: "Marc Dubois", patientAvatar: "MD", date: "2026-06-08", amount: 120, status: "paid", type: "Bilan sanguin", dueDate: "2026-06-22" },
  { id: "FAC-003", patientName: "Thomas Petit", patientAvatar: "TP", date: "2026-06-12", amount: 250, status: "pending", type: "Examen cardiaque", dueDate: "2026-06-26" },
  { id: "FAC-004", patientName: "Camille Leroy", patientAvatar: "CL", date: "2026-06-07", amount: 85, status: "overdue", type: "Radio contrôle", dueDate: "2026-06-21" },
  { id: "FAC-005", patientName: "Emma Fontaine", patientAvatar: "EF", date: "2026-06-11", amount: 55, status: "paid", type: "Consultation urgente", dueDate: "2026-06-25" },
  { id: "FAC-006", patientName: "Lucas Girard", patientAvatar: "LG", date: "2026-06-09", amount: 70, status: "pending", type: "Consultation", dueDate: "2026-06-23" },
  { id: "FAC-007", patientName: "Antoine Roux", patientAvatar: "AR", date: "2026-06-01", amount: 130, status: "paid", type: "Consultation + IRA", dueDate: "2026-06-15" },
  { id: "FAC-008", patientName: "Léa Moreau", patientAvatar: "LM", date: "2026-06-05", amount: 60, status: "paid", type: "Suivi Asthme", dueDate: "2026-06-19" },
];

export const notifications: Notification[] = [
  { id: "N-001", type: "rdv", message: "Rappel : Sophie Bernard à 09:00 demain", time: "Il y a 5 min", read: false },
  { id: "N-002", type: "paiement", message: "Facture FAC-004 en retard - Camille Leroy", time: "Il y a 1h", read: false },
  { id: "N-003", type: "alerte", message: "Thomas Petit - PA élevée (155/95)", time: "Il y a 2h", read: false },
  { id: "N-004", type: "message", message: "Nouveau message de Marc Dubois", time: "Il y a 3h", read: false },
  { id: "N-005", type: "rdv", message: "Emma Fontaine a confirmé son RDV de 11:00", time: "Il y a 4h", read: true },
  { id: "N-006", type: "rdv", message: "Lucas Girard - RDV annulé (15:00)", time: "Hier", read: true },
  { id: "N-007", type: "paiement", message: "Paiement reçu - Sophie Bernard (65€)", time: "Hier", read: true },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jan", revenue: 3200, consultations: 48 },
  { month: "Fév", revenue: 2800, consultations: 42 },
  { month: "Mar", revenue: 4100, consultations: 55 },
  { month: "Avr", revenue: 3800, consultations: 51 },
  { month: "Mai", revenue: 4500, consultations: 62 },
  { month: "Juin", revenue: 5100, consultations: 68 },
];

export const stats = {
  totalPatients: 248,
  consultationsToday: 12,
  hospitalisations: 8,
  revenuMensuel: "45 680 €",
  patientsRecents: 24,
  rendezVousSemaine: 38,
};
