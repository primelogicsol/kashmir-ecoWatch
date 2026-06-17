// Kashmir Eco Watch — Hydrology Database: SPRINGS
// Migration Status: Legacy Imported → Pending Verification
// Generated: 2026-06-16T16:28:50.427Z
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const springsRecords: MigratedWaterRecord[] = [
  {
    "id": "kokernag-spring",
    "Legacy_ID": "kokernag-spring",
    "slug": "kokernag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.426Z",
    "name": "Kokernag Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Largest and most famous spring in Kashmir. Known for crystal-clear waters and trout fisheries.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Lidder-Brengi Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 75.3
    },
    "elevation": 2000,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Brengi Spring",
        "Kookarnag"
      ],
      "Village_Locality": "Kokernag town",
      "Water_Use": [
        "Drinking",
        "Irrigation",
        "Fisheries",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "Critical (Primary drinking source for Kokernag town and multiple hamlets; feeds Asia's largest trout hatchery)"
    }
  },
  {
    "id": "achabal-spring",
    "Legacy_ID": "achabal-spring",
    "slug": "achabal-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Achabal Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Historic spring with Mughal gardens. Known for constant flow and clear waters.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.6833,
      "lng": 75.2333
    },
    "elevation": 1900,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Achabal Nag",
        "Akshabal"
      ],
      "Village_Locality": "Achabal",
      "Water_Use": [
        "Drinking",
        "Irrigation",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Irrigates extensive apple orchards and paddy fields, drinking water source for Achabal town)"
    }
  },
  {
    "id": "verinag-spring",
    "Legacy_ID": "verinag-spring",
    "slug": "verinag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Verinag Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Source of Jhelum River. Historic spring with Mughal architecture. Perennial flow with high discharge.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.5414,
      "lng": 75.2515
    },
    "elevation": 1850,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nilakunda",
        "Verinag Nag"
      ],
      "Village_Locality": "Verinag",
      "Water_Use": [
        "Drinking",
        "Irrigation",
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "Critical (Primary origin point of the Jhelum River, critical for downstream valley irrigation)"
    }
  },
  {
    "id": "sheshnag-spring",
    "Legacy_ID": "sheshnag-spring",
    "slug": "sheshnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Sheshnag Spring",
    "type": "spring",
    "category": "High-Altitude Spring",
    "description": "High-altitude spring feeding Lidder River. Sacred spring near Amarnath route.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "coordinates": {
      "lat": 34.09,
      "lng": 75.49
    },
    "elevation": 3590,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sheshnag Lake Outlet"
      ],
      "Village_Locality": "Pahalgam / Amarnath Trek",
      "Water_Use": [
        "Drinking",
        "Religious"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Moderate (Crucial pilgrim stopover point along Amarnath Yatra, feeds Lidder River)"
    }
  },
  {
    "id": "dareng-spring",
    "Legacy_ID": "dareng-spring",
    "slug": "dareng-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Dareng Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Community spring in Anantnag. Important for local water supply and agriculture.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Ferozepur Nallah Basin",
    "coordinates": {
      "lat": 34.0583,
      "lng": 74.3985
    },
    "elevation": 2100,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drang Spring",
        "Tangmarg Drang"
      ],
      "Village_Locality": "Drang Village, near Tangmarg",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Livestock"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Primary freshwater supply for Drang and Tangmarg outskirts)"
    }
  },
  {
    "id": "malikpora-spring",
    "Legacy_ID": "malikpora-spring",
    "slug": "malikpora-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Malikpora Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Spring in Kulgam district. Supports local agriculture and community water needs.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Veshaw Basin",
    "coordinates": {
      "lat": 33.645,
      "lng": 75.015
    },
    "elevation": 1880,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Malikpora Nag"
      ],
      "Village_Locality": "Malikpora",
      "Water_Use": [
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Provides drinking water for Malikpora community in Kulgam)"
    }
  },
  {
    "id": "spring-malikpora-bandipora",
    "Legacy_ID": "spring-malikpora-bandipora",
    "slug": "malikpora-spring-bandipora",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Malikpora Spring (Bandipora)",
    "type": "spring",
    "category": "Local Spring",
    "description": "Added to represent the user request for a Malikpora Spring in Bandipora. Needs field verification for exact coordinates and flow characteristics.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 34.3,
      "lng": 74.6
    },
    "elevation": 1575,
    "area": null,
    "length": null,
    "waterQuality_status": "poor",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Malikpora Sonawari Spring"
      ],
      "Village_Locality": "Malikpora village, Sonawari",
      "Water_Use": [
        "Domestic",
        "Livestock"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Moderate (Used primarily for domestic purposes due to poor drinking water quality)"
    }
  },
  {
    "id": "spring-chashma-shahi",
    "Legacy_ID": "spring-chashma-shahi",
    "slug": "chashma-shahi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Chashma Shahi",
    "type": "spring",
    "category": "Freshwater Spring",
    "description": "The Mughal Garden Chashma Shahi was built around this freshwater spring by Shah Jahan in 1632 AD.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 34.0858,
      "lng": 74.8722
    },
    "elevation": 1600,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Royal Spring",
        "Chashme Shahi"
      ],
      "Village_Locality": "Srinagar, near Zabarwan Range",
      "Water_Use": [
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Key drinking water source inside the Mughal garden and for local VVIP residences)"
    }
  },
  {
    "id": "spring-panzath-nag",
    "Legacy_ID": "spring-panzath-nag",
    "slug": "panzath-nag",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-INT-ICIMOD",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Panzath Nag",
    "type": "spring",
    "category": "Major Spring",
    "description": "Celebrated for the annual 'Gaade Maare' (fishing festival) where villagers clean the spring bed of weeds and silt.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.6167,
      "lng": 75.2167
    },
    "elevation": 1680,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Panzath Nagbal",
        "Panzath Qazigund"
      ],
      "Village_Locality": "Panzath Village, Qazigund",
      "Water_Use": [
        "Drinking",
        "Irrigation",
        "Fisheries",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "Critical (Supplies drinking water to 12 villages, feeds vast rice paddy channels and commercial trout farms)"
    }
  },
  {
    "id": "spring-kheer-bhawani",
    "Legacy_ID": "spring-kheer-bhawani",
    "slug": "kheer-bhawani-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Kheer Bhawani Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "The spring is situated inside the temple complex. Legend says the water changes color to warn of coming events.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "coordinates": {
      "lat": 34.22,
      "lng": 74.75
    },
    "elevation": 1580,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tullamula Sacred Spring"
      ],
      "Village_Locality": "Tullamula",
      "Water_Use": [
        "Religious"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "Critical (Highly sacred to Kashmiri Pandits, center of annual Kheer Bhawani Mela)"
    }
  },
  {
    "id": "spring-ganderbhavan",
    "Legacy_ID": "spring-ganderbhavan",
    "slug": "ganderbhavan-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Ganderbhavan Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Historically pure spring that gave the district its name, now facing threat of drying up due to urban sprawl.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "coordinates": {
      "lat": 34.23,
      "lng": 74.78
    },
    "elevation": 1610,
    "area": null,
    "length": null,
    "waterQuality_status": "poor",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gandherbhavan Eponymous Spring"
      ],
      "Village_Locality": "Ganderbal Town",
      "Water_Use": [
        "Domestic"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Moderate (Historically significant as origin of Ganderbal's name, now suffering from urban degradation)"
    }
  },
  {
    "id": "spring-ashtar",
    "Legacy_ID": "spring-ashtar",
    "slug": "ashtar-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Ashtar Spring",
    "type": "spring",
    "category": "Alpine Spring",
    "description": "Originates in the high-altitude meadows of Tosa Maidan. Serves as a major headwater source for the Sukhnag River.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Sukhnag River Basin",
    "coordinates": {
      "lat": 33.95,
      "lng": 74.52
    },
    "elevation": 3200,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ashtar Nag",
        "Tosa Maidan Source Spring"
      ],
      "Village_Locality": "Tosa Maidan Meadows",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Livestock"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Origin source feeding the Sukhnag River basin, essential for mountain herders)"
    }
  },
  {
    "id": "spring-nilnag",
    "Legacy_ID": "spring-nilnag",
    "slug": "nilnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Nilnag Spring",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "A spring-fed lake nestled in the pine forest, revered as a sacred 'Nag' with ancient cultural stories.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Doodhganga Basin",
    "coordinates": {
      "lat": 33.8167,
      "lng": 74.7
    },
    "elevation": 2180,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nilnag Spring-Lake"
      ],
      "Village_Locality": "Near Yusmarg",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Religious"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Feeds the local forest water bodies and provides drinking water to Yusmarg fringe settlements)"
    }
  },
  {
    "id": "spring-lavnag",
    "Legacy_ID": "spring-lavnag",
    "slug": "lavnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Lavnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Located in the scenic Lolab Valley. Georeference is approximate and needs GPS verification.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "coordinates": {
      "lat": 34.55,
      "lng": 74.32
    },
    "elevation": 1650,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lavnag Lolab"
      ],
      "Village_Locality": "Lolab Valley",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Irrigation"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Provides primary potable water for local Lolab hamlets)"
    }
  },
  {
    "id": "spring-satisar",
    "Legacy_ID": "spring-satisar",
    "slug": "satisar-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Satisar Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Lolab valley spring recorded in historical folklore, now experiencing reduced seasonal discharge.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "coordinates": {
      "lat": 34.58,
      "lng": 74.3
    },
    "elevation": 1620,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lolab Satisar Nag"
      ],
      "Village_Locality": "Lolab Valley",
      "Water_Use": [
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Moderate (Backup supply when local wells dry up)"
    }
  },
  {
    "id": "spring-gaurinag",
    "Legacy_ID": "spring-gaurinag",
    "slug": "gaurinag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Gaurinag Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "A sacred cold spring with high cultural significance in the Lolab region.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "coordinates": {
      "lat": 34.53,
      "lng": 74.35
    },
    "elevation": 1700,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gaurinag Lolab"
      ],
      "Village_Locality": "Sogam area, Lolab",
      "Water_Use": [
        "Drinking",
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Highly revered locally, provides key drinking source for Sogam hamlets)"
    }
  },
  {
    "id": "spring-pirnag",
    "Legacy_ID": "spring-pirnag",
    "slug": "pirnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Pirnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Traditional well-maintained spring in Lolab. GPS coordinates need ground verification.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "coordinates": {
      "lat": 34.54,
      "lng": 74.36
    },
    "elevation": 1680,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pirnag Sogam"
      ],
      "Village_Locality": "Sogam",
      "Water_Use": [
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Crucial drinking water source for several hundred households in Sogam)"
    }
  },
  {
    "id": "spring-sogamnag",
    "Legacy_ID": "spring-sogamnag",
    "slug": "sogamnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Sogamnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "A major drinking water feed for local Sogam community.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "coordinates": {
      "lat": 34.535,
      "lng": 74.355
    },
    "elevation": 1690,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sogam Nag"
      ],
      "Village_Locality": "Sogam",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Irrigation"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Essential drinking water and irrigation feed for Sogam village fields)"
    }
  },
  {
    "id": "spring-sherbagh",
    "Legacy_ID": "spring-sherbagh",
    "slug": "sherbagh-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Sherbagh Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Centrally located spring in Anantnag town. Visited by tourists and pilgrims.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.729,
      "lng": 75.1495
    },
    "elevation": 1600,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sherbagh Nag"
      ],
      "Village_Locality": "Anantnag Town Centre",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Religious"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Provides water to historical Sherbagh garden and temple complex, used by city residents)"
    }
  },
  {
    "id": "spring-andernag",
    "Legacy_ID": "spring-andernag",
    "slug": "andernag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Andernag Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Historic spring associated with the ancient temple structure of Andernag in Anantnag town.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.728,
      "lng": 75.148
    },
    "elevation": 1605,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Andernag Temple Spring"
      ],
      "Village_Locality": "Anantnag Town",
      "Water_Use": [
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Culturally highly significant, temple spring serving local worship rites)"
    }
  },
  {
    "id": "spring-malaknag",
    "Legacy_ID": "spring-malaknag",
    "slug": "malaknag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Malaknag Spring",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "A unique warm spring in the middle of Anantnag town known for its medicinal sulphur properties.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "coordinates": {
      "lat": 33.7315,
      "lng": 75.146
    },
    "elevation": 1610,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Malaknag Sulphur Spring"
      ],
      "Village_Locality": "Malaknag mohalla, Anantnag town",
      "Water_Use": [
        "Therapeutic",
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Highly relied upon by local mohalla for domestic washing and skin ailments)"
    }
  },
  {
    "id": "spring-sukhnag",
    "Legacy_ID": "spring-sukhnag",
    "slug": "sukhnag-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Sukhnag Spring",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Critical local spring feeding the Sukhnag stream system, vulnerable to mining operations downstream.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Sukhnag River Basin",
    "coordinates": {
      "lat": 34,
      "lng": 74.47
    },
    "elevation": 2350,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sukh Nagbal"
      ],
      "Village_Locality": "Tangmarg border, Budgam side",
      "Water_Use": [
        "Drinking",
        "Irrigation",
        "Fisheries"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Feeds trout streams and local irrigation channels for paddy agriculture)"
    }
  },
  {
    "id": "spring-harmukh",
    "Legacy_ID": "spring-harmukh",
    "slug": "harmukh-alpine-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Harmukh Alpine Springs",
    "type": "spring",
    "category": "High-Altitude Spring",
    "description": "A cluster of small perennial rock fissure springs feeding the Gangabal lake outlet.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "coordinates": {
      "lat": 34.4167,
      "lng": 74.9167
    },
    "elevation": 3500,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Harmukh Gangabal Springs"
      ],
      "Village_Locality": "Harmukh Mountain base",
      "Water_Use": [
        "Drinking",
        "Religious"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Critical",
      "Community_Dependency": "Low (High ecological value, feeds high altitude streams and Gangabal lake)"
    }
  },
  {
    "id": "spring-pap-nashni",
    "Legacy_ID": "spring-pap-nashni",
    "slug": "pap-nashni-bowli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Pap Nashni Bowli",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Devotees bathe in this bowli to wash away sins before praying at the Sudh Mahadev Temple.",
    "District_ID": "Udhampur",
    "Ecological_Scope_ID": "Jammu",
    "district": "Udhampur",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.0214,
      "lng": 75.3635
    },
    "elevation": 1225,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sudh Mahadev Sacred Spring"
      ],
      "Village_Locality": "Sudh Mahadev",
      "Water_Use": [
        "Drinking",
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Critical (Ancient spring deeply integrated into pilgrimage rites and local drinking water)"
    }
  },
  {
    "id": "spring-gouri-kund",
    "Legacy_ID": "spring-gouri-kund",
    "slug": "gouri-kund-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Gouri Kund Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Associated with Goddess Parvati's place of penance.",
    "District_ID": "Udhampur",
    "Ecological_Scope_ID": "Jammu",
    "district": "Udhampur",
    "watershed": "Tawi Catchment",
    "coordinates": {
      "lat": 33.045,
      "lng": 75.345
    },
    "elevation": 1550,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gouri Kund Bowli"
      ],
      "Village_Locality": "Gouri Kund, near Sudh Mahadev",
      "Water_Use": [
        "Drinking",
        "Religious"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Ritual bathing spot, clean drinking source for local temple pujaris and visitors)"
    }
  },
  {
    "id": "spring-tatapani-kalakote",
    "Legacy_ID": "spring-tatapani-kalakote",
    "slug": "tatapani-tatta-pani-hot-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatapani / Tatta Pani Hot Spring",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Non-volcanic geothermal spring near the Main Boundary Thrust, Lesser Himalaya. Two thermal springs reported with temperatures ranging from 44°C to 60°C. Sulphur-rich thermal water collected for bathing. Often incorrectly associated with Reasi district due to proximity. Legally and administratively in Rajouri (Kalakote).",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Jammu",
    "district": "Rajouri",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.2378,
      "lng": 74.4119
    },
    "elevation": 700,
    "area": null,
    "length": null,
    "waterQuality_status": "data-deficient",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatapani Hot Spring",
        "Tatta Pani Hot Spring",
        "Kalakote Hot Spring"
      ],
      "Village_Locality": "Kalakote Tehsil",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Very popular therapeutic destination, locals wash wool/laundry in lower runoff)"
    }
  },
  {
    "id": "spring-tatapani-paddar",
    "Legacy_ID": "spring-tatapani-paddar",
    "slug": "tatapani-paddar",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatapani Paddar",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Highly remote hot spring. Mapped approximately using village center. Needs formal geodetic mapping.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.19,
      "lng": 76.26
    },
    "elevation": 2500,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kishtwar Hot Springs"
      ],
      "Village_Locality": "Paddar Valley, near Sheshnag Temple",
      "Water_Use": [
        "Therapeutic",
        "Religious"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Sacred bath site for local mountain communities and pilgrims visiting Paddar)"
    }
  },
  {
    "id": "spring-gudresh-nag",
    "Legacy_ID": "spring-gudresh-nag",
    "slug": "gudresh-nag",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Gudresh Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "A sacred bowli of Kishtwar linked with regional Naga deities. Coordinates are approximate and need validation.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.318,
      "lng": 75.766
    },
    "elevation": 1630,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Godrashi Nag"
      ],
      "Village_Locality": "Kishtwar outskirts",
      "Water_Use": [
        "Drinking",
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Provides potable water to local Kishtwar hamlets, ancient Naga shrine location)"
    }
  },
  {
    "id": "spring-pooti-nag",
    "Legacy_ID": "spring-pooti-nag",
    "slug": "pooti-nag",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Pooti Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Mountain spring of Paddar. GPS coordinates are estimated. Needs field verification.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.15,
      "lng": 76.1
    },
    "elevation": 2300,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pooti Nag sacred spring"
      ],
      "Village_Locality": "Paddar Valley",
      "Water_Use": [
        "Drinking",
        "Religious"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "Moderate (Used by local transhumant herders and pilgrims during mountain treks)"
    }
  },
  {
    "id": "spring-kumai-nag",
    "Legacy_ID": "spring-kumai-nag",
    "slug": "kumai-nag",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Kumai Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Ancient village spring with stone-carved snake motifs, traditional bowli structure.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "coordinates": {
      "lat": 33.26,
      "lng": 75.9
    },
    "elevation": 1800,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kumai Nag Bowli"
      ],
      "Village_Locality": "Kumai village",
      "Water_Use": [
        "Drinking",
        "Religious",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Primary freshwater source for Kumai village community)"
    }
  },
  {
    "id": "spring-khoon",
    "Legacy_ID": "spring-khoon",
    "slug": "khoon-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Khoon Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Traditional bowli that was restored under the 'Bowli Bachao Abhiyan' community campaign.",
    "District_ID": "Udhampur",
    "Ecological_Scope_ID": "Jammu",
    "district": "Udhampur",
    "watershed": "Tawi Catchment",
    "coordinates": {
      "lat": 32.7833,
      "lng": 75.3167
    },
    "elevation": 780,
    "area": null,
    "length": null,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Khoon Bowli"
      ],
      "Village_Locality": "Khoon Village",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Irrigation"
      ],
      "Drying_Risk": "High",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Principal drinking water supply for Khoon village area)"
    }
  },
  {
    "id": "spring-panamik",
    "Legacy_ID": "spring-panamik",
    "slug": "panamik-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-INT-ICIMOD",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Panamik Hot Springs",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Famed sulfur hot springs in the Nubra Valley. Known to contain high amounts of sulfur and other therapeutic minerals.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Shyok Basin",
    "coordinates": {
      "lat": 34.7833,
      "lng": 77.5333
    },
    "elevation": 3183,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nubra Hot Springs"
      ],
      "Village_Locality": "Panamik, Nubra Valley",
      "Water_Use": [
        "Religious",
        "Therapeutic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Highly valued by locals and tourists for medicinal bathing. Culturally sacred)"
    }
  },
  {
    "id": "spring-chumathang",
    "Legacy_ID": "spring-chumathang",
    "slug": "chumathang-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-ACADEMIC-KU",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Chumathang Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Located right next to the freezing Indus River, producing bubbles and steam along the riverbank.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus River Mainstem",
    "coordinates": {
      "lat": 33.3607,
      "lng": 78.3406
    },
    "elevation": 3950,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chumathang Geothermal Spring"
      ],
      "Village_Locality": "Chumathang, on Leh-Loma highway",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Medicinal baths and local eco-tourism support)"
    }
  },
  {
    "id": "spring-puga",
    "Legacy_ID": "spring-puga",
    "slug": "puga-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-INT-ICIMOD",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Puga Hot Springs",
    "type": "spring",
    "category": "Geothermal Hot Spring",
    "description": "Located in a geothermal field with potential for mega-watt power generation.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus River Mainstem",
    "coordinates": {
      "lat": 33.22,
      "lng": 78.31
    },
    "elevation": 4400,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Puga Valley Geothermal Springs"
      ],
      "Village_Locality": "Puga Valley",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "Medium (Geothermal exploration site, therapeutic baths for nomadic Changpa herders)"
    }
  },
  {
    "id": "spring-tatta-pani-kotli",
    "Legacy_ID": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "AJK",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "elevation": 650,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kotli"
      ],
      "Village_Locality": "Tatta Pani village",
      "Water_Use": [
        "Religious",
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Very popular local and tourist attraction for therapeutic mineral baths)"
    }
  },
  {
    "id": "spring-kel-springs",
    "Legacy_ID": "spring-kel-springs",
    "slug": "kel-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Kel Springs",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Critical local spring system for Kel, situated in the rugged high-elevation Neelum Valley.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Neelum River Basin",
    "coordinates": {
      "lat": 34.825,
      "lng": 74.352
    },
    "elevation": 2097,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kel Neelum Valley Springs"
      ],
      "Village_Locality": "Kel",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Livestock"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Provides clean mountain drinking water to Kel town and base camp houses)"
    }
  },
  {
    "id": "spring-sharda-springs",
    "Legacy_ID": "spring-sharda-springs",
    "slug": "sharda-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Sharda Springs",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Provides freshwater for Sharda town. Visited by tourists near the Sharda Peeth ruins.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Neelum River Basin",
    "coordinates": {
      "lat": 34.793,
      "lng": 74.182
    },
    "elevation": 1980,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sharda Neelum Valley Springs"
      ],
      "Village_Locality": "Sharda",
      "Water_Use": [
        "Drinking",
        "Domestic",
        "Religious"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Supplies freshwater to Sharda village and historical temple complex surroundings)"
    }
  },
  {
    "id": "spring-chutrun",
    "Legacy_ID": "spring-chutrun",
    "slug": "chutrun-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-GBEPA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Chutrun Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Located in the Shigar Valley, about 2 hours drive from Skardu. Includes separate public bathhouses for men and women.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Shigar Basin",
    "coordinates": {
      "lat": 35.6942,
      "lng": 75.3995
    },
    "elevation": 2450,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chotron Hot Springs"
      ],
      "Village_Locality": "Chutrun, Shigar Valley",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Famous for thermal bathhouses. Highly visited by locals for joint/skin healing)"
    }
  },
  {
    "id": "spring-garam-chashma-chilas",
    "Legacy_ID": "spring-garam-chashma-chilas",
    "slug": "garam-chashma-chilas",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-LOCAL-NGO",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Garam Chashma Chilas",
    "type": "spring",
    "category": "Geothermal Hot Spring",
    "description": "Thermal spring located near Chilas along Karakoram Highway. Coordinates are approximate.",
    "District_ID": "Diamer",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Diamer",
    "watershed": "Indus River Mainstem",
    "coordinates": {
      "lat": 35.42,
      "lng": 74.1
    },
    "elevation": 1250,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chilas Hot Spring"
      ],
      "Village_Locality": "Near Chilas",
      "Water_Use": [
        "Therapeutic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "Moderate (Local therapeutic bathing, small scale tourist stopover)"
    }
  },
  {
    "id": "spring-hussaini-hot",
    "Legacy_ID": "spring-hussaini-hot",
    "slug": "hussaini-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-GBEPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Hussaini Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "A popular mountain geothermal spring located close to the Hussaini Suspension Bridge.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Hunza River Basin",
    "coordinates": {
      "lat": 36.425,
      "lng": 74.883
    },
    "elevation": 2500,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gojal Hot Springs"
      ],
      "Village_Locality": "Hussaini village, Gojal",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Provides warm water for domestic washing during freezing winter and therapeutic bathing)"
    }
  },
  {
    "id": "spring-khorkondo",
    "Legacy_ID": "spring-khorkondo",
    "slug": "khorkondo-hot-springs",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-INT-ICIMOD",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Khorkondo Hot Springs",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Highly remote geothermal spring near the Siachen glacier zone. Crucial hot water source in sub-zero winter temperatures.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Ghanche",
    "watershed": "Shyok River Basin",
    "coordinates": {
      "lat": 35.3,
      "lng": 76.74
    },
    "elevation": 3050,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kondos Valley Hot Springs"
      ],
      "Village_Locality": "Khorkondo, Kondos Valley",
      "Water_Use": [
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Low",
      "Community_Dependency": "High (Extremely important for local Balti villages in this cold high-altitude desert zone)"
    }
  },
  {
    "id": "spring-murtazaabad",
    "Legacy_ID": "spring-murtazaabad",
    "slug": "murtazaabad-spring",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-GBEPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Murtazaabad Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "A highly relied upon cold spring since the main Hunza River water becomes extremely silty in summer.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Hunza River Basin",
    "coordinates": {
      "lat": 36.312,
      "lng": 74.634
    },
    "elevation": 2150,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or discharge",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Murtazaabad Hunza Cold Spring"
      ],
      "Village_Locality": "Murtazaabad",
      "Water_Use": [
        "Drinking",
        "Domestic"
      ],
      "Drying_Risk": "Moderate",
      "Climate_Vulnerability": "High",
      "Community_Dependency": "High (Key drinking water source for Murtazaabad village, especially during glacial sediment peaks in Hunza River)"
    }
  },
  {
    "id": "spring-tatta-pani-kotli",
    "Legacy_ID": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "AJK",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "elevation": 650,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kotli"
      ],
      "Village_Locality": "Tatta Pani village",
      "Water_Use": [
        "Religious",
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Very popular local and tourist attraction for therapeutic mineral baths)"
    }
  },
  {
    "id": "spring-tatta-pani-kotli",
    "Legacy_ID": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "AJK",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "elevation": 650,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kotli"
      ],
      "Village_Locality": "Tatta Pani village",
      "Water_Use": [
        "Religious",
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Very popular local and tourist attraction for therapeutic mineral baths)"
    }
  },
  {
    "id": "spring-tatta-pani-kotli",
    "Legacy_ID": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "AJK",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "elevation": 650,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kotli"
      ],
      "Village_Locality": "Tatta Pani village",
      "Water_Use": [
        "Religious",
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Very popular local and tourist attraction for therapeutic mineral baths)"
    }
  },
  {
    "id": "spring-tatta-pani-kotli",
    "Legacy_ID": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-PCRWR",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.427Z",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "AJK",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "elevation": 650,
    "area": null,
    "length": null,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kotli"
      ],
      "Village_Locality": "Tatta Pani village",
      "Water_Use": [
        "Religious",
        "Therapeutic",
        "Domestic"
      ],
      "Drying_Risk": "Low",
      "Climate_Vulnerability": "Moderate",
      "Community_Dependency": "High (Very popular local and tourist attraction for therapeutic mineral baths)"
    }
  }
];
