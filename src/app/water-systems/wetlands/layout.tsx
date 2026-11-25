import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/water-systems/wetlands");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
