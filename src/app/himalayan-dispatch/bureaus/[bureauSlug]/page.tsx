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
    { label: 'Energy, Tunnels & Hydropower Observatory', href: '/earth-human-impact/energy-infrastructure', note: 'Cascade Impact Records' },
    { label: 'Forest Fires & Pir Panjal Escarpment Watch', href: '/hazard-intelligence/forest-fires', note: 'Seasonal Burn Monitoring' },
  ],
  ladakh: [
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
              <p className="hd-kicker">VERIFIED BUREAU LEADERSHIP</p>
              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {bureauLeadership.map((pos) => (
                  <div key={pos.id} className="py-3 first:pt-0 last:pb-0 space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-folio-meta block">{pos.roleTitle}</span>
                    <span className="hd-font-display text-2xl font-semibold italic block" style={{ color: 'var(--hd-fg)' }}>
                      {pos.displayHolderName}
                    </span>
                    <span className="hd-font-body text-xs block" style={{ color: 'var(--hd-fg-muted)' }}>
                      {pos.domainsRubric}
                    </span>
                  </div>
                ))}
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
