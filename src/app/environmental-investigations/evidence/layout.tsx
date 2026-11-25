import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Scientific Evidence Verification Registry',
  description: 'Claim-by-claim scientific verification matrix distinguishing Documented environmental consequences from Unverified mechanisms and Unsupported claims.',
  canonicalPath: '/environmental-investigations/evidence',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
