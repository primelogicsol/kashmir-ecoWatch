import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/environmental-monitoring/bio-waste");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
