import { redirect } from 'next/navigation';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
}

interface Props {
  params: Promise<{ conferenceId: string }>;
}

export default async function OverviewAliasPage({ params }: Props) {
  const { conferenceId } = await params;
  redirect(`/webinars/conferences/${conferenceId}`);
}
