'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen, FileText, ArrowRight, Download,
  Book, Scroll, Layers, Map, Shield,
  Leaf, Droplets, Mountain, Users, Search,
  Clock, Database, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Collections ─────────────────────────────────────────────────────── */

const librarySections = [
  {
    id: 'environmental-impact-assessment',
    title: 'Environmental Impact Assessments',
    description:
      'Comprehensive EIAs covering water resources, soil degradation, forest degradation, wetland threats, biodiversity erosion, and socio-economic impact across Jammu & Kashmir.',
    icon: FileText,
    color: 'from-amber-500 to-orange-600',
    route: '/research-library/environmental-impact-assessment',
    documentCount: 1,
    status: 'Live' as const,
    accent: 'text-amber-400',
  },
  {
    id: 'reports',
    title: 'Research Reports',
    description:
      'In-depth research reports, technical documents, and scientific publications on Kashmir ecology, biodiversity, climate change, and environmental monitoring.',
    icon: Book,
    color: 'from-blue-500 to-cyan-600',
    route: '/research-library/reports',
    documentCount: 12,
    status: 'Live' as const,
    accent: 'text-blue-400',
  },
  {
    id: 'species-studies',
    title: 'Species & Biodiversity Studies',
    description:
      'Flora and fauna surveys, species distribution records, conservation assessments, and biodiversity inventories across the Western Himalayan region.',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    route: '/research-library/species-studies',
    documentCount: 0,
    status: 'Coming Soon' as const,
    accent: 'text-emerald-400',
  },
  {
    id: 'hydrological-studies',
    title: 'Hydrological & Water Studies',
    description:
      'River basin assessments, glacier monitoring reports, water quality studies, and hydrological analyses across Kashmir watersheds.',
    icon: Droplets,
    color: 'from-sky-500 to-blue-600',
    route: '/research-library/hydrological-studies',
    documentCount: 0,
    status: 'Coming Soon' as const,
    accent: 'text-sky-400',
  },
  {
    id: 'climate-studies',
    title: 'Climate & Atmospheric Studies',
    description:
      'Climate trend analyses, atmospheric monitoring data, seasonal ecology reports, and long-term environmental change documentation.',
    icon: Map,
    color: 'from-violet-500 to-purple-600',
    route: '/research-library/climate-studies',
    documentCount: 0,
    status: 'Coming Soon' as const,
    accent: 'text-violet-400',
  },
  {
    id: 'policy-documents',
    title: 'Policy & Regulatory Documents',
    description:
      'Environmental legislation, protected area notifications, conservation policy documents, and regulatory frameworks relevant to Jammu & Kashmir.',
    icon: Scroll,
    color: 'from-rose-500 to-red-600',
    route: '/research-library/policy-documents',
    documentCount: 0,
    status: 'Coming Soon' as const,
    accent: 'text-rose-400',
  },
];

/* ─── Research topics ────────────────────────────────────────────────── */

const researchTopics = [
  { icon: Droplets, label: 'Water Resources',    color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
  { icon: Mountain, label: 'Soil Degradation',   color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  { icon: Leaf,     label: 'Forest Ecology',     color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Shield,   label: 'Biodiversity',       color: 'text-purple-400',  bg: 'bg-purple-500/10'  },
  { icon: Map,      label: 'Climate Change',     color: 'text-red-400',     bg: 'bg-red-500/10'     },
  { icon: Users,    label: 'Socio-Economic',     color: 'text-pink-400',    bg: 'bg-pink-500/10'    },
];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function ResearchLibraryPage() {
  const liveCount    = librarySections.filter(s => s.status === 'Live').length;
  const totalDocs    = librarySections.reduce((sum, s) => sum + s.documentCount, 0);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Resources', href: '/open-data' }, { label: 'Research Library' }]}
        label="Scientific Research"
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Research</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Library</span>
        </>}
        subtitle="Environmental impact assessments, research reports, and scientific publications documenting Kashmir's ecological systems and environmental challenges."
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              href="/open-data"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all"
            >
              <Database className="w-4 h-4" />
              Open Data Portal
            </Link>
            <Link
              href="/about/methodology"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:border-white/40 transition-all"
            >
              <Download className="w-4 h-4" />
              Methodology
            </Link>
          </div>
        }
      />

      {/* ── Stats bar ── */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
              {[
                { label: 'Research Documents', value: String(totalDocs), icon: FileText },
                { label: 'Active Collections', value: String(liveCount),  icon: Book    },
                { label: 'Research Topics',    value: '6',                icon: Search  },
                { label: 'Data Sources',       value: '24+',              icon: Layers  },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">{metric.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Collections ── */}
      <div className="container mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Library Collections</h2>
            <p className="text-slate-400 text-sm">Scientific documents, reports, and assessments across six environmental domains</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {librarySections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <Link href={section.route} className="block h-full group">
                  <Card className={`glass border-white/10 p-6 h-full transition-all duration-300 ${
                    section.status === 'Live'
                      ? 'hover:border-white/20 cursor-pointer'
                      : 'opacity-60 cursor-default'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color}`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        variant={section.status === 'Live' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {section.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{section.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">{section.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-slate-500">
                        {section.documentCount > 0
                          ? `${section.documentCount} document${section.documentCount !== 1 ? 's' : ''}`
                          : 'Forthcoming'}
                      </span>
                      {section.status === 'Live' && (
                        <span className={`flex items-center text-sm ${section.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                          Browse <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      )}
                      {section.status === 'Coming Soon' && (
                        <span className="flex items-center gap-1 text-xs text-slate-600">
                          <Clock className="w-3 h-3" /> Coming Soon
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Research Topics ── */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-1">Research Topics</h2>
            <p className="text-sm text-slate-400 mb-6">Key research domains covered across the library collections</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {researchTopics.map((topic) => (
                <div key={topic.label} className={`${topic.bg} rounded-xl p-4 text-center border border-white/5`}>
                  <topic.icon className={`w-6 h-6 ${topic.color} mx-auto mb-2`} />
                  <span className="text-xs text-slate-300">{topic.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Contribute CTA ── */}
      <div className="container mx-auto px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass border-emerald-500/20 bg-emerald-950/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Contribute to the Library</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  Researchers, institutions, and environmental professionals are encouraged to submit reports, studies, and publications for inclusion in the KEW Research Library.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/share-data"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Share a Document
                </Link>
                <Link
                  href="/about/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-white text-sm font-semibold transition-colors"
                >
                  Contact KEW
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
