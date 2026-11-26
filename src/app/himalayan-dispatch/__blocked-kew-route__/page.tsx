import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: '404 — Folio Not Found | Himalayan Dispatch',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function BlockedUnrelatedKewRoutePage() {
  notFound();
}
