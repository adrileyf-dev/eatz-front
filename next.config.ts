import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  reactCompiler: true,

  compress: true,

  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  output: "standalone",
};

export default nextConfig;
