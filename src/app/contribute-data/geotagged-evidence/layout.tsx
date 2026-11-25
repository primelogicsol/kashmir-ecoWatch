import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/contribute-data/geotagged-evidence");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
