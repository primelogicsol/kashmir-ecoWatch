import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Spatial Investigation Atlas (GIS)',
  description: 'Interactive geospatial mapping of environmental investigations, watershed connectivity, and elevation envelopes across the Western Himalayas.',
  canonicalPath: '/environmental-investigations/atlas',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
