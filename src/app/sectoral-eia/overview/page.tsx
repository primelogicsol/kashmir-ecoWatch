'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { 
  REGULATORY_CAPABILITIES, 
  SECTOR_DEFINITIONS 
} from '@/data/sectoral-eia';
import { 
  Activity, 
  Layers, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat, 
  ArrowRight,
  Info,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function SectoralEiaOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Architecture & Scientific Mandate"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Overview' }
        ]}
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Scientific Architecture & Regulatory Mandate
          </span>
        }
        subtitle="Sectoral Environmental Impact Assessment & Intelligence Engine (SEIAE): evaluating how economic sectors transform Western Himalayan ecosystems at landscape scale."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12 max-w-6xl">
        {/* EXECUTIVE SUMMARY */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950/30 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
              Scientific Concept
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Beyond Project-Level Assessment
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why a Sectoral EIA Engine?
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
            A conventional Environmental Impact Assessment (EIA) typically evaluates an isolated proposed project—a single hotel, road expansion, or brick kiln. 
            However, Western Himalayan environmental degradation is fundamentally driven by <span className="text-emerald-400 font-semibold">diffuse, compounding, and sector-wide pressures</span>: hundreds of thousands of orchard sprays, millions of seasonal visitors, decentralized textile dyeing, and widespread paddy conversions.
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl mt-3">
            <span className="text-white font-semibold">EcoWatch’s Sectoral EIA Engine (SEIAE)</span> moves the platform from simply observing environmental change toward systematically dissecting its <span className="text-emerald-300 font-semibold">causes, consequences, and actionable solutions</span> across complete watersheds, mountain catchments, and administrative districts.
          </p>
        </div>

        {/* SECTION 1: PROPOSED ENGINE ARCHITECTURE */}
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Architecture Specification</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">1. Proposed Engine Architecture</h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Full Formal Scientific Title</h3>
                <p className="text-emerald-400 font-mono text-sm mt-0.5">
                  Sectoral Environmental Impact Assessment & Intelligence Engine (SEIAE)
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Primary public operational name: <span className="text-white font-semibold">Sectoral EIA Engine</span>
                </p>
              </div>
              <Badge className="bg-emerald-500 text-slate-950 font-bold px-3 py-1">
                Kashmir EcoWatch Core Intelligence
              </Badge>
            </div>

            {/* Architecture Stack */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Layer 01 • Telemetry & Foundation</span>
                <h4 className="text-base font-bold text-white">Kashmir EcoWatch Baseline Infrastructure</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Real-time air and water sensors, Jhelum basin gauge telemetry, Sentinel-2 multispectral vegetation and lake bathymetry records, and regional GIS cartography.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">Layer 02 • Assessment Logic Core</span>
                <h4 className="text-base font-bold text-emerald-200">SECTORAL EIA ENGINE CORE</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-white/5 text-center font-medium text-slate-200">
                    Environmental Screening
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5 text-center font-medium text-slate-200">
                    Ecological Baselines
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5 text-center font-medium text-slate-200">
                    Impact & Causal Modeling
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5 text-center font-medium text-slate-200">
                    Cumulative Effects
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5 text-center font-medium text-slate-200">
                    Mitigation Ledgers
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Sector 1</span>
                  <h5 className="font-bold text-sm text-white mt-0.5">Tourism EIA</h5>
                  <p className="text-xs text-slate-300 mt-1">Destination carrying-capacity & visitor pressure</p>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Sector 2</span>
                  <h5 className="font-bold text-sm text-white mt-0.5">Handicrafts EIA</h5>
                  <p className="text-xs text-slate-300 mt-1">Production lifecycle & textile dye effluents</p>
                </div>
                <div className="p-3.5 rounded-xl bg-lime-500/10 border border-lime-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">Sector 3</span>
                  <h5 className="font-bold text-sm text-white mt-0.5">Agriculture EIA</h5>
                  <p className="text-xs text-slate-300 mt-1">Soil health, irrigation withdrawals & chemical inputs</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Sector 4</span>
                  <h5 className="font-bold text-sm text-white mt-0.5">Horticulture EIA</h5>
                  <p className="text-xs text-slate-300 mt-1">Orchard water demand, agrochemicals & climate resilience</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Layer 04 • Scientific Deliverables</span>
                <h4 className="text-base font-bold text-white">Scientific Outputs</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-2 text-xs">
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">Sector Scorecards</span>
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">GIS Impact Maps</span>
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">Cumulative Analysis</span>
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">Risk Scenarios</span>
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">Mitigation Plans</span>
                  <span className="p-2 rounded bg-slate-900 text-slate-300 text-center font-medium">Verified Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ONE ESSENTIAL REGULATORY DISTINCTION */}
        <div id="regulatory" className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Regulatory Framework</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              4. One Essential Regulatory Distinction: EIA 2006 vs Strategic Environmental Assessment (SEA)
            </h2>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-6">
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              India’s Environmental Impact Assessment framework under the <span className="text-white font-semibold">EIA Notification, 2006 (as amended)</span>, promulgated under the Environment (Protection) Act, 1986, governs mandatory statutory Environmental Clearances (EC) granted by the Ministry of Environment, Forest and Climate Change (MoEFCC) and State Environmental Impact Assessment Authorities (SEIAA) for specified Schedule projects.
            </p>

            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs md:text-sm text-blue-200">
              <span className="font-bold text-white block mb-1">Crucial Distinction:</span>
              Kashmir EcoWatch’s SEIAE does <span className="underline font-bold">not</span> grant, substitute, or administer statutory environmental clearances. 
              Instead, SEIAE operates at the sectoral scale guided by the internationally recognized concept of <span className="text-white font-semibold">Strategic Environmental Assessment (SEA)</span> (as codified by the International Association for Impact Assessment - IAIA). SEA evaluates policies, development plans, and cumulative sector effects across entire eco-regions.
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/80">
                    <th className="p-3 text-slate-300 font-bold uppercase tracking-wider">Dimension</th>
                    <th className="p-3 text-slate-300 font-bold uppercase tracking-wider">Project EIA (EIA Notification 2006)</th>
                    <th className="p-3 text-emerald-400 font-bold uppercase tracking-wider">EcoWatch Sectoral EIA Engine (SEIAE / SEA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 font-semibold text-white">Spatial Scale</td>
                    <td className="p-3 text-slate-300">Single project site or lease boundary</td>
                    <td className="p-3 text-emerald-300 font-medium">Landscape, sub-basin, watershed, or entire Kashmir Valley</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Assessed Scope</td>
                    <td className="p-3 text-slate-300">Direct emissions & footprint of a single industrial unit or hotel</td>
                    <td className="p-3 text-emerald-300 font-medium">Cumulative emissions from thousands of economic units operating simultaneously</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Legal Nature</td>
                    <td className="p-3 text-slate-300">Statutory requirement for commercial operation license</td>
                    <td className="p-3 text-emerald-300 font-medium">Independent scientific monitoring, open public intelligence, policy guidance</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Cumulative Effects</td>
                    <td className="p-3 text-slate-300">Frequently neglected or minimized in single-project reports</td>
                    <td className="p-3 text-emerald-300 font-medium">Core analytical pillar: evaluates multi-sector compounding stresses</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Time Horizon</td>
                    <td className="p-3 text-slate-300">Static snapshot prepared for initial construction clearance</td>
                    <td className="p-3 text-emerald-300 font-medium">Dynamic, continuous multi-year scenario modeling (2026, 2030, 2035)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Three Distinguished Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {REGULATORY_CAPABILITIES.map((cap) => (
                <div key={cap.id} className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">{cap.badge}</span>
                  <h4 className="text-sm font-bold text-white mb-1">{cap.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{cap.description}</p>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    {cap.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CRITICAL DESIGN QUESTION */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/40 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">
              Addressing the Critical Design Question
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Question:</span> Do you want the engine to remain an independent scientific monitoring and assessment system, or should it also enable businesses, government departments, hotels, craft manufacturers, and agricultural enterprises to submit their own environmental assessments for independent review by Kashmir EcoWatch?
          </p>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-xs md:text-sm text-slate-200 space-y-2">
            <p className="font-bold text-emerald-300">
              Resolved Architecture: Dual-Track Operational Model
            </p>
            <p className="leading-relaxed">
              Kashmir EcoWatch establishes <span className="text-white font-semibold">both tracks</span> seamlessly integrated into one shared assessment database:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-white/5">
                <span className="font-bold text-white block mb-1">Track 1: Independent Scientific Assessments</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conducted autonomously by Kashmir EcoWatch scientific working groups using empirical sensors, satellite data, and peer-reviewed protocols. Completely independent of enterprise funding or bias.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/5">
                <span className="font-bold text-white block mb-1">Track 2: Stakeholder Assessment Submissions</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hotels, craft cooperatives, orchard grower associations, and municipal bodies submit their self-assessments through the standardized 9-step portal. EcoWatch multidisciplinary panels subject each submission to independent evidence audits, GIS verification, and public grading.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION ACTIONS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Link href="/sectoral-eia">
            <Button variant="outline" className="border-white/20 text-white text-xs">
              Back to Sectoral EIA Hub
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sectoral-eia/methodology">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                Inspect 9-Step Methodology <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
