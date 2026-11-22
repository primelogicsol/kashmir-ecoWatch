/**
 * Prime Logic Solutions USA — Universal Error Management & Logging System
 * Designed for Kashmir EcoWatch platform engineering & telemetry resilience.
 */

export type ErrorCategory =
  | 'ENVIRONMENTAL_DATA_UNAVAILABLE'
  | 'MONITORING_INTERRUPTED'
  | 'GIS_UNAVAILABLE'
  | 'ANALYSIS_UNAVAILABLE'
  | 'AUTH_REQUIRED'
  | 'ACCESS_RESTRICTED'
  | 'NOT_FOUND'
  | 'SERVICE_UNAVAILABLE'
  | 'UNEXPECTED'
  | 'NETWORK_ERROR';

export interface ErrorPreset {
  title: string;
  description: string;
  retryable: boolean;
  httpStatus?: number;
}

export const ERROR_PRESETS: Record<ErrorCategory, ErrorPreset> = {
  ENVIRONMENTAL_DATA_UNAVAILABLE: {
    title: 'Environmental data unavailable',
    description: 'This environmental dataset is currently unavailable. Other Kashmir EcoWatch services may remain accessible.',
    retryable: true,
    httpStatus: 503,
  },
  MONITORING_INTERRUPTED: {
    title: 'Monitoring connection interrupted',
    description: 'The latest monitoring update could not be retrieved. Previously recorded observations may still be available.',
    retryable: true,
    httpStatus: 504,
  },
  GIS_UNAVAILABLE: {
    title: 'GIS map unavailable',
    description: 'The geographic visualization could not be loaded. Try refreshing the map or accessing another information view.',
    retryable: true,
    httpStatus: 500,
  },
  ANALYSIS_UNAVAILABLE: {
    title: 'Scientific analysis unavailable',
    description: 'This analysis could not be completed. No new scientific result has been published.',
    retryable: false,
    httpStatus: 500,
  },
  AUTH_REQUIRED: {
    title: 'Authentication required',
    description: 'Sign in to access this service.',
    retryable: false,
    httpStatus: 401,
  },
  ACCESS_RESTRICTED: {
    title: 'Access restricted',
    description: 'Your account does not have permission to access this resource.',
    retryable: false,
    httpStatus: 403,
  },
  NOT_FOUND: {
    title: 'Page not found',
    description: 'The requested Kashmir EcoWatch page could not be found.',
    retryable: false,
    httpStatus: 404,
  },
  SERVICE_UNAVAILABLE: {
    title: 'Service temporarily unavailable',
    description: 'Kashmir EcoWatch engineering is performing scheduled maintenance. Please check back shortly.',
    retryable: true,
    httpStatus: 503,
  },
  UNEXPECTED: {
    title: "We're unable to load this page",
    description: 'Kashmir EcoWatch encountered a technical issue while loading this service. You can try again or return to the homepage.',
    retryable: true,
    httpStatus: 500,
  },
  NETWORK_ERROR: {
    title: 'Network connection interrupted',
    description: 'A network communication failure prevented loading this data. Please verify your connection and try again.',
    retryable: true,
    httpStatus: 0,
  },
};

export interface DiagnosticLogEntry {
  referenceCode: string;
  timestamp: string;
  category: ErrorCategory;
  route: string;
  module: string;
  publicMessage: string;
  technicalSummary?: string;
  httpStatus?: number;
  retryable: boolean;
}

// In-memory diagnostic ring buffer for authorized administrative inspection
const MAX_LOGS = 50;
const diagnosticRingBuffer: DiagnosticLogEntry[] = [];

/**
 * Generate a safe, non-sensitive public reference code (e.g. ERR-PLS-9F8C2A)
 */
export function generateReferenceCode(category: ErrorCategory = 'UNEXPECTED'): string {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
  const catCode = category.substring(0, 3).toUpperCase();
  return `ERR-PLS-${catCode}-${hex}`;
}

/**
 * Centrally log diagnostic errors while preserving user privacy and scientific data integrity.
 */
export function logDiagnosticError({
  category = 'UNEXPECTED',
  error,
  route = typeof window !== 'undefined' ? window.location.pathname : 'server-side',
  module = 'Core Platform',
  customMessage,
}: {
  category?: ErrorCategory;
  error?: unknown;
  route?: string;
  module?: string;
  customMessage?: string;
}): DiagnosticLogEntry {
  const preset = ERROR_PRESETS[category] || ERROR_PRESETS.UNEXPECTED;
  const referenceCode = generateReferenceCode(category);
  const timestamp = new Date().toISOString();

  // Sanitize error info: do NOT leak stack traces or internal secrets to public objects
  let technicalSummary = 'Unspecified runtime exception';
  if (error instanceof Error) {
    technicalSummary = `${error.name}: ${error.message}`;
  } else if (typeof error === 'string') {
    technicalSummary = error;
  }

  const entry: DiagnosticLogEntry = {
    referenceCode,
    timestamp,
    category,
    route,
    module,
    publicMessage: customMessage || preset.description,
    technicalSummary: process.env.NODE_ENV === 'development' ? technicalSummary : undefined,
    httpStatus: preset.httpStatus,
    retryable: preset.retryable,
  };

  // Add to ring buffer
  diagnosticRingBuffer.unshift(entry);
  if (diagnosticRingBuffer.length > MAX_LOGS) {
    diagnosticRingBuffer.pop();
  }

  // Safe console log for developers
  if (typeof window !== 'undefined') {
    console.warn(`[Prime Logic Solutions USA - Engineering Diagnostic] [${referenceCode}]`, {
      category,
      route,
      module,
      timestamp,
      technicalSummary,
    });

    // Non-blocking telemetry forward to Prime Logic Solutions Live Monitor
    try {
      const payload = {
        title: preset.title,
        message: technicalSummary || preset.description,
        category,
        route,
        module,
        correlationId: referenceCode,
        sanitizedStack: error instanceof Error ? error.stack : undefined,
        httpStatus: preset.httpStatus,
      };

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/admin/system/errors/report', blob);
      } else {
        fetch('/api/admin/system/errors/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch (_) {
      // Telemetry dispatch must never throw or disrupt client UX
    }
  }

  return entry;
}

/**
 * Retrieve recent diagnostic entries (for administrative dashboards / troubleshooting)
 */
export function getRecentDiagnostics(): DiagnosticLogEntry[] {
  return [...diagnosticRingBuffer];
}
