'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import {
  Database, Globe, Shield, CheckCircle, FileText,
  Layers, Users, Code, Download, AlertTriangle,
  ChevronRight, ArrowRight, Mail, RefreshCw, Clock,
  Heart, Lock, BarChart2, Leaf, Droplets, Zap,
  MapPin, Info, ExternalLink, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'overview',        label: 'Overview' },
  { id: 'principles',      label: 'Open Data Principles' },
  { id: 'categories',      label: 'Data Categories' },
  { id: 'dataset-info',    label: 'Dataset Information' },
  { id: 'formats',         label: 'Supported Formats' },
  { id: 'sources',         label: 'Data Sources' },
  { id: 'licensing',       label: 'Licensing' },
  { id: 'quality',         label: 'Data Quality' },
  { id: 'api',             label: 'API Access' },
  { id: 'attribution',     label: 'Attribution' },
  { id: 'limitations',     label: 'Limitations' },
  { id: 'contributions',   label: 'Community Contributions' },
  { id: 'commitment',      label: 'Our Commitment' },
];

/* ─── Data ───────────────────────────────────────────────────────────── */

const principles = [
  {
    icon: Globe,    title: 'Open by Default',
    accent: 'text-emerald-400', bg: 'bg-emerald-500/10',
    desc: 'Whenever legally and ethically permissible, environmental datasets are made openly available for research, education, and public benefit.',
  },
  {
    icon: Eye,      title: 'Transparency',
    accent: 'text-blue-400',    bg: 'bg-blue-500/10',
    desc: 'All published datasets include available metadata describing their source, collection methodology, geographic coverage, update frequency, and known limitations.',
  },
  {
    icon: CheckCircle, title: 'Scientific Integrity',
    accent: 'text-violet-400',  bg: 'bg-violet-500/10',
    desc: 'Datasets are released without alteration of scientific findings and are accompanied by appropriate documentation wherever possible.',
  },
  {
    icon: Shield,   title: 'Responsible Use',
    accent: 'text-amber-400',   bg: 'bg-amber-500/10',
    desc: 'Open data should be used responsibly and interpreted within its documented limitations.',
  },
];

