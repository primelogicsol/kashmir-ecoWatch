import type { Metadata } from 'next';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata("/earth-human-impact/change-detection-observatory/scientific-dossiers");

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
