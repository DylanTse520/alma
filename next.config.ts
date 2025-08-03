import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "app/_lib"),
      "@data": path.resolve(__dirname, "app/_data"),
      "@store": path.resolve(__dirname, "app/_store"),
      "@components": path.resolve(__dirname, "app/_components"),
    };
    return config;
  },
};

export default nextConfig;
