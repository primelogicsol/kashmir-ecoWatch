'use client';

import React, { useMemo, useState } from 'react';
import { Compass, Droplets, RotateCcw, ShieldAlert, Snowflake, Users } from 'lucide-react';

interface LadakhEcologicalFrontiersWorkbenchProps {
  variant?: 'editorial' | 'observatory';
  defaultTab?: 'cryosphere' | 'carrying_capacity' | 'ecological_integrity';
}

const COLD_DESERT_LANDSCAPE_UNITS: Array<{
  id: string;
  landscape: string;
  conventionalLabel: string;
  hiddenEcologicalFunctions: string[];
  keyIndicatorTaxaOrSystems: string;
  infrastructureSensitivity: string;
}> = [
  {
    id: 'changthang-permafrost',
    landscape: 'Changthang Permafrost-Affected Steppe & Wet Meadows',
    conventionalLabel: 'Unproductive Cold-Desert Barren Land',
    hiddenEcologicalFunctions: [
      'Cryoturbated soil microbial diversity (documented in 2025 PMC research) regulating high-altitude carbon and nitrogen cycling',
      'Subsurface seasonal thaw moisture buffering sedge meadows (Carex / Kobresia) critical for Changpa Pashmina herds and wild ungulates',
      'Permafrost active-layer hydrology sustaining peripheral seepages around endorheic basins',
    ],
    keyIndicatorTaxaOrSystems: 'Psychrophilic soil microbiomes · Tibetan gazelle · Kiang · Pashmina goats',
    infrastructureSensitivity:
      'Surface grading, blacktop thermal absorption, and solar-array piling accelerate active-layer thaw and irreversible turf desiccation.',
  },
  {
    id: 'tsomoriri-tsokar',
    landscape: 'Tso Moriri & Tso Kar Endorheic Ramsar Wetland Complexes',
    conventionalLabel: 'Saline / Brackish High-Altitude Wasteland Margins',
    hiddenEcologicalFunctions: [
      'Critical breeding marshes for the Black-necked crane (Grus nigricollis) and staging habitat among Ladakh’s 65 high-concern bird species (Sept 2026 assessment)',
      'Closed-basin hydro-chemical archives recording decadal glacier-melt dilution vs. evaporative salinization',
      'Freshwater snowmelt inflow fans supporting surrounding pastoral winter/spring camps',
    ],
    keyIndicatorTaxaOrSystems: 'Black-necked crane · Bar-headed goose · Great crested grebe · Ruddy shelduck',
    infrastructureSensitivity:
      'Shoreline tracks, unregulated camping, free-ranging dogs around waste dumps, and inflow diversion disrupt ground-nesting waterfowl.',
  },
  {
    id: 'hemis-karakoram-hanle',
    landscape: 'Hemis–Karakoram–Hanle Scree, Talus & Steppe Corridors',
    conventionalLabel: 'Rocky Degraded Slope / Non-Forest Revenue Land',
    hiddenEcologicalFunctions: [
      'Unfenced predator–prey movement corridors linking snow leopard (Panthera uncia), blue sheep (bharal), Asiatic ibex, Tibetan argali, and Eurasian lynx habitats',
      'Ultra-low light-pollution nocturnal skies at Hanle supporting both astronomical science and nocturnal/crepuscular desert fauna',
      'Ephemeral snow-patch micro-catchments recharging valley-floor alluvial springs',
    ],
    keyIndicatorTaxaOrSystems: 'Snow leopard · Pallas’s cat · Tibetan wolf · Bharal · Asiatic ibex',
    infrastructureSensitivity:
      'Linear highway fencing, high-intensity floodlighting, quarry blasting, and linear transmission corridors sever wide-ranging carnivore dispersal.',
  },
  {
    id: 'pangong-nubra-suru',
    landscape: 'Pangong Tso, Nubra Sand-Dune Scrub & Suru–Zanskar Subalpine Fans',
    conventionalLabel: 'Arid Alluvial Gravel Fan',
    hiddenEcologicalFunctions: [
      'Sea-buckthorn (Hippophae) nitrogen-fixing riparian belts stabilizing braided glacial outwash channels',
      'Alluvial fan recharge zones feeding downstream village springs and gravity kuhls/yuras',
      'Trans-Himalayan migratory stopover pockets across the Central Asian Flyway',
    ],
    keyIndicatorTaxaOrSystems: '65 high-concern Ladakh avian taxa · Eurasian otter (Indus/Shyok) · Brown bear (Zanskar/Drass)',
    infrastructureSensitivity:
      'Lakeside commercial sprawl, diesel generators, and gravel extraction alter shoreline geomorphology and shallow littoral water quality.',
  },
];

