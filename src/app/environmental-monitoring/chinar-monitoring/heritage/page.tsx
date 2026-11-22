'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { HERITAGE_CHINAR_GROVES,
  HeritageChinarGrove } from '@/data/chinar-monitoring';
import {
  Landmark,
  Compass,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Trees
} from 'lucide-react';

export default function ChinarHeritagePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="03 · CONSERVATION & HERITAGE PROTECTION"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Heritage Chinars & Mughal Groves' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                HERITAGE GROVES
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Heritage Chinars & Mughal Groves
            </span>
          </>
        }
        subtitle="Documenting centuries-old monumental trees, historical Mughal gardens (Naseem Bagh, Shalimar, Nishat, Char Chinar), Sufi shrine groves, and living biocultural landmarks."
        icon={<Landmark className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>View on GIS Map</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Documented Groves</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {HERITAGE_CHINAR_GROVES.length} Sanctuaries
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Imperial &amp; Sufi sites</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Oldest Tree Verified</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">~720 Yrs</div>
            <span className="text-[10px] text-slate-400 font-mono">Chattergam Colossus</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Largest Living Grove</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">712 Trees</div>
            <span className="text-[10px] text-slate-400 font-mono">Naseem Bagh (Akbar 1586)</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Statutory Status</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 mt-1">Protected</div>
            <span className="text-[10px] text-slate-400 font-mono">Act 1969 &amp; Heritage acts</span>
          </div>
        </div>

        {/* Heritage Groves Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HERITAGE_CHINAR_GROVES.map((grove) => (
              <Card key={grove.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {grove.historicalEra}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{grove.name}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{grove.location} ({grove.district})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-black text-amber-400">
                      {grove.treeCount} Trees
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">~{grove.oldestTreeEstimatedAge} yrs max age</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                  {grove.description}
                </p>

                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Planter / Founder:</span>
                    <span className="text-slate-300">{grove.founderOrPlanter}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Conservation State:</span>
                    <span className="font-mono text-emerald-400">{grove.conservationCondition}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                  Statute: {grove.protectionStatute}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
