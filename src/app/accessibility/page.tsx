'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Accessibility Statement</span>
          </>}
        subtitle="Universal Access to Environmental Intelligence."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
              Kashmir EcoWatch views environmental intelligence as a fundamental public right. We are organizationally committed to ensuring that our digital infrastructure, data portals, and hazard dashboards remain accessible to all individuals globally, regardless of physical or cognitive ability, device constraints, or geographical bandwidth limitations.
            </p>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Organizational Commitment to WCAG Compliance</h2>
                <p className="text-slate-300 leading-relaxed">
                  We engineer our platforms in alignment with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Accessibility is integrated into our continuous deployment pipeline, ensuring that every new dashboard, data layer, and reporting tool meets rigorous structural semantics.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Screen Reader Compatibility & Semantics</h2>
                <p className="text-slate-300 leading-relaxed">
                  Given the high volume of complex geospatial and numerical data, we strive to provide ARIA (Accessible Rich Internet Applications) landmarks and semantic alternatives for visual matrices. Key data tables, textual reports, and critical hazard alerts are structured to be fully interpretable by modern screen-reading technologies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Keyboard Navigation and Operability</h2>
                <p className="text-slate-300 leading-relaxed">
                  The primary analytical interfaces, including the intelligence directory, open data portals, and form submissions, are designed for complete operability via keyboard interfaces. We actively work to prevent keyboard traps in our more complex cartographic mapping modules.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Visual Architecture and Contrast</h2>
                <p className="text-slate-300 leading-relaxed">
                  Our enterprise-grade dark mode architecture is mathematically calculated to meet minimum contrast ratios for text legibility. Furthermore, critical alerts—such as Flash Flood or Avalanche warnings—utilize multi-sensory signaling (text, iconography, and pattern) rather than relying exclusively on color, accommodating users with color vision deficiencies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Contact and Alternative Formats</h2>
                <p className="text-slate-300 leading-relaxed">
                  Due to the inherently visual nature of geospatial data, GIS layers, and algorithmic telemetry dashboards, certain specialized scientific interfaces may present inherent accessibility challenges. If you encounter barriers in accessing critical environmental or hazard data, please contact our accessibility engineering team. We are committed to providing data extracts in alternative, machine-readable formats upon request.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
