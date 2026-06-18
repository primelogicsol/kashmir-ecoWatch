'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';

export default function GeographicScopePage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Geographic Scope</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">& Environmental Coverage</span>
          </>}
        subtitle="Environmental Boundaries, Not Political Boundaries."
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-8">
              Kashmir EcoWatch is an independent environmental intelligence platform dedicated to understanding, monitoring, and communicating the condition of interconnected ecosystems, water systems, biodiversity networks, environmental hazards, and natural resources associated with the broader Kashmir ecological region.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-8">
              The platform organizes information using environmental, hydrological, ecological, watershed, biodiversity, and landscape-based frameworks. These frameworks are designed to support scientific analysis, environmental monitoring, conservation planning, climate resilience, disaster-risk reduction, ecosystem restoration, and public environmental awareness.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-12">
              Kashmir EcoWatch does not define, interpret, endorse, challenge, or advocate political positions, territorial claims, sovereignty assertions, administrative disputes, or geopolitical viewpoints. The platform's scope classifications exist solely to facilitate environmental understanding across naturally connected landscapes and ecological systems.
            </p>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Why a Regional Environmental Framework Is Necessary</h2>
                <p className="text-slate-300 leading-relaxed">
                  Nature does not recognize administrative or political boundaries.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Rivers flow across jurisdictions. Migratory birds traverse mountain ranges and wetlands regardless of borders. Air quality, biodiversity corridors, glaciers, watersheds, floods, droughts, forest fires, invasive species, and climate-related hazards operate across interconnected landscapes.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Environmental intelligence therefore requires analysis at the scale of ecosystems rather than administrative units alone.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4 font-semibold text-emerald-400">
                  Kashmir EcoWatch adopts a regional ecological framework that enables:
                </p>
                <ul className="list-disc list-outside ml-6 mt-4 space-y-2 text-slate-300">
                  <li>Integrated watershed monitoring</li>
                  <li>Biodiversity corridor assessment</li>
                  <li>Glacier and cryosphere intelligence</li>
                  <li>River basin analysis</li>
                  <li>Wetland conservation planning</li>
                  <li>Environmental hazard monitoring</li>
                  <li>Climate resilience assessment</li>
                  <li>Ecosystem restoration planning</li>
                  <li>Long-term ecological trend analysis</li>
                </ul>
                <p className="text-slate-300 leading-relaxed mt-4">
                  This approach reflects international environmental monitoring practices used by scientific institutions, conservation organizations, and environmental observatories worldwide.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8 mb-12">
              <h2 className="text-3xl font-black text-white mb-6">Scope Classification Framework</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                To organize environmental information consistently, Kashmir EcoWatch uses three operational geographic categories.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3">Kashmir Core</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Kashmir Core represents the primary ecological landscapes traditionally associated with the Kashmir Valley and its immediately connected environmental systems.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">The category includes major:</p>
                  <ul className="list-disc list-outside ml-6 mt-2 space-y-1 text-slate-400 text-base">
                    <li>Lakes and Wetlands</li>
                    <li>Rivers and Springs</li>
                    <li>Forest ecosystems</li>
                    <li>Protected areas</li>
                    <li>Agricultural landscapes</li>
                    <li>Biodiversity habitats</li>
                    <li>Urban environmental systems</li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    This zone forms the central environmental monitoring area of the platform and contains many of the region's most significant freshwater ecosystems, wetlands, biodiversity hotspots, and human-environment interfaces.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    Environmental monitoring within Kashmir Core focuses on water quality, biodiversity, wetland health, forest condition, pollution indicators, urban environmental pressures, climate impacts, and ecosystem restoration.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-bold text-amber-400 mb-3">Trans-Divisional</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Trans-Divisional represents environmentally connected landscapes extending beyond the core valley into adjoining mountain, river-basin, forest, high-altitude, and administrative regions.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">
                    These areas share hydrological, ecological, climatic, biodiversity, and environmental relationships with Kashmir Core and are essential for understanding regional ecosystem dynamics.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">This category may include:</p>
                  <ul className="list-disc list-outside ml-6 mt-2 space-y-1 text-slate-400 text-base">
                    <li>Mountain watersheds</li>
                    <li>Glacier-fed river systems</li>
                    <li>High-altitude ecosystems</li>
                    <li>Forest landscapes</li>
                    <li>Hydropower interfaces</li>
                    <li>Urban environmental systems</li>
                    <li>Protected areas</li>
                    <li>Ecological transition zones</li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    Environmental processes within this category directly influence conditions within Kashmir Core through shared watersheds, climate systems, species movements, and environmental dependencies.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-bold text-sky-400 mb-3">Transboundary / Extended</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Transboundary / Extended represents broader environmental systems that are ecologically connected to the primary study region.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">
                    This category exists because many environmental systems extend beyond a single administrative jurisdiction and require landscape-scale analysis.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-3">Examples include:</p>
                  <ul className="list-disc list-outside ml-6 mt-2 space-y-1 text-slate-400 text-base">
                    <li>Shared river basins</li>
                    <li>High mountain ecosystems</li>
                    <li>Glacier systems</li>
                    <li>Migratory bird flyways</li>
                    <li>Biodiversity corridors</li>
                    <li>Watersheds and wetland networks</li>
                    <li>Environmental hazard pathways</li>
                    <li>Climate-linked ecological systems</li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    The inclusion of these areas supports scientific understanding of regional environmental dynamics and does not imply any political interpretation or position.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8 mb-12">
              <h2 className="text-3xl font-black text-white mb-6">Environmental Systems Covered</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Kashmir EcoWatch integrates intelligence across multiple environmental domains.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Biodiversity</h3>
                  <p className="text-slate-400 text-sm">Monitoring includes Mammals, Birds, Fish, Amphibians, Reptiles, Flora, Medicinal plants, Pollinators, Threatened species, and Species observations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Water Systems</h3>
                  <p className="text-slate-400 text-sm">Monitoring includes Lakes, Wetlands, Rivers, Streams, Springs, Watersheds, Groundwater, Drinking water systems, Water quality, Flood intelligence, and Cryosphere systems.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-500 mb-2">Protected Area Network</h3>
                  <p className="text-slate-400 text-sm">Monitoring includes National parks, Wildlife sanctuaries, Conservation reserves, Wetland reserves, Ramsar-linked systems, Ecological corridors, and Habitat connectivity.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-2">Environmental Monitoring</h3>
                  <p className="text-slate-400 text-sm">Monitoring includes Air quality, Water quality, Waste management, Sewage infrastructure, Land-use change, Ecosystem degradation, Restoration activities, and Environmental health indicators.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">Hazards & Risk</h3>
                  <p className="text-slate-400 text-sm">Monitoring includes Floods, Flash floods, Landslides, Droughts, Extreme weather, Glacier-related hazards, and Environmental vulnerability indicators.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Data Sources</h2>
              <p className="text-slate-300 leading-relaxed">
                Kashmir EcoWatch integrates information from multiple sources, including Government environmental agencies, Scientific institutions, Universities, Research publications, Environmental assessments, Open environmental datasets, Remote sensing products, Satellite observations, Field observations, Citizen science contributions, and International environmental databases.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                All information is evaluated within an environmental intelligence framework designed to improve transparency, comparability, and accessibility.
              </p>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 space-y-8">
              <h2 className="text-2xl font-bold text-white mb-4">Neutrality Statement</h2>
              <p className="text-slate-300 leading-relaxed">
                Kashmir EcoWatch is an environmental and scientific platform.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                All geographic references, maps, environmental classifications, datasets, monitoring systems, and analytical frameworks are presented solely for environmental, scientific, educational, conservation, and public-interest purposes.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                Nothing contained within the platform should be interpreted as expressing, supporting, rejecting, or implying any position regarding sovereignty, territorial claims, political status, boundary disputes, administrative legitimacy, or geopolitical matters.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                Environmental systems frequently transcend administrative boundaries. Kashmir EcoWatch reflects those environmental realities in order to support better scientific understanding, environmental stewardship, and evidence-based decision making.
              </p>
              
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-xl font-bold text-emerald-400 mb-2">Our Guiding Principle</p>
                <p className="text-2xl text-white font-light italic mb-6">"Nature is interconnected. Environmental intelligence should be too."</p>
                <p className="text-slate-300 leading-relaxed">
                  Kashmir EcoWatch exists to help researchers, communities, institutions, policymakers, conservation practitioners, and citizens better understand the ecosystems upon which both people and nature depend, regardless of administrative boundaries, through open, independent, and evidence-based environmental intelligence.
                </p>
              </div>
            </div>

          </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
