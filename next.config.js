/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This will completely disable ESLint during builds
    ignoreDuringBuilds: true
  },
  typescript: {
    // This will disable TypeScript checks during builds
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
