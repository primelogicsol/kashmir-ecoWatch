import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Reader Complaints Procedure — Himalayan Dispatch',
  description:
    'Formal reader complaints procedure, triage timelines, and escalation path to the Independent Public Editor at Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/reader-complaints',
});

export default function ReaderComplaintsPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1340px] mx-auto space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Reader Complaints' }]} />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">PUBLIC ACCOUNTABILITY &amp; REDRESS</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            Reader Complaints
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Readers, research subjects, and institutions have an accessible, documented right to
            challenge perceived unfairness, missing right-of-reply context, privacy concerns, or
            breaches of the{' '}
            <Link href={HD_ROUTES.editorialCharter} className="underline">
              Editorial Charter
            </Link>
            .
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 'STAGE 01 · LOGGING & TRIAGE',
              title: 'Reference Docket Assigned',
              text: 'Every formal complaint receives an HD-CMP tracking code and is reviewed by the Reader Relations Editor and Director of Editorial Standards.',
            },
            {
              step: 'STAGE 02 · EVIDENCE AUDIT',
              title: 'Primary Record Inspection',
              text: 'Standards editors examine underlying field notes, recordings, right-of-reply outreach logs, and scientific review annotations.',
            },
            {
              step: 'STAGE 03 · ESCALATION',
              title: 'Independent Public Editor Appeal',
              text: 'If a complainant remains dissatisfied with the newsroom’s response, the docket may be escalated to the Independent Public Editor.',
            },
          ].map((s) => (
            <div key={s.step} className="p-6 border space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <span className="hd-kicker">{s.step}</span>
              <h2 className="hd-font-display text-2xl font-semibold">{s.title}</h2>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {s.text}
              </p>
            </div>
          ))}
        </section>

        <EditorialInquiryFormClient
          category="reader_complaint"
          kicker="FORMAL EDITORIAL COMPLAINT DOCKET"
          heading="Submit a Reader Complaint"
          description="Provide the specific article URL, exact passage or ethical standard in question, and supporting facts. For straightforward typographical or numerical errors, use Corrections & Clarifications."
          showArticleUrlField
          submitLabel="File Formal Complaint"
        />
      </div>
    </div>
  );
}
