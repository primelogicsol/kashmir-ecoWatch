// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 & 2 ADAPTER: COMPLETE ROUTE TREE & DASHBOARD TAB DISCOVERY
// Dynamically audits src/app/**/page.tsx + directly navigable module tabs
// Excludes admin/auth/private, dev-test, redirect shims & dynamic templates
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import {
  ExcludedResourceRecord,
  SearchAdapterOutput,
  SearchDocument,
  SearchDomain,
} from '../types';
import { enrichWithMultilingualLexicon } from '../multilingual-gazetteer';
import { PIL_TABS } from '@/components/environmental-pil/EnvironmentalPilSubNav';

function inferDomainFromRoute(route: string): { domain: SearchDomain; parentModule: string } {
  if (route === '/' || route === '/module-directory' || route === '/search') {
    return { domain: 'environmental_modules', parentModule: 'Platform Core' };
  }
  const seg = route.split('/')[1] || '';
  switch (seg) {
    case 'hazard-intelligence':
    case 'risk-monitoring':
    case 'alerts':
    case 'alert-archive':
    case 'risk-updates':
    case 'live-incident-map':
      return { domain: 'hazard_intelligence', parentModule: 'Hazard Intelligence' };
    case 'biodiversity':
    case 'protected-network':
    case 'protected-areas':
    case 'conservation-intelligence':
    case 'trails-sightings':
      return { domain: 'biodiversity_conservation', parentModule: seg === 'protected-network' || seg === 'protected-areas' ? 'Protected Areas' : 'Biodiversity & Conservation' };
    case 'water-systems':
      return { domain: 'water_cryosphere', parentModule: 'Water Systems & Cryosphere' };
    case 'earth-human-impact':
      return { domain: 'earth_human_impact', parentModule: 'Earth & Human Impact (EHII)' };
    case 'environmental-monitoring':
    case 'monitoring-overview':
      return { domain: 'environmental_monitoring', parentModule: 'Environmental Monitoring' };
    case 'sectoral-eia':
    case 'research-library':
    case 'library':
    case 'field-reports':
    case 'open-data':
    case 'webinars':
      return { domain: 'scientific_research', parentModule: seg === 'sectoral-eia' ? 'Sectoral EIA (SEIAE)' : 'Scientific Research & Archives' };
    case 'resources':
      if (route.includes('environmental-pil')) {
        return { domain: 'environmental_accountability', parentModule: 'Environmental PIL Portal' };
      }
      if (route.includes('kew-green-heroes')) {
        return { domain: 'community_participation', parentModule: 'KEW Green Heroes Registry' };
      }
      return { domain: 'scientific_research', parentModule: 'Environmental Resources' };
    case 'seasonal-ecology':
    case 'environmental-calendar':
      return { domain: 'ecological_calendar', parentModule: seg === 'seasonal-ecology' ? 'Seasonal Ecology' : 'Environmental Calendar' };
    case 'citizen-science':
    case 'ngo-impact':
    case 'contribute':
    case 'contribute-data':
    case 'contribute-guidelines':
    case 'submit-observation':
    case 'report-issue':
    case 'share-data':
    case 'get-involved':
    case 'join-citizen-science':
    case 'become-data-contributor':
    case 'become-research-partner':
      return { domain: 'community_participation', parentModule: 'Community Participation & Stewardship' };
    case 'districts':
    case 'atlas':
    case 'entity-explorer':
    case 'geographic-scope':
    case 'geographic-notice':
      return { domain: 'geographic_intelligence', parentModule: 'Geographic Intelligence & GIS' };
    default:
      return { domain: 'environmental_modules', parentModule: 'Institutional & Governance' };
  }
}

