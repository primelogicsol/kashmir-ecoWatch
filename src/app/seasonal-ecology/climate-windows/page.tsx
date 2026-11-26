import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sun, AlertTriangle, CloudSun, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ClimateWindowsPage() {
  const windows = getSeasonalEcologyData.climateWindows.all();

  const districts = Array.from(new Set(windows.flatMap(c => c.districts).filter(Boolean)));
  const windowTypes = Array.from(new Set(windows.map(c => c.windowType).filter(Boolean)));

  return (
    <div className="min-h-screen mx-auto bg-slate-950">
      <SeasonalListingPage
        title="Western Himalayan Climate Windows"
        subtitle="Traditional Kashmiri bioclimatic epochs: Chillai Kalan freeze, Mediterranean snow pulses, and vernal thaw regimes"
        icon="Sun"
        color="from-yellow-500 to-amber-600"
        entities={windows}
        entityVariant="climate"
        metrics={[
          { label: 'Climate Windows', value: windows.length, icon: 'Sun' as const },
          { label: 'Deep Freeze Epochs', value: windows.filter(c => c.windowType.includes('winter')).length, icon: 'Snowflake' as const },
          { label: 'Thaw & Access', value: windows.filter(c => c.windowType.includes('spring') || c.windowType.includes('access')).length, icon: 'Route' as const },
          { label: 'Atmospheric Inversions', value: windows.filter(c => c.windowType.includes('autumn')).length, icon: 'Eye' as const },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
          seasons: ['spring', 'summer', 'autumn', 'winter'],
          additionalFilters: [
            { label: 'Window Epoch', options: windowTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/climate-windows"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
      />

      {/* Cross-Link Intelligence Cards */}
      <div className="container mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/risk-monitoring">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                      Hazard Intelligence
                    </Badge>
              </div>
              <h4 className="kew-card-title">Multi-Hazard Risk Monitoring</h4>
              <p className="kew-card-desc">Live flood gauges, real-time SASE avalanche bulletins, landslide corridor risk models, and wildfire telemetry.</p>
              <div className="kew-card-cta">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/environmental-monitoring">
            <div className="kew-card-shell kew-card-shell--interactive group h-full">
              <div className="kew-card-top-row">
                <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                  <CloudSun className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                      Environmental Telemetry
                    </Badge>
              </div>
              <h4 className="kew-card-title">Air Quality & Weather Telemetry</h4>
              <p className="kew-card-desc">Real-time AQI readings, diurnal temperature variations, and automated meteorological station tracking.</p>
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
