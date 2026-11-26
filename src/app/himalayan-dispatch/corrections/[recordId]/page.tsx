import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicCorrectionById,
  getPublicCorrectionRecords,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getPublicCorrectionRecords().map((r) => ({ recordId: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recordId: string }>;
}): Promise<Metadata> {
  const { recordId } = await params;
  const rec = getPublicCorrectionById(recordId);
  if (!rec) {
    return buildPageMetadata({
      title: 'Correction Record Not Found — Himalayan Dispatch',
      description: 'Requested public correction record was not found.',
      canonicalPath: `/himalayan-dispatch/corrections/${recordId}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${rec.kind} Record (${rec.id}) — ${rec.articleTitle} | Himalayan Dispatch`,
    description: rec.note,
    canonicalPath: HD_ROUTES.correctionRecord(rec.id),
  });
}

export default async function CorrectionRecordDetailPage({
  params,
}: {
  params: Promise<{ recordId: string }>;
}) {
  const { recordId } = await params;
  const rec = getPublicCorrectionById(recordId);
  if (!rec) {
    notFound();
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-12">
        <EditorialBreadcrumbs
          items={[
            { label: 'Corrections & Clarifications', href: HD_ROUTES.corrections },
            { label: `Record ${rec.id}` },
          ]}
        />

        <article
          className="p-8 sm:p-12 border space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">PUBLIC {rec.kind.toUpperCase()} RECORD</span>
            </div>
            <span className="hd-folio-meta">LOGGED {rec.date} · DOCKET {rec.id}</span>
          </div>

          <div className="space-y-2">
            <p className="hd-folio-meta">AFFECTED PUBLICATION ({rec.editionOrDeskLabel})</p>
            <h1 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight">
              {rec.articleTitle}
            </h1>
          </div>

          <div className="p-6 border-l-2 space-y-2" style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}>
            <p className="hd-kicker">OFFICIAL STANDARDS NOTICE</p>
            <p className="hd-font-body text-base sm:text-lg leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {rec.note}
            </p>
          </div>

          <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-folio-meta">AUTHORIZED BY: {rec.approvedBy}</span>
            <Link href={rec.articleUrl} className="hd-kicker inline-flex items-center gap-1.5 hover:underline">
              <span>Inspect Amended Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
