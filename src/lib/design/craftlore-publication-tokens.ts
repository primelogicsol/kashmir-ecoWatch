// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH × CRAFTLORE INSTITUTIONAL PUBLICATION DESIGN TOKENS
// Extracted directly from live https://www.craftlore.org/ production stylesheets
// (--premiere-*, --institutional-*, --primary-*, Merriweather + Inter typography).
// Scoped strictly to the KEW Scientific Publication System (HTML & A4 PDF).
// Zero modification to KEW global header, footer, or unrelated platform modules.
// ─────────────────────────────────────────────────────────────────────────────

import type React from 'react';
import type { ResearchDivisionId } from '@/types/sectoral-eia';

export const CRAFTLORE_PUBLICATION_TOKENS = {
  colors: {
    // Dark Premiere Observatory Theme (extracted from craftlore.org)
    premiereBg: '#080a12',
    institutionalDarkSolid: '#060610',
    premiereCard: '#11131c',
    premiereElevated: '#161923',
    premiereSurfaceBorder: '#202535',

    // Signature Craftlore Heritage Gold / Pashm Champagne & Walnut Bronze
    premiereGold: '#c6a87c',
    premiereGoldBorder: '#40382e',
    premiereGoldSoft: 'rgba(198, 168, 124, 0.12)',
    walnutBronze: '#805a38',
    walnutDeep: '#4a3728',
    ochreHighlight: '#a07855',

    // Editorial Ivory & Warm Archival Paper (Print / Light Editorial Spreads)
    premiereIvory: '#f4f0e8',
    archivalPaperLight: '#faf8f5',
    archivalParchment: '#f4efe6',
    archivalWarmRule: '#e5ded3',
    archivalMutedBorder: '#d1c7b7',
    editorialInkDark: '#120f0d',
    editorialCharcoal: '#263442',

    // Text Hierarchy (Dark Mode)
    textPrimary: '#f4f0e8',
    textSecondary: '#d0d2da',
    textMuted: '#b4b8c2',
    textSubtle: '#8a8682',

    // Registry Scientific Accents (extracted from craftlore.org --primary-* & --premiere-cyan)
    registryNavy: '#17365d',
    registryDeepNavy: '#0f233d',
    registryBlue: '#0284c7',
    registrySky: '#0ea5e9',
    premiereCyan: '#38bdf8',
    ecologicalEmerald: '#10b981',
    warningAmber: '#fbbf24',
  },

  // Exact normalized [0..1] RGB tuples for our %PDF-1.4 A4 Monograph Engine
  pdfRgb: {
    coverObsidian: [0.031, 0.039, 0.071] as [number, number, number], // #080a12
    coverElevated: [0.086, 0.098, 0.137] as [number, number, number], // #161923
    heritageGold: [0.776, 0.659, 0.486] as [number, number, number],  // #c6a87c
    walnutBronze: [0.502, 0.353, 0.220] as [number, number, number],  // #805a38
    goldHairline: [0.251, 0.220, 0.180] as [number, number, number],  // #40382e
    ivoryText: [0.957, 0.941, 0.910] as [number, number, number],     // #f4f0e8
    warmPaper: [0.980, 0.973, 0.961] as [number, number, number],     // #faf8f5
    parchmentBox: [0.957, 0.937, 0.902] as [number, number, number],  // #f4efe6
    paperBorder: [0.820, 0.780, 0.718] as [number, number, number],   // #d1c7b7
    inkPrimary: [0.071, 0.059, 0.051] as [number, number, number],    // #120f0d
    inkSecondary: [0.149, 0.204, 0.259] as [number, number, number],  // #263442
    inkMuted: [0.450, 0.435, 0.420] as [number, number, number],      // #736f6b
    registryNavy: [0.090, 0.212, 0.365] as [number, number, number],  // #17365d
    registryBlue: [0.008, 0.518, 0.780] as [number, number, number],  // #0284c7
    registryCyan: [0.220, 0.741, 0.973] as [number, number, number],  // #38bdf8
    kewEmerald: [0.063, 0.725, 0.506] as [number, number, number],    // #10b981
  },
} as const;

export type CoverGeometryPattern =
  | 'topographic_contours'
  | 'hydrological_isolines'
  | 'fibre_lattice'
  | 'seismic_wavefronts'
  | 'atmospheric_isobars'
  | 'geodesic_grid'
  | 'botanical_phyllotaxis'
  | 'stratigraphic_horizons';

