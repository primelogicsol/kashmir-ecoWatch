'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen, Database, MapPin, FileSearch, Layers, Shield,
  Eye, Globe, FlaskConical, Users, AlertTriangle, RefreshCw,
  CheckCircle, FileText, ChevronRight, ArrowRight, Mail,
  Clock, Cpu, BarChart2, Leaf, Droplets, Zap, Activity,
  MessageSquare, Info, ScrollText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'foundation',    label: 'Scientific Foundation' },
  { id: 'principles',   label: 'Core Principles' },
  { id: 'collection',   label: 'Data Collection' },
  { id: 'pipeline',     label: 'Eight-Stage Pipeline' },
  { id: 'geospatial',   label: 'Geospatial Intelligence' },
  { id: 'indicators',   label: 'Environmental Indicators' },
  { id: 'biodiversity', label: 'Biodiversity Methodology' },
  { id: 'monitoring',   label: 'Environmental Monitoring' },
  { id: 'hazard',       label: 'Hazard Intelligence' },
  { id: 'validation',   label: 'Data Validation' },
  { id: 'evidence',     label: 'Evidence Type Handling' },
  { id: 'publication',  label: 'Publication Status Logic' },
  { id: 'ai',           label: 'Artificial Intelligence' },
  { id: 'limitations',  label: 'Data Limitations' },
  { id: 'expert',       label: 'Expert Committee' },
  { id: 'geographic',   label: 'Geographic Scope' },
  { id: 'open-data',    label: 'Open Data & Attribution' },
  { id: 'updates',      label: 'Updates' },
  { id: 'feedback',     label: 'Feedback & Corrections' },
];

/* ─── Data ───────────────────────────────────────────────────────────── */

const principles = [
  { icon: FileSearch, title: 'Evidence-Based',        accent: 'text-blue-400',   bg: 'bg-blue-500/10',   desc: 'Environmental information is compiled from verifiable scientific observations, government publications, research literature, institutional datasets, satellite imagery, field observations, and validated public data sources.' },
  { icon: Eye,        title: 'Transparency',           accent: 'text-emerald-400',bg: 'bg-emerald-500/10',desc: 'Every dataset is accompanied by available metadata, source attribution, update history, and methodology documentation whenever applicable.' },
  { icon: Shield,     title: 'Scientific Neutrality',  accent: 'text-violet-400', bg: 'bg-violet-500/10', desc: 'KEW does not advocate political positions or policy outcomes. Environmental information is presented objectively based on available evidence.' },
  { icon: RefreshCw,  title: 'Continuous Improvement', accent: 'text-amber-400',  bg: 'bg-amber-500/10',  desc: 'Datasets, models, and environmental indicators are periodically reviewed and refined as new scientific information becomes available.' },
];

