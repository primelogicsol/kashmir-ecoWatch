'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Users, Eye, Camera, CheckCircle, ArrowRight, Heart, Award,
  MapPin, Leaf, Droplets, Flame, Shield, Activity, Star,
  Lightbulb, RefreshCw, BarChart3, BookOpen, Globe, Binoculars,
  Lock, Mail, User, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Data ──────────────────────────────────────────────────────────── */

const programs = [
  {
    id: 'wildlife-monitoring',
    title: 'Wildlife Monitoring',
    icon: '🦌',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    accent: 'text-emerald-400',
    description: 'Track and document wildlife populations, distributions, and behavioural patterns across Kashmir\'s ecosystems.',
    activities: ['Species sighting documentation', 'Population trend tracking', 'Habitat condition assessment', 'Migration pattern recording'],
    volunteers: 234,
    href: '/citizen-science/wildlife-monitoring',
  },
  {
    id: 'photo-documentation',
    title: 'Photo Documentation',
    icon: '📷',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    accent: 'text-blue-400',
    description: 'Capture seasonal changes, species records, habitat conditions, and environmental change through geotagged photography.',
    activities: ['Seasonal landscape photography', 'Species photo records', 'Habitat change documentation', 'Wetland condition photos'],
    volunteers: 189,
    href: '/citizen-science/photo-documentation',
  },
  {
    id: 'data-verification',
    title: 'Data Verification',
    icon: '✅',
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    accent: 'text-violet-400',
    description: 'Review and validate community-submitted observations, species records, and environmental data for accuracy.',
    activities: ['Species identification review', 'Location accuracy verification', 'Evidence quality assessment', 'Duplicate flagging'],
    volunteers: 67,
    href: '/citizen-science/data-verification',
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach',
    icon: '🤝',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    accent: 'text-amber-400',
    description: 'Engage local communities in conservation awareness, environmental monitoring training, and citizen science programs.',
    activities: ['Community workshops', 'School programs', 'Field training sessions', 'District participation drives'],
    volunteers: 145,
    href: '/citizen-science/community-outreach',
  },
  {
    id: 'water-monitoring',
    title: 'Water Body Monitoring',
    icon: '💧',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    accent: 'text-cyan-400',
    description: 'Monitor lakes, rivers, springs, and wetlands for changes in water quality, levels, and ecological health.',
    activities: ['Lake level observation', 'Stream health recording', 'Water colour & turbidity', 'Aquatic species sighting'],
    volunteers: 98,
    href: '/water-systems',
  },
  {
    id: 'hazard-reporting',
    title: 'Hazard & Fire Reporting',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    accent: 'text-orange-400',
    description: 'Report forest fires, floods, landslides, and pollution events in real time to support rapid environmental response.',
    activities: ['Forest fire alerts', 'Flood boundary observation', 'Landslide early reporting', 'Pollution event documentation'],
    volunteers: 112,
    href: '/report-issue',
  },
];

const howItWorks = [
  { step: '01', title: 'Register Your Interest', desc: 'Complete the form below with your name, area, and preferred programs.', icon: User     },
  { step: '02', title: 'Receive Your Onboarding Pack', desc: 'KEW sends you a welcome kit with guidelines, protocols, and field resources.', icon: BookOpen },
  { step: '03', title: 'Choose a Program',  desc: 'Select one or more programs matching your skills, location, and availability.', icon: Eye      },
  { step: '04', title: 'Submit Observations', desc: 'Record sightings, photos, and data through KEW\'s contribution tools.', icon: Camera    },
  { step: '05', title: 'Earn Recognition',   desc: 'Gain contributor badges, appear in published records, and grow your profile.', icon: Award    },
];

const benefits = [
  { icon: '🔬', title: 'Scientific Impact', desc: 'Your observations directly feed into published research, policy briefs, and conservation decisions.' },
  { icon: '🏅', title: 'Contributor Recognition', desc: 'Earn badges, attribution credits, and research partner status as your contributions grow.' },
  { icon: '📚', title: 'Field Training', desc: 'Access KEW field protocols, species identification guides, and methodology resources.' },
  { icon: '🗺️', title: 'Regional Coverage', desc: 'Contribute to monitoring across all KEW-scoped regions — Kashmir, Ladakh, Jammu, AJK, Gilgit-Baltistan.' },
  { icon: '🌐', title: 'Open Data Access', desc: 'Approved contributors get early access to aggregated KEW datasets and published records.' },
  { icon: '🤝', title: 'Community Network', desc: 'Connect with researchers, NGOs, government agencies, and fellow citizen scientists.' },
];

