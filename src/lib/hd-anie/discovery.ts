// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE LIVE MULTI-CHANNEL SOURCE DISCOVERY CONNECTORS
// Supports RSS 2.0, Atom 1.0, GDELT 2.0 DOC API, OpenAlex Scholarly Works API,
// Crossref DOI Discovery & Live Citation Verification, plus Autonomous Source Discovery
// ─────────────────────────────────────────────────────────────────────────────

import { AnieSourceRecord } from '@/types/hd-anie';
import {
  normalizeCanonicalSourceUrl,
  safePoliteFetch,
  sanitizeUntrustedExternalText,
  validateExternalFetchUrl,
} from './security';

export interface RawDiscoveredItem {
  url: string;
  title: string;
  summary: string;
  publishedAt: string;
  authors: string[];
  doi?: string;
  language?: string;
  discoveredPublisherDomain?: string;
  discoveredPublisherName?: string;
}

function extractXmlTag(block: string, tagName: string): string {
  const rx = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const m = block.match(rx);
  return m ? m[1].trim() : '';
}

function parseFlexibleDate(raw: string | undefined): string {
  if (!raw) return new Date().toISOString();
  const trimmed = raw.trim();
  // GDELT compact timestamp format: YYYYMMDDTHHMMSSZ or YYYYMMDDHHMMSS
  const gdeltMatch = trimmed.match(/^(\d{4})(\d{2})(\d{2})T?(\d{2})(\d{2})(\d{2})Z?$/);
  if (gdeltMatch) {
    const [, y, mo, d, h, mi, s] = gdeltMatch;
    const dt = new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
    if (!Number.isNaN(dt.getTime())) return dt.toISOString();
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    // Clamp future clock-skewed dates to current time
    const now = Date.now();
    return parsed.getTime() > now + 3600_000 ? new Date(now).toISOString() : parsed.toISOString();
  }
  return new Date().toISOString();
}

export function parseRssOrAtomXml(xml: string, maxItems = 25): RawDiscoveredItem[] {
  const items: RawDiscoveredItem[] = [];

  // RSS 2.0 <item>...</item>
  const rssMatches = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) || [];
  for (const block of rssMatches.slice(0, maxItems)) {
    const rawTitle = extractXmlTag(block, 'title');
    let rawLink = extractXmlTag(block, 'link');
    if (!rawLink) {
      const guid = extractXmlTag(block, 'guid');
      if (guid.startsWith('http')) rawLink = guid;
    }
    const rawDesc =
      extractXmlTag(block, 'description') || extractXmlTag(block, 'content:encoded');
    const pubDate =
      extractXmlTag(block, 'pubDate') ||
      extractXmlTag(block, 'dc:date') ||
      extractXmlTag(block, 'published');
    const creator =
      extractXmlTag(block, 'dc:creator') || extractXmlTag(block, 'author');

    const titleClean = sanitizeUntrustedExternalText(rawTitle, 280).cleaned;
    const summaryClean = sanitizeUntrustedExternalText(rawDesc, 1200).cleaned;
    const linkClean = normalizeCanonicalSourceUrl(
      rawLink.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
    );

    if (titleClean && linkClean && validateExternalFetchUrl(linkClean).allowed) {
      const authorClean = sanitizeUntrustedExternalText(creator, 120).cleaned;
      items.push({
        url: linkClean,
        title: titleClean,
        summary: summaryClean,
        publishedAt: parseFlexibleDate(pubDate),
        authors: authorClean ? [authorClean] : [],
      });
    }
  }

  if (items.length > 0) return items;

  // Atom 1.0 <entry>...</entry>
  const atomMatches = xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi) || [];
  for (const block of atomMatches.slice(0, maxItems)) {
    const rawTitle = extractXmlTag(block, 'title');
    const linkHrefMatch =
      block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i) ||
      block.match(/<link[^>]*href=["']([^"']+)["']/i);
    const rawLink = linkHrefMatch ? linkHrefMatch[1] : extractXmlTag(block, 'id');
    const rawSummary = extractXmlTag(block, 'summary') || extractXmlTag(block, 'content');
    const updated = extractXmlTag(block, 'published') || extractXmlTag(block, 'updated');
    const authorBlock = extractXmlTag(block, 'author');
    const authorName = extractXmlTag(authorBlock, 'name') || authorBlock;

    const titleClean = sanitizeUntrustedExternalText(rawTitle, 280).cleaned;
    const summaryClean = sanitizeUntrustedExternalText(rawSummary, 1200).cleaned;
    const linkClean = normalizeCanonicalSourceUrl(rawLink.trim());

    if (titleClean && linkClean && validateExternalFetchUrl(linkClean).allowed) {
      const authorClean = sanitizeUntrustedExternalText(authorName, 120).cleaned;
      items.push({
        url: linkClean,
        title: titleClean,
        summary: summaryClean,
        publishedAt: parseFlexibleDate(updated),
        authors: authorClean ? [authorClean] : [],
      });
    }
  }

  return items;
}

