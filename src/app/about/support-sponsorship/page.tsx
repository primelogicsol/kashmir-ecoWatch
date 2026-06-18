'use client';

import React from 'react';
import { 
  Microscope, Database, Shield, Globe2, 
  ArrowRight, Activity, Users, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';

export default function CollaboratePage() {
  const tiers = [
    {
      name: 'Research Partners',
      icon: Microscope,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      shadow: 'hover:shadow-emerald-500/10',
      features: [
        'Universities',
        'Research Institutes',
        'Think Tanks',
        'Scientific Networks'
      ],
      buttonText: 'Become a Research Partner',
      buttonVariant: 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
    },
    {
      name: 'Data Partners',
      icon: Database,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      shadow: 'hover:shadow-sky-500/10',
      features: [
        'Government Departments',
        'Monitoring Agencies',
        'Open Data Providers',
        'Citizen Science Networks'
      ],
      buttonText: 'Share Environmental Data',
      buttonVariant: 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
    },
    {
      name: 'Field Partners',
      icon: Shield,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      shadow: 'hover:shadow-amber-500/10',
      features: [
        'Conservation Groups',
        'Protected Area Authorities',
        'Local Communities',
        'Volunteer Observers'
      ],
      buttonText: 'Join Citizen Science Network',
      buttonVariant: 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
    },
    {
      name: 'Knowledge Partners',
      icon: BookOpen,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      shadow: 'hover:shadow-indigo-500/10',
      features: [
        'Subject Experts',
        'Policy Specialists',
        'Environmental Journalists',
        'Technical Advisors'
      ],
      buttonText: 'Collaborate With KEW',
      buttonVariant: 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-24">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Support</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Kashmir EcoWatch</span>
          </>}
        subtitle="Join the Environmental Intelligence Network"
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl">
          
          {/* Intro Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light mb-8 max-w-4xl mx-auto">
              Kashmir EcoWatch collaborates with researchers, universities, civil society organizations, government agencies, environmental practitioners, citizen scientists, and local communities to advance environmental intelligence, ecological monitoring, and open knowledge across the Western Himalayas.
            </p>
          </motion.div>

          {/* Partnership Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-24">
            {tiers.map((tier, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative glass-panel rounded-3xl border border-white/10 bg-slate-900/40 p-8 flex flex-col h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl ${tier.shadow}`}
              >
                
                <div className="flex flex-col items-start gap-4 mb-8 pb-8 border-b border-white/10">
                  <div className={`p-4 rounded-2xl ${tier.bg}`}>
                    <tier.icon className={`w-8 h-8 ${tier.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{tier.name}</h3>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-current ${tier.color}`} />
                      <span className="text-slate-300 font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${tier.buttonVariant} text-sm font-bold`}>
                  {tier.buttonText}
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 sm:p-14 rounded-3xl border border-white/10 bg-slate-900/40 relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
              <Globe2 className="w-12 h-12 text-emerald-400 opacity-80" />
              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed">
                  Kashmir EcoWatch operates as an independent, non-commercial environmental intelligence initiative dedicated to advancing ecological knowledge, environmental monitoring, and public awareness across the Western Himalayas.
                </p>
                <div className="h-px w-24 bg-white/10 mx-auto" />
                <p className="text-lg text-slate-400 leading-relaxed">
                  The platform does not sell data, subscriptions, or memberships. Collaboration is based on shared scientific, educational, and public-interest goals.
                </p>
              </div>
            </div>
          </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
