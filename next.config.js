/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
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
};

module.exports = nextConfig;