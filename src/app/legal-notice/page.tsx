'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Legal Notice</span>
          </>}
        subtitle="Platform Architecture, Intellectual Property, and Database Rights."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
              Kashmir EcoWatch is a highly specialized environmental intelligence platform. The legal protection of our underlying architecture, data structures, and scientific models is paramount to maintaining our operational independence, data integrity, and authoritative standing within the global research community.
            </p>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Copyright and Intellectual Property Protection</h2>
                <p className="text-slate-300 leading-relaxed">
                  Kashmir EcoWatch, encompassing its platform architecture, environmental intelligence systems, content organization, evidence structures, dashboards, specific workflows, geospatial integrations, and associated digital assets, is protected under applicable national and international copyright and intellectual property laws. 
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Certain platform elements, algorithms, and analytical pipelines may include proprietary, patentable, or otherwise legally protectable systems, methods, designs, or frameworks.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Exclusive Organizational Ownership</h2>
                <p className="text-slate-300 leading-relaxed mb-4">Kashmir EcoWatch explicitly claims exclusive ownership and operational rights over the following platform domains, unless strictly stated otherwise:</p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-300">
                  <li><strong className="text-white">Platform Architecture:</strong> The bespoke technical stack, UI paradigms, and routing logic powering the observatory.</li>
                  <li><strong className="text-white">Environmental Intelligence Systems:</strong> The predictive models and ingestion pipelines translating raw telemetry into actionable hazard intelligence.</li>
                  <li><strong className="text-white">Databases:</strong> The proprietary structuring, schema design, and aggregation logic of our environmental records.</li>
                  <li><strong className="text-white">Geospatial Layers:</strong> Custom boundary files, polygon definitions, and vectorized risk heatmaps.</li>
                  <li><strong className="text-white">Dashboards and Monitoring Frameworks:</strong> The visual layout, indicator metrics, and real-time analytical panels.</li>
                  <li><strong className="text-white">Software Components:</strong> Custom-built React modules, data-fetching hooks, and server-side analytical algorithms.</li>
                  <li><strong className="text-white">Visual Assets:</strong> Specific branding, iconography, color theory mapping for hazard levels, and typographic implementations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Database Rights</h2>
                <p className="text-slate-300 leading-relaxed">
                  We assert <i>sui generis</i> database rights over the compilation, curation, and structural aggregation of environmental data housed within the platform. The systematic extraction, reproduction, or automated harvesting (scraping) of substantial parts of our databases without explicit written authorization constitutes a direct violation of these rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Open-Data Exceptions and Research Attribution</h2>
                <p className="text-slate-300 leading-relaxed">
                  While the platform architecture and database compilation are strictly protected, Kashmir EcoWatch operates with a mandate for public good. Datasets explicitly designated for download within our "Open Data" portals are exempt from the restrictive clauses above. 
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Academic researchers, universities, non-governmental organizations, and independent journalists are encouraged to utilize these designated datasets. Any derivative work, publication, or analytical report utilizing this data must provide explicit, prominent, and unambiguous attribution to <strong className="text-white">Kashmir EcoWatch</strong> as the data source, accompanied by a direct URI to the specific dataset or originating dashboard.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Unauthorized Reproduction</h2>
                <p className="text-slate-300 leading-relaxed">
                  The unauthorized copying, extraction, redistribution, reverse engineering, imitation of UI patterns, or commercial exploitation of the platform's proprietary systems is strictly prohibited. Legal action will be pursued against entities attempting to mirror the platform or monetize its analytical outputs.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
