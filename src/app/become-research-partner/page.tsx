'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ArrowRight, CheckCircle, Users, Globe, Award,
  Lightbulb, RefreshCw, Lock, Mail, User, MapPin,
  FileText, BookOpen, TrendingUp, Layers, Eye, Database,
  Building2, Microscope, Handshake, GraduationCap,
  BarChart3, Shield, Star, ChevronRight, Leaf,
  Satellite, Activity, ScrollText, FlaskConical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Data ───────────────────────────────────────────────────────────── */

const partnershipTypes = [
  {
    id: 'research-collaboration',
    title: 'Research Collaboration',
    icon: '🔬',
    accent: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    description: 'Joint field research, co-authored publications, shared methodology, and collaborative grant applications on Western Himalayan environmental topics.',
    examples: ['Co-designed field studies', 'Shared species databases', 'Joint grant applications', 'Co-authored publications'],
  },
  {
    id: 'data-exchange',
    title: 'Institutional Data Exchange',
    icon: '🔄',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    description: 'Formalised bilateral data sharing under a Data Exchange Agreement — mutual access to KEW datasets and partner institutional archives.',
    examples: ['Bilateral data sharing', 'API integration', 'Sensor network linkage', 'Archive cross-access'],
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building & Training',
    icon: '🎓',
    accent: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    description: 'Co-delivered training programmes, field methodology workshops, and citizen science capacity building for communities and institutions.',
    examples: ['Field protocol workshops', 'Data management training', 'Citizen science programs', 'Remote sensing courses'],
  },
  {
    id: 'policy-advisory',
    title: 'Policy & Advisory Partnership',
    icon: '🏛',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    description: 'Environmental intelligence briefings, evidence synthesis, and advisory support to government bodies, NGOs, and international policy forums.',
    examples: ['Policy briefs', 'Environmental impact review', 'SDG monitoring support', 'UN reporting contributions'],
  },
  {
    id: 'monitoring-network',
    title: 'Monitoring Network Integration',
    icon: '📡',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    description: `Integration of partner monitoring stations, sensor networks, or field sites into KEW's regional environmental intelligence infrastructure.`,
    examples: ['Weather station onboarding', 'Air quality node integration', 'Camera trap network', 'Water gauge linkage'],
  },
  {
    id: 'educational-outreach',
    title: 'Education & Outreach',
    icon: '📚',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    description: 'University curriculum integration, student research placements, school programs, and public science communication partnerships.',
    examples: ['Student dissertations', 'Field placements', 'School science programs', 'Public lectures'],
  },
];

const partnerOrgs = [
  { icon: '🎓', label: 'Universities & Research Institutes',   desc: 'Kashmir University, SKUAST, NIT Srinagar, international universities' },
  { icon: '🏛', label: 'Government Agencies',                  desc: 'Forest Dept., Wildlife Protection, JKPCC, MoEFCC' },
  { icon: '🌿', label: 'Conservation Organisations',           desc: 'WWF, WCS, IUCN, Snow Leopard Trust, local NGOs' },
  { icon: '🌐', label: 'International Bodies',                  desc: 'UNEP, FAO, GBIF, Ramsar Convention partners' },
  { icon: '🛰', label: 'Remote Sensing & Tech Institutes',     desc: 'ISRO, DRDO, GIS mapping agencies' },
  { icon: '🤝', label: 'Diaspora & Foundation Partners',       desc: 'Dr. Kumar Foundation USA and allied diaspora networks' },
];

const partnerBenefits = [
  { icon: '📊', title: 'Priority Data Access',      desc: 'Early access to KEW datasets, reports, and regional environmental intelligence outputs before public release.' },
  { icon: '🔬', title: 'Joint Research Credit',     desc: 'Co-authorship on KEW publications, acknowledgement in research outputs, and shared DOI citations.' },
  { icon: '🗺️', title: 'Regional Coverage',        desc: 'Access to environmental data spanning all 5 KEW sub-regions: Kashmir, Ladakh, Jammu, AJK, Gilgit-Baltistan.' },
  { icon: '🤝', title: 'Network Integration',       desc: `Integration into KEW's growing partner network of 38+ institutions, agencies, and conservation bodies.` },
  { icon: '📢', title: 'Policy Influence',          desc: 'Contribute to environmental intelligence that informs district-level policy, land use planning, and SDG monitoring.' },
  { icon: '🎓', title: 'Capacity & Training',       desc: 'Access to KEW field protocols, methodology guides, and training programmes for staff and students.' },
];

