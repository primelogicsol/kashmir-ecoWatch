'use client';

import React from 'react';
import { Microscope, Share2 } from 'lucide-react';
import type {
  DisciplineEquipmentProfile,
  VisualPlateRecord,
} from '@/data/publication-visual-asset-registry';

// ─── 1. CLEAN UNOBSTRUCTED CHAPTER-OPENING PHOTOGRAPH + EDITORIAL HEADER ─────
export function EditorialChapterOpeningSpread({
  chapterNumber = '01',
  editorialHeadline,
  standfirstLead,
  introSummary,
  plate,
  theme = 'dark',
  onShare,
}: {
  chapterNumber?: string;
  editorialHeadline: string;
  standfirstLead: string;
  introSummary?: string;
  plate: VisualPlateRecord;
  theme?: 'dark' | 'parchment';
  onShare?: () => void;
}) {
  const isParchment = theme === 'parchment';
  const spacedChapter = `CHAPTER ${chapterNumber}`.split('').join(' ');

  return (
    <div className="space-y-5">
      {/* Unobstructed 16:9 Environmental Photograph — Zero Badges or Text Overlays */}
      <figure className="overflow-hidden rounded-md border" style={{ borderColor: isParchment ? '#d1c7b7' : '#2b2620' }}>
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#060610]">
          <img
            src={plate.src}
            alt={plate.title}
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption
          className="px-4 py-2.5 text-xs leading-relaxed border-t flex flex-wrap items-baseline justify-between gap-2"
          style={{
            backgroundColor: isParchment ? '#f4f0e8' : '#0d0f17',
            borderColor: isParchment ? '#e5ded3' : '#202535',
            color: isParchment ? '#4a3728' : '#b4b8c2',
          }}
        >
          <span>
            <strong style={{ color: isParchment ? '#120f0d' : '#e5ded3' }}>
              {plate.locationLabel}
            </strong>{' '}
            — {plate.caption}
          </span>
          {plate.isIllustrative && (
            <span
              className="text-[11px] font-mono shrink-0"
              style={{ color: isParchment ? '#736f6b' : '#8a8682' }}
            >
              Illustration
            </span>
          )}
        </figcaption>
      </figure>

      {/* Clean National Geographic × Craftlore Chapter Rubric, Title & Standfirst */}
      <div
        className="flex items-start justify-between gap-4 border-b pb-4"
        style={{ borderColor: isParchment ? '#e5ded3' : '#202535' }}
      >
        <div className="space-y-2 max-w-3xl">
          <div
            className="text-[11px] font-mono font-bold uppercase tracking-[0.22em]"
            style={{ color: isParchment ? '#805a38' : '#c6a87c' }}
          >
            {spacedChapter}
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold leading-tight"
            style={{
              color: isParchment ? '#120f0d' : '#f4f0e8',
              fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
            }}
          >
            {editorialHeadline}
          </h2>
          <p
            className="text-sm sm:text-base italic leading-relaxed"
            style={{
              color: isParchment ? '#4a3728' : '#d0d2da',
              fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
            }}
          >
            {standfirstLead}
          </p>
          {introSummary && (
            <p
              className="text-xs sm:text-sm leading-relaxed pt-0.5"
              style={{ color: isParchment ? '#263442' : '#b4b8c2' }}
            >
              {introSummary}
            </p>
          )}
        </div>

        {onShare && (
          <button
            type="button"
            onClick={onShare}
            title={`Share direct link to Chapter ${chapterNumber}`}
            className="rounded-md border p-1.5 transition-colors print:hidden shrink-0"
            style={{
              borderColor: isParchment ? '#d1c7b7' : '#40382e',
              backgroundColor: isParchment ? '#f4f0e8' : '#080a12',
              color: isParchment ? '#805a38' : '#c6a87c',
            }}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── 2. IMAGE-AND-TEXT SPLIT EDITORIAL FEATURE (ZERO PHOTO OVERLAYS) ─────────
export function EditorialSplitFeature({
  plate,
  eyebrow,
  headline,
  narrativeParagraphs,
  reverse = false,
  theme = 'dark',
}: {
  plate: VisualPlateRecord;
  eyebrow: string;
  headline: string;
  narrativeParagraphs: string[];
  reverse?: boolean;
  theme?: 'dark' | 'parchment';
}) {
  const isParchment = theme === 'parchment';

  return (
    <figure
      className="rounded-lg border overflow-hidden grid grid-cols-1 md:grid-cols-12"
      style={{
        backgroundColor: isParchment ? '#f4f0e8' : '#11131c',
        borderColor: isParchment ? '#d1c7b7' : '#40382e',
      }}
    >
      <div
        className={`md:col-span-6 relative min-h-[250px] bg-[#060610] ${
          reverse ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <img
          src={plate.src}
          alt={plate.title}
          className="h-full w-full object-cover"
        />
      </div>

      <figcaption
        className={`md:col-span-6 p-5 sm:p-6 flex flex-col justify-between space-y-3 ${
          reverse ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <div className="space-y-2.5">
          <div
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
            style={{ color: isParchment ? '#805a38' : '#c6a87c' }}
          >
            {eyebrow}
          </div>
          <h3
            className="text-lg font-bold leading-snug"
            style={{
              color: isParchment ? '#120f0d' : '#f4f0e8',
              fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
            }}
          >
            {headline}
          </h3>
          {narrativeParagraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-xs sm:text-[13.5px] leading-relaxed"
              style={{ color: isParchment ? '#263442' : '#d0d2da' }}
            >
              {p}
            </p>
          ))}
        </div>

        <div
          className="pt-2.5 border-t text-[11px] font-mono flex flex-wrap items-center justify-between gap-2"
          style={{
            borderColor: isParchment ? '#d1c7b7' : '#202535',
            color: isParchment ? '#525252' : '#8a8682',
          }}
        >
          <span>{plate.locationLabel}</span>
          {plate.isIllustrative && <span>Illustration</span>}
        </div>
      </figcaption>
    </figure>
  );
}

// ─── 3. EDITORIAL PULL QUOTATION & SCIENTIFIC EQUIPMENT MANIFEST ─────────────
export function EditorialPullQuoteAndEquipment({
  quote,
  attribution,
  equipmentProfile,
  theme = 'dark',
}: {
  quote: string;
  attribution: string;
  equipmentProfile: DisciplineEquipmentProfile;
  theme?: 'dark' | 'parchment';
}) {
  const isParchment = theme === 'parchment';

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Pull Quotation Derived Directly from Report Content */}
      <blockquote
        className="md:col-span-7 rounded-lg border-l-4 border p-5 sm:p-6 flex flex-col justify-between"
        style={{
          backgroundColor: isParchment ? '#f4efe6' : '#161923',
          borderColor: isParchment ? '#d1c7b7' : '#202535',
          borderLeftColor: isParchment ? '#805a38' : '#c6a87c',
        }}
      >
        <p
          className="text-base sm:text-lg italic leading-relaxed"
          style={{
            color: isParchment ? '#120f0d' : '#f4f0e8',
            fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <footer
          className="mt-4 text-[11px] font-mono uppercase tracking-wider"
          style={{ color: isParchment ? '#805a38' : '#c6a87c' }}
        >
          — {attribution}
        </footer>
      </blockquote>

      {/* Discipline-Specific Scientific Instrumentation Card */}
      <div
        className="md:col-span-5 rounded-lg border p-5 space-y-2.5 text-xs"
        style={{
          backgroundColor: isParchment ? '#f4f0e8' : '#11131c',
          borderColor: isParchment ? '#d1c7b7' : '#40382e',
        }}
      >
        <div
          className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider"
          style={{ color: isParchment ? '#0284c7' : '#38bdf8' }}
        >
          <Microscope className="h-3.5 w-3.5" />
          <span>{equipmentProfile.discipline}</span>
        </div>
        <div className="space-y-1">
          <div className="font-semibold" style={{ color: isParchment ? '#120f0d' : '#f4f0e8' }}>
            Matched Field &amp; Analytical Instrumentation:
          </div>
          <ul
            className="list-disc pl-4 space-y-1 leading-snug"
            style={{ color: isParchment ? '#263442' : '#d0d2da' }}
          >
            {equipmentProfile.fieldInstruments.slice(0, 2).map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
            <li>{equipmentProfile.laboratoryAndComputationalSystems[0]}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── 4. VECTOR SCIENTIFIC PROCESS & MECHANISM DIAGRAM (CRAFTLORE PALETTE) ────
export function ScientificProcessDiagramSvg({
  diagramType,
  code,
  theme = 'dark',
}: {
  diagramType:
    | 'pashmina_lifecycle'
    | 'cryosphere_mass_balance'
    | 'aquatic_trophic_cascade'
    | 'biodiversity_corridor'
    | 'geohazard_cascade'
    | 'atmospheric_inversion'
    | 'contaminant_pathway'
    | 'observatory_architecture';
  code: string;
  theme?: 'dark' | 'parchment';
}) {
  const isParchment = theme === 'parchment';

  const diagramConfigs: Record<
    typeof diagramType,
    {
      title: string;
      subtitle: string;
      stages: Array<{ step: string; title: string; metric: string; detail: string }>;
    }
  > = {
    pashmina_lifecycle: {
      title: 'Cradle-to-Gate Ecological & Material-Flow Architecture of Kashmir Pashmina',
      subtitle: 'Elevation, Thermal, Hydrological & Embodied-Carbon Transect (4,500 m Changthang → 1,585 m Srinagar)',
      stages: [
        { step: 'STAGE 01 · 4,500 m', title: 'Changthang Steppe Grazing', metric: '−25 °C Trigger', detail: 'Kobresia–Caragana forage & rotational winter pasture carrying capacity' },
        { step: 'STAGE 02 · SPRING', title: 'Ethical Comb Harvesting', metric: '12–15.5 μm', detail: 'Non-lethal spring moulting comb-out; manual guard-hair separation' },
        { step: 'STAGE 03 · SRINAGAR', title: 'Reetha Botanical Scouring', metric: 'Zero Acid Bath', detail: 'Biodegradable Sapindus saponin wash preserving fibre cuticle scales' },
        { step: 'STAGE 04 · KINETIC', title: 'Yender & Handloom Weaving', metric: '~0.0 kWh Grid', detail: 'Human kinetic spinning & Kani/handloom weaving (near-zero operational CO2e)' },
        { step: 'STAGE 05 · PASSPORT', title: 'Botanical Dye & GI Ledger', metric: 'Zero Azo / Cr', detail: 'Walnut-hull/madder dyeing + Craftlore Digital Passport traceability' },
      ],
    },
    cryosphere_mass_balance: {
      title: 'Western Himalayan Cryosphere Mass-Balance & Downstream Meltwater Partitioning',
      subtitle: 'Accumulation → Equilibrium Line Altitude (ELA) Migration → Proglacial Runoff Cascade',
      stages: [
        { step: 'ZONE 01 · >4,800 m', title: 'Winter WD Snow Accumulation', metric: 'SWE Recharge', detail: 'Synoptic Western Disturbance solid precipitation input' },
        { step: 'ZONE 02 · 4,200 m', title: 'Upward ELA Migration', metric: '+Albedo Forcing', detail: 'Black carbon & spring warming reduce snow/ice spectral albedo' },
        { step: 'ZONE 03 · TONGUE', title: 'Debris-Mantled Ablation', metric: 'DEM Lowering', detail: 'Supraglacial ponds & differential ice-cliff backwasting' },
        { step: 'ZONE 04 · CIRQUE', title: 'Proglacial Lake Storage', metric: 'Moraine Stress', detail: 'Meltwater retention behind unconsolidated terminal moraines' },
        { step: 'ZONE 05 · BASIN', title: 'Summer Baseflow Security', metric: 'δ18O Mixing', detail: 'Glacier + snow + karst spring partitioning in Jhelum tributaries' },
      ],
    },
    aquatic_trophic_cascade: {
      title: 'Lacustrine Residence-Time, Nutrient Flux & Hypolimnetic Oxygen Mechanism',
      subtitle: 'Catchment Loading → Photic Zone Assimilation → Benthic Sediment Feedback',
      stages: [
        { step: 'FLUX 01 · INFLOW', title: 'Catchment Nutrient Pulse', metric: 'NO3-N / TP', detail: 'Seasonal tributary & diffused unsewered shoreline inputs' },
        { step: 'FLUX 02 · PHOTIC', title: 'Phytoplankton Succession', metric: 'Chl-a / PAR', detail: 'Shift from diatoms/charophytes to buoyant cyanobacteria' },
        { step: 'FLUX 03 · THERMOCLINE', title: 'Thermal Stratification', metric: 'ΔT Stability', detail: 'Summer density barrier restricts vertical dissolved-oxygen mixing' },
        { step: 'FLUX 04 · BENTHIC', title: 'Sediment Internal Release', metric: 'DO < 2 mg/L', detail: 'Anoxic Fe-bound phosphorus mobilization from lakebed muck' },
        { step: 'FLUX 05 · INTERVENTION', title: 'Bio-Swale & Sewer Intercept', metric: 'Load Cut >60%', detail: 'Constructed wetland margins & closed-loop vacuum sanitation' },
      ],
    },
    biodiversity_corridor: {
      title: 'Elevation Niche Connectivity, Corridor Bottlenecks & Demographic Viability',
      subtitle: 'Seasonal Vertical Migration & Genetic Gene-Flow Architecture',
      stages: [
        { step: 'CORE 01 · SUMMER', title: 'Alpine Grazing Refugia', metric: '3,300–4,200 m', detail: 'High-nutrition subalpine birch & alpine meadow calving habitats' },
        { step: 'LINK 02 · CORRIDOR', title: 'Montane Forest Ridges', metric: 'Least-Cost Path', detail: 'Structural canopy continuity across valley bottlenecks' },
        { step: 'CORE 03 · WINTER', title: 'Riverine Broadleaf Cover', metric: '1,700–2,200 m', detail: 'Thermal shelter & winter browse in oak/Parrotiopsis valleys' },
        { step: 'RISK 04 · BARRIER', title: 'Linear & Grazing Friction', metric: 'F_ST Isolation', detail: 'Road cuts, feral dog predation & livestock forage competition' },
        { step: 'ACTION 05 · VIABILITY', title: 'Corridor & Core Protection', metric: 'SECR + eDNA', detail: 'Validated camera-trap recruitment & corridor permeability restoration' },
      ],
    },
    geohazard_cascade: {
      title: 'Multi-Hazard Himalayan Process Cascade: Tectonic, Slope & Hydrodynamic Coupling',
      subtitle: 'Trigger Conditioning → Slope/Moraine Failure → Valley-Floor Exposure',
      stages: [
        { step: 'FACTOR 01 · LITHOLOGY', title: 'Structural Conditioning', metric: 'Fault / Slope', detail: 'Fractured thrust zones, Karewa scarps & thawing permafrost' },
        { step: 'FACTOR 02 · TRIGGER', title: 'Extreme Hydromet / Seismic', metric: 'I–D Threshold', detail: 'Cloudburst intensity-duration exceedance or seismic PGA amplification' },
        { step: 'FACTOR 03 · MOBILIZATION', title: 'Debris / Landslide Surge', metric: 'InSAR mm/yr', detail: 'Rapid slope detachment, channel damming, or moraine overtopping' },
        { step: 'FACTOR 04 · ROUTING', title: '2D Flood Wave Propagation', metric: 'Peak Q (m³/s)', detail: 'Confined gorge attenuation vs low-gradient floodplain backwater' },
        { step: 'FACTOR 05 · RESILIENCE', title: 'Early Warning & Setback', metric: 'Lead-Time SLA', detail: 'Automated gauge telemetry, setback zoning & lifeline redundancy' },
      ],
    },
    atmospheric_inversion: {
      title: 'Intermontane Valley Winter Boundary-Layer Inversion & Aerosol Forcing Mechanism',
      subtitle: 'Topographic Cold-Air Pooling → Emission Trapping → Cryosphere Deposition',
      stages: [
        { step: 'SYNOPTIC 01', title: 'bowl Cold-Air Drainage', metric: 'Pir Panjal–Zanskar', detail: 'Radiative night cooling forms stable inversion lid over valley floor' },
        { step: 'EMISSION 02', title: 'Multi-Source Combustion', metric: 'PM2.5 / BC / NO2', detail: 'Transport diesel, biomass heating, brick kilns & road dust' },
        { step: 'TRAPPING 03', title: 'Shallow Mixing Depth', metric: '<250 m PBL', detail: 'Suppressed vertical dispersion elevates multi-day exposure peaks' },
        { step: 'TRANSPORT 04', title: 'Upslope Valley Breeze', metric: 'Aerosol Plume', detail: 'Daytime anabatic transport carries light-absorbing carbon upslope' },
        { step: 'CRYOSPHERE 05', title: 'Snow Spectral Darkening', metric: '−ΔAlbedo (W/m²)', detail: 'Accelerated spring snowmelt & radiative forcing on alpine ice' },
      ],
    },
    contaminant_pathway: {
      title: 'Source-Pathway-Receptor Contaminant Mass-Balance & Analytical Verification',
      subtitle: 'Input Inventory → Vadose/Channel Transport → Accredited Laboratory Assay',
      stages: [
        { step: 'SOURCE 01', title: 'Point & Non-Point Inputs', metric: 'kg / ha or MLD', detail: 'Agrochemical drift, untreated sewage, or hazardous leachate' },
        { step: 'PATHWAY 02', title: 'Hydrological Mobilization', metric: 'Runoff / Percolation', detail: 'Spring snowmelt & irrigation drainage transport across Karewas' },
        { step: 'PARTITION 03', title: 'Sediment & Biota Sorption', metric: 'K_d / Log K_ow', detail: 'Persistence in fine benthic silts & trophic bioaccumulation' },
        { step: 'ASSAY 04', title: 'ICP-MS / UHPLC-MS/MS', metric: 'QA/QC Blanks', detail: 'Direct laboratory quantification (never extrapolated from satellites)' },
        { step: 'BARRIER 05', title: 'Source Substitution & CETP', metric: ' statutory Limit', detail: 'Closed-loop treatment, IPM buffers & potable intake protection' },
      ],
    },
    observatory_architecture: {
      title: 'Kashmir EcoWatch 8-Tier Reproducible Scientific Intelligence Architecture',
      subtitle: 'Multi-Sensor Ingestion → Ground Calibration → Provenance Grading → Open Publication',
      stages: [
        { step: 'TIER 01 · ORBITAL', title: 'Harmonized EO Archives', metric: '1972–2026', detail: 'Landsat, Sentinel-1/2/5P, MODIS/VIIRS, ERA5 & Copernicus DEM' },
        { step: 'TIER 02 · IN-SITU', title: 'Field & Lab Calibration', metric: 'APHA / ISO QC', detail: 'Gauges, sondes, quadrats, camera traps & accredited spectrometry' },
        { step: 'TIER 03 · PROVENANCE', title: 'Epistemic Grading', metric: '8 Provenance Tiers', detail: 'Separating measured, satellite, modelled, literature & unavailable' },
        { step: 'TIER 04 · SCOPE', title: '100-Dossier Non-Duplication', metric: '23 Sectors', detail: 'Unique research question & many-to-many module linkage' },
        { step: 'TIER 05 · OPEN DATA', title: 'Synchronized HTML + PDF', metric: 'FAIR CC BY 4.0', detail: 'Verifiable monographs, CSV/XLSX/GeoJSON & PIL accountability' },
      ],
    },
  };

  const cfg = diagramConfigs[diagramType];

  return (
    <div
      className="rounded-lg border p-5 sm:p-6 space-y-4"
      style={{
        backgroundColor: isParchment ? '#f4f0e8' : '#11131c',
        borderColor: isParchment ? '#d1c7b7' : '#40382e',
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3" style={{ borderColor: isParchment ? '#d1c7b7' : '#202535' }}>
        <div>
          <div
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
            style={{ color: isParchment ? '#805a38' : '#c6a87c' }}
          >
            Explanatory Scientific Illustration · {code}
          </div>
          <h3
            className="text-base sm:text-lg font-bold mt-0.5"
            style={{
              color: isParchment ? '#120f0d' : '#f4f0e8',
              fontFamily: 'var(--font-craftlore-serif), Georgia, Cambria, serif',
            }}
          >
            {cfg.title}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: isParchment ? '#525252' : '#b4b8c2' }}>
            {cfg.subtitle}
          </p>
        </div>
        <span
          className="rounded-sm border px-2 py-0.5 text-[10px] font-mono"
          style={{
            borderColor: isParchment ? '#d1c7b7' : '#40382e',
            color: isParchment ? '#805a38' : '#c6a87c',
          }}
        >
          Vector Process Schematic
        </span>
      </div>

      {/* 5-Stage Connected Vector Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {cfg.stages.map((st, idx) => (
          <div
            key={idx}
            className="relative rounded-md border p-3.5 flex flex-col justify-between space-y-2"
            style={{
              backgroundColor: isParchment ? '#faf8f5' : '#080a12',
              borderColor: isParchment ? '#d1c7b7' : '#202535',
            }}
          >
            <div className="space-y-1">
              <div
                className="text-[10px] font-mono font-bold uppercase tracking-wider"
                style={{ color: isParchment ? '#805a38' : '#c6a87c' }}
              >
                {st.step}
              </div>
              <div
                className="text-xs font-bold leading-snug"
                style={{ color: isParchment ? '#120f0d' : '#f4f0e8' }}
              >
                {st.title}
              </div>
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: isParchment ? '#263442' : '#b4b8c2' }}
              >
                {st.detail}
              </p>
            </div>
            <div
              className="pt-2 border-t text-[10px] font-mono font-bold"
              style={{
                borderColor: isParchment ? '#e5ded3' : '#161923',
                color: isParchment ? '#0284c7' : '#38bdf8',
              }}
            >
              {st.metric}
            </div>
          </div>
        ))}
      </div>

      <div
        className="text-[10px] font-mono flex flex-wrap items-center justify-between gap-2 pt-1"
        style={{ color: isParchment ? '#525252' : '#8a8682' }}
      >
        <span>Provenance: Conceptual Scientific Process Diagram (Vector)</span>
        <span>KEW × Craftlore Scientific Visual Standard</span>
      </div>
    </div>
  );
}
