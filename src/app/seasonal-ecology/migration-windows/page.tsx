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
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Bird className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-sky-500/50 text-sky-400">
                      Avian Taxonomy
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Avian Biodiversity Hub</h4>
              <p className="kew-card-desc">Comprehensive species profiles, breeding statuses, and live eBird field records across all 10 districts.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/water-systems">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Waves className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      Hydrological Sanctuaries
                    </Badge>
              </div>
              <h4 className="kew-card-title">Ramsar Wetlands & Water Basins</h4>
              <p className="kew-card-desc">Water depth gauges, siltation monitoring, and catchment basin telemetry for Hokersar, Wular, and Hygam.</p>
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
