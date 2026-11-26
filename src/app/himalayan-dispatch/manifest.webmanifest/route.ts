import { NextResponse } from 'next/server';
import { DISPATCH_IDENTITY } from '@/lib/himalayan-dispatch-routes';

export async function GET() {
  const manifest = {
    name: DISPATCH_IDENTITY.extendedName,
    short_name: DISPATCH_IDENTITY.officialName,
    description:
      'Independent digital environmental periodical reporting across Kashmir, Jammu, Ladakh, AJ&K, Gilgit, and Baltistan.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F2EFE7',
    theme_color: '#171717',
    icons: [
      {
        src: '/kew_LOGO.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
