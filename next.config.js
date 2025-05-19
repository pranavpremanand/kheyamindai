/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/og-image.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/services/cloud-devops.ai',
        destination: '/services/cloud-devops-ai',
        permanent: true,
      },
      {
        source: '/services/voice.ai-agents',
        destination: '/services/voice-ai-agents',
        permanent: true,
      }
    ];
  },
}

module.exports = nextConfig;
