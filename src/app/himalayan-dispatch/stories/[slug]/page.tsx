import { notFound, permanentRedirect } from 'next/navigation';
import {
  getPublicDailyDispatchBySlug,
  getPublicStoryBySlug,
} from '@/lib/himalayan-dispatch-store';
import {
  HD_ROUTES,
  resolveCanonicalStoryUrl,
} from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

/**
 * Compatibility redirect route: permanently upgrades legacy `/himalayan-dispatch/stories/[slug]`
 * bookmarks to their canonical monthly issue URL (`/himalayan-dispatch/issues/[issue-slug]/[article-slug]`)
 * or Daily Dispatch URL (`/himalayan-dispatch/daily-dispatch/[article-slug]`).
 */
export default async function LegacyStoryRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dailyArticle = getPublicDailyDispatchBySlug(slug);
  if (dailyArticle) {
    permanentRedirect(HD_ROUTES.dailyDispatchArticle(dailyArticle.slug));
  }

  const story = getPublicStoryBySlug(slug);
  if (story) {
    permanentRedirect(resolveCanonicalStoryUrl(story));
  }

  notFound();
}
