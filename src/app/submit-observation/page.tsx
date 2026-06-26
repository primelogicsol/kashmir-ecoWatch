'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Camera, MapPin, Calendar, Eye, ArrowRight, CheckCircle,
  Users, Target, Binoculars, Leaf, Map, Shield, Route,
  Layers, Search, TrendingUp, FileCheck, Database, Upload,
  Star, Award, Lightbulb, ChevronRight, Activity, BarChart3,
  Zap, Lock, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';

/* ─── Data ─────────────────────────────────────────────────────────── */

const observationCategories = [
  { id: 'wildlife',   label: 'Wildlife / Animals', icon: '🦌' },
  { id: 'plants',     label: 'Trees / Plants',      icon: '🌳' },
  { id: 'water',      label: 'Water / Springs',     icon: '💧' },
  { id: 'weather',    label: 'Extreme Weather',     icon: '⛈️' },
  { id: 'pollution',  label: 'Pollution / Waste',   icon: '🗑️' },
  { id: 'community',  label: 'Community Action',    icon: '🤝' },
];

const habitatTypes = [
  { id: 'forest',       label: 'Forest' },
  { id: 'wetland',      label: 'Wetland' },
  { id: 'grassland',    label: 'Grassland' },
  { id: 'alpine',       label: 'Alpine/Meadow' },
  { id: 'river-stream', label: 'River/Stream' },
  { id: 'lake-pond',    label: 'Lake/Pond' },
  { id: 'agricultural', label: 'Agricultural' },
  { id: 'urban',        label: 'Urban/Suburban' },
  { id: 'other',        label: 'Other' },
];

const workflowSteps = [
  { icon: FileCheck, label: 'Submitted',        description: 'Observation logged',                    color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Search,    label: 'Initial Review',   description: 'Screening & classification',            color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Layers,    label: 'Expert Validation',description: 'Species expert verification',           color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: Database,  label: 'Published',        description: 'Added to biodiversity records',         color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Eye,       label: 'Available in KEW', description: 'Live in the intelligence network',      color: 'text-teal-400',    bg: 'bg-teal-500/10'    },
];

const reportableTypes = [
  { icon: '🐦', label: 'Wildlife' },
  { icon: '🌳', label: 'Trees' },
  { icon: '🌊', label: 'Rivers' },
  { icon: '🌱', label: 'Wetlands' },
  { icon: '🔥', label: 'Forest Fire' },
  { icon: '🌧', label: 'Flood' },
  { icon: '⛰', label: 'Landslide' },
  { icon: '🌫', label: 'Pollution' },
  { icon: '🦋', label: 'Invasive Species' },
  { icon: '🐟', label: 'Fish Kill' },
  { icon: '🧊', label: 'Glacier Change' },
];

const badges = [
  { name: 'Explorer',          desc: '1–9 observations',   color: 'from-slate-500 to-slate-600',   icon: '🔭' },
  { name: 'Observer',          desc: '10–49 observations',  color: 'from-emerald-600 to-teal-600',  icon: '👁️' },
  { name: 'Contributor',       desc: '50–199 observations', color: 'from-blue-600 to-indigo-600',   icon: '⭐' },
  { name: 'Research Partner',  desc: '200+ observations',   color: 'from-amber-500 to-orange-500',  icon: '🏅' },
];

const tips = [
  'Photograph leaves, bark and habitat when reporting trees. Multiple angles improve accuracy.',
  'Record river flow direction and any colour change if reporting water pollution.',
  'Note the time of day — many species are active only at dawn or dusk.',
  'GPS coordinates greatly speed up expert validation. Use your phone\'s map app to copy them.',
  'Upload multiple photos if available — wide shots show habitat; close-ups aid identification.',
  'If you observe a dead animal, note the estimated time and any signs of cause.',
  'For flood reports, estimate the water level against a known reference (wall, road, bridge).',
  'Forest fire reports should include wind direction and approximate area affected.',
];

