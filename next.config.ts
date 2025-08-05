import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Railway deployment optimizations
  output: 'standalone',
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
  },
  // Force CSS rebuilds
  generateBuildId: async () => {
    return `healthcare-demo-${Date.now()}`;
  },
  /* config options here */
};

export default nextConfig;
