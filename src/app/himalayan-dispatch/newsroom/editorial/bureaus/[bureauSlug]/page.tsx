import { HdnBureausOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';
export const dynamic = 'force-dynamic';
export default async function PrivateBureauDeskPage({ params }: { params: Promise<{ bureauSlug: string }> }) {
  const { bureauSlug } = await params;
  return <HdnBureausOverviewAndDeskView bureauSlug={decodeURIComponent(bureauSlug)} />;
}
