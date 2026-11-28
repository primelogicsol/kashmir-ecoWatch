import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bird,
  BookOpen,
  CheckCircle2,
  Compass,
  Database,
  Eye,
  FileSpreadsheet,
  Globe2,
  Layers,
  MapPin,
  Mic,
  Radio,
  Scale,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getBiodiversityData } from '@/data/biodiversity';
import { GEOGRAPHY } from '@/data/geography';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Avian Intelligence Observatory — Transboundary Bird & Flyway Science | Kashmir EcoWatch',
  description:
    'Permanent 12-module ornithological intelligence programme reconciling Western Himalayan bird checklists across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan, auditing KEW’s 601-species registry, and tracking Central Asian Flyway refugia.',
  canonicalPath: '/biodiversity/birds/avian-intelligence-observatory',
  imagePath: '/images/biodiversity/biodiversity-birds-wetland.jpg',
});

const REGIONAL_CHECKLIST_RECONCILIATION = [
  {
    region: 'Kashmir Valley',
    reportedSpecies: '300+',
    source: 'Peer-reviewed regional checklists & wetland/forest syntheses',
    taxonomicBackbone: 'Mixed regional checklists (Ali & Ripley / Grimmett / eBird)',
    reconciliationNote:
      'Reflects temperate basin, Ramsar wetlands, and surrounding Pir Panjal / Greater Himalayan slopes; excludes subtropical Jammu plains and Trans-Himalayan Changthang.',
  },
  {
    region: 'Jammu & Kashmir (UT)',
    reportedSpecies: '592',
    source: '2024 peer-reviewed annotated checklist of birds of Jammu & Kashmir',
    taxonomicBackbone: 'eBird / Clements & IOC harmonized regional synthesis',
    reconciliationNote:
      'Spans subtropical Shiwalik foothills (Gharana, Surinsar-Mansar) to temperate and alpine Kashmir basins; requires ongoing vagrant vs. regular breeder separation.',
  },
  {
    region: 'Ladakh (SACON–WII)',
    reportedSpecies: '464',
    source: 'SACON–WII comprehensive avifaunal assessment (September 2026)',
    taxonomicBackbone: 'Verified primary field, specimen & vetted citizen-science synthesis',
    reconciliationNote:
      'Strict evidentiary filtering of Trans-Himalayan breeders, passage migrants across Indus/Shyok/Zanskar valleys, and high-altitude Changthang wetland specialists.',
  },
  {
    region: 'Ladakh (Avibase)',
    reportedSpecies: '512',
    source: 'Avibase regional database (Clements 2025 taxonomy)',
    taxonomicBackbone: 'Clements Checklist of Birds of the World (2025)',
    reconciliationNote:
      'Higher count (+48 vs. SACON–WII) reflects broader historical inclusions, unconfirmed boundary records, and taxonomic splits.',
  },
  {
    region: 'Azad Jammu & Kashmir',
    reportedSpecies: '552',
    source: 'Avibase regional checklist (Howard & Moore taxonomy)',
    taxonomicBackbone: 'Howard & Moore Complete Checklist of the Birds of the World',
    reconciliationNote:
      'Covers Mangla wetland complex upward through Neelum/Kishanganga and Jhelum temperate-subalpine forests; shares high migratory overlap with J&K and Punjab foothills.',
  },
  {
    region: 'Gilgit-Baltistan',
    reportedSpecies: '~362',
    source: 'Published regional ornithological surveys & Karakoram-Hindukush syntheses',
    taxonomicBackbone: 'Roberts (Birds of Pakistan) & contemporary Karakoram survey updates',
    reconciliationNote:
      'Substantially under-surveyed across winter gorges, side valleys, and nocturnal/acoustic guilds; Indus corridor serves as a primary trans-mountain flyway bottleneck.',
  },
  {
    region: 'KEW Western Himalayan Registry',
    reportedSpecies: '601',
    source: 'Kashmir EcoWatch platform avifaunal database (/biodiversity/birds)',
    taxonomicBackbone: 'Composite multi-region operational schema (under active audit)',
    reconciliationNote:
      'Working cross-regional platform baseline requiring species-by-species synonymy deduplication, strict IUCN Red List re-verification, and district polygon standardization.',
  },
];

