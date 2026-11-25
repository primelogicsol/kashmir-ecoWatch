// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI PERSISTENT SERVER STORE
// Merges canonical version-controlled investigations with persistent admin updates,
// official institutional responses, correction logs, and public intake proposals
// stored in data/environmental-investigations-store.json
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import {
  InvestigationDomainId,
  InvestigationRecord,
  InvestigationStatus,
  InvestigationSubmissionProposal,
  InvestigationUpdateLog,
} from '@/types/environmental-investigations';
import { CANONICAL_INVESTIGATIONS } from '@/data/environmental-investigations';

interface EiaiPersistentData {
  customInvestigations: InvestigationRecord[];
  statusOverrides: Record<string, { status: InvestigationStatus; statusLabel: string; updatedAt: string }>;
  appendedUpdates: Record<string, InvestigationUpdateLog[]>;
  institutionalResponses: Record<
    string,
    Array<{
      accountabilityId: string;
      institutionAcronym: string;
      responseText: string;
      recordedAt: string;
      recordedBy: string;
    }>
  >;
  recommendationStatusOverrides: Record<string, string>;
  proposals: InvestigationSubmissionProposal[];
}

const STORE_FILE = path.join(process.cwd(), 'data', 'environmental-investigations-store.json');

const EMPTY_STORE: EiaiPersistentData = {
  customInvestigations: [],
  statusOverrides: {},
  appendedUpdates: {},
  institutionalResponses: {},
  recommendationStatusOverrides: {},
  proposals: [],
};

export function readEiaiStore(): EiaiPersistentData {
  try {
    if (!fs.existsSync(STORE_FILE)) {
      return { ...EMPTY_STORE };
    }
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<EiaiPersistentData>;
    return {
      customInvestigations: Array.isArray(parsed.customInvestigations) ? parsed.customInvestigations : [],
      statusOverrides: parsed.statusOverrides || {},
      appendedUpdates: parsed.appendedUpdates || {},
      institutionalResponses: parsed.institutionalResponses || {},
      recommendationStatusOverrides: parsed.recommendationStatusOverrides || {},
      proposals: Array.isArray(parsed.proposals) ? parsed.proposals : [],
    };
  } catch {
    return { ...EMPTY_STORE };
  }
}

export function writeEiaiStore(data: EiaiPersistentData): void {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[KEW-EIAI Store] Unable to persist store:', err);
  }
}

export function getMergedInvestigations(): InvestigationRecord[] {
  const store = readEiaiStore();
  const mergedCanonical = CANONICAL_INVESTIGATIONS.map((inv) => {
    const ov = store.statusOverrides[inv.code];
    const extraUpdates = store.appendedUpdates[inv.code] || [];
    const instResps = store.institutionalResponses[inv.code] || [];

    const updatedAccountability = inv.accountabilityMatrix.map((acc) => {
      const matching = instResps.filter((r) => r.accountabilityId === acc.id);
      if (matching.length === 0) return acc;
      const latest = matching[matching.length - 1];
      return {
        ...acc,
        institutionalResponse: `${acc.institutionalResponse} [Official Update ${latest.recordedAt.slice(0, 10)}: ${latest.responseText}]`,
        followUpStatus: 'Response Recorded' as const,
      };
    });

    const updatedRecs = inv.recommendations.map((rec) => {
      const recOv = store.recommendationStatusOverrides[rec.id];
      return recOv ? { ...rec, status: recOv as any } : rec;
    });

    return {
      ...inv,
      ...(ov ? { status: ov.status, statusLabel: ov.statusLabel, lastUpdated: ov.updatedAt.slice(0, 10) } : {}),
      accountabilityMatrix: updatedAccountability,
      recommendations: updatedRecs,
      updatesLog: [...extraUpdates, ...inv.updatesLog],
    };
  });

  return [...mergedCanonical, ...store.customInvestigations];
}

export function addInvestigationProposal(input: {
  title: string;
  domainId: InvestigationDomainId;
  locationName: string;
  districts: string[];
  temporalPeriod: string;
  issueDescription: string;
  documentedSourcesProvided: string;
  proposerName: string;
  proposerEmail: string;
  proposerAffiliation?: string;
}): InvestigationSubmissionProposal {
  const store = readEiaiStore();
  const seq = String(store.proposals.length + 101).padStart(4, '0');
  const proposal: InvestigationSubmissionProposal = {
    id: `prop-${Date.now()}`,
    trackingCode: `KEW-INV-PROP-${seq}`,
    title: input.title.trim(),
    domainId: input.domainId,
    locationName: input.locationName.trim(),
    districts: input.districts,
    temporalPeriod: input.temporalPeriod.trim() || '2020–2026',
    issueDescription: input.issueDescription.trim(),
    documentedSourcesProvided: input.documentedSourcesProvided.trim(),
    proposerName: input.proposerName.trim(),
    proposerEmail: input.proposerEmail.trim(),
    proposerAffiliation: input.proposerAffiliation?.trim(),
    submittedAt: new Date().toISOString(),
    status: 'PENDING_TRIAGE',
  };
  store.proposals.unshift(proposal);
  writeEiaiStore(store);
  return proposal;
}
