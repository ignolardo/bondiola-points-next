/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  /* assetPrefix: isProd ? '/your-github-repo-name/' : '', */
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
