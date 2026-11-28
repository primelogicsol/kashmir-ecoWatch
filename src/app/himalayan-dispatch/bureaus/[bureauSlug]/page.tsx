import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicBureauDossier } from '@/lib/himalayan-dispatch-store';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import {
  BureauRouteSlug,
  FOOTER_BUREAU_LINKS,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import {
  JAMMU_FLAGSHIP_INVESTIGATIONS,
  JAMMU_FRONTIERS_ISSUE_IDENTITY,
} from '@/data/himalayan-dispatch-jammu-frontiers-monograph';
import {
  LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
  LADAKH_INVESTIGATIONS_3,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return REGIONAL_REPORTING_BUREAUS.map((b) => ({ bureauSlug: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bureauSlug: string }>;
}): Promise<Metadata> {
  const { bureauSlug } = await params;
  const dossier = getPublicBureauDossier(bureauSlug);
  if (!dossier) {
    return buildPageMetadata({
      title: 'Regional Bureau Not Found — Himalayan Dispatch',
      description: 'Requested regional reporting desk was not found.',
      canonicalPath: `/himalayan-dispatch/bureaus/${bureauSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${dossier.bureau.name} — Regional Reporting Desk | Himalayan Dispatch`,
    description: `${dossier.bureau.geographicScopeLabel}. ${dossier.bureau.editorialMandate}`,
    canonicalPath: HD_ROUTES.bureau(dossier.bureau.id as BureauRouteSlug),
  });
}

const KEW_REGIONAL_LINKS: Record<
  BureauRouteSlug,
  Array<{ label: string; href: string; note: string }>
> = {
  kashmir: [
    { label: 'Dal, Wular & Alpine Lakes Intelligence', href: '/water-systems/lakes', note: 'KEW Hydrological Baselines' },
    { label: 'Kashmir Valley Air & Inversion Monitoring', href: '/environmental-monitoring/air-pollution', note: 'District AQI & PM2.5' },
    { label: 'Dachigam & Wetland Protected Network', href: '/protected-network', note: 'Statutory Conservation Areas' },
  ],
  jammu: [
    { label: 'Landslide & Chenab Gorge Slope Intelligence', href: '/hazard-intelligence/landslides', note: 'Susceptibility & Corridors' },
    { label: 'Hydropower, Energy & Cascade Justice Observatory', href: '/earth-human-impact/hydropower-energy-justice-observatory', note: 'Cascade Impact Records' },
    { label: 'Wetlands, Lakes & Migratory Corridors', href: '/water-systems/wetlands', note: 'Surinsar–Mansar & Plains Marshes' },
    { label: 'Forest Fires & Pir Panjal Escarpment Watch', href: '/hazard-intelligence/forest-fires', note: 'Seasonal Burn Monitoring' },
  ],
  ladakh: [
    { label: 'Ladakh Cold-Desert Cryosphere & Carrying Capacity Observatory', href: '/earth-human-impact/ladakh-cold-desert-observatory', note: '12 Modules · 21 Experiments' },
    { label: 'Glaciers & Trans-Himalayan Cryosphere', href: '/water-systems/glaciers', note: 'Mass Balance & Snowline' },
    { label: 'Western Disturbances & Cold-Desert Extremes', href: '/hazard-intelligence/atmospheric-systems/western-disturbances', note: 'Atmospheric Tracking' },
    { label: 'High-Altitude Biodiversity & Rangelands', href: '/biodiversity', note: 'Trans-Himalayan Taxa' },
  ],
  ajk: [
    { label: 'Seismic & Syntaxis Earthquake Intelligence', href: '/hazard-intelligence/earthquakes', note: 'Fault Systems & Hazard' },
    { label: 'Rivers, Catchments & Watersheds', href: '/water-systems/watersheds', note: 'Transboundary Jhelum–Neelum' },
  ],
  gilgit: [
    { label: 'Glacial Lake Outburst Flood (GLOF) Watch', href: '/hazard-intelligence/glofs', note: 'Surging Karakoram Ice' },
    { label: 'Satellite Change Detection Observatory', href: '/earth-human-impact/change-detection-observatory', note: 'Multi-Temporal Optical/SAR' },
  ],
  baltistan: [
    { label: 'Cryosphere & Karakoram Icefields', href: '/water-systems/glaciers', note: 'Upper Indus Headwaters' },
    { label: 'Regional District & Subregion Profiles', href: '/districts', note: 'Geographic Scope & GIS' },
  ],
};

export default async function RegionalBureauIndependentPage({
  params,
}: {
  params: Promise<{ bureauSlug: string }>;
}) {
  const { bureauSlug } = await params;
  const dossier = getPublicBureauDossier(bureauSlug);
  if (!dossier) {
    notFound();
  }

  const {
    bureau,
    stories,
    dailyDispatches,
    forthcomingPreviews,
    bureauLeadership,
    correspondents,
    beats,
  } = dossier;

  const isEstablishing = bureau.operationalStatus === 'in_establishment';
  const kewLinks = KEW_REGIONAL_LINKS[bureau.id as BureauRouteSlug] || [];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Regional Bureaus', href: HD_ROUTES.bureausOverview },
            { label: bureau.name },
          ]}
        />

        {/* Bureau Header & Operational Disclosure */}
        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="hd-kicker">BUREAU {bureau.folioRoman}</span>
              <span style={{ color: 'var(--hd-stone)' }}>·</span>
              <span
                className="hd-font-sans px-2.5 py-0.5 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{
                  borderColor: isEstablishing ? 'var(--hd-rule-strong)' : 'var(--hd-copper)',
                  color: isEstablishing ? 'var(--hd-fg-muted)' : 'var(--hd-copper)',
                  backgroundColor: isEstablishing ? 'transparent' : 'var(--hd-copper-soft)',
                }}
              >
                {isEstablishing ? 'In Establishment' : 'Established Reporting Desk'}
              </span>
            </div>

            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.01]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {bureau.name}
            </h1>

            <p className="hd-font-display text-xl sm:text-2xl italic" style={{ color: 'var(--hd-copper)' }}>
              {bureau.geographicScopeLabel}
            </p>

            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {bureau.editorialMandate}
            </p>

            <div className="pt-2 space-y-1.5">
              <span className="hd-folio-meta inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                <span>GEOGRAPHICAL COVERAGE ({bureau.coveredUnits.length} DISTRICTS / VALLEYS)</span>
              </span>
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                {bureau.coveredUnits.join(' · ')}
              </p>
            </div>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">OPERATIONAL DISCLOSURE</span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {bureau.physicalOfficeDisclosure}
            </p>
            <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <Link
                href={HD_ROUTES.correspondentApplications}
                className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Apply as {bureau.name} Correspondent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href={HD_ROUTES.pitch} className="hd-folio-meta hover:underline">
                Commissioning &amp; Story Pitch Desk →
              </Link>
            </div>
          </aside>
        </header>

        {/* Jammu Division Scientific Investigations Flagship Thematic Issue Showcase */}
        {bureau.id === 'jammu' && (
          <section
            aria-label="Jammu's Ecological Frontiers — Scientific Investigations"
            className="border p-6 sm:p-10 space-y-8"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: '#171717',
              color: '#F2EFE7',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
              <span className="hd-font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                DEDICATED THEMATIC SCIENTIFIC ISSUE &nbsp;·&nbsp; {JAMMU_FRONTIERS_ISSUE_IDENTITY.volumeLabel}
              </span>
              <span className="hd-font-sans text-[10px] tracking-[0.18em] uppercase text-[#A39B8B]">
                3 INVESTIGATIONS · 45 PROPOSED CHAPTERS · 20 EXPERIMENTS · 1985–2026 BASELINE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.02] text-[#F2EFE7]">
                  {JAMMU_FRONTIERS_ISSUE_IDENTITY.title}
                </h2>
                <p className="hd-font-display text-xl sm:text-2xl italic text-[#D8C3A5]">
                  {JAMMU_FRONTIERS_ISSUE_IDENTITY.subtitle}
                </p>
                <p className="hd-font-body text-sm sm:text-base text-[#F2EFE7]/80 leading-relaxed max-w-3xl">
                  Following the scientific and editorial architecture of{' '}
                  <em>The Atmosphere Has No Borders</em>, these three interconnected investigations
                  establish a rigorous discovery-first framework across the Chenab hydroelectric
                  gorge, Jammu’s mined gravel-bed rivers, and the Ramsar and floodplain wetlands
                  sustaining the Jammu plains.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href={HD_ROUTES.monograph18}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                  style={{ backgroundColor: '#8C3125' }}
                >
                  <span>Open Thematic Issue &amp; 45 Chapters</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {JAMMU_FLAGSHIP_INVESTIGATIONS.map((inv) => (
                <div
                  key={inv.number}
                  className="p-5 border border-[#F2EFE7]/15 bg-[#1F2226] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="hd-font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5]">
                      INVESTIGATION {inv.number} · {inv.chapterCount} CHAPTERS · {inv.experimentCount} EXPERIMENTS
                    </span>
                    <Link
                      href={HD_ROUTES.issueArticle(
                        JAMMU_FRONTIERS_ISSUE_IDENTITY.editionSlug,
                        inv.storySlug
                      )}
                      className="block group"
                    >
                      <h3 className="hd-font-display text-2xl font-semibold text-[#F2EFE7] group-hover:underline">
                        {inv.title}
                      </h3>
                    </Link>
                    <p className="hd-font-body text-xs text-[#F2EFE7]/75 leading-relaxed">
                      {inv.centralScientificQuestion}
                    </p>
                  </div>
                  <Link
                    href={HD_ROUTES.issueArticle(
                      JAMMU_FRONTIERS_ISSUE_IDENTITY.editionSlug,
                      inv.storySlug
                    )}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D8C3A5] hover:underline"
                  >
                    <span>Read Investigation {inv.number}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <p className="hd-font-body text-xs italic text-[#A39B8B] border-t border-[#F2EFE7]/15 pt-4">
              Evidentiary Standard: Chapter counts, experiments, and the 41-year (1985–2026)
              historical baseline are proposed research targets; no original satellite processing,
              hydrological simulations, or field verification has yet been completed.
            </p>
          </section>
        )}

        {/* Ladakh Cold-Desert Scientific Investigations Flagship Thematic Issue Showcase */}
        {bureau.id === 'ladakh' && (
          <section
            aria-label="Ladakh's Ecological Frontiers — Cold-Desert Scientific Investigations"
            className="border p-6 sm:p-10 space-y-8"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: '#171717',
              color: '#F2EFE7',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
              <span className="hd-font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                DEDICATED THEMATIC SCIENTIFIC ISSUE &nbsp;·&nbsp; {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.volumeLabel}
              </span>
              <span className="hd-font-sans text-[10px] tracking-[0.18em] uppercase text-[#A39B8B]">
                3 INVESTIGATIONS · 45 RESEARCH CHAPTERS · 21 PROPOSED EXPERIMENTS · COLD-DESERT ECOLOGY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.02] text-[#F2EFE7]">
                  {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.title}
                </h2>
                <p className="hd-font-display text-xl sm:text-2xl italic text-[#D8C3A5]">
                  {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.subtitle}
                </p>
                <p className="hd-font-body text-sm sm:text-base text-[#F2EFE7]/80 leading-relaxed max-w-3xl">
                  {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.extendedSubtitle}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                <Link
                  href={HD_ROUTES.ladakhEcologicalFrontiers}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                  style={{ backgroundColor: '#8C3125' }}
                >
                  <span>Open Thematic Issue &amp; 45 Chapters</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={toKewPlatformUrl(LADAKH_ECOLOGICAL_FRONTIERS_SPEC.kewObservatoryPath)}
                  className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D8C3A5] hover:underline"
                >
                  <span>KEW Cold-Desert Observatory (12 Modules)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {LADAKH_INVESTIGATIONS_3.map((inv) => (
                <div
                  key={inv.id}
                  className="p-5 border border-[#F2EFE7]/15 bg-[#1F2226] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="hd-font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5]">
                      INVESTIGATION {inv.investigationNumber} · 15 CHAPTERS · {inv.proposedExperiments.length} EXPERIMENTS
                    </span>
                    <Link
                      href={HD_ROUTES.issueArticle(
                        LADAKH_ECOLOGICAL_FRONTIERS_SPEC.issueSlug,
                        inv.dispatchSlug
                      )}
                      className="block group"
                    >
                      <h3 className="hd-font-display text-2xl font-semibold text-[#F2EFE7] group-hover:underline">
                        {inv.title}
                      </h3>
                    </Link>
                    <p className="hd-font-body text-xs text-[#F2EFE7]/75 leading-relaxed">
                      {inv.centralHypothesis}
                    </p>
                  </div>
                  <Link
                    href={HD_ROUTES.issueArticle(
                      LADAKH_ECOLOGICAL_FRONTIERS_SPEC.issueSlug,
                      inv.dispatchSlug
                    )}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#D8C3A5] hover:underline"
                  >
                    <span>Read Investigation {inv.investigationNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <p className="hd-font-body text-xs italic text-[#A39B8B] border-t border-[#F2EFE7]/15 pt-4">
              Evidentiary Standard: All 21 proposed scientific experiments and 45 chapter protocols
              are structured research specifications grounded in cited 2025–2026 syntheses (~0.02°C/yr
              regional warming, 0.21–0.37 m w.e./yr glacier mass loss, 65 high-concern bird species,
              and Changthang permafrost soil microbial diversity); no unexecuted field instrumentation
              is represented as completed.
            </p>
          </section>
        )}

        {/* Main Content Grid: Dispatches & Features + Leadership & Beats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            {/* Latest Regional Daily Dispatches */}
            <section className="space-y-6">
              <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  Regional Daily Dispatches
                </h2>
                <Link href={HD_ROUTES.dailyDispatch} className="hd-kicker hover:underline">
                  Daily Dispatch Wire →
                </Link>
              </div>

              {dailyDispatches.length > 0 ? (
                <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {dailyDispatches.map((dd) => (
                    <article key={dd.id} className="py-6 space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                      <div className="flex items-center justify-between">
                        <span className="hd-kicker">{dd.dateline}</span>
                        <span className="hd-folio-meta">{dd.publishedAt}</span>
                      </div>
                      <Link href={HD_ROUTES.dailyDispatchArticle(dd.slug)} className="block group">
                        <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold group-hover:underline underline-offset-4" style={{ color: 'var(--hd-fg)' }}>
                          {dd.headline}
                        </h3>
                      </Link>
                      <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {dd.standfirst}
                      </p>
                      <span className="hd-folio-meta block">
                        BY {dd.bylineDisplay} · {dd.readingTimeMinutes} MIN READ
                      </span>
                    </article>
                  ))}
                </div>
              ) : (
                <div
                  className="p-6 border space-y-2"
                  style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
                >
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {isEstablishing
                      ? `${bureau.name} is currently in establishment as a distributed correspondent desk. No regional Daily Dispatch wires have been published under this bureau dateline yet; earth-observation scoping is coordinated via our Fairfax desk while correspondent applications remain open.`
                      : `Field dispatches from ${bureau.name} are currently in verification for upcoming release.`}
                  </p>
                  <Link href={HD_ROUTES.correspondentApplications} className="hd-kicker inline-block hover:underline">
                    Submit Correspondent Credentials →
                  </Link>
                </div>
              )}
            </section>

            {/* Monthly Magazine Features */}
            <section className="space-y-6">
              <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  Monthly Magazine Features
                </h2>
                <Link href={HD_ROUTES.currentIssue} className="hd-folio-meta hover:underline">
                  Current Edition →
                </Link>
              </div>

              {stories.length > 0 ? (
                <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {stories.map((st) => (
                    <article key={st.id} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center" style={{ borderColor: 'var(--hd-rule)' }}>
                      <Link href={resolveCanonicalStoryUrl(st)} className="sm:col-span-4 hd-plate-group block">
                        <div className="hd-plate-frame aspect-[16/10] w-full">
                          <img
                            src={st.heroImage}
                            alt={st.heroCaption}
                            className={`w-full h-full object-cover ${st.heroMonochrome ? 'grayscale contrast-125' : ''}`}
                          />
                        </div>
                      </Link>
                      <div className="sm:col-span-8 space-y-1.5">
                        <span className="hd-kicker">{st.departmentRubric}</span>
                        <Link href={resolveCanonicalStoryUrl(st)} className="block group">
                          <h3 className="hd-font-display text-2xl font-semibold group-hover:underline" style={{ color: 'var(--hd-fg)' }}>
                            {st.title}
                          </h3>
                        </Link>
                        <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {st.excerpt}
                        </p>
                        <span className="hd-folio-meta block">
                          BY {st.bylineDisplay} · {st.editionLabel}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="hd-font-body text-sm italic" style={{ color: 'var(--hd-fg-muted)' }}>
                  Longform magazine commissions specific to {bureau.name} are open for forthcoming editions via the{' '}
                  <Link href={HD_ROUTES.pitch} className="underline">
                    Commissioning &amp; Pitch Desk
                  </Link>
                  .
                </p>
              )}

              {forthcomingPreviews.length > 0 && (
                <div className="pt-4 space-y-3">
                  <p className="hd-kicker">APPROVED FORTHCOMING COMMISSIONS</p>
                  {forthcomingPreviews.map((fp) => (
                    <div key={fp.id} className="p-4 border flex items-center justify-between gap-4" style={{ borderColor: 'var(--hd-rule)' }}>
                      <div>
                        <h4 className="hd-font-display text-xl font-semibold">{fp.workingTitle}</h4>
                        <p className="hd-folio-meta">{fp.departmentLabel} · {fp.region}</p>
                      </div>
                      <span className="hd-folio-meta">{fp.publicStageLabel}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Regional Editorial Desk Contact Form */}
            <section className="pt-4">
              <EditorialInquiryFormClient
                category="bureau_correspondence"
                bureauId={bureau.id as BureauSlugId}
                kicker={`${bureau.name.toUpperCase()} CORRESPONDENCE`}
                heading={`Contact the ${bureau.name} Desk`}
                description="Send regional environmental research notes, public-record leads, or community event notices to our editorial desk. Do not transmit confidential whistleblower files via standard web forms."
                defaultSubject={`${bureau.name} — Field Note / Editorial Inquiry`}
                submitLabel={`Send to ${bureau.name}`}
              />
            </section>
          </div>

          {/* Right 4 Cols: Bureau Leadership, Correspondents, Beats & KEW Links */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="p-6 border space-y-4" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <div className="flex items-center justify-between gap-2">
                <p className="hd-kicker">BUREAU LEADERSHIP</p>
                <span className="hd-folio-meta text-[9px]">
                  {isEstablishing ? 'IN ESTABLISHMENT' : 'ESTABLISHED DESK'}
                </span>
              </div>
              <div className="overflow-x-auto border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                      <th className="py-2.5 pr-3 hd-kicker text-[10px]">Position</th>
                      <th className="py-2.5 pl-3 hd-kicker text-[10px]">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                    {bureauLeadership.map((pos) => (
                      <tr key={pos.id} className="align-top">
                        <td className="py-3 pr-3">
                          <span className="hd-font-body text-xs sm:text-sm font-semibold block" style={{ color: 'var(--hd-fg)' }}>
                            {pos.roleTitle}
                          </span>
                          <span className="hd-font-body text-[11px] block mt-0.5" style={{ color: 'var(--hd-fg-muted)' }}>
                            {pos.domainsRubric}
                          </span>
                        </td>
                        <td className="py-3 pl-3">
                          <span
                            className={`hd-font-display text-lg sm:text-xl font-semibold block ${
                              pos.isFilledPublicly ? '' : 'italic'
                            }`}
                            style={{
                              color: pos.isFilledPublicly ? 'var(--hd-fg)' : 'var(--hd-fg-muted)',
                            }}
                          >
                            {pos.displayHolderName}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <p className="hd-kicker">REGIONAL CORRESPONDENTS &amp; PORTFOLIOS</p>
              {correspondents.length > 0 ? (
                <ul className="divide-y border-t border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                  {correspondents.map((c) => (
                    <li key={c.slug} className="py-3.5" style={{ borderColor: 'var(--hd-rule)' }}>
                      <Link href={HD_ROUTES.journalistPortfolio(c.slug)} className="group block">
                        <span className="hd-font-display text-xl font-semibold group-hover:underline block">
                          {c.name}
                        </span>
                        <span className="hd-folio-meta block">{c.roleTitle} · {c.basedIn}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                  Correspondent seats for {bureau.name} are currently open for credentialed applications.
                </p>
              )}
              <Link href={HD_ROUTES.correspondentApplications} className="hd-kicker inline-block hover:underline">
                Apply for Correspondent Accreditation →
              </Link>
            </div>

            <div className="space-y-3">
              <p className="hd-kicker">PRIORITY REPORTING BEATS</p>
              <ul className="space-y-2.5">
                {beats.map((bt) => (
                  <li key={bt.slug}>
                    <Link
                      href={HD_ROUTES.reportingBeat(bt.slug)}
                      className="block p-3.5 border hover:opacity-85"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <span className="hd-kicker text-[9px] block">{bt.code}</span>
                      <span className="hd-font-display text-lg font-semibold block">{bt.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="hd-kicker">COMPANION KEW SCIENTIFIC INTELLIGENCE</p>
              <ul className="space-y-2.5">
                {kewLinks.map((kl) => (
                  <li key={kl.href} className="p-3.5 border" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                    <a href={toKewPlatformUrl(kl.href)} className="hd-font-body text-sm font-medium inline-flex items-center gap-1 hover:underline">
                      <span>{kl.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                    </a>
                    <span className="hd-folio-meta block mt-0.5">{kl.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-folio-meta">OTHER WESTERN HIMALAYAN BUREAUS</p>
              <div className="flex flex-col gap-1.5">
                {FOOTER_BUREAU_LINKS.map((bl) => (
                  <Link
                    key={bl.id}
                    href={bl.href}
                    className="hd-font-body text-sm flex items-center justify-between hover:underline"
                    style={{ color: bl.id === bureau.id ? 'var(--hd-copper)' : 'var(--hd-fg-muted)' }}
                  >
                    <span>{bl.label}</span>
                    {bl.establishing && <span className="hd-folio-meta text-[9px]">EST.</span>}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

type BureauSlugId = BureauRouteSlug;
