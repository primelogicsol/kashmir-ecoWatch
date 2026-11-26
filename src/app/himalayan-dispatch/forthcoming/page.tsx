import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { ForthcomingEditionSpread } from '@/components/himalayan-dispatch/ForthcomingEditionSpread';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LegacyFragmentRedirector } from '@/components/himalayan-dispatch/LegacyFragmentRedirector';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Coming Next: Issue 02 — A World in Transition | Himalayan Dispatch',
  description:
    'Behind the next cover of Himalayan Dispatch: explore the approved editorial production slate for Issue 02, A World in Transition, and our scientific fact-checking workflow.',
  canonicalPath: '/himalayan-dispatch/forthcoming',
  imagePath: '/images/himalayan-dispatch/forthcoming-world-in-transition.jpg',
});

export default function HimalayanDispatchForthcomingPage() {
  const { forthcomingEdition, forthcomingPreviews, workflowStages, publicationCalendar } =
    getPublicDispatchBundle();

  return (
    <div>
      <LegacyFragmentRedirector />
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <EditorialBreadcrumbs items={[{ label: 'Forthcoming Edition' }]} />
          <Link
            href={HD_ROUTES.editorialCalendar}
            className="hd-kicker inline-flex items-center gap-1.5 hover:underline shrink-0 mb-6"
          >
            <span>Full Editorial Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Signature Forthcoming Cover & Newsroom Slate */}
      <ForthcomingEditionSpread
        edition={forthcomingEdition}
        previews={forthcomingPreviews}
        showFullPageLink={false}
      />

      {/* Managing Editor's Commissioning Note */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">COMMISSIONING DESK NOTE</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              {forthcomingEdition.editorsNoteTitle}
            </h2>
            <p className="hd-folio-meta">
              {forthcomingEdition.editorsNoteAuthor} &nbsp;·&nbsp; {forthcomingEdition.editorsNoteRole}
            </p>
          </div>

          <div className="lg:col-span-7 hd-prose">
            {forthcomingEdition.editorsNoteBody.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                {para}
              </p>
            ))}

            <div
              className="mt-8 p-6 border space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">PUBLIC TRANSPARENCY &amp; CONFIDENTIALITY BOUNDARY</span>
              </div>
              <p className="hd-font-body text-sm leading-relaxed !mb-0" style={{ color: 'var(--hd-fg-secondary)' }}>
                Stories appear in our forthcoming preview only after explicit editorial clearance
                confirming that pre-publication visibility poses zero risk to field reporters,
                community witnesses, or documentary investigations. Sensitive investigations remain
                completely off-ledger until publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial & Commissioning Calendar */}
      <section
        id="editorial-calendar"
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-20 border-t scroll-mt-20"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="hd-kicker">EDITORIAL CALENDAR &amp; CLOSING WINDOWS</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Forthcoming Edition Milestones
            </h2>
            <p className="hd-font-body text-base sm:text-lg" style={{ color: 'var(--hd-fg-secondary)' }}>
              Commissioning windows, manuscript gates, and scientific peer-review schedules for upcoming volumes.
            </p>
          </div>

          <div
            className="divide-y border-t border-b"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            {publicationCalendar.map((item) => (
              <div
                key={item.id}
                className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="md:col-span-3 space-y-1">
                  <span className="hd-kicker block">{item.editionLabel}</span>
                  <span className="hd-font-display text-xl font-semibold block" style={{ color: 'var(--hd-fg)' }}>
                    {item.editionTitle}
                  </span>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <p className="hd-font-body text-base font-medium" style={{ color: 'var(--hd-fg)' }}>
                    {item.milestone}
                  </p>
                  <p className="hd-folio-meta">{item.gatekeeper}</p>
                </div>
                <div className="md:col-span-2 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {item.windowLabel}
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span
                    className="hd-font-sans inline-block px-2.5 py-1 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      borderColor:
                        item.status === 'Open for Commissions' ? 'var(--hd-copper)' : 'var(--hd-rule-strong)',
                      color: item.status === 'Open for Commissions' ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ten-Stage Editorial & Scientific Production Pipeline */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="hd-kicker">FROM PITCH TO ARCHIVE</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              How an Edition Is Reported, Fact-Checked &amp; Reviewed
            </h2>
            <p className="hd-font-body text-base sm:text-lg" style={{ color: 'var(--hd-fg-secondary)' }}>
              Every dispatch moves through ten deliberate editorial and scientific gates before and
              after publication.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-l" style={{ borderColor: 'var(--hd-rule)' }}>
            {workflowStages.map((stage) => (
              <li
                key={stage.id}
                className="p-6 border-r border-b flex flex-col justify-between space-y-4"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="hd-font-display text-3xl font-semibold"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {stage.stepNumber}
                    </span>
                    <span className="hd-folio-meta text-[9px]">{stage.gatekeeper}</span>
                  </div>
                  <h3
                    className="hd-font-display text-2xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {stage.label}
                  </h3>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={HD_ROUTES.pitch}
              className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
              style={{ backgroundColor: 'var(--hd-copper-solid)' }}
            >
              <span>Submit a Story Pitch for Future Editions</span>
            </Link>
            <Link href={HD_ROUTES.root} className="hd-kicker hover:underline">
              ← Return to Vol. 01 / No. 01
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
