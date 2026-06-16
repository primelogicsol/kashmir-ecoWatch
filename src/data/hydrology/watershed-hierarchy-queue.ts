/**
 * Kashmir EcoWatch — Watershed Hierarchy Validation Queue
 * Validates the topological parent-child relationships of river basins, sub-basins, and catchments.
 * Updated: 2026-06-16
 */

export interface WatershedHierarchyEntry {
  watershedId: string;
  watershedName: string;
  suggestedParentId: string;
  suggestedParentName: string;
  relationshipType: 'Sub-Basin to Basin' | 'Catchment to Sub-Basin' | 'Micro-Watershed to Catchment' | 'Transboundary Confluence';
  conflictStatus: 'Unresolved' | 'Under Review' | 'Resolved';
  notes: string;
  lastChecked: string;
}

export const watershedHierarchyQueue: WatershedHierarchyEntry[] = [
  {
    watershedId: 'kishanganga-basin',
    watershedName: 'Kishanganga Basin',
    suggestedParentId: 'jhelum-basin',
    suggestedParentName: 'Jhelum Basin',
    relationshipType: 'Sub-Basin to Basin',
    conflictStatus: 'Under Review',
    notes: 'Kishanganga joins the Jhelum in Pakistan (near Muzaffarabad). Since Jhelum Basin in J&K contains Kishanganga within India, the parent-child linkage spans transboundary administration. Under review for logical database classification.',
    lastChecked: '2026-06-16'
  },
  {
    watershedId: 'neelum-ajk-basin',
    watershedName: 'Neelum AJK Basin',
    suggestedParentId: 'jhelum-basin',
    suggestedParentName: 'Jhelum Basin',
    relationshipType: 'Sub-Basin to Basin',
    conflictStatus: 'Under Review',
    notes: 'Neelum River is the continuation of Kishanganga. Hydrological parent linkage is transboundary Jhelum Basin, but it acts as an independent drainage sub-basin for AJK.',
    lastChecked: '2026-06-16'
  },
  {
    watershedId: 'poonch-ajk-catchment',
    watershedName: 'Poonch AJK Catchment',
    suggestedParentId: 'jhelum-basin',
    suggestedParentName: 'Jhelum Basin',
    relationshipType: 'Catchment to Sub-Basin',
    conflictStatus: 'Unresolved',
    notes: 'Poonch River crosses from Poonch J&K into Kotli AJK, draining into the Mangla reservoir. Links as child to Jhelum Basin but traverses multiple geopolitical partitions.',
    lastChecked: '2026-06-16'
  },
  {
    watershedId: 'tatapani-kalakote-spring-shed',
    watershedName: 'Tatapani Kalakote Spring-Shed',
    suggestedParentId: 'chenab-basin',
    suggestedParentName: 'Chenab Basin',
    relationshipType: 'Micro-Watershed to Catchment',
    conflictStatus: 'Unresolved',
    notes: 'Drains through small seasonal channels towards the Kalakote Nallah, eventually feeding the Chenab. Needs confirmation of flow-routing vectors.',
    lastChecked: '2026-06-16'
  },
  {
    watershedId: 'spring-tatta-pani-kotli-spring-shed',
    watershedName: 'Spring Tatta Pani Kotli Spring-Shed',
    suggestedParentId: 'poonch-ajk-catchment',
    suggestedParentName: 'Poonch AJK Catchment',
    relationshipType: 'Micro-Watershed to Catchment',
    conflictStatus: 'Under Review',
    notes: 'Spring-shed drains directly into the Poonch River channel. Needs verification of local groundwater divide limits.',
    lastChecked: '2026-06-16'
  }
];
