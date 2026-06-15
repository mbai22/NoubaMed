"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/theme-provider";

export default function LandingPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary-100 dark:border-primary-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Nouba<span className="text-primary-600">Med</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              Connexion
            </Link>
            <button
              onClick={toggle}
              className="relative w-14 h-7 rounded-full bg-primary-100 dark:bg-primary-800 transition-colors duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center text-sm ${
                theme === "dark" ? "translate-x-7.5" : "translate-x-0.5"
              }`}>
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Nouvelle plateforme AI-powered
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-gray-900 dark:text-white">La gestion de vos patients</span>
              <br />
              <span className="gradient-text">réinventée</span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
              NoubaMed combine intelligence artificielle et design d&apos;exception pour simplifier la gestion de votre cabinet médical.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg">
                  Commencer gratuitement
                  <span className="ml-1">→</span>
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Voir la démo
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-400 dark:text-gray-500">
              <span>✓ GDPR compliant</span>
              <span>✓ Hébergement France</span>
              <span>✓ Support 24/7</span>
            </div>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-primary-100 dark:border-primary-800 overflow-hidden shadow-2xl">
              <div className="gradient-primary p-1">
                <div className="bg-white dark:bg-surface-dark rounded-[14px] p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-20 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-3">
                        <div className="h-2 w-12 rounded bg-gray-300 dark:bg-gray-600 mb-2" />
                        <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600" />
                      </div>
                    ))}
                  </div>
                  <div className="h-32 rounded-xl bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-primary-100 dark:border-primary-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tout ce qu&apos;il vous faut
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Une plateforme complète pour gérer votre cabinet médical au quotidien.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "◎", title: "Gestion des patients", desc: "Fiches patients complètes avec historique médical, allergies et traitements en cours." },
              { icon: "◈", title: "Rendez-vous intelligents", desc: "Planning optimisé par IA avec rappels automatiques et suggestions de créneaux." },
              { icon: "◇", title: "Dossiers médicaux", desc: "Dossiers numériques sécurisés, accessibles en un clic depuis n'importe où." },
              { icon: "◉", title: "Dashboard analytics", desc: "Statistiques en temps réel sur votre activité, revenus et tendances." },
              { icon: "□", title: "Téléconsultation", desc: "Consultations à distance intégrées, avec prise de RDV et suivi." },
              { icon: "○", title: "Facturation", desc: "Génération de factures et devis, intégration mutuelle et carte vitale." },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-primary-100 dark:border-primary-800 bg-white dark:bg-surface-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-lg mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-primary rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à transformer votre cabinet ?
              </h2>
              <p className="text-primary-100 mb-8 max-w-md mx-auto">
                Rejoignez les 200+ médecins qui utilisent déjà NoubaMed.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/login">
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg">
                    Essai gratuit 14 jours
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Contacter les ventes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-100 dark:border-primary-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs">N</div>
            <span>NoubaMed © 2026</span>
          </div>
          <div className="flex gap-6">
            <span>Mentions légales</span>
            <span>Confidentialité</span>
            <span>CGU</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
