'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Terms of Use</span>
          </>}
        subtitle="Global Terms for Platform Access and Open Data Usage."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
              Access to the Kashmir EcoWatch platform, its APIs, data portals, and analytical models is governed by these Terms of Use. As a public-interest scientific observatory, we mandate strict adherence to operational integrity, open-data licensing, and non-commercial exploitation.
            </p>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptable Use Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  The infrastructure is designed for environmental intelligence, academic research, public policy analysis, and disaster risk reduction. You agree not to engage in malicious scraping, reverse-engineering of predictive algorithms, denial-of-service attacks, or any activity that degrades the platform's capacity to deliver real-time hazard warnings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Open Data Usage and Licensing</h2>
                <p className="text-slate-300 leading-relaxed">
                  Datasets explicitly designated within our Open Data Portal are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). You are permitted to share, adapt, and build upon this data provided that explicit, prominent attribution is given to Kashmir EcoWatch as the primary data originator.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Contributions and Submissions</h2>
                <p className="text-slate-300 leading-relaxed">
                  By submitting field observations, multimedia assets, or environmental datasets to the platform, you grant Kashmir EcoWatch a perpetual, irrevocable, worldwide, non-exclusive license to ingest, analyze, publish, and archive this data in furtherance of our scientific mission. You warrant that submitted content does not violate third-party rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Commercial Exploitation Prohibition</h2>
                <p className="text-slate-300 leading-relaxed">
                  Kashmir EcoWatch operates as a non-commercial, public-good initiative. The unauthorized extraction, repackaging, or sale of our raw datasets, real-time hazard feeds, or analytical models by corporate entities or commercial data brokers is strictly prohibited without a formalized institutional licensing agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimers and Limitations of Liability</h2>
                <p className="text-slate-300 leading-relaxed">
                  While our systems leverage advanced satellite telemetry and predictive modeling, environmental data is inherently probabilistic. Kashmir EcoWatch provides all hazard intelligence, flood warnings, landslide susceptibility indices, and air quality metrics strictly "as is" and without legal warranty. 
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  In scenarios of acute natural disasters, extreme weather events, or life-threatening environmental hazards, users must absolutely defer to binding directives issued by official state disaster management authorities. We assume no liability for damages, loss of life, or property loss resulting from decisions made based on platform data.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