const OBSERVATORY_MODULES_12 = [
  {
    code: 'MODULE 01',
    title: 'Verified Avian Registry',
    icon: Database,
    status: 'Active Reconciliation',
    summary:
      'Species-by-species taxonomic harmonization mapping IOC, Clements/eBird, BirdLife/HBW, and Howard & Moore binomials across all five Western Himalayan jurisdictions.',
    deliverable:
      'Audited master species table separating confirmed breeders, winter visitors, passage migrants, historical records, and unverified vagrants.',
  },
  {
    code: 'MODULE 02',
    title: 'Migration Intelligence',
    icon: Globe2,
    status: 'Protocol Established',
    summary:
      'Tracks multi-system Central Asian Flyway corridors (~30 nations) distinguishing high-altitude trans-Karakoram/Himalayan crossers from Indus, Jhelum, and Chenab river-gorge funnel migrants.',
    deliverable:
      'Seasonal arrival/departure phenology curves integrated with pass-level wind, snow-cover, and satellite telemetry archives.',
  },
  {
    code: 'MODULE 03',
    title: 'Population Trends & Census Calibration',
    icon: Activity,
    status: 'Active Audit',
    summary:
      'Separates true biological population recovery from observer-effort expansion and habitat-loss refugia crowding (testing the 813,043 [2020] to 1,343,506 [2025] waterbird paradox and ~96% 4-wetland concentration).',
    deliverable:
      'Effort-standardized waterbird density indices and tracking of the pending Feb 12, 2026 27-wetland / 58-point AWC species matrix.',
  },
  {
    code: 'MODULE 04',
    title: 'Acoustic Monitoring',
    icon: Mic,
    status: 'Pilot Specification',
    summary:
      'Passive autonomous bioacoustic sensor protocols for cryptic dawn-chorus galliformes (Western Tragopan), nocturnal owls, reedbed warblers, and urban noise-masking studies.',
    deliverable:
      'Calibrated Western Himalayan vocalization reference library and automated call-density occupancy pipelines.',
  },
  {
    code: 'MODULE 05',
    title: 'Habitat Change Detection',
    icon: Layers,
    status: 'Earth Observation Linked',
    summary:
      'Couples Sentinel-1 SAR open-water masks and Sentinel-2 NDVI/reedbed indices with riverbed boulder-mining footprints, orchard conversion, and subalpine birch-fir fragmentation.',
    deliverable:
      'Wetland hydro-period stability maps and treeline ecotone habitat-integrity scores for every Important Bird and Biodiversity Area (IBA).',
  },
  {
    code: 'MODULE 06',
    title: 'Breeding Intelligence',
    icon: Bird,
    status: 'Protocol Established',
    summary:
      'Monitors elevation-band breeding microhabitats: deciduous cavity trees for Kashmir Flycatcher, braided shingle islands for Ibisbill, and Changthang sedge marshes for Black-necked Crane.',
    deliverable:
      'Nesting-window disturbance calendars guiding hydropower flushing, riverbed mining moratoria, and grazing/dog management.',
  },
  {
    code: 'MODULE 07',
    title: 'Avian Mortality Registry',
    icon: ShieldAlert,
    status: 'Framework Active',
    summary:
      'Standardized necropsy and incident ledger recording HV transmission/distribution wire collisions, electrocutions, veterinary NSAID poisoning, orchard pesticide die-offs, and HPAI outbreaks.',
    deliverable:
      'Georeferenced mortality hotspot layer for powerline bird-diverter retrofits and veterinary toxicology enforcement.',
  },
  {
    code: 'MODULE 08',
    title: 'Threat Intelligence',
    icon: AlertTriangle,
    status: '15 Pathways Indexed',
    summary:
      'Quantifies cumulative exposure across 15 anthropogenic stressors—from wetland encroachment, feral dogs, and artificial light at night (ALAN) to solid waste and invasive macrophytes.',
    deliverable:
      'Composite guild-specific threat exposure matrices for Ramsar wetlands, river corridors, temperate forests, and alpine pastures.',
  },
  {
    code: 'MODULE 09',
    title: 'Validated Citizen Science',
    icon: Eye,
    status: 'Quality Gate Protocol',
    summary:
      'Integrates complete-checklist eBird/bird-club observations using effort covariates (duration, distance, observer skill) while enforcing strict anti-playback and nest-privacy ethics.',
    deliverable:
      'Bias-corrected occupancy estimates and sensitive-species coordinate masking for threatened pheasants, raptors, and cranes.',
  },
  {
    code: 'MODULE 10',
    title: 'Regional Bird Research Archive',
    icon: BookOpen,
    status: 'Bibliographic Indexing',
    summary:
      'Synthesizes 150+ years of ornithological records—from Bates & Lowther and Osmaston to the 2024 J&K 592-species checklist, 2025 Zanskar 81-species year-round study, and 2026 SACON–WII Ladakh synthesis.',
    deliverable:
      'Searchable historical-to-modern baseline ledger countering Shifting Baseline Syndrome across valleys and elevation bands.',
  },
  {
    code: 'MODULE 11',
    title: 'Multilingual Bird Knowledge',
    icon: Users,
    status: 'Ethno-Ornithology',
    summary:
      'Preserves vernacular bird names, seasonal proverbs, and ecological observations across Kashmiri, Dogri, Ladakhi, Balti, Purgi, Pahari, Gojri, Shina, Burushaski, and Wakhi.',
    deliverable:
      'Open community field guides linking local cultural recognition directly to household, orchard, and village habitat stewardship.',
  },
  {
    code: 'MODULE 12',
    title: 'Conservation Outcome Audit',
    icon: Scale,
    status: 'Accountability Ledger',
    summary:
      'Evaluates whether wetland management plans, Ramsar designations, compensatory afforestation, and Wildlife Protection Act schedules yield verifiable avian recovery.',
    deliverable:
      'Annual public scorecard comparing statutory conservation expenditure against empirical breeding and wetland-dispersion outcomes.',
  },
];

