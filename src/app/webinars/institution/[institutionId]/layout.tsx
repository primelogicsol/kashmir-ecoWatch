import React from 'react';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';

export function generateStaticParams() {
  return VERIFIED_INSTITUTIONS.map(inst => ({ institutionId: inst.id }));
}

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
