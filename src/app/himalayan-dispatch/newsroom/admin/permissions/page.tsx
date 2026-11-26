import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminPermissionsMatrixView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: '18-Role RBAC & Permissions — Himalayan Dispatch Newsroom',
  description: 'Authenticated 18-Role RBAC & Permissions workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/permissions',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminPermissionsMatrixView />;
}
