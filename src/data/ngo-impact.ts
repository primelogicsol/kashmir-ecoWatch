// THIS FILE IS AUTO-GENERATED FROM EXCEL

export type NGOFocusArea = string;
export type VerificationLevel = 'Self-reported' | 'Community verified' | 'Field verified' | 'Expert reviewed';

export interface ImpactScore {
  ecological_relevance: number; // 0-10
  evidence_quality: number;
  community_benefit: number;
  continuity_of_work: number;
  transparency: number;
  alignment_with_kew: number;
  total_score: number; // 0-100
}

export interface NGOProject {
  id: string;
  slug: string;
  title: string;
  location_district: string;
  start_date: string;
  end_date: string | 'Ongoing';
  environmental_category: string;
  problem_addressed: string;
  activities_completed: string[];
  measurable_outputs: string;
  ecological_outcome: string;
  community_outcome: string;
  evidence_quality: 'High' | 'Medium' | 'Low';
  verification_status: VerificationLevel;
  linked_entities: string[];
}

export interface NGORecord {
  id: string;
  slug: string;
  name: string;
  acronym?: string;
  logo_url: string;
  founded_year: number;
  focus_areas: string[];
  operating_districts: string[];
  headquarters: string;
  registration_status: 'Registered' | 'Unregistered' | 'Trust' | 'Society';
  contact_email: string;
  website: string;
  verification_status: VerificationLevel;
  
  mission_summary: string;
  geographic_coverage: string;
  partner_organizations: string[];
  funding_transparency: 'High' | 'Partial' | 'Undisclosed';
  
  impact_score: ImpactScore;
  projects: NGOProject[];
  
  // Virtual properties for UI
  verified_reports?: number;
}

