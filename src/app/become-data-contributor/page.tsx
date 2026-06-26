'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Database, ArrowRight, CheckCircle, Users, Globe, Leaf,
  Droplets, Flame, Shield, Activity, Award, Lightbulb,
  RefreshCw, Lock, Mail, User, MapPin, BarChart3,
  FileText, BookOpen, TrendingUp, Layers, Eye, Search,
  Archive, Building2, Microscope, Satellite, Wifi
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Data ───────────────────────────────────────────────────────────── */

const contributionTypes = [
  {
    id: 'field-survey',
    title: 'Field Survey Records',
    icon: '🔬',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    description: 'Structured field survey data including species inventories, transect counts, and biodiversity assessments.',
    examples: ['Bird point counts', 'Mammal transects', 'Plant quadrat surveys', 'Amphibian counts'],
    format: 'CSV, Excel, DwC-A',
  },
  {
    id: 'sensor-monitoring',
    title: 'Sensor & Station Data',
    icon: '📡',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    description: 'Automated monitoring station outputs — weather, air quality, water quality, soil, and acoustic loggers.',
    examples: ['AWS weather logs', 'PurpleAir PM2.5 data', 'YSI water quality', 'Acoustic bioacoustics'],
    format: 'CSV, JSON, NetCDF',
  },
  {
    id: 'remote-sensing',
    title: 'Remote Sensing & GIS',
    icon: '🛰️',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    description: 'Satellite imagery derived products, drone surveys, NDVI layers, land cover classifications.',
    examples: ['NDVI time series', 'Land cover maps', 'Glacier extent shapefiles', 'Drone orthomosaics'],
    format: 'GeoTIFF, SHP, KML, GeoJSON',
  },
  {
    id: 'water-quality',
    title: 'Water & Hydrological Data',
    icon: '💧',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    description: 'River flow records, lake level observations, groundwater data, and physicochemical water quality.',
    examples: ['Stream flow gauge data', 'Lake pH & DO readings', 'Glacier melt estimates', 'Spring discharge logs'],
    format: 'CSV, Excel, HDF5',
  },
  {
    id: 'hazard-incident',
    title: 'Hazard & Incident Records',
    icon: '⚠️',
    accent: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    description: 'Historical and live hazard event logs — fire perimeters, flood extents, landslide inventory data.',
    examples: ['Forest fire perimeters', 'Flood inundation maps', 'Landslide catalogues', 'Avalanche records'],
    format: 'SHP, GeoJSON, CSV, PDF',
  },
  {
    id: 'socio-environmental',
    title: 'Socio-Environmental Records',
    icon: '🏘️',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    description: 'Community-level environmental health data, land use surveys, and human-wildlife conflict records.',
    examples: ['HWC incident logs', 'Grazing pressure surveys', 'Firewood collection data', 'Pollution perception surveys'],
    format: 'CSV, Excel, SPSS',
  },
];

const contributorProfiles = [
  { icon: '🏛', label: 'Government Departments', desc: 'Forest, Wildlife, Irrigation, Pollution Control' },
  { icon: '🎓', label: 'Universities & Research Institutes', desc: 'Kashmir University, NIT Srinagar, SKUAST' },
  { icon: '🌿', label: 'Conservation NGOs', desc: 'WWF, WCS, Snow Leopard Trust, local organisations' },
  { icon: '📡', label: 'Monitoring Networks', desc: 'Sensor networks, weather station operators' },
  { icon: '🛰️', label: 'GIS & Remote Sensing Teams', desc: 'ISRO, DRDO affiliates, mapping agencies' },
  { icon: '🧑‍🌾', label: 'Citizen Data Networks', desc: 'eBird, iNaturalist, community monitoring groups' },
];

const dataStandards = [
  { name: 'Darwin Core (DwC)', use: 'Biodiversity & species records', icon: '🦋' },
  { name: 'GBIF Schema',       use: 'Global biodiversity indexing',   icon: '🌍' },
  { name: 'WaterML 2.0',       use: 'Hydrological time-series',       icon: '💧' },
  { name: 'ISO 19115',         use: 'Geospatial metadata standard',   icon: '🗺️' },
  { name: 'NetCDF / HDF5',     use: 'Gridded environmental data',     icon: '📊' },
  { name: 'GeoJSON / SHP',     use: 'Vector spatial datasets',        icon: '📍' },
];

