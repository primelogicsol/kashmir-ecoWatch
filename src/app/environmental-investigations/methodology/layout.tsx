import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Scientific Investigation Methodology & 24-Section Standard',
  description: 'Epistemic evidence verification rules, uniform 24-section publication architecture, and 12-stage AI-assisted human-verified workflow.',
  canonicalPath: '/environmental-investigations/methodology',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
