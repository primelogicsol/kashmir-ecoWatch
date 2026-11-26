import { NextResponse } from 'next/server';
import { CANONICAL_DISPATCH_URL } from '@/lib/himalayan-dispatch-routes';

const DISALLOWED_PATHS = [
  '/newsroom',
  '/newsroom/',
  '/editorial-cms',
  '/editorial-cms/',
  '/journalist-sign-in',
  '/pitch',
  '/api/',
  '/auth',
];

export async function GET() {
  if (process.env.VERCEL_ENV === 'preview') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const allowTrainingBots = process.env.ALLOW_AI_TRAINING_CRAWLERS !== 'false';
  const disallowLines = DISALLOWED_PATHS.map((p) => `Disallow: ${p}`).join('\n');

  const lines = [
    '# Himalayan Dispatch — Authoritative Search & News Crawler Policy',
    `# Canonical Publication: ${CANONICAL_DISPATCH_URL}`,
    '',
    'User-agent: Googlebot',
    'User-agent: Googlebot-News',
    'User-agent: Googlebot-Image',
    'User-agent: Bingbot',
    'User-agent: Slurp',
    'User-agent: DuckDuckBot',
    'User-agent: Applebot',
    'User-agent: OAI-SearchBot',
    'User-agent: ChatGPT-User',
    'User-agent: PerplexityBot',
    'User-agent: Perplexity-User',
    'User-agent: Claude-SearchBot',
    'User-agent: Claude-User',
    'Allow: /',
    disallowLines,
    '',
    'User-agent: GPTBot',
    'User-agent: ClaudeBot',
    'User-agent: Google-Extended',
    'User-agent: Applebot-Extended',
    'User-agent: CCBot',
    ...(allowTrainingBots ? ['Allow: /', disallowLines] : ['Disallow: /']),
    '',
    'User-agent: *',
    'Allow: /',
    disallowLines,
    '',
    `Host: ${CANONICAL_DISPATCH_URL}`,
    `Sitemap: ${CANONICAL_DISPATCH_URL}/sitemap.xml`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
