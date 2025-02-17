import type { NextConfig } from "next";

// task-manager-te5h.vercel.app

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["task-manager-te5h.vercel.app"],
    },
  },
};

export default nextConfig;
