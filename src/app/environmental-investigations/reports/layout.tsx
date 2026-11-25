import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Environmental Investigation Reports Registry',
  description: 'Published 24-section scientific environmental investigations and active/proposed scoping charters across Kashmir and the Western Himalayas.',
  canonicalPath: '/environmental-investigations/reports',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
