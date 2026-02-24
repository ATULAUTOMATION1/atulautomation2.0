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
        destination: "https://monetumo.com/ads-txt/atulautomation-com",
      },
    ];
  },
};

export default nextConfig;
