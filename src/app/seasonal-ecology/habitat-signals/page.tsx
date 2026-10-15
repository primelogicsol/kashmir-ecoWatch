import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Radar, Trees, Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HabitatSignalsPage() {
  const signals = getSeasonalEcologyData.habitatSignals.all();

  const districts = Array.from(new Set(signals.flatMap(h => h.districts).filter(Boolean)));
  const signalTypes = Array.from(new Set(signals.map(h => h.signalType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Habitat Signals"
        subtitle="Wetland water pulses, forest canopy green-up, alpine snow retreat, and ecotone shift dynamics across Kashmir"
        icon="Radar"
        color="from-green-500 to-emerald-600"
        entities={signals}
        entityVariant="habitat"
        metrics={[
          { label: 'Habitat Signals', value: signals.length, icon: 'Radar' as const },
          { label: 'Wetland Signals', value: signals.filter(h => h.signalType.includes('wetland')).length, icon: 'Waves' as const },
          { label: 'Forest Ecotones', value: signals.filter(h => h.signalType.includes('forest')).length, icon: 'Trees' as const },
          { label: 'Alpine & Snow Signals', value: signals.filter(h => h.elevationZone === 'alpine' || h.elevationZone === 'nival').length, icon: 'Mountain' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine', 'nival'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Signal Type', options: signalTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/habitat-signals"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.1800, lng: 74.7500, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/biodiversity/habitat-signals">
            <Card className="glass-intense border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Radar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 mb-1">
                      Sentinel Telemetry
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      Biodiversity Habitat Signals Monitor
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Satellite NDVI trends, vegetation moisture indices, and subalpine ecotone migration benchmarks.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/biodiversity/forest-ecosystems">
            <Card className="glass-intense border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden h-full">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Trees className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 mb-1">
                      Canopy Architecture
                    </Badge>
                    <h4 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                      Kashmir Forest Ecosystems
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Explore deodar, blue pine, silver fir, and subalpine birch stands across northern and southern forest divisions.
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
