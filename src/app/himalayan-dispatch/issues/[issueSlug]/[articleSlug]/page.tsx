import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
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
    issueSlug: toCanonicalIssueSlug(story.editionSlug),
    articleSlug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ issueSlug: string; articleSlug: string }>;
}): Promise<Metadata> {
  const { issueSlug, articleSlug } = await params;
  const story = getPublicStoryBySlug(articleSlug);
  if (!story) {
    return buildPageMetadata({
      title: 'Article Not Found — Himalayan Dispatch',
      description: 'Requested magazine article was not found.',
      canonicalPath: `/himalayan-dispatch/issues/${issueSlug}/${articleSlug}`,
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

export default async function IssueArticlePage({
  params,
}: {
  params: Promise<{ issueSlug: string; articleSlug: string }>;
}) {
  const { issueSlug, articleSlug } = await params;
  const story = getPublicStoryBySlug(articleSlug);
  if (!story) {
    notFound();
  }

  const expectedIssueSlug = toCanonicalIssueSlug(story.editionSlug);
  if (issueSlug !== expectedIssueSlug) {
    permanentRedirect(HD_ROUTES.issueArticle(expectedIssueSlug, story.slug));
  }

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
      '@type': story.bylineDisplay.includes('Desk') || story.bylineDisplay.includes('Board')
        ? 'Organization'
        : 'Person',
      name: story.bylineDisplay,
      url: IS_DISPATCH_SUBDOMAIN_LIVE
        ? toDispatchCanonicalUrl(HD_ROUTES.journalistPortfolio(story.journalistSlug))
        : `${CANONICAL_KEW_PLATFORM_URL}${toInternalDispatchPath(
            `/journalists/${story.journalistSlug}`
          )}`,
    },
    isPartOf: {
      '@type': 'PublicationIssue',
      issueNumber: story.editionLabel,
      url: IS_DISPATCH_SUBDOMAIN_LIVE
        ? toDispatchCanonicalUrl(HD_ROUTES.issue(expectedIssueSlug))
        : `${CANONICAL_KEW_PLATFORM_URL}${toInternalDispatchPath(`/issues/${expectedIssueSlug}`)}`,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      '@id': `${activeOrigin}/#organization`,
      name: DISPATCH_IDENTITY.officialName,
      url: IS_DISPATCH_SUBDOMAIN_LIVE
        ? DISPATCH_IDENTITY.canonicalHomepageUrl
        : `${CANONICAL_KEW_PLATFORM_URL}/himalayan-dispatch`,
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <JsonLd id={`hd-issue-story-${story.slug}`} data={articleJsonLd} />
      <div
        className={`w-full px-4 sm:px-8 lg:px-14 pt-6 ${
          story.departmentId === 'photo-essays' ? 'hd-darkroom-spread' : ''
        }`}
      >
        <div className="max-w-[1380px] mx-auto">
          <EditorialBreadcrumbs
            darkSurface={story.departmentId === 'photo-essays'}
            items={[
              {
                label: editionData?.edition.volumeLabel || 'Edition',
                href: HD_ROUTES.issue(expectedIssueSlug),
              },
              { label: story.title.slice(0, 48) + (story.title.length > 48 ? '…' : '') },
            ]}
          />
        </div>
      </div>
      <StoryReaderClient
        story={story}
        journalist={portfolio?.journalist || null}
        nextStory={nextStory}
      />
    </>
  );
}
