import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow logo images from the Flask backend and common CDNs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.railway.app",
      },
      {
        protocol: "https",
        hostname: "**.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },

  // Redirect old Flask HTML routes to Next.js equivalents
  async redirects() {
    return [
      {
        source: "/search",
        destination: "/jobs",
        permanent: false,
      },
      {
        source: "/job/:id",
        destination: "/jobs/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
