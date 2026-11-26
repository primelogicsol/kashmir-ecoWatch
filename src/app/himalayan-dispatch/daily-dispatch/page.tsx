import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatches,
  getPublicDispatchBundle,
} from '@/lib/himalayan-dispatch-store';
import { DailyDispatchClient } from '@/components/himalayan-dispatch/DailyDispatchClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'The Daily Dispatch — Environmental Newsroom | Himalayan Dispatch',
  description:
    'Continuously updated, source-verified environmental reporting, regional dispatches, and scientific developments across Kashmir, Jammu, Ladakh, AJ&K, Gilgit, and Baltistan.',
  canonicalPath: '/himalayan-dispatch/daily-dispatch',
  imagePath: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
  keywords: [
    'Himalayan Dispatch Daily Dispatch',
    'Western Himalayan environmental news',
    'Kashmir environmental dispatches',
    'Ladakh glacier climate news',
    'KEW environmental journalism',
  ],
});

export default function DailyDispatchPage() {
  const dailyDispatches = getPublicDailyDispatches();
  const bundle = getPublicDispatchBundle();

  return (
    <DailyDispatchClient
      dailyDispatches={dailyDispatches}
      departments={bundle.departments}
    />
  );
}
