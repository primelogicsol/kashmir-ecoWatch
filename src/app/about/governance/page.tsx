'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Droplets, Quote, LeafyGreen, Scaling } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GovernancePage() {
  const tableData = [
    {
      dimension: 'Format',
      rio: '362 pages of negotiated texts across 3 principal agreements',
      alamdar: 'Single sentence: "Ann poshi teli yeli wan poshi"'
    },
    {
      dimension: 'Audience',
      rio: '172 governments, 108 heads of state, 17,000+ attendees',
      alamdar: 'The people of Kashmir — oral tradition, lived practice'
    },
    {
      dimension: 'Core Framework',
      rio: '27 principles, 40-chapter Agenda 21, UNFCCC, CBD',
      alamdar: 'Ecology-food survival dependency: if forests die, food dies'
    },
    {
      dimension: 'Mechanism',
      rio: 'International conventions, national action plans, periodic review',
      alamdar: 'Moral ecology embedded in spiritual practice and daily life'
    },
    {
      dimension: 'Language',
      rio: 'Technical: emissions targets, ecological indicators, carbon accounting',
      alamdar: 'Civilizational: human nourishment depends on ecological balance'
    },
    {
      dimension: 'Timeline',
      rio: '1992 -> 2012 (Rio+20) -> ongoing negotiations',
      alamdar: 'Late 14th century — sustained for 600+ years in Kashmiri culture'
    },
    {
      dimension: 'Outcome',
      rio: 'Policy frameworks requiring implementation, compliance monitoring',
      alamdar: 'Lived sustainability — the bond between people, forests, springs, and soil'
    }
  ];

  const philosophies = [
    {
      icon: LeafyGreen,
      title: 'Biodiversity',
      subtitle: 'Protect ecosystems',
      desc: 'Preserving the rich biodiversity of the Kashmir Himalayas through awareness and community participation.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: Droplets,
      title: 'Water Wisdom',
      subtitle: 'Nurture rivers & springs',
      desc: 'Honouring the Jhelum, springs, and wetlands as living systems that sustain all life.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Scaling,
      title: 'Harmony',
      subtitle: 'Balance with nature',
      desc: 'Living in rhythm with natural cycles rather than imposing human will upon the land.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      {/* HERO SECTION */}
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Governance — Alamdar-e-Kashmir</span>
          </>}
        subtitle="Sufi Saint & Environmental Visionary"
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none mb-16"
          >
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light mb-12">
              The moral ecology of Kashmir long before modern sustainability language existed.
            </p>
            
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 mb-16 text-center relative overflow-hidden">
              <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-500/10" />
              <h2 className="text-3xl sm:text-5xl font-black text-emerald-400 mb-6 italic tracking-tight">
                "Ann poshi teli yeli wan poshi"
              </h2>
              <p className="text-xl sm:text-2xl text-white font-medium">
                Food will thrive only till the woods survive.
              </p>
            </div>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-6">World’s Sustainable Developer & Saint</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Kashmir did not wait for Rio to understand sustainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-xl font-bold text-sky-400">1992 Rio Earth Summit</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  172 governments, 108 heads of state, 2,400 NGO representatives, and 17,000 scientists. It produced a 27-principle Rio Declaration, Agenda 21, the Forest Principles, and opened the UNFCCC and CBD for signature — roughly 362 pages of text.
                </p>
                <h3 className="text-xl font-bold text-sky-400 pt-4">2012 Rio+20</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  188 countries, 12,000 diplomats, and total attendance reported at roughly 45,000 to 50,000 people.
                </p>
              </div>
              
              <div className="glass-panel p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-6 flex flex-col justify-center">
                <p className="text-lg text-slate-200 leading-relaxed">
                  All of that matters.
                </p>
                <p className="text-lg text-slate-200 leading-relaxed">
                  But centuries before declarations, frameworks, reports, graphs, carbon accounting, and policy language, a man in landlocked Kashmir had already said what the world is still trying to explain.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 space-y-8">
              <div>
                <p className="text-lg text-slate-300 leading-relaxed">That is not a slogan.</p>
                <p className="text-lg text-slate-300 leading-relaxed">That is not a campaign line.</p>
                <p className="text-lg text-slate-300 leading-relaxed">That is not borrowed environmental vocabulary.</p>
                <p className="text-2xl font-bold text-white mt-4">That is civilisational clarity.</p>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed">
                Sheikh ul-Alam, also known as Nund Rishi, is widely placed in the late 14th to early 15th century — centuries before Rio, Kashmir had already produced a moral ecology deeper than modern sustainability language.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">Technical Comparison — Two Approaches to Sustainability</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-white/10 text-sm font-bold text-slate-300 uppercase tracking-wider bg-slate-900/50">Dimension</th>
                    <th className="p-4 border-b border-white/10 text-sm font-bold text-sky-400 uppercase tracking-wider bg-slate-900/50">Rio Earth Summit (1992)</th>
                    <th className="p-4 border-b border-white/10 text-sm font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">Alamdar-e-Kashmir (14th-15th C.)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-300 divide-y divide-white/5">
                  {tableData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-semibold text-white bg-slate-900/20">{row.dimension}</td>
                      <td className="p-4">{row.rio}</td>
                      <td className="p-4 text-emerald-100/80">{row.alamdar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-20">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 space-y-6">
              <p className="text-xl text-slate-300">Let the scientists deliberate.</p>
              <p className="text-xl text-slate-300">Let the institutions negotiate.</p>
              <p className="text-xl text-slate-300">Let the conferences draft declarations.</p>
              <p className="text-xl text-emerald-400 font-medium pt-4">Kashmir had already heard the essence of it from Alamdar.</p>
              
              <p className="text-lg text-slate-400 leading-relaxed pt-4">
                He was not speaking in the vocabulary of emissions targets or ecological indicators.<br />
                He was speaking in the vocabulary of truth.
              </p>
              
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 mt-6">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">The Undefeated Truth</p>
                <p className="text-2xl font-bold text-white">Human nourishment depends on ecological balance.</p>
              </div>

              <p className="text-lg text-slate-400 leading-relaxed pt-4">
                This is why Sheikh ul-Alam should be remembered not only as a spiritual giant, but as one of the earliest and clearest moral voices of environmental consciousness in Kashmir.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-6">The Flag Bearer of Kashmir</h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Alamdar-e-Kashmir, a visionary and trailblazer, left an indelible mark on the landscape of environmental sustainability across the Kashmir Himalayas. His unwavering commitment to preserving the planet resonates through time, inspiring generations to tread lightly upon the Earth.
              </p>
              <p>
                In the verdant valleys of Kashmir, Alamdar championed holistic practices that harmonised with nature. His wisdom flowed like the Jhelum River, nurturing not only the soil but also the consciousness of those who listened.
              </p>
              <p>
                From the snow-capped peaks of the Himalayas to the saffron fields of Pampore, he wove a tapestry of ecological balance — a delicate dance between humans and their surroundings.
              </p>
              <p>
                Alamdar-e-Kashmir understood that sustainability wasn’t a buzzword; it was a way of life. He planted seeds of awareness, urging communities to protect biodiversity and safeguard fragile ecosystems.
              </p>
              <p className="text-emerald-400 font-medium">
                His legacy, like the whispering winds through pine forests, urges us to tread gently upon the Earth, nurturing its fragile balance.
              </p>
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-4">Core Philosophy</h2>
              <p className="text-xl text-emerald-400 font-medium italic">"Sustainability is not sacrifice; it’s symbiosis"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {philosophies.map((phil, i) => (
                <div key={i} className={`glass-panel p-8 rounded-2xl border ${phil.bg} flex flex-col items-center text-center`}>
                  <phil.icon className={`w-12 h-12 ${phil.color} mb-6`} />
                  <h3 className="text-xl font-bold text-white mb-2">{phil.title}</h3>
                  <h4 className={`text-sm font-semibold uppercase tracking-wider ${phil.color} mb-4`}>{phil.subtitle}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{phil.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center">
              <p className="text-lg text-slate-300 leading-relaxed">
                Today, as we reflect on Alamdar’s enduring legacy, we are reminded of the profound impact that one individual can have on the world. His pioneering spirit, unwavering dedication, and timeless wisdom serve as an inspiration to us all, urging us to honour and preserve the precious gift of nature for generations to come.
              </p>
            </div>
          </div>

          </div>
        </div>
      </section>
    </main>
  );
}
