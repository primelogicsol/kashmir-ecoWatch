#!/usr/bin/env node
/**
 * HIMALAYAN DISPATCH — NATIVE CONTENT SHARING ACCEPTANCE TEST SUITE
 *
 * Verifies:
 * 1. Reuse of existing KEW infrastructure (ReportShareModal, qr-svg, entity-identity, Logo)
 *    with zero external sharing dependencies or duplicate engines.
 * 2. Runtime execution of ISO/IEC 18004 QR encoder (`src/lib/qr-svg.ts`) up to 230 UTF-8 bytes
 *    (Versions 1–9) so long Himalayan Dispatch article + chapter-anchor URLs never truncate.
 * 3. Runtime execution of `src/lib/sharing/kew-content-sharing.ts`:
 *    - Canonical URL & chapter-anchor formatting rules (strictly https://kashmir-ecowatch.com,
 *      never localhost, 127.0.0.1, .vercel.app, or unprovisioned hosts).
 *    - All 9 sharing options (Email with prefilled subject/intro/URL, WhatsApp, Facebook,
 *      LinkedIn, X/Twitter, Telegram, Native Device Share, Copy Permanent Link, Download QR).
 *    - 10 explicit publication-status & confidentiality governance scenarios (blocks drafts,
 *      fact-checking, scientific_review, scheduling, awaiting_approval, confidential items,
 *      newsroom previews, and unreleased forthcoming editions).
 * 4. Live SSR DOM placement, exact reading-order positioning, Open Graph & Twitter Card
 *    social previews, Light/Ink theme CSS tokens, and Sectoral EIA non-regression on
 *    http://localhost:3000.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const nodeModule = require('module');

const ROOT = process.cwd();
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const CANONICAL_ORIGIN = 'https://kashmir-ecowatch.com';

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label, detail = '') {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${label}`);
  } else {
    failed++;
    const msg = detail ? `${label} — ${detail}` : label;
    failures.push(msg);
    console.error(`  [FAIL] ${msg}`);
  }
}

/**
 * Loads a TypeScript module from `src/` directly in Node 24 using native
 * `module.stripTypeScriptTypes` and `@/` alias resolution (zero disk artifacts).
 */
const tsModuleCache = new Map();
function loadTsModule(relPathFromRoot) {
  const fullPath = path.resolve(ROOT, relPathFromRoot);
  if (tsModuleCache.has(fullPath)) return tsModuleCache.get(fullPath);

  const rawTs = fs.readFileSync(fullPath, 'utf8');
  const stripped = nodeModule.stripTypeScriptTypes(rawTs, { mode: 'strip' });
  // Convert simple ESM import/export syntax for CJS VM evaluation
  const exportedFns = [];
  const cjsCode =
    stripped
      .replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]\s*;?/g,
        (_, imports, spec) => `const {${imports}} = __req(${JSON.stringify(spec)});`
      )
      .replace(/export\s+async\s+function\s+([A-Za-z0-9_]+)/g, (_, name) => {
        exportedFns.push(name);
        return `async function ${name}`;
      })
      .replace(/export\s+function\s+([A-Za-z0-9_]+)/g, (_, name) => {
        exportedFns.push(name);
        return `function ${name}`;
      })
      .replace(/export\s+const\s+([A-Za-z0-9_]+)\s*=/g, 'const $1 = exports.$1 =') +
    '\n' +
    exportedFns.map((n) => `exports.${n} = ${n};`).join('\n');

  const mod = { exports: {} };
  tsModuleCache.set(fullPath, mod.exports);

  const customReq = (spec) => {
    let target = spec;
    if (spec.startsWith('@/')) {
      target = path.join('src', spec.slice(2));
    } else if (spec.startsWith('.')) {
      target = path.relative(ROOT, path.resolve(path.dirname(fullPath), spec));
    } else {
      return require(spec);
    }
    if (!target.endsWith('.ts') && fs.existsSync(path.resolve(ROOT, `${target}.ts`))) {
      target = `${target}.ts`;
    }
    return loadTsModule(target);
  };

  const fn = vm.runInThisContext(
    `(function(exports, __req, URL, TextEncoder) {\n${cjsCode}\n})`,
    { filename: fullPath }
  );
  fn(mod.exports, customReq, URL, TextEncoder);
  return mod.exports;
}

