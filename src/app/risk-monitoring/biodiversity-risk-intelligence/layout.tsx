import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/risk-monitoring/biodiversity-risk-intelligence");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
