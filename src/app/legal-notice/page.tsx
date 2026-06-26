'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import {
  ScrollText, Globe, AlertTriangle, Database, Lock,
  FileText, Shield, ExternalLink, Server, ChevronRight,
  ArrowRight, Mail, Clock, RefreshCw, MapPin, Layers,
  CheckCircle, Info, Eye, Ban
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Document metadata ───────────────────────────────────────────────────
   Update NOTICE_LAST_UPDATED whenever this document is revised.
   NOTICE_PUBLISHED is fixed — it records the original publication date.
   ─────────────────────────────────────────────────────────────────────── */
const NOTICE_PUBLISHED    = 'June 2026';
const NOTICE_LAST_UPDATED = 'June 26, 2026';
const NOTICE_VERSION      = '1.0';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'overview',      label: 'Overview' },
  { id: 'about',         label: 'About KEW' },
  { id: 'geographic',    label: 'Geographic Notice' },
  { id: 'disclaimer',    label: 'Environmental Info Disclaimer' },
  { id: 'sources',       label: 'Data Sources' },
  { id: 'accuracy',      label: 'Accuracy of Information' },
  { id: 'observations',  label: 'Observation Submissions' },
  { id: 'sensitive',     label: 'Sensitive Environmental Info' },
  { id: 'ip',            label: 'Intellectual Property' },
  { id: 'external',      label: 'External Links' },
  { id: 'availability',  label: 'Platform Availability' },
  { id: 'liability',     label: 'Limitation of Liability' },
  { id: 'open-data',     label: 'Open Data & Attribution' },
  { id: 'changes',       label: 'Changes to This Notice' },
  { id: 'contact',       label: 'Contact' },
];

/* ─── Active section tracker ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const els = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -75% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── Section wrapper ─────────────────────────────────────────────────── */

