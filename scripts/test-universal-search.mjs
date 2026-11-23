#!/usr/bin/env node
/**
 * KEW Universal Environmental Intelligence Search & Cited Scientific Q&A — Automated QA Suite
 * Run against local dev/prod server: node scripts/test-universal-search.mjs
 */

const BASE_URL = process.env.KEW_BASE_URL || 'http://localhost:3000';

const REQUIRED_REPRESENTATIVE_QUERIES = [
  'Hangul',
  'Wular Lake',
  'Sheshnag Lake',
  'Western Disturbances',
  'Extreme Rainfall',
  'Forest Fire Archive',
  'Glacier Recession',
  'Environmental PIL',
  'EIA Reports',
  'Green Heroes',
  'Spring Discharge',
  'Air Quality',
  'Wetland Encroachment',
  'Pollinator Windows',
  'Citizen Science',
  'Gilgit-Baltistan',
];

const SCIENTIFIC_QA_TEST_CASES = [
  {
    q: 'What environmental changes have been documented around Wular Lake since 2000?',
    expectEntity: 'Wular Lake',
    expectFromYear: 2000,
    minDomains: 3,
  },
  {
    q: 'What is the conservation status, population baseline, and corridor network of Hangul in Dachigam?',
    expectEntity: 'Hangul',
    minDomains: 2,
  },
  {
    q: 'How rapidly is Kolahoi Glacier retreating and what cryosphere changes are documented in Kashmir?',
    expectEntity: 'Kolahoi Glacier',
    minDomains: 2,
  },
  {
    q: 'What High Court and NGT judicial compliance directives address Dal Lake sewage, houseboats, and encroachment?',
    expectEntity: 'Dal Lake',
    minDomains: 2,
  },
  {
    q: 'Which glacial lakes and glaciers in Gilgit-Baltistan and Ladakh have documented GLOF or recession risk?',
    minDomains: 2,
  },
];

async function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
}

