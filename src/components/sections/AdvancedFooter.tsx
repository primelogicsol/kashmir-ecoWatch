'use client';

import React from 'react';
import {
  Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube,
  Heart, Database, FileText, Users, Shield, Activity, Globe
} from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/about/mission' },
    { label: 'Governance', href: '/about/governance' },
    { label: 'Founder', href: '/about/founder' },
    { label: 'Contributors', href: '/about/contributors' },
    { label: 'Support KEW', href: '/about/support-sponsorship' },
    { label: 'Contact', href: '/about/contact' },
  ],
  platform: [
    { label: 'Dashboard', href: '/monitoring-overview' },
    { label: 'Biodiversity', href: '/biodiversity' },
    { label: 'Water Resources', href: '/water-systems' },
    { label: 'Hazards & Risk', href: '/hazard-intelligence' },
    { label: 'Protected Network', href: '/protected-network' },
    { label: 'Env. Monitoring', href: '/environmental-monitoring' },
    { label: 'Earth Systems', href: '/seasonal-ecology' },
  ],
  resources: [
    { label: 'Research Library', href: '/research-library' },
    { label: 'Ecological Atlas', href: '/atlas' },
    { label: 'SDG Tracker', href: '/sdg-tracker' },
    { label: 'Districts', href: '/districts' },
    { label: 'Resilience', href: '/risk-monitoring' },
    { label: 'Open Data Portal', href: '/open-data' },
    { label: 'Methodology', href: '/about/methodology' },
  ],
  contribute: [
    { label: 'Share Data', href: '/share-data' },
    { label: 'Submit Observation', href: '/submit-observation' },
    { label: 'Join Citizen Science', href: '/about/contact' },
    { label: 'Become Research Partner', href: '/about/support-sponsorship' },
    { label: 'Report Environmental Issue', href: '/report-issue' },
    { label: 'Volunteer', href: '/about/contact' },
    { label: 'Collaborate With KEW', href: '/about/support-sponsorship' },
  ]
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
              Supported and sponsored by Dr. Kumar Foundation USA
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">contact@kashmir-ecowatch.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">+91 194 2XXX XXX</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">Srinagar, Jammu & Kashmir</span>
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
              Contribute
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.contribute.map((link) => (
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
            <div className="text-xs sm:text-sm text-slate-500">
              <span className="block mb-1">© {new Date().getFullYear()} Kashmir EcoWatch. All Rights Reserved.</span>
              <span className="block mb-1">Independent • Non-Commercial • Open Data.</span>
              <a href="/geographic-scope" className="inline-flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 transition-colors mt-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Geographic Scope & Environmental Coverage</span>
              </a>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="/privacy" className="text-slate-500 hover:text-forest-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-500 hover:text-forest-400 transition-colors">
                Terms of Use
              </a>
              <a href="/accessibility" className="text-slate-500 hover:text-forest-400 transition-colors">
                Accessibility Statement
              </a>
              <a href="/legal-notice" className="text-slate-500 hover:text-forest-400 transition-colors">
                Legal Notice
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Data attribution + legal notice */}
      <div className="bg-slate-950 py-4 sm:py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed max-w-5xl">
            Kashmir EcoWatch, including its environmental intelligence systems, databases, geospatial frameworks, analytical methodologies, visual assets, and associated digital infrastructure, is protected under applicable intellectual property and related laws. Unauthorized reproduction, extraction, redistribution, reverse engineering, imitation, or commercial exploitation is prohibited without prior written authorization.
          </p>
        </div>
      </div>
    </footer>
  );
}
