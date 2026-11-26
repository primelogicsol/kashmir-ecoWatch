import { NextRequest, NextResponse } from 'next/server';
import { resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import { readHdnStore } from '@/lib/hdn/store';
import { getCompiledSearchCorpus } from '@/lib/search/index-builder';
import { readAnieStore } from '@/lib/hd-anie/store';

export const runtime = 'nodejs';

/**
 * Human + AI Collaborative Research Assistant (Section 11):
 * Strictly retrieves verified KEW observatory intelligence + corroborated HD-ANIE
 * research dossiers. Clearly distinguishes AI-assisted outlines/suggestions from
 * human reporting, and NEVER fabricates interviews, quotes, or field measurements!
 */
export async function POST(request: NextRequest) {
  const hdnStore = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => hdnStore.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const query = String(body?.query || '').trim();
    const mode = String(body?.mode || 'kew_rag_search') as
      | 'kew_rag_search'
      | 'manuscript_outline'
      | 'headline_suggestions'
      | 'citation_check';

    if (query.length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a topic, watershed, species, or claim of at least 3 characters.',
        },
        { status: 400 }
      );
    }

    const corpus = getCompiledSearchCorpus();
    const terms = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 3);

    const kewMatches = corpus.documents
      .filter(
        (doc) =>
          doc.canonicalUrl &&
          !doc.canonicalUrl.startsWith('/himalayan-dispatch') &&
          !doc.canonicalUrl.startsWith('/admin')
      )
      .map((doc) => {
        const titleLow = doc.title.toLowerCase();
        const descLow = (doc.description || '').toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (titleLow.includes(t)) score += 15;
          else if (descLow.includes(t)) score += 5;
        }
        return { doc, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ doc, score }) => ({
        entityId: doc.id,
        title: doc.title,
        moduleLabel: doc.parentModule || 'KEW Scientific Observatory',
        href: doc.canonicalUrl,
        subregion: doc.subregion || 'Western Himalayas',
        verifiedSummary: (doc.description || '').slice(0, 300),
        relevanceScore: score,
      }));

    const anieStore = readAnieStore();
    const qLower = query.toLowerCase();
    const matchingDossiers = anieStore.dossiers
      .filter((d) =>
        d.externalSources.some(
          (s) =>
            s.publicationTitle.toLowerCase().includes(qLower) ||
            s.supportingExcerpt.toLowerCase().includes(qLower)
        )
      )
      .slice(0, 5);

    const headlineSuggestions = [
      `${query}: What Long-Term Watershed and Satellite Baselines Reveal`,
      `Inside the Empirical Record: ${query} Across the Western Himalayas`,
      `Between Policy Mandate and Ecological Reality: Assessing ${query}`,
    ];

    const outlineProposal = [
      {
        section: 'I · Datelined Opening & Documented Trigger',
        guidance:
          'Anchor the reader in verified place, elevation, and primary documented development (human field observation required for any on-site scene).',
      },
      {
        section: 'II · KEW Scientific Baseline & Multi-Decadal Context',
        guidance: kewMatches[0]
          ? `Connect with ${kewMatches[0].title} (${kewMatches[0].href}): ${kewMatches[0].verifiedSummary.slice(0, 180)}`
          : 'Cross-reference against KEW hydrological, cryospheric, or biodiversity baselines.',
      },
      {
        section: 'III · Institutional Accountability & Right of Reply',
        guidance:
          'Examine statutory clearances, agency filings, and document formal outreach to affected parties.',
      },
      {
        section: 'IV · Unresolved Uncertainties & Scientific Limitations',
        guidance:
          'State clearly what current sensors, station records, or filings cannot yet resolve.',
      },
    ];

    return NextResponse.json({
      success: true,
      mode,
      governanceBanner:
        'AI-ASSISTED RESEARCH OUTPUT — Grounded exclusively in Kashmir EcoWatch scientific modules and indexed HD-ANIE source dossiers. Never represents human peer review, field visits, or interviews.',
      kewMatches,
      matchingDossiers: matchingDossiers.map((dos) => ({
        id: dos.id,
        createdAt: dos.createdAt,
        verificationSummary: dos.verificationSummary,
        sources: dos.externalSources.slice(0, 4).map((s) => ({
          title: s.publicationTitle,
          publisher: s.publisherName,
          publishedAt: s.publishedAt.slice(0, 10),
          url: s.url,
          doi: s.doi,
          status: s.verificationStatus,
        })),
        gaps: dos.unresolvedEvidenceGaps,
      })),
      headlineSuggestions,
      outlineProposal,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Research assistant query failed.' },
      { status: 500 }
    );
  }
}
