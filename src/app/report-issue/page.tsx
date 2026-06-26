'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  AlertTriangle, MapPin, FileText, Camera, ArrowRight, CheckCircle,
  Flame, Droplets, Leaf, Trash2, Building2, Waves, Cloud, Zap,
  Upload, Clock, Map, User, Mail, Eye, Shield, Route, Layers, Search,
  TrendingUp, Bell, FileCheck, Archive, Activity, RefreshCw,
  Info, Lock, Phone, Lightbulb, BarChart3, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';

/* ─── Data ──────────────────────────────────────────────────────────── */

const issueTypes = [
  { id: 'forest-fire',            label: 'Forest Fire',           icon: Flame,         color: 'from-orange-500 to-red-600'   },
  { id: 'landslide',              label: 'Landslide',             icon: MapPin,        color: 'from-amber-500 to-orange-600' },
  { id: 'flooding',               label: 'Flooding',              icon: Droplets,      color: 'from-blue-500 to-cyan-600'    },
  { id: 'wildlife-incident',      label: 'Wildlife Incident',     icon: Leaf,          color: 'from-emerald-500 to-teal-600' },
  { id: 'human-wildlife-conflict',label: 'Human-Wildlife Conflict',icon: AlertTriangle, color: 'from-red-500 to-pink-600'    },
  { id: 'pollution',              label: 'Pollution Leak',        icon: Cloud,         color: 'from-purple-500 to-indigo-600'},
  { id: 'sewage-overflow',        label: 'Sewage Overflow',       icon: Waves,         color: 'from-slate-500 to-zinc-600'   },
  { id: 'illegal-dumping',        label: 'Illegal Dumping',       icon: Trash2,        color: 'from-gray-500 to-slate-600'   },
  { id: 'fish-bird-mortality',    label: 'Fish / Bird Mortality', icon: Zap,           color: 'from-yellow-500 to-orange-500'},
  { id: 'air-quality-event',      label: 'Air Quality Event',     icon: Cloud,         color: 'from-slate-600 to-gray-700'   },
  { id: 'infrastructure-failure', label: 'Infrastructure Failure',icon: Building2,     color: 'from-stone-500 to-stone-700'  },
  { id: 'other-hazard',           label: 'Other Hazard',          icon: AlertTriangle, color: 'from-slate-500 to-slate-700'  },
];

const severityLevels = [
  { id: 'low',      label: 'Low',      description: 'Minor concern, no immediate threat',    color: 'from-blue-500 to-cyan-500',     dot: 'bg-blue-400'   },
  { id: 'moderate', label: 'Moderate', description: 'Requires attention, developing situation',color: 'from-amber-500 to-orange-500',  dot: 'bg-amber-400'  },
  { id: 'high',     label: 'High',     description: 'Significant threat, needs rapid response',color: 'from-orange-500 to-red-500',   dot: 'bg-orange-400' },
  { id: 'critical', label: 'Critical', description: 'Emergency, immediate action required',   color: 'from-red-600 to-red-800',       dot: 'bg-red-400'    },
];

