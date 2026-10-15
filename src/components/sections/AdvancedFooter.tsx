'use client';

import React from 'react';
import {
  Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube,
  Heart, Database, FileText, Users, Shield, Activity, Globe
} from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'About',         href: '/about' },
    { label: 'Mission',       href: '/about/mission' },
    { label: 'Governance',    href: '/about/governance' },
    { label: 'Founder',       href: '/about/founder' },
    { label: 'Contributors',  href: '/about/contributors' },
    { label: 'Support KEW',   href: '/about/support-sponsorship' },
    { label: 'Contact',       href: '/about/contact' },
  ],
  platform: [
    { label: 'Global Dashboard',                  href: '/monitoring-overview' },
    { label: 'Biodiversity Dashboard',            href: '/biodiversity/dashboards' },
    { label: 'Water Systems Dashboard',           href: '/water-systems/dashboards' },
    { label: 'Env. Monitoring Dashboard',        href: '/environmental-monitoring/dashboards' },
    { label: 'Hazard Intelligence Dashboard',     href: '/hazard-intelligence/dashboards' },
    { label: 'Earth Systems Dashboard',           href: '/seasonal-ecology' },
    { label: 'SDG Dashboard',                     href: '/environmental-monitoring/sdg-monitoring' },
  ],
  resources: [
    { label: 'Research Library',          href: '/research-library' },
    { label: 'Ecological Atlas',          href: '/atlas' },
    { label: 'Regional Profiles',         href: '/districts' },
    { label: 'Environmental Indicators',  href: '/environmental-monitoring/sdg-monitoring' },
    { label: 'Environmental Resilience',  href: '/environmental-monitoring/environmental-resilience' },
    { label: 'Open Data Portal',          href: '/open-data' },
    { label: 'Methodology',               href: '/about/methodology' },
  ],
  getInvolved: [
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
            <p className="text-xs sm:text-sm text-slate-400 mb-2 leading-relaxed">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence and Scientific Stewardship
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 mb-4 leading-relaxed">
              Operated & Supported by Dr. Kumar Foundation USA & Kumar Trust USA
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">contact@kashmir-ecowatch.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">+1 916 699 0091</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">Loudoun County, VA, USA</span>
              </div>
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
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Platform
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Resources
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribute links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
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
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm">
                <span className="text-slate-400 font-medium">© {new Date().getFullYear()} Kashmir EcoWatch.</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-300 font-medium">
                  Operated &amp; Supported by{' '}
                  <span className="text-emerald-400 font-semibold">Dr. Kumar Foundation USA</span>
                </span>
              </div>

              {/* Policy & Governance Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-slate-500">
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
                <span>Independent • Non-Commercial • Open Data</span>
                <span className="text-slate-700">•</span>
                <a href="/geographic-scope" className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition-colors">
                  <Globe className="w-3 h-3" />
                  <span>Geographic Scope</span>
                </a>
              </div>
            </div>

            {/* Right side: Prime Logic Solutions CSR Attribution */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0">
              <div className="text-xs text-slate-400 leading-relaxed">
                Web Portal Developed &amp; Maintained by{' '}
                <a
                  href="https://primelogicsol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  Prime Logic Solutions
                </a>
              </div>
              <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
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
              Kashmir EcoWatch, including its environmental intelligence systems, databases, geospatial frameworks, analytical methodologies, visual assets, and associated digital infrastructure, is protected under applicable intellectual property and related laws. Unauthorized reproduction, extraction, redistribution, reverse engineering, imitation, or commercial exploitation is prohibited without prior written authorization.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