const steps = [
  { step: 1, title: 'Source Identification & Contribution Intake', icon: Database,   color: 'from-blue-500 to-cyan-600',     desc: 'Environmental data enters KEW through multiple pathways, including verified government agencies, environmental authorities, academic and research institutions, NGOs, field monitoring networks, Earth observation and geospatial systems, biodiversity reference networks, and community-supported evidence streams.' },
  { step: 2, title: 'Source Classification & Relevance Mapping',   icon: FileSearch, color: 'from-emerald-500 to-teal-600',  desc: 'Each contribution or incoming dataset is classified by source type, geographic scope, thematic relevance, data type, and intended platform use — determining whether a record belongs in biodiversity, water systems, environmental monitoring, hazard intelligence, district profiles, or internal review systems.' },
  { step: 3, title: 'Validation & Evidence Review',                 icon: CheckCircle,color: 'from-violet-500 to-purple-600', desc: 'Records are checked for internal consistency, plausibility, source credibility, completeness, and alignment with available contextual evidence, including comparison against institutional records, scientific references, field observations, location coherence, and associated evidence such as photographs, coordinates, and timestamps.' },
  { step: 4, title: 'Standardization & Structuring',               icon: Layers,     color: 'from-amber-500 to-orange-600',  desc: 'Validated data is converted into standardized formats appropriate to its type: taxonomic normalisation, geographic formatting, metadata alignment, thematic coding, temporal formatting, and structured tagging for dashboards, maps, district views, and module-level intelligence systems.' },
  { step: 5, title: 'Geospatial Integration & Thematic Routing',   icon: MapPin,     color: 'from-indigo-500 to-blue-600',   desc: 'Where spatial relevance exists, records are mapped into geospatial workflows using coordinates, administrative boundaries, environmental zones, habitat references, water systems, monitoring areas, or risk-linked locations. Data is then routed into the relevant thematic systems.' },
  { step: 6, title: 'Quality Review & Expert Assessment',           icon: Eye,        color: 'from-rose-500 to-red-600',      desc: 'Before publication, data may pass through quality review layers considering sensitivity, interpretive risk, thematic fit, and public-use implications — further informed by the KEW Global Diaspora Environmental Expert Committee.' },
  { step: 7, title: 'Publication, Status Tagging & Access Controls',icon: Shield,     color: 'from-slate-500 to-gray-600',    desc: 'Records may appear with different publication states — Verified, Under Review, Institutionally Sourced, Community Submitted, Historical, or Restricted / Sensitive. Some records may be generalised, masked, delayed, or withheld from full public display where ecological, safety, or interpretive concerns apply.' },
  { step: 8, title: 'Revalidation, Feedback & Ongoing Updates',    icon: RefreshCw,  color: 'from-teal-500 to-emerald-600',  desc: 'Kashmir EcoWatch is not a static archive. Existing records, mapped features, community-supported evidence, and environmental intelligence layers may be revisited, updated, corrected, or reclassified over time as new information, expert review, or field-based verification becomes available.' },
];

const evidenceHandling = [
  { type: 'Institutional & Regulatory Sources', handling: 'May enter with stronger baseline confidence but still require thematic and contextual handling before publication.' },
  { type: 'Community-Supported Evidence',        handling: 'May require additional screening, review, and contextual comparison against institutional and scientific references before broader publication.' },
  { type: 'Remote Sensing & GIS Inputs',         handling: 'Strengthen interpretation and spatial analysis, but may still require field context, institutional cross-reference, and review-based use rather than automatic stand-alone public claims.' },
  { type: 'Sensitive Biodiversity & Incident Records', handling: 'May be generalised, partially restricted, or delayed in public display where exact publication could affect ecological sensitivity, vulnerable habitats, or species protection.' },
];

