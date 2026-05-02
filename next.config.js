/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  compress: true,
  poweredByHeader: false,
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
