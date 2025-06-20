const customHeaders = [
  {
    source: '/:path*',
    headers: [
      { key: 'Link', value: '<https://images.pexels.com>; rel=preconnect; crossorigin' },
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
  webpack(config) {
    return config;
  },
};


const exported = () => nextConfig;
exported.customHeaders = customHeaders;
module.exports = exported;
