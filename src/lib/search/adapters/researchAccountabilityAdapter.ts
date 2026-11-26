// ─────────────────────────────────────────────────────────────────────────────
// SCIENTIFIC RESEARCH, SECTORAL EIA & ENVIRONMENTAL ACCOUNTABILITY ADAPTER
// Indexes PIL Cases, Legal Statutes, Agency Accountability, SEIAE Assessments,
// Evidence Library (/library/[id]), Public Field Reports (/field-reports/[id]),
// Protected Area Reports, Open Data Categories, Webinars & Scientific Program
// Strictly excludes restricted/private field reports & unpublished draft events
// ─────────────────────────────────────────────────────────────────────────────

import { ExcludedResourceRecord, SearchAdapterOutput, SearchDocument } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import {
  ENVIRONMENTAL_CASES_DATA,
  HISTORICAL_CASES_1986_2015,
  ADDITIONAL_AUTHENTIC_CASES,
  ENVIRONMENTAL_LEGAL_STATUTES,
  AGENCY_ACCOUNTABILITY_REGISTER,
} from '@/data/environmental-pil';
import {
  SECTOR_DEFINITIONS,
  SHARED_ASSESSMENT_DATABASE,
  CUMULATIVE_IMPACT_HOTSPOTS,
  SCIENTIFIC_REPORTS,
} from '@/data/sectoral-eia';
import {
  WULAR_CUMULATIVE_DRIVERS,
  LAND_USE_OBSERVATORY_SPECIFICATIONS,
  OFFICIAL_AGRI_HEADLINE_STATISTICS,
} from '@/data/agriculture-eia-inventory';
import {
  HOUSEBOAT_BASIN_INVENTORY,
  DESTINATION_CARRYING_CAPACITY_REGISTRY,
  OFFICIAL_HEADLINE_STATISTICS as OFFICIAL_TOURISM_STATISTICS,
} from '@/data/tourism-eia-inventory';
import { evidenceRegistry } from '@/data/evidence-intelligence';
import { fieldReportsRegistry } from '@/data/field-reports-registry';
import { getReports } from '@/data/protected-network';
import { openDataCategories } from '@/data/open-data-catalog';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { CONFERENCES_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_PROGRAM_ACTIVITIES } from '@/data/scientific-program-2027-2028';
import { CANONICAL_INVESTIGATIONS, getDomainById } from '@/data/environmental-investigations';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import {
  getAllMergedAssignmentsInternal,
  getPublicDailyDispatches,
  getPublicEditions,
  getPublicJournalists,
  getPublicPublishedStories,
  getPublicReportingBeats,
} from '@/lib/himalayan-dispatch-store';
import {
  DEPARTMENT_ROUTE_CONFIG,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
  toInternalDispatchPath,
  type BureauRouteSlug,
} from '@/lib/himalayan-dispatch-routes';

