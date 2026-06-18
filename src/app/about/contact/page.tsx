
'use client';
import React, { useState } from 'react';
import { Heading } from '@/components/common/Heading';
import { Mail, Send, Building2, BookOpen, Database, Leaf } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ contact_name: '', email: '', partnership_type: 'Academic research', message: '' });

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Contact & Pathways</span>
          </>}
        subtitle="Submit an enquiry or explore specific partnership pathways."
      />
      <section className="py-12 sm:py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Submit Enquiry</h2>
              </div>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Contact Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Partnership Type</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm" value={formData.partnership_type} onChange={e => setFormData({...formData, partnership_type: e.target.value})}>
                    <option>Academic research</option>
                    <option>Government agency</option>
                    <option>Data provider</option>
                    <option>Conservation NGO</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 block uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors w-full justify-center">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>

            {/* Pathways */}
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4">
                <BookOpen className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Academic Research</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Joint studies, co-authored papers, and shared datasets via our open portals.</p>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4">
                <Building2 className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Government Agency</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Formal data exchange, API integrations, and policy reporting pipelines.</p>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4">
                <Database className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Data Provider</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Ingest your sensor feeds or datasets into KEW with full attribution and licensing.</p>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4">
                <Leaf className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Conservation NGO</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Co-branded field programmes, citizen networks, and joint stewardship projects.</p>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
