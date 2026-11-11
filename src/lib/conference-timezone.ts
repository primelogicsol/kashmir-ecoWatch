/**
 * Global Time Zone Intelligence Engine for Kashmir EcoWatch
 * Standards-compliant, IANA-based UTC scheduling, DST aware, with international fairness optimization.
 */

export interface TimeZoneOption {
  iana: string;
  city: string;
  country: string;
  region: string;
  flag: string;
}

export const MAJOR_INTERNATIONAL_HUBS: TimeZoneOption[] = [
  { iana: 'Asia/Kolkata', city: 'Srinagar', country: 'India', region: 'Organizer Reference', flag: '🇮🇳' },
  { iana: 'America/New_York', city: 'Washington, DC', country: 'USA', region: 'North America (East)', flag: '🇺🇸' },
  { iana: 'America/Los_Angeles', city: 'San Francisco', country: 'USA', region: 'North America (West)', flag: '🇺🇸' },
  { iana: 'Europe/London', city: 'London', country: 'UK', region: 'Western Europe', flag: '🇬🇧' },
  { iana: 'Europe/Zurich', city: 'Zurich', country: 'Switzerland', region: 'Central Europe', flag: '🇨🇭' },
  { iana: 'Asia/Dubai', city: 'Dubai', country: 'UAE', region: 'Middle East', flag: '🇦🇪' },
  { iana: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan', region: 'East Asia', flag: '🇯🇵' },
  { iana: 'Australia/Sydney', city: 'Sydney', country: 'Australia', region: 'Australasia', flag: '🇦🇺' },
  { iana: 'Asia/Kathmandu', city: 'Kathmandu', country: 'Nepal (ICIMOD)', region: 'Himalayan Partner', flag: '🇳🇵' }
];

export interface LocalizedEventTime {
  iana: string;
  city: string;
  country: string;
  flag: string;
  formattedTime: string;
  formattedDate: string;
  dayOfWeek: string;
  timeZoneAbbr: string;
  hour24: number;
  minutes: number;
  isConvenient: boolean;
  convenienceRating: 'optimal' | 'acceptable' | 'inconvenient_early' | 'inconvenient_late';
  dayDifference: 'same_day' | 'previous_day' | 'next_day';
  dayDifferenceLabel: string;
}

/**
 * Detect the browser's native IANA time zone with fallback to Asia/Kolkata
 */
export function getBrowserTimeZone(): string {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    } catch {
      return 'Asia/Kolkata';
    }
  }
  return 'Asia/Kolkata';
}

/**
 * Convert any UTC ISO instant to a target IANA time zone with full DST calculation
 */
export function convertEventInstant(
  utcIso: string,
  targetIana: string,
  city?: string,
  country?: string,
  flag?: string
): LocalizedEventTime {
  const dateObj = new Date(utcIso);
  
  // Formatters with target IANA time zone
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    month: 'short',
    day: 'numeric'
  });

  const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    weekday: 'short'
  });

  const hour24Formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    hour: 'numeric',
    hour12: false
  });

  const minuteFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    minute: 'numeric'
  });

  const abbrFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    timeZoneName: 'short'
  });

  const formattedTime = timeFormatter.format(dateObj);
  const formattedDate = dateFormatter.format(dateObj);
  const dayOfWeek = weekdayFormatter.format(dateObj);
  const hour24 = parseInt(hour24Formatter.format(dateObj), 10);
  const minutes = parseInt(minuteFormatter.format(dateObj), 10);

  // Time zone abbreviation
  const parts = abbrFormatter.formatToParts(dateObj);
  const tzPart = parts.find(p => p.type === 'timeZoneName');
  const timeZoneAbbr = tzPart ? tzPart.value : targetIana;

  // Day difference relative to Srinagar (Asia/Kolkata)
  const kolkataDateStr = fullDateFormatter.format(new Date(utcIso)); // placeholder for target
  const kolkataParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);

  const targetDateParts = fullDateFormatter.format(dateObj);

  let dayDifference: 'same_day' | 'previous_day' | 'next_day' = 'same_day';
  let dayDifferenceLabel = 'Same Day';

  if (targetDateParts < kolkataParts) {
    dayDifference = 'previous_day';
    dayDifferenceLabel = '-1 Day (Prev)';
  } else if (targetDateParts > kolkataParts) {
    dayDifference = 'next_day';
    dayDifferenceLabel = '+1 Day (Next)';
  }

  // Convenience Rating (based on 08:00 to 22:00 local wall-clock)
  let convenienceRating: 'optimal' | 'acceptable' | 'inconvenient_early' | 'inconvenient_late' = 'optimal';
  let isConvenient = true;

  if (hour24 >= 9 && hour24 <= 18) {
    convenienceRating = 'optimal';
    isConvenient = true;
  } else if ((hour24 >= 7 && hour24 < 9) || (hour24 > 18 && hour24 <= 21)) {
    convenienceRating = 'acceptable';
    isConvenient = true;
  } else if (hour24 < 7) {
    convenienceRating = 'inconvenient_early';
    isConvenient = false;
  } else {
    convenienceRating = 'inconvenient_late';
    isConvenient = false;
  }

  // Match city & country if not provided
  const match = MAJOR_INTERNATIONAL_HUBS.find(h => h.iana === targetIana);
  const resolvedCity = city || match?.city || targetIana.split('/')[1]?.replace(/_/g, ' ') || targetIana;
  const resolvedCountry = country || match?.country || '';
  const resolvedFlag = flag || match?.flag || '🌐';

  return {
    iana: targetIana,
    city: resolvedCity,
    country: resolvedCountry,
    flag: resolvedFlag,
    formattedTime,
    formattedDate,
    dayOfWeek,
    timeZoneAbbr,
    hour24,
    minutes,
    isConvenient,
    convenienceRating,
    dayDifference,
    dayDifferenceLabel
  };
}

