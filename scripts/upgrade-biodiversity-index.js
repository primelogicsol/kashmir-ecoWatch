const fs = require('fs');

function getClosingTag(str, startIndex, tagName) {
  let depth = 0;
  const tagRegex = new RegExp(`<\/?${tagName}[^>]*>`, 'g');
  tagRegex.lastIndex = startIndex;
  
  let match;
  while ((match = tagRegex.exec(str)) !== null) {
    if (match[0].startsWith(`</${tagName}`)) {
      depth--;
      if (depth === 0) return match.index + match[0].length;
    } else if (!match[0].endsWith('/>')) {
      depth++;
    }
  }
  return -1;
}

const file = 'src/app/biodiversity/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { LiveMetricsBar }')) {
  content = content.replace("import { Heading } from '@/components/common/Heading';", "import { Heading } from '@/components/common/Heading';\nimport { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
}

const heroStartIndex = content.indexOf('<Heading');
if (heroStartIndex !== -1) {
  // Find the end of the KPI strip
  const metricsStartIndex = content.indexOf('{/* Live Metrics */}');
  let metricsEndIndex = -1;
  if (metricsStartIndex !== -1) {
    metricsEndIndex = getClosingTag(content, content.indexOf('<div', metricsStartIndex), 'div');
  }

  const newHero = `<Heading
        title={<><span className="block whitespace-nowrap">Biodiversity</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Species Directory</span></>}
        subtitle="Comprehensive species database with distribution, habitat associations, seasonal patterns, conservation status, and ecological relevance across Kashmir"
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence"
        gridOverlay
        images={['/images/biodiversity.png', '/images/bird.png', '/images/plant.png']}
        actions={
          <>
            <a href="/biodiversity/mammals">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/biodiversity/dashboards">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Data Dashboards
              </Button>
            </a>
          </>
        }
      />

      {/* Live Metrics */}
      <LiveMetricsBar metrics={[
        { label: 'Species Indexed', value: biodiversityMetrics.totalSpecies, icon: Activity },
        { label: 'Protected Areas', value: biodiversityMetrics.protectedAreaOverlap, icon: Map },
        { label: 'Active Sightings', value: biodiversityMetrics.activeSightings, icon: Eye },
        { label: 'Threatened Taxa', value: biodiversityMetrics.threatened, icon: Shield },
        { label: 'Medicinal Plants', value: biodiversityMetrics.medicinalPlants, icon: Leaf },
        { label: 'Bird Records', value: biodiversityMetrics.birds, icon: Activity },
        { label: 'Mammals', value: biodiversityMetrics.mammals, icon: Mountain },
        { label: 'Fish Species', value: biodiversityMetrics.fish, icon: Droplet },
      ]} />`;

  content = content.substring(0, heroStartIndex) + newHero + content.substring(metricsEndIndex);
  
  if (!content.includes('import { Search')) {
      content = content.replace("Leaf, Map, Activity, Eye, TrendingUp, ArrowRight,", "Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,");
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Upgraded biodiversity/page.tsx correctly');
}
