const fs = require('fs');
const path = require('path');

const newSubtitles = {
  // OBSERVATION & ECOLOGY
  "biodiversity/wildlife-sightings/page.tsx": "A real-time geospatial ledger capturing verified wildlife observations and critically important community sightings across Kashmir. Integrating expert field intelligence, high-confidence species encounters, and crucial geographical data to formulate dynamic regional distribution models.",
  "biodiversity/birding-hotspots/page.tsx": "An interactive spatial directory identifying prime ornithological observation territories and high-density birding locations in Kashmir. Integrating seasonal accessibility metrics, verified species congregation data, and detailed habitat infrastructure for enhanced avifaunal conservation monitoring.",
  "biodiversity/migration-windows/page.tsx": "A temporal analytical matrix mapping critical migratory bird timelines and cyclical movement patterns across the Himalayan flyways. Integrating precise seasonal arrival models, critical layover habitat evaluations, and real-time environmental indicators to predict dynamic international migration corridors.",
  "biodiversity/pollinator-activity/page.tsx": "A specialized ecological tracking system monitoring essential pollinator activity periods across Kashmir's transitional ecosystems. Integrating advanced phenological markers, seasonal climatic dependencies, and crucial interaction networks between endemic flora and high-altitude insect populations.",
  "biodiversity/phenology-flowering/page.tsx": "A detailed seasonal intelligence ledger recording systematic flowering events and critical phenological transitions in Kashmir. Integrating crucial climate change indicators, dynamic vegetation responses, and highly specialized reproductive success metrics across diverse botanical communities.",
  "biodiversity/habitat-signals/page.tsx": "An advanced environmental early-warning system tracking significant habitat stress and structural transitions across Kashmir. Integrating vital ecological indicators, critical vulnerability thresholds, and dynamic conservation alerts to predict impending ecosystem degradation and fragmentation risks.",
  "biodiversity/seasonal-activity/page.tsx": "A comprehensive temporal intelligence dashboard mapping critical breeding and behavioral windows for Kashmir's wildlife. Integrating foundational reproductive timelines, seasonal habitat utilization models, and vital climatic dependencies to formulate highly targeted regional conservation strategies.",

  // INTELLIGENCE
  "biodiversity/district-profiles/page.tsx": "A regional intelligence matrix providing comprehensive district-level biodiversity assessments across Kashmir's administrative zones. Integrating localized species richness metrics, specific regional conservation priorities, and foundational ecological infrastructure data for decentralized habitat management.",
  "biodiversity/dashboards/page.tsx": "A centralized analytical command layer visualizing macro-level biodiversity trends and critical conservation metrics in Kashmir. Integrating complex ecological datasets, dynamic threat vulnerability indices, and real-time intelligence feeds to empower strategic and data-driven environmental governance.",
  
  "biodiversity/migration-calendar/page.tsx": "A comprehensive interactive calendar mapping cyclical avifaunal movement patterns across critical Himalayan migratory flyways. Integrating highly detailed monthly arrival frequencies, vital layover habitat correlations, and dynamic geospatial indicators for strategic temporal conservation analysis."
};

const customPages = Object.keys(newSubtitles);

customPages.forEach(fileKey => {
  const file = path.join('src/app', fileKey);
  if (!fs.existsSync(file)) {
    console.log("Not found: " + file);
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  let subtitle = newSubtitles[fileKey];
  
  // Need to extract title, icon, and actions.
  // This is tricky because the actions are arbitrary JSX blocks.
  
  // First, inject the import.
  const imports = `import { Heading } from '@/components/common/Heading';`;
  if (!content.includes('import { Heading }')) {
    content = content.replace(/import { useRouter } from 'next\/navigation';/, `import { useRouter } from 'next/navigation';\n${imports}`);
  }
  
  // Find Title
  const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  let rawTitle = titleMatch ? titleMatch[1].trim() : 'Intelligence';
  // Strip any inner tags from title just in case
  rawTitle = rawTitle.replace(/<[^>]+>/g, '').trim();
  
  // Reformat Title to 2 lines
  let titleParts = rawTitle.split(' ');
  let titleFormatted = `{<><span className="block whitespace-nowrap">${titleParts[0]}</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">${titleParts.slice(1).join(' ') || 'Intelligence'}</span></>}`;

  // Find Actions (usually in a div inside the hero)
  let actionsMatch = content.match(/<div className="flex flex-col sm:flex-row flex-wrap gap-3">([\s\S]*?)<\/div>\s*<\/motion.div>/);
  let actions = actionsMatch ? actionsMatch[1].trim() : '';
  
  // If no actions found, look for gap-4
  if (!actionsMatch) {
      actionsMatch = content.match(/<div className="flex flex-col sm:flex-row flex-wrap gap-[0-9]">([\s\S]*?)<\/div>\s*<\/motion.div>/);
      actions = actionsMatch ? actionsMatch[1].trim() : '';
  }

  // Find the entire hero div
  const heroRegex = /<div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden.*?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const heroRegexAlt = /<div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden.*?">[\s\S]*?<\/div>\s*<\/div>/;
  
  // Let's manually reconstruct the Heading component
  const headingStr = `      <Heading
        title=${titleFormatted}
        subtitle="${subtitle}"
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence"
        gridOverlay
        actions={
          <>
            ${actions}
          </>
        }
      />`;

  let replaced = false;
  if (content.match(heroRegex)) {
    content = content.replace(heroRegex, headingStr);
    replaced = true;
  } else if (content.match(heroRegexAlt)) {
      content = content.replace(heroRegexAlt, headingStr);
      replaced = true;
  } else {
      // Look for any motion.div that contains the h1
      const fallbackRegex = /<div className="relative pt-20[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/motion\.div>\s*<\/div>\s*<\/div>/;
      if (content.match(fallbackRegex)) {
          content = content.replace(fallbackRegex, headingStr);
          replaced = true;
      }
  }

  if (replaced) {
      // Add Activity icon to imports if missing
      if (!content.includes('Activity,')) {
          content = content.replace(/import \{([\s\S]*?)\} from 'lucide-react';/, `import { Activity, $1} from 'lucide-react';`);
      }
      fs.writeFileSync(file, content);
      console.log("Updated Hero in: " + fileKey);
  } else {
      console.log("Failed to match Hero in: " + fileKey);
  }
});
