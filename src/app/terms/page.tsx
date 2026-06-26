'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import {
  ScrollText, CheckCircle, Shield, Globe, Database,
  Users, AlertTriangle, FileText, Lock, Server,
  ChevronRight, ArrowRight, Mail, Clock, RefreshCw,
  MapPin, Layers, Eye, Handshake, Ban, Info,
  Lightbulb, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Document metadata ───────────────────────────────────────────────────
   Update TERMS_LAST_UPDATED whenever this document is revised.
   TERMS_PUBLISHED is fixed — it records the original publication date.
   ─────────────────────────────────────────────────────────────────────── */
const TERMS_PUBLISHED    = 'June 2026';
const TERMS_LAST_UPDATED = 'June 26, 2026';
const TERMS_VERSION      = '1.0';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'acceptance',     label: 'Acceptance of Terms' },
  { id: 'about',          label: 'About KEW' },
  { id: 'permitted',      label: 'Permitted Use' },
  { id: 'responsibilities', label: 'User Responsibilities' },
  { id: 'observations',   label: 'Observation Submissions' },
  { id: 'community',      label: 'Community Standards' },
  { id: 'scientific',     label: 'Scientific Integrity' },
  { id: 'ip',             label: 'Intellectual Property' },
  { id: 'data-use',       label: 'Data Use' },
  { id: 'external',       label: 'External Resources' },
  { id: 'availability',   label: 'Platform Availability' },
  { id: 'disclaimer',     label: 'Disclaimer' },
  { id: 'liability',      label: 'Limitation of Liability' },
  { id: 'geographic',     label: 'Geographic Neutrality' },
  { id: 'changes',        label: 'Changes to These Terms' },
  { id: 'contact',        label: 'Contact' },
];

