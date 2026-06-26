'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ArrowRight, CheckCircle, Users, Camera, Microscope,
  GraduationCap, Map, Home, Newspaper, Shield, Award,
  Lightbulb, RefreshCw, Lock, Mail, User, MapPin,
  Phone, Star, Heart, Eye, FileText, AlertTriangle,
  BarChart3, Layers, BookOpen, ChevronRight, Activity,
  Database, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Contributor Categories ─────────────────────────────────────────── */

const contributorCategories = [
  {
    id: 'citizen-observer',
    title: 'Citizen Observer',
    icon: '👁️',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    subtitle: 'Students, residents, trekkers, photographers & nature lovers',
    description: 'The backbone of KEW\'s ground-truth network. Citizen Observers document what they see, wherever they are — from a forest trail or a village field to a mountain pass.',
    contributions: [
      'Wildlife sightings & species records',
      'Pollution reports & waste dumping',
      'Waterbody & wetland observations',
      'Weather events & seasonal change',
      'Forest fire alerts & smoke sightings',
      'Landslide & flood evidence',
    ],
  },
  {
    id: 'journalist-media',
    title: 'Journalist & Media Contributor',
    icon: '📰',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    subtitle: 'Field reporters, environmental journalists, photojournalists & media teams',
    description: 'Journalists play a critical role in amplifying environmental intelligence. KEW provides a structured channel for verified field reporting, environmental storytelling, and photo evidence.',
    contributions: [
      'Field reports & on-ground documentation',
      'Environmental news stories & investigations',
      'Photo & video evidence from incidents',
      'Local issue documentation & community voice',
      'Community interviews & testimonies',
      'Verified incident reports for KEW alerts',
    ],
  },
  {
    id: 'researcher-scientist',
    title: 'Researcher & Scientist',
    icon: '🔬',
    accent: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    subtitle: 'University researchers, independent scientists & subject experts',
    description: 'Scientific volunteers provide expert validation, methodology guidance, and domain-specific analysis — strengthening the credibility of KEW\'s published data.',
    contributions: [
      'Species identification & taxonomic validation',
      'Water quality data interpretation',
      'GIS mapping & spatial analysis',
      'Climate & earth system data review',
      'Hazard risk analysis & modelling',
      'Methodology review & protocol design',
    ],
  },
  {
    id: 'student-campus',
    title: 'Student & Campus Volunteer',
    icon: '🎓',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    subtitle: 'College students, school groups & youth environmental bodies',
    description: 'Students bring energy, reach, and locality knowledge. Campus volunteers help KEW extend into districts and communities that larger institutions can\'t easily cover.',
    contributions: [
      'Field documentation & survey assistance',
      'Environmental awareness campaigns',
      'Data entry & record organisation',
      'Local biodiversity species lists',
      'Environmental cleanup reporting',
      'School & campus outreach events',
    ],
  },
  {
    id: 'gis-data',
    title: 'GIS & Data Volunteer',
    icon: '🗺️',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    subtitle: 'Mappers, remote sensing specialists, data engineers & developers',
    description: 'Technical volunteers power KEW\'s spatial intelligence and open data infrastructure — from cleaning datasets to building integrations and verifying dashboard outputs.',
    contributions: [
      'GIS mapping & spatial data processing',
      'Remote sensing analysis & layer creation',
      'Dataset cleaning & quality assurance',
      'Dashboard QA & output verification',
      'Open data structuring & schema alignment',
      'API & data pipeline integration',
    ],
  },
  {
    id: 'community-representative',
    title: 'Community Representative',
    icon: '🏘️',
    accent: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    subtitle: 'Village-level contributors, community leaders & local liaisons',
    description: 'Community Representatives are KEW\'s most critical first responders. They observe, report, and document environmental events from within their villages and districts.',
    contributions: [
      'Flooding & water disruption reports',
      'Illegal waste dumping documentation',
      'Local water source changes & shortages',
      'Wildlife conflict incidents',
      'Forest degradation & encroachment',
      'Road weather & access disruption alerts',
    ],
  },
];

