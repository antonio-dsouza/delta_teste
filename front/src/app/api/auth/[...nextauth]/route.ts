import User from "@/types/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await response.json();
        if (response.ok && data.user) {
          return {
            id: data.user.id,
            email: credentials?.email,
            name: data.user.name || undefined,
          } as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name || undefined,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name || undefined,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST, nextAuthOptions };
