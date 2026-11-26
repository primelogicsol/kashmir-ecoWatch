import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatches,
  getPublicDispatchBundle,
} from '@/lib/himalayan-dispatch-store';
import { CurrentEditionExperience } from '@/components/himalayan-dispatch/CurrentEditionExperience';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'The Current Issue — Vol. 01 / No. 01 | Himalayan Dispatch',
  description:
    'Read the current monthly edition of Himalayan Dispatch: Volume 01, Issue 01 — When Mountains Speak, Who Is Listening?, featuring cover inquiries, longform features, field dispatches, and monochrome visual essays.',
  canonicalPath: '/himalayan-dispatch/current-issue',
  imagePath: '/images/himalayan-dispatch/cover-gangbal-inaugural.jpg',
});

export default function CurrentIssuePage() {
  const bundle = getPublicDispatchBundle();
  const dailyDispatches = getPublicDailyDispatches();

  return (
    <div>
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <EditorialBreadcrumbs items={[{ label: 'The Current Issue' }]} />
          <Link
            href={HD_ROUTES.inauguralIssue}
            className="hd-folio-meta hover:underline shrink-0 mb-6"
          >
            Permanent Citation Folio: Volume 01 · Issue 01 →
          </Link>
        </div>
      </div>

      <CurrentEditionExperience
        edition={bundle.currentEdition}
        stories={bundle.currentEditionStories}
        dailyDispatches={dailyDispatches}
        forthcomingEdition={bundle.forthcomingEdition}
        forthcomingPreviews={bundle.forthcomingPreviews}
      />
    </div>
  );
}
