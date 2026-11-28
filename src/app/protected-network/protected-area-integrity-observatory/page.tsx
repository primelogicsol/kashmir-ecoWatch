import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Database,
  Droplets,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Layers,
  MapPin,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Trees,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { SalimAliParkForensicWorkbench } from '@/components/himalayan-dispatch/SalimAliParkForensicWorkbench';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Protected Area Integrity & Historical Transformation Observatory — Western Himalayas | Kashmir EcoWatch',
  description:
    'Permanent 12-module KEW observatory tracking protected-area gazettes, statutory boundaries, PADDD (downgrading, downsizing, degazettement), Sálim Ali National Park forensic records, hydrological/chemical footprints, and the Western Himalayan Protected Area Integrity Protocol.',
  canonicalPath: '/protected-network/protected-area-integrity-observatory',
  imagePath: '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
});

const OBSERVATORY_MODULES_12 = [
  {
    code: 'PAIO-01',
    title: 'Historical Gazette Archive',
    icon: BookOpen,
    status: 'Active Retrieval',
    summary:
      'Preserves authenticated statutory notifications, preliminary and final boundary schedules, and historical wildlife legislation across all five Western Himalayan jurisdictions.',
  },
  {
    code: 'PAIO-02',
    title: 'Protected Boundary Registry',
    icon: MapPin,
    status: 'Cadastral Reconciliation',
    summary:
      'Reconciles conflicting area inventories (e.g., 9.07 km², 9.00 km², 8.85 km², and 8.69 km² for City Forest / Sálim Ali National Park) against parcel-level cadastral polygons.',
  },
  {
    code: 'PAIO-03',
    title: 'Denotification Intelligence',
    icon: Scale,
    status: 'Statutory Audit',
    summary:
      'Audits whether boundary alterations satisfied mandatory Wildlife Board recommendations, legislative resolutions, and Supreme Court dereservation safeguards.',
  },
  {
    code: 'PAIO-04',
    title: 'Land-Use Change Analysis',
    icon: Layers,
    status: '1960–2026 EO Series',
    summary:
      'Tracks nine-period optical, declassified aerial, Landsat, and Sentinel land-cover transitions distinguishing native woodland from managed turf and built infrastructure.',
  },
  {
    code: 'PAIO-05',
    title: 'Wildlife Displacement Registry',
    icon: Trees,
    status: 'Archival & Field Protocol',
    summary:
      'Documents avian, mammalian, herpetofaunal, pollinator, and captive-facility relocation records—including the Kalpavriksh snow leopard correspondence.',
  },
  {
    code: 'PAIO-06',
    title: 'Ecological Services Assessment',
    icon: ShieldCheck,
    status: 'Framework Established',
    summary:
      'Quantifies carbon stocks, foothill stormwater infiltration, urban thermal regulation, and habitat connectivity alongside recreational tourism economics.',
  },
  {
    code: 'PAIO-07',
    title: 'Environmental Litigation Archive',
    icon: FileText,
    status: 'Docket Indexing',
    summary:
      'Indexes public interest petitions (such as PIL No. 115/99), Supreme Court protected-area orders, expert inspection reports, and compliance affidavits.',
  },
  {
    code: 'PAIO-08',
    title: 'Public Expenditure Audit',
    icon: Database,
    status: '25-Year Ledger Protocol',
    summary:
      'Evaluates capital outlays, imported equipment, 25-year operating subsidies, tournament spending, PPP concessions, and net public financial contribution.',
  },
  {
    code: 'PAIO-09',
    title: 'Hydrological Impact Analysis',
    icon: Droplets,
    status: 'Scenario & Metering Audit',
    summary:
      'Models irrigation abstraction demand and surface/subsurface drainage connectivity between Zabarwan foothill facilities and Dal Lake.',
  },
  {
    code: 'PAIO-10',
    title: 'Chemical Footprint Monitoring',
    icon: FlaskConical,
    status: 'NBWL Question Follow-Up',
    summary:
      'Tracks elemental nitrogen, phosphorus, herbicide, fungicide, and pesticide procurement and receiving-water monitoring first sought by wildlife authorities in 2003–2005.',
  },
  {
    code: 'PAIO-11',
    title: 'Restoration Feasibility Registry',
    icon: Compass,
    status: 'Scenarios A–D',
    summary:
      'Evaluates operational remediation, non-playing native woodland corridors, protection of the 723-hectare statutory remainder, and long-term conservation recovery.',
  },
  {
    code: 'PAIO-12',
    title: 'Regional Protected Area Alerts',
    icon: ShieldAlert,
    status: '5-Region Preventive Watch',
    summary:
      'Preventive PADDD verification across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan protected landscapes.',
  },
];

