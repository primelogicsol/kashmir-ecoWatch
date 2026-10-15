import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, Waves, Fish, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WaterTransitionsPage() {
  const transitions = getSeasonalEcologyData.waterTransitions.all();

  const districts = Array.from(new Set(transitions.map(w => w.district).filter(Boolean)));
  const waterbodyTypes = Array.from(new Set(transitions.map(w => w.waterbodyType).filter(Boolean)));
  const transitionTypes = Array.from(new Set(transitions.map(w => w.transitionType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Water Transitions"
        subtitle="Snowmelt flood pulses, summer lake thermoclines, autumn low-flow stages, and winter ice freezes across Kashmir"
        icon="Droplets"
        color="from-cyan-500 to-blue-600"
        entities={transitions}
        entityVariant="water"
        metrics={[
          { label: 'Water Transitions', value: transitions.length, icon: 'Droplets' as const },
          { label: 'River Surges', value: transitions.filter(w => w.waterbodyType === 'river').length, icon: 'Waves' as const },
          { label: 'Wetland Dynamics', value: transitions.filter(w => w.waterbodyType === 'wetland').length, icon: 'Waves' as const },
          { label: 'Lakes & Tarns', value: transitions.filter(w => w.waterbodyType === 'lake').length, icon: 'CircleDot' as const },
        ]}
        filters={{
          districts: districts as string[],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Waterbody Type', options: waterbodyTypes as string[] },
            { label: 'Transition Pattern', options: transitionTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/water-transitions"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/water-systems">
            <Card className="glass-intense border-cyan-500/30 hover:border-cyan-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 mb-1">
                      Hydrology Core
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                      Kashmir Water Systems Hub
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      River discharge gauges, lake surface areas, catchment health metrics, and water quality telemetry across Jhelum basin.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/water-systems/fisheries">
            <Card className="glass-intense border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Fish className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 mb-1">
                      Ichthyological Telemetry
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                      Kashmir Fisheries & Spawning Windows
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Schizothorax snow trout seasonal migrations, cold-water trout hatcheries, and aquatic spawning stream protection.
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
