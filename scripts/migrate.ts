/**
 * Run with: npm run db:migrate
 *
 * Creates the tables required by @auth/pg-adapter.
 * Safe to run multiple times (uses IF NOT EXISTS).
 */
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS verification_token (
      identifier TEXT NOT NULL,
      expires     TIMESTAMPTZ NOT NULL,
      token       TEXT NOT NULL,
      PRIMARY KEY (identifier, token)
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS accounts (
      id                  TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
      "userId"            TEXT NOT NULL,
      type                TEXT NOT NULL,
      provider            TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      refresh_token       TEXT,
      access_token        TEXT,
      expires_at          BIGINT,
      id_token            TEXT,
      scope               TEXT,
      session_state       TEXT,
      token_type          TEXT,
      UNIQUE (provider, "providerAccountId")
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id             TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
      "userId"       TEXT NOT NULL,
      expires        TIMESTAMPTZ NOT NULL,
      "sessionToken" TEXT NOT NULL UNIQUE
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id              TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
      name            TEXT,
      email           TEXT UNIQUE,
      "emailVerified" TIMESTAMPTZ,
      image           TEXT
    )
  `

  console.log("✓ Database tables created successfully")
}

main().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
