/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: false,
  },
  output: 'export',
};

module.exports = nextConfig;
