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
  // Enhanced experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-accordion', 'three'],
    esmExternals: 'loose',
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false, // Disable if not used
  },
  webpack(config, { dev, isServer }) {
    // Advanced performance optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 15000,    // Reduced from 20000 for better granularity
        maxSize: 80000,    // Reduced from 100000 to prevent large chunks
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          // React core - critical for all pages
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react-core',
            priority: 50,
            reuseExistingChunk: true,
            chunks: 'all',
            enforce: true,
          },
          // Next.js framework - essential
          nextjs: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'nextjs-framework',
            priority: 40,
            reuseExistingChunk: true,
            maxSize: 60000,
          },
          // Three.js - heavy 3D library (cloud worker)
          three: {
            test: /[\\/]node_modules[\\/]three[\\/]/,
            name: 'three-js',
            priority: 35,
            reuseExistingChunk: true,
            maxSize: 70000,
          },
          // Framer Motion - animation library
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 30,
            reuseExistingChunk: true,
            maxSize: 50000,
          },
          // Radix UI components
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 25,
            reuseExistingChunk: true,
            maxSize: 40000,
          },
          // Lucide React icons
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-icons',
            priority: 20,
            reuseExistingChunk: true,
            maxSize: 30000,
          },
          // CSS and styling utilities
          styles: {
            test: /[\\/]node_modules[\\/](clsx|class-variance-authority|tailwind-merge)[\\/]/,
            name: 'styling-utils',
            priority: 15,
            reuseExistingChunk: true,
            maxSize: 25000,
          },
          // Other utilities
          utils: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor-utils',
            priority: 10,
            minChunks: 2,
            maxSize: 35000,
            reuseExistingChunk: true,
          },
          // Common code across pages
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
            maxSize: 30000,
          },
          // Default vendor chunk
          default: {
            minChunks: 2,
            priority: 1,
            reuseExistingChunk: true,
            maxSize: 40000,
          },
        },
      },
    };

    // Performance optimizations for production
    if (!dev && !isServer) {
      // Module concatenation for better performance
      config.optimization.concatenateModules = true;
      
      // Tree shaking improvements
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Add compression plugin
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,    // Reduced from 10240
          minRatio: 0.8,
          deleteOriginalAssets: false,
        })
      );

      // Optimize module resolution
      config.resolve.alias = {
        ...config.resolve.alias,
        // Use ES modules for better tree shaking
        'lodash': 'lodash-es',
      };
    }

    // Improve build performance
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));
