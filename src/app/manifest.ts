import type { MetadataRoute } from 'next';
import { KEW_IDENTITY } from '@/lib/seo/entity-identity';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: KEW_IDENTITY.extendedName,
    short_name: KEW_IDENTITY.shortName,
    description:
      'Independent scientific environmental intelligence platform covering lakes, wetlands, glaciers, rivers, biodiversity, air quality, satellite GIS, and natural hazards across Kashmir and the Western Himalaya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    categories: ['science', 'education', 'environment', 'navigation'],
    icons: [
      {
        src: '/kew_LOGO.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
