export interface Message {
  id: string;
  patientName: string;
  patientAvatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface MessageDetail {
  id: string;
  sender: "doctor" | "patient";
  text: string;
  time: string;
}

export const conversations: Message[] = [
  { id: "C-001", patientName: "Sophie Bernard", patientAvatar: "SB", lastMessage: "Merci docteur pour les conseils", time: "14:30", unread: 2, online: true },
  { id: "C-002", patientName: "Marc Dubois", patientAvatar: "MD", lastMessage: "Je vous envoie mes résultats", time: "11:15", unread: 0, online: false },
  { id: "C-003", patientName: "Emma Fontaine", patientAvatar: "EF", lastMessage: "Les migraines sont moins fréquentes", time: "Hier", unread: 1, online: true },
  { id: "C-004", patientName: "Thomas Petit", patientAvatar: "TP", lastMessage: "J'ai des vertiges depuis hier", time: "Hier", unread: 0, online: false },
  { id: "C-005", patientName: "Léa Moreau", patientAvatar: "LM", lastMessage: "Mon inhalateur semble ne plus faire effet", time: "Hier", unread: 3, online: false },
  { id: "C-006", patientName: "Camille Leroy", patientAvatar: "CL", lastMessage: "La douleur diminue progressivement", time: "2026-06-13", unread: 0, online: false },
];

export const messages: Record<string, MessageDetail[]> = {
  "C-001": [
    { id: "M1", sender: "patient", text: "Bonjour docteur, j'ai une question sur mon traitement.", time: "14:00" },
    { id: "M2", sender: "doctor", text: "Bonjour Sophie, je vous écoute.", time: "14:05" },
    { id: "M3", sender: "patient", text: "Depuis que j'ai augmenté le Lisinopril, j'ai des étourdissements le matin.", time: "14:10" },
    { id: "M4", sender: "doctor", text: "C'est un effet secondaire courant. Prenez-le le soir avant de vous coucher.", time: "14:20" },
    { id: "M5", sender: "patient", text: "D'accord, je vais essayer. Merci docteur pour les conseils", time: "14:30" },
  ],
  "C-003": [
    { id: "M10", sender: "patient", text: "Bonjour Dr. Martin, je voulais vous donner des nouvelles.", time: "09:00" },
    { id: "M11", sender: "doctor", text: "Bonjour Emma, comment évoluent vos migraines ?", time: "09:05" },
    { id: "M12", sender: "patient", text: "Les migraines sont moins fréquentes depuis le nouveau traitement.", time: "09:10" },
  ],
};

export const notificationSettings = {
  sms: true,
  email: true,
  push: true,
  rdvReminder: true,
  paymentAlert: true,
  messageAlert: true,
  reportAvailable: false,
};
