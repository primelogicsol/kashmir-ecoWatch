import { type BiodiversitySpecies } from '../types/biodiversity';
export type { BiodiversitySpecies };
import { mammalsPhase1 } from './species/mammals';
import { birdsPhase1 } from './species/birds';
import { fishPhase1 } from './species/fish';
import { threatenedPhase1 } from './species/threatened';
import { medicinalPhase1 } from './species/medicinal';
import { plantsPhase1 } from './species/plants';

export const mammalsData: BiodiversitySpecies[] = mammalsPhase1;
export const birdsData: BiodiversitySpecies[] = birdsPhase1;
export const fishData: BiodiversitySpecies[] = fishPhase1;
export const plantsData: BiodiversitySpecies[] = plantsPhase1;
export const medicinalPlantsData: BiodiversitySpecies[] = medicinalPhase1;
export const threatenedSpeciesData: BiodiversitySpecies[] = threatenedPhase1;

export const getBiodiversityData = {
  mammals: {
    all: () => mammalsData,
    bySlug: (slug: string) => mammalsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => mammalsData.filter(s => s.conservationStatus === status),
    byDistrict: (district: string) => mammalsData.filter(s => s.districts.includes(district)),
    byProtectedArea: (pa: string) => mammalsData.filter(s => s.protectedAreas.includes(pa)),
  },
  birds: {
    all: () => birdsData,
    bySlug: (slug: string) => birdsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => birdsData.filter(s => s.conservationStatus === status),
    byCategory: (category: string) => birdsData.filter(s => s.category === category),
  },
  fish: {
    all: () => fishData,
    bySlug: (slug: string) => fishData.find(s => s.slug === slug),
  },
  plants: {
    all: () => plantsData,
    bySlug: (slug: string) => plantsData.find(s => s.slug === slug),
  },
  medicinalPlants: {
    all: () => medicinalPlantsData,
    bySlug: (slug: string) => medicinalPlantsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => medicinalPlantsData.filter(s => s.conservationStatus === status),
  },
  threatened: {
    all: () => threatenedSpeciesData,
    bySlug: (slug: string) => threatenedSpeciesData.find(s => s.slug === slug),
    byTaxonomicGroup: (group: string) => threatenedSpeciesData.filter(s => s.taxonomicGroup === group),
  },
  all: {
    bySlug: (slug: string): BiodiversitySpecies | undefined => {
      return [
        ...mammalsData,
        ...birdsData,
        ...fishData,
        ...plantsData,
        ...medicinalPlantsData,
      ].find(s => s.slug === slug);
    },
  },
};

export const biodiversityMetrics = {
  totalSpecies: 2732,
  mammals: mammalsData.length,
  birds: birdsData.length,
  fish: fishData.length,
  plants: plantsData.length,
  medicinalPlants: medicinalPlantsData.length,
  threatened: threatenedSpeciesData.length,
  activeSightings: 4521,
  protectedAreaOverlap: 47,
};
