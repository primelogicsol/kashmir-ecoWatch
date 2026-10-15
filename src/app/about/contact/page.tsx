'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/common/Heading';
import { 
  Mail, Send, Building2, BookOpen, Database, Leaf, 
  Phone, MapPin, CheckCircle, Clock, ShieldCheck, ExternalLink, Copy, Check
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    contact_name: '', 
    email: '', 
    organization: '',
    partnership_type: 'Academic research', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <main className="min-h-screen bg-slate-950">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Contact & Pathways</span>
          </>}
        subtitle="Direct scientific liaison, academic partnerships, institutional data feeds, and diaspora sponsorship inquiries."
      />

      <section className="py-10 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          
          {/* Quick Direct Communication Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Official Mailbox
                  </span>
                </div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Direct Correspondence</h4>
                <a 
                  href="mailto:contact@kashmir-ecowatch.com" 
                  className="text-base font-bold text-white hover:text-emerald-400 transition-colors block break-all"
                >
                  contact@kashmir-ecowatch.com
                </a>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> &lt;24h Response SLA
                </span>
                <button 
                  onClick={handleCopyEmail}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
            </div>

            {/* Phone Hotline Card */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Voice & SMS
                  </span>
                </div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Secretariat Hotline</h4>
                <a 
                  href="tel:+19166990091" 
                  className="text-base font-bold text-white hover:text-sky-400 transition-colors block"
                >
                  +1 916 699 0091
                </a>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>USA Eastern Time (EST)</span>
                <span className="text-slate-500">Mon – Fri</span>
              </div>
            </div>

            {/* Global Secretariat Card */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Headquarters
                  </span>
                </div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Global Governance</h4>
                <p className="text-base font-bold text-white">
                  Loudoun County, VA, USA
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Dr. Kumar Foundation USA</span>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Send className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Submit Portal Enquiry</h2>
                  <p className="text-xs text-slate-400">Routed directly to <span className="text-emerald-400 font-mono">contact@kashmir-ecowatch.com</span></p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Message Dispatched</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                    Your inquiry has been formulated and dispatched to our scientific and administrative coordination team.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Dr. / Prof. / Scholar"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" 
                        value={formData.contact_name} 
                        onChange={e => setFormData({...formData, contact_name: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="user@institution.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">
                      Organization / University / Affiliation
                    </label>
                    <input 
                      type="text" 
                      placeholder="University of Kashmir / SAC ISRO / NGO / Independent"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" 
                      value={formData.organization} 
                      onChange={e => setFormData({...formData, organization: e.target.value})} 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Partnership Track</label>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" 
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
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">
                      Message / Proposal <span className="text-rose-400">*</span>
                    </label>
                    <textarea 
                      rows={4} 
                      required
                      placeholder="Describe your research query, observation submission, or collaboration objectives..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none" 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-950/40 w-full justify-center"
                  >
                    <Send className="w-4 h-4" /> Send Message to contact@kashmir-ecowatch.com
                  </button>
                </form>
              )}
            </div>

            {/* Pathways */}
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 hover:border-white/15 transition-all">
                <BookOpen className="w-5 h-5 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Academic Research</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Joint limnological studies, cryosphere analysis, co-authored peer papers, and open dataset sharing via our standardized API portals.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 hover:border-white/15 transition-all">
                <Building2 className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Government Agency & Policy</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Formal multi-lateral spatial exchange, automated ingest of GIS telemetry, and regional SDG/climate resilience reporting pipelines.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 hover:border-white/15 transition-all">
                <Database className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Telemetry & Sensor Provider</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ingest automated automated weather stations (AWS), water quality sondes, or Copernicus/USGS satellite imagery feeds with open licensing.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 hover:border-white/15 transition-all">
                <Leaf className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Conservation NGO & Field Networks</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Community-led bio-blitz campaigns, alpine wetland cleanup coordination, and endangered species corridor monitoring networks.
                  </p>
                </div>
              </div>

              {/* IONOS Mailbox Access Badge */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>DNS & MX Records Verified via IONOS Mail Gateway</span>
                </div>
                <a 
                  href="https://mail.ionos.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  IONOS Webmail <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