function Section({
  id, icon: Icon, title,
  accent = 'text-emerald-400',
  bg     = 'bg-emerald-500/10',
  children,
}: {
  id: string; icon: React.ElementType; title: string;
  accent?: string; bg?: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* ─── Bullet list ─────────────────────────────────────────────────────── */

function Bullets({ items, accent = 'bg-emerald-400' }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-1.5 mt-1">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
          <span className={`w-1.5 h-1.5 rounded-full ${accent} flex-shrink-0 mt-[7px]`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Sidebar panels ─────────────────────────────────────────────────── */

function TableOfContents({ active }: { active: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-2 mb-1"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contents</h3>
        </div>
        <RefreshCw className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav className="space-y-0.5 mt-3 max-h-[55vh] overflow-y-auto pr-1">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-lg transition-all ${
                active === s.id
                  ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronRight className={`w-2.5 h-2.5 flex-shrink-0 transition-colors ${active === s.id ? 'text-emerald-400' : 'text-slate-600'}`} />
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

function DocMeta() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Notice Details</h3>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Published',    value: NOTICE_PUBLISHED },
          { label: 'Last Updated', value: NOTICE_LAST_UPDATED },
          { label: 'Version',      value: NOTICE_VERSION },
          { label: 'Jurisdiction', value: 'J&K, India' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-start gap-3">
            <span className="text-[10px] text-slate-500 flex-shrink-0">{label}</span>
            <span className="text-[10px] text-slate-300 text-right leading-tight">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-white/5">
        <p className="text-[9px] text-slate-600 leading-relaxed">
          <span className="text-slate-500">Published</span> is fixed at the original date.{' '}
          <span className="text-slate-500">Last Updated</span> is revised on each notice change.
        </p>
      </div>
    </div>
  );
}

function KeyDisclaimers() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Key Disclaimers</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Environmental data is for research & education, not emergency response',
          'Geographic references carry no political or sovereignty implications',
          'Some information may be provisional or subject to revision',
          'KEW does not guarantee uninterrupted platform availability',
          'Third-party content is not under KEW\'s control or warranty',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
            <Info className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedLinks() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Related</h3>
      </div>
      <ul className="space-y-2">
        {[
          { label: 'Privacy Policy',          href: '/privacy' },
          { label: 'Terms of Use',            href: '/terms' },
          { label: 'Accessibility Statement', href: '/accessibility' },
          { label: 'Open Data Portal',        href: '/open-data' },
          { label: 'Geographic Scope',        href: '/geographic-scope' },
          { label: 'Contact KEW',             href: '/about/contact' },
        ].map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
            >
              <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function LegalNoticePage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Legal', href: '/legal-notice' }, { label: 'Legal Notice' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Legal</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Notice</span>
        </>}
        subtitle="This Legal Notice governs the use of the Kashmir EcoWatch website, environmental intelligence platform, digital services, datasets, publications, maps, dashboards, and related resources."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        label="Legal"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Notice body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-intense border-white/10 p-7 sm:p-10 space-y-10">

                  {/* ── Overview ── */}
                  <div id="overview" className="scroll-mt-28">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <ScrollText className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h2 className="text-base font-bold text-white">Overview</h2>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
                        <span>Published: <span className="text-slate-400">{NOTICE_PUBLISHED}</span></span>
                        <span>·</span>
                        <span>Last Updated: <span className="text-slate-400">{NOTICE_LAST_UPDATED}</span></span>
                      </div>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        This Legal Notice governs the use of the Kashmir EcoWatch (KEW) website, environmental intelligence platform, digital services, datasets, publications, maps, dashboards, and related resources.
                      </p>
                      <p>
                        By accessing or using Kashmir EcoWatch, you acknowledge this Legal Notice and agree to use the platform responsibly and in accordance with applicable laws.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* ── About KEW ── */}
                  <Section id="about" icon={Globe} title="About Kashmir EcoWatch">
                    <p>
                      Kashmir EcoWatch is an independent environmental intelligence and monitoring initiative dedicated to advancing environmental research, biodiversity conservation, ecosystem monitoring, climate resilience, hazard intelligence, and evidence-based environmental awareness across the Western Himalayan region.
                    </p>
                    <p>
                      KEW operates as an educational, scientific, and environmental information platform.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Geographic Notice ── */}
                  <Section id="geographic" icon={MapPin} title="Geographic Notice" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-5 space-y-3">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Kashmir EcoWatch monitors environmental systems across the Western Himalayan region, including areas administered by different authorities.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Geographic names, maps, regional classifications, environmental boundaries, and administrative references are provided solely for scientific, environmental, research, educational, and operational purposes.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Nothing on this platform should be interpreted as expressing any opinion regarding sovereignty, international boundaries, territorial status, political claims, or diplomatic positions.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Maps and geographic representations are intended exclusively to support environmental monitoring, ecological analysis, and scientific understanding.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Environmental Info Disclaimer ── */}
                  <Section id="disclaimer" icon={AlertTriangle} title="Environmental Information Disclaimer" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>Environmental information published by KEW is intended for:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Scientific research',
                        'Environmental education',
                        'Conservation planning',
                        'Public awareness',
                        'Environmental monitoring',
                        'Policy support',
                        'Academic study',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-3 py-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4 mt-4">
                      <p className="text-xs font-semibold text-amber-400 mb-2">This information should NOT be relied upon as the sole basis for:</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          'Emergency response',
                          'Engineering decisions',
                          'Navigation',
                          'Legal determinations',
                          'Regulatory compliance',
                          'Operational decision-making',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="text-amber-500 font-bold">✕</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Users should consult the appropriate authorities where official information is required.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Data Sources ── */}
                  <Section id="sources" icon={Database} title="Data Sources" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>KEW integrates information from a variety of sources, which may include:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        { icon: '🛰️', label: 'Satellite observations' },
                        { icon: '📡', label: 'Environmental monitoring systems' },
                        { icon: '🏛️', label: 'Government agencies' },
                        { icon: '📚', label: 'Scientific publications' },
                        { icon: '🌐', label: 'International organizations' },
                        { icon: '📂', label: 'Open environmental datasets' },
                        { icon: '👁️', label: 'Community observations' },
                        { icon: '🔬', label: 'Research institutions' },
                        { icon: '🗺️', label: 'Field surveys' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
                          <span className="text-sm flex-shrink-0">{icon}</span>
                          <span className="text-[10px] text-slate-300">{label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      Individual datasets remain subject to their respective licensing terms, attribution requirements, and update schedules.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Accuracy ── */}
                  <Section id="accuracy" icon={Eye} title="Accuracy of Information" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      Reasonable efforts are made to ensure that information published on KEW is accurate, current, and scientifically credible. However:
                    </p>
                    <div className="space-y-2 mt-2">
                      {[
                        'Environmental conditions change continuously.',
                        'Data availability varies between regions.',
                        'Some datasets may contain uncertainties.',
                        'Certain information may be provisional or under review.',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-2 text-sm text-slate-300 rounded-xl bg-violet-950/20 border border-violet-500/10 px-4 py-2.5">
                          <Info className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3">
                      Accordingly, KEW does not guarantee that all information is complete, current, or free from errors at all times.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Observation Submissions ── */}
                  <Section id="observations" icon={CheckCircle} title="Observation Submissions" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>
                      Environmental observations submitted by users may undergo review, validation, classification, and quality assessment before publication. KEW reserves the right to:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Review submissions',
                        'Edit metadata',
                        'Classify observations',
                        'Decline publication',
                        'Remove inappropriate content',
                        'Remove inaccurate content',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-white/5 border border-white/5 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      This helps maintain scientific integrity and data quality across the platform.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Sensitive Environmental Info ── */}
                  <Section id="sensitive" icon={Shield} title="Protection of Sensitive Environmental Information" accent="text-red-400" bg="bg-red-500/10">
                    <p>
                      To support conservation objectives, KEW may intentionally limit, generalise, or withhold precise geographic information relating to:
                    </p>
                    <Bullets
                      accent="bg-red-400"
                      items={[
                        'Endangered species',
                        'Rare wildlife',
                        'Sensitive habitats',
                        'Nesting sites',
                        'Ecologically vulnerable locations',
                      ]}
                    />
                    <div className="rounded-xl bg-red-950/20 border border-red-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Such measures are intended to reduce the risk of disturbance or exploitation of vulnerable ecosystems and species.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── IP ── */}
                  <Section id="ip" icon={Lock} title="Intellectual Property" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>
                      Unless otherwise stated, the original content published by Kashmir EcoWatch — including text, graphics, visualisations, reports, dashboards, website design, and documentation — is protected by applicable intellectual property laws.
                    </p>
                    <p>
                      Third-party datasets, imagery, maps, publications, and environmental resources remain the property of their respective owners and are used in accordance with their applicable licences and attribution requirements.
                    </p>
                    <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4 mt-2">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Unauthorised reproduction, extraction, redistribution, reverse engineering, imitation, or commercial exploitation of KEW content is prohibited without prior written authorisation.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── External Links ── */}
                  <Section id="external" icon={ExternalLink} title="External Links" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      KEW may provide links to third-party websites, datasets, publications, or environmental resources for informational purposes.
                    </p>
                    <p>
                      Kashmir EcoWatch is not responsible for the availability, content, accuracy, privacy practices, or policies of external websites. External links do not constitute endorsement.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Platform Availability ── */}
                  <Section id="availability" icon={Server} title="Platform Availability" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>
                      KEW may periodically update, modify, suspend, or discontinue features, datasets, dashboards, or services to improve platform quality, security, or performance.
                    </p>
                    <p>
                      Reasonable efforts are made to maintain service availability, but uninterrupted access cannot be guaranteed.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Limitation of Liability ── */}
                  <Section id="liability" icon={Ban} title="Limitation of Liability" accent="text-red-400" bg="bg-red-500/10">
                    <div className="rounded-xl bg-red-950/20 border border-red-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed mb-3">
                        To the fullest extent permitted by applicable law, Kashmir EcoWatch, its contributors, collaborators, and affiliated organisations shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Use of the platform',
                          'Reliance on published information',
                          'Temporary service interruptions',
                          'Data inaccuracies',
                          'Third-party content',
                          'External services',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3">
                      Users remain responsible for exercising independent judgement when using environmental information.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Open Data ── */}
                  <Section id="open-data" icon={Layers} title="Open Data & Attribution" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-4">
                        <div className="text-xs font-bold text-emerald-400 mb-2">Open Data</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Where KEW publishes datasets designated as open data, users must comply with the applicable licensing conditions and provide appropriate attribution where required.
                        </p>
                      </div>
                      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4">
                        <div className="text-xs font-bold text-amber-400 mb-2">Restricted Data</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Some datasets displayed on the platform may remain subject to third-party licensing restrictions and may not be redistributed without authorisation.
                        </p>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Changes ── */}
                  <Section id="changes" icon={RefreshCw} title="Changes to This Notice" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      This Legal Notice may be revised periodically to reflect legal, scientific, operational, or organisational developments. The latest published version will always supersede previous versions.
                    </p>
                    <p>
                      Continued use of the platform after updates constitutes acceptance of the revised Legal Notice.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-slate-500 mb-0.5">Published</div>
                          <div className="text-white font-semibold">{NOTICE_PUBLISHED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Fixed — original document date</div>
                        </div>
                        <div>
                          <div className="text-slate-500 mb-0.5">Last Updated</div>
                          <div className="text-white font-semibold">{NOTICE_LAST_UPDATED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Revised on each notice change</div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Contact ── */}
                  <Section id="contact" icon={Mail} title="Contact" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      Questions regarding this Legal Notice may be submitted through the official Kashmir EcoWatch contact channels available on this website.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <Link href="/about/contact" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Contact Kashmir EcoWatch</div>
                          <div className="text-xs text-slate-400">Submit a legal enquiry or notice question</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </Link>
                    </div>
                  </Section>

                </Card>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {[
                  <TableOfContents key="toc"         active={active} />,
                  <DocMeta         key="meta" />,
                  <KeyDisclaimers  key="disclaimers" />,
                  <RelatedLinks    key="links" />,
                ].map((panel, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.06 }}
                  >
                    {panel}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
