import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: '36 Integrated Scientific Disciplines & Equations',
  description: 'Governing physical and ecological equations, analytical methods, and Himalayan literature anchors across 6 scientific clusters.',
  canonicalPath: '/environmental-investigations/disciplines',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
