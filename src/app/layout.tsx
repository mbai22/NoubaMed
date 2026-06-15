import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoubaMed - Gestion Patients",
  description: "Plateforme SaaS de gestion de patients intelligente",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
