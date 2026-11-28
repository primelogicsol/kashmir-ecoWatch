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
    'Public Editor & Editorial Accountability docket evaluating reader concerns, fairness, conflicts of interest, right-of-reply standards, and charter compliance.',
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
            <p className="hd-kicker">READER ACCOUNTABILITY &amp; STANDARDS REVIEW</p>
            <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
              Public Editor &amp; Ombudsperson
            </h1>
            <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Dedicated to reader accountability outside routine story commissioning, the Public Editor
              mandate examines substantive reader petitions concerning fairness, undisclosed conflicts
              of interest, right-of-reply compliance, automated synthesis disclosures, and adherence to the{' '}
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
              <span className="hd-kicker">DOCKET GOVERNANCE DISCLOSURE</span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Petitions submitted below are recorded in the Himalayan Dispatch editorial accountability
              intake queue (`public_editor_petition`) for review under the Editorial Charter. Substantiated
              factual or fairness findings result in timestamped entries appended directly to the article
              and the{' '}
              <Link href={HD_ROUTES.corrections} className="underline">
                Public Corrections Register
              </Link>
              .
            </p>
          </aside>
        </header>

        <section
          className="overflow-x-auto border"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-recessed)',
                }}
              >
                <th scope="col" className="w-[58%] px-5 sm:px-6 py-3.5 hd-kicker">Position</th>
                <th scope="col" className="w-[42%] px-5 sm:px-6 py-3.5 hd-kicker">Name</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {ombudsOfficers.map((p) => (
                <tr key={p.id} className="align-top">
                  <td className="px-5 sm:px-6 py-4 space-y-1">
                    <span className="hd-font-display text-xl sm:text-2xl font-semibold block">
                      {p.roleTitle}
                    </span>
                    <span className="hd-folio-meta block">{p.domainsRubric}</span>
                  </td>
                  <td className="px-5 sm:px-6 py-4">
                    <span
                      className={
                        p.isFilledPublicly
                          ? 'hd-font-display text-xl sm:text-2xl font-semibold italic'
                          : 'hd-font-body text-sm sm:text-base italic'
                      }
                      style={{
                        color: p.isFilledPublicly ? 'var(--hd-fg)' : 'var(--hd-fg-muted)',
                      }}
                    >
                      {p.displayHolderName}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <EditorialInquiryFormClient
          category="public_editor_petition"
          kicker="ACCOUNTABILITY & OMBUDSPERSON DOCKET"
          heading="Submit a Petition for Editorial Charter Review"
          description="Use this docket for substantive ethical, fairness, right-of-reply, or charter-compliance reviews. Do not include confidential whistleblower identities in web forms. For typographical or numerical corrections, use Corrections & Clarifications."
          showArticleUrlField
          submitLabel="Submit Accountability Petition"
        />
      </div>
    </div>
  );
}
