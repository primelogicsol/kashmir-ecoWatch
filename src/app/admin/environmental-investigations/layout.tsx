import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin · Environmental Investigations Workspace',
  description: 'KEW-EIAI administrative investigation management and verification workspace.',
  canonicalPath: '/admin/environmental-investigations',
  noIndex: true,
});

export default function AdminInvestigationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
