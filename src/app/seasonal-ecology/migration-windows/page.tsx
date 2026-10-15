import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bird, Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MigrationWindowsPage() {
  const migrations = getSeasonalEcologyData.migration.all();

  const districts = Array.from(new Set(migrations.map(m => m.district).filter(Boolean)));
  const wetlandTypes = Array.from(new Set(migrations.map(m => m.wetlandType).filter(Boolean)));
  const migrationTypes = Array.from(new Set(migrations.map(m => m.migrationType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Migration Windows &amp; Avian Flyways"
        subtitle="Flyway timing, wetland waterfowl stopovers, and raptor corridors across Kashmir"
        icon="Bird"
        color="from-sky-500 to-blue-600"
        entities={migrations}
        entityVariant="migration"
        metrics={[
          { label: 'Migration Windows', value: migrations.length, icon: 'Bird' },
          { label: 'Wetland Complexes', value: migrations.filter(m => m.wetlandType === 'wetland-complex' || m.wetlandType === 'lake').length, icon: 'Waves' },
          { label: 'Wintering Sites', value: migrations.filter(m => m.migrationType === 'wintering').length, icon: 'Calendar' },
          { label: 'Flyway Avifauna', value: '450K+', icon: 'Users' },
        ]}
        filters={{
          districts: districts as string[],
          seasons: ['autumn', 'winter', 'spring', 'summer'],
          additionalFilters: [
            { label: 'Habitat Type', options: wetlandTypes as string[] },
            { label: 'Migration Pattern', options: migrationTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/migration-windows"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.1833, lng: 74.8167, zoom: 10 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/birds">
            <Card className="glass-intense border-sky-500/30 hover:border-sky-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Bird className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-sky-500/50 text-sky-400 mb-1">
                      Avian Taxonomy
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                      Kashmir Avian Biodiversity Hub
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Comprehensive species profiles, breeding statuses, and live eBird field records across all 10 districts.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/water-systems">
            <Card className="glass-intense border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Waves className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 mb-1">
                      Hydrological Sanctuaries
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                      Ramsar Wetlands & Water Basins
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Water depth gauges, siltation monitoring, and catchment basin telemetry for Hokersar, Wular, and Hygam.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
