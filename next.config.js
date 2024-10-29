/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: "s4.anilist.co" },
      { hostname: "cdn.myanimelist.net" },
    ],
  },
}

module.exports = nextConfig