const regions = [
  'Srinagar', 'Kupwara', 'Baramulla', 'Bandipora', 'Ganderbal',
  'Budgam', 'Pulwama', 'Shopian', 'Kulgam', 'Anantnag',
  'Doda', 'Kishtwar', 'Ramban', 'Udhampur', 'Reasi',
  'Kathua', 'Jammu', 'Samba', 'Rajouri', 'Poonch',
  'Leh', 'Kargil', 'Mirpur (AJK)', 'Muzaffarabad (AJK)',
  'Gilgit', 'Hunza', 'Other / Multiple',
];

const tips = [
  'You do not need scientific training to contribute — most programs welcome all skill levels.',
  'Geotagging your photos with a smartphone is one of the most impactful things a citizen scientist can do.',
  'Even brief monthly submissions are more useful than infrequent large batches.',
  'Joining the Data Verification program is a great way to contribute without fieldwork.',
  'You can contribute from any of KEW\'s five sub-regions — Kashmir, Ladakh, Jammu, AJK, or GB.',
  'School teachers and students can participate as group contributors through the Community Outreach program.',
];

const kewStats = [
  { label: 'Active Citizen Scientists', value: '642',    icon: Users     },
  { label: 'Observations Filed',        value: '18,245', icon: BarChart3  },
  { label: 'Programs Available',        value: '6',      icon: Globe      },
  { label: 'Districts Covered',         value: '46',     icon: MapPin     },
];

/* ─── Sidebar Panels ─────────────────────────────────────────────────── */

function WhyJoin() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Join KEW?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Kashmir EcoWatch is the Western Himalayas' most comprehensive citizen-powered environmental intelligence
        network. Your participation — however small — directly shapes conservation science and regional policy.
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