const contributorTypes = [
  'Citizen Observer',
  'Journalist / Media Contributor',
  'Researcher / Scientist',
  'Student Volunteer',
  'GIS / Data Volunteer',
  'Photographer / Videographer',
  'Community Representative',
  'NGO / Civil Society Member',
  'Educator',
  'Institutional Partner',
];

const districts = [
  'Srinagar', 'Kupwara', 'Baramulla', 'Bandipora', 'Ganderbal',
  'Budgam', 'Pulwama', 'Shopian', 'Kulgam', 'Anantnag',
  'Doda', 'Kishtwar', 'Ramban', 'Udhampur', 'Reasi',
  'Kathua', 'Jammu', 'Samba', 'Rajouri', 'Poonch',
  'Leh', 'Kargil', 'Mirpur (AJK)', 'Muzaffarabad (AJK)',
  'Gilgit', 'Hunza', 'Other / Multiple',
];

const areasOfInterest = [
  'Biodiversity & Wildlife', 'Water Systems', 'Hazard Intelligence',
  'Environmental Monitoring', 'Protected Areas', 'Climate & Earth Systems',
  'Pollution & Waste', 'Forest Ecosystems', 'Wetlands & Lakes',
  'Community & Social Environment',
];

const contributorEthics = [
  'Report only what you have directly observed or can verify.',
  'Do not share the exact locations of endangered or sensitive species publicly.',
  'Label uncertain identifications clearly — "possible", "probable", or "unconfirmed".',
  'Respect local communities, private land, and protected area regulations during fieldwork.',
  'Photo and video evidence must be authentic — no AI-generated or manipulated media.',
  'Journalists must clearly distinguish between direct observation and second-hand reports.',
  'Data submitted in good faith, even if later corrected, is valued and appreciated.',
];

