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
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-slate-500/50 text-slate-400">
                      Open Data Access
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir EcoWatch Open Data Portal</h4>
              <p className="kew-card-desc">Download raw observation datasets in GeoJSON, CSV, and JSON formats for academic and conservation research.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/about/methodology">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                      Scientific Rigor
                    </Badge>
              </div>
              <h4 className="kew-card-title">Data Validation & Methodology</h4>
              <p className="kew-card-desc">Multi-tier expert review protocols, satellite validation thresholds, and species taxonomic integrity standards.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
