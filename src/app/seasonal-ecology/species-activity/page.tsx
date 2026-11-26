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
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/wildlife-sightings">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Eye className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-rose-500/50 text-rose-400">
                      Field Observation
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Wildlife Sightings Stream</h4>
              <p className="kew-card-desc">Verified naturalist encounter logs, GPS sighting points, and seasonal camera trap photos across all 10 districts.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/biodiversity/mammals">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <PawPrint className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                      Faunal Profiles
                    </Badge>
              </div>
              <h4 className="kew-card-title">Mammals of the Western Himalaya</h4>
              <p className="kew-card-desc">Deep species profiles for Hangul, Snow Leopard, Markhor, Himalayan Brown Bear, and Kashmir Musk Deer.</p>
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
