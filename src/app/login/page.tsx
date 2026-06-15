"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted-light dark:bg-surface-muted-dark p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
            N
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connexion</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Accédez à votre espace cabinet
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Démo : utilisez n&apos;importe quel email / mot de passe
          </p>
        </div>
      </Card>
    </div>
  );
}
