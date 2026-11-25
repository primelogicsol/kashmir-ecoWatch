// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — UNIVERSAL ROUTE & ENTITY METADATA ENGINE
// Provides unique, accurate, brand-consistent Metadata, Canonical URLs,
// OpenGraph, Twitter Cards, Robots rules, and Highwire Scholar citation_* tags
// across all static and dynamic Next.js App Router pages.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import { CANONICAL_SITE_URL, KEW_IDENTITY } from './entity-identity';
import { isVerifiedRealDoi, toAbsoluteCanonicalUrl } from './structured-data';
import { EXTRACTED_ROUTE_METADATA } from './generated-route-descriptions';

export interface PageMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  imagePath?: string;
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  scholarCitation?: {
    title: string;
    authors: string[];
    publicationDate: string;
    institution?: string;
    doi?: string;
    pdfOrDataUrl?: string;
    keywords?: string[];
  };
}

/**
 * Duplicate/alias route canonical consolidation map.
 * Ensures overlapping legacy/alias routes point canonical tags to the primary route.
 */
export const DUPLICATE_ROUTE_CANONICAL_OVERRIDES: Record<string, string> = {
  '/about/privacy': '/privacy',
  '/risk-monitoring/avalanche-winter-risks': '/risk-monitoring/avalanche-winter',
  '/risk-monitoring/biodiversity-risks': '/risk-monitoring/biodiversity-risk-intelligence',
  '/risk-monitoring/earthquake-risks': '/risk-monitoring/earthquake',
  '/risk-monitoring/flood-flash-flood-risks': '/risk-monitoring/flood-flash-flood',
  '/risk-monitoring/forest-fire-risks': '/risk-monitoring/forest-fire',
  '/risk-monitoring/glacier-cryosphere-risks': '/risk-monitoring/glacier-cryosphere',
  '/risk-monitoring/hydrological-risks': '/risk-monitoring/hydrological-risk',
  '/risk-monitoring/landslide-slope-risks': '/risk-monitoring/landslide-slope',
};

export const NON_INDEXABLE_ROUTE_PREFIXES = [
  '/admin',
  '/webinars/admin',
  '/webinars/institution/',
  '/api',
  '/auth',
  '/dashboard',
  '/preview-error',
  '/test-tailwind',
  '/webinars/camera-test',
  '/webinars/create',
  '/webinars/room',
];

