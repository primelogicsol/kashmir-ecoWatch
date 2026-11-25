import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: '18 Environmental Investigation Domains',
  description: 'Comprehensive investigative coverage across lakes, wetlands, rivers, glaciers, alpine ecology, Karewas, hydropower, pollution, hazards, and environmental governance.',
  canonicalPath: '/environmental-investigations/domains',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
