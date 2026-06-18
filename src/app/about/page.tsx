'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Leaf, Shield, Globe, Users, Database, BookOpen, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const pillars = [
    {
      icon: Shield,
      title: 'Ecological Integrity',
      description: 'Protecting the Kashmir Himalayas through science-grounded observation and community stewardship.',
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400'
    },
    {
      icon: Database,
      title: 'Open Science',
      description: 'Every dataset, methodology, and indicator is public, auditable, and citable.',
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-blue-400'
    },
    {
      icon: Users,
      title: 'Community Led',
      description: 'Field reports and citizen sightings are first-class data, not an afterthought.',
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400'
    },
    {
      icon: Globe,
      title: 'Global Context',
      description: 'Kashmir data threaded into SDG, UNFCCC, and Sendai Framework reporting.',
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">About the Platform</span>
          </>}
        subtitle="A living observatory for Kashmir’s ecosystems"
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none mb-16"
          >
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light">
              The Kashmir Environmental Watch (KEW) platform unifies biodiversity, water, climate, and hazard intelligence for the Kashmir Himalayas into a single public observatory. It is designed for researchers, decision-makers, and the people who live closest to these landscapes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.textColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-6">A knowledge return system</h2>
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Kashmir EcoWatch is not just a data platform. <br />
                <strong className="text-white">It is a knowledge return system.</strong>
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Scholars, scientists, and researchers have studied Kashmir for decades. But their findings often remain scattered across journals, institutions, and foreign repositories.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Kashmir EcoWatch does one essential thing: <br />
                <strong className="text-emerald-400">It brings that knowledge back to where it belongs.</strong>
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-6">A living bridge</h2>
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 bg-sky-950/10 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                It creates a living bridge between:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                  <div className="w-2 h-2 rounded-full bg-sky-400" /> research and reality
                </li>
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                  <div className="w-2 h-2 rounded-full bg-sky-400" /> data and decision-making
                </li>
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                  <div className="w-2 h-2 rounded-full bg-sky-400" /> global scholarship and local ecosystems
                </li>
              </ul>
              <p className="text-lg text-slate-300 leading-relaxed mt-6">
                Because knowledge about Kashmir should not remain distant. <br />
                <strong className="text-white">It should inform, protect, and serve Kashmir itself.</strong>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-white mb-6">What the platform does</h2>
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5">
              <p className="text-lg text-slate-300 leading-relaxed">
                KEW ingests authoritative open data (Open-Meteo, USGS, GBIF, Copernicus, World Bank, ReliefWeb) alongside local measurements and field reports, harmonises them into a shared schema, and surfaces them through modules for biodiversity, water, hazards, protected areas, earth systems, monitoring, resilience, and SDG tracking.
              </p>
            </div>
          </div>

          </div>
        </div>
      </section>
    </main>
  );
}
