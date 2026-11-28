import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicCorrectionRecords } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Corrections & Clarifications — Public Standards Ledger | Himalayan Dispatch',
  description:
    'Permanent public record of factual corrections, empirical clarifications, and post-publication updates across Himalayan Dispatch, with direct error-reporting intake.',
  canonicalPath: '/himalayan-dispatch/corrections',
});

export default function CorrectionsPage() {
  const records = getPublicCorrectionRecords();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Editorial Affairs', href: HD_ROUTES.editorialDirectorate },
            { label: 'Corrections & Clarifications' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">OFFICE OF EDITORIAL STANDARDS &amp; VERIFICATION</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Corrections &amp; Clarifications
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Himalayan Dispatch never silently alters a material factual claim after publication.
              Substantive factual errors, measurement refinements, and contextual clarifications are
              appended transparently to the article and logged permanently in this public register.
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-2.5"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <p className="hd-kicker">STANDARDS CLASSIFICATION</p>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <strong>Correction:</strong> Rectifies an inaccurate factual statement, date, name, or numerical value.
            </p>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <strong>Clarification:</strong> Supplies precision where accurate text risked misinterpretation.
            </p>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <strong>Editorial Update:</strong> Appends significant subsequent statutory or scientific developments.
            </p>
          </aside>
        </header>

        {/* Public Corrections Register */}
        <section className="space-y-6">
          <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <h2 className="hd-font-display text-3xl font-semibold">
              Public Corrections &amp; Clarifications Register ({records.length})
            </h2>
            <span className="hd-folio-meta">PERMANENT CITATION RECORDS</span>
          </div>

          <div className="divide-y border-b" style={{ borderColor: 'var(--hd-rule)' }}>
            {records.map((rec) => (
              <article
                key={rec.id}
                className="py-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <span className="hd-kicker">{rec.kind}</span>
                  </div>
                  <p className="hd-folio-meta">{rec.date} · ID: {rec.id}</p>
                </div>

                <div className="lg:col-span-7 space-y-2">
                  <Link href={rec.articleUrl} className="hd-font-display text-2xl font-semibold hover:underline block">
                    {rec.articleTitle}
                  </Link>
                  <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {rec.note}
                  </p>
                  <p className="hd-folio-meta">SIGNED OFF BY: {rec.approvedBy}</p>
                </div>

                <div className="lg:col-span-2 lg:text-right">
                  <Link
                    href={HD_ROUTES.correctionRecord(rec.id)}
                    className="hd-kicker inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Record Folio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Report a Factual Error Form */}
        <EditorialInquiryFormClient
          category="correction_request"
          kicker="FACTUAL ACCURACY INTAKE"
          heading="Report a Factual Error or Request a Clarification"
          description="Routed directly to the Office of Editorial Standards & Verification and the Founding Editor-in-Chief. For broader ethical concerns, visit Reader Complaints or the Public Editor."
          showArticleUrlField
          subjectLabel="Claim or Passage in Question *"
          subjectPlaceholder="e.g., Canal elevation figure in Chapter I"
          messageLabel="Documentary Evidence Supporting Correction *"
          submitLabel="Submit Correction Request"
        />
      </div>
    </div>
  );
}