/**
 * Generate worldwide time comparison across all 7 major scientific hubs
 */
export function getWorldwideComparison(utcIso: string): LocalizedEventTime[] {
  return MAJOR_INTERNATIONAL_HUBS.map(hub => 
    convertEventInstant(utcIso, hub.iana, hub.city, hub.country, hub.flag)
  );
}

/**
 * Convert Srinagar (Asia/Kolkata) local wall-clock time on a specific date into a UTC ISO string
 * Example: dateStr = "2027-06-10", time24Str = "18:00" -> "2027-06-10T12:30:00.000Z"
 */
export function srinagarTimeToUtcIso(dateStr: string, time24Str: string): string {
  // Asia/Kolkata is strictly UTC+05:30 with no daylight saving time transitions
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = time24Str.split(':').map(Number);

  // Construct in UTC then subtract 5 hours 30 minutes
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30, 0, 0));
  return utcDate.toISOString();
}

/**
 * Format an RFC 5545 compatible ICS string with exact UTC timestamps
 */
export function generateRfc5545Ics(params: {
  title: string;
  description: string;
  location?: string;
  startUtcIso: string;
  durationMinutes: number;
  url?: string;
}): string {
  const startDate = new Date(params.startUtcIso);
  const endDate = new Date(startDate.getTime() + params.durationMinutes * 60 * 1000);

  const formatUtcTimestamp = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kashmir EcoWatch//Global Scientific Conference System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:kew-${startDate.getTime()}-${Math.random().toString(36).substring(2, 9)}@kashmir-ecowatch.com`,
    `DTSTAMP:${formatUtcTimestamp(new Date())}`,
    `DTSTART:${formatUtcTimestamp(startDate)}`,
    `DTEND:${formatUtcTimestamp(endDate)}`,
    `SUMMARY:${params.title.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${params.location || 'Kashmir EcoWatch Virtual Conference Hall (LiveKit WebRTC)'}`,
    params.url ? `URL:${params.url}` : '',
    'STATUS:TENTATIVE',
    'CLASS:PUBLIC',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Kashmir EcoWatch Scientific Conference in 24 Hours',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Kashmir EcoWatch Session begins in 1 Hour',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Kashmir EcoWatch Virtual Hall is opening in 15 Minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean);

  return lines.join('\r\n');
}

/**
 * Calculate International Scheduling Fairness Score (0 to 100)
 * Evaluates how mutually convenient a scheduled UTC instant is for multi-country panels.
 */
export function calculateInternationalFairness(
  utcIso: string,
  speakerTimeZones: string[]
): {
  score: number;
  rating: 'Exceptional Window' | 'Balanced Window' | 'Sub-optimal Window' | 'Inconvenient Window';
  speakerBreakdown: { iana: string; localHour: number; isConvenient: boolean }[];
  recommendation: string;
} {
  if (speakerTimeZones.length === 0) {
    return {
      score: 100,
      rating: 'Exceptional Window',
      speakerBreakdown: [],
      recommendation: 'Single-zone event; standard Asia/Kolkata timing applies.'
    };
  }

  let convenientCount = 0;
  const breakdown = speakerTimeZones.map(iana => {
    const loc = convertEventInstant(utcIso, iana);
    if (loc.isConvenient) convenientCount++;
    return {
      iana,
      localHour: loc.hour24,
      isConvenient: loc.isConvenient
    };
  });

  const score = Math.round((convenientCount / speakerTimeZones.length) * 100);

  let rating: 'Exceptional Window' | 'Balanced Window' | 'Sub-optimal Window' | 'Inconvenient Window' = 'Balanced Window';
  let recommendation = '';

  if (score === 100) {
    rating = 'Exceptional Window';
    recommendation = 'All participating international faculties fall within daytime working hours (08:00 - 21:00 local time).';
  } else if (score >= 70) {
    rating = 'Balanced Window';
    recommendation = 'Majority of international speakers are in comfortable hours. Minor early morning or evening accommodation required for some regions.';
  } else if (score >= 40) {
    rating = 'Sub-optimal Window';
    recommendation = 'Consider shifting the start time by 2 to 3 hours to avoid overnight/dawn hours for European or North American faculties.';
  } else {
    rating = 'Inconvenient Window';
    recommendation = 'High disruption detected. At least half of the nominated international panelists are in late night (23:00 - 06:00). Rescheduling strongly advised.';
  }

  return {
    score,
    rating,
    speakerBreakdown: breakdown,
    recommendation
  };
}
