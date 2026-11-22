'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  ShieldCheck,
  Trees,
  Sprout,
  Gavel,
  CheckCircle2,
  Activity,
  Layers,
  Award
} from 'lucide-react';

export default function ChinarConservationPage() {
  const protectionMeasures = [
    {
      title: 'J&K Preservation of Specific Trees Act 1969',
      scope: 'Statutory Legal Framework',
      description: 'Chinar is notified as a Royal Protected Tree (Specific Tree). Felling, pruning, or lopping without prior written authorization from the Divisional Commissioner is a non-bailable offense carrying heavy financial penalties and imprisonment.',
      enforcementAuthority: 'Divisional Commissioner Kashmir & J&K Forest Department'
    },
    {
      title: 'Arboricultural Tree Surgery Protocols',
      scope: 'Cavity Treatment & Remediation',
      description: 'Advanced arboricultural surgery for senescent trees: removal of rotten heartwood, chemical sterilization with copper sulphate, application of water-repellent sealant, and installation of flexible cobra cable bracing for split scaffold limbs.',
      enforcementAuthority: 'JKFRI & SKUAST-Kashmir Faculty of Forestry'
    },
    {
      title: 'Clonal & Tissue Culture Nurseries',
      scope: 'Propagation & Gene Conservation',
      description: 'Establishment of certified Chinar vegetative propagation nurseries at Harwan, Cheshmashahi, and Bijbehara producing over 45,000 elite rootstock saplings annually with 82% post-planting survival rates.',
      enforcementAuthority: 'J&K Forest Department (Research Circle)'
    },
    {
      title: 'Root Collar De-Concreting Mandate',
      scope: 'Urban Civil Regulation',
      description: 'Government orders mandating a mandatory minimum unpaved circular buffer of 2.0-meter diameter around all street and garden Chinar trees to prevent root rot and ensure soil water infiltration.',
      enforcementAuthority: 'Srinagar Municipal Corporation & Housing & Urban Dev Dept'
    }
  ];

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
          { label: 'Protection, Restoration & Clonal Nurseries' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                RESTORATION
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Protection, Restoration & Clonal Nurseries
            </span>
          </>
        }
        subtitle="Statutory tree preservation acts, surgical cavity filling and crown stabilization, vegetative propagation protocols, and elite clonal germplasm restoration banks."
        icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/heritage"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Heritage Chinars</span>
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
        {/* Conservation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protectionMeasures.map((measure) => (
            <Card key={measure.title} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {measure.scope}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{measure.title}</h3>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                {measure.description}
              </p>

              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <span className="text-slate-500 font-medium">Authority:</span> {measure.enforcementAuthority}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
