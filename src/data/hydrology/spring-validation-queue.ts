/**
 * Kashmir EcoWatch — Spring Validation Queue
 * Spring and bowli records requiring GPS coordinates, discharge verification, water quality sampling, or conflict resolution.
 * Updated: 2026-06-16
 */

export interface SpringValidationEntry {
  springId: string;
  springName: string;
  region: string;
  district: string;
  validationNeeded: ('GPS' | 'Discharge' | 'WaterQuality' | 'Conflict' | 'NameVerification')[];
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

export const springValidationQueue: SpringValidationEntry[] = [
  // ─── GEOGRAPHIC & GPS VALIDATION ─────────────────────────────────────────
  {
    springId: 'spring-tatapani-paddar',
    springName: 'Tatapani Paddar',
    region: 'Jammu',
    district: 'Kishtwar',
    validationNeeded: ['GPS'],
    priority: 'High',
    notes: 'Coordinates are approximate, placed near Paddar valley headwaters. Highly remote geothermal spring requiring handheld GPS field validation.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-gudresh-nag',
    springName: 'Gudresh Nag',
    region: 'Jammu',
    district: 'Kishtwar',
    validationNeeded: ['GPS'],
    priority: 'Medium',
    notes: 'GPS coordinates are approximate village-center proxies. Ground verification needed to pin the exact bowli masonry structure.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-pooti-nag',
    springName: 'Pooti Nag',
    region: 'Jammu',
    district: 'Kishtwar',
    validationNeeded: ['GPS', 'Discharge'],
    priority: 'Medium',
    notes: 'High-altitude spring. Lacks exact coordinate verification and flow rate records.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-kumai-nag',
    springName: 'Kumai Nag',
    region: 'Jammu',
    district: 'Kishtwar',
    validationNeeded: ['GPS'],
    priority: 'Low',
    notes: 'Requires mapping of the old stone masonry pool structure in Kumai village.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-garam-chashma-chilas',
    springName: 'Garam Chashma Chilas',
    region: 'Gilgit-Baltistan',
    district: 'Diamer',
    validationNeeded: ['GPS', 'Discharge'],
    priority: 'High',
    notes: 'Diamer district geothermal spring has approximate coordinate mapping. Discharge data is missing.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-lavnag',
    springName: 'Lavnag Spring',
    region: 'Kashmir Core',
    district: 'Kupwara',
    validationNeeded: ['GPS', 'Discharge'],
    priority: 'Medium',
    notes: 'Lolab Valley freshwater spring. Coordinate accuracy is approximate, discharge rate needs to be recorded during summer low-flows.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-satisar',
    springName: 'Satisar Spring',
    region: 'Kashmir Core',
    district: 'Kupwara',
    validationNeeded: ['GPS', 'Discharge'],
    priority: 'Medium',
    notes: 'Needs GPS verification of the historic pool basin. Awaiting dry-season discharge measurement.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── CONFLICT RESOLUTION ───────────────────────────────────────────────────
  {
    springId: 'spring-dareng',
    springName: 'Dareng Spring',
    region: 'Kashmir Core',
    district: 'Baramulla',
    validationNeeded: ['Conflict', 'GPS'],
    priority: 'High',
    notes: 'Resolved district attribution. Seed record listed Anantnag district; verified geographic location in Baramulla (Tangmarg/Drang village boundary). Mapped coordinates and updated district.',
    status: 'Resolved',
    createdAt: '2026-06-16T02:00:00Z'
  },
  {
    springId: 'spring-malikpora-kulgam',
    springName: 'Malikpora Spring (Kulgam)',
    region: 'Kashmir Core',
    district: 'Kulgam',
    validationNeeded: ['Conflict', 'NameVerification'],
    priority: 'High',
    notes: 'Seed records listed Malikpora Spring under Kulgam. However, user requests listed it under Bandipora. Split into two entries and scheduled field validation to verify if both springs exist or if a single spring was misattributed.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  },

  // ─── WATER QUALITY VALIDATION ──────────────────────────────────────────────
  {
    springId: 'spring-ganderbhavan',
    springName: 'Ganderbhavan Spring',
    region: 'Kashmir Core',
    district: 'Ganderbal',
    validationNeeded: ['WaterQuality'],
    priority: 'High',
    notes: 'Recent Jal Shakti report flagged high bacteriological contamination in Ganderbal springs. Scheduled for immediate multi-parameter chemical and microbiological testing.',
    status: 'Pending',
    createdAt: '2026-06-16T02:00:00Z'
  }
];