export function buildResearchAccountabilityIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];
  const excluded: ExcludedResourceRecord[] = [];
  const seenCaseIds = new Set<string>();

  // 1. Environmental PIL Dockets (Master + Historical + Additional Authentic)
  const allCases: any[] = [
    ...(ENVIRONMENTAL_CASES_DATA || []),
    ...((HISTORICAL_CASES_1986_2015 as any[]) || []),
    ...((ADDITIONAL_AUTHENTIC_CASES as any[]) || []),
  ];

  for (const c of allCases) {
    const id = c?.id || c?.caseNumber;
    if (!id || seenCaseIds.has(id)) continue;
    seenCaseIds.add(id);

    const dists: string[] = Array.isArray(c.districts) ? c.districts : c.district ? [c.district] : [];
    const subregion = resolveSubregion(dists.join(', '), c.region);
    const title = c.caseTitle || c.title;
    const caseNum = c.caseNumber || id;
    const lex = enrichWithMultilingualLexicon(
      `${title} ${caseNum} ${c.environmentalAsset || ''} ${c.sector || ''} Environmental PIL`,
      [caseNum, c.environmentalAsset].filter(Boolean)
    );

    const tierLabel =
      c.verificationTier === 'TIER_1_AUTHENTICATED' || c.cnrNumber
        ? 'Tier 1 Authenticated Docket'
        : 'Tier 2 Archival Precedent (Under Corroboration)';

    const directiveSummary = Array.isArray(c.complianceDirectives)
      ? c.complianceDirectives
          .slice(0, 2)
          .map((d: any) => `${d.directionText || ''} (${d.status || ''}: ${d.verifiedEvidence || ''})`.trim())
          .filter(Boolean)
          .join(' ')
      : '';
    const keyDirsText = Array.isArray(c.keyDirectives) ? c.keyDirectives.slice(0, 2).join('; ') : '';
    const richPilDesc = [
      c.summary || c.statutorySeparationNotice || (Array.isArray(c.coreIssues) ? c.coreIssues.join('; ') : c.coreIssue),
      directiveSummary || (keyDirsText ? `Directives: ${keyDirsText}.` : ''),
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    const latestChronoDate =
      Array.isArray(c.chronology) && c.chronology.length > 0
        ? c.chronology[c.chronology.length - 1]?.date
        : undefined;

    documents.push({
      id: `pil:${id}`,
      documentType: 'pil_case',
      resultClass: 'scientific_record',
      domain: 'environmental_accountability',
      title: `${caseNum} — ${title}`,
      subtitle: `${c.jurisdiction || 'High Court / NGT'} · Filed ${c.filingYear || ''} (${c.currentJudicialStatus || c.proceedingType || 'PIL'})`,
      description:
        richPilDesc ||
        `Environmental litigation protecting ${c.environmentalAsset || 'Himalayan ecosystems'} (${c.sector || 'Statutory Oversight'}). Status: ${c.currentJudicialStatus || 'Monitored'}.`,
      canonicalUrl: `/resources/environmental-pil?tab=inventory`,
      parentModule: 'Environmental PIL Portal',
      subregion,
      jurisdictionNote: c.jurisdiction,
      district: dists[0],
      districts: dists.length ? dists : undefined,
      coordinates:
        typeof c.lat === 'number' && typeof c.lng === 'number'
          ? { lat: c.lat, lng: c.lng, precision: 'centroid' }
          : undefined,
      tags: Array.from(
        new Set(['Environmental PIL', c.proceedingType, c.sector, c.environmentalAsset, ...dists].filter(Boolean))
      ),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: c.sourceDocumentRef || c.cnrNumber ? `${c.jurisdiction} (${c.cnrNumber || c.caseNumber})` : c.jurisdiction || 'Judicial Registry',
      trustBadge: 'Statutory / Judicial Record',
      temporalNature: c.filingYear && c.filingYear < 2018 && !latestChronoDate ? 'historical_archive' : 'periodic_monitoring',
      observationTimestamp: c.filingYear ? `${c.filingYear}-01-01` : undefined,
      lastUpdated: latestChronoDate,
      verificationStatus: tierLabel,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        ...(c.filingYear ? [{ label: 'Filed', value: String(c.filingYear) }] : []),
        ...(Array.isArray(c.complianceDirectives)
          ? [{ label: 'Directives', value: String(c.complianceDirectives.length) }]
          : []),
      ],
      ctaLabel: 'Inspect PIL Docket',
      adapterId: 'research-accountability',
    });
  }

  // 2. Environmental Legislation & Legal Statutes
  for (const st of (ENVIRONMENTAL_LEGAL_STATUTES as any[]) || []) {
    const name = st.statuteName || st.title || st.name;
    if (!name) continue;
    documents.push({
      id: `statute:${st.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'legal_statute',
      resultClass: 'report_dataset',
      domain: 'environmental_accountability',
      title: `${name}${st.year ? ` (${st.year})` : ''}`,
      subtitle: `Environmental Legislation · ${st.applicableRegions?.join(', ') || st.jurisdiction || 'Western Himalaya'}`,
      description: st.summary || st.environmentalMandate || st.description || 'Applicable statutory environmental protection instrument.',
      canonicalUrl: '/resources/environmental-pil?tab=legal-framework',
      parentModule: 'Environmental PIL · Legal Framework',
      subregion: resolveSubregion(undefined, st.jurisdiction),
      jurisdictionNote: st.jurisdiction,
      tags: ['Environmental Law', 'Legislation', 'Statute', name, ...(st.applicableSectors || [])].filter(Boolean),
      synonyms: [st.shortCode || ''].filter(Boolean),
      source: st.enactingAuthority || 'Official Statutory Gazette',
      trustBadge: 'Statutory / Judicial Record',
      temporalNature: 'reference',
      verificationStatus: 'Enacted Statutory Instrument',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Legal Framework',
      adapterId: 'research-accountability',
    });
  }

  // 3. Government Agency Accountability Register
  for (const ag of (AGENCY_ACCOUNTABILITY_REGISTER as any[]) || []) {
    const name = ag.agencyName || ag.name;
    if (!name) continue;
    documents.push({
      id: `agency:${ag.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'agency_accountability',
      resultClass: 'scientific_record',
      domain: 'environmental_accountability',
      title: `${name}${ag.acronym ? ` (${ag.acronym})` : ''}`,
      subtitle: `Statutory Compliance & Accountability Profile · ${ag.region || ''}`,
      description:
        ag.mandateSummary ||
        ag.complianceNotes ||
        `Tracked public agency subject to judicial environmental compliance directives across ${ag.region || 'Western Himalaya'}.`,
      canonicalUrl: '/resources/environmental-pil?tab=compliance',
      parentModule: 'Environmental PIL · Compliance Audits',
      subregion: resolveSubregion(undefined, ag.region),
      tags: ['Agency Accountability', 'Compliance Audit', ag.acronym, name].filter(Boolean),
      synonyms: [ag.acronym].filter(Boolean),
      source: 'KEW Judicial Compliance & Agency Accountability Register',
      trustBadge: 'Statutory / Judicial Record',
      temporalNature: 'periodic_monitoring',
      verificationStatus: ag.complianceGrade ? `Compliance Rating: ${ag.complianceGrade}` : 'Audited Agency',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Compliance Register',
      adapterId: 'research-accountability',
    });
  }

  // 4. Sectoral EIA (SEIAE) Sectors, Assessments (/sectoral-eia/assessment/[id]), Hotspots & Scientific Reports
  for (const sec of Object.values(SECTOR_DEFINITIONS || {})) {
    const lex = enrichWithMultilingualLexicon(`${sec.title} ${sec.description}`);
    documents.push({
      id: `seiae-sector:${sec.id}`,
      documentType: 'eia_assessment',
      resultClass: 'module',
      domain: 'scientific_research',
      title: sec.title,
      subtitle: `SEIAE Sector Engine · ${sec.name}`,
      description: `${sec.description} Regulatory alignment: ${sec.regulatoryContext}`,
      canonicalUrl: `/sectoral-eia/sectors/${sec.id}`,
      parentModule: 'Sectoral EIA Engine (SEIAE)',
      subregion: 'Multi-Regional',
      tags: ['Sectoral EIA', 'SEIAE', sec.name, ...sec.highlightedHotspots],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'KEW Strategic Environmental Impact Assessment Engine (IAIA SEA Aligned)',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Operational EIA Engine',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Pilots', value: String(sec.pilotCount) },
        { label: 'Coverage', value: `${sec.landscapeCoverageSqKm.toLocaleString()} km²` },
      ],
      ctaLabel: 'Open Sector EIA',
      adapterId: 'research-accountability',
    });
  }

  for (const asmt of (SHARED_ASSESSMENT_DATABASE as any[]) || []) {
    if (!asmt?.id) continue;
    const subregion = resolveSubregion(asmt.district, asmt.region);
    documents.push({
      id: `eia-record:${asmt.id}`,
      documentType: 'eia_assessment',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: asmt.title || asmt.projectName,
      subtitle: `EIA Dossier (${asmt.sector?.toUpperCase() || 'SEIAE'}) · ${asmt.district || subregion}`,
      description: asmt.summary || asmt.executiveSummary || asmt.description || 'Comprehensive environmental impact assessment record.',
      canonicalUrl: `/sectoral-eia/assessment/${asmt.id}`,
      parentModule: 'Sectoral EIA · Assessment Registry',
      subregion,
      district: asmt.district,
      watershed: asmt.watershed || asmt.basin,
      coordinates:
        asmt.coordinates && typeof asmt.coordinates.lat === 'number'
          ? { lat: asmt.coordinates.lat, lng: asmt.coordinates.lng, precision: 'centroid' }
          : undefined,
      tags: ['EIA Report', 'EIA Reports', 'Impact Assessment', asmt.sector, asmt.district].filter(Boolean),
      synonyms: [asmt.id],
      source: asmt.leadInstitution || 'KEW SEIAE Assessment Database',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      lastUpdated: asmt.assessmentDate || asmt.updatedAt,
      verificationStatus: asmt.verificationStatus || asmt.status || 'Evaluated EIA Dossier',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open EIA Assessment',
      adapterId: 'research-accountability',
    });
  }

  for (const ch of (CUMULATIVE_IMPACT_HOTSPOTS as any[]) || []) {
    const name = ch.name || ch.hotspotName;
    if (!name) continue;
    documents.push({
      id: `cum-hotspot:${ch.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'eia_assessment',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: `${name} — Multi-Sector Cumulative Impact Hotspot`,
      subtitle: `SEIAE Cumulative Modelling · ${ch.district || 'Western Himalaya'}`,
      description: ch.summary || ch.description || 'Multi-stressor cumulative ecological pressure zone.',
      canonicalUrl: '/sectoral-eia/cumulative-impact',
      parentModule: 'Sectoral EIA · Cumulative Impact Matrix',
      subregion: resolveSubregion(ch.district, ch.region),
      district: ch.district,
      tags: ['Cumulative Impact', 'SEIAE', ...(ch.interactingSectors || []), ch.district].filter(Boolean),
      synonyms: [],
      source: 'KEW Cumulative Environmental Impact Matrix',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Modeled Multi-Stressor Zone',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Cumulative Matrix',
      adapterId: 'research-accountability',
    });
  }

  for (const sr of (SCIENTIFIC_REPORTS as any[]) || []) {
    const title = sr.title || sr.name;
    if (!title) continue;
    const isPublishedDossier = sr.status === 'Published' || sr.status === 'Updated' || !sr.status;
    const sectorLabel = sr.sectorTag || sr.sector || 'SEIAE';
    const pageDescriptor = isPublishedDossier && sr.pages
      ? `${sr.pages} Pages`
      : sr.targetPages
      ? `${sr.targetPages}-page target`
      : '';
    documents.push({
      id: `seiae-rep:${sr.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: sr.code ? `${sr.code} — ${title}` : title,
      subtitle: `${isPublishedDossier ? 'SEIAE Published Dossier' : 'SEIAE Proposed Research Dossier'} · ${sr.date || sr.year || '2026'} (${sectorLabel}${pageDescriptor ? ` · ${pageDescriptor}` : ''})`,
      description: sr.abstract || sr.summary || sr.description || 'Sectoral environmental research dossier.',
      canonicalUrl: sr.code ? `/sectoral-eia/reports/${sr.code.toLowerCase()}` : '/sectoral-eia/reports',
      parentModule: 'KEW Scientific Research Series (100 Dossiers · 23 Sectors)',
      subregion: resolveSubregion(sr.district, sr.region || sr.title),
      tags: [
        'KEW Research Series',
        'Scientific Dossier',
        'Research Series 2026',
        sectorLabel,
        sr.divisionTitle,
        sr.code,
        ...(typeof sr.priorityRank === 'number' ? [`Priority #${sr.priorityRank}`] : []),
      ].filter(Boolean),
      synonyms: [sr.code || ''].filter(Boolean),
      source: sr.author || (sr.authors ? (Array.isArray(sr.authors) ? sr.authors.join(', ') : sr.authors) : 'KEW SEIAE Research Series'),
      trustBadge: isPublishedDossier ? 'Peer-Reviewed / Institutional' : 'KEW Scientific Assessment',
      temporalNature: 'reference',
      observationTimestamp: isPublishedDossier ? '2026-03-01' : undefined,
      verificationStatus: isPublishedDossier
        ? `Published Scientific Monograph (${sr.date})`
        : `${sr.status || 'Proposed'} Research Dossier (${pageDescriptor || 'Scope Established'})`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: isPublishedDossier ? 'Open Published Dossier' : 'Inspect Research Charter',
      adapterId: 'research-accountability',
    });
  }

  // 4B. SEIAE Sector-Specific Quantitative Audit Records (Wular CAG 2025 Audit, Land-Use Conversion, Houseboats & Carrying Capacity)
  for (const [idx, wd] of (WULAR_CUMULATIVE_DRIVERS || []).entries()) {
    const lex = enrichWithMultilingualLexicon(`Wular Lake ${wd.stressorSource} ${wd.contributingSector} ${wd.cag2025AuditFinding}`);
    documents.push({
      id: `wular-cag-driver:${idx + 1}`,
      documentType: 'eia_assessment',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `Wular Lake Basin Cumulative Driver — ${wd.stressorSource} (${wd.contributingSector})`,
      subtitle: `CAG Performance Audit 2025 · ${wd.shareOfCumulativeStressPercentEst}% Estimated Cumulative Stress Share`,
      description: `${wd.pollutantOrPhysicalPressure} CAG 2025 Audit Finding: ${wd.cag2025AuditFinding} Protocol: ${wd.monitoringProtocol}`,
      canonicalUrl: '/sectoral-eia/sectors/agriculture',
      parentModule: 'SEIAE · Wular Basin Multi-Sectoral Audit',
      subregion: 'Kashmir',
      district: 'Bandipora',
      districts: ['Bandipora', 'Baramulla'],
      watershed: 'Jhelum Basin',
      tags: ['Wular Lake', 'CAG Audit 2025', 'Cumulative Impact', wd.contributingSector, wd.stressorSource],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Comptroller and Auditor General of India (CAG) Performance Audit 2025 (Wular Lake Basin Review)',
      trustBadge: 'Statutory / Judicial Record',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: '2025-01-01',
      verificationStatus: 'CAG 2025 Performance Audit Finding',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Stress Share', value: `~${wd.shareOfCumulativeStressPercentEst}%` },
        { label: 'Sector', value: wd.contributingSector },
      ],
      ctaLabel: 'Open Agriculture & Basin EIA',
      adapterId: 'research-accountability',
    });
  }

  for (const [idx, lu] of (LAND_USE_OBSERVATORY_SPECIFICATIONS || []).entries()) {
    const lex = enrichWithMultilingualLexicon(`${lu.conversionType} ${lu.environmentalConsequence}`);
    documents.push({
      id: `agri-landuse:${idx + 1}`,
      documentType: 'eia_assessment',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: `${lu.conversionType} — Agricultural Land-Use Conversion Rate`,
      subtitle: `Observed Rate: ${lu.annualRateHaYear} · SEIAE Land Systems Observatory`,
      description: `${lu.environmentalConsequence} Drivers: ${lu.drivingMechanisms} Detection: ${lu.satelliteDetectionMethod} Remedy: ${lu.statutoryRemedy}`,
      canonicalUrl: '/sectoral-eia/sectors/agriculture',
      parentModule: 'SEIAE · Agriculture Land Systems',
      subregion: 'Kashmir',
      tags: ['Land-Use Conversion', 'Paddy Conversion', 'Soil Sealing', lu.conversionType],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Department of Ecology, Environment & Remote Sensing & J&K Revenue Audits',
      trustBadge: 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: '2025-01-01',
      verificationStatus: 'Satellite & Revenue Cross-Audited',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [{ label: 'Annual Rate', value: lu.annualRateHaYear }],
      ctaLabel: 'Open Agriculture EIA',
      adapterId: 'research-accountability',
    });
  }

  for (const st of OFFICIAL_AGRI_HEADLINE_STATISTICS || []) {
    if (st.verificationStatus === 'Pending Measurement') continue;
    documents.push({
      id: `agri-stat:${st.id}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `${st.metric} (${st.referencePeriod})`,
      subtitle: `${st.figure} · ${st.geographicScope} (${st.verificationStatus})`,
      description: `${st.notes} Source document: ${st.sourceDocument}.`,
      canonicalUrl: '/sectoral-eia/sectors/agriculture',
      parentModule: 'SEIAE · Official Agricultural Census',
      subregion: 'Kashmir',
      tags: ['Agricultural Statistics', 'Table 4.17', st.metric],
      synonyms: [],
      source: `${st.publisher} (${st.sourceDocument})`,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      observationTimestamp: '2025-01-01',
      verificationStatus: st.verificationStatus,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [{ label: st.unit, value: st.figure }],
      ctaLabel: 'Inspect Census Table',
      adapterId: 'research-accountability',
    });
  }

  for (const [idx, hb] of (HOUSEBOAT_BASIN_INVENTORY || []).entries()) {
    const lex = enrichWithMultilingualLexicon(`${hb.basinName} ${hb.primaryReceivingWater} Houseboats Dal Lake Nigeen`);
    documents.push({
      id: `houseboat-basin:${idx + 1}`,
      documentType: 'eia_assessment',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: `${hb.basinName} — LCMA GIS Houseboat & Wastewater Compliance`,
      subtitle: `${hb.registeredCount2024} GPS-Mapped Vessels · Compliance: ${hb.complianceRate}`,
      description: `Receiving waterbody: ${hb.primaryReceivingWater}. Sewage management: ${hb.sewageManagementType} (${hb.complianceRate}). Ecological risk: ${hb.keyEnvironmentalRisk}`,
      canonicalUrl: '/sectoral-eia/sectors/tourism',
      parentModule: 'SEIAE · Tourism & Aquatic Hospitality',
      subregion: 'Kashmir',
      district: 'Srinagar',
      tags: ['Houseboats', 'Dal Lake', 'Nigeen Lake', 'Sewage Compliance', 'LCMA', hb.basinName],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: hb.officialSurveyReference,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: '2024-06-01',
      verificationStatus: 'Official 2024 LCMA GIS Census',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Vessels (2024)', value: String(hb.registeredCount2024) },
        { label: 'Compliance', value: hb.complianceRate },
      ],
      ctaLabel: 'Open Tourism EIA',
      adapterId: 'research-accountability',
    });
  }

  for (const [idx, cc] of (DESTINATION_CARRYING_CAPACITY_REGISTRY || []).entries()) {
    const lex = enrichWithMultilingualLexicon(`${cc.destination} Carrying Capacity Tourism`);
    documents.push({
      id: `carrying-cap:${idx + 1}`,
      documentType: 'eia_assessment',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: `${cc.destination} — Ecological Carrying Capacity Assessment`,
      subtitle: `${cc.stressLevel} · Peak Load: ${cc.currentObservedPeakLoad}`,
      description: `Sustainable threshold: ${cc.calculatedMaxSustainableLoad}; observed peak: ${cc.currentObservedPeakLoad} (${cc.peakSeasonMonth}). Limiting factor: ${cc.limitingFactor}. Formula: ${cc.methodFormula}.`,
      canonicalUrl: '/sectoral-eia/sectors/tourism',
      parentModule: 'SEIAE · Destination Carrying Capacity',
      subregion: 'Kashmir',
      tags: ['Carrying Capacity', 'Tourism Pressure', cc.destination, cc.stressLevel],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: cc.evidenceSource,
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: '2024-08-01',
      verificationStatus: `Formula Audited (${cc.stressLevel})`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Peak Load', value: cc.currentObservedPeakLoad },
        { label: 'Status', value: cc.stressLevel },
      ],
      ctaLabel: 'Open Carrying Capacity',
      adapterId: 'research-accountability',
    });
  }

  for (const ts of OFFICIAL_TOURISM_STATISTICS || []) {
    if (ts.verificationStatus === 'Pending Measurement') continue;
    const lex = enrichWithMultilingualLexicon(`${ts.metric} ${ts.notes}`);
    documents.push({
      id: `tourism-stat:${ts.id}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `${ts.metric} (${ts.referenceYear})`,
      subtitle: `${ts.figure} ${ts.unit} · ${ts.verificationStatus}`,
      description: `${ts.notes} Source: ${ts.sourceDocument}.`,
      canonicalUrl: '/sectoral-eia/sectors/tourism',
      parentModule: 'SEIAE · Tourism Census Registry',
      subregion: 'Kashmir',
      tags: ['Tourism Census', ts.metric, ts.referenceYear],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: `${ts.publisher} (${ts.sourceDocument})`,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      observationTimestamp: `${ts.referenceYear.slice(0, 4)}-01-01`,
      verificationStatus: ts.verificationStatus,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [{ label: ts.unit, value: ts.figure }],
      ctaLabel: 'Inspect Tourism Census',
      adapterId: 'research-accountability',
    });
  }

  // 5. Evidence Intelligence Library -> /library/[id] (canonical item page!)
  for (const ev of (evidenceRegistry as any[]) || []) {
    if (!ev?.id) continue;
    const dists: string[] = Array.isArray(ev.districts) ? ev.districts : ev.district ? [ev.district] : [];
    const subregion = resolveSubregion(dists.join(', '));
    const lex = enrichWithMultilingualLexicon(ev.title);
    documents.push({
      id: `evidence:${ev.id}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: ev.title,
      subtitle: `${(ev.category || 'Research').toUpperCase()} · ${ev.sourceOrganization || ev.source || 'Evidence Archive'} (${ev.year || ''})`,
      description: ev.description || ev.summary || 'Cataloged scientific publication and evidentiary dataset.',
      canonicalUrl: `/library/${ev.id}`,
      parentModule: 'Research & Evidence Library',
      subregion,
      district: dists[0],
      districts: dists.length ? dists : undefined,
      tags: Array.from(new Set([ev.category, ev.subtype, ...(ev.tags || []), ...dists].filter(Boolean))),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: ev.sourceOrganization || ev.authors?.join(', ') || 'KEW Evidence Archive',
      sourceUrl: ev.externalUrl,
      trustBadge:
        ev.sourceType === 'official' || ev.sourceType === 'academic'
          ? 'Peer-Reviewed / Institutional'
          : ev.sourceType === 'field'
          ? 'Field Verified'
          : 'Community Reported',
      temporalNature: ev.year && ev.year < 2018 ? 'historical_archive' : 'reference',
      lastUpdated: ev.datePublished || (ev.year ? `${ev.year}-01-01` : undefined),
      verificationStatus: `Confidence: ${ev.confidence || 'high'}`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Evidence Record',
      adapterId: 'research-accountability',
    });
  }

  // 6. Field Intelligence Reports -> /field-reports/[id] (strictly public only!)
  for (const fr of fieldReportsRegistry || []) {
    if (fr.visibility !== 'public' || fr.status === 'restricted') {
      excluded.push({
        idOrRoute: `field-report:${fr.id}`,
        title: fr.title,
        reason: 'restricted_visibility',
        adapterId: 'research-accountability',
      });
      continue;
    }

    const subregion = resolveSubregion((fr.districts || []).join(', '), fr.scope);
    const lex = enrichWithMultilingualLexicon(`${fr.title} ${(fr.entities || []).join(' ')}`);
    documents.push({
      id: `field-report:${fr.id}`,
      documentType: 'field_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: fr.title,
      subtitle: `${fr.reportType.replace(/-/g, ' ').toUpperCase()} · ${fr.source} (${fr.date})`,
      description: fr.summary,
      canonicalUrl: `/field-reports/${fr.id}`,
      parentModule: 'Field Intelligence Reports',
      subregion,
      geographicScope: fr.scope as any,
      district: fr.districts?.[0],
      districts: fr.districts,
      tags: Array.from(new Set(['Field Report', fr.reportType, ...(fr.tags || []), ...(fr.entities || [])])),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: fr.source,
      trustBadge: fr.status === 'field-verified' ? 'Field Verified' : 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: fr.date,
      lastUpdated: fr.lastUpdated,
      verificationStatus: `${fr.status} (${fr.confidence} confidence)`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: fr.pages ? [{ label: 'Length', value: `${fr.pages} pages` }] : undefined,
      ctaLabel: 'Open Field Report',
      adapterId: 'research-accountability',
    });
  }

  // 7. Protected Area Management Plans & Reports -> /protected-network/reports-and-plans/[slug]
  const paReports = getReports?.all ? getReports.all() : [];
  for (const pr of paReports as any[]) {
    if (!pr?.slug) continue;
    const lex = enrichWithMultilingualLexicon(`${pr.title} ${pr.description || ''}`);
    documents.push({
      id: `pa-report:${pr.slug}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: pr.title,
      subtitle: `${(pr.type || 'Conservation Report').toUpperCase()} · ${pr.year || ''}`,
      description: pr.description || pr.abstract || 'Protected area management plan and biodiversity assessment.',
      canonicalUrl: `/protected-network/reports-and-plans/${pr.slug}`,
      parentModule: 'Protected Areas · Reports & Management Plans',
      subregion: resolveSubregion(pr.district, pr.scope),
      district: pr.district,
      tags: ['Management Plan', 'Conservation Report', pr.type, ...(pr.topics || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: Array.isArray(pr.authors) ? pr.authors.join(', ') : pr.source || 'Wildlife Protection & WII Archive',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      observationTimestamp: pr.year ? `${pr.year}-01-01` : undefined,
      verificationStatus: 'Published Conservation Document',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Conservation Report',
      adapterId: 'research-accountability',
    });
  }

  // 8. Open Environmental Data Catalog (50 FAIR Categories)
  for (const cat of openDataCategories || []) {
    if (cat.status === 'Restricted') {
      excluded.push({
        idOrRoute: `open-data:${cat.id}`,
        title: cat.title,
        reason: 'restricted_visibility',
        adapterId: 'research-accountability',
      });
      continue;
    }
    const lex = enrichWithMultilingualLexicon(`${cat.title} ${cat.domainName} ${cat.description}`);
    documents.push({
      id: `open-data:${cat.id}`,
      documentType: 'open_dataset',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `${cat.title} — Open Data Category`,
      subtitle: `${cat.domainName} · ${cat.status} (${cat.formats.join(', ')})`,
      description: `${cat.description} Provenance: ${cat.provenance}. Cadence: ${cat.updateFrequency}.`,
      canonicalUrl: cat.targetModule || '/open-data#categories',
      parentModule: 'Open Environmental Data Portal',
      subregion: 'Multi-Regional',
      tags: ['Open Data', cat.domainName, cat.shortName, ...(cat.subcategories || []), ...cat.formats],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: cat.provenance,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: `FAIR Catalog (${cat.status})`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Status', value: cat.status },
        { label: 'Cadence', value: cat.updateFrequency },
      ],
      ctaLabel: 'Explore Dataset & Module',
      adapterId: 'research-accountability',
    });
  }

  // 9. Webinars, Conferences & 2027–2028 Scientific Program (exclude drafts!)
  for (const wb of (SCIENTIFIC_WEBINARS as any[]) || []) {
    if (!wb?.id) continue;
    if (wb.status === 'draft' || wb.status === 'proposed' || wb.status === 'under_review') {
      excluded.push({
        idOrRoute: `webinar:${wb.id}`,
        title: wb.title || wb.id,
        reason: 'unpublished_draft',
        adapterId: 'research-accountability',
      });
      continue;
    }
    documents.push({
      id: `webinar:${wb.id}`,
      documentType: 'conference_webinar',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: wb.title,
      subtitle: `Scientific Webinar (${wb.status?.replace(/_/g, ' ') || 'Symposium'}) · ${wb.date || ''}`,
      description: wb.description || wb.abstract || 'Academic environmental symposium and webinar session.',
      canonicalUrl: `/webinars/${wb.id}`,
      parentModule: 'Webinars & Scientific Conferences',
      subregion: 'Multi-Regional',
      tags: ['Webinar', 'Symposium', ...(wb.topics || wb.tags || [])],
      synonyms: [],
      source: wb.hostInstitution || 'KEW Academic Symposium Network',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: wb.status === 'completed' || wb.status === 'archived' ? 'historical_archive' : 'reference',
      observationTimestamp: wb.date,
      verificationStatus: wb.status || 'Confirmed Session',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Session',
      adapterId: 'research-accountability',
    });
  }

  for (const conf of (CONFERENCES_DETAILED as any[]) || []) {
    const cid = conf.id || conf.conferenceId;
    if (!cid) continue;
    if (conf.status === 'draft' || conf.status === 'proposed' || conf.status === 'under_review') {
      excluded.push({
        idOrRoute: `conference:${cid}`,
        title: conf.title || cid,
        reason: 'unpublished_draft',
        adapterId: 'research-accountability',
      });
      continue;
    }
    documents.push({
      id: `conference:${cid}`,
      documentType: 'conference_webinar',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: conf.title,
      subtitle: `Scientific Conference · ${conf.dates || conf.date || ''}`,
      description: conf.description || conf.theme || 'Multi-track Western Himalayan environmental science conference.',
      canonicalUrl: `/webinars/conferences/${cid}`,
      parentModule: 'Webinars & Scientific Conferences',
      subregion: 'Multi-Regional',
      tags: ['Conference', 'Proceedings', conf.acronym || ''].filter(Boolean),
      synonyms: [conf.acronym || ''].filter(Boolean),
      source: conf.leadOrganizer || 'Kashmir EcoWatch Scientific Committee',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: conf.status || 'Published Conference',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Conference Hub',
      adapterId: 'research-accountability',
    });
  }

  for (const act of (SCIENTIFIC_PROGRAM_ACTIVITIES as any[]) || []) {
    if (!act?.id || !act?.title) continue;
    documents.push({
      id: `sci-prog:${act.id}`,
      documentType: 'conference_webinar',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: act.title,
      subtitle: `2027–2028 Scientific Program (${act.type || 'Initiative'}) · ${act.year || ''}`,
      description: act.summary || act.description || 'Scheduled multi-year research, field assessment, and conference milestone.',
      canonicalUrl: '/webinars',
      parentModule: 'KEW 2027–2028 Scientific Program',
      subregion: 'Multi-Regional',
      tags: ['Scientific Program', act.type, act.linkedModule, String(act.year || '')].filter(Boolean),
      synonyms: [],
      source: 'KEW 2027–2028 Institutional Roadmap',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'reference',
      verificationStatus: act.status || 'Scheduled Milestone',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'View Program Milestone',
      adapterId: 'research-accountability',
    });
  }

  // 10. Environmental Investigations & Accountability (KEW-EIAI) Canonical Dossiers & Evidence Matrix
  for (const inv of CANONICAL_INVESTIGATIONS || []) {
    const dom = getDomainById(inv.primaryDomainId);
    const subregion = resolveSubregion(inv.districts.join(', '), inv.subregion);
    const lex = enrichWithMultilingualLexicon(`${inv.title} ${inv.subtitle} ${inv.watershedOrBasin} ${inv.code}`);
    documents.push({
      id: `eiai-inv:${inv.code.toLowerCase()}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'environmental_accountability',
      title: `${inv.code} — ${inv.title}`,
      subtitle: `${inv.statusLabel} (${inv.temporalScope}) · ${dom?.name || 'KEW-EIAI'}`,
      description: `${inv.subtitle}. ${inv.executiveKeyFindings[0] || ''}`,
      canonicalUrl: `/environmental-investigations/reports/${inv.slug}`,
      parentModule: 'Environmental Investigations & Accountability (KEW-EIAI)',
      subregion,
      district: inv.districts[0],
      districts: inv.districts,
      watershed: inv.watershedOrBasin,
      coordinates: {
        lat: inv.coordinates[0],
        lng: inv.coordinates[1],
        precision: 'centroid',
      },
      tags: Array.from(
        new Set([
          'Environmental Investigation',
          'KEW-EIAI',
          inv.code,
          dom?.name || '',
          ...inv.districts,
        ].filter(Boolean))
      ),
      synonyms: [inv.code, ...lex.synonyms],
      multilingualTerms: lex.multilingual,
      source: 'Kashmir EcoWatch Environmental Investigations & Accountability (KEW-EIAI)',
      trustBadge: inv.status === 'published' ? 'Peer-Reviewed / Institutional' : 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: inv.initiatedDate,
      lastUpdated: inv.lastUpdated,
      verificationStatus: `${inv.statusLabel} (${inv.evidenceMatrix.length} Claims Graded)`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Scope', value: inv.temporalScope },
        { label: 'Disciplines', value: String(inv.disciplineIds.length) },
      ],
      ctaLabel: inv.status === 'published' ? 'Open 24-Section Investigation' : 'Open Scoping Dossier',
      adapterId: 'research-accountability',
    });
  }

  // 11. Himalayan Dispatch — Published Stories, Daily Dispatches, Issues, Departments, Bureaus, Beats & Journalists
  for (const story of getPublicPublishedStories()) {
    const subregion = resolveSubregion(story.region, story.region);
    documents.push({
      id: `hd-story:${story.slug}`,
      documentType: 'scientific_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `${story.title} — Himalayan Dispatch`,
      subtitle: `${story.departmentRubric} · By ${story.bylineDisplay} (${story.editionLabel})`,
      description: `${story.subtitle} ${story.excerpt}`,
      canonicalUrl: toInternalDispatchPath(resolveCanonicalStoryUrl(story)),
      parentModule: 'Himalayan Dispatch Magazine',
      subregion,
      tags: Array.from(
        new Set([
          'Himalayan Dispatch',
          'Environmental Journalism',
          story.departmentRubric,
          story.bylineDisplay,
          ...story.seoKeywords,
        ])
      ),
      synonyms: ['Himalayan Dispatch', 'magazine', story.folioCode],
      source: 'Himalayan Dispatch — Kashmir EcoWatch Editorial Publication',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      observationTimestamp: story.publishedAt,
      lastUpdated: story.updatedAt || story.publishedAt,
      verificationStatus: 'Fact-Checked & Scientifically Reviewed',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [{ label: 'Reading Time', value: `${story.readingTimeMinutes} min` }],
      ctaLabel: 'Read in Himalayan Dispatch',
      adapterId: 'research-accountability',
    });
  }

  for (const dd of getPublicDailyDispatches()) {
    const subregion = resolveSubregion(dd.bureauLabel, dd.dateline);
    documents.push({
      id: `hd-daily:${dd.slug}`,
      documentType: 'field_report',
      resultClass: 'report_dataset',
      domain: 'scientific_research',
      title: `${dd.headline} — Daily Dispatch`,
      subtitle: `${dd.dateline} · By ${dd.bylineDisplay} (${dd.publishedAt})`,
      description: `${dd.standfirst} ${dd.scientificSourceNote}`,
      canonicalUrl: toInternalDispatchPath(HD_ROUTES.dailyDispatchArticle(dd.slug)),
      parentModule: 'Himalayan Dispatch · The Daily Dispatch',
      subregion,
      tags: [
        'Himalayan Dispatch',
        'Daily Dispatch',
        dd.bureauLabel,
        dd.beatTitle,
        dd.departmentLabel,
      ],
      synonyms: ['Daily Dispatch', dd.bureauLabel],
      source: 'Himalayan Dispatch Environmental Newsroom',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      observationTimestamp: dd.publishedAt,
      lastUpdated: dd.publishedAt,
      verificationStatus: dd.factCheckedBy,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [{ label: 'Reading Time', value: `${dd.readingTimeMinutes} min` }],
      ctaLabel: 'Read Daily Dispatch',
      adapterId: 'research-accountability',
    });
  }

  for (const dept of Object.values(DEPARTMENT_ROUTE_CONFIG)) {
    documents.push({
      id: `hd-dept:${dept.routeSlug}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain: 'scientific_research',
      title: `${dept.name} — Himalayan Dispatch Department`,
      subtitle: `${dept.kicker} · ${dept.wordCountGuide}`,
      description: `${dept.editorialIntroduction} ${dept.editorialMandate}`,
      canonicalUrl: toInternalDispatchPath(HD_ROUTES.department(dept.routeSlug)),
      parentModule: 'Himalayan Dispatch · Editorial Departments',
      subregion: 'Multi-Regional',
      tags: ['Himalayan Dispatch', 'Editorial Department', dept.name],
      synonyms: [dept.name],
      source: 'Himalayan Dispatch Editorial Directorate',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Active Editorial Department',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Department',
      adapterId: 'research-accountability',
    });
  }

  for (const bureau of REGIONAL_REPORTING_BUREAUS) {
    documents.push({
      id: `hd-bureau:${bureau.id}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain: 'scientific_research',
      title: `${bureau.name} — Himalayan Dispatch Regional Desk`,
      subtitle: `${bureau.publicStatusBadge} · ${bureau.geographicScopeLabel}`,
      description: bureau.editorialMandate,
      canonicalUrl: toInternalDispatchPath(HD_ROUTES.bureau(bureau.id as BureauRouteSlug)),
      parentModule: 'Himalayan Dispatch · Regional Bureaus',
      subregion: resolveSubregion(bureau.name, bureau.geographicScopeLabel),
      tags: ['Himalayan Dispatch', 'Regional Bureau', bureau.name, ...bureau.storyRegionKeywords],
      synonyms: [bureau.name],
      source: 'Himalayan Dispatch Geographical Editorial Directorate',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: bureau.publicStatusBadge,
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Regional Bureau',
      adapterId: 'research-accountability',
    });
  }

  for (const beat of getPublicReportingBeats()) {
    documents.push({
      id: `hd-beat:${beat.slug}`,
      documentType: 'module_page',
      resultClass: 'module',
      domain: 'scientific_research',
      title: `${beat.title} — Himalayan Dispatch Reporting Beat`,
      subtitle: `${beat.code} · ${beat.leadEditorRole}`,
      description: `${beat.editorialMandate} ${beat.summary}`,
      canonicalUrl: toInternalDispatchPath(HD_ROUTES.reportingBeat(beat.slug)),
      parentModule: 'Himalayan Dispatch · Reporting Beats',
      subregion: 'Multi-Regional',
      tags: ['Himalayan Dispatch', 'Reporting Beat', beat.title, ...beat.coveredBureaus],
      synonyms: [beat.code],
      source: 'Himalayan Dispatch Editorial Affairs',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Active Reporting Beat',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Reporting Beat',
      adapterId: 'research-accountability',
    });
  }

  for (const journalist of getPublicJournalists()) {
    documents.push({
      id: `hd-journalist:${journalist.slug}`,
      documentType: 'green_hero',
      resultClass: 'scientific_record',
      domain: 'scientific_research',
      title: `${journalist.name} — Himalayan Dispatch Portfolio`,
      subtitle: `${journalist.roleTitle} · ${journalist.basedIn}`,
      description: `${journalist.shortBio} Beat: ${journalist.beat}.`,
      canonicalUrl: toInternalDispatchPath(HD_ROUTES.journalistPortfolio(journalist.slug)),
      parentModule: 'Himalayan Dispatch · Journalists',
      subregion: resolveSubregion(journalist.basedIn, journalist.basedIn),
      tags: ['Himalayan Dispatch', 'Environmental Journalist', journalist.name, journalist.beat],
      synonyms: [journalist.name],
      source: 'Himalayan Dispatch Masthead',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Verified Masthead Correspondent',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Journalist Portfolio',
      adapterId: 'research-accountability',
    });
  }

  for (const edition of getPublicEditions()) {
    if (edition.status !== 'forthcoming') {
      const issueSlug = toCanonicalIssueSlug(edition.slug);
      documents.push({
        id: `hd-edition:${issueSlug}`,
        documentType: 'scientific_report',
        resultClass: 'report_dataset',
        domain: 'scientific_research',
        title: `${edition.title} (${edition.volumeLabel}) — Himalayan Dispatch`,
        subtitle: `${edition.issueNumberLabel} · ${edition.publicationDateLabel}`,
        description: edition.subtitle,
        canonicalUrl: toInternalDispatchPath(HD_ROUTES.issue(issueSlug)),
        parentModule: 'Himalayan Dispatch · Monthly Issues',
        subregion: 'Multi-Regional',
        tags: ['Himalayan Dispatch', 'Monthly Issue', edition.volumeLabel, edition.title],
        synonyms: [edition.volumeLabel],
        source: 'Himalayan Dispatch Edition Archive',
        trustBadge: 'Peer-Reviewed / Institutional',
        temporalNature: edition.status === 'archived' ? 'historical_archive' : 'reference',
        lastUpdated: edition.publishedIsoDate,
        verificationStatus: 'Published Periodical Volume',
        dataFreshness: edition.status === 'archived' ? 'historical_archive' : 'periodic_baseline',
        accessClassification: 'public',
        ctaLabel: 'Open Complete Issue',
        adapterId: 'research-accountability',
      });
    }
  }

  // Record confidential / unapproved assignments in excluded audit trail (never indexed publicly)
  for (const assign of getAllMergedAssignmentsInternal()) {
    if (assign.isConfidential || !assign.publicPreviewApproved) {
      excluded.push({
        idOrRoute: `hd-confidential:${assign.id}`,
        title: 'Protected Newsroom Assignment (Redacted)',
        reason: 'restricted_visibility',
        adapterId: 'research-accountability',
      });
    }
  }

  return {
    adapterId: 'research-accountability',
    adapterName: 'PIL Accountability, SEIAE Assessments, Library, Field Reports & Open Data Adapter',
    documents,
    excluded,
    sourceHealthy: true,
  };
}
