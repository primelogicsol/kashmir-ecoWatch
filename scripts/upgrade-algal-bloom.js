const fs = require('fs');

let page = fs.readFileSync('src/app/water-systems/algal-bloom-intelligence/page.tsx', 'utf8');

const headingImport = `import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';\n`;
page = page.replace(`import { useRouter } from 'next/navigation';`, `import { useRouter } from 'next/navigation';\n${headingImport}`);

const heroRegex = /<section className=\"relative pt-20.*?<\/section>/s;
const newHero = `<Heading
        title={<><span className=\"block whitespace-nowrap\">Algal Bloom</span><span className=\"block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent\">Intelligence</span></>}
        subtitle=\"Eutrophication-prone wetland monitoring, bloom alerts, seasonality tracking, risk-level assessment, and aquatic vulnerability intelligence for Kashmir lake systems.\"
        icon={<Waves className=\"w-6 h-6 text-emerald-400\" />}
        label=\"Bloom Intelligence\"
        images={['/images/protected-network.png']}
        gridOverlay
        actions={
          <>
            <a href=\"/water-systems\">
              <Button size=\"lg\" className=\"bg-gradient-to-r from-emerald-600 to-emerald-500\">
                <Map className=\"w-5 h-5 mr-2\" />
                Open Bloom Map
              </Button>
            </a>
            <a href=\"/water-systems/water-quality\">
              <Button size=\"lg\" variant=\"outline\" className=\"border-white/20 text-white\">
                <Droplets className=\"w-5 h-5 mr-2\" />
                Water Quality
              </Button>
            </a>
          </>
        }
      />`;
page = page.replace(heroRegex, newHero);

const metricsRegex = /{\/\* Metrics Ribbon \*\/}.*?<\/section>/s;
const newMetrics = `{/* Metrics Ribbon */}
      <div className=\"relative z-20 -mt-8\">
        <LiveMetricsBar metrics={[
          { label: 'Waterbodies Monitored', value: 23, icon: 'MapPin' },
          { label: 'Active Blooms', value: 4, icon: 'AlertTriangle' },
          { label: 'High Risk Sites', value: 8, icon: 'Shield' },
          { label: 'Max Coverage', value: '55%', icon: 'Activity' },
          { label: 'Monitoring Status', value: '24/7', icon: 'Eye' },
          { label: 'Critical Zones', value: 2, icon: 'Target' },
          { label: 'Alerts Issued', value: 14, icon: 'Info' },
          { label: 'Ground Stations', value: 12, icon: 'BarChart3' }
        ]} />
      </div>`;
page = page.replace(metricsRegex, newMetrics);

const filterRegex = /{\/\* Filter Row \*\/}.*?<\/section>/s;
const newFilterRow = `{/* Tab + Filters — single row */}
      <div className=\"container mx-auto px-6 mt-6 mb-12\">
        <div className=\"flex flex-wrap items-center justify-between gap-3\">
          {/* Tabs */}
          <div className=\"flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl\">
            <button className=\"px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow\">
              Active Blooms
            </button>
            <button className=\"px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap text-slate-400 hover:text-white hover:bg-white/5\">
              Developing
            </button>
            <button className=\"px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap text-slate-400 hover:text-white hover:bg-white/5\">
              Monitoring
            </button>
          </div>

          {/* Active tab description */}
          <span className=\"text-xs text-slate-500 hidden lg:block flex-1 px-4 truncate\">
            Current status of algal bloom coverage — 4 active blooms
          </span>

          {/* Filters + count + view toggle */}
          <div className=\"flex items-center gap-3 ml-auto\">
            <Button variant=\"outline\" className=\"border-white/20 text-white\">
              <Filter className=\"w-4 h-4 mr-2\" /> Filters
            </Button>
            <span className=\"text-sm text-slate-400 whitespace-nowrap\">
              <strong className=\"text-white\">23</strong> of <strong className=\"text-white\">23</strong> waterbodies
            </span>
            <div className=\"flex items-center gap-1\">
              <Button variant=\"ghost\" size=\"sm\" className=\"bg-emerald-500/20 text-emerald-400\">
                <Layers className=\"w-4 h-4\" />
              </Button>
              <Button variant=\"ghost\" size=\"sm\" className=\"text-slate-400\">
                <Eye className=\"w-4 h-4\" />
              </Button>
            </div>
          </div>
        </div>
      </div>`;
page = page.replace(filterRegex, newFilterRow);

fs.writeFileSync('src/app/water-systems/algal-bloom-intelligence/page.tsx', page);
