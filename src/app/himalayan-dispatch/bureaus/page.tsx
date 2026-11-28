import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { REGIONAL_REPORTING_JURISDICTIONS } from '@/data/himalayan-dispatch-masthead-roster';
import { getPublicMastheadPositions } from '@/lib/himalayan-dispatch-store';
import { BureauRouteSlug, HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LegacyFragmentRedirector } from '@/components/himalayan-dispatch/LegacyFragmentRedirector';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Regional Reporting Bureaus — Western Himalayan Network | Himalayan Dispatch',
  description:
    'Directory of the six Western Himalayan distributed reporting desks of Himalayan Dispatch: Kashmir, Jammu, Ladakh, AJ&K, Gilgit, and Baltistan.',
  canonicalPath: '/himalayan-dispatch/bureaus',
});

const VALID_BUREAUS = new Set<string>(['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan']);

export default async function HimalayanDispatchBureausDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ bureau?: string }>;
}) {
  const sp = await searchParams;
  if (sp?.bureau && VALID_BUREAUS.has(sp.bureau.toLowerCase())) {
    permanentRedirect(HD_ROUTES.bureau(sp.bureau.toLowerCase() as BureauRouteSlug));
  }

  const regionalLeadership = getPublicMastheadPositions().filter(
    (pos) => pos.sectionId === 'IV_bureaus'
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <LegacyFragmentRedirector />
      <div className="max-w-[1440px] mx-auto space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Regional Bureaus' }]} />

        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SIX DISTRIBUTED REPORTING DESKS</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Regional Reporting Bureaus
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Himalayan Dispatch organizes its mountain coverage across six dedicated regional
              bureaus—Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit, and Baltistan—each with its own
              permanent regional desk page, beat priorities, and correspondent network.
            </p>
          </div>

          <aside
            className="lg:col-span-5 p-6 sm:p-8 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">OPERATIONAL READINESS STANDARD</span>
            </div>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Kashmir, Jammu, and Ladakh operate as established distributed reporting desks; AJ&amp;K,
              Gilgit, and Baltistan are distributed reporting desks currently in establishment. No
              physical regional street offices are represented; publishing headquarters reside in{' '}
              <strong>Fairfax, Virginia, USA</strong>.
            </p>
            <div className="pt-1 flex flex-wrap gap-5">
              <Link href={HD_ROUTES.correspondentApplications} className="hd-kicker hover:underline">
                Correspondent Applications →
              </Link>
              <Link href={HD_ROUTES.reportingBeats} className="hd-folio-meta hover:underline">
                Reporting Beats →
              </Link>
            </div>
          </aside>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          {REGIONAL_REPORTING_BUREAUS.map((b) => {
            const isEst = b.operationalStatus === 'in_establishment';
            const href = HD_ROUTES.bureau(b.id);
            return (
              <article
                key={b.id}
                className="p-7 sm:p-9 border-r border-b flex flex-col justify-between space-y-6"
                style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="hd-kicker">BUREAU {b.folioRoman}</span>
                    <span
                      className="hd-font-sans px-2 py-0.5 border text-[9px] font-semibold tracking-[0.15em] uppercase"
                      style={{
                        borderColor: isEst ? 'var(--hd-rule-strong)' : 'var(--hd-copper)',
                        color: isEst ? 'var(--hd-fg-muted)' : 'var(--hd-copper)',
                      }}
                    >
                      {isEst ? 'In Establishment' : 'Established Desk'}
                    </span>
                  </div>

                  <Link href={href} className="block group">
                    <h2
                      className="hd-font-display text-3xl sm:text-4xl font-semibold group-hover:underline underline-offset-4"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {b.name}
                    </h2>
                  </Link>

                  <p className="hd-font-display text-base italic" style={{ color: 'var(--hd-copper)' }}>
                    {b.geographicScopeLabel}
                  </p>

                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {b.editorialMandate}
                  </p>
                </div>

                <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-folio-meta inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" style={{ color: 'var(--hd-copper)' }} />
                    <span>{b.coveredUnits.length} COVERED DISTRICTS &amp; SUB-BASINS</span>
                  </p>
                  <div>
                    <Link
                      href={href}
                      className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>Enter {b.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Synchronized Division IV Masthead Roster & Regional Jurisdictions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <p className="hd-kicker">DIVISION IV · SYNCHRONIZED MASTHEAD ROSTER</p>
              <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Regional Correspondence &amp; Bureau Leadership
              </h2>
            </div>
            <div className="overflow-x-auto border" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="border-b"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <th className="py-3.5 px-5 hd-kicker text-[10px] w-1/2">Position</th>
                    <th className="py-3.5 px-5 hd-kicker text-[10px] w-1/2">Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {regionalLeadership.map((pos) => (
                    <tr key={pos.id} className="align-top">
                      <td className="py-3.5 px-5">
                        <span className="hd-font-body text-sm font-semibold block" style={{ color: 'var(--hd-fg)' }}>
                          {pos.roleTitle}
                        </span>
                        <span className="hd-font-body text-xs block mt-0.5" style={{ color: 'var(--hd-fg-muted)' }}>
                          {pos.domainsRubric}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`hd-font-display text-xl font-semibold block ${
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

          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1">
              <p className="hd-kicker">GEOGRAPHIC JURISDICTION MATRIX</p>
              <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Regional Reporting Jurisdictions
              </h2>
            </div>
            <div className="overflow-x-auto border" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="border-b"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <th className="py-3.5 px-5 hd-kicker text-[10px] w-2/5">Bureau</th>
                    <th className="py-3.5 px-5 hd-kicker text-[10px] w-3/5">Geographic Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {REGIONAL_REPORTING_JURISDICTIONS.map((jur) => (
                    <tr key={jur.bureauId} className="align-top">
                      <td className="py-3.5 px-5">
                        <Link
                          href={HD_ROUTES.bureau(jur.bureauId)}
                          className="hd-font-body text-sm font-semibold hover:underline block"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {jur.bureau}
                        </Link>
                        <span className="hd-folio-meta text-[9px] block mt-0.5">
                          {jur.inEstablishment
                            ? 'IN ESTABLISHMENT'
                            : 'ESTABLISHED REPORTING DESK'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {jur.geographicalCoverage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
