'use client';

import React from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Leaf, Mail, MapPin, Github, Twitter, Linkedin, Youtube, Facebook,
  Heart, Database, FileText, Users, Shield, Activity, Globe, MessageCircle
} from 'lucide-react';

export const KEW_OFFICIAL_WHATSAPP_GROUP = 'https://chat.whatsapp.com/CfI56jHncxoBXoV7XK5o39';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';

const footerLinks = {
  explore: [
    { label: 'About',         href: '/about' },
    { label: 'Message',       href: '/about/message' },
    { label: 'Mission',       href: '/about/mission' },
    { label: 'Governance',    href: '/about/governance' },
    { label: 'Institutional Leadership', href: '/about/founder' },
    { label: 'Contributors',  href: '/about/contributors' },
    { label: 'Webinars & Conferences', href: '/webinars' },
    { label: 'Support KEW',   href: '/about/support-sponsorship' },
    { label: 'CSR & Grants',  href: '/about/csr-collaborations' },
    { label: 'Contact',       href: '/about/contact' },
    { label: 'KEW Q&A',       href: '/about/qna' },
    { label: 'Kashmir Craft Lifecycle', href: 'https://www.craftlore.org/clee' },
    { label: 'Plan Kashmir Trip', href: 'https://kashmirartstay.com/' },
  ],
  platform: [
    { label: 'Investigations',                    href: '/environmental-investigations' },
    { label: 'Himalayan Dispatch',                href: getKewToDispatchUrl('/') },
    { label: 'Investigation Dashboard',           href: '/environmental-investigations/dashboard' },
    { label: 'Sectoral EIA Engine',               href: '/sectoral-eia' },
    { label: 'Cumulative Impact Modeling',        href: '/sectoral-eia/cumulative-impact' },
    { label: 'Global Dashboard',                  href: '/monitoring-overview' },
    { label: 'Biodiversity Dashboard',            href: '/biodiversity/dashboards' },
    { label: 'Water Systems Dashboard',           href: '/water-systems/dashboards' },
    { label: 'Env. Monitoring Dashboard',        href: '/environmental-monitoring/dashboards' },
    { label: 'Hazard Intelligence Dashboard',     href: '/hazard-intelligence/dashboards' },
    { label: 'Earth Systems Dashboard',           href: '/seasonal-ecology' },
    { label: 'SDG Dashboard',                     href: '/environmental-monitoring/sdg-monitoring' },
    { label: 'EcoVoices: Arts & Music',           href: '/ecovoices' },
    { label: 'Student Action Hub',                href: '/environmental-calendar' },
  ],
  resources: [
    { label: 'Investigation Reports',     href: '/environmental-investigations/reports' },
    { label: 'Accountability Matrix',     href: '/environmental-investigations/accountability' },
    { label: 'Sectoral Impact Atlas',     href: '/sectoral-eia/impact-atlas' },
    { label: 'SEIAE Scientific Reports',  href: '/sectoral-eia/reports' },
    { label: 'Research Library',          href: '/research-library' },
    { label: 'Environmental PIL Portal',  href: '/resources/environmental-pil' },
    { label: 'KEW Green Heroes',          href: '/resources/kew-green-heroes' },
    { label: 'Ecological Atlas',          href: '/atlas' },
    { label: 'Regional Profiles',         href: '/districts' },
    { label: 'Environmental Indicators',  href: '/environmental-monitoring/sdg-monitoring' },
    { label: 'Environmental Resilience',  href: '/environmental-monitoring/environmental-resilience' },
    { label: 'Open Data Portal',          href: '/open-data' },
    { label: 'Methodology',               href: '/about/methodology' },
  ],
  getInvolved: [
    { label: 'Submit Investigation',      href: '/environmental-investigations/submit' },
    { label: 'Submit Creative Work',      href: '/ecovoices#submit' },
    { label: 'Submit Sectoral Assessment',href: '/sectoral-eia/assessment/new' },
    { label: 'Submit Observation',        href: '/submit-observation' },
    { label: 'Report Environmental Issue',href: '/report-issue' },
    { label: 'Share Environmental Data',  href: '/share-data' },
    { label: 'Join Citizen Science',      href: '/join-citizen-science' },
    { label: 'Become a Data Contributor', href: '/become-data-contributor' },
    { label: 'Become a Research Partner', href: '/become-research-partner' },
    { label: 'Volunteer & Contribute',      href: '/get-involved/volunteer' },
  ],
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/Kashmirecowatch/', icon: Facebook, tooltip: 'Facebook' },
  { label: 'X (Twitter)', href: 'https://x.com/KashmirEcoWatch', icon: XIcon, tooltip: 'X (Twitter)' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/kashmir-ecowatch/', icon: Linkedin, tooltip: 'LinkedIn' },
  { label: 'Official YouTube Playlist', href: 'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM', icon: Youtube, tooltip: 'YouTube' },
  { label: 'Join Kashmir EcoWatch Official WhatsApp Group', href: KEW_OFFICIAL_WHATSAPP_GROUP, icon: WhatsAppIcon, tooltip: 'Join Our Official WhatsApp Group' },
];

export function AdvancedFooter() {
  return (
    <footer data-kew-dark-surface="true" className="bg-slate-950 border-t border-white/5 text-slate-100">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="kew-footer-main-grid grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 3xl:gap-12">
          {/* Institutional Identity column (28% desktop proportion, controlled content measure) */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 min-w-0">
            <Link href="/" className="relative flex items-center group max-w-full">
              <div className="flex items-center gap-3 sm:gap-3.5 mb-4 min-w-0 max-w-full">
                <img
                  src="/kew_LOGO.png"
                  alt="Dr. Kumar's Kashmir EcoWatch Logo"
                  className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] object-contain shrink-0"
                />

                <div className="min-w-0 flex-1 flex flex-col items-start text-left">
                  <h3 className="kew-footer-inst-line-1 text-sm sm:text-base font-bold tracking-tight leading-snug text-left break-words">
                    Dr. Kumar&apos;s Kashmir EcoWatch
                  </h3>
                  <span className="kew-footer-inst-line-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] uppercase leading-snug block mt-0.5 text-left break-words">
                    GLOBAL INSTITUTE FOR ADVANCED ENVIRONMENTAL STUDIES
                  </span>
                </div>
              </div>
            </Link>
            <p className="kew-footer-inst-desc text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">
              A Kashmir diaspora-supported global institute advancing environmental research, scientific education, environmental intelligence, ecological resilience and sustainable stewardship across the Western Himalayas.
            </p>
            <div className="kew-footer-inst-desc mb-4 text-xs leading-relaxed">
              <span className="block text-slate-500 font-medium mb-0.5">Operated &amp; Supported by</span>
              <a
                href="https://dkf.sufisciencecenter.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors underline-offset-2 hover:underline"
              >
                Dr. Kumar Foundation USA
              </a>{' '}
              <span className="text-slate-400">&amp;</span>{' '}
              <span className="text-slate-300 font-medium">Kumar Trust USA</span>
            </div>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:contact@kashmir-ecowatch.com"
                  className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-all"
                >
                  contact@kashmir-ecowatch.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={KEW_OFFICIAL_WHATSAPP_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-words font-medium"
                  title="Join Our Official WhatsApp Group"
                  aria-label="Join Kashmir EcoWatch Official WhatsApp Group"
                >
                  Join Our Official WhatsApp Group
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 break-words">Loudoun County, Virginia, USA</span>
              </div>
            </div>

            {/* Western Himalayan Scientific Coverage */}
            <div className="pt-3 border-t border-white/10 space-y-1 mb-4">
              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Western Himalayan Scientific Coverage
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed font-mono space-y-0.5">
                <div>India: Kashmir Valley · Jammu · Ladakh</div>
                <div>Pakistan: Azad Jammu &amp; Kashmir · Gilgit-Baltistan</div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[6px] bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center transition-all group shrink-0 shadow-sm"
                  aria-label={social.label}
                  title={social.tooltip}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:scale-105 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}
          <div className="col-span-1 min-w-0">
            <h4 className="text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-words inline-flex items-center gap-1 group">
                    <span>{link.label}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform links */}
          <div className="col-span-1 min-w-0">
            <h4 className="text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 sm:mb-4">
              Platform
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="col-span-1 min-w-0">
            <h4 className="text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 sm:mb-4">
              Resources
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribute links */}
          <div className="col-span-1 min-w-0">
            <h4 className="text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 sm:mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left side: Dr. Kumar Foundation & Legal/Governance Policy Links */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Spearheaded &amp; Supported by{' '}
                <a
                  href="https://dkf.sufisciencecenter.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  Dr. Kumar Foundation USA
                </a>
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                As part of its Western Himalayan Ecological Stewardship Initiative.
              </div>

              {/* Policy & Governance Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-slate-500 pt-1">
                <a href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
                <span className="text-slate-700">•</span>
                <a href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Use
                </a>
                <span className="text-slate-700">•</span>
                <a href="/accessibility" className="hover:text-emerald-400 transition-colors">
                  Accessibility Statement
                </a>
                <span className="text-slate-700">•</span>
                <a href="/legal-notice" className="hover:text-emerald-400 transition-colors">
                  Legal Notice
                </a>
                <span className="text-slate-700">•</span>
                <a href="/geographic-notice" className="hover:text-emerald-400 transition-colors">
                  Geographic Notice
                </a>
                <span className="text-slate-700">•</span>
                <a href="/geographic-scope" className="hover:text-emerald-400 transition-colors">
                  Geographic Scope
                </a>
              </div>

              <div className="pt-0.5 text-[11px] text-slate-500">
                <span>© 2026 Kashmir EcoWatch. All rights reserved (Platform Software) · Eligible KEW Syntheses: CC BY-NC 4.0 (Non-Commercial)</span>
              </div>
            </div>

            {/* Right side: Prime Logic Solutions CSR Attribution */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 space-y-1">
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Web Portal Developed &amp; Maintained by{' '}
                <a
                  href="https://primelogicsol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  Prime Logic Solutions USA
                </a>
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                As part of its Corporate Social Responsibility (CSR) Initiative.
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Disclaimer zone */}
      <div className="border-t border-white/[0.04] bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-4">


          {/* Tiered Licensing & Intellectual Property Notice */}
          <div className="flex items-start gap-3 border-l-2 border-slate-600/40 pl-4">
            <Shield className="w-3.5 h-3.5 text-slate-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-400">Licensing &amp; Intellectual Property: </span>
              Eligible KEW-authored synthesis datasets, taxonomic/geographic reference tables, and desk-verified reports are licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-medium transition-colors"
              >
                CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0 International)
              </a>{' '}
              for non-commercial research, educational, and conservation use with attribution (commercial reuse requires prior written permission). Explicit carve-outs apply to third-party government, statutory, and journal publications (<span className="text-slate-400">Third-Party Rights Retained</span>), poaching-vulnerable wildlife coordinates (<span className="text-slate-400">Conservation-Restricted</span>), EcoVoices cultural and musical works (<span className="text-slate-400">Artist &amp; Cultural Rights Reserved</span>), and proprietary KEW platform software &amp; UI (<span className="text-slate-400">© 2026 Kashmir EcoWatch. All rights reserved</span>). Read our{' '}
              <Link href="/legal-notice#ip" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-medium transition-colors">
                Intellectual Property &amp; Legal Notice
              </Link>.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
