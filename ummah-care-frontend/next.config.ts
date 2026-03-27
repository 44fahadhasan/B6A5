import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://github.com/44fahadhasan.png")],
  },
};

export default nextConfig;