const engagementSteps = [
  { icon: FileText,    label: 'Expression of Interest', desc: 'Complete the form below with your institution details and partnership scope.',      color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Eye,         label: 'Initial Review',         desc: 'KEW team reviews your application and schedules a discovery call.',                 color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Handshake,   label: 'Partnership Discussion', desc: 'Agree on partnership scope, data access, and mutual commitments.',                  color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: ScrollText,  label: 'Agreement Signed',       desc: 'Formalise the partnership via MOU, DSA, or Letter of Intent.',                     color: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  { icon: Activity,    label: 'Active Collaboration',   desc: 'Joint research, data exchange, training, or monitoring begins.',                    color: 'text-teal-400',    bg: 'bg-teal-500/10'    },
  { icon: BarChart3,   label: 'Review & Renewal',       desc: 'Annual partnership review with option to expand scope and renew agreement.',        color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const currentPartners = [
  { name: 'Kashmir University', type: 'Research & Data', region: 'Kashmir' },
  { name: 'WWF India',          type: 'Conservation',    region: 'Pan-Regional' },
  { name: 'J&K Forest Dept.',   type: 'Government',      region: 'J&K' },
  { name: 'GBIF Network',       type: 'Data Exchange',   region: 'International' },
];

const tips = [
  'Partnership proposals with a clear data sharing component are typically processed faster.',
  'KEW supports MOU, DSA, and Letter of Intent formats — whichever suits your institution.',
  'Student dissertation partnerships are lightweight and don\'t require a formal MOU.',
  'Sensor network integration proposals should include hardware specs and data transmission protocols.',
  'International partners can contribute remotely — physical presence in the region is not required.',
  'Policy advisory partnerships are especially welcome from government departments and UN agencies.',
  'KEW can provide a tailored partnership prospectus on request for institutional decision-making.',
];

const kewStats = [
  { label: 'Active Partners',    value: '38+',    icon: Building2 },
  { label: 'Research Outputs',   value: '24',     icon: FlaskConical },
  { label: 'Data Domains',       value: '6',      icon: Layers },
  { label: 'Countries Engaged',  value: '8',      icon: Globe },
];

/* ─── Sidebar Panels ──────────────────────────────────────────────────── */

function WhyPartner() {
  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Handshake className="w-4 h-4 text-indigo-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Why Partner with KEW?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Kashmir EcoWatch is the Western Himalayas' most comprehensive environmental intelligence platform —
        aggregating biodiversity, water, hazard, and climate data across 5 sub-regions. A KEW research
        partnership connects your institution to one of South Asia's most data-rich environmental networks.
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

function WhoCanPartner() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-blue-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Who Can Partner?</h3>
      </div>
      <div className="space-y-3">
        {partnerOrgs.map(({ icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div>
              <div className="text-xs font-semibold text-white">{label}</div>
              <div className="text-[10px] text-slate-400 leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerBenefitsPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Partner Benefits</h3>
      </div>
      <div className="space-y-3">
        {partnerBenefits.map(({ icon, title, desc }) => (
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

function EngagementFlow() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ChevronRight className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Partnership Process</h3>
      </div>
      <div className="space-y-1">
        {engagementSteps.map((step, idx) => (
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
            {idx < engagementSteps.length - 1 && <div className="ml-[13px] w-px h-3 bg-white/10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PartnerTip() {
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
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Partnership Tip</h3>
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

function FeaturedPartners() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Award className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Select Current Partners</h3>
      </div>
      <div className="space-y-2">
        {currentPartners.map(({ name, type, region }) => (
          <div key={name} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
            <div>
              <div className="text-xs font-semibold text-white">{name}</div>
              <div className="text-[10px] text-slate-400">{type}</div>
            </div>
            <span className="text-[10px] text-slate-500 bg-white/5 rounded-full px-2 py-0.5">{region}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3">Full partner directory available on request.</p>
    </div>
  );
}

function GovernanceNote() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Partnership Governance</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Partnerships are formalised via MOU, DSA, or Letter of Intent.',
          'Data use rights are negotiated and documented prior to exchange.',
          'Sensitive datasets may have embargo periods and access controls.',
          'Partnership terms are reviewed annually and renewable.',
          'KEW maintains institutional independence — partnerships do not confer editorial influence over published outputs.',
          'All partner data contributions are attributed in published records.',
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

export default function BecomeResearchPartnerPage() {
  const [selectedTypes,    setSelectedTypes]    = useState<string[]>([]);
  const [name,             setName]             = useState('');
  const [email,            setEmail]            = useState('');
  const [organisation,     setOrganisation]     = useState('');
  const [role,             setRole]             = useState('');
  const [country,          setCountry]          = useState('');
  const [website,          setWebsite]          = useState('');
  const [agreementType,    setAgreementType]    = useState('');
  const [timeline,         setTimeline]         = useState('');
  const [message,          setMessage]          = useState('');
  const [requestProspectus,setRequestProspectus]= useState(false);
  const [submitted,        setSubmitted]        = useState(false);
  const [isSubmitting,     setIsSubmitting]     = useState(false);

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !organisation || selectedTypes.length === 0) return;
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
              <CheckCircle className="w-20 h-20 text-indigo-400 mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Partnership Enquiry Received</h1>
              <p className="text-slate-400 text-lg mb-8">
                Thank you, <strong className="text-white">{name}</strong> from{' '}
                <strong className="text-white">{organisation}</strong>. Our partnerships team will
                contact you at <strong className="text-indigo-400">{email}</strong> within 5 working days
                to schedule a discovery call and discuss the next steps.
              </p>
              <Card className="glass-intense border-white/10 p-6 mb-8">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Selected Partnership Areas</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTypes.map(id => {
                    const t = partnershipTypes.find(p => p.id === id);
                    return t ? (
                      <span key={id} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${t.bg} ${t.accent} border ${t.border}`}>
                        {t.icon} {t.title}
                      </span>
                    ) : null;
                  })}
                </div>
                {requestProspectus && (
                  <p className="text-xs text-indigo-400 flex items-center gap-2 mt-3">
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                    A KEW Partnership Prospectus will be included with your onboarding materials.
                  </p>
                )}
              </Card>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => window.location.href = '/about/support-sponsorship'} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                  Support & Sponsorship <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/about'} className="border-white/20 text-white">
                  About KEW
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
        breadcrumbs={[{ label: 'Get Involved', href: '/contribute' }, { label: 'Become a Research Partner' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Become a</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">KEW Research Partner</span>
        </>}
        subtitle="Establish a formal research or data partnership with the Western Himalayan Environmental Intelligence Network. Open to universities, government agencies, conservation organisations, and international bodies."
        icon={<Handshake className="w-6 h-6 text-indigo-400" />}
        label="Institutional Partnership"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Form (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">

                {/* Partnership type selector */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Partnership Areas</h2>
                  <p className="text-sm text-slate-400 mb-6">Select the areas of collaboration you are interested in. Multiple areas can be combined into a single partnership.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {partnershipTypes.map(t => {
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
                              <span className="text-2xl">{t.icon}</span>
                              <div className={`text-sm font-bold ${selected ? t.accent : 'text-white'}`}>{t.title}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              selected ? `${t.bg} border-current ${t.accent}` : 'border-white/20'
                            }`}>
                              {selected && <CheckCircle className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 mb-3 leading-relaxed">{t.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {t.examples.map(ex => (
                              <span key={ex} className="text-[10px] text-slate-400 bg-white/5 rounded-full px-2 py-0.5">{ex}</span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Institution & contact form */}
                <Card className="glass-intense border-white/10 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2">Institution & Contact Details</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Provide your institutional information. Our partnerships team will review and schedule a discovery call within 5 working days.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <User className="w-3.5 h-3.5 inline mr-1" /> Contact Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Prof. / Dr. / Mr. / Ms."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1" /> Institutional Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="your@institution.edu"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Organisation & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Building2 className="w-3.5 h-3.5 inline mr-1" /> Institution / Organisation <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" required value={organisation} onChange={e => setOrganisation(e.target.value)}
                          placeholder="Full institutional name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Designation / Role
                        </label>
                        <input
                          type="text" value={role} onChange={e => setRole(e.target.value)}
                          placeholder="e.g. Professor, Director, Research Lead"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Country & Website */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <Globe className="w-3.5 h-3.5 inline mr-1" /> Country / Region
                        </label>
                        <input
                          type="text" value={country} onChange={e => setCountry(e.target.value)}
                          placeholder="e.g. India, Pakistan, USA, UK"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Institution Website
                        </label>
                        <input
                          type="url" value={website} onChange={e => setWebsite(e.target.value)}
                          placeholder="https://www.institution.edu"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Agreement type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Preferred Agreement Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['MOU', 'Data Sharing Agreement', 'Letter of Intent', 'Informal Arrangement'].map(a => (
                          <button
                            key={a} type="button"
                            onClick={() => setAgreementType(a)}
                            className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all leading-tight ${
                              agreementType === a
                                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Desired Start Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Immediately', '1–3 Months', '3–6 Months', 'Flexible'].map(t => (
                          <button
                            key={t} type="button"
                            onClick={() => setTimeline(t)}
                            className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                              timeline === t
                                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Partnership message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Partnership Proposal / Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4} value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Describe your research focus, available data or resources, proposed collaboration scope, and what you hope to achieve through this partnership..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    {/* Prospectus request */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requestProspectus}
                          onChange={e => setRequestProspectus(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-white/10 text-indigo-500 focus:ring-indigo-500"
                        />
                        <div>
                          <div className="text-sm font-semibold text-white">Send me the KEW Partnership Prospectus</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            A detailed document outlining KEW's research capabilities, data assets, and partnership framework — suitable for institutional approval processes.
                          </div>
                        </div>
                      </label>
                    </div>

                    {selectedTypes.length === 0 && (
                      <p className="text-xs text-amber-400">Please select at least one partnership area above before submitting.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !name || !email || !organisation || !message || selectedTypes.length === 0}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting Enquiry…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Partnership Enquiry <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      Enquiries are reviewed by the KEW partnerships team. We respond to all genuine institutional proposals within 5 working days.
                    </p>
                  </form>
                </Card>

                {/* Cross-links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <Link href="/become-data-contributor" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Become a Data Contributor <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/about/support-sponsorship" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Support & Sponsorship <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600 hidden sm:block">|</span>
                  <Link href="/about/contact" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    Contact KEW Directly <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <WhyPartner />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <WhoCanPartner />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <PartnerBenefitsPanel />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <EngagementFlow />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <PartnerTip />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <FeaturedPartners />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <GovernanceNote />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
