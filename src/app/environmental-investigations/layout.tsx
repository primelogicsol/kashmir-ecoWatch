import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Environmental Investigations & Accountability (KEW-EIAI)',
  description:
    'Multidisciplinary scientific environmental investigations examining cumulative ecological impacts, hydrological and geological evidence, and institutional responsibility across the Western Himalayas.',
  canonicalPath: '/environmental-investigations',
  imagePath: '/images/water-module/water-lake.jpg',
  keywords: [
    'Environmental Investigations Kashmir',
    'KEW-EIAI',
    'Dal Lake dredging investigation',
    'Sheshnag ecological risks',
    'Kashmir Karewas excavation',
    'Institutional environmental accountability',
    'Western Himalayan scientific intelligence',
  ],
});

export default function EnvironmentalInvestigationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
