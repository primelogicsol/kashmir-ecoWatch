'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Map, MapPin } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { InvestigationAtlasMap } from '@/components/environmental-investigations/InvestigationAtlasMap';
import { InvestigationStatusBadge } from '@/components/environmental-investigations/EiaiBadges';
import { CANONICAL_INVESTIGATIONS } from '@/data/environmental-investigations';
import { InvestigationRecord } from '@/types/environmental-investigations';

export default function InvestigationAtlasPage() {
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [highlightCode, setHighlightCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch('/api/environmental-investigations')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.investigations)) {
          setRecords(d.investigations);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI SPATIAL CARTOGRAPHY & WATERSHED CONNECTIVITY"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Investigation Atlas' },
        ]}
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Spatial Investigation Atlas
            </span>
          </div>
        }
        subtitle="Interactive geospatial mapping of published, active, scoping, and proposed environmental investigations across Western Himalayan watersheds, tablelands, wetlands, and glacial troughs."
        images={['/images/protected-network/protected-area-atlas-gis.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-8">
        <InvestigationAtlasMap
          investigations={records}
          highlightCode={highlightCode}
          className="h-[580px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {records.map((inv) => (
            <Card
              key={inv.code}
              padding="sm"
              onClick={() => setHighlightCode(inv.code)}
              className={
                highlightCode === inv.code
                  ? 'border-emerald-500 shadow-lg'
                  : ''
              }
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-emerald-400">{inv.code}</span>
                <InvestigationStatusBadge status={inv.status} />
              </div>
              <h3 className="text-sm font-bold text-white leading-snug mb-1">
                {inv.shortTitle}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{inv.districts.join(', ')}</span>
              </p>
              <div className="text-[11px] font-mono text-slate-400 mb-3">
                {inv.coordinates[0].toFixed(3)}°N, {inv.coordinates[1].toFixed(3)}°E • {inv.elevationRangeM}
              </div>
              <Link
                href={`/environmental-investigations/reports/${inv.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>Open Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
