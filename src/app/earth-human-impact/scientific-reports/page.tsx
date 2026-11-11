'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function ScientificReportsRegistryPage() {
  const reports = [
    {
      title: 'Decadal Climate Shifts in the Kashmir Himalaya: Cryospheric and Precipitation Trends',
      authors: 'IMD Climatology Cell & Himalayan Cryosphere Group',
      year: '2025',
      type: 'Climatological Monograph',
      confidence: 'Grade A (Station Verified)',
      description: 'Comprehensive analysis of 40-year daily temperature and precipitation records from 14 synoptic stations, establishing the +1.42°C warming trend and 18% winter chill hour decline.',
      citations: '48 Peer Citations'
    },
    {
      title: 'State of Forests in Jammu & Kashmir: Remote Sensing Canopy Density Audit',
      authors: 'Forest Survey of India (FSI) & Department of Ecology',
      year: '2024',
      type: 'Statutory Biennial Audit',
      confidence: 'Grade A (1:50,000 Remote Sensing)',
      description: 'LISS-III and Sentinel-2 calibrated forest cover assessment examining very dense canopy attrition and fragmentation corridors across 10 Kashmir valley forest divisions.',
      citations: 'Statutory Baseline'
    },
    {
      title: 'CAG Performance Audit on Conservation of Waterbodies & Wetlands in J&K',
      authors: 'Comptroller and Auditor General of India',
      year: '2025',
      type: 'Statutory Audit Report No. 3',
      confidence: 'Grade A (Government Audit)',
      description: 'Official inspection uncovering 48% contraction of flood-retention basins, sewage diversion failures, and unpermitted earth-filling across Hokersar, Anchar, and Wular wetlands.',
      citations: 'Statutory Audit'
    },
    {
      title: 'Geomorphic Impact of Quaternary Karewa Strip-Mining in Central Kashmir',
      authors: 'Centre of Research for Development (CORD) & GSI',
      year: '2025',
      type: 'Earth Systems Monograph',
      confidence: 'Grade B+ (Field Corroborated)',
      description: 'Quantifying 42.6 km² of Pleistocene Karewa lacustrine plateau excavation for railway embankment fill, tracking soil loss, saffron decline, and sediment yields.',
      citations: '32 Peer Citations'
    },
    {
      title: 'Riverbed Mineral Extraction and Channel Incision Dynamics in Jhelum Tributaries',
      authors: 'National Green Tribunal Expert Oversight Committee',
      year: '2026',
      type: 'Tribunal Technical Report',
      confidence: 'Grade A (Bathymetric Feeds)',
      description: 'Hydrographic surveying of 118 km of riverbed in Doodhganga, Rambiara, and Vaishaw streams showing widespread incision exceeding statutory 1-meter extraction depths.',
      citations: 'Legal Benchmark'
    },
    {
      title: 'Urban Heat Island Microclimate Mapping of Srinagar Metropolitan Area',
      authors: 'Department of Geoinformatics & Town Planning Organization',
      year: '2025',
      type: 'Urban Science Dossier',
      confidence: 'Grade A (Landsat TIRS LST)',
      description: 'Multi-temporal thermal infrared assessment documenting +3.8°C surface temperature differential in downtown core relative to peri-urban agricultural perimeter.',
      citations: '24 Peer Citations'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Peer-Reviewed Evidence Dossiers • Western Himalaya"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Peer-Reviewed Scientific Reports & Dossiers' }
        ]}
        icon={<FileText className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-REP
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Peer-Reviewed Scientific Reports & Dossiers
              </span>
            </div>
          </div>
        }
        subtitle="Every metric, boundary, and threshold in the Earth & Human Impact Intelligence module is derived from peer-reviewed scientific publications, statutory government audits, and spaceborne telemetry."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['scientific-reports'].tag}
            badge={EHII_HERO_CONFIGS['scientific-reports'].badge}
            items={EHII_HERO_CONFIGS['scientific-reports'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['scientific-reports'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-teal-500/30 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    {r.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {r.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{r.title}</h3>
                <div className="text-xs text-slate-400 font-mono mb-3">{r.authors}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{r.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {r.confidence}
                </span>
                <span className="text-slate-500 text-[11px] font-mono">{r.citations}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
