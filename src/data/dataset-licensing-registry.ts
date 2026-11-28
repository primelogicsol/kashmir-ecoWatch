/**
 * KASHMIR ECOWATCH — DATASET & CONTENT LICENSING REGISTRY
 *
 * Implements the resolved licensing framework:
 * - CC BY-NC 4.0 for eligible KEW-authored non-commercial datasets, synthesis tables, and desk-verified reports.
 * - Explicit retention of third-party publisher / statutory / agency rights on external datasets & APIs.
 * - Restricted / Generalized access on sensitive threatened species coordinates.
 * - Separate IP protection on EcoVoices cultural/musical works and proprietary KEW platform software.
 * - Never characterizes CC BY-NC 4.0 as "unrestricted open data" (commercial reuse is reserved).
 */

export type DatasetLicenseCode =
  | 'CC-BY-NC-4.0'
  | 'THIRD-PARTY-STATUTORY-OR-AGENCY'
  | 'THIRD-PARTY-OPEN-ATTRIBUTION'
  | 'RESTRICTED-CONSERVATION-SENSITIVE'
  | 'CULTURAL-ARTIST-RIGHTS-RESERVED'
  | 'PROPRIETARY-PLATFORM-SOFTWARE';

export interface DatasetLicensePolicy {
  code: DatasetLicenseCode;
  name: string;
  shortBadge: string;
  url?: string;
  commercialUsePermitted: boolean;
  attributionRequired: boolean;
  summary: string;
  citationTemplate: string;
}

export const DATASET_LICENSE_POLICIES: Record<DatasetLicenseCode, DatasetLicensePolicy> = {
  'CC-BY-NC-4.0': {
    code: 'CC-BY-NC-4.0',
    name: 'Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
    shortBadge: 'CC BY-NC 4.0 (Non-Commercial)',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'Eligible KEW-authored synthesis datasets, taxonomic/geographic reference tables, and desk-verified reports may be shared and adapted for non-commercial academic, educational, journalistic, and civic conservation purposes with attribution to Kashmir EcoWatch and underlying primary sources. Commercial reuse requires prior written permission.',
    citationTemplate:
      'Kashmir EcoWatch (2026). [Dataset / Report Title]. Licensed under CC BY-NC 4.0 (Non-Commercial). Available at https://kashmir-ecowatch.com',
  },
  'THIRD-PARTY-STATUTORY-OR-AGENCY': {
    code: 'THIRD-PARTY-STATUTORY-OR-AGENCY',
    name: 'Third-Party Government, Statutory, or Journal Publisher Terms Retained',
    shortBadge: 'Third-Party Rights Retained',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'Official government reports, statutory atlases (ISRO NWIA, FSI ISFR, Census of India, CAG Reports, Ramsar RSIS), judicial orders, and peer-reviewed journal articles linked or summarized in KEW remain governed by their original statutory or publisher copyright terms. KEW does not re-license third-party publications under CC BY-NC 4.0.',
    citationTemplate:
      'Cite the original issuing statutory agency, laboratory, or journal publisher directly using the DOI or official publication reference.',
  },
  'THIRD-PARTY-OPEN-ATTRIBUTION': {
    code: 'THIRD-PARTY-OPEN-ATTRIBUTION',
    name: 'Upstream Open Scientific API / Satellite Attribution Terms',
    shortBadge: 'Upstream Open API Terms',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'External scientific feeds (Open-Meteo CC BY 4.0 non-commercial API tier, Copernicus CAMS/GloFAS/Sentinel-2, USGS Public Domain seismic catalog, AirGradient CC BY-SA 4.0 community telemetry) are governed by their respective upstream provider licenses.',
    citationTemplate:
      'Retain upstream attribution to Open-Meteo, Copernicus ECMWF, USGS ANSS, EMSC, NCS, or AirGradient as indicated in dataset metadata.',
  },
  'RESTRICTED-CONSERVATION-SENSITIVE': {
    code: 'RESTRICTED-CONSERVATION-SENSITIVE',
    name: 'Restricted / Generalized Conservation-Sensitive Occurrence Data',
    shortBadge: 'Conservation-Restricted (Masked GPS)',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'Fine-scale GPS coordinates of Critically Endangered, Endangered, and poaching-vulnerable wildlife (Hangul, Snow Leopard, Flare-horned Markhor, Kashmir Musk Deer, Western Tragopan, Black-necked Crane nests, and threatened medicinal flora) are masked or generalized to >=10 km / district grids under IUCN Sensitive Data Best Practices.',
    citationTemplate:
      'Exact locality coordinates withheld under KEW Wildlife Anti-Poaching & Sensitive Species Data Protocol.',
  },
  'CULTURAL-ARTIST-RIGHTS-RESERVED': {
    code: 'CULTURAL-ARTIST-RIGHTS-RESERVED',
    name: 'Cultural, Poetic & Musical Works — Specific Rights Reserved',
    shortBadge: 'Artist & Cultural Rights Reserved',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'EcoVoices audio recordings, musical compositions, vocal performances, and documentary photography remain subject to creator/performer rights and are excluded from open dataset export licenses.',
    citationTemplate: '© Respective Artists / Kashmir EcoVoices Archive. All musical and vocal rights reserved.',
  },
  'PROPRIETARY-PLATFORM-SOFTWARE': {
    code: 'PROPRIETARY-PLATFORM-SOFTWARE',
    name: 'Proprietary Platform Software & Visual Architecture — All Rights Reserved',
    shortBadge: 'All Rights Reserved (Software)',
    commercialUsePermitted: false,
    attributionRequired: true,
    summary:
      'Kashmir EcoWatch application source code, UI design system, institutional trademarks, and custom visualization engines are proprietary (© 2026 Kashmir EcoWatch. All rights reserved).',
    citationTemplate: '© 2026 Kashmir EcoWatch. Platform software and visual identity all rights reserved.',
  },
};

