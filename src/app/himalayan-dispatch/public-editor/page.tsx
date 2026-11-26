import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Public Editor & Editorial Ombudsperson — Himalayan Dispatch',
  description:
    'Independent Office of the Public Editor & Editorial Ombudsperson evaluating reader concerns, fairness, conflicts of interest, and charter compliance.',
  canonicalPath: '/himalayan-dispatch/public-editor',
});

export default function PublicEditorPage() {
  const { mastheadPositions } = getPublicDispatchBundle();
  const ombudsOfficers = mastheadPositions.filter((p) => p.sectionId === 'VIII_public_editor');

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Editorial Affairs', href: HD_ROUTES.editorialDirectorate },
            { label: 'Public Editor & Ombudsperson' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">INDEPENDENT READER ACCOUNTABILITY</p>
            <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
              Public Editor &amp; Ombudsperson
            </h1>
            <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Functionally independent of routine commissioning and line editing, the Office of the
              Public Editor examines serious reader petitions concerning fairness, undisclosed
              conflicts of interest, right-of-reply compliance, and adherence to the{' '}
              <Link href={HD_ROUTES.editorialCharter} className="underline">
                Editorial Charter
              </Link>
              .
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-3"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">STRUCTURAL INDEPENDENCE</span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              The Public Editor does not preview manuscripts prior to publication and may publish
              independent assessments where systemic standards issues arise.
            </p>
          </aside>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ombudsOfficers.map((p) => (
            <div key={p.id} className="p-6 sm:p-8 border space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <span className="hd-kicker">{p.roleTitle}</span>
              <h2 className="hd-font-display text-3xl font-semibold italic">{p.displayHolderName}</h2>
              <p className="hd-folio-meta">{p.domainsRubric}</p>
              <p className="hd-font-body text-sm leading-relaxed pt-1" style={{ color: 'var(--hd-fg-secondary)' }}>
                {p.mandateDescription}
              </p>
            </div>
          ))}
        </section>

        <EditorialInquiryFormClient
          category="public_editor_petition"
          kicker="INDEPENDENT OMBUDSPERSON DOCKET"
          heading="Petition the Office of the Public Editor"
          description="Use this docket for substantive ethical, fairness, right-of-reply, or charter-compliance reviews. For routine typographical or numerical corrections, use Corrections & Clarifications."
          showArticleUrlField
          submitLabel="Submit Petition to Public Editor"
        />
      </div>
    </div>
  );
}
