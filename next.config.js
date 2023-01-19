/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
