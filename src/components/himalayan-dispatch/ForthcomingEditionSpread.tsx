import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import {
  MagazineEdition,
  PublicForthcomingAssignmentPreview,
} from '@/types/himalayan-dispatch';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export function ForthcomingEditionSpread({
  edition,
  previews,
  showFullPageLink = true,
}: {
  edition: MagazineEdition;
  previews: PublicForthcomingAssignmentPreview[];
  showFullPageLink?: boolean;
}) {
  return (
    <section
      aria-labelledby="hd-forthcoming-heading"
      className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Folio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
          <div className="flex items-center gap-3">
            <span className="hd-kicker">BEHIND THE NEXT COVER</span>
            <span style={{ color: 'var(--hd-stone)' }}>·</span>
            <span className="hd-folio-meta">HIMALAYAN DISPATCH</span>
          </div>
          <span className="hd-folio-meta">{edition.issueNumberLabel}</span>
        </div>

        {/* Asymmetric Cover Mockup + Newsroom Production Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 sm:pt-14 items-start">
          {/* Left 6 Cols: Forthcoming Cover Composition */}
          <div className="lg:col-span-6">
            <div className="hd-plate-group relative border p-4 sm:p-6" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }}>
              <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-font-display text-sm sm:text-base tracking-[0.26em] uppercase font-semibold">
                  HIMALAYAN DISPATCH
                </span>
                <span className="hd-kicker">ISSUE 02 · COMING NEXT</span>
              </div>

              <div className="hd-plate-frame relative aspect-[16/10] w-full">
                <img
                  src={edition.coverImage}
                  alt={edition.coverCaption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/88 via-[#171717]/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 text-[#F2EFE7]">
                  <p className="hd-font-sans text-[10px] tracking-[0.28em] uppercase text-[#D8C3A5] mb-2">
                    COVER IN PREPARATION · {edition.volumeLabel}
                  </p>
                  <h3 className="hd-font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.02em] leading-[1.02]">
                    {edition.title}
                  </h3>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t flex flex-wrap items-center justify-between gap-2" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-folio-meta">{edition.coverLocation}</span>
                <span className="hd-font-body text-xs italic" style={{ color: 'var(--hd-copper)' }}>
                  {edition.publicationDateLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Editorial Introduction & Inside the Newsroom */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <p className="hd-kicker">ISSUE 02 &nbsp;·&nbsp; COMING NEXT</p>
              <h2
                id="hd-forthcoming-heading"
                className="hd-font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]"
                style={{ color: 'var(--hd-fg)' }}
              >
                {edition.title}
              </h2>
              <p
                className="hd-font-body text-lg sm:text-xl leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {edition.subtitle}
              </p>
              <p className="hd-folio-meta">{edition.publicationDateLabel}</p>
            </div>

            {/* Inside the Newsroom Production Schedule */}
            <div className="pt-4 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3
                  className="hd-font-display text-2xl sm:text-3xl font-semibold italic"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Inside the newsroom
                </h3>
                <span className="hd-folio-meta">APPROVED PUBLIC SLATE</span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {previews.map((item, idx) => (
                  <div
                    key={item.id}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2.5">
                        <span className="hd-folio-meta">0{idx + 1}</span>
                        <span style={{ color: 'var(--hd-stone)' }}>·</span>
                        <span className="hd-kicker text-[10px]">{item.departmentLabel}</span>
                      </div>
                      <h4
                        className="hd-font-display text-xl sm:text-2xl font-semibold leading-snug"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {item.workingTitle}
                      </h4>
                      <p
                        className="hd-font-body text-sm leading-relaxed"
                        style={{ color: 'var(--hd-fg-muted)' }}
                      >
                        {item.bylineDisplay}
                      </p>
                    </div>

                    <div className="shrink-0 sm:text-right pt-1">
                      <span
                        className="hd-font-sans inline-block px-2.5 py-1 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                        style={{
                          borderColor: 'var(--hd-copper)',
                          color: 'var(--hd-copper)',
                          backgroundColor: 'var(--hd-copper-soft)',
                        }}
                      >
                        {item.publicStageLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Confidentiality & Editorial Protection Notice */}
              <div
                className="mt-6 p-4 border-l-2 flex items-start gap-3"
                style={{
                  borderColor: 'var(--hd-stone)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <Lock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <div className="space-y-1">
                  <p className="hd-folio-meta">ILLUSTRATIVE EDITORIAL PRODUCTION SCHEDULE</p>
                  <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    Only editorially approved previews appear publicly. Confidential assignments,
                    unpublished investigations and sensitive sources remain protected.
                  </p>
                </div>
              </div>

              {showFullPageLink && (
                <div className="pt-6 flex flex-wrap items-center gap-6">
                  <Link
                    href={HD_ROUTES.forthcoming}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <span>Enter the Issue 02 Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.pitch}
                    className="hd-font-sans text-xs font-semibold tracking-[0.18em] uppercase hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Propose a Commission →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