async function main() {
  console.log(`Testing KEW Universal Search & Cited Scientific Q&A against ${BASE_URL}...\n`);

  // 1. Trigger Index Sync & Verify Health + Broken Links === 0
  await fetch(`${BASE_URL}/api/search/health?trigger=automated-test`, { method: 'POST' });
  const healthRes = await fetch(`${BASE_URL}/api/search/health`);
  const health = await healthRes.json();

  await assert(healthRes.status === 200, 'GET /api/search/health returns HTTP 200');
  await assert(health.status === 'HEALTHY', `Index status is HEALTHY (got ${health.status})`);
  await assert(health.totalIndexedDocuments >= 6400, `Indexed ${health.totalIndexedDocuments} public records (>= 6400)`);
  await assert(health.brokenLinksCount === 0, `Zero broken destination links (got ${health.brokenLinksCount})`);
  await assert(
    health.adapters.every((a) => a.sourceHealthy),
    `All ${health.adapters.length} indexing adapters report sourceHealthy=true`
  );

  // 2. Verify all 16 representative keyword queries return relevant results & working HTTP 200 destinations
  for (const q of REQUIRED_REPRESENTATIVE_QUERIES) {
    const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(q)}&limit=5`);
    const data = await res.json();
    const top = data.hits?.[0]?.document;
    await assert(
      data.totalHits > 0 && Boolean(top?.canonicalUrl),
      `Query "${q}" -> ${data.totalHits} hits | Top: "${top?.title}" (${top?.canonicalUrl})`
    );
    if (top?.canonicalUrl) {
      const pageRes = await fetch(`${BASE_URL}${top.canonicalUrl}`);
      await assert(pageRes.status === 200, `  Destination ${top.canonicalUrl} resolves HTTP 200`);
    }
  }

  // 3. Verify Multilingual, Transliteration, Typo-Tolerance & Empty Query
  for (const mq of ['Sheshnaag', 'Dachigham', 'ولر جھیل', 'हंगुल', 'ہانگل']) {
    const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(mq)}&limit=3`);
    const data = await res.json();
    await assert(
      data.totalHits > 0,
      `Multilingual/Typo query "${mq}" -> ${data.totalHits} hits (Top: "${data.hits?.[0]?.document?.title}")`
    );
  }

  const emptyRes = await fetch(`${BASE_URL}/api/search?q=xzqnonexistent99999`);
  const emptyData = await emptyRes.json();
  await assert(emptyData.totalHits === 0, 'Non-existent query cleanly returns 0 hits without fallback noise');

  // 4. Verify Instant Suggest API
  const sugRes = await fetch(`${BASE_URL}/api/search/suggest?q=Wular`);
  const sugData = await sugRes.json();
  await assert(Array.isArray(sugData.groups) && sugData.groups.length > 0, 'GET /api/search/suggest returns grouped typeahead suggestions');

  // 5. Stage 2: Verify Evidence-Grounded Scientific Question & Synthesis Engine (/api/search/ask)
  console.log('\n--- Stage 2: Scientific Question & Cited Synthesis QA ---');
  for (const tc of SCIENTIFIC_QA_TEST_CASES) {
    const res = await fetch(`${BASE_URL}/api/search/ask?q=${encodeURIComponent(tc.q)}`);
    const qa = await res.json();

    await assert(res.status === 200, `GET /api/search/ask HTTP 200 for "${tc.q}"`);
    await assert(
      qa.epistemicStatus === 'EVIDENCE_SUPPORTED',
      `  Epistemic status is EVIDENCE_SUPPORTED (${qa.citations?.length} citations across ${qa.epistemicDistribution?.domainsCoveredCount} domains)`
    );

    if (tc.expectEntity) {
      await assert(
        qa.parsedScope?.focalEntities?.some((e) => e.toLowerCase().includes(tc.expectEntity.toLowerCase())),
        `  Focal entity recognized: "${tc.expectEntity}" (got: ${qa.parsedScope?.focalEntities?.join(', ')})`
      );
    }
    if (tc.expectFromYear) {
      await assert(
        qa.parsedScope?.temporalWindow?.fromYear === tc.expectFromYear,
        `  Temporal window parsed fromYear=${tc.expectFromYear} (got: ${qa.parsedScope?.temporalWindow?.fromYear})`
      );
    }
    if (tc.minDomains) {
      await assert(
        (qa.epistemicDistribution?.domainsCoveredCount || 0) >= tc.minDomains,
        `  Cross-domain synthesis covers >= ${tc.minDomains} KEW domains (got ${qa.epistemicDistribution?.domainsCoveredCount})`
      );
    }

    // Verify 100% of inline [n] markers in executiveSynthesis resolve to valid citations[n-1] and zero platform modules leaked into empirical citations
    const maxCit = qa.citations?.length || 0;
    const allInlineNums = [];
    for (const blk of qa.executiveSynthesis || []) {
      const matches = blk.text.match(/\[(\d+(?:,\s*\d+)*)\]/g) || [];
      for (const m of matches) {
        const nums = m.replace(/[\[\]]/g, '').split(',').map((s) => Number(s.trim()));
        allInlineNums.push(...nums);
      }
    }
    const validMarkers =
      allInlineNums.length > 0 && allInlineNums.every((n) => Number.isInteger(n) && n >= 1 && n <= maxCit);
    await assert(
      validMarkers,
      `  All ${allInlineNums.length} inline [n] citation markers strictly resolve to bibliography [1..${maxCit}]`
    );

    const noModuleShellLeak = (qa.citations || []).every(
      (c) => c.document.resultClass !== 'module' && c.document.trustBadge !== 'Platform Module'
    );
    await assert(noModuleShellLeak, '  Zero generic module navigation shells leaked into empirical [1..N] citations');

    // Verify top cited canonical URL resolves HTTP 200
    if (qa.citations?.[0]?.document?.canonicalUrl) {
      const u = qa.citations[0].document.canonicalUrl;
      const pRes = await fetch(`${BASE_URL}${u}`);
      await assert(pRes.status === 200, `  Primary cited URI ${u} resolves HTTP 200`);
    }
  }

  // 6. Verify verifiedOnly=true strips all Tier III preliminary/reanalysis records
  const verOnlyRes = await fetch(
    `${BASE_URL}/api/search/ask?q=${encodeURIComponent('What environmental changes have been documented around Wular Lake since 2000?')}&verifiedOnly=true`
  );
  const verOnlyQa = await verOnlyRes.json();
  await assert(
    verOnlyQa.epistemicDistribution?.tier3PreliminaryOrModelCount === 0,
    'verifiedOnly=true strictly excludes Tier III preliminary alerts & reanalysis models'
  );

  // 7. Verify Scientific Abstention Gate on Out-of-Corpus Question (Zero Hallucination)
  const abstainRes = await fetch(
    `${BASE_URL}/api/search/ask?q=${encodeURIComponent('What deep-sea hydrothermal vent species live in the Mariana Trench?')}`
  );
  const abstainQa = await abstainRes.json();
  await assert(
    abstainQa.epistemicStatus === 'INSUFFICIENT_INDEXED_EVIDENCE' && abstainQa.citations?.length === 0,
    'Out-of-corpus question ("Mariana Trench") triggers INSUFFICIENT_INDEXED_EVIDENCE abstention with 0 fabricated claims'
  );

  if (process.exitCode === 1) {
    console.error('\nSome assertions failed.');
  } else {
    console.log('\nAll KEW Universal Search & Cited Scientific Q&A assertions passed.');
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
