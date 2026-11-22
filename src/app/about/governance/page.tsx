'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trees, BookOpen, Globe2, Mountain, Shield, Quote,
  ArrowRight, ExternalLink, CheckCircle2, Layers, Activity,
  Droplets, Feather, Flame, Scale, Compass, Sparkles, Map,
  Award, Info, FileText, Check, ShieldCheck, Heart, Landmark, Building2
} from 'lucide-react';

export default function GovernancePage() {
  // Identifiable historical and institutional reference points (replacing invented scores)
  const historicalFacts = [
    {
      value: '14th C.',
      label: 'Historical Origin',
      sub: "Kashmir's Rishi tradition (c. 1377/1378–1440 CE)",
      icon: BookOpen,
      color: 'text-emerald-400'
    },
    {
      value: '1992',
      label: 'Rio Earth Summit',
      sub: 'Modern international milestone (UNCED Agenda 21)',
      icon: Globe2,
      color: 'text-sky-400'
    },
    {
      value: '27',
      label: 'Rio Principles',
      sub: 'Multilateral global environmental framework',
      icon: Scale,
      color: 'text-amber-400'
    },
    {
      value: '5',
      label: 'KEW Coverage Regions',
      sub: 'Western Himalayan transboundary scope',
      icon: Mountain,
      color: 'text-purple-400'
    }
  ];

  // Comparative Framework: Moral Ecology vs. Modern Environmental Governance
  const comparisonMatrix = [
    {
      dimension: 'Foundation',
      alamdar: 'Ethical and spiritual responsibility rooted in Kashmiri Rishi contemplative practice',
      modern: 'Empirical science, international environmental law, statutory policy, and public participation'
    },
    {
      dimension: 'Central Concern',
      alamdar: 'Human dependence on living nature ("Ann poshi teli yeli wan poshi")',
      modern: 'Ecological protection, pollution abatement, biodiversity preservation, and sustainable development'
    },
    {
      dimension: 'Communication',
      alamdar: 'Oral vernacular poetry (Shruks), cultural memory, and lived community ethics',
      modern: 'Scientific peer-reviewed evidence, multilateral treaties, legal statutes, and policy instruments'
    },
    {
      dimension: 'Accountability',
      alamdar: 'Moral conscience, communal stewardship, and intergenerational reverence for the sacred landscape',
      modern: 'Public regulatory authorities, legal compliance, statutory reporting, and sensor-based monitoring'
    },
    {
      dimension: 'Environmental Knowledge',
      alamdar: 'Place-based indigenous wisdom, natural seasonal observation, and contemplative awareness',
      modern: 'Empirical measurement, Earth observation satellite telemetry, numerical modeling, and laboratory testing'
    },
    {
      dimension: 'KEW Application',
      alamdar: 'Ethical orientation: defines the moral purpose and civic responsibility of the platform',
      modern: 'Operational execution: defines analytical methods, sensor telemetry pipelines, and independent verification'
    }
  ];

  // KEW's Five Principles of Ecological Governance
  const governancePrinciples = [
    {
      id: 1,
      title: 'Ecological Interdependence',
      subtitle: 'Living Systems & Food Security',
      desc: 'Recognizing the connected relationships among forests, rivers, wetlands, biodiversity, agricultural systems, and mountain communities. Disruption of one component inevitably destabilizes the whole.',
      icon: Trees,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 2,
      title: 'Scientific Integrity',
      subtitle: 'Evidence, Traceability & Disclosed Uncertainty',
      desc: 'Maintaining evidence-based environmental assessments, transparent open methodologies, provenance-tracked data streams, and clear disclosure of scientific margins of uncertainty. Traditional wisdom inspires our inquiry; empirical verification dictates our findings.',
      icon: ShieldCheck,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      id: 3,
      title: 'Public Environmental Knowledge',
      subtitle: 'Open Data & Democratic Access',
      desc: 'Ensuring that environmental datasets, satellite indicators, water quality measurements, and hazard intelligence remain accessible to local communities, students, researchers, and public institutions without commercial barriers, subject only to legitimate life-safety constraints.',
      icon: BookOpen,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 4,
      title: 'Intergenerational Stewardship',
      subtitle: 'Responsibility Beyond the Present',
      desc: 'Grounding every conservation assessment and infrastructure review in long-term ecological consequences. The ecosystems of the Western Himalaya are not disposable inheritances for short-term consumption, but shared trusts held on behalf of generations yet unborn.',
      icon: Compass,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 5,
      title: 'Independent Environmental Responsibility',
      subtitle: 'Objective Public-Interest Intelligence',
      desc: 'Upholding strict institutional independence from commercial, political, or jurisdictional interests. Environmental assessments, road corridor safety alerts, and hazard telemetry are delivered objectively based solely on verifiable ground and satellite truth.',
      icon: Scale,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    }
  ];

  // From Moral Ecology to Measurable Scientific Systems
  const operationalModules = [
    {
      principle: 'Protect Forests & Vegetation',
      alamdarConcept: 'Wan Poshi (Living Forests)',
      kewModule: 'Forest Cover & Biodiversity Intelligence',
      desc: 'Forest-cover monitoring, satellite canopy density tracking, alpine habitat fragmentation modeling, and protected area GIS mapping.',
      link: '/biodiversity',
      color: 'text-emerald-400'
    },
    {
      principle: 'Protect Water & Springs',
      alamdarConcept: 'Nag & Chashma Reverence',
      kewModule: 'Water Systems & Limnology Hub',
      desc: 'Lake water quality indexation, Copernicus Sentinel-2 biomass proxy (NDCI), spring-shed mapping, river basin discharge, and groundwater reserves.',
      link: '/water-systems',
      color: 'text-sky-400'
    },
    {
      principle: 'Protect Food Systems & Soils',
      alamdarConcept: 'Ann Poshi (Enduring Nourishment)',
      kewModule: 'Sectoral EIA & Agricultural Resilience',
      desc: 'Agriculture, horticulture, Pampore saffron landscape vulnerability, cement industrial dust dispersion modeling, and catchment soil health.',
      link: '/sectoral-eia',
      color: 'text-amber-400'
    },
    {
      principle: 'Protect Mountain Communities',
      alamdarConcept: 'Communal Care & Compassion',
      kewModule: 'Hazard Intelligence Command Center',
      desc: 'Decoupled road corridor landslide alerts, real-time seismic feeds (EMSC/USGS), avalanche bulletins, GLOF monitoring, and flash flood telemetry.',
      link: '/hazard-intelligence',
      color: 'text-rose-400'
    },
    {
      principle: 'Protect Future Generations',
      alamdarConcept: 'Intergenerational Trust',
      kewModule: 'Long-Term Climate & Cryosphere Records',
      desc: 'Multi-decadal glacial retreat observations, 25-year climate change baselines, permafrost thaw indices, and environmental education.',
      link: '/environmental-calendar',
      color: 'text-purple-400'
    },
    {
      principle: 'Share Ecological Knowledge',
      alamdarConcept: 'Public Vernacular Wisdom',
      kewModule: 'Citizen Science & Open Data Commons',
      desc: 'Standardized field observations, public API feeds with zero VPS disk footprint, student field classrooms, and cross-border scientific exchanges.',
      link: '/join-citizen-science',
      color: 'text-teal-400'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      
      {/* ─── 1. INSTITUTIONAL HERO: ECOLOGICAL GOVERNANCE ──────────────────────── */}
      <section className="relative bg-slate-950 border-b border-white/10 overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 min-h-[460px] lg:min-h-[520px] flex items-center">
        {/* Approved Photographic Hero Background (Local Asset: Governance & Alamdar Ethos) */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_30%] sm:bg-[position:center_35%] lg:bg-[position:right_center]"
          style={{ backgroundImage: "url('/images/governance-alamdar-hero.jpg')" }}
        />

        {/* Restrained dark gradient overlay for text legibility while keeping the photograph visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 sm:via-slate-950/80 to-slate-950/35 pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
        
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
          <div className="max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 mb-4 sm:mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-slate-500">/</span>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <span className="text-slate-500">/</span>
              <span className="text-emerald-400 font-medium">Governance &amp; Alamdar Ethos</span>
            </nav>

            {/* Super-title Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>CIVILIZATIONAL WISDOM &amp; INSTITUTIONAL GOVERNANCE</span>
            </div>

            {/* Main Heading: Preserving Institutional Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-3 break-words">
              Governance &amp; Alamdar Ethos
            </h1>

            {/* Subtitle: Ecological Governance */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-emerald-300 mb-2 tracking-wide leading-snug">
              Ecological Governance Rooted in Kashmir&apos;s Civilizational Wisdom
            </h2>

            {/* Subtitle / Tagline */}
            <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-4 tracking-wide font-mono">
              Sheikh Noor-ud-Din Wali · Scientific Stewardship · Environmental Responsibility
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed mb-6">
              Kashmir EcoWatch draws ethical inspiration from the ecological wisdom associated with Sheikh Noor-ud-Din Wali, revered as Sheikh-ul-Alam, Nund Rishi, and Alamdar-e-Kashmir. His enduring teaching on the relationship between forests and human nourishment provides a cultural foundation for an institution dedicated to environmental knowledge, ecological resilience, and responsible stewardship across the Western Himalaya.
            </p>

            {/* Contextual Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#maxim-section"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
              >
                <span>The Ecological Maxim</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#comparative-matrix"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 hover:border-emerald-500/40 font-semibold text-xs sm:text-sm transition-all duration-200"
              >
                <Scale className="w-4 h-4 text-sky-400" />
                <span>Moral Ecology &amp; Rio</span>
              </a>
              <a
                href="#governance-principles"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 font-medium text-xs sm:text-sm transition-all duration-200"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Five Principles</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. IDENTIFIABLE HISTORICAL REFERENCE POINTS ────────────────────────── */}
      <section className="relative z-10 mt-6 sm:mt-8 container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {historicalFacts.map((fact, idx) => (
              <div
                key={idx}
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

        {/* ─── 3. THE ENDURING ECOLOGICAL MAXIM & ALAMDAR-E-KASHMIR ETHOS ──────── */}
        <section id="maxim-section" className="scroll-mt-24">
          <div className="p-6 sm:p-10 md:p-12 rounded-lg border border-emerald-500/30 bg-slate-900 relative overflow-hidden shadow-xl space-y-8">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-500/10 pointer-events-none" />
            <Quote className="absolute bottom-6 right-6 w-16 h-16 text-emerald-500/10 rotate-180 pointer-events-none" />

            {/* Header & Sub-badge */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE ENDURING ECOLOGICAL MAXIM &amp; CIVILIZATIONAL ETHOS</span>
              </div>

              {/* Original Kashmiri Text & Translation */}
              <div className="pt-2">
                <p className="text-2xl sm:text-4xl text-emerald-200 tracking-wide dir-rtl mb-2 select-text font-serif" dir="rtl">
                  اَن پوشہِ تلہِ یلہِ وَن پوشہِ
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic tracking-tight font-serif">
                  &ldquo;Ann Poshi Teli Yeli Wan Poshi&rdquo;
                </h2>
                <p className="text-lg sm:text-2xl text-emerald-300 font-semibold mt-2">
                  Food will endure as long as forests endure.
                </p>
              </div>

              {/* Explicit Historical Identity Clarification Banner */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs font-medium max-w-2xl mx-auto mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Historical Clarification:</strong> Sheikh Noor-ud-Din Wali (RA) and Alamdar-e-Kashmir are the same venerated historical figure — also revered as Sheikh-ul-Alam and Nund Rishi (c. 1377/1378–1440 CE).
                </span>
              </div>
            </div>

            {/* Visionary Narrative & Portrait Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Visual Card / Portrait Frame */}
              <div className="lg:col-span-5 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-950/80 p-2 space-y-2">
                <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-slate-900">
                  <img
                    src="/images/R.jfif"
                    alt="Alamdar-e-Kashmir — Sheikh Noor-ud-Din Wali"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/governance-alamdar-hero.jpg';
                    }}
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
                    &ldquo;Sustainability is not sacrifice; it’s symbiosis.&rdquo;
                  </p>
                  <p className="text-slate-400 mt-1">
                    A timeless recognition that human nourishment is forever bound to living watersheds, soil vitality, and protected mountain forests.
                  </p>
                </div>
              </div>

              {/* Prose Narrative: Visionary & Trailblazer */}
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                <p>
                  <strong className="text-white">Alamdar-e-Kashmir</strong>, a visionary and trailblazer, left an indelible mark on the landscape of environmental sustainability across the Kashmir Himalayas. His unwavering commitment to preserving our planet resonates through time, inspiring generations to tread lightly upon the Earth.
                </p>
                <p>
                  In the verdant valleys of Kashmir, Alamdar championed holistic practices that harmonized with nature. His wisdom flowed like the Jhelum River, nurturing not only the soil but also the consciousness of those who listened. From the snow-capped peaks of the Himalayas to the saffron fields of Pampore, he wove an enduring tapestry of ecological balance.
                </p>
                <p>
                  His legacy? <strong className="text-emerald-300">A symphony of interconnectedness</strong>—a delicate dance between humans and their surroundings. Alamdar-e-Kashmir understood that sustainability wasn’t a buzzword; it was a way of life. He planted seeds of awareness, urging communities to protect biodiversity, revere springs and watercourses, and safeguard fragile mountain ecosystems.
                </p>
                <p>
                  Alamdar-e-Kashmir — <strong className="text-white">the Flag Bearer of Kashmir</strong> — remains etched in the annals of environmental consciousness. His legacy, like the whispering winds through pine forests, urges us to tread gently upon the Earth, nurturing its fragile balance.
                </p>
                <p className="pt-1 text-slate-200">
                  Today, as we reflect on Alamdar&apos;s enduring legacy, we are reminded of the profound impact that one individual can have on the world. His pioneering spirit, unwavering dedication, and timeless wisdom serve as an inspiration to us all, urging us to honor and preserve the precious gift of nature for generations to come.
                </p>
              </div>
            </div>

            {/* Cultural & Scientific Context Summary Box */}
            <div className="text-left space-y-3 font-normal bg-slate-950/60 p-6 rounded-lg border border-white/5 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Cultural &amp; Historical Grounding:</strong> The maxim <em>&ldquo;Ann poshi teli yeli wan poshi&rdquo;</em> articulates an ecological dependency that remains vital across centuries. Forests protect mountain watersheds, regulate hydrological processes, stabilize steep slopes, provide essential habitats, and underpin the agrarian foundations of Himalayan life.
              </p>
              <p className="text-emerald-300 font-medium">
                Ecological responsibility is not foreign to Kashmir&apos;s heritage. It is deeply embedded in its civilizational and spiritual traditions.
              </p>
            </div>

            {/* Micro-fact footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono text-center">
              <span>Historical Attribution: c. 1377/1378 – 1440 CE</span>
              <span>·</span>
              <span>Literary Genre: Kashmiri Shruk</span>
              <span>·</span>
              <span>Identity: Sheikh Noor-ud-Din Wali / Alamdar-e-Kashmir</span>
              <span>·</span>
              <span>Ethos: Symbiosis Over Sacrifice</span>
            </div>
          </div>
        </section>

        {/* ─── 4. TWO TRADITIONS, A SHARED RESPONSIBILITY: COMPARATIVE MATRIX ───── */}
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
              Centuries separate the Kashmir Rishi tradition from the 1992 United Nations Conference on Environment and Development (UNCED). They emerged from different historical circumstances and served different purposes: one communicated ethical responsibility through language, spiritual teaching and collective memory, while the other established international principles, agreements, treaties, and legal programs. Neither needs to diminish the other. Together, they demonstrate how cultural wisdom and modern scientific governance can inform a common responsibility toward the natural world.
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
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
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
                <strong className="text-white font-semibold">The Core Institutional Principle:</strong> Traditional ecological wisdom can guide the questions an institution asks; scientific methods must determine the answers it publishes. The moral imperative is enduring; the scientific instruments of environmental protection continue to evolve.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. FIVE PRINCIPLES OF ECOLOGICAL GOVERNANCE ──────────────────────── */}
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
              These five principles represent Kashmir EcoWatch&apos;s contemporary institutional interpretation of Alamdar&apos;s teaching, operationalized as governance commitments rather than direct manuscript quotations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governancePrinciples.map(p => (
              <div
                key={p.id}
                className="p-5 sm:p-6 rounded-lg bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-md ${p.bg}`}>
                        <p.icon className={`w-4 h-4 ${p.color}`} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Principle {p.id}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. OPERATIONAL APPLICATION: FROM MORAL ECOLOGY TO SCIENCE ───────── */}
        <section id="operational-systems" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                FROM CIVILIZATIONAL WISDOM TO ENVIRONMENTAL INTELLIGENCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The Institutional Application of Alamdar&apos;s Ethos
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
              Kashmir EcoWatch translates its contemporary interpretation of this ecological philosophy into a functional framework for environmental monitoring, research and scientific collaboration across the Western Himalaya. Cultural heritage provides ethical inspiration; science provides methods of investigation; institutional governance establishes responsibility for how knowledge is produced, verified and shared.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operationalModules.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold ${m.color}`}>
                      {m.principle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-400">
                      {m.alamdarConcept}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {m.kewModule}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {m.desc}
                  </p>
                </div>
                <Link
                  href={m.link}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 pt-2 border-t border-white/5 transition-colors"
                >
                  <span>Access Monitoring Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 7. AN ETHOS BEYOND BORDERS: TRANSBOUNDARY HIMALAYAN ECOLOGY ───────── */}
        <section className="p-8 sm:p-10 rounded-lg bg-slate-900/40 border border-white/10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                AN ETHOS BEYOND BORDERS
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Shared Ecology, Shared Responsibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Western Himalaya encompasses interconnected mountain ecosystems, river basins, forests, glaciers, wetlands and human settlements across multiple administrative and political jurisdictions across all five regions: <strong className="text-white">Kashmir Valley, Jammu Division, Ladakh, Azad Kashmir, and Gilgit-Baltistan</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Environmental processes do not follow political boundaries. Hydrological runoffs, glacial retreat, seismotectonic fault movements, wildfire smoke, and migratory flyways cross jurisdictions daily. Kashmir EcoWatch therefore approaches ecological knowledge as a shared regional responsibility, respecting different jurisdictions while encouraging scientific cooperation, transparent evidence and responsible environmental stewardship. Its commitment is geographical and ecological, not a claim of political or religious authority.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-mono pt-2">
              Coverage: Kashmir Core · Trans-Divisional (Jammu &amp; Ladakh) · Transboundary (Azad Kashmir &amp; Gilgit-Baltistan)
            </p>
          </div>
        </section>

        {/* ─── 8. THE KEW INSTITUTIONAL COVENANT ─────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-lg bg-slate-900/60 border border-emerald-500/30 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
              THE KEW INSTITUTIONAL COVENANT
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Knowledge in Service of the Living Himalaya
          </h3>
          <p>
            Kashmir EcoWatch adopts Alamdar&apos;s ecological maxim as a source of ethical inspiration, while grounding its environmental observations, assessments and public information in appropriate scientific evidence.
          </p>
          <p>
            The institution recognizes that no spiritual teaching, cultural tradition, government designation or technological system can substitute for rigorous scientific verification. Its responsibility is to connect these distinct forms of knowledge without confusing their purposes.
          </p>
          <div className="p-4 rounded-md bg-slate-950 border border-white/10 my-4 text-center">
            <p className="text-sm sm:text-base font-bold text-emerald-300 font-serif mb-1">
              Heritage inspires responsibility. Science establishes evidence. Governance safeguards integrity.
            </p>
            <p className="text-xs text-slate-400 font-serif italic">
              Ann Poshi Teli Yeli Wan Poshi. May the forests endure, and with them the living foundations of the Western Himalaya.
            </p>
          </div>
        </section>

        {/* ─── 9. SOURCES & METHODOLOGY ─────────────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-lg bg-slate-950 border border-white/5 text-xs text-slate-400 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Documentary Sources &amp; Scholarly Attribution</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
            <div>
              <p className="font-semibold text-slate-300 mb-1">Traditional Kashmiri Maxim &amp; Historical Context:</p>
              <p>
                The aphorism <em>&ldquo;Ann poshi teli yeli wan poshi&rdquo;</em> is universally recognized in Kashmiri oral literature and scholarly compilations of Sheikh Noor-ud-Din Wali&apos;s poetry (Rishi Nama traditions). Dates are documented as c. 1377/1378–1440 CE. Modern translations and traditional attributions are presented as civilizational ethics rather than authenticated medieval legislative codes.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">United Nations Rio Earth Summit (1992):</p>
              <p>
                United Nations Conference on Environment and Development (UNCED), Rio de Janeiro, 1992. Core outcomes include the Rio Declaration on Environment and Development (27 Principles), Agenda 21 (40 chapters), the United Nations Framework Convention on Climate Change (UNFCCC), and the Convention on Biological Diversity (CBD).
              </p>
            </div>
          </div>
        </section>

        {/* ─── 10. SPIRITUAL INSPIRATION & INSTITUTIONAL PHILANTHROPY ─────────── */}
        <section className="p-6 sm:p-10 rounded-lg bg-slate-900/40 border border-purple-500/20 relative overflow-hidden space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 font-mono">
                SPIRITUAL INSPIRATION &amp; INSTITUTIONAL PHILANTHROPY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dr. Ghulam Mohammad Kumar &amp; Dr. Kumar Foundation USA
            </h2>
            <p className="text-xs sm:text-sm text-purple-300 font-medium">
              Spiritual Guidance, Ethical Responsibility &amp; Environmental Stewardship
            </p>
          </div>

          {/* Sub-section 1: Dr. Ghulam Mohammad Kumar — Spiritual Guide & Mentor */}
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
                <h3 className="text-lg font-bold text-white">
                  Dr. Ghulam Mohammad Kumar
                </h3>
              </div>
              <p>
                <strong className="text-white">Dr. Ghulam Mohammad Kumar</strong>, a Kashmiri spiritual guide and teacher, is the spiritual mentor of <strong className="text-white">Mr. Fayaz Ahmad Khan</strong>, founder of Kashmir EcoWatch.
              </p>
              <p>
                His teachings emphasize self-awareness, humility, inner discipline, compassion, ethical conduct and service to humanity without expectation of personal recognition.
              </p>
              <p>
                Inspired by this spiritual relationship, Mr. Fayaz Ahmad Khan established <strong className="text-white">Dr. Kumar Foundation USA</strong>, a trust named in honor of his spiritual guide, to provide an institutional foundation for philanthropic, humanitarian and environmental initiatives.
              </p>
            </div>
          </div>

          {/* Sub-section 2: Dr. Kumar Foundation USA: Institutional Stewardship */}
          <div className="p-6 sm:p-8 rounded-lg bg-slate-950/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Landmark className="w-4 h-4" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Dr. Kumar Foundation USA: Institutional Stewardship of Kashmir EcoWatch
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Dr. Kumar Foundation USA</strong> was established by Mr. Fayaz Ahmad Khan to develop, operate and support Kashmir EcoWatch as a non-commercial environmental knowledge and scientific research platform serving the Western Himalaya.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The initiative reflects the founder&apos;s commitment to returning scientific knowledge to the region where his interest in environmental science began, despite no longer residing, working or holding citizenship there.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Through the Foundation, this personal commitment is expressed as an organized institutional mission dedicated to environmental monitoring, ecological research, scientific education, disaster resilience and public-interest knowledge sharing.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
              Enterprise software development, cloud infrastructure and technical maintenance are supported by <strong className="text-white">Prime Logic Solutions USA</strong>{' '}through its Corporate Social Responsibility initiative.
            </p>
          </div>

          {/* Sub-section 3: Institutional Distinction */}
          <div className="p-6 sm:p-8 rounded-lg bg-slate-950/90 border border-purple-500/30 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest font-mono block">
                ORGANIZATIONAL CLARITY
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Institutional Distinction
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kashmir EcoWatch recognizes three distinct foundations of its mission:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-md bg-slate-900 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block font-serif">
                  Sheikh Noor-ud-Din Wali (Alamdar-e-Kashmir)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The historical and civilizational source of the ecological philosophy informing the platform&apos;s ethical framework.
                </p>
              </div>

              <div className="p-4 rounded-md bg-slate-900 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-purple-400 block font-serif">
                  Dr. Ghulam Mohammad Kumar
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The personal spiritual guide of the founder, whose teachings inspire ethical responsibility, humility and service to humanity.
                </p>
              </div>

              <div className="p-4 rounded-md bg-slate-900 border border-white/5 space-y-2">
                <span className="text-xs font-bold text-sky-400 block font-serif">
                  Dr. Kumar Foundation USA
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The institutional trust established by Mr. Fayaz Ahmad Khan in his spiritual guide&apos;s name to develop, operate and support Kashmir EcoWatch.
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 pt-2">
              <p>
                Dr. Kumar&apos;s role is one of spiritual guidance and ethical inspiration. He does not personally direct the platform&apos;s scientific assessments, environmental monitoring or technical operations.
              </p>
              <p>
                Kashmir EcoWatch maintains scientific integrity through evidence-based methodologies, transparent research practices and independent environmental evaluation.
              </p>
            </div>

            {/* Tripartite Motto Callout */}
            <div className="p-4 rounded-md bg-slate-950 border border-purple-500/40 text-center my-3">
              <p className="text-xs sm:text-sm font-bold text-purple-300 font-serif tracking-wide">
                Spiritual Inspiration · Institutional Stewardship · Scientific Independence
              </p>
            </div>
          </div>

          {/* Sub-section 4: Three Separate Responsibilities Table */}
          <div className="rounded-lg border border-white/10 bg-slate-950 overflow-hidden shadow-lg">
            <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-white">
                Three Separate Institutional Responsibilities
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider font-bold w-fit">
                Governance Delineation
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/80 text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                    <th className="py-3 px-4 sm:px-6 w-1/3">Entity</th>
                    <th className="py-3 px-4 sm:px-6 w-2/3">Institutional Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300 leading-relaxed">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Dr. Ghulam Mohammad Kumar
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      Spiritual guide and ethical inspiration
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Dr. Kumar Foundation USA
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      Trust established by Mr. Fayaz Ahmad Khan to develop, operate and support KEW
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-white">
                      Prime Logic Solutions USA
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      Technology development, cloud engineering and maintenance through CSR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-section 5: Philanthropic Sponsorship & CTA */}
          <div className="p-6 sm:p-8 rounded-lg bg-slate-950/90 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono block">
                  Spearheaded &amp; Supported by Dr. Kumar Foundation USA
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Philanthropic Sponsorship &amp; Engineering Delivery
                </h4>
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

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kashmir EcoWatch is a non-commercial environmental knowledge initiative supported through the philanthropic mission of <strong className="text-white">Dr. Kumar Foundation USA</strong>, with digital engineering and technical development contributed by <strong className="text-white">Prime Logic Solutions USA</strong>{' '}through its Corporate Social Responsibility initiative.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The platform represents a commitment to returning knowledge, advancing ecological understanding, and serving the environmental interests of communities throughout the Western Himalaya.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://dkf.sufisciencecenter.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Dr. Kumar Foundation Portal</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <Link
                href="/about/support-sponsorship"
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Institutional Sponsorship &amp; CSR</span>
              </Link>
              <Link
                href="/about/founder"
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Founder Leadership &amp; Purpose</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
