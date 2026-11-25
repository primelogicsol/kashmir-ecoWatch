import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata('/admin');

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
