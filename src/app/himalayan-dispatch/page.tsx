import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatches,
  getPublicDispatchBundle,
} from '@/lib/himalayan-dispatch-store';
import { CurrentEditionExperience } from '@/components/himalayan-dispatch/CurrentEditionExperience';

export const metadata: Metadata = buildPageMetadata({
  title: 'Himalayan Dispatch — Environmental Journalism & Magazine',
  description:
    'Himalayan Dispatch is an official environmental magazine of Kashmir EcoWatch exploring fragile landscapes, fallen conservation defenders, investigative journalism, and ecological truth across the Western Himalayas.',
  canonicalPath: '/himalayan-dispatch',
  imagePath: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
  keywords: [
    'Himalayan Dispatch',
    'The Price of Protecting Paradise',
    "Kashmir's Green Martyrs",
    'Himalayan environmental magazine',
    'Western Himalayas longform journalism',
    'Kashmir environmental journalism',
  ],
});

export const dynamic = 'force-dynamic';

export default function HimalayanDispatchHomePage() {
  const bundle = getPublicDispatchBundle();
  const dailyDispatches = getPublicDailyDispatches();

  return (
    <CurrentEditionExperience
      edition={bundle.currentEdition}
      stories={bundle.currentEditionStories}
      dailyDispatches={dailyDispatches}
      forthcomingEdition={bundle.forthcomingEdition}
      forthcomingPreviews={bundle.forthcomingPreviews}
    />
  );
}
