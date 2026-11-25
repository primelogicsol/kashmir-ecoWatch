import type { MetadataRoute } from 'next';
import { CANONICAL_SITE_URL } from '@/lib/seo/entity-identity';

const PRIVATE_AND_RESTRICTED_PATHS = [
  '/admin/',
  '/webinars/admin/',
  '/webinars/institution/inst-',
  '/api/',
  '/auth',
  '/dashboard',
  '/preview-error',
  '/test-tailwind',
  '/webinars/camera-test',
  '/webinars/create',
  '/webinars/room/',
  '/ngo-impact/submit',
  '/sectoral-eia/assessment/new',
  '/images/hazard-intelligence/DRINKING*',
];

/**
 * Authoritative global search & AI crawler policy for Kashmir EcoWatch (kashmir-ecowatch.com).
 * - Excludes non-production preview deployments (VERCEL_ENV === 'preview') from indexing.
 * - Permits global search & AI retrieval crawlers on approved public scientific content.
 * - Permits AI model-training crawlers on approved public CC BY 4.0 scientific content
 *   (controlled via ALLOW_AI_TRAINING_CRAWLERS, defaulting to 'true'), while strictly
 *   preserving restricted/private/admin/API path exclusions across EVERY user-agent block.
 */
export default function robots(): MetadataRoute.Robots {
  // Never index staging or preview deployments
  if (process.env.VERCEL_ENV === 'preview') {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  const allowTrainingBots = process.env.ALLOW_AI_TRAINING_CRAWLERS !== 'false';

  return {
    rules: [
      // 1. Global Search Engines & AI Search / Grounding Retrieval Crawlers
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'Applebot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Perplexity-User',
          'Claude-SearchBot',
          'Claude-User',
        ],
        allow: '/',
        disallow: PRIVATE_AND_RESTRICTED_PATHS,
      },
      // 2. AI Model-Training & Open Research Crawlers (permitted on approved public content; restricted paths excluded)
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        ...(allowTrainingBots
          ? {
              allow: '/',
              disallow: PRIVATE_AND_RESTRICTED_PATHS,
            }
          : {
              disallow: '/',
            }),
      },
      // 3. Default rule for all other compliant crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_AND_RESTRICTED_PATHS,
      },
    ],
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`,
    host: CANONICAL_SITE_URL,
  };
}
