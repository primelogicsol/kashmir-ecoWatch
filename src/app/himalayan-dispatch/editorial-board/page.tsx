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
  title: 'Masthead & Governance — Editorial Board, Verification & Source Charter | Himalayan Dispatch',
  description:
    'Editorial Directorate, Central Newsroom, Visual Editions Directorate, Six Regional Bureaus, Multidisciplinary Scientific Review Council, Verification Standards, Media Law & Source Protection, Public Editor, and Source Charter of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/editorial-board',
});

const BUREAU_DISPLAY_LABELS: Record<
  NonNullable<PublicMastheadPosition['bureauId']>,
  { kicker: string; scope: string }
> = {
  kashmir: {
    kicker: 'KASHMIR BUREAU',
    scope: 'Kashmir Valley · Jhelum Basin & Pir Panjal–Greater Himalayan Flanks',
  },
  jammu: {
    kicker: 'JAMMU BUREAU',
    scope: 'Chenab Gorge, Pir Panjal Southern Escarpment & Shivalik Foothills',
  },
  ladakh: {
    kicker: 'LADAKH BUREAU',
    scope: 'Trans-Himalayan Cold Desert · Indus, Shyok, Zanskar & Changthang',
  },
  ajk: {
    kicker: 'AJ&K BUREAU',
    scope: 'Neelum Valley, Muzaffarabad Syntaxis & Mangla–Jhelum Catchments',
  },
  gilgit: {
    kicker: 'GILGIT BUREAU',
    scope: 'Western Karakoram, Hindu Raj & Upper Indus Confluence',
  },
  baltistan: {
    kicker: 'BALTISTAN BUREAU',
    scope: 'Central Karakoram Icefields · Skardu, Shigar, Shyok & Baltoro',
  },
};

