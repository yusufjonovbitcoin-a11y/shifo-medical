/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix monorepo / multiple-lockfile setups where Next may infer the wrong workspace root
  outputFileTracingRoot: __dirname,
  
  // Image optimization - AVIF format prioritized for 50-70% size reduction
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
    // AVIF format prioritized - provides 50-70% size reduction with same quality
    // AVIF automatically uses better compression when supported by browser
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days cache for images
  },

  // Enable compression
  compress: true,

  // Optimize package imports
  experimental: {
    // Removed lucide-react optimization to fix vendor chunk issues
  },

  // Power-saving optimizations
  poweredByHeader: false,
}

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig)

