import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Asian & Global Comparative Environmental Case Studies',
  description: 'Empirical restoration and hazard-management lessons from Lake Biwa, Lakes Taihu & Dianchi, Imja Tsho, Room for the River, and Swiss Alpine basins.',
  canonicalPath: '/environmental-investigations/precedents',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