const publicationStatuses = [
  { label: 'Verified',               color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Passed multi-layer review; highest confidence' },
  { label: 'Under Review',           color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  desc: 'Submitted and undergoing assessment' },
  { label: 'Institutionally Sourced',color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',   desc: 'From recognised authority or agency' },
  { label: 'Community Submitted',    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20', desc: 'From citizen scientists or field contributors' },
  { label: 'Historical',             color: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/20',  desc: 'Archived record with time-bound relevance' },
  { label: 'Restricted / Sensitive', color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',    desc: 'Limited public display due to sensitivity' },
];

/* ─── Active section tracker ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState('foundation');
  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -75% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── Section wrapper ─────────────────────────────────────────────────── */

function Section({ id, icon: Icon, title, accent = 'text-emerald-400', bg = 'bg-emerald-500/10', children }: {
  id: string; icon: React.ElementType; title: string; accent?: string; bg?: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Bullets({ items, accent = 'bg-emerald-400' }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-1.5 mt-1">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
          <span className={`w-1.5 h-1.5 rounded-full ${accent} flex-shrink-0 mt-[7px]`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Sidebar ─────────────────────────────────────────────────────────── */

function TableOfContents({ active }: { active: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contents</h3>
        </div>
        <RefreshCw className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav className="space-y-0.5 mt-3 max-h-[55vh] overflow-y-auto pr-1">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className={`flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-lg transition-all ${
                active === s.id ? 'bg-emerald-500/15 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronRight className={`w-2.5 h-2.5 flex-shrink-0 ${active === s.id ? 'text-emerald-400' : 'text-slate-600'}`} />
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

function CorePrinciplesSidebar() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Core Principles</h3>
      </div>
      <div className="space-y-2">
        {principles.map(p => (
          <div key={p.title} className={`flex items-center gap-2 rounded-lg ${p.bg} border border-white/5 px-3 py-2`}>
            <p.icon className={`w-3.5 h-3.5 ${p.accent} flex-shrink-0`} />
            <span className="text-xs text-slate-300">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedLinks() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Related</h3>
      </div>
      <ul className="space-y-2">
        {[
          { label: 'About KEW',          href: '/about' },
          { label: 'Open Data Portal',   href: '/open-data' },
          { label: 'Submit Observation', href: '/submit-observation' },
          { label: 'Research Library',   href: '/research-library' },
          { label: 'Contact KEW',        href: '/about/contact' },
        ].map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
              <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedbackSidebar() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contribute</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        Researchers and contributors are encouraged to report inaccuracies or suggest methodological improvements.
      </p>
      <Link href="/about/contact" className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors group">
        <Mail className="w-3.5 h-3.5" />
        <span>Contact KEW</span>
        <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function MethodologyPage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Methodology' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Our</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Methodology</span>
        </>}
        subtitle="Kashmir EcoWatch follows internationally recognised principles of environmental monitoring, geospatial intelligence, biodiversity documentation, and scientific data management."
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        label="Methodological Framework"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-intense border-white/10 p-7 sm:p-10 space-y-10">

                  {/* Scientific Foundation */}
                  <Section id="foundation" icon={BookOpen} title="Scientific Foundation">
                    <p className="border-l-2 border-emerald-500/40 pl-4">
                      Kashmir EcoWatch (KEW) follows internationally recognised principles of environmental monitoring, geospatial intelligence, biodiversity documentation, and scientific data management. The platform integrates multiple environmental datasets into a unified intelligence framework to support research, education, conservation, public awareness, and evidence-based decision making.
                    </p>
                    <p>
                      KEW is designed as an independent, non-commercial environmental intelligence platform. Information is presented to improve understanding of environmental systems and should not be interpreted as regulatory or legal determinations.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Core Principles */}
                  <Section id="principles" icon={CheckCircle} title="Core Methodological Principles">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      {principles.map(p => (
                        <div key={p.title} className={`rounded-xl ${p.bg} border border-white/5 p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <p.icon className={`w-4 h-4 ${p.accent}`} />
                            <div className={`text-xs font-bold ${p.accent}`}>{p.title}</div>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Data Collection */}
                  <Section id="collection" icon={Database} title="Data Collection Framework" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>Environmental intelligence is compiled through multiple complementary sources, including:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        { icon: '🏛️', label: 'Government environmental datasets' },
                        { icon: '🌐', label: 'International environmental databases' },
                        { icon: '📚', label: 'Scientific publications' },
                        { icon: '🔬', label: 'Peer-reviewed research' },
                        { icon: '🌿', label: 'Protected area documentation' },
                        { icon: '🦅', label: 'Biodiversity inventories' },
                        { icon: '💧', label: 'Hydrological observations' },
                        { icon: '🌡️', label: 'Meteorological information' },
                        { icon: '🛰️', label: 'Earth observation satellites' },
                        { icon: '👁️', label: 'Citizen science submissions' },
                        { icon: '🗺️', label: 'Field surveys' },
                        { icon: '🤝', label: 'Institutional partnerships' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
                          <span className="text-sm flex-shrink-0">{icon}</span>
                          <span className="text-[10px] text-slate-300 leading-tight">{label}</span>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Eight-Stage Pipeline */}
                  <Section id="pipeline" icon={Layers} title="Eight-Stage Data Handling Pipeline" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>Every record follows a structured pathway from source intake to ongoing revalidation:</p>
                    <div className="space-y-3 mt-3">
                      {steps.map(item => (
                        <div key={item.step} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/5 p-4">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Step {item.step}</span>
                              <span className="text-xs font-bold text-white">{item.title}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Geospatial Intelligence */}
                  <Section id="geospatial" icon={MapPin} title="Geospatial Intelligence" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>
                      KEW integrates modern Geographic Information Systems (GIS) and remote sensing techniques for environmental monitoring. Spatial datasets may include:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Administrative boundaries','Watersheds','Rivers','Lakes','Wetlands',
                        'Forest cover','Protected areas','Land cover','Elevation',
                        'Environmental hazards','Ecological regions',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-white/5 border border-white/5 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-teal-950/30 border border-teal-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Maps are intended for visualisation, research, and environmental awareness and should not be used as legal boundary references.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Environmental Indicators */}
                  <Section id="indicators" icon={BarChart2} title="Environmental Indicators" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>Environmental indicators are generated using measurable datasets that may include:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Biodiversity observations','Habitat condition','Water quality',
                        'Air quality','Climate variables','Forest cover',
                        'Ecosystem health','Land use','Environmental pressures','Conservation status',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-3 py-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Indicators are periodically updated as new information becomes available.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Biodiversity */}
                  <Section id="biodiversity" icon={Leaf} title="Biodiversity Methodology" accent="text-green-400" bg="bg-green-500/10">
                    <p>
                      Species information is compiled using internationally recognised taxonomic references and verified biodiversity records where available. Species profiles may include:
                    </p>
                    <Bullets accent="bg-green-400" items={[
                      'Scientific classification', 'Conservation status', 'Habitat', 'Distribution',
                      'Ecological significance', 'Threats', 'References',
                    ]} />
                    <p className="text-xs text-slate-400 mt-2">Taxonomy follows accepted scientific standards at the time of publication.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Environmental Monitoring */}
                  <Section id="monitoring" icon={Activity} title="Environmental Monitoring" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <p>Environmental monitoring combines multiple observation systems, including:</p>
                    <Bullets accent="bg-cyan-400" items={[
                      'Satellite observations', 'Ground monitoring stations', 'Meteorological information',
                      'Hydrological measurements', 'Remote sensing analysis', 'Environmental reports',
                      'Open environmental datasets',
                    ]} />
                    <p className="text-xs text-slate-400 mt-2">Some monitoring information may update automatically depending on data source availability.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Hazard Intelligence */}
                  <Section id="hazard" icon={Zap} title="Hazard Intelligence" accent="text-orange-400" bg="bg-orange-500/10">
                    <p>Hazard information may include:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      {[
                        { icon: '🌊', label: 'Flood monitoring' },
                        { icon: '🏔️', label: 'Landslide susceptibility' },
                        { icon: '❄️', label: 'Avalanche risk' },
                        { icon: '🌍', label: 'Earthquake information' },
                        { icon: '🧊', label: 'Glacier-related hazards' },
                        { icon: '⛈️', label: 'Extreme weather' },
                        { icon: '🔥', label: 'Wildfire observations' },
                        { icon: '⚠️', label: 'Environmental emergencies' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="rounded-xl bg-orange-950/20 border border-orange-500/10 p-3 text-center">
                          <div className="text-lg mb-1">{icon}</div>
                          <div className="text-[9px] text-slate-400 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Hazard layers are provided for awareness and research purposes and do not replace official emergency warnings.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Validation */}
                  <Section id="validation" icon={CheckCircle} title="Data Validation" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>Environmental information undergoes multiple quality assurance processes, including:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        'Source verification', 'Metadata review', 'Geographic consistency checks',
                        'Duplicate detection', 'Taxonomic verification', 'Temporal validation',
                        'Manual expert review where appropriate',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Despite these efforts, environmental datasets may contain limitations or incomplete records.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Evidence Handling */}
                  <Section id="evidence" icon={FileSearch} title="Evidence Type Handling" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>Different source types are not treated equally by default. Confidence baselines, review depth, and publication controls vary by evidence class.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {evidenceHandling.map(eh => (
                        <div key={eh.type} className="rounded-xl bg-white/5 border border-white/5 p-4">
                          <div className="text-xs font-bold text-white mb-2">{eh.type}</div>
                          <p className="text-xs text-slate-400 leading-relaxed">{eh.handling}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Publication Statuses */}
                  <Section id="publication" icon={Shield} title="Publication Status Logic" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>Records appear with different publication states depending on source confidence, review outcome, and sensitivity.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                      {publicationStatuses.map(ps => (
                        <div key={ps.label} className={`rounded-xl ${ps.bg} border ${ps.border} p-3`}>
                          <div className={`text-xs font-bold ${ps.color} mb-1`}>{ps.label}</div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">{ps.desc}</p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* AI */}
                  <Section id="ai" icon={Cpu} title="Artificial Intelligence" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>Artificial intelligence may be used to assist with:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Environmental data organisation', 'Information summarisation', 'Pattern recognition',
                        'Knowledge graph generation', 'Semantic search', 'Natural language interaction',
                        'Data quality support',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-indigo-500/5 border border-indigo-500/10 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-indigo-950/20 border border-indigo-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        AI-generated outputs are subject to review and should not be considered authoritative without supporting evidence.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Data Limitations */}
                  <Section id="limitations" icon={Info} title="Data Limitations" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>Environmental information may vary because of:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Observation frequency', 'Seasonal variation', 'Data availability',
                        'Reporting delays', 'Geographic coverage', 'Sensor limitations', 'Scientific uncertainty',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-amber-950/20 border border-amber-500/10 px-3 py-2">
                          <Info className="w-3 h-3 text-amber-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Users should consider these limitations when interpreting environmental information.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Expert Committee */}
                  <Section id="expert" icon={Users} title="Expert Committee" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>
                      The Kashmir EcoWatch Global Diaspora Environmental Expert Committee contributes contextual insight, environmental interpretation, and broader expert perspective to support responsible review and assessment of data entering or circulating through the platform.
                    </p>
                    <p>
                      This role is especially important where regional interpretation, thematic nuance, or publication sensitivity requires additional expert judgement.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Geographic Scope */}
                  <Section id="geographic" icon={Globe} title="Geographic Scope" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        KEW currently covers environmental information across the broader Kashmir Himalayan region, including environmental systems, biodiversity, hydrology, climate, and ecological landscapes.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mt-3">
                        Maps and geographic visualisations are presented solely for scientific, educational, and environmental purposes and do not imply political positions, territorial claims, or legal boundaries.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Open Data */}
                  <Section id="open-data" icon={Layers} title="Open Data & Attribution" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      Where permitted, KEW incorporates open environmental datasets while respecting applicable licences, attribution requirements, and intellectual property rights. Original data ownership remains with the respective data providers.
                    </p>
                    <div className="flex gap-3 mt-3">
                      <Link href="/open-data" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors group">
                        <Database className="w-3.5 h-3.5" />
                        Open Data Portal
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Updates */}
                  <Section id="updates" icon={RefreshCw} title="Updates" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>Datasets are updated according to source availability. Update frequencies vary depending on:</p>
                    <Bullets accent="bg-slate-400" items={[
                      'Real-time environmental feeds', 'Periodic government releases', 'Research publications',
                      'Field observations', 'Manual verification', 'Platform improvements',
                    ]} />
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Feedback */}
                  <Section id="feedback" icon={MessageSquare} title="Feedback & Corrections" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>
                      Researchers, institutions, environmental professionals, and community contributors are encouraged to report inaccuracies, submit updated information, or suggest methodological improvements.
                    </p>
                    <p>
                      Continuous community participation strengthens the quality, transparency, and scientific value of Kashmir EcoWatch.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <Link href="/about/contact" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Contact Kashmir EcoWatch</div>
                          <div className="text-xs text-slate-400">Submit corrections, data, or methodology suggestions</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      </Link>
                    </div>
                  </Section>

                </Card>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {[
                  <TableOfContents    key="toc"       active={active} />,
                  <CorePrinciplesSidebar key="principles" />,
                  <FeedbackSidebar   key="feedback" />,
                  <RelatedLinks      key="links" />,
                ].map((panel, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.06 }}>
                    {panel}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
