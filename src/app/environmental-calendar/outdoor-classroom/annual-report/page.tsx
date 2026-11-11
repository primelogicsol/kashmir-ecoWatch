'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileSpreadsheet, 
  MapPin, 
  School, 
  Activity, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  ExternalLink,
  Sparkles,
  Info,
  Calendar,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  PILOT_INSTITUTIONS, 
  ADOPTED_ECOSYSTEM_REGISTRY, 
  OUTDOOR_CLASSROOM_ARCHIVAL_NOTE 
} from '@/data/outdoor-classroom';

export default function AnnualPilotReportPage() {
  const totalStudents = PILOT_INSTITUTIONS.reduce((acc, inst) => acc + inst.studentEnrolment, 0);
  const totalRecords = PILOT_INSTITUTIONS.reduce((acc, inst) => acc + inst.verifiedFieldSubmissions, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Western Himalayan Field Science Program • Annual Pilot Synthesis"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
          { label: 'Annual Pilot Field Report (2026)' }
        ]}
        icon={<FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                OD-REPORT
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Annual Pilot Field Report (2026)
              </span>
            </div>
          </div>
        }
        subtitle="Comprehensive synthesis of the inaugural 20-institution Phase 1 pilot across all 10 Kashmir Valley districts. Documenting student-led empirical fieldwork, water chemistry baselines, avian counts, and oral history records."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/environmental-calendar/outdoor-classroom/curriculum">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20">
                Curriculum Tiers
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/institutional-registration">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                Register School
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        {/* Aggregate Key Performance Indicators (KPIs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Pilot Institutions</div>
            <div className="text-2xl font-black text-emerald-400">20</div>
            <div className="text-[10px] text-slate-500">Schools & Colleges</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Valley Coverage</div>
            <div className="text-2xl font-black text-cyan-400">10 / 10</div>
            <div className="text-[10px] text-slate-500">All Districts Active</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Student Scientists</div>
            <div className="text-2xl font-black text-blue-400">{totalStudents}</div>
            <div className="text-[10px] text-slate-500">Trained Observers</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Study Tours</div>
            <div className="text-2xl font-black text-purple-400">46</div>
            <div className="text-[10px] text-slate-500">Completed Tours</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Verified Telemetry</div>
            <div className="text-2xl font-black text-amber-400">{totalRecords}</div>
            <div className="text-[10px] text-slate-500">Logged Records</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">Safety Incident Rate</div>
            <div className="text-2xl font-black text-emerald-400">0.0%</div>
            <div className="text-[10px] text-slate-500">Zero Accidents</div>
          </div>
        </div>

        {/* Section 1: Executive Findings */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executive Scientific Findings & Environmental Baseline Signals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Critical trends identified during the 2026 pilot monitoring across Kashmir wetlands, forests, and springs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>1. Accelerating Wetland Eutrophication & Siltation</span>
              </div>
              <p className="leading-relaxed text-slate-400 break-words">
                Student telemetry at Hokersar (KEW-OD-WET-001) and Shallabugh (KEW-OD-WET-004) recorded average Secchi disk 
                transparency dropping below 45 cm during late summer. Rapid expansion of *Trapa natans* (singhara) and *Azolla cristata* 
                mats was confirmed across 38% of peripheral marsh channels, signaling heavy upstream agricultural nutrient inflow.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>2. Karst Spring Discharge & Temperature Shifts</span>
              </div>
              <p className="leading-relaxed text-slate-400 break-words">
                College cohorts monitoring south Kashmir springs at Achabal (KEW-OD-SPR-003) and Kokernag recorded notable seasonal 
                fluctuations in water table recovery times following reduced winter precipitation. Spring outflow temperatures 
                remained stable (11.8°C–12.5°C), but downstream irrigation canal diversions caused localized stagnation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Subalpine Forest Canopy Regeneration at Dachigam</span>
              </div>
              <p className="leading-relaxed text-slate-400 break-words">
                Transect surveys in lower Dachigam National Park (KEW-OD-FOR-002) revealed robust blue pine (*Pinus wallichiana*) and 
                Himalayan cedar (*Cedrus deodara*) seedling regeneration in fenced enclosures (averaging 14 saplings per 100m² quadrate), 
                whereas unfenced peripheral borders experienced heavy livestock grazing pressure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>4. Value of Intergenerational Oral History Protocols</span>
              </div>
              <p className="leading-relaxed text-slate-400 break-words">
                Over 110 interviews with village elders across Baramulla, Bandipora, and Kupwara documented oral recollections of 
                historical winter freeze extents on Wular and Dal lakes from the 1960s to 1980s. This oral history matched historical 
                meteorological records, providing students with profound living context for contemporary warming patterns.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: District-by-District Pilot Roster Table */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                District-by-District Institutional Roster
              </h2>
              <p className="text-xs text-slate-400">
                Participation metrics and adopted sites across all 10 Kashmir Valley districts
              </p>
            </div>
            <span className="font-mono text-xs text-emerald-400">
              100% District Representation
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/60">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">District</th>
                  <th className="py-3.5 px-4 font-semibold">Institution Name</th>
                  <th className="py-3.5 px-4 font-semibold">Eco-Club</th>
                  <th className="py-3.5 px-4 font-semibold">Adopted Ecosystem</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Students</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Records</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {PILOT_INSTITUTIONS.map((inst) => (
                  <tr key={inst.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-emerald-400 font-mono">
                      {inst.district}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white break-words max-w-xs">
                      {inst.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400 break-words">
                      {inst.ecoClubName}
                    </td>
                    <td className="py-3 px-4 text-cyan-300 break-words">
                      {inst.adoptedSiteName}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {inst.studentEnrolment}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                      {inst.verifiedFieldSubmissions}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px]">
                        Active Pilot
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Archival Note & Historical Attribution */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Archival Provenance & Historical Context: ESRO & eIEN Kashmir (2002–2006)
            </h3>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="whitespace-pre-line break-words">
              {OUTDOOR_CLASSROOM_ARCHIVAL_NOTE.institutionalCharterSummary}
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-slate-400 italic">
              <strong>Archival Note:</strong> {OUTDOOR_CLASSROOM_ARCHIVAL_NOTE.archivalCaveat}
            </div>
          </div>
          <div className="pt-2 text-[11px] text-slate-500 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <span>Archival Source: Electronic Integrated Environmental Network (eIEN Kashmir) Digital Repository (2002–2006)</span>
            <span className="font-mono text-emerald-400">Revived & Expanded: November 2026</span>
          </div>
        </section>

      </main>
    </div>
  );
}
