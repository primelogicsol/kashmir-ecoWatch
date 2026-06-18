'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { FilterBar } from '@/components/field-reports/FilterBar';
import { SummaryStrip } from '@/components/field-reports/SummaryStrip';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FileText, BookOpen, Link2, Shield, Database, AlertTriangle, BarChart3, MapPin, Calendar, PawPrint, Droplets, Flame, FlaskConical, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  fieldReportsRegistry, getFieldReportStats, getAllDistricts, getAllModules, getAllSources, getAllYears
} from '@/data/field-reports-registry';
import { FieldReport } from '@/types';
import { Heading } from '@/components/common/Heading';

import { GlobalFilterBar } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

const KASHMIR_CORE = ['Srinagar', 'Ganderbal', 'Budgam', 'Anantnag', 'Kulgam', 'Pulwama', 'Shopian', 'Bandipora', 'Baramulla'];
const TRANS_DIV = ['Ramban', 'Reasi', 'Poonch', 'Rajouri', 'Doda', 'Kishtwar', 'Udhampur', 'Jammu', 'Kathua', 'Samba'];
const TRANSBOUNDARY = ['AJK', 'Neelum', 'Muzaffarabad', 'Mirpur', 'Gilgit', 'Baltistan', 'Skardu', 'Leh', 'Kargil'];

function getReportScope(districts: string[]) {
  if (districts.some(d => KASHMIR_CORE.includes(d))) return 'Kashmir Core';
  if (districts.some(d => TRANS_DIV.includes(d))) return 'Trans-Divisional';
  if (districts.some(d => TRANSBOUNDARY.includes(d))) return 'Transboundary / Extended';
  return 'Kashmir Core'; // Default fallback
}

export default function FieldReportsPage() {
  const stats = getFieldReportStats();
  const { filter: globalFilter } = useGlobalFilter();
  const [localFilteredReports, setLocalFilteredReports] = useState<FieldReport[]>(
    [...fieldReportsRegistry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const filteredReports = useMemo(() => {
    return localFilteredReports.filter(report => {
      // Apply Global Scope Filter
      const reportScope = getReportScope(report.districts);
      if (globalFilter.scope !== 'All' && reportScope !== globalFilter.scope) return false;
      
      // Apply Global District Filter
      if (globalFilter.district !== 'All' && !report.districts.includes(globalFilter.district)) return false;

      return true;
    });
  }, [localFilteredReports, globalFilter.scope, globalFilter.district]);

  const handleFilterChange = (filtered: FieldReport[]) => {
    setLocalFilteredReports(filtered);
  };

  const districts = getAllDistricts();
  const modules = getAllModules();
  const sources = getAllSources();
  const years = getAllYears();

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          <>
            <span className="block whitespace-nowrap">Western Himalayan</span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Field Intelligence Reports</span>
          </>
        }
        subtitle="Field reports, survey findings, technical assessments, and monitoring bulletins supporting environmental intelligence across Kashmir. These documents feed evidence layers, district profiles, alerts, and module intelligence throughout the platform."
        icon={<FileText className="w-6 h-6 text-emerald-400" />}
      />

      {/* Summary Strip */}
      <SummaryStrip stats={stats} />

      {/* Quick Navigation to Report Types */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Browse by Report Type</h2>
                <p className="text-sm text-slate-500">Dedicated pages with detailed data for each intelligence category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Protected Areas */}
              <a href="/field-reports/protected-areas" className="group">
                <Card className="glass-intense border-emerald-500/10 p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Protected Areas</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Field intelligence from National Parks, Wildlife Sanctuaries, and Conservation Reserves. Anti-poaching patrols, habitat assessments, and corridor tracking.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </a>

              {/* Biodiversity */}
              <a href="/field-reports/biodiversity" className="group">
                <Card className="glass-intense border-purple-500/10 p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <PawPrint className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Biodiversity</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Species population censuses, avian migration tracking, phenology records, and flora conservation surveys.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </a>

              {/* Water Systems */}
              <a href="/field-reports/water-systems" className="group">
                <Card className="glass-intense border-blue-500/10 p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Water Systems</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Water quality testing, lake trophic status monitoring, river discharge data, and groundwater recharge field studies.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </a>

              {/* Environmental Monitoring */}
              <a href="/field-reports/environmental-monitoring" className="group">
                <Card className="glass-intense border-cyan-500/10 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Environmental Monitoring</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Air pollution indices, solid and bio-waste tracking, and sewage outfall field measurements.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </a>

              {/* Hazard Intelligence */}
              <a href="/field-reports/hazard-intelligence" className="group">
                <Card className="glass-intense border-red-500/10 p-6 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Hazard Intelligence</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Avalanche exposure logs, landslide geotechnical assessments, GLOF monitoring, and flood vulnerability reports.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </a>

              {/* All Reports */}
              <Card className="glass-intense border-amber-500/20 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 ring-2 ring-amber-500/50">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">All Reports (Current View)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Comprehensive view of all field intelligence reports with filtering by module, district, year, and source below.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Scope & District Filters */}
      <div className="container mx-auto px-6 mt-8 relative z-40">
        <GlobalFilterBar 
          scopes={['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended']}
          districts={districts}
        />
      </div>

      {/* Local Filter Bar (Year, Module, Type, etc.) */}
      <FilterBar
        reports={fieldReportsRegistry}
        years={years}
        districts={districts}
        modules={modules}
        sources={sources}
        onFilterChange={handleFilterChange}
      />

      {/* Reports Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Reports
              <span className="ml-3 text-sm font-normal text-slate-500">
                {filteredReports.length} of {fieldReportsRegistry.length}
              </span>
            </h2>
          </div>

          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReports.map((report, i) => (
                <ReportCard key={report.id} report={report} index={i} />
              ))}
            </div>
          ) : (
            <Card className="glass-intense border-white/10 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No reports match your filters</h3>
              <p className="text-slate-400">Try adjusting your filter criteria or clear all filters</p>
            </Card>
          )}
        </div>
      </section>

      {/* How Field Reports Support the Platform */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">How Field Reports Support the Platform</h2>
            </div>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Field reports, surveys, technical assessments, and monitoring bulletins may support evidence layers, district profiles, 
              module intelligence, alerts, risk interpretation, and library collections depending on type, relevance, and review status.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Library Collections</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Monthly bulletins, annual summaries, and technical reports are catalogued in the Library with tagging, 
                      cross-references, and searchability for researchers and analysts.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Monitoring Overview</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Field reports feed the Monitoring Overview with verified observations, trend data, and longitudinal 
                      assessments across air quality, water systems, and biodiversity indicators.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Risk Updates & Alerts</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Risk assessments and fire season reports directly inform the Alerts & Advisories system, 
                      triggering early warnings and mitigation recommendations for vulnerable districts.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">District Profiles</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      District-specific reports build localized environmental intelligence profiles, enabling 
                      targeted conservation efforts and resource management at the district level.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Module Intelligence</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Wildlife surveys feed Biodiversity modules, wetland assessments feed Water Systems, 
                      and fire risk reports feed Risk & Monitoring—creating interconnected intelligence layers.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Evidence & Verification</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      All reports undergo review and verification processes. Status labels indicate confidence levels, 
                      supporting transparent and traceable environmental intelligence.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      
    </main>
  );
}
