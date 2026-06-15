# NoubaMed

**Plateforme SaaS de gestion de cabinets médicaux** — Dashboard, patients, rendez-vous, téléconsultation, facturation, dossiers médicaux, messagerie, ordonnances, calendrier.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| Langage | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js v5 (beta) — Credentials provider |
| Base de données | Supabase (PostgreSQL) avec Row-Level Security |
| Synchro temps réel | Supabase Realtime |
| Déploiement | GitHub (`main`) → Vercel recommandé |

---

## Fonctionnalités

### 🔐 Authentification
- **3 comptes médecins** : Dr. Martin, Dr. Bernard, Dr. Admin
- Connexion sécurisée via NextAuth.js (JWT)
- Middleware de protection des routes
- Déconnexion depuis la sidebar

```
martin@noubamed.fr    / noubamed2024   → Médecin traitant
bernard@noubamed.fr   / noubamed2024   → Cardiologue
admin@noubamed.fr     / admin2024      → Administrateur
```

### 📊 Dashboard
- 4 cartes de statistiques (patients, consultations, hospitalisations, revenu)
- Graphique barres des revenus mensuels (CSS pur, zéro dépendance)
- Répartition consultations / téléconsultations / urgences (barres progressives)
- Planning hebdomadaire
- Liste des rendez-vous du jour + derniers patients

### 👥 Patients
- Liste complète avec recherche
- Vue desktop : tableau triable par colonnes
- Vue mobile : cartes avec avatar, statut et pathologie
- Fiche détaillée avec 3 onglets : Informations (groupe sanguin, allergies, médicaments), Rendez-vous, Dossiers médicaux
- Export CSV

### 📅 Rendez-vous
- Tableau complet avec statuts (Confirmé, En attente, Annulé, Terminé)
- Badges colorés par statut
- Cartes mobiles avec informations compactes
- Statistiques latérales (cette semaine, confirmés, en attente, terminés)

### 📆 Calendrier
- **Vue mois** : Grille 7×6, numéros du jour, pastilles d'activité, surbrillance du jour courant
- **Vue semaine** : Cartes par jour avec liste détaillée des rendez-vous
- Navigation ← / → entre les mois
- Responsive : dots sur mobile, texte complet sur desktop

### 📋 Ordonnances numériques
1. **Sélection** du patient depuis la liste
2. **Formulaire** : ajout multiple de médicaments (nom, dosage, fréquence, durée)
3. **Aperçu** : rendu format ordonnance médicale officielle
4. **Impression / PDF** : nouvelle fenêtre avec CSS print optimisé

### 🏥 Téléconsultation
- **Liste** : statuts "En cours", "Planifié", "Terminé", "Annulé"
- **Salle** : grille 2 vues vidéo, barre de contrôle (muet, caméra, raccrocher, chat, partage)
- Panneau chat et infos patient en bottom sheet mobile
- Actions rapides (prescription, compte-rendu, facturation)

### 💳 Facturation
- Statistiques : revenu mensuel, payées, en attente, taux de recouvrement
- Graphique barres des revenus (desktop)
- Recherche + filtres devis/factures
- Tableau desktop + cartes mobiles
- Export CSV + Excel
- Paiement en ligne (interface Stripe Checkout — UI uniquement)

### 📄 Dossiers médicaux
- Liste avec recherche (patient, diagnostic)
- Cartes détaillées : diagnostic, prescription, notes
- Export PDF (impression navigateur)
- Signature électronique (canvas tactile + souris)

### 💬 Messagerie
- Liste de conversations avec statut en ligne
- Badge de messages non lus
- Vue desktop : panneau latéral + zone de message
- Vue mobile : liste puis conversation plein écran
- Envoi de messages texte avec horodatage

### 🔔 Notifications
- Canaux : SMS, Email, Push (toggles)
- Alertes : Rappel RDV, Paiement, Nouveau message, Rapport disponible
- Enregistrement / Réinitialisation

### 🌐 Internationalisation (i18n)
- Français (défaut) / English / العربية
- Sélecteur de langue en haut de page
- Direction RTL pour l'arabe (`<html dir="rtl">`)
- Persistance dans `localStorage`

### 🎨 Design & UX
- Thème clair/sombre persistant (localStorage)
- Composants glassmorphisme + dégradés
- Animations fluides (float, pulse-glow, slide-up)
- Mobile-first : sidebar en drawer, tableaux → cartes, bottom sheets
- Barre de recherche sur chaque liste

---

## Structure du projet

