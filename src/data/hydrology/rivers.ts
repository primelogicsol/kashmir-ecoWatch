// Kashmir Eco Watch — Hydrology Database: RIVERS
// Migration Status: Legacy Imported → Pending Verification
// Generated: 2026-06-16T16:28:50.345Z
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const riversRecords: MigratedWaterRecord[] = [
  {
    "id": "jhelum-river",
    "Legacy_ID": "jhelum-river",
    "slug": "jhelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Jhelum River",
    "type": "river",
    "category": "River",
    "description": "Principal river of Kashmir Valley. Lifeline of the region. Flows through Srinagar and connects all major water bodies. Critical for irrigation, fisheries, and hydropower. [Source: Verinag Spring, Anantnag]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5322,
      "lng": 75.2515
    },
    "elevation": 1850,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Vitasta",
        "Veth",
        "Hydaspes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence near Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Verinag Spring, Anantnag"
    }
  },
  {
    "id": "lidder-river",
    "Legacy_ID": "lidder-river",
    "slug": "lidder-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Lidder River",
    "type": "river",
    "category": "Tributary",
    "description": "Important tributary of Jhelum. Flows through Lidder Valley. Popular for trout fishing and rafting. Critical for irrigation in Anantnag. [Source: Kolahoi Glacier (Lidder East) and Sheshnag Lake (Lidder West)]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "coordinates": {
      "lat": 34.1367,
      "lng": 75.3855
    },
    "elevation": 4650,
    "area": null,
    "length": 73,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Lidar",
        "Lambodri"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River near Mirgund, Anantnag",
      "Mouth_Latitude": 33.7225,
      "Mouth_Longitude": 75.1517,
      "Source_Location": "Kolahoi Glacier (Lidder East) and Sheshnag Lake (Lidder West)"
    }
  },
  {
    "id": "sind-river",
    "Legacy_ID": "sind-river",
    "slug": "sind-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Sind River",
    "type": "river",
    "category": "Tributary",
    "description": "Largest tributary of Jhelum in Kashmir. Drains much of central Kashmir. Important for irrigation and hydropower. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Sind Basin",
    "coordinates": {
      "lat": 34.2818,
      "lng": 75.4805
    },
    "elevation": 3950,
    "area": null,
    "length": 108,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sindh Nallah",
        "Sindh River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Shadipora, Ganderbal",
      "Mouth_Latitude": 34.1755,
      "Mouth_Longitude": 74.7214,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "veshaw-river",
    "Legacy_ID": "veshaw-river",
    "slug": "veshaw-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Veshaw River",
    "type": "river",
    "category": "Tributary",
    "description": "Tributary in Kulgam and Shopian districts. Important for irrigation in southern Kashmir. [Source: Kounsarnag Lake, Pir Panjal range]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5135,
      "lng": 74.8258
    },
    "elevation": 3500,
    "area": null,
    "length": 52,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Vishav",
        "Veshu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River near Sangam",
      "Mouth_Latitude": 33.7842,
      "Mouth_Longitude": 75.0815,
      "Source_Location": "Kounsarnag Lake, Pir Panjal range"
    }
  },
  {
    "id": "river-rambiara",
    "Legacy_ID": "river-rambiara",
    "slug": "rambiara-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods. [Source: Pir Panjal range near Rupri Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "elevation": 4100,
    "area": null,
    "length": 58,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rambi Ara",
        "Rambiara Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Veshaw River near Sangam",
      "Mouth_Latitude": 33.7714,
      "Mouth_Longitude": 75.0782,
      "Source_Location": "Pir Panjal range near Rupri Pass"
    }
  },
  {
    "id": "romshi-stream",
    "Legacy_ID": "romshi-stream",
    "slug": "romshi-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Romshi Stream",
    "type": "stream",
    "category": "Tributary",
    "description": "Mountain stream in Ganderbal district. Cold-water stream with high oxygen content. Supports trout populations. [Source: Pir Panjal range near Kharmarg]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7125,
      "lng": 74.6548
    },
    "elevation": 3800,
    "area": null,
    "length": 51,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Roumushi",
        "Romshi Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Kakapora, Pulwama",
      "Mouth_Latitude": 33.9182,
      "Mouth_Longitude": 74.9815,
      "Source_Location": "Pir Panjal range near Kharmarg"
    }
  },
  {
    "id": "river-doodhganga",
    "Legacy_ID": "river-doodhganga",
    "slug": "doodhganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream. [Source: Pir Panjal range near Chotigal Peak]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "elevation": 4200,
    "area": null,
    "length": 46,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Doodh Ganga",
        "Chhats Kol"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River at Srinagar (outflow near Safa Kadal)",
      "Mouth_Latitude": 34.0758,
      "Mouth_Longitude": 74.7742,
      "Source_Location": "Pir Panjal range near Chotigal Peak"
    }
  },
  {
    "id": "river-pohru",
    "Legacy_ID": "river-pohru",
    "slug": "pohru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla. [Source: Confluence of Lolab & Kahmil streams near Kupwara]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "elevation": 2300,
    "area": null,
    "length": 56,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Pru",
        "Pohra Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Doabgah near Sopore",
      "Mouth_Latitude": 34.3422,
      "Mouth_Longitude": 74.4282,
      "Source_Location": "Confluence of Lolab & Kahmil streams near Kupwara"
    }
  },
  {
    "id": "bringi-river",
    "Legacy_ID": "bringi-river",
    "slug": "bringi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Bringi River",
    "type": "river",
    "category": "Tributary",
    "description": "Tributary in Anantnag district. Supports local agriculture and biodiversity. [Source: Glaciers of Sinthan and Margan Top slopes]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5782,
      "lng": 75.3214
    },
    "elevation": 3600,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brengi Nallah",
        "Brengi River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal, Anantnag",
      "Mouth_Latitude": 33.7315,
      "Mouth_Longitude": 75.1482,
      "Source_Location": "Glaciers of Sinthan and Margan Top slopes"
    }
  },
  {
    "id": "arapath-stream",
    "Legacy_ID": "arapath-stream",
    "slug": "arapath-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Arapath Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Cold-water stream in Anantnag. Important tributary for Lidder River. Supports aquatic biodiversity. [Source: Alpine springs of Shangas, Anantnag]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7082,
      "lng": 75.2815
    },
    "elevation": 2900,
    "area": null,
    "length": 22,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Arapat Nallah",
        "Aripal Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Khanabal",
      "Mouth_Latitude": 33.7325,
      "Mouth_Longitude": 75.1582,
      "Source_Location": "Alpine springs of Shangas, Anantnag"
    }
  },
  {
    "id": "river-madhumati",
    "Legacy_ID": "river-madhumati",
    "slug": "madhumati-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt. [Source: Glacier slopes of Harmukh mountain range]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "elevation": 4100,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Madumati Nallah",
        "Madmati"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4255,
      "Mouth_Longitude": 74.6382,
      "Source_Location": "Glacier slopes of Harmukh mountain range"
    }
  },
  {
    "id": "river-erin",
    "Legacy_ID": "river-erin",
    "slug": "erin-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment. [Source: High-altitude glacier lakes near Harmukh]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "elevation": 3800,
    "area": null,
    "length": 32,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Erin Nallah",
        "Arin Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4082,
      "Mouth_Longitude": 74.6518,
      "Source_Location": "High-altitude glacier lakes near Harmukh"
    }
  },
  {
    "id": "river-sandran",
    "Legacy_ID": "river-sandran",
    "slug": "sandran-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting. [Source: Pir Panjal range near Sinthan Top]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "elevation": 3500,
    "area": null,
    "length": 42,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sandran Nallah",
        "Sandrin"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal",
      "Mouth_Latitude": 33.7258,
      "Mouth_Longitude": 75.1415,
      "Source_Location": "Pir Panjal range near Sinthan Top"
    }
  },
  {
    "id": "river-ningli",
    "Legacy_ID": "river-ningli",
    "slug": "ningli-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak. [Source: Alpather Lake, Gulmarg highlands]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "elevation": 3840,
    "area": null,
    "length": 36,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ningli Nallah",
        "Ningli River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Sopore",
      "Mouth_Latitude": 34.3182,
      "Mouth_Longitude": 74.4315,
      "Source_Location": "Alpather Lake, Gulmarg highlands"
    }
  },
  {
    "id": "river-shaliganga",
    "Legacy_ID": "river-shaliganga",
    "slug": "shaliganga-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort. [Source: Pir Panjal range near Tatakooti Peak]",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "elevation": 4100,
    "area": null,
    "length": 32,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Shali Ganga",
        "Shaliganga Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Doodhganga River near Budgam",
      "Mouth_Latitude": 34.0155,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Pir Panjal range near Tatakooti Peak"
    }
  },
  {
    "id": "river-ferozpora",
    "Legacy_ID": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland. [Source: Apharwat range near Gulmarg]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "elevation": 3800,
    "area": null,
    "length": 45,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ferozpur Nallah",
        "Ferozpora Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Shadipora",
      "Mouth_Latitude": 34.1855,
      "Mouth_Longitude": 74.6815,
      "Source_Location": "Apharwat range near Gulmarg"
    }
  },
  {
    "id": "river-sukhnag",
    "Legacy_ID": "river-sukhnag",
    "slug": "sukhnag-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream. [Source: Tosamaidan glacier springs]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "elevation": 3800,
    "area": null,
    "length": 52,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sukhnag Nallah",
        "Sukh Nag"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Shadipora",
      "Mouth_Latitude": 34.1782,
      "Mouth_Longitude": 74.6715,
      "Source_Location": "Tosamaidan glacier springs"
    }
  },
  {
    "id": "stream-tsuntkol",
    "Legacy_ID": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached. [Source: Dal Lake outflow at Dalgate, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "elevation": 1583,
    "area": null,
    "length": 3.5,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsunth Kol",
        "Chinar Canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Maisuma, Srinagar",
      "Mouth_Latitude": 34.0722,
      "Mouth_Longitude": 74.8118,
      "Source_Location": "Dal Lake outflow at Dalgate, Srinagar"
    }
  },
  {
    "id": "stream-braricumb",
    "Legacy_ID": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication. [Source: Brari Nambal Lagoon, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "elevation": 1583,
    "area": null,
    "length": 1.2,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brari Nambal Channel",
        "Baba Demb canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Fateh Kadal",
      "Mouth_Latitude": 34.0858,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Brari Nambal Lagoon, Srinagar"
    }
  },
  {
    "id": "channel-srinagarflood",
    "Legacy_ID": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "IFCD-JK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city. [Source: Jhelum River at Padgampora, Pulwama]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "elevation": 1590,
    "area": null,
    "length": 42,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum Flood Spill Channel",
        "FSC Jhelum"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Wular Lake at Naidkhai",
      "Mouth_Latitude": 34.4015,
      "Mouth_Longitude": 74.6018,
      "Source_Location": "Jhelum River at Padgampora, Pulwama"
    }
  },
  {
    "id": "river-chenab",
    "Legacy_ID": "river-chenab",
    "slug": "chenab-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar. [Source: Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "elevation": 2280,
    "area": null,
    "length": 960,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Chandrabhaga",
        "Asikni"
      ],
      "River_Order": 8,
      "Mouth_or_Confluence": "Indus River at Mithankot, Pakistan",
      "Mouth_Latitude": 28.9818,
      "Mouth_Longitude": 70.4815,
      "Source_Location": "Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)"
    }
  },
  {
    "id": "river-tawi",
    "Legacy_ID": "river-tawi",
    "slug": "tawi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks. [Source: Kali Kundi Glacier, Bhaderwah, Doda]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "elevation": 4000,
    "area": null,
    "length": 141,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Jammu Tawi",
        "Tobia"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River in Punjab, Pakistan",
      "Mouth_Latitude": 32.1728,
      "Mouth_Longitude": 74.1542,
      "Source_Location": "Kali Kundi Glacier, Bhaderwah, Doda"
    }
  },
  {
    "id": "river-ravi",
    "Legacy_ID": "river-ravi",
    "slug": "ravi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua. [Source: Bara Bhangal, Dhauladhar range (HP)]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "elevation": 4200,
    "area": null,
    "length": 720,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Iravati",
        "Hydraotes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River near Ahmadpur Sial, Pakistan",
      "Mouth_Latitude": 30.6214,
      "Mouth_Longitude": 71.8218,
      "Source_Location": "Bara Bhangal, Dhauladhar range (HP)"
    }
  },
  {
    "id": "river-ujh",
    "Legacy_ID": "river-ujh",
    "slug": "ujh-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches. [Source: Kailash Mountains near Bhaderwah, Kathua border]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "elevation": 3200,
    "area": null,
    "length": 65,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ujh Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2582,
      "Mouth_Longitude": 75.3815,
      "Source_Location": "Kailash Mountains near Bhaderwah, Kathua border"
    }
  },
  {
    "id": "river-basantar",
    "Legacy_ID": "river-basantar",
    "slug": "basantar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971). [Source: Shivalik Hills near Ramkot, Samba]",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Jammu",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "elevation": 1200,
    "area": null,
    "length": 48,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Basantar Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2282,
      "Mouth_Longitude": 75.1215,
      "Source_Location": "Shivalik Hills near Ramkot, Samba"
    }
  },
  {
    "id": "river-munawartawi",
    "Legacy_ID": "river-munawartawi",
    "slug": "munawar-tawi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab. [Source: Pir Panjal Range in northern Rajouri (near Ratan Pir)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "elevation": 3500,
    "area": null,
    "length": 110,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Rajouri Tawi",
        "Naushera Tawi"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Marala, Pakistan",
      "Mouth_Latitude": 32.6582,
      "Mouth_Longitude": 74.4518,
      "Source_Location": "Pir Panjal Range in northern Rajouri (near Ratan Pir)"
    }
  },
  {
    "id": "river-ans",
    "Legacy_ID": "river-ans",
    "slug": "ans-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley. [Source: Pir Panjal range near Budhal, Rajouri]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "elevation": 3800,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ans Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Chenab River near Reasi",
      "Mouth_Latitude": 33.1582,
      "Mouth_Longitude": 74.8815,
      "Source_Location": "Pir Panjal range near Budhal, Rajouri"
    }
  },
  {
    "id": "river-marusudar",
    "Legacy_ID": "river-marusudar",
    "slug": "marusudar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "CWC-INDIA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah. [Source: Lanakh Glacier, Kishtwar Himalayas]",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "elevation": 5100,
    "area": null,
    "length": 133,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Maru Sudar",
        "Sudar River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Bhandarkoot, Kishtwar",
      "Mouth_Latitude": 33.3282,
      "Mouth_Longitude": 75.7815,
      "Source_Location": "Lanakh Glacier, Kishtwar Himalayas"
    }
  },
  {
    "id": "river-devak",
    "Legacy_ID": "river-devak",
    "slug": "devak-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP). [Source: Shivalik Hills near Sudhmahadev, Udhampur]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "elevation": 1600,
    "area": null,
    "length": 55,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Devika River",
        "Gupt Ganga"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Basantar River near Samba",
      "Mouth_Latitude": 32.5518,
      "Mouth_Longitude": 75.0515,
      "Source_Location": "Shivalik Hills near Sudhmahadev, Udhampur"
    }
  },
  {
    "id": "river-neeru",
    "Legacy_ID": "river-neeru",
    "slug": "neeru-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course. [Source: Kailash Kund, Bhaderwah range, Doda]",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Jammu",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "elevation": 3900,
    "area": null,
    "length": 30,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Neeru River",
        "Neeru Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Chenab River near Pul Doda",
      "Mouth_Latitude": 33.1415,
      "Mouth_Longitude": 75.5218,
      "Source_Location": "Kailash Kund, Bhaderwah range, Doda"
    }
  },
  {
    "id": "indus-river",
    "Legacy_ID": "indus-river",
    "slug": "indus-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Indus River (Ladakh Section)",
    "type": "river",
    "category": "River",
    "description": "One of the longest rivers in Asia. Flows through Ladakh region. Critical for irrigation and hydropower. Sacred river with high cultural significance. [Source: Senge Khabab springs near Mount Kailash, Tibet]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 31.2505,
      "lng": 81.3322
    },
    "elevation": 5400,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Singge Tsangpo",
        "Sindhu"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Senge Khabab springs near Mount Kailash, Tibet"
    }
  },
  {
    "id": "river-zanskar",
    "Legacy_ID": "river-zanskar",
    "slug": "zanskar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin. [Source: Confluence of Doda and Tsarap rivers near Padum]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "elevation": 3700,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Zanskar Tsangpo"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Indus River near Nimmu",
      "Mouth_Latitude": 34.1714,
      "Mouth_Longitude": 77.3328,
      "Source_Location": "Confluence of Doda and Tsarap rivers near Padum"
    }
  },
  {
    "id": "river-shyok",
    "Legacy_ID": "river-shyok",
    "slug": "shyok-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river. [Source: Rimo Glacier terminus, Karakoram range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "elevation": 5300,
    "area": null,
    "length": 550,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "River of Death",
        "Shyok Tsangpo"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River near Keris, Skardu (Pakistan-administered)",
      "Mouth_Latitude": 35.1818,
      "Mouth_Longitude": 76.1542,
      "Source_Location": "Rimo Glacier terminus, Karakoram range"
    }
  },
  {
    "id": "river-nubra",
    "Legacy_ID": "river-nubra",
    "slug": "nubra-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik). [Source: Siachen Glacier snout (Snout coordinates)]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "elevation": 5400,
    "area": null,
    "length": 80,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Siachen River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Shyok River near Lughzun",
      "Mouth_Latitude": 34.6055,
      "Mouth_Longitude": 77.5518,
      "Source_Location": "Siachen Glacier snout (Snout coordinates)"
    }
  },
  {
    "id": "river-suru",
    "Legacy_ID": "river-suru",
    "slug": "suru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif. [Source: Panzella Glacier near Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "elevation": 4400,
    "area": null,
    "length": 185,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Suru Tsangpo"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River near Nurla/Kargil border",
      "Mouth_Latitude": 34.5728,
      "Mouth_Longitude": 76.1518,
      "Source_Location": "Panzella Glacier near Pensi La Pass"
    }
  },
  {
    "id": "river-dras",
    "Legacy_ID": "river-dras",
    "slug": "dras-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "elevation": 3950,
    "area": null,
    "length": 86,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Dras Nallah",
        "Himalayan Dras"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Suru River near Kharul, Kargil",
      "Mouth_Latitude": 34.5618,
      "Mouth_Longitude": 76.2215,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "river-galwan",
    "Legacy_ID": "river-galwan",
    "slug": "galwan-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau. [Source: Samzungling, Aksai Chin plateau]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "elevation": 5200,
    "area": null,
    "length": 80,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Galwan Valley River"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.7655,
      "Mouth_Longitude": 77.9218,
      "Source_Location": "Samzungling, Aksai Chin plateau"
    }
  },
  {
    "id": "river-changchenmo",
    "Legacy_ID": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC). [Source: Aksai Chin boundary range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "elevation": 5500,
    "area": null,
    "length": 125,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Changchenmo Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.1742,
      "Mouth_Longitude": 78.1815,
      "Source_Location": "Aksai Chin boundary range"
    }
  },
  {
    "id": "river-hanle",
    "Legacy_ID": "river-hanle",
    "slug": "hanle-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone. [Source: High lakes of southern Changthang range near Hanle]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "elevation": 4800,
    "area": null,
    "length": 92,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Hanley Stream"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Indus River near Loma",
      "Mouth_Latitude": 33.1542,
      "Mouth_Longitude": 78.9818,
      "Source_Location": "High lakes of southern Changthang range near Hanle"
    }
  },
  {
    "id": "river-doda",
    "Legacy_ID": "river-doda",
    "slug": "doda-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road. [Source: Drang-Drung Glacier, Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "elevation": 4450,
    "area": null,
    "length": 79,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Stod River",
        "Doda Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Confluence with Tsarap River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Drang-Drung Glacier, Pensi La Pass"
    }
  },
  {
    "id": "river-tsarap",
    "Legacy_ID": "river-tsarap",
    "slug": "tsarap-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake. [Source: Pankpo La and alpine streams of Spiti border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "elevation": 4950,
    "area": null,
    "length": 182,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Tsarap Lingti Chu",
        "Tsarap Chu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Confluence with Doda River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Pankpo La and alpine streams of Spiti border"
    }
  },
  {
    "id": "river-jhelum-ajk",
    "Legacy_ID": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns. [Source: Chakothi border entry point (flowing from Kashmir Core)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "elevation": 1000,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Jhelum River AJK",
        "River Jhelum"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence at Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Chakothi border entry point (flowing from Kashmir Core)"
    }
  },
  {
    "id": "river-neelum",
    "Legacy_ID": "river-neelum",
    "slug": "neelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence. [Source: Gurez Valley border entry point (flowing from J&K)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "elevation": 2400,
    "area": null,
    "length": 245,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Kishanganga River",
        "Blue River"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Jhelum River confluence at Domel, Muzaffarabad",
      "Mouth_Latitude": 34.3648,
      "Mouth_Longitude": 73.4728,
      "Source_Location": "Gurez Valley border entry point (flowing from J&K)"
    }
  },
  {
    "id": "river-poonch",
    "Legacy_ID": "river-poonch",
    "slug": "poonch-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.344Z",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat. [Source: Pir Panjal Range (flowing from Poonch J&K border)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "elevation": 3500,
    "area": null,
    "length": 150,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Punch River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Mangla Dam Reservoir / Jhelum River",
      "Mouth_Latitude": 33.2282,
      "Mouth_Longitude": 73.7442,
      "Source_Location": "Pir Panjal Range (flowing from Poonch J&K border)"
    }
  },
  {
    "id": "river-kunhar",
    "Legacy_ID": "river-kunhar",
    "slug": "kunhar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin. [Source: Lulusar Lake, Kaghan Valley (KPK)]",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "AJK",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "elevation": 3405,
    "area": null,
    "length": 166,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Nain Sukh",
        "Kunhar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River confluence near Pattan, Muzaffarabad",
      "Mouth_Latitude": 34.2818,
      "Mouth_Longitude": 73.5222,
      "Source_Location": "Lulusar Lake, Kaghan Valley (KPK)"
    }
  },
  {
    "id": "nallah-shounter",
    "Legacy_ID": "nallah-shounter",
    "slug": "shounter-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate. [Source: Shounter Glacier / Hari Parbat slopes]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "elevation": 4200,
    "area": null,
    "length": 26,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Shounter Stream",
        "Shountar Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Neelum River near Kel",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Shounter Glacier / Hari Parbat slopes"
    }
  },
  {
    "id": "nallah-chittakatha",
    "Legacy_ID": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations. [Source: Chitta Katha Glacier / Hari Parbat Peak]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": null,
    "elevation": 4350,
    "area": null,
    "length": 14,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Chitta Katha Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Shounter Nallah",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Chitta Katha Glacier / Hari Parbat Peak"
    }
  },
  {
    "id": "nallah-dudipat",
    "Legacy_ID": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages. [Source: Dudipatsar Lake]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "elevation": 3800,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Dudipatsar Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Neelum River near Besal border",
      "Mouth_Latitude": 35.0515,
      "Mouth_Longitude": 74.0182,
      "Source_Location": "Dudipatsar Lake"
    }
  },
  {
    "id": "river-indus-gb",
    "Legacy_ID": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity. [Source: Ladakh boundary entry point near Demchok/Kargil border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "elevation": 2300,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Abasin",
        "Sindhu River"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Ladakh boundary entry point near Demchok/Kargil border"
    }
  },
  {
    "id": "river-hunza",
    "Legacy_ID": "river-hunza",
    "slug": "hunza-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake. [Source: Confluence of Chapursan and Kilik streams near Khunjerab Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "elevation": 4800,
    "area": null,
    "length": 190,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hunza Nallah"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Gilgit River confluence near Gilgit",
      "Mouth_Latitude": 35.9082,
      "Mouth_Longitude": 74.3715,
      "Source_Location": "Confluence of Chapursan and Kilik streams near Khunjerab Pass"
    }
  },
  {
    "id": "river-gilgit",
    "Legacy_ID": "river-gilgit",
    "slug": "gilgit-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches. [Source: Shandur Lake and Hindu Kush snowfields]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "elevation": 3730,
    "area": null,
    "length": 240,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Ghizer River (upper reaches)"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot/Bunji",
      "Mouth_Latitude": 35.7315,
      "Mouth_Longitude": 74.6228,
      "Source_Location": "Shandur Lake and Hindu Kush snowfields"
    }
  },
  {
    "id": "river-shigar",
    "Legacy_ID": "river-shigar",
    "slug": "shigar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers. [Source: Confluence of Braldu and Bashar rivers near Shigar Valley]",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "elevation": 3100,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shigar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence at Skardu",
      "Mouth_Latitude": 35.3328,
      "Mouth_Longitude": 75.6315,
      "Source_Location": "Confluence of Braldu and Bashar rivers near Shigar Valley"
    }
  },
  {
    "id": "river-astore",
    "Legacy_ID": "river-astore",
    "slug": "astore-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau. [Source: Burzil Pass / Deosai Plateau slopes]",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "elevation": 4100,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Astore Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot",
      "Mouth_Latitude": 35.7518,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Burzil Pass / Deosai Plateau slopes"
    }
  },
  {
    "id": "river-hispar",
    "Legacy_ID": "river-hispar",
    "slug": "hispar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier. [Source: Hispar Glacier snout]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "elevation": 4300,
    "area": null,
    "length": 48,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hispar Nallah",
        "Hispar Torrent"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Karimabad",
      "Mouth_Latitude": 36.3155,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Hispar Glacier snout"
    }
  },
  {
    "id": "river-shimshal",
    "Legacy_ID": "river-shimshal",
    "slug": "shimshal-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream. [Source: Shimshal Pass / Khurdopin Glacier]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "elevation": 4730,
    "area": null,
    "length": 82,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shimshal Nallah",
        "Shimshal Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Pasu",
      "Mouth_Latitude": 36.3115,
      "Mouth_Longitude": 74.8842,
      "Source_Location": "Shimshal Pass / Khurdopin Glacier"
    }
  },
  {
    "id": "river-rambiara",
    "Legacy_ID": "river-rambiara",
    "slug": "rambiara-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods. [Source: Pir Panjal range near Rupri Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "elevation": 4100,
    "area": null,
    "length": 58,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rambi Ara",
        "Rambiara Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Veshaw River near Sangam",
      "Mouth_Latitude": 33.7714,
      "Mouth_Longitude": 75.0782,
      "Source_Location": "Pir Panjal range near Rupri Pass"
    }
  },
  {
    "id": "river-doodhganga",
    "Legacy_ID": "river-doodhganga",
    "slug": "doodhganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream. [Source: Pir Panjal range near Chotigal Peak]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "elevation": 4200,
    "area": null,
    "length": 46,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Doodh Ganga",
        "Chhats Kol"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River at Srinagar (outflow near Safa Kadal)",
      "Mouth_Latitude": 34.0758,
      "Mouth_Longitude": 74.7742,
      "Source_Location": "Pir Panjal range near Chotigal Peak"
    }
  },
  {
    "id": "river-pohru",
    "Legacy_ID": "river-pohru",
    "slug": "pohru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla. [Source: Confluence of Lolab & Kahmil streams near Kupwara]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "elevation": 2300,
    "area": null,
    "length": 56,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Pru",
        "Pohra Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Doabgah near Sopore",
      "Mouth_Latitude": 34.3422,
      "Mouth_Longitude": 74.4282,
      "Source_Location": "Confluence of Lolab & Kahmil streams near Kupwara"
    }
  },
  {
    "id": "river-madhumati",
    "Legacy_ID": "river-madhumati",
    "slug": "madhumati-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt. [Source: Glacier slopes of Harmukh mountain range]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "elevation": 4100,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Madumati Nallah",
        "Madmati"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4255,
      "Mouth_Longitude": 74.6382,
      "Source_Location": "Glacier slopes of Harmukh mountain range"
    }
  },
  {
    "id": "river-erin",
    "Legacy_ID": "river-erin",
    "slug": "erin-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment. [Source: High-altitude glacier lakes near Harmukh]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "elevation": 3800,
    "area": null,
    "length": 32,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Erin Nallah",
        "Arin Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4082,
      "Mouth_Longitude": 74.6518,
      "Source_Location": "High-altitude glacier lakes near Harmukh"
    }
  },
  {
    "id": "river-sandran",
    "Legacy_ID": "river-sandran",
    "slug": "sandran-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting. [Source: Pir Panjal range near Sinthan Top]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "elevation": 3500,
    "area": null,
    "length": 42,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sandran Nallah",
        "Sandrin"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal",
      "Mouth_Latitude": 33.7258,
      "Mouth_Longitude": 75.1415,
      "Source_Location": "Pir Panjal range near Sinthan Top"
    }
  },
  {
    "id": "river-ningli",
    "Legacy_ID": "river-ningli",
    "slug": "ningli-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak. [Source: Alpather Lake, Gulmarg highlands]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "elevation": 3840,
    "area": null,
    "length": 36,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ningli Nallah",
        "Ningli River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Sopore",
      "Mouth_Latitude": 34.3182,
      "Mouth_Longitude": 74.4315,
      "Source_Location": "Alpather Lake, Gulmarg highlands"
    }
  },
  {
    "id": "river-shaliganga",
    "Legacy_ID": "river-shaliganga",
    "slug": "shaliganga-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort. [Source: Pir Panjal range near Tatakooti Peak]",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "elevation": 4100,
    "area": null,
    "length": 32,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Shali Ganga",
        "Shaliganga Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Doodhganga River near Budgam",
      "Mouth_Latitude": 34.0155,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Pir Panjal range near Tatakooti Peak"
    }
  },
  {
    "id": "river-ferozpora",
    "Legacy_ID": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland. [Source: Apharwat range near Gulmarg]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "elevation": 3800,
    "area": null,
    "length": 45,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ferozpur Nallah",
        "Ferozpora Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Shadipora",
      "Mouth_Latitude": 34.1855,
      "Mouth_Longitude": 74.6815,
      "Source_Location": "Apharwat range near Gulmarg"
    }
  },
  {
    "id": "river-sukhnag",
    "Legacy_ID": "river-sukhnag",
    "slug": "sukhnag-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream. [Source: Tosamaidan glacier springs]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "elevation": 3800,
    "area": null,
    "length": 52,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sukhnag Nallah",
        "Sukh Nag"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Shadipora",
      "Mouth_Latitude": 34.1782,
      "Mouth_Longitude": 74.6715,
      "Source_Location": "Tosamaidan glacier springs"
    }
  },
  {
    "id": "stream-tsuntkol",
    "Legacy_ID": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached. [Source: Dal Lake outflow at Dalgate, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "elevation": 1583,
    "area": null,
    "length": 3.5,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsunth Kol",
        "Chinar Canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Maisuma, Srinagar",
      "Mouth_Latitude": 34.0722,
      "Mouth_Longitude": 74.8118,
      "Source_Location": "Dal Lake outflow at Dalgate, Srinagar"
    }
  },
  {
    "id": "stream-braricumb",
    "Legacy_ID": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication. [Source: Brari Nambal Lagoon, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "elevation": 1583,
    "area": null,
    "length": 1.2,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brari Nambal Channel",
        "Baba Demb canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Fateh Kadal",
      "Mouth_Latitude": 34.0858,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Brari Nambal Lagoon, Srinagar"
    }
  },
  {
    "id": "channel-srinagarflood",
    "Legacy_ID": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "IFCD-JK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city. [Source: Jhelum River at Padgampora, Pulwama]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "elevation": 1590,
    "area": null,
    "length": 42,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum Flood Spill Channel",
        "FSC Jhelum"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Wular Lake at Naidkhai",
      "Mouth_Latitude": 34.4015,
      "Mouth_Longitude": 74.6018,
      "Source_Location": "Jhelum River at Padgampora, Pulwama"
    }
  },
  {
    "id": "river-chenab",
    "Legacy_ID": "river-chenab",
    "slug": "chenab-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar. [Source: Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "elevation": 2280,
    "area": null,
    "length": 960,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Chandrabhaga",
        "Asikni"
      ],
      "River_Order": 8,
      "Mouth_or_Confluence": "Indus River at Mithankot, Pakistan",
      "Mouth_Latitude": 28.9818,
      "Mouth_Longitude": 70.4815,
      "Source_Location": "Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)"
    }
  },
  {
    "id": "river-tawi",
    "Legacy_ID": "river-tawi",
    "slug": "tawi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks. [Source: Kali Kundi Glacier, Bhaderwah, Doda]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "elevation": 4000,
    "area": null,
    "length": 141,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jammu Tawi",
        "Tobia"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River in Punjab, Pakistan",
      "Mouth_Latitude": 32.1728,
      "Mouth_Longitude": 74.1542,
      "Source_Location": "Kali Kundi Glacier, Bhaderwah, Doda"
    }
  },
  {
    "id": "river-ravi",
    "Legacy_ID": "river-ravi",
    "slug": "ravi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua. [Source: Bara Bhangal, Dhauladhar range (HP)]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "elevation": 4200,
    "area": null,
    "length": 720,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Iravati",
        "Hydraotes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River near Ahmadpur Sial, Pakistan",
      "Mouth_Latitude": 30.6214,
      "Mouth_Longitude": 71.8218,
      "Source_Location": "Bara Bhangal, Dhauladhar range (HP)"
    }
  },
  {
    "id": "river-ujh",
    "Legacy_ID": "river-ujh",
    "slug": "ujh-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches. [Source: Kailash Mountains near Bhaderwah, Kathua border]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "elevation": 3200,
    "area": null,
    "length": 65,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ujh Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2582,
      "Mouth_Longitude": 75.3815,
      "Source_Location": "Kailash Mountains near Bhaderwah, Kathua border"
    }
  },
  {
    "id": "river-basantar",
    "Legacy_ID": "river-basantar",
    "slug": "basantar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971). [Source: Shivalik Hills near Ramkot, Samba]",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Jammu",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "elevation": 1200,
    "area": null,
    "length": 48,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Basantar Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2282,
      "Mouth_Longitude": 75.1215,
      "Source_Location": "Shivalik Hills near Ramkot, Samba"
    }
  },
  {
    "id": "river-munawartawi",
    "Legacy_ID": "river-munawartawi",
    "slug": "munawar-tawi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab. [Source: Pir Panjal Range in northern Rajouri (near Ratan Pir)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "elevation": 3500,
    "area": null,
    "length": 110,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rajouri Tawi",
        "Naushera Tawi"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Marala, Pakistan",
      "Mouth_Latitude": 32.6582,
      "Mouth_Longitude": 74.4518,
      "Source_Location": "Pir Panjal Range in northern Rajouri (near Ratan Pir)"
    }
  },
  {
    "id": "river-ans",
    "Legacy_ID": "river-ans",
    "slug": "ans-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley. [Source: Pir Panjal range near Budhal, Rajouri]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "elevation": 3800,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ans Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Chenab River near Reasi",
      "Mouth_Latitude": 33.1582,
      "Mouth_Longitude": 74.8815,
      "Source_Location": "Pir Panjal range near Budhal, Rajouri"
    }
  },
  {
    "id": "river-marusudar",
    "Legacy_ID": "river-marusudar",
    "slug": "marusudar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "CWC-INDIA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah. [Source: Lanakh Glacier, Kishtwar Himalayas]",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "elevation": 5100,
    "area": null,
    "length": 133,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Maru Sudar",
        "Sudar River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Bhandarkoot, Kishtwar",
      "Mouth_Latitude": 33.3282,
      "Mouth_Longitude": 75.7815,
      "Source_Location": "Lanakh Glacier, Kishtwar Himalayas"
    }
  },
  {
    "id": "river-devak",
    "Legacy_ID": "river-devak",
    "slug": "devak-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP). [Source: Shivalik Hills near Sudhmahadev, Udhampur]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "elevation": 1600,
    "area": null,
    "length": 55,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Devika River",
        "Gupt Ganga"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Basantar River near Samba",
      "Mouth_Latitude": 32.5518,
      "Mouth_Longitude": 75.0515,
      "Source_Location": "Shivalik Hills near Sudhmahadev, Udhampur"
    }
  },
  {
    "id": "river-neeru",
    "Legacy_ID": "river-neeru",
    "slug": "neeru-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course. [Source: Kailash Kund, Bhaderwah range, Doda]",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Jammu",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "elevation": 3900,
    "area": null,
    "length": 30,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Neeru River",
        "Neeru Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Chenab River near Pul Doda",
      "Mouth_Latitude": 33.1415,
      "Mouth_Longitude": 75.5218,
      "Source_Location": "Kailash Kund, Bhaderwah range, Doda"
    }
  },
  {
    "id": "river-zanskar",
    "Legacy_ID": "river-zanskar",
    "slug": "zanskar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin. [Source: Confluence of Doda and Tsarap rivers near Padum]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "elevation": 3700,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Zanskar Tsangpo"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Indus River near Nimmu",
      "Mouth_Latitude": 34.1714,
      "Mouth_Longitude": 77.3328,
      "Source_Location": "Confluence of Doda and Tsarap rivers near Padum"
    }
  },
  {
    "id": "river-shyok",
    "Legacy_ID": "river-shyok",
    "slug": "shyok-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river. [Source: Rimo Glacier terminus, Karakoram range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "elevation": 5300,
    "area": null,
    "length": 550,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "River of Death",
        "Shyok Tsangpo"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River near Keris, Skardu (Pakistan-administered)",
      "Mouth_Latitude": 35.1818,
      "Mouth_Longitude": 76.1542,
      "Source_Location": "Rimo Glacier terminus, Karakoram range"
    }
  },
  {
    "id": "river-nubra",
    "Legacy_ID": "river-nubra",
    "slug": "nubra-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik). [Source: Siachen Glacier snout (Snout coordinates)]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "elevation": 5400,
    "area": null,
    "length": 80,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Siachen River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Shyok River near Lughzun",
      "Mouth_Latitude": 34.6055,
      "Mouth_Longitude": 77.5518,
      "Source_Location": "Siachen Glacier snout (Snout coordinates)"
    }
  },
  {
    "id": "river-suru",
    "Legacy_ID": "river-suru",
    "slug": "suru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif. [Source: Panzella Glacier near Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "elevation": 4400,
    "area": null,
    "length": 185,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Suru Tsangpo"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River near Nurla/Kargil border",
      "Mouth_Latitude": 34.5728,
      "Mouth_Longitude": 76.1518,
      "Source_Location": "Panzella Glacier near Pensi La Pass"
    }
  },
  {
    "id": "river-dras",
    "Legacy_ID": "river-dras",
    "slug": "dras-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "elevation": 3950,
    "area": null,
    "length": 86,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Dras Nallah",
        "Himalayan Dras"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Suru River near Kharul, Kargil",
      "Mouth_Latitude": 34.5618,
      "Mouth_Longitude": 76.2215,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "river-galwan",
    "Legacy_ID": "river-galwan",
    "slug": "galwan-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau. [Source: Samzungling, Aksai Chin plateau]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "elevation": 5200,
    "area": null,
    "length": 80,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Galwan Valley River"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.7655,
      "Mouth_Longitude": 77.9218,
      "Source_Location": "Samzungling, Aksai Chin plateau"
    }
  },
  {
    "id": "river-changchenmo",
    "Legacy_ID": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC). [Source: Aksai Chin boundary range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "elevation": 5500,
    "area": null,
    "length": 125,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Changchenmo Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.1742,
      "Mouth_Longitude": 78.1815,
      "Source_Location": "Aksai Chin boundary range"
    }
  },
  {
    "id": "river-hanle",
    "Legacy_ID": "river-hanle",
    "slug": "hanle-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone. [Source: High lakes of southern Changthang range near Hanle]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "elevation": 4800,
    "area": null,
    "length": 92,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Hanley Stream"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Indus River near Loma",
      "Mouth_Latitude": 33.1542,
      "Mouth_Longitude": 78.9818,
      "Source_Location": "High lakes of southern Changthang range near Hanle"
    }
  },
  {
    "id": "river-doda",
    "Legacy_ID": "river-doda",
    "slug": "doda-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road. [Source: Drang-Drung Glacier, Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "elevation": 4450,
    "area": null,
    "length": 79,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Stod River",
        "Doda Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Confluence with Tsarap River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Drang-Drung Glacier, Pensi La Pass"
    }
  },
  {
    "id": "river-tsarap",
    "Legacy_ID": "river-tsarap",
    "slug": "tsarap-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake. [Source: Pankpo La and alpine streams of Spiti border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "elevation": 4950,
    "area": null,
    "length": 182,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsarap Lingti Chu",
        "Tsarap Chu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Confluence with Doda River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Pankpo La and alpine streams of Spiti border"
    }
  },
  {
    "id": "river-jhelum-ajk",
    "Legacy_ID": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns. [Source: Chakothi border entry point (flowing from Kashmir Core)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "elevation": 1000,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum River AJK",
        "River Jhelum"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence at Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Chakothi border entry point (flowing from Kashmir Core)"
    }
  },
  {
    "id": "river-neelum",
    "Legacy_ID": "river-neelum",
    "slug": "neelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence. [Source: Gurez Valley border entry point (flowing from J&K)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "elevation": 2400,
    "area": null,
    "length": 245,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Kishanganga River",
        "Blue River"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Jhelum River confluence at Domel, Muzaffarabad",
      "Mouth_Latitude": 34.3648,
      "Mouth_Longitude": 73.4728,
      "Source_Location": "Gurez Valley border entry point (flowing from J&K)"
    }
  },
  {
    "id": "river-poonch",
    "Legacy_ID": "river-poonch",
    "slug": "poonch-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat. [Source: Pir Panjal Range (flowing from Poonch J&K border)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "elevation": 3500,
    "area": null,
    "length": 150,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Punch River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Mangla Dam Reservoir / Jhelum River",
      "Mouth_Latitude": 33.2282,
      "Mouth_Longitude": 73.7442,
      "Source_Location": "Pir Panjal Range (flowing from Poonch J&K border)"
    }
  },
  {
    "id": "river-kunhar",
    "Legacy_ID": "river-kunhar",
    "slug": "kunhar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin. [Source: Lulusar Lake, Kaghan Valley (KPK)]",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "AJK",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "elevation": 3405,
    "area": null,
    "length": 166,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Nain Sukh",
        "Kunhar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River confluence near Pattan, Muzaffarabad",
      "Mouth_Latitude": 34.2818,
      "Mouth_Longitude": 73.5222,
      "Source_Location": "Lulusar Lake, Kaghan Valley (KPK)"
    }
  },
  {
    "id": "nallah-shounter",
    "Legacy_ID": "nallah-shounter",
    "slug": "shounter-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate. [Source: Shounter Glacier / Hari Parbat slopes]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "elevation": 4200,
    "area": null,
    "length": 26,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Shounter Stream",
        "Shountar Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Neelum River near Kel",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Shounter Glacier / Hari Parbat slopes"
    }
  },
  {
    "id": "nallah-chittakatha",
    "Legacy_ID": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations. [Source: Chitta Katha Glacier / Hari Parbat Peak]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": null,
    "elevation": 4350,
    "area": null,
    "length": 14,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Chitta Katha Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Shounter Nallah",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Chitta Katha Glacier / Hari Parbat Peak"
    }
  },
  {
    "id": "nallah-dudipat",
    "Legacy_ID": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages. [Source: Dudipatsar Lake]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "elevation": 3800,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Dudipatsar Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Neelum River near Besal border",
      "Mouth_Latitude": 35.0515,
      "Mouth_Longitude": 74.0182,
      "Source_Location": "Dudipatsar Lake"
    }
  },
  {
    "id": "river-indus-gb",
    "Legacy_ID": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity. [Source: Ladakh boundary entry point near Demchok/Kargil border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "elevation": 2300,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Abasin",
        "Sindhu River"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Ladakh boundary entry point near Demchok/Kargil border"
    }
  },
  {
    "id": "river-hunza",
    "Legacy_ID": "river-hunza",
    "slug": "hunza-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake. [Source: Confluence of Chapursan and Kilik streams near Khunjerab Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "elevation": 4800,
    "area": null,
    "length": 190,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Hunza Nallah"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Gilgit River confluence near Gilgit",
      "Mouth_Latitude": 35.9082,
      "Mouth_Longitude": 74.3715,
      "Source_Location": "Confluence of Chapursan and Kilik streams near Khunjerab Pass"
    }
  },
  {
    "id": "river-gilgit",
    "Legacy_ID": "river-gilgit",
    "slug": "gilgit-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches. [Source: Shandur Lake and Hindu Kush snowfields]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "elevation": 3730,
    "area": null,
    "length": 240,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ghizer River (upper reaches)"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot/Bunji",
      "Mouth_Latitude": 35.7315,
      "Mouth_Longitude": 74.6228,
      "Source_Location": "Shandur Lake and Hindu Kush snowfields"
    }
  },
  {
    "id": "river-shigar",
    "Legacy_ID": "river-shigar",
    "slug": "shigar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers. [Source: Confluence of Braldu and Bashar rivers near Shigar Valley]",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "elevation": 3100,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shigar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence at Skardu",
      "Mouth_Latitude": 35.3328,
      "Mouth_Longitude": 75.6315,
      "Source_Location": "Confluence of Braldu and Bashar rivers near Shigar Valley"
    }
  },
  {
    "id": "river-astore",
    "Legacy_ID": "river-astore",
    "slug": "astore-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau. [Source: Burzil Pass / Deosai Plateau slopes]",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "elevation": 4100,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Astore Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot",
      "Mouth_Latitude": 35.7518,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Burzil Pass / Deosai Plateau slopes"
    }
  },
  {
    "id": "river-hispar",
    "Legacy_ID": "river-hispar",
    "slug": "hispar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier. [Source: Hispar Glacier snout]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "elevation": 4300,
    "area": null,
    "length": 48,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hispar Nallah",
        "Hispar Torrent"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Karimabad",
      "Mouth_Latitude": 36.3155,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Hispar Glacier snout"
    }
  },
  {
    "id": "river-shimshal",
    "Legacy_ID": "river-shimshal",
    "slug": "shimshal-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream. [Source: Shimshal Pass / Khurdopin Glacier]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "elevation": 4730,
    "area": null,
    "length": 82,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shimshal Nallah",
        "Shimshal Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Pasu",
      "Mouth_Latitude": 36.3115,
      "Mouth_Longitude": 74.8842,
      "Source_Location": "Shimshal Pass / Khurdopin Glacier"
    }
  },
  {
    "id": "river-rambiara",
    "Legacy_ID": "river-rambiara",
    "slug": "rambiara-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods. [Source: Pir Panjal range near Rupri Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "elevation": 4100,
    "area": null,
    "length": 58,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rambi Ara",
        "Rambiara Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Veshaw River near Sangam",
      "Mouth_Latitude": 33.7714,
      "Mouth_Longitude": 75.0782,
      "Source_Location": "Pir Panjal range near Rupri Pass"
    }
  },
  {
    "id": "river-doodhganga",
    "Legacy_ID": "river-doodhganga",
    "slug": "doodhganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream. [Source: Pir Panjal range near Chotigal Peak]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "elevation": 4200,
    "area": null,
    "length": 46,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Doodh Ganga",
        "Chhats Kol"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River at Srinagar (outflow near Safa Kadal)",
      "Mouth_Latitude": 34.0758,
      "Mouth_Longitude": 74.7742,
      "Source_Location": "Pir Panjal range near Chotigal Peak"
    }
  },
  {
    "id": "river-pohru",
    "Legacy_ID": "river-pohru",
    "slug": "pohru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla. [Source: Confluence of Lolab & Kahmil streams near Kupwara]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "elevation": 2300,
    "area": null,
    "length": 56,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Pru",
        "Pohra Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Doabgah near Sopore",
      "Mouth_Latitude": 34.3422,
      "Mouth_Longitude": 74.4282,
      "Source_Location": "Confluence of Lolab & Kahmil streams near Kupwara"
    }
  },
  {
    "id": "river-madhumati",
    "Legacy_ID": "river-madhumati",
    "slug": "madhumati-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt. [Source: Glacier slopes of Harmukh mountain range]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "elevation": 4100,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Madumati Nallah",
        "Madmati"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4255,
      "Mouth_Longitude": 74.6382,
      "Source_Location": "Glacier slopes of Harmukh mountain range"
    }
  },
  {
    "id": "river-erin",
    "Legacy_ID": "river-erin",
    "slug": "erin-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment. [Source: High-altitude glacier lakes near Harmukh]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "elevation": 3800,
    "area": null,
    "length": 32,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Erin Nallah",
        "Arin Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4082,
      "Mouth_Longitude": 74.6518,
      "Source_Location": "High-altitude glacier lakes near Harmukh"
    }
  },
  {
    "id": "river-sandran",
    "Legacy_ID": "river-sandran",
    "slug": "sandran-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting. [Source: Pir Panjal range near Sinthan Top]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "elevation": 3500,
    "area": null,
    "length": 42,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sandran Nallah",
        "Sandrin"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal",
      "Mouth_Latitude": 33.7258,
      "Mouth_Longitude": 75.1415,
      "Source_Location": "Pir Panjal range near Sinthan Top"
    }
  },
  {
    "id": "river-ningli",
    "Legacy_ID": "river-ningli",
    "slug": "ningli-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak. [Source: Alpather Lake, Gulmarg highlands]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "elevation": 3840,
    "area": null,
    "length": 36,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ningli Nallah",
        "Ningli River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Sopore",
      "Mouth_Latitude": 34.3182,
      "Mouth_Longitude": 74.4315,
      "Source_Location": "Alpather Lake, Gulmarg highlands"
    }
  },
  {
    "id": "river-shaliganga",
    "Legacy_ID": "river-shaliganga",
    "slug": "shaliganga-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort. [Source: Pir Panjal range near Tatakooti Peak]",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "elevation": 4100,
    "area": null,
    "length": 32,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Shali Ganga",
        "Shaliganga Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Doodhganga River near Budgam",
      "Mouth_Latitude": 34.0155,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Pir Panjal range near Tatakooti Peak"
    }
  },
  {
    "id": "river-ferozpora",
    "Legacy_ID": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland. [Source: Apharwat range near Gulmarg]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "elevation": 3800,
    "area": null,
    "length": 45,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ferozpur Nallah",
        "Ferozpora Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Shadipora",
      "Mouth_Latitude": 34.1855,
      "Mouth_Longitude": 74.6815,
      "Source_Location": "Apharwat range near Gulmarg"
    }
  },
  {
    "id": "river-sukhnag",
    "Legacy_ID": "river-sukhnag",
    "slug": "sukhnag-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream. [Source: Tosamaidan glacier springs]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "elevation": 3800,
    "area": null,
    "length": 52,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sukhnag Nallah",
        "Sukh Nag"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Shadipora",
      "Mouth_Latitude": 34.1782,
      "Mouth_Longitude": 74.6715,
      "Source_Location": "Tosamaidan glacier springs"
    }
  },
  {
    "id": "stream-tsuntkol",
    "Legacy_ID": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached. [Source: Dal Lake outflow at Dalgate, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "elevation": 1583,
    "area": null,
    "length": 3.5,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsunth Kol",
        "Chinar Canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Maisuma, Srinagar",
      "Mouth_Latitude": 34.0722,
      "Mouth_Longitude": 74.8118,
      "Source_Location": "Dal Lake outflow at Dalgate, Srinagar"
    }
  },
  {
    "id": "stream-braricumb",
    "Legacy_ID": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication. [Source: Brari Nambal Lagoon, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "elevation": 1583,
    "area": null,
    "length": 1.2,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brari Nambal Channel",
        "Baba Demb canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Fateh Kadal",
      "Mouth_Latitude": 34.0858,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Brari Nambal Lagoon, Srinagar"
    }
  },
  {
    "id": "channel-srinagarflood",
    "Legacy_ID": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "IFCD-JK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city. [Source: Jhelum River at Padgampora, Pulwama]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "elevation": 1590,
    "area": null,
    "length": 42,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum Flood Spill Channel",
        "FSC Jhelum"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Wular Lake at Naidkhai",
      "Mouth_Latitude": 34.4015,
      "Mouth_Longitude": 74.6018,
      "Source_Location": "Jhelum River at Padgampora, Pulwama"
    }
  },
  {
    "id": "river-chenab",
    "Legacy_ID": "river-chenab",
    "slug": "chenab-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar. [Source: Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "elevation": 2280,
    "area": null,
    "length": 960,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Chandrabhaga",
        "Asikni"
      ],
      "River_Order": 8,
      "Mouth_or_Confluence": "Indus River at Mithankot, Pakistan",
      "Mouth_Latitude": 28.9818,
      "Mouth_Longitude": 70.4815,
      "Source_Location": "Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)"
    }
  },
  {
    "id": "river-tawi",
    "Legacy_ID": "river-tawi",
    "slug": "tawi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks. [Source: Kali Kundi Glacier, Bhaderwah, Doda]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "elevation": 4000,
    "area": null,
    "length": 141,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jammu Tawi",
        "Tobia"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River in Punjab, Pakistan",
      "Mouth_Latitude": 32.1728,
      "Mouth_Longitude": 74.1542,
      "Source_Location": "Kali Kundi Glacier, Bhaderwah, Doda"
    }
  },
  {
    "id": "river-ravi",
    "Legacy_ID": "river-ravi",
    "slug": "ravi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua. [Source: Bara Bhangal, Dhauladhar range (HP)]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "elevation": 4200,
    "area": null,
    "length": 720,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Iravati",
        "Hydraotes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River near Ahmadpur Sial, Pakistan",
      "Mouth_Latitude": 30.6214,
      "Mouth_Longitude": 71.8218,
      "Source_Location": "Bara Bhangal, Dhauladhar range (HP)"
    }
  },
  {
    "id": "river-ujh",
    "Legacy_ID": "river-ujh",
    "slug": "ujh-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches. [Source: Kailash Mountains near Bhaderwah, Kathua border]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "elevation": 3200,
    "area": null,
    "length": 65,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ujh Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2582,
      "Mouth_Longitude": 75.3815,
      "Source_Location": "Kailash Mountains near Bhaderwah, Kathua border"
    }
  },
  {
    "id": "river-basantar",
    "Legacy_ID": "river-basantar",
    "slug": "basantar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971). [Source: Shivalik Hills near Ramkot, Samba]",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Jammu",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "elevation": 1200,
    "area": null,
    "length": 48,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Basantar Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2282,
      "Mouth_Longitude": 75.1215,
      "Source_Location": "Shivalik Hills near Ramkot, Samba"
    }
  },
  {
    "id": "river-munawartawi",
    "Legacy_ID": "river-munawartawi",
    "slug": "munawar-tawi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab. [Source: Pir Panjal Range in northern Rajouri (near Ratan Pir)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "elevation": 3500,
    "area": null,
    "length": 110,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rajouri Tawi",
        "Naushera Tawi"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Marala, Pakistan",
      "Mouth_Latitude": 32.6582,
      "Mouth_Longitude": 74.4518,
      "Source_Location": "Pir Panjal Range in northern Rajouri (near Ratan Pir)"
    }
  },
  {
    "id": "river-ans",
    "Legacy_ID": "river-ans",
    "slug": "ans-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley. [Source: Pir Panjal range near Budhal, Rajouri]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "elevation": 3800,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ans Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Chenab River near Reasi",
      "Mouth_Latitude": 33.1582,
      "Mouth_Longitude": 74.8815,
      "Source_Location": "Pir Panjal range near Budhal, Rajouri"
    }
  },
  {
    "id": "river-marusudar",
    "Legacy_ID": "river-marusudar",
    "slug": "marusudar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "CWC-INDIA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah. [Source: Lanakh Glacier, Kishtwar Himalayas]",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "elevation": 5100,
    "area": null,
    "length": 133,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Maru Sudar",
        "Sudar River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Bhandarkoot, Kishtwar",
      "Mouth_Latitude": 33.3282,
      "Mouth_Longitude": 75.7815,
      "Source_Location": "Lanakh Glacier, Kishtwar Himalayas"
    }
  },
  {
    "id": "river-devak",
    "Legacy_ID": "river-devak",
    "slug": "devak-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP). [Source: Shivalik Hills near Sudhmahadev, Udhampur]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "elevation": 1600,
    "area": null,
    "length": 55,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Devika River",
        "Gupt Ganga"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Basantar River near Samba",
      "Mouth_Latitude": 32.5518,
      "Mouth_Longitude": 75.0515,
      "Source_Location": "Shivalik Hills near Sudhmahadev, Udhampur"
    }
  },
  {
    "id": "river-neeru",
    "Legacy_ID": "river-neeru",
    "slug": "neeru-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course. [Source: Kailash Kund, Bhaderwah range, Doda]",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Jammu",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "elevation": 3900,
    "area": null,
    "length": 30,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Neeru River",
        "Neeru Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Chenab River near Pul Doda",
      "Mouth_Latitude": 33.1415,
      "Mouth_Longitude": 75.5218,
      "Source_Location": "Kailash Kund, Bhaderwah range, Doda"
    }
  },
  {
    "id": "river-zanskar",
    "Legacy_ID": "river-zanskar",
    "slug": "zanskar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin. [Source: Confluence of Doda and Tsarap rivers near Padum]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "elevation": 3700,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Zanskar Tsangpo"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Indus River near Nimmu",
      "Mouth_Latitude": 34.1714,
      "Mouth_Longitude": 77.3328,
      "Source_Location": "Confluence of Doda and Tsarap rivers near Padum"
    }
  },
  {
    "id": "river-shyok",
    "Legacy_ID": "river-shyok",
    "slug": "shyok-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river. [Source: Rimo Glacier terminus, Karakoram range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "elevation": 5300,
    "area": null,
    "length": 550,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "River of Death",
        "Shyok Tsangpo"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River near Keris, Skardu (Pakistan-administered)",
      "Mouth_Latitude": 35.1818,
      "Mouth_Longitude": 76.1542,
      "Source_Location": "Rimo Glacier terminus, Karakoram range"
    }
  },
  {
    "id": "river-nubra",
    "Legacy_ID": "river-nubra",
    "slug": "nubra-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik). [Source: Siachen Glacier snout (Snout coordinates)]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "elevation": 5400,
    "area": null,
    "length": 80,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Siachen River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Shyok River near Lughzun",
      "Mouth_Latitude": 34.6055,
      "Mouth_Longitude": 77.5518,
      "Source_Location": "Siachen Glacier snout (Snout coordinates)"
    }
  },
  {
    "id": "river-suru",
    "Legacy_ID": "river-suru",
    "slug": "suru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif. [Source: Panzella Glacier near Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "elevation": 4400,
    "area": null,
    "length": 185,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Suru Tsangpo"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River near Nurla/Kargil border",
      "Mouth_Latitude": 34.5728,
      "Mouth_Longitude": 76.1518,
      "Source_Location": "Panzella Glacier near Pensi La Pass"
    }
  },
  {
    "id": "river-dras",
    "Legacy_ID": "river-dras",
    "slug": "dras-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "elevation": 3950,
    "area": null,
    "length": 86,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Dras Nallah",
        "Himalayan Dras"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Suru River near Kharul, Kargil",
      "Mouth_Latitude": 34.5618,
      "Mouth_Longitude": 76.2215,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "river-galwan",
    "Legacy_ID": "river-galwan",
    "slug": "galwan-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau. [Source: Samzungling, Aksai Chin plateau]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "elevation": 5200,
    "area": null,
    "length": 80,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Galwan Valley River"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.7655,
      "Mouth_Longitude": 77.9218,
      "Source_Location": "Samzungling, Aksai Chin plateau"
    }
  },
  {
    "id": "river-changchenmo",
    "Legacy_ID": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC). [Source: Aksai Chin boundary range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "elevation": 5500,
    "area": null,
    "length": 125,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Changchenmo Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.1742,
      "Mouth_Longitude": 78.1815,
      "Source_Location": "Aksai Chin boundary range"
    }
  },
  {
    "id": "river-hanle",
    "Legacy_ID": "river-hanle",
    "slug": "hanle-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone. [Source: High lakes of southern Changthang range near Hanle]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "elevation": 4800,
    "area": null,
    "length": 92,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Hanley Stream"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Indus River near Loma",
      "Mouth_Latitude": 33.1542,
      "Mouth_Longitude": 78.9818,
      "Source_Location": "High lakes of southern Changthang range near Hanle"
    }
  },
  {
    "id": "river-doda",
    "Legacy_ID": "river-doda",
    "slug": "doda-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road. [Source: Drang-Drung Glacier, Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "elevation": 4450,
    "area": null,
    "length": 79,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Stod River",
        "Doda Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Confluence with Tsarap River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Drang-Drung Glacier, Pensi La Pass"
    }
  },
  {
    "id": "river-tsarap",
    "Legacy_ID": "river-tsarap",
    "slug": "tsarap-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake. [Source: Pankpo La and alpine streams of Spiti border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "elevation": 4950,
    "area": null,
    "length": 182,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsarap Lingti Chu",
        "Tsarap Chu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Confluence with Doda River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Pankpo La and alpine streams of Spiti border"
    }
  },
  {
    "id": "river-jhelum-ajk",
    "Legacy_ID": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns. [Source: Chakothi border entry point (flowing from Kashmir Core)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "elevation": 1000,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum River AJK",
        "River Jhelum"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence at Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Chakothi border entry point (flowing from Kashmir Core)"
    }
  },
  {
    "id": "river-neelum",
    "Legacy_ID": "river-neelum",
    "slug": "neelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence. [Source: Gurez Valley border entry point (flowing from J&K)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "elevation": 2400,
    "area": null,
    "length": 245,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Kishanganga River",
        "Blue River"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Jhelum River confluence at Domel, Muzaffarabad",
      "Mouth_Latitude": 34.3648,
      "Mouth_Longitude": 73.4728,
      "Source_Location": "Gurez Valley border entry point (flowing from J&K)"
    }
  },
  {
    "id": "river-poonch",
    "Legacy_ID": "river-poonch",
    "slug": "poonch-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat. [Source: Pir Panjal Range (flowing from Poonch J&K border)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "elevation": 3500,
    "area": null,
    "length": 150,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Punch River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Mangla Dam Reservoir / Jhelum River",
      "Mouth_Latitude": 33.2282,
      "Mouth_Longitude": 73.7442,
      "Source_Location": "Pir Panjal Range (flowing from Poonch J&K border)"
    }
  },
  {
    "id": "river-kunhar",
    "Legacy_ID": "river-kunhar",
    "slug": "kunhar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin. [Source: Lulusar Lake, Kaghan Valley (KPK)]",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "AJK",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "elevation": 3405,
    "area": null,
    "length": 166,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Nain Sukh",
        "Kunhar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River confluence near Pattan, Muzaffarabad",
      "Mouth_Latitude": 34.2818,
      "Mouth_Longitude": 73.5222,
      "Source_Location": "Lulusar Lake, Kaghan Valley (KPK)"
    }
  },
  {
    "id": "nallah-shounter",
    "Legacy_ID": "nallah-shounter",
    "slug": "shounter-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate. [Source: Shounter Glacier / Hari Parbat slopes]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "elevation": 4200,
    "area": null,
    "length": 26,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Shounter Stream",
        "Shountar Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Neelum River near Kel",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Shounter Glacier / Hari Parbat slopes"
    }
  },
  {
    "id": "nallah-chittakatha",
    "Legacy_ID": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations. [Source: Chitta Katha Glacier / Hari Parbat Peak]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": null,
    "elevation": 4350,
    "area": null,
    "length": 14,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Chitta Katha Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Shounter Nallah",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Chitta Katha Glacier / Hari Parbat Peak"
    }
  },
  {
    "id": "nallah-dudipat",
    "Legacy_ID": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages. [Source: Dudipatsar Lake]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "elevation": 3800,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Dudipatsar Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Neelum River near Besal border",
      "Mouth_Latitude": 35.0515,
      "Mouth_Longitude": 74.0182,
      "Source_Location": "Dudipatsar Lake"
    }
  },
  {
    "id": "river-indus-gb",
    "Legacy_ID": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity. [Source: Ladakh boundary entry point near Demchok/Kargil border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "elevation": 2300,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Abasin",
        "Sindhu River"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Ladakh boundary entry point near Demchok/Kargil border"
    }
  },
  {
    "id": "river-hunza",
    "Legacy_ID": "river-hunza",
    "slug": "hunza-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake. [Source: Confluence of Chapursan and Kilik streams near Khunjerab Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "elevation": 4800,
    "area": null,
    "length": 190,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Hunza Nallah"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Gilgit River confluence near Gilgit",
      "Mouth_Latitude": 35.9082,
      "Mouth_Longitude": 74.3715,
      "Source_Location": "Confluence of Chapursan and Kilik streams near Khunjerab Pass"
    }
  },
  {
    "id": "river-gilgit",
    "Legacy_ID": "river-gilgit",
    "slug": "gilgit-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches. [Source: Shandur Lake and Hindu Kush snowfields]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "elevation": 3730,
    "area": null,
    "length": 240,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ghizer River (upper reaches)"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot/Bunji",
      "Mouth_Latitude": 35.7315,
      "Mouth_Longitude": 74.6228,
      "Source_Location": "Shandur Lake and Hindu Kush snowfields"
    }
  },
  {
    "id": "river-shigar",
    "Legacy_ID": "river-shigar",
    "slug": "shigar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers. [Source: Confluence of Braldu and Bashar rivers near Shigar Valley]",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "elevation": 3100,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shigar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence at Skardu",
      "Mouth_Latitude": 35.3328,
      "Mouth_Longitude": 75.6315,
      "Source_Location": "Confluence of Braldu and Bashar rivers near Shigar Valley"
    }
  },
  {
    "id": "river-astore",
    "Legacy_ID": "river-astore",
    "slug": "astore-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau. [Source: Burzil Pass / Deosai Plateau slopes]",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "elevation": 4100,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Astore Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot",
      "Mouth_Latitude": 35.7518,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Burzil Pass / Deosai Plateau slopes"
    }
  },
  {
    "id": "river-hispar",
    "Legacy_ID": "river-hispar",
    "slug": "hispar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier. [Source: Hispar Glacier snout]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "elevation": 4300,
    "area": null,
    "length": 48,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hispar Nallah",
        "Hispar Torrent"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Karimabad",
      "Mouth_Latitude": 36.3155,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Hispar Glacier snout"
    }
  },
  {
    "id": "river-shimshal",
    "Legacy_ID": "river-shimshal",
    "slug": "shimshal-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream. [Source: Shimshal Pass / Khurdopin Glacier]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "elevation": 4730,
    "area": null,
    "length": 82,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shimshal Nallah",
        "Shimshal Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Pasu",
      "Mouth_Latitude": 36.3115,
      "Mouth_Longitude": 74.8842,
      "Source_Location": "Shimshal Pass / Khurdopin Glacier"
    }
  },
  {
    "id": "river-rambiara",
    "Legacy_ID": "river-rambiara",
    "slug": "rambiara-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods. [Source: Pir Panjal range near Rupri Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "elevation": 4100,
    "area": null,
    "length": 58,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rambi Ara",
        "Rambiara Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Veshaw River near Sangam",
      "Mouth_Latitude": 33.7714,
      "Mouth_Longitude": 75.0782,
      "Source_Location": "Pir Panjal range near Rupri Pass"
    }
  },
  {
    "id": "river-doodhganga",
    "Legacy_ID": "river-doodhganga",
    "slug": "doodhganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream. [Source: Pir Panjal range near Chotigal Peak]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "elevation": 4200,
    "area": null,
    "length": 46,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Doodh Ganga",
        "Chhats Kol"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River at Srinagar (outflow near Safa Kadal)",
      "Mouth_Latitude": 34.0758,
      "Mouth_Longitude": 74.7742,
      "Source_Location": "Pir Panjal range near Chotigal Peak"
    }
  },
  {
    "id": "river-pohru",
    "Legacy_ID": "river-pohru",
    "slug": "pohru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla. [Source: Confluence of Lolab & Kahmil streams near Kupwara]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "elevation": 2300,
    "area": null,
    "length": 56,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Pru",
        "Pohra Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Doabgah near Sopore",
      "Mouth_Latitude": 34.3422,
      "Mouth_Longitude": 74.4282,
      "Source_Location": "Confluence of Lolab & Kahmil streams near Kupwara"
    }
  },
  {
    "id": "river-madhumati",
    "Legacy_ID": "river-madhumati",
    "slug": "madhumati-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt. [Source: Glacier slopes of Harmukh mountain range]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "elevation": 4100,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Madumati Nallah",
        "Madmati"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4255,
      "Mouth_Longitude": 74.6382,
      "Source_Location": "Glacier slopes of Harmukh mountain range"
    }
  },
  {
    "id": "river-erin",
    "Legacy_ID": "river-erin",
    "slug": "erin-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment. [Source: High-altitude glacier lakes near Harmukh]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "elevation": 3800,
    "area": null,
    "length": 32,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Erin Nallah",
        "Arin Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4082,
      "Mouth_Longitude": 74.6518,
      "Source_Location": "High-altitude glacier lakes near Harmukh"
    }
  },
  {
    "id": "river-sandran",
    "Legacy_ID": "river-sandran",
    "slug": "sandran-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting. [Source: Pir Panjal range near Sinthan Top]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "elevation": 3500,
    "area": null,
    "length": 42,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sandran Nallah",
        "Sandrin"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal",
      "Mouth_Latitude": 33.7258,
      "Mouth_Longitude": 75.1415,
      "Source_Location": "Pir Panjal range near Sinthan Top"
    }
  },
  {
    "id": "river-ningli",
    "Legacy_ID": "river-ningli",
    "slug": "ningli-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak. [Source: Alpather Lake, Gulmarg highlands]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "elevation": 3840,
    "area": null,
    "length": 36,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ningli Nallah",
        "Ningli River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Sopore",
      "Mouth_Latitude": 34.3182,
      "Mouth_Longitude": 74.4315,
      "Source_Location": "Alpather Lake, Gulmarg highlands"
    }
  },
  {
    "id": "river-shaliganga",
    "Legacy_ID": "river-shaliganga",
    "slug": "shaliganga-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort. [Source: Pir Panjal range near Tatakooti Peak]",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "elevation": 4100,
    "area": null,
    "length": 32,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Shali Ganga",
        "Shaliganga Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Doodhganga River near Budgam",
      "Mouth_Latitude": 34.0155,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Pir Panjal range near Tatakooti Peak"
    }
  },
  {
    "id": "river-ferozpora",
    "Legacy_ID": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland. [Source: Apharwat range near Gulmarg]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "elevation": 3800,
    "area": null,
    "length": 45,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ferozpur Nallah",
        "Ferozpora Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Shadipora",
      "Mouth_Latitude": 34.1855,
      "Mouth_Longitude": 74.6815,
      "Source_Location": "Apharwat range near Gulmarg"
    }
  },
  {
    "id": "river-sukhnag",
    "Legacy_ID": "river-sukhnag",
    "slug": "sukhnag-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream. [Source: Tosamaidan glacier springs]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "elevation": 3800,
    "area": null,
    "length": 52,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sukhnag Nallah",
        "Sukh Nag"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Shadipora",
      "Mouth_Latitude": 34.1782,
      "Mouth_Longitude": 74.6715,
      "Source_Location": "Tosamaidan glacier springs"
    }
  },
  {
    "id": "stream-tsuntkol",
    "Legacy_ID": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached. [Source: Dal Lake outflow at Dalgate, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "elevation": 1583,
    "area": null,
    "length": 3.5,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsunth Kol",
        "Chinar Canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Maisuma, Srinagar",
      "Mouth_Latitude": 34.0722,
      "Mouth_Longitude": 74.8118,
      "Source_Location": "Dal Lake outflow at Dalgate, Srinagar"
    }
  },
  {
    "id": "stream-braricumb",
    "Legacy_ID": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication. [Source: Brari Nambal Lagoon, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "elevation": 1583,
    "area": null,
    "length": 1.2,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brari Nambal Channel",
        "Baba Demb canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Fateh Kadal",
      "Mouth_Latitude": 34.0858,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Brari Nambal Lagoon, Srinagar"
    }
  },
  {
    "id": "channel-srinagarflood",
    "Legacy_ID": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "IFCD-JK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city. [Source: Jhelum River at Padgampora, Pulwama]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "elevation": 1590,
    "area": null,
    "length": 42,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum Flood Spill Channel",
        "FSC Jhelum"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Wular Lake at Naidkhai",
      "Mouth_Latitude": 34.4015,
      "Mouth_Longitude": 74.6018,
      "Source_Location": "Jhelum River at Padgampora, Pulwama"
    }
  },
  {
    "id": "river-chenab",
    "Legacy_ID": "river-chenab",
    "slug": "chenab-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar. [Source: Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "elevation": 2280,
    "area": null,
    "length": 960,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Chandrabhaga",
        "Asikni"
      ],
      "River_Order": 8,
      "Mouth_or_Confluence": "Indus River at Mithankot, Pakistan",
      "Mouth_Latitude": 28.9818,
      "Mouth_Longitude": 70.4815,
      "Source_Location": "Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)"
    }
  },
  {
    "id": "river-tawi",
    "Legacy_ID": "river-tawi",
    "slug": "tawi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks. [Source: Kali Kundi Glacier, Bhaderwah, Doda]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "elevation": 4000,
    "area": null,
    "length": 141,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jammu Tawi",
        "Tobia"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River in Punjab, Pakistan",
      "Mouth_Latitude": 32.1728,
      "Mouth_Longitude": 74.1542,
      "Source_Location": "Kali Kundi Glacier, Bhaderwah, Doda"
    }
  },
  {
    "id": "river-ravi",
    "Legacy_ID": "river-ravi",
    "slug": "ravi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua. [Source: Bara Bhangal, Dhauladhar range (HP)]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "elevation": 4200,
    "area": null,
    "length": 720,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Iravati",
        "Hydraotes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River near Ahmadpur Sial, Pakistan",
      "Mouth_Latitude": 30.6214,
      "Mouth_Longitude": 71.8218,
      "Source_Location": "Bara Bhangal, Dhauladhar range (HP)"
    }
  },
  {
    "id": "river-ujh",
    "Legacy_ID": "river-ujh",
    "slug": "ujh-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches. [Source: Kailash Mountains near Bhaderwah, Kathua border]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "elevation": 3200,
    "area": null,
    "length": 65,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ujh Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2582,
      "Mouth_Longitude": 75.3815,
      "Source_Location": "Kailash Mountains near Bhaderwah, Kathua border"
    }
  },
  {
    "id": "river-basantar",
    "Legacy_ID": "river-basantar",
    "slug": "basantar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971). [Source: Shivalik Hills near Ramkot, Samba]",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Jammu",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "elevation": 1200,
    "area": null,
    "length": 48,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Basantar Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2282,
      "Mouth_Longitude": 75.1215,
      "Source_Location": "Shivalik Hills near Ramkot, Samba"
    }
  },
  {
    "id": "river-munawartawi",
    "Legacy_ID": "river-munawartawi",
    "slug": "munawar-tawi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab. [Source: Pir Panjal Range in northern Rajouri (near Ratan Pir)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "elevation": 3500,
    "area": null,
    "length": 110,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rajouri Tawi",
        "Naushera Tawi"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Marala, Pakistan",
      "Mouth_Latitude": 32.6582,
      "Mouth_Longitude": 74.4518,
      "Source_Location": "Pir Panjal Range in northern Rajouri (near Ratan Pir)"
    }
  },
  {
    "id": "river-ans",
    "Legacy_ID": "river-ans",
    "slug": "ans-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley. [Source: Pir Panjal range near Budhal, Rajouri]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "elevation": 3800,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ans Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Chenab River near Reasi",
      "Mouth_Latitude": 33.1582,
      "Mouth_Longitude": 74.8815,
      "Source_Location": "Pir Panjal range near Budhal, Rajouri"
    }
  },
  {
    "id": "river-marusudar",
    "Legacy_ID": "river-marusudar",
    "slug": "marusudar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "CWC-INDIA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah. [Source: Lanakh Glacier, Kishtwar Himalayas]",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "elevation": 5100,
    "area": null,
    "length": 133,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Maru Sudar",
        "Sudar River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Bhandarkoot, Kishtwar",
      "Mouth_Latitude": 33.3282,
      "Mouth_Longitude": 75.7815,
      "Source_Location": "Lanakh Glacier, Kishtwar Himalayas"
    }
  },
  {
    "id": "river-devak",
    "Legacy_ID": "river-devak",
    "slug": "devak-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP). [Source: Shivalik Hills near Sudhmahadev, Udhampur]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "elevation": 1600,
    "area": null,
    "length": 55,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Devika River",
        "Gupt Ganga"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Basantar River near Samba",
      "Mouth_Latitude": 32.5518,
      "Mouth_Longitude": 75.0515,
      "Source_Location": "Shivalik Hills near Sudhmahadev, Udhampur"
    }
  },
  {
    "id": "river-neeru",
    "Legacy_ID": "river-neeru",
    "slug": "neeru-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course. [Source: Kailash Kund, Bhaderwah range, Doda]",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Jammu",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "elevation": 3900,
    "area": null,
    "length": 30,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Neeru River",
        "Neeru Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Chenab River near Pul Doda",
      "Mouth_Latitude": 33.1415,
      "Mouth_Longitude": 75.5218,
      "Source_Location": "Kailash Kund, Bhaderwah range, Doda"
    }
  },
  {
    "id": "river-zanskar",
    "Legacy_ID": "river-zanskar",
    "slug": "zanskar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin. [Source: Confluence of Doda and Tsarap rivers near Padum]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "elevation": 3700,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Zanskar Tsangpo"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Indus River near Nimmu",
      "Mouth_Latitude": 34.1714,
      "Mouth_Longitude": 77.3328,
      "Source_Location": "Confluence of Doda and Tsarap rivers near Padum"
    }
  },
  {
    "id": "river-shyok",
    "Legacy_ID": "river-shyok",
    "slug": "shyok-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river. [Source: Rimo Glacier terminus, Karakoram range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "elevation": 5300,
    "area": null,
    "length": 550,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "River of Death",
        "Shyok Tsangpo"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River near Keris, Skardu (Pakistan-administered)",
      "Mouth_Latitude": 35.1818,
      "Mouth_Longitude": 76.1542,
      "Source_Location": "Rimo Glacier terminus, Karakoram range"
    }
  },
  {
    "id": "river-nubra",
    "Legacy_ID": "river-nubra",
    "slug": "nubra-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik). [Source: Siachen Glacier snout (Snout coordinates)]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "elevation": 5400,
    "area": null,
    "length": 80,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Siachen River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Shyok River near Lughzun",
      "Mouth_Latitude": 34.6055,
      "Mouth_Longitude": 77.5518,
      "Source_Location": "Siachen Glacier snout (Snout coordinates)"
    }
  },
  {
    "id": "river-suru",
    "Legacy_ID": "river-suru",
    "slug": "suru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif. [Source: Panzella Glacier near Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "elevation": 4400,
    "area": null,
    "length": 185,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Suru Tsangpo"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River near Nurla/Kargil border",
      "Mouth_Latitude": 34.5728,
      "Mouth_Longitude": 76.1518,
      "Source_Location": "Panzella Glacier near Pensi La Pass"
    }
  },
  {
    "id": "river-dras",
    "Legacy_ID": "river-dras",
    "slug": "dras-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "elevation": 3950,
    "area": null,
    "length": 86,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Dras Nallah",
        "Himalayan Dras"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Suru River near Kharul, Kargil",
      "Mouth_Latitude": 34.5618,
      "Mouth_Longitude": 76.2215,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "river-galwan",
    "Legacy_ID": "river-galwan",
    "slug": "galwan-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau. [Source: Samzungling, Aksai Chin plateau]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "elevation": 5200,
    "area": null,
    "length": 80,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Galwan Valley River"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.7655,
      "Mouth_Longitude": 77.9218,
      "Source_Location": "Samzungling, Aksai Chin plateau"
    }
  },
  {
    "id": "river-changchenmo",
    "Legacy_ID": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC). [Source: Aksai Chin boundary range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "elevation": 5500,
    "area": null,
    "length": 125,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Changchenmo Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.1742,
      "Mouth_Longitude": 78.1815,
      "Source_Location": "Aksai Chin boundary range"
    }
  },
  {
    "id": "river-hanle",
    "Legacy_ID": "river-hanle",
    "slug": "hanle-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone. [Source: High lakes of southern Changthang range near Hanle]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "elevation": 4800,
    "area": null,
    "length": 92,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Hanley Stream"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Indus River near Loma",
      "Mouth_Latitude": 33.1542,
      "Mouth_Longitude": 78.9818,
      "Source_Location": "High lakes of southern Changthang range near Hanle"
    }
  },
  {
    "id": "river-doda",
    "Legacy_ID": "river-doda",
    "slug": "doda-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road. [Source: Drang-Drung Glacier, Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "elevation": 4450,
    "area": null,
    "length": 79,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Stod River",
        "Doda Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Confluence with Tsarap River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Drang-Drung Glacier, Pensi La Pass"
    }
  },
  {
    "id": "river-tsarap",
    "Legacy_ID": "river-tsarap",
    "slug": "tsarap-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake. [Source: Pankpo La and alpine streams of Spiti border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "elevation": 4950,
    "area": null,
    "length": 182,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsarap Lingti Chu",
        "Tsarap Chu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Confluence with Doda River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Pankpo La and alpine streams of Spiti border"
    }
  },
  {
    "id": "river-jhelum-ajk",
    "Legacy_ID": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns. [Source: Chakothi border entry point (flowing from Kashmir Core)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "elevation": 1000,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum River AJK",
        "River Jhelum"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence at Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Chakothi border entry point (flowing from Kashmir Core)"
    }
  },
  {
    "id": "river-neelum",
    "Legacy_ID": "river-neelum",
    "slug": "neelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence. [Source: Gurez Valley border entry point (flowing from J&K)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "elevation": 2400,
    "area": null,
    "length": 245,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Kishanganga River",
        "Blue River"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Jhelum River confluence at Domel, Muzaffarabad",
      "Mouth_Latitude": 34.3648,
      "Mouth_Longitude": 73.4728,
      "Source_Location": "Gurez Valley border entry point (flowing from J&K)"
    }
  },
  {
    "id": "river-poonch",
    "Legacy_ID": "river-poonch",
    "slug": "poonch-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat. [Source: Pir Panjal Range (flowing from Poonch J&K border)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "elevation": 3500,
    "area": null,
    "length": 150,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Punch River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Mangla Dam Reservoir / Jhelum River",
      "Mouth_Latitude": 33.2282,
      "Mouth_Longitude": 73.7442,
      "Source_Location": "Pir Panjal Range (flowing from Poonch J&K border)"
    }
  },
  {
    "id": "river-kunhar",
    "Legacy_ID": "river-kunhar",
    "slug": "kunhar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin. [Source: Lulusar Lake, Kaghan Valley (KPK)]",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "AJK",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "elevation": 3405,
    "area": null,
    "length": 166,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Nain Sukh",
        "Kunhar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River confluence near Pattan, Muzaffarabad",
      "Mouth_Latitude": 34.2818,
      "Mouth_Longitude": 73.5222,
      "Source_Location": "Lulusar Lake, Kaghan Valley (KPK)"
    }
  },
  {
    "id": "nallah-shounter",
    "Legacy_ID": "nallah-shounter",
    "slug": "shounter-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate. [Source: Shounter Glacier / Hari Parbat slopes]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "elevation": 4200,
    "area": null,
    "length": 26,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Shounter Stream",
        "Shountar Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Neelum River near Kel",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Shounter Glacier / Hari Parbat slopes"
    }
  },
  {
    "id": "nallah-chittakatha",
    "Legacy_ID": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations. [Source: Chitta Katha Glacier / Hari Parbat Peak]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": null,
    "elevation": 4350,
    "area": null,
    "length": 14,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Chitta Katha Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Shounter Nallah",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Chitta Katha Glacier / Hari Parbat Peak"
    }
  },
  {
    "id": "nallah-dudipat",
    "Legacy_ID": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages. [Source: Dudipatsar Lake]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "elevation": 3800,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Dudipatsar Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Neelum River near Besal border",
      "Mouth_Latitude": 35.0515,
      "Mouth_Longitude": 74.0182,
      "Source_Location": "Dudipatsar Lake"
    }
  },
  {
    "id": "river-indus-gb",
    "Legacy_ID": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity. [Source: Ladakh boundary entry point near Demchok/Kargil border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "elevation": 2300,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Abasin",
        "Sindhu River"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Ladakh boundary entry point near Demchok/Kargil border"
    }
  },
  {
    "id": "river-hunza",
    "Legacy_ID": "river-hunza",
    "slug": "hunza-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake. [Source: Confluence of Chapursan and Kilik streams near Khunjerab Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "elevation": 4800,
    "area": null,
    "length": 190,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Hunza Nallah"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Gilgit River confluence near Gilgit",
      "Mouth_Latitude": 35.9082,
      "Mouth_Longitude": 74.3715,
      "Source_Location": "Confluence of Chapursan and Kilik streams near Khunjerab Pass"
    }
  },
  {
    "id": "river-gilgit",
    "Legacy_ID": "river-gilgit",
    "slug": "gilgit-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches. [Source: Shandur Lake and Hindu Kush snowfields]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "elevation": 3730,
    "area": null,
    "length": 240,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ghizer River (upper reaches)"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot/Bunji",
      "Mouth_Latitude": 35.7315,
      "Mouth_Longitude": 74.6228,
      "Source_Location": "Shandur Lake and Hindu Kush snowfields"
    }
  },
  {
    "id": "river-shigar",
    "Legacy_ID": "river-shigar",
    "slug": "shigar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers. [Source: Confluence of Braldu and Bashar rivers near Shigar Valley]",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "elevation": 3100,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shigar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence at Skardu",
      "Mouth_Latitude": 35.3328,
      "Mouth_Longitude": 75.6315,
      "Source_Location": "Confluence of Braldu and Bashar rivers near Shigar Valley"
    }
  },
  {
    "id": "river-astore",
    "Legacy_ID": "river-astore",
    "slug": "astore-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau. [Source: Burzil Pass / Deosai Plateau slopes]",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "elevation": 4100,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Astore Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot",
      "Mouth_Latitude": 35.7518,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Burzil Pass / Deosai Plateau slopes"
    }
  },
  {
    "id": "river-hispar",
    "Legacy_ID": "river-hispar",
    "slug": "hispar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier. [Source: Hispar Glacier snout]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "elevation": 4300,
    "area": null,
    "length": 48,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hispar Nallah",
        "Hispar Torrent"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Karimabad",
      "Mouth_Latitude": 36.3155,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Hispar Glacier snout"
    }
  },
  {
    "id": "river-shimshal",
    "Legacy_ID": "river-shimshal",
    "slug": "shimshal-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream. [Source: Shimshal Pass / Khurdopin Glacier]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "elevation": 4730,
    "area": null,
    "length": 82,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shimshal Nallah",
        "Shimshal Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Pasu",
      "Mouth_Latitude": 36.3115,
      "Mouth_Longitude": 74.8842,
      "Source_Location": "Shimshal Pass / Khurdopin Glacier"
    }
  },
  {
    "id": "river-rambiara",
    "Legacy_ID": "river-rambiara",
    "slug": "rambiara-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods. [Source: Pir Panjal range near Rupri Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "elevation": 4100,
    "area": null,
    "length": 58,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rambi Ara",
        "Rambiara Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Veshaw River near Sangam",
      "Mouth_Latitude": 33.7714,
      "Mouth_Longitude": 75.0782,
      "Source_Location": "Pir Panjal range near Rupri Pass"
    }
  },
  {
    "id": "river-doodhganga",
    "Legacy_ID": "river-doodhganga",
    "slug": "doodhganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream. [Source: Pir Panjal range near Chotigal Peak]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "elevation": 4200,
    "area": null,
    "length": 46,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Doodh Ganga",
        "Chhats Kol"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River at Srinagar (outflow near Safa Kadal)",
      "Mouth_Latitude": 34.0758,
      "Mouth_Longitude": 74.7742,
      "Source_Location": "Pir Panjal range near Chotigal Peak"
    }
  },
  {
    "id": "river-pohru",
    "Legacy_ID": "river-pohru",
    "slug": "pohru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla. [Source: Confluence of Lolab & Kahmil streams near Kupwara]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "elevation": 2300,
    "area": null,
    "length": 56,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Pru",
        "Pohra Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River at Doabgah near Sopore",
      "Mouth_Latitude": 34.3422,
      "Mouth_Longitude": 74.4282,
      "Source_Location": "Confluence of Lolab & Kahmil streams near Kupwara"
    }
  },
  {
    "id": "river-madhumati",
    "Legacy_ID": "river-madhumati",
    "slug": "madhumati-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt. [Source: Glacier slopes of Harmukh mountain range]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "elevation": 4100,
    "area": null,
    "length": 38,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Madumati Nallah",
        "Madmati"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4255,
      "Mouth_Longitude": 74.6382,
      "Source_Location": "Glacier slopes of Harmukh mountain range"
    }
  },
  {
    "id": "river-erin",
    "Legacy_ID": "river-erin",
    "slug": "erin-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment. [Source: High-altitude glacier lakes near Harmukh]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "elevation": 3800,
    "area": null,
    "length": 32,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Erin Nallah",
        "Arin Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Wular Lake at Bandipora",
      "Mouth_Latitude": 34.4082,
      "Mouth_Longitude": 74.6518,
      "Source_Location": "High-altitude glacier lakes near Harmukh"
    }
  },
  {
    "id": "river-sandran",
    "Legacy_ID": "river-sandran",
    "slug": "sandran-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting. [Source: Pir Panjal range near Sinthan Top]",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "elevation": 3500,
    "area": null,
    "length": 42,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sandran Nallah",
        "Sandrin"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Khanabal",
      "Mouth_Latitude": 33.7258,
      "Mouth_Longitude": 75.1415,
      "Source_Location": "Pir Panjal range near Sinthan Top"
    }
  },
  {
    "id": "river-ningli",
    "Legacy_ID": "river-ningli",
    "slug": "ningli-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak. [Source: Alpather Lake, Gulmarg highlands]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "elevation": 3840,
    "area": null,
    "length": 36,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ningli Nallah",
        "Ningli River"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Sopore",
      "Mouth_Latitude": 34.3182,
      "Mouth_Longitude": 74.4315,
      "Source_Location": "Alpather Lake, Gulmarg highlands"
    }
  },
  {
    "id": "river-shaliganga",
    "Legacy_ID": "river-shaliganga",
    "slug": "shaliganga-stream",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKDEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort. [Source: Pir Panjal range near Tatakooti Peak]",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "elevation": 4100,
    "area": null,
    "length": 32,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Shali Ganga",
        "Shaliganga Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Doodhganga River near Budgam",
      "Mouth_Latitude": 34.0155,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Pir Panjal range near Tatakooti Peak"
    }
  },
  {
    "id": "river-ferozpora",
    "Legacy_ID": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland. [Source: Apharwat range near Gulmarg]",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "elevation": 3800,
    "area": null,
    "length": 45,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ferozpur Nallah",
        "Ferozpora Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Jhelum River at Shadipora",
      "Mouth_Latitude": 34.1855,
      "Mouth_Longitude": 74.6815,
      "Source_Location": "Apharwat range near Gulmarg"
    }
  },
  {
    "id": "river-sukhnag",
    "Legacy_ID": "river-sukhnag",
    "slug": "sukhnag-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream. [Source: Tosamaidan glacier springs]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "elevation": 3800,
    "area": null,
    "length": 52,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Sukhnag Nallah",
        "Sukh Nag"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Jhelum River near Shadipora",
      "Mouth_Latitude": 34.1782,
      "Mouth_Longitude": 74.6715,
      "Source_Location": "Tosamaidan glacier springs"
    }
  },
  {
    "id": "stream-tsuntkol",
    "Legacy_ID": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached. [Source: Dal Lake outflow at Dalgate, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "elevation": 1583,
    "area": null,
    "length": 3.5,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsunth Kol",
        "Chinar Canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Maisuma, Srinagar",
      "Mouth_Latitude": 34.0722,
      "Mouth_Longitude": 74.8118,
      "Source_Location": "Dal Lake outflow at Dalgate, Srinagar"
    }
  },
  {
    "id": "stream-braricumb",
    "Legacy_ID": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKLCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication. [Source: Brari Nambal Lagoon, Srinagar]",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "elevation": 1583,
    "area": null,
    "length": 1.2,
    "waterQuality_status": "critical",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Brari Nambal Channel",
        "Baba Demb canal"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Jhelum River near Fateh Kadal",
      "Mouth_Latitude": 34.0858,
      "Mouth_Longitude": 74.8082,
      "Source_Location": "Brari Nambal Lagoon, Srinagar"
    }
  },
  {
    "id": "channel-srinagarflood",
    "Legacy_ID": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "IFCD-JK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city. [Source: Jhelum River at Padgampora, Pulwama]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "elevation": 1590,
    "area": null,
    "length": 42,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum Flood Spill Channel",
        "FSC Jhelum"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Wular Lake at Naidkhai",
      "Mouth_Latitude": 34.4015,
      "Mouth_Longitude": 74.6018,
      "Source_Location": "Jhelum River at Padgampora, Pulwama"
    }
  },
  {
    "id": "river-chenab",
    "Legacy_ID": "river-chenab",
    "slug": "chenab-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar. [Source: Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "elevation": 2280,
    "area": null,
    "length": 960,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Chandrabhaga",
        "Asikni"
      ],
      "River_Order": 8,
      "Mouth_or_Confluence": "Indus River at Mithankot, Pakistan",
      "Mouth_Latitude": 28.9818,
      "Mouth_Longitude": 70.4815,
      "Source_Location": "Confluence of Chandra & Bhaga rivers at Tandi, Lahaul (HP)"
    }
  },
  {
    "id": "river-tawi",
    "Legacy_ID": "river-tawi",
    "slug": "tawi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks. [Source: Kali Kundi Glacier, Bhaderwah, Doda]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "elevation": 4000,
    "area": null,
    "length": 141,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jammu Tawi",
        "Tobia"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River in Punjab, Pakistan",
      "Mouth_Latitude": 32.1728,
      "Mouth_Longitude": 74.1542,
      "Source_Location": "Kali Kundi Glacier, Bhaderwah, Doda"
    }
  },
  {
    "id": "river-ravi",
    "Legacy_ID": "river-ravi",
    "slug": "ravi-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua. [Source: Bara Bhangal, Dhauladhar range (HP)]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "elevation": 4200,
    "area": null,
    "length": 720,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Iravati",
        "Hydraotes"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River near Ahmadpur Sial, Pakistan",
      "Mouth_Latitude": 30.6214,
      "Mouth_Longitude": 71.8218,
      "Source_Location": "Bara Bhangal, Dhauladhar range (HP)"
    }
  },
  {
    "id": "river-ujh",
    "Legacy_ID": "river-ujh",
    "slug": "ujh-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches. [Source: Kailash Mountains near Bhaderwah, Kathua border]",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "elevation": 3200,
    "area": null,
    "length": 65,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Ujh Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2582,
      "Mouth_Longitude": 75.3815,
      "Source_Location": "Kailash Mountains near Bhaderwah, Kathua border"
    }
  },
  {
    "id": "river-basantar",
    "Legacy_ID": "river-basantar",
    "slug": "basantar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971). [Source: Shivalik Hills near Ramkot, Samba]",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Jammu",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "elevation": 1200,
    "area": null,
    "length": 48,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Basantar Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Ravi River, Pakistan",
      "Mouth_Latitude": 32.2282,
      "Mouth_Longitude": 75.1215,
      "Source_Location": "Shivalik Hills near Ramkot, Samba"
    }
  },
  {
    "id": "river-munawartawi",
    "Legacy_ID": "river-munawartawi",
    "slug": "munawar-tawi",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab. [Source: Pir Panjal Range in northern Rajouri (near Ratan Pir)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "elevation": 3500,
    "area": null,
    "length": 110,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Rajouri Tawi",
        "Naushera Tawi"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Marala, Pakistan",
      "Mouth_Latitude": 32.6582,
      "Mouth_Longitude": 74.4518,
      "Source_Location": "Pir Panjal Range in northern Rajouri (near Ratan Pir)"
    }
  },
  {
    "id": "river-ans",
    "Legacy_ID": "river-ans",
    "slug": "ans-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley. [Source: Pir Panjal range near Budhal, Rajouri]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "elevation": 3800,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ans Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Chenab River near Reasi",
      "Mouth_Latitude": 33.1582,
      "Mouth_Longitude": 74.8815,
      "Source_Location": "Pir Panjal range near Budhal, Rajouri"
    }
  },
  {
    "id": "river-marusudar",
    "Legacy_ID": "river-marusudar",
    "slug": "marusudar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "CWC-INDIA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah. [Source: Lanakh Glacier, Kishtwar Himalayas]",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Jammu",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "elevation": 5100,
    "area": null,
    "length": 133,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Maru Sudar",
        "Sudar River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Chenab River near Bhandarkoot, Kishtwar",
      "Mouth_Latitude": 33.3282,
      "Mouth_Longitude": 75.7815,
      "Source_Location": "Lanakh Glacier, Kishtwar Himalayas"
    }
  },
  {
    "id": "river-devak",
    "Legacy_ID": "river-devak",
    "slug": "devak-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "JKPCC",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP). [Source: Shivalik Hills near Sudhmahadev, Udhampur]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Jammu",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "elevation": 1600,
    "area": null,
    "length": 55,
    "waterQuality_status": "poor",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Devika River",
        "Gupt Ganga"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Basantar River near Samba",
      "Mouth_Latitude": 32.5518,
      "Mouth_Longitude": 75.0515,
      "Source_Location": "Shivalik Hills near Sudhmahadev, Udhampur"
    }
  },
  {
    "id": "river-neeru",
    "Legacy_ID": "river-neeru",
    "slug": "neeru-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "UOK-EARTH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course. [Source: Kailash Kund, Bhaderwah range, Doda]",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Jammu",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "elevation": 3900,
    "area": null,
    "length": 30,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Jammu",
      "Alternative_Names": [
        "Neeru River",
        "Neeru Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Chenab River near Pul Doda",
      "Mouth_Latitude": 33.1415,
      "Mouth_Longitude": 75.5218,
      "Source_Location": "Kailash Kund, Bhaderwah range, Doda"
    }
  },
  {
    "id": "river-zanskar",
    "Legacy_ID": "river-zanskar",
    "slug": "zanskar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin. [Source: Confluence of Doda and Tsarap rivers near Padum]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "elevation": 3700,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Zanskar Tsangpo"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Indus River near Nimmu",
      "Mouth_Latitude": 34.1714,
      "Mouth_Longitude": 77.3328,
      "Source_Location": "Confluence of Doda and Tsarap rivers near Padum"
    }
  },
  {
    "id": "river-shyok",
    "Legacy_ID": "river-shyok",
    "slug": "shyok-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river. [Source: Rimo Glacier terminus, Karakoram range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "elevation": 5300,
    "area": null,
    "length": 550,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "River of Death",
        "Shyok Tsangpo"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River near Keris, Skardu (Pakistan-administered)",
      "Mouth_Latitude": 35.1818,
      "Mouth_Longitude": 76.1542,
      "Source_Location": "Rimo Glacier terminus, Karakoram range"
    }
  },
  {
    "id": "river-nubra",
    "Legacy_ID": "river-nubra",
    "slug": "nubra-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ICIMOD-HKH",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik). [Source: Siachen Glacier snout (Snout coordinates)]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "elevation": 5400,
    "area": null,
    "length": 80,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Siachen River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Shyok River near Lughzun",
      "Mouth_Latitude": 34.6055,
      "Mouth_Longitude": 77.5518,
      "Source_Location": "Siachen Glacier snout (Snout coordinates)"
    }
  },
  {
    "id": "river-suru",
    "Legacy_ID": "river-suru",
    "slug": "suru-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif. [Source: Panzella Glacier near Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "elevation": 4400,
    "area": null,
    "length": 185,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Suru Tsangpo"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River near Nurla/Kargil border",
      "Mouth_Latitude": 34.5728,
      "Mouth_Longitude": 76.1518,
      "Source_Location": "Panzella Glacier near Pensi La Pass"
    }
  },
  {
    "id": "river-dras",
    "Legacy_ID": "river-dras",
    "slug": "dras-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control. [Source: Machoi Glacier near Zoji La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "elevation": 3950,
    "area": null,
    "length": 86,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Dras Nallah",
        "Himalayan Dras"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Suru River near Kharul, Kargil",
      "Mouth_Latitude": 34.5618,
      "Mouth_Longitude": 76.2215,
      "Source_Location": "Machoi Glacier near Zoji La Pass"
    }
  },
  {
    "id": "river-galwan",
    "Legacy_ID": "river-galwan",
    "slug": "galwan-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau. [Source: Samzungling, Aksai Chin plateau]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "elevation": 5200,
    "area": null,
    "length": 80,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Galwan Valley River"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.7655,
      "Mouth_Longitude": 77.9218,
      "Source_Location": "Samzungling, Aksai Chin plateau"
    }
  },
  {
    "id": "river-changchenmo",
    "Legacy_ID": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "ISRO-BHUVAN",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC). [Source: Aksai Chin boundary range]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "elevation": 5500,
    "area": null,
    "length": 125,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Changchenmo Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Shyok River confluence",
      "Mouth_Latitude": 34.1742,
      "Mouth_Longitude": 78.1815,
      "Source_Location": "Aksai Chin boundary range"
    }
  },
  {
    "id": "river-hanle",
    "Legacy_ID": "river-hanle",
    "slug": "hanle-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone. [Source: High lakes of southern Changthang range near Hanle]",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "elevation": 4800,
    "area": null,
    "length": 92,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Hanley Stream"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Indus River near Loma",
      "Mouth_Latitude": 33.1542,
      "Mouth_Longitude": 78.9818,
      "Source_Location": "High lakes of southern Changthang range near Hanle"
    }
  },
  {
    "id": "river-doda",
    "Legacy_ID": "river-doda",
    "slug": "doda-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road. [Source: Drang-Drung Glacier, Pensi La Pass]",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "elevation": 4450,
    "area": null,
    "length": 79,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Ladakh",
      "Alternative_Names": [
        "Stod River",
        "Doda Nallah"
      ],
      "River_Order": 3,
      "Mouth_or_Confluence": "Confluence with Tsarap River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Drang-Drung Glacier, Pensi La Pass"
    }
  },
  {
    "id": "river-tsarap",
    "Legacy_ID": "river-tsarap",
    "slug": "tsarap-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "INDIA-WRIS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake. [Source: Pankpo La and alpine streams of Spiti border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Ladakh",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "elevation": 4950,
    "area": null,
    "length": 182,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Tsarap Lingti Chu",
        "Tsarap Chu"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Confluence with Doda River at Padum to form Zanskar River",
      "Mouth_Latitude": 33.4755,
      "Mouth_Longitude": 76.8818,
      "Source_Location": "Pankpo La and alpine streams of Spiti border"
    }
  },
  {
    "id": "river-jhelum-ajk",
    "Legacy_ID": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns. [Source: Chakothi border entry point (flowing from Kashmir Core)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "elevation": 1000,
    "area": null,
    "length": 725,
    "waterQuality_status": "moderate",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Jhelum River AJK",
        "River Jhelum"
      ],
      "River_Order": 7,
      "Mouth_or_Confluence": "Chenab River confluence at Trimmu, Pakistan",
      "Mouth_Latitude": 31.1714,
      "Mouth_Longitude": 72.1528,
      "Source_Location": "Chakothi border entry point (flowing from Kashmir Core)"
    }
  },
  {
    "id": "river-neelum",
    "Legacy_ID": "river-neelum",
    "slug": "neelum-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence. [Source: Gurez Valley border entry point (flowing from J&K)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "elevation": 2400,
    "area": null,
    "length": 245,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Kishanganga River",
        "Blue River"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Jhelum River confluence at Domel, Muzaffarabad",
      "Mouth_Latitude": 34.3648,
      "Mouth_Longitude": 73.4728,
      "Source_Location": "Gurez Valley border entry point (flowing from J&K)"
    }
  },
  {
    "id": "river-poonch",
    "Legacy_ID": "river-poonch",
    "slug": "poonch-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat. [Source: Pir Panjal Range (flowing from Poonch J&K border)]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "AJK",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "elevation": 3500,
    "area": null,
    "length": 150,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Punch River"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Mangla Dam Reservoir / Jhelum River",
      "Mouth_Latitude": 33.2282,
      "Mouth_Longitude": 73.7442,
      "Source_Location": "Pir Panjal Range (flowing from Poonch J&K border)"
    }
  },
  {
    "id": "river-kunhar",
    "Legacy_ID": "river-kunhar",
    "slug": "kunhar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin. [Source: Lulusar Lake, Kaghan Valley (KPK)]",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "AJK",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "elevation": 3405,
    "area": null,
    "length": 166,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Nain Sukh",
        "Kunhar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Jhelum River confluence near Pattan, Muzaffarabad",
      "Mouth_Latitude": 34.2818,
      "Mouth_Longitude": 73.5222,
      "Source_Location": "Lulusar Lake, Kaghan Valley (KPK)"
    }
  },
  {
    "id": "nallah-shounter",
    "Legacy_ID": "nallah-shounter",
    "slug": "shounter-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate. [Source: Shounter Glacier / Hari Parbat slopes]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "elevation": 4200,
    "area": null,
    "length": 26,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Shounter Stream",
        "Shountar Nallah"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Neelum River near Kel",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Shounter Glacier / Hari Parbat slopes"
    }
  },
  {
    "id": "nallah-chittakatha",
    "Legacy_ID": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations. [Source: Chitta Katha Glacier / Hari Parbat Peak]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": null,
    "elevation": 4350,
    "area": null,
    "length": 14,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Chitta Katha Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Shounter Nallah",
      "Mouth_Latitude": "Source Required",
      "Mouth_Longitude": "Source Required",
      "Source_Location": "Chitta Katha Glacier / Hari Parbat Peak"
    }
  },
  {
    "id": "nallah-dudipat",
    "Legacy_ID": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "PCRWR-PK",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages. [Source: Dudipatsar Lake]",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "AJK",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "elevation": 3800,
    "area": null,
    "length": null,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "AJK",
      "Alternative_Names": [
        "Dudipatsar Stream"
      ],
      "River_Order": 1,
      "Mouth_or_Confluence": "Neelum River near Besal border",
      "Mouth_Latitude": 35.0515,
      "Mouth_Longitude": 74.0182,
      "Source_Location": "Dudipatsar Lake"
    }
  },
  {
    "id": "river-indus-gb",
    "Legacy_ID": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity. [Source: Ladakh boundary entry point near Demchok/Kargil border]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "elevation": 2300,
    "area": null,
    "length": 3180,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Abasin",
        "Sindhu River"
      ],
      "River_Order": 9,
      "Mouth_or_Confluence": "Arabian Sea near Karachi, Pakistan",
      "Mouth_Latitude": 23.9714,
      "Mouth_Longitude": 67.4328,
      "Source_Location": "Ladakh boundary entry point near Demchok/Kargil border"
    }
  },
  {
    "id": "river-hunza",
    "Legacy_ID": "river-hunza",
    "slug": "hunza-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake. [Source: Confluence of Chapursan and Kilik streams near Khunjerab Pass]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "elevation": 4800,
    "area": null,
    "length": 190,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Hunza Nallah"
      ],
      "River_Order": 5,
      "Mouth_or_Confluence": "Gilgit River confluence near Gilgit",
      "Mouth_Latitude": 35.9082,
      "Mouth_Longitude": 74.3715,
      "Source_Location": "Confluence of Chapursan and Kilik streams near Khunjerab Pass"
    }
  },
  {
    "id": "river-gilgit",
    "Legacy_ID": "river-gilgit",
    "slug": "gilgit-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches. [Source: Shandur Lake and Hindu Kush snowfields]",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "elevation": 3730,
    "area": null,
    "length": 240,
    "waterQuality_status": "good",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Kashmir Core",
      "Alternative_Names": [
        "Ghizer River (upper reaches)"
      ],
      "River_Order": 6,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot/Bunji",
      "Mouth_Latitude": 35.7315,
      "Mouth_Longitude": 74.6228,
      "Source_Location": "Shandur Lake and Hindu Kush snowfields"
    }
  },
  {
    "id": "river-shigar",
    "Legacy_ID": "river-shigar",
    "slug": "shigar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers. [Source: Confluence of Braldu and Bashar rivers near Shigar Valley]",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "elevation": 3100,
    "area": null,
    "length": 62,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shigar Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence at Skardu",
      "Mouth_Latitude": 35.3328,
      "Mouth_Longitude": 75.6315,
      "Source_Location": "Confluence of Braldu and Bashar rivers near Shigar Valley"
    }
  },
  {
    "id": "river-astore",
    "Legacy_ID": "river-astore",
    "slug": "astore-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "WAPDA-PK",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau. [Source: Burzil Pass / Deosai Plateau slopes]",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "elevation": 4100,
    "area": null,
    "length": 120,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Astore Nallah"
      ],
      "River_Order": 4,
      "Mouth_or_Confluence": "Indus River confluence near Jaglot",
      "Mouth_Latitude": 35.7518,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Burzil Pass / Deosai Plateau slopes"
    }
  },
  {
    "id": "river-hispar",
    "Legacy_ID": "river-hispar",
    "slug": "hispar-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier. [Source: Hispar Glacier snout]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "elevation": 4300,
    "area": null,
    "length": 48,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Hispar Nallah",
        "Hispar Torrent"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Karimabad",
      "Mouth_Latitude": 36.3155,
      "Mouth_Longitude": 74.6542,
      "Source_Location": "Hispar Glacier snout"
    }
  },
  {
    "id": "river-shimshal",
    "Legacy_ID": "river-shimshal",
    "slug": "shimshal-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "GB-EPA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream. [Source: Shimshal Pass / Khurdopin Glacier]",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Gilgit-Baltistan",
    "district": "Hunza",
    "watershed": "Data Pending",
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "elevation": 4730,
    "area": null,
    "length": 82,
    "waterQuality_status": "excellent",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Gilgit-Baltistan",
      "Alternative_Names": [
        "Shimshal Nallah",
        "Shimshal Stream"
      ],
      "River_Order": 2,
      "Mouth_or_Confluence": "Hunza River confluence near Pasu",
      "Mouth_Latitude": 36.3115,
      "Mouth_Longitude": 74.8842,
      "Source_Location": "Shimshal Pass / Khurdopin Glacier"
    }
  },
  {
    "id": "kishanganga-river",
    "Legacy_ID": "kishanganga-river",
    "slug": "kishanganga-river",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Pending Verification",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.345Z",
    "name": "Kishanganga River",
    "type": "river",
    "category": "Major Tributary",
    "description": "Major tributary of Jhelum. Flows through Gurez Valley. Important for hydropower and local ecology. Transboundary river with Pakistan. [Source: Legacy Data]",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Cross-District",
    "district": "Bandipora",
    "watershed": "Kishanganga Basin",
    "coordinates": {
      "lat": 34.65,
      "lng": 74.75
    },
    "elevation": 2800,
    "area": null,
    "length": 245,
    "waterQuality_status": "good",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of source coordinates or length",
    "Legacy_Metadata": {
      "region": "Kashmir Core"
    }
  }
];
