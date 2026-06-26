'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import {
  Eye, Keyboard, Monitor, Smartphone, FileText,
  Globe, ChevronRight, ArrowRight, Mail, Clock,
  RefreshCw, MapPin, CheckCircle, Heart, Layers,
  MessageSquare, Users, ScrollText, ZoomIn, Volume2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import Link from 'next/link';

/* ─── Document metadata ───────────────────────────────────────────────────
   Update STATEMENT_LAST_UPDATED whenever this document is revised.
   STATEMENT_PUBLISHED is fixed — it records the original publication date.
   ─────────────────────────────────────────────────────────────────────── */
const STATEMENT_PUBLISHED    = 'June 2026';
const STATEMENT_LAST_UPDATED = 'June 26, 2026';
const STATEMENT_VERSION      = '1.0';

/* ─── Section index ────────────────────────────────────────────────────── */

const sections = [
  { id: 'commitment',     label: 'Our Commitment' },
  { id: 'goals',          label: 'Accessibility Goals' },
  { id: 'technologies',   label: 'Supported Technologies' },
  { id: 'maps',           label: 'Maps & Visualizations' },
  { id: 'images',         label: 'Images & Multimedia' },
  { id: 'keyboard',       label: 'Keyboard Navigation' },
  { id: 'readability',    label: 'Readability' },
  { id: 'responsive',     label: 'Responsive Design' },
  { id: 'improvements',   label: 'Ongoing Improvements' },
  { id: 'feedback',       label: 'Feedback' },
  { id: 'third-party',    label: 'Third-Party Content' },
  { id: 'review',         label: 'Continuous Review' },
  { id: 'geographic',     label: 'Geographic Neutrality' },
];