```
├── public/
│   ├── manifest.json        # PWA (standalone, thème violet)
│   └── sw.js                # Service worker (cache-first static)
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── patients/page.tsx + [id]/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── calendrier/page.tsx
│   │   ├── teleconsultation/page.tsx + [id]/page.tsx
│   │   ├── billing/page.tsx + checkout/page.tsx
│   │   ├── records/page.tsx
│   │   ├── ordonnances/page.tsx
│   │   ├── messages/page.tsx + [id]/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── page.tsx             # Landing page
│   │   └── layout.tsx           # Root layout (Session + Theme + I18n providers)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── app-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   ├── session-provider.tsx
│   │   │   ├── notifications.tsx
│   │   │   └── language-switcher.tsx
│   │   └── ui/                  # Composants réutilisables
│   │       ├── button.tsx, card.tsx, badge.tsx, avatar.tsx
│   │       ├── input.tsx, table.tsx, chart.tsx
│   │       └── signature-pad.tsx
│   ├── lib/
│   │   ├── auth.ts              # NextAuth config + module augmentation
│   │   ├── data.ts              # Données mock (patients, rdv, factures...)
│   │   ├── messages-data.ts     # Conversations et messages mock
│   │   ├── stats-data.ts        # Statistiques avancées
│   │   ├── export.ts            # Export CSV / Excel
│   │   ├── utils.ts             # cn(), formatDate(), formatTime()
│   │   └── supabase/
│   │       ├── client.ts        # Supabase browser client
│   │       └── server.ts        # Supabase server client
│   ├── i18n/
│   │   ├── translations.ts      # FR / EN / AR
│   │   └── provider.tsx         # Contexte i18n + localStorage
│   └── middleware.ts            # Protection des routes
├── supabase-schema.sql          # Schéma PostgreSQL + RLS
├── .env.local                   # Variables d'environnement
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## Installation

```bash
git clone https://github.com/mbai22/NoubaMed.git
cd NoubaMed
npm install
```

### Variables d'environnement

Créer `.env.local` :

```env
# NextAuth.js
AUTH_SECRET="votre-secret-ici"
AUTH_URL="http://localhost:3000"

# Supabase (optionnel, les mocks sont utilisés par défaut)
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-cle-anonyme"
SUPABASE_SERVICE_ROLE_KEY="votre-cle-service"
```

### Développement

```bash
npm run dev --webpack
```

### Production

```bash
npm run build --webpack
npm start
```

> **Note** : Le flag `--webpack` est obligatoire. Turbopack est incompatible avec SWC sur windows/x64 + Node 24.

---

## Schéma base de données (Supabase)

Le fichier `supabase-schema.sql` contient :

- **doctors** — Utilisateurs / médecins (synchronisé avec NextAuth)
- **patients** — Patients liés à un docteur
- **appointments** — Rendez-vous
- **medical_records** — Dossiers médicaux
- **prescriptions** — Ordonnances (JSONB pour les médicaments)
- **invoices** — Factures
- **teleconsultations** — Téléconsultations

RLS activée : chaque médecin ne voit que ses propres données.

---

## Comptes de démonstration

| Email | Mot de passe | Rôle |
|---|---|---|
| martin@noubamed.fr | noubamed2024 | Médecin traitant |
| bernard@noubamed.fr | noubamed2024 | Cardiologue |
| admin@noubamed.fr | admin2024 | Administrateur |

---

## Déploiement

### GitHub

```bash
git remote add origin https://github.com/mbai22/NoubaMed.git
git push -u origin main
```

### Vercel recommandé

1. Importer le dépôt GitHub
2. Définir les variables d'environnement dans le dashboard Vercel
3. Build command : `npm run build --webpack`
4. Déployer

---

## Roadmap

- [x] Auth (NextAuth.js) — connexion multi-médecins
- [x] Dashboard analytics
- [x] Gestion des patients + fiches détaillées
- [x] Rendez-vous + calendrier visuel
- [x] Téléconsultation avec salle vidéo
- [x] Facturation + Stripe checkout
- [x] Dossiers médicaux + signature électronique
- [x] Ordonnances numériques PDF
- [x] Messagerie patients
- [x] Notifications (préférences)
- [x] Internationalisation FR/EN/AR
- [x] PWA (manifest + service worker)
- [ ] Supabase temps réel (remplacer les mocks)
- [ ] Rappels SMS/Email automatisés
- [ ] Paiement Stripe réel (backend)
- [ ] Multi-cabinet / centres médicaux
- [ ] Application mobile (React Native)

---

## Licence

Projet privé — Tous droits réservés.
