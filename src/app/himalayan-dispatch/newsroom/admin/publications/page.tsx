import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminPublicationsAndTrashView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Master Publication Control — Himalayan Dispatch Newsroom',
  description: 'Authenticated Master Publication Control workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/publications',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminPublicationsAndTrashView mode="publications" />;
}