function extractMetaContent(html, attrName, attrValue) {
  const escaped = attrValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re1 = new RegExp(
    `<meta[^>]+${attrName}=["']${escaped}["'][^>]+content=["']([^"']*)["']`,
    'i'
  );
  const m1 = html.match(re1);
  if (m1) return m1[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+${attrName}=["']${escaped}["']`,
    'i'
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
}

function extractCanonicalHref(html) {
  const m =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return m ? m[1] : null;
}

async function fetchHtml(routePath) {
  const res = await fetch(`${BASE_URL}${routePath}`, { redirect: 'manual' });
  const text = await res.text();
  return { status: res.status, headers: res.headers, html: text };
}

// ─── 1. STATIC & INFRASTRUCTURE REUSE CHECKS ─────────────────────────────────
function runInfrastructureAndGovernanceSourceChecks() {
  console.log('\n=== 1. INFRASTRUCTURE REUSE & SCOPE CONTROL ===');

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const prohibitedPackages = ['react-share', 'sharethis-reactjs', 'next-share', 'addtoany'];
  assert(
    prohibitedPackages.every((p) => !(p in allDeps)),
    'Zero external/third-party social sharing packages installed in package.json'
  );

  const reportModalSrc = fs.readFileSync(
    path.join(ROOT, 'src/components/sectoral-eia/ReportShareModal.tsx'),
    'utf8'
  );
  assert(
    reportModalSrc.includes('@/lib/sharing/kew-content-sharing') &&
      reportModalSrc.includes('@/lib/qr-svg') &&
      reportModalSrc.includes('@/lib/seo/entity-identity') &&
      reportModalSrc.includes('KewOfficialPublicationLogo'),
    'Sectoral EIA ReportShareModal reuses generalized KEW sharing engine, qr-svg, entity-identity, and KewOfficialPublicationLogo'
  );

  const kewShareSrc = fs.readFileSync(
    path.join(ROOT, 'src/components/common/KewContentShare.tsx'),
    'utf8'
  );
  assert(
    kewShareSrc.includes('KewOfficialPublicationLogo') &&
      kewShareSrc.includes('encodeQrMatrix') &&
      kewShareSrc.includes('isApprovedForPublicSharing'),
    'Reusable KewContentShare integrates KewOfficialPublicationLogo, qr-svg, and publication governance gate'
  );

  const cssSrc = fs.readFileSync(
    path.join(ROOT, 'src/app/himalayan-dispatch/editorial.css'),
    'utf8'
  );
  assert(
    cssSrc.includes('.hd-share-toolbar') &&
      cssSrc.includes('.hd-share-toolbar--darkplate') &&
      cssSrc.includes('.hd-chapter-copy-btn') &&
      cssSrc.includes('var(--hd-bg-elevated)') &&
      cssSrc.includes('var(--hd-copper)'),
    'Himalayan Dispatch editorial CSS defines responsive Light Mode, Ink Mode, and Darkroom tokens'
  );
  assert(
    !/hd-share-[^{]*\{[^}]*position:\s*fixed/i.test(
      cssSrc.replace(/\.hd-share-modal-backdrop[\s\S]*?\}/, '')
    ),
    'Zero intrusive fixed/floating share bars introduced in editorial.css'
  );
}

// ─── 2. RUNTIME EXECUTION OF QR, CANONICAL URLS, ANCHORS & GOVERNANCE RULES ──
function runRuntimeUnitTests() {
  console.log('\n=== 2. RUNTIME UNIT TESTS: QR, CANONICAL URLS, ANCHORS & PUBLICATION RESTRICTIONS ===');

  const qrLib = loadTsModule('src/lib/qr-svg.ts');
  const shareLib = loadTsModule('src/lib/sharing/kew-content-sharing.ts');

  // 2A. Long URL QR Encoding (155+ bytes -> Version 8 = 49x49 matrix, zero truncation)
  const longDispatchChapterUrl =
    'https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01/science-has-diagnosed-the-valley-who-will-prescribe-its-governance#chapter-IV';
  assert(
    Buffer.byteLength(longDispatchChapterUrl, 'utf8') > 134,
    `Test long Dispatch chapter URL exceeds legacy 134-byte V6 cap (${Buffer.byteLength(longDispatchChapterUrl, 'utf8')} bytes)`
  );
  const qrMat = qrLib.encodeQrMatrix(longDispatchChapterUrl);
  const qrSvg = qrLib.renderQrSvgString(longDispatchChapterUrl, 3);
  assert(
    qrMat.length === 45 && qrSvg.startsWith('<svg') && qrSvg.includes('viewBox="0 0 51 51"'),
    `encodeQrMatrix & renderQrSvgString encode 151-byte Dispatch chapter URL into ISO 18004 Version 7 (45x45) SVG without truncation`
  );
  const veryLongUrl = `${longDispatchChapterUrl}-extended- watershed-governance-appendix`;
  const qrMatV8 = qrLib.encodeQrMatrix(veryLongUrl);
  assert(
    qrMatV8.length === 49,
    `encodeQrMatrix scales cleanly to ISO 18004 Version 8 (49x49) for ${Buffer.byteLength(veryLongUrl, 'utf8')}-byte URLs`
  );

  // 2B. Canonical Domain & Localhost-Stripping Rules
  assert(
    shareLib.buildCanonicalPublicShareUrl('http://localhost:3000/himalayan-dispatch') ===
      'https://kashmir-ecowatch.com/himalayan-dispatch',
    'buildCanonicalPublicShareUrl strips http://localhost:3000 and enforces https://kashmir-ecowatch.com'
  );
  assert(
    shareLib.buildCanonicalPublicShareUrl('http://localhost:3002/himalayan-dispatch/issues/volume-01-issue-01/') ===
      'https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01',
    'buildCanonicalPublicShareUrl strips http://localhost:3002 and trailing slashes'
  );
  assert(
    shareLib.buildCanonicalPublicShareUrl('https://kew-preview.vercel.app/himalayan-dispatch/current-issue') ===
      'https://kashmir-ecowatch.com/himalayan-dispatch/current-issue',
    'buildCanonicalPublicShareUrl strips preview .vercel.app hostnames'
  );
  assert(
    shareLib.buildCanonicalPublicShareUrl('https://dispatch.kashmir-ecowatch.com/issues/monograph-00-watershed-voices') ===
      'https://kashmir-ecowatch.com/himalayan-dispatch/issues/monograph-00-watershed-voices',
    'buildCanonicalPublicShareUrl normalizes subdomain paths onto https://kashmir-ecowatch.com/himalayan-dispatch/...'
  );

  // 2C. Chapter-Anchor Formatting Rules
  assert(
    shareLib.formatChapterAnchorId('PROLOGUE') === 'chapter-PROLOGUE' &&
      shareLib.formatChapterAnchorId('III') === 'chapter-III' &&
      shareLib.formatChapterAnchorId('#chapter-XVI') === 'chapter-XVI' &&
      shareLib.formatChapterAnchorId('chapter-01-silence') === 'chapter-01-silence',
    'formatChapterAnchorId produces deterministic #chapter-* IDs without double-prefixing'
  );
  assert(
    shareLib.buildCanonicalPublicShareUrl(
      '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise',
      'II'
    ) ===
      'https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise#chapter-II',
    'buildCanonicalPublicShareUrl appends permanent #chapter-II anchor to canonical article URL'
  );

  // 2D. Monograph vs Issue Detection
  assert(
    shareLib.isHimalayanDispatchMonograph({
      slug: 'monograph-00-watershed-voices',
      volumeLabel: 'MONOGRAPH 00 · WATERSHED VOICES',
    }) === true &&
      shareLib.isHimalayanDispatchMonograph({
        slug: 'vol-01-no-01',
        volumeLabel: 'VOL. 01 / NO. 01',
      }) === false,
    'isHimalayanDispatchMonograph distinguishes Monograph covers from numbered Issue covers'
  );

  // 2E. All External Channel Payloads Use Actual Title, Description & Canonical Public URL
  const sampleUrl =
    'https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise';
  const sampleTitle = 'The Price of Protecting Paradise';
  const sampleIntro = 'In December 2025, twenty-two days apart, two forest defenders never returned home.';
  const channels = shareLib.buildKewShareChannels({
    title: sampleTitle,
    description: sampleIntro,
    canonicalUrl: sampleUrl,
  });
  const byKey = Object.fromEntries(channels.map((c) => [c.key, c.href]));

  assert(
    byKey.email.startsWith('mailto:?subject=') &&
      decodeURIComponent(byKey.email).includes(sampleTitle) &&
      decodeURIComponent(byKey.email).includes(sampleIntro) &&
      decodeURIComponent(byKey.email).includes(sampleUrl) &&
      !byKey.email.includes('localhost'),
    'Email channel pre-populates subject, article introduction, and canonical URL'
  );
  assert(
    byKey.whatsapp.startsWith('https://wa.me/?text=') &&
      decodeURIComponent(byKey.whatsapp).includes(sampleTitle) &&
      decodeURIComponent(byKey.whatsapp).includes(sampleUrl),
    'WhatsApp channel includes content title, introduction, and canonical URL'
  );
  assert(
    byKey.facebook === `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sampleUrl)}`,
    'Facebook channel uses canonical public URL'
  );
  assert(
    byKey.linkedin === `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sampleUrl)}`,
    'LinkedIn channel uses canonical public URL'
  );
  assert(
    byKey.x_twitter.startsWith('https://twitter.com/intent/tweet?') &&
      decodeURIComponent(byKey.x_twitter).includes(sampleTitle) &&
      byKey.x_twitter.includes(encodeURIComponent(sampleUrl)),
    'X (Twitter) channel uses content title and canonical public URL'
  );
  assert(
    byKey.telegram.startsWith('https://t.me/share/url?') &&
      byKey.telegram.includes(encodeURIComponent(sampleUrl)) &&
      decodeURIComponent(byKey.telegram).includes(sampleTitle),
    'Telegram channel uses canonical public URL and content title'
  );

  // 2F. 10 Explicit Publication-Status & Confidentiality Restriction Acceptance Tests
  const pubCases = [
    {
      label: 'Published Magazine Article (workflowStage=publication)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise',
        workflowStage: 'publication',
      },
      expected: true,
    },
    {
      label: 'Published Foundational Monograph (workflowStage=editorial_approval, editionStatus=archived)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/monograph-00-watershed-voices',
        workflowStage: 'editorial_approval',
        editionStatus: 'archived',
      },
      expected: true,
    },
    {
      label: 'Unpublished Draft Manuscript (isPublished=false, workflowStage=drafting)',
      input: {
        isPublished: false,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/draft-story',
        workflowStage: 'drafting',
      },
      expected: false,
    },
    {
      label: 'Manuscript in Stage 04 Fact-Checking (workflowStage=fact_checking)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/factcheck-story',
        workflowStage: 'fact_checking',
      },
      expected: false,
    },
    {
      label: 'Manuscript in Stage 05 Scientific Review (workflowStage=scientific_review)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/scireview-story',
        workflowStage: 'scientific_review',
      },
      expected: false,
    },
    {
      label: 'Scheduled Unreleased Manuscript (workflowStage=scheduling)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/scheduled-story',
        workflowStage: 'scheduling',
      },
      expected: false,
    },
    {
      label: 'HDN Unapproved Queue Item (hdnWorkflowStatus=awaiting_approval)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/daily-dispatch/unapproved-item',
        hdnWorkflowStatus: 'awaiting_approval',
      },
      expected: false,
    },
    {
      label: 'Confidential / Source-Protected Investigation (isConfidential=true)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/issues/volume-01-issue-01/confidential-dossier',
        isConfidential: true,
      },
      expected: false,
    },
    {
      label: 'Internal Newsroom Manuscript Preview (isPreviewMode=true / /newsroom/...)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/newsroom/stories/ms-01/preview',
        isPreviewMode: true,
      },
      expected: false,
    },
    {
      label: 'Forthcoming Unreleased Edition (editionStatus=forthcoming / /forthcoming)',
      input: {
        isPublished: true,
        canonicalPath: '/himalayan-dispatch/forthcoming',
        editionStatus: 'forthcoming',
      },
      expected: false,
    },
  ];

  for (const tc of pubCases) {
    const actual = shareLib.isApprovedForPublicSharing(tc.input);
    assert(
      actual === tc.expected,
      `Publication Governance [${tc.expected ? 'ALLOW' : 'BLOCK'}]: ${tc.label}`,
      `expected ${tc.expected}, got ${actual}`
    );
  }
}

