import React from 'react';
import Link from 'next/link';
import {
  Trees,
  BookOpen,
  Globe2,
  Mountain,
  Shield,
  Quote,
  ArrowRight,
  ExternalLink,
  Activity,
  Scale,
  Compass,
  Sparkles,
  Award,
  Info,
  FileText,
  ShieldCheck,
  Heart,
  Landmark,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

interface GovernancePortalViewProps {
  canonicalPath: '/governance' | '/about/governance';
}

const HISTORICAL_FACTS = [
  {
    value: '14th C.',
    label: 'Historical Origin',
    sub: "Kashmir's Rishi tradition (c. 1377/1378–1440 CE)",
    icon: BookOpen,
    color: 'text-emerald-400',
  },
  {
    value: '1992',
    label: 'Rio Earth Summit',
    sub: 'Modern international milestone (UNCED Agenda 21)',
    icon: Globe2,
    color: 'text-sky-400',
  },
  {
    value: '2004',
    label: 'ESRO Research Lineage',
    sub: 'Founding environmental research roots in Kashmir',
    icon: Landmark,
    color: 'text-amber-400',
  },
  {
    value: '5',
    label: 'KEW Coverage Regions',
    sub: 'Western Himalayan transboundary ecological scope',
    icon: Mountain,
    color: 'text-purple-400',
  },
] as const;

const COMPARISON_MATRIX = [
  {
    dimension: 'Foundation',
    alamdar: 'Ethical and spiritual responsibility rooted in Kashmiri Rishi contemplative practice',
    modern: 'Empirical science, international environmental law, statutory policy, and public participation',
  },
  {
    dimension: 'Central Concern',
    alamdar: 'Human dependence on living nature ("Ann poshi teli yeli wan poshi")',
    modern: 'Ecological protection, pollution abatement, biodiversity preservation, and sustainable development',
  },
  {
    dimension: 'Communication',
    alamdar: 'Oral vernacular poetry (Shruks), cultural memory, and lived community ethics',
    modern: 'Scientific peer-reviewed evidence, multilateral treaties, legal statutes, and policy instruments',
  },
  {
    dimension: 'Accountability',
    alamdar: 'Moral conscience, communal stewardship, and intergenerational reverence for the sacred landscape',
    modern: 'Public regulatory authorities, legal compliance, statutory reporting, and sensor-based monitoring',
  },
  {
    dimension: 'Environmental Knowledge',
    alamdar: 'Place-based indigenous wisdom, natural seasonal observation, and contemplative awareness',
    modern: 'Empirical measurement, Earth observation satellite telemetry, numerical modeling, and laboratory testing',
  },
  {
    dimension: 'KEW Application',
    alamdar: 'Ethical orientation: defines the moral purpose and civic responsibility of the platform',
    modern: 'Operational execution: defines analytical methods, sensor telemetry pipelines, and independent verification',
  },
] as const;

const GOVERNANCE_PRINCIPLES = [
  {
    id: 1,
    title: 'Ecological Interdependence',
    desc: 'Recognizing the connected relationships among forests, rivers, wetlands, biodiversity, agricultural systems, and mountain communities. Disruption of one component inevitably destabilizes the whole.',
    icon: Trees,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 2,
    title: 'Scientific Integrity',
    desc: 'Maintaining evidence-based environmental assessments, transparent open methodologies, provenance-tracked data streams, and clear disclosure of scientific margins of uncertainty. Traditional wisdom inspires our inquiry; empirical verification dictates our findings.',
    icon: ShieldCheck,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    id: 3,
    title: 'Public Environmental Knowledge',
    desc: 'Ensuring that environmental datasets, satellite indicators, water quality measurements, and hazard intelligence remain accessible to local communities, students, researchers, and public institutions without commercial barriers, subject only to legitimate life-safety and sensitive-species constraints.',
    icon: BookOpen,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 4,
    title: 'Intergenerational Stewardship',
    desc: 'Grounding every conservation assessment and infrastructure review in long-term ecological consequences. The ecosystems of the Western Himalaya are not disposable inheritances for short-term consumption, but shared trusts held on behalf of generations yet unborn.',
    icon: Compass,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 5,
    title: 'Independent Environmental Responsibility',
    desc: 'Upholding strict institutional independence from commercial, political, or jurisdictional interests. Environmental assessments, road corridor safety alerts, and hazard telemetry are delivered objectively based solely on verifiable ground and satellite truth.',
    icon: Scale,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
] as const;

const OPERATIONAL_MODULES = [
  {
    principle: 'Protect Forests & Vegetation',
    alamdarConcept: 'Wan Poshi (Living Forests)',
    kewModule: 'Forest Cover & Biodiversity Intelligence',
    desc: 'Forest-cover monitoring, satellite canopy density tracking, alpine habitat fragmentation modeling, and protected area GIS mapping.',
    link: '/biodiversity',
    color: 'text-emerald-400',
  },
  {
    principle: 'Protect Water & Springs',
    alamdarConcept: 'Nag & Chashma Reverence',
    kewModule: 'Water Systems & Limnology Hub',
    desc: 'Cataloged profiles of 553 waterbodies and 521 deduplicated Kashmir lakes, spring-shed mapping, river basin discharge, and groundwater baselines.',
    link: '/water-systems',
    color: 'text-sky-400',
  },
  {
    principle: 'Protect Food Systems & Soils',
    alamdarConcept: 'Ann Poshi (Enduring Nourishment)',
    kewModule: 'Sectoral EIA & Agricultural Resilience',
    desc: 'Agriculture, horticulture, Pampore saffron landscape vulnerability, industrial dust dispersion modeling, and catchment soil health.',
    link: '/sectoral-eia',
    color: 'text-amber-400',
  },
  {
    principle: 'Protect Mountain Communities',
    alamdarConcept: 'Communal Care & Compassion',
    kewModule: 'Hazard Intelligence Command Center',
    desc: 'Mountain corridor landslide susceptibility, multi-agency seismic feeds (USGS/EMSC), avalanche watch, GLOF monitoring, and flood baselines.',
    link: '/hazard-intelligence',
    color: 'text-rose-400',
  },
  {
    principle: 'Examine Accountability & Evidence',
    alamdarConcept: 'Public Witness & Integrity',
    kewModule: 'Environmental Investigations (KEW-EIAI)',
    desc: 'Falsifiable 24-section multidisciplinary investigations, statutory audit cross-checks, and verified judicial PIL tracking.',
    link: '/environmental-investigations',
    color: 'text-purple-400',
  },
  {
    principle: 'Share Ecological Knowledge',
    alamdarConcept: 'Public Vernacular Wisdom',
    kewModule: 'Citizen Science & Open Data Commons',
    desc: 'Standardized field observations, sensitive-habitat coordinate masking, student field curricula, and open non-commercial research datasets.',
    link: '/open-data',
    color: 'text-teal-400',
  },
] as const;

const SCIENTIFIC_CHARTER_STANDARDS = [
  {
    title: 'Zero Synthetic Advisory Rosters',
    body: 'Kashmir EcoWatch never lists unconsented, placeholder, or synthetic external academics as standing board members. Specialist peer reviews and collaborations are recorded only when backed by written consent and documented scholarly attribution.',
  },
  {
    title: 'Editorial & Scientific Firewall',
    body: 'Philanthropic stewardship (Dr. Kumar Foundation USA) and in-kind cloud/software engineering (Prime Logic Solutions USA) confer zero authority to alter empirical findings, hazard classifications, or Himalayan Dispatch editorial conclusions.',
  },
  {
    title: 'Non-Statutory Civic Transparency',
    body: 'KEW operates as an independent diaspora-led non-commercial scientific and educational observatory—never impersonating statutory regulatory boards, judicial registries, or emergency response authorities.',
  },
  {
    title: 'Open Methodology & Corrections Ledger',
    body: 'Every analytical model, remote-sensing proxy, and documentary dossier distinguishes primary measurements from modeled estimates and maintains a permanent public corrections and version register.',
  },
] as const;

export function GovernancePortalView({ canonicalPath }: GovernancePortalViewProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── 1. INSTITUTIONAL HERO: ECOLOGICAL GOVERNANCE & CHARTER ────────────── */}
      <section className="kew-module-hero-surface relative bg-slate-950 border-b border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_30%] sm:bg-[position:center_35%] lg:bg-[position:right_center]"
          style={{ backgroundImage: "url('/images/governance-alamdar-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 sm:via-slate-950/80 to-slate-950/35 pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

        <div className="kew-module-hero-inner container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 mb-4 sm:mb-6"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {canonicalPath === '/about/governance' && (
                <>
                  <span className="text-slate-500">/</span>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </>
              )}
              <span className="text-slate-500">/</span>
              <span className="text-emerald-400 font-medium">
                Institutional Governance &amp; Scientific Charter
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>INSTITUTIONAL GOVERNANCE · SCIENTIFIC CHARTER · ALAMDAR ETHOS</span>
            </div>

            <div className="mb-2.5 sm:mb-3">
              <KewBrandIdentity variant="eyebrow" />
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-3 break-words">
              Institutional Governance, Scientific Charter &amp; Alamdar Ethos
            </h1>

            <h2 className="text-base sm:text-lg md:text-xl font-bold text-emerald-300 mb-2 tracking-wide leading-snug">
              Independent Scientific Stewardship, Editorial Integrity &amp; Civilizational Ecological Ethics
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-4 tracking-wide font-mono">
              Founding Leadership · Scientific Independence · Non-Commercial Public Trust
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed mb-6">
              Kashmir EcoWatch Western Himalayan operates under an explicit non-commercial institutional charter uniting founding scientific leadership since ESRO (2004), strict editorial and evidentiary independence, and ethical inspiration from Sheikh Noor-ud-Din Wali (Alamdar-e-Kashmir).
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#scientific-charter"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
              >
                <span>Scientific &amp; Editorial Charter</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#maxim-section"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 hover:border-emerald-500/40 font-semibold text-xs sm:text-sm transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>The Ecological Maxim</span>
              </a>
              <a
                href="#institutional-stewardship"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 font-medium text-xs sm:text-sm transition-all duration-200"
              >
                <Landmark className="w-4 h-4 text-purple-400" />
                <span>Founding Leadership &amp; Trust</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. IDENTIFIABLE HISTORICAL & INSTITUTIONAL REFERENCE POINTS ───────── */}
      <section className="relative z-10 mt-6 sm:mt-8 container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {HISTORICAL_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="p-4 sm:p-5 rounded-lg border border-white/10 bg-slate-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${fact.color}`}>
                    {fact.value}
                  </span>
                  <fact.icon className="w-4 h-4 text-slate-400 opacity-70 shrink-0" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">{fact.label}</p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-1">{fact.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 max-w-5xl">
        {/* ─── 3. SCIENTIFIC CHARTER, EDITORIAL INDEPENDENCE & LEADERSHIP ──────── */}
        <section id="scientific-charter" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                SCIENTIFIC CHARTER &amp; EDITORIAL INDEPENDENCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Founding Leadership, Evidentiary Governance &amp; Advisory Transparency
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Founded by <strong className="text-white">Mr. Fayaz Ahmad Khan</strong>—continuing the regional environmental research lineage initiated in Kashmir in 2004 as the Environment and Service Research Organization (ESRO) and headquartered in Loudoun County, Virginia, USA—Kashmir EcoWatch enforces strict evidentiary standards across all scientific modules, investigations, and journalistic publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCIENTIFIC_CHARTER_STANDARDS.map((item) => (
              <div
                key={item.title}
                className="p-5 sm:p-6 rounded-lg bg-slate-900/70 border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-lg bg-slate-900/50 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="space-y-1 max-w-2xl">
              <strong className="text-emerald-300 uppercase tracking-wider font-mono block">
                Verified Governance Cross-References
              </strong>
              <p className="text-slate-300 leading-relaxed">
                Inspect our published 24-section scientific investigation methodology, Founding Steward profile, and Himalayan Dispatch editorial charter.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/about/founder"
                className="px-3.5 py-2 rounded-md bg-slate-950 hover:bg-slate-800 border border-white/15 text-white font-semibold transition-colors"
              >
                Founding Leadership →
              </Link>
              <Link
                href="/environmental-investigations/methodology"
                className="px-3.5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Investigation Methodology →
              </Link>
              <Link
                href="/himalayan-dispatch/editorial-charter"
                className="px-3.5 py-2 rounded-md bg-slate-950 hover:bg-slate-800 border border-white/15 text-slate-200 font-semibold transition-colors"
              >
                Editorial Charter →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 4. THE ENDURING ECOLOGICAL MAXIM & ALAMDAR-E-KASHMIR ETHOS ──────── */}
        <section id="maxim-section" className="scroll-mt-24">
          <div className="p-6 sm:p-10 md:p-12 rounded-lg border border-emerald-500/30 bg-slate-900 relative overflow-hidden shadow-xl space-y-8">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-500/10 pointer-events-none" />
            <Quote className="absolute bottom-6 right-6 w-16 h-16 text-emerald-500/10 rotate-180 pointer-events-none" />

            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE ENDURING ECOLOGICAL MAXIM &amp; CIVILIZATIONAL ETHOS</span>
              </div>

              <div className="pt-2">
                <p
                  className="text-2xl sm:text-4xl text-emerald-200 tracking-wide dir-rtl mb-2 select-text font-serif"
                  dir="rtl"
                >
                  اَن پوشہِ تلہِ یلہِ وَن پوشہِ
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic tracking-tight font-serif">
                  &ldquo;Ann Poshi Teli Yeli Wan Poshi&rdquo;
                </h2>
                <p className="text-lg sm:text-2xl text-emerald-300 font-semibold mt-2">
                  Food will endure as long as forests endure.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs font-medium max-w-2xl mx-auto mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Historical Clarification:</strong> Sheikh Noor-ud-Din Wali (RA) and Alamdar-e-Kashmir are the same venerated historical figure — also revered as Sheikh-ul-Alam and Nund Rishi (c. 1377/1378–1440 CE).
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-950/80 p-2 space-y-2">
                <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-slate-900">
                  <img
                    src="/images/R.jfif"
                    alt="Alamdar-e-Kashmir — Sheikh Noor-ud-Din Wali"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                      Flag Bearer of Kashmir
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white font-serif">
                      Alamdar-e-Kashmir · Sheikh Noor-ud-Din Wali
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-md border border-white/5 text-[11px] text-slate-300 leading-relaxed text-left">
                  <p className="italic text-emerald-300 font-serif">
                    &ldquo;Sustainability is not sacrifice; it&apos;s symbiosis.&rdquo;
                  </p>
                  <p className="text-slate-400 mt-1">
                    A timeless recognition that human nourishment is forever bound to living watersheds, soil vitality, and protected mountain forests.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                <p>
                  <strong className="text-white">Alamdar-e-Kashmir</strong> left an enduring civilizational imprint on ecological ethics across the Kashmir Himalayas. His teaching recognized centuries before industrial hydrology that mountain life depends upon intact forest canopies, undisturbed springsheds, and restraint toward living habitats.
                </p>
                <p>
                  In the valleys and uplands of Kashmir, this vernacular ethic linked forest stewardship directly to downstream agricultural survival, flood moderation, and community reciprocity across watersheds from the Pir Panjal to the Greater Himalayan range.
                </p>
                <p>
                  Kashmir EcoWatch honors this cultural inheritance as an ethical compass—while maintaining a rigorous boundary between civilizational inspiration and empirical scientific proof. Every environmental indicator, satellite time series, and accountability dossier published by KEW is governed by reproducible measurement and transparent uncertainty disclosure.
                </p>
              </div>
            </div>

            <div className="text-left space-y-3 font-normal bg-slate-950/60 p-6 rounded-lg border border-white/5 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Cultural &amp; Scientific Grounding:</strong> The maxim <em>&ldquo;Ann poshi teli yeli wan poshi&rdquo;</em> articulates an ecological dependency corroborated by modern mountain hydrology: forests regulate snowmelt infiltration, stabilize steep colluvial slopes, sustain perennial baseflow in karst and alluvial springs, and underpin Himalayan food and water security.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono text-center">
              <span>Historical Attribution: c. 1377/1378 – 1440 CE</span>
              <span>·</span>
              <span>Literary Genre: Kashmiri Shruk</span>
              <span>·</span>
              <span>Identity: Sheikh Noor-ud-Din Wali / Alamdar-e-Kashmir</span>
            </div>
          </div>
        </section>

        {/* ─── 5. TWO TRADITIONS, A SHARED RESPONSIBILITY: COMPARATIVE MATRIX ───── */}
        <section id="comparative-matrix" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                TWO TRADITIONS, A SHARED RESPONSIBILITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Alamdar&apos;s Moral Ecology and the Rio Earth Summit
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
              Centuries separate the Kashmir Rishi tradition from the 1992 United Nations Conference on Environment and Development (UNCED). Together, they demonstrate how cultural wisdom and modern scientific governance inform a shared responsibility toward living mountain systems.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/50 overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Comparative Analysis: Moral Ecology vs. Modern Environmental Governance
                </h3>
                <p className="text-xs text-slate-400">
                  How two complementary traditions address shared ecological concerns.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider font-bold w-fit">
                14th Century ⇄ 1992 UNCED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/80 text-[11px] uppercase tracking-wider font-bold">
                    <th className="p-3.5 text-slate-300 w-1/4">Dimension</th>
                    <th className="p-3.5 text-emerald-400 w-3/8 bg-emerald-950/20">
                      Alamdar&apos;s Moral Ecology (14th Century)
                    </th>
                    <th className="p-3.5 text-sky-400 w-3/8 bg-sky-950/20">
                      Modern Environmental Governance (1992 Rio)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-300 divide-y divide-white/5">
                  {COMPARISON_MATRIX.map((row) => (
                    <tr key={row.dimension} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-bold text-white bg-slate-950/40 border-r border-white/5 whitespace-nowrap">
                        {row.dimension}
                      </td>
                      <td className="p-3.5 leading-relaxed bg-emerald-950/10 border-r border-white/5 text-emerald-200">
                        {row.alamdar}
                      </td>
                      <td className="p-3.5 leading-relaxed bg-sky-950/10 text-slate-300">
                        {row.modern}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white font-semibold">The Core Institutional Principle:</strong> Traditional ecological wisdom can guide the questions an institution asks; scientific methods must determine the answers it publishes.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. FIVE PRINCIPLES OF ECOLOGICAL GOVERNANCE ──────────────────────── */}
        <section id="governance-principles" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                INSTITUTIONAL FOUNDATION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              KEW&apos;s Five Principles of Ecological Governance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
              These five principles represent Kashmir EcoWatch&apos;s contemporary institutional commitments across research, monitoring, open data, and public reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOVERNANCE_PRINCIPLES.map((p) => (
              <div
                key={p.id}
                className="p-5 sm:p-6 rounded-lg bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`p-2 rounded-md ${p.bg}`}>
                      <p.icon className={`w-4 h-4 ${p.color}`} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Principle {p.id}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. OPERATIONAL APPLICATION: FROM MORAL ECOLOGY TO SCIENCE ───────── */}
        <section id="operational-systems" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                FROM CIVILIZATIONAL WISDOM TO ENVIRONMENTAL INTELLIGENCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Operational Scientific Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
              Cultural heritage provides ethical inspiration; science provides methods of investigation; institutional governance establishes responsibility for how knowledge is produced, verified, and shared.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPERATIONAL_MODULES.map((m) => (
              <div
                key={m.kewModule}
                className="p-5 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold ${m.color}`}>{m.principle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-400">
                      {m.alamdarConcept}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {m.kewModule}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{m.desc}</p>
                </div>
                <Link
                  href={m.link}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 pt-2 border-t border-white/5 transition-colors"
                >
                  <span>Access Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 8. AN ETHOS BEYOND BORDERS & INSTITUTIONAL COVENANT ─────────────── */}
        <section className="p-8 sm:p-10 rounded-lg bg-slate-900/40 border border-white/10 space-y-5">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                TRANSBOUNDARY HIMALAYAN ECOLOGY &amp; INSTITUTIONAL COVENANT
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Shared Ecology, Shared Scientific Responsibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Western Himalaya encompasses interconnected mountain ecosystems, river basins, forests, glaciers, wetlands, and human settlements across five geographic subregions: <strong className="text-white">Kashmir Valley, Jammu Division, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hydrological runoff, glacial retreat, seismotectonic fault systems, wildfire smoke, and migratory flyways cross administrative lines continuously. Kashmir EcoWatch approaches ecological knowledge strictly as a geographical and scientific public service—never as a claim of political, regulatory, or religious authority.
            </p>
          </div>

          <div className="p-4 rounded-md bg-slate-950 border border-emerald-500/30 text-center">
            <p className="text-sm sm:text-base font-bold text-emerald-300 font-serif mb-1">
              Heritage inspires responsibility. Science establishes evidence. Governance safeguards integrity.
            </p>
            <p className="text-xs text-slate-400 font-serif italic">
              Ann Poshi Teli Yeli Wan Poshi — May the forests endure, and with them the living foundations of the Western Himalaya.
            </p>
          </div>
        </section>

        {/* ─── 9. DOCUMENTARY SOURCES ───────────────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-lg bg-slate-950 border border-white/5 text-xs text-slate-400 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Documentary Sources &amp; Scholarly Attribution</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
            <div>
              <p className="font-semibold text-slate-300 mb-1">Traditional Kashmiri Maxim &amp; Historical Context:</p>
              <p>
                The aphorism <em>&ldquo;Ann poshi teli yeli wan poshi&rdquo;</em> is preserved in Kashmiri oral literature and scholarly compilations of Sheikh Noor-ud-Din Wali&apos;s poetry (Rishi Nama traditions, c. 1377/1378–1440 CE). Presented as civilizational ethics rather than medieval statutory legislation.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">United Nations Rio Earth Summit (1992):</p>
              <p>
                United Nations Conference on Environment and Development (UNCED), Rio de Janeiro, 1992: Rio Declaration on Environment and Development (27 Principles), Agenda 21, UNFCCC, and Convention on Biological Diversity (CBD).
              </p>
            </div>
          </div>
        </section>

        {/* ─── 10. SPIRITUAL INSPIRATION & INSTITUTIONAL STEWARDSHIP ───────────── */}
        <section
          id="institutional-stewardship"
          className="scroll-mt-24 p-6 sm:p-10 rounded-lg bg-slate-900/40 border border-purple-500/20 relative overflow-hidden space-y-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 font-mono">
                SPIRITUAL INSPIRATION &amp; INSTITUTIONAL STEWARDSHIP
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dr. Ghulam Mohammad Kumar &amp; Dr. Kumar Foundation USA
            </h2>
            <p className="text-xs sm:text-sm text-purple-300 font-medium">
              Clear Separation of Spiritual Inspiration, Institutional Trust Stewardship &amp; Scientific Independence
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full sm:w-48 shrink-0 rounded-lg overflow-hidden border border-purple-500/30 bg-slate-950 p-1">
              <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-slate-900">
                <img
                  src="/images/dr-kumar.jpg"
                  alt="Dr. Ghulam Mohammad Kumar"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-2 pb-1 text-center">
                <p className="text-[11px] font-bold text-white font-serif">Dr. Ghulam Mohammad Kumar</p>
                <p className="text-[10px] text-purple-400">Spiritual Guide &amp; Mentor</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest font-mono block">
                  SPIRITUAL GUIDE &amp; MENTOR
                </span>
                <h3 className="text-lg font-bold text-white">Dr. Ghulam Mohammad Kumar</h3>
              </div>
              <p>
                <strong className="text-white">Dr. Ghulam Mohammad Kumar</strong>, a Kashmiri spiritual guide and teacher, is the spiritual mentor of <strong className="text-white">Mr. Fayaz Ahmad Khan</strong>, founder of Kashmir EcoWatch.
              </p>
              <p>
                His teachings emphasize self-awareness, humility, inner discipline, compassion, ethical conduct, and service to humanity without expectation of personal recognition.
              </p>
              <p>
                Inspired by this spiritual relationship, Mr. Fayaz Ahmad Khan established <strong className="text-white">Dr. Kumar Foundation USA</strong>, an institutional trust named in honor of his spiritual guide, to steward non-commercial philanthropic, humanitarian, and environmental knowledge initiatives.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-950 overflow-hidden shadow-lg">
            <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Three Separate Institutional Responsibilities
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider font-bold w-fit">
                Governance Delineation
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/80 text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                    <th className="py-3 px-4 sm:px-6 w-1/3">Entity</th>
                    <th className="py-3 px-4 sm:px-6 w-2/3">Institutional Role &amp; Governance Boundary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300 leading-relaxed">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Dr. Ghulam Mohammad Kumar
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      Spiritual guide and ethical inspiration; does not direct scientific assessments, telemetry pipelines, or editorial operations.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Dr. Kumar Foundation USA
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      Institutional trust established by Mr. Fayaz Ahmad Khan to develop, operate, and safeguard Kashmir EcoWatch as a non-commercial public-interest platform.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Prime Logic Solutions USA
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      In-kind technology development, cloud engineering, and infrastructure maintenance via Corporate Social Responsibility (zero equity or editorial control).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-lg bg-slate-950/90 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono block">
                  Institutional Stewardship &amp; Public Accountability
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Philanthropic Support, Licensing &amp; Disambiguation
                </h3>
              </div>
              <a
                href="https://dkf.sufisciencecenter.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
              >
                <span>Visit Dr. Kumar Foundation USA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/about/support-sponsorship"
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Institutional Sponsorship &amp; CSR</span>
              </Link>
              <Link
                href="/about/founder"
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Founder Leadership &amp; Purpose</span>
              </Link>
              <Link
                href="/open-data"
                className="px-4 py-2 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Data &amp; CC BY-NC 4.0 Licensing</span>
              </Link>
              <Link
                href="/governance/legislation-enforcement-observatory"
                className="px-4 py-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Legislation &amp; Enforcement Observatory (16 Registries)</span>
              </Link>
            </div>

            <div className="pt-4 mt-2 border-t border-white/10 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Canonical Institutional Disambiguation:</strong>{' '}
              Kashmir EcoWatch (<strong className="text-white">Kashmir EcoWatch Western Himalayan</strong> /{' '}
              <strong className="text-white">KEW Western Himalayan</strong>,{' '}
              <Link href="/" className="text-emerald-400 hover:underline font-mono">
                https://kashmir-ecowatch.com/
              </Link>
              ), established in 2004 as the Environment and Service Research Organization (ESRO) and headquartered in Loudoun County, Virginia, USA, operates independently and is unaffiliated with <em>Jammu &amp; Kashmir Eco-Watch (J&amp;K Eco-Watch)</em>, <em>EcoWatch (ecowatch.com)</em>, or the <em>Royal Botanic Gardens, Kew</em>.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
