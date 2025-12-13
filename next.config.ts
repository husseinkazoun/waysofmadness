import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force the project root to this folder to avoid the extra lockfile warning.
    root: __dirname,
  },
  images: {
    deviceSizes: [320, 640, 960, 1200, 1600, 2048],
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com", pathname: "/**" },
      { protocol: "https", hostname: "static1.squarespace.com", pathname: "/**" },
      { protocol: "https", hostname: "www.naderbahsounstudios.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/prints2",
        destination: "/prints",
        permanent: true,
      },
      {
        source: "/prints2/:path*",
        destination: "/prints/:path*",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
