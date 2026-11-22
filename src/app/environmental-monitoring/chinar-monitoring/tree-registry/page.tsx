'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { INDIVIDUAL_CHINAR_REGISTRY, IndividualChinarRecord } from '@/data/chinar-monitoring';
import {
  Trees,
  QrCode,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Ruler,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function ChinarTreeRegistryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [healthFilter, setHealthFilter] = useState('ALL');

  const filteredTrees = INDIVIDUAL_CHINAR_REGISTRY.filter((tree) => {
    if (healthFilter !== 'ALL' && tree.healthStatus !== healthFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tree.commonName.toLowerCase().includes(q) ||
        tree.treeAadhaarId.toLowerCase().includes(q) ||
        tree.villageOrSite.toLowerCase().includes(q) ||
        tree.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="01 · MONITORING & GIS INTELLIGENCE"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Individual Chinar Registry & Tree Aadhaar' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                AADHAAR REGISTRY
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Individual Chinar Registry & Tree Aadhaar
            </span>
          </>
        }
        subtitle="Digital inventory cataloging audited individual Chinar trees, unique QR identification plates, GPS coordinates, physical measurements, and custodial jurisdictions."
        icon={<QrCode className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>GIS Atlas</span>
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
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-emerald-400" />
            <input
              type="text"
              placeholder="Search by Tree ID, site name, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Health Status:</span>
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Health Tiers</option>
              <option value="VIGOROUS">Vigorous</option>
              <option value="MODERATE_STRESS">Moderate Stress</option>
              <option value="CANOPY_DIEBACK">Canopy Dieback</option>
              <option value="TRUNK_HOLLOW_DECAY">Trunk Hollow Decay</option>
            </select>
          </div>
        </div>

        {/* Tree Cards Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrees.map((tree) => (
              <Card key={tree.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {tree.treeAadhaarId}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 border border-white/10">
                        {tree.verificationTier}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{tree.commonName}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{tree.villageOrSite}, {tree.district}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border ${
                    tree.healthStatus === 'VIGOROUS'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {tree.healthStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Girth (GBH):</span>
                    <span className="font-mono font-bold text-white">{tree.girthAtBreastHeightM} m</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Estimated Age:</span>
                    <span className="font-mono font-bold text-amber-300">~{tree.estimatedAgeYears} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Height / Crown:</span>
                    <span className="font-mono text-slate-300">{tree.heightMeters}m / {tree.crownSpreadMeters}m</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Coordinates:</span>
                    <span className="font-mono text-emerald-400">{tree.coordinates[0]}°N, {tree.coordinates[1]}°E</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300">
                  <span className="text-slate-500 font-medium">History:</span> {tree.heritageSignificance}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>QR Aadhaar: <strong className="text-emerald-400">{tree.qrCodeInstalled ? 'Active' : 'Unmounted'}</strong></span>
                  <span>Surveyed: {tree.lastSurveyDate}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
