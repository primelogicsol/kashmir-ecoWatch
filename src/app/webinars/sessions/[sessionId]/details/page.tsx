import { redirect } from 'next/navigation';
import { SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionDetailsAlias({ params }: Props) {
  const { sessionId } = await params;
  redirect(`/webinars/sessions/${sessionId}`);
}
