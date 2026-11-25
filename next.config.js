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

  async rewrites() {
    return [
      // Serves standard root IndexNow verification file `/<32-hex-key>.txt` from configured INDEXNOW_KEY
      {
        source: '/:key([a-f0-9]{32})\\.txt',
        destination: '/api/indexnow/verify/:key',
      },
    ];
  },

  async headers() {
    const noIndexHeaders = [
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow, noarchive',
      },
    ];
    return [
      // Exclude any non-canonical *.vercel.app preview/branch deployment from search engine indexing
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: noIndexHeaders,
      },
      { source: '/admin', headers: noIndexHeaders },
      { source: '/admin/:path*', headers: noIndexHeaders },
      { source: '/webinars/admin', headers: noIndexHeaders },
      { source: '/webinars/admin/:path*', headers: noIndexHeaders },
      { source: '/webinars/institution/:institutionId/:subpath+', headers: noIndexHeaders },
      { source: '/api/:path*', headers: noIndexHeaders },
      { source: '/auth', headers: noIndexHeaders },
      { source: '/dashboard', headers: noIndexHeaders },
      { source: '/preview-error', headers: noIndexHeaders },
      { source: '/test-tailwind', headers: noIndexHeaders },
      { source: '/webinars/camera-test', headers: noIndexHeaders },
      { source: '/webinars/create', headers: noIndexHeaders },
      { source: '/webinars/room/:path*', headers: noIndexHeaders },
    ];
  },

  async redirects() {
    return [
      // Canonical Domain Consolidation: Permanent 308 redirects for WWW, legacy domains & obsolete public Vercel addresses
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kashmir-ecowatch.com' }],
        destination: 'https://kashmir-ecowatch.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kew-nu.vercel.app' }],
        destination: 'https://kashmir-ecowatch.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kashmir-eco-watch.vercel.app' }],
        destination: 'https://kashmir-ecowatch.com/:path*',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/submit-sighting',
        destination: '/submit-observation',
        permanent: true,
      },
      {
        source: '/plastic-pollution',
        destination: '/environmental-monitoring/plastic-pollution',
        permanent: true,
      },
      {
        source: '/plastic-pollution/:path*',
        destination: '/environmental-monitoring/plastic-pollution/:path*',
        permanent: true,
      },
      {
        source: '/chinar-monitoring',
        destination: '/environmental-monitoring/chinar-monitoring',
        permanent: true,
      },
      {
        source: '/chinar-monitoring/:path*',
        destination: '/environmental-monitoring/chinar-monitoring/:path*',
        permanent: true,
      },
      {
        source: '/transportation-pollution',
        destination: '/environmental-monitoring/transportation-pollution',
        permanent: true,
      },
      {
        source: '/transportation-pollution/:path*',
        destination: '/environmental-monitoring/transportation-pollution/:path*',
        permanent: true,
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
      {
        source: '/research-library/reports',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/risk-monitoring/hazard-risks',
        destination: '/risk-monitoring/disaster-risks',
        permanent: true,
      },
      {
        source: '/webinars/admin/certificates',
        destination: '/webinars/certificates',
        permanent: false,
      },
      {
        source: '/water-systems/wetlands/haigam-wetland',
        destination: '/water-systems/wetlands/hygam-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/haigam',
        destination: '/water-systems/wetlands/hygam-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/hokersar',
        destination: '/water-systems/wetlands/hokersar-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/shallabugh',
        destination: '/water-systems/wetlands/shallabugh-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/glaciers/kolahoi',
        destination: '/water-systems/glaciers/kolahoi-glacier',
        permanent: true,
      },
      {
        source: '/water-systems/springs/kokernag',
        destination: '/water-systems/springs/kokernag-spring',
        permanent: true,
      },
      {
        source: '/protected-areas/dachigam',
        destination: '/protected-areas/dachigam-national-park',
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
