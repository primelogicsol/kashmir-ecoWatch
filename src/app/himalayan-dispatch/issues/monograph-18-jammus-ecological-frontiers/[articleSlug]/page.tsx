import type { Metadata } from 'next';
import IssueArticlePage, {
  generateMetadata as baseGenerateMetadata,
} from '../../[issueSlug]/[articleSlug]/page';
import { JAMMU_FRONTIERS_STORIES } from '@/data/himalayan-dispatch-jammu-frontiers-stories';

const ISSUE_SLUG = 'monograph-18-jammus-ecological-frontiers';

export function generateStaticParams() {
  return JAMMU_FRONTIERS_STORIES.map((st) => ({
    articleSlug: st.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}): Promise<Metadata> {
  const { articleSlug } = await params;
  return baseGenerateMetadata({
    params: Promise.resolve({ issueSlug: ISSUE_SLUG, articleSlug }),
  });
}

export default async function Monograph18ArticlePage({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  return IssueArticlePage({
    params: Promise.resolve({ issueSlug: ISSUE_SLUG, articleSlug }),
  });
}