const FLAGSHIP_INDICATORS_8 = [
  {
    commonName: 'Kashmir Flycatcher',
    scientificName: 'Ficedula subrubra',
    iucn: 'Vulnerable (VU)',
    guild: 'Restricted-Range Temperate Breeder',
    ecologicalSignal:
      'Breeds almost exclusively in Western Himalayan temperate deciduous/mixed forests with densehazel-parrotiopsis understory before wintering in Sri Lanka and the Western Ghats; acute indicator of understory clearing and cavity-tree loss.',
  },
  {
    commonName: 'Western Tragopan',
    scientificName: 'Tragopan melanocephalus',
    iucn: 'Vulnerable (VU)',
    guild: 'Undisturbed Temperate-Subalpine Forest Specialist',
    ecologicalSignal:
      'Known locally as Jujurana / Daangeer across Kashmir, Kishtwar, Neelum (AJ&K), and Kohistan/Kaghan fringes; fragments rapidly when roads, non-timber harvest, or spring grazing penetrate moist conifer-broadleaf interiors.',
  },
  {
    commonName: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    iucn: 'Least Concern (Regional Poaching/Shift Sentinel)',
    guild: 'Altitudinal Migrant (Subalpine–Temperate)',
    ecologicalSignal:
      'Descends from alpine meadows into oak-conifer belts during heavy snow; tracks winter snowline volatility, crest-feather poaching pressure, and intact vertical forest connectivity.',
  },
  {
    commonName: 'Black-necked Crane',
    scientificName: 'Grus nigricollis',
    iucn: 'Near Threatened (NT)',
    guild: 'Trans-Himalayan High-Altitude Wetland Breeder',
    ecologicalSignal:
      'Breeds on Changthang freshwater marshes (Tsokar, Hanley, Tsomoriri, Chushul); directly registers unregulated off-road tourism, free-ranging dog predation on chicks, and glacial-melt hydro-period shifts.',
  },
  {
    commonName: 'Bar-headed Goose',
    scientificName: 'Anser indicus',
    iucn: 'Least Concern (High-Altitude Flyway Sentinel)',
    guild: 'Trans-Himalayan Physiological Migrant',
    ecologicalSignal:
      'Crosses the highest mountain barrier on Earth between Tibetan/Ladakh breeding lakes and South Asian wintering wetlands (including Gharana and Kashmir lakes); exposes flyway wetland compression.',
  },
  {
    commonName: 'Orange Bullfinch',
    scientificName: 'Pyrrhula aurantiaca',
    iucn: 'Least Concern (Restricted Western Himalayan Endemic)',
    guild: 'Subalpine Fir-Birch Canopy & Forest-Edge Specialist',
    ecologicalSignal:
      'Confined to the Western Himalayan arc across Kashmir, Jammu mountains, AJ&K, and Gilgit-Baltistan; sensitive to birch-fir treeline regeneration failure.',
  },
  {
    commonName: 'Bearded Vulture (Lammergeier)',
    scientificName: 'Gypaetus barbatus',
    iucn: 'Near Threatened (NT)',
    guild: 'High-Mountain Cliff Scavenger',
    ecologicalSignal:
      'Bone-specialist soaring across transboundary ridges; diagnoses veterinary NSAID contamination in livestock carcasses, poison baiting, and high-tension powerline collision corridors.',
  },
  {
    commonName: 'Ibisbill',
    scientificName: 'Ibidorhyncha struthersii',
    iucn: 'Least Concern (Specialized Riverine Shingle Breeder)',
    guild: 'Glacial-Fed Braided Cobble River Specialist',
    ecologicalSignal:
      'Camouflaged breeder on unsubmerged cobble islands of Sind, Lidder, Kishanganga/Neelum, Zanskar, and Shyok rivers; wiped out locally by mechanized riverbed boulder mining and hydropeaking surges.',
  },
];

