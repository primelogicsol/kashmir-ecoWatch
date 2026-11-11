'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SCIENTIFIC_REPORTS } from '@/data/sectoral-eia';
import { 
  FileText, 
  Download, 
  Calendar, 
  Award, 
  ExternalLink, 
  ArrowRight,
  Filter,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { SectorType } from '@/types/sectoral-eia';

export default function ScientificReportsPage() {
  const [sectorFilter, setSectorFilter] = useState<SectorType | 'all'>('all');

  const filteredReports = sectorFilter === 'all'
    ? SCIENTIFIC_REPORTS
    : SCIENTIFIC_REPORTS.filter(r => r.sector === sectorFilter);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Process 09 • Scientific Publications"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Reports' }
        ]}
        icon={<FileText className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Verified Scientific Assessment Reports
          </span>
        }
        subtitle="Peer-reviewed sectoral impact dossiers, technical monographs, and strategic environmental guidance publications produced under the SEIAE framework."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-6xl">
        {/* SCIENTIFIC PUBLICATION INTEGRITY BANNER */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-950 border border-teal-500/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-teal-400 text-teal-300 bg-teal-500/10 text-xs">
              Process 09
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Scientific Review & Open Publication
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Peer-Reviewed Open Access Intelligence
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            Every report published by the Sectoral EIA Engine represents months of empirical sensor tracking, satellite bathymetry analysis, and independent panel verification. All publications are licensed under open non-commercial scientific commons for researchers, policymakers, and civic guardians.
          </p>
        </div>

        {/* SECTOR FILTER */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-xl bg-slate-900 border border-white/10 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Filter by Sector:</span>
            {(['all', 'tourism', 'horticulture', 'handicrafts', 'agriculture'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSectorFilter(s)}
                className={`px-3 py-1 rounded-md capitalize font-medium transition-all ${
                  sectorFilter === s
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            Showing {filteredReports.length} Reports
          </span>
        </div>

        {/* REPORTS CATALOG */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-6 bg-slate-900/90 border-white/10 flex flex-col md:flex-row justify-between gap-6 hover:border-emerald-500/40 transition-all">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-xs">
                    {report.code}
                  </span>
                  <Badge variant="outline" className="border-white/15 text-slate-300 capitalize text-xs">
                    {report.sector}
                  </Badge>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {report.date}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{report.pages} Pages</span>
                </div>

                <h3 className="text-lg font-bold text-white hover:text-emerald-300 transition-colors">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {report.abstract}
                </p>

                <div className="text-[11px] text-slate-400 pt-1">
                  <span className="font-semibold text-slate-300">Lead Investigator / Working Group: </span>
                  {report.author}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <Button
                  onClick={() => alert(`Downloading ${report.code} Dossier...`)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download Report (PDF)
                </Button>
                <Link
                  href={`/sectoral-eia`}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore Telemetry Data</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
