import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminPublicationsAndTrashView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Recoverable Newsroom Trash — Himalayan Dispatch Newsroom',
  description: 'Authenticated Recoverable Newsroom Trash workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/trash',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminPublicationsAndTrashView mode="trash" />;
}
