import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Investigation Intelligence Dashboard (KEW-EIAI)',
  description: 'Central 12-tab analytical dashboard tracking Western Himalayan environmental investigations, evidence verification ratios, spatial envelopes, and institutional accountability.',
  canonicalPath: '/environmental-investigations/dashboard',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
