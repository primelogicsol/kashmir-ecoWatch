import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Environmental Investigation Recommendations Tracker',
  description: 'Immediate, medium-term, and long-term corrective environmental actions with measurable verification indicators.',
  canonicalPath: '/environmental-investigations/recommendations',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
