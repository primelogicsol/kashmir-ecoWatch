import type { MetadataRoute } from 'next';
import { buildValidatedSitemapInventory } from '@/lib/seo/sitemap-validator';

/**
 * Generates the validated canonical XML sitemap for https://kashmir-ecowatch.com.
 * Excludes redirects, non-indexable admin/auth routes, restricted reports,
 * duplicate route aliases, soft-404 slugs, and templated/unverified catalog stubs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { entries } = buildValidatedSitemapInventory();
  return entries
    .filter((entry) => !entry.pathname.endsWith('/request'))
    .map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
}
