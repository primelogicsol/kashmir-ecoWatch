import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-craftlore-serif',
  display: 'swap',
});

export const metadata: Metadata = getStaticRouteMetadata('/sectoral-eia/reports');

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <div className={merriweather.variable}>{children}</div>;
}