export default function AvianIntelligenceObservatoryPage() {
  const birds = getBiodiversityData.birds.all();
  const totalCount = birds.length;
  const threatenedCount = birds.filter((s) =>
    ['CR', 'EN', 'VU'].includes(s.conservationStatus)
  ).length;
  const broadEndemicCount = birds.filter(
    (s) =>
      s.endemismStatus &&
      (s.endemismStatus.includes('endemic') ||
        s.endemismStatus.includes('kashmir') ||
        s.endemismStatus.includes('himalayan'))
  ).length;
  const strictKashmirEndemics = birds.filter(
    (s) => s.endemismStatus === 'kashmir-endemic'
  ).length;
  const passerinesCount = birds.filter(
    (s) =>
      s.category?.includes('Passerine') ||
      s.category?.includes('Songbird') ||
      s.category?.includes('Flycatcher')
  ).length;
  const waterfowlCount = birds.filter(
    (s) =>
      s.category?.includes('Waterfowl') ||
      s.category?.includes('Wetland') ||
      s.habitats.some((h) => h.includes('Wetland') || h.includes('Ramsar'))
  ).length;
  const raptorsCount = birds.filter(
    (s) =>
      s.category?.includes('Raptor') ||
      s.category?.includes('Eagle') ||
      s.category?.includes('Vulture') ||
      s.category?.includes('Owl')
  ).length;
  const alpineCount = birds.filter(
    (s) =>
      s.category?.includes('Alpine') ||
      s.habitats.some((h) => h.includes('Alpine') || h.includes('Scree'))
  ).length;
  const pheasantsCount = birds.filter(
    (s) => s.category?.includes('Pheasant') || s.category?.includes('Galliformes')
  ).length;

  const allDistrictUnits = Array.from(
    new Set([
      ...GEOGRAPHY.units['Kashmir Core'],
      ...GEOGRAPHY.units['Jammu'],
      ...GEOGRAPHY.units['Ladakh'],
      ...GEOGRAPHY.units['AJK'],
      ...GEOGRAPHY.units['Gilgit-Baltistan'],
    ])
  );

  const kewAuditRows = [
    {
      metric: `Total Tracked Taxa (${totalCount})`,
      currentDisplay: `${totalCount} bird records in /biodiversity/birds`,
      scientificAuditFinding:
        'Exceeds the 2024 peer-reviewed J&K checklist (592) by 9 records because it merges trans-regional Ladakh, AJ&K, and Gilgit-Baltistan taxa; requires binomial synonymy check to confirm zero duplicate splits.',
      remediationProtocol: 'Module 01 · Taxonomic Backbone Reconciliation (IOC / Clements / HBW)',
    },
    {
      metric: `IUCN Red List Threatened Count (${threatenedCount})`,
      currentDisplay: `${threatenedCount} species tagged CR, EN, or VU in platform schema`,
      scientificAuditFinding:
        'Significantly higher than global IUCN Red List CR/EN/VU totals for the Western Himalayas (~30–45 globally threatened birds); indicates conflation of regional conservation concern / Wildlife Schedule status with global IUCN Red List categories.',
      remediationProtocol:
        'Separate Global IUCN Red List Status (2025-2) from Regional Threat / Statutory Schedule I–II Status.',
    },
    {
      metric: `Endemism Counters (${strictKashmirEndemics} vs. ${broadEndemicCount} vs. 476)`,
      currentDisplay: `${strictKashmirEndemics} strict Kashmir endemics · ${broadEndemicCount} Himalayan endemics · 476 broader regional tag references`,
      scientificAuditFinding:
        'True restricted-range Western Himalayan breeding endemics number roughly a dozen species (e.g., Ficedula subrubra, Pyrrhula aurantiaca, Sitta cashmirensis, Phylloscopus tytleri); higher counters reflect broad Himalayan/resident range tags rather than strict endemism.',
      remediationProtocol:
        'Enforce 4-tier classification: Restricted-Range Endemic (EBA 128), Himalayan Near-Endemic, Breeding Resident, and Migratory Visitor.',
    },
    {
      metric: `Overlapping Guild Filters (${passerinesCount} / ${waterfowlCount} / ${raptorsCount} / ${alpineCount} / ${pheasantsCount})`,
      currentDisplay: `Sum of guild quick-tabs = ${
        passerinesCount + waterfowlCount + raptorsCount + alpineCount + pheasantsCount
      } across ${totalCount} species`,
      scientificAuditFinding:
        'Filter predicates intentionally combine taxonomic category strings with habitat membership (e.g., alpine passerines or wetland raptors appear in multiple tabs), which is ecologically valid for multi-guild exploration but cannot be summed as mutually exclusive partitions.',
      remediationProtocol:
        'Separate Primary Taxonomic Order/Family from Secondary Habitat & Migratory Guild tags.',
    },
    {
      metric: `Administrative Coverage (${allDistrictUnits.length} active units vs. legacy "25 districts" text)`,
      currentDisplay: `${allDistrictUnits.length} geographic units loaded from GEOGRAPHY across 5 regions`,
      scientificAuditFinding:
        'Platform subtitle previously cited 25 districts while GEOGRAPHY aggregates units across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan (full multi-jurisdictional Western Himalayan mosaic exceeds 40 administrative districts).',
      remediationProtocol:
        'Standardize district-level checklist attribution across all five regions with explicit survey-effort confidence grades.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Breadcrumb & Companion Editorial Strip */}
      <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Link
              href="/biodiversity/birds"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>KEW Avifauna Registry ({totalCount})</span>
            </Link>
            <span>/</span>
            <span className="text-slate-200">Western Himalayan Avian Intelligence Observatory</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-sky-has-no-borders"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium"
            >
              <span>Read Dispatch 06: The Sky Has No Borders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders"
              className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 font-medium"
            >
              <span>Open Monograph 04 (18 Volumes · 54 Chapters)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-sky-950/50 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Permanent KEW Ornithological Companion Programme</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              Western Himalayan Avian Intelligence Observatory
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Treating birds as living transboundary indicators of wetland hydrology, forest
              connectivity, riverine integrity, and climate velocity across Kashmir, Jammu, Ladakh,
              Azad Jammu &amp; Kashmir, and Gilgit-Baltistan—along the Central Asian Flyway.
            </p>
          </div>

          {/* Key Observatory Benchmark Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
            {[
              { label: 'Regions Connected', value: '5', sub: 'Kashmir · Jammu · Ladakh · AJ&K · GB' },
              { label: 'Flyway Span', value: '~30', sub: 'Central Asian Flyway nations' },
              { label: 'KEW Registry Audit', value: String(totalCount), sub: 'Taxa under binomial review' },
              { label: '2025 Waterbird Count', value: '1.34M', sub: '+65.2% vs. 2020 (813,043)' },
              { label: 'Refugia Crowding', value: '~96%', sub: 'Concentrated in 4 wetlands (RTI)' },
              { label: 'Observatory Modules', value: '12', sub: 'Permanent KEW data layers' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white">{stat.label}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Scientific Honesty & Ongoing Verification Disclosure */}
          <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p className="font-semibold text-amber-300 uppercase tracking-wider text-xs">
                Methodological &amp; Evidentiary Honesty Standard
              </p>
              <p>
                Regional species checklists, historical Asian Waterbird Census totals, and Kashmir
                EcoWatch&apos;s own {totalCount}-species platform database represent an{' '}
                <strong>ongoing scientific reconciliation</strong> rather than a closed or final
                census. Checklists across the five Western Himalayan regions cannot be summed
                arithmetically because resident altitudinal migrants and Central Asian Flyway
                visitors cross administrative borders seasonally, and underlying sources apply
                divergent taxonomic backbones.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-sky-has-no-borders"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Read Flagship Investigation (Dispatch 06)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-100 text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Explore 18-Volume Monograph Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/api/himalayan-dispatch/datasets/avian-monograph-framework?format=csv"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Reconciliation Framework (CSV)</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* Section 1: Five-Region Checklist Reconciliation */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              01 · Transboundary Taxonomic Reconciliation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Comparing Published Bird Counts Across the Five Regions
            </h2>
            <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
              Different institutions report different species totals because they draw different
              political boundaries, follow different taxonomic authorities, and apply different rules
              to historical records and rare passage vagrants.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Region / Registry</th>
                  <th className="py-3.5 px-4">Reported Species</th>
                  <th className="py-3.5 px-4">Primary Scientific Source</th>
                  <th className="py-3.5 px-4">Taxonomic Backbone</th>
                  <th className="py-3.5 px-4">Methodological Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {REGIONAL_CHECKLIST_RECONCILIATION.map((row) => (
                  <tr key={row.region} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                      {row.region}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-sky-400 tabular-nums whitespace-nowrap">
                      {row.reportedSpecies}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{row.source}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">{row.taxonomicBackbone}</td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs leading-relaxed">
                      {row.reconciliationNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Self-Scrutiny of KEW's Own 601-Species Registry */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
              02 · Internal Platform Audit &amp; Data Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Auditing Kashmir EcoWatch&apos;s Own {totalCount}-Species Avian Database
            </h2>
            <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
              Credible environmental journalism applies the same evidentiary scrutiny to its own
              platform metrics as it applies to government departments. Below is the live diagnostic
              ledger for <code className="text-sky-300">/biodiversity/birds</code>.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-rose-500/25 bg-slate-900/70">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Platform Metric</th>
                  <th className="py-3.5 px-4">Current Live State</th>
                  <th className="py-3.5 px-4">Scientific Audit Finding</th>
                  <th className="py-3.5 px-4">Observatory Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {kewAuditRows.map((row) => (
                  <tr key={row.metric} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-semibold text-white align-top">{row.metric}</td>
                    <td className="py-3.5 px-4 text-amber-300 text-xs align-top">
                      {row.currentDisplay}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs leading-relaxed align-top">
                      {row.scientificAuditFinding}
                    </td>
                    <td className="py-3.5 px-4 text-sky-300 text-xs leading-relaxed align-top">
                      {row.remediationProtocol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: 12 Permanent Observatory Modules */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              03 · Permanent Monitoring Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The 12 Modules of the Western Himalayan Avian Intelligence Observatory
            </h2>
            <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
              Moving regional ornithology beyond static species lists into continuous ecological
              diagnostics—linking acoustic arrays, radar/telemetry migration corridors, wetland
              hydrology, mortality registries, and conservation budget audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OBSERVATORY_MODULES_12.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.code}
                  className="p-5 rounded-xl bg-slate-900/75 border border-white/10 hover:border-sky-500/40 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-sky-400">
                        {mod.code}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">
                        {mod.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{mod.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Target Output:</strong> {mod.deliverable}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Eight Transboundary Flagship & Indicator Species */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
              04 · Living Landscape Diagnostics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Eight Trans-Regional Indicator Species &amp; What Each Landscape Reveals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FLAGSHIP_INDICATORS_8.map((sp) => (
              <div
                key={sp.scientificName}
                className="p-5 rounded-xl bg-slate-900/65 border border-white/10 space-y-2.5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{sp.commonName}</h3>
                    <p className="text-xs italic text-sky-300">{sp.scientificName}</p>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10 text-amber-300 font-medium">
                    {sp.iucn}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-teal-400 font-semibold">
                  {sp.guild}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {sp.ecologicalSignal}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Cross-Link Banner to Himalayan Dispatch */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Companion Longform Investigation &amp; 18-Volume Scientific Monograph
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              “When a bird disappears from a valley, wetland, orchard, river or village courtyard,
              the landscape is already telling us that something fundamental has changed.”
            </h2>
            <p className="text-sm text-slate-300">
              Read the complete flagship investigation in Volume 01 · Issue 01 of{' '}
              <em>Himalayan Dispatch</em> or inspect all 18 volumes and 54 chapter protocols of
              Monograph 04.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-sky-has-no-borders"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Dispatch 06</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Monograph 04</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
