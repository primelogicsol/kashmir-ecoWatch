import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { CANONICAL_SITE_URL, ORGANIZATION_ENTITY_ID } from '@/lib/seo/entity-identity';
import { ECOVOICES_RELEASES } from '@/data/ecovoices-catalog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = ECOVOICES_RELEASES.find((r) => r.slug === slug);
  if (!release) {
    return buildPageMetadata({
      title: 'Composition Not Found — EcoVoices',
      description: 'Requested EcoVoices composition was not found.',
      canonicalPath: `/ecovoices/song/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${release.title} — EcoVoices Environmental Music`,
    description: `${release.subtitle}. ${release.artistCredit}. ${release.ecologicalDossier}`.slice(
      0,
      300
    ),
    canonicalPath: `/ecovoices/song/${release.slug}`,
    ogType: 'article',
    imagePath: release.coverImage,
    authors: ['Dr. Zarf-e-Noori', 'SufiPulse USA'],
    keywords: [
      release.title,
      release.primaryTheme,
      'EcoVoices',
      'SufiPulse USA',
      'Dr. Zarf-e-Noori',
      'Kashmir environmental music',
      ...release.instrumentsUsed,
    ],
  });
}

export default async function EcoVoiceSongLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = ECOVOICES_RELEASES.find((r) => r.slug === slug);

  const jsonLd = release
    ? {
        '@context': 'https://schema.org',
        '@type': 'MusicRecording',
        '@id': `${CANONICAL_SITE_URL}/ecovoices/song/${release.slug}#recording`,
        name: release.title,
        description: release.ecologicalDossier,
        url: `${CANONICAL_SITE_URL}/ecovoices/song/${release.slug}`,
        duration: `PT${release.durationFormatted.split(':')[0]}M${release.durationFormatted.split(':')[1]}S`,
        inLanguage: release.language,
        datePublished: String(release.year),
        isAccessibleForFree: true,
        byArtist: {
          '@type': 'Person',
          name: 'Dr. Zarf-e-Noori',
        },
        publisher: {
          '@type': 'Organization',
          name: release.publisher,
          url: 'https://sufipulse.com',
        },
        isPartOf: {
          '@type': 'CollectionPage',
          url: `${CANONICAL_SITE_URL}/ecovoices`,
          name: 'EcoVoices — Environmental Arts, Music & Creative Expression',
          publisher: { '@id': ORGANIZATION_ENTITY_ID },
        },
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd id={`ecovoices-song-${slug}`} data={jsonLd} />}
      {children}
    </>
  );
}
