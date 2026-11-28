import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LegacyFragmentRedirector } from '@/components/himalayan-dispatch/LegacyFragmentRedirector';
import { HD_ROUTES, type BureauRouteSlug } from '@/lib/himalayan-dispatch-routes';
import type {
  MastheadSectionId,
  PublicMastheadPosition,
} from '@/types/himalayan-dispatch';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Masthead & Institutional Leadership | Himalayan Dispatch',
  description:
    'Editorial Directorate, Central Newsroom, Visual Editions Directorate, Six Regional Bureaus, Multidisciplinary Scientific Review Council, Verification Standards, Media Law & Source Protection, Public Editor, and Source Charter of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/editorial-board',
});

function MastheadPositionNameTable({
  positions,
  isSpecialistCouncil = false,
}: {
  positions: PublicMastheadPosition[];
  isSpecialistCouncil?: boolean;
}) {
  return (
    <div
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
          {positions.map((pos) => {
            const isEstablishingBureau = pos.bureauOperationalStatus === 'in_establishment';
            return (
              <tr
                key={pos.id}
                id={pos.anchorId}
                className="align-top scroll-mt-28"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                {/* Position Column */}
                <td className="px-5 sm:px-6 py-4 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="hd-font-display text-xl sm:text-2xl font-semibold leading-snug"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {pos.roleTitle}
                    </span>
                    {isEstablishingBureau && (
                      <span
                        className="hd-font-sans text-[9.5px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 border"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          color: 'var(--hd-fg-muted)',
                        }}
                      >
                        In Establishment
                      </span>
                    )}
                    {pos.publicDesignationNote && (
                      <span
                        className="hd-font-sans text-[9.5px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 border"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          color: 'var(--hd-fg-muted)',
                        }}
                      >
                        {pos.publicDesignationNote}
                      </span>
                    )}
                  </div>

                  {!isSpecialistCouncil && (
                    <p className="hd-folio-meta leading-relaxed">{pos.domainsRubric}</p>
                  )}

                  {pos.bureauId && (
                    <div className="pt-0.5">
                      <Link
                        href={HD_ROUTES.bureau(pos.bureauId as BureauRouteSlug)}
                        className="hd-font-sans text-[10px] font-semibold tracking-[0.14em] uppercase hover:underline"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        View {pos.bureauId.toUpperCase()} Desk →
                      </Link>
                    </div>
                  )}
                </td>

                {/* Name Column (Strictly Verified Personnel Only; Vacant/Pending Otherwise) */}
                <td className="px-5 sm:px-6 py-4">
                  {pos.isFilledPublicly ? (
                    pos.journalistSlug ? (
                      <Link
                        href={HD_ROUTES.journalistPortfolio(pos.journalistSlug)}
                        className="inline-block group"
                      >
                        <span
                          className="hd-font-display text-xl sm:text-2xl font-semibold italic group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {pos.displayHolderName}
                        </span>
                      </Link>
                    ) : (
                      <span
                        className="hd-font-display text-xl sm:text-2xl font-semibold italic"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {pos.displayHolderName}
                      </span>
                    )
                  ) : (
                    <span
                      className="hd-font-body text-sm sm:text-base italic"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {pos.displayHolderName}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function HimalayanDispatchEditorialBoardPage() {
  const {
    mastheadSections,
    mastheadPositions,
    regionalJurisdictions,
    mastheadPublicSummary,
    editorialCharterCommitments,
    workflowStages,
  } = getPublicDispatchBundle();

  const positionsBySection = (sectionId: MastheadSectionId) =>
    mastheadPositions
      .filter((p) => p.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);

  const dedicatedGovernanceLinks = [
    { roman: 'I', label: 'Our Founding Story', href: HD_ROUTES.ourStory },
    { roman: 'II', label: 'Editorial Directorate', href: HD_ROUTES.editorialDirectorate },
    { roman: 'III', label: 'Regional Bureaus', href: HD_ROUTES.bureausOverview },
    { roman: 'IV', label: 'Scientific Review', href: HD_ROUTES.scientificReview },
    { roman: 'V', label: 'Source Protection & Verification', href: HD_ROUTES.sourceProtection },
    { roman: 'VI', label: 'Public Editor & Ombudsperson', href: HD_ROUTES.publicEditor },
    { roman: 'VII', label: 'Editorial Charter', href: HD_ROUTES.editorialCharter },
    { roman: 'VIII', label: 'Publication Imprint', href: HD_ROUTES.imprint },
    { roman: 'IX', label: 'Ethics & Governance', href: HD_ROUTES.ethicsGovernance },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <LegacyFragmentRedirector />
      <div className="max-w-[1400px] mx-auto space-y-14 sm:space-y-20">
        <EditorialBreadcrumbs items={[{ label: 'Editorial Board & Masthead' }]} />

        {/* ═══════════════════════════════════════════════════════════════════
            OPENING MASTHEAD FOLIO & INSTITUTIONAL MANDATE
            ═══════════════════════════════════════════════════════════════════ */}
        <header className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="hd-kicker">EST. 2026 · KEW WESTERN HIMALAYAS</p>
                <span style={{ color: 'var(--hd-stone)' }}>·</span>
                <p className="hd-folio-meta">LANDSCAPE · PEOPLE · SCIENCE · TRUTH</p>
              </div>
              <h1
                className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
                style={{ color: 'var(--hd-fg)' }}
              >
                Editorial Masthead &amp; Institutional Leadership
              </h1>
              <p
                className="hd-font-body text-lg sm:text-xl leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Himalayan Dispatch is a United States-based digital environmental periodical
                dedicated to editorial independence, longform narrative journalism, investigative
                accountability, documentary photography and scientific integrity across the Western
                Himalayas.
              </p>
              <p
                className="hd-font-body text-sm sm:text-base italic leading-relaxed"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                Internal appointment planning roster. Names other than verified existing personnel
                remain subject to identity and appointment confirmation.
              </p>
            </div>

            <aside
              className="lg:col-span-4 p-6 sm:p-8 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">PUBLISHING HEADQUARTERS</span>
              </div>
              <div className="space-y-1">
                <p
                  className="hd-font-display text-2xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Editorial Headquarters &amp; Publishing Office
                </p>
                <p
                  className="hd-font-body text-base leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <strong style={{ color: 'var(--hd-fg)' }}>Fairfax, Virginia 22031</strong>,
                  Greater Washington Metropolitan Area, United States of America.
                </p>
              </div>
              <div
                className="pt-3 border-t flex flex-wrap items-center gap-4"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <Link
                  href={HD_ROUTES.imprint}
                  className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>Publication Imprint</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={HD_ROUTES.editorialAppointments}
                  className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>Editorial Appointments</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </aside>
          </div>

          <div className="hd-double-rule" />

          {/* Dedicated Governance & Institutional Pages Bar */}
          <nav
            aria-label="Dedicated Governance and Charter Pages"
            className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pb-2"
          >
            {dedicatedGovernanceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-80"
              >
                <span className="hd-kicker">{item.roman}</span>
                <span
                  className="hd-font-body text-sm group-hover:underline underline-offset-4"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTIONS I – IX: ORGANIZATIONAL DIRECTORATES, BUREAUS & COUNCILS
            Retains canonical `Position | Name` column headings throughout.
            ═══════════════════════════════════════════════════════════════════ */}
        {mastheadSections.map((sec) => {
          const sectionPositions = positionsBySection(sec.id);

          // Section IV: Geographical Editorial Directorate + Regional Reporting Jurisdictions
          if (sec.id === 'IV_bureaus') {
            return (
              <section
                id={sec.anchorId}
                key={sec.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t scroll-mt-24"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <div className="lg:col-span-4 space-y-3">
                  <p className="hd-kicker">{sec.kicker}</p>
                  <h2
                    className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {sec.directorateTitle}
                  </h2>
                  <p
                    className="hd-font-body text-sm leading-relaxed pt-1"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    AJ&amp;K, Gilgit and Baltistan retain their <strong>In Establishment</strong>{' '}
                    status as distributed reporting desks. No physical regional offices are implied.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={HD_ROUTES.bureausOverview}
                      className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>Explore Bureau Reporting Architecture</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <MastheadPositionNameTable positions={sectionPositions} />

                  {/* Regional Reporting Jurisdictions Table */}
                  <div className="space-y-3">
                    <h3 className="hd-font-display text-2xl font-semibold">
                      Regional reporting jurisdictions
                    </h3>
                    <div
                      className="border"
                      style={{
                        borderColor: 'var(--hd-rule-strong)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <div
                        className="grid grid-cols-12 px-5 sm:px-6 py-3 border-b"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-recessed)',
                        }}
                      >
                        <div className="col-span-4 hd-kicker">Bureau</div>
                        <div className="col-span-8 hd-kicker">Geographical coverage</div>
                      </div>
                      <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {regionalJurisdictions.map((j) => (
                          <div
                            key={j.bureauId}
                            className="px-5 sm:px-6 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 items-baseline"
                          >
                            <div className="sm:col-span-4 flex items-center gap-2">
                              <Link
                                href={HD_ROUTES.bureau(j.bureauId)}
                                className="hd-font-display text-xl font-semibold hover:underline"
                              >
                                {j.bureau}
                              </Link>
                              {j.inEstablishment && (
                                <span
                                  className="hd-font-sans text-[9px] uppercase tracking-wider px-1.5 py-0.5 border"
                                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                                >
                                  Est.
                                </span>
                              )}
                            </div>
                            <div
                              className="sm:col-span-8 hd-font-body text-sm sm:text-base"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {j.geographicalCoverage}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // Section V: Multidisciplinary Scientific Review Council (Chair + 15 Specializations, both Position | Name)
          if (sec.id === 'V_scientific_council') {
            const chairPositions = sectionPositions.filter((p) => !p.isCouncilSpecialistRow);
            const councilSpecialists = sectionPositions.filter((p) => p.isCouncilSpecialistRow);

            return (
              <section
                id={sec.anchorId}
                key={sec.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t scroll-mt-24"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <div className="lg:col-span-4 space-y-3">
                  <p className="hd-kicker">{sec.kicker}</p>
                  <h2
                    className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {sec.directorateTitle}
                  </h2>
                  {sec.governanceNote && (
                    <div
                      className="p-5 border mt-3 space-y-2"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <p className="hd-kicker">SCIENTIFIC REVIEW MANDATE</p>
                      <p
                        className="hd-font-body text-sm leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {sec.governanceNote}
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-8 space-y-6">
                  {chairPositions.length > 0 && (
                    <MastheadPositionNameTable positions={chairPositions} />
                  )}
                  <MastheadPositionNameTable
                    positions={councilSpecialists}
                    isSpecialistCouncil
                  />
                </div>
              </section>
            );
          }

          // Standard Directorate Layout (Sections I, II, III, VI, VII, VIII, IX)
          return (
            <section
              id={sec.anchorId}
              key={sec.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t scroll-mt-24"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              <div className="lg:col-span-4 space-y-3">
                <p className="hd-kicker">{sec.kicker}</p>
                <h2
                  className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {sec.directorateTitle}
                </h2>
                {sec.governanceNote && (
                  <p
                    className="hd-font-body text-sm italic leading-relaxed pt-1"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    {sec.governanceNote}
                  </p>
                )}
              </div>

              <div className="lg:col-span-8">
                <MastheadPositionNameTable positions={sectionPositions} />
              </div>
            </section>
          );
        })}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION X · EDITORIAL INDEPENDENCE & SOURCE CHARTER
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="editorial-ethics"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t scroll-mt-24"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-4 space-y-4">
            <p className="hd-kicker">X · EDITORIAL INDEPENDENCE &amp; SOURCE CHARTER</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Institutional Editorial Commitments
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Every commissioned dispatch advances through a {workflowStages.length}-stage editorial
              gate—from pitching and reporting through line-by-line fact-checking, empirical peer
              review, right-of-reply verification and permanent edition archiving.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div
              className="border"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div
                className="grid grid-cols-12 px-5 sm:px-6 py-3.5 border-b"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-recessed)',
                }}
              >
                <div className="col-span-5 sm:col-span-4 hd-kicker">Principle</div>
                <div className="col-span-7 sm:col-span-8 hd-kicker">Standard</div>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {editorialCharterCommitments.map((item) => (
                  <div
                    key={item.principle}
                    className="px-5 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div
                      className="sm:col-span-4 hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.principle}
                    </div>
                    <div
                      className="sm:col-span-8 hd-font-body text-sm sm:text-base leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.standard}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION XI · PUBLICATION IMPRINT & ORGANIZATIONAL STRUCTURE SUMMARY
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="publication-imprint"
          className="pt-12 border-t scroll-mt-24 space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div
            className="p-8 sm:p-12 lg:p-16 border space-y-10"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            {/* Top Rubric Lockup */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="space-y-1">
                <p className="hd-kicker">XI · PUBLICATION IMPRINT</p>
                <p className="hd-folio-meta">EST. 2026 · KEW WESTERN HIMALAYAS</p>
              </div>
              <div className="sm:text-right space-y-1">
                <p className="hd-font-display text-2xl font-semibold tracking-wider uppercase">
                  HIMALAYAN DISPATCH
                </p>
                <p className="hd-kicker">LANDSCAPE · PEOPLE · SCIENCE · TRUTH</p>
              </div>
            </div>

            {/* Founding Editor-in-Chief & Publishing Headquarters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-2">
                <p className="hd-kicker">FOUNDING EDITOR-IN-CHIEF</p>
                <h2
                  className="hd-font-display text-4xl sm:text-5xl font-semibold italic"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Dr. Fayaz Ahmad Khan
                </h2>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <p className="hd-kicker">EDITORIAL HEADQUARTERS &amp; PUBLISHING OFFICE</p>
                <h3
                  className="hd-font-display text-3xl sm:text-4xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Fairfax, Virginia 22031
                </h3>
                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  Greater Washington Metropolitan Area
                  <br />
                  United States of America
                </p>
              </div>
            </div>

            {/* Four-Pillar Geographic & Circulation Colophon */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 border-t border-b divide-y lg:divide-y-0 lg:divide-x"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              {[
                { heading: 'Kashmir', caption: 'Primary Reporting Region' },
                { heading: 'Western Himalayas', caption: 'Editorial Coverage' },
                { heading: 'Six', caption: 'Regional Reporting Bureaus' },
                { heading: 'Worldwide', caption: 'Digital Circulation' },
              ].map((stat) => (
                <div
                  key={stat.caption}
                  className="py-6 px-4 first:pl-0 lg:px-6 space-y-1"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div
                    className="hd-font-display text-2xl sm:text-3xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {stat.heading}
                  </div>
                  <p className="hd-folio-meta">{stat.caption}</p>
                </div>
              ))}
            </div>

            {/* Organizational Roster Summary */}
            <div className="space-y-4">
              <p className="hd-kicker">ORGANIZATIONAL ROSTER SUMMARY</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  {
                    value: mastheadPublicSummary.totalDesignatedPositions,
                    label: 'Total designated positions',
                    sub: undefined,
                  },
                  {
                    value: mastheadPublicSummary.organizationalDivisions,
                    label: 'Organizational divisions',
                    sub: undefined,
                  },
                  {
                    value: mastheadPublicSummary.maleNames,
                    label: 'Male names',
                    sub: `Male names · ${mastheadPublicSummary.malePct}`,
                  },
                  {
                    value: mastheadPublicSummary.femaleNames,
                    label: 'Female names',
                    sub: `Female names · ${mastheadPublicSummary.femalePct}`,
                  },
                  {
                    value: mastheadPublicSummary.regionalBureaus,
                    label: 'Regional bureaus',
                    sub: undefined,
                  },
                  {
                    value: mastheadPublicSummary.scientificReviewPositions,
                    label: 'Scientific review positions',
                    sub: undefined,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 border space-y-1"
                    style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                  >
                    <div className="hd-font-display text-3xl font-semibold">{s.value}</div>
                    <p className="hd-folio-meta">{s.label}</p>
                    {s.sub && (
                      <p className="hd-font-sans text-[10px] tracking-wider uppercase" style={{ color: 'var(--hd-copper)' }}>
                        {s.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
                {mastheadPublicSummary.genderDistributionNote}
              </p>
            </div>

            {/* Signature & Copyright */}
            <div className="space-y-2 pt-1 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
              <p className="hd-kicker">
                PUBLISHED IN THE UNITED STATES &nbsp;·&nbsp; REPORTING FROM THE WESTERN HIMALAYAS
                &nbsp;·&nbsp; WRITTEN FOR THE WORLD
              </p>
              <p className="hd-folio-meta">
                © 2026 HIMALAYAN DISPATCH &nbsp;·&nbsp; A PUBLICATION OF KASHMIR ECOWATCH (KEW)
                WESTERN HIMALAYAN &nbsp;·&nbsp; PUBLISHED IN THE USA &nbsp;·&nbsp; REPORTING BEYOND
                BORDERS.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
