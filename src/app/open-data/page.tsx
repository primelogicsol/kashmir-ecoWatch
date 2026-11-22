'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import {
  Database, Globe, Shield, CheckCircle, FileText,
  Layers, Users, Code, Download, AlertTriangle,
  ChevronRight, ArrowRight, Mail, RefreshCw, Clock,
  Heart, Lock, BarChart2, Leaf, Droplets, Zap,
  MapPin, Info, ExternalLink, Plus, Search, Filter,
  SlidersHorizontal, Mountain, Activity, Building2,
  Compass, Check, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';
import {
  scientificDomains,
  openDataCategories,
  OpenDataCategory,
  ScientificDomain
} from '@/data/open-data-catalog';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'overview',        label: 'Overview' },
  { id: 'principles',      label: 'Open Data Principles' },
  { id: 'categories',      label: 'Data Catalog (50 Categories)' },
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

/* ─── Core Data ────────────────────────────────────────────────────────── */

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
    desc: 'Open data is interpreted within its documented methodology, uncertainty bounds, and spatial resolution.',
  },
];

const formats = [
  { ext: 'CSV',       desc: 'Comma-separated values — tabular time-series',     available: true  },
  { ext: 'GeoJSON',   desc: 'Geographic features with JSON encoding',          available: true  },
  { ext: 'JSON',      desc: 'Structured data interchange format',              available: true  },
  { ext: 'Shapefile', desc: 'ESRI vector geospatial geodatabase format',       available: true  },
  { ext: 'GeoPackage',desc: 'OGC open geospatial container format',            available: true  },
  { ext: 'KML',       desc: 'Keyhole Markup Language for geo data',            available: true  },
  { ext: 'PDF',       desc: 'Environmental reports and monographs',            available: true  },
  { ext: 'Raster',    desc: 'Grid-based satellite and DEM spatial layers',     available: true  },
  { ext: 'API',       desc: 'REST endpoints for real-time telemetry',           available: true  },
];

const datasetFields = [
  'Dataset title & UID', 'Scientific domain', 'Data category', 'Geographic coverage',
  'Collection methodology', 'Source provenance', 'Date published', 'Last updated',
  'Format & spatial resolution', 'Quality assurance status', 'Licence & access terms', 'Version history',
];

const sources = [
  { icon: '🏛️', label: 'Government agencies & boards' },
  { icon: '🌿', label: 'Forest & wildlife departments' },
  { icon: '🔬', label: 'Scientific research laboratories' },
  { icon: '🎓', label: 'Regional & diaspora universities' },
  { icon: '🌐', label: 'International mountain bodies (ICIMOD)' },
  { icon: '🦅', label: 'Conservation & wetland trusts' },
  { icon: '📂', label: 'Open environmental databases (GBIF)' },
  { icon: '🛰️', label: 'Copernicus & USGS remote sensing' },
  { icon: '🗺️', label: 'In-situ hydrometric & meteorological stations' },
  { icon: '👁️', label: 'Verified citizen science contributions' },
];

const qualitySteps = [
  'Source provenance audit', 'Geographic coordinate validation', 'Sensor calibration verification',
  'Duplicate & anomaly detection', 'Scientific peer review where applicable', 'Obfuscation of sensitive wildlife coordinates',
];

const apiFuture = [
  'Air quality CAAQMS feeds', 'Hydrometric river telemetry', 'Algal bloom predictions',
  'Earthquake event feeds', 'Landslide susceptibility', 'Protected area vectors',
  'Weather radar alerts', 'Regional environmental indicators',
];

const limitations = [
  'Incomplete geographic coverage in remote high-altitude zones',
  'Temporal intervals between satellite orbital revisits',
  'Historical measurement inconsistencies in legacy paper archives',
  'Spatial resolution constraints on regional optical products (10m–30m)',
  'Controlled masking on endangered species coordinates to prevent poaching',
  'Exclusion of military and defense compound coordinates under security policy',
];

/* ─── Eye Icon ───────────────────────────────────────────────────────── */

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
        <div className={`w-8 h-8 rounded-[6px] ${bg} flex items-center justify-center flex-shrink-0 border border-white/5`}>
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

/* ─── Sidebar panels ─────────────────────────────────────────────────── */

