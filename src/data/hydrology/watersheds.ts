// Kashmir Eco Watch — Hydrology Database: WATERSHEDS
// Migration Status: Legacy Imported → Pending Verification
// Generated: 2026-06-16T16:28:50.849Z
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const watershedsRecords: MigratedWaterRecord[] = [
  {
    "id": "jhelum-basin",
    "Legacy_ID": "jhelum-basin",
    "slug": "jhelum-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.845Z",
    "name": "Jhelum Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "Principal watershed of Kashmir Valley. Drains over 33,000 km². Encompasses all major lakes, wetlands, and tributaries. Critical for irrigation, hydropower, and flood regulation.",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Multiple",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.0833,
      "lng": 74.8
    },
    "elevation": 2850,
    "area": 15856,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Jhelum River Basin",
        "Jhelum Catchment"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Jhelum River"
    }
  },
  {
    "id": "chenab-basin",
    "Legacy_ID": "chenab-basin",
    "slug": "chenab-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Chenab Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A rugged Himalayan basin with massive run-of-the-river hydropower potential. Chenab is formed by the confluence of Chandra and Bhaga rivers.",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Multiple",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.25,
      "lng": 75.5
    },
    "elevation": 3250,
    "area": 26155,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chenab River Basin",
        "Chandra-Bhaga Basin"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Chenab River"
    }
  },
  {
    "id": "ravi-basin",
    "Legacy_ID": "ravi-basin",
    "slug": "ravi-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Ravi Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "Ravi River forms the boundary between J&K (Kathua) and Punjab. Features the massive Ranjit Sagar reservoir.",
    "District_ID": "Kathua",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kathua",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.55,
      "lng": 75.75
    },
    "elevation": 1850,
    "area": 5200,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ravi Catchment J&K Side",
        "Thein Catchment"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ravi Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ravi River"
    }
  },
  {
    "id": "indus-basin",
    "Legacy_ID": "indus-basin",
    "slug": "indus-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Indus Basin (Ladakh)",
    "type": "watershed",
    "category": "Major Basin",
    "description": "One of the largest river basins in Asia. Drains over 1.1 million km². Critical for Ladakh region and transboundary water sharing.",
    "District_ID": "Leh/Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh/Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 77.5
    },
    "elevation": 4500,
    "area": 321289,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sengge Zangbo Basin",
        "Upper Indus Basin"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Indus River"
    }
  },
  {
    "id": "upper-indus-gb-basin",
    "Legacy_ID": "upper-indus-gb-basin",
    "slug": "upper-indus-gb-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Upper Indus GB Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A critically glaciated basin, containing some of the largest glaciers outside the polar regions (Baltoro, Biafo). Heavy GLOF and mudslide vulnerabilities.",
    "District_ID": "Multiple",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Multiple",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.3,
      "lng": 75.5
    },
    "elevation": 4100,
    "area": 72400,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Indus River Basin Gilgit-Baltistan",
        "Indus GB Catchment"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Indus River"
    }
  },
  {
    "id": "lidder-basin",
    "Legacy_ID": "lidder-basin",
    "slug": "lidder-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-KU-GEOG",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Lidder Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Important sub-basin in southern Kashmir. Drains Lidder Valley. Critical for irrigation, trout fisheries, and tourism.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.95,
      "lng": 75.15
    },
    "elevation": 3400,
    "area": 1159,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lidder Catchment",
        "Lidder Valley Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Lidder River"
    }
  },
  {
    "id": "sind-basin",
    "Legacy_ID": "sind-basin",
    "slug": "sind-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Sind Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Largest tributary basin in central Kashmir. Drains much of Ganderbal district. Important for irrigation and hydropower.",
    "District_ID": "Ganderbal/Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal/Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.25,
      "lng": 74.8
    },
    "elevation": 3100,
    "area": 1683,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sind Valley Catchment",
        "Sindh Nallah Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Sind River"
    }
  },
  {
    "id": "kishanganga-basin",
    "Legacy_ID": "kishanganga-basin",
    "slug": "kishanganga-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Kishanganga Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Major tributary basin in northern Kashmir. Drains Gurez Valley. Transboundary basin with Pakistan. Important for hydropower generation.",
    "District_ID": "Bandipora/Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora/Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.65,
      "lng": 74.75
    },
    "elevation": 3200,
    "area": 8500,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum Valley Basin",
        "Kishanganga Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kishanganga River"
    }
  },
  {
    "id": "tawi-sub-basin",
    "Legacy_ID": "tawi-sub-basin",
    "slug": "tawi-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-CGWB",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.846Z",
    "name": "Tawi Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Known locally as the Surya Putri. Feeds the Jammu city drinking network. Suffers severe discharge reduction during summer and dry spells.",
    "District_ID": "Udhampur/Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Udhampur/Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.85,
      "lng": 74.92
    },
    "elevation": 1450,
    "area": 2168,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tawi Catchment",
        "Tawi River Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Tawi River"
    }
  },
  {
    "id": "marusudar-sub-basin",
    "Legacy_ID": "marusudar-sub-basin",
    "slug": "marusudar-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Marusudar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Largest tributary of the Chenab. Highly glacier-fed with steep canyons. Central to the construction of major run-of-the-river dams.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.65,
      "lng": 75.8
    },
    "elevation": 3800,
    "area": 4320,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Marusudar River Watershed",
        "Marua Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Marusudar River"
    }
  },
  {
    "id": "ujh-sub-basin",
    "Legacy_ID": "ujh-sub-basin",
    "slug": "ujh-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-CGWB",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ujh Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Ujh River is a major tributary of the Ravi. Heavily rainfed. Subject to high-priority water diversion projects under the Indus Waters Treaty framework.",
    "District_ID": "Kathua/Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kathua/Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.65,
      "lng": 75.38
    },
    "elevation": 1650,
    "area": 1215,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ujh Catchment",
        "Ujh River Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ravi Sub-Bas-Tributary",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ujh River"
    }
  },
  {
    "id": "zanskar-sub-basin",
    "Legacy_ID": "zanskar-sub-basin",
    "slug": "zanskar-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Zanskar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "A glacier-fed sub-basin noted for extreme cold, glaciation, and winter ice formation. Famed for the Chadar Trek on the frozen river.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.6,
      "lng": 76.9
    },
    "elevation": 4650,
    "area": 12200,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zanskar River Basin",
        "Tsarp-Doda Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Zanskar River"
    }
  },
  {
    "id": "shyok-sub-basin",
    "Legacy_ID": "shyok-sub-basin",
    "slug": "shyok-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shyok Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originates at the Rimo Glacier. Known for glacial surge events (e.g. Chong Kumdan glacier dams) which create massive seasonal GLOF risks.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.68,
      "lng": 78.12
    },
    "elevation": 4900,
    "area": 23600,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shyok Catchment",
        "River of Death Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shyok River"
    }
  },
  {
    "id": "suru-sub-basin",
    "Legacy_ID": "suru-sub-basin",
    "slug": "suru-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Suru Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Nun-Kun massif glaciers feed this catchment. Crucial drinking water source for the entire Kargil district capital.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.35,
      "lng": 76.15
    },
    "elevation": 3950,
    "area": 4350,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Suru Valley Catchment",
        "Suru Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Suru River"
    }
  },
  {
    "id": "dras-sub-basin",
    "Legacy_ID": "dras-sub-basin",
    "slug": "dras-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Dras Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Encompasses Dras, the second-coldest inhabited place on Earth. Heavily fed by Machoi and other regional glaciers.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 75.85
    },
    "elevation": 3800,
    "area": 3150,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Dras River Catchment",
        "Dras-Shingo Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Dras River"
    }
  },
  {
    "id": "nubra-sub-basin",
    "Legacy_ID": "nubra-sub-basin",
    "slug": "nubra-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nubra Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Nubra River originates directly from the snout of the Siachen Glacier. A critical cryosphere intelligence unit.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.15,
      "lng": 77.25
    },
    "elevation": 5100,
    "area": 5400,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nubra Valley Catchment",
        "Nubra Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Nubra River"
    }
  },
  {
    "id": "neelum-ajk-basin",
    "Legacy_ID": "neelum-ajk-basin",
    "slug": "neelum-ajk-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Neelum AJK Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Stretches along the Line of Control. Deeply forested valley. Neelum-Jhelum HEP diverts water via a tunnel to the Jhelum river.",
    "District_ID": "Neelum/Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum/Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 73.9
    },
    "elevation": 2900,
    "area": 7400,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum Valley Catchment AJK",
        "Kishanganga Pakistan/AJK side"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum River (Kishanganga)"
    }
  },
  {
    "id": "hunza-sub-basin",
    "Legacy_ID": "hunza-sub-basin",
    "slug": "hunza-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hunza Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Drains the Karakoram range. Associated with massive landslide hazards, notably the 2010 landslide that created Attabad Lake.",
    "District_ID": "Hunza/Nagar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza/Nagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.3,
      "lng": 74.6
    },
    "elevation": 4350,
    "area": 13700,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hunza River Watershed",
        "Hunza Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza River"
    }
  },
  {
    "id": "gilgit-sub-basin",
    "Legacy_ID": "gilgit-sub-basin",
    "slug": "gilgit-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Gilgit Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Flows from the Shandur Pass (the world's highest polo ground). Extremely glaciated tributaries like the Yasin and Ishkoman rivers feed it.",
    "District_ID": "Gilgit/Ghizer/Gupis-Yasin",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Gilgit/Ghizer/Gupis-Yasin",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.1,
      "lng": 73.6
    },
    "elevation": 3950,
    "area": 12100,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gilgit River Catchment",
        "Ghizer-Gilgit Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Gilgit River"
    }
  },
  {
    "id": "shigar-sub-basin",
    "Legacy_ID": "shigar-sub-basin",
    "slug": "shigar-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shigar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Drains the southern slopes of the Karakoram range, including K2 (8,611m). Fed by Baltoro and Biafo glaciers. Critical unit for global glacier melt studies.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.7,
      "lng": 75.75
    },
    "elevation": 5200,
    "area": 7380,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shigar Valley Catchment",
        "Shigar Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shigar River"
    }
  },
  {
    "id": "astore-sub-basin",
    "Legacy_ID": "astore-sub-basin",
    "slug": "astore-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Astore Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Astore River drains the eastern slopes of Nanga Parbat (8,126m). Strongly glacier and snowfed. Features severe winter freezing.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.15,
      "lng": 74.85
    },
    "elevation": 4200,
    "area": 4180,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Astore Catchment",
        "Astore River Watershed"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Astore River"
    }
  },
  {
    "id": "lidder-sub-basin-w-0",
    "Legacy_ID": "lidder-sub-basin-w-0",
    "slug": "arapath-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Arapath Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "elevation": 2000,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Arapath Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Arapath Stream"
    }
  },
  {
    "id": "sind-sub-basin-w-1",
    "Legacy_ID": "sind-sub-basin-w-1",
    "slug": "bringi-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Bringi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "elevation": 2035,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bringi Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Bringi Stream"
    }
  },
  {
    "id": "kishanganga-basin-w-2",
    "Legacy_ID": "kishanganga-basin-w-2",
    "slug": "sandran-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sandran Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "elevation": 2070,
    "area": 50,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sandran Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Sandran Stream"
    }
  },
  {
    "id": "lidder-sub-basin-w-3",
    "Legacy_ID": "lidder-sub-basin-w-3",
    "slug": "lidder-east-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Lidder East Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "elevation": 2105,
    "area": 55,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lidder East Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Lidder East Stream"
    }
  },
  {
    "id": "sind-sub-basin-w-4",
    "Legacy_ID": "sind-sub-basin-w-4",
    "slug": "lidder-west-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Lidder West Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "elevation": 2140,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lidder West Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Lidder West Stream"
    }
  },
  {
    "id": "kishanganga-basin-w-5",
    "Legacy_ID": "kishanganga-basin-w-5",
    "slug": "kolahoi-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kolahoi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.2,
      "lng": 74.8
    },
    "elevation": 2175,
    "area": 65,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kolahoi Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kolahoi Stream"
    }
  },
  {
    "id": "lidder-sub-basin-w-6",
    "Legacy_ID": "lidder-sub-basin-w-6",
    "slug": "sheshnag-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sheshnag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.22,
      "lng": 74.82
    },
    "elevation": 2210,
    "area": 70,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sheshnag Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Sheshnag Stream"
    }
  },
  {
    "id": "sind-sub-basin-w-7",
    "Legacy_ID": "sind-sub-basin-w-7",
    "slug": "aru-valley-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Aru Valley Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.24,
      "lng": 74.84
    },
    "elevation": 2245,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Aru Valley Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Aru Valley Stream"
    }
  },
  {
    "id": "kishanganga-basin-w-8",
    "Legacy_ID": "kishanganga-basin-w-8",
    "slug": "pahalgam-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pahalgam Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.26,
      "lng": 74.86
    },
    "elevation": 2280,
    "area": 80,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pahalgam Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Pahalgam Stream"
    }
  },
  {
    "id": "lidder-sub-basin-w-9",
    "Legacy_ID": "lidder-sub-basin-w-9",
    "slug": "verinag-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Verinag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.28,
      "lng": 74.88
    },
    "elevation": 2315,
    "area": 85,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Verinag Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Verinag Stream"
    }
  },
  {
    "id": "sind-sub-basin-w-10",
    "Legacy_ID": "sind-sub-basin-w-10",
    "slug": "kokernag-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kokernag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 74.9
    },
    "elevation": 2350,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kokernag Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-11",
    "Legacy_ID": "kishanganga-basin-w-11",
    "slug": "achabal-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Achabal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.32,
      "lng": 74.92
    },
    "elevation": 2385,
    "area": 95,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Achabal Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-12",
    "Legacy_ID": "lidder-sub-basin-w-12",
    "slug": "chashma-shahi-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chashma Shahi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 74.94
    },
    "elevation": 2420,
    "area": 100,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chashma Shahi Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-13",
    "Legacy_ID": "sind-sub-basin-w-13",
    "slug": "martand-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Martand Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.36,
      "lng": 74.96
    },
    "elevation": 2455,
    "area": 105,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Martand Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-14",
    "Legacy_ID": "kishanganga-basin-w-14",
    "slug": "vishow-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Vishow Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 74.98
    },
    "elevation": 2490,
    "area": 110,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Vishow Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-15",
    "Legacy_ID": "lidder-sub-basin-w-15",
    "slug": "vishow-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Vishow Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 75
    },
    "elevation": 2525,
    "area": 115,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Vishow Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-16",
    "Legacy_ID": "sind-sub-basin-w-16",
    "slug": "aharbal-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Aharbal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 75.02
    },
    "elevation": 2560,
    "area": 120,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Aharbal Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-17",
    "Legacy_ID": "kishanganga-basin-w-17",
    "slug": "kausarnag-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kausarnag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.44,
      "lng": 75.04
    },
    "elevation": 2595,
    "area": 125,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kausarnag Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishanganga Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-18",
    "Legacy_ID": "lidder-sub-basin-w-18",
    "slug": "rambiara-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Rambiara Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 75.06
    },
    "elevation": 2630,
    "area": 130,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rambiara Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-19",
    "Legacy_ID": "sind-sub-basin-w-19",
    "slug": "rambiara-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Rambiara Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.48,
      "lng": 75.08
    },
    "elevation": 2665,
    "area": 135,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rambiara Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "vishav-catchment",
    "Legacy_ID": "vishav-catchment",
    "slug": "vishav-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-KU-GEOG",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Vishav Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Vishav originates at Kausarnag Lake and plunges down as Aharbal Waterfall. Noted for extreme flash flood vulnerability in summer months.",
    "District_ID": "Kulgam/Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam/Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.6,
      "lng": 74.85
    },
    "elevation": 2950,
    "area": 624,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Veshaw Watershed",
        "Vishav Sub-Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Arapath Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Vishav River"
    }
  },
  {
    "id": "rambiara-catchment",
    "Legacy_ID": "rambiara-catchment",
    "slug": "rambiara-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-KU-GEOG",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Rambiara Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Flows through the Hirpora Wildlife Sanctuary (home of the Markhor). Significant land conversion to apple orchards has accelerated runoff.",
    "District_ID": "Shopian/Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian/Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.68,
      "lng": 74.72
    },
    "elevation": 2850,
    "area": 665,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rambiara Watershed",
        "Rambiara Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bringi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Rambiara River"
    }
  },
  {
    "id": "romushi-catchment",
    "Legacy_ID": "romushi-catchment",
    "slug": "romushi-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-KU-GEOG",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Romushi Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Flows through soft Karewa clay mounds, making it highly prone to bank erosion and soil mining.",
    "District_ID": "Pulwama/Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama/Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.78,
      "lng": 74.78
    },
    "elevation": 2700,
    "area": 542,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Romshi Watershed",
        "Romshi Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sandran Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Romushi River"
    }
  },
  {
    "id": "doodhganga-catchment",
    "Legacy_ID": "doodhganga-catchment",
    "slug": "doodhganga-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Doodhganga Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Critically degraded in downstream sections due to municipal sewage dump from Srinagar and Budgam towns. Subject to NGT corrective directives.",
    "District_ID": "Budgam/Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam/Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.88,
      "lng": 74.82
    },
    "elevation": 2600,
    "area": 660,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Doodh Ganga Watershed",
        "Doodhganga Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder East Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Doodhganga River"
    }
  },
  {
    "id": "pohru-catchment",
    "Legacy_ID": "pohru-catchment",
    "slug": "pohru-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pohru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Largest sub-watershed in Kashmir Valley. Pohru carries the highest sediment load in the entire Jhelum basin, contributing heavily to Wular Lake siltation.",
    "District_ID": "Kupwara/Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara/Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 74.32
    },
    "elevation": 2450,
    "area": 1877,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pohru River Watershed",
        "Pohru Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder West Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Pohru River"
    }
  },
  {
    "id": "dal-nigeen-catchment",
    "Legacy_ID": "dal-nigeen-catchment",
    "slug": "dal-nigeen-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-LCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Dal-Nigeen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Urban catchment feeding Dal and Nigeen lakes. Highly populated with significant pollution pressure. Critical for lake conservation.",
    "District_ID": "Srinagar/Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar/Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.115,
      "lng": 74.829
    },
    "elevation": 2100,
    "area": 312,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Dal Lake Basin",
        "Dal Lake Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kolahoi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Telbal Nallah"
    }
  },
  {
    "id": "wular-catchment",
    "Legacy_ID": "wular-catchment",
    "slug": "wular-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-WUCMA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Wular Lake Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Large catchment feeding Wular Lake. Extensive wetland complex. Critical for flood buffering and migratory birds.",
    "District_ID": "Bandipora/Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora/Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4167,
      "lng": 74.6333
    },
    "elevation": 2300,
    "area": 2890,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Wular Catchment",
        "Wular Wetland Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sheshnag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Jhelum River"
    }
  },
  {
    "id": "hokersar-catchment",
    "Legacy_ID": "hokersar-catchment",
    "slug": "hokersar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKWL",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hokersar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major migratory waterfowl habitat and Ramsar wetland. Drained by the Flood Spill Channel. Siltation from Doodhganga has dramatically reduced its water depth.",
    "District_ID": "Srinagar/Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar/Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.09,
      "lng": 74.72
    },
    "elevation": 1750,
    "area": 125,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hokersar Wetland Catchment",
        "Hokersar Drainage Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Aru Valley Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Doodhganga / Flood Spill Channel"
    }
  },
  {
    "id": "shallabugh-catchment",
    "Legacy_ID": "shallabugh-catchment",
    "slug": "shallabugh-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKWL",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shallabugh Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A Ramsar designated wetland. Dries up significantly during winters. Crucial staging ground for mallards, pintails, and greylag geese.",
    "District_ID": "Ganderbal/Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal/Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.16,
      "lng": 74.73
    },
    "elevation": 1680,
    "area": 180,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shallabugh Wetland Catchment",
        "Shallabugh Drainage Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pahalgam Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Anchar Outflow / Jhelum Spill Channels"
    }
  },
  {
    "id": "upper-jhelum-catchment",
    "Legacy_ID": "upper-jhelum-catchment",
    "slug": "upper-jhelum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Upper Jhelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "High-altitude upper catchment of Jhelum. Glacial and snow-fed. Critical for base flow maintenance.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.85,
      "lng": 75.2
    },
    "elevation": 2650,
    "area": 1850,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Upper Jhelum Watershed",
        "Verinag-Khanabal Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Verinag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Jhelum River"
    }
  },
  {
    "id": "lidder-sub-basin-w-0-c-0",
    "Legacy_ID": "lidder-sub-basin-w-0-c-0",
    "slug": "hirpora-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hirpora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "elevation": 1900,
    "area": 15,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hirpora Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Arapath Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-1-c-1",
    "Legacy_ID": "sind-sub-basin-w-1-c-1",
    "slug": "romushi-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Romushi Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.11,
      "lng": 74.71
    },
    "elevation": 1928,
    "area": 18,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Romushi Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bringi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-2-c-2",
    "Legacy_ID": "kishanganga-basin-w-2-c-2",
    "slug": "romushi-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Romushi Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "elevation": 1956,
    "area": 21,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Romushi Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sandran Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-3-c-3",
    "Legacy_ID": "lidder-sub-basin-w-3-c-3",
    "slug": "yousmarg-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Yousmarg Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.13,
      "lng": 74.73
    },
    "elevation": 1984,
    "area": 24,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Yousmarg Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder East Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-4-c-4",
    "Legacy_ID": "sind-sub-basin-w-4-c-4",
    "slug": "doodhganga-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Doodhganga Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "elevation": 2012,
    "area": 27,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Doodhganga Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder West Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-5-c-5",
    "Legacy_ID": "kishanganga-basin-w-5-c-5",
    "slug": "doodhganga-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Doodhganga Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.15,
      "lng": 74.75
    },
    "elevation": 2040,
    "area": 30,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Doodhganga Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kolahoi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-6-c-6",
    "Legacy_ID": "lidder-sub-basin-w-6-c-6",
    "slug": "chadoora-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chadoora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "elevation": 2068,
    "area": 33,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chadoora Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sheshnag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-7-c-7",
    "Legacy_ID": "sind-sub-basin-w-7-c-7",
    "slug": "sukhnag-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sukhnag Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.17,
      "lng": 74.77
    },
    "elevation": 2096,
    "area": 36,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sukhnag Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Aru Valley Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-8-c-8",
    "Legacy_ID": "kishanganga-basin-w-8-c-8",
    "slug": "sukhnag-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sukhnag Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "elevation": 2124,
    "area": 39,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sukhnag Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pahalgam Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-9-c-9",
    "Legacy_ID": "lidder-sub-basin-w-9-c-9",
    "slug": "ferozpora-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ferozpora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.19,
      "lng": 74.79
    },
    "elevation": 2152,
    "area": 42,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ferozpora Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Verinag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-10-c-10",
    "Legacy_ID": "sind-sub-basin-w-10-c-10",
    "slug": "ningal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ningal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.2,
      "lng": 74.8
    },
    "elevation": 2180,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ningal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kokernag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-11-c-11",
    "Legacy_ID": "kishanganga-basin-w-11-c-11",
    "slug": "pohru-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pohru Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.21,
      "lng": 74.81
    },
    "elevation": 2208,
    "area": 48,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pohru Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Achabal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-12-c-12",
    "Legacy_ID": "lidder-sub-basin-w-12-c-12",
    "slug": "pohru-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pohru Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.22,
      "lng": 74.82
    },
    "elevation": 2236,
    "area": 51,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pohru Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chashma Shahi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-13-c-13",
    "Legacy_ID": "sind-sub-basin-w-13-c-13",
    "slug": "lolab-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Lolab Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.23,
      "lng": 74.83
    },
    "elevation": 2264,
    "area": 54,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lolab Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Martand Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-14-c-14",
    "Legacy_ID": "kishanganga-basin-w-14-c-14",
    "slug": "mawar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Mawar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.24,
      "lng": 74.84
    },
    "elevation": 2292,
    "area": 57,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mawar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Vishow Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-15-c-15",
    "Legacy_ID": "lidder-sub-basin-w-15-c-15",
    "slug": "hamal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hamal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.25,
      "lng": 74.85
    },
    "elevation": 2320,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hamal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Vishow Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-16-c-16",
    "Legacy_ID": "sind-sub-basin-w-16-c-16",
    "slug": "erin-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Erin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.26,
      "lng": 74.86
    },
    "elevation": 2348,
    "area": 63,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Erin Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Aharbal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-17-c-17",
    "Legacy_ID": "kishanganga-basin-w-17-c-17",
    "slug": "madhumati-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Madhumati Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.27,
      "lng": 74.87
    },
    "elevation": 2376,
    "area": 66,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Madhumati Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kausarnag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-18-c-18",
    "Legacy_ID": "lidder-sub-basin-w-18-c-18",
    "slug": "gurez-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Gurez Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.28,
      "lng": 74.88
    },
    "elevation": 2404,
    "area": 69,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gurez Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rambiara Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-19-c-19",
    "Legacy_ID": "sind-sub-basin-w-19-c-19",
    "slug": "sindh-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sindh Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.29,
      "lng": 74.89
    },
    "elevation": 2432,
    "area": 72,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sindh Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rambiara Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-0-c-20",
    "Legacy_ID": "lidder-sub-basin-w-0-c-20",
    "slug": "sindh-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sindh Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 74.9
    },
    "elevation": 2460,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sindh Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Arapath Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-1-c-21",
    "Legacy_ID": "sind-sub-basin-w-1-c-21",
    "slug": "wangath-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Wangath Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.31,
      "lng": 74.91
    },
    "elevation": 2488,
    "area": 78,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Wangath Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bringi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-2-c-22",
    "Legacy_ID": "kishanganga-basin-w-2-c-22",
    "slug": "kangan-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kangan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.32,
      "lng": 74.92
    },
    "elevation": 2516,
    "area": 81,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kangan Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sandran Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-3-c-23",
    "Legacy_ID": "lidder-sub-basin-w-3-c-23",
    "slug": "sonamarg-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sonamarg Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.33,
      "lng": 74.93
    },
    "elevation": 2544,
    "area": 84,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sonamarg Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder East Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-4-c-24",
    "Legacy_ID": "sind-sub-basin-w-4-c-24",
    "slug": "baltal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Baltal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 74.94
    },
    "elevation": 2572,
    "area": 87,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Baltal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder West Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-5-c-25",
    "Legacy_ID": "kishanganga-basin-w-5-c-25",
    "slug": "zojila-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Zojila Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.35,
      "lng": 74.95
    },
    "elevation": 2600,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zojila Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kolahoi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-6-c-26",
    "Legacy_ID": "lidder-sub-basin-w-6-c-26",
    "slug": "shalimar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shalimar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.36,
      "lng": 74.96
    },
    "elevation": 2628,
    "area": 93,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shalimar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sheshnag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-7-c-27",
    "Legacy_ID": "sind-sub-basin-w-7-c-27",
    "slug": "nishat-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nishat Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.37,
      "lng": 74.97
    },
    "elevation": 2656,
    "area": 16,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nishat Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Aru Valley Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-8-c-28",
    "Legacy_ID": "kishanganga-basin-w-8-c-28",
    "slug": "harwan-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Harwan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 74.98
    },
    "elevation": 2684,
    "area": 19,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Harwan Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pahalgam Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-9-c-29",
    "Legacy_ID": "lidder-sub-basin-w-9-c-29",
    "slug": "telbal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Telbal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.39,
      "lng": 74.99
    },
    "elevation": 2712,
    "area": 22,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Telbal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Verinag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-10-c-30",
    "Legacy_ID": "sind-sub-basin-w-10-c-30",
    "slug": "nigeen-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nigeen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 75
    },
    "elevation": 2740,
    "area": 25,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nigeen Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kokernag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-11-c-31",
    "Legacy_ID": "kishanganga-basin-w-11-c-31",
    "slug": "brari-nambal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Brari Nambal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.41,
      "lng": 75.01
    },
    "elevation": 2768,
    "area": 28,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Brari Nambal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Achabal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-12-c-32",
    "Legacy_ID": "lidder-sub-basin-w-12-c-32",
    "slug": "anchar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Anchar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 75.02
    },
    "elevation": 2796,
    "area": 31,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Anchar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chashma Shahi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-13-c-33",
    "Legacy_ID": "sind-sub-basin-w-13-c-33",
    "slug": "gilsar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Gilsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.43,
      "lng": 75.03
    },
    "elevation": 2824,
    "area": 34,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gilsar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Martand Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-14-c-34",
    "Legacy_ID": "kishanganga-basin-w-14-c-34",
    "slug": "hokersar-buffer-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hokersar Buffer Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.44,
      "lng": 75.04
    },
    "elevation": 2852,
    "area": 37,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hokersar Buffer Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Vishow Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-15-c-35",
    "Legacy_ID": "lidder-sub-basin-w-15-c-35",
    "slug": "shallabugh-buffer-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shallabugh Buffer Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.45,
      "lng": 75.05
    },
    "elevation": 2880,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shallabugh Buffer Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Vishow Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-16-c-36",
    "Legacy_ID": "sind-sub-basin-w-16-c-36",
    "slug": "hygam-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hygam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 75.06
    },
    "elevation": 2908,
    "area": 43,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hygam Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Aharbal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kishanganga-basin-w-17-c-37",
    "Legacy_ID": "kishanganga-basin-w-17-c-37",
    "slug": "mirgund-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Mirgund Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.47,
      "lng": 75.07
    },
    "elevation": 2936,
    "area": 46,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mirgund Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kausarnag Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "lidder-sub-basin-w-18-c-38",
    "Legacy_ID": "lidder-sub-basin-w-18-c-38",
    "slug": "chatlum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chatlum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.48,
      "lng": 75.08
    },
    "elevation": 2964,
    "area": 49,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chatlum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rambiara Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sind-sub-basin-w-19-c-39",
    "Legacy_ID": "sind-sub-basin-w-19-c-39",
    "slug": "fashkoori-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Fashkoori Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.49,
      "lng": 75.09
    },
    "elevation": 2992,
    "area": 52,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Fashkoori Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rambiara Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "vishav-catchment-m-0",
    "Legacy_ID": "vishav-catchment-m-0",
    "slug": "pampore-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pampore Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "elevation": 1800,
    "area": 5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pampore Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Vishav Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "rambiara-catchment-m-1",
    "Legacy_ID": "rambiara-catchment-m-1",
    "slug": "khrew-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Khrew Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kulgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kulgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.11,
      "lng": 74.71
    },
    "elevation": 1822,
    "area": 6,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Khrew Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rambiara Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "romushi-catchment-m-2",
    "Legacy_ID": "romushi-catchment-m-2",
    "slug": "srinagar-urban-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Srinagar Urban Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "elevation": 1844,
    "area": 7,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Srinagar Urban Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Romushi Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "doodhganga-catchment-m-3",
    "Legacy_ID": "doodhganga-catchment-m-3",
    "slug": "baramulla-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Baramulla Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.13,
      "lng": 74.73
    },
    "elevation": 1866,
    "area": 8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Baramulla Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Doodhganga Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "pohru-catchment-m-4",
    "Legacy_ID": "pohru-catchment-m-4",
    "slug": "sopore-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sopore Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Srinagar",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Srinagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "elevation": 1888,
    "area": 9,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sopore Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dal-nigeen-catchment-m-5",
    "Legacy_ID": "dal-nigeen-catchment-m-5",
    "slug": "bandipora-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Bandipora Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.15,
      "lng": 74.75
    },
    "elevation": 1910,
    "area": 10,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bandipora Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Dal-Nigeen Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "wular-catchment-m-6",
    "Legacy_ID": "wular-catchment-m-6",
    "slug": "kupwara-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kupwara Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "elevation": 1932,
    "area": 11,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kupwara Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Wular Lake Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hokersar-catchment-m-7",
    "Legacy_ID": "hokersar-catchment-m-7",
    "slug": "anantnag-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Anantnag Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.17,
      "lng": 74.77
    },
    "elevation": 1954,
    "area": 12,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Anantnag Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hokersar Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shallabugh-catchment-m-8",
    "Legacy_ID": "shallabugh-catchment-m-8",
    "slug": "verinag-aquifer-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Verinag Aquifer Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "elevation": 1976,
    "area": 13,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Verinag Aquifer Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shallabugh Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "upper-jhelum-catchment-m-9",
    "Legacy_ID": "upper-jhelum-catchment-m-9",
    "slug": "kulgam-rice-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kulgam Rice Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.19,
      "lng": 74.79
    },
    "elevation": 1998,
    "area": 14,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kulgam Rice Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Jhelum Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-0",
    "Legacy_ID": "tawi-sub-basin-w-0",
    "slug": "chenab-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chenab Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33,
      "lng": 74.8
    },
    "elevation": 2000,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chenab Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Chenab Upper Stream"
    }
  },
  {
    "id": "marusudar-sub-basin-w-1",
    "Legacy_ID": "marusudar-sub-basin-w-1",
    "slug": "chenab-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chenab Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.22,
      "lng": 77.52
    },
    "elevation": 2035,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chenab Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Chenab Lower Stream"
    }
  },
  {
    "id": "ujh-sub-basin-w-2",
    "Legacy_ID": "ujh-sub-basin-w-2",
    "slug": "marusudar-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Marusudar Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.04,
      "lng": 74.84
    },
    "elevation": 2070,
    "area": 50,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Marusudar Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Marusudar Upper Stream"
    }
  },
  {
    "id": "zanskar-sub-basin-w-3",
    "Legacy_ID": "zanskar-sub-basin-w-3",
    "slug": "marusudar-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Marusudar Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.26,
      "lng": 77.56
    },
    "elevation": 2105,
    "area": 55,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Marusudar Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zanskar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Marusudar Lower Stream"
    }
  },
  {
    "id": "shyok-sub-basin-w-4",
    "Legacy_ID": "shyok-sub-basin-w-4",
    "slug": "pakal-dul-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pakal Dul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.08,
      "lng": 74.88
    },
    "elevation": 2140,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pakal Dul Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Pakal Dul Stream"
    }
  },
  {
    "id": "suru-sub-basin-w-5",
    "Legacy_ID": "suru-sub-basin-w-5",
    "slug": "kiru-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kiru Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 77.6
    },
    "elevation": 2175,
    "area": 65,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kiru Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kiru Stream"
    }
  },
  {
    "id": "dras-sub-basin-w-6",
    "Legacy_ID": "dras-sub-basin-w-6",
    "slug": "kwar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kwar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.12,
      "lng": 74.92
    },
    "elevation": 2210,
    "area": 70,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kwar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Dras Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kwar Stream"
    }
  },
  {
    "id": "nubra-sub-basin-w-7",
    "Legacy_ID": "nubra-sub-basin-w-7",
    "slug": "kishtwar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kishtwar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 77.64
    },
    "elevation": 2245,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kishtwar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Nubra Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kishtwar Stream"
    }
  },
  {
    "id": "tawi-sub-basin-w-8",
    "Legacy_ID": "tawi-sub-basin-w-8",
    "slug": "paddar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Paddar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.16,
      "lng": 74.96
    },
    "elevation": 2280,
    "area": 80,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Paddar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Paddar Stream"
    }
  },
  {
    "id": "marusudar-sub-basin-w-9",
    "Legacy_ID": "marusudar-sub-basin-w-9",
    "slug": "bhadarwah-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Bhadarwah Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 77.68
    },
    "elevation": 2315,
    "area": 85,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bhadarwah Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Bhadarwah Stream"
    }
  },
  {
    "id": "ujh-sub-basin-w-10",
    "Legacy_ID": "ujh-sub-basin-w-10",
    "slug": "doda-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Doda Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.2,
      "lng": 75
    },
    "elevation": 2350,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Doda Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Doda Stream"
    }
  },
  {
    "id": "zanskar-sub-basin-w-11",
    "Legacy_ID": "zanskar-sub-basin-w-11",
    "slug": "ramban-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ramban Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 77.72
    },
    "elevation": 2385,
    "area": 95,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ramban Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zanskar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ramban Stream"
    }
  },
  {
    "id": "shyok-sub-basin-w-12",
    "Legacy_ID": "shyok-sub-basin-w-12",
    "slug": "baglihar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Baglihar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.24,
      "lng": 75.04
    },
    "elevation": 2420,
    "area": 100,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Baglihar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Baglihar Stream"
    }
  },
  {
    "id": "suru-sub-basin-w-13",
    "Legacy_ID": "suru-sub-basin-w-13",
    "slug": "reasi-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Reasi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 77.76
    },
    "elevation": 2455,
    "area": 105,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Reasi Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Reasi Stream"
    }
  },
  {
    "id": "dras-sub-basin-w-14",
    "Legacy_ID": "dras-sub-basin-w-14",
    "slug": "salal-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Salal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.28,
      "lng": 75.08
    },
    "elevation": 2490,
    "area": 110,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Salal Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Dras Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Salal Stream"
    }
  },
  {
    "id": "nubra-sub-basin-w-15",
    "Legacy_ID": "nubra-sub-basin-w-15",
    "slug": "tawi-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Tawi Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 77.8
    },
    "elevation": 2525,
    "area": 115,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tawi Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Nubra Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Tawi Upper Stream"
    }
  },
  {
    "id": "tawi-sub-basin-w-16",
    "Legacy_ID": "tawi-sub-basin-w-16",
    "slug": "tawi-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Tawi Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.32,
      "lng": 75.12
    },
    "elevation": 2560,
    "area": 120,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tawi Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Tawi Lower Stream"
    }
  },
  {
    "id": "marusudar-sub-basin-w-17",
    "Legacy_ID": "marusudar-sub-basin-w-17",
    "slug": "udhampur-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Udhampur Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.54,
      "lng": 77.84
    },
    "elevation": 2595,
    "area": 125,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Udhampur Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Udhampur Stream"
    }
  },
  {
    "id": "ujh-sub-basin-w-18",
    "Legacy_ID": "ujh-sub-basin-w-18",
    "slug": "jammu-plain-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Jammu Plain Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.36,
      "lng": 75.16
    },
    "elevation": 2630,
    "area": 130,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Jammu Plain Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Jammu Plain Stream"
    }
  },
  {
    "id": "zanskar-sub-basin-w-19",
    "Legacy_ID": "zanskar-sub-basin-w-19",
    "slug": "samba-plains-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Samba Plains Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 77.88
    },
    "elevation": 2665,
    "area": 135,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Samba Plains Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zanskar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Samba Plains Stream"
    }
  },
  {
    "id": "shyok-sub-basin-w-20",
    "Legacy_ID": "shyok-sub-basin-w-20",
    "slug": "kathua-coastal-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kathua Coastal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.4,
      "lng": 75.2
    },
    "elevation": 2700,
    "area": 140,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kathua Coastal Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kathua Coastal Stream"
    }
  },
  {
    "id": "suru-sub-basin-w-21",
    "Legacy_ID": "suru-sub-basin-w-21",
    "slug": "ranjit-sagar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ranjit Sagar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.62,
      "lng": 77.92
    },
    "elevation": 2735,
    "area": 145,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ranjit Sagar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ranjit Sagar Stream"
    }
  },
  {
    "id": "dras-sub-basin-w-22",
    "Legacy_ID": "dras-sub-basin-w-22",
    "slug": "ujh-river-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ujh River Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.44,
      "lng": 75.24
    },
    "elevation": 2770,
    "area": 150,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ujh River Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Dras Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ujh River Upper Stream"
    }
  },
  {
    "id": "nubra-sub-basin-w-23",
    "Legacy_ID": "nubra-sub-basin-w-23",
    "slug": "ujh-river-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Ujh River Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.66,
      "lng": 77.96
    },
    "elevation": 2805,
    "area": 155,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ujh River Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Nubra Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ujh River Lower Stream"
    }
  },
  {
    "id": "tawi-sub-basin-w-24",
    "Legacy_ID": "tawi-sub-basin-w-24",
    "slug": "basantar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Basantar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.48,
      "lng": 75.28
    },
    "elevation": 2840,
    "area": 160,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Basantar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Basantar Stream"
    }
  },
  {
    "id": "marusudar-sub-basin-w-25",
    "Legacy_ID": "marusudar-sub-basin-w-25",
    "slug": "devak-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Devak Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.7,
      "lng": 78
    },
    "elevation": 2875,
    "area": 165,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Devak Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Devak Stream"
    }
  },
  {
    "id": "ujh-sub-basin-w-26",
    "Legacy_ID": "ujh-sub-basin-w-26",
    "slug": "kalakote-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kalakote Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.52,
      "lng": 75.32
    },
    "elevation": 2910,
    "area": 170,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kalakote Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kalakote Stream"
    }
  },
  {
    "id": "basantar-catchment",
    "Legacy_ID": "basantar-catchment",
    "slug": "basantar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-CGWB",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Basantar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A dry, sub-tropical river catchment. Dries up to small trickles in summer but causes severe flash floods during monsoon.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.58,
      "lng": 75.12
    },
    "elevation": 620,
    "area": 580,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Basantar River Watershed",
        "Samba Plains Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Basantar River"
    }
  },
  {
    "id": "neeru-catchment",
    "Legacy_ID": "neeru-catchment",
    "slug": "neeru-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Neeru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major cold-water stream catchment in the Bhaderwah valley. Excellent trout habitat, but threatened by urban extension.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.98,
      "lng": 75.72
    },
    "elevation": 2150,
    "area": 382,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neeru Nallah Watershed",
        "Bhaderwah Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Neeru Stream"
    }
  },
  {
    "id": "puga-geothermal-catchment",
    "Legacy_ID": "puga-geothermal-catchment",
    "slug": "puga-valley-geothermal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Puga Valley Geothermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A unique geothermal valley featuring hot springs, mud pools, and sulfur deposits. Ground temperatures at shallow depths exceed 130°C.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.22,
      "lng": 78.48
    },
    "elevation": 4850,
    "area": 140,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Puga Catchment",
        "Puga Valley Watershed"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Puga Stream"
    }
  },
  {
    "id": "tawi-sub-basin-w-0-c-0",
    "Legacy_ID": "tawi-sub-basin-w-0-c-0",
    "slug": "nowshera-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nowshera Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.2,
      "lng": 77.5
    },
    "elevation": 1900,
    "area": 15,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nowshera Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Nowshera Stream"
    }
  },
  {
    "id": "marusudar-sub-basin-w-1-c-1",
    "Legacy_ID": "marusudar-sub-basin-w-1-c-1",
    "slug": "rajouri-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Rajouri Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.01,
      "lng": 74.81
    },
    "elevation": 1928,
    "area": 18,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rajouri Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Rajouri Upper Stream"
    }
  },
  {
    "id": "ujh-sub-basin-w-2-c-2",
    "Legacy_ID": "ujh-sub-basin-w-2-c-2",
    "slug": "rajouri-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Rajouri Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.22,
      "lng": 77.52
    },
    "elevation": 1956,
    "area": 21,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rajouri Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Rajouri Lower Stream"
    }
  },
  {
    "id": "zanskar-sub-basin-w-3-c-3",
    "Legacy_ID": "zanskar-sub-basin-w-3-c-3",
    "slug": "poonch-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Poonch Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.03,
      "lng": 74.83
    },
    "elevation": 1984,
    "area": 24,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Poonch Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-4-c-4",
    "Legacy_ID": "shyok-sub-basin-w-4-c-4",
    "slug": "poonch-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Poonch Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.24,
      "lng": 77.54
    },
    "elevation": 2012,
    "area": 27,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Poonch Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pakal Dul Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-5-c-5",
    "Legacy_ID": "suru-sub-basin-w-5-c-5",
    "slug": "suru-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Suru Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.05,
      "lng": 74.85
    },
    "elevation": 2040,
    "area": 30,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Suru Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kiru Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-6-c-6",
    "Legacy_ID": "dras-sub-basin-w-6-c-6",
    "slug": "suru-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Suru Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.26,
      "lng": 77.56
    },
    "elevation": 2068,
    "area": 33,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Suru Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-7-c-7",
    "Legacy_ID": "nubra-sub-basin-w-7-c-7",
    "slug": "sanku-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Sanku Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.07,
      "lng": 74.87
    },
    "elevation": 2096,
    "area": 36,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sanku Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishtwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-8-c-8",
    "Legacy_ID": "tawi-sub-basin-w-8-c-8",
    "slug": "zanskar-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Zanskar Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.28,
      "lng": 77.58
    },
    "elevation": 2124,
    "area": 39,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zanskar Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Paddar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-9-c-9",
    "Legacy_ID": "marusudar-sub-basin-w-9-c-9",
    "slug": "zanskar-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Zanskar Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.09,
      "lng": 74.89
    },
    "elevation": 2152,
    "area": 42,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zanskar Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bhadarwah Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-10-c-10",
    "Legacy_ID": "ujh-sub-basin-w-10-c-10",
    "slug": "padum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Padum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 77.6
    },
    "elevation": 2180,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Padum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Doda Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-11-c-11",
    "Legacy_ID": "zanskar-sub-basin-w-11-c-11",
    "slug": "stod-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Stod Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.11,
      "lng": 74.91
    },
    "elevation": 2208,
    "area": 48,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Stod Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ramban Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-12-c-12",
    "Legacy_ID": "shyok-sub-basin-w-12-c-12",
    "slug": "tsarap-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Tsarap Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.32,
      "lng": 77.62
    },
    "elevation": 2236,
    "area": 51,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tsarap Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Baglihar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-13-c-13",
    "Legacy_ID": "suru-sub-basin-w-13-c-13",
    "slug": "shyok-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shyok Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.13,
      "lng": 74.93
    },
    "elevation": 2264,
    "area": 54,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shyok Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Reasi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-14-c-14",
    "Legacy_ID": "dras-sub-basin-w-14-c-14",
    "slug": "shyok-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shyok Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 77.64
    },
    "elevation": 2292,
    "area": 57,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shyok Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Salal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-15-c-15",
    "Legacy_ID": "nubra-sub-basin-w-15-c-15",
    "slug": "nubra-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nubra Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.15,
      "lng": 74.95
    },
    "elevation": 2320,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nubra Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-16-c-16",
    "Legacy_ID": "tawi-sub-basin-w-16-c-16",
    "slug": "nubra-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nubra Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.36,
      "lng": 77.66
    },
    "elevation": 2348,
    "area": 63,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nubra Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-17-c-17",
    "Legacy_ID": "marusudar-sub-basin-w-17-c-17",
    "slug": "siachen-snout-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Siachen snout Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.17,
      "lng": 74.97
    },
    "elevation": 2376,
    "area": 66,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Siachen snout Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Udhampur Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-18-c-18",
    "Legacy_ID": "ujh-sub-basin-w-18-c-18",
    "slug": "puga-geothermal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Puga geothermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 77.68
    },
    "elevation": 2404,
    "area": 69,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Puga geothermal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jammu Plain Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-19-c-19",
    "Legacy_ID": "zanskar-sub-basin-w-19-c-19",
    "slug": "hanle-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Hanle Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.19,
      "lng": 74.99
    },
    "elevation": 2432,
    "area": 72,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hanle Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Samba Plains Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-20-c-20",
    "Legacy_ID": "shyok-sub-basin-w-20-c-20",
    "slug": "chushul-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chushul Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 77.7
    },
    "elevation": 2460,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chushul Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kathua Coastal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-21-c-21",
    "Legacy_ID": "suru-sub-basin-w-21-c-21",
    "slug": "nyoma-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Nyoma Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.21,
      "lng": 75.01
    },
    "elevation": 2488,
    "area": 78,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nyoma Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ranjit Sagar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-22-c-22",
    "Legacy_ID": "dras-sub-basin-w-22-c-22",
    "slug": "demchok-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Demchok Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 77.72
    },
    "elevation": 2516,
    "area": 81,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Demchok Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh River Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-23-c-23",
    "Legacy_ID": "nubra-sub-basin-w-23-c-23",
    "slug": "changthang-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Changthang Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.23,
      "lng": 75.03
    },
    "elevation": 2544,
    "area": 84,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Changthang Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh River Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-24-c-24",
    "Legacy_ID": "tawi-sub-basin-w-24-c-24",
    "slug": "tso-kar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Tso Kar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.44,
      "lng": 77.74
    },
    "elevation": 2572,
    "area": 87,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tso Kar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Basantar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-25-c-25",
    "Legacy_ID": "marusudar-sub-basin-w-25-c-25",
    "slug": "tso-moriri-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Tso Moriri Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.25,
      "lng": 75.05
    },
    "elevation": 2600,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tso Moriri Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Devak Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-26-c-26",
    "Legacy_ID": "ujh-sub-basin-w-26-c-26",
    "slug": "pangong-south-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pangong South Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 77.76
    },
    "elevation": 2628,
    "area": 93,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pangong South Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kalakote Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-0-c-27",
    "Legacy_ID": "tawi-sub-basin-w-0-c-27",
    "slug": "pangong-north-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pangong North Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.27,
      "lng": 75.07
    },
    "elevation": 2656,
    "area": 16,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pangong North Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-1-c-28",
    "Legacy_ID": "marusudar-sub-basin-w-1-c-28",
    "slug": "kiagar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kiagar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.48,
      "lng": 77.78
    },
    "elevation": 2684,
    "area": 19,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kiagar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-2-c-29",
    "Legacy_ID": "ujh-sub-basin-w-2-c-29",
    "slug": "yaye-tso-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Yaye Tso Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.29,
      "lng": 75.09
    },
    "elevation": 2712,
    "area": 22,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Yaye Tso Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-3-c-30",
    "Legacy_ID": "zanskar-sub-basin-w-3-c-30",
    "slug": "startsapuk-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Startsapuk Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 77.8
    },
    "elevation": 2740,
    "area": 25,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Startsapuk Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-4-c-31",
    "Legacy_ID": "shyok-sub-basin-w-4-c-31",
    "slug": "shey-ponds-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Shey Ponds Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.31,
      "lng": 75.11
    },
    "elevation": 2768,
    "area": 28,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shey Ponds Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pakal Dul Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-5-c-32",
    "Legacy_ID": "suru-sub-basin-w-5-c-32",
    "slug": "stakna-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Stakna Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.52,
      "lng": 77.82
    },
    "elevation": 2796,
    "area": 31,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Stakna Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kiru Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-6-c-33",
    "Legacy_ID": "dras-sub-basin-w-6-c-33",
    "slug": "basgo-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Basgo Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.33,
      "lng": 75.13
    },
    "elevation": 2824,
    "area": 34,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Basgo Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-7-c-34",
    "Legacy_ID": "nubra-sub-basin-w-7-c-34",
    "slug": "likir-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Likir Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.54,
      "lng": 77.84
    },
    "elevation": 2852,
    "area": 37,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Likir Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishtwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-8-c-35",
    "Legacy_ID": "tawi-sub-basin-w-8-c-35",
    "slug": "phyang-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Phyang Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.35,
      "lng": 75.15
    },
    "elevation": 2880,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Phyang Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Paddar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-9-c-36",
    "Legacy_ID": "marusudar-sub-basin-w-9-c-36",
    "slug": "chemrey-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Chemrey Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.56,
      "lng": 77.86
    },
    "elevation": 2908,
    "area": 43,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chemrey Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bhadarwah Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-10-c-37",
    "Legacy_ID": "ujh-sub-basin-w-10-c-37",
    "slug": "kargil-dras-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Kargil Dras Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.37,
      "lng": 75.17
    },
    "elevation": 2936,
    "area": 46,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kargil Dras Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Doda Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-11-c-38",
    "Legacy_ID": "zanskar-sub-basin-w-11-c-38",
    "slug": "pensi-la-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.847Z",
    "name": "Pensi La Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 77.88
    },
    "elevation": 2964,
    "area": 49,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pensi La Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ramban Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-12-c-39",
    "Legacy_ID": "shyok-sub-basin-w-12-c-39",
    "slug": "drang-drung-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Drang Drung Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.39,
      "lng": 75.19
    },
    "elevation": 2992,
    "area": 52,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drang Drung Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Baglihar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-13-c-40",
    "Legacy_ID": "suru-sub-basin-w-13-c-40",
    "slug": "rangdum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rangdum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.6,
      "lng": 77.9
    },
    "elevation": 3020,
    "area": 55,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rangdum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Reasi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-14-c-41",
    "Legacy_ID": "dras-sub-basin-w-14-c-41",
    "slug": "sani-lake-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sani Lake Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.41,
      "lng": 75.21
    },
    "elevation": 3048,
    "area": 58,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sani Lake Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Salal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-15-c-42",
    "Legacy_ID": "nubra-sub-basin-w-15-c-42",
    "slug": "drass-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Drass Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.62,
      "lng": 77.92
    },
    "elevation": 3076,
    "area": 61,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drass Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-16-c-43",
    "Legacy_ID": "tawi-sub-basin-w-16-c-43",
    "slug": "drass-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Drass Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.43,
      "lng": 75.23
    },
    "elevation": 3104,
    "area": 64,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drass Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-17-c-44",
    "Legacy_ID": "marusudar-sub-basin-w-17-c-44",
    "slug": "tiger-hill-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tiger Hill Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.64,
      "lng": 77.94
    },
    "elevation": 3132,
    "area": 67,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tiger Hill Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Udhampur Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-18-c-45",
    "Legacy_ID": "ujh-sub-basin-w-18-c-45",
    "slug": "mushkoh-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mushkoh Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.45,
      "lng": 75.25
    },
    "elevation": 3160,
    "area": 70,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mushkoh Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jammu Plain Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-19-c-46",
    "Legacy_ID": "zanskar-sub-basin-w-19-c-46",
    "slug": "batalik-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Batalik Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.66,
      "lng": 77.96
    },
    "elevation": 3188,
    "area": 73,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Batalik Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Samba Plains Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-20-c-47",
    "Legacy_ID": "shyok-sub-basin-w-20-c-47",
    "slug": "shingo-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shingo Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.47,
      "lng": 75.27
    },
    "elevation": 3216,
    "area": 76,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shingo Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kathua Coastal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-21-c-48",
    "Legacy_ID": "suru-sub-basin-w-21-c-48",
    "slug": "kishtwar-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kishtwar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.68,
      "lng": 77.98
    },
    "elevation": 3244,
    "area": 79,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kishtwar Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ranjit Sagar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-22-c-49",
    "Legacy_ID": "dras-sub-basin-w-22-c-49",
    "slug": "chenab-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Chenab Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.49,
      "lng": 75.29
    },
    "elevation": 3272,
    "area": 82,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chenab Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh River Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-23-c-50",
    "Legacy_ID": "nubra-sub-basin-w-23-c-50",
    "slug": "tawi-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tawi Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.7,
      "lng": 78
    },
    "elevation": 3300,
    "area": 85,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tawi Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ujh River Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-24-c-51",
    "Legacy_ID": "tawi-sub-basin-w-24-c-51",
    "slug": "udhampur-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Udhampur Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.51,
      "lng": 75.31
    },
    "elevation": 3328,
    "area": 88,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Udhampur Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Basantar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-25-c-52",
    "Legacy_ID": "marusudar-sub-basin-w-25-c-52",
    "slug": "reasi-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Reasi Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.72,
      "lng": 78.02
    },
    "elevation": 3356,
    "area": 91,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Reasi Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Devak Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-26-c-53",
    "Legacy_ID": "ujh-sub-basin-w-26-c-53",
    "slug": "doda-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Doda Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.53,
      "lng": 75.33
    },
    "elevation": 3384,
    "area": 94,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Doda Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kalakote Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-0-c-54",
    "Legacy_ID": "tawi-sub-basin-w-0-c-54",
    "slug": "ramban-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Ramban Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.74,
      "lng": 78.04
    },
    "elevation": 3412,
    "area": 17,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ramban Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-1-c-55",
    "Legacy_ID": "marusudar-sub-basin-w-1-c-55",
    "slug": "kathua-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kathua Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.55,
      "lng": 75.35
    },
    "elevation": 3440,
    "area": 20,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kathua Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-2-c-56",
    "Legacy_ID": "ujh-sub-basin-w-2-c-56",
    "slug": "samba-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Samba Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.76,
      "lng": 78.06
    },
    "elevation": 3468,
    "area": 23,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Samba Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-3-c-57",
    "Legacy_ID": "zanskar-sub-basin-w-3-c-57",
    "slug": "rajouri-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rajouri Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.57,
      "lng": 75.37
    },
    "elevation": 3496,
    "area": 26,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rajouri Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Marusudar Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-4-c-58",
    "Legacy_ID": "shyok-sub-basin-w-4-c-58",
    "slug": "leh-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Leh Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.78,
      "lng": 78.08
    },
    "elevation": 1924,
    "area": 29,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Leh Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pakal Dul Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-5-c-59",
    "Legacy_ID": "suru-sub-basin-w-5-c-59",
    "slug": "kargil-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kargil Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.59,
      "lng": 75.39
    },
    "elevation": 1952,
    "area": 32,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kargil Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kiru Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-6-c-60",
    "Legacy_ID": "dras-sub-basin-w-6-c-60",
    "slug": "zanskar-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Zanskar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.8,
      "lng": 78.1
    },
    "elevation": 1980,
    "area": 35,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zanskar Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-7-c-61",
    "Legacy_ID": "nubra-sub-basin-w-7-c-61",
    "slug": "nubra-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Nubra Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.61,
      "lng": 75.41
    },
    "elevation": 2008,
    "area": 38,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nubra Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kishtwar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-8-c-62",
    "Legacy_ID": "tawi-sub-basin-w-8-c-62",
    "slug": "puga-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Puga Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.82,
      "lng": 78.12
    },
    "elevation": 2036,
    "area": 41,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Puga Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Paddar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-9-c-63",
    "Legacy_ID": "marusudar-sub-basin-w-9-c-63",
    "slug": "hanle-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hanle Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.63,
      "lng": 75.43
    },
    "elevation": 2064,
    "area": 44,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hanle Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bhadarwah Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-10-c-64",
    "Legacy_ID": "ujh-sub-basin-w-10-c-64",
    "slug": "chushul-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Chushul Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.84,
      "lng": 78.14
    },
    "elevation": 2092,
    "area": 47,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chushul Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Doda Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-11-c-65",
    "Legacy_ID": "zanskar-sub-basin-w-11-c-65",
    "slug": "nyoma-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Nyoma Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.65,
      "lng": 75.45
    },
    "elevation": 2120,
    "area": 50,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nyoma Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ramban Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-12-c-66",
    "Legacy_ID": "shyok-sub-basin-w-12-c-66",
    "slug": "demchok-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Demchok Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.86,
      "lng": 78.16
    },
    "elevation": 2148,
    "area": 53,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Demchok Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Baglihar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-13-c-67",
    "Legacy_ID": "suru-sub-basin-w-13-c-67",
    "slug": "changthang-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Changthang Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.67,
      "lng": 75.47
    },
    "elevation": 2176,
    "area": 56,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Changthang Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Reasi Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-14-c-68",
    "Legacy_ID": "dras-sub-basin-w-14-c-68",
    "slug": "tso-kar-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tso Kar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.88,
      "lng": 78.18
    },
    "elevation": 2204,
    "area": 59,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tso Kar Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Salal Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-15-c-69",
    "Legacy_ID": "nubra-sub-basin-w-15-c-69",
    "slug": "tso-moriri-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tso Moriri Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.69,
      "lng": 75.49
    },
    "elevation": 2232,
    "area": 62,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tso Moriri Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-16-c-70",
    "Legacy_ID": "tawi-sub-basin-w-16-c-70",
    "slug": "pangong-karst-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Pangong Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.9,
      "lng": 78.2
    },
    "elevation": 2260,
    "area": 65,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pangong Karst Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tawi Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tatapani-kalakote-spring-shed",
    "Legacy_ID": "tatapani-kalakote-spring-shed",
    "slug": "tatapani-kalakote-spring-shed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tatapani Kalakote Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A geothermal aquifer system. The hot springs have high sulfur and radon content, emerging near the Main Boundary Thrust.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.2378,
      "lng": 74.4119
    },
    "elevation": 950,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatta Pani Kalakote Catchment",
        "Tatta Pani Hot Spring Recharge Zone"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Basantar Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kalakote Nallah / Tributary of Chenab"
    }
  },
  {
    "id": "panamik-spring-shed",
    "Legacy_ID": "panamik-spring-shed",
    "slug": "panamik-hot-spring-spring-shed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Panamik Hot Spring Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Sulfur-rich thermal spring-shed along the Nubra River valley. Associated with structural fault lines of the Karakoram range.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.7877,
      "lng": 77.5332
    },
    "elevation": 3600,
    "area": 28,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Panamik Geothermal Catchment",
        "Panamik Spring-Shed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neeru Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Nubra River"
    }
  },
  {
    "id": "basantar-catchment-m-0",
    "Legacy_ID": "basantar-catchment-m-0",
    "slug": "kiagar-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kiagar Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33,
      "lng": 74.8
    },
    "elevation": 1800,
    "area": 5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kiagar Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Basantar Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neeru-catchment-m-1",
    "Legacy_ID": "neeru-catchment-m-1",
    "slug": "yaye-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Yaye Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.21,
      "lng": 77.51
    },
    "elevation": 1822,
    "area": 6,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Yaye Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neeru Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "puga-geothermal-catchment-m-2",
    "Legacy_ID": "puga-geothermal-catchment-m-2",
    "slug": "startsapuk-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Startsapuk Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.02,
      "lng": 74.82
    },
    "elevation": 1844,
    "area": 7,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Startsapuk Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Puga Valley Geothermal Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-0-c-0-m-3",
    "Legacy_ID": "tawi-sub-basin-w-0-c-0-m-3",
    "slug": "shey-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shey Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.23,
      "lng": 77.53
    },
    "elevation": 1866,
    "area": 8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shey Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Nowshera Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-1-c-1-m-4",
    "Legacy_ID": "marusudar-sub-basin-w-1-c-1-m-4",
    "slug": "stakna-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Stakna Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.04,
      "lng": 74.84
    },
    "elevation": 1888,
    "area": 9,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Stakna Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rajouri Upper Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-2-c-2-m-5",
    "Legacy_ID": "ujh-sub-basin-w-2-c-2-m-5",
    "slug": "basgo-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Basgo Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.25,
      "lng": 77.55
    },
    "elevation": 1910,
    "area": 10,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Basgo Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rajouri Lower Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-3-c-3-m-6",
    "Legacy_ID": "zanskar-sub-basin-w-3-c-3-m-6",
    "slug": "likir-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Likir Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.06,
      "lng": 74.86
    },
    "elevation": 1932,
    "area": 11,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Likir Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Poonch Upper Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-4-c-4-m-7",
    "Legacy_ID": "shyok-sub-basin-w-4-c-4-m-7",
    "slug": "phyang-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Phyang Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.27,
      "lng": 77.57
    },
    "elevation": 1954,
    "area": 12,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Phyang Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Poonch Lower Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-5-c-5-m-8",
    "Legacy_ID": "suru-sub-basin-w-5-c-5-m-8",
    "slug": "chemrey-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Chemrey Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kishtwar",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kishtwar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.08,
      "lng": 74.88
    },
    "elevation": 1976,
    "area": 13,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chemrey Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Upper Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-6-c-6-m-9",
    "Legacy_ID": "dras-sub-basin-w-6-c-6-m-9",
    "slug": "kargil-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kargil Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.29,
      "lng": 77.59
    },
    "elevation": 1998,
    "area": 14,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kargil Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Lower Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "nubra-sub-basin-w-7-c-7-m-10",
    "Legacy_ID": "nubra-sub-basin-w-7-c-7-m-10",
    "slug": "pensi-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Pensi Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Rajouri",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Rajouri",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.1,
      "lng": 74.9
    },
    "elevation": 2020,
    "area": 15,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Pensi Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sanku Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "tawi-sub-basin-w-8-c-8-m-11",
    "Legacy_ID": "tawi-sub-basin-w-8-c-8-m-11",
    "slug": "drang-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Drang Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.31,
      "lng": 77.61
    },
    "elevation": 2042,
    "area": 16,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drang Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zanskar Upper Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "marusudar-sub-basin-w-9-c-9-m-12",
    "Legacy_ID": "marusudar-sub-basin-w-9-c-9-m-12",
    "slug": "rangdum-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rangdum Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Jammu",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Jammu",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.12,
      "lng": 74.92
    },
    "elevation": 2064,
    "area": 17,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rangdum Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zanskar Lower Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "ujh-sub-basin-w-10-c-10-m-13",
    "Legacy_ID": "ujh-sub-basin-w-10-c-10-m-13",
    "slug": "sani-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sani Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.33,
      "lng": 77.63
    },
    "elevation": 2086,
    "area": 18,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sani Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Padum Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "zanskar-sub-basin-w-11-c-11-m-14",
    "Legacy_ID": "zanskar-sub-basin-w-11-c-11-m-14",
    "slug": "drass-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Drass Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Samba",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Samba",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.14,
      "lng": 74.94
    },
    "elevation": 2108,
    "area": 19,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drass Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Stod Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shyok-sub-basin-w-12-c-12-m-15",
    "Legacy_ID": "shyok-sub-basin-w-12-c-12-m-15",
    "slug": "tiger-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tiger Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.35,
      "lng": 77.65
    },
    "elevation": 2130,
    "area": 20,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tiger Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Tsarap Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "suru-sub-basin-w-13-c-13-m-16",
    "Legacy_ID": "suru-sub-basin-w-13-c-13-m-16",
    "slug": "mushkoh-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mushkoh Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Reasi",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.16,
      "lng": 74.96
    },
    "elevation": 2152,
    "area": 21,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mushkoh Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Upper Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "dras-sub-basin-w-14-c-14-m-17",
    "Legacy_ID": "dras-sub-basin-w-14-c-14-m-17",
    "slug": "batalik-karst-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Batalik Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.37,
      "lng": 77.67
    },
    "elevation": 2174,
    "area": 22,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Batalik Karst Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Lower Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-0",
    "Legacy_ID": "neelum-ajk-basin-w-0",
    "slug": "neelum-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Neelum Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "elevation": 2000,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum Upper Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-1",
    "Legacy_ID": "hunza-sub-basin-w-1",
    "slug": "neelum-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Neelum Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.52,
      "lng": 74.52
    },
    "elevation": 2035,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Neelum Lower Stream"
    }
  },
  {
    "id": "gilgit-sub-basin-w-2",
    "Legacy_ID": "gilgit-sub-basin-w-2",
    "slug": "muzaffarabad-jhelum-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Muzaffarabad Jhelum Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "elevation": 2070,
    "area": 50,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Muzaffarabad Jhelum Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Muzaffarabad Jhelum Stream"
    }
  },
  {
    "id": "shigar-sub-basin-w-3",
    "Legacy_ID": "shigar-sub-basin-w-3",
    "slug": "kotli-poonch-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kotli Poonch Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.56,
      "lng": 74.56
    },
    "elevation": 2105,
    "area": 55,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kotli Poonch Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kotli Poonch Stream"
    }
  },
  {
    "id": "astore-sub-basin-w-4",
    "Legacy_ID": "astore-sub-basin-w-4",
    "slug": "mirpur-mangla-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mirpur Mangla Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "elevation": 2140,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mirpur Mangla Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Mirpur Mangla Stream"
    }
  },
  {
    "id": "neelum-ajk-basin-w-5",
    "Legacy_ID": "neelum-ajk-basin-w-5",
    "slug": "bhimber-plains-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Bhimber plains Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.6,
      "lng": 74.6
    },
    "elevation": 2175,
    "area": 65,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bhimber plains Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Bhimber plains Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-6",
    "Legacy_ID": "hunza-sub-basin-w-6",
    "slug": "hattian-bala-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hattian Bala Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "elevation": 2210,
    "area": 70,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hattian Bala Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hattian Bala Stream"
    }
  },
  {
    "id": "gilgit-sub-basin-w-7",
    "Legacy_ID": "gilgit-sub-basin-w-7",
    "slug": "kunhar-joint-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kunhar Joint Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.64,
      "lng": 74.64
    },
    "elevation": 2245,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kunhar Joint Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kunhar Joint Stream"
    }
  },
  {
    "id": "shigar-sub-basin-w-8",
    "Legacy_ID": "shigar-sub-basin-w-8",
    "slug": "hunza-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hunza Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 73.96
    },
    "elevation": 2280,
    "area": 80,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hunza Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza Upper Stream"
    }
  },
  {
    "id": "astore-sub-basin-w-9",
    "Legacy_ID": "astore-sub-basin-w-9",
    "slug": "hunza-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hunza Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.68,
      "lng": 74.68
    },
    "elevation": 2315,
    "area": 85,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hunza Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza Lower Stream"
    }
  },
  {
    "id": "neelum-ajk-basin-w-10",
    "Legacy_ID": "neelum-ajk-basin-w-10",
    "slug": "gilgit-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Gilgit Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 74
    },
    "elevation": 2350,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gilgit Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Gilgit Upper Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-11",
    "Legacy_ID": "hunza-sub-basin-w-11",
    "slug": "gilgit-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Gilgit Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.72,
      "lng": 74.72
    },
    "elevation": 2385,
    "area": 95,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gilgit Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Gilgit Lower Stream"
    }
  },
  {
    "id": "gilgit-sub-basin-w-12",
    "Legacy_ID": "gilgit-sub-basin-w-12",
    "slug": "astore-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Astore Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.54,
      "lng": 74.04
    },
    "elevation": 2420,
    "area": 100,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Astore Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Astore Upper Stream"
    }
  },
  {
    "id": "shigar-sub-basin-w-13",
    "Legacy_ID": "shigar-sub-basin-w-13",
    "slug": "astore-lower-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Astore Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.76,
      "lng": 74.76
    },
    "elevation": 2455,
    "area": 105,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Astore Lower Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Astore Lower Stream"
    }
  },
  {
    "id": "astore-sub-basin-w-14",
    "Legacy_ID": "astore-sub-basin-w-14",
    "slug": "shigar-glacial-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shigar Glacial Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 74.08
    },
    "elevation": 2490,
    "area": 110,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shigar Glacial Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shigar Glacial Stream"
    }
  },
  {
    "id": "neelum-ajk-basin-w-15",
    "Legacy_ID": "neelum-ajk-basin-w-15",
    "slug": "kharmang-indus-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kharmang Indus Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.8,
      "lng": 74.8
    },
    "elevation": 2525,
    "area": 115,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kharmang Indus Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Kharmang Indus Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-16",
    "Legacy_ID": "hunza-sub-basin-w-16",
    "slug": "ghanche-shyok-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Ghanche Shyok Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.62,
      "lng": 74.12
    },
    "elevation": 2560,
    "area": 120,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ghanche Shyok Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ghanche Shyok Stream"
    }
  },
  {
    "id": "gilgit-sub-basin-w-17",
    "Legacy_ID": "gilgit-sub-basin-w-17",
    "slug": "hispar-snout-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hispar snout Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.84,
      "lng": 74.84
    },
    "elevation": 2595,
    "area": 125,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hispar snout Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hispar snout Stream"
    }
  },
  {
    "id": "shigar-sub-basin-w-18",
    "Legacy_ID": "shigar-sub-basin-w-18",
    "slug": "batura-snout-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Batura snout Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.66,
      "lng": 74.16
    },
    "elevation": 2630,
    "area": 130,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Batura snout Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Batura snout Stream"
    }
  },
  {
    "id": "astore-sub-basin-w-19",
    "Legacy_ID": "astore-sub-basin-w-19",
    "slug": "naltar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Naltar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.88,
      "lng": 74.88
    },
    "elevation": 2665,
    "area": 135,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Naltar Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Naltar Stream"
    }
  },
  {
    "id": "neelum-ajk-basin-w-20",
    "Legacy_ID": "neelum-ajk-basin-w-20",
    "slug": "ghizer-upper-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Ghizer Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.7,
      "lng": 74.2
    },
    "elevation": 2700,
    "area": 140,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ghizer Upper Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Ghizer Upper Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-21",
    "Legacy_ID": "hunza-sub-basin-w-21",
    "slug": "yasin-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Yasin Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.92,
      "lng": 74.92
    },
    "elevation": 2735,
    "area": 145,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Yasin Local Watershed"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Yasin Stream"
    }
  },
  {
    "id": "poonch-ajk-catchment",
    "Legacy_ID": "poonch-ajk-catchment",
    "slug": "poonch-ajk-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Poonch AJK Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major transboundary tributary of Jhelum. Known for containing the Poonch River National Park, a critical habitat for Endangered Golden Mahseer.",
    "District_ID": "Poonch (AJK)/Kotli/Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Poonch (AJK)/Kotli/Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.52,
      "lng": 73.88
    },
    "elevation": 1650,
    "area": 3200,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Poonch River Watershed AJK",
        "Poonch Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Poonch River"
    }
  },
  {
    "id": "kunhar-catchment",
    "Legacy_ID": "kunhar-catchment",
    "slug": "kunhar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kunhar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Originating from Lulusar Lake, Kunhar flows through the Kaghan Valley and joins the Jhelum River near Muzaffarabad.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.45,
      "lng": 73.48
    },
    "elevation": 2800,
    "area": 2530,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kunhar River Basin",
        "Kaghan Valley Watershed"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Lower Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Kunhar River"
    }
  },
  {
    "id": "mangla-reservoir-catchment",
    "Legacy_ID": "mangla-reservoir-catchment",
    "slug": "mangla-reservoir-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mangla Reservoir Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Mangla reservoir is the second-largest in Pakistan. Highly affected by siltation from upstream Jhelum, Poonch, and Neelum drainage.",
    "District_ID": "Mirpur/Bhimber",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur/Bhimber",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.15,
      "lng": 73.7
    },
    "elevation": 540,
    "area": 1250,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mangla Catchment AJK",
        "Mirpur Watershed"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Muzaffarabad Jhelum Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Jhelum River"
    }
  },
  {
    "id": "jhelum-muzaffarabad-catchment",
    "Legacy_ID": "jhelum-muzaffarabad-catchment",
    "slug": "jhelum-muzaffarabad-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Jhelum Muzaffarabad Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Characterized by highly unstable mountain slopes. In 2005, the Muzaffarabad earthquake caused massive landslides that altered drainage patterns.",
    "District_ID": "Muzaffarabad/Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad/Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 73.55
    },
    "elevation": 2100,
    "area": 1980,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Jhelum AJK Middle Catchment",
        "Muzaffarabad Watershed"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kotli Poonch Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Jhelum River"
    }
  },
  {
    "id": "hispar-glacial-catchment",
    "Legacy_ID": "hispar-glacial-catchment",
    "slug": "hispar-glacial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hispar Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Drains the massive Hispar Glacier (49 km long). Hispar and Biafo glaciers meet at the Hispar La pass, forming the longest glacial traverse outside polar zones.",
    "District_ID": "Nagar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Nagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.18,
      "lng": 75.15
    },
    "elevation": 5100,
    "area": 1840,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hispar River Watershed",
        "Hispar Basin"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Mirpur Mangla Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hispar River"
    }
  },
  {
    "id": "neelum-ajk-basin-w-0-c-0",
    "Legacy_ID": "neelum-ajk-basin-w-0-c-0",
    "slug": "rupal-glacial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rupal Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "elevation": 1900,
    "area": 15,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rupal Glacial Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Rupal Glacial Stream"
    }
  },
  {
    "id": "hunza-sub-basin-w-1-c-1",
    "Legacy_ID": "hunza-sub-basin-w-1-c-1",
    "slug": "salkhala-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Salkhala Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.51,
      "lng": 74.51
    },
    "elevation": 1928,
    "area": 18,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Salkhala Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Salkhala Stream"
    }
  },
  {
    "id": "gilgit-sub-basin-w-2-c-2",
    "Legacy_ID": "gilgit-sub-basin-w-2-c-2",
    "slug": "banjosa-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Banjosa Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.32,
      "lng": 73.82
    },
    "elevation": 1956,
    "area": 21,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Banjosa Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Muzaffarabad Jhelum Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-3-c-3",
    "Legacy_ID": "shigar-sub-basin-w-3-c-3",
    "slug": "baghsar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Baghsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.53,
      "lng": 74.53
    },
    "elevation": 1984,
    "area": 24,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Baghsar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kotli Poonch Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-4-c-4",
    "Legacy_ID": "astore-sub-basin-w-4-c-4",
    "slug": "mangla-siltation-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mangla Siltation Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "elevation": 2012,
    "area": 27,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mangla Siltation Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Mirpur Mangla Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-5-c-5",
    "Legacy_ID": "neelum-ajk-basin-w-5-c-5",
    "slug": "zalzal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Zalzal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.55,
      "lng": 74.55
    },
    "elevation": 2040,
    "area": 30,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Zalzal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bhimber plains Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-6-c-6",
    "Legacy_ID": "hunza-sub-basin-w-6-c-6",
    "slug": "kel-neelum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kel Neelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.36,
      "lng": 73.86
    },
    "elevation": 2068,
    "area": 33,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kel Neelum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hattian Bala Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-7-c-7",
    "Legacy_ID": "gilgit-sub-basin-w-7-c-7",
    "slug": "sharda-neelum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sharda Neelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.57,
      "lng": 74.57
    },
    "elevation": 2096,
    "area": 36,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sharda Neelum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kunhar Joint Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-8-c-8",
    "Legacy_ID": "shigar-sub-basin-w-8-c-8",
    "slug": "athmuqam-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Athmuqam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "elevation": 2124,
    "area": 39,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Athmuqam Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-9-c-9",
    "Legacy_ID": "astore-sub-basin-w-9-c-9",
    "slug": "dudhnial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Dudhnial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.59,
      "lng": 74.59
    },
    "elevation": 2152,
    "area": 42,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Dudhnial Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-10-c-10",
    "Legacy_ID": "neelum-ajk-basin-w-10-c-10",
    "slug": "keran-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Keran Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 73.9
    },
    "elevation": 2180,
    "area": 45,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Keran Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-11-c-11",
    "Legacy_ID": "hunza-sub-basin-w-11-c-11",
    "slug": "kutla-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kutla Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.61,
      "lng": 74.61
    },
    "elevation": 2208,
    "area": 48,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kutla Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-12-c-12",
    "Legacy_ID": "gilgit-sub-basin-w-12-c-12",
    "slug": "ratti-gali-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Ratti Gali Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "elevation": 2236,
    "area": 51,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ratti Gali Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-13-c-13",
    "Legacy_ID": "shigar-sub-basin-w-13-c-13",
    "slug": "chitta-katha-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Chitta Katha Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.63,
      "lng": 74.63
    },
    "elevation": 2264,
    "area": 54,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chitta Katha Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-14-c-14",
    "Legacy_ID": "astore-sub-basin-w-14-c-14",
    "slug": "dudipatsar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Dudipatsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.44,
      "lng": 73.94
    },
    "elevation": 2292,
    "area": 57,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Dudipatsar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Glacial Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-15-c-15",
    "Legacy_ID": "neelum-ajk-basin-w-15-c-15",
    "slug": "saral-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Saral Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.65,
      "lng": 74.65
    },
    "elevation": 2320,
    "area": 60,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Saral Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kharmang Indus Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-16-c-16",
    "Legacy_ID": "hunza-sub-basin-w-16-c-16",
    "slug": "noori-top-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Noori Top Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.46,
      "lng": 73.96
    },
    "elevation": 2348,
    "area": 63,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Noori Top Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ghanche Shyok Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-17-c-17",
    "Legacy_ID": "gilgit-sub-basin-w-17-c-17",
    "slug": "subri-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Subri Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.67,
      "lng": 74.67
    },
    "elevation": 2376,
    "area": 66,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Subri Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hispar snout Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-18-c-18",
    "Legacy_ID": "shigar-sub-basin-w-18-c-18",
    "slug": "kahil-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kahil Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.48,
      "lng": 73.98
    },
    "elevation": 2404,
    "area": 69,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kahil Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Batura snout Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-19-c-19",
    "Legacy_ID": "astore-sub-basin-w-19-c-19",
    "slug": "rawalakot-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rawalakot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.69,
      "lng": 74.69
    },
    "elevation": 2432,
    "area": 72,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rawalakot Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Naltar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-20-c-20",
    "Legacy_ID": "neelum-ajk-basin-w-20-c-20",
    "slug": "hajira-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hajira Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 74
    },
    "elevation": 2460,
    "area": 75,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hajira Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ghizer Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-21-c-21",
    "Legacy_ID": "hunza-sub-basin-w-21-c-21",
    "slug": "sudhnoti-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sudhnoti Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.71,
      "lng": 74.71
    },
    "elevation": 2488,
    "area": 78,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sudhnoti Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Yasin Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-0-c-22",
    "Legacy_ID": "neelum-ajk-basin-w-0-c-22",
    "slug": "kotli-thermal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kotli thermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.52,
      "lng": 74.02
    },
    "elevation": 2516,
    "area": 81,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kotli thermal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-1-c-23",
    "Legacy_ID": "hunza-sub-basin-w-1-c-23",
    "slug": "mirpur-plains-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mirpur plains Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.73,
      "lng": 74.73
    },
    "elevation": 2544,
    "area": 84,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mirpur plains Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-2-c-24",
    "Legacy_ID": "gilgit-sub-basin-w-2-c-24",
    "slug": "bhimber-hills-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Bhimber hills Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.54,
      "lng": 74.04
    },
    "elevation": 2572,
    "area": 87,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bhimber hills Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Muzaffarabad Jhelum Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-3-c-25",
    "Legacy_ID": "shigar-sub-basin-w-3-c-25",
    "slug": "karot-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Karot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.75,
      "lng": 74.75
    },
    "elevation": 2600,
    "area": 90,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Karot Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kotli Poonch Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-4-c-26",
    "Legacy_ID": "astore-sub-basin-w-4-c-26",
    "slug": "neelum-jhelum-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Neelum-Jhelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.56,
      "lng": 74.06
    },
    "elevation": 2628,
    "area": 93,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum-Jhelum Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Mirpur Mangla Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-5-c-27",
    "Legacy_ID": "neelum-ajk-basin-w-5-c-27",
    "slug": "gulpur-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Gulpur Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.77,
      "lng": 74.77
    },
    "elevation": 2656,
    "area": 16,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gulpur Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Bhimber plains Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-6-c-28",
    "Legacy_ID": "hunza-sub-basin-w-6-c-28",
    "slug": "patrind-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Patrind Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 74.08
    },
    "elevation": 2684,
    "area": 19,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Patrind Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hattian Bala Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-7-c-29",
    "Legacy_ID": "gilgit-sub-basin-w-7-c-29",
    "slug": "khunjerab-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Khunjerab Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.79,
      "lng": 74.79
    },
    "elevation": 2712,
    "area": 22,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Khunjerab Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kunhar Joint Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-8-c-30",
    "Legacy_ID": "shigar-sub-basin-w-8-c-30",
    "slug": "saser-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Saser Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.6,
      "lng": 74.1
    },
    "elevation": 2740,
    "area": 25,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Saser Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-9-c-31",
    "Legacy_ID": "astore-sub-basin-w-9-c-31",
    "slug": "shimshal-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shimshal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.81,
      "lng": 74.81
    },
    "elevation": 2768,
    "area": 28,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shimshal Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-10-c-32",
    "Legacy_ID": "neelum-ajk-basin-w-10-c-32",
    "slug": "misgar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Misgar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.62,
      "lng": 74.12
    },
    "elevation": 2796,
    "area": 31,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Misgar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-11-c-33",
    "Legacy_ID": "hunza-sub-basin-w-11-c-33",
    "slug": "nagar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Nagar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.83,
      "lng": 74.83
    },
    "elevation": 2824,
    "area": 34,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Nagar Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-12-c-34",
    "Legacy_ID": "gilgit-sub-basin-w-12-c-34",
    "slug": "bagrot-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Bagrot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.64,
      "lng": 74.14
    },
    "elevation": 2852,
    "area": 37,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bagrot Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Upper Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-13-c-35",
    "Legacy_ID": "shigar-sub-basin-w-13-c-35",
    "slug": "gupis-yasin-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Gupis-Yasin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.85,
      "lng": 74.85
    },
    "elevation": 2880,
    "area": 40,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gupis-Yasin Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-14-c-36",
    "Legacy_ID": "astore-sub-basin-w-14-c-36",
    "slug": "ishkoman-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Ishkoman Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.66,
      "lng": 74.16
    },
    "elevation": 2908,
    "area": 43,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ishkoman Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Glacial Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-15-c-37",
    "Legacy_ID": "neelum-ajk-basin-w-15-c-37",
    "slug": "phander-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Phander Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.87,
      "lng": 74.87
    },
    "elevation": 2936,
    "area": 46,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Phander Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kharmang Indus Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-16-c-38",
    "Legacy_ID": "hunza-sub-basin-w-16-c-38",
    "slug": "handrap-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Handrap Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.68,
      "lng": 74.18
    },
    "elevation": 2964,
    "area": 49,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Handrap Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ghanche Shyok Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-17-c-39",
    "Legacy_ID": "gilgit-sub-basin-w-17-c-39",
    "slug": "skardu-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Skardu Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.89,
      "lng": 74.89
    },
    "elevation": 2992,
    "area": 52,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Skardu Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hispar snout Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-18-c-40",
    "Legacy_ID": "shigar-sub-basin-w-18-c-40",
    "slug": "satpara-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Satpara Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.7,
      "lng": 74.2
    },
    "elevation": 3020,
    "area": 55,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Satpara Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Batura snout Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-19-c-41",
    "Legacy_ID": "astore-sub-basin-w-19-c-41",
    "slug": "kachura-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kachura Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.91,
      "lng": 74.91
    },
    "elevation": 3048,
    "area": 58,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kachura Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Naltar Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-20-c-42",
    "Legacy_ID": "neelum-ajk-basin-w-20-c-42",
    "slug": "shangrila-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shangrila Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.72,
      "lng": 74.22
    },
    "elevation": 3076,
    "area": 61,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shangrila Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Ghizer Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-21-c-43",
    "Legacy_ID": "hunza-sub-basin-w-21-c-43",
    "slug": "shigar-upper-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shigar Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.93,
      "lng": 74.93
    },
    "elevation": 3104,
    "area": 64,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shigar Upper Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Yasin Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-0-c-44",
    "Legacy_ID": "neelum-ajk-basin-w-0-c-44",
    "slug": "shigar-lower-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shigar Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.74,
      "lng": 74.24
    },
    "elevation": 3132,
    "area": 67,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shigar Lower Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Upper Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-1-c-45",
    "Legacy_ID": "hunza-sub-basin-w-1-c-45",
    "slug": "basha-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Basha Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.95,
      "lng": 74.95
    },
    "elevation": 3160,
    "area": 70,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Basha Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Lower Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-2-c-46",
    "Legacy_ID": "gilgit-sub-basin-w-2-c-46",
    "slug": "braldu-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Braldu Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.76,
      "lng": 74.26
    },
    "elevation": 3188,
    "area": 73,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Braldu Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Muzaffarabad Jhelum Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-3-c-47",
    "Legacy_ID": "shigar-sub-basin-w-3-c-47",
    "slug": "k2-meltwater-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "K2 meltwater Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.97,
      "lng": 74.97
    },
    "elevation": 3216,
    "area": 76,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "K2 meltwater Local Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kotli Poonch Watershed",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "spring-tatta-pani-kotli-spring-shed",
    "Legacy_ID": "spring-tatta-pani-kotli-spring-shed",
    "slug": "spring-tatta-pani-kotli-spring-shed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Required",
    "Source_ID": "SRC-LEGACY-001",
    "Confidence_Level": "Low",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Spring Tatta Pani Kotli Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A well-known hot sulfur spring on the banks of the Poonch River. The springs emerge under significant pressure from the underground fault lines.",
    "District_ID": "Kotli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Kotli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.5139,
      "lng": 73.9744
    },
    "elevation": 780,
    "area": 32,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tatapani Kotli Hot Spring Zone",
        "Kotli Geothermal Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Poonch AJK Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Poonch River Tributary"
    }
  },
  {
    "id": "poonch-ajk-catchment-m-0",
    "Legacy_ID": "poonch-ajk-catchment-m-0",
    "slug": "kondus-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kondus Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "elevation": 1800,
    "area": 5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kondus Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Poonch AJK Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "kunhar-catchment-m-1",
    "Legacy_ID": "kunhar-catchment-m-1",
    "slug": "saltoro-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Saltoro Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.51,
      "lng": 74.51
    },
    "elevation": 1822,
    "area": 6,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Saltoro Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kunhar Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "mangla-reservoir-catchment-m-2",
    "Legacy_ID": "mangla-reservoir-catchment-m-2",
    "slug": "kharmang-valley-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kharmang Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.32,
      "lng": 73.82
    },
    "elevation": 1844,
    "area": 7,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kharmang Valley Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Mangla Reservoir Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "jhelum-muzaffarabad-catchment-m-3",
    "Legacy_ID": "jhelum-muzaffarabad-catchment-m-3",
    "slug": "roundu-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Roundu Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.53,
      "lng": 74.53
    },
    "elevation": 1866,
    "area": 8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Roundu Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Muzaffarabad Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hispar-glacial-catchment-m-4",
    "Legacy_ID": "hispar-glacial-catchment-m-4",
    "slug": "darel-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Darel Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Haveli",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Haveli",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "elevation": 1888,
    "area": 9,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Darel Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hispar Glacial Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-0-c-0-m-5",
    "Legacy_ID": "neelum-ajk-basin-w-0-c-0-m-5",
    "slug": "tangir-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Tangir Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.55,
      "lng": 74.55
    },
    "elevation": 1910,
    "area": 10,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Tangir Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Rupal Glacial Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-1-c-1-m-6",
    "Legacy_ID": "hunza-sub-basin-w-1-c-1-m-6",
    "slug": "astor-upper-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Astor Upper Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Sudhnoti",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Sudhnoti",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.36,
      "lng": 73.86
    },
    "elevation": 1932,
    "area": 11,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Astor Upper Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Salkhala Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-2-c-2-m-7",
    "Legacy_ID": "gilgit-sub-basin-w-2-c-2-m-7",
    "slug": "astor-lower-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Astor Lower Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.57,
      "lng": 74.57
    },
    "elevation": 1954,
    "area": 12,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Astor Lower Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Banjosa Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-3-c-3-m-8",
    "Legacy_ID": "shigar-sub-basin-w-3-c-3-m-8",
    "slug": "minimarg-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Minimarg Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Mirpur",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Mirpur",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "elevation": 1976,
    "area": 13,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Minimarg Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Baghsar Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "astore-sub-basin-w-4-c-4-m-9",
    "Legacy_ID": "astore-sub-basin-w-4-c-4-m-9",
    "slug": "kamri-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kamri Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.59,
      "lng": 74.59
    },
    "elevation": 1998,
    "area": 14,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kamri Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Mangla Siltation Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "neelum-ajk-basin-w-5-c-5-m-10",
    "Legacy_ID": "neelum-ajk-basin-w-5-c-5-m-10",
    "slug": "rupal-valley-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Rupal Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 73.9
    },
    "elevation": 2020,
    "area": 15,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rupal Valley Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Zalzal Catchment",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "hunza-sub-basin-w-6-c-6-m-11",
    "Legacy_ID": "hunza-sub-basin-w-6-c-6-m-11",
    "slug": "bunji-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Bunji Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.61,
      "lng": 74.61
    },
    "elevation": 2042,
    "area": 16,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bunji Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kel Neelum Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "gilgit-sub-basin-w-7-c-7-m-12",
    "Legacy_ID": "gilgit-sub-basin-w-7-c-7-m-12",
    "slug": "chilas-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Chilas Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Hattian Bala",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hattian Bala",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "elevation": 2064,
    "area": 17,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chilas Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sharda Neelum Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "shigar-sub-basin-w-8-c-8-m-13",
    "Legacy_ID": "shigar-sub-basin-w-8-c-8-m-13",
    "slug": "neelum-upper-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Neelum Upper Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.63,
      "lng": 74.63
    },
    "elevation": 2086,
    "area": 18,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neelum Upper Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Athmuqam Catchment",
      "River_System": "Indus System",
      "Main_River_or_Stream": "None"
    }
  },
  {
    "id": "sasara-watershed",
    "Legacy_ID": "sasara-watershed",
    "slug": "sasara-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sasara Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Sasara drainage line.",
    "District_ID": "Pulwama/Shopian",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama/Shopian",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.8,
      "lng": 74.9
    },
    "elevation": 2200,
    "area": 185.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sasara Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sasara Stream"
    }
  },
  {
    "id": "shaliganga-watershed",
    "Legacy_ID": "shaliganga-watershed",
    "slug": "shaliganga-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shaliganga Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Shaliganga drainage line.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.9,
      "lng": 74.6
    },
    "elevation": 2450,
    "area": 215.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shaliganga Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Shaliganga River"
    }
  },
  {
    "id": "lolab-watershed",
    "Legacy_ID": "lolab-watershed",
    "slug": "lolab-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Lolab Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Lolab drainage line.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.45,
      "lng": 74.3
    },
    "elevation": 2300,
    "area": 320.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Lolab Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Lolab Stream"
    }
  },
  {
    "id": "kahmil-watershed",
    "Legacy_ID": "kahmil-watershed",
    "slug": "kahmil-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Kahmil Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Kahmil drainage line.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 74.2
    },
    "elevation": 2100,
    "area": 245.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kahmil Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Kahmil Stream"
    }
  },
  {
    "id": "mawar-watershed",
    "Legacy_ID": "mawar-watershed",
    "slug": "mawar-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Mawar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Mawar drainage line.",
    "District_ID": "Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.35,
      "lng": 74.15
    },
    "elevation": 2050,
    "area": 195.6,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Mawar Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Mawar Nallah"
    }
  },
  {
    "id": "hamal-watershed",
    "Legacy_ID": "hamal-watershed",
    "slug": "hamal-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Hamal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Hamal drainage line.",
    "District_ID": "Baramulla/Kupwara",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla/Kupwara",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.3,
      "lng": 74.25
    },
    "elevation": 1950,
    "area": 175.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hamal Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Hamal Nallah"
    }
  },
  {
    "id": "bulkul-watershed",
    "Legacy_ID": "bulkul-watershed",
    "slug": "bulkul-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Bulkul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Bulkul drainage line.",
    "District_ID": "Baramulla",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Baramulla",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.25,
      "lng": 74.3
    },
    "elevation": 1850,
    "area": 135.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bulkul Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Pohru Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Bulkul Nallah"
    }
  },
  {
    "id": "sasara-watershed-m-0",
    "Legacy_ID": "sasara-watershed-m-0",
    "slug": "sasara-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Sasara Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Pulwama",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Pulwama",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.81,
      "lng": 74.91
    },
    "elevation": 1800,
    "area": 15.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sasara Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sasara Watershed Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sasara Local"
    }
  },
  {
    "id": "shaliganga-watershed-m-0",
    "Legacy_ID": "shaliganga-watershed-m-0",
    "slug": "shaliganga-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Shaliganga Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Budgam",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Budgam",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.91,
      "lng": 74.61
    },
    "elevation": 1950,
    "area": 18.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shaliganga Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shaliganga Watershed Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Shaliganga Local"
    }
  },
  {
    "id": "neeru-watershed",
    "Legacy_ID": "neeru-watershed",
    "slug": "neeru-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.848Z",
    "name": "Neeru Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Neeru drainage line.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.15,
      "lng": 75.6
    },
    "elevation": 2500,
    "area": 245.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neeru Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Neeru Nallah"
    }
  },
  {
    "id": "kalnai-watershed",
    "Legacy_ID": "kalnai-watershed",
    "slug": "kalnai-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kalnai Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kalnai drainage line.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.22,
      "lng": 75.7
    },
    "elevation": 2600,
    "area": 215.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kalnai Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Kalnai River"
    }
  },
  {
    "id": "bishleri-watershed",
    "Legacy_ID": "bishleri-watershed",
    "slug": "bishleri-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Bishleri Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Bishleri drainage line.",
    "District_ID": "Ramban",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Ramban",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.3,
      "lng": 75.2
    },
    "elevation": 2150,
    "area": 195.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bishleri Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Bishleri Stream"
    }
  },
  {
    "id": "ans-watershed",
    "Legacy_ID": "ans-watershed",
    "slug": "ans-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Ans Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Ans drainage line.",
    "District_ID": "Reasi/Ramban",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Reasi/Ramban",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.2,
      "lng": 74.8
    },
    "elevation": 2320,
    "area": 265.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ans Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Ans River"
    }
  },
  {
    "id": "wakha-watershed",
    "Legacy_ID": "wakha-watershed",
    "slug": "wakha-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Wakha Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Wakha drainage line.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.4,
      "lng": 76.25
    },
    "elevation": 3950,
    "area": 380.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Wakha Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Wakha Stream"
    }
  },
  {
    "id": "kanji-watershed",
    "Legacy_ID": "kanji-watershed",
    "slug": "kanji-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kanji Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kanji drainage line.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.22,
      "lng": 76.45
    },
    "elevation": 4250,
    "area": 295.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kanji Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Kanji Nallah"
    }
  },
  {
    "id": "hanle-watershed",
    "Legacy_ID": "hanle-watershed",
    "slug": "hanle-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Hanle Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Hanle drainage line.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.8,
      "lng": 79
    },
    "elevation": 4800,
    "area": 540.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hanle Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hanle River"
    }
  },
  {
    "id": "chushul-watershed",
    "Legacy_ID": "chushul-watershed",
    "slug": "chushul-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Chushul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Chushul drainage line.",
    "District_ID": "Leh",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Leh",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.6,
      "lng": 78.6
    },
    "elevation": 4950,
    "area": 410.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chushul Catchment"
      ],
      "Watershed_Level": "Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Indus Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Chushul Stream"
    }
  },
  {
    "id": "neeru-watershed-m-0",
    "Legacy_ID": "neeru-watershed-m-0",
    "slug": "neeru-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Neeru Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.16,
      "lng": 75.61
    },
    "elevation": 1550,
    "area": 15.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neeru Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neeru Watershed Unit",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Neeru Local"
    }
  },
  {
    "id": "kalnai-watershed-m-0",
    "Legacy_ID": "kalnai-watershed-m-0",
    "slug": "kalnai-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kalnai Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.23,
      "lng": 75.71
    },
    "elevation": 1600,
    "area": 12.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kalnai Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kalnai Watershed Unit",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Kalnai Local"
    }
  },
  {
    "id": "wakha-watershed-m-0",
    "Legacy_ID": "wakha-watershed-m-0",
    "slug": "wakha-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Wakha Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.41,
      "lng": 76.26
    },
    "elevation": 3100,
    "area": 18.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Wakha Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Wakha Watershed Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Wakha Local"
    }
  },
  {
    "id": "ghizer-sub-basin",
    "Legacy_ID": "ghizer-sub-basin",
    "slug": "ghizer-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Ghizer Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ghizer drainage line.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.2,
      "lng": 73.8
    },
    "elevation": 3800,
    "area": 645.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ghizer Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ghizer River"
    }
  },
  {
    "id": "yasin-sub-basin",
    "Legacy_ID": "yasin-sub-basin",
    "slug": "yasin-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Yasin Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Yasin drainage line.",
    "District_ID": "Gupis-Yasin",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Gupis-Yasin",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.4,
      "lng": 73.4
    },
    "elevation": 3950,
    "area": 512.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Yasin Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Yasin River"
    }
  },
  {
    "id": "ishkoman-sub-basin",
    "Legacy_ID": "ishkoman-sub-basin",
    "slug": "ishkoman-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Ishkoman Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ishkoman drainage line.",
    "District_ID": "Ghizer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Ghizer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.5,
      "lng": 73.9
    },
    "elevation": 3750,
    "area": 485.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Ishkoman Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Ishkoman River"
    }
  },
  {
    "id": "naltar-sub-basin",
    "Legacy_ID": "naltar-sub-basin",
    "slug": "naltar-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Naltar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Naltar drainage line.",
    "District_ID": "Gilgit",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Gilgit",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.1,
      "lng": 74.2
    },
    "elevation": 3200,
    "area": 245.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Naltar Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Naltar River"
    }
  },
  {
    "id": "shimshal-sub-basin",
    "Legacy_ID": "shimshal-sub-basin",
    "slug": "shimshal-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Shimshal Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Shimshal drainage line.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.4,
      "lng": 75.3
    },
    "elevation": 4800,
    "area": 954.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shimshal Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shimshal River"
    }
  },
  {
    "id": "bagrot-sub-basin",
    "Legacy_ID": "bagrot-sub-basin",
    "slug": "bagrot-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Bagrot Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bagrot drainage line.",
    "District_ID": "Gilgit",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Gilgit",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36,
      "lng": 74.5
    },
    "elevation": 3500,
    "area": 385.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bagrot Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Bagrot River"
    }
  },
  {
    "id": "bunji-sub-basin",
    "Legacy_ID": "bunji-sub-basin",
    "slug": "bunji-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Bunji Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bunji drainage line.",
    "District_ID": "Astore/Gilgit",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore/Gilgit",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.6,
      "lng": 74.6
    },
    "elevation": 2200,
    "area": 295.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bunji Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Indus Main"
    }
  },
  {
    "id": "chilas-sub-basin",
    "Legacy_ID": "chilas-sub-basin",
    "slug": "chilas-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Chilas Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Chilas drainage line.",
    "District_ID": "Diamer",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Diamer",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.4,
      "lng": 74.1
    },
    "elevation": 2500,
    "area": 412.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chilas Catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Upper Indus GB Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Indus Main"
    }
  },
  {
    "id": "kunhar-catchment",
    "Legacy_ID": "kunhar-catchment",
    "slug": "kunhar-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kunhar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Originating from Lulusar Lake, Kunhar flows through the Kaghan Valley and joins the Jhelum River near Muzaffarabad.",
    "District_ID": "Muzaffarabad",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Muzaffarabad",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.35,
      "lng": 73.5
    },
    "elevation": 2300,
    "area": 185.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kunhar River Basin",
        "Kaghan Valley Watershed"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum Lower Watershed",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Kunhar River"
    }
  },
  {
    "id": "kel-catchment",
    "Legacy_ID": "kel-catchment",
    "slug": "kel-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kel Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Kel drainage line.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.8,
      "lng": 74.35
    },
    "elevation": 3400,
    "area": 245.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kel Neelum Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum River"
    }
  },
  {
    "id": "sharda-catchment",
    "Legacy_ID": "sharda-catchment",
    "slug": "sharda-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Sharda Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Sharda drainage line.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.65,
      "lng": 74.15
    },
    "elevation": 3200,
    "area": 195.6,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sharda Neelum Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum River"
    }
  },
  {
    "id": "athmuqam-catchment",
    "Legacy_ID": "athmuqam-catchment",
    "slug": "athmuqam-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Athmuqam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Athmuqam drainage line.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.5,
      "lng": 73.9
    },
    "elevation": 2800,
    "area": 175.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Athmuqam Neelum Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum River"
    }
  },
  {
    "id": "karen-catchment",
    "Legacy_ID": "karen-catchment",
    "slug": "karen-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Karen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Karen drainage line.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.58,
      "lng": 73.95
    },
    "elevation": 2750,
    "area": 135.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Karen Neelum Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Neelum AJK Basin Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum River"
    }
  },
  {
    "id": "batura-glacial-catchment",
    "Legacy_ID": "batura-glacial-catchment",
    "slug": "batura-glacial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Batura Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Batura drainage line.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.55,
      "lng": 74.45
    },
    "elevation": 5000,
    "area": 380.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Batura Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza River"
    }
  },
  {
    "id": "hispar-glacial-catchment-new",
    "Legacy_ID": "hispar-glacial-catchment-new",
    "slug": "hispar-glacial-catchment-new",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Hispar Glacial Catchment New",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Hispar drainage line.",
    "District_ID": "Nagar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Nagar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.15,
      "lng": 74.85
    },
    "elevation": 5100,
    "area": 295.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hispar Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza River"
    }
  },
  {
    "id": "biafo-glacial-catchment",
    "Legacy_ID": "biafo-glacial-catchment",
    "slug": "biafo-glacial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Biafo Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Biafo drainage line.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.8,
      "lng": 75.7
    },
    "elevation": 5150,
    "area": 540.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Biafo Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shigar River"
    }
  },
  {
    "id": "baltoro-glacial-catchment",
    "Legacy_ID": "baltoro-glacial-catchment",
    "slug": "baltoro-glacial-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Baltoro Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Baltoro drainage line.",
    "District_ID": "Shigar",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Shigar",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.75,
      "lng": 76.1
    },
    "elevation": 5500,
    "area": 745.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Baltoro Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shigar Sub-Basin Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shigar River"
    }
  },
  {
    "id": "rupal-valley-catchment",
    "Legacy_ID": "rupal-valley-catchment",
    "slug": "rupal-valley-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Rupal Valley Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Rupal Valley drainage line.",
    "District_ID": "Astore",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Astore",
    "watershed": "Pending",
    "coordinates": {
      "lat": 35.2,
      "lng": 74.7
    },
    "elevation": 3950,
    "area": 245.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Rupal Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Astore Sub-Basin Unit",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Astore River"
    }
  },
  {
    "id": "salkhala-micro-watershed",
    "Legacy_ID": "salkhala-micro-watershed",
    "slug": "salkhala-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Salkhala Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Neelum",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Neelum",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.81,
      "lng": 74.36
    },
    "elevation": 2400,
    "area": 12.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Salkhala Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Kel Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Neelum Local"
    }
  },
  {
    "id": "banjosa-micro-watershed",
    "Legacy_ID": "banjosa-micro-watershed",
    "slug": "banjosa-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Source Linked",
    "Source_ID": "SRC-PAK-PCRWR",
    "Confidence_Level": "Medium",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Banjosa Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "District_ID": "Poonch (AJK)",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Poonch (AJK)",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.81,
      "lng": 73.86
    },
    "elevation": 2100,
    "area": 14.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Banjosa Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Poonch AJK Catchment Unit",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Poonch Local"
    }
  },
  {
    "id": "shyok-basin",
    "Legacy_ID": "shyok-basin",
    "slug": "shyok-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-IND-ISRO",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Shyok Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A major transboundary river basin originating from the Rimo Glacier. Known for glacial outburst floods (GLOFs) and high tectonic activity.",
    "District_ID": "Leh/Ghanche",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Leh/Ghanche",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.6,
      "lng": 77.8
    },
    "elevation": 4800,
    "area": 10250,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Shyok River Basin",
        "River of Death Basin"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Shyok Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Shyok River"
    }
  },
  {
    "id": "gilgit-basin",
    "Legacy_ID": "gilgit-basin",
    "slug": "gilgit-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Gilgit Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A major sub-basin of the Upper Indus Basin, draining the Hindu Kush range. Characterized by high glaciated terrain and frequent landslide damming.",
    "District_ID": "Gilgit/Ghizer/Gupis-Yasin",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Gilgit/Ghizer/Gupis-Yasin",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.15,
      "lng": 73.8
    },
    "elevation": 3850,
    "area": 12100,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gilgit River Basin"
      ],
      "Watershed_Level": "Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Gilgit Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Gilgit River"
    }
  },
  {
    "id": "east-lidder-sub-basin",
    "Legacy_ID": "east-lidder-sub-basin",
    "slug": "east-lidder-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "East Lidder Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originating from the Kolahoi and Sheshnag glaciers, it merges with the West Lidder at Pahalgam. Crucial for the Amarnath Yatra pilgrimage route.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.08,
      "lng": 75.32
    },
    "elevation": 3500,
    "area": 450.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Sheshnag stream catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "East Lidder River"
    }
  },
  {
    "id": "west-lidder-sub-basin",
    "Legacy_ID": "west-lidder-sub-basin",
    "slug": "west-lidder-sub-basin",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "West Lidder Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originating from the Kolahoi Glacier near Aru Valley. Highly sensitive to glacier retreat and climate warming.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.12,
      "lng": 75.25
    },
    "elevation": 3700,
    "area": 380.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Aru stream catchment"
      ],
      "Watershed_Level": "Sub-Basin",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "West Lidder River"
    }
  },
  {
    "id": "chandanwari-catchment",
    "Legacy_ID": "chandanwari-catchment",
    "slug": "chandanwari-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Chandanwari Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A critical high-altitude catchment along the Amarnath Yatra track. Subject to intense tourist pressure and high soil erosion risk.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.09,
      "lng": 75.35
    },
    "elevation": 3450,
    "area": 125.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chandanwari Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "East Lidder River"
    }
  },
  {
    "id": "aru-catchment",
    "Legacy_ID": "aru-catchment",
    "slug": "aru-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Aru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A scenic high-altitude catchment centered around the Aru meadow. Extremely important for ecotourism and conservation of Himalayan biodiversity.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.14,
      "lng": 75.24
    },
    "elevation": 3600,
    "area": 145.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Aru Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "West Lidder River"
    }
  },
  {
    "id": "drass-catchment",
    "Legacy_ID": "drass-catchment",
    "slug": "drass-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Drass Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major cold-arid catchment originating near the Zojila Pass. Renowned for experiencing some of the lowest temperatures in the inhabited world.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.42,
      "lng": 75.78
    },
    "elevation": 4200,
    "area": 1650,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drass River Catchment"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Drass River"
    }
  },
  {
    "id": "amarnath-micro-watershed",
    "Legacy_ID": "amarnath-micro-watershed",
    "slug": "amarnath-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Amarnath Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "High-altitude glaciated micro-watershed surrounding the holy Amarnath Cave. High tourism impact during the summer pilgrimage.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.21,
      "lng": 75.5
    },
    "elevation": 4100,
    "area": 22.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Amarnath Valley Micro-Catchment"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Amarnath Stream"
    }
  },
  {
    "id": "betaab-valley-micro-watershed",
    "Legacy_ID": "betaab-valley-micro-watershed",
    "slug": "betaab-valley-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Betaab Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A highly frequented tourist site in Pahalgam. Heavy pressure on river banks and ecological restoration is active.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.03,
      "lng": 75.33
    },
    "elevation": 2600,
    "area": 18.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Hajan Valley Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "East Lidder Local"
    }
  },
  {
    "id": "aru-meadow-micro-watershed",
    "Legacy_ID": "aru-meadow-micro-watershed",
    "slug": "aru-meadow-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Aru Meadow Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Small micro-watershed enclosing the Aru village and alpine tourist resort. Noted for pasture degradation.",
    "District_ID": "Anantnag",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Anantnag",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.15,
      "lng": 75.26
    },
    "elevation": 2750,
    "area": 15.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Aru Village Micro-Catchment"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Lidder Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "West Lidder Local"
    }
  },
  {
    "id": "chinta-valley-micro-watershed",
    "Legacy_ID": "chinta-valley-micro-watershed",
    "slug": "chinta-valley-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Chinta Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A scenic high-altitude coniferous valley draining into the Neeru river. Prone to winter avalanches and landslides.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 33.02,
      "lng": 75.63
    },
    "elevation": 2350,
    "area": 24.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Chinta Nallah Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Chinta Nallah"
    }
  },
  {
    "id": "drass-valley-micro-watershed",
    "Legacy_ID": "drass-valley-micro-watershed",
    "slug": "drass-valley-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Drass Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Covers the habitable valley floor of Drass. Undergoes extreme freezing and glacial melt dynamics.",
    "District_ID": "Kargil",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Kargil",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.43,
      "lng": 75.76
    },
    "elevation": 3800,
    "area": 32.5,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Drass Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Suru Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Drass River Local"
    }
  },
  {
    "id": "attabad-lake-micro-watershed",
    "Legacy_ID": "attabad-lake-micro-watershed",
    "slug": "attabad-lake-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Attabad Lake Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Formed in 2010 by a massive landslide blocking the Hunza River. Highly vulnerable to landslide outburst floods and massive sediment inflow.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.31,
      "lng": 74.86
    },
    "elevation": 4100,
    "area": 45.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Attabad Landslide Lake Catchment"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Hunza River"
    }
  },
  {
    "id": "passu-glacier-micro-watershed",
    "Legacy_ID": "passu-glacier-micro-watershed",
    "slug": "passu-glacier-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-PAK-WAPDA",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Passu Glacier Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A steep, glaciated micro-watershed draining the Passu Glacier. Highly sensitive to glacier acceleration and surge dynamics.",
    "District_ID": "Hunza",
    "Ecological_Scope_ID": "Transboundary / Extended",
    "district": "Hunza",
    "watershed": "Pending",
    "coordinates": {
      "lat": 36.47,
      "lng": 74.88
    },
    "elevation": 4800,
    "area": 38.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Passu Glacier Catchment Unit"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Hunza Sub-Basin",
      "River_System": "Indus System",
      "Main_River_or_Stream": "Passu Stream"
    }
  },
  {
    "id": "gund-catchment",
    "Legacy_ID": "gund-catchment",
    "slug": "gund-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Gund Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A crucial mid-elevation catchment of the Sind river basin, heavily forested but subject to highway expansion pressures.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.25,
      "lng": 74.98
    },
    "elevation": 3200,
    "area": 195.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gund Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sind River"
    }
  },
  {
    "id": "kangan-catchment",
    "Legacy_ID": "kangan-catchment",
    "slug": "kangan-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kangan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A highly significant catchment hosting major water diversion structures for hydroelectricity and drinking water for Srinagar city.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.27,
      "lng": 74.9
    },
    "elevation": 2800,
    "area": 175.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kangan Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sind River"
    }
  },
  {
    "id": "gund-village-micro-watershed",
    "Legacy_ID": "gund-village-micro-watershed",
    "slug": "gund-village-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Gund Village Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Small micro-watershed surrounding the Gund settlement area, highly prone to spring runoff sedimentation.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.26,
      "lng": 74.99
    },
    "elevation": 2350,
    "area": 19.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Gund Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sind Local"
    }
  },
  {
    "id": "kangan-town-micro-watershed",
    "Legacy_ID": "kangan-town-micro-watershed",
    "slug": "kangan-town-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Kangan Town Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A micro-watershed with high built-up and agricultural density, creating moderate pollution risk for the main Sind River.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.28,
      "lng": 74.91
    },
    "elevation": 2150,
    "area": 22.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Kangan Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Sind Local"
    }
  },
  {
    "id": "erin-catchment",
    "Legacy_ID": "erin-catchment",
    "slug": "erin-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Erin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major right-bank catchment of Wular Lake, famous for alpine lakes like Sarbal Lake in its upper reaches.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.45,
      "lng": 74.68
    },
    "elevation": 2900,
    "area": 135.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Erin Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Erin Nallah"
    }
  },
  {
    "id": "madhumati-catchment",
    "Legacy_ID": "madhumati-catchment",
    "slug": "madhumati-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Madhumati Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A highly critical catchment feeding Wular Lake. Subject to significant siltation and erosion, causing wetland shallowing.",
    "District_ID": "Bandipora",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Bandipora",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.48,
      "lng": 74.62
    },
    "elevation": 3040,
    "area": 155.4,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Madhumati Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Jhelum Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Madhumati River"
    }
  },
  {
    "id": "bhadarwah-catchment",
    "Legacy_ID": "bhadarwah-catchment",
    "slug": "bhadarwah-catchment",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Bhadarwah Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Encompasses the Bhadarwah valley and mountainous fringes, draining into the Chenab River. Noted for high spring-shed density.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.98,
      "lng": 75.7
    },
    "elevation": 2550,
    "area": 185.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Neeru Bhadarwah Catchment Unit"
      ],
      "Watershed_Level": "Catchment",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Neeru Nallah"
    }
  },
  {
    "id": "bhadarwah-town-micro-watershed",
    "Legacy_ID": "bhadarwah-town-micro-watershed",
    "slug": "bhadarwah-town-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Bhadarwah Town Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A micro-watershed with significant municipal and household sewage load. Crucial for town-level sanitation and water quality management.",
    "District_ID": "Doda",
    "Ecological_Scope_ID": "Trans-Divisional",
    "district": "Doda",
    "watershed": "Pending",
    "coordinates": {
      "lat": 32.99,
      "lng": 75.71
    },
    "elevation": 1700,
    "area": 18.2,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Bhadarwah Local Micro-Watershed"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Chenab Sub-Basin",
      "River_System": "Chenab System",
      "Main_River_or_Stream": "Neeru Local"
    }
  },
  {
    "id": "purinbal-nallah-micro-watershed",
    "Legacy_ID": "purinbal-nallah-micro-watershed",
    "slug": "purinbal-nallah-micro-watershed",
    "Migration_Status": "Legacy Imported",
    "Verification_Status": "Verified",
    "Source_ID": "SRC-GOV-JKEERS",
    "Confidence_Level": "High",
    "Last_Updated": "2026-06-16T16:28:50.849Z",
    "name": "Purinbal Nallah Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A heavily forested micro-watershed in the Sind catchment, researched for soil erosion vulnerability and slope stability.",
    "District_ID": "Ganderbal",
    "Ecological_Scope_ID": "Kashmir Core",
    "district": "Ganderbal",
    "watershed": "Pending",
    "coordinates": {
      "lat": 34.31,
      "lng": 74.96
    },
    "elevation": 2950,
    "area": 12.8,
    "length": null,
    "waterQuality_status": "Pending",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Legacy_Metadata": {
      "Alternative_Names": [
        "Purinbal Nallah Micro-Catchment"
      ],
      "Watershed_Level": "Micro-Watershed",
      "Basin": "Indus Basin",
      "Sub_Basin": "Sind Sub-Basin",
      "River_System": "Jhelum System",
      "Main_River_or_Stream": "Purinbal Nallah"
    }
  }
];
