import { Pool } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL")
}

declare global {
  // eslint-disable-next-line no-var
  var _dbPool: Pool | undefined
}

// Re-use pool across hot-reloads in dev to avoid exhausting connections
const pool = globalThis._dbPool ?? new Pool({ connectionString: process.env.DATABASE_URL })

if (process.env.NODE_ENV !== "production") globalThis._dbPool = pool

export default pool