export function LadakhEcologicalFrontiersWorkbench({
  variant = 'editorial',
  defaultTab = 'cryosphere',
}: LadakhEcologicalFrontiersWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<
    'cryosphere' | 'carrying_capacity' | 'ecological_integrity'
  >(defaultTab);

  // Tab 1: Cryospheric Meltwater Timing & Oasis Water Security Model (Investigation 01)
  // Grounded in 2026 synthesis: ~0.02°C/yr warming, -0.21 to -0.37 m w.e./yr mass loss
  const [massLossMweYr, setMassLossMweYr] = useState<number>(0.29); // midpoint of 0.21–0.37 m w.e./yr
  const [meltShiftDaysEarlier, setMeltShiftDaysEarlier] = useState<number>(18);
  const [smallCirqueDependencyPct, setSmallCirqueDependencyPct] = useState<number>(70);
  const [iceStupaBufferPct, setIceStupaBufferPct] = useState<number>(12);

  // Tab 2: Cold-Desert Seasonal Carrying Capacity Model (Investigation 02)
  const [residentPop, setResidentPop] = useState<number>(45000); // Leh urban/peri-urban order-of-magnitude scenario
  const [peakDailyVisitors, setPeakDailyVisitors] = useState<number>(18000);
  const [visitorWaterLpd, setVisitorWaterLpd] = useState<number>(180);
  const [residentWaterLpd, setResidentWaterLpd] = useState<number>(55);
  const [plasticCompliancePct, setPlasticCompliancePct] = useState<number>(45);

  // Tab 3: Ecological Integrity Unit Selector (Investigation 03)
  const [selectedUnitId, setSelectedUnitId] = useState<string>(COLD_DESERT_LANDSCAPE_UNITS[0].id);

  const cryosphereMetrics = useMemo(() => {
    // Conceptual hydrological timing deficit index for April–June sowing/irrigation window
    const decadalLossMwe = massLossMweYr * 10;
    const timingMismatchPct = Math.min(
      68,
      Math.round(meltShiftDaysEarlier * 1.15 + (smallCirqueDependencyPct - 40) * 0.32)
    );
    const netSowingDeficitPct = Math.max(0, timingMismatchPct - iceStupaBufferPct);
    let riskLabel = 'Moderate Seasonal Timing Shift';
    if (netSowingDeficitPct >= 30) {
      riskLabel = 'Acute Early-Summer Churpon Irrigation Deficit';
    } else if (netSowingDeficitPct >= 18) {
      riskLabel = 'High Oasis Melt-Timing Vulnerability';
    }
    return {
      decadalLossMwe,
      timingMismatchPct,
      netSowingDeficitPct,
      riskLabel,
    };
  }, [massLossMweYr, meltShiftDaysEarlier, smallCirqueDependencyPct, iceStupaBufferPct]);

  const carryingMetrics = useMemo(() => {
    const pressureRatio = residentPop > 0 ? peakDailyVisitors / residentPop : 0;
    const residentMld = (residentPop * residentWaterLpd) / 1_000_000;
    const visitorMld = (peakDailyVisitors * visitorWaterLpd) / 1_000_000;
    const totalPeakMld = residentMld + visitorMld;
    const visitorWaterSharePct = totalPeakMld > 0 ? (visitorMld / totalPeakMld) * 100 : 0;
    // Wastewater ~80% of water consumed
    const wastewaterMld = totalPeakMld * 0.8;
    // Unmitigated solid waste (~0.85 kg/visitor/day + 0.35 kg/resident/day) adjusted by June 2026 plastic restriction compliance
    const rawVisitorWasteTonnesDay = (peakDailyVisitors * 0.85) / 1000;
    const adjustedVisitorWasteTonnesDay =
      rawVisitorWasteTonnesDay * (1 - (plasticCompliancePct / 100) * 0.32);
    const totalPeakWasteTonnesDay =
      (residentPop * 0.35) / 1000 + adjustedVisitorWasteTonnesDay;

    return {
      pressureRatio,
      residentMld,
      visitorMld,
      totalPeakMld,
      visitorWaterSharePct,
      wastewaterMld,
      totalPeakWasteTonnesDay,
    };
  }, [residentPop, peakDailyVisitors, visitorWaterLpd, residentWaterLpd, plasticCompliancePct]);

  const selectedUnit =
    COLD_DESERT_LANDSCAPE_UNITS.find((u) => u.id === selectedUnitId) ||
    COLD_DESERT_LANDSCAPE_UNITS[0];

  const resetAll = () => {
    setMassLossMweYr(0.29);
    setMeltShiftDaysEarlier(18);
    setSmallCirqueDependencyPct(70);
    setIceStupaBufferPct(12);
    setResidentPop(45000);
    setPeakDailyVisitors(18000);
    setVisitorWaterLpd(180);
    setResidentWaterLpd(55);
    setPlasticCompliancePct(45);
  };

  const isDark = variant === 'observatory';

  return (
    <div
      className="my-10 border p-6 sm:p-8 space-y-6"
      style={{
        borderColor: isDark ? 'rgba(216, 195, 165, 0.35)' : 'var(--hd-rule-strong)',
        backgroundColor: isDark ? '#171717' : 'var(--hd-bg-elevated)',
        color: isDark ? '#F2EFE7' : 'var(--hd-fg)',
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b"
        style={{ borderColor: isDark ? 'rgba(242, 239, 231, 0.16)' : 'var(--hd-rule)' }}
      >
        <div className="space-y-1.5">
          <p
            className="hd-font-sans text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
          >
            LADAKH COLD-DESERT SCIENTIFIC HYPOTHESIS &amp; CARRYING-CAPACITY WORKBENCH
          </p>
          <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
            Cryospheric Water Timing, Seasonal Visitor Stress &amp; Cold-Desert Ecological Functions
          </h3>
          <p
            className="hd-font-body text-xs sm:text-sm leading-relaxed max-w-3xl"
            style={{ color: isDark ? 'rgba(242, 239, 231, 0.78)' : 'var(--hd-fg-secondary)' }}
          >
            Parametric scenario explorer grounded in the 2026 cryospheric synthesis (0.21–0.37 m
            w.e./yr mass loss; ~0.02°C/yr warming), 2026 parliamentary carrying-capacity warnings,
            June 2026 plastic restrictions, September 2026 avian concern records (65 species), and
            2025 Changthang permafrost microbiome findings. Illustrative planning model pending the
            21 proposed field experiments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'cryosphere' as const, label: '01 · Cryosphere & Melt Timing', icon: Snowflake },
            { id: 'carrying_capacity' as const, label: '02 · Carrying Capacity', icon: Users },
            { id: 'ecological_integrity' as const, label: '03 · The Desert Is Not Empty', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase cursor-pointer"
                style={{
                  borderColor: active
                    ? '#8C3125'
                    : isDark
                    ? 'rgba(242, 239, 231, 0.22)'
                    : 'var(--hd-rule)',
                  backgroundColor: active ? '#8C3125' : 'transparent',
                  color: active ? '#F2EFE7' : isDark ? '#D8C3A5' : 'var(--hd-fg-secondary)',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 01: CRYOSPHERIC RETREAT & MELT TIMING */}
      {activeTab === 'cryosphere' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <p
              className="hd-font-body text-xs sm:text-sm italic"
              style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
            >
              Central Hypothesis 01: Changes in the timing and volume of snow and glacier melt may
              undermine Ladakh’s traditional water management systems, even before its glaciers
              disappear.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="hd-font-sans inline-flex items-center gap-1 px-3 py-1.5 border text-[10px] tracking-[0.15em] uppercase shrink-0 cursor-pointer"
              style={{
                borderColor: isDark ? 'rgba(216,195,165,0.4)' : 'var(--hd-rule-strong)',
                color: isDark ? '#D8C3A5' : 'var(--hd-copper)',
              }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Annual glacier mass balance loss (2026 synthesis: 0.21–0.37 m w.e./yr)</span>
                  <span className="font-semibold">−{massLossMweYr.toFixed(2)} m w.e./yr</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.55}
                  step={0.01}
                  value={massLossMweYr}
                  onChange={(e) => setMassLossMweYr(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Earlier spring snowmelt peak shift</span>
                  <span className="font-semibold">{meltShiftDaysEarlier} days earlier</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={35}
                  step={1}
                  value={meltShiftDaysEarlier}
                  onChange={(e) => setMeltShiftDaysEarlier(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Oasis reliance on small high-altitude niche/cirque glaciers</span>
                  <span className="font-semibold">{smallCirqueDependencyPct}%</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={95}
                  step={5}
                  value={smallCirqueDependencyPct}
                  onChange={(e) => setSmallCirqueDependencyPct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Artificial glacier / ice-stupa spring storage buffer</span>
                  <span className="font-semibold">{iceStupaBufferPct}% offset</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={2}
                  value={iceStupaBufferPct}
                  onChange={(e) => setIceStupaBufferPct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: '#8C3125',
                  backgroundColor: isDark ? 'rgba(140,49,37,0.16)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                  10-Year Cumulative Ice Thinning
                </p>
                <p className="hd-font-display text-3xl sm:text-4xl font-semibold">
                  −{cryosphereMetrics.decadalLossMwe.toFixed(2)} m w.e.
                </p>
                <p className="hd-font-body text-xs opacity-80">
                  Regional warming baseline: ~+0.02°C / yr
                </p>
              </div>

              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: isDark ? 'rgba(242,239,231,0.2)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242,239,231,0.04)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                  Net Sowing-Window Timing Gap
                </p>
                <p className="hd-font-display text-3xl sm:text-4xl font-semibold">
                  {cryosphereMetrics.netSowingDeficitPct}%
                </p>
                <p className="hd-font-body text-xs opacity-80">
                  Pre-buffer mismatch: {cryosphereMetrics.timingMismatchPct}%
                </p>
              </div>

              <div
                className="sm:col-span-2 p-4 border space-y-1.5"
                style={{
                  borderColor: isDark ? 'rgba(216,195,165,0.28)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242,239,231,0.03)' : 'var(--hd-bg)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" style={{ color: '#8C3125' }} />
                  <span className="hd-font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {cryosphereMetrics.riskLabel}
                  </span>
                </div>
                <p className="hd-font-body text-xs leading-relaxed opacity-85">
                  Ice stupas and artificial glaciers provide valuable April–May localized grafting
                  and sowing water, yet cannot replace cubic kilometres of multi-decadal cirque ice
                  storage across Zanskar, Suru, Leh, Kargil, Nubra, Drass, and Changthang.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: COLD-DESERT SEASONAL CARRYING CAPACITY */}
      {activeTab === 'carrying_capacity' && (
        <div className="space-y-6">
          <p
            className="hd-font-body text-xs sm:text-sm italic"
            style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
          >
            Central Hypothesis 02: Conventional infrastructure and tourism planning may overestimate
            Ladakh’s development capacity by failing to account for seasonal freshwater
            availability, waste assimilation limits and ecosystem recovery rates.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Host town / corridor resident population</span>
                  <span className="font-semibold">{residentPop.toLocaleString()} residents</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={5000}
                  value={residentPop}
                  onChange={(e) => setResidentPop(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Peak summer daily visitor &amp; transient population</span>
                  <span className="font-semibold">{peakDailyVisitors.toLocaleString()} visitors/day</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={60000}
                  step={2000}
                  value={peakDailyVisitors}
                  onChange={(e) => setPeakDailyVisitors(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>Hotel / heated-bath visitor water use (vs. {residentWaterLpd} L/day resident)</span>
                  <span className="font-semibold">{visitorWaterLpd} L / visitor / day</span>
                </div>
                <input
                  type="range"
                  min={75}
                  max={300}
                  step={15}
                  value={visitorWaterLpd}
                  onChange={(e) => setVisitorWaterLpd(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm hd-font-body">
                  <span>June 2026 single-use plastic &amp; littering restriction enforcement</span>
                  <span className="font-semibold">{plasticCompliancePct}% effective compliance</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={plasticCompliancePct}
                  onChange={(e) => setPlasticCompliancePct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: '#8C3125',
                  backgroundColor: isDark ? 'rgba(140,49,37,0.16)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-sans text-[10px] tracking-[0.15em] uppercase opacity-75">
                  Seasonal Pressure Ratio
                </p>
                <p className="hd-font-display text-3xl font-semibold">
                  {carryingMetrics.pressureRatio.toFixed(2)}×
                </p>
                <p className="hd-font-body text-xs opacity-80">Visitors per local resident</p>
              </div>

              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: isDark ? 'rgba(242,239,231,0.2)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242,239,231,0.04)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-sans text-[10px] tracking-[0.15em] uppercase opacity-75">
                  Peak Freshwater Demand
                </p>
                <p className="hd-font-display text-3xl font-semibold">
                  {carryingMetrics.totalPeakMld.toFixed(2)} MLD
                </p>
                <p className="hd-font-body text-xs opacity-80">
                  Visitor share: {carryingMetrics.visitorWaterSharePct.toFixed(0)}%
                </p>
              </div>

              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: isDark ? 'rgba(242,239,231,0.2)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242,239,231,0.04)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-sans text-[10px] tracking-[0.15em] uppercase opacity-75">
                  Sewage &amp; Solid Waste
                </p>
                <p className="hd-font-display text-3xl font-semibold">
                  {carryingMetrics.wastewaterMld.toFixed(2)} MLD
                </p>
                <p className="hd-font-body text-xs opacity-80">
                  Solid waste: {carryingMetrics.totalPeakWasteTonnesDay.toFixed(1)} t/day
                </p>
              </div>

              <div
                className="sm:col-span-3 p-4 border space-y-1"
                style={{
                  borderColor: isDark ? 'rgba(216,195,165,0.28)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242,239,231,0.03)' : 'var(--hd-bg)',
                }}
              >
                <p className="hd-font-body text-xs leading-relaxed opacity-85">
                  Reflects the 2026 parliamentary committee concern: flush-toilet hotel borewells in
                  Leh, Nubra, and Pangong extract alluvial groundwater at 3×–5× traditional dry-compost
                  (*chakdon*) household consumption, while sub-zero winter temperatures slow microbial
                  sewage and landfill assimilation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 03: THE DESERT IS NOT EMPTY */}
      {activeTab === 'ecological_integrity' && (
        <div className="space-y-5">
          <p
            className="hd-font-body text-xs sm:text-sm italic"
            style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
          >
            Central Hypothesis 03: Landscapes conventionally classified as barren or unproductive may
            perform critical ecological functions that remain inadequately represented in
            infrastructure planning and environmental assessments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {COLD_DESERT_LANDSCAPE_UNITS.map((unit) => {
              const active = unit.id === selectedUnit.id;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setSelectedUnitId(unit.id)}
                  className="text-left p-3.5 border transition-colors cursor-pointer"
                  style={{
                    borderColor: active
                      ? '#8C3125'
                      : isDark
                      ? 'rgba(242,239,231,0.18)'
                      : 'var(--hd-rule)',
                    backgroundColor: active
                      ? isDark
                        ? 'rgba(140,49,37,0.2)'
                        : 'var(--hd-bg)'
                      : 'transparent',
                  }}
                >
                  <p className="hd-font-display text-base font-semibold leading-snug">
                    {unit.landscape}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className="p-5 border space-y-4"
            style={{
              borderColor: isDark ? 'rgba(242,239,231,0.2)' : 'var(--hd-rule-strong)',
              backgroundColor: isDark ? 'rgba(242,239,231,0.03)' : 'var(--hd-bg)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <div>
                <span className="hd-folio-meta block">CONVENTIONAL ADMINISTRATIVE CLASSIFICATION</span>
                <span className="hd-font-body text-sm font-semibold line-through opacity-75">
                  “{selectedUnit.conventionalLabel}”
                </span>
              </div>
              <div className="sm:text-right">
                <span className="hd-folio-meta block">INDICATOR TAXA &amp; MICROBIOMES</span>
                <span className="hd-font-body text-xs sm:text-sm font-semibold" style={{ color: isDark ? '#D8C3A5' : '#8C3125' }}>
                  {selectedUnit.keyIndicatorTaxaOrSystems}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="hd-kicker">DOCUMENTED ECOLOGICAL FUNCTIONS OVERLOOKED BY “WASTELAND” LABELS</p>
              <ul className="space-y-1.5">
                {selectedUnit.hiddenEcologicalFunctions.map((fn, idx) => (
                  <li key={idx} className="hd-font-body text-xs sm:text-sm flex items-start gap-2 leading-relaxed">
                    <span style={{ color: '#8C3125' }}>•</span>
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t flex items-start gap-2 text-xs sm:text-sm" style={{ borderColor: 'var(--hd-rule)' }}>
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#8C3125' }} />
              <p className="hd-font-body leading-relaxed opacity-90">
                <strong>Infrastructure &amp; EIA Vulnerability:</strong>{' '}
                {selectedUnit.infrastructureSensitivity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
