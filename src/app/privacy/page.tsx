'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import {
  Shield, Lock, Eye, Database, Globe, FileText,
  Users, AlertTriangle, Mail, ChevronRight, CheckCircle,
  Server, Layers, MapPin, Clock, ArrowRight, Baby,
  RefreshCw, ScrollText, Handshake
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Policy metadata ────────────────────────────────────────────────────
   Update POLICY_LAST_UPDATED whenever this document is revised.
   POLICY_PUBLISHED should never change — it records the original date.
   ─────────────────────────────────────────────────────────────────────── */
const POLICY_PUBLISHED   = 'June 2026';
const POLICY_LAST_UPDATED = 'June 26, 2026';
const POLICY_VERSION     = '1.0';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'overview',      label: 'Overview' },
  { id: 'about',         label: 'About KEW' },
  { id: 'collected',     label: 'Information We Collect' },
  { id: 'observations',  label: 'Environmental Observations' },
  { id: 'automatic',     label: 'Automatically Collected' },
  { id: 'cookies',       label: 'Cookies' },
  { id: 'how-used',      label: 'How Information Is Used' },
  { id: 'review',        label: 'Observation Review' },
  { id: 'sensitive',     label: 'Sensitive Environmental Info' },
  { id: 'sharing',       label: 'Data Sharing' },
  { id: 'security',      label: 'Data Security' },
  { id: 'retention',     label: 'Data Retention' },
  { id: 'third-party',   label: 'Third-Party Services' },
  { id: 'children',      label: "Children's Privacy" },
  { id: 'international', label: 'International Users' },
  { id: 'rights',        label: 'Your Rights' },
  { id: 'updates',       label: 'Policy Updates' },
  { id: 'geographic',    label: 'Geographic Notice' },
  { id: 'acceptance',    label: 'Acceptance' },
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
  id, icon: Icon, title, accent = 'text-emerald-400', bg = 'bg-emerald-500/10', children,
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

/* ─── Bullet list helper ─────────────────────────────────────────────── */

function Bullets({ items, accent = 'bg-emerald-400' }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-1.5 mt-1">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
          <span className={`w-1.5 h-1.5 rounded-full ${accent} flex-shrink-0 mt-2`} />
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
        <RefreshCw className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav className="space-y-0.5 mt-3 max-h-[60vh] overflow-y-auto pr-1">
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
              <ChevronRight className={`w-2.5 h-2.5 flex-shrink-0 transition-all ${active === s.id ? 'text-emerald-400' : 'text-slate-600'}`} />
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

function PolicyMeta() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Policy Details</h3>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Published',      value: POLICY_PUBLISHED },
          { label: 'Last Updated',   value: POLICY_LAST_UPDATED },
          { label: 'Version',        value: POLICY_VERSION },
          { label: 'Jurisdiction',   value: 'J&K, India (GDPR-aligned)' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-start gap-3">
            <span className="text-[10px] text-slate-500 flex-shrink-0">{label}</span>
            <span className="text-[10px] text-slate-300 text-right leading-tight">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-white/5">
        <p className="text-[9px] text-slate-600 leading-relaxed">
          <span className="text-slate-500">Published</span> date is fixed at the original document date.{' '}
          <span className="text-slate-500">Last Updated</span> is revised manually whenever this policy changes.
        </p>
      </div>
    </div>
  );
}

