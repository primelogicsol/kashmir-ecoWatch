import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicEditionBySlug,
  getPublicJournalistPortfolio,
  getPublicPublishedStories,
  getPublicStoryBySlug,
} from '@/lib/himalayan-dispatch-store';
import { StoryReaderClient } from '@/components/himalayan-dispatch/StoryReaderClient';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  CANONICAL_DISPATCH_URL,
  CANONICAL_KEW_PLATFORM_URL,
  DISPATCH_IDENTITY,
  HD_ROUTES,
  IS_DISPATCH_SUBDOMAIN_LIVE,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
  toDispatchCanonicalUrl,
  toInternalDispatchPath,
} from '@/lib/himalayan-dispatch-routes';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return getPublicPublishedStories().map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getPublicStoryBySlug(slug);
  if (!story) {
    return buildPageMetadata({
      title: 'Dispatch Not Found — Himalayan Dispatch',
      description: 'Requested Himalayan Dispatch inquiry was not found.',
      canonicalPath: `/himalayan-dispatch/dispatches/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: story.seoTitle
      ? `${story.seoTitle} | Himalayan Dispatch`
      : `${story.title} — ${story.editionLabel} | Himalayan Dispatch`,
    description: story.excerpt,
    canonicalPath: resolveCanonicalStoryUrl(story),
    ogType: 'article',
    imagePath: story.heroImage,
    publishedTime: story.publishedAt,
    modifiedTime: story.updatedAt || story.publishedAt,
    authors: [story.bylineDisplay],
    keywords: story.seoKeywords,
  });
}

/**
 * Direct `/himalayan-dispatch/dispatches/[slug]` route reconciled with the
 * canonical edition-article architecture: renders the complete dispatch at HTTP 200
 * while emitting the single canonical URL (`/himalayan-dispatch/issues/<issue>/<slug>`).
 */
export default async function DirectDispatchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getPublicStoryBySlug(slug);
  if (!story) {
    notFound();
  }

  const expectedIssueSlug = toCanonicalIssueSlug(story.editionSlug);
  const editionData = getPublicEditionBySlug(expectedIssueSlug);
  const portfolio = getPublicJournalistPortfolio(story.journalistSlug);
  const issueStories = getPublicPublishedStories().filter(
    (s) => s.editionSlug === story.editionSlug
  );
  const idx = issueStories.findIndex((s) => s.slug === story.slug);
  const nextStory =
    idx >= 0 && issueStories.length > 1
      ? issueStories[(idx + 1) % issueStories.length]
      : null;

  const activeOrigin = IS_DISPATCH_SUBDOMAIN_LIVE
    ? CANONICAL_DISPATCH_URL
    : CANONICAL_KEW_PLATFORM_URL;
  const canonicalUrl = IS_DISPATCH_SUBDOMAIN_LIVE
    ? toDispatchCanonicalUrl(resolveCanonicalStoryUrl(story))
    : `${CANONICAL_KEW_PLATFORM_URL}${toInternalDispatchPath(resolveCanonicalStoryUrl(story))}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.title,
    description: story.excerpt,
    datePublished: story.publishedAt,
    dateModified: story.updatedAt || story.publishedAt,
    wordCount: story.wordCount,
    image: [`${activeOrigin}${story.heroImage}`],
    author: {
      '@type':
        story.bylineDisplay.includes('Desk') || story.bylineDisplay.includes('Board')
          ? 'Organization'
          : 'Person',
      name: story.bylineDisplay,
    },
    isPartOf: {
      '@type': 'PublicationIssue',
      issueNumber: story.editionLabel,
      url: IS_DISPATCH_SUBDOMAIN_LIVE
        ? toDispatchCanonicalUrl(HD_ROUTES.issue(expectedIssueSlug))
        : `${CANONICAL_KEW_PLATFORM_URL}${toInternalDispatchPath(`/issues/${expectedIssueSlug}`)}`,
      isPartOf: {
        '@type': 'Periodical',
        name: DISPATCH_IDENTITY.officialName,
      },
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: DISPATCH_IDENTITY.publisherName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <>
      <JsonLd id={`hd-dispatch-direct-${story.slug}`} data={articleJsonLd} />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-6">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label: editionData?.edition.volumeLabel || story.editionLabel,
              href: HD_ROUTES.issue(expectedIssueSlug),
            },
            { label: story.title },
          ]}
        />
      </div>
      <StoryReaderClient
        story={story}
        journalist={portfolio?.journalist || null}
        nextStory={nextStory}
      />
    </>
  );
}
