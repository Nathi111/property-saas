import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // Required for @neondatabase/serverless with WebSockets on edge
    serverComponentsExternalPackages: ["@neondatabase/serverless"],
  },
}

export default nextConfig
