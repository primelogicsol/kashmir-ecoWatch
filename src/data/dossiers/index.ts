// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — RECONSTRUCTED SCIENTIFIC DOSSIER REGISTRY INDEX
// Aggregates all individually researched, discipline-specific scientific
// dossiers (KEW-SR-2026-01 through KEW-SR-2026-100 + Flagship KEW-SR-2026-101).
// ─────────────────────────────────────────────────────────────────────────────

import type { IndividualScientificDossierSpec } from '@/types/scientific-dossier-reconstruction';

import { COHORT_01_DOSSIERS } from './cohort-01';
import { COHORT_02_DOSSIERS } from './cohort-02';
import { COHORT_03_DOSSIERS } from './cohort-03';
import { COHORT_04_DOSSIERS } from './cohort-04';
import { COHORT_05_DOSSIERS } from './cohort-05';
import { COHORT_06_DOSSIERS } from './cohort-06';
import { COHORT_07_DOSSIERS } from './cohort-07';
import { COHORT_08_DOSSIERS } from './cohort-08';
import { COHORT_09_DOSSIERS } from './cohort-09';
import { COHORT_10_DOSSIERS } from './cohort-10';
import { COHORT_11_DOSSIERS } from './cohort-11';
import { COHORT_12_DOSSIERS } from './cohort-12';
import { COHORT_13_DOSSIERS } from './cohort-13';
import { COHORT_14_DOSSIERS } from './cohort-14';
import { COHORT_15_DOSSIERS } from './cohort-15';
import { COHORT_16_DOSSIERS } from './cohort-16';
import { COHORT_17_DOSSIERS } from './cohort-17';
import { COHORT_18_DOSSIERS } from './cohort-18';
import { COHORT_19_DOSSIERS } from './cohort-19';
import { COHORT_20_DOSSIERS } from './cohort-20';
import { COHORT_21_DOSSIERS } from './cohort-21';
import { COHORT_22_DOSSIERS } from './cohort-22';
import { COHORT_23_DOSSIERS } from './cohort-23';
import { COHORT_24_DOSSIERS } from './cohort-24';
import { COHORT_25_DOSSIERS } from './cohort-25';
import {
  FLAGSHIP_101_APPENDICES,
  FLAGSHIP_101_LAKES_MONOGRAPH,
  type FlagshipScientificAppendix,
} from './flagship-101-lakes';

export { FLAGSHIP_101_APPENDICES, FLAGSHIP_101_LAKES_MONOGRAPH };
export type { FlagshipScientificAppendix };

export const ALL_RECONSTRUCTED_100_DOSSIERS: IndividualScientificDossierSpec[] = [
  ...COHORT_01_DOSSIERS,
  ...COHORT_02_DOSSIERS,
  ...COHORT_03_DOSSIERS,
  ...COHORT_04_DOSSIERS,
  ...COHORT_05_DOSSIERS,
  ...COHORT_06_DOSSIERS,
  ...COHORT_07_DOSSIERS,
  ...COHORT_08_DOSSIERS,
  ...COHORT_09_DOSSIERS,
  ...COHORT_10_DOSSIERS,
  ...COHORT_11_DOSSIERS,
  ...COHORT_12_DOSSIERS,
  ...COHORT_13_DOSSIERS,
  ...COHORT_14_DOSSIERS,
  ...COHORT_15_DOSSIERS,
  ...COHORT_16_DOSSIERS,
  ...COHORT_17_DOSSIERS,
  ...COHORT_18_DOSSIERS,
  ...COHORT_19_DOSSIERS,
  ...COHORT_20_DOSSIERS,
  ...COHORT_21_DOSSIERS,
  ...COHORT_22_DOSSIERS,
  ...COHORT_23_DOSSIERS,
  ...COHORT_24_DOSSIERS,
  ...COHORT_25_DOSSIERS,
  FLAGSHIP_101_LAKES_MONOGRAPH,
];

const BY_CODE = new Map<string, IndividualScientificDossierSpec>();
for (const spec of ALL_RECONSTRUCTED_100_DOSSIERS) {
  BY_CODE.set(spec.code.toUpperCase(), spec);
}

export function registerAdditionalDossierSpec(spec: IndividualScientificDossierSpec) {
  BY_CODE.set(spec.code.toUpperCase(), spec);
}

export function getReconstructedDossierSpec(
  code: string
): IndividualScientificDossierSpec | undefined {
  return BY_CODE.get(code.trim().toUpperCase());
}
