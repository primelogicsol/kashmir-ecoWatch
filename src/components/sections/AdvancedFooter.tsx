'use client';

import React from 'react';
import Link from 'next/link';
import {
  Leaf, Mail, MapPin, Github, Twitter, Linkedin, Youtube,
  Heart, Database, FileText, Users, Shield, Activity, Globe, MessageCircle
} from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'About',         href: '/about' },
    { label: 'Mission',       href: '/about/mission' },
    { label: 'Governance',    href: '/about/governance' },
    { label: 'Founder',       href: '/about/founder' },
    { label: 'Contributors',  href: '/about/contributors' },
    { label: 'Webinars & Conferences', href: '/webinars' },
    { label: 'Support KEW',   href: '/about/support-sponsorship' },
    { label: 'CSR & Grants',  href: '/about/csr-collaborations' },
    { label: 'Contact',       href: '/about/contact' },
  ],
  platform: [
    { label: 'Sectoral EIA Engine',               href: '/sectoral-eia' },
    { label: 'Cumulative Impact Modeling',        href: '/sectoral-eia/cumulative-impact' },
    { label: 'Global Dashboard',                  href: '/monitoring-overview' },
    { label: 'Biodiversity Dashboard',            href: '/biodiversity/dashboards' },
    { label: 'Water Systems Dashboard',           href: '/water-systems/dashboards' },
    { label: 'Env. Monitoring Dashboard',        href: '/environmental-monitoring/dashboards' },
    { label: 'Hazard Intelligence Dashboard',     href: '/hazard-intelligence/dashboards' },
    { label: 'Earth Systems Dashboard',           href: '/seasonal-ecology' },
    { label: 'SDG Dashboard',                     href: '/environmental-monitoring/sdg-monitoring' },
  ],
  resources: [
    { label: 'Sectoral Impact Atlas',     href: '/sectoral-eia/impact-atlas' },
    { label: 'SEIAE Scientific Reports',  href: '/sectoral-eia/reports' },
    { label: 'Research Library',          href: '/research-library' },
    { label: 'Ecological Atlas',          href: '/atlas' },
    { label: 'Regional Profiles',         href: '/districts' },
    { label: 'Environmental Indicators',  href: '/environmental-monitoring/sdg-monitoring' },
    { label: 'Environmental Resilience',  href: '/environmental-monitoring/environmental-resilience' },
    { label: 'Open Data Portal',          href: '/open-data' },
    { label: 'Methodology',               href: '/about/methodology' },
  ],
  getInvolved: [
    { label: 'Join Official WhatsApp Group', href: 'https://chat.whatsapp.com/CfI56jHncxoBXoV7XK5o39' },
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

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export function AdvancedFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {/* Brand column - spans 2 columns */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <a href="/" className="relative flex items-center group">
            <div className="flex items-center gap-4 sm:gap-3 mb-4">
                <img
                  src="/kew_LOGO.png"
                  alt="Kashmir EcoWatch Logo"
                  className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] object-contain"
                />
                
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Kashmir EcoWatch
                  </h3>
                </div>
            </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence, Scientific Stewardship, and Ecological Resilience.
            </p>
            <div className="mb-4 text-xs leading-relaxed">
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
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <a
                  href="mailto:contact@kashmir-ecowatch.com"
                  className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors break-all"
                >
                  contact@kashmir-ecowatch.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="https://chat.whatsapp.com/CfI56jHncxoBXoV7XK5o39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-500 hover:underline"
                  title="Connect with environmental scientists, researchers, NGOs and conservation professionals"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="text-xs sm:text-sm break-words font-medium">
                    Join Our Official WhatsApp Group
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 break-words">Loudoun County, Virginia, USA</span>
              </div>
            </div>

            {/* Western Himalayan Scientific Coverage */}
            <div className="pt-3 border-t border-white/10 space-y-1 mb-4">
              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                Western Himalayan Scientific Coverage
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                Jammu &amp; Kashmir, India · Ladakh, India · Azad Kashmir, Pakistan · Gilgit-Baltistan, Pakistan
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 sm:w-10 sm:h-10 rounded-lg glass-light border border-white/10 hover:border-forest-500/50 flex items-center justify-center transition-all group flex-shrink-0"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.explore.map((link) => (
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

          {/* Platform links */}
          <div className="col-span-1">
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
          <div className="col-span-1">
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
          <div className="col-span-1">
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
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
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
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 pt-0.5 text-[11px] text-slate-500">
                <span>© {new Date().getFullYear()} Kashmir EcoWatch. Independent • Non-Commercial • Open Data</span>
                <span className="text-slate-700">•</span>
                <a href="/geographic-scope" className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors">
                  <Globe className="w-3 h-3" />
                  <span>Geographic Scope</span>
                </a>
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


          {/* Intellectual Property Notice */}
          <div className="flex items-start gap-3 border-l-2 border-slate-600/40 pl-4">
            <Shield className="w-3.5 h-3.5 text-slate-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-400">Intellectual Property: </span>
              Kashmir EcoWatch environmental intelligence systems, geospatial models, analytical registries, and digital architecture are protected under intellectual property laws. Unauthorized reproduction or commercial extraction is prohibited. Read our{' '}
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
