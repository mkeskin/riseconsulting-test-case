/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
  },
}

module.exports = nextConfig
