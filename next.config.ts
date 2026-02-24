import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination: "https://monetumo.com/ads-txt/atulautomation-com",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
