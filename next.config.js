/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable server-side features for static export
  experimental: {
    // Ensure static export compatibility
    esmExternals: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://images.pexels.com>; rel=preconnect; crossorigin'
          },
        ],
      },
      {
        source: '/:path*\.(?:avif|js|css)',
        headers: [
          {
            key: 'Content-Encoding',
            value: 'br'
          }
        ],
      },
      {
        source: '/:path*\.(?:woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ],
      }
    ];
  },
  webpack(config) {
    config.experiments = { ...config.experiments, brotliSize: true };
    return config;
  },
};

module.exports = nextConfig;