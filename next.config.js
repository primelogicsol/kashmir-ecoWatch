const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/submit-sighting',
        destination: '/submit-observation',
        permanent: true,
      },
      {
        source: '/plastic-pollution',
        destination: '/environmental-monitoring/plastic-pollution',
        permanent: false,
      },
      {
        source: '/plastic-pollution/:path*',
        destination: '/environmental-monitoring/plastic-pollution/:path*',
        permanent: false,
      },
      {
        source: '/chinar-monitoring',
        destination: '/environmental-monitoring/chinar-monitoring',
        permanent: false,
      },
      {
        source: '/chinar-monitoring/:path*',
        destination: '/environmental-monitoring/chinar-monitoring/:path*',
        permanent: false,
      },
      {
        source: '/transportation-pollution',
        destination: '/environmental-monitoring/transportation-pollution',
        permanent: false,
      },
      {
        source: '/transportation-pollution/:path*',
        destination: '/environmental-monitoring/transportation-pollution/:path*',
        permanent: false,
      },
      {
        source: '/hazard-intelligence/western-disturbances',
        destination: '/hazard-intelligence/atmospheric-systems/western-disturbances',
        permanent: true,
      },
      {
        source: '/hazard-intelligence/western-disturbances/:path*',
        destination: '/hazard-intelligence/atmospheric-systems/western-disturbances/:path*',
        permanent: true,
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.cache = false;

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;