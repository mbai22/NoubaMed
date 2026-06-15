import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & import("next-auth").DefaultSession["user"];
  }
}

export interface Doctor {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  password: string;
}

const doctors: Doctor[] = [
  { id: "DOC-001", email: "martin@noubamed.fr", name: "Dr. Martin", role: "Médecin traitant", avatar: "DM", password: "noubamed2024" },
  { id: "DOC-002", email: "bernard@noubamed.fr", name: "Dr. Bernard", role: "Cardiologue", avatar: "DB", password: "noubamed2024" },
  { id: "DOC-003", email: "admin@noubamed.fr", name: "Dr. Admin", role: "Administrateur", avatar: "DA", password: "admin2024" },
];

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email as string;
        const password = credentials.password as string;
        const doctor = doctors.find((d) => d.email === email && d.password === password);
        if (!doctor) return null;
        return {
          id: doctor.id,
          email: doctor.email,
          name: doctor.name,
          image: doctor.avatar,
          role: doctor.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as Record<string, unknown>).role = user.role;
        (token as Record<string, unknown>).id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).role = (token as Record<string, unknown>).role;
        (session.user as unknown as Record<string, unknown>).id = (token as Record<string, unknown>).id;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