function MastheadAppointeeEntry({ pos }: { pos: PublicMastheadPosition }) {
  return (
    <div
      id={pos.anchorId}
      className="py-6 first:pt-0 last:pb-0 space-y-2 scroll-mt-28"
      style={{ borderColor: 'var(--hd-rule)' }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="hd-kicker">{pos.roleTitle}</p>
        {pos.publicDesignationNote && (
          <span
            className="hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 border"
            style={{
              borderColor: 'var(--hd-rule)',
              color: 'var(--hd-fg-muted)',
            }}
          >
            {pos.publicDesignationNote}
          </span>
        )}
      </div>

      {pos.isFilledPublicly ? (
        pos.journalistSlug ? (
          <Link
            href={HD_ROUTES.journalistPortfolio(pos.journalistSlug)}
            className="inline-block group"
          >
            <h3
              className="hd-font-display text-2xl sm:text-3xl font-semibold italic group-hover:underline underline-offset-4"
              style={{ color: 'var(--hd-fg)' }}
            >
              {pos.displayHolderName}
            </h3>
          </Link>
        ) : (
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold italic"
            style={{ color: 'var(--hd-fg)' }}
          >
            {pos.displayHolderName}
          </h3>
        )
      ) : (
        <h3
          className="hd-font-display text-2xl sm:text-3xl italic"
          style={{ color: 'var(--hd-fg-muted)' }}
        >
          {pos.displayHolderName}
        </h3>
      )}

      <p className="hd-folio-meta leading-relaxed">{pos.domainsRubric}</p>

      <p
        className="hd-font-body text-base leading-relaxed pt-0.5 max-w-3xl"
        style={{ color: 'var(--hd-fg-secondary)' }}
      >
        {pos.mandateDescription}
      </p>
    </div>
  );
}

export default function HimalayanDispatchEditorialBoardPage() {
  const {
    mastheadSections,
    mastheadPositions,
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
        <EditorialBreadcrumbs items={[{ label: 'Editorial Board' }]} />

        {/* ═══════════════════════════════════════════════════════════════════
            OPENING MASTHEAD FOLIO & INSTITUTIONAL MANDATE
            ═══════════════════════════════════════════════════════════════════ */}
        <header className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-5">
              <p className="hd-kicker">MASTHEAD &amp; GOVERNANCE</p>
              <h1
                className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
                style={{ color: 'var(--hd-fg)' }}
              >
                Editorial Board, Verification &amp; Source Charter
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
                className="hd-font-body text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Its editorial governance framework integrates professional journalism,
                multidisciplinary scientific review, independent fact-checking, documentary
                verification, source protection and transparent public accountability.
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
                  <strong style={{ color: 'var(--hd-fg)' }}>Fairfax, VA 22031</strong>, Greater
                  Washington Metropolitan Area, United States of America.
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
            ═══════════════════════════════════════════════════════════════════ */}
        {mastheadSections.map((sec) => {
          const sectionPositions = positionsBySection(sec.id);

          // Special Layout for Section IV: Geographical Editorial Directorate & Six Regional Bureaus
          if (sec.id === 'IV_bureaus') {
            const leadPositions = sectionPositions.filter((p) => !p.bureauId);
            const bureauPositions = sectionPositions.filter((p) => Boolean(p.bureauId));

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
                      className="hd-font-body text-sm leading-relaxed pt-1"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {sec.governanceNote}
                    </p>
                  )}
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
                  {/* Director of Regional Correspondence */}
                  {leadPositions.length > 0 && (
                    <div
                      className="divide-y pb-6 border-b"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      {leadPositions.map((pos) => (
                        <MastheadAppointeeEntry key={pos.id} pos={pos} />
                      ))}
                    </div>
                  )}

                  {/* Central Editorial Directorate Imprint Block */}
                  <div
                    className="p-6 sm:p-7 border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <div className="space-y-1">
                      <p className="hd-kicker">CENTRAL EDITORIAL DIRECTORATE</p>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        Fairfax, Virginia
                      </h3>
                      <p
                        className="hd-font-body text-sm sm:text-base"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        Greater Washington Metropolitan Area · United States of America
                      </p>
                    </div>
                    <p className="hd-folio-meta sm:text-right">
                      DISTRIBUTED REPORTING NETWORK
                      <br />
                      SIX REGIONAL BUREAUS
                    </p>
                  </div>

                  {/* Six Regional Bureaus Grid */}
                  <div className="space-y-3">
                    <p className="hd-folio-meta">
                      DISTRIBUTED REPORTING NETWORK · SIX REGIONAL BUREAUS
                    </p>
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      {bureauPositions.map((bPos) => {
                        const meta = bPos.bureauId
                          ? BUREAU_DISPLAY_LABELS[bPos.bureauId]
                          : { kicker: bPos.domainsRubric, scope: bPos.mandateDescription };
                        const isEstablishing = bPos.bureauOperationalStatus === 'in_establishment';

                        return (
                          <Link
                            key={bPos.id}
                            href={
                              bPos.bureauId
                                ? HD_ROUTES.bureau(bPos.bureauId as BureauRouteSlug)
                                : HD_ROUTES.bureausOverview
                            }
                            className="p-5 sm:p-6 border-r border-b flex flex-col justify-between space-y-3 group hover:opacity-90 transition-opacity"
                            style={{
                              borderColor: 'var(--hd-rule)',
                              backgroundColor: 'var(--hd-bg)',
                            }}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="hd-kicker group-hover:underline">{meta.kicker}</span>
                                {isEstablishing && (
                                  <span
                                    className="hd-font-sans text-[9px] font-semibold tracking-[0.16em] uppercase px-1.5 py-0.5 border"
                                    style={{
                                      borderColor: 'var(--hd-rule)',
                                      color: 'var(--hd-fg-muted)',
                                    }}
                                    title="Distributed reporting desk currently being established — not a physical office"
                                  >
                                    Est.
                                  </span>
                                )}
                              </div>

                              <h4
                                className="hd-font-display text-2xl font-semibold italic"
                                style={{
                                  color: bPos.isFilledPublicly
                                    ? 'var(--hd-fg)'
                                    : 'var(--hd-fg-muted)',
                                }}
                              >
                                {bPos.displayHolderName}
                              </h4>

                              <p className="hd-folio-meta">
                                {bPos.roleTitle}
                                {isEstablishing ? ' · In Establishment' : ''}
                              </p>
                            </div>

                            <p
                              className="hd-font-body text-xs sm:text-sm leading-relaxed pt-1"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {meta.scope}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                    <p
                      className="hd-font-body text-xs sm:text-sm italic pt-1"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      AJ&amp;K, Gilgit and Baltistan retain their existing establishment status as
                      distributed reporting desks currently being established. No physical regional
                      offices are implied.
                    </p>
                  </div>
                </div>
              </section>
            );
          }

          // Special Layout for Section V: Multidisciplinary Scientific Review Council
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

                <div className="lg:col-span-8 space-y-8">
                  {chairPositions.length > 0 && (
                    <div
                      className="divide-y pb-6 border-b"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      {chairPositions.map((pos) => (
                        <MastheadAppointeeEntry key={pos.id} pos={pos} />
                      ))}
                    </div>
                  )}

                  {/* 15 Specialist Reviewers Ledger */}
                  <div className="space-y-3">
                    <div
                      className="hidden sm:grid sm:grid-cols-12 pb-3 border-b"
                      style={{ borderColor: 'var(--hd-rule-strong)' }}
                    >
                      <div className="sm:col-span-5 hd-kicker">Council Reviewer</div>
                      <div className="sm:col-span-7 hd-kicker">
                        Scientific Review Specialization
                      </div>
                    </div>

                    <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                      {councilSpecialists.map((rev) => (
                        <div
                          key={rev.id}
                          className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 items-baseline"
                          style={{ borderColor: 'var(--hd-rule)' }}
                        >
                          <div className="sm:col-span-5">
                            <span
                              className="hd-font-display text-xl sm:text-2xl font-semibold italic"
                              style={{
                                color: rev.isFilledPublicly
                                  ? 'var(--hd-fg)'
                                  : 'var(--hd-fg-muted)',
                              }}
                            >
                              {rev.displayHolderName}
                            </span>
                          </div>
                          <div
                            className="sm:col-span-7 hd-font-body text-sm sm:text-base"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            {rev.domainsRubric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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

              <div className="lg:col-span-8 divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {sectionPositions.map((pos) => (
                  <MastheadAppointeeEntry key={pos.id} pos={pos} />
                ))}
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
                className="hidden sm:grid sm:grid-cols-12 px-6 py-3.5 border-b"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-recessed)',
                }}
              >
                <div className="sm:col-span-4 hd-kicker">Principle</div>
                <div className="sm:col-span-8 hd-kicker">Standard</div>
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
            SECTION XI · PUBLICATION IMPRINT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="publication-imprint"
          className="pt-12 border-t scroll-mt-24"
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
              <p className="hd-kicker">LANDSCAPE · PEOPLE · SCIENCE · TRUTH</p>
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
                  Fairfax, VA 22031
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
                { heading: 'Six', caption: 'Regional Bureaus' },
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
