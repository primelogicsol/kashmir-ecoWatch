const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/app/about';

const pages = {
  founder: `
import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Users, Award, Shield } from 'lucide-react';

export default function FounderPage() {
  const founders = [
    {
      name: 'Dr. Kumar Foundation USA',
      role: 'Principal Sponsor & Founder',
      icon: Shield,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400'
    },
    {
      name: 'Dr. Nazia Qadir',
      role: 'Biodiversity Lead',
      icon: Award,
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400'
    },
    {
      name: 'Dr. Rakesh Bhat',
      role: 'Remote Sensing & GIS',
      icon: Award,
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-blue-400'
    },
    {
      name: 'Principal Scientist, Hydrology',
      role: 'Water Systems Lead',
      icon: Users,
      color: 'from-sky-500/20 to-cyan-500/20',
      textColor: 'text-sky-400'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Founders & Leadership</span>
          </>}
        subtitle="The scientific backbone and philanthropic leadership behind Kashmir EcoWatch."
      />
      <section className="py-12 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((f, i) => (
              <div key={i} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col items-start gap-4">
                <div className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${f.color} flex items-center justify-center\`}>
                  <f.icon className={\`w-6 h-6 \${f.textColor}\`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{f.name}</h3>
                  <p className="text-sm text-slate-400">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
`,
  contributors: `
import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Users, Database, Shield, CheckCircle } from 'lucide-react';

export default function ContributorsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Contributors & Partners</span>
          </>}
        subtitle="Field partners, data contributors, and open licensing agreements powering our intelligence network."
      />
      <section className="py-12 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Field Partners</h2>
              </div>
              <ul className="space-y-4">
                <li className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-semibold text-slate-200">Wildlife SOS Kashmir</h3>
                  <p className="text-sm text-slate-400">Species reporting network</p>
                </li>
                <li className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-semibold text-slate-200">WWF-India, J&K Chapter</h3>
                  <p className="text-sm text-slate-400">Conservation advocacy</p>
                </li>
                <li>
                  <h3 className="text-lg font-semibold text-slate-200">Wular Conservation & Management Authority</h3>
                  <p className="text-sm text-slate-400">Wetland stewardship</p>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Data Contributors</h2>
              </div>
              <ul className="space-y-4">
                <li className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-semibold text-slate-200">Copernicus / ESA</h3>
                  <p className="text-sm text-slate-400">Satellite remote sensing</p>
                </li>
                <li className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-semibold text-slate-200">World Bank Open Data</h3>
                  <p className="text-sm text-slate-400">Socio-environmental indicators</p>
                </li>
                <li>
                  <h3 className="text-lg font-semibold text-slate-200">ReliefWeb / OCHA</h3>
                  <p className="text-sm text-slate-400">Humanitarian situation reports</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Contributor & Licensing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-200">CC BY-SA 4.0</h4>
                <p className="text-xs text-slate-400">Attribution + share-alike</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <CheckCircle className="w-5 h-5 text-blue-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-200">CC0 Public Domain</h4>
                <p className="text-xs text-slate-400">Fully open use</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <Shield className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-200">Restricted</h4>
                <p className="text-xs text-slate-400">Limited use — see methodology</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <Shield className="w-5 h-5 text-rose-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-200">Contact Required</h4>
                <p className="text-xs text-slate-400">Request permission first</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
`,
  support_sponsorship: `
import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Heart, Star, Shield } from 'lucide-react';

export default function SupportSponsorshipPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Support & Sponsorship</span>
          </>}
        subtitle="Pathways to back our environmental intelligence infrastructure."
      />
      <section className="py-12 sm:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">Standard</span>
                <h2 className="text-3xl font-black text-white">$50 <span className="text-lg text-slate-500 font-normal">/ month</span></h2>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-slate-300"><Heart className="w-4 h-4 text-emerald-400" /> Attribution on contributors page</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Heart className="w-4 h-4 text-emerald-400" /> Quarterly impact briefing</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Heart className="w-4 h-4 text-emerald-400" /> Early access to research reports</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors">Become a Supporter</button>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-sky-500/30 bg-sky-950/20 hover:border-sky-500/50 transition-all flex flex-col relative">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider">Recommended</div>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">Institutional Partner</span>
                <h2 className="text-3xl font-black text-white">$1,000 <span className="text-lg text-slate-500 font-normal">/ month</span></h2>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-slate-300"><Star className="w-4 h-4 text-sky-400" /> Logo placement across platform</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Star className="w-4 h-4 text-sky-400" /> Custom dashboard for your region</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Star className="w-4 h-4 text-sky-400" /> Dedicated data liaison</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Star className="w-4 h-4 text-sky-400" /> Co-branded reports</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-colors">Partner With Us</button>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all flex flex-col">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">Principal Sponsor</span>
                <h2 className="text-3xl font-black text-white">Custom</h2>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm text-slate-300"><Shield className="w-4 h-4 text-amber-400" /> Named research programme</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Shield className="w-4 h-4 text-amber-400" /> Direct scientific collaboration</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Shield className="w-4 h-4 text-amber-400" /> Annual Kashmir field visit</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><Shield className="w-4 h-4 text-amber-400" /> Joint policy engagement</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors">Contact Leadership</button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
`,
  contact: `
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
        <div className="container mx-auto px-4 sm:px-6">
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
      </section>
    </main>
  );
}
`
};

for (const [name, code] of Object.entries(pages)) {
  const dir = path.join(basePath, name.replace('_', '-'));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), code, 'utf8');
}
