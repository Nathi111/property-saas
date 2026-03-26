import { Pool } from "@neondatabase/serverless"

// Re-use pool across hot-reloads in dev to avoid exhausting connections
const globalForDb = globalThis as unknown as { pool: Pool | undefined }

const pool =
  globalForDb.pool ??
  new Pool({ connectionString: process.env.DATABASE_URL })

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool

export default pool
