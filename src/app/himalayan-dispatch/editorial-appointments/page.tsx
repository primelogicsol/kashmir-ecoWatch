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
  title: 'Editorial Appointments & Advisory Fellowships — Himalayan Dispatch',
  description:
    'Open masthead appointments, visiting editorial fellowships, and Multidisciplinary Scientific Review Council nominations at Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/editorial-appointments',
});

export default function EditorialAppointmentsPage() {
  const { mastheadPositions } = getPublicDispatchBundle();
  const openSeats = mastheadPositions.filter((p) => !p.isFilledPublicly);

  const appointmentOptions = [
    ...openSeats.map((s) => `${s.roleTitle} (${s.domainsRubric})`),
    'Visiting Environmental Journalism Fellow',
    'External Specialist — Scientific Review Council',
    'Regional Bureau Associate Editor (AJ&K / Gilgit / Baltistan)',
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Join the Newsroom', href: HD_ROUTES.joinNewsroom },
            { label: 'Editorial Appointments' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">MASTHEAD &amp; ADVISORY APPOINTMENTS</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Editorial Appointments
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Senior editorial seats, legal-standards counsel, visiting fellowships, and specialist
              chairs on the Multidisciplinary Scientific Review Council are appointed by the
              Editorial Directorate following credential review and charter sign-off.
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-3"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">APPOINTMENT GOVERNANCE</span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              No candidate or nominee name is ever published on the Himalayan Dispatch masthead
              until credentials are verified, conflict-of-interest disclosures are filed, and a
              written letter of appointment is accepted.
            </p>
            <Link href={HD_ROUTES.editorialBoard} className="hd-kicker inline-block hover:underline">
              Inspect Current Masthead →
            </Link>
          </aside>
        </header>

        {/* Active Open Seats & Fellowship Tracks */}
        <section className="space-y-6">
          <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            Current Vacancies &amp; Standing Fellowship Tracks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openSeats.map((seat) => (
              <div
                key={seat.id}
                className="p-6 sm:p-8 border space-y-3"
                style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="hd-kicker">OPEN MASTHEAD SEAT</span>
                  <span className="hd-folio-meta">{seat.displayHolderName}</span>
                </div>
                <h3 className="hd-font-display text-3xl font-semibold">{seat.roleTitle}</h3>
                <p className="hd-folio-meta">{seat.domainsRubric}</p>
                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {seat.mandateDescription}
                </p>
              </div>
            ))}

            <div className="p-6 sm:p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
              <span className="hd-kicker">VISITING &amp; SCIENTIFIC APPOINTMENTS</span>
              <h3 className="hd-font-display text-3xl font-semibold">
                External Scientific Reviewers &amp; Visiting Editors
              </h3>
              <p className="hd-folio-meta">EARTH SCIENCES · ENVIRONMENTAL LAW · VISUAL ARCHIVES</p>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                University researchers, retired hydrologists, media-law scholars, and senior
                longform editors may submit expressions of interest for non-salaried advisory or
                visiting term appointments.
              </p>
            </div>
          </div>
        </section>

        {/* Nomination / Expression of Interest Operational Form */}
        <EditorialInquiryFormClient
          category="editorial_appointment_interest"
          kicker="FORMAL EXPRESSION OF INTEREST"
          heading="Submit Appointment Credentials or Nomination"
          description="Transmitted directly to the Founding Editor-in-Chief and Executive Editor in Fairfax, Virginia. For field reporting roles, use Correspondent Applications instead."
          showPositionField
          positionOptions={appointmentOptions}
          subjectLabel="Academic / Professional Specialization *"
          subjectPlaceholder="e.g., Media Law & First Amendment / Karakoram Glaciology"
          messageLabel="Statement of Qualifications & Institutional Disinterestedness *"
          submitLabel="Submit Appointment Dossier"
        />
      </div>
    </div>
  );
}
