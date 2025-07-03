const CompressionPlugin = require('compression-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  fallbacks: {
    document: '/offline.html',
  },
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

const customHeaders = [
  {
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
      { key: 'Link', value: '<https://www.googletagmanager.com>; rel=preconnect; crossorigin' },
    ],
  },
  {
    source: '/:path*\.(?:avif|js|css)',
    headers: [{ key: 'Content-Encoding', value: 'br' }],
  },
  {
    source: '/:path*\.(?:woff2|woff|ttf|otf)',
    headers: [{ key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' }],
  },
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  // Note: i18n routing not supported with static export
  // Will implement manual locale detection and hreflang
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'techicons.dev',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable server-side features for static export
  experimental: {
    // Ensure static export compatibility
    esmExternals: false,
  },
  webpack(config, { dev, isServer }) {
    // Only run in production build
    if (!dev && !isServer) {
      // Add compression plugin
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    return config;
  },
};

const exported = () => nextConfig;
exported.customHeaders = customHeaders;
module.exports = withPWA(withBundleAnalyzer(exported()));
