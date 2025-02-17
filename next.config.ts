import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["task-manager-te5h.vercel.app", "localhost:3000"],
    },
  },
};

export default nextConfig;
