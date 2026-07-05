import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/upload/files/**",
      },
    ],
    // Next.js image optimizer blocks private/loopback IPs (SSRF guard).
    // Skip optimization in dev so localhost backend images render normally.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
