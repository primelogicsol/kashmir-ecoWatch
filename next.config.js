const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {
    root: path.resolve(__dirname),
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
    ...(process.env.KEW_VPS_BUILD === '1'
      ? { cpus: 1, workerThreads: false }
      : {}),
  },

  images: {
    unoptimized: true,
    qualities: [75, 85],
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
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(self), microphone=(self), geolocation=(self), interest-cohort=()',
      },
      ...(process.env.NODE_ENV === 'production'
        ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
        : []),
    ];
    const noIndexHeaders = [
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow, noarchive',
      },
    ];
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Exclude any non-canonical *.vercel.app preview/branch deployment from search engine indexing
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: noIndexHeaders,
      },
      { source: '/admin', headers: noIndexHeaders },
      { source: '/admin/:path*', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/admin', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/admin/:path*', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/contact/track', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/contact/thread/:path*', headers: noIndexHeaders },
      { source: '/contact/track', headers: noIndexHeaders },
      { source: '/contact/thread/:path*', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/newsroom', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/newsroom/:path*', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/editorial-cms', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/journalist-sign-in', headers: noIndexHeaders },
      { source: '/himalayan-dispatch/pitch', headers: noIndexHeaders },
      { source: '/newsroom', headers: noIndexHeaders },
      { source: '/newsroom/:path*', headers: noIndexHeaders },
      { source: '/editorial-cms', headers: noIndexHeaders },
      { source: '/editorial-cms/:path*', headers: noIndexHeaders },
      { source: '/journalist-sign-in', headers: noIndexHeaders },
      { source: '/pitch', headers: noIndexHeaders },
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
    const dispatchHostFilter = [{ type: 'host', value: '(?:www\\.)?dispatch\\..*' }];
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
        has: [{ type: 'host', value: 'www.dispatch.kashmir-ecowatch.com' }],
        destination: 'https://dispatch.kashmir-ecowatch.com/:path*',
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
        missing: dispatchHostFilter,
        destination: '/submit-observation',
        permanent: true,
      },
      {
        source: '/plastic-pollution',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/plastic-pollution',
        permanent: true,
      },
      {
        source: '/plastic-pollution/:path*',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/plastic-pollution/:path*',
        permanent: true,
      },
      {
        source: '/chinar-monitoring',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/chinar-monitoring',
        permanent: true,
      },
      {
        source: '/chinar-monitoring/:path*',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/chinar-monitoring/:path*',
        permanent: true,
      },
      {
        source: '/transportation-pollution',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/transportation-pollution',
        permanent: true,
      },
      {
        source: '/transportation-pollution/:path*',
        missing: dispatchHostFilter,
        destination: '/environmental-monitoring/transportation-pollution/:path*',
        permanent: true,
      },
      {
        source: '/hazard-intelligence/western-disturbances',
        missing: dispatchHostFilter,
        destination: '/hazard-intelligence/atmospheric-systems/western-disturbances',
        permanent: true,
      },
      {
        source: '/hazard-intelligence/western-disturbances/:path*',
        missing: dispatchHostFilter,
        destination: '/hazard-intelligence/atmospheric-systems/western-disturbances/:path*',
        permanent: true,
      },
      {
        source: '/research-library/reports',
        missing: dispatchHostFilter,
        destination: '/library',
        permanent: true,
      },
      {
        source: '/risk-monitoring/hazard-risks',
        missing: dispatchHostFilter,
        destination: '/risk-monitoring/disaster-risks',
        permanent: true,
      },
      {
        source: '/webinars/admin/certificates',
        missing: dispatchHostFilter,
        destination: '/webinars/certificates',
        permanent: false,
      },
      {
        source: '/water-systems/wetlands/haigam-wetland',
        missing: dispatchHostFilter,
        destination: '/water-systems/wetlands/hygam-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/haigam',
        missing: dispatchHostFilter,
        destination: '/water-systems/wetlands/hygam-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/hokersar',
        missing: dispatchHostFilter,
        destination: '/water-systems/wetlands/hokersar-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/wetlands/shallabugh',
        missing: dispatchHostFilter,
        destination: '/water-systems/wetlands/shallabugh-wetland',
        permanent: true,
      },
      {
        source: '/water-systems/glaciers/kolahoi',
        missing: dispatchHostFilter,
        destination: '/water-systems/glaciers/kolahoi-glacier',
        permanent: true,
      },
      {
        source: '/water-systems/springs/kokernag',
        missing: dispatchHostFilter,
        destination: '/water-systems/springs/kokernag-spring',
        permanent: true,
      },
      {
        source: '/environmental-calendar/ecovoices',
        missing: dispatchHostFilter,
        destination: '/ecovoices',
        permanent: true,
      },
      {
        source: '/environmental-calendar/ecovoices/song/:slug',
        missing: dispatchHostFilter,
        destination: '/ecovoices/song/:slug',
        permanent: true,
      },
      {
        source: '/environmental-calendar/ecovoices/:path*',
        missing: dispatchHostFilter,
        destination: '/ecovoices/:path*',
        permanent: true,
      },
      {
        source: '/protected-areas/dachigam',
        missing: dispatchHostFilter,
        destination: '/protected-areas/dachigam-national-park',
        permanent: true,
      },
      // Note: All `/himalayan-dispatch*` legacy edition, story, query-parameter, and
      // subdomain consolidation 308 redirects are handled single-hop in `src/proxy.ts`.
      // On non-Dispatch hosts, `/newsroom` resolves locally to `/himalayan-dispatch/newsroom`,
      // and redirects `kashmir-ecowatch.com/newsroom` to `https://dispatch.kashmir-ecowatch.com/newsroom`
      // only when `DISPATCH_LEGACY_REDIRECTS_ENABLED === 'true'`.
      ...(process.env.DISPATCH_LEGACY_REDIRECTS_ENABLED === 'true'
        ? [
            {
              source: '/newsroom',
              has: [{ type: 'host', value: '(?:www\\.)?kashmir-ecowatch\\.com' }],
              destination: 'https://dispatch.kashmir-ecowatch.com/newsroom',
              permanent: false,
            },
            {
              source: '/newsroom/:path*',
              has: [{ type: 'host', value: '(?:www\\.)?kashmir-ecowatch\\.com' }],
              destination: 'https://dispatch.kashmir-ecowatch.com/newsroom/:path*',
              permanent: false,
            },
          ]
        : [
            {
              source: '/newsroom',
              missing: dispatchHostFilter,
              destination: '/himalayan-dispatch/newsroom',
              permanent: false,
            },
            {
              source: '/newsroom/:path*',
              missing: dispatchHostFilter,
              destination: '/himalayan-dispatch/newsroom/:path*',
              permanent: false,
            },
          ]),
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
