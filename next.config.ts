// next.config.ts
import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default withPWA({
  ...nextConfig,
  dest: "public", // Where service worker and PWA assets are generated
  register: true, // Automatically register the service worker
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
});
