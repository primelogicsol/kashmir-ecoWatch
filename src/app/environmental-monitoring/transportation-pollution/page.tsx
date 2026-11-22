'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { TransportSubNav } from '@/components/transportation-pollution/TransportSubNav';
import {
  DISTRICT_TRANSPORT_DATA,
  REGION_TRANSPORT_SUMMARIES,
  BASIN_TRANSPORT_TOTALS,
  COMPLETENESS_MATRIX,
  TRAFFIC_POLLUTION_HOTSPOTS,
  KEWRegion,
  DistrictTransportationData
} from '@/data/transportation-pollution';
import {
  Car,
  BarChart3,
  Compass,
  Wind,
  Gauge,
  Volume2,
  Layers,
  Fuel,
  Bus,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Activity,
  FileSpreadsheet,
  Info,
  ShieldCheck,
  Search,
  Zap,
  Flame,
  Radio
} from 'lucide-react';

export default function TransportationPollutionOverviewPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('Srinagar');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active district for detailed inspector
  const activeDistrict = useMemo(() => {
    return (
      DISTRICT_TRANSPORT_DATA.find((d) => d.district === selectedDistrictName) ||
      DISTRICT_TRANSPORT_DATA[0]
    );
  }, [selectedDistrictName]);

  // Filtered districts list
  const filteredDistricts = useMemo(() => {
    return DISTRICT_TRANSPORT_DATA.filter((d) => {
      if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          d.district.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.rtoCode.toLowerCase().includes(q) ||
          d.headquarters.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · ENVIRONMENTAL MONITORING / MOBILE EMISSIONS INTELLIGENCE"
        images={[
          '/images/env-monitoring/kashmir-transport-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-vehicle-census.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                TRANSPORT POLLUTION
              </span>
              <span>Fleet, Traffic, Noise &amp; Emissions</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Mobile Source Surveillance
            </span>
          </>
        }
        subtitle="Comprehensive environmental monitoring of motorized transport across 42 districts in Kashmir Valley, Jammu, Ladakh, AJK, and Gilgit-Baltistan. Tracking 3.32M registered vehicles, active road traffic flow, COPERT Tier 3 exhaust emissions, acoustic noise dB(A), non-exhaust tyre wear particles, and sensitive human exposure."
        icon={<Car className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/transportation-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>District TPBS Scores</span>
            </Link>
            <Link
              href="/environmental-monitoring/transportation-pollution/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Transport GIS Atlas</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION (18 Standalone Submodules) ─── */}
      <TransportSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 3. FOUR KEY TELEMETRY CARDS STRIP ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Total Registered Fleet
              </span>
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              ~{(BASIN_TRANSPORT_TOTALS.totalCumulativeRegisteredVehicles / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              3,319,000+ Lifetime Registrations
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Source: VAHAN, Dataful, AJK &amp; GB Ledgers
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Active Operating Fleet
              </span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              ~{(BASIN_TRANSPORT_TOTALS.totalActiveOperatingFleet / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Daily Physically Active on Roads
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Excludes scrapped &amp; deregistered 15+ yr units
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Annual Exhaust PM₂.₅
              </span>
              <Wind className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              {BASIN_TRANSPORT_TOTALS.totalAnnualPm25Tonnes.toLocaleString()} <span className="text-sm font-normal text-slate-400">T/yr</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              + {BASIN_TRANSPORT_TOTALS.totalNonExhaustPm10Tonnes.toLocaleString()} T Non-Exhaust PM
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              COPERT Tier 3 Speed-Calibrated Engine
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Five-Region Scope
              </span>
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              {BASIN_TRANSPORT_TOTALS.totalDistrictsMonitored} <span className="text-sm font-normal text-slate-400">Districts</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              {BASIN_TRANSPORT_TOTALS.totalDailyVktMillionKm}M Daily Vehicle-km Travelled
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Universal coverage with zero synthetic data
            </div>
          </Card>
        </div>


        {/* ── 5. FIVE-REGION COMPARATIVE PROFILES ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Macro-Geographic Intelligence
              </span>
              <h3 className="text-xl font-bold text-white">Five-Region Transport Summary</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Aggregated across all 42 administrative jurisdictions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(REGION_TRANSPORT_SUMMARIES).map((reg) => (
              <Card key={reg.region} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3.5 hover:border-amber-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      {reg.districtsCount} Districts Monitored
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1.5">{reg.region}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 block">Avg TPBS</span>
                    <span className="text-xl font-black font-mono text-amber-400">{reg.avgTpbsScore} <span className="text-xs font-normal text-slate-500">/100</span></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-[6px] border border-white/5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Registered Fleet</span>
                    <span className="text-white font-bold">{reg.cumulativeRegisteredVehicles.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Active Fleet</span>
                    <span className="text-emerald-400 font-bold">{reg.activeOperatingFleetEst.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Annual Exhaust PM₂.₅</span>
                    <span className="text-rose-400 font-bold">{reg.annualPm25Tonnes} Tonnes</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Annual CO₂</span>
                    <span className="text-cyan-400 font-bold">{reg.annualCo2ThousandTonnes} kt</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Fleet Mix:</span>
                    <span>{reg.avgTwoWheelersPct}% 2W · {reg.avgCarSuvPct}% Cars · {reg.avgFreightTruckPct}% Trucks</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Electric EV Share:</span>
                    <span className="text-emerald-300 font-bold font-mono">{reg.avgElectricEvPct}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                  Sources: {reg.primaryDataSources.slice(0, 2).join(' · ')}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── 6. PERMANENT FIVE-REGION DATA COMPLETENESS MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Evidence Transparency Ledger
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Five-Region Data Completeness &amp; Fidelity Matrix</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-2.5 py-1 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All 5 Regions</option>
                <option value="Kashmir Valley">Kashmir Valley</option>
                <option value="Jammu">Jammu</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu &amp; Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300 font-mono">
                <thead className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-3">District</th>
                    <th className="py-3 px-3">Region</th>
                    <th className="py-3 px-3">Registration Status</th>
                    <th className="py-3 px-3">Traffic Flow</th>
                    <th className="py-3 px-3">Air Quality Co-Location</th>
                    <th className="py-3 px-3">Noise Monitoring</th>
                    <th className="py-3 px-3">Non-Exhaust Mod.</th>
                    <th className="py-3 px-3 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COMPLETENESS_MATRIX.filter(m => selectedRegion === 'ALL' || m.region === selectedRegion).map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-white font-sans">{row.district}</td>
                      <td className="py-2.5 px-3 text-slate-400 font-sans">{row.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : row.region}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${
                          row.registrationStatus === 'VERIFIED_2026'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {row.registrationStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] ${
                          row.trafficFlowData === 'HIGHWAY_SENSORS'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : row.trafficFlowData === 'SAMPLE_SURVEYS'
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {row.trafficFlowData.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] ${
                          row.airQualityCoLocation === 'CAAQMS_STATION'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : row.airQualityCoLocation === 'IND_SENSOR_NETWORK'
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {row.airQualityCoLocation.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] ${
                          row.acousticNoiseMonitoring === 'CALIBRATED_STATION'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : row.acousticNoiseMonitoring === 'PERIODIC_FIELD_SURVEY'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {row.acousticNoiseMonitoring.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{row.nonExhaustModelling.replace('_', ' ')}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="font-bold text-amber-300">{row.overallDataConfidencePct}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 7. DETAILED DISTRICT INSPECTOR (TPBS 0–100) ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Arterial Telemetry &amp; Vulnerability
              </span>
              <h3 className="text-xl font-bold text-white">District Transportation Burden Inspector</h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedDistrictName}
                onChange={(e) => setSelectedDistrictName(e.target.value)}
                className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-bold"
              >
                {DISTRICT_TRANSPORT_DATA.map(d => (
                  <option key={d.district} value={d.district}>
                    {d.district} ({d.region} · {d.rtoCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Card: TPBS Score & Fleet Composition */}
            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
              <div className="flex items-start justify-between border-b border-white/5 pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    RTO Code: {activeDistrict.rtoCode} · {activeDistrict.region}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-1.5">{activeDistrict.district}</h4>
                  <span className="text-xs text-slate-400">Headquarters: {activeDistrict.headquarters}</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black font-mono text-amber-400">
                    {activeDistrict.tpbsScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[3px] bg-rose-500/20 text-rose-300 block mt-1 font-bold">
                    {activeDistrict.tpbsTier.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Cumulative Registered:</span><span className="text-white font-mono font-bold">{activeDistrict.cumulativeRegisteredVehicles.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Active Operating Fleet:</span><span className="text-emerald-400 font-mono font-bold">{activeDistrict.activeOperatingFleetEst.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">New Reg. Run-rate 2026:</span><span className="text-cyan-300 font-mono">+{activeDistrict.annualNewRegistrations2026.toLocaleString()}/yr</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Daily Vehicle-km:</span><span className="text-white font-mono">{activeDistrict.dailyVehicleKmTravelledM} Million km/day</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Data Confidence:</span><span className="text-indigo-300 font-mono font-bold">{activeDistrict.dataConfidencePct}%</span></div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Fleet Fuel Mix</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-slate-950 rounded-[4px] border border-white/5">Petrol: <strong className="text-white">{activeDistrict.fuels.petrolPct}%</strong></div>
                  <div className="p-2 bg-slate-950 rounded-[4px] border border-white/5">Diesel: <strong className="text-amber-300">{activeDistrict.fuels.dieselPct}%</strong></div>
                  <div className="p-2 bg-slate-950 rounded-[4px] border border-white/5">Electric EV: <strong className="text-emerald-400">{activeDistrict.fuels.evElectricPct}%</strong></div>
                  <div className="p-2 bg-slate-950 rounded-[4px] border border-white/5">CNG/Hybrid: <strong className="text-slate-300">{activeDistrict.fuels.cngHybridPct}%</strong></div>
                </div>
              </div>
            </Card>

            {/* Middle Card: Emissions, Noise & Non-Exhaust PM */}
            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wind className="w-4 h-4 text-rose-400" />
                <span>Annual Vehicle Emissions &amp; Noise</span>
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 bg-slate-950 rounded-[4px]">
                  <span className="text-slate-400">Exhaust PM₂.₅:</span>
                  <span className="text-rose-400 font-bold">{activeDistrict.emissions.pm25} Tonnes/yr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-[4px]">
                  <span className="text-slate-400">Exhaust PM₁₀:</span>
                  <span className="text-rose-300 font-bold">{activeDistrict.emissions.pm10} Tonnes/yr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-[4px]">
                  <span className="text-slate-400">Nitrogen Oxides (NOₓ):</span>
                  <span className="text-amber-300 font-bold">{activeDistrict.emissions.nox} Tonnes/yr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-[4px]">
                  <span className="text-slate-400">Carbon Monoxide (CO):</span>
                  <span className="text-cyan-300 font-bold">{activeDistrict.emissions.co} Tonnes/yr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-[4px]">
                  <span className="text-slate-400">CO₂ Equivalent:</span>
                  <span className="text-white font-bold">{activeDistrict.emissions.co2ThousandTonnes} Thousand Tonnes</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Acoustic Noise Levels (dB(A))</span>
                </span>
                <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-2.5 rounded-[4px]">
                  <span>Day: <strong className="text-white">{activeDistrict.noise.dayLaeqDbA}</strong></span>
                  <span>Night: <strong className="text-amber-300">{activeDistrict.noise.nightLaeqDbA}</strong></span>
                  <span>Lmax: <strong className="text-rose-400">{activeDistrict.noise.peakLmaxDbA}</strong></span>
                </div>
              </div>
            </Card>

            {/* Right Card: Sensitive Receptors & Mitigation Priority */}
            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Primary Arterial Corridor &amp; Hotspots</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Arterial Spine</span>
                  <p className="text-white font-medium">{activeDistrict.primaryCorridor}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Key Congestion Nodes</span>
                  <ul className="mt-1 space-y-1 text-slate-300">
                    {activeDistrict.keyCongestionNodes.map((node, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{node}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-[6px] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Sensitive Human Exposure</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-300">
                    <div>Schools &lt;100m: <strong className="text-white">{activeDistrict.receptors.schoolsWithin100mMajorRoads}</strong></div>
                    <div>Hospitals &lt;100m: <strong className="text-white">{activeDistrict.receptors.hospitalsWithin100mMajorRoads}</strong></div>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Population in high exposure buffer: <strong className="text-rose-300">{activeDistrict.receptors.populationInHighExposureZone.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] text-[11px] text-amber-200">
                  <strong>Recommended Intervention:</strong> {activeDistrict.mitigationPriority}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 8. CRITICAL TRAFFIC POLLUTION HOTSPOTS GRID ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Spatial Choke Points
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                <span>Regional Traffic Pollution Bottlenecks</span>
              </h3>
            </div>
            <Link
              href="/environmental-monitoring/transportation-pollution/hotspots"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <span>View All Hotspots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRAFFIC_POLLUTION_HOTSPOTS.slice(0, 6).map((spot) => (
              <Card key={spot.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {spot.district} · {spot.region}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{spot.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 block">Delay Index</span>
                    <span className="text-base font-bold font-mono text-rose-400">{spot.delayIndex}x</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-2.5 rounded-[6px] border border-white/5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Roadside PM₂.₅</span>
                    <span className="text-rose-400 font-bold">{spot.roadsidePm25AvgUgM3} µg/m³</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Noise Level</span>
                    <span className="text-cyan-400 font-bold">{spot.roadsideDbA} dB(A)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Peak Flow</span>
                    <span className="text-white font-bold">{spot.peakHourPcu.toLocaleString()} PCU/hr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Avg Speed</span>
                    <span className="text-amber-300 font-bold">{spot.avgSpeedKmph} km/h</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-400">Cause:</strong> {spot.primaryPollutionSource}
                </p>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <strong className="text-slate-300">Target Action:</strong> {spot.recommendedIntervention}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── 9. QUICK NAVIGATION GRID TO ALL 18 SUBMODULES ─── */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Full System Architecture
              </span>
              <h3 className="text-xl font-bold text-white">All 18 Transportation Pollution Submodules</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Four functional operational domains</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Dashboards & District Scores', path: '/environmental-monitoring/transportation-pollution/dashboards', desc: '0–100 TPBS comparative scores & indicators', icon: BarChart3 },
              { title: 'Vehicle Census & Fleet', path: '/environmental-monitoring/transportation-pollution/vehicle-census', desc: 'Registered vs active operating vehicle counts', icon: FileSpreadsheet },
              { title: 'Vehicle Types & Fuel', path: '/environmental-monitoring/transportation-pollution/vehicle-types', desc: 'Petrol, diesel, EV, CNG & 2W/3W/4W breakdown', icon: Fuel },
              { title: 'Transport Pollution GIS Atlas', path: '/environmental-monitoring/transportation-pollution/gis-atlas', desc: 'Road-level and district choropleth GIS engine', icon: Compass },
              { title: 'Vehicle Air Emissions', path: '/environmental-monitoring/transportation-pollution/emissions', desc: 'PM2.5, PM10, NOx, CO, VOC & SO2 inventories', icon: Wind },
              { title: 'Traffic & Congestion', path: '/environmental-monitoring/transportation-pollution/traffic', desc: 'Flow speeds, travel delay times & bottleneck nodes', icon: Gauge },
              { title: 'Noise Pollution', path: '/environmental-monitoring/transportation-pollution/noise', desc: 'Roadside LAeq, Lmax, WHO 53 dB(A) exceedance days', icon: Volume2 },
              { title: 'Road Dust & Non-Exhaust PM', path: '/environmental-monitoring/transportation-pollution/road-dust', desc: 'Tyre wear particles (TRWP), brake dust & silt', icon: Layers },
              { title: 'Carbon & Climate', path: '/environmental-monitoring/transportation-pollution/carbon', desc: 'CO2 equivalent emissions & fuel consumption models', icon: Car },
              { title: 'Road Runoff & Contamination', path: '/environmental-monitoring/transportation-pollution/runoff', desc: 'Hydrocarbons, heavy metals & aquatic drainage', icon: Activity },
              { title: 'Public Health Exposure', path: '/environmental-monitoring/transportation-pollution/health-exposure', desc: 'Schools, hospitals & roadside vulnerable populations', icon: AlertTriangle },
              { title: 'Tourism & Freight Transport', path: '/environmental-monitoring/transportation-pollution/tourism-freight', desc: 'Tourist vehicle surges, apple trucks & KKH transits', icon: Bus },
              { title: 'Public Transport & Clean Mobility', path: '/environmental-monitoring/transportation-pollution/clean-mobility', desc: 'Electric buses, EV charging infra & transit shifts', icon: Zap },
              { title: 'Hotspots & Intervention Scenarios', path: '/environmental-monitoring/transportation-pollution/hotspots', desc: 'High-risk road corridors & mitigation simulations', icon: Flame },
              { title: 'Vehicle Compliance & Regulation', path: '/environmental-monitoring/transportation-pollution/regulations', desc: 'BS-VI enforcement, PUC centers & scrappage policy', icon: ShieldCheck },
              { title: 'Data Sources & Integrations', path: '/environmental-monitoring/transportation-pollution/data-sources', desc: 'VAHAN, Dataful, OpenAQ, TomTom, COPERT APIs', icon: Radio },
              { title: 'Research & Methodology', path: '/environmental-monitoring/transportation-pollution/methodology', desc: 'Scientific emission factor polynomials & formulas', icon: Info },
            ].map((sub, idx) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={idx}
                  href={sub.path}
                  className="p-4 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-all group flex items-start gap-3"
                >
                  <div className="p-2 rounded-[6px] bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>{sub.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{sub.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
