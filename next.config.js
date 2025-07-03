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
      { key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' },
      { key: 'Link', value: '<https://www.googletagmanager.com>; rel=preconnect; crossorigin' },
      { key: 'Link', value: '<https://images.pexels.com>; rel=dns-prefetch' },
      { key: 'Link', value: '<https://techicons.dev>; rel=dns-prefetch' },
    ],
  },
  {
    source: '/:path*\\.(?:js|css|woff2|woff|ttf|otf)$',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ],
  },
  {
    source: '/:path*\\.(?:avif|webp|jpg|jpeg|png|gif|svg)$',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ],
  },
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  // Note: i18n routing not supported with static export
  // Will implement manual locale detection and hreflang
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512],
    unoptimized: true, // Required for static export
    dangerouslyAllowSVG: false,
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
  // Enhanced experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-accordion'],
    esmExternals: 'loose',
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config, { dev, isServer }) {
    // Advanced performance optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          // React core - loaded on every page
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react',
            priority: 30,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          // Next.js framework
          nextjs: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'nextjs',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Animation library - only load when needed
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 20,
            reuseExistingChunk: true,
          },
          // UI component library
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Icon library
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            priority: 20,
            reuseExistingChunk: true,
          },
          // CSS and styling
          styles: {
            test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge)[\\/]/,
            name: 'styles',
            priority: 15,
            reuseExistingChunk: true,
          },
          // Utilities and smaller libraries
          utils: {
            test: /[\\/]node_modules[\\/]/,
            name: 'utils',
            priority: 10,
            minChunks: 2,
            maxSize: 50000,
            reuseExistingChunk: true,
          },
          // Default vendor chunk for remaining dependencies
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 5,
            reuseExistingChunk: true,
          },
          // Common code across pages
          common: {
            name: 'common',
            minChunks: 2,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };

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