export interface DatasetCategoryLicenseMapping {
  categorySlug: string;
  title: string;
  licenseCode: DatasetLicenseCode;
  upstreamSourcesNote: string;
  redistributionScope: string;
}

export const DATASET_CATEGORY_LICENSE_MAPPINGS: DatasetCategoryLicenseMapping[] = [
  {
    categorySlug: 'geographic-and-ramsar-taxonomy',
    title: 'KEW Harmonized 5-Region District & Ramsar Reference Registry',
    licenseCode: 'CC-BY-NC-4.0',
    upstreamSourcesNote: 'Compiled from public administrative gazettes and Ramsar RSIS (#461, #1213, #1570, #1573, #2443, #2488, #2496).',
    redistributionScope: 'Non-commercial reuse permitted with attribution to KEW and Ramsar RSIS.',
  },
  {
    categorySlug: 'kew-investigations-and-sectoral-syntheses',
    title: 'KEW Desk-Verified Investigation Matrices & Sectoral Synthesis Tables',
    licenseCode: 'CC-BY-NC-4.0',
    upstreamSourcesNote: 'Original KEW synthesis metadata licensed CC BY-NC 4.0; cited external CAG/ISRO/journal papers retain publisher copyright.',
    redistributionScope: 'Non-commercial academic, journalistic, and policy citation with attribution.',
  },
  {
    categorySlug: 'biodiversity-verified-checklists',
    title: 'Verified Western Himalayan Species Checklists (Generalized Range Envelopes)',
    licenseCode: 'CC-BY-NC-4.0',
    upstreamSourcesNote: 'Taxonomic metadata harmonized with IUCN / WII / FishBase; sensitive CR/EN point coordinates are masked.',
    redistributionScope: 'Non-commercial checklist reuse permitted; fine-scale sensitive coordinates excluded.',
  },
  {
    categorySlug: 'sensitive-wildlife-occurrences',
    title: 'Threatened Wildlife & Endemic Medicinal Plant Exact Coordinates',
    licenseCode: 'RESTRICTED-CONSERVATION-SENSITIVE',
    upstreamSourcesNote: 'IUCN SSC Sensitive Species Data Guidelines.',
    redistributionScope: 'Publicly generalized to district / >=10 km grid; exact coordinates restricted.',
  },
  {
    categorySlug: 'external-agency-reports-and-atlases',
    title: 'External Government, Statutory & Peer-Reviewed Publications in Research Library',
    licenseCode: 'THIRD-PARTY-STATUTORY-OR-AGENCY',
    upstreamSourcesNote: 'ISRO SAC, FSI, CWC, CPCB, WII, CAG of India, MoEFCC, ICIMOD, and indexed academic journals.',
    redistributionScope: 'Governed by original agency/publisher copyright; KEW provides bibliographic metadata and external links only.',
  },
  {
    categorySlug: 'external-nwp-seismic-and-community-feeds',
    title: 'External Weather, GloFAS Discharge, Seismic & Community Air Feeds',
    licenseCode: 'THIRD-PARTY-OPEN-ATTRIBUTION',
    upstreamSourcesNote: 'Open-Meteo, Copernicus ECMWF CAMS/GloFAS, USGS ComCat, EMSC, NCS, AirGradient, NDMA SACHET.',
    redistributionScope: 'Subject to upstream API provider attribution and non-commercial terms.',
  },
  {
    categorySlug: 'ecovoices-audio-and-photography',
    title: 'EcoVoices Environmental Songs, Lyrics & Documentary Plates',
    licenseCode: 'CULTURAL-ARTIST-RIGHTS-RESERVED',
    upstreamSourcesNote: 'Kashmir EcoVoices creators and photographers.',
    redistributionScope: 'Personal/educational listening on platform; reproduction requires written permission.',
  },
];

export function resolveLicenseForLibraryOwner(isKewAuthored: boolean): DatasetLicensePolicy {
  return isKewAuthored
    ? DATASET_LICENSE_POLICIES['CC-BY-NC-4.0']
    : DATASET_LICENSE_POLICIES['THIRD-PARTY-STATUTORY-OR-AGENCY'];
}
