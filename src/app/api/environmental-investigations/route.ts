import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  computeEiaiMetrics,
  DISCIPLINE_CLUSTERS,
  GLOBAL_PRECEDENT_CASE_STUDIES,
  INVESTIGATION_DOMAINS,
  INVESTIGATION_WORKFLOW_STAGES,
  PUBLICATION_FORMATS,
  runScientificValidation,
  STANDARD_REPORT_SECTIONS,
} from '@/data/environmental-investigations';
import {
  addInvestigationProposal,
  getMergedInvestigations,
  readEiaiStore,
  writeEiaiStore,
} from '@/lib/environmental-investigations-store';
import { InvestigationDomainId, InvestigationRecord } from '@/types/environmental-investigations';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const status = searchParams.get('status');
  const includeProposals = searchParams.get('proposals') === 'true';

  const allRecords = getMergedInvestigations();
  let filtered = allRecords;

  if (domain && domain !== 'all') {
    filtered = filtered.filter(
      (r) => r.primaryDomainId === domain || r.secondaryDomainIds.includes(domain as InvestigationDomainId)
    );
  }
  if (status && status !== 'all') {
    filtered = filtered.filter((r) => r.status === status);
  }

  const metrics = computeEiaiMetrics(allRecords);
  const store = readEiaiStore();
  const adminCheck = includeProposals
    ? await verifyAdminRequest(request)
    : { authorized: false, actor: 'anonymous', method: 'none' };

  return NextResponse.json({
    success: true,
    module: 'KEW-EIAI',
    fullTechnicalName: 'Environmental Investigation and Accountability Intelligence',
    metrics,
    investigations: filtered,
    taxonomy: {
      domainsCount: INVESTIGATION_DOMAINS.length,
      disciplineClustersCount: DISCIPLINE_CLUSTERS.length,
      standardSectionsCount: STANDARD_REPORT_SECTIONS.length,
      workflowStagesCount: INVESTIGATION_WORKFLOW_STAGES.length,
      publicationFormatsCount: PUBLICATION_FORMATS.length,
      precedentsCount: GLOBAL_PRECEDENT_CASE_STUDIES.length,
    },
    ...(includeProposals && adminCheck.authorized ? { proposals: store.proposals } : {}),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body?.action || 'submit_proposal';

    // 1. Public or Researcher Investigation Proposal Submission
    if (action === 'submit_proposal') {
      if (!body.title || !body.locationName || !body.issueDescription || !body.proposerName || !body.proposerEmail) {
        return NextResponse.json(
          { success: false, error: 'Missing required scoping fields (title, location, description, proposer contact).' },
          { status: 400 }
        );
      }

      const proposal = addInvestigationProposal({
        title: body.title,
        domainId: (body.domainId || '01-lakes-limnology') as InvestigationDomainId,
        locationName: body.locationName,
        districts: Array.isArray(body.districts)
          ? body.districts
          : body.district
          ? [body.district]
          : ['Srinagar'],
        temporalPeriod: body.temporalPeriod || '2020–2026',
        issueDescription: body.issueDescription,
        documentedSourcesProvided: body.documentedSourcesProvided || 'Pending documentary upload',
        proposerName: body.proposerName,
        proposerEmail: body.proposerEmail,
        proposerAffiliation: body.proposerAffiliation,
      });

      return NextResponse.json({
        success: true,
        proposal,
        message: `Investigation proposal registered under ${proposal.trackingCode} for Stage 01 Scoping Review.`,
      });
    }

    // 2. Admin: Initiate New Canonical Investigation Charter
    if (action === 'create_investigation') {
      const authCheck = await verifyAdminRequest(request);
      if (!authCheck.authorized) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Administrator session required to create canonical investigation charters.' },
          { status: 401 }
        );
      }
      const store = readEiaiStore();
      const all = getMergedInvestigations();
      const nextNum = String(all.length + 1).padStart(4, '0');
      const code = `KEW-INV-${nextNum}`;
      const slug =
        (body.slug || body.title || code)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || code.toLowerCase();

      const newRecord: InvestigationRecord = {
        code,
        slug,
        title: body.title,
        subtitle: body.subtitle || 'Multidisciplinary environmental scoping charter',
        shortTitle: body.shortTitle || body.title,
        status: body.status || 'proposed',
        statusLabel:
          body.status === 'scoping_review'
            ? 'Scoping Review (Stage 03)'
            : body.status === 'active_investigation'
            ? 'Active Investigation (Stage 05)'
            : 'Proposed Investigation (Stage 01)',
        temporalScope: body.temporalScope || '2020–2026',
        initiatedDate: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        version: 'v0.1 (Initiated Charter)',
        featured: false,
        heroImage: body.heroImage || '/images/earth-human-impact/ehii-command-center-satellite.jpg',
        heroImageCaption: body.heroImageCaption || `${body.title} — KEW-EIAI Investigation Scope`,
        subregion: body.subregion || 'Kashmir Valley',
        districts: Array.isArray(body.districts) ? body.districts : ['Srinagar'],
        watershedOrBasin: body.watershedOrBasin || 'Western Himalayan Basin',
        elevationRangeM: body.elevationRangeM || '1,580–3,500 m ASL',
        coordinates: Array.isArray(body.coordinates) && body.coordinates.length === 2 ? body.coordinates : [34.09, 74.82],
        connectedEcosystems: Array.isArray(body.connectedEcosystems) ? body.connectedEcosystems : [],
        primaryDomainId: (body.primaryDomainId || '01-lakes-limnology') as InvestigationDomainId,
        secondaryDomainIds: Array.isArray(body.secondaryDomainIds) ? body.secondaryDomainIds : [],
        disciplineIds: Array.isArray(body.disciplineIds) && body.disciplineIds.length > 0 ? body.disciplineIds : ['hydrology', 'remote-sensing', 'environmental-law'],
        linkedKewModules: [
          { moduleName: 'Research Library', route: '/research-library', contributionNote: 'Documentary evidence discovery' },
        ],
        relatedInvestigationCodes: [],
        scopingQuestions: Array.isArray(body.scopingQuestions) ? body.scopingQuestions : [body.scopingQuestion || 'What documented physical, ecological, and institutional evidence governs this environmental intervention?'],
        executiveKeyFindings: [
          'Initiated under Stage 01 Investigation Charter; empirical evidence compilation underway without predetermined conclusions.',
        ],
        chronology: [],
        interventionInventory: [],
        disciplineFindings: [],
        evidenceMatrix: [],
        accountabilityMatrix: [],
        unansweredQuestions: [],
        alternativeSolutions: [],
        recommendations: [],
        references: [],
        updatesLog: [
          {
            date: new Date().toISOString().slice(0, 10),
            version: 'v0.1',
            entryType: 'Initial Publication',
            summary: 'Initiated new KEW-EIAI investigation charter via Admin Workspace.',
            verifiedBy: body.actor || 'KEW-EIAI Administrator',
          },
        ],
        dataGaps: ['Baseline documentary, spatial, and statutory audit records queued for Stage 03 discovery.'],
        sections: [
          {
            sectionNumber: '01',
            key: 'executive-summary',
            title: 'Executive Summary & Scoping Charter',
            applicable: true,
            leadSummary: body.leadSummary || `Initiated investigation charter for ${body.title}.`,
            bodyParagraphs: [
              'No predetermined scientific or institutional conclusions are asserted prior to completion of Workflow Stages 03–10.',
            ],
          },
        ],
      };

      store.customInvestigations.push(newRecord);
      writeEiaiStore(store);

      return NextResponse.json({
        success: true,
        investigation: newRecord,
        validation: runScientificValidation(newRecord),
      });
    }

    return NextResponse.json({ success: false, error: 'Unsupported action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to process investigation request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authCheck = await verifyAdminRequest(request);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Administrator session required to modify investigations.' },
        { status: 401 }
      );
    }
    const body = await request.json();
    const store = readEiaiStore();

    // Update investigation publication status or log a correction / official response
    if (body.action === 'update_status' && body.code && body.status) {
      const labelMap: Record<string, string> = {
        published: 'Published Investigation',
        active_investigation: 'Active Investigation',
        scoping_review: 'Scoping Review',
        proposed: 'Proposed Investigation',
        archived: 'Archived Investigation',
      };
      store.statusOverrides[body.code] = {
        status: body.status,
        statusLabel: labelMap[body.status] || body.status,
        updatedAt: new Date().toISOString(),
      };
      const logEntry = {
        date: new Date().toISOString().slice(0, 10),
        version: body.version || 'Admin Revision',
        entryType: 'Methodological Clarification' as const,
        summary: body.note || `Updated investigation status to ${labelMap[body.status] || body.status}.`,
        verifiedBy: body.actor || 'KEW-EIAI Administrator',
      };
      store.appendedUpdates[body.code] = [logEntry, ...(store.appendedUpdates[body.code] || [])];
      writeEiaiStore(store);
      return NextResponse.json({ success: true, statusOverride: store.statusOverrides[body.code] });
    }

    if (body.action === 'record_institutional_response' && body.code && body.accountabilityId && body.responseText) {
      const entry = {
        accountabilityId: body.accountabilityId,
        institutionAcronym: body.institutionAcronym || 'Institution',
        responseText: body.responseText.trim(),
        recordedAt: new Date().toISOString(),
        recordedBy: body.actor || 'KEW-EIAI Accountability Desk',
      };
      store.institutionalResponses[body.code] = [...(store.institutionalResponses[body.code] || []), entry];
      store.appendedUpdates[body.code] = [
        {
          date: new Date().toISOString().slice(0, 10),
          version: 'Response Addendum',
          entryType: 'Official Institutional Response',
          summary: `Recorded official response for ${entry.institutionAcronym}: "${entry.responseText.slice(0, 120)}"`,
          verifiedBy: entry.recordedBy,
        },
        ...(store.appendedUpdates[body.code] || []),
      ];
      writeEiaiStore(store);
      return NextResponse.json({ success: true, entry });
    }

    if (body.action === 'log_correction' && body.code && body.summary) {
      const corr = {
        date: new Date().toISOString().slice(0, 10),
        version: body.version || 'Erratum / Update',
        entryType: 'Correction' as const,
        summary: body.summary.trim(),
        verifiedBy: body.actor || 'KEW Scientific Review Desk',
      };
      store.appendedUpdates[body.code] = [corr, ...(store.appendedUpdates[body.code] || [])];
      writeEiaiStore(store);
      return NextResponse.json({ success: true, correction: corr });
    }

    if (body.action === 'update_recommendation_status' && body.recommendationId && body.status) {
      store.recommendationStatusOverrides[body.recommendationId] = body.status;
      writeEiaiStore(store);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'update_proposal_status' && body.proposalId && body.status) {
      const idx = store.proposals.findIndex((p) => p.id === body.proposalId);
      if (idx >= 0) {
        store.proposals[idx].status = body.status;
        if (body.adminNotes) store.proposals[idx].adminNotes = body.adminNotes;
        writeEiaiStore(store);
        return NextResponse.json({ success: true, proposal: store.proposals[idx] });
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid PATCH payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Update failed' }, { status: 500 });
  }
}
