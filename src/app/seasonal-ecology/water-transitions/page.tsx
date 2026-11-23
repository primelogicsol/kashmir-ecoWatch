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
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                      Hydrology Core
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Water Systems Hub</h4>
              <p className="kew-card-desc">River discharge gauges, lake surface areas, catchment health metrics, and water quality telemetry across Jhelum basin.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/water-systems/fisheries">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <Fish className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      Ichthyological Telemetry
                    </Badge>
              </div>
              <h4 className="kew-card-title">Kashmir Fisheries & Spawning Windows</h4>
              <p className="kew-card-desc">Schizothorax snow trout seasonal migrations, cold-water trout hatcheries, and aquatic spawning stream protection.</p>
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
