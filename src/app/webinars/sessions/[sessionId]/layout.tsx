import React from 'react';
import { SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