/* ─── Active section tracker ─────────────────────────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState('commitment');
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
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Statement Details</h3>
      </div>
      <div className="space-y-2.5">
        {[
          { label: 'Published',    value: STATEMENT_PUBLISHED },
          { label: 'Last Updated', value: STATEMENT_LAST_UPDATED },
          { label: 'Version',      value: STATEMENT_VERSION },
          { label: 'Standard',     value: 'WCAG 2.1 aligned' },
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
          <span className="text-slate-500">Last Updated</span> is revised on each statement change.
        </p>
      </div>
    </div>
  );
}

function AccessibilityFeatures() {
  const features = [
    { icon: Eye,      label: 'Screen Reader Support',    color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { icon: Keyboard, label: 'Keyboard Navigation',      color: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { icon: ZoomIn,   label: 'Browser Zoom & Scaling',   color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Monitor,  label: 'High-Contrast Support',    color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
    { icon: Smartphone, label: 'Mobile Accessibility',   color: 'text-teal-400',    bg: 'bg-teal-500/10'    },
    { icon: Volume2,  label: 'Media Controls',           color: 'text-indigo-400',  bg: 'bg-indigo-500/10'  },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Accessibility Features</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {features.map(({ icon: Icon, label, color, bg }) => (
          <div key={label} className={`rounded-xl ${bg} border border-white/5 p-3`}>
            <Icon className={`w-4 h-4 ${color} mb-1.5`} />
            <div className="text-[10px] text-slate-300 leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackPanel() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Report an Issue</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        If you experience difficulty accessing any part of the KEW platform or have suggestions for improvement, please contact us.
      </p>
      <Link
        href="/about/contact"
        className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors group"
      >
        <Mail className="w-3.5 h-3.5" />
        <span>Contact KEW</span>
        <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
      </Link>
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
          { label: 'Privacy Policy',  href: '/privacy' },
          { label: 'Terms of Use',    href: '/terms' },
          { label: 'Legal Notice',    href: '/legal-notice' },
          { label: 'Open Data Portal',href: '/open-data' },
          { label: 'Contact KEW',     href: '/about/contact' },
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

export default function AccessibilityPage() {
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Legal', href: '/legal-notice' }, { label: 'Accessibility Statement' }]}
        title={<>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Accessibility</span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Statement</span>
        </>}
        subtitle="Kashmir EcoWatch is committed to providing an inclusive, accessible, and user-friendly experience for everyone — across all abilities, devices, and assistive technologies."
        icon={<Eye className="w-6 h-6 text-emerald-400" />}
        label="Legal"
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Statement body (70%) ── */}
            <div className="w-full lg:w-[68%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-intense border-white/10 p-7 sm:p-10 space-y-10">

                  {/* ── Commitment ── */}
                  <div id="commitment" className="scroll-mt-28">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h2 className="text-base font-bold text-white">Our Commitment</h2>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
                        <span>Published: <span className="text-slate-400">{STATEMENT_PUBLISHED}</span></span>
                        <span>·</span>
                        <span>Last Updated: <span className="text-slate-400">{STATEMENT_LAST_UPDATED}</span></span>
                      </div>
                    </div>
                    <div className="pl-11 space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p className="border-l-2 border-emerald-500/40 pl-4">
                        Kashmir EcoWatch (KEW) is committed to providing an inclusive, accessible, and user-friendly experience for everyone.
                      </p>
                      <p>
                        We strive to ensure that our environmental intelligence platform, maps, dashboards, publications, datasets, and digital services are accessible to people of all abilities and can be used across a wide range of devices, browsers, and assistive technologies.
                      </p>
                      <p>
                        Accessibility is an ongoing commitment, and we continuously work to improve the usability of our platform.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5" />

                  {/* ── Goals ── */}
                  <Section id="goals" icon={CheckCircle} title="Accessibility Goals">
                    <p>KEW aims to:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {[
                        'Provide clear and consistent navigation',
                        'Support keyboard-accessible functionality',
                        'Maintain readable typography and sufficient colour contrast',
                        'Design responsive interfaces for desktop, tablet, and mobile devices',
                        'Use meaningful page structures and headings',
                        'Improve compatibility with assistive technologies',
                        'Reduce barriers to accessing environmental information',
                      ].map(item => (
                        <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Supported Technologies ── */}
                  <Section id="technologies" icon={Eye} title="Supported Technologies" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      The platform is designed to function across modern web browsers and commonly used operating systems. Where practical, KEW seeks compatibility with:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                      {[
                        { icon: Eye,        label: 'Screen Readers',            color: 'text-blue-400',    bg: 'bg-blue-500/10'    },
                        { icon: Keyboard,   label: 'Keyboard-only Navigation',  color: 'text-violet-400',  bg: 'bg-violet-500/10'  },
                        { icon: ZoomIn,     label: 'Browser Zoom & Text Scaling',color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        { icon: Monitor,    label: 'High-Contrast Display',     color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
                        { icon: Smartphone, label: 'Mobile Accessibility',      color: 'text-teal-400',    bg: 'bg-teal-500/10'    },
                      ].map(({ icon: Icon, label, color, bg }) => (
                        <div key={label} className={`rounded-xl ${bg} border border-white/5 p-3`}>
                          <Icon className={`w-4 h-4 ${color} mb-1.5`} />
                          <div className="text-[10px] text-slate-300 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Maps & Visualizations ── */}
                  <Section id="maps" icon={Globe} title="Maps & Interactive Visualizations" accent="text-teal-400" bg="bg-teal-500/10">
                    <p>
                      Many KEW features include interactive maps, environmental dashboards, charts, and geographic visualizations. Where possible, we aim to provide:
                    </p>
                    <Bullets
                      accent="bg-teal-400"
                      items={[
                        'Descriptive labels for interactive map elements',
                        'Alternative summaries for complex visualizations',
                        'Accessible controls for map navigation',
                        'Text-based information accompanying visual content',
                      ]}
                    />
                    <div className="rounded-xl bg-teal-950/30 border border-teal-500/20 p-4 mt-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Some advanced mapping features may have accessibility limitations due to the nature of interactive geospatial technologies. We continue working to improve these experiences.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Images & Multimedia ── */}
                  <Section id="images" icon={Volume2} title="Images & Multimedia" accent="text-indigo-400" bg="bg-indigo-500/10">
                    <p>Where appropriate, KEW aims to provide:</p>
                    <Bullets
                      accent="bg-indigo-400"
                      items={[
                        'Alternative text for informative images',
                        'Meaningful image descriptions',
                        'Captions for important visual content',
                        'Accessible media controls where multimedia is provided',
                      ]}
                    />
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Keyboard Navigation ── */}
                  <Section id="keyboard" icon={Keyboard} title="Keyboard Navigation" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      We strive to ensure that important platform functionality can be accessed using a keyboard without requiring a mouse.
                    </p>
                    <p>
                      Interactive controls, forms, menus, and navigation elements should remain operable using standard keyboard navigation.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      {[
                        { key: 'Tab',         desc: 'Move between elements' },
                        { key: 'Enter',       desc: 'Activate controls' },
                        { key: 'Space',       desc: 'Toggle selections' },
                        { key: 'Arrow Keys',  desc: 'Navigate menus' },
                      ].map(({ key, desc }) => (
                        <div key={key} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
                          <div className="text-xs font-mono font-bold text-violet-400 mb-1">{key}</div>
                          <div className="text-[9px] text-slate-400">{desc}</div>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Readability ── */}
                  <Section id="readability" icon={ScrollText} title="Readability" accent="text-amber-400" bg="bg-amber-500/10">
                    <p>KEW follows principles intended to improve readability by using:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {[
                        'Clear page layouts',
                        'Consistent navigation',
                        'Logical heading structures',
                        'Readable font sizes',
                        'Adequate spacing',
                        'Accessible colour contrast',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-white/5 border border-white/5 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Responsive Design ── */}
                  <Section id="responsive" icon={Smartphone} title="Responsive Design" accent="text-cyan-400" bg="bg-cyan-500/10">
                    <p>KEW is designed to operate across:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                      {[
                        { icon: Monitor,    label: 'Desktop Computers' },
                        { icon: Monitor,    label: 'Laptops' },
                        { icon: Smartphone, label: 'Tablets' },
                        { icon: Smartphone, label: 'Mobile Devices' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="rounded-xl bg-cyan-950/30 border border-cyan-500/20 p-3 text-center">
                          <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
                          <div className="text-[10px] text-slate-300 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3">
                      The platform adapts to different screen sizes while maintaining usability and readability.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Ongoing Improvements ── */}
                  <Section id="improvements" icon={RefreshCw} title="Ongoing Improvements" accent="text-emerald-400" bg="bg-emerald-500/10">
                    <p>
                      Accessibility is an evolving process. As Kashmir EcoWatch continues to expand, accessibility enhancements will be incorporated into new features, dashboards, publications, and digital services wherever reasonably practical.
                    </p>
                    <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-4 mt-2">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        We treat accessibility improvements as a continuous cycle — not a one-time task. Each new dashboard, contribution form, and intelligence module is reviewed for accessibility as part of our development process.
                      </p>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Feedback ── */}
                  <Section id="feedback" icon={MessageSquare} title="Feedback" accent="text-blue-400" bg="bg-blue-500/10">
                    <p>
                      We welcome feedback that helps improve accessibility. If you experience difficulty accessing any part of the platform, encounter inaccessible content, or have suggestions for improvement, we encourage you to contact us through the official Kashmir EcoWatch contact channels.
                    </p>
                    <p>
                      Your feedback helps us improve the platform for all users.
                    </p>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-5 mt-3">
                      <Link href="/about/contact" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Contact Kashmir EcoWatch</div>
                          <div className="text-xs text-slate-400">Report an accessibility issue or share a suggestion</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                      </Link>
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Third-Party Content ── */}
                  <Section id="third-party" icon={Layers} title="Third-Party Content" accent="text-slate-400" bg="bg-slate-500/10">
                    <p>
                      Some pages may include content, maps, datasets, or services provided by third-party organisations. While KEW seeks to integrate these resources responsibly, we cannot guarantee the accessibility of third-party content that is outside our control.
                    </p>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Continuous Review ── */}
                  <Section id="review" icon={Users} title="Continuous Review" accent="text-violet-400" bg="bg-violet-500/10">
                    <p>
                      Accessibility practices, technologies, and standards continue to evolve. Kashmir EcoWatch periodically reviews this statement and its accessibility practices to support a more inclusive experience for:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                      {[
                        'Researchers', 'Educators', 'Conservation Professionals',
                        'Students', 'Policymakers', 'Citizen Scientists',
                        'Journalists', 'Community Members', 'General Public',
                      ].map(label => (
                        <div key={label} className="flex items-center gap-2 text-xs text-slate-300 rounded-lg bg-white/5 border border-white/5 px-3 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </Section>

                  <div className="border-t border-white/5" />

                  {/* ── Geographic Neutrality ── */}
                  <Section id="geographic" icon={MapPin} title="Geographic Neutrality" accent="text-orange-400" bg="bg-orange-500/10">
                    <div className="rounded-xl bg-orange-950/20 border border-orange-500/20 p-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Kashmir EcoWatch is an independent environmental intelligence initiative. Geographic names, maps, regional classifications, and administrative references are presented solely for scientific, environmental, research, and operational purposes and do not express any position regarding sovereignty, international boundaries, territorial status, or political claims.
                      </p>
                    </div>
                  </Section>

                  {/* Version note */}
                  <div className="rounded-xl bg-white/5 border border-white/5 p-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-500 mb-0.5">Published</div>
                        <div className="text-white font-semibold">{STATEMENT_PUBLISHED}</div>
                        <div className="text-[9px] text-slate-600 mt-1">Fixed — original document date</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-0.5">Last Updated</div>
                        <div className="text-white font-semibold">{STATEMENT_LAST_UPDATED}</div>
                        <div className="text-[9px] text-slate-600 mt-1">Revised on each statement change</div>
                      </div>
                    </div>
                  </div>

                </Card>
              </motion.div>
            </div>

            {/* ── RIGHT: Sticky sidebar (30%) ── */}
            <div className="w-full lg:w-[32%]">
              <div className="lg:sticky lg:top-24 space-y-4">
                {[
                  <TableOfContents     key="toc"      active={active} />,
                  <DocMeta             key="meta" />,
                  <AccessibilityFeatures key="features" />,
                  <FeedbackPanel       key="feedback" />,
                  <RelatedLinks        key="links" />,
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