function reconstructOpenAlexAbstract(
  inverted: Record<string, number[]> | null | undefined
): string {
  if (!inverted || typeof inverted !== 'object') return '';
  const positioned: Array<[number, string]> = [];
  for (const [word, indices] of Object.entries(inverted)) {
    if (!Array.isArray(indices)) continue;
    for (const idx of indices) {
      if (typeof idx === 'number' && idx >= 0 && idx < 600) {
        positioned.push([idx, word]);
      }
    }
  }
  positioned.sort((a, b) => a[0] - b[0]);
  return positioned.map((p) => p[1]).join(' ');
}

export async function fetchFromAuthorizedSource(source: AnieSourceRecord): Promise<{
  ok: boolean;
  httpStatus: number;
  items: RawDiscoveredItem[];
  candidateNewDomains: Array<{ domain: string; sampleUrl: string }>;
  errorMessage?: string;
}> {
  const res = await safePoliteFetch(source.endpointUrl, {
    timeoutMs: source.retrievalMethod === 'gdelt_doc_api' ? 14000 : 9500,
    minDomainSpacingMs: 1100,
    accept:
      source.retrievalMethod === 'rss_atom'
        ? 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5'
        : 'application/json',
  });

  if (!res.ok) {
    return {
      ok: false,
      httpStatus: res.status,
      items: [],
      candidateNewDomains: [],
      errorMessage: res.error || `HTTP ${res.status}`,
    };
  }

  const candidateNewDomains: Array<{ domain: string; sampleUrl: string }> = [];

  try {
    if (source.retrievalMethod === 'rss_atom') {
      const items = parseRssOrAtomXml(res.text, 25);
      return { ok: true, httpStatus: res.status, items, candidateNewDomains };
    }

    if (source.retrievalMethod === 'gdelt_doc_api') {
      const json = JSON.parse(res.text);
      const articles = Array.isArray(json?.articles) ? json.articles : [];
      const items: RawDiscoveredItem[] = [];
      for (const art of articles.slice(0, 35)) {
        const cleanUrl = normalizeCanonicalSourceUrl(String(art.url || ''));
        if (!cleanUrl || !validateExternalFetchUrl(cleanUrl).allowed) continue;
        const title = sanitizeUntrustedExternalText(art.title, 280).cleaned;
        if (!title) continue;
        const domain = String(art.domain || '').toLowerCase().trim();
        if (domain) {
          candidateNewDomains.push({ domain, sampleUrl: cleanUrl });
        }
        items.push({
          url: cleanUrl,
          title,
          summary: `Discovered via GDELT 2.0 multilingual global monitoring (${domain || 'regional publisher'}, source country: ${art.sourcecountry || 'unspecified'}, language: ${art.language || 'English'}).`,
          publishedAt: parseFlexibleDate(art.seendate),
          authors: [],
          language: String(art.language || 'en').toLowerCase(),
          discoveredPublisherDomain: domain || undefined,
          discoveredPublisherName: domain || undefined,
        });
      }
      return { ok: true, httpStatus: res.status, items, candidateNewDomains };
    }

    if (source.retrievalMethod === 'openalex_api') {
      const json = JSON.parse(res.text);
      const works = Array.isArray(json?.results) ? json.results : [];
      const items: RawDiscoveredItem[] = [];
      for (const w of works.slice(0, 20)) {
        const rawDoi = typeof w.doi === 'string' ? w.doi.replace(/^https?:\/\/doi\.org\//i, '') : undefined;
        const landingUrl =
          w.primary_location?.landing_page_url ||
          (rawDoi ? `https://doi.org/${rawDoi}` : w.id);
        const cleanUrl = normalizeCanonicalSourceUrl(String(landingUrl || ''));
        if (!cleanUrl || !validateExternalFetchUrl(cleanUrl).allowed) continue;

        const title = sanitizeUntrustedExternalText(w.display_name || w.title, 300).cleaned;
        if (!title) continue;

        const rawAbstract = reconstructOpenAlexAbstract(w.abstract_inverted_index);
        const journal = w.primary_location?.source?.display_name || 'Peer-Reviewed Scholarly Venue';
        const authors = Array.isArray(w.authorships)
          ? w.authorships
              .slice(0, 5)
              .map((a: { author?: { display_name?: string } }) =>
                sanitizeUntrustedExternalText(a?.author?.display_name, 80).cleaned
              )
              .filter(Boolean)
          : [];

        const summaryText = rawAbstract
          ? sanitizeUntrustedExternalText(`${journal}: ${rawAbstract}`, 1400).cleaned
          : sanitizeUntrustedExternalText(
              `Peer-reviewed scientific publication indexed in OpenAlex (${journal}${rawDoi ? `, DOI: ${rawDoi}` : ''}).`,
              600
            ).cleaned;

        items.push({
          url: cleanUrl,
          title,
          summary: summaryText,
          publishedAt: parseFlexibleDate(w.publication_date),
          authors,
          doi: rawDoi,
          language: w.language || 'en',
          discoveredPublisherName: journal,
        });
      }
      return { ok: true, httpStatus: res.status, items, candidateNewDomains };
    }

    if (source.retrievalMethod === 'crossref_api') {
      const json = JSON.parse(res.text);
      const works = Array.isArray(json?.message?.items) ? json.message.items : [];
      const items: RawDiscoveredItem[] = [];
      for (const w of works.slice(0, 15)) {
        const doi = typeof w.DOI === 'string' ? w.DOI : undefined;
        const cleanUrl = normalizeCanonicalSourceUrl(
          String(w.URL || (doi ? `https://doi.org/${doi}` : ''))
        );
        if (!cleanUrl || !validateExternalFetchUrl(cleanUrl).allowed) continue;

        const rawTitle = Array.isArray(w.title) ? w.title[0] : w.title;
        const title = sanitizeUntrustedExternalText(rawTitle, 300).cleaned;
        if (!title) continue;

        const journal = Array.isArray(w['container-title'])
          ? w['container-title'][0]
          : 'Crossref Indexed Journal';
        const authors = Array.isArray(w.author)
          ? w.author
              .slice(0, 5)
              .map((a: { given?: string; family?: string }) =>
                sanitizeUntrustedExternalText(`${a.given || ''} ${a.family || ''}`, 80).cleaned
              )
              .filter(Boolean)
          : [];

        const dateParts = w.published?.['date-parts']?.[0] || w.created?.['date-parts']?.[0];
        const isoDate = Array.isArray(dateParts)
          ? `${dateParts[0]}-${String(dateParts[1] || 1).padStart(2, '0')}-${String(
              dateParts[2] || 1
            ).padStart(2, '0')}`
          : undefined;

        const abstractClean = w.abstract
          ? sanitizeUntrustedExternalText(`${journal}: ${w.abstract}`, 1300).cleaned
          : sanitizeUntrustedExternalText(
              `Scholarly research registered with Crossref (${journal}${doi ? `, DOI: ${doi}` : ''}).`,
              600
            ).cleaned;

        items.push({
          url: cleanUrl,
          title,
          summary: abstractClean,
          publishedAt: parseFlexibleDate(isoDate),
          authors,
          doi,
          discoveredPublisherName: journal,
        });
      }
      return { ok: true, httpStatus: res.status, items, candidateNewDomains };
    }

    return { ok: true, httpStatus: res.status, items: [], candidateNewDomains };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Parse error';
    return {
      ok: false,
      httpStatus: res.status,
      items: [],
      candidateNewDomains: [],
      errorMessage: `Response parse error: ${msg}`,
    };
  }
}

/**
 * Deterministic DOI verification against Crossref public API.
 */
export async function verifyDoiExistsOnCrossref(doi: string): Promise<boolean> {
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//i, '').trim();
  if (!cleanDoi || !cleanDoi.startsWith('10.')) return false;
  const checkUrl = `https://api.crossref.org/works/${encodeURIComponent(cleanDoi)}`;
  const res = await safePoliteFetch(checkUrl, { timeoutMs: 5000, accept: 'application/json' });
  return res.ok && res.status === 200;
}
