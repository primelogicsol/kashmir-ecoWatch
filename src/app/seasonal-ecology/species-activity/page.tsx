import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PawPrint, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SpeciesActivityPage() {
  const activities = getSeasonalEcologyData.speciesActivity.all();

  const districts = Array.from(new Set(activities.flatMap(s => s.districts).filter(Boolean)));
  const taxonomicGroups = Array.from(new Set(activities.map(s => s.taxonomicGroup).filter(Boolean)));
  const activityTypes = Array.from(new Set(activities.map(s => s.activityType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Species Activity"
        subtitle="Ungulate altitudinal migrations, carnivore foraging shifts, avian breeding pulses, and cold-season torpor across Kashmir"
        icon="PawPrint"
        color="from-rose-500 to-red-600"
        entities={activities}
        entityVariant="species"
        metrics={[
          { label: 'Species Behaviors', value: activities.length, icon: 'PawPrint' as const },
          { label: 'Mammalian Ethology', value: activities.filter(s => s.taxonomicGroup === 'mammals').length, icon: 'PawPrint' as const },
          { label: 'Avian Activity', value: activities.filter(s => s.taxonomicGroup === 'birds').length, icon: 'Bird' as const },
          { label: 'Floral Activity', value: activities.filter(s => s.taxonomicGroup === 'plants').length, icon: 'Flower2' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Taxonomic Group', options: taxonomicGroups as string[] },
            { label: 'Behavioral Pattern', options: activityTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/species-activity"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.1167, lng: 75.0333, zoom: 10 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/wildlife-sightings">
            <Card className="glass-intense border-rose-500/30 hover:border-rose-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-rose-500/50 text-rose-400 mb-1">
                      Field Observation
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors truncate">
                      Kashmir Wildlife Sightings Stream
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Verified naturalist encounter logs, GPS sighting points, and seasonal camera trap photos across all 10 districts.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/biodiversity/mammals">
            <Card className="glass-intense border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
                    <PawPrint className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-amber-500/50 text-amber-400 mb-1">
                      Faunal Profiles
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      Mammals of the Western Himalaya
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Deep species profiles for Hangul, Snow Leopard, Markhor, Himalayan Brown Bear, and Kashmir Musk Deer.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
