import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qqpaoqfxnumeznkolobb.supabase.co", // Your Supabase Project Hostname
        port: "",
        pathname: "/storage/v1/object/public/**", // Allow access to storage
      },
    ],
  },
};

export default nextConfig;
