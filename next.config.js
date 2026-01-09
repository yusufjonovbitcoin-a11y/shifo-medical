/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix monorepo / multiple-lockfile setups where Next may infer the wrong workspace root
  outputFileTracingRoot: __dirname,
  
  // Image optimization
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85],
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

