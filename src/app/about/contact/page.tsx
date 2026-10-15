'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { 
  Mail, Send, Building2, BookOpen, Database, Leaf, 
  Phone, MapPin, CheckCircle, Clock, ShieldCheck, ExternalLink,
  Copy, Check, Sparkles, Award, Users, Landmark, Cpu,
  Heart, ArrowRight, Activity, Shield, MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    contact_name: '', 
    email: '', 
    organization: '',
    partnership_type: 'Academic research & Field Surveys', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Executive Metric Cards (Matching About, Mission, Founder, Contributors, Governance, Support)
  const macroStats = [
    { value: '<24h', label: 'Response SLA', sub: 'Direct institutional triage', icon: Clock, color: 'text-emerald-400' },
    { value: 'Official', label: 'Verified Mailbox', sub: 'contact@kashmir-ecowatch.com', icon: Mail, color: 'text-sky-400' },
    { value: 'Sat – Sun', label: 'Voice Liaison Desk', sub: '+1 916 699 0091 (EST)', icon: Phone, color: 'text-purple-400' },
    { value: 'USA HQ', label: 'Observatory Secretariat', sub: 'Loudoun County, VA, USA', icon: Landmark, color: 'text-amber-400' },
    { value: '100%', label: 'Non-Commercial Intake', sub: 'Zero monetization or paywalls', icon: Heart, color: 'text-rose-400' },
    { value: 'IONOS MX', label: 'Encrypted Gateway', sub: 'Verified secure communication', icon: ShieldCheck, color: 'text-teal-400' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@kashmir-ecowatch.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact_name || !formData.email || !formData.message) return;

    // Trigger direct mailto client with structured content
    const subject = encodeURIComponent(`[KEW Inquiry - ${formData.partnership_type}] from ${formData.contact_name}`);
    const body = encodeURIComponent(
      `Name: ${formData.contact_name}\n` +
      `Email: ${formData.email}\n` +
      `Organization: ${formData.organization || 'Independent / Not specified'}\n` +
      `Partnership Track: ${formData.partnership_type}\n\n` +
      `Message:\n${formData.message}\n`
    );

    window.location.href = `mailto:contact@kashmir-ecowatch.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Mail className="w-5 h-5 text-emerald-400" />}
        label="Executive Liaison & Secretariat Communication"
        title="Contact & Scientific Pathways"
        subtitle="Direct scientific liaison, academic partnerships, institutional telemetry data feeds, and philanthropic sponsorship inquiries."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact & Secretariat' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Submit Portal Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400 font-semibold text-sm transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Founder Leadership</span>
            </Link>
            <Link
              href="/about/support-sponsorship"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Sponsorship & Backing</span>
            </Link>
          </div>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-8">
        
        {/* ─── Macro Stats Banner (Robust Responsive Cards with Zero Text Leak) ── */}
        <section className="relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {macroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl min-h-[140px] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-black tracking-tight leading-none ${stat.value.length > 7 ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} ${stat.color}`}>
                      {stat.value}
                    </span>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 opacity-70" />
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">{stat.label}</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3 Primary Direct Communication Desks ─────────────────────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Card */}
              <div className="glass-panel p-7 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      Official Mailbox
                    </span>
                  </div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Direct Correspondence</h4>
                  <a 
                    href="mailto:contact@kashmir-ecowatch.com" 
                    className="text-lg font-bold text-white hover:text-emerald-300 transition-colors block break-all mb-2"
                  >
                    contact@kashmir-ecowatch.com
                  </a>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    General inquiries, scientific contributions, data audits, and institutional queries.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> &lt;24h Response SLA
                  </span>
                  <button 
                    onClick={handleCopyEmail}
                    className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20"
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* Phone Hotline Card */}
              <div className="glass-panel p-7 rounded-3xl border border-sky-500/30 bg-sky-950/20 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-sky-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30">
                      Voice & SMS
                    </span>
                  </div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Executive Liaison & Voice Desk</h4>
                  <a 
                    href="tel:+19166990091" 
                    className="text-lg font-bold text-white hover:text-sky-300 transition-colors block mb-2"
                  >
                    +1 916 699 0091
                  </a>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Senior institutional coordination, urgent media verification, and executive liaison.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium">USA Eastern Time (EST)</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono text-[11px]">Sat – Sun</span>
                </div>
              </div>

              {/* Global Secretariat Card */}
              <div className="glass-panel p-7 rounded-3xl border border-purple-500/30 bg-purple-950/20 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      Headquarters
                    </span>
                  </div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Observatory Headquarters</h4>
                  <p className="text-lg font-bold text-white mb-2">
                    Loudoun County, VA, USA
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Philanthropic sponsorship under Dr. Kumar Foundation USA and CSR platform governance.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium">Dr. Kumar Foundation USA</span>
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Intake & Scientific Pathways Grid ────────────────────── */}
        <section id="form" className="scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form (7 Columns) */}
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">Submit Portal Enquiry</h2>
                    <p className="text-xs text-slate-400">Routed directly to <span className="text-emerald-400 font-mono">contact@kashmir-ecowatch.com</span></p>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Dispatched</h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your inquiry has been formulated and dispatched to our scientific and administrative coordination team. You will receive an automated response via our mail gateway.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-1.5 block uppercase tracking-wider">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Dr. / Prof. / Scholar"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm transition-all" 
                          value={formData.contact_name} 
                          onChange={e => setFormData({...formData, contact_name: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 mb-1.5 block uppercase tracking-wider">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="user@institution.org"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm transition-all" 
                          value={formData.email} 
                          onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-1.5 block uppercase tracking-wider">
                        Organization / University / Affiliation
                      </label>
                      <input 
                        type="text" 
                        placeholder="University of Kashmir / SAC ISRO / NGO / Independent"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm transition-all" 
                        value={formData.organization} 
                        onChange={e => setFormData({...formData, organization: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-1.5 block uppercase tracking-wider">Partnership Track</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm transition-all" 
                        value={formData.partnership_type} 
                        onChange={e => setFormData({...formData, partnership_type: e.target.value})}
                      >
                        <option>Academic research & Field Surveys</option>
                        <option>Government agency & Remote Sensing Ingestion</option>
                        <option>Sensor Telemetry & IoT Station Provider</option>
                        <option>Conservation NGO & Community Stewardship</option>
                        <option>Media, Press & Environmental Inquiries</option>
                        <option>Sponsorship & Diaspora Foundation Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-1.5 block uppercase tracking-wider">
                        Message / Proposal <span className="text-rose-400">*</span>
                      </label>
                      <textarea 
                        rows={4} 
                        required
                        placeholder="Describe your research query, observation submission, or collaboration objectives..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none transition-all" 
                        value={formData.message} 
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 w-full justify-center"
                    >
                      <Send className="w-4 h-4" /> Send Structured Inquiry to contact@kashmir-ecowatch.com
                    </button>
                  </form>
                )}
              </div>

              {/* Pathways & Infrastructure (5 Columns) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/15 transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Academic Research</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Joint limnological studies, cryosphere mass balance analysis, co-authored peer papers, and open dataset sharing via our standardized API portals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/15 transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Government Agency & Policy</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Formal multilateral spatial exchange, automated ingest of GIS telemetry, and regional SDG/climate resilience reporting pipelines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/15 transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Telemetry & Sensor Provider</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Ingest automated weather stations (AWS), water quality sondes, or Copernicus/USGS satellite imagery feeds with open licensing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/15 transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">Conservation NGO & Field Networks</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Community-led bio-blitz campaigns, alpine wetland cleanup coordination, and endangered species corridor monitoring networks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* IONOS Mailbox Access Badge */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="font-medium">DNS & MX Verified via IONOS Mail Gateway</span>
                  </div>
                  <a 
                    href="https://mail.ionos.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    IONOS Webmail <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Institutional Backing & Reciprocal Links ─────────────────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Philanthropic Sponsorship & Engineering Delivery</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Spearheaded & Supported by Dr. Kumar Foundation USA
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Maintained with zero commercial monetization as a permanent Knowledge Return System for Kashmir, with enterprise cloud engineering provided gratis by Prime Logic Solutions under Corporate Social Responsibility (CSR).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/about/founder"
                  className="px-5 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Founder Leadership</span>
                </Link>
                <Link
                  href="/about/contributors"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Contributors Network</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