const categories = [
  { icon: Leaf,     label: 'Biodiversity',              accent: 'text-green-400',   bg: 'bg-green-500/10'   },
  { icon: Shield,   label: 'Protected Areas',            accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Droplets, label: 'Water Systems',              accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Droplets, label: 'Rivers & Lakes',             accent: 'text-cyan-400',    bg: 'bg-cyan-500/10'    },
  { icon: Globe,    label: 'Wetlands',                   accent: 'text-teal-400',    bg: 'bg-teal-500/10'    },
  { icon: Leaf,     label: 'Forest Ecosystems',          accent: 'text-green-400',   bg: 'bg-green-500/10'   },
  { icon: BarChart2,label: 'Environmental Monitoring',   accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
  { icon: Globe,    label: 'Air Quality',                accent: 'text-sky-400',     bg: 'bg-sky-500/10'     },
  { icon: Droplets, label: 'Water Quality',              accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: BarChart2,label: 'Climate Indicators',         accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Zap,      label: 'Environmental Hazards',      accent: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  { icon: MapPin,   label: 'Ecological Regions',         accent: 'text-rose-400',    bg: 'bg-rose-500/10'    },
  { icon: Leaf,     label: 'Species Distribution',       accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Droplets, label: 'Watersheds',                 accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Layers,   label: 'Land Cover',                 accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Globe,    label: 'Earth Observation Layers',   accent: 'text-indigo-400',  bg: 'bg-indigo-500/10'  },
  { icon: BarChart2,label: 'Environmental Statistics',   accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
  { icon: MapPin,   label: 'Regional Environmental Profiles', accent: 'text-teal-400', bg: 'bg-teal-500/10'  },
];

const formats = [
  { ext: 'CSV',       desc: 'Comma-separated values — tabular data',      available: true  },
  { ext: 'GeoJSON',   desc: 'Geographic features with JSON encoding',      available: true  },
  { ext: 'JSON',      desc: 'Structured data interchange format',          available: true  },
  { ext: 'Shapefile', desc: 'ESRI vector geospatial format',               available: true  },
  { ext: 'GeoPackage',desc: 'OGC open geospatial container format',        available: true  },
  { ext: 'KML',       desc: 'Keyhole Markup Language for geo data',        available: true  },
  { ext: 'PDF',       desc: 'Environmental reports and publications',       available: true  },
  { ext: 'Raster',    desc: 'Grid-based spatial datasets',                 available: true  },
  { ext: 'API',       desc: 'Programmatic endpoints (future availability)', available: false },
];

const datasetFields = [
  'Dataset title', 'Description', 'Geographic coverage', 'Collection methodology',
  'Source organisation', 'Date published', 'Last updated', 'Data format',
  'Metadata', 'Licence information', 'Version history',
];

const sources = [
  { icon: '🏛️', label: 'Government agencies' },
  { icon: '🌿', label: 'Environmental departments' },
  { icon: '🔬', label: 'Scientific institutions' },
  { icon: '🎓', label: 'Universities' },
  { icon: '🌐', label: 'International organisations' },
  { icon: '🦅', label: 'Conservation agencies' },
  { icon: '📂', label: 'Open environmental databases' },
  { icon: '🛰️', label: 'Remote sensing platforms' },
  { icon: '🗺️', label: 'Field observations' },
  { icon: '👁️', label: 'Citizen science contributions' },
];

const qualitySteps = [
  'Metadata verification', 'Geographic validation', 'Duplicate detection',
  'Coordinate consistency checks', 'Scientific review where applicable', 'Source verification',
];

const apiFuture = [
  'Dataset discovery', 'Spatial queries', 'Environmental indicators',
  'Biodiversity records', 'Water system information', 'Environmental monitoring',
  'Hazard intelligence', 'Regional statistics',
];

const limitations = [
  'Incomplete geographic coverage', 'Historical records', 'Periodic update delays',
  'Scientific uncertainty', 'Temporal variations', 'Resolution limitations',
];

/* ─── Eye import workaround ──────────────────────────────────────────── */

function Eye({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ─── Active section tracker ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState('overview');
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
  id: string; icon: React.ElementType | ((p: { className?: string }) => JSX.Element);
  title: string; accent?: string; bg?: string; children: React.ReactNode;
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

/* ─── Sidebar panels ─────────────────────────────────────────────────── */

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
        <nav className="space-y-0.5 mt-3">
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

function QuickActions() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Download className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Quick Access</h3>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Submit Observation',   href: '/submit-observation',   icon: Plus      },
          { label: 'Share Data',           href: '/share-data',           icon: Database  },
          { label: 'Research Library',     href: '/research-library',     icon: FileText  },
          { label: 'Methodology',          href: '/about/methodology',    icon: CheckCircle },
          { label: 'Contact KEW',          href: '/about/contact',        icon: Mail      },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href}
            className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group"
          >
            <Icon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            {label}
            <ArrowRight className="w-3 h-3 ml-auto text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function PrinciplesSidebar() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Principles</h3>
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
          { label: 'About KEW',        href: '/about' },
          { label: 'Methodology',      href: '/about/methodology' },
          { label: 'Privacy Policy',   href: '/privacy' },
          { label: 'Legal Notice',     href: '/legal-notice' },
          { label: 'Terms of Use',     href: '/terms' },
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

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function OpenDataPortalPage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Platform', href: '/monitoring-overview' }, { label: 'Open Data Portal' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Open Data</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Portal</span>
        </>}
        subtitle="Open Environmental Intelligence for Research, Conservation, and Public Benefit."
        icon={<Database className="w-6 h-6 text-emerald-400" />}
        label="Open Data"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-intense border-white/10 p-7 sm:p-10 space-y-10">

                  {/* Overview */}
                  <div id="overview" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Database className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h2 className="text-base font-bold text-white">Overview</h2>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        Kashmir EcoWatch (KEW) is committed to improving access to environmental knowledge through responsible open data practices. The Open Data Portal provides publicly accessible environmental information that supports scientific research, education, conservation planning, innovation, and informed public participation.
                      </p>
                      <p>
                        Our objective is to encourage collaboration while promoting transparency, reproducibility, and evidence-based environmental stewardship.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* Principles */}
                  <Section id="principles" icon={Shield} title="Open Data Principles">
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

                  {/* Data Categories */}
                  <Section id="categories" icon={Layers} title="Available Data Categories" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>The Open Data Portal includes datasets covering multiple environmental domains, including:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {categories.map(({ icon: Icon, label, accent, bg }) => (
                        <div key={label} className={`flex items-center gap-2 rounded-xl ${bg} border border-white/5 px-3 py-2.5`}>
                          <Icon className={`w-3.5 h-3.5 ${accent} flex-shrink-0`} />
                          <span className="text-[10px] text-slate-300 leading-tight">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5 mt-2">
                      <Plus className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="text-[10px] text-slate-500 italic">New datasets are continuously added as they become available.</span>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Dataset Information */}
                  <Section id="dataset-info" icon={FileText} title="Dataset Information" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>Each published dataset may include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {datasetFields.map(field => (
                        <div key={field} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                          {field}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Formats */}
                  <Section id="formats" icon={Download} title="Supported Formats" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>Where available, datasets may be provided in widely accepted open formats:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                      {formats.map(({ ext, desc, available }) => (
                        <div key={ext} className={`rounded-xl border p-3 ${available ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/40 border-white/5'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                            <span className={`text-xs font-bold font-mono ${available ? 'text-emerald-400' : 'text-slate-500'}`}>{ext}</span>
                          </div>
                          <p className="text-[9px] text-slate-500 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Availability varies depending on the originating data source.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Sources */}
                  <Section id="sources" icon={Globe} title="Data Sources" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>KEW compiles environmental information from a variety of publicly available and authorised sources, including:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {sources.map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
                          <span className="text-sm flex-shrink-0">{icon}</span>
                          <span className="text-[10px] text-slate-300">{label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Each dataset retains attribution to its original source whenever applicable.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Licensing */}
                  <Section id="licensing" icon={Lock} title="Licensing" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>Unless otherwise stated, datasets published through the Open Data Portal are intended for:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Research', 'Education', 'Conservation',
                        'Non-commercial analysis', 'Public awareness', 'Scientific collaboration',
                      ].map(use => (
                        <div key={use} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-3 py-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {use}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Certain datasets may remain subject to the licensing terms of their original providers. Users are responsible for complying with all applicable licence requirements.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Quality */}
                  <Section id="quality" icon={CheckCircle} title="Data Quality" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>Before publication, datasets undergo quality assurance procedures that may include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {qualitySteps.map(step => (
                        <div key={step} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Despite these efforts, users should independently validate data before making operational or regulatory decisions.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* API */}
                  <Section id="api" icon={Code} title="API Access" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <p>
                      KEW is progressively developing APIs that will enable developers, researchers, and institutions to access environmental datasets programmatically. Future API capabilities may include:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {apiFuture.map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-xl bg-cyan-950/20 border border-cyan-500/10 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                          <span className="text-[9px] text-slate-400 leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        API availability will expand as platform capabilities mature.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Attribution */}
                  <Section id="attribution" icon={ExternalLink} title="Attribution" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      When using data obtained from the Kashmir EcoWatch Open Data Portal, users are encouraged to acknowledge the platform where appropriate.
                    </p>
                    <p>
                      Where datasets originate from third-party providers, attribution to the original source should also be maintained in accordance with applicable licensing requirements.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Limitations */}
                  <Section id="limitations" icon={Info} title="Limitations" accent="text-orange-400" bg="bg-orange-500/10">
                    <p>Open environmental datasets may contain:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {limitations.map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-orange-950/10 border border-orange-500/10 px-3 py-2">
                          <Info className="w-3 h-3 text-orange-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Users should consider these factors when interpreting environmental information.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Community Contributions */}
                  <Section id="contributions" icon={Users} title="Community Contributions" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      Researchers, institutions, environmental organisations, and citizen scientists are encouraged to contribute datasets, corrections, metadata improvements, and new environmental observations.
                    </p>
                    <p>All submissions undergo review before publication.</p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/share-data" className="flex items-center gap-3 group flex-1">
                          <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                            <Database className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">Share Environmental Data</div>
                            <div className="text-xs text-slate-400">Submit datasets for review</div>
                          </div>
                        </Link>
                        <Link href="/submit-observation" className="flex items-center gap-3 group flex-1">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Plus className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Submit Observation</div>
                            <div className="text-xs text-slate-400">Record a field observation</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Commitment */}
                  <Section id="commitment" icon={Heart} title="Our Commitment" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Kashmir EcoWatch believes that open environmental knowledge strengthens scientific research, promotes informed decision-making, supports conservation efforts, and encourages collaborative stewardship of natural ecosystems for present and future generations.
                      </p>
                    </div>
                  </Section>

                </Card>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {[
                  <TableOfContents  key="toc"        active={active} />,
                  <QuickActions     key="actions" />,
                  <PrinciplesSidebar key="principles" />,
                  <RelatedLinks     key="links" />,
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
