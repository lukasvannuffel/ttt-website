import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "https://*.ngrok-free.app",
  ],
};

export default nextConfig;