const workflowSteps = [
  { icon: FileText,    label: 'Received',          description: 'Report logged and acknowledged',         color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Search,      label: 'Under Review',      description: 'Screening and classification',           color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Layers,      label: 'Context Reviewed',  description: 'Cross-referenced with existing data',   color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: TrendingUp,  label: 'Escalated if Urgent',description: 'High-severity reports fast-tracked',   color: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  { icon: Bell,        label: 'Advisory Issued',   description: 'Alert or field signal published',        color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Archive,     label: 'Resolved',          description: 'Incident archived with outcome',         color: 'text-slate-400',   bg: 'bg-slate-500/10'   },
];

const reportingTips = [
  'For forest fires, estimate the affected area and note wind direction — this helps predict spread.',
  'When reporting flooding, note the water level against a known reference (wall, bridge, road).',
  'For pollution reports, describe the colour, smell, and any visible impact on water or wildlife.',
  'Wildlife incidents: note species if known, number of animals, and proximity to settlements.',
  'Landslide reports: include the slope angle and any infrastructure at risk (roads, homes, lines).',
  'Illegal dumping: photograph the area and note the time to help establish patterns.',
  'Air quality events: describe visibility levels and any health symptoms observed locally.',
  'Always report your own safety status — if you are in danger, contact emergency services first.',
];

const routingModules = [
  { label: 'Hazard Intelligence',       href: '/hazard-intelligence',                   icon: '⚠️',  issues: 'Floods, Landslides, Fires, Avalanches'    },
  { label: 'Environmental Monitoring',  href: '/environmental-monitoring',              icon: '🌿',  issues: 'Pollution, Sewage, Air Quality, Waste'     },
  { label: 'Water Systems',             href: '/water-systems',                         icon: '💧',  issues: 'Water Quality, Fish Kill, Contamination'  },
  { label: 'Biodiversity',              href: '/biodiversity',                          icon: '🦌',  issues: 'Wildlife Incidents, Species Mortality'      },
];

const liveStats = [
  { label: "Today's Reports",    value: '8',     icon: Activity    },
  { label: 'Under Review',       value: '23',    icon: RefreshCw   },
  { label: 'Active Alerts',      value: '6',     icon: Bell        },
  { label: 'Resolved (30 days)', value: '141',   icon: Archive     },
  { label: 'Districts Monitored',value: '46',    icon: MapPin      },
];

const emergencyContacts = [
  { label: 'J&K Emergency',        number: '112' },
  { label: 'Fire & Rescue',        number: '101' },
  { label: 'Forest Dept Helpline', number: '1800-180-1918' },
  { label: 'Pollution Control (JKPCC)', number: '0194-2310670' },
];

function generateIncidentId(): string {
  const date  = new Date();
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day   = String(date.getDate()).padStart(2, '0');
  const rand  = Math.floor(Math.random() * 9000 + 1000);
  return `KEI-${year}${month}${day}-${rand}`;
}

/* ─── Sidebar panels ─────────────────────────────────────────────────── */

function UrgencyNotice() {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/60 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">Before You Report</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        If there is an immediate threat to life or public safety, contact emergency services first.
        This form is for environmental incident reporting — not emergency dispatch.
      </p>
      <div className="space-y-2">
        {emergencyContacts.map(({ label, number }) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-red-500/5 border border-red-500/10 px-3 py-2">
            <span className="text-xs text-slate-300">{label}</span>
            <span className="text-sm font-bold text-red-300 font-mono">{number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeverityGuide() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Severity Guide</h3>
      </div>
      <div className="space-y-2">
        {severityLevels.map(({ label, description, dot }) => (
          <div key={label} className="flex items-start gap-3 rounded-xl bg-white/5 px-3 py-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${dot} flex-shrink-0 mt-1`} />
            <div>
              <div className="text-xs font-bold text-white">{label}</div>
              <div className="text-[10px] text-slate-400 leading-relaxed">{description}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3">Critical reports are fast-tracked for immediate review and potential advisory issuance.</p>
    </div>
  );
}

function WhyItMatters() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Your Report Matters</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        Every report strengthens KEW's environmental hazard intelligence — enabling faster alerts,
        better district risk profiles, and evidence-based conservation decisions across the Western Himalayas.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: '5,200+', label: 'Reports Filed' },
          { value: '46',     label: 'Districts Covered' },
          { value: '141',    label: 'Incidents Resolved' },
          { value: '6',      label: 'Active Alerts' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-[10px] text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportingTip() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % reportingTips.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-950/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Reporting Tip</h3>
        </div>
        <button
          onClick={() => setIdx(i => (i + 1) % reportingTips.length)}
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
          "{reportingTips[idx]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function LiveStats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Live Incident Statistics</h3>
      </div>
      <div className="space-y-2">
        {liveStats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-300">{label}</span>
            </div>
            <span className="text-xs font-bold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewWorkflow() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Route className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Report Status Flow</h3>
      </div>
      <div className="space-y-1">
        {workflowSteps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-3.5 h-3.5 ${step.color}`} />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="text-xs font-semibold text-white">{step.label}</div>
                <div className="text-[10px] text-slate-400">{step.description}</div>
              </div>
            </div>
            {idx < workflowSteps.length - 1 && (
              <div className="ml-[13px] w-px h-3 bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function WhereReportsGo() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-4 h-4 text-teal-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">Where Reports Are Routed</h3>
      </div>
      <div className="space-y-2">
        {routingModules.map(({ icon, label, href, issues }) => (
          <Link
            key={label}
            href={href}
            className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all p-3 group"
          >
            <span className="text-lg flex-shrink-0">{icon}</span>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                {label} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{issues}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PrivacyNotice() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Privacy & Safety</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Reports may be submitted anonymously.',
          'Your personal information is protected and never publicly displayed.',
          'High-severity reports may be escalated to relevant authorities.',
          'Sensitive incident details may be restricted to authorised reviewers only.',
          'Submitting false or misleading reports is strongly discouraged.',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
            <Shield className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function ReportIssuePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedType,     setSelectedType]     = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('moderate');
  const [locationText,     setLocationText]     = useState('');
  const [coordinates,      setCoordinates]      = useState('');
  const [incidentDate,     setIncidentDate]     = useState('');
  const [incidentTime,     setIncidentTime]     = useState('');
  const [description,      setDescription]      = useState('');
  const [anonymous,        setAnonymous]        = useState(false);
  const [photos,           setPhotos]           = useState<File[]>([]);
  const [reporterName,     setReporterName]     = useState('');
  const [reporterEmail,    setReporterEmail]    = useState('');
  const [submitted,        setSubmitted]        = useState(false);
  const [incidentId,       setIncidentId]       = useState('');
  const [isSubmitting,     setIsSubmitting]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !locationText || !description) return;
    setIsSubmitting(true);
    const newIncidentId = generateIncidentId();
    setIncidentId(newIncidentId);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
        (err) => console.log('Geolocation failed:', err)
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(Array.from(e.target.files));
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-12 lg:pb-24 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
                <h1 className="max-w-xl text-4xl font-bold text-white mb-4">Incident Report Received</h1>
                <p className="text-slate-400 text-lg">
                  Your report has been successfully logged into the Kashmir Environmental Intelligence system.
                </p>
              </div>
              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div className="text-sm text-slate-400 mb-2">Incident Reference ID</div>
                <div className="text-3xl font-mono font-bold text-white mb-4">{incidentId}</div>
                <p className="text-sm text-slate-400">Please save this reference for any follow-up inquiries.</p>
              </Card>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 mb-4">
                  {workflowSteps.slice(0, 4).map((step) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{step.label}</div>
                        <div className="text-xs text-slate-400">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Reports are prioritised based on severity and potential public impact.
                  {reporterEmail && !anonymous && ' You may be contacted if follow-up information is required.'}
                </p>
              </Card>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                <Button onClick={() => router.push('/report-issue')}>Submit Another Report</Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/hazard-intelligence')}>
                  <Bell className="w-4 h-4 mr-2" /> Hazard Intelligence
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring')}>
                  Environmental Monitoring
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  /* ── Main 2-column layout ── */
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Contribute', href: '/contribute' }, { label: 'Report an Issue' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Report an</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">Environmental Issue</span>
        </>}
        subtitle="Report environmental hazards, emergencies, and urgent concerns for rapid response and district-level risk intelligence across the Western Himalayas."
        icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
        label="Hazard & Incident Reporting"
      />

      {/* 2-column section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Form (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <form onSubmit={handleSubmit}>

                    {/* Issue Type */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-white mb-3">
                        Issue Type <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {issueTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            className={`p-3 rounded-xl border transition-all text-center ${
                              selectedType === type.id
                                ? 'border-red-500 bg-red-500/10 ring-1 ring-red-500/30'
                                : 'border-white/10 hover:border-white/20 bg-white/5'
                            }`}
                          >
                            <type.icon className={`w-5 h-5 mx-auto mb-2 ${selectedType === type.id ? 'text-red-400' : 'text-slate-400'}`} />
                            <div className="text-xs font-medium text-white leading-tight">{type.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-white mb-3">Severity Level</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {severityLevels.map((level) => (
                          <button
                            key={level.id}
                            type="button"
                            onClick={() => setSelectedSeverity(level.id)}
                            className={`p-3 rounded-xl border transition-all text-center ${
                              selectedSeverity === level.id
                                ? 'border-white/30 bg-white/10'
                                : 'border-white/10 hover:border-white/20 bg-white/5'
                            }`}
                          >
                            <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${level.color} mb-1`}>
                              {level.label}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">{level.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-white mb-2">
                        Location <span className="text-red-400">*</span>
                      </label>
                      <div className="relative mb-3">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Describe the location or area (district, village, landmark)"
                          value={locationText}
                          onChange={(e) => setLocationText(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="GPS coordinates (optional)"
                            value={coordinates}
                            onChange={(e) => setCoordinates(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="px-3 py-2 rounded-xl bg-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                        >
                          Use My Location
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-slate-500 space-y-1">
                        <p>• Exact location preferred where safe • Approximate accepted if exact point unknown</p>
                        <p>• District and nearest landmark helps with routing</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <Clock className="w-4 h-4 inline mr-1" /> Date of Incident
                        </label>
                        <input
                          type="date"
                          value={incidentDate}
                          onChange={(e) => setIncidentDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <Clock className="w-4 h-4 inline mr-1" /> Time (approximate)
                        </label>
                        <input
                          type="time"
                          value={incidentTime}
                          onChange={(e) => setIncidentTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-white mb-2">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        placeholder="Describe the issue in detail: what happened, what is affected, any immediate risks to public safety or the environment..."
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 resize-none"
                        required
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-white mb-2">
                        <Camera className="w-4 h-4 inline mr-1" /> Photo Evidence (Optional)
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-red-500/30 transition-colors cursor-pointer group"
                      >
                        <Upload className="w-8 h-8 text-slate-500 group-hover:text-red-400 transition-colors mx-auto mb-2" />
                        <p className="text-sm text-slate-400">Drag and drop photos or click to upload</p>
                        <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP — max 10 MB per file</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                      {photos.length > 0 && (
                        <div className="mt-2 text-sm text-emerald-400">{photos.length} file(s) selected</div>
                      )}
                      <div className="mt-2 text-xs text-slate-500 space-y-1">
                        <p>• Clear, timestamped images support priority review</p>
                        <p>• Sensitive media may not be displayed publicly</p>
                      </div>
                    </div>

                    {/* Anonymous Toggle */}
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={anonymous}
                          onChange={(e) => setAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded bg-slate-900 border-white/10 text-red-500 focus:ring-red-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-white flex items-center gap-2">
                            <Eye className="w-4 h-4 text-slate-400" /> Submit Anonymously
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">Your identity will not be displayed publicly</span>
                        </div>
                      </label>
                      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-500 space-y-1">
                        <p>• Reports may still be reviewed internally regardless of anonymity</p>
                        <p>• Not all reports become public alerts</p>
                      </div>
                    </div>

                    {/* Contact (conditional) */}
                    {!anonymous && (
                      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            <User className="w-4 h-4 inline mr-1" /> Your Name (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="How you'd like to be credited"
                            value={reporterName}
                            onChange={(e) => setReporterName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            <Mail className="w-4 h-4 inline mr-1" /> Email (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="For follow-up on your report"
                            value={reporterEmail}
                            onChange={(e) => setReporterEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white"
                      disabled={!selectedType || !locationText || !description || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Submit Incident Report
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 text-center mt-3">
                      By submitting, you confirm that the information provided is accurate to the best of your knowledge.
                    </p>
                  </form>
                </Card>

                {/* Cross-links */}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link href="/hazard-intelligence" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Hazard Intelligence Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/environmental-monitoring" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Environmental Monitoring <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/submit-observation" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Submit Observation instead <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <UrgencyNotice />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <WhyItMatters />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <SeverityGuide />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <ReportingTip />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <LiveStats />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <ReviewWorkflow />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <WhereReportsGo />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
                  <PrivacyNotice />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
