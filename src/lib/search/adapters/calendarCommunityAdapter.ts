// ─────────────────────────────────────────────────────────────────────────────
// ECOLOGICAL CALENDAR, PHENOLOGY & COMMUNITY PARTICIPATION ADAPTER
// Indexes Flowering Phenology, Pollinator Windows, Bird Migration Windows,
// Seasonal Landscapes & Blooms, Environmental Calendar Events, EcoVoices,
// Outdoor Classroom, KEW Green Heroes (All Tracks), NGOs & Citizen Science
// ─────────────────────────────────────────────────────────────────────────────

import { SearchAdapterOutput, SearchDocument } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import { phenologyData } from '@/data/phenology-flowering';
import { pollinatorData } from '@/data/pollinator-activity';
import { migrationData } from '@/data/migration-windows';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { environmentalCalendarEvents } from '@/data/environmental-calendar';
import { ECOVOICES_RELEASES } from '@/data/ecovoices-catalog';
import { FIELD_LEARNING_PROGRAMS, ADOPTED_ECOSYSTEM_REGISTRY } from '@/data/outdoor-classroom';
import {
  GREEN_HEROES_MASTER_DATA,
  GREEN_MARTYRS_DOSSIERS,
  ENVIRONMENTAL_SCIENTISTS_DOSSIERS,
  ENVIRONMENTAL_JOURNALISTS_DOSSIERS,
  ENVIRONMENTAL_ADVOCATES_DOSSIERS,
} from '@/data/kew-green-heroes';
import { RELIGIOUS_LEADERS_DOSSIERS } from '@/data/kew-religious-leaders';
import { POLITICIANS_OFFICIALS_DOSSIERS } from '@/data/kew-politicians-officials';
import { MANZOOR_WANGNOO_DOSSIER, ADDITIONAL_NGO_LEADERS } from '@/data/kew-ngos-community';
import { ngoRegistryData } from '@/data/ngo-impact';
import { CITIZEN_SCIENCE_PROGRAMS } from '@/data/citizen-science-programs';

