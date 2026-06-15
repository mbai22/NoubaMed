export interface StatsData {
  monthlyRevenue: { month: string; revenue: number; consultations: number }[];
  ageGroups: { label: string; count: number }[];
  consultationTypes: { label: string; count: number }[];
  genderRepartition: { label: string; count: number }[];
  topConditions: { label: string; count: number }[];
}

export const advancedStats: StatsData = {
  monthlyRevenue: [
    { month: "Jan", revenue: 3200, consultations: 48 },
    { month: "Fév", revenue: 2800, consultations: 42 },
    { month: "Mar", revenue: 4100, consultations: 55 },
    { month: "Avr", revenue: 3800, consultations: 51 },
    { month: "Mai", revenue: 4500, consultations: 62 },
    { month: "Juin", revenue: 5100, consultations: 68 },
  ],
  ageGroups: [
    { label: "0-18", count: 12 },
    { label: "19-35", count: 78 },
    { label: "36-50", count: 85 },
    { label: "51-65", count: 48 },
    { label: "65+", count: 25 },
  ],
  consultationTypes: [
    { label: "Consultations", count: 326 },
    { label: "Téléconsultations", count: 98 },
    { label: "Urgences", count: 45 },
    { label: "Suivis", count: 156 },
  ],
  genderRepartition: [
    { label: "Femmes", count: 142 },
    { label: "Hommes", count: 106 },
  ],
  topConditions: [
    { label: "Hypertension", count: 38 },
    { label: "Diabète", count: 29 },
    { label: "Asthme", count: 21 },
    { label: "Migraine", count: 18 },
    { label: "Arthrose", count: 15 },
  ],
};
