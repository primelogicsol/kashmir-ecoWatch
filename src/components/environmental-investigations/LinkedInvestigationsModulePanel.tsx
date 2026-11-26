'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Database, Map, Scale, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InvestigationStatusBadge } from '@/components/environmental-investigations/EiaiBadges';
import { CANONICAL_INVESTIGATIONS } from '@/data/environmental-investigations';
import { InvestigationSeriesId } from '@/types/environmental-investigations';

interface LinkedInvestigationsModulePanelProps {
  title: string;
  subtitle: string;
  seriesIds?: InvestigationSeriesId[];
  routeMatch?: string;
  investigationCodes?: string[];
  className?: string;
}

export function LinkedInvestigationsModulePanel({
  title,
  subtitle,
  seriesIds,
  routeMatch,
  investigationCodes,
  className = '',
}: LinkedInvestigationsModulePanelProps) {
  const matched = useMemo(() => {
    const codeSet = investigationCodes ? new Set(investigationCodes) : null;
    const seriesSet = seriesIds ? new Set(seriesIds) : null;

    return CANONICAL_INVESTIGATIONS.filter((inv) => {
      if (codeSet && codeSet.has(inv.code)) return true;
      if (seriesSet && inv.seriesId && seriesSet.has(inv.seriesId)) return true;
      if (routeMatch && inv.linkedKewModules.some((m) => m.route.includes(routeMatch))) {
        return true;
      }
      return false;
    });
  }, [seriesIds, routeMatch, investigationCodes]);

  if (matched.length === 0) return null;

  return (
    <section className={className} aria-label={title}>
      <Card className="border-emerald-500/30 bg-slate-900/90 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Scale className="w-3.5 h-3.5" />
              <span>KEW-EIAI · Linked Scientific Investigations ({matched.length})</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
            <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 text-xs">
            <Link
              href="/environmental-investigations/evidence"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-950 border border-white/15 text-slate-200 hover:border-emerald-500/40 hover:text-white"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence Registry</span>
            </Link>
            <Link
              href="/environmental-investigations/atlas"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-950 border border-white/15 text-slate-200 hover:border-emerald-500/40 hover:text-white"
            >
              <Map className="w-3.5 h-3.5 text-cyan-400" />
              <span>Investigation Atlas</span>
            </Link>
            <Link
              href="/environmental-investigations/accountability"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Accountability Matrix</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matched.map((inv) => (
            <Link
              key={inv.code}
              href={`/environmental-investigations/reports/${inv.slug}`}
              className="group rounded-lg border border-white/10 bg-slate-950/85 hover:border-emerald-500/45 p-4 flex flex-col justify-between gap-3 transition-all"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="font-mono text-[11px] font-bold text-emerald-300">
                    {inv.code} · {inv.temporalScope}
                  </span>
                  <div className="flex items-center gap-1">
                    {inv.priority && (
                      <Badge
                        variant={inv.priority === 'Critical' ? 'danger' : 'warning'}
                        size="sm"
                        className="text-[10px]"
                      >
                        {inv.priority}
                      </Badge>
                    )}
                    <InvestigationStatusBadge status={inv.status} />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {inv.shortTitle}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {inv.centralScientificQuestion || inv.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>
                  {inv.disciplineIds.length} Disciplines · {inv.evidenceMatrix.length} Claims
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-sans font-semibold">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
