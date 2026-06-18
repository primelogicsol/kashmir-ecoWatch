'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Privacy Policy</span>
          </>}
        subtitle="Global Organizational Standards for Data Protection and Telemetry."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
              Kashmir EcoWatch ("KEW", "the Observatory", "we", or "us") operates as an international-grade environmental intelligence system. This Privacy Policy governs the collection, processing, and protection of data acquired through our digital infrastructure, field sensors, and citizen-science portals. We adhere to global data protection standards, ensuring that environmental transparency does not compromise individual privacy or ecological security.
            </p>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Scope of Data Collection</h2>
                <p className="text-slate-300 leading-relaxed">
                  The Observatory collects two primary categories of data: (a) Environmental Telemetry and (b) User Contributions. Personal data is collected strictly when a user voluntarily submits field reports, registers for an institutional partnership, or accesses restricted datasets. We do not engage in background profiling, commercial tracking, or the collection of extraneous personal identifiers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Cookies and Analytics</h2>
                <p className="text-slate-300 leading-relaxed">
                  Our platform utilizes zero-party and first-party cookies solely for essential session management and security verification. We utilize privacy-respecting, anonymized telemetry to measure global access to our dashboards. We expressly prohibit the use of third-party advertising trackers, cross-site profiling scripts, and behavioral monetization algorithms across our entire digital estate.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Citizen Science & User Submissions</h2>
                <p className="text-slate-300 leading-relaxed">
                  When individuals submit environmental observations, hazard reports, or biodiversity sightings, we collect geospatial coordinates, timestamps, and optional contributor metadata. To protect vulnerable ecosystems, high-resolution geospatial coordinates for endangered species or sensitive assets are automatically abstracted and generalized before being rendered on public-facing dashboards.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention and Anonymization</h2>
                <p className="text-slate-300 leading-relaxed">
                  Environmental data is retained in perpetuity to form a longitudinal baseline of the Kashmir Himalayas. However, personal identifiers associated with field reports are anonymized or scrubbed post-validation, unless the contributor explicitly requests attribution. Operational logs and security telemetry are purged on a rolling 90-day cycle.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Integration and Processing</h2>
                <p className="text-slate-300 leading-relaxed">
                  KEW integrates with international satellite networks, meteorological agencies, and academic databases. Any data passed through these APIs is subject to rigorous Data Processing Agreements (DPAs). We mandate that third-party infrastructure providers cannot access, mine, or monetize user data traversing our platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. International Data Standards</h2>
                <p className="text-slate-300 leading-relaxed">
                  While operating primarily within the jurisdiction of Jammu & Kashmir, our data stewardship protocols align with global frameworks including the EU General Data Protection Regulation (GDPR) principles of data minimization, purpose limitation, and storage limitation.
                </p>
              </div>

            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500">
                For inquiries regarding data deletion, export requests, or privacy compliance, please contact our Data Stewardship Office at <span className="text-emerald-400">privacy@kashmir-ecowatch.org</span>.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}