// ─── 3. LIVE LOCALHOST SSR PLACEMENT, ANCHORS, OG PREVIEWS & GOVERNANCE ──────
async function runLiveHttpAcceptanceTests() {
  console.log(`\n=== 3. LIVE HTTP, DOM PLACEMENT, OPEN GRAPH & GOVERNANCE (${BASE_URL}) ===`);

  // 3A. Publication Homepage: /himalayan-dispatch
  {
    const { status, html } = await fetchHtml('/himalayan-dispatch');
    assert(status === 200, 'GET /himalayan-dispatch returns HTTP 200', `got ${status}`);
    assert(
      html.includes('Share Himalayan Dispatch'),
      'Publication homepage renders "Share Himalayan Dispatch" button'
    );
    assert(
      html.includes('data-canonical-share-url="https://kashmir-ecowatch.com/himalayan-dispatch"'),
      'Publication homepage share button uses canonical https://kashmir-ecowatch.com/himalayan-dispatch URL'
    );
    const tocIcons = html.match(/data-share-variant="toc-icon"/g) || [];
    assert(
      tocIcons.length >= 10,
      `Publication homepage Table of Contents renders individual article-sharing icons (${tocIcons.length} found)`
    );
    const allShareUrls = [...html.matchAll(/data-canonical-share-url="([^"]+)"/g)].map((m) => m[1]);
    assert(
      allShareUrls.length > 0 &&
        allShareUrls.every(
          (u) => u.startsWith(CANONICAL_ORIGIN) && !u.includes('localhost') && !u.includes('127.0.0.1')
        ),
      `Zero localhost URLs in any homepage share attribute (${allShareUrls.length} canonical URLs checked)`
    );

    const ogTitle = extractMetaContent(html, 'property', 'og:title');
    const ogDesc = extractMetaContent(html, 'property', 'og:description');
    const ogSite = extractMetaContent(html, 'property', 'og:site_name');
    const ogUrl = extractMetaContent(html, 'property', 'og:url');
    const ogImg = extractMetaContent(html, 'property', 'og:image');
    const twCard = extractMetaContent(html, 'name', 'twitter:card');
    assert(
      Boolean(ogTitle && ogTitle.includes('Himalayan Dispatch')) &&
        Boolean(ogDesc && ogDesc.length > 40) &&
        ogSite === 'Himalayan Dispatch' &&
        ogUrl === 'https://kashmir-ecowatch.com/himalayan-dispatch' &&
        Boolean(ogImg && ogImg.startsWith('https://kashmir-ecowatch.com/')) &&
        twCard === 'summary_large_image',
      'Publication homepage emits complete Open Graph & Twitter Card metadata on https://kashmir-ecowatch.com'
    );
    if (ogImg) {
      const localImgPath = new URL(ogImg).pathname;
      const imgRes = await fetch(`${BASE_URL}${localImgPath}`);
      assert(
        imgRes.status === 200,
        `Homepage og:image (${localImgPath}) resolves with HTTP 200`
      );
    }
  }

  // 3B. Issue Cover Page: /himalayan-dispatch/issues/volume-01-issue-01 & /current-issue
  {
    const { status, html } = await fetchHtml('/himalayan-dispatch/issues/volume-01-issue-01');
    assert(status === 200, 'GET /himalayan-dispatch/issues/volume-01-issue-01 returns HTTP 200');
    assert(
      html.includes('Share This Issue'),
      'Issue cover page renders "Share This Issue"'
    );
    assert(
      !html.includes('Share This Monograph'),
      'Issue cover page does not mislabel regular issue as Monograph'
    );
    assert(
      html.includes(
        'data-canonical-share-url="https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01"'
      ),
      'Issue cover page share button targets https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01'
    );
    const tocIcons = html.match(/data-share-variant="toc-icon"/g) || [];
    assert(
      tocIcons.length >= 10,
      `Issue cover page Table of Contents renders individual article-sharing icons (${tocIcons.length} found)`
    );
    const ogTitle = extractMetaContent(html, 'property', 'og:title');
    const ogDesc = extractMetaContent(html, 'property', 'og:description');
    const ogImg = extractMetaContent(html, 'property', 'og:image');
    const ogUrl = extractMetaContent(html, 'property', 'og:url');
    assert(
      Boolean(ogTitle && ogTitle.includes('The Price of Protecting Paradise')) &&
        Boolean(ogDesc && ogDesc.length > 30) &&
        ogUrl === 'https://kashmir-ecowatch.com/himalayan-dispatch/issues/volume-01-issue-01' &&
        Boolean(ogImg && ogImg.startsWith('https://kashmir-ecowatch.com/')),
      'Issue cover page emits accurate issue-specific Open Graph title, description, image & canonical URL'
    );

    const curr = await fetchHtml('/himalayan-dispatch/current-issue');
    assert(
      curr.status === 200 && curr.html.includes('Share This Issue'),
      'GET /himalayan-dispatch/current-issue returns HTTP 200 and renders "Share This Issue"'
    );
  }

  // 3C. Monograph Cover Page: /himalayan-dispatch/issues/monograph-00-watershed-voices
  {
    const { status, html } = await fetchHtml(
      '/himalayan-dispatch/issues/monograph-00-watershed-voices'
    );
    assert(
      status === 200,
      'GET /himalayan-dispatch/issues/monograph-00-watershed-voices returns HTTP 200'
    );
    assert(
      html.includes('Share This Monograph'),
      'Monograph cover page renders "Share This Monograph"'
    );
    assert(
      html.includes(
        'data-canonical-share-url="https://kashmir-ecowatch.com/himalayan-dispatch/issues/monograph-00-watershed-voices"'
      ),
      'Monograph cover page share button targets https://kashmir-ecowatch.com/himalayan-dispatch/issues/monograph-00-watershed-voices'
    );
    const tocIcons = html.match(/data-share-variant="toc-icon"/g) || [];
    assert(
      tocIcons.length >= 1,
      `Monograph cover page Table of Contents renders individual article-sharing icon (${tocIcons.length} found)`
    );
    const ogTitle = extractMetaContent(html, 'property', 'og:title');
    const ogDesc = extractMetaContent(html, 'property', 'og:description');
    const ogImg = extractMetaContent(html, 'property', 'og:image');
    const ogUrl = extractMetaContent(html, 'property', 'og:url');
    assert(
      Boolean(ogTitle && ogTitle.includes('Watershed Voices')) &&
        Boolean(ogDesc && ogDesc.includes('Verinag')) &&
        ogUrl ===
          'https://kashmir-ecowatch.com/himalayan-dispatch/issues/monograph-00-watershed-voices' &&
        Boolean(ogImg && ogImg.startsWith('https://kashmir-ecowatch.com/')),
      'Monograph cover page emits accurate monograph-specific Open Graph preview'
    );
    if (ogImg) {
      const localImgPath = new URL(ogImg).pathname;
      const imgRes = await fetch(`${BASE_URL}${localImgPath}`);
      assert(
        imgRes.status === 200,
        `Monograph og:image (${localImgPath}) resolves with HTTP 200`
      );
    }
  }

  // 3D. Longform Article Reader, Photo Essay & Monograph Reader: Exact Header, Conclusion & Chapter Anchor Ordering
  const articleRoutes = [
    {
      route: '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-protecting-paradise',
      expectedTitle: 'The Price of Protecting Paradise',
      bylineSnippet: 'Himalayan Dispatch Desk',
      heroImgSnippet: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
      minChapters: 6,
      expectNextArticle: true,
    },
    {
      route: '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
      expectedTitle: 'The Mathematics of a Dying Lake',
      bylineSnippet: 'Dr. Fayaz Ahmad Khan',
      heroImgSnippet: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
      minChapters: 10,
      expectNextArticle: true,
    },
    {
      route: '/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for',
      expectedTitle: 'Who Are We Researching For?',
      bylineSnippet: 'Dr. Fayaz Ahmad Khan',
      heroImgSnippet: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
      minChapters: 6,
      expectNextArticle: true,
    },
    {
      route: '/himalayan-dispatch/issues/volume-01-issue-01/an-elegy-for-winter',
      expectedTitle: 'An Elegy for Winter',
      bylineSnippet: 'Visual Editions Desk',
      heroImgSnippet: 'elegy-winter',
      minChapters: 1,
      expectNextArticle: true,
    },
    {
      route:
        '/himalayan-dispatch/issues/monograph-00-watershed-voices/notes-from-the-upper-jhelum-headwaters',
      expectedTitle: 'Where the River First Learns Its Name',
      bylineSnippet: 'Dr. Fayaz Ahmad Khan',
      heroImgSnippet: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
      minChapters: 10,
      expectNextArticle: false,
    },
  ];

  for (const spec of articleRoutes) {
    const { status, html } = await fetchHtml(spec.route);
    assert(status === 200, `GET ${spec.route} returns HTTP 200`);

    const toolbarMatches = [...html.matchAll(/data-share-variant="article-toolbar"/g)];
    assert(
      toolbarMatches.length === 2,
      `${spec.expectedTitle}: renders exactly 2 article sharing toolbars (header + conclusion), found ${toolbarMatches.length}`
    );

    if (toolbarMatches.length === 2) {
      const firstToolbarIdx = toolbarMatches[0].index;
      const secondToolbarIdx = toolbarMatches[1].index;
      // Locate the <article> element's <header> (skipping the top-of-page navigation masthead <header>)
      const articleOpenIdx = html.indexOf('<article');
      const storyHeaderOpenIdx = html.indexOf('<header', articleOpenIdx);
      const storyHeaderCloseIdx = html.indexOf('</header>', storyHeaderOpenIdx);
      const bylineInHeaderIdx = html.indexOf(spec.bylineSnippet, storyHeaderOpenIdx);
      const heroImgInHeaderIdx = html.indexOf(spec.heroImgSnippet, storyHeaderOpenIdx);

      assert(
        articleOpenIdx !== -1 &&
          storyHeaderOpenIdx !== -1 &&
          bylineInHeaderIdx !== -1 &&
          bylineInHeaderIdx < firstToolbarIdx &&
          firstToolbarIdx < heroImgInHeaderIdx &&
          heroImgInHeaderIdx < storyHeaderCloseIdx,
        `${spec.expectedTitle}: header sharing toolbar appears AFTER byline/metadata/verification and BEFORE cover photograph`
      );

      const portfolioIdx = html.indexOf('View Portfolio &amp; Approved Commissions', articleOpenIdx);
      const nextEditionIdx = html.indexOf('NEXT IN THIS EDITION', articleOpenIdx);
      if (portfolioIdx !== -1) {
        assert(
          secondToolbarIdx < portfolioIdx,
          `${spec.expectedTitle}: conclusion sharing toolbar appears BEFORE author portfolio`
        );
      }
      if (spec.expectNextArticle && nextEditionIdx !== -1) {
        assert(
          secondToolbarIdx < nextEditionIdx,
          `${spec.expectedTitle}: conclusion sharing toolbar appears BEFORE next-article navigation`
        );
      }
    }

    // Verify all 9 controls exist in the rendered toolbar HTML
    for (const aria of [
      'Share via Email',
      'Share via WhatsApp',
      'Share via Facebook',
      'Share via LinkedIn',
      'Share via X (Twitter)',
      'Share via Telegram',
      'Share via device share sheet',
      'Copy permanent canonical link',
      'Open QR code and sharing options',
    ]) {
      assert(
        html.includes(`aria-label="${aria}"`),
        `${spec.expectedTitle}: toolbar exposes accessible action "${aria}"`
      );
    }

    // Verify Chapter Anchor IDs & Discreet Copy-Link Buttons
    const chapterUrls = [...html.matchAll(/data-chapter-share-url="([^"]+)"/g)].map((m) => m[1]);
    assert(
      chapterUrls.length >= spec.minChapters,
      `${spec.expectedTitle}: renders discreet chapter copy-link buttons (${chapterUrls.length} >= ${spec.minChapters})`
    );
    assert(
      chapterUrls.every(
        (u) =>
          u.startsWith(`${CANONICAL_ORIGIN}${spec.route}#chapter-`) &&
          !u.includes('localhost')
      ),
      `${spec.expectedTitle}: all ${chapterUrls.length} chapter copy-link URLs point to permanent ${CANONICAL_ORIGIN}${spec.route}#chapter-* anchors`
    );

    // Verify every chapter anchor `#chapter-...` exists as an actual `id="chapter-..."` in the DOM
    const allDomIdsMatched = chapterUrls.every((u) => {
      const hashId = u.split('#')[1];
      return html.includes(`id="${hashId}"`);
    });
    assert(
      allDomIdsMatched,
      `${spec.expectedTitle}: every chapter copy-link #anchor matches an existing <section id="..."> in SSR HTML`
    );

    // Verify Open Graph & Twitter Card tags
    const ogType = extractMetaContent(html, 'property', 'og:type');
    const ogTitle = extractMetaContent(html, 'property', 'og:title');
    const ogDesc = extractMetaContent(html, 'property', 'og:description');
    const ogImg = extractMetaContent(html, 'property', 'og:image');
    const ogUrl = extractMetaContent(html, 'property', 'og:url');
    const canonicalLink = extractCanonicalHref(html);

    assert(
      ogType === 'article' &&
        Boolean(ogTitle && ogTitle.length > 10) &&
        Boolean(ogDesc && ogDesc.length > 30) &&
        ogUrl === `${CANONICAL_ORIGIN}${spec.route}` &&
        canonicalLink === `${CANONICAL_ORIGIN}${spec.route}` &&
        Boolean(ogImg && ogImg.startsWith(CANONICAL_ORIGIN)),
      `${spec.expectedTitle}: emits accurate Open Graph article preview & canonical URL`
    );
  }

  // 3E. Daily Dispatch Stream & Article Page
  {
    const ddIndex = await fetchHtml('/himalayan-dispatch/daily-dispatch');
    assert(ddIndex.status === 200, 'GET /himalayan-dispatch/daily-dispatch returns HTTP 200');
    const ddLinkMatch = ddIndex.html.match(/href="(\/himalayan-dispatch\/daily-dispatch\/(?!archive")[a-z0-9-]+)"/i);
    assert(Boolean(ddLinkMatch), 'Daily Dispatch index links to published Daily Dispatch articles');

    if (ddLinkMatch) {
      const ddRoute = ddLinkMatch[1];
      const ddArt = await fetchHtml(ddRoute);
      assert(ddArt.status === 200, `GET ${ddRoute} returns HTTP 200`);
      const toolbars = [...ddArt.html.matchAll(/data-share-variant="article-toolbar"/g)];
      assert(
        toolbars.length === 2,
        `Daily Dispatch article (${ddRoute}) renders header + conclusion sharing toolbars`
      );
      const articleOpen = ddArt.html.indexOf('<article');
      const headerOpen = ddArt.html.indexOf('<header', articleOpen);
      const figureIdx = ddArt.html.indexOf('<figure', headerOpen);
      const recentIdx = ddArt.html.indexOf('RECENT DAILY DISPATCHES', articleOpen);
      assert(
        toolbars[0].index > headerOpen && toolbars[0].index < figureIdx,
        'Daily Dispatch header toolbar is placed below byline/verification and before cover photograph'
      );
      if (recentIdx !== -1) {
        assert(
          toolbars[1].index < recentIdx,
          'Daily Dispatch conclusion toolbar is placed before next-article navigation'
        );
      }
      const ogUrl = extractMetaContent(ddArt.html, 'property', 'og:url');
      assert(
        ogUrl === `${CANONICAL_ORIGIN}${ddRoute}`,
        `Daily Dispatch article og:url equals ${CANONICAL_ORIGIN}${ddRoute}`
      );
    }
  }

  // 3F. Edition Archive Governance (Published Issues/Monographs Shared; Forthcoming Excluded)
  {
    const arch = await fetchHtml('/himalayan-dispatch/archive');
    assert(arch.status === 200, 'GET /himalayan-dispatch/archive returns HTTP 200');
    assert(
      arch.html.includes('Share This Issue') && arch.html.includes('Share This Monograph'),
      'Edition Archive renders "Share This Issue" for published issues and "Share This Monograph" for published monographs'
    );
    assert(
      !arch.html.includes('data-canonical-share-url="https://kashmir-ecowatch.com/himalayan-dispatch/forthcoming"'),
      'Edition Archive never exposes a public share button for the forthcoming unreleased edition'
    );
  }

  // 3G. Forthcoming Unreleased Edition Page: Strictly Zero Share Controls
  {
    const forth = await fetchHtml('/himalayan-dispatch/forthcoming');
    assert(forth.status === 200, 'GET /himalayan-dispatch/forthcoming returns HTTP 200');
    const shareCount = (forth.html.match(/data-share-variant=/g) || []).length;
    assert(
      shareCount === 0,
      `Forthcoming unreleased edition page renders ZERO public sharing controls (found ${shareCount})`
    );
  }

  // 3H. Restricted Newsroom Manuscript Preview & API Governance
  {
    const apiRes = await fetch(`${BASE_URL}/api/himalayan-dispatch/hdn/manuscripts/ms-001`);
    assert(
      apiRes.status === 401,
      `Unauthenticated GET /api/himalayan-dispatch/hdn/manuscripts/ms-001 is blocked with HTTP 401 (got ${apiRes.status})`
    );
    const previewPage = await fetchHtml('/himalayan-dispatch/newsroom/stories/ms-001/preview');
    const previewShareCount = (previewPage.html.match(/data-share-variant=/g) || []).length;
    const robots = extractMetaContent(previewPage.html, 'name', 'robots') || '';
    assert(
      previewShareCount === 0 && robots.includes('noindex'),
      'Internal newsroom preview route emits noindex and renders ZERO public sharing controls'
    );
  }

  // 3I. Non-Existent / Unpublished Article Slug Returns 404 + Zero Share Controls
  {
    const unpub = await fetchHtml(
      '/himalayan-dispatch/issues/volume-01-issue-01/unpublished-confidential-draft-test'
    );
    const shareCount = (unpub.html.match(/data-share-variant=/g) || []).length;
    assert(
      unpub.status === 404 && shareCount === 0,
      `Unpublished/unknown manuscript slug returns HTTP 404 and renders ZERO share controls (status=${unpub.status}, shares=${shareCount})`
    );
  }

  // 3J. Sectoral EIA Report Sharing Non-Regression Check
  {
    const eia = await fetchHtml('/sectoral-eia/reports/kew-sr-2026-01');
    assert(
      eia.status === 200 && eia.html.includes('Share'),
      'Sectoral EIA flagship report (/sectoral-eia/reports/kew-sr-2026-01) returns HTTP 200 with operational Share action'
    );
  }
}

(async () => {
  try {
    runInfrastructureAndGovernanceSourceChecks();
    runRuntimeUnitTests();
    await runLiveHttpAcceptanceTests();

    console.log('\n============================================================');
    console.log(`HIMALAYAN DISPATCH SHARING TEST SUMMARY: ${passed} passed, ${failed} failed`);
    console.log('============================================================');

    if (failed > 0) {
      console.error('Failures:', failures);
      process.exit(1);
    }
    process.exit(0);
  } catch (err) {
    console.error('Fatal error running sharing acceptance tests:', err);
    process.exit(1);
  }
})();