const featuredObservations = [
  { species: 'Golden Eagle',        location: 'Kupwara',      badge: 'Verified', daysAgo: 2,  icon: '🦅' },
  { species: 'Snow Leopard Tracks', location: 'Gurez Valley', badge: 'Verified', daysAgo: 4,  icon: '🐾' },
  { species: 'Hangul Deer',         location: 'Dachigam',     badge: 'Verified', daysAgo: 1,  icon: '🦌' },
  { species: 'Kingfisher Sighting', location: 'Dal Lake',     badge: 'Verified', daysAgo: 3,  icon: '🐦' },
];

const kewStats = {
  totalObservations: 18245,
  contributors: 642,
  regionalProfiles: 46,
  birdSpecies: 775,
  mammalSpecies: 111,
};

const liveStats = [
  { label: "Today's Reports",  value: '12',    icon: Activity },
  { label: 'Pending Review',   value: '42',    icon: RefreshCw },
  { label: 'Published',        value: '8,351', icon: Database },
  { label: 'Species Recorded', value: '775',   icon: Binoculars },
  { label: 'Districts Covered',value: '46',    icon: MapPin },
];

function generateSightingId(): string {
  const date = new Date();
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day   = String(date.getDate()).padStart(2, '0');
  const rand  = Math.floor(Math.random() * 9000 + 1000);
  return `SIGHT-${year}${month}${day}-${rand}`;
}

/* ─── Sidebar components ────────────────────────────────────────────── */

function WhyItMatters() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Your Observation Matters</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Every observation contributes to a growing environmental intelligence network helping monitor
        biodiversity, water resources, hazards, ecosystem health, and environmental change across the
        Western Himalayas.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: kewStats.totalObservations.toLocaleString(), label: 'Observations' },
          { value: kewStats.contributors.toLocaleString(),       label: 'Contributors' },
          { value: kewStats.regionalProfiles.toString(),         label: 'Regional Profiles' },
          { value: kewStats.birdSpecies.toString(),              label: 'Bird Species' },
          { value: kewStats.mammalSpecies.toString(),            label: 'Mammal Species' },
          { value: '5',                                          label: 'Sub-Regions' },
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