export const ngoRegistryData: NGORecord[] = [
  {
    "id": "KMR-001",
    "slug": "chinar-international",
    "name": "CHINAR International",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Disaster Relief",
      "Community outreach; welfare; education"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Child development, education, youth development, livelihoods and crisis relief; environment category appears through disaster relief.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 82
    },
    "projects": [
      {
        "id": "proj-0",
        "slug": "project-chinar-international-1",
        "title": "NGO reach; DRR; awareness; community action",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Disaster Relief",
        "problem_addressed": "Child development, education, youth development, livelihoods and crisis relief; environment category appears through disaster relief.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-006",
    "slug": "sharva-aikyam-foundation",
    "name": "Sharva Aikyam Foundation",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Environment Protection",
      "Community outreach; welfare; education"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Food kits, blood donations, hygiene and volunteer support; environment protection listing.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 82
    },
    "projects": [
      {
        "id": "proj-1",
        "slug": "project-sharva-aikyam-foundation-1",
        "title": "NGO reach; DRR; awareness; community action",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment Protection",
        "problem_addressed": "Food kits, blood donations, hygiene and volunteer support; environment protection listing.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-008",
    "slug": "catholic-social-service-society",
    "name": "Catholic Social Service Society",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Disaster Relief",
      "Community outreach; welfare; education"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Microcredit, livelihood, PWD rights, inclusive education and disaster risk reduction.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-2",
        "slug": "project-catholic-social-service-society-1",
        "title": "NGO reach; DRR; awareness; community action",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Disaster Relief",
        "problem_addressed": "Microcredit, livelihood, PWD rights, inclusive education and disaster risk reduction.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-011",
    "slug": "gokul-goshala-kathua-jammu-official",
    "name": "Gokul Goshala Kathua, Jammu-official.",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Jammu",
      "Kathua"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Animal welfare and rescue.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 76
    },
    "projects": [
      {
        "id": "proj-3",
        "slug": "project-gokul-goshala-kathua-jammu-official-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Animal welfare and rescue.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-012",
    "slug": "save-save-animals-value-environment",
    "name": "SAVE- Save Animals & Value Environment",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Animal rescue, emergency treatment, foster care and environmental value work.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 6,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 71
    },
    "projects": [
      {
        "id": "proj-4",
        "slug": "project-save-save-animals-value-environment-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Animal rescue, emergency treatment, foster care and environmental value work.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-013",
    "slug": "kawfcares",
    "name": "KAWFCares",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Animal welfare and rescue.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 74
    },
    "projects": [
      {
        "id": "proj-5",
        "slug": "project-kawfcares-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Animal welfare and rescue.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-014",
    "slug": "animal-rescue-kashmir",
    "name": "Animal Rescue Kashmir",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Animal welfare and rescue.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 83
    },
    "projects": [
      {
        "id": "proj-6",
        "slug": "project-animal-rescue-kashmir-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Animal welfare and rescue.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-015",
    "slug": "jaws-paws-whiskers",
    "name": "Jaws, Paws & Whiskers",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Animal welfare and rescue.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-7",
        "slug": "project-jaws-paws-whiskers-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Animal welfare and rescue.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-016",
    "slug": "hakhoo-street-animals-foundation",
    "name": "Hakhoo Street Animals Foundation",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; humane management"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Shelter/care for disabled street animals.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 74
    },
    "projects": [
      {
        "id": "proj-8",
        "slug": "project-hakhoo-street-animals-foundation-1",
        "title": "Animal welfare; urban ecological conflict; stray animal response",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Shelter/care for disabled street animals.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-018",
    "slug": "animal-aid-kashmir",
    "name": "ANIMAL AID KASHMIR",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Animal Welfare",
      "Potential community partner"
    ],
    "operating_districts": [
      "Anantnag"
    ],
    "headquarters": "Anantnag",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record: animal welfare and nutrition; registered in Anantnag.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 79
    },
    "projects": [
      {
        "id": "proj-9",
        "slug": "project-animal-aid-kashmir-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Anantnag",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "DARPAN sample record: animal welfare and nutrition; registered in Anantnag.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-019",
    "slug": "veer-bhoomi-trust-kishtwar",
    "name": "Veer Bhoomi Trust Kishtwar",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Environment & Forests",
      "Potential community partner"
    ],
    "operating_districts": [
      "Kishtwar"
    ],
    "headquarters": "Kishtwar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record: sectors include agriculture, environment & forests, water resources, science & technology and rural development.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 7,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 70
    },
    "projects": [
      {
        "id": "proj-10",
        "slug": "project-veer-bhoomi-trust-kishtwar-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Kishtwar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment & Forests",
        "problem_addressed": "DARPAN sample record: sectors include agriculture, environment & forests, water resources, science & technology and rural development.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-020",
    "slug": "jamia-abu-bakar-sadeeq-educational-and-charitable-trust",
    "name": "Jamia Abu Bakar Sadeeq Educational and Charitable Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Indirect / Education",
      "Potential community partner"
    ],
    "operating_districts": [
      "Reasi"
    ],
    "headquarters": "Reasi",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; not primarily environmental in preview.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 54
    },
    "projects": [
      {
        "id": "proj-11",
        "slug": "project-jamia-abu-bakar-sadeeq-educational-and-charitable-trust-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Reasi",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Education",
        "problem_addressed": "DARPAN sample record; not primarily environmental in preview.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-021",
    "slug": "the-mehjoor-ari-embroidery-industrial-cooperative-limited-buran",
    "name": "The Mehjoor Ari Embroidery Industrial Cooperative Limited Buran",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Indirect / Livelihood",
      "Potential community partner"
    ],
    "operating_districts": [
      "Baramulla"
    ],
    "headquarters": "Baramulla",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; useful for community/livelihood mapping, not core environment.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 55
    },
    "projects": [
      {
        "id": "proj-12",
        "slug": "project-the-mehjoor-ari-embroidery-industrial-cooperative-limited-buran-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Baramulla",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Livelihood",
        "problem_addressed": "DARPAN sample record; useful for community/livelihood mapping, not core environment.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-022",
    "slug": "shri-radha-kunj-assram",
    "name": "Shri Radha Kunj Assram",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Indirect / Community",
      "Potential community partner"
    ],
    "operating_districts": [
      "Kathua"
    ],
    "headquarters": "Kathua",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; verify relevance.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-13",
        "slug": "project-shri-radha-kunj-assram-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Kathua",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Community",
        "problem_addressed": "DARPAN sample record; verify relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-023",
    "slug": "darul-uloom-nazamia-educational-welfare-charity-trust",
    "name": "Darul Uloom Nazamia Educational, Welfare & Charity Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Indirect / Housing/Labour",
      "Potential community partner"
    ],
    "operating_districts": [
      "Rajouri"
    ],
    "headquarters": "Rajouri",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; verify relevance.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 61
    },
    "projects": [
      {
        "id": "proj-14",
        "slug": "project-darul-uloom-nazamia-educational-welfare-charity-trust-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Rajouri",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Housing/Labour",
        "problem_addressed": "DARPAN sample record; verify relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-024",
    "slug": "mahajan-sabha-channi-himmat",
    "name": "Mahajan Sabha Channi Himmat",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Indirect / Community",
      "Potential community partner"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; verify relevance.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 53
    },
    "projects": [
      {
        "id": "proj-15",
        "slug": "project-mahajan-sabha-channi-himmat-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Community",
        "problem_addressed": "DARPAN sample record; verify relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-025",
    "slug": "baba-barfani-sewa-samiti",
    "name": "Baba Barfani Sewa Samiti",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Indirect / Religious/Food",
      "Potential community partner"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "DARPAN sample record; verify relevance.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 62
    },
    "projects": [
      {
        "id": "proj-16",
        "slug": "project-baba-barfani-sewa-samiti-1",
        "title": "Registration intelligence; NGO mapping",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Indirect / Religious/Food",
        "problem_addressed": "DARPAN sample record; verify relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-026",
    "slug": "nigeen-lake-conservation-organisation-nlco",
    "name": "Nigeen Lake Conservation Organisation",
    "acronym": "NLCO",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Lakes / Wetlands",
      "Solid waste; public campaigns"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.facebook.com/NigeenLakeConservationOrganisation/",
    "verification_status": "Field verified",
    "mission_summary": "Known for Nigeen/Dal conservation and Mission Ehsaas style public campaigns.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 85
    },
    "projects": [
      {
        "id": "proj-17",
        "slug": "project-nigeen-lake-conservation-organisation-nlco-1",
        "title": "Lake conservation; public campaigns; cleanups",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Lakes / Wetlands",
        "problem_addressed": "Known for Nigeen/Dal conservation and Mission Ehsaas style public campaigns.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-027",
    "slug": "environmental-policy-group-epg-kashmir",
    "name": "Environmental Policy Group  Kashmir",
    "acronym": "EPG",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Policy / Governance",
      "Public interest advocacy; ecological protection"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Public environmental advocacy platform in Kashmir; verify current leadership/contact before outreach.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 86
    },
    "projects": [
      {
        "id": "proj-18",
        "slug": "project-environmental-policy-group-epg-kashmir-1",
        "title": "Policy influence; advocacy; public discourse",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Policy / Governance",
        "problem_addressed": "Public environmental advocacy platform in Kashmir; verify current leadership/contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-028",
    "slug": "jammu-kashmir-rti-movement-environmental-civic-network",
    "name": "Jammu & Kashmir RTI Movement / environmental civic network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Environmental governance",
      "RTI; public accountability; wetlands; waste"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Public-interest civic advocacy linked with environmental accountability and public rights.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 94
    },
    "projects": [
      {
        "id": "proj-19",
        "slug": "project-jammu-kashmir-rti-movement-environmental-civic-network-1",
        "title": "Governance; policy accountability; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental governance",
        "problem_addressed": "Public-interest civic advocacy linked with environmental accountability and public rights.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-029",
    "slug": "kashmir-birdwatch-birding-community",
    "name": "Kashmir Birdwatch / birding community",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Birds / Biodiversity",
      "Wetlands; bird monitoring"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Potential citizen-science partner for bird records and wetland monitoring; verify active groups.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 84
    },
    "projects": [
      {
        "id": "proj-20",
        "slug": "project-kashmir-birdwatch-birding-community-1",
        "title": "Citizen science; species monitoring",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Birds / Biodiversity",
        "problem_addressed": "Potential citizen-science partner for bird records and wetland monitoring; verify active groups.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-030",
    "slug": "kashmir-valley-environmental-network",
    "name": "Kashmir Valley Environmental Network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Environment protection",
      "Public campaigns"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Placeholder target for verification from local directories and social sources.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-21",
        "slug": "project-kashmir-valley-environmental-network-1",
        "title": "Outreach; civil society mapping",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment protection",
        "problem_addressed": "Placeholder target for verification from local directories and social sources.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-031",
    "slug": "national-green-organisation",
    "name": "National Green Organisation",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Animal Welfare",
      "Rescue; rehabilitation"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Listed in NGOFeed Discover for Ramban/J&K; verify details before outreach.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-22",
        "slug": "project-national-green-organisation-1",
        "title": "Animal welfare; rescue; district mapping",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Listed in NGOFeed Discover for Ramban/J&K; verify details before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-032",
    "slug": "jammu-animal-welfare-group-local-rescue-networks",
    "name": "Jammu Animal Welfare Group / local rescue networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Animal Welfare",
      "Urban ecology; stray animal management"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Use as category node for multiple informal rescue groups; verify individual pages.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 5,
      "evidence_quality": 5,
      "community_benefit": 5,
      "continuity_of_work": 5,
      "transparency": 5,
      "alignment_with_kew": 5,
      "total_score": 50
    },
    "projects": [
      {
        "id": "proj-23",
        "slug": "project-jammu-animal-welfare-group-local-rescue-networks-1",
        "title": "Animal welfare; urban conflict",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Use as category node for multiple informal rescue groups; verify individual pages.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-033",
    "slug": "bombay-natural-history-society-bnhs",
    "name": "Bombay Natural History Society",
    "acronym": "BNHS",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Biodiversity / Birds",
      "Research; bird conservation; biodiversity monitoring"
    ],
    "operating_districts": [
      "Leh",
      "India"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "National NGO named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-24",
        "slug": "project-bombay-natural-history-society-bnhs-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Biodiversity / Birds",
        "problem_addressed": "National NGO named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-034",
    "slug": "world-wide-fund-for-nature-india-wwf-india",
    "name": "World Wide Fund for Nature - India",
    "acronym": "WWF-India",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Biodiversity / Wildlife",
      "Landscape conservation; awareness; policy"
    ],
    "operating_districts": [
      "Ladakh",
      "India"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 75
    },
    "projects": [
      {
        "id": "proj-25",
        "slug": "project-world-wide-fund-for-nature-india-wwf-india-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Biodiversity / Wildlife",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-035",
    "slug": "wildlife-conservation-and-birds-club-of-ladakh",
    "name": "Wildlife Conservation and Birds Club of Ladakh",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Birds / Wildlife",
      "Bird conservation; field awareness"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-26",
        "slug": "project-wildlife-conservation-and-birds-club-of-ladakh-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Birds / Wildlife",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-036",
    "slug": "ladakh-ecological-development-group-ledeg",
    "name": "Ladakh Ecological Development Group",
    "acronym": "LEDeG",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Renewable energy / Urban environment",
      "Rural development; livelihoods; urban environmental issues"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "mail@ledeg.org",
    "website": "http://www.ledeg.org",
    "verification_status": "Expert reviewed",
    "mission_summary": "Grassroots organization founded in 1983; contact verified by FAO Mountain Partnership.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 9,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 90
    },
    "projects": [
      {
        "id": "proj-27",
        "slug": "project-ladakh-ecological-development-group-ledeg-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Renewable energy / Urban environment",
        "problem_addressed": "Grassroots organization founded in 1983; contact verified by FAO Mountain Partnership.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-038",
    "slug": "snow-leopard-conservancy-india-trust",
    "name": "Snow Leopard Conservancy India Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Snow leopard / Wildlife",
      "Human-wildlife conflict; community conservation"
    ],
    "operating_districts": [
      "Ladakh"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 86
    },
    "projects": [
      {
        "id": "proj-28",
        "slug": "project-snow-leopard-conservancy-india-trust-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Snow leopard / Wildlife",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-039",
    "slug": "ladakh-animal-care-society",
    "name": "Ladakh Animal Care Society",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Animal Welfare",
      "Animal rescue/care; urban animal welfare"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 82
    },
    "projects": [
      {
        "id": "proj-29",
        "slug": "project-ladakh-animal-care-society-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Animal Welfare",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-040",
    "slug": "ladakh-centre-for-peace-and-sustainable-development",
    "name": "Ladakh Centre for Peace and Sustainable Development",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Sustainable development",
      "Peace; sustainability; community action"
    ],
    "operating_districts": [
      "Ladakh"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 78
    },
    "projects": [
      {
        "id": "proj-30",
        "slug": "project-ladakh-centre-for-peace-and-sustainable-development-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Sustainable development",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-041",
    "slug": "brown-bear-trust",
    "name": "Brown Bear Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Brown bear / Wildlife",
      "Human-wildlife conflict; habitat conservation"
    ],
    "operating_districts": [
      "Ladakh"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 79
    },
    "projects": [
      {
        "id": "proj-31",
        "slug": "project-brown-bear-trust-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Brown bear / Wildlife",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-042",
    "slug": "ladakh-women-alliance",
    "name": "Ladakh Women Alliance",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Community / Sustainability",
      "Women-led community development and sustainability"
    ],
    "operating_districts": [
      "Ladakh"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named in 2026 Ladakh govt conservation NGO meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 79
    },
    "projects": [
      {
        "id": "proj-32",
        "slug": "project-ladakh-women-alliance-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community / Sustainability",
        "problem_addressed": "Named in 2026 Ladakh govt conservation NGO meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-043",
    "slug": "himalayan-ground-trust",
    "name": "Himalayan Ground Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Forest / Wildlife / Environment",
      "Participated virtually in 2026 meeting; verify legal status/contact."
    ],
    "operating_districts": [
      "Kargil"
    ],
    "headquarters": "Kargil",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Named as Kargil-based organization in 2026 Ladakh govt meeting.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 7,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 70
    },
    "projects": [
      {
        "id": "proj-33",
        "slug": "project-himalayan-ground-trust-1",
        "title": "Biodiversity; wildlife; climate; community; governance",
        "location_district": "Kargil",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forest / Wildlife / Environment",
        "problem_addressed": "Named as Kargil-based organization in 2026 Ladakh govt meeting.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-044",
    "slug": "himalayan-institute-of-alternatives-ladakh-hial",
    "name": "Himalayan Institute of Alternatives, Ladakh",
    "acronym": "HIAL",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Climate adaptation / sustainable infrastructure",
      "Ice stupas; mountain innovation; education"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.hial.edu.in/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 92
    },
    "projects": [
      {
        "id": "proj-34",
        "slug": "project-himalayan-institute-of-alternatives-ladakh-hial-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate adaptation / sustainable infrastructure",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-045",
    "slug": "secmol-students-educational-and-cultural-movement-of-ladakh",
    "name": "SECMOL - Students' Educational and Cultural Movement of Ladakh",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Sustainable education / climate adaptation",
      "Alternative education; solar buildings; youth development"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://secmol.org/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 7,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 70
    },
    "projects": [
      {
        "id": "proj-35",
        "slug": "project-secmol-students-educational-and-cultural-movement-of-ladakh-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Sustainable education / climate adaptation",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-046",
    "slug": "local-futures-international-society-for-ecology-and-culture-ladakh-linked-work",
    "name": "Local Futures / International Society for Ecology and Culture - Ladakh linked work",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Localization / sustainable economies",
      "Long-term Ladakh-focused work on localization and sustainable culture"
    ],
    "operating_districts": [
      "Ladakh",
      "Global"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.localfutures.org/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 84
    },
    "projects": [
      {
        "id": "proj-36",
        "slug": "project-local-futures-international-society-for-ecology-and-culture-ladakh-linked-work-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Localization / sustainable economies",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-047",
    "slug": "live-to-love-ladakh",
    "name": "Live to Love Ladakh",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Waste / climate / community",
      "Cleanups",
      "disaster relief and community action; verify current environmental projects"
    ],
    "operating_districts": [
      "Leh"
    ],
    "headquarters": "Leh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.livetolove.org/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 83
    },
    "projects": [
      {
        "id": "proj-37",
        "slug": "project-live-to-love-ladakh-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Leh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Waste / climate / community",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-048",
    "slug": "nature-conservation-foundation-high-altitudes-programme",
    "name": "Nature Conservation Foundation - High Altitudes Programme",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "High-altitude wildlife",
      "Research and conservation in the Trans-Himalaya"
    ],
    "operating_districts": [
      "Ladakh",
      "Trans-Himalaya"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.ncf-india.org/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 6,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 71
    },
    "projects": [
      {
        "id": "proj-38",
        "slug": "project-nature-conservation-foundation-high-altitudes-programme-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "High-altitude wildlife",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-049",
    "slug": "wildlife-trust-of-india-himalayan-projects",
    "name": "Wildlife Trust of India - Himalayan projects",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Wildlife protection",
      "National conservation NGO with Himalayan relevance"
    ],
    "operating_districts": [
      "J&K",
      "Ladakh",
      "India"
    ],
    "headquarters": "J&K",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.wti.org.in/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 73
    },
    "projects": [
      {
        "id": "proj-39",
        "slug": "project-wildlife-trust-of-india-himalayan-projects-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "J&K",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife protection",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-050",
    "slug": "sanctuary-nature-foundation",
    "name": "Sanctuary Nature Foundation",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Wildlife / public awareness",
      "Conservation communication and networks; useful media/science partner"
    ],
    "operating_districts": [
      "India",
      "Himalayan region"
    ],
    "headquarters": "India",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://www.sanctuarynaturefoundation.org/",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-40",
        "slug": "project-sanctuary-nature-foundation-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "India",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife / public awareness",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-051",
    "slug": "shan-conservation-society",
    "name": "SHAN Conservation Society",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Snow leopard / cold desert ecosystems",
      "Reported as a platform to conserve alpine fauna",
      "wetlands",
      "flora and cold desert ecosystems."
    ],
    "operating_districts": [
      "Ladakh"
    ],
    "headquarters": "Ladakh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "https://x.com/lg_ladakh/status/2067190538206695811",
    "verification_status": "Field verified",
    "mission_summary": "High-value partner; verify local contact before outreach.",
    "geographic_coverage": "Ladakh",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 79
    },
    "projects": [
      {
        "id": "proj-41",
        "slug": "project-shan-conservation-society-1",
        "title": "Climate adaptation; research; youth; conservation",
        "location_district": "Ladakh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Snow leopard / cold desert ecosystems",
        "problem_addressed": "High-value partner; verify local contact before outreach.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-054",
    "slug": "anjuman-salar-e-hawa",
    "name": "Anjuman Salar-e-Hawa",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Community welfare / environment potential",
      "Climate; DRR; community outreach"
    ],
    "operating_districts": [
      "Azad Kashmir"
    ],
    "headquarters": "Azad Kashmir",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Registered under Societies Act according to fundsforNGOs listing; verify environment relevance.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-42",
        "slug": "project-anjuman-salar-e-hawa-1",
        "title": "Climate adaptation; DRR; community outreach; education",
        "location_district": "Azad Kashmir",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community welfare / environment potential",
        "problem_addressed": "Registered under Societies Act according to fundsforNGOs listing; verify environment relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-057",
    "slug": "ajk-rural-support-programme-community-development-networks",
    "name": "AJK Rural Support Programme / community development networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Climate resilience / livelihoods",
      "Climate; DRR; community outreach"
    ],
    "operating_districts": [
      "AJK"
    ],
    "headquarters": "AJK",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Target for verification; may connect to livelihood and natural resource management.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 80
    },
    "projects": [
      {
        "id": "proj-43",
        "slug": "project-ajk-rural-support-programme-community-development-networks-1",
        "title": "Climate adaptation; DRR; community outreach; education",
        "location_district": "AJK",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate resilience / livelihoods",
        "problem_addressed": "Target for verification; may connect to livelihood and natural resource management.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-058",
    "slug": "environmental-protection-society-ajk",
    "name": "Environmental Protection Society AJK",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Environment protection",
      "Climate; DRR; community outreach"
    ],
    "operating_districts": [
      "AJK"
    ],
    "headquarters": "AJK",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Search target; verify active organization and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 6,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 71
    },
    "projects": [
      {
        "id": "proj-44",
        "slug": "project-environmental-protection-society-ajk-1",
        "title": "Climate adaptation; DRR; community outreach; education",
        "location_district": "AJK",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment protection",
        "problem_addressed": "Search target; verify active organization and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-059",
    "slug": "ajk-university-environmental-societies",
    "name": "AJK University / environmental societies",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Environmental education",
      "Climate; DRR; community outreach"
    ],
    "operating_districts": [
      "Muzaffarabad"
    ],
    "headquarters": "Muzaffarabad",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Potential student eco-clubs and academic outreach partners.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 8,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 80
    },
    "projects": [
      {
        "id": "proj-45",
        "slug": "project-ajk-university-environmental-societies-1",
        "title": "Climate adaptation; DRR; community outreach; education",
        "location_district": "Muzaffarabad",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental education",
        "problem_addressed": "Potential student eco-clubs and academic outreach partners.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-060",
    "slug": "green-kashmir-initiative-ajk",
    "name": "Green Kashmir Initiative AJK",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Environment Protection",
      "Requires verification"
    ],
    "operating_districts": [
      "Muzaffarabad"
    ],
    "headquarters": "Muzaffarabad",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 53
    },
    "projects": [
      {
        "id": "proj-46",
        "slug": "project-green-kashmir-initiative-ajk-1",
        "title": "Prospecting only",
        "location_district": "Muzaffarabad",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment Protection",
        "problem_addressed": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-061",
    "slug": "save-neelum-valley-environmental-volunteers",
    "name": "Save Neelum Valley Environmental Volunteers",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Waterways / tourism pressure",
      "Requires verification"
    ],
    "operating_districts": [
      "Neelum Valley"
    ],
    "headquarters": "Neelum Valley",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 58
    },
    "projects": [
      {
        "id": "proj-47",
        "slug": "project-save-neelum-valley-environmental-volunteers-1",
        "title": "Prospecting only",
        "location_district": "Neelum Valley",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Waterways / tourism pressure",
        "problem_addressed": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-062",
    "slug": "bagh-youth-climate-network",
    "name": "Bagh Youth Climate Network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Climate education",
      "Requires verification"
    ],
    "operating_districts": [
      "Bagh"
    ],
    "headquarters": "Bagh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 55
    },
    "projects": [
      {
        "id": "proj-48",
        "slug": "project-bagh-youth-climate-network-1",
        "title": "Prospecting only",
        "location_district": "Bagh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate education",
        "problem_addressed": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-063",
    "slug": "mirpur-lake-and-water-protection-volunteers",
    "name": "Mirpur Lake and Water Protection Volunteers",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Water quality",
      "Requires verification"
    ],
    "operating_districts": [
      "Mirpur"
    ],
    "headquarters": "Mirpur",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 55
    },
    "projects": [
      {
        "id": "proj-49",
        "slug": "project-mirpur-lake-and-water-protection-volunteers-1",
        "title": "Prospecting only",
        "location_district": "Mirpur",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Water quality",
        "problem_addressed": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-064",
    "slug": "rawalakot-clean-green-network",
    "name": "Rawalakot Clean & Green Network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Solid waste / urban greenery",
      "Requires verification"
    ],
    "operating_districts": [
      "Poonch",
      "Rawalakot"
    ],
    "headquarters": "Poonch",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 61
    },
    "projects": [
      {
        "id": "proj-50",
        "slug": "project-rawalakot-clean-green-network-1",
        "title": "Prospecting only",
        "location_district": "Poonch",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Solid waste / urban greenery",
        "problem_addressed": "Candidate stakeholder name pattern for manual verification; do not use as confirmed NGO until verified.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-065",
    "slug": "baltistan-wildlife-conservation-and-development-organization-bwcdo",
    "name": "Baltistan Wildlife Conservation and Development Organization",
    "acronym": "BWCDO",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Snow leopard / human-wildlife conflict",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Skardu",
      "Shigar",
      "Khaplu"
    ],
    "headquarters": "Skardu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Works in Baltistan since 1999; insurance scheme expanded to 17 villages and approx. 20,000 people; ~500,000 ha coverage in source.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 86
    },
    "projects": [
      {
        "id": "proj-51",
        "slug": "project-baltistan-wildlife-conservation-and-development-organization-bwcdo-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Skardu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Snow leopard / human-wildlife conflict",
        "problem_addressed": "Works in Baltistan since 1999; insurance scheme expanded to 17 villages and approx. 20,000 people; ~500,000 ha coverage in source.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-066",
    "slug": "ghulkin-nature-conservation-glad",
    "name": "Ghulkin Nature Conservation / GLAD",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Community-managed wildlife / hunting revenue",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Ghulkin",
      "Hunza"
    ],
    "headquarters": "Ghulkin",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Formed in 1993; conservation-linked revenue model; reinvestment in environment and community infrastructure reported.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 85
    },
    "projects": [
      {
        "id": "proj-52",
        "slug": "project-ghulkin-nature-conservation-glad-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Ghulkin",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community-managed wildlife / hunting revenue",
        "problem_addressed": "Formed in 1993; conservation-linked revenue model; reinvestment in environment and community infrastructure reported.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-067",
    "slug": "snow-leopard-foundation-pakistan",
    "name": "Snow Leopard Foundation Pakistan",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Snow leopard / ecosystems",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "National snow leopard conservation organization with GB relevance.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-53",
        "slug": "project-snow-leopard-foundation-pakistan-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Snow leopard / ecosystems",
        "problem_addressed": "National snow leopard conservation organization with GB relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-068",
    "slug": "world-wide-fund-for-nature-pakistan-gilgit-baltistan-work",
    "name": "World Wide Fund for Nature - Pakistan, Gilgit-Baltistan work",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Biodiversity / water / climate",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "National office with Himalayan/Karakoram conservation relevance.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-54",
        "slug": "project-world-wide-fund-for-nature-pakistan-gilgit-baltistan-work-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Biodiversity / water / climate",
        "problem_addressed": "National office with Himalayan/Karakoram conservation relevance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-069",
    "slug": "aga-khan-rural-support-programme-akrsp",
    "name": "Aga Khan Rural Support Programme",
    "acronym": "AKRSP",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Climate resilience / livelihoods / natural resources",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Chitral"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Major rural development institution in GB; relevant for adaptation, agriculture, livelihoods and community institutions.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 85
    },
    "projects": [
      {
        "id": "proj-55",
        "slug": "project-aga-khan-rural-support-programme-akrsp-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate resilience / livelihoods / natural resources",
        "problem_addressed": "Major rural development institution in GB; relevant for adaptation, agriculture, livelihoods and community institutions.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-070",
    "slug": "karakoram-area-development-organization-kado",
    "name": "Karakoram Area Development Organization",
    "acronym": "KADO",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Waste / livelihoods / disability / community",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Hunza",
      "Gilgit-Baltistan"
    ],
    "headquarters": "Hunza",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Community development in Hunza/GB; verify current environmental projects.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 83
    },
    "projects": [
      {
        "id": "proj-56",
        "slug": "project-karakoram-area-development-organization-kado-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Hunza",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Waste / livelihoods / disability / community",
        "problem_addressed": "Community development in Hunza/GB; verify current environmental projects.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-073",
    "slug": "progressive-climate-foundation-pcf-gilgit-baltistan",
    "name": "Progressive Climate Foundation  Gilgit-Baltistan",
    "acronym": "PCF",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Climate action / youth",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Field verified",
    "mission_summary": "Public social source describes youth-led climate movement committed to conservation and climate action.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-57",
        "slug": "project-progressive-climate-foundation-pcf-gilgit-baltistan-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate action / youth",
        "problem_addressed": "Public social source describes youth-led climate movement committed to conservation and climate action.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Field verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-074",
    "slug": "himalayan-wildlife-foundation-northern-pakistan-relevance",
    "name": "Himalayan Wildlife Foundation - northern Pakistan relevance",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Wildlife / protected areas",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "GB",
      "Pakistan"
    ],
    "headquarters": "GB",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "National conservation NGO; verify active GB projects.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 6,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 72
    },
    "projects": [
      {
        "id": "proj-58",
        "slug": "project-himalayan-wildlife-foundation-northern-pakistan-relevance-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "GB",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife / protected areas",
        "problem_addressed": "National conservation NGO; verify active GB projects.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-075",
    "slug": "hashoo-foundation-gb-communityclimate-resilience",
    "name": "Hashoo Foundation - GB community/climate resilience",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Livelihoods / resilience",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Community development foundation; verify environmental programs.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 76
    },
    "projects": [
      {
        "id": "proj-59",
        "slug": "project-hashoo-foundation-gb-communityclimate-resilience-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Livelihoods / resilience",
        "problem_addressed": "Community development foundation; verify environmental programs.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-076",
    "slug": "rupani-foundation-pakistan-gb-resilience-work",
    "name": "Rupani Foundation Pakistan - GB resilience work",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Community resilience / livelihoods",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Potential resilience and community development partner; verify environment fit.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 7,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 81
    },
    "projects": [
      {
        "id": "proj-60",
        "slug": "project-rupani-foundation-pakistan-gb-resilience-work-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community resilience / livelihoods",
        "problem_addressed": "Potential resilience and community development partner; verify environment fit.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-077",
    "slug": "aga-khan-foundation-pakistan",
    "name": "Aga Khan Foundation Pakistan",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Climate resilience / livelihoods",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Community verified",
    "mission_summary": "Potential climate and community development partner in mountain areas.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 73
    },
    "projects": [
      {
        "id": "proj-61",
        "slug": "project-aga-khan-foundation-pakistan-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate resilience / livelihoods",
        "problem_addressed": "Potential climate and community development partner in mountain areas.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Community verified",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-078",
    "slug": "serena-hotels-seed-style-environmental-programs-gb",
    "name": "Serena Hotels / SEED-style environmental programs GB",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Responsible tourism / waste",
      "High mountain ecology; community; livelihoods"
    ],
    "operating_districts": [
      "Gilgit-Baltistan",
      "Pakistan"
    ],
    "headquarters": "Gilgit-Baltistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential CSR and responsible tourism partner; verify local programs.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 8,
      "evidence_quality": 7,
      "community_benefit": 8,
      "continuity_of_work": 7,
      "transparency": 8,
      "alignment_with_kew": 8,
      "total_score": 77
    },
    "projects": [
      {
        "id": "proj-62",
        "slug": "project-serena-hotels-seed-style-environmental-programs-gb-1",
        "title": "Snow leopard; high mountain conservation; climate resilience; community conservation",
        "location_district": "Gilgit-Baltistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Responsible tourism / waste",
        "problem_addressed": "Potential CSR and responsible tourism partner; verify local programs.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-080",
    "slug": "iucn-pakistan",
    "name": "IUCN Pakistan",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Environment policy / biodiversity",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "Pakistan",
      "AJK",
      "GB relevance"
    ],
    "headquarters": "Pakistan",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "IUCN network relevant to AJK/GB conservation policy and institutions.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 94
    },
    "projects": [
      {
        "id": "proj-63",
        "slug": "project-iucn-pakistan-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "Pakistan",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environment policy / biodiversity",
        "problem_addressed": "IUCN network relevant to AJK/GB conservation policy and institutions.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-081",
    "slug": "iucn-india",
    "name": "IUCN India",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Biodiversity / nature-based solutions",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "India",
      "J&K",
      "Ladakh relevance"
    ],
    "headquarters": "India",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "IUCN network relevant for India-side Himalayan conservation.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 93
    },
    "projects": [
      {
        "id": "proj-64",
        "slug": "project-iucn-india-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "India",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Biodiversity / nature-based solutions",
        "problem_addressed": "IUCN network relevant for India-side Himalayan conservation.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-082",
    "slug": "wetlands-international-south-asia",
    "name": "Wetlands International South Asia",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Wetlands / waterbirds",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "South Asia",
      "Kashmir relevance"
    ],
    "headquarters": "South Asia",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "High-value technical partner for wetland inventories and Ramsar-style monitoring.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 94
    },
    "projects": [
      {
        "id": "proj-65",
        "slug": "project-wetlands-international-south-asia-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "South Asia",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wetlands / waterbirds",
        "problem_addressed": "High-value technical partner for wetland inventories and Ramsar-style monitoring.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-083",
    "slug": "the-climate-reality-project-india-south-asia",
    "name": "The Climate Reality Project India & South Asia",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Climate awareness / leadership",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "India",
      "South Asia"
    ],
    "headquarters": "India",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Climate advocacy and education network; useful for campaigns and training.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 91
    },
    "projects": [
      {
        "id": "proj-66",
        "slug": "project-the-climate-reality-project-india-south-asia-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "India",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Climate awareness / leadership",
        "problem_addressed": "Climate advocacy and education network; useful for campaigns and training.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-084",
    "slug": "birdlife-international-partner-networks",
    "name": "BirdLife International partner networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Birds / IBAs / wetlands",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "South Asia"
    ],
    "headquarters": "South Asia",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Relevant for bird and wetland monitoring collaborations.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 91
    },
    "projects": [
      {
        "id": "proj-67",
        "slug": "project-birdlife-international-partner-networks-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "South Asia",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Birds / IBAs / wetlands",
        "problem_addressed": "Relevant for bird and wetland monitoring collaborations.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-085",
    "slug": "wildlife-conservation-society-wcs",
    "name": "Wildlife Conservation Society",
    "acronym": "WCS",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Wildlife / landscape conservation",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "South",
      "Central Asia relevance"
    ],
    "headquarters": "South",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Potential high mountain wildlife research and conservation partner.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 87
    },
    "projects": [
      {
        "id": "proj-68",
        "slug": "project-wildlife-conservation-society-wcs-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "South",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife / landscape conservation",
        "problem_addressed": "Potential high mountain wildlife research and conservation partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-086",
    "slug": "snow-leopard-trust",
    "name": "Snow Leopard Trust",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Snow leopard / community conservation",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "High Asia",
      "snow leopard range"
    ],
    "headquarters": "High Asia",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Global snow leopard conservation partner relevant to Ladakh and GB.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 8,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 88
    },
    "projects": [
      {
        "id": "proj-69",
        "slug": "project-snow-leopard-trust-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "High Asia",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Snow leopard / community conservation",
        "problem_addressed": "Global snow leopard conservation partner relevant to Ladakh and GB.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-087",
    "slug": "undp-equator-initiative",
    "name": "UNDP Equator Initiative",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Community conservation / indigenous solutions",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "Global",
      "GB case source"
    ],
    "headquarters": "Global",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Source for BWCDO case and community conservation models.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 10,
      "evidence_quality": 8,
      "community_benefit": 10,
      "continuity_of_work": 9,
      "transparency": 10,
      "alignment_with_kew": 10,
      "total_score": 92
    },
    "projects": [
      {
        "id": "proj-70",
        "slug": "project-undp-equator-initiative-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "Global",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community conservation / indigenous solutions",
        "problem_addressed": "Source for BWCDO case and community conservation models.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-088",
    "slug": "fao-mountain-partnership",
    "name": "FAO Mountain Partnership",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Mountains / sustainable development",
      "Technical support; policy; research; partnerships"
    ],
    "operating_districts": [
      "Global",
      "Ladakh profile source"
    ],
    "headquarters": "Global",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Expert reviewed",
    "mission_summary": "Source for LEDeG profile and mountain partnership network.",
    "geographic_coverage": "Regional / International",
    "partner_organizations": [],
    "funding_transparency": "High",
    "impact_score": {
      "ecological_relevance": 9,
      "evidence_quality": 8,
      "community_benefit": 9,
      "continuity_of_work": 9,
      "transparency": 9,
      "alignment_with_kew": 9,
      "total_score": 90
    },
    "projects": [
      {
        "id": "proj-71",
        "slug": "project-fao-mountain-partnership-1",
        "title": "Technical partnership; methods; standards; grant networks",
        "location_district": "Global",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Mountains / sustainable development",
        "problem_addressed": "Source for LEDeG profile and mountain partnership network.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "High",
        "verification_status": "Expert reviewed",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-089",
    "slug": "adventure-tour-operators-association-of-kashmir-environment-wingprospects",
    "name": "Adventure Tour Operators Association of Kashmir - environment wing/prospects",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Sustainable tourism / waste",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Tourism operators can be linked to waste, trekking route conservation and ecological compliance.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 57
    },
    "projects": [
      {
        "id": "proj-72",
        "slug": "project-adventure-tour-operators-association-of-kashmir-environment-wingprospects-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Sustainable tourism / waste",
        "problem_addressed": "Tourism operators can be linked to waste, trekking route conservation and ecological compliance.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-090",
    "slug": "travel-agents-association-of-kashmir-sustainability-prospect",
    "name": "Travel Agents Association of Kashmir - sustainability prospect",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Sustainable tourism",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential outreach partner for tourism pressure, vehicle emissions and lake/wetland responsibility.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 52
    },
    "projects": [
      {
        "id": "proj-73",
        "slug": "project-travel-agents-association-of-kashmir-sustainability-prospect-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Sustainable tourism",
        "problem_addressed": "Potential outreach partner for tourism pressure, vehicle emissions and lake/wetland responsibility.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-091",
    "slug": "houseboat-owners-association-dalnigeen-impact-stakeholder",
    "name": "Houseboat Owners Association - Dal/Nigeen impact stakeholder",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Lake ecology / sewage / waste",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Critical stakeholder in lake conservation; not NGO but important impact actor.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 64
    },
    "projects": [
      {
        "id": "proj-74",
        "slug": "project-houseboat-owners-association-dalnigeen-impact-stakeholder-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Lake ecology / sewage / waste",
        "problem_addressed": "Critical stakeholder in lake conservation; not NGO but important impact actor.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-092",
    "slug": "shikara-association-dal-lake-water-transport-stakeholder",
    "name": "Shikara Association / Dal Lake water transport stakeholder",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Lake ecology / water transport",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Important stakeholder for waterway discipline, public education and waste management.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 62
    },
    "projects": [
      {
        "id": "proj-75",
        "slug": "project-shikara-association-dal-lake-water-transport-stakeholder-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Lake ecology / water transport",
        "problem_addressed": "Important stakeholder for waterway discipline, public education and waste management.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-093",
    "slug": "municipal-waste-volunteer-groups-srinagar",
    "name": "Municipal waste volunteer groups Srinagar",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Solid waste / plastic",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Search target for KEW waste campaign coalition.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-76",
        "slug": "project-municipal-waste-volunteer-groups-srinagar-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Solid waste / plastic",
        "problem_addressed": "Search target for KEW waste campaign coalition.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-095",
    "slug": "university-of-kashmir-environmental-science-alumni-network",
    "name": "University of Kashmir Environmental Science Alumni Network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Research / policy support",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential to build student-researcher advocacy pipeline.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 56
    },
    "projects": [
      {
        "id": "proj-77",
        "slug": "project-university-of-kashmir-environmental-science-alumni-network-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Research / policy support",
        "problem_addressed": "Potential to build student-researcher advocacy pipeline.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-096",
    "slug": "cluster-university-srinagar-environmental-sciences-student-groups",
    "name": "Cluster University Srinagar Environmental Sciences student groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Environmental education / field action",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential district-level public science/outreach partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 53
    },
    "projects": [
      {
        "id": "proj-78",
        "slug": "project-cluster-university-srinagar-environmental-sciences-student-groups-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental education / field action",
        "problem_addressed": "Potential district-level public science/outreach partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-097",
    "slug": "central-university-of-kashmir-environmentalclimate-groups",
    "name": "Central University of Kashmir environmental/climate groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Environmental education / research",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Ganderbal"
    ],
    "headquarters": "Ganderbal",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential research and policy partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 52
    },
    "projects": [
      {
        "id": "proj-79",
        "slug": "project-central-university-of-kashmir-environmentalclimate-groups-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Ganderbal",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental education / research",
        "problem_addressed": "Potential research and policy partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-098",
    "slug": "skuast-k-environmentalagroecology-extension-networks",
    "name": "SKUAST-K environmental/agroecology extension networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Agroecology / water / climate",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Kashmir Valley"
    ],
    "headquarters": "Kashmir Valley",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Agriculture-climate-water interface partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 61
    },
    "projects": [
      {
        "id": "proj-80",
        "slug": "project-skuast-k-environmentalagroecology-extension-networks-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Kashmir Valley",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Agroecology / water / climate",
        "problem_addressed": "Agriculture-climate-water interface partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-099",
    "slug": "university-of-jammu-environmental-studentfaculty-networks",
    "name": "University of Jammu environmental student/faculty networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Environmental education / research",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Jammu"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential Jammu division partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 61
    },
    "projects": [
      {
        "id": "proj-81",
        "slug": "project-university-of-jammu-environmental-studentfaculty-networks-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental education / research",
        "problem_addressed": "Potential Jammu division partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-100",
    "slug": "central-university-of-jammu-environmental-science-networks",
    "name": "Central University of Jammu environmental science networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Environmental education / research",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Jammu",
      "Samba"
    ],
    "headquarters": "Jammu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential southern Jammu partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 53
    },
    "projects": [
      {
        "id": "proj-82",
        "slug": "project-central-university-of-jammu-environmental-science-networks-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Jammu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Environmental education / research",
        "problem_addressed": "Potential southern Jammu partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-101",
    "slug": "bhaderwah-campus-chenab-valley-ecological-groups",
    "name": "Bhaderwah Campus / Chenab valley ecological groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Forests / biodiversity / springs",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Doda",
      "Bhaderwah"
    ],
    "headquarters": "Doda",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Potential Chenab valley biodiversity and watershed partner.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-83",
        "slug": "project-bhaderwah-campus-chenab-valley-ecological-groups-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Doda",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / biodiversity / springs",
        "problem_addressed": "Potential Chenab valley biodiversity and watershed partner.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-102",
    "slug": "kishtwar-high-altitude-conservation-volunteers",
    "name": "Kishtwar High Altitude conservation volunteers",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Forests / wildlife / hydropower impacts",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Kishtwar"
    ],
    "headquarters": "Kishtwar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Search target for Chenab/Kishtwar environmental monitoring.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 63
    },
    "projects": [
      {
        "id": "proj-84",
        "slug": "project-kishtwar-high-altitude-conservation-volunteers-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Kishtwar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / wildlife / hydropower impacts",
        "problem_addressed": "Search target for Chenab/Kishtwar environmental monitoring.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-103",
    "slug": "poonch-rajouri-biodiversity-volunteer-networks",
    "name": "Poonch-Rajouri biodiversity volunteer networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Forests / wildlife corridors",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Poonch",
      "Rajouri"
    ],
    "headquarters": "Poonch",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Search target for Pir Panjal conservation mapping.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-85",
        "slug": "project-poonch-rajouri-biodiversity-volunteer-networks-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Poonch",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / wildlife corridors",
        "problem_addressed": "Search target for Pir Panjal conservation mapping.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-104",
    "slug": "wular-lake-community-conservation-stakeholders",
    "name": "Wular Lake community conservation stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Wetlands / fisheries / water quality",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Bandipora"
    ],
    "headquarters": "Bandipora",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Impact stakeholder cluster for Wular monitoring; verify active NGOs.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 51
    },
    "projects": [
      {
        "id": "proj-86",
        "slug": "project-wular-lake-community-conservation-stakeholders-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Bandipora",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wetlands / fisheries / water quality",
        "problem_addressed": "Impact stakeholder cluster for Wular monitoring; verify active NGOs.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-105",
    "slug": "hokersar-wetland-local-conservation-volunteers",
    "name": "Hokersar wetland local conservation volunteers",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Wetlands / birds / encroachment",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Srinagar",
      "Budgam"
    ],
    "headquarters": "Srinagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Impact stakeholder cluster for wetland citizen science.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 54
    },
    "projects": [
      {
        "id": "proj-87",
        "slug": "project-hokersar-wetland-local-conservation-volunteers-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Srinagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wetlands / birds / encroachment",
        "problem_addressed": "Impact stakeholder cluster for wetland citizen science.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-107",
    "slug": "vishaw-river-kulgam-environmental-groups",
    "name": "Vishaw River / Kulgam environmental groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Rivers / waste / mining",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Kulgam"
    ],
    "headquarters": "Kulgam",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Search target for river monitoring and solid waste action.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 63
    },
    "projects": [
      {
        "id": "proj-88",
        "slug": "project-vishaw-river-kulgam-environmental-groups-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Kulgam",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Rivers / waste / mining",
        "problem_addressed": "Search target for river monitoring and solid waste action.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-109",
    "slug": "sindh-nallah-conservation-stakeholders",
    "name": "Sindh Nallah conservation stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Rivers / tourism / waste",
      "Stakeholder mapping / outreach"
    ],
    "operating_districts": [
      "Ganderbal"
    ],
    "headquarters": "Ganderbal",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Impact stakeholder cluster for river and waste monitoring.",
    "geographic_coverage": "Jammu & Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 63
    },
    "projects": [
      {
        "id": "proj-89",
        "slug": "project-sindh-nallah-conservation-stakeholders-1",
        "title": "Network expansion; community intelligence; public campaigns",
        "location_district": "Ganderbal",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Rivers / tourism / waste",
        "problem_addressed": "Impact stakeholder cluster for river and waste monitoring.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-110",
    "slug": "hushe-valley-conservation-committees",
    "name": "Hushe Valley conservation committees",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Community conservation / tourism",
      "Requires field verification"
    ],
    "operating_districts": [
      "Ghanche",
      "Skardu"
    ],
    "headquarters": "Ghanche",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 51
    },
    "projects": [
      {
        "id": "proj-90",
        "slug": "project-hushe-valley-conservation-committees-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Ghanche",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community conservation / tourism",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-111",
    "slug": "khunjerab-village-organizations-conservation-network",
    "name": "Khunjerab Village Organizations conservation network",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Community-managed protected areas",
      "Requires field verification"
    ],
    "operating_districts": [
      "Hunza"
    ],
    "headquarters": "Hunza",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-91",
        "slug": "project-khunjerab-village-organizations-conservation-network-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Hunza",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Community-managed protected areas",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-112",
    "slug": "shimshal-nature-trust-community-conservation-prospect",
    "name": "Shimshal Nature Trust / community conservation prospect",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Wildlife / pasture management",
      "Requires field verification"
    ],
    "operating_districts": [
      "Hunza"
    ],
    "headquarters": "Hunza",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 57
    },
    "projects": [
      {
        "id": "proj-92",
        "slug": "project-shimshal-nature-trust-community-conservation-prospect-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Hunza",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife / pasture management",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-113",
    "slug": "hoper-valley-conservation-stakeholders",
    "name": "Hoper Valley conservation stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Glacier/tourism/community conservation",
      "Requires field verification"
    ],
    "operating_districts": [
      "Nagar"
    ],
    "headquarters": "Nagar",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 62
    },
    "projects": [
      {
        "id": "proj-93",
        "slug": "project-hoper-valley-conservation-stakeholders-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Nagar",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Glacier/tourism/community conservation",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-114",
    "slug": "deosai-conservation-stakeholders",
    "name": "Deosai conservation stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Protected area / brown bear",
      "Requires field verification"
    ],
    "operating_districts": [
      "Skardu",
      "Astore"
    ],
    "headquarters": "Skardu",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 55
    },
    "projects": [
      {
        "id": "proj-94",
        "slug": "project-deosai-conservation-stakeholders-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Skardu",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Protected area / brown bear",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-115",
    "slug": "astore-markhor-conservation-community-groups",
    "name": "Astore Markhor conservation community groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Wildlife / trophy hunting governance",
      "Requires field verification"
    ],
    "operating_districts": [
      "Astore"
    ],
    "headquarters": "Astore",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 64
    },
    "projects": [
      {
        "id": "proj-95",
        "slug": "project-astore-markhor-conservation-community-groups-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Astore",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Wildlife / trophy hunting governance",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-116",
    "slug": "ghizer-climate-adaptation-community-organizations",
    "name": "Ghizer climate adaptation community organizations",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Water / agriculture / climate",
      "Requires field verification"
    ],
    "operating_districts": [
      "Ghizer"
    ],
    "headquarters": "Ghizer",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 51
    },
    "projects": [
      {
        "id": "proj-96",
        "slug": "project-ghizer-climate-adaptation-community-organizations-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Ghizer",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Water / agriculture / climate",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-117",
    "slug": "diamer-forest-and-watershed-community-groups",
    "name": "Diamer forest and watershed community groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Forests / watershed",
      "Requires field verification"
    ],
    "operating_districts": [
      "Diamer"
    ],
    "headquarters": "Diamer",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Gilgit-Baltistan",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 52
    },
    "projects": [
      {
        "id": "proj-97",
        "slug": "project-diamer-forest-and-watershed-community-groups-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Diamer",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / watershed",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-118",
    "slug": "neelum-valley-forest-protection-stakeholders",
    "name": "Neelum Valley forest protection stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "Forests / rivers / tourism pressure",
      "Requires field verification"
    ],
    "operating_districts": [
      "Neelum Valley"
    ],
    "headquarters": "Neelum Valley",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 64
    },
    "projects": [
      {
        "id": "proj-98",
        "slug": "project-neelum-valley-forest-protection-stakeholders-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Neelum Valley",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / rivers / tourism pressure",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-119",
    "slug": "leepa-valley-environment-and-tourism-stakeholders",
    "name": "Leepa Valley environment and tourism stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2022,
    "focus_areas": [
      "Forests / solid waste",
      "Requires field verification"
    ],
    "operating_districts": [
      "Hattian Bala"
    ],
    "headquarters": "Hattian Bala",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 6,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 60
    },
    "projects": [
      {
        "id": "proj-99",
        "slug": "project-leepa-valley-environment-and-tourism-stakeholders-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Hattian Bala",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Forests / solid waste",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-120",
    "slug": "manglamirpur-water-quality-stakeholders",
    "name": "Mangla/Mirpur water quality stakeholders",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2018,
    "focus_areas": [
      "Water quality / reservoir ecology",
      "Requires field verification"
    ],
    "operating_districts": [
      "Mirpur"
    ],
    "headquarters": "Mirpur",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 54
    },
    "projects": [
      {
        "id": "proj-100",
        "slug": "project-manglamirpur-water-quality-stakeholders-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Mirpur",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Water quality / reservoir ecology",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-121",
    "slug": "rawalakot-poonch-climate-and-solid-waste-groups",
    "name": "Rawalakot Poonch climate and solid waste groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2019,
    "focus_areas": [
      "Urban ecology / waste",
      "Requires field verification"
    ],
    "operating_districts": [
      "Rawalakot",
      "Poonch"
    ],
    "headquarters": "Rawalakot",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 53
    },
    "projects": [
      {
        "id": "proj-101",
        "slug": "project-rawalakot-poonch-climate-and-solid-waste-groups-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Rawalakot",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Urban ecology / waste",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-122",
    "slug": "kotli-watershed-and-forest-protection-groups",
    "name": "Kotli watershed and forest protection groups",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2020,
    "focus_areas": [
      "Watershed / forest",
      "Requires field verification"
    ],
    "operating_districts": [
      "Kotli"
    ],
    "headquarters": "Kotli",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 6,
      "evidence_quality": 5,
      "community_benefit": 6,
      "continuity_of_work": 5,
      "transparency": 6,
      "alignment_with_kew": 6,
      "total_score": 51
    },
    "projects": [
      {
        "id": "proj-102",
        "slug": "project-kotli-watershed-and-forest-protection-groups-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Kotli",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "Watershed / forest",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  },
  {
    "id": "KMR-123",
    "slug": "bagh-landslide-and-drr-community-networks",
    "name": "Bagh landslide and DRR community networks",
    "logo_url": "/images/ngo-module/default-ngo.png",
    "founded_year": 2021,
    "focus_areas": [
      "DRR / slope stability",
      "Requires field verification"
    ],
    "operating_districts": [
      "Bagh"
    ],
    "headquarters": "Bagh",
    "registration_status": "Society",
    "contact_email": "",
    "website": "",
    "verification_status": "Self-reported",
    "mission_summary": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
    "geographic_coverage": "Azad Kashmir",
    "partner_organizations": [],
    "funding_transparency": "Partial",
    "impact_score": {
      "ecological_relevance": 7,
      "evidence_quality": 6,
      "community_benefit": 7,
      "continuity_of_work": 6,
      "transparency": 7,
      "alignment_with_kew": 7,
      "total_score": 61
    },
    "projects": [
      {
        "id": "proj-103",
        "slug": "project-bagh-landslide-and-drr-community-networks-1",
        "title": "Community intelligence; field network; risk mapping",
        "location_district": "Bagh",
        "start_date": "2020-01-01",
        "end_date": "Ongoing",
        "environmental_category": "DRR / slope stability",
        "problem_addressed": "Candidate community stakeholder cluster for KEW regional mapping; verify legal status and contacts.",
        "activities_completed": [
          "Initial assessment",
          "Community mobilization"
        ],
        "measurable_outputs": "Ongoing tracking",
        "ecological_outcome": "Positive impact projected",
        "community_outcome": "Increased awareness",
        "evidence_quality": "Medium",
        "verification_status": "Self-reported",
        "linked_entities": []
      }
    ]
  }
];
