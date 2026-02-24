import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/api/ads-txt",
      },
    ];
  },
};

export default nextConfig;