function humanizeRoute(route: string): string {
  if (route === '/') return 'Kashmir EcoWatch — Western Himalayan Environmental Command Center';
  const parts = route.split('/').filter(Boolean);
  const acronymMap: Record<string, string> = {
    eia: 'EIA',
    pil: 'PIL',
    gis: 'GIS',
    sdg: 'SDG',
    nwia: 'NWIA',
    glofs: 'GLOFs',
    kew: 'KEW',
    ngo: 'NGO',
    csr: 'CSR',
    faq: 'FAQ',
    qna: 'Q&A',
    ehii: 'EHII',
    seiae: 'SEIAE',
  };
  const formatted = parts.map((seg) =>
    seg
      .split('-')
      .map((w) => acronymMap[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
  if (formatted.length === 1) return formatted[0];
  return `${formatted[formatted.length - 1]} — ${formatted.slice(0, -1).join(' · ')}`;
}

function extractPageMetadata(txt: string, route: string): { title: string; description: string; label?: string } {
  const metaTitle = txt.match(/title:\s*['"`]([^'"`\n]+)['"`]/);
  const metaDesc = txt.match(/description:\s*['"`]([^'"`\n]{25,350})['"`]/);
  const subtitleProp = txt.match(/subtitle=["'`]([^"'`\n]{20,350})["'`]/);
  const labelProp = txt.match(/label=["'`]([^"'`\n]{3,120})["'`]/);

  let cleanTitle = metaTitle ? metaTitle[1].replace(/\s*\|\s*Kashmir EcoWatch.*/i, '').trim() : '';
  if (!cleanTitle || cleanTitle.includes('${')) {
    cleanTitle = humanizeRoute(route);
  }

  let cleanDesc = '';
  if (subtitleProp && !subtitleProp[1].includes('${')) {
    cleanDesc = subtitleProp[1].trim();
  } else if (metaDesc && !metaDesc[1].includes('${')) {
    cleanDesc = metaDesc[1].trim();
  } else {
    const { parentModule } = inferDomainFromRoute(route);
    cleanDesc = `Dedicated ${parentModule} module and analytical view at ${route} covering Western Himalayan environmental records, telemetry, and verified evidence.`;
  }

  return {
    title: cleanTitle,
    description: cleanDesc,
    label: labelProp && !labelProp[1].includes('${') ? labelProp[1].trim() : undefined,
  };
}

function walkAppPages(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAppPages(full, out);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      out.push(full);
    }
  }
  return out;
}

const DIRECT_DASHBOARD_TABS: Array<{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  canonicalUrl: string;
  domain: SearchDomain;
  parentModule: string;
  tags: string[];
}> = [
  // Green Heroes 14 directly navigable tabs
  {
    id: 'tab:green-heroes:green-martyrs',
    title: 'Green Martyrs & Fallen Forest Guardians Archive',
    subtitle: 'KEW Green Heroes · Memorial Dossiers',
    description: 'Verified memorial dossiers honoring forest guards, wildlife officials, and grassroots environmental defenders who sacrificed their lives protecting Western Himalayan forests and wildlife.',
    canonicalUrl: '/resources/kew-green-heroes?tab=martyrs',
    domain: 'community_participation',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['green martyrs', 'forest guards', 'fallen protectors', 'wildlife martyrs', 'memorial'],
  },
  {
    id: 'tab:green-heroes:scientists',
    title: 'Environmental Scientists & University Faculty Registry',
    subtitle: 'KEW Green Heroes · Scientific Dossiers',
    description: 'Documented profiles of Western Himalayan limnologists, glaciologists, botanists, wildlife biologists, and university researchers with cited publications.',
    canonicalUrl: '/resources/kew-green-heroes?tab=scientists',
    domain: 'community_participation',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['environmental scientists', 'researchers', 'faculty', 'limnology', 'botany', 'glaciology'],
  },
  {
    id: 'tab:green-heroes:journalists',
    title: 'Environmental Journalists & Investigative Media Registry',
    subtitle: 'KEW Green Heroes · Media Dossiers',
    description: 'Journalists, photojournalists, and environmental reporters documenting wetland loss, climate impacts, riverbed mining, and conservation across five Himalayan regions.',
    canonicalUrl: '/resources/kew-green-heroes?tab=journalists',
    domain: 'community_participation',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['environmental journalists', 'media', 'investigative reporting', 'photojournalism'],
  },
  {
    id: 'tab:green-heroes:advocates',
    title: 'Environmental Advocates & Public-Interest Litigators',
    subtitle: 'KEW Green Heroes · Legal Stewardship',
    description: 'Advocates, amici curiae, and legal petitioners advancing environmental PILs, wetland protection decrees, and statutory accountability.',
    canonicalUrl: '/resources/kew-green-heroes?tab=advocates',
    domain: 'environmental_accountability',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['environmental advocates', 'lawyers', 'amicus curiae', 'PIL petitioners'],
  },
  {
    id: 'tab:green-heroes:ngos-community',
    title: 'NGO Founders, Lake Cleaning Drives & Community Guardians',
    subtitle: 'KEW Green Heroes · Civil Society',
    description: 'Grassroots conservation leaders, wetland cleanup pioneers, eco-restoration trusts, and traditional ecological knowledge keepers.',
    canonicalUrl: '/resources/kew-green-heroes?tab=ngos-community',
    domain: 'community_participation',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['NGO leaders', 'community guardians', 'Nigeen Lake', 'Manzoor Wangnoo', 'grassroots'],
  },
  {
    id: 'tab:green-heroes:poets-artists',
    title: 'Environmental Poets, Mystics, Musicians & Filmmakers',
    subtitle: 'KEW Green Heroes · Cultural Ecology',
    description: 'Ecological philosophy and artistic stewardship from Sheikh Noor-ud-Din Wali (Nund Rishi — "Ann Poshi Teli Yeli Wann Poshi") to contemporary Himalayan artists.',
    canonicalUrl: '/resources/kew-green-heroes?tab=creative-artists',
    domain: 'community_participation',
    parentModule: 'KEW Green Heroes Registry',
    tags: ['Nund Rishi', 'Sheikh Noor-ud-Din', 'poets', 'filmmakers', 'ecocultural heritage'],
  },
  // Water Systems NWIA tabs
  {
    id: 'tab:nwia:districts',
    title: 'NWIA District-wise Wetland Distribution Atlas',
    subtitle: 'Water Systems · ISRO SAC NWIA Tab',
    description: 'District-level National Wetland Inventory and Assessment (NWIA) area breakdown across lakes, high-altitude tarns, marshes, and riverine wetlands.',
    canonicalUrl: '/water-systems/nwia-classification?tab=districts',
    domain: 'water_cryosphere',
    parentModule: 'Water Systems & Cryosphere',
    tags: ['NWIA', 'wetland atlas', 'district wetlands', 'ISRO SAC'],
  },
  {
    id: 'tab:nwia:high-altitude',
    title: 'NWIA High-Altitude Alpine Lakes Inventory (>3000m)',
    subtitle: 'Water Systems · High-Altitude Tarns',
    description: 'Catalog of oligotrophic glacial and alpine tarns above 3,000m across Kashmir and Ladakh under NWIA classification code 1103.',
    canonicalUrl: '/water-systems/nwia-classification?tab=high-altitude',
    domain: 'water_cryosphere',
    parentModule: 'Water Systems & Cryosphere',
    tags: ['high altitude lakes', 'alpine tarns', 'NWIA 1103', 'glacial lakes'],
  },
  // Atmospheric & Extreme Weather specialized dashboard tabs
  {
    id: 'tab:wd:synoptic-waveguide',
    title: 'Western Disturbances — 500 hPa Synoptic Waveguide & Ensemble Dashboard',
    subtitle: 'Atmospheric Systems · Live NWP Workbench',
    description: 'Interactive 6-subregion Western Disturbance tracking across upstream Mediterranean–Caspian–Hindu Kush sectors, rain/snow phase partitioning, and coupled flood/avalanche triggers.',
    canonicalUrl: '/hazard-intelligence/atmospheric-systems/western-disturbances/dashboard',
    domain: 'hazard_intelligence',
    parentModule: 'Hazard Intelligence · Atmospheric Systems',
    tags: ['Western Disturbances', 'WD dashboard', '500 hPa trough', 'snow forecast', 'baroclinic wave'],
  },
  {
    id: 'tab:monsoon:moisture-gates',
    title: 'Monsoon Dynamics — Terrain-Masked Moisture Gates & ERA5 Anomalies',
    subtitle: 'Atmospheric Systems · Monsoon Workbench',
    description: 'Arabian Sea and Bay of Bengal moisture transport nodes, Shivalik windward vs Pir Panjal spillover regimes, and 7-day ERA5 rainfall departures.',
    canonicalUrl: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics/dashboard',
    domain: 'hazard_intelligence',
    parentModule: 'Hazard Intelligence · Atmospheric Systems',
    tags: ['Monsoon Dynamics', 'ERA5 rainfall', 'Pir Panjal spillover', 'moisture transport'],
  },
  {
    id: 'tab:jet:swj-axis',
    title: 'Subtropical Westerly Jet (SWJ) 250 hPa Axis & Blocking Ridges Dashboard',
    subtitle: 'Atmospheric Systems · Upper-Air Workbench',
    description: '2D gridded 250/300 hPa wind-speed corridors, 500 hPa geopotential height anomalies, and blocking ridge diagnostics over the Western Himalaya.',
    canonicalUrl: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation/dashboard',
    domain: 'hazard_intelligence',
    parentModule: 'Hazard Intelligence · Atmospheric Systems',
    tags: ['Jet Stream', 'Subtropical Westerly Jet', 'SWJ', '250 hPa', 'blocking ridge'],
  },
  {
    id: 'tab:extreme-rain:ensemble',
    title: 'Extreme Rainfall & Cloudbursts — 31-Member Ensemble & Radar Nowcast Dashboard',
    subtitle: 'Extreme Weather · Operational Module 01',
    description: '1h/3h/24h peak rainfall intensity, GFS 31-member exceedance probabilities P(≥50mm), CAPE/TCWV convective diagnostics, and historical Himalayan cloudburst archive.',
    canonicalUrl: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard',
    domain: 'hazard_intelligence',
    parentModule: 'Hazard Intelligence · Extreme Weather',
    tags: ['Extreme Rainfall', 'Cloudbursts', 'ensemble forecast', 'CAPE', 'RainViewer radar'],
  },
];

export function buildRoutesAndTabsIndex(): {
  output: SearchAdapterOutput;
  validStaticRoutes: Set<string>;
  dynamicRouteRegexes: RegExp[];
} {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const pageFiles = walkAppPages(appDir);
  const documents: SearchDocument[] = [];
  const excluded: ExcludedResourceRecord[] = [];
  const validStaticRoutes = new Set<string>();
  const dynamicRouteRegexes: RegExp[] = [];

  for (const fullPath of pageFiles) {
    const rel = path.relative(appDir, fullPath).replace(/\\/g, '/');
    const rawRoute = '/' + rel.replace(/\/?page\.tsx?$/, '').replace(/^\//, '');
    const route = rawRoute === '/' ? '/' : rawRoute;
    const txt = fs.readFileSync(fullPath, 'utf8');

    // 1. Dynamic route templates — register regex for link validation, exclude template itself from search results
    if (/\[.+?\]/.test(route)) {
      const pattern =
        '^' +
        route
          .replace(/\[\.\.\.[^\]]+\]/g, '.+')
          .replace(/\[[^\]]+\]/g, '[^/?#]+') +
        '$';
      dynamicRouteRegexes.push(new RegExp(pattern));
      excluded.push({
        idOrRoute: route,
        title: `Dynamic Route Template (${route})`,
        reason: 'dynamic_route_template',
        adapterId: 'routes-tabs',
      });
      continue;
    }

    // 2. Private, authentication, or administrative workspaces
    if (
      /^\/(admin|auth|login|register|signup|signin|profile|dashboard|dashboards\/air-quality|unauthorized|forbidden)/i.test(
        route
      ) ||
      /^\/webinars\/(create|room)/.test(route)
    ) {
      excluded.push({
        idOrRoute: route,
        title: humanizeRoute(route),
        reason: 'admin_or_auth_route',
        adapterId: 'routes-tabs',
      });
      continue;
    }

    // 3. Internal developer test pages
    if (route === '/preview-error' || route === '/test-tailwind') {
      excluded.push({
        idOrRoute: route,
        title: humanizeRoute(route),
        reason: 'internal_dev_route',
        adapterId: 'routes-tabs',
      });
      continue;
    }

    validStaticRoutes.add(route);

    // 4. Redirect compatibility routes (index canonical ?tab=... instead!)
    if (/\bredirect\s*\(/.test(txt) && txt.length < 1500) {
      excluded.push({
        idOrRoute: route,
        title: humanizeRoute(route),
        reason: 'redirect_compatibility_route',
        adapterId: 'routes-tabs',
      });
      continue;
    }

    const meta = extractPageMetadata(txt, route);
    const { domain, parentModule } = inferDomainFromRoute(route);
    const segTags = route
      .split('/')
      .filter(Boolean)
      .flatMap((s) => [s.replace(/-/g, ' '), s]);

    const lex = enrichWithMultilingualLexicon(`${meta.title} ${segTags.join(' ')}`);

    documents.push({
      id: `route:${route}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain,
      title: meta.title,
      subtitle: meta.label || parentModule,
      description: meta.description,
      canonicalUrl: route,
      parentModule,
      subregion: 'Multi-Regional',
      geographicScope: 'Western Himalaya',
      tags: Array.from(new Set([parentModule, ...segTags])),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Kashmir EcoWatch Platform Module',
      trustBadge: 'Platform Module',
      temporalNature: route.includes('archive') || route.includes('historical') ? 'historical_archive' : 'reference',
      verificationStatus: 'Published Module',
      dataFreshness: route.includes('dashboard') || route.includes('live') ? 'live_telemetry' : 'static_module',
      accessClassification: 'public',
      ctaLabel: route.includes('dashboard') ? 'Open Dashboard' : 'Open Module',
      adapterId: 'routes-tabs',
    });
  }

  // 5. Index Environmental PIL Sub-Navigation Tabs directly (?tab=...)
  if (Array.isArray(PIL_TABS)) {
    for (const tab of PIL_TABS) {
      if (!tab || tab.id === 'overview') continue;
      const canonicalUrl = `/resources/environmental-pil?tab=${encodeURIComponent(tab.id)}`;
      const lex = enrichWithMultilingualLexicon(`${tab.label} Environmental PIL`);
      documents.push({
        id: `tab:pil:${tab.id}`,
        documentType: 'dashboard_tab',
        resultClass: 'module',
        domain: 'environmental_accountability',
        title: `Environmental PIL — ${tab.label}`,
        subtitle: 'Environmental PIL Portal · Judicial Workbench Tab',
        description: `Directly navigable judicial compliance and litigation workbench tab ("${tab.label}") inside the KEW Environmental PIL Portal covering 1986–2026 court directives across five Himalayan regions.`,
        canonicalUrl,
        parentModule: 'Environmental PIL Portal',
        subregion: 'Multi-Regional',
        geographicScope: 'Western Himalaya',
        tags: ['Environmental PIL', tab.label, tab.id.replace(/-/g, ' '), 'judicial compliance'],
        synonyms: lex.synonyms,
        multilingualTerms: lex.multilingual,
        source: 'KEW Judicial Surveillance Workbench',
        trustBadge: 'Platform Module',
        temporalNature: 'reference',
        verificationStatus: 'Published Workbench Tab',
        dataFreshness: 'static_module',
        accessClassification: 'public',
        ctaLabel: 'Open Workbench Tab',
        adapterId: 'routes-tabs',
      });
    }
  }

  // 6. Index Additional Curated Multi-Module Dashboard Tabs
  for (const dt of DIRECT_DASHBOARD_TABS) {
    const lex = enrichWithMultilingualLexicon(`${dt.title} ${dt.description} ${dt.tags.join(' ')}`);
    documents.push({
      id: dt.id,
      documentType: 'dashboard_tab',
      resultClass: 'module',
      domain: dt.domain,
      title: dt.title,
      subtitle: dt.subtitle,
      description: dt.description,
      canonicalUrl: dt.canonicalUrl,
      parentModule: dt.parentModule,
      subregion: 'Multi-Regional',
      geographicScope: 'Western Himalaya',
      tags: dt.tags,
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Kashmir EcoWatch Specialist Workbench',
      trustBadge: 'Platform Module',
      temporalNature: 'reference',
      verificationStatus: 'Published Workbench Tab',
      dataFreshness: dt.canonicalUrl.includes('dashboard') ? 'live_telemetry' : 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Dashboard Tab',
      adapterId: 'routes-tabs',
    });
  }

  return {
    output: {
      adapterId: 'routes-tabs',
      adapterName: 'Public Route Tree & Dashboard Tabs Adapter',
      documents,
      excluded,
      sourceHealthy: true,
    },
    validStaticRoutes,
    dynamicRouteRegexes,
  };
}
