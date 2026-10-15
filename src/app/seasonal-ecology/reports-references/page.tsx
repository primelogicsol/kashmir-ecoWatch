import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ReportsReferencesPage() {
  const reports = getSeasonalEcologyData.reports.all();

  const districts = Array.from(new Set(reports.flatMap(r => r.linkedDistricts).filter(Boolean)));
  const reportTypes = Array.from(new Set(reports.map(r => r.reportType).filter(Boolean)));
  const seasonalFocus = Array.from(new Set(reports.flatMap(r => r.seasonalFocus).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Reports &amp; Research References"
        subtitle="Peer-reviewed ecological studies, waterbird census archives, forestry working plans, and phenological monitoring reports"
        icon="FileText"
        color="from-slate-500 to-gray-600"
        entities={reports}
        entityVariant="report"
        metrics={[
          { label: 'Published Reports', value: reports.length, icon: 'FileText' as const },
          { label: 'Scientific Studies', value: reports.filter(r => r.reportType === 'scientific-study').length, icon: 'BookOpen' as const },
          { label: 'Monitoring Reports', value: reports.filter(r => r.reportType === 'monitoring-report').length, icon: 'ClipboardList' as const },
          { label: 'Climate Assessments', value: reports.filter(r => r.reportType === 'climate-assessment').length, icon: 'ChartBar' as const },
        ]}
        filters={{
          districts: districts as string[],
          seasons: seasonalFocus as string[],
          additionalFilters: [
            { label: 'Report Type', options: reportTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/reports-references"
        mapPreviewEnabled={false}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/open-data">
            <Card className="glass-intense border-slate-500/30 hover:border-slate-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center shrink-0 shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-slate-500/50 text-slate-400 mb-1">
                      Open Data Access
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors truncate">
                      Kashmir EcoWatch Open Data Portal
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Download raw observation datasets in GeoJSON, CSV, and JSON formats for academic and conservation research.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/about/methodology">
            <Card className="glass-intense border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 mb-1">
                      Scientific Rigor
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Data Validation & Methodology
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Multi-tier expert review protocols, satellite validation thresholds, and species taxonomic integrity standards.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
