import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Note: Next.js 13+ utilise le routage basé sur l'app directory
  // Donc la configuration i18n est gérée différemment par notre code
  
  // Make sure public locales are accessible
  async rewrites() {
    return [
      {
        source: '/locales/:path*',
        destination: '/api/locales/:path*',
      }
    ];
  }
};

export default nextConfig;
