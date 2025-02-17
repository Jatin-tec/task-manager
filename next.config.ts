import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["task-manager-alpha-orpin.vercel.app", "localhost:3000"],
    },
  },
};

export default nextConfig;
