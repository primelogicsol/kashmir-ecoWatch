'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { INDIVIDUAL_CHINAR_REGISTRY } from '@/data/chinar-monitoring';
import {
  Trees,
  Activity,
  AlertTriangle,
  Bug,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Microscope,
  Info
} from 'lucide-react';

export default function ChinarTreeHealthPage() {
  const pathologyCatalog = [
    {
      diseaseName: 'Anthracnose (Gnomonia veneta / Discula platani)',
      type: 'Fungal Foliar & Twig Blight',
      affectedOrgans: 'Young expanding leaves, buds, shoots',
      symptoms: 'Brown necrotic lesions along veins, distorted leaves, premature spring defoliation',
      severityInValley: 'High in wet springs (April-May); recorded in ~32% of urban street trees',
      recommendedRemediation: 'Removal and incineration of fallen leaves; copper fungicide spray during bud swell'
    },
    {
      diseaseName: 'Sycamore Lace Bug (Corythucha ciliata)',
      type: 'Insect Pest (Tingidae)',
      affectedOrgans: 'Underside of mature leaves',
      symptoms: 'Chlorotic stippling, bronzing, premature summer leaf drop, black tar-like frass spots',
      severityInValley: 'Moderate to severe in dry July-August periods; especially on paved roadsides',
      recommendedRemediation: 'High-pressure water washing of lower foliage; entomopathogenic fungal bio-pesticides'
    },
    {
      diseaseName: 'Trunk Heart Rot (Inonotus hispidus / Fomes spp.)',
      type: 'Basidiomycete Wood Decay',
      affectedOrgans: 'Heartwood of trunk and major scaffold limbs',
      symptoms: 'Large spongy hoof-shaped conks, internal hollow cavities, sudden limb shearing under snow',
      severityInValley: 'Present in ~18% of trees over 200 years old, particularly those with pruning/axe wounds',
      recommendedRemediation: 'Cavity cleaning, fungicidal sealing, cobra cable bracing of heavy split-risk branches'
    },
    {
      diseaseName: 'Powdery Mildew (Phyllactinia guttata)',
      type: 'Ascomycete Foliar Infection',
      affectedOrgans: 'Upper and lower leaf epidermis',
      symptoms: 'White powdery fungal coating on foliage in late summer, reduced photosynthetic capacity',
      severityInValley: 'Common in September-October; low lethality but accelerates premature senescence',
      recommendedRemediation: 'Wettable sulfur sprays; maintain sub-canopy airflow by de-crowding shrubs'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="02 · ECOLOGICAL & SCIENTIFIC MONITORING"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Chinar Tree Health, Canopy Condition & Pathology' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PATHOLOGY
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-300 bg-clip-text text-transparent">
              Chinar Tree Health, Canopy Condition & Pathology
            </span>
          </>
        }
        subtitle="Arboricultural health index scoring, wood rot fungi (Inonotus hispidus / Ganoderma) detections, leaf anthracnose surveillance, and structural hollow hazard assessments."
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/climate-stress"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Climate Stress</span>
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
        {/* Metric Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Basin Healthy Crown</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">65.2%</div>
            <span className="text-[10px] text-slate-400 font-mono">Vigorous foliage density</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Anthracnose Incidence</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">32.4%</div>
            <span className="text-[10px] text-slate-400 font-mono">In urban street trees</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Severe Trunk Cavity</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">12.0%</div>
            <span className="text-[10px] text-slate-400 font-mono">Structural failure hazard</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Documented Stumps</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">357 Trees</div>
            <span className="text-[10px] text-slate-400 font-mono">Lost to rot/felling</span>
          </div>
        </div>

        {/* Pathology Catalog */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Microscope className="w-5 h-5 text-indigo-400" />
            Major Arboricultural Diseases &amp; Insect Pathologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pathologyCatalog.map((patho) => (
              <Card key={patho.diseaseName} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      {patho.type}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{patho.diseaseName}</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-1 border-t border-white/5">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Symptoms &amp; Damage:</span>
                    <span className="text-slate-300">{patho.symptoms}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Field Severity in Kashmir:</span>
                    <span className="text-amber-300">{patho.severityInValley}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-medium">Arboricultural Intervention:</span> {patho.recommendedRemediation}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
