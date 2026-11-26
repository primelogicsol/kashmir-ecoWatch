'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Archive, ArrowRight, Rss, Search, ShieldCheck } from 'lucide-react';
import { DailyDispatchArticle, EditorialDepartment } from '@/types/himalayan-dispatch';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { EditorialBreadcrumbs } from './EditorialBreadcrumbs';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export function DailyDispatchClient({
  dailyDispatches,
  departments,
}: {
  dailyDispatches: DailyDispatchArticle[];
  departments: EditorialDepartment[];
}) {
  const [selectedBureau, setSelectedBureau] = useState<string>('ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dailyDispatches.filter((art) => {
      if (selectedDept !== 'ALL' && art.departmentId !== selectedDept) return false;
      if (selectedBureau !== 'ALL' && art.bureauId !== selectedBureau) return false;
      if (q) {
        const hay = `${art.headline} ${art.standfirst} ${art.bureauLabel} ${art.beatTitle} ${art.bylineDisplay}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [dailyDispatches, selectedDept, selectedBureau, query]);

  const leadItem = filtered[0];
  const restItems = filtered.slice(1);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Daily Dispatch' }]} />

        {/* Stream 01 Broadsheet Masthead Banner */}
        <header className="space-y-6 pb-10 border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="hd-kicker">STREAM 01 &nbsp;·&nbsp; THE ENVIRONMENTAL NEWSROOM</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href={HD_ROUTES.dailyDispatchArchive}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Chronological Archive</span>
              </Link>
              <a
                href={HD_ROUTES.feedXml}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-copper)' }}
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS Feed</span>
              </a>
              <Link
                href={HD_ROUTES.currentIssue}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.18em] uppercase hover:opacity-80"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <span>Stream 02: The Current Issue</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1
                className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98]"
                style={{ color: 'var(--hd-fg)' }}
              >
                The Daily Dispatch
              </h1>
              <p
                className="hd-font-body text-lg sm:text-xl leading-relaxed max-w-3xl"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Continuously researched, source-verified environmental reporting, scientific discoveries,
                hydrological and cryospheric developments, and regulatory updates across the six Western
                Himalayan reporting bureaus—contextualized through Kashmir EcoWatch scientific baselines.
              </p>
            </div>

            <div
              className="lg:col-span-4 p-5 border space-y-2"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-font-sans text-[10px] font-semibold tracking-[0.18em] uppercase">
                  Editorial Publication Governance
                </span>
              </div>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                Every Daily Dispatch undergoes primary-source corroboration, empirical baseline
                verification against Kashmir EcoWatch observatories, and senior editorial sign-off
                prior to publication.
              </p>
            </div>
          </div>

          {/* Editorial Filter Ledger */}
          <div
            className="pt-6 border-t flex flex-col xl:flex-row xl:items-center justify-between gap-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedBureau('ALL')}
                className="hd-font-sans px-3 py-1.5 border text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer transition-colors"
                style={{
                  borderColor: selectedBureau === 'ALL' ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor:
                    selectedBureau === 'ALL' ? 'var(--hd-copper-solid)' : 'transparent',
                  color: selectedBureau === 'ALL' ? '#F2EFE7' : 'var(--hd-fg)',
                }}
              >
                All Bureaus
              </button>
              {REGIONAL_REPORTING_BUREAUS.map((b) => {
                const labelShort = b.name.replace(/\s+Bureau$/i, '');
                const active = selectedBureau === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBureau(active ? 'ALL' : b.id)}
                    className="hd-font-sans px-3 py-1.5 border text-[10px] font-medium tracking-[0.16em] uppercase cursor-pointer transition-colors"
                    style={{
                      borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                      backgroundColor: active ? 'var(--hd-copper-solid)' : 'transparent',
                      color: active ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                    }}
                  >
                    {labelShort}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                aria-label="Filter by Editorial Department"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="hd-font-sans px-3 py-1.5 border text-[11px] tracking-[0.12em] uppercase"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                <option value="ALL">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <div className="relative">
                <Search
                  className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--hd-fg-muted)' }}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dispatches..."
                  aria-label="Search Daily Dispatch articles"
                  className="hd-font-body pl-9 pr-3 py-1.5 border text-sm w-56"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                    color: 'var(--hd-fg)',
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Lead Dispatch Asymmetric Spread */}
        {leadItem ? (
          <section
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="lg:col-span-7">
              <Link
                href={HD_ROUTES.dailyDispatchArticle(leadItem.slug)}
                className="hd-plate-group block"
              >
                <div className="hd-plate-frame aspect-[16/10] w-full overflow-hidden bg-[#171717]">
                  <img
                    src={leadItem.heroImage}
                    alt={leadItem.heroCaption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <p className="hd-font-body text-xs italic mt-2.5" style={{ color: 'var(--hd-fg-muted)' }}>
                {leadItem.heroCaption} — {leadItem.heroCredit}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="hd-kicker">{leadItem.departmentLabel}</span>
                <span className="hd-folio-meta">· {leadItem.publishedAt}</span>
              </div>

              <p className="hd-folio-meta">{leadItem.dateline}</p>

              <Link
                href={HD_ROUTES.dailyDispatchArticle(leadItem.slug)}
                className="block group"
              >
                <h2
                  className="hd-font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-[1.06] group-hover:underline underline-offset-4"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {leadItem.headline}
                </h2>
              </Link>

              <p
                className="hd-font-body text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {leadItem.standfirst}
              </p>

              <div className="pt-2 space-y-1">
                <p
                  className="hd-font-sans text-[11px] font-semibold tracking-[0.15em] uppercase"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  By {leadItem.bylineDisplay}
                </p>
                <p className="hd-folio-meta">
                  {leadItem.bureauLabel} &nbsp;·&nbsp; {leadItem.readingTimeMinutes} MIN READ
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={HD_ROUTES.dailyDispatchArticle(leadItem.slug)}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  <span>Read Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {leadItem.relatedKewModule && (
                  <a
                    href={toKewPlatformUrl(leadItem.relatedKewModule.href)}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase hover:underline"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>KEW Baseline: {leadItem.relatedKewModule.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </section>
        ) : (
          <div className="py-16 text-center border" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-font-display text-2xl" style={{ color: 'var(--hd-fg)' }}>
              No dispatches match the selected filter criteria.
            </p>
          </div>
        )}

        {/* Chronological Broadsheet Stream */}
        {restItems.length > 0 && (
          <section className="space-y-8">
            <div
              className="flex items-baseline justify-between pb-3 border-b"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              <h2 className="hd-kicker">CHRONOLOGICAL DISPATCH LEDGER</h2>
              <span className="hd-folio-meta">{filtered.length} APPROVED DISPATCHES</span>
            </div>

            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {restItems.map((art) => (
                <article
                  key={art.id}
                  className="py-8 first:pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="md:col-span-3 space-y-1.5">
                    <span className="hd-kicker block">{art.departmentLabel}</span>
                    <p className="hd-folio-meta">{art.publishedAt}</p>
                    <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                      {art.bureauLabel}
                    </p>
                    {art.relatedKewModule && (
                      <a
                        href={toKewPlatformUrl(art.relatedKewModule.href)}
                        className="hd-font-sans inline-flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase pt-1 hover:underline"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        <span>{art.relatedKewModule.label}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  <div className="md:col-span-6 space-y-2.5">
                    <p className="hd-folio-meta">{art.dateline}</p>
                    <Link
                      href={HD_ROUTES.dailyDispatchArticle(art.slug)}
                      className="block group"
                    >
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {art.headline}
                      </h3>
                    </Link>
                    <p
                      className="hd-font-body text-base leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {art.standfirst}
                    </p>
                    <p className="hd-folio-meta pt-1">
                      BY {art.bylineDisplay.toUpperCase()} &nbsp;·&nbsp; {art.readingTimeMinutes} MIN READ
                    </p>
                  </div>

                  <div className="md:col-span-3">
                    <Link
                      href={HD_ROUTES.dailyDispatchArticle(art.slug)}
                      className="block overflow-hidden aspect-[16/10] bg-[#171717]"
                    >
                      <img
                        src={art.heroImage}
                        alt={art.heroCaption}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
