'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Target, Map, Shield, Eye, ShieldCheck, FileCheck, MapPin, LockOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MissionPage() {
  const roadmap = [
    {
      year: '2026',
      description: 'Unify Kashmir environmental data across biodiversity, water, hazards, and climate.',
      color: 'text-emerald-400'
    },
    {
      year: '2027',
      description: 'Extend citizen-science coverage to every district with verified contributors.',
      color: 'text-blue-400'
    },
    {
      year: '2028',
      description: 'Publish SDG, Sendai, and CBD indicator dashboards aligned with national reporting.',
      color: 'text-amber-400'
    },
    {
      year: '2030',
      description: 'Become the default open reference for Kashmir Himalaya environmental intelligence.',
      color: 'text-purple-400'
    }
  ];

  const operatingValues = [
    {
      icon: ShieldCheck,
      text: 'Data integrity over narrative convenience',
    },
    {
      icon: FileCheck,
      text: 'Attribution and provenance for every number',
    },
    {
      icon: MapPin,
      text: 'Local knowledge treated as primary evidence',
    },
    {
      icon: LockOpen,
      text: 'Open access by default, restricted only when lives or species are at risk',
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Our Mission</span>
          </>}
        subtitle="Make Kashmir’s environment legible, accountable, and protected."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none mb-20"
          >
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light">
              We bring together open Earth observation, in-situ monitoring, and community knowledge into a single, trustworthy observatory for the Kashmir Himalayas — so evidence reaches decisions before damage reaches the land.
            </p>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Map className="w-8 h-8 text-emerald-400" />
              Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmap.map((item, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`text-4xl font-black mb-4 ${item.color}`}>
                    {item.year}
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-sky-400" />
              Operating values
            </h2>
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5">
              <ul className="space-y-6">
                {operatingValues.map((val, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 shrink-0 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-center">
                      <val.icon className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                      {val.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          </div>
        </div>
      </section>
    </main>
  );
}
