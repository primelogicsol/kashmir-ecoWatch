/**
 * KASHMIR ECOWATCH — CANONICAL VERIFIED SPECIES REGISTRY BARREL
 *
 * Exports taxonomically verified Western Himalayan species profiles:
 * - Mammals: 111 verified species (bioclimatically validated occurrence envelopes)
 * - Birds: 46 unique verified species (550 synthetic "Family sp. N" quarantined; 5 duplicates merged)
 * - Freshwater Fish: 54 verified Actinopterygii species (12 non-fish aquatic taxa quarantined)
 * - Reference Vascular Flora: 28 verified species (1,806 synthetic "Genus specio-N" quarantined)
 * - Core Verified Species Total: 239 profiles
 * - Specialized Sub-Registries: 127 Medicinal Ethnobotanical Flora & 60 Priority Threatened Profiles
 */

import {
  plantsPhase1,
  plantsData,
  QUARANTINED_SYNTHETIC_PLANTS_SUMMARY,
} from './plants';
import {
  birdsPhase1,
  birdsData,
  QUARANTINED_SYNTHETIC_BIRDS_SUMMARY,
} from './birds';
import {
  fishPhase1,
  fishData,
  QUARANTINED_NON_FISH_TAXA_SUMMARY,
} from './fish';
import { mammalsPhase1, mammalsData } from './mammals';
import {
  medicinalPhase1,
  medicinalPlantsData,
  medicinalEthnoDetails,
  type MedicinalEthnoDetail,
} from './medicinal';
import { threatenedPhase1, threatenedSpeciesData } from './threatened';

export {
  plantsPhase1,
  plantsData,
  QUARANTINED_SYNTHETIC_PLANTS_SUMMARY,
  birdsPhase1,
  birdsData,
  QUARANTINED_SYNTHETIC_BIRDS_SUMMARY,
  fishPhase1,
  fishData,
  QUARANTINED_NON_FISH_TAXA_SUMMARY,
  mammalsPhase1,
  mammalsData,
  medicinalPhase1,
  medicinalPlantsData,
  medicinalEthnoDetails,
  type MedicinalEthnoDetail,
  threatenedPhase1,
  threatenedSpeciesData,
};

export const VERIFIED_CORE_SPECIES_DATA = [
  ...mammalsData,
  ...birdsData,
  ...fishData,
  ...plantsData,
];

export const VERIFIED_SPECIES_COUNTS = {
  mammals: mammalsData.length, // 111
  birds: birdsData.length, // 46
  fish: fishData.length, // 54
  plants: plantsData.length, // 28
  totalCoreVerified:
    mammalsData.length + birdsData.length + fishData.length + plantsData.length, // 239
  medicinalPlants: medicinalPlantsData.length, // 127
  threatenedProfiles: threatenedSpeciesData.length, // 60
  quarantinedTotal:
    QUARANTINED_SYNTHETIC_PLANTS_SUMMARY.count +
    QUARANTINED_SYNTHETIC_BIRDS_SUMMARY.count +
    QUARANTINED_NON_FISH_TAXA_SUMMARY.count, // 2,368 (+ 5 deduplicated birds)
} as const;

export const SPECIES_SCIENTIFIC_PROVENANCE_NOTE =
  'Displaying 239 taxonomically verified core species profiles (111 Mammals, 46 Avifauna, 54 Freshwater Fish, and 28 Reference Vascular Flora) alongside 127 ethnobotanical medicinal profiles. A total of 2,368 synthetic placeholder or taxonomically misclassified records (1,806 synthetic flora, 550 synthetic birds, and 12 non-fish aquatic taxa) have been quarantined pending primary herbarium voucher and regional checklist verification.';

export const QUARANTINED_SPECIES_SUMMARIES = [
  QUARANTINED_SYNTHETIC_PLANTS_SUMMARY,
  QUARANTINED_SYNTHETIC_BIRDS_SUMMARY,
  QUARANTINED_NON_FISH_TAXA_SUMMARY,
] as const;