const pipelineSteps = [
  { icon: FileText,   label: 'Submission',        desc: 'Dataset received and UUID assigned',         color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Search,     label: 'QA & Validation',   desc: 'Format check, completeness, outlier review', color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Layers,     label: 'Schema Mapping',     desc: 'Aligned to KEW open data standards',         color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: Eye,        label: 'Expert Review',      desc: 'Domain expert verification',                 color: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  { icon: Archive,    label: 'Catalogued',         desc: 'Added to KEW data catalogue with DOI',       color: 'text-teal-400',    bg: 'bg-teal-500/10'    },
  { icon: Database,   label: 'Published',          desc: 'Live in KEW intelligence network',           color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const tips = [
  'Datasets with metadata (collection date, method, equipment) are processed significantly faster.',
  'WGS84 decimal degrees is the preferred coordinate system for all spatial data.',
  'Time-series data should include timestamps in ISO 8601 format (YYYY-MM-DDTHH:MM:SS).',
  'Compressed datasets (ZIP, TAR) are accepted for large file submissions.',
  'Including a data dictionary or README file greatly speeds up QA review.',
  'KEW can accommodate data sharing agreements (DSAs) for sensitive institutional datasets.',
  'Historical datasets — even decades old — are valuable for trend analysis and baseline records.',
];

const kewStats = [
  { label: 'Partner Institutions', value: '38',      icon: Building2 },
  { label: 'Records in Database',  value: '12,400+', icon: Database  },
  { label: 'Data Domains',         value: '6',       icon: Layers    },
  { label: 'Districts Covered',    value: '46',      icon: MapPin    },
];

const contributorTiers = [
  { name: 'Field Observer',    desc: '1–9 datasets',    color: 'from-slate-500 to-slate-600',  icon: '🔭' },
  { name: 'Data Contributor',  desc: '10–49 datasets',  color: 'from-emerald-600 to-teal-600', icon: '📊' },
  { name: 'Research Partner',  desc: '50–199 datasets', color: 'from-blue-600 to-indigo-600',  icon: '🔬' },
  { name: 'Scientific Fellow', desc: '200+ datasets',   color: 'from-amber-500 to-orange-500', icon: '🏅' },
];

const regions = [
  'Srinagar', 'Kupwara', 'Baramulla', 'Bandipora', 'Ganderbal',
  'Budgam', 'Pulwama', 'Shopian', 'Kulgam', 'Anantnag',
  'Doda', 'Kishtwar', 'Ramban', 'Udhampur', 'Reasi',
  'Kathua', 'Jammu', 'Samba', 'Rajouri', 'Poonch',
  'Leh', 'Kargil', 'Mirpur (AJK)', 'Muzaffarabad (AJK)',
  'Gilgit', 'Hunza', 'Multiple Regions', 'Pan-Regional',
];

/* ─── Sidebar Panels ──────────────────────────────────────────────────── */

function WhyContribute() {
  return (
    <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-950/50 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-4 h-4 text-teal-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">Why Become a Data Contributor?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        KEW aggregates structured environmental datasets into the Western Himalayas' most comprehensive
        open intelligence network — serving researchers, policymakers, conservationists, and communities.
        Your data doesn't sit in a spreadsheet. It becomes science.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {kewStats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-[10px] text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoCanContribute() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-blue-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Who Can Contribute?</h3>
      </div>
      <div className="space-y-3">
        {contributorProfiles.map(({ icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div>
              <div className="text-xs font-semibold text-white">{label}</div>
              <div className="text-[10px] text-slate-400">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataStandardsPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-violet-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400">Supported Data Standards</h3>
      </div>
      <div className="space-y-2">
        {dataStandards.map(({ name, use, icon }) => (
          <div key={name} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
            <span className="text-base flex-shrink-0">{icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{name}</div>
              <div className="text-[10px] text-slate-400">{use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldTip() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % tips.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-950/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Data Tip</h3>
        </div>
        <button
          onClick={() => setIdx(i => (i + 1) % tips.length)}
          className="text-[10px] text-slate-500 hover:text-white transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Next
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="text-xs text-slate-300 leading-relaxed italic"
        >
          "{tips[idx]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function DataPipeline() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Dataset Pipeline</h3>
      </div>
      <div className="space-y-1">
        {pipelineSteps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-3.5 h-3.5 ${step.color}`} />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="text-xs font-semibold text-white">{step.label}</div>
                <div className="text-[10px] text-slate-400">{step.desc}</div>
              </div>
            </div>
            {idx < pipelineSteps.length - 1 && <div className="ml-[13px] w-px h-3 bg-white/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function RecognitionTiers() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Contributor Recognition</h3>
      </div>
      <div className="space-y-2">
        {contributorTiers.map(b => (
          <div key={b.name} className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${b.color} p-2.5`}>
            <span className="text-lg">{b.icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{b.name}</div>
              <div className="text-[10px] text-white/60">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3">Institutions can be credited collectively under a single contributor profile.</p>
    </div>
  );
}

function OpenDataCommitment() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Data Governance</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Data sharing agreements (DSAs) available for institutional contributors.',
          'Sensitive species records generalised in public-facing outputs.',
          'Contributors credited in published records and datasets.',
          'Data aligned to Darwin Core or equivalent open standards.',
          'Embargo periods available on request (e.g. prior to publication).',
          'You retain ownership — KEW holds a non-exclusive licence to use.',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
            <Shield className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-white/10">
        <Link href="/open-data" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
          View Open Data Portal <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function BecomeDataContributorPage() {
  const [selectedTypes,    setSelectedTypes]    = useState<string[]>([]);
  const [name,             setName]             = useState('');
  const [email,            setEmail]            = useState('');
  const [organisation,     setOrganisation]     = useState('');
  const [role,             setRole]             = useState('');
  const [region,           setRegion]           = useState('');
  const [dataFrequency,    setDataFrequency]    = useState('');
  const [dataVolume,       setDataVolume]       = useState('');
  const [message,          setMessage]          = useState('');
  const [needsDSA,         setNeedsDSA]         = useState(false);
  const [submitted,        setSubmitted]        = useState(false);
  const [isSubmitting,     setIsSubmitting]     = useState(false);

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || selectedTypes.length === 0) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <section className="relative pt-20 sm:pt-28 lg:pt-48 pb-24 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <CheckCircle className="w-20 h-20 text-teal-400 mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Application Received!</h1>
              <p className="text-slate-400 text-lg mb-8">
                Thank you, <strong className="text-white">{name}</strong>
                {organisation && <> from <strong className="text-white">{organisation}</strong></>}.
                {' '}Our data team will reach out at <strong className="text-teal-400">{email}</strong> within 3–5 working days to discuss onboarding and next steps.
              </p>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Selected Data Domains</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTypes.map(id => {
                    const t = contributionTypes.find(c => c.id === id);
                    return t ? (
                      <span key={id} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${t.bg} ${t.accent} border ${t.border}`}>
                        {t.icon} {t.title}
                      </span>
                    ) : null;
                  })}
                </div>
                {needsDSA && (
                  <p className="text-xs text-amber-400 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                    You requested a Data Sharing Agreement — our team will include DSA documentation in your onboarding pack.
                  </p>
                )}
              </Card>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => window.location.href = '/share-data'} className="bg-teal-600 hover:bg-teal-500 text-white">
                  Submit a Dataset Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/open-data'} className="border-white/20 text-white">
                  Open Data Portal
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  /* ── Main layout ── */
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Get Involved', href: '/contribute' }, { label: 'Become a Data Contributor' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Become a</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">KEW Data Contributor</span>
        </>}
        subtitle="Share structured environmental datasets with the Western Himalayan intelligence network. Open to researchers, institutions, government agencies, NGOs, and monitoring networks."
        icon={<Database className="w-6 h-6 text-teal-400" />}
        label="Scientific Data Partnership"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Form (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">

                {/* Data type selector */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">What Data Can You Contribute?</h2>
                  <p className="text-sm text-slate-400 mb-6">Select all dataset types that apply. You can contribute across multiple domains.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contributionTypes.map(t => {
                      const selected = selectedTypes.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleType(t.id)}
                          className={`text-left rounded-2xl border p-4 transition-all ${
                            selected
                              ? `${t.bg} ${t.border} ring-1`
                              : 'bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{t.icon}</span>
                              <div className={`text-sm font-bold ${selected ? t.accent : 'text-white'}`}>{t.title}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              selected ? `${t.bg} border-current ${t.accent}` : 'border-white/20'
                            }`}>
                              {selected && <CheckCircle className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 mb-2 leading-relaxed">{t.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {t.examples.map(ex => (
                              <span key={ex} className="text-[10px] text-slate-400 bg-white/5 rounded-full px-2 py-0.5">{ex}</span>
                            ))}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            <span className="font-semibold text-slate-400">Formats:</span> {t.format}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Contact & details form */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Your Details</h2>
                  <p className="text-sm text-slate-400 mb-6">Tell us about yourself and the data you hold. Our team will reach out to discuss onboarding.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <User className="w-3.5 h-3.5 inline mr-1" /> Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Dr. / Mr. / Ms."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1" /> Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="institutional or personal email"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Organisation & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Building2 className="w-3.5 h-3.5 inline mr-1" /> Organisation / Institution
                        </label>
                        <input
                          type="text" value={organisation} onChange={e => setOrganisation(e.target.value)}
                          placeholder="e.g. Kashmir University, WWF India, Forest Dept."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Role / Designation
                        </label>
                        <input
                          type="text" value={role} onChange={e => setRole(e.target.value)}
                          placeholder="e.g. Researcher, Field Officer, Data Manager"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 inline mr-1" /> Geographic Coverage of Data
                      </label>
                      <select
                        value={region} onChange={e => setRegion(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="" className="bg-slate-800">Select primary coverage area</option>
                        {regions.map(r => <option key={r} value={r} className="bg-slate-800">{r}</option>)}
                      </select>
                    </div>

                    {/* Frequency & Volume */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Data Collection Frequency
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['One-time', 'Seasonal', 'Monthly', 'Continuous'].map(f => (
                            <button
                              key={f} type="button"
                              onClick={() => setDataFrequency(f)}
                              className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                dataFrequency === f
                                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-400'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Estimated Dataset Volume
                        </label>
                        <select
                          value={dataVolume} onChange={e => setDataVolume(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                        >
                          <option value="" className="bg-slate-800">Select volume</option>
                          <option value="small" className="bg-slate-800">Small (&lt;100 records / &lt;10MB)</option>
                          <option value="medium" className="bg-slate-800">Medium (100–10,000 records / 10–500MB)</option>
                          <option value="large" className="bg-slate-800">Large (10,000+ records / &gt;500MB)</option>
                          <option value="streaming" className="bg-slate-800">Streaming / Live Sensor Feed</option>
                        </select>
                      </div>
                    </div>

                    {/* DSA toggle */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needsDSA}
                          onChange={e => setNeedsDSA(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-white/10 text-teal-500 focus:ring-teal-500"
                        />
                        <div>
                          <div className="text-sm font-semibold text-white">I require a Data Sharing Agreement (DSA)</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Institutional contributors may require a formal DSA before sharing data. KEW will include the agreement in your onboarding pack.
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        rows={3} value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us about your datasets — collection methods, coverage years, known limitations, or any special requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 resize-none"
                      />
                    </div>

                    {selectedTypes.length === 0 && (
                      <p className="text-xs text-amber-400">Please select at least one data type above before submitting.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !name || !email || selectedTypes.length === 0}
                      className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Apply as Data Contributor <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      By applying, you confirm your intent to share environmental data in good faith with the KEW network. A data governance agreement will be provided during onboarding.
                    </p>
                  </form>
                </Card>

                {/* Ready to share now? */}
                <Card className="glass-intense border-teal-500/20 bg-teal-950/20 p-5">
                  <div className="flex items-start gap-4">
                    <Database className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Ready to share data immediately?</h3>
                      <p className="text-xs text-slate-400 mb-3">
                        You can submit structured datasets directly via the Share Environmental Data portal — no prior registration required for initial submissions.
                      </p>
                      <Link href="/share-data">
                        <Button className="bg-teal-600 hover:bg-teal-500 text-white text-sm">
                          Share Data Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>

                {/* Cross-links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link href="/share-data" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Share Data Portal <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/open-data" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Open Data Portal <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/about/methodology" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    KEW Methodology <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <WhyContribute />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <WhoCanContribute />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <DataStandardsPanel />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <FieldTip />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <DataPipeline />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <RecognitionTiers />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <OpenDataCommitment />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
