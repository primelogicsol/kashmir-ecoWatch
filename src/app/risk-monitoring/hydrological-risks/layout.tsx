import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/risk-monitoring/hydrological-risks");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
