import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  ORGANIZATION_ENTITY_ID,
  WEBSITE_ENTITY_ID,
} from '@/lib/seo/entity-identity';
import { ECOVOICES_MODULE_IDENTITY, ECOVOICES_RELEASES } from '@/data/ecovoices-catalog';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-ecovoices-display',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ecovoices-serif',
  display: 'swap',
});

export const metadata: Metadata = buildPageMetadata({
  title: 'EcoVoices — Environmental Arts, Music & Creative Expression',
  description:
    'EcoVoices is Kashmir EcoWatch’s dedicated platform for communicating environmental consciousness through music, poetry, literature, visual arts, natural soundscapes, and cinematic storytelling across the Western Himalayas, featuring original SufiPulse USA environmental compositions.',
  canonicalPath: '/ecovoices',
  imagePath: '/images/environmental-calendar/calendar-hero-ecovoices-studio.jpg',
  keywords: [
    'EcoVoices',
    'Environmental Arts Kashmir',
    'Environmental Music Kashmir',
    'Pani Gawah Hai',
    'Dr. Zarf-e-Noori',
    'SufiPulse USA',
    'Kashmir EcoWatch EcoVoices',
    'Environmental Poetry Himalaya',
    'Environmental Cinema Kashmir',
    'Western Himalayan Soundscapes',
  ],
});

const ecoVoicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL_SITE_URL}/ecovoices#webpage`,
      url: `${CANONICAL_SITE_URL}/ecovoices`,
      name: `${ECOVOICES_MODULE_IDENTITY.name} — ${ECOVOICES_MODULE_IDENTITY.subtitle}`,
      description: ECOVOICES_MODULE_IDENTITY.description,
      isPartOf: { '@id': WEBSITE_ENTITY_ID },
      publisher: { '@id': ORGANIZATION_ENTITY_ID },
      inLanguage: ['en', 'ks', 'ur'],
    },
    {
      '@type': 'MusicPlaylist',
      '@id': `${CANONICAL_SITE_URL}/ecovoices#playlist`,
      name: 'EcoVoices: SufiPulse USA × Kashmir EcoWatch Environmental Music Series',
      numTracks: ECOVOICES_RELEASES.length,
      url: `${CANONICAL_SITE_URL}/ecovoices#music`,
      track: ECOVOICES_RELEASES.map((rel) => ({
        '@type': 'MusicRecording',
        position: rel.trackOrder,
        name: rel.title,
        url: `${CANONICAL_SITE_URL}/ecovoices/song/${rel.slug}`,
        duration: `PT${rel.durationFormatted.split(':')[0]}M${rel.durationFormatted.split(':')[1]}S`,
        byArtist: {
          '@type': 'Person',
          name: 'Dr. Zarf-e-Noori',
        },
        recordLabel: {
          '@type': 'Organization',
          name: rel.publisher,
          url: 'https://sufipulse.com',
        },
      })),
    },
  ],
};

export default function EcoVoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-kew-dark-surface="true"
      className={`${cinzel.variable} ${cormorant.variable} bg-[#04060d] text-slate-100 selection:bg-amber-300/30 selection:text-amber-100`}
    >
      <JsonLd id="ecovoices-structured-data" data={ecoVoicesJsonLd} />
      {children}
    </div>
  );
}