export function getCoverGeometryForDivision(
  divisionId: ResearchDivisionId
): {
  pattern: CoverGeometryPattern;
  disciplineSuperLabel: string;
  accentHex: string;
} {
  switch (divisionId) {
    case 'sector-03-handicrafts':
      return {
        pattern: 'fibre_lattice',
        disciplineSuperLabel: 'ENVIRONMENTAL SCIENCE / INDUSTRIAL ECOLOGY',
        accentHex: '#c6a87c',
      };
    case 'sector-01-tourism':
    case 'sector-21-resource-sustainability':
      return {
        pattern: 'topographic_contours',
        disciplineSuperLabel: 'CARRYING CAPACITY / SUSTAINABILITY SCIENCE',
        accentHex: '#c6a87c',
      };
    case 'sector-02-horticulture':
    case 'sector-04-agriculture':
    case 'sector-16-forestry-terrestrial':
      return {
        pattern: 'botanical_phyllotaxis',
        disciplineSuperLabel: 'TERRESTRIAL & AGRO-ECOLOGICAL SCIENCES',
        accentHex: '#10b981',
      };
    case 'sector-05-water-resources':
    case 'sector-13-cryosphere-hydrology':
    case 'sector-14-aquatic-ecology':
      return {
        pattern: 'hydrological_isolines',
        disciplineSuperLabel: 'CRYOSPHERE, HYDROLOGY & LIMNOLOGICAL SCIENCES',
        accentHex: '#38bdf8',
      };
    case 'sector-06-mining-extraction':
    case 'sector-20-earth-geospatial':
      return {
        pattern: 'stratigraphic_horizons',
        disciplineSuperLabel: 'EARTH SYSTEMS, QUATERNARY GEOLOGY & GEOMATICS',
        accentHex: '#c6a87c',
      };
    case 'sector-17-natural-hazards':
      return {
        pattern: 'seismic_wavefronts',
        disciplineSuperLabel: 'GEOHAZARDS, SEISMOTECTONICS & DISASTER RESILIENCE',
        accentHex: '#0ea5e9',
      };
    case 'sector-09-transportation-air':
    case 'sector-18-climate-atmospheric':
    case 'sector-19-pollution-public-health':
      return {
        pattern: 'atmospheric_isobars',
        disciplineSuperLabel: 'ATMOSPHERIC PHYSICS, CLIMATE & ENVIRONMENTAL HEALTH',
        accentHex: '#38bdf8',
      };
    case 'sector-15-biodiversity-conservation':
      return {
        pattern: 'botanical_phyllotaxis',
        disciplineSuperLabel: 'CONSERVATION BIOLOGY & WILDLIFE ECOLOGY',
        accentHex: '#c6a87c',
      };
    default:
      return {
        pattern: 'geodesic_grid',
        disciplineSuperLabel: 'INTERDISCIPLINARY ENVIRONMENTAL INTELLIGENCE',
        accentHex: '#c6a87c',
      };
  }
}

/**
 * Inline CSS variables scoped strictly to the report container so Craftlore
 * styling never leaks into unrelated KEW pages or global stylesheets.
 */
export function getScopedCraftloreCssVars(theme: 'dark' | 'parchment' = 'dark'): React.CSSProperties {
  if (theme === 'parchment') {
    return {
      '--cl-bg': '#faf8f5',
      '--cl-card': '#f4f0e8',
      '--cl-elevated': '#ede5d8',
      '--cl-border': '#d1c7b7',
      '--cl-gold': '#805a38',
      '--cl-gold-bright': '#a07855',
      '--cl-text-primary': '#120f0d',
      '--cl-text-secondary': '#263442',
      '--cl-text-muted': '#525252',
      '--cl-accent-cyan': '#0284c7',
    } as React.CSSProperties;
  }

  return {
    '--cl-bg': '#080a12',
    '--cl-card': '#11131c',
    '--cl-elevated': '#161923',
    '--cl-border': '#40382e',
    '--cl-gold': '#c6a87c',
    '--cl-gold-bright': '#e5ded3',
    '--cl-text-primary': '#f4f0e8',
    '--cl-text-secondary': '#d0d2da',
    '--cl-text-muted': '#b4b8c2',
    '--cl-accent-cyan': '#38bdf8',
  } as React.CSSProperties;
}