function TableOfContents({ active }: { active: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-[8px] border border-white/10 bg-slate-900/60 p-5 shadow-sm">
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
              className={`flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-[4px] transition-all ${
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
    <div className="rounded-[8px] border border-emerald-500/20 bg-emerald-950/20 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Download className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Quick Access</h3>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Submit Observation',   href: '/submit-observation',   icon: Plus      },
          { label: 'Share Data',           href: '/share-data',           icon: Database  },
          { label: 'Research Library',     href: '/research-library',     icon: FileText  },
          { label: 'KEW Q&A Knowledge Base',href: '/about/qna',          icon: HelpCircle },
          { label: 'Contact Secretariat',  href: '/about/contact',        icon: Mail      },
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
    <div className="rounded-[8px] border border-white/10 bg-slate-900/60 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">FAIR Principles</h3>
      </div>
      <div className="space-y-2">
        {principles.map(p => (
          <div key={p.title} className={`flex items-center gap-2 rounded-[6px] ${p.bg} border border-white/5 px-3 py-2`}>
            <p.icon className={`w-3.5 h-3.5 ${p.accent} flex-shrink-0`} />
            <span className="text-xs text-slate-300 font-medium">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedLinks() {
  return (
    <div className="rounded-[8px] border border-white/10 bg-slate-900/60 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Governance &amp; Scope</h3>
      </div>
      <ul className="space-y-2">
        {[
          { label: 'About KEW Platform',     href: '/about' },
          { label: 'Geographic Scope Notice', href: '/geographic-scope' },
          { label: 'Governance & Ethos',     href: '/about/governance' },
          { label: 'Founder Leadership',     href: '/about/founder' },
          { label: 'KEW FAQ (50 Q&As)',      href: '/about/faq' },
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

/* ─── Page Component ──────────────────────────────────────────────────── */

export default function OpenDataPortalPage() {
  const active = useActiveSection();

  // Catalog State Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainId, setSelectedDomainId] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Filter Categories
  const filteredCategories = useMemo(() => {
    return openDataCategories.filter(cat => {
      const matchesDomain = selectedDomainId === 'all' || cat.domainId === selectedDomainId;
      const matchesStatus = selectedStatus === 'all' || cat.status === selectedStatus;
      const matchesRegion = selectedRegion === 'all' || cat.geographicCoverage.includes(selectedRegion);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        cat.title.toLowerCase().includes(q) ||
        cat.shortName.toLowerCase().includes(q) ||
        cat.domainName.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.provenance.toLowerCase().includes(q) ||
        (cat.subcategories && cat.subcategories.some(sub => sub.toLowerCase().includes(q))) ||
        (cat.featuredIndicator && cat.featuredIndicator.toLowerCase().includes(q));

      return matchesDomain && matchesStatus && matchesRegion && matchesSearch;
    });
  }, [searchQuery, selectedDomainId, selectedStatus, selectedRegion]);

  const domainIcons: Record<string, React.ElementType> = {
    Leaf, Droplets, Mountain, Activity, Zap, Layers, Building2, BarChart2, Compass, Users
  };

  const getStatusBadge = (status: OpenDataCategory['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Available
          </span>
        );
      case 'Limited Coverage':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Limited Coverage
          </span>
        );
      case 'Restricted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold">
            <Lock className="w-2.5 h-2.5 text-amber-400" />
            Restricted / Masked
          </span>
        );
      case 'In Development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-mono font-semibold">
            <Clock className="w-2.5 h-2.5 text-slate-500" />
            In Development
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-500 border border-white/5 text-[10px] font-mono">
            No Dataset
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        breadcrumbs={[{ label: 'Platform', href: '/' }, { label: 'Open Data Portal' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Open Data</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Portal</span>
        </>}
        subtitle="Open Environmental Intelligence for Research, Conservation, and Public Benefit across the Western Himalaya."
        icon={<Database className="w-6 h-6 text-emerald-400" />}
        label="FAIR Open Science · 10 Domains · 50 Categories"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-intense border-white/10 p-5 sm:p-8 space-y-10 rounded-[8px]">

                  {/* Overview */}
                  <div id="overview" className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-[6px] bg-emerald-500/10 flex items-center justify-center border border-white/5">
                        <Database className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h2 className="text-base font-bold text-white">Overview</h2>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        Kashmir EcoWatch (KEW) is committed to improving access to regional environmental knowledge through responsible open data practices. The Open Data Portal compiles verified environmental observations, satellite time-series, hazard models, and biodiversity inventories supporting scientific research, conservation planning, and informed public participation.
                      </p>
                      <p>
                        Our objective is to encourage transparent scientific collaboration while upholding reproducibility, data provenance, and intergenerational ecological stewardship across the Western Himalaya.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* Principles */}
                  <Section id="principles" icon={Shield} title="Open Data Principles">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      {principles.map(p => (
                        <div key={p.title} className={`rounded-[6px] ${p.bg} border border-white/5 p-4`}>
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

                  {/* ─── DATA CATEGORIES (10 Domains & 50 Categories) ───────── */}
                  <div id="categories" className="scroll-mt-28 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[6px] bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                        <Layers className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white">Scientific Data Catalog</h2>
                        <p className="text-xs text-slate-400">10 Scientific Domains · 50 Authoritative Data Categories</p>
                      </div>
                    </div>

                    <div className="pl-11 space-y-6">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        The Open Data Catalog organizes Western Himalayan environmental intelligence into a hierarchical scientific taxonomy. Each category documents actual dataset availability, observation methodologies, provenance, and direct gateway links into corresponding live analytical modules:
                      </p>

                      {/* Domain Filter Bar */}
                      <div className="space-y-3 p-4 rounded-[6px] bg-slate-900/80 border border-white/10">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                          <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              placeholder="Search 50 categories (e.g. InSAR, springs, PM2.5, saffron, wetlands, Hangul)..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-[4px] pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                            />
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
                              >
                                ✕
                              </button>
                            )}
                          </div>

                          {/* Quick Region Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400 shrink-0 font-mono">Region:</span>
                            <select
                              value={selectedRegion}
                              onChange={(e) => setSelectedRegion(e.target.value)}
                              className="bg-slate-950 border border-white/10 text-xs text-slate-300 rounded-[4px] px-2.5 py-1.5 focus:outline-none"
                            >
                              <option value="all">All 5 Regions</option>
                              <option value="Kashmir Valley">Kashmir Valley</option>
                              <option value="Jammu">Jammu</option>
                              <option value="Ladakh">Ladakh</option>
                              <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
                              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                            </select>
                          </div>
                        </div>

                        {/* Domain Tabs Strip */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => setSelectedDomainId('all')}
                            className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-all ${
                              selectedDomainId === 'all'
                                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                            }`}
                          >
                            All Domains (50)
                          </button>
                          {scientificDomains.map(d => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setSelectedDomainId(d.id)}
                              className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-all ${
                                selectedDomainId === d.id
                                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                              }`}
                            >
                              <span>{d.shortTitle}</span>
                              <span className="ml-1 text-[10px] opacity-75">({d.count})</span>
                            </button>
                          ))}
                        </div>

                        {/* Status Filter Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[11px]">
                          <span className="text-slate-500 font-mono">Availability Filter:</span>
                          {['all', 'Available', 'Limited Coverage', 'Restricted', 'In Development'].map(status => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setSelectedStatus(status)}
                              className={`px-2 py-0.5 rounded-[4px] transition-colors ${
                                selectedStatus === status
                                  ? 'bg-slate-200 text-slate-950 font-bold'
                                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                              }`}
                            >
                              {status === 'all' ? 'All Statuses' : status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filter Results Counter */}
                      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                        <span>Showing {filteredCategories.length} of 50 Categories</span>
                        <span>FAIR Standard Compliant</span>
                      </div>

                      {/* Categories Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {filteredCategories.map(cat => {
                          const IconComponent = domainIcons[scientificDomains.find(d => d.id === cat.domainId)?.iconName || 'Layers'] || Layers;
                          return (
                            <div
                              key={cat.id}
                              className="rounded-[6px] border border-white/10 bg-slate-900/60 p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all space-y-3"
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-[4px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                      <IconComponent className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                                      {cat.domainName}
                                    </span>
                                  </div>
                                  {getStatusBadge(cat.status)}
                                </div>

                                <h3 className="text-sm font-bold text-white leading-snug">
                                  {cat.title}
                                </h3>

                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {cat.description}
                                </p>

                                {/* Subcategories / Key Features */}
                                {cat.subcategories && cat.subcategories.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                    {cat.subcategories.map(sub => (
                                      <span
                                        key={sub}
                                        className="text-[9px] font-mono px-1.5 py-0.5 rounded-[3px] bg-white/5 text-slate-400 border border-white/5"
                                      >
                                        {sub}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="pt-3 border-t border-white/5 space-y-2">
                                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono gap-1">
                                  <span>Type: {cat.observationType}</span>
                                  <span>Cadence: {cat.updateFrequency}</span>
                                </div>

                                {cat.featuredIndicator && (
                                  <div className="text-[10px] text-emerald-400/90 font-mono">
                                    Baseline: {cat.featuredIndicator}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-1">
                                  <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
                                    {cat.formats.map(fmt => (
                                      <span key={fmt} className="px-1 py-0.2 rounded bg-white/5 border border-white/5">
                                        {fmt}
                                      </span>
                                    ))}
                                  </div>

                                  <Link
                                    href={cat.targetModule}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                                  >
                                    <span>Explore Module</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Corrected Closing Statement */}
                      <div className="p-4 rounded-[6px] bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white block mb-1">Kashmir EcoWatch Data Access Covenant:</strong>
                        The Kashmir EcoWatch Open Data Catalog brings together available environmental datasets, research records and geospatial information. Coverage, update frequency and access conditions are identified for each dataset.
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* Dataset Information */}
                  <Section id="dataset-info" icon={FileText} title="Dataset Information" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>Each published dataset record in our central catalog includes documented scientific parameters:</p>
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
                    <p>Datasets are published in widely adopted open formats to guarantee cross-platform interoperability:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                      {formats.map(({ ext, desc, available }) => (
                        <div key={ext} className={`rounded-[6px] border p-3 ${available ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/40 border-white/5'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                            <span className={`text-xs font-bold font-mono ${available ? 'text-emerald-400' : 'text-slate-500'}`}>{ext}</span>
                          </div>
                          <p className="text-[9px] text-slate-500 leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Format availability is documented in individual catalog records.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Sources */}
                  <Section id="sources" icon={Globe} title="Data Sources &amp; Provenance" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>KEW compiles environmental information from authorized institutional and scientific providers:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {sources.map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-[6px] bg-white/5 border border-white/5 px-3 py-2.5">
                          <span className="text-sm flex-shrink-0">{icon}</span>
                          <span className="text-[10px] text-slate-300">{label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">Every dataset retains attribution to its original source organization and primary sensor network.</p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Licensing */}
                  <Section id="licensing" icon={Lock} title="Licensing &amp; Access Terms" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>Datasets published through the Open Data Portal are authorized for legitimate public-benefit applications:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Academic Research', 'Educational Use', 'Ecological Conservation',
                        'Non-commercial Analysis', 'Disaster Preparedness', 'Scientific Collaboration',
                      ].map(use => (
                        <div key={use} className="flex items-center gap-2 text-xs text-slate-300 rounded-[4px] bg-emerald-500/5 border border-emerald-500/10 px-3 py-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {use}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[6px] bg-amber-950/20 border border-amber-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Third-party datasets remain subject to the licensing covenants of their originating agencies. Users must comply with applicable licence terms.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Quality */}
                  <Section id="quality" icon={CheckCircle} title="Data Quality &amp; Verification" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>Before cataloging, records undergo structured quality assurance procedures:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {qualitySteps.map(step => (
                        <div key={step} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {step}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* API */}
                  <Section id="api" icon={Code} title="Programmatic API Access" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <p>
                      KEW provides REST API endpoints enabling developers, researchers, and academic institutions to query telemetry and hazard indicators programmatically:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {apiFuture.map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-[6px] bg-cyan-950/20 border border-cyan-500/10 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                          <span className="text-[9px] text-slate-400 leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Attribution */}
                  <Section id="attribution" icon={ExternalLink} title="Attribution &amp; Citation" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      Platform data usage requires formal citation of Kashmir EcoWatch and primary observation providers in accordance with our Citation and Open Data Covenant.
                    </p>
                    <p>
                      Where datasets originate from third-party monitoring agencies, attribution to the original producer is maintained in all derivative research.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Limitations */}
                  <Section id="limitations" icon={Info} title="Scientific Limitations &amp; Security Boundary" accent="text-orange-400" bg="bg-orange-500/10">
                    <p>Open environmental datasets operate under documented technical and regulatory limitations:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {limitations.map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-[4px] bg-orange-950/10 border border-orange-500/10 px-3 py-2">
                          <Info className="w-3 h-3 text-orange-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Community Contributions */}
                  <Section id="contributions" icon={Users} title="Community Contributions" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      Researchers, institutions, conservation trusts, and citizen observers can propose datasets, corrections, and new observations through our established intake desks:
                    </p>
                    <div className="rounded-[6px] bg-white/5 border border-white/5 p-5 mt-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/share-data" className="flex items-center gap-3 group flex-1">
                          <div className="w-9 h-9 rounded-[6px] bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                            <Database className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">Share Environmental Data</div>
                            <div className="text-xs text-slate-400">Submit datasets for intake review</div>
                          </div>
                        </Link>
                        <Link href="/submit-observation" className="flex items-center gap-3 group flex-1">
                          <div className="w-9 h-9 rounded-[6px] bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Plus className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">Submit Observation</div>
                            <div className="text-xs text-slate-400">Record an in-situ field observation</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* Commitment */}
                  <Section id="commitment" icon={Heart} title="Our Commitment" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <div className="rounded-[6px] bg-emerald-950/20 border border-emerald-500/20 p-5">
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
