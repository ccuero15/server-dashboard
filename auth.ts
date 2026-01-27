import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";  // Tu instancia de Prisma Client

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Usamos JWT para sesiones rápidas
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Validar si el usuario existe y si la contraseña coincide
        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;

        // Retornamos el usuario para la sesión (sin la contraseña por seguridad)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // <-- ¡Importante para el Dashboard!
        };
      },
    }),
  ],
callbacks: {
    async jwt({ token, user }) {
      // Cuando el usuario hace login, guardamos el role en el token
      if (user && typeof user === "object" && "role" in user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos el role del token a la sesión del cliente
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Tu página personalizada de login
  },
});