const verificationFlow = [
  { icon: FileText,    label: 'Submitted',         desc: 'Record logged in KEW system',              color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Eye,         label: 'Initial Screen',    desc: 'Format, completeness & plausibility check',color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Microscope,  label: 'Expert Review',     desc: 'Domain volunteer validates the record',    color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: CheckCircle, label: 'Verified',          desc: 'Published to KEW intelligence network',    color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const badgeTiers = [
  { name: 'Observer',      desc: '1–9 contributions',   color: 'from-slate-500 to-slate-600',  icon: '🔭' },
  { name: 'Contributor',   desc: '10–49 contributions', color: 'from-emerald-600 to-teal-600', icon: '⭐' },
  { name: 'Field Partner', desc: '50–199 contributions',color: 'from-blue-600 to-indigo-600',  icon: '🏅' },
  { name: 'Network Fellow',desc: '200+ contributions',  color: 'from-amber-500 to-orange-500', icon: '🌟' },
];

const tips = [
  'Journalists: KEW can provide a verified contributor credential that you can cite in your environmental reporting.',
  'GIS volunteers: even partial datasets are valuable — submit what you have with clear metadata.',
  'Community Representatives: a photo and a GPS pin from your phone is often all that\'s needed.',
  'Students: group submissions from field courses or surveys are welcome — list the lead contributor.',
  'Researchers: you can contribute peer-reviewed methodology as a reference document, not just raw data.',
  'Photographers: geotagged images with date and time data are far more valuable than unlocated photos.',
  'You can hold multiple contributor types — for example, a journalist who is also a community representative.',
];

const kewStats = [
  { label: 'Active Contributors', value: '642',    icon: Users     },
  { label: 'Observations Filed',  value: '18,245', icon: Activity  },
  { label: 'Districts Monitored', value: '46',     icon: MapPin    },
  { label: 'Data Domains',        value: '6',      icon: Database  },
];

/* ─── Sidebar Panels ─────────────────────────────────────────────────── */

function WhyVolunteer() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Contribute to KEW?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Every contribution — however small — strengthens the Western Himalayas' environmental
        intelligence network. Your observations, reports, and expertise directly shape conservation
        decisions, hazard alerts, and policy at the district level.
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

function WhatContributorsDo() {
  const items = [
    { icon: '🌿', text: 'Document biodiversity & wildlife sightings across 46 districts' },
    { icon: '⚠️', text: 'Report hazards, fires, floods & landslides in real time' },
    { icon: '💧', text: 'Monitor waterbodies, springs & water quality changes' },
    { icon: '📷', text: 'Photograph habitat change, pollution & environmental incidents' },
    { icon: '🗺️', text: 'Build and verify GIS maps, spatial datasets & open data layers' },
    { icon: '📰', text: 'Document and publish verified field reports & environmental stories' },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-blue-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">What Contributors Do</h3>
      </div>
      <div className="space-y-2.5">
        {items.map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">{icon}</span>
            <span className="text-xs text-slate-300 leading-relaxed">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContributorEthicsPanel() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Contributor Ethics</h3>
      </div>
      <ul className="space-y-2">
        {contributorEthics.map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SensitiveSpeciesNotice() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">Sensitive Species Notice</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        Records of critically endangered species — including Snow Leopard, Hangul, Clouded Leopard,
        and selected raptor breeding sites — are handled with restricted access protocols.
      </p>
      <ul className="space-y-1.5">
        {[
          'Exact GPS coordinates are generalised before public publication.',
          'Sensitive records are restricted to verified expert reviewers.',
          'Do not post exact den, nest, or roost locations on social media.',
          'Contact the KEW team directly for high-sensitivity sightings.',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
            <Lock className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VerificationWorkflow() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ChevronRight className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Verification Workflow</h3>
      </div>
      <div className="space-y-1">
        {verificationFlow.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-3.5 h-3.5 ${step.color}`} />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="text-xs font-semibold text-white">{step.label}</div>
                <div className="text-[10px] text-slate-400 leading-relaxed">{step.desc}</div>
              </div>
            </div>
            {idx < verificationFlow.length - 1 && <div className="ml-[13px] w-px h-3 bg-white/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function RotatingTip() {
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
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Contributor Tip</h3>
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
          &ldquo;{tips[idx]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function BadgesPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Contributor Badges</h3>
      </div>
      <div className="space-y-2">
        {badgeTiers.map(b => (
          <div key={b.name} className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${b.color} p-2.5`}>
            <span className="text-lg">{b.icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{b.name}</div>
              <div className="text-[10px] text-white/60">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3">Badges are awarded automatically as contribution milestones are reached.</p>
    </div>
  );
}

function PartnershipNote() {
  return (
    <div className="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-violet-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400">Want a Deeper Partnership?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        If you represent an institution, NGO, media organisation, or research body and would like a formalised partnership with KEW, explore our dedicated programmes.
      </p>
      <div className="space-y-2">
        {[
          { label: 'Join Citizen Science Network', href: '/join-citizen-science', icon: '🌿' },
          { label: 'Become a Data Contributor',    href: '/become-data-contributor', icon: '📊' },
          { label: 'Become a Research Partner',    href: '/become-research-partner', icon: '🔬' },
        ].map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all px-3 py-2.5 group"
          >
            <span className="text-base">{icon}</span>
            <span className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors flex-1">{label}</span>
            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-violet-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function VolunteerPage() {
  const [selectedCategory, setSelectedCategory]   = useState<string | null>(null);
  const [contributorType,  setContributorType]    = useState('');
  const [name,             setName]               = useState('');
  const [email,            setEmail]              = useState('');
  const [phone,            setPhone]              = useState('');
  const [district,         setDistrict]           = useState('');
  const [organisation,     setOrganisation]       = useState('');
  const [skills,           setSkills]             = useState('');
  const [interests,        setInterests]          = useState<string[]>([]);
  const [availability,     setAvailability]       = useState('');
  const [canPhoto,         setCanPhoto]           = useState<string>('');
  const [canVerify,        setCanVerify]          = useState<string>('');
  const [preferredMode,    setPreferredMode]      = useState('');
  const [introduction,     setIntroduction]       = useState('');
  const [submitted,        setSubmitted]          = useState(false);
  const [isSubmitting,     setIsSubmitting]       = useState(false);

  const toggleInterest = (item: string) => {
    setInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !contributorType) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <section className="relative pt-20 sm:pt-28 lg:pt-48 pb-24">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to the KEW Contributor Network!</h1>
              <p className="text-slate-400 text-lg mb-8">
                Thank you, <strong className="text-white">{name}</strong>. Your registration has been received.
                Our team will reach out at <strong className="text-emerald-400">{email}</strong> with
                onboarding details matched to your contributor type within 3–5 working days.
              </p>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Your Contributor Profile</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3"><span className="text-slate-500 w-36 flex-shrink-0">Contributor Type</span><span className="text-white font-semibold">{contributorType}</span></div>
                  {district && <div className="flex gap-3"><span className="text-slate-500 w-36 flex-shrink-0">Region</span><span className="text-white">{district}</span></div>}
                  {organisation && <div className="flex gap-3"><span className="text-slate-500 w-36 flex-shrink-0">Organisation</span><span className="text-white">{organisation}</span></div>}
                  {interests.length > 0 && (
                    <div className="flex gap-3 pt-1">
                      <span className="text-slate-500 w-36 flex-shrink-0">Areas of Interest</span>
                      <div className="flex flex-wrap gap-1">
                        {interests.map(i => (
                          <span key={i} className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">{i}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <Button onClick={() => window.location.href = '/submit-observation'} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  Submit Your First Observation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/citizen-science'} className="border-white/20 text-white">
                  Citizen Science Hub
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'} className="border-white/20 text-white">
                  Return Home
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
        breadcrumbs={[{ label: 'Get Involved', href: '/contribute' }, { label: 'Volunteer & Contributor Network' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Volunteer &</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Contributor Network</span>
        </>}
        subtitle="Help document, verify, report, map, photograph, and communicate environmental change across the Western Himalayan region. Every contribution type is valued equally — from a village resident to a field journalist."
        icon={<Users className="w-6 h-6 text-emerald-400" />}
        label="Get Involved"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Categories + Form (70%) ── */}
            <div className="w-full lg:w-[68%] space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

                {/* ── Category cards ── */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Contributor Categories</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    KEW welcomes all contributor types. Select the category that best describes your role — you can select a specific type in the form below.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contributorCategories.map(cat => {
                      const active = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(active ? null : cat.id);
                            if (!active) {
                              // Pre-fill contributor type if matching
                              const match = contributorTypes.find(t =>
                                t.toLowerCase().includes(cat.id.split('-')[0])
                              );
                              if (match) setContributorType(match);
                            }
                          }}
                          className={`text-left rounded-2xl border p-4 transition-all ${
                            active
                              ? `${cat.bg} ${cat.border} ring-1`
                              : 'bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{cat.icon}</span>
                              <div className={`text-sm font-bold ${active ? cat.accent : 'text-white'}`}>{cat.title}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              active ? `${cat.bg} border-current ${cat.accent}` : 'border-white/20'
                            }`}>
                              {active && <CheckCircle className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <div className={`text-[10px] mb-2 ${active ? cat.accent : 'text-slate-500'}`}>{cat.subtitle}</div>
                          <p className="text-xs text-slate-300 mb-3 leading-relaxed">{cat.description}</p>
                          <AnimatePresence>
                            {active && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1 overflow-hidden"
                              >
                                {cat.contributions.map(c => (
                                  <li key={c} className="flex items-center gap-2 text-[10px] text-slate-300">
                                    <ArrowRight className={`w-3 h-3 flex-shrink-0 ${cat.accent}`} />
                                    {c}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                          {!active && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cat.contributions.slice(0, 3).map(c => (
                                <span key={c} className="text-[9px] text-slate-500 bg-white/5 rounded-full px-2 py-0.5">{c}</span>
                              ))}
                              <span className="text-[9px] text-slate-600 bg-white/5 rounded-full px-2 py-0.5">+{cat.contributions.length - 3} more</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* ── Registration form ── */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Register as a Contributor</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Complete the form below. Our team will match you to programs suited to your skills, location, and availability.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Contributor Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Contributor Type <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {contributorTypes.map(t => (
                          <button
                            key={t} type="button"
                            onClick={() => setContributorType(t)}
                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left ${
                              contributorType === t
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <User className="w-3.5 h-3.5 inline mr-1" /> Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1" /> Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Phone & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Phone className="w-3.5 h-3.5 inline mr-1" /> Phone (Optional)
                        </label>
                        <input
                          type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                          placeholder="+91 or +92..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5 inline mr-1" /> Location / District
                        </label>
                        <select
                          value={district} onChange={e => setDistrict(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="" className="bg-slate-800">Select your district</option>
                          {districts.map(d => <option key={d} value={d} className="bg-slate-800">{d}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Organisation & Skills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Organisation / Institution (Optional)
                        </label>
                        <input
                          type="text" value={organisation} onChange={e => setOrganisation(e.target.value)}
                          placeholder="University, NGO, media outlet, agency..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Skills / Expertise (Optional)
                        </label>
                        <input
                          type="text" value={skills} onChange={e => setSkills(e.target.value)}
                          placeholder="e.g. Photography, GIS, Ornithology, Journalism..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Areas of Interest */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Areas of Interest (select all that apply)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {areasOfInterest.map(area => (
                          <button
                            key={area} type="button"
                            onClick={() => toggleInterest(area)}
                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left ${
                              interests.includes(area)
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability & Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Availability
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Occasionally', 'Monthly', 'Weekly', 'Daily'].map(a => (
                            <button
                              key={a} type="button"
                              onClick={() => setAvailability(a)}
                              className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                availability === a
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >{a}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Preferred Contribution Mode
                        </label>
                        <div className="space-y-2">
                          {['Field (in-person)', 'Remote / Online', 'Both'].map(m => (
                            <button
                              key={m} type="button"
                              onClick={() => setPreferredMode(m)}
                              className={`w-full py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                preferredMode === m
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >{m}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Can submit photos / Can assist verification */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Can you submit field photos / videos?
                        </label>
                        <div className="flex gap-2">
                          {['Yes', 'Sometimes', 'No'].map(o => (
                            <button
                              key={o} type="button"
                              onClick={() => setCanPhoto(o)}
                              className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                canPhoto === o
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >{o}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Can you assist with data verification?
                        </label>
                        <div className="flex gap-2">
                          {['Yes', 'Sometimes', 'No'].map(o => (
                            <button
                              key={o} type="button"
                              onClick={() => setCanVerify(o)}
                              className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                canVerify === o
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >{o}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Introduction */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Short Introduction (Optional)
                      </label>
                      <textarea
                        rows={3} value={introduction} onChange={e => setIntroduction(e.target.value)}
                        placeholder="Tell us a little about yourself — your background, what you observe, where you work or study, and why you want to contribute to KEW..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    {(!name || !email || !contributorType) && (
                      <p className="text-xs text-amber-400">Full name, email, and contributor type are required.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !name || !email || !contributorType}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Registering…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Join the Contributor Network <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      There is no minimum commitment. You contribute at your own pace, in your own way.
                    </p>
                  </form>
                </Card>

                {/* Cross-links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  {[
                    { label: 'Submit Observation',       href: '/submit-observation' },
                    { label: 'Report Environmental Issue',href: '/report-issue' },
                    { label: 'Join Citizen Science',      href: '/join-citizen-science' },
                  ].map(({ label, href }) => (
                    <React.Fragment key={label}>
                      <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        {label} <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-slate-600 hidden sm:block last:hidden">|</span>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {[
                  <WhyVolunteer key="why" />,
                  <WhatContributorsDo key="what" />,
                  <ContributorEthicsPanel key="ethics" />,
                  <SensitiveSpeciesNotice key="sensitive" />,
                  <VerificationWorkflow key="verify" />,
                  <RotatingTip key="tip" />,
                  <BadgesPanel key="badges" />,
                  <PartnershipNote key="partner" />,
                ].map((panel, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
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