function QualityGuide() {
  const items = [
    'Include a clear photo',
    'Add GPS location if possible',
    'Record date and time',
    'Describe what you observed',
    'Upload multiple photos if available',
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-teal-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">Observation Quality Guide</h3>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
            <span className="text-emerald-400 mt-0.5 flex-shrink-0">✅</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatToReport() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">What Can You Report?</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {reportableTypes.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 rounded-xl bg-white/5 border border-white/5 p-2 text-center hover:bg-white/10 transition-colors">
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] text-slate-300 leading-tight">{label}</span>
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
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Observation Status</h3>
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

function FeaturedObservation() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % featuredObservations.length), 5000);
    return () => clearInterval(t);
  }, []);
  const obs = featuredObservations[idx];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Featured Observation</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 rounded-xl bg-amber-500/5 border border-amber-500/10 p-3"
        >
          <span className="text-3xl">{obs.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate">{obs.species}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {obs.location}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">
                ✓ {obs.badge}
              </span>
              <span className="text-[10px] text-slate-500">{obs.daysAgo}d ago</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-1 mt-3">
        {featuredObservations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-amber-400' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

function EnvironmentalTip() {
  const [tipIdx, setTipIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-950/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Field Tip</h3>
        </div>
        <button
          onClick={() => setTipIdx(i => (i + 1) % tips.length)}
          className="text-[10px] text-slate-500 hover:text-white transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Next
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={tipIdx}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="text-xs text-slate-300 leading-relaxed italic"
        >
          "{tips[tipIdx]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function CitizenBadges() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-400">Citizen Scientist Badges</h3>
      </div>
      <div className="space-y-2">
        {badges.map(b => (
          <div key={b.name} className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${b.color} p-2.5`}>
            <span className="text-lg">{b.icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{b.name}</div>
              <div className="text-[10px] text-white/60">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3">Submit more observations to unlock higher badge levels.</p>
    </div>
  );
}

function QuickStats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Live Statistics</h3>
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

function SensitiveSpeciesNotice() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Sensitive Species Notice</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Rare species locations are generalised for public display.',
          'Your personal information is protected and never publicly shared.',
          'All observations undergo expert review before publication.',
          'Evidence of critically endangered species is handled with heightened care.',
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

export default function SubmitSightingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCategory,  setSelectedCategory]  = useState<string>('');
  const [speciesName,       setSpeciesName]        = useState('');
  const [dateObserved,      setDateObserved]       = useState('');
  const [locationText,      setLocationText]       = useState('');
  const [coordinates,       setCoordinates]        = useState('');
  const [locationPrecision, setLocationPrecision]  = useState<'exact' | 'approximate'>('exact');
  const [description,       setDescription]        = useState('');
  const [countObserved,     setCountObserved]      = useState('');
  const [confidence,        setConfidence]         = useState<string>('probable');
  const [behaviorObserved,  setBehaviorObserved]   = useState('');
  const [habitatType,       setHabitatType]        = useState<string>('');
  const [observationMethod, setObservationMethod]  = useState<string>('direct');
  const [photos,            setPhotos]             = useState<File[]>([]);
  const [contributorName,   setContributorName]    = useState('');
  const [contributorEmail,  setContributorEmail]   = useState('');
  const [submitted,         setSubmitted]          = useState(false);
  const [sightingId,        setSightingId]         = useState('');
  const [isSubmitting,      setIsSubmitting]       = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !speciesName || !dateObserved || !locationText || !description) return;
    setIsSubmitting(true);
    const newSightingId = generateSightingId();
    setSightingId(newSightingId);
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
                <h1 className="max-w-xl text-4xl font-bold text-white mb-4">Observation Received</h1>
                <p className="text-slate-400 text-lg">
                  Thank you! Your observation has been logged and will be reviewed by the Kashmir EcoWatch team.
                </p>
              </div>
              <Card className="glass-intense border-white/10 p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Observation Reference ID</div>
                  <div className="text-3xl font-mono font-bold text-white mb-4">{sightingId}</div>
                  <p className="text-sm text-slate-400">Keep this reference handy if you need to follow up or provide more details.</p>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">What Happens Next</h3>
                <div className="space-y-3 mb-4">
                  {workflowSteps.map((step) => (
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
                <p className="text-xs text-slate-500 mt-4">
                  Approved sightings may contribute to <span className="text-white font-medium">Biodiversity</span>,{' '}
                  <span className="text-white font-medium">Wildlife Sightings</span>,{' '}
                  <span className="text-white font-medium">District Biodiversity Profiles</span>, and related conservation intelligence layers.
                </p>
                {contributorEmail && (
                  <p className="text-xs text-slate-500 mt-2">You may be contacted if additional information is needed. Sensitive species locations may be generalised for public display.</p>
                )}
              </Card>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                <Button onClick={() => window.location.reload()}>Submit Another Observation</Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/')}>
                  <Eye className="w-4 h-4 mr-2" /> Return Home
                </Button>
                <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/biodiversity')}>
                  Explore Biodiversity Hub
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
        breadcrumbs={[{ label: 'Contribute', href: '/contribute' }, { label: 'Submit Observation' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Community Reporting</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Submit Observation</span>
        </>}
        subtitle="An easy-to-use platform for students, citizens, journalists, and communities to report wildlife, environmental conditions, and community events."
        icon={<Camera className="w-6 h-6 text-emerald-400" />}
        label="Community Hub"
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

                    {/* Category */}
                    <div className="mb-8">
                      <label className="text-xs font-semibold text-slate-400 mb-3 block uppercase tracking-wider">What did you observe?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {observationCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-2
                              ${selectedCategory === cat.id
                                ? 'bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/50'
                                : 'bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
                          >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className={`text-xs font-semibold ${selectedCategory === cat.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {cat.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Title / Species */}
                    <div className="mb-6">
                      <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">
                        Title or Name of Observation <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Black Bear, Fallen Chinar Tree, Contaminated Stream..."
                        value={speciesName}
                        onChange={(e) => setSpeciesName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                      />
                    </div>

                    {/* Date & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" /> Date Observed <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={dateObserved}
                          onChange={(e) => setDateObserved(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" /> Location <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="District or area"
                          value={locationText}
                          onChange={(e) => setLocationText(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    {/* GPS */}
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3 mb-3">
                        <Map className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-white mb-2">GPS Coordinates (Optional)</label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="Latitude, Longitude"
                              value={coordinates}
                              onChange={(e) => setCoordinates(e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                            />
                            <button
                              type="button"
                              onClick={handleGetCurrentLocation}
                              className="px-3 py-2 rounded-lg bg-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/20 transition-colors whitespace-nowrap"
                            >
                              Use My Location
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        {(['exact', 'approximate'] as const).map(v => (
                          <label key={v} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="locationPrecision"
                              value={v}
                              checked={locationPrecision === v}
                              onChange={(e) => setLocationPrecision(e.target.value as 'exact' | 'approximate')}
                              className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="text-xs text-white capitalize">{v} Location</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        • Exact location preferred for accuracy • Approximate accepted if unsure • Sensitive records may have generalised public coordinates
                      </p>
                    </div>

                    {/* Habitat */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-white mb-2">
                        <Leaf className="w-4 h-4 inline mr-1" /> Habitat Type
                      </label>
                      <select
                        value={habitatType}
                        onChange={(e) => setHabitatType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="" className="bg-slate-800">Select habitat type (optional)</option>
                        {habitatTypes.map(h => (
                          <option key={h.id} value={h.id} className="bg-slate-800">{h.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">
                        Details / Description <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe what you saw in your own words. E.g., 'Noticed a strange smell near the river' or 'Saw a flock of birds heading north'."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none"
                      />
                    </div>

                    {/* Count & Context */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Count / Amount (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 5 birds, 10 bags of trash, 1 tree"
                          value={countObserved}
                          onChange={(e) => setCountObserved(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Context / Action (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Flying, burning, dumping"
                          value={behaviorObserved}
                          onChange={(e) => setBehaviorObserved(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-white mb-2">
                        <Camera className="w-4 h-4 inline mr-1" /> Photo Evidence (Optional)
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-colors cursor-pointer group"
                      >
                        <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors mx-auto mb-2" />
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
                        <p>• Clear, recent images help with species identification and review</p>
                        <p>• Photo evidence may support verification priority</p>
                        <p>• Some evidence may remain restricted or internal for sensitive species</p>
                      </div>
                    </div>

                    {/* Contributor Info */}
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Your Name (Optional)</label>
                        <input
                          type="text"
                          placeholder="How you'd like to be credited"
                          value={contributorName}
                          onChange={(e) => setContributorName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">Email (Optional)</label>
                        <input
                          type="email"
                          placeholder="For follow-up if clarification needed"
                          value={contributorEmail}
                          onChange={(e) => setContributorEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !selectedCategory || !speciesName || !dateObserved || !locationText || !description}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Submit Observation <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                      <p className="text-xs text-slate-500 text-center mt-3">
                        By submitting, you agree that your observation may be reviewed, verified, and published within the KEW environmental intelligence network.
                      </p>
                    </div>
                  </form>
                </Card>

                {/* Cross-links */}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link href="/biodiversity" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Explore Biodiversity Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/biodiversity/wildlife-sightings" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    View Wildlife Sightings <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/report-issue" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Report Environmental Issue <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <WhyItMatters />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <QualityGuide />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <WhatToReport />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <FeaturedObservation />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <EnvironmentalTip />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <QuickStats />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <ReviewWorkflow />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
                  <CitizenBadges />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  <SensitiveSpeciesNotice />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
