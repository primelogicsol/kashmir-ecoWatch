import React from 'react';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  const params = CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
  // Backwards-compatible aliases
  params.push({ conferenceId: 'kew-conf-2026-cryo' });
  params.push({ conferenceId: 'conf-2026-wetlands' });
  params.push({ conferenceId: 'conf-2025-geomorph' });
  return params;
}

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