export function isNonPublicRoute(routePath: string): boolean {
  const clean = routePath.split(/[?#]/)[0] || '/';
  if (
    clean === '/webinars/institution/register' ||
    clean === '/webinars/institution/verification'
  ) {
    return false;
  }
  return NON_INDEXABLE_ROUTE_PREFIXES.some(
    (prefix) => clean === prefix || clean.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`)
  );
}

export function buildPageMetadata(opts: PageMetadataOptions): Metadata {
  const cleanBaseTitle = opts.title
    .replace(/\s*\|\s*Kashmir EcoWatch.*$/i, '')
    .replace(/\s*—\s*Kashmir Environmental Intelligence Platform$/i, '')
    .trim();

  const fullTitle =
    opts.canonicalPath === '/'
      ? KEW_IDENTITY.homepageTitle
      : cleanBaseTitle.toLowerCase().includes('kashmir ecowatch')
      ? cleanBaseTitle
      : `${cleanBaseTitle} | ${KEW_IDENTITY.officialName}`;

  const effectiveCanonicalPath =
    DUPLICATE_ROUTE_CANONICAL_OVERRIDES[opts.canonicalPath] || opts.canonicalPath;
  const canonicalUrl = toAbsoluteCanonicalUrl(effectiveCanonicalPath);
  const imageUrl = toAbsoluteCanonicalUrl(opts.imagePath || KEW_IDENTITY.logoPath);
  const shouldNoIndex = Boolean(opts.noIndex || isNonPublicRoute(opts.canonicalPath));

  const otherMeta: Record<string, string | string[]> = {};
  if (opts.scholarCitation) {
    const sc = opts.scholarCitation;
    otherMeta['citation_title'] = sc.title;
    otherMeta['citation_author'] =
      sc.authors && sc.authors.length > 0 ? sc.authors : [KEW_IDENTITY.extendedName];
    if (sc.publicationDate) {
      otherMeta['citation_publication_date'] = sc.publicationDate.replace(/-/g, '/');
    }
    otherMeta['citation_technical_report_institution'] =
      sc.institution || KEW_IDENTITY.extendedName;
    otherMeta['citation_publisher'] = KEW_IDENTITY.extendedName;
    otherMeta['citation_public_url'] = canonicalUrl;
    if (sc.pdfOrDataUrl) {
      otherMeta['citation_fulltext_html_url'] = canonicalUrl;
      if (/\/pdf(\?|$)|\.pdf(\?|$)/i.test(sc.pdfOrDataUrl)) {
        otherMeta['citation_pdf_url'] = toAbsoluteCanonicalUrl(sc.pdfOrDataUrl);
      }
    }
    if (sc.doi && isVerifiedRealDoi(sc.doi)) {
      otherMeta['citation_doi'] = sc.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim();
    }
    if (sc.keywords && sc.keywords.length > 0) {
      otherMeta['citation_keywords'] = sc.keywords.join('; ');
    }
  }

  return {
    applicationName: KEW_IDENTITY.applicationName,
    title: {
      absolute: fullTitle,
    },
    description: opts.description,
    ...(opts.keywords && opts.keywords.length > 0
      ? {
          keywords: Array.from(
            new Set([
              ...opts.keywords,
              KEW_IDENTITY.officialName,
              KEW_IDENTITY.extendedName,
              'Western Himalaya',
            ])
          ),
        }
      : {}),
    authors:
      opts.authors && opts.authors.length > 0
        ? opts.authors.map((name) => ({ name }))
        : [{ name: KEW_IDENTITY.extendedName, url: CANONICAL_SITE_URL }],
    creator: KEW_IDENTITY.extendedName,
    publisher: KEW_IDENTITY.extendedName,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url: canonicalUrl,
      siteName: KEW_IDENTITY.officialName,
      locale: 'en_US',
      type: opts.ogType || 'website',
      images: [
        {
          url: imageUrl,
          alt: `${cleanBaseTitle} — ${KEW_IDENTITY.extendedName}`,
        },
      ],
      ...(opts.ogType === 'article' && opts.publishedTime
        ? { publishedTime: opts.publishedTime }
        : {}),
      ...(opts.ogType === 'article' && opts.modifiedTime
        ? { modifiedTime: opts.modifiedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: KEW_IDENTITY.twitterHandle,
      creator: KEW_IDENTITY.twitterHandle,
      title: fullTitle,
      description: opts.description,
      images: [imageUrl],
    },
    ...(Object.keys(otherMeta).length > 0 ? { other: otherMeta } : {}),
  };
}

/**
 * Curated high-precision titles & descriptions for core flagship public routes,
 * supplemented by deterministic scientific route synthesis for all sub-modules.
 */
const CURATED_STATIC_ROUTES: Record<
  string,
  { title: string; description: string; imagePath?: string; keywords?: string[] }
> = {
  '/': {
    title: 'Kashmir EcoWatch (KEW) | Western Himalayan',
    description:
      'Kashmir EcoWatch (KEW Western Himalayan) provides environmental intelligence, satellite monitoring, GIS, biodiversity research, climate science and ecological assessments across the Western Himalaya.',
    imagePath: '/images/protected-network.png',
    keywords: [
      'Kashmir EcoWatch',
      'Kashmir Eco Watch',
      'Kashmir Ecowatch',
      'KEW',
      'KEW Western Himalayan',
      'Kashmir EcoWatch Western Himalayan',
      'Kashmir Eco Watch Western Himalayan',
      'Kashmir Ecowatch Western Himalayan',
      'Western Himalayan ecology',
    ],
  },
  '/about': {
    title: 'About Kashmir EcoWatch Western Himalayan — Institutional Identity & History',
    description:
      'Learn about Kashmir EcoWatch Western Himalayan (KEW), established in 2004 as Environment and Service Research Organization (ESRO), delivering independent non-commercial environmental science across the Western Himalaya.',
    keywords: ['About Kashmir EcoWatch', 'Kashmir EcoWatch Western Himalayan', 'ESRO 2004', 'Dr. Kumar Foundation USA'],
  },
  '/about/methodology': {
    title: 'Scientific Methodology, Data Provenance & Validation Standards',
    description:
      'Eight-stage scientific verification methodology, sensor calibration standards, satellite remote sensing protocols, uncertainty disclosure, and FAIR open-data principles used by Kashmir EcoWatch.',
    keywords: ['Kashmir EcoWatch methodology', 'environmental telemetry validation', 'remote sensing methodology'],
  },
  '/about/governance': {
    title: 'Ecological Governance, Institutional Charter & Alamdar-e-Kashmir Ethos',
    description:
      'Independent non-commercial governance framework of Kashmir EcoWatch, uniting Sheikh Noor-ud-Din Wali moral ecology with Rio Earth Summit scientific accountability.',
  },
  '/about/founder': {
    title: 'Institutional Leadership & Founding Scientific Stewardship',
    description:
      'Founding leadership, 25-year Himalayan environmental assessment heritage since ESRO (2004), and institutional stewardship behind Kashmir EcoWatch Western Himalayan.',
  },
  '/about/mission': {
    title: 'Strategic Mission & Western Himalayan Ecological Mandate',
    description:
      'Explore the scientific mission of Kashmir EcoWatch to safeguard lakes, wetlands, glaciers, forests, wildlife, and mountain communities across five Western Himalayan regions.',
  },
  '/about/data-sources': {
    title: 'Verified Scientific Data Sources, Satellite Feeds & Agency Registries',
    description:
      'Directory of satellite Earth observation archives, hydrometric stations, peer-reviewed monographs, NWIA wetland inventories, and citizen science feeds integrated by Kashmir EcoWatch.',
  },
  '/about/contact': {
    title: 'Contact Kashmir EcoWatch Secretariat & Scientific Desk',
    description:
      'Reach the Kashmir EcoWatch Western Himalayan Secretariat for research collaboration, dataset inquiries, media verification, and environmental reporting.',
  },
  '/research-library': {
    title: 'Scientific Research Library, Environmental Assessments & Monographs',
    description:
      'Access original environmental impact assessments, limnological baselines, glacier recession studies, biodiversity surveys, and scientific reports published by Kashmir EcoWatch.',
    keywords: ['Kashmir environmental research', 'Kashmir EIA reports', 'Sheshnag Lake assessment', 'Kashmir scientific publications'],
  },
  '/research-library/environmental-impact-assessment': {
    title: 'Jammu & Kashmir Comprehensive Environmental Impact Assessment (EIA) Baseline',
    description:
      'Section-by-section scientific Environmental Impact Assessment covering water resources, soil degradation, deforestation, wetland loss, and climate stressors across Jammu, Kashmir, and Ladakh.',
  },
  '/library': {
    title: 'Verified Evidence & Scientific Publications Archive',
    description:
      'Peer-reviewed studies, hydrological monitoring datasets, Hangul population surveys, wetland assessments, and citable scientific dossiers curated by Kashmir EcoWatch.',
  },
  '/open-data': {
    title: 'Open Environmental Data Catalog & Downloadable Scientific Datasets',
    description:
      'FAIR-compliant open environmental datasets covering 52 categories across Kashmir hydrology, NWIA wetlands, glaciers, Red Data Book species, air quality, and GIS vectors under CC BY 4.0.',
    keywords: ['Kashmir open environmental data', 'Kashmir GIS datasets', 'Himalayan hydrology dataset', 'NWIA Kashmir dataset'],
  },
  '/atlas': {
    title: 'Western Himalayan Interactive Geospatial & Ecological GIS Atlas',
    description:
      'Interactive multi-layer environmental GIS atlas mapping protected areas, Ramsar wetlands, alpine lakes, glaciers, rivers, watersheds, wildlife corridors, and hazard zones across Kashmir and the Western Himalaya.',
    imagePath: '/images/protected-network/protected-area-atlas-gis.jpg',
    keywords: ['Kashmir GIS map', 'Kashmir ecological atlas', 'Western Himalaya protected areas map'],
  },
  '/protected-network': {
    title: 'Protected Areas Network — National Parks, Sanctuaries & Ramsar Wetlands',
    description:
      'Comprehensive scientific directory of 182 Western Himalayan protected areas including Dachigam, Hemis, Kishtwar, Hokersar, Wular, wildlife sanctuaries, conservation reserves, and IBAs.',
    imagePath: '/images/protected-network/protected-national-parks-dachigam.jpg',
  },
  '/protected-network/atlas': {
    title: 'Protected Areas GIS Atlas — Boundaries, Corridors & Ramsar Reserves',
    description:
      'Geospatial conservation atlas of 182 National Parks, Wildlife Sanctuaries, Wetland Reserves, Conservation Reserves, Important Bird Areas, and 43 wildlife corridors across the Western Himalaya.',
    imagePath: '/images/protected-network/protected-area-atlas-gis.jpg',
  },
  '/protected-areas': {
    title: 'Protected Areas Directory — Sanctuaries, National Parks & Reserves',
    description:
      'Explore Kashmir and Western Himalayan national parks, wildlife sanctuaries, Ramsar wetlands, management plans, and species habitats.',
  },
  '/environmental-monitoring': {
    title: 'Environmental & Pollution Monitoring — Air, Water, Waste & Chinar Telemetry',
    description:
      'District-level environmental monitoring across Kashmir tracking Srinagar AQI, PM2.5 winter inversions, drinking water quality, sewage treatment, solid waste, noise, plastic pollution, and heritage Chinar trees.',
    imagePath: '/images/env-monitoring/kashmir-env-command-center.jpg',
  },
  '/environmental-monitoring/air-pollution': {
    title: 'Kashmir Air Quality & Winter PM2.5 Pollution Monitoring (Srinagar AQI)',
    description:
      'Real-time and baseline air quality intelligence across Srinagar and 20 districts, tracking PM2.5, PM10, winter thermal inversions, brick kiln plumes, and Khrew cement airsheds.',
    imagePath: '/images/env-monitoring/kashmir-air-pollution-monitoring.jpg',
  },
  '/water-systems': {
    title: 'Water Systems & Cryosphere — Lakes, Wetlands, Glaciers, Rivers & Springs',
    description:
      'Hydrological and limnological intelligence across 1,141 Kashmir and Western Himalayan water bodies including Dal Lake, Wular Lake, Sheshnag Lake, Hokersar, Kolahoi Glacier, Jhelum River, and karst springs.',
    imagePath: '/images/water-module/water-lake.jpg',
  },
  '/water-systems/lakes': {
    title: 'Lakes of Kashmir & Western Himalaya — Dal, Wular, Sheshnag & Alpine Tarns',
    description:
      'Scientific inventory and limnological profiles of 62 freshwater, urban, floodplain, and high-altitude glacial lakes across Kashmir and Ladakh including Dal, Wular, Sheshnag, Manasbal, and Nigeen.',
    imagePath: '/images/water-module/water-lake.jpg',
  },
  '/water-systems/wetlands': {
    title: 'Wetlands & Ramsar Sites of Kashmir — Hokersar, Haigam, Shallabugh & Anchar',
    description:
      'Ecological baselines, NWIA hydro-morphological classifications, waterfowl habitats, and encroachment assessments for 80 Kashmir and Western Himalayan wetlands.',
    imagePath: '/images/water-module/water-wetland.jpg',
  },
  '/water-systems/glaciers': {
    title: 'Glaciers of Kashmir & Western Himalaya — Kolahoi, Machoi, Siachen & Cryosphere',
    description:
      'Decadal glacier recession rates, mass balance baselines, elevation profiles, and GLOF susceptibility across 99 Western Himalayan and Karakoram glaciers.',
    imagePath: '/images/water-module/water-glacier.jpg',
  },
  '/water-systems/rivers': {
    title: 'Rivers & Tributaries of Kashmir — Jhelum, Lidder, Sind, Chenab & Indus Hydrology',
    description:
      'Basin hydrology, discharge regimes, water quality, riverbed mining impacts, and flood thresholds across 127 rivers and mountain streams in the Western Himalaya.',
    imagePath: '/images/water-module/water-river.jpg',
  },
  '/water-systems/springs': {
    title: 'Karst & Alluvial Springs of Kashmir — Verinag, Kokernag, Achabal & Aquifer Health',
    description:
      'Hydrogeological inventory, discharge trends, and spring-shed conservation profiles for 100 freshwater and thermal springs across Kashmir.',
    imagePath: '/images/water-module/springs.jpg',
  },
  '/water-systems/nwia-classification': {
    title: 'NWIA Wetland Inventory & High-Altitude Lakes Classification Explorer',
    description:
      'Interactive National Wetland Inventory and Assessment (NWIA) dataset explorer covering 42,663 ha of district wetlands and 2,106 high-altitude alpine lakes with CSV/JSON export.',
  },
  '/biodiversity': {
    title: 'Biodiversity & Species Intelligence — Hangul, Wildlife, Birds, Fish & Flora',
    description:
      'Taxonomic and conservation intelligence covering 2,799+ documented Western Himalayan species, Red Data Book threatened fauna, migratory waterbirds, endemic plants, and cold-water fisheries.',
    imagePath: '/images/biodiversity/biodiversity-hangul-stag.jpg',
  },
  '/biodiversity/threatened-species': {
    title: 'Threatened Species & Red Data Book of Kashmir Fauna and Flora',
    description:
      'IUCN Red List and Wildlife Protection Act profiles of Critically Endangered, Endangered, and Vulnerable species of Kashmir including Hangul, Snow Leopard, Markhor, and endemic alpine herbs.',
    imagePath: '/images/biodiversity/biodiversity-hangul-stag.jpg',
  },
  '/citizen-science': {
    title: 'Citizen Science & Community Ecological Observation Network',
    description:
      'Participatory environmental science programs, field verification protocols, wildlife sighting masks, and community watershed stewardship across Kashmir.',
  },
  '/hazard-intelligence': {
    title: 'Natural Hazard & Early Warning Intelligence — Floods, Earthquakes, Landslides & GLOFs',
    description:
      'Multi-hazard environmental intelligence integrating USGS/EMSC seismic feeds, Open-Meteo hydro-meteorology, avalanche corridors, NH-44 landslide susceptibility, forest fires, and GLOF monitoring.',
    imagePath: '/images/hazard-intelligence/hazard-command-center.jpg',
  },
  '/sectoral-eia': {
    title: 'Sectoral Environmental Impact Assessment (SEIAE) — Tourism, Agriculture, Horticulture & Crafts',
    description:
      'Quantitative environmental impact assessments for Kashmir tourism carrying capacity, paddy land conversion, orchard agrochemicals, and traditional handicraft lifecycles.',
  },
  '/earth-human-impact': {
    title: 'Earth & Human Impact Observatory — Satellite Change Detection & Land-Use Science',
    description:
      'Multi-decadal remote sensing observatory tracking wetland shrinkage, glacier recession, Karewa excavation, urban sprawl, and ecological restoration across the Western Himalaya.',
    imagePath: '/images/earth-human-impact/ehii-command-center-satellite.jpg',
  },
  '/field-reports': {
    title: 'Field Intelligence Reports & Ecological Survey Bulletins',
    description:
      'Field-verified ecological surveys, limnological assessments, wildlife census bulletins, and hazard reconnaissance reports across Kashmir districts.',
  },
  '/districts': {
    title: 'District Environmental Profiles — Kashmir, Jammu, Ladakh, AJ&K & Gilgit-Baltistan',
    description:
      'District-by-district environmental baselines covering watersheds, forest cover, air quality, wetlands, biodiversity indicators, and hazard susceptibility.',
  },
  '/webinars': {
    title: 'Scientific Webinars, Environmental Symposia & Himalayan Conferences',
    description:
      'Academic webinars, scientific conferences, speaker proceedings, and environmental research workshops hosted on Kashmir EcoWatch.',
  },
  '/search': {
    title: 'Universal Environmental Search & Cited Scientific Q&A Workbench',
    description:
      'Search 6,400+ verified ecological entities, lakes, wetlands, glaciers, species, GIS layers, and scientific reports across Kashmir EcoWatch in English, Urdu, and Kashmiri.',
  },
  '/environmental-monitoring/noise-pollution': {
    title: 'Noise Pollution Monitoring, Acoustic Zones & CPCB Standards — Environmental Monitoring',
    description:
      'Ambient acoustic monitoring, hospital and silent-zone decibel compliance, urban traffic noise contours, and district acoustic scores across Kashmir and the Western Himalaya.',
  },
  '/environmental-monitoring/transportation-pollution': {
    title: 'Transportation Emissions, NH-44 Corridor & Vehicular Pollution — Environmental Monitoring',
    description:
      'Vehicular tailpipe emissions inventory, NH-44 mountain freight corridor black-carbon loading, fleet electrification metrics, and district air-quality impacts across Kashmir.',
  },
  '/contribute-data/district-datasets': {
    title: 'Submit District Environmental Datasets — Contribute Data',
    description:
      'Contribute verified district-level environmental baselines, watershed tables, land-cover inventories, and municipal monitoring datasets to Kashmir EcoWatch Western Himalayan.',
  },
  '/contribute-data/geotagged-evidence': {
    title: 'Submit Geotagged Ecological Field Evidence — Contribute Data',
    description:
      'Upload GPS-referenced ecological observations, wetland boundary documentation, pollution incident imagery, and field verification records to Kashmir EcoWatch.',
  },
  '/contribute-data/monitoring-station-exports': {
    title: 'Submit Monitoring Station Telemetry Exports — Contribute Data',
    description:
      'Transmit automated weather, air-quality, hydrometric, and water-quality sensor CSV/JSON exports to the Kashmir EcoWatch Western Himalayan data intake pipeline.',
  },
  '/contribute-data/research-survey-data': {
    title: 'Submit Field Research & Academic Survey Datasets — Contribute Data',
    description:
      'Deposit peer-reviewed or institutional field survey datasets, limnological transects, and cryosphere observations for open-science archival on Kashmir EcoWatch.',
  },
  '/contribute-data/species-survey-records': {
    title: 'Submit Biodiversity & Species Survey Records — Contribute Data',
    description:
      'Contribute taxonomic checklists, avian point-counts, camera-trap summaries, and botanical phenology records across Western Himalayan habitats (with anti-poaching coordinate masking).',
  },
  '/contribute-data/water-quality-readings': {
    title: 'Submit Limnological & Water Quality Readings — Contribute Data',
    description:
      'Submit APHA-standard physicochemical water quality readings (pH, DO, BOD, conductivity, nutrients) for lakes, wetlands, rivers, and springs across Kashmir.',
  },
};

const ACRONYM_MAP: Record<string, string> = {
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
  hwc: 'Human-Wildlife Conflict',
  aqi: 'AQI',
  stp: 'STP',
};

function formatSegment(seg: string): string {
  return seg
    .split('-')
    .map((w) => ACRONYM_MAP[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Generates accurate, unique, brand-consistent Metadata for any static route path.
 */
export function getStaticRouteMetadata(routePath: string): Metadata {
  const normalized =
    routePath.length > 1 && routePath.endsWith('/') ? routePath.slice(0, -1) : routePath || '/';

  if (isNonPublicRoute(normalized)) {
    const label = normalized
      .split('/')
      .filter(Boolean)
      .map(formatSegment)
      .join(' · ');
    return buildPageMetadata({
      title: `${label || 'Administrative Console'} — Internal Operations`,
      description: `Restricted administrative and operational workspace on ${KEW_IDENTITY.officialName}.`,
      canonicalPath: normalized,
      noIndex: true,
    });
  }

  const curated = CURATED_STATIC_ROUTES[normalized];
  if (curated) {
    return buildPageMetadata({
      title: curated.title,
      description: curated.description,
      canonicalPath: normalized,
      imagePath: curated.imagePath,
      keywords: curated.keywords,
    });
  }

  const extracted = EXTRACTED_ROUTE_METADATA[normalized];
  const segments = normalized.split('/').filter(Boolean);
  const formattedSegments = segments.map(formatSegment);
  const leaf = formattedSegments[formattedSegments.length - 1] || 'Environmental Intelligence';
  const parentChain = formattedSegments.slice(0, -1).join(' · ');

  if (extracted && (extracted.title || extracted.description)) {
    const cleanExtractedTitle = extracted.title || leaf;
    const contextualTitle =
      parentChain && !cleanExtractedTitle.toLowerCase().includes(formattedSegments[0].toLowerCase())
        ? `${cleanExtractedTitle} — ${parentChain}`
        : cleanExtractedTitle;
    const rawExtractedDesc = (extracted.description || '').trim();
    const contextualDesc =
      rawExtractedDesc.length >= 65
        ? rawExtractedDesc
        : `Scientific ${cleanExtractedTitle.toLowerCase()} intelligence, empirical baselines, geospatial mapping, and verified environmental data${
            parentChain ? ` under ${parentChain}` : ''
          } across Kashmir and the Western Himalaya, published by ${KEW_IDENTITY.extendedName}.`;

    return buildPageMetadata({
      title: contextualTitle,
      description: contextualDesc.slice(0, 300),
      canonicalPath: normalized,
      keywords: [
        cleanExtractedTitle,
        extracted.label || '',
        formattedSegments[0] || 'Kashmir Ecology',
        `Kashmir ${leaf.toLowerCase()}`,
      ].filter(Boolean),
    });
  }

  const pageTitle = parentChain
    ? `${leaf} — ${parentChain} (Western Himalaya)`
    : `${leaf} — Western Himalayan Environmental Intelligence`;

  const moduleContext = formattedSegments[0] || 'Environmental Science';
  const description = parentChain
    ? `Scientific ${leaf.toLowerCase()} intelligence, empirical baselines, geospatial indicators, and verified environmental data under ${parentChain} across Kashmir and the Western Himalaya, published by ${KEW_IDENTITY.extendedName}.`
    : `Comprehensive ${leaf.toLowerCase()} data, scientific monitoring, and ecological intelligence across Kashmir and the Western Himalaya on ${KEW_IDENTITY.extendedName}.`;

  return buildPageMetadata({
    title: pageTitle,
    description,
    canonicalPath: normalized,
    keywords: [
      leaf,
      moduleContext,
      `Kashmir ${leaf.toLowerCase()}`,
      `Western Himalayan ${moduleContext.toLowerCase()}`,
    ],
  });
}
