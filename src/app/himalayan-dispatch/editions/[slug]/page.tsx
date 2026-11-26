import { notFound, permanentRedirect } from 'next/navigation';
import { getPublicEditionBySlug } from '@/lib/himalayan-dispatch-store';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

/**
 * Compatibility redirect route: upgrades `/himalayan-dispatch/editions/[slug]`
 * to `/himalayan-dispatch/issues/[issue-slug]` (or `/forthcoming`).
 */
export default async function LegacyEditionRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPublicEditionBySlug(slug);
  if (!data) {
    notFound();
  }
  if (data.edition.status === 'forthcoming') {
    permanentRedirect(HD_ROUTES.forthcoming);
  }
  permanentRedirect(HD_ROUTES.issue(data.canonicalIssueSlug));
}
