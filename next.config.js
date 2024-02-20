/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    publicRoutes: ['/login', '/'],
  },
  images: {
    domains: ["sygescol.uniminuto.sistemasivhorsnet.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
