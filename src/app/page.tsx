import type { Metadata } from 'next';
import { HomePageClient } from '@/components/sections/HomePageClient';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = getStaticRouteMetadata('/');

export default function Home() {
  return <HomePageClient />;
}