function HowItWorksSidebar() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ChevronRight className="w-4 h-4 text-teal-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">How It Works</h3>
      </div>
      <div className="space-y-1">
        {howItWorks.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="text-xs font-semibold text-white">{step.title}</div>
                <div className="text-[10px] text-slate-400 leading-relaxed">{step.desc}</div>
              </div>
            </div>
            {idx < howItWorks.length - 1 && <div className="ml-[13px] w-px h-3 bg-white/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function BenefitsSidebar() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Benefits of Joining</h3>
      </div>
      <div className="space-y-3">
        {benefits.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">{icon}</span>
            <div>
              <div className="text-xs font-semibold text-white">{title}</div>
              <div className="text-[10px] text-slate-400 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingTip() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % tips.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-950/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Good to Know</h3>
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

function BadgeTiers() {
  const tiers = [
    { name: 'Explorer',         desc: '1–9 observations',   color: 'from-slate-500 to-slate-600',  icon: '🔭' },
    { name: 'Observer',         desc: '10–49 observations', color: 'from-emerald-600 to-teal-600', icon: '👁️' },
    { name: 'Contributor',      desc: '50–199 observations',color: 'from-blue-600 to-indigo-600',  icon: '⭐' },
    { name: 'Research Partner', desc: '200+ observations',  color: 'from-amber-500 to-orange-500', icon: '🏅' },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Citizen Scientist Badges</h3>
      </div>
      <div className="space-y-2">
        {tiers.map(b => (
          <div key={b.name} className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${b.color} p-2.5`}>
            <span className="text-lg">{b.icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{b.name}</div>
              <div className="text-[10px] text-white/60">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyNote() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Privacy & Commitment</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Your personal information is never shared publicly without consent.',
          'You can contribute anonymously if preferred.',
          'There is no minimum commitment — contribute at your own pace.',
          'You can leave the program at any time.',
          'KEW may credit your name in published records with your permission.',
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

export default function JoinCitizenSciencePage() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [name,             setName]             = useState('');
  const [email,            setEmail]            = useState('');
  const [region,           setRegion]           = useState('');
  const [background,       setBackground]       = useState('');
  const [motivation,       setMotivation]       = useState('');
  const [availability,     setAvailability]     = useState('');
  const [submitted,        setSubmitted]        = useState(false);
  const [isSubmitting,     setIsSubmitting]     = useState(false);

  const toggleProgram = (id: string) => {
    setSelectedPrograms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !region || selectedPrograms.length === 0) return;
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
              <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to KEW Citizen Science!</h1>
              <p className="text-slate-400 text-lg mb-8">
                Thank you, <strong className="text-white">{name}</strong>. Your interest has been registered.
                You'll receive a welcome pack and onboarding guide at <strong className="text-emerald-400">{email}</strong> within 3–5 working days.
              </p>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Your Selected Programs</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPrograms.map(id => {
                    const p = programs.find(pr => pr.id === id);
                    return p ? (
                      <span key={id} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${p.bg} ${p.accent} border ${p.border}`}>
                        {p.icon} {p.title}
                      </span>
                    ) : null;
                  })}
                </div>
                <p className="text-xs text-slate-400">
                  Our team will reach out with program-specific guidelines, field protocols, and your first contribution task.
                </p>
              </Card>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => window.location.href = '/submit-observation'} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  Submit Your First Observation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/citizen-science'} className="border-white/20 text-white">
                  Explore Citizen Science Hub
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
        breadcrumbs={[{ label: 'Get Involved', href: '/contribute' }, { label: 'Join Citizen Science' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Join KEW</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Citizen Science Network</span>
        </>}
        subtitle="Help monitor, document, and protect the Western Himalayan environment. No scientific training required — just curiosity, care, and a few minutes of your time."
        icon={<Users className="w-6 h-6 text-emerald-400" />}
        label="Get Involved"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Registration form + program grid (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">

                {/* Program selector */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Choose Your Programs</h2>
                  <p className="text-sm text-slate-400 mb-6">Select one or more programs you'd like to contribute to. You can change this anytime after registration.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {programs.map(p => {
                      const selected = selectedPrograms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => toggleProgram(p.id)}
                          className={`text-left rounded-2xl border p-4 transition-all ${
                            selected
                              ? `${p.bg} ${p.border} ring-1`
                              : 'bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span className="text-2xl">{p.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className={`text-sm font-bold ${selected ? p.accent : 'text-white'}`}>{p.title}</div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  selected ? `${p.bg} border-current ${p.accent}` : 'border-white/20'
                                }`}>
                                  {selected && <CheckCircle className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{p.volunteers} active volunteers</div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 mb-3 leading-relaxed">{p.description}</p>
                          <ul className="space-y-1">
                            {p.activities.map(a => (
                              <li key={a} className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${selected ? p.accent.replace('text-','bg-') : 'bg-slate-600'}`} />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Registration form */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Register Your Interest</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Complete the form below. Our team will contact you with onboarding details within 3–5 working days.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <User className="w-3.5 h-3.5 inline mr-1" /> Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1" /> Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 inline mr-1" /> Your District / Region <span className="text-red-400">*</span>
                      </label>
                      <select
                        required value={region} onChange={e => setRegion(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="" className="bg-slate-800">Select your district or region</option>
                        {regions.map(r => <option key={r} value={r} className="bg-slate-800">{r}</option>)}
                      </select>
                    </div>

                    {/* Background */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Background / Affiliation (Optional)
                      </label>
                      <input
                        type="text" value={background} onChange={e => setBackground(e.target.value)}
                        placeholder="e.g. Student, Farmer, Teacher, Researcher, NGO worker, Photographer..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Availability
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Occasionally', 'Monthly', 'Weekly', 'Daily'].map(a => (
                          <button
                            key={a} type="button"
                            onClick={() => setAvailability(a)}
                            className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                              availability === a
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Why Do You Want to Join? (Optional)
                      </label>
                      <textarea
                        rows={3} value={motivation} onChange={e => setMotivation(e.target.value)}
                        placeholder="Tell us what motivates you — wildlife passion, environmental concern, academic interest, community involvement..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    {/* Validation notice */}
                    {selectedPrograms.length === 0 && (
                      <p className="text-xs text-amber-400">Please select at least one program above before submitting.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !name || !email || !region || selectedPrograms.length === 0}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Registering…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Join KEW Citizen Science <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      By registering, you agree to KEW's contribution guidelines. There is no minimum commitment required.
                    </p>
                  </form>
                </Card>

                {/* Cross-links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link href="/submit-observation" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Submit Observation <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/share-data" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Share Scientific Data <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/citizen-science" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Citizen Science Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <WhyJoin />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <HowItWorksSidebar />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <BenefitsSidebar />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <RotatingTip />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <BadgeTiers />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <PrivacyNote />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
