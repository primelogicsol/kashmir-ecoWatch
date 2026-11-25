import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Submit Environmental Investigation or Institutional Response',
  description: 'Propose a scientifically scoped investigation subject, upload traceable documentary sources, or submit an official institutional clarification.',
  canonicalPath: '/environmental-investigations/submit',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
