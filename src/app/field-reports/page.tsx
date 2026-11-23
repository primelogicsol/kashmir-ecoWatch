'use client';

import React, { useState, useMemo } from 'react';
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
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

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
            <KewBrandIdentity />
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
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Browse by Report Type</h2>
                <p className="text-sm text-slate-500">Dedicated pages with detailed data for each intelligence category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {/* Protected Areas */}
              <a href="/field-reports/protected-areas" className="group block h-full min-w-0 no-underline">
                <div className="kew-card-shell kew-card-shell--interactive h-full border-emerald-500/15 hover:border-emerald-500/40">
                  <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="kew-card-title">Protected Areas</h3>
                  <p className="kew-card-desc">
                    Field intelligence from National Parks, Wildlife Sanctuaries, and Conservation Reserves. Anti-poaching patrols, habitat assessments, and corridor tracking.
                  </p>
                  <div className="kew-card-cta">
                    <span>Browse Reports</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Biodiversity */}
              <a href="/field-reports/biodiversity" className="group block h-full min-w-0 no-underline">
                <div className="kew-card-shell kew-card-shell--interactive h-full border-purple-500/15 hover:border-purple-500/40">
                  <div className="kew-card-icon-box bg-purple-500/15 border-purple-500/30 text-purple-400">
                    <PawPrint className="w-5 h-5" />
                  </div>
                  <h3 className="kew-card-title">Biodiversity</h3>
                  <p className="kew-card-desc">
                    Species population censuses, avian migration tracking, phenology records, and flora conservation surveys.
                  </p>
                  <div className="kew-card-cta">
                    <span>Browse Reports</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Water Systems */}
              <a href="/field-reports/water-systems" className="group block h-full min-w-0 no-underline">
                <div className="kew-card-shell kew-card-shell--interactive h-full border-blue-500/15 hover:border-blue-500/40">
                  <div className="kew-card-icon-box bg-blue-500/15 border-blue-500/30 text-blue-400">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h3 className="kew-card-title">Water Systems</h3>
                  <p className="kew-card-desc">
                    Water quality testing, lake trophic status monitoring, river discharge data, and groundwater recharge field studies.
                  </p>
                  <div className="kew-card-cta">
                    <span>Browse Reports</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Environmental Monitoring */}
              <a href="/field-reports/environmental-monitoring" className="group block h-full min-w-0 no-underline">
                <div className="kew-card-shell kew-card-shell--interactive h-full border-cyan-500/15 hover:border-cyan-500/40">
                  <div className="kew-card-icon-box bg-cyan-500/15 border-cyan-500/30 text-cyan-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="kew-card-title">Environmental Monitoring</h3>
                  <p className="kew-card-desc">
                    Air pollution indices, solid and bio-waste tracking, and sewage outfall field measurements.
                  </p>
                  <div className="kew-card-cta">
                    <span>Browse Reports</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Hazard Intelligence */}
              <a href="/field-reports/hazard-intelligence" className="group block h-full min-w-0 no-underline">
                <div className="kew-card-shell kew-card-shell--interactive h-full border-red-500/15 hover:border-red-500/40">
                  <div className="kew-card-icon-box bg-red-500/15 border-red-500/30 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="kew-card-title">Hazard Intelligence</h3>
                  <p className="kew-card-desc">
                    Avalanche exposure logs, landslide geotechnical assessments, GLOF monitoring, and flood vulnerability reports.
                  </p>
                  <div className="kew-card-cta">
                    <span>Browse Reports</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* All Reports */}
              <div className="kew-card-shell kew-card-shell--selected h-full">
                <div className="kew-card-icon-box bg-amber-500/15 border-amber-500/30 text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">All Reports (Current View)</h3>
                <p className="kew-card-desc">
                  Comprehensive view of all field intelligence reports with filtering by module, district, year, and source below.
                </p>
              </div>
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
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">How Field Reports Support the Platform</h2>
            </div>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Field reports, surveys, technical assessments, and monitoring bulletins may support evidence layers, district profiles, 
              module intelligence, alerts, risk interpretation, and library collections depending on type, relevance, and review status.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">Library Collections</h3>
                <p className="kew-card-desc">
                  Monthly bulletins, annual summaries, and technical reports are catalogued in the Library with tagging, cross-references, and searchability for researchers and analysts.
                </p>
              </div>

              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-sky-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">Monitoring Overview</h3>
                <p className="kew-card-desc">
                  Field reports feed the Monitoring Overview with verified observations, trend data, and longitudinal assessments across air quality, water systems, and biodiversity indicators.
                </p>
              </div>

              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">Risk Updates &amp; Alerts</h3>
                <p className="kew-card-desc">
                  Risk assessments and fire season reports directly inform the Alerts &amp; Advisories system, triggering early warnings and mitigation recommendations for vulnerable districts.
                </p>
              </div>

              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">District Profiles</h3>
                <p className="kew-card-desc">
                  District-specific reports build localized environmental intelligence profiles, enabling targeted conservation efforts and resource management at the district level.
                </p>
              </div>

              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">Module Intelligence</h3>
                <p className="kew-card-desc">
                  Wildlife surveys feed Biodiversity modules, wetland assessments feed Water Systems, and fire risk reports feed Risk &amp; Monitoring—creating interconnected intelligence layers.
                </p>
              </div>

              <div className="kew-card-shell h-full">
                <div className="kew-card-icon-box bg-slate-800 border-white/10 text-teal-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="kew-card-title">Evidence &amp; Verification</h3>
                <p className="kew-card-desc">
                  All reports undergo review and verification processes. Status labels indicate confidence levels, supporting transparent and traceable environmental intelligence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      
    </main>
  );
}
