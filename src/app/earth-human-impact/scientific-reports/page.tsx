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
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function ScientificReportsRegistryPage() {
  const reports = [
    {
      title: 'Decadal Climate Shifts in the Kashmir Himalaya: Cryospheric and Precipitation Trends',
      authors: 'KEW Desk Synthesis — Anchored in IMD Synoptic Climatology & Peer-Reviewed Literature',
      year: '2025',
      type: 'Desk-Synthesized Climatology Brief',
      confidence: 'Secondary Literature & Station Synthesis',
      description: 'Desk synthesis of published 40-year daily temperature and precipitation trend analyses across regional synoptic stations, examining elevation-dependent warming and winter chill-hour decline.',
      citations: 'External Peer Review Pending'
    },
    {
      title: 'State of Forests in Jammu & Kashmir: Remote Sensing Canopy Density Synthesis',
      authors: 'Referenced Statutory Source: Forest Survey of India (FSI ISFR)',
      year: '2024',
      type: 'Statutory Biennial Reference',
      confidence: 'Statutory Agency Baseline (Third-Party Rights Retained)',
      description: 'Summary of LISS-III and Sentinel-2 calibrated forest cover assessments examining canopy density classes and fragmentation corridors across Kashmir Valley forest divisions.',
      citations: 'Statutory Reference'
    },
    {
      title: 'CAG Performance Audit on Conservation of Waterbodies & Wetlands in J&K',
      authors: 'Referenced Statutory Source: Comptroller and Auditor General of India',
      year: '2025',
      type: 'Statutory Audit Report No. 4 of 2025',
      confidence: 'Government Statutory Audit (Report ID 125068)',
      description: 'Official statutory performance audit examining flood-retention basin contraction, sewage interception gaps, de-weeding seasonality, and wetland encroachment across Dal–Nigeen and Wular.',
      citations: 'Statutory Audit'
    },
    {
      title: 'Geomorphic Impact of Quaternary Karewa Excavation in Central Kashmir',
      authors: 'KEW Desk Synthesis — Anchored in Quaternary Geology Literature & Sentinel-2 Archives',
      year: '2025',
      type: 'Desk-Synthesized Earth Systems Dossier',
      confidence: 'Satellite & Published Literature Synthesis',
      description: 'Desk synthesis of Pleistocene Karewa fluvio-lacustrine plateau excavation footprints, soil-loss susceptibility, GI saffron tableland vulnerability, and tributary sediment yields.',
      citations: 'External Peer Review Pending'
    },
    {
      title: 'Riverbed Mineral Extraction and Channel Incision Dynamics in Jhelum Tributaries',
      authors: 'KEW Desk Synthesis — Anchored in NGT Tributary Proceedings & Fluvial Literature',
      year: '2026',
      type: 'Desk-Synthesized Fluvial Dossier',
      confidence: 'Judicial Docket & Remote Sensing Synthesis',
      description: 'Documentary synthesis of National Green Tribunal compliance records and fluvial geomorphic studies across Doodhganga, Rambiara, and Vishow gravel-extraction reaches.',
      citations: 'Judicial & Literature Synthesis'
    },
    {
      title: 'Urban Heat Island Microclimate Screening of Srinagar Metropolitan Area',
      authors: 'KEW Desk Synthesis — Anchored in Landsat 8/9 TIRS Surface Temperature Archives',
      year: '2025',
      type: 'Desk-Synthesized Urban Climate Dossier',
      confidence: 'Landsat TIRS Remote Sensing Retrieval',
      description: 'Multi-temporal thermal infrared screening of land surface temperature differentials between Srinagar’s impervious urban core and peri-urban vegetated/lacustrine margins.',
      citations: 'External Peer Review Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Desk-Synthesized Research Dossiers (External Peer Review Pending)"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Desk-Synthesized Research Dossiers' }
        ]}
        icon={<FileText className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <KewBrandIdentity />
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Desk-Synthesized Research Dossiers (External Peer Review Pending)
              </span>
            </div>
          </div>
        }
        subtitle="Desk-synthesized research summaries integrating published scientific literature, statutory government audits, and spaceborne remote-sensing retrievals — transparently distinguished from externally peer-reviewed primary monographs."
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
