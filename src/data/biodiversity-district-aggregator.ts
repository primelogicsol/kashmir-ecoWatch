import { GEOGRAPHY, Scope, AdminUnit } from './geography';
import { mammalsPhase1 } from './species/mammals';
import { birdsPhase1 } from './species/birds';
import { fishPhase1 } from './species/fish';
import { plantsPhase1 } from './species/plants';
import { medicinalPhase1 } from './species/medicinal';
import { threatenedPhase1 } from './species/threatened';
import { protectedAreaRegistry } from './protected-area-registry';
import { lakesData, wetlandsData, riversData, springsData } from './water-systems';
import { masterForestDatabase } from './forest-ecosystems';

export interface DistrictSpeciesSummary {
  total: number;
  mammals: number;
  birds: number;
  fish: number;
  plants: number;
  medicinal: number;
  threatened: number;
  endemic: number;
}

export interface DistrictHabitatSummary {
  forestCoverPercentage: number | null;
  forestCoverSqKm?: number | null;
  protectedAreasCount: number;
  protectedAreaNames: string[];
  wetlandsCount: number;
  lakesCount: number;
  riversCount: number;
  springsCount: number;
}

export interface DistrictBiodiversityProfile {
  district: string;
  scope: string;
  speciesSummary: DistrictSpeciesSummary;
  habitatSummary: DistrictHabitatSummary;
}

export function getDistrictSpeciesSummary(district: string): DistrictSpeciesSummary {
  // A helper to safely check if a species array has the district
  const hasDistrict = (speciesArray: any[]) => {
    return speciesArray.filter(s => s.districts && s.districts.includes(district));
  };

  const dMammals = hasDistrict(mammalsPhase1);
  const dBirds = hasDistrict(birdsPhase1);
  const dFish = hasDistrict(fishPhase1);
  const dPlants = hasDistrict(plantsPhase1);
  const dMedicinal = hasDistrict(medicinalPhase1);
  
  const allSpecies = [
    ...dMammals,
    ...dBirds,
    ...dFish,
    ...dPlants,
    ...dMedicinal
  ];
  
  // Deduplicate by slug
  const uniqueMap = new Map();
  allSpecies.forEach(s => uniqueMap.set(s.slug, s));
  
  const uniqueSpecies = Array.from(uniqueMap.values());
  
  const threatened = uniqueSpecies.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus));
  const endemic = uniqueSpecies.filter(s => s.endemismStatus && s.endemismStatus.includes('endemic'));

  return {
    total: uniqueSpecies.length,
    mammals: dMammals.length,
    birds: dBirds.length,
    fish: dFish.length,
    plants: dPlants.length,
    medicinal: dMedicinal.length,
    threatened: threatened.length,
    endemic: endemic.length
  };
}

export function getDistrictHabitatSummary(district: string): DistrictHabitatSummary {
  const forestData = masterForestDatabase.find(f => f.District_Name === district);
  
  const pAreas = protectedAreaRegistry.filter(pa => pa.district === district);
  
  const dLakes = lakesData.filter(l => l.district === district);
  const dWetlands = wetlandsData.filter(w => w.district === district);
  const dRivers = riversData.filter(r => r.district === district);
  const dSprings = springsData.filter(s => s.district === district);

  return {
    forestCoverPercentage: forestData && forestData.Forest_Cover_Percent !== 'Pending' ? Number(forestData.Forest_Cover_Percent) : null,
    forestCoverSqKm: forestData && forestData.Forest_Cover_SqKm ? Number(forestData.Forest_Cover_SqKm) : null,
    protectedAreasCount: pAreas.length,
    protectedAreaNames: pAreas.map(pa => pa.name),
    wetlandsCount: dWetlands.length,
    lakesCount: dLakes.length,
    riversCount: dRivers.length,
    springsCount: dSprings.length
  };
}

export function getDistrictProfile(district: string): DistrictBiodiversityProfile {
  // Determine scope
  let scope = 'Unknown';
  for (const [s, regions] of Object.entries(GEOGRAPHY.regions)) {
    for (const region of regions) {
      const units = (GEOGRAPHY.units as any)[region];
      if (units && units.includes(district)) {
        scope = s;
        break;
      }
    }
  }

  return {
    district,
    scope,
    speciesSummary: getDistrictSpeciesSummary(district),
    habitatSummary: getDistrictHabitatSummary(district)
  };
}

export function getAllDistrictProfiles(): DistrictBiodiversityProfile[] {
  const allUnits = Object.values(GEOGRAPHY.units).flat();
  return allUnits.map(unit => getDistrictProfile(unit));
}