/* ─── Active section tracker ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState('acceptance');
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
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Document Details</h3>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Published',    value: TERMS_PUBLISHED },
          { label: 'Last Updated', value: TERMS_LAST_UPDATED },
          { label: 'Version',      value: TERMS_VERSION },
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
          <span className="text-slate-500">Last Updated</span> is revised on each policy change.
        </p>
      </div>
    </div>
  );
}

function KeyRules() {
  const rules = [
    { icon: '✅', text: 'Submit genuine observations' },
    { icon: '✅', text: 'Use accurate information' },
    { icon: '✅', text: 'Respect intellectual property' },
    { icon: '❌', text: 'No false or manipulated data' },
    { icon: '❌', text: 'No unauthorized system access' },
    { icon: '❌', text: 'No commercial exploitation' },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Key Rules</h3>
      </div>
      <div className="space-y-2">
        {rules.map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="text-sm flex-shrink-0">{icon}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

function DisclaimerPanel() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">Important Notice</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">
        KEW is for research, education, and conservation. It should <strong className="text-white">not</strong> be relied upon as the sole basis for emergency response, legal decisions, or regulatory compliance.
      </p>
      <p className="text-xs text-slate-400 leading-relaxed mt-2">
        In emergencies, always defer to official state disaster management authorities.
      </p>
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
          { label: 'Legal Notice',            href: '/legal-notice' },
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

export default function TermsOfUsePage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Legal', href: '/legal-notice' }, { label: 'Terms of Use' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Terms</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">of Use</span>
        </>}
        subtitle="These Terms govern access to and use of the Kashmir EcoWatch website, environmental intelligence platform, datasets, dashboards, maps, publications, and related services."
        icon={<ScrollText className="w-6 h-6 text-emerald-400" />}
        label="Legal"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Terms body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-intense border-white/10 p-7 sm:p-10 space-y-10">

                  {/* ── Acceptance ── */}
                  <div id="acceptance" className="scroll-mt-28">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h2 className="text-base font-bold text-white">Acceptance of Terms</h2>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
                        <span>Published: <span className="text-slate-400">{TERMS_PUBLISHED}</span></span>
                        <span>·</span>
                        <span>Last Updated: <span className="text-slate-400">{TERMS_LAST_UPDATED}</span></span>
                      </div>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        Welcome to Kashmir EcoWatch (KEW). These Terms of Use govern access to and use of the Kashmir EcoWatch website, environmental intelligence platform, datasets, dashboards, maps, publications, and related services.
                      </p>
                      <p>
                        By accessing or using KEW, you acknowledge that you have read, understood, and agreed to these Terms of Use. If you do not agree with these terms, please discontinue use of the platform.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* ── About KEW ── */}
                  <Section id="about" icon={Globe} title="About Kashmir EcoWatch">
                    <p>
                      Kashmir EcoWatch is an independent environmental intelligence and monitoring initiative dedicated to supporting environmental research, biodiversity conservation, ecosystem monitoring, climate resilience, hazard intelligence, and evidence-based environmental awareness across the Western Himalayan region.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Permitted Use ── */}
                  <Section id="permitted" icon={CheckCircle} title="Permitted Use" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>You may use KEW to:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        'Explore environmental information',
                        'Access environmental dashboards',
                        'View maps and regional profiles',
                        'Submit environmental observations',
                        'Read research publications',
                        'Download publicly available datasets where permitted',
                        'Support research, education, conservation, and public awareness',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Use of the platform must always comply with applicable laws and these Terms.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── User Responsibilities ── */}
                  <Section id="responsibilities" icon={Users} title="User Responsibilities" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>Users agree to:</p>
                    <Bullets
                      accent="bg-blue-400"
                      items={[
                        'Provide accurate information where requested.',
                        'Submit genuine environmental observations.',
                        'Respect intellectual property rights.',
                        'Avoid misuse of the platform.',
                        'Protect account credentials where applicable.',
                        'Use KEW responsibly and ethically.',
                      ]}
                    />
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Observation Submissions ── */}
                  <Section id="observations" icon={Eye} title="Observation Submissions" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>Users submitting observations agree that:</p>
                    <Bullets
                      accent="bg-teal-400"
                      items={[
                        'Observations should represent actual field observations or documented environmental information.',
                        'Uploaded photographs and supporting materials should accurately represent the reported observation.',
                        'Users should not knowingly submit false, misleading, fabricated, or manipulated environmental information.',
                      ]}
                    />
                    <div className="rounded-xl bg-teal-950/30 border border-teal-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        KEW reserves the right to review, edit, classify, defer, or reject submissions that do not meet scientific, ethical, or quality standards.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Community Standards ── */}
                  <Section id="community" icon={Ban} title="Community Standards" accent="text-red-400" bg="bg-red-500/10">
                    <p>Users must not:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        'Upload unlawful content',
                        'Submit fraudulent observations',
                        'Harass or impersonate others',
                        'Upload malicious software',
                        'Attempt unauthorized access',
                        'Interfere with platform operation',
                        'Use automated systems to overload the platform without authorization',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-2 text-xs text-slate-300 rounded-lg bg-red-950/20 border border-red-500/10 px-3 py-2">
                          <span className="text-red-400 flex-shrink-0 font-bold">✕</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Scientific Integrity ── */}
                  <Section id="scientific" icon={Activity} title="Scientific Integrity" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      KEW is committed to maintaining scientific credibility. Environmental information presented on the platform may include observational data, satellite-derived products, scientific datasets, community contributions, and expert-reviewed information.
                    </p>
                    <div className="rounded-xl bg-violet-950/30 border border-violet-500/20 p-4 mt-2">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Users should recognise that environmental conditions change over time and some information may be provisional or subject to revision as new data becomes available.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── IP ── */}
                  <Section id="ip" icon={Lock} title="Intellectual Property" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>
                      Unless otherwise stated, the original content published by Kashmir EcoWatch — including text, graphics, visualisations, reports, dashboards, and website design — is protected by applicable intellectual property laws.
                    </p>
                    <p>
                      Third-party datasets, imagery, maps, and environmental resources remain subject to their respective licences and attribution requirements.
                    </p>
                    <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4 mt-2">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Unauthorised reproduction, extraction, redistribution, reverse engineering, imitation, or commercial exploitation of KEW content is prohibited without prior written authorisation.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Data Use ── */}
                  <Section id="data-use" icon={Database} title="Data Use" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                      <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-4">
                        <div className="text-xs font-bold text-emerald-400 mb-2">Open Data</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Where datasets are designated as open data, users may access and use them in accordance with the applicable licence and attribution requirements.
                        </p>
                      </div>
                      <div className="rounded-xl bg-red-950/20 border border-red-500/20 p-4">
                        <div className="text-xs font-bold text-red-400 mb-2">Restricted Data</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Restricted datasets may not be redistributed without appropriate authorisation from the KEW data governance team.
                        </p>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── External Resources ── */}
                  <Section id="external" icon={Layers} title="External Resources" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>
                      KEW may reference or integrate information from external organisations, research institutions, mapping services, satellite providers, and environmental databases.
                    </p>
                    <p>
                      KEW is not responsible for the availability, accuracy, or content of third-party resources. External links do not constitute endorsement of the linked content.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Platform Availability ── */}
                  <Section id="availability" icon={Server} title="Platform Availability" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      Reasonable efforts are made to maintain continuous platform availability. However, KEW does not guarantee uninterrupted operation and reserves the right to:
                    </p>
                    <Bullets
                      accent="bg-slate-400"
                      items={[
                        'Perform maintenance',
                        'Update services',
                        'Modify datasets',
                        'Improve platform functionality',
                        'Suspend services when necessary',
                      ]}
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      Such actions may occur without prior notice.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Disclaimer ── */}
                  <Section id="disclaimer" icon={Info} title="Disclaimer" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Environmental information provided by KEW is intended for research, educational, conservation, planning, and informational purposes.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mt-3">
                        The platform should <strong className="text-white">not</strong> be relied upon as the sole basis for emergency response, navigation, engineering decisions, legal determinations, or regulatory compliance.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mt-3">
                        Users should consult the appropriate authorities where official information is required.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Limitation of Liability ── */}
                  <Section id="liability" icon={Shield} title="Limitation of Liability" accent="text-red-400" bg="bg-red-500/10">
                    <div className="rounded-xl bg-red-950/20 border border-red-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        To the maximum extent permitted by applicable law, Kashmir EcoWatch shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of the platform or reliance on its information.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Geographic Neutrality ── */}
                  <Section id="geographic" icon={MapPin} title="Geographic Neutrality" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Kashmir EcoWatch is an independent environmental intelligence initiative. Geographic names, maps, regional classifications, and administrative references are used solely for scientific, environmental, operational, and research purposes and do not express any position regarding sovereignty, international boundaries, territorial status, or political claims.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Changes ── */}
                  <Section id="changes" icon={RefreshCw} title="Changes to These Terms" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      These Terms of Use may be revised periodically to reflect legal, operational, scientific, or technical developments. The most recent version will be published on this page.
                    </p>
                    <p>
                      Continued use of KEW after updates constitutes acceptance of the revised Terms.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-slate-500 mb-0.5">Published</div>
                          <div className="text-white font-semibold">{TERMS_PUBLISHED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Fixed — original document date</div>
                        </div>
                        <div>
                          <div className="text-slate-500 mb-0.5">Last Updated</div>
                          <div className="text-white font-semibold">{TERMS_LAST_UPDATED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Revised on each document change</div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Contact ── */}
                  <Section id="contact" icon={Mail} title="Contact" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      Questions regarding these Terms of Use may be submitted through the official Kashmir EcoWatch contact channels provided on this website.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <Link href="/about/contact" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Contact Kashmir EcoWatch</div>
                          <div className="text-xs text-slate-400">Submit a terms enquiry or legal question</div>
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
                  <TableOfContents key="toc"       active={active} />,
                  <DocMeta         key="meta" />,
                  <KeyRules        key="rules" />,
                  <DisclaimerPanel key="disclaimer" />,
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
