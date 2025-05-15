/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // These settings match what's in your package.json
  // Keep your existing configuration and add the redirects
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