function YourRightsSidebar() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Your Rights</h3>
      </div>
      <ul className="space-y-2">
        {[
          'Access your personal information',
          'Correct inaccurate records',
          'Request deletion where appropriate',
          'Withdraw consent at any time',
          'Contact KEW regarding privacy concerns',
        ].map(r => (
          <li key={r} className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
            {r}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-white/10">
        <a
          href="mailto:contact@kashmir-ecowatch.com"
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" /> Contact KEW
        </a>
      </div>
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
          { label: 'Terms of Use',            href: '/terms' },
          { label: 'Legal Notice',            href: '/legal-notice' },
          { label: 'Accessibility Statement', href: '/accessibility' },
          { label: 'Geographic Scope',        href: '/geographic-scope' },
          { label: 'Open Data Portal',        href: '/open-data' },
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

export default function PrivacyPolicyPage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Legal', href: '/legal-notice' }, { label: 'Privacy Policy' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Privacy</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Policy</span>
        </>}
        subtitle="Kashmir EcoWatch is committed to protecting your privacy and handling personal information responsibly."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        label="Legal"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Policy body (70%) ── */}
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
                        <span>Published: <span className="text-slate-400">{POLICY_PUBLISHED}</span></span>
                        <span>·</span>
                        <span>Last Updated: <span className="text-slate-400">{POLICY_LAST_UPDATED}</span></span>
                      </div>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        Kashmir EcoWatch (KEW) is committed to protecting your privacy and handling personal information responsibly. This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you when using our website, environmental intelligence platform, and related services.
                      </p>
                      <p>
                        By using Kashmir EcoWatch, you agree to the practices described in this Privacy Policy.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* ── About KEW ── */}
                  <Section id="about" icon={Globe} title="About Kashmir EcoWatch">
                    <p>
                      Kashmir EcoWatch is an independent environmental intelligence and monitoring platform dedicated to biodiversity conservation, environmental research, climate resilience, ecosystem monitoring, hazard intelligence, and public environmental awareness across the Western Himalayan region.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Information Collected ── */}
                  <Section id="collected" icon={Database} title="Information We Collect" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>Depending on how you interact with the platform, we may collect:</p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-2">
                      <div className="text-xs font-bold text-white mb-3">Information You Provide</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                        {[
                          'Name',
                          'Email address',
                          'Organization or institution (optional)',
                          'Country or region',
                          'Observation submissions',
                          'Uploaded photographs or documents',
                          'Volunteer applications',
                          'Partnership inquiries',
                          'Feedback and contact messages',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Providing personal information is voluntary unless required for a specific service.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Environmental Observations ── */}
                  <Section id="observations" icon={Eye} title="Environmental Observations" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>
                      When submitting environmental observations, you may voluntarily provide:
                    </p>
                    <Bullets
                      accent="bg-teal-400"
                      items={[
                        'Geographic location',
                        'Date and time',
                        'Species or environmental feature observed',
                        'Photographs or videos',
                        'Supporting notes',
                        'Environmental conditions',
                      ]}
                    />
                    <p className="mt-2">
                      Observation records become part of KEW&rsquo;s environmental monitoring workflow and may be reviewed before publication.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Automatically Collected ── */}
                  <Section id="automatic" icon={Server} title="Automatically Collected Information" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      Like most websites, we may automatically collect limited technical information including:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Browser type', 'Device type', 'Operating system',
                        'Language preferences', 'Pages visited', 'Session duration',
                        'Referring website', 'Anonymous usage statistics',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-white/5 border border-white/5 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2">
                      This information is used solely to improve platform performance and user experience.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Cookies ── */}
                  <Section id="cookies" icon={Server} title="Cookies" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>
                      KEW may use cookies or similar technologies to:
                    </p>
                    <Bullets
                      accent="bg-amber-400"
                      items={[
                        'Maintain user sessions',
                        'Improve website performance',
                        'Remember preferences',
                        'Measure anonymous usage patterns',
                      ]}
                    />
                    <p className="mt-2">
                      Users may manage or disable cookies through their browser settings. Essential security cookies cannot be disabled without impacting platform functionality.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── How Used ── */}
                  <Section id="how-used" icon={Layers} title="How Information Is Used" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>Information collected may be used to:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        'Process environmental observations',
                        'Verify submitted information',
                        'Improve environmental datasets',
                        'Support scientific research',
                        'Produce environmental reports',
                        'Respond to user inquiries',
                        'Improve platform functionality',
                        'Maintain platform security',
                        'Develop environmental intelligence products',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Observation Review ── */}
                  <Section id="review" icon={CheckCircle} title="Observation Review" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <p>Submitted observations may undergo:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                      {[
                        { label: 'Automated Validation', icon: '⚙️' },
                        { label: 'Manual Review',        icon: '👁️' },
                        { label: 'Expert Verification',  icon: '🔬' },
                        { label: 'Quality Assessment',   icon: '✅' },
                      ].map(({ label, icon }) => (
                        <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <div className="text-xl mb-1">{icon}</div>
                          <div className="text-[10px] text-slate-300 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2">
                      KEW reserves the right to edit, classify, defer, or decline submissions that do not meet scientific, ethical, or quality standards.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Sensitive Environmental Info ── */}
                  <Section id="sensitive" icon={AlertTriangle} title="Sensitive Environmental Information" accent="text-orange-400" bg="bg-orange-500/10">
                    <p>
                      To protect vulnerable ecosystems and species, KEW may intentionally generalise, delay, or withhold publication of precise geographic locations for:
                    </p>
                    <Bullets
                      accent="bg-orange-400"
                      items={[
                        'Endangered species',
                        'Rare plants',
                        'Sensitive habitats',
                        'Nesting locations',
                        'Protected ecological sites',
                      ]}
                    />
                    <div className="rounded-xl bg-orange-950/30 border border-orange-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        This practice supports responsible conservation and prevents harmful exploitation of sensitive ecological information. It is aligned with internationally recognised biodiversity data standards.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Data Sharing ── */}
                  <Section id="sharing" icon={Handshake} title="Data Sharing" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-4 mb-3">
                      <p className="text-sm font-semibold text-white">KEW does not sell personal information.</p>
                    </div>
                    <p>Information may be shared only when appropriate with:</p>
                    <Bullets
                      accent="bg-indigo-400"
                      items={[
                        'Research institutions',
                        'Academic partners',
                        'Environmental organizations',
                        'Conservation initiatives',
                        'Government agencies where legally required',
                        'Public environmental reports using aggregated or anonymized information',
                      ]}
                    />
                    <p className="mt-2">
                      Personal information is not disclosed for commercial marketing purposes.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Data Security ── */}
                  <Section id="security" icon={Lock} title="Data Security" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>
                      Reasonable technical and administrative safeguards are implemented to protect information from unauthorised access, alteration, disclosure, or destruction.
                    </p>
                    <p>
                      Although reasonable efforts are made, no internet-based service can guarantee absolute security. Users should take care when submitting sensitive information online.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Data Retention ── */}
                  <Section id="retention" icon={Clock} title="Data Retention" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>Information is retained only for as long as reasonably necessary to:</p>
                    <Bullets
                      accent="bg-blue-400"
                      items={[
                        'Maintain scientific records',
                        'Support environmental monitoring',
                        'Comply with legal obligations',
                        'Improve historical environmental datasets',
                      ]}
                    />
                    <div className="rounded-xl bg-blue-950/30 border border-blue-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Observation records contributing to long-term environmental monitoring may be retained indefinitely as part of scientific archives — consistent with standard practice across environmental observatories worldwide.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Third-Party ── */}
                  <Section id="third-party" icon={Globe} title="Third-Party Services" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      KEW may incorporate information from external environmental datasets, satellite imagery providers, mapping services, and publicly available scientific resources including GBIF, NASA Earthdata, and national meteorological agencies.
                    </p>
                    <p>
                      Each third-party provider maintains its own privacy practices. KEW is not responsible for the privacy policies of external services or datasets.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Children ── */}
                  <Section id="children" icon={Baby} title="Children's Privacy" accent="text-pink-400" bg="bg-pink-500/10">
                    <p>
                      KEW is not intended for children under the age required by applicable law without parental or guardian involvement. We do not knowingly collect personal information from children.
                    </p>
                    <p>
                      If information relating to a child has been submitted unintentionally, please contact us for appropriate review and removal.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── International Users ── */}
                  <Section id="international" icon={Globe} title="International Users" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>
                      KEW serves users from multiple countries across South Asia, Central Asia, and internationally. By using the platform, users acknowledge that information may be processed in jurisdictions where KEW operates or where its service providers maintain infrastructure.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Your Rights ── */}
                  <Section id="rights" icon={Users} title="Your Rights" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>
                      Depending on applicable laws, users may request to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        { right: 'Access',           desc: 'Obtain a copy of personal information held about you.' },
                        { right: 'Correct',          desc: 'Request correction of inaccurate personal records.' },
                        { right: 'Delete',           desc: 'Request deletion of personal information where appropriate.' },
                        { right: 'Withdraw Consent', desc: 'Withdraw consent where processing is consent-based.' },
                        { right: 'Enquire',          desc: 'Contact KEW regarding any privacy concern or question.' },
                      ].map(({ right, desc }) => (
                        <div key={right} className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/5 p-3">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-white">{right}</div>
                            <div className="text-[10px] text-slate-400 leading-relaxed">{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Requests will be handled in accordance with applicable legal requirements. Contact KEW through the official contact channels available on this website.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Policy Updates ── */}
                  <Section id="updates" icon={RefreshCw} title="Policy Updates" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      This Privacy Policy may be updated periodically to reflect improvements, legal requirements, or operational changes.
                    </p>
                    <p>
                      The <strong className="text-white">Last Updated</strong> date at the top of this page indicates the most recent revision. Continued use of Kashmir EcoWatch following a policy update constitutes acceptance of the revised terms.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-slate-500 mb-0.5">Published</div>
                          <div className="text-white font-semibold">{POLICY_PUBLISHED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Fixed — original document date</div>
                        </div>
                        <div>
                          <div className="text-slate-500 mb-0.5">Last Updated</div>
                          <div className="text-white font-semibold">{POLICY_LAST_UPDATED}</div>
                          <div className="text-[9px] text-slate-600 mt-1">Revised on each policy change</div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Geographic Notice ── */}
                  <Section id="geographic" icon={MapPin} title="Geographic Notice" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl border border-orange-500/20 bg-orange-950/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Kashmir EcoWatch is an independent environmental intelligence initiative. Geographic names, regional references, maps, and administrative descriptions are used solely for scientific, environmental, research, and operational purposes and do not express any position regarding sovereignty, international boundaries, territorial status, or political claims.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Acceptance ── */}
                  <Section id="acceptance" icon={CheckCircle} title="Acceptance" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        By accessing or using Kashmir EcoWatch, users acknowledge that they have read, understood, and agreed to this Privacy Policy.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Contact ── */}
                  <Section id="contact" icon={Mail} title="Contact" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      Questions regarding this Privacy Policy may be submitted through the official Kashmir EcoWatch contact channels available on this website.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <Link
                        href="/about/contact"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Contact Kashmir EcoWatch</div>
                          <div className="text-xs text-slate-400">Submit a privacy enquiry or data request</div>
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
                  <TableOfContents key="toc" active={active} />,
                  <PolicyMeta key="meta" />,
                  <YourRightsSidebar key="rights" />,
                  <RelatedLinks key="links" />,
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
