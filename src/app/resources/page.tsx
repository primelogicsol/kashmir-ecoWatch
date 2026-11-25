import { buildPageMetadata } from '@/lib/seo/route-metadata';
import React from 'react';
import Link from 'next/link';
import { 
  Award, Scale, FileText, Database, Satellite, 
  GraduationCap, Eye, Droplets, Compass, 
  ArrowUpRight, ShieldCheck, CheckCircle2, BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export const metadata = buildPageMetadata({
  title: 'Environmental Resources & Statutory Archives',
  description: 'Authoritative environmental registries, judicial compliance archives, SEIAE scientific reports, and geospatial intelligence across Jammu, Kashmir, Ladakh, AJ&K, and Gilgit-Baltistan.',
  canonicalPath: '/resources',
});

interface ResourceModule {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: string;
  statLabel: string;
}

const RESOURCE_MODULES: ResourceModule[] = [
  {
    id: 'green-heroes',
    title: 'KEW Green Heroes & Contributors Registry',
    category: 'Biographical & Ecological Stewardship',
    badge: 'Verified Archive',
    description: 'Comprehensive registry of scientists, advocates, journalists, grassroots guardians, martyrs, and historical figures who defended Western Himalayan ecosystems.',
    href: '/resources/kew-green-heroes',
    icon: Award,
    stats: '317+',
    statLabel: 'Documented Contributor Profiles'
  },
  {
    id: 'environmental-pil',
    title: 'Environmental PIL & Judicial Compliance Tracker',
    category: 'Statutory Jurisprudence',
    badge: 'Judicial Registry',
    description: 'Landmark public-interest litigations, court orders, tribunal mandates, and independent field compliance audits for Western Himalayan rivers and wetlands.',
    href: '/resources/environmental-pil',
    icon: Scale,
    stats: '150+',
    statLabel: 'Audited Orders & Decrees'
  },
  {
    id: 'scientific-reports',
    title: 'SEIAE Scientific Reports & Research Archive',
    category: 'Empirical Evidence',
    badge: 'Peer-Reviewed & Statutory',
    description: 'Sectoral environmental assessments, baseline limnological studies, carbon emission inventories, and satellite-verified change detection datasets.',
    href: '/earth-human-impact/scientific-reports',
    icon: FileText,
    stats: '1,420+',
    statLabel: 'Indexed Scientific Documents'
  },
  {
    id: 'open-data',
    title: 'Open Environmental Data Catalog',
    category: 'Open Science Data Infrastructure',
    badge: 'Public Domain',
    description: 'FAIR-compliant environmental datasets: air quality telemetry, water quality indices, forest cover metrics, and biodiversity occurrence records.',
    href: '/open-data',
    icon: Database,
    stats: '18',
    statLabel: 'Standardized Spatial Datasets'
  },
  {
    id: 'change-detection',
    title: 'Spatial Change Detection Observatory',
    category: 'Satellite Remote Sensing',
    badge: 'Sentinel & Landsat',
    description: 'Multi-spectral satellite monitoring tracking glacier recession, wetland encroachment, shoreline retreats, and forest fragmentation from 1984 to 2026.',
    href: '/earth-human-impact/change-detection-observatory',
    icon: Satellite,
    stats: '42 Years',
    statLabel: 'Time-Series Observation Ledger'
  },
  {
    id: 'outdoor-classroom',
    title: 'Himalayan Outdoor Classroom & Curriculum',
    category: 'Environmental Education',
    badge: 'Institutional Curriculum',
    description: 'Standardized outdoor learning modules, student observation worksheets, and field quadrat methodologies for mountain and wetland conservation.',
    href: '/environmental-calendar/outdoor-classroom',
    icon: GraduationCap,
    stats: '24',
    statLabel: 'Fieldwork Lesson Units'
  },
  {
    id: 'citizen-science',
    title: 'Citizen Science & Field Verification Hub',
    category: 'Participatory Stewardship',
    badge: 'Community Telemetry',
    description: 'Crowdsourced geotagged observations, wildlife sightings, illegal dumping alerts, and community environmental monitoring across five regions.',
    href: '/citizen-science',
    icon: Eye,
    stats: '5,800+',
    statLabel: 'Verified Citizen Observations'
  },
  {
    id: 'water-systems',
    title: 'Water Systems & Hydrological Observatory',
    category: 'Cryospheric & Freshwater Systems',
    badge: 'NWIA Compliant',
    description: 'Hydrological baselines, water quality telemetry, spring revitalization records, and wetland health profiles for the Jhelum, Indus, and Tawi basins.',
    href: '/water-systems',
    icon: Droplets,
    stats: '1,200+',
    statLabel: 'Catalogued Water Bodies'
  },
  {
    id: 'sectoral-eia',
    title: 'Sectoral Environmental Impact Assessments',
    category: 'Regulatory Analytics',
    badge: 'Statutory Safeguards',
    description: 'Cumulative ecological impact assessments for tourism, agriculture, horticulture, and infrastructure across fragile Western Himalayan ecosystems.',
    href: '/sectoral-eia',
    icon: Compass,
    stats: '4 Sectors',
    statLabel: 'Multi-Criteria Impact Frameworks'
  }
];

export default function ResourcesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header Banner */}
      <section className="border-b border-slate-800 bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Kashmir EcoWatch · Central Environmental Intelligence Portal</span>
          </div>
          <div className="mb-2.5 sm:mb-3"><KewBrandIdentity variant="eyebrow" /></div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Environmental Resources &amp; Statutory Archives
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            The permanent repository of evidentiary environmental records for the Western Himalayas. 
            Access peer-reviewed research, judicial compliance audits, satellite observatories, 
            and verified contributor dossiers across Kashmir Valley, Jammu, Ladakh, AJ&amp;K, and Gilgit-Baltistan.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Evidence-Grounded Standard</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-slate-900 text-slate-300 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Five-Region Geographic Neutrality</span>
            </span>
            <span className="font-mono text-slate-500">
              Audited: November 22, 2026
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCE_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card 
                key={mod.id} 
                className="kew-card-shell p-6 group"
              >
                <div className="kew-card-top-row">
                  <span className="kew-card-icon-box bg-slate-950 border-slate-800 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    {mod.badge}
                  </span>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {mod.category}
                </span>
                <h3 className="kew-card-title text-base group-hover:text-emerald-400 transition-colors mb-2">
                  {mod.title}
                </h3>

                <div className="kew-card-kpi mb-3">
                  <span className="kew-card-kpi-value text-lg">{mod.stats}</span>
                  <span className="kew-card-kpi-unit">{mod.statLabel}</span>
                </div>

                <p className="kew-card-desc text-xs mb-5">
                  {mod.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400">Statutory Archive</span>
                  <Link
                    href={mod.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-sm"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
