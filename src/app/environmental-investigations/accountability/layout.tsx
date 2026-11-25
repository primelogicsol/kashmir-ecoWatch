import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Institutional Accountability Framework & Matrix',
  description: 'Statutory mandates, financial responsibility, monitoring obligations, audit findings, and recorded institutional responses across Western Himalayan agencies.',
  canonicalPath: '/environmental-investigations/accountability',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