const PADDD_FIVE_REGION_SCOPE = [
  {
    region: 'Kashmir',
    landscapes: 'Sálim Ali (City Forest), Dachigam, Kazinag, Gulmarg, Overa-Aru, Hirpora & wetland reserves',
  },
  {
    region: 'Jammu',
    landscapes: 'Kishtwar High Altitude NP, Jasrota, Nandini, Ramnagar Rakha, Surinsar-Mansar & sanctuaries',
  },
  {
    region: 'Ladakh',
    landscapes: 'Hemis National Park, Changthang Cold Desert & Karakoram Wildlife Sanctuary',
  },
  {
    region: 'Azad Jammu & Kashmir',
    landscapes: 'Machiara, Musk Deer (Ghamot), Pir Chinasi, Toli Pir & Poonch River Mahaseer NP',
  },
  {
    region: 'Gilgit-Baltistan',
    landscapes: 'Central Karakoram, Khunjerab, Deosai, Handarap-Shandur & Broghil-adjacent corridors',
  },
];

const INTEGRITY_PROTOCOL_12 = [
  ['01 · Digitized statutory boundaries', 'Prevent geographical and cadastral ambiguity'],
  ['02 · Public notification of proposed changes', 'Ensure pre-decision public transparency'],
  ['03 · Independent ecological baseline', 'Establish habitats and species before any intervention'],
  ['04 · Demonstration of necessity', 'Prove why protected land is strictly required'],
  ['05 · Alternatives assessment', 'Evaluate non-protected and disturbed sites first'],
  ['06 · Cumulative impact assessment', 'Account for catchment-wide hydrological and habitat pressures'],
  ['07 · Legislative & judicial compliance', 'Verify statutory board, legislative, and court mandates'],
  ['08 · Public participation', 'Consult local custodians, scientists, and conservation bodies'],
  ['09 · Ecological restoration obligations', 'Enforce measurable native-ecosystem recovery'],
  ['10 · Long-term environmental monitoring', 'Publish independent water, soil, and biodiversity data'],
  ['11 · Publicly accessible approval archive', 'Preserve gazettes, DPRs, and compliance filings'],
  ['12 · Periodic independent boundary audit', 'Detect encroachment or incompatible land-use drift early'],
];

const PRIMARY_SOURCES_7 = [
  {
    label: 'WII Protected Area Gazette Archive (Jammu & Kashmir)',
    url: 'https://v1.wii.gov.in/protectedareagazette_jammu_kashmir',
    note: 'Retains historical entry for City Forest (Sálim Ali) National Park, Srinagar (1992 / 9 km²).',
  },
  {
    label: 'Historical Jammu & Kashmir Wildlife (Protection) Act, 1978',
    url: 'https://jkfpf.nic.in/J_K_Wildlife_Protection_Act.pdf',
    note: 'Section 35 national park declaration and statutory boundary-alteration requirements.',
  },
  {
    label: 'NBWL Standing Committee Minutes — August 25, 2004',
    url: 'https://moef.gov.in/uploads/2018/03/Minutes_meeting_250804.pdf',
    note: 'Records concern over inadequate state government response to 2003 expert site inspection.',
  },
  {
    label: 'NBWL Standing Committee Minutes — October 4, 2005',
    url: 'https://moef.gov.in/uploads/2018/03/Minutes_meeting_41005.pdf',
    note: 'Records 1.62 km² reported denotified (of 8.85 km²), 4/8 recommendations accepted, and Supreme Court objection decision.',
  },
  {
    label: 'Protected Area Update (IISc Biodiversity Archive, July 1999)',
    url: 'https://wgbis.ces.iisc.ac.in/biodiversity/Environ_sys/doc98html/biodpa9981.html',
    note: 'Contemporary documentation of tree-felling allegations and Wildlife Department objections.',
  },
  {
    label: 'Kalpavriksh Papers Archival Catalogue (Milli Archives)',
    url: 'https://cat.milli.link/repositories/2/top_containers/672',
    note: 'Archival conservation correspondence including snow leopard facility relocation concerns.',
  },
  {
    label: 'J&K Tourism Official Golfing Record (Royal Springs)',
    url: 'https://jktourism.org/golfing/',
    note: 'Official description citing ~300 acres (121.4 ha) and automated sprinkler irrigation.',
  },
];

export default function ProtectedAreaIntegrityObservatoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Breadcrumb & Companion Editorial Strip */}
      <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-400">
            <Link
              href="/protected-network"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Protected Area Network</span>
            </Link>
            <span>/</span>
            <Link
              href="/protected-network/national-parks/salim-ali-national-park"
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              Sálim Ali National Park
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Integrity &amp; Transformation Observatory</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium"
            >
              <span>Read Dispatch 10</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium"
            >
              <span>Open Monograph 09 (10 Volumes · 75 Chapters)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-white/10 bg-gradient-to-b from-emerald-950/45 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>KEW · Protected Area Network Companion Infrastructure</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]">
              Protected Area Integrity &amp; Historical Transformation Observatory
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Maintaining an independently verifiable record of statutory gazettes, boundary
              alterations, PADDD (downgrading, downsizing, and degazettement), hydrological and
              chemical footprints, and ecological recovery across all five Western Himalayan
              regions—anchored by the forensic investigation of Srinagar&apos;s Sálim Ali (City
              Forest) National Park.
            </p>
          </div>

          {/* Core Forensic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: '885 / 907 ha', label: 'Reported Park Extent', sub: '2005 NBWL vs. J&K inventory' },
              { value: '162 ha', label: 'Reported Denotified', sub: '18.3% stated in Oct 2005 minutes' },
              { value: '121.4 ha', label: 'Advertised Golf Course', sub: '~300 acres (40.6 ha cadastral gap)' },
              { value: '723 ha', label: 'Mathematical Remainder', sub: '81.7% requiring statutory audit' },
              { value: '4 / 8', label: 'Recommendations Met', sub: 'Oct 2005 NBWL (3 deferred, 1 rejected)' },
              { value: '12 Modules', label: 'Observatory Architecture', sub: '75 Monograph chapters · 20 P0–P2 docs' },
            ].map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-xl bg-slate-900/85 border border-white/10 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-white">{m.label}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Research Limitations & Institutional Right of Response */}
          <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p className="font-semibold text-amber-300 uppercase tracking-wider text-xs">
                Evidentiary Boundaries, Research Limitations &amp; Institutional Right of Response
              </p>
              <p>
                Several official wildlife board proceedings (including the August 25, 2004 and
                October 4, 2005 minutes) have been located and examined, while the original national
                park gazette remains behind an institutional access form and the authenticated
                denotification instrument, complete PIL No. 115/99 judicial record, historical
                cadastral maps, and current water/chemical monitoring data remain outstanding.
                Neither the exact extent of ecological damage nor the final legality of conversion
                is declared settled, and full right of response is extended to all relevant public
                authorities and project management.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Read Flagship Investigation (Dispatch 10)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-100 text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Explore 10-Volume, 75-Chapter Monograph</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/api/himalayan-dispatch/datasets/salim-ali-park-monograph-framework?format=csv"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download 75-Chapter &amp; Document Framework (CSV)</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* 12 Observatory Modules */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              01 · Permanent Observatory Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Twelve Protected Area Integrity &amp; Historical Transformation Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OBSERVATORY_MODULES_12.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.code}
                  className="p-5 rounded-xl bg-slate-900/75 border border-white/10 hover:border-emerald-500/35 transition space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400">
                      {mod.code}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">
                      {mod.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{mod.summary}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Forensic Calculators (Dark-mode Editorial Wrapper) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              02 · Parametric Hydrology, Nutrient &amp; Cadastral Workbench
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Interactive Irrigation, Nutrient Loading &amp; Park Area Calculators
            </h2>
          </div>
          <div
            style={
              {
                '--hd-bg': '#0f172a',
                '--hd-bg-elevated': '#111827',
                '--hd-fg': '#f8fafc',
                '--hd-fg-secondary': '#cbd5e1',
                '--hd-fg-muted': '#94a3b8',
                '--hd-rule': 'rgba(255,255,255,0.12)',
                '--hd-rule-strong': 'rgba(16,185,129,0.35)',
                '--hd-copper': '#34d399',
              } as React.CSSProperties
            }
          >
            <SalimAliParkForensicWorkbench />
          </div>
        </section>

        {/* Five-Region PADDD Preventive Audit + 12-Point Integrity Protocol */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              03 · Five-Region Preventive PADDD Scope
            </span>
            <h2 className="text-2xl font-bold text-white">
              Western Himalayan Protected Area Audit
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inclusion in this preventive audit does not imply unlawful boundary alteration; it
              establishes baseline statutory and geospatial verification across all five regions.
            </p>
            <div className="space-y-3">
              {PADDD_FIVE_REGION_SCOPE.map((item) => (
                <div
                  key={item.region}
                  className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-1"
                >
                  <div className="text-sm font-bold text-emerald-300">{item.region}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.landscapes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              04 · Proposed Governance Standard
            </span>
            <h2 className="text-2xl font-bold text-white">
              Western Himalayan Protected Area Integrity Protocol (12 Requirements)
            </h2>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 divide-y divide-white/5">
              {INTEGRITY_PROTOCOL_12.map(([req, purpose]) => (
                <div
                  key={req}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <span className="font-semibold text-white">{req}</span>
                  <span className="text-slate-400">{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Documentary Sources */}
        <section className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            05 · Primary Archival &amp; Statutory Sources Identified
          </span>
          <h2 className="text-2xl font-bold text-white">
            Official Gazette, Legislative, NBWL &amp; Conservation Archives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIMARY_SOURCES_7.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition space-y-1.5 block"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-emerald-300">{src.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{src.note}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