export function buildCalendarCommunityIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];

  // 1. Phenology & Flowering Records
  for (const ph of (phenologyData as any[]) || []) {
    if (!ph?.id) continue;
    const lex = enrichWithMultilingualLexicon(
      `${ph.commonName} ${ph.scientificName} ${ph.kashmiriName || ''} Phenology`,
      [ph.scientificName, ph.kashmiriName].filter(Boolean)
    );
    documents.push({
      id: `phenology:${ph.id}`,
      documentType: 'phenology_record',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${ph.commonName} — Flowering & Phenology Window`,
      subtitle: `${ph.scientificName}${ph.kashmiriName ? ` (${ph.kashmiriName})` : ''} · Peak: ${(ph.peakFloweringMonths || []).join(', ')}`,
      description: `Flowering window: ${ph.earliestFloweringMonth} to ${ph.latestFloweringMonth} (Stage: ${ph.currentStage}; Elevation: ${ph.elevationMin}–${ph.elevationMax}m).`,
      canonicalUrl: '/seasonal-ecology/phenology-records',
      parentModule: 'Seasonal Ecology · Phenology & Flowering',
      subregion: resolveSubregion(undefined, (ph.regionsPresent || []).join(', ') || ph.primaryScope),
      tags: ['Phenology', 'Flowering Calendar', ...(ph.plantGroup || []), ...(ph.peakFloweringMonths || [])],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: ph.validation?.sourceName || 'KEW Himalayan Phenology Network',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: `Confidence: ${ph.validation?.confidence || 'High'}`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Peak Bloom', value: (ph.peakFloweringMonths || []).slice(0, 2).join('–') || ph.earliestFloweringMonth },
        { label: 'Elevation', value: `${ph.elevationMin}–${ph.elevationMax}m` },
      ],
      ctaLabel: 'Open Phenology Records',
      adapterId: 'calendar-community',
    });
  }

  // 2. Pollinator Activity Windows
  for (const pol of (pollinatorData as any[]) || []) {
    if (!pol?.id) continue;
    const lex = enrichWithMultilingualLexicon(
      `${pol.commonName} ${pol.scientificName} ${pol.kashmiriName || ''} Pollinator`,
      [pol.scientificName, pol.kashmiriName].filter(Boolean)
    );
    documents.push({
      id: `pollinator:${pol.id}`,
      documentType: 'pollinator_record',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${pol.commonName} — Pollinator Activity Window`,
      subtitle: `${pol.scientificName} (${pol.taxonomicGroup}) · Peak: ${pol.peakActivityMonth}`,
      description: `Active ${pol.firstActivityMonth}–${pol.lastActivityMonth} (Pollination window: ${pol.pollinationWindow}; Min flight temp: ${pol.temperatureThresholdMin}°C).`,
      canonicalUrl: '/seasonal-ecology/pollinator-windows',
      parentModule: 'Seasonal Ecology · Pollinator Windows',
      subregion: 'Multi-Regional',
      tags: ['Pollinator Windows', 'Pollination', pol.taxonomicGroup, pol.peakActivityMonth].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: pol.validation?.sourceName || 'Himalayan Pollinator & Orchard Ecology Survey',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: `IUCN: ${pol.conservationStatus}`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Peak Month', value: pol.peakActivityMonth },
        { label: 'Min Temp', value: `${pol.temperatureThresholdMin}°C` },
      ],
      ctaLabel: 'Open Pollinator Windows',
      adapterId: 'calendar-community',
    });
  }

  // 3. Avian & Wildlife Migration Windows (sample/deduplicate top distinct species)
  const seenMig = new Set<string>();
  for (const mig of ((migrationData as any[]) || []).slice(0, 250)) {
    const key = mig?.id || mig?.speciesId;
    if (!key || seenMig.has(key)) continue;
    seenMig.add(key);
    const lex = enrichWithMultilingualLexicon(
      `${mig.commonName} ${mig.scientificName} ${mig.localName || ''} Migration`,
      [mig.scientificName, mig.localName].filter(Boolean)
    );
    documents.push({
      id: `migration:${key}`,
      documentType: 'migration_record',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${mig.commonName} — ${mig.primaryMigrationStatus} Window`,
      subtitle: `${mig.scientificName} (${mig.taxonomicGroup}) · ${mig.currentSeasonalStatus}`,
      description: `Central Asian Flyway / altitudinal schedule — Peak months: ${(mig.peakObservationMonths || []).join(', ')}.`,
      canonicalUrl: '/seasonal-ecology/migration-windows',
      parentModule: 'Seasonal Ecology · Migration Windows',
      subregion: 'Multi-Regional',
      tags: ['Migration Windows', mig.primaryMigrationStatus, mig.taxonomicGroup, ...(mig.peakObservationMonths || [])],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Asian Waterbird Census (AWC), BirdLife & eBird Flyway Records',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: `IUCN: ${mig.conservationStatus}`,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Migration Windows',
      adapterId: 'calendar-community',
    });
  }

  // 4. Seasonal Landscapes & Bloom Zones
  const landscapesList = getSeasonalEcologyData?.landscapes?.all ? getSeasonalEcologyData.landscapes.all() : [];
  for (const sl of landscapesList) {
    if (!sl?.slug) continue;
    documents.push({
      id: `seasonal-landscape:${sl.slug}`,
      documentType: 'seasonal_landscape',
      resultClass: 'geographic_entity',
      domain: 'ecological_calendar',
      title: sl.name,
      subtitle: `Seasonal Landscape (${(sl.primarySeasons || []).join(', ')})`,
      description: sl.description,
      canonicalUrl: '/seasonal-ecology/seasonal-landscapes',
      parentModule: 'Seasonal Ecology · Seasonal Landscapes',
      subregion: resolveSubregion((sl.districts || []).join(', ')),
      districts: sl.districts,
      coordinates: sl.coordinates ? { lat: sl.coordinates.lat, lng: sl.coordinates.lng, precision: 'centroid' } : undefined,
      tags: ['Seasonal Landscape', ...(sl.primarySeasons || []), ...(sl.districts || [])],
      synonyms: [],
      source: 'KEW Seasonal Phenology & Landscape Observatory',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Documented Landscape Zone',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Explore Seasonal Landscapes',
      adapterId: 'calendar-community',
    });
  }

  const bloomsList = getSeasonalEcologyData?.blooms?.all ? getSeasonalEcologyData.blooms.all() : [];
  for (const bz of bloomsList) {
    if (!bz?.slug) continue;
    documents.push({
      id: `bloom-zone:${bz.slug}`,
      documentType: 'seasonal_landscape',
      resultClass: 'geographic_entity',
      domain: 'ecological_calendar',
      title: bz.name,
      subtitle: `Floral Bloom Zone · ${(bz.districts || []).join(', ') || 'Kashmir'}`,
      description: bz.description || 'Documented orchard and alpine wildflower bloom corridor.',
      canonicalUrl: `/seasonal-ecology/bloom-mapping/${bz.slug}`,
      parentModule: 'Seasonal Ecology · Bloom Mapping',
      subregion: resolveSubregion((bz.districts || []).join(', ')),
      districts: bz.districts,
      tags: ['Bloom Mapping', bz.bloomType, ...(bz.districts || [])].filter(Boolean),
      synonyms: [],
      source: 'KEW Bloom Mapping Atlas',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Mapped Bloom Corridor',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Bloom Zone',
      adapterId: 'calendar-community',
    });
  }

  // 5. Annual Environmental Calendar, EcoVoices & Outdoor Classroom
  for (const ev of (environmentalCalendarEvents as any[]) || []) {
    const title = ev.title || ev.name;
    if (!title) continue;
    documents.push({
      id: `cal-event:${ev.id}`,
      documentType: 'calendar_event',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${title} (${ev.officialDate || `${ev.month} ${ev.day}`})`,
      subtitle: `Environmental Calendar · ${ev.authority || 'Observance'}`,
      description: ev.himalayanRelevance || ev.summary || ev.description || 'Annual UN and Western Himalayan ecological observance.',
      canonicalUrl: '/environmental-calendar',
      parentModule: 'Environmental Calendar',
      subregion: 'Multi-Regional',
      tags: ['Environmental Calendar', ev.month, ev.theme || ''].filter(Boolean),
      synonyms: [],
      source: ev.authority || 'UN / MoEFCC / Regional Observance Schedule',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: ev.verificationStatus || 'Verified Observance',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Calendar Event',
      adapterId: 'calendar-community',
    });
  }

  // 5a. EcoVoices Top-Level Module & Creative Departments
  documents.push({
    id: 'module:ecovoices',
    documentType: 'module_page',
    resultClass: 'module_hub',
    domain: 'ecological_calendar',
    title: 'EcoVoices — Environmental Arts, Music & Creative Expression',
    subtitle: 'Independent Creative Platform · Music, Poetry, Cinema, Visual Arts & Soundscapes',
    description:
      'A dedicated platform for communicating environmental consciousness through music, poetry, literature, visual arts, natural soundscapes, and cinematic storytelling across the Western Himalayas, featuring SufiPulse USA environmental compositions.',
    canonicalUrl: '/ecovoices',
    parentModule: 'EcoVoices',
    subregion: 'Multi-Regional',
    tags: [
      'EcoVoices',
      'Environmental Music',
      'Environmental Poetry',
      'Environmental Cinema',
      'Environmental Art',
      'Sounds of Nature',
      'Creative Contributors',
      'SufiPulse USA',
      'Pani Gawah Hai',
    ],
    synonyms: ['Eco Voices', 'Kashmir Environmental Music', 'SufiPulse EcoVoices'],
    source: 'Kashmir EcoWatch × SufiPulse USA Creative Initiative',
    trustBadge: 'Platform Module',
    temporalNature: 'reference',
    verificationStatus: 'Active Top-Level Module',
    dataFreshness: 'static_module',
    accessClassification: 'public',
    ctaLabel: 'Enter EcoVoices',
    adapterId: 'calendar-community',
  });

  for (const song of ECOVOICES_RELEASES || []) {
    if (!song?.slug) continue;
    const lex = enrichWithMultilingualLexicon(`${song.title} ${(song as any).environmentalTheme || ''}`);
    documents.push({
      id: `ecovoice:${song.slug}`,
      documentType: 'ecovoice_release',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${song.title} — EcoVoices Environmental Music`,
      subtitle: `SufiPulse USA × Kashmir EcoWatch · ${(song as any).artistCredit || 'Dr. Zarf-e-Noori'}`,
      description:
        (song as any).ecologicalDossier ||
        (song as any).summary ||
        (song as any).description ||
        'Curated environmental stewardship musical release paired with Outdoor Classroom curriculum.',
      canonicalUrl: `/ecovoices/song/${song.slug}`,
      parentModule: 'EcoVoices · Environmental Arts & Music',
      subregion: 'Multi-Regional',
      tags: ['EcoVoices', 'Environmental Music', 'SufiPulse', (song as any).themeCategory || ''].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'SufiPulse USA × Kashmir EcoWatch Cultural Stewardship',
      trustBadge: 'Platform Module',
      temporalNature: 'reference',
      verificationStatus: 'Published Cultural Release',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Listen & View Dossier',
      adapterId: 'calendar-community',
    });
  }

  for (const fp of FIELD_LEARNING_PROGRAMS || []) {
    documents.push({
      id: `od-prog:${fp.id}`,
      documentType: 'education_program',
      resultClass: 'scientific_record',
      domain: 'ecological_calendar',
      title: `${fp.title} — Himalayan Outdoor Classroom`,
      subtitle: `${fp.category} Field Curriculum · ${fp.leadEcosystem}`,
      description: `${fp.subtitle}. Typical field destinations: ${fp.typicalDestinations.join(', ')}.`,
      canonicalUrl: '/environmental-calendar/outdoor-classroom/field-learning-programs',
      parentModule: 'Outdoor Classroom (OD)',
      subregion: 'Multi-Regional',
      tags: ['Outdoor Classroom', fp.category, fp.leadEcosystem, ...fp.typicalDestinations],
      synonyms: [],
      source: 'KEW Outdoor Classroom Curriculum Framework',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'reference',
      verificationStatus: 'Institutional Field Unit',
      dataFreshness: 'static_module',
      accessClassification: 'public',
      ctaLabel: 'Open Field Program',
      adapterId: 'calendar-community',
    });
  }

  for (const ae of (ADOPTED_ECOSYSTEM_REGISTRY as any[]) || []) {
    const name = ae.siteName || ae.name;
    if (!name) continue;
    documents.push({
      id: `adopt-site:${ae.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'education_program',
      resultClass: 'geographic_entity',
      domain: 'ecological_calendar',
      title: `${name} — Adopt-an-Ecosystem Field Site`,
      subtitle: `Outdoor Classroom Field Station · ${ae.district || ''}`,
      description: ae.ecologicalFocus || ae.description || 'Registered student field monitoring and stewardship ecosystem site.',
      canonicalUrl: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem',
      parentModule: 'Outdoor Classroom · Adopt-an-Ecosystem',
      subregion: resolveSubregion(ae.district, ae.region),
      district: ae.district,
      tags: ['Adopt-an-Ecosystem', 'Student Fieldwork', ae.ecosystemType, ae.district].filter(Boolean),
      synonyms: [],
      source: 'KEW School Stewardship Registry',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Registered Field Site',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Field Site',
      adapterId: 'calendar-community',
    });
  }

  // 6. KEW Green Heroes (Master + Martyrs + Scientists + Journalists + Advocates + Religious + Officials + NGO Leaders)
  const seenHeroNames = new Set<string>();
  const addHeroDoc = (
    id: string,
    name: string,
    roleOrCat: string,
    regionRaw: string | undefined,
    districtRaw: string | undefined,
    bio: string,
    tab: string,
    extraTags: string[] = []
  ) => {
    const norm = name.trim().toLowerCase();
    if (!norm || seenHeroNames.has(norm)) return;
    seenHeroNames.add(norm);

    const subregion = resolveSubregion(districtRaw, regionRaw);
    const lex = enrichWithMultilingualLexicon(`${name} ${roleOrCat}`);
    documents.push({
      id: `green-hero:${id}`,
      documentType: 'green_hero',
      resultClass: 'scientific_record',
      domain: 'community_participation',
      title: name,
      subtitle: `KEW Green Heroes · ${roleOrCat} (${districtRaw || regionRaw || subregion})`,
      description: bio,
      canonicalUrl: `/resources/kew-green-heroes?tab=${encodeURIComponent(tab)}`,
      parentModule: 'KEW Green Heroes & Contributors Registry',
      subregion,
      district: districtRaw,
      tags: Array.from(new Set(['Green Heroes', roleOrCat, districtRaw || '', ...extraTags].filter(Boolean))),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'KEW Five-Region Green Heroes Evidentiary Registry',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Source-Attributed Dossier',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open Hero Dossier',
      adapterId: 'calendar-community',
    });
  };

  for (const h of GREEN_HEROES_MASTER_DATA || []) {
    addHeroDoc(
      h.id,
      h.honorific && !h.name.startsWith(h.honorific) ? `${h.honorific} ${h.name}` : h.name,
      h.primaryCategory,
      h.region,
      h.district,
      `${h.tagline}. ${h.biography}`,
      'overview',
      [h.affiliation, ...h.secondaryCategories]
    );
  }
  for (const m of GREEN_MARTYRS_DOSSIERS || []) {
    addHeroDoc(m.id, m.name, `Green Martyr · ${m.designation}`, m.region, m.district, `${m.keyImpact} ${m.narrative}`, 'martyrs', [
      'Green Martyrs',
      m.martyrType,
    ]);
  }
  for (const s of ENVIRONMENTAL_SCIENTISTS_DOSSIERS || []) {
    addHeroDoc(
      s.id,
      s.honorific && !s.name.startsWith(s.honorific) ? `${s.honorific} ${s.name}` : s.name,
      `${s.designation} (${s.institution})`,
      s.region,
      undefined,
      `${s.keyImpact} ${s.biography}`,
      'scientists',
      s.fields
    );
  }
  for (const j of ENVIRONMENTAL_JOURNALISTS_DOSSIERS || []) {
    addHeroDoc(
      j.id,
      j.name,
      `${j.designation} (${j.outletOrAffiliation})`,
      j.region,
      undefined,
      `${j.keyImpact} ${j.specializationSummary}`,
      'journalists',
      j.specialization
    );
  }
  for (const a of ENVIRONMENTAL_ADVOCATES_DOSSIERS || []) {
    addHeroDoc(
      a.id,
      (a as any).name,
      `${(a as any).legalRole || 'Environmental Advocate'}`,
      (a as any).region,
      undefined,
      (a as any).keyImpact || (a as any).biography || 'Public-interest environmental litigation advocate.',
      'advocates',
      ['Environmental Advocate', 'PIL']
    );
  }
  for (const r of RELIGIOUS_LEADERS_DOSSIERS || []) {
    addHeroDoc(
      r.id,
      r.honorific && !r.name.startsWith(r.honorific) ? `${r.honorific} ${r.name}` : r.name,
      `${r.designation} (${r.affiliationOrShrine})`,
      r.region,
      r.geographicLocus,
      `${r.keyImpact} ${r.biography}`,
      'religious-leaders'
    );
  }
  for (const p of POLITICIANS_OFFICIALS_DOSSIERS || []) {
    addHeroDoc(
      p.id,
      p.honorific && !p.name.startsWith(p.honorific) ? `${p.honorific} ${p.name}` : p.name,
      p.designation,
      (p as any).region,
      p.geographicLocus,
      `${p.keyImpact} ${p.biography}`,
      'politicians'
    );
  }
  for (const nl of [MANZOOR_WANGNOO_DOSSIER, ...(ADDITIONAL_NGO_LEADERS || [])]) {
    if (!nl) continue;
    addHeroDoc(nl.id, nl.name, `${nl.role} — ${nl.organization}`, (nl as any).region, nl.geographicLocus, `${nl.keyImpact} ${nl.biography}`, 'ngos-community', [
      nl.organization,
    ]);
  }

  // 7. NGO Impact Directory & Projects + Citizen Science Programs
  for (const ngo of ngoRegistryData || []) {
    if (!ngo?.slug) continue;
    const subregion = resolveSubregion((ngo.operating_districts || []).join(', '));
    documents.push({
      id: `ngo:${ngo.slug}`,
      documentType: 'ngo_profile',
      resultClass: 'scientific_record',
      domain: 'community_participation',
      title: `${ngo.name}${ngo.acronym ? ` (${ngo.acronym})` : ''}`,
      subtitle: `Environmental NGO (Est. ${ngo.founded_year}) · HQ: ${ngo.headquarters}`,
      description: `Focus areas: ${(ngo.focus_areas || []).join(', ')}. Operating across ${(ngo.operating_districts || []).join(', ')}.`,
      canonicalUrl: `/ngo-impact/${ngo.slug}`,
      parentModule: 'NGO & Civil Society Impact',
      subregion,
      district: ngo.headquarters,
      districts: ngo.operating_districts,
      tags: ['NGO', ngo.acronym || '', ...(ngo.focus_areas || []), ...(ngo.operating_districts || [])].filter(Boolean),
      synonyms: [ngo.acronym || ''].filter(Boolean),
      source: 'KEW Civil Society & NGO Impact Registry',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: ngo.registration_status,
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open NGO Profile',
      adapterId: 'calendar-community',
    });

    for (const proj of (ngo as any).projects || []) {
      if (!proj?.slug) continue;
      documents.push({
        id: `ngo-project:${proj.slug}`,
        documentType: 'ngo_profile',
        resultClass: 'scientific_record',
        domain: 'community_participation',
        title: proj.title,
        subtitle: `${ngo.name} Field Project · ${proj.location_district}`,
        description: `${proj.problem_addressed} Outcomes: ${proj.ecological_outcome}`,
        canonicalUrl: `/ngo-impact/project/${proj.slug}`,
        parentModule: 'NGO Impact · Field Projects',
        subregion: resolveSubregion(proj.location_district),
        district: proj.location_district,
        tags: ['Conservation Project', proj.environmental_category, proj.location_district, ngo.name].filter(Boolean),
        synonyms: [],
        source: `${ngo.name} (${proj.verification_status})`,
        trustBadge: 'Field Verified',
        temporalNature: 'periodic_monitoring',
        verificationStatus: proj.verification_status,
        dataFreshness: 'periodic_baseline',
        accessClassification: 'public',
        ctaLabel: 'View Project Outcomes',
        adapterId: 'calendar-community',
      });
    }
  }

  for (const cs of CITIZEN_SCIENCE_PROGRAMS || []) {
    documents.push({
      id: `citsci:${cs.id}`,
      documentType: 'citizen_program',
      resultClass: 'module',
      domain: 'community_participation',
      title: `${cs.title} — Citizen Science Program`,
      subtitle: `Participatory Field Science · ${cs.volunteers} Active Volunteers`,
      description: `${cs.description} Core activities: ${cs.activities.join(', ')}.`,
      canonicalUrl: cs.route,
      parentModule: 'Citizen Science & Public Participation',
      subregion: 'Multi-Regional',
      tags: ['Citizen Science', cs.title, ...cs.activities],
      synonyms: [],
      source: 'KEW Citizen Science Observatory',
      trustBadge: 'Community Reported',
      temporalNature: 'operational_feed',
      verificationStatus: 'Active Participatory Program',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      metrics: [{ label: 'Volunteers', value: String(cs.volunteers) }],
      ctaLabel: 'Join Program',
      adapterId: 'calendar-community',
    });
  }

  return {
    adapterId: 'calendar-community',
    adapterName: 'Phenology, Pollinators, Migrations, Calendar, EcoVoices, Green Heroes & NGO Adapter',
    documents,
    excluded: [],
    sourceHealthy: true,
  };
}
