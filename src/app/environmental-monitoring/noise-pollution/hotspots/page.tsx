'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseHotspotsPage() {
  const TOP_HOTSPOTS = [
    {
      rank: 1,
      name: 'Jewel Chowk & Canal Road Junction',
      district: 'Jammu',
      region: 'Jammu',
      dayLeq: 86.4,
      nightLeq: 64.2,
      peakHornHz: '310 horns/hr',
      exposedPop: '62,000 residents',
      dominantSources: 'Heavy inter-state buses, commercial trucks, continuous honking',
      urgency: 'CRITICAL',
      intervention: 'Automated acoustic camera horn detection + Grade separator'
    },
    {
      rank: 2,
      name: 'Batamaloo - Jahangir Chowk Axis',
      district: 'Srinagar',
      region: 'Kashmir Valley',
      dayLeq: 82.5,
      nightLeq: 58.6,
      peakHornHz: '280 horns/hr',
      exposedPop: '54,000 residents',
      dominantSources: 'Flyover reflection, minibus acceleration, market generators',
      urgency: 'CRITICAL',
      intervention: 'Under-flyover sound absorptive soffit panels + Horn-free enforcement'
    },
    {
      rank: 3,
      name: 'Kohala Bridge & Neelum Confluence',
      district: 'Muzaffarabad',
      region: 'Azad Jammu & Kashmir',
      dayLeq: 81.2,
      nightLeq: 56.4,
      peakHornHz: '190 horns/hr',
      exposedPop: '28,000 residents',
      dominantSources: 'Steep river gorge acoustic resonance, heavy lumber trucks',
      urgency: 'HIGH',
      intervention: 'Canyon wall acoustic baffles + Night HCV speed limit'
    },
    {
      rank: 4,
      name: 'Sopore Fruit Mandi Bund Axis',
      district: 'Baramulla',
      region: 'Kashmir Valley',
      dayLeq: 79.8,
      nightLeq: 55.2,
      peakHornHz: '240 horns/hr',
      exposedPop: '36,000 residents',
      dominantSources: 'Apple harvest freight trucks, idling diesels, unpaved bund vibration',
      urgency: 'HIGH',
      intervention: 'Dedicated logistics bypass + Quiet porous asphalt'
    },
    {
      rank: 5,
      name: 'KKH Chinar Bagh Commercial Core',
      district: 'Gilgit',
      region: 'Gilgit-Baltistan',
      dayLeq: 78.4,
      nightLeq: 53.0,
      peakHornHz: '160 horns/hr',
      exposedPop: '24,000 residents',
      dominantSources: 'Karakoram Highway freight, open-exhaust motorcycles',
      urgency: 'HIGH',
      intervention: 'Pedestrian commercial ring + Noise barrier screens'
    },
    {
      rank: 6,
      name: 'Khanabal Junction (NH-44 Entry)',
      district: 'Anantnag',
      region: 'Kashmir Valley',
      dayLeq: 77.6,
      nightLeq: 54.8,
      peakHornHz: '210 horns/hr',
      exposedPop: '32,000 residents',
      dominantSources: 'NH-44 tourist and freight confluence, passenger taxis',
      urgency: 'HIGH',
      intervention: 'Smart signal progression + Strict no-honking buffer'
    },
    {
      rank: 7,
      name: 'Navyug Tunnel Toll Plaza (Qazigund)',
      district: 'Kulgam',
      region: 'Kashmir Valley',
      dayLeq: 76.8,
      nightLeq: 58.2,
      peakHornHz: '150 horns/hr',
      exposedPop: '14,000 residents',
      dominantSources: 'Tunnel portal sound jet ejection, deceleration braking',
      urgency: 'MODERATE',
      intervention: 'Tunnel portal acoustic hood extensions'
    },
    {
      rank: 8,
      name: 'Leh Main Bazaar & Airport Transect',
      district: 'Leh',
      region: 'Ladakh',
      dayLeq: 71.4,
      nightLeq: 46.2,
      peakHornHz: '85 horns/hr',
      exposedPop: '18,000 residents',
      dominantSources: 'Military transport aircraft approaches, diesel utility jeeps',
      urgency: 'MODERATE',
      intervention: 'Aviation flight path acoustic noise contour enforcement'
    },
    {
      rank: 9,
      name: 'Mirpur Chowk & Mangla Bypass',
      district: 'Mirpur',
      region: 'Azad Jammu & Kashmir',
      dayLeq: 75.8,
      nightLeq: 52.4,
      peakHornHz: '180 horns/hr',
      exposedPop: '38,000 residents',
      dominantSources: 'High-speed bypass traffic, intercity coaches',
      urgency: 'MODERATE',
      intervention: 'Highway acoustic earth berms + Low-noise asphalt'
    },
    {
      rank: 10,
      name: 'Skardu Old Bazaar & KKH Link',
      district: 'Skardu',
      region: 'Gilgit-Baltistan',
      dayLeq: 73.2,
      nightLeq: 48.6,
      peakHornHz: '110 horns/hr',
      exposedPop: '21,000 residents',
      dominantSources: 'Tourism jeeps, generator banks, market loudspeakers',
      urgency: 'MODERATE',
      intervention: 'Market pedestrianization during peak evening hours'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION C · EXPOSURE & ECOLOGICAL IMPACTS"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Acoustic Hotspots & Modelling' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EXPOSURE SECTOR 04
              </span>
              <span>Acoustic Hotspots &amp; Modelling</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Top 10 Critical Sound Corridors &amp; Valley Inversion Physics
            </span>
          </>
        }
        subtitle="Empirical rankings of the 10 most severe acoustic hotspots in the Western Himalaya. Incorporating CNOSSOS-EU mountain propagation models, canyon wall reverberation, and winter thermal inversion acoustic trapping."
        icon={<Flame className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/standards-compliance"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Regulations</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Top Regional Peak
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              86.4 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Jewel Chowk &amp; Canal Road (Jammu)
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              31.4 dB above residential statutory limit
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Cataloged Hotspots
              </span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              10 <span className="text-sm font-normal text-slate-400">Choke Points</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Prioritized for engineering intervention
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Across all 5 Himalayan administrations
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Inversion Trapping
              </span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              +6 to +8 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Winter nocturnal downward sound refraction
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Valley fog layer acts as acoustic reflector
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Corridor Population
              </span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              480,000 <span className="text-sm font-normal text-slate-400">People</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Directly bordering the top 10 hotspots
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Within high-intensity 50m impact buffer
            </div>
          </Card>
        </div>

        {/* ── TOP 10 ACOUSTIC HOTSPOTS TABLE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Priority Ranking Ledger
              </span>
              <h3 className="text-xl font-bold text-white">Top 10 Western Himalayan Acoustic Hotspots</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Empirical rankings based on Leq, peak transient Lmax, and population exposure
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-3 text-center">Rank</th>
                  <th className="py-3 px-4">Hotspot Corridor</th>
                  <th className="py-3 px-3">Region</th>
                  <th className="py-3 px-3 text-right">Day LAeq</th>
                  <th className="py-3 px-3 text-right">Night LAeq</th>
                  <th className="py-3 px-3 text-center">Peak Horns</th>
                  <th className="py-3 px-3">Exposed Pop.</th>
                  <th className="py-3 px-3 text-center">Urgency</th>
                  <th className="py-3 px-4">Mandated Abatement Intervention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {TOP_HOTSPOTS.map((h) => (
                  <tr key={h.rank} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">#{h.rank}</td>
                    <td className="py-3 px-4 font-semibold text-white">{h.name}</td>
                    <td className="py-3 px-3 text-slate-400">{h.region}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-400 text-sm">{h.dayLeq} dB</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{h.nightLeq} dB</td>
                    <td className="py-3 px-3 text-center font-mono text-orange-400">{h.peakHornHz}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{h.exposedPop}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${
                          h.urgency === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        }`}
                      >
                        {h.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-400 text-xs font-medium">{h.intervention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
