import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
import Google from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import pool from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),

  providers: [
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          // Request offline access so we get a refresh token
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  // JWT strategy avoids a DB round-trip on every authenticated request,
  // which is the primary source of latency in serverless environments.
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist user id and provider on first sign-in
      if (user) token.userId = user.id
      if (account) token.provider = account.provider
      return token
    },
    async session({ session, token }) {
      if (token.userId) session.user.id = token.userId as string
      return session
    },
  },
})